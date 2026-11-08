"""NASA Earthdata(LP DAAC)에서 MODIS 16일 식생지수 원본(HDF)을 받아, vi_{year}.npz에 빠진 합성만 채운다.

- Planetary Computer에 없는 합성(2025년 7~10월 등)을 채우고, 생육기에는 올해분을 이어 붙이는 데 쓴다.
- 자료: MOD13Q1(Terra)·MYD13Q1(Aqua) v061, 타일 h27v05·h28v05, 해마다 5/1~11/5 합성
- 인증: .env의 NASA_API_KEY (Earthdata 사용자 토큰, Bearer)
- 논 격자는 vi_{year}.npz의 pix(없으면 paddy_modis.csv 논 비율 0.5 이상)와 같게 맞춘다.
- HDF는 한 장씩 받아 읽고 바로 지운다(한 장 약 100~200MB). 메모리는 SDS 한 장(46MB) 수준.

사용: .venv/bin/python scripts/fetch_modis_earthdata.py [--year 2025] [--dry]   (자동 갱신은 올해분)
"""
import argparse
import datetime as dt
import json
import os
import tempfile
import time
import urllib.parse
import urllib.request

import numpy as np
import pandas as pd
from pyhdf.SD import SD, SDC

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "db", "raw", "modis")
CMR = "https://cmr.earthdata.nasa.gov/search/granules.json"
SDS = {"ndvi": "250m 16 days NDVI", "evi": "250m 16 days EVI",
       "rel": "250m 16 days pixel reliability", "doy": "250m 16 days composite day of the year"}
FILL = -32768
TILES = ("h27v05", "h28v05")


def env_token():
    for line in open(os.path.join(ROOT, ".env"), encoding="utf-8"):
        if line.startswith("NASA_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("NASA_API_KEY 없음 (.env)")


def granules(short, year):
    q = urllib.parse.urlencode({"short_name": short, "version": "061", "page_size": 200,
                                "temporal": f"{year}-05-01T00:00:00Z,{year}-11-05T23:59:59Z",
                                "bounding_box": "125.0,33.0,130.0,38.7"})
    with urllib.request.urlopen(f"{CMR}?{q}", timeout=120) as r:
        feed = json.load(r)["feed"]["entry"]
    out = []
    for g in feed:
        t = g["title"]  # MOD13Q1.A2025193.h28v05.061.2025209133050
        parts = t.split(".")
        if parts[2] not in TILES:
            continue
        start = (dt.date(int(parts[1][1:5]), 1, 1) + dt.timedelta(int(parts[1][5:8]) - 1)).isoformat()
        href = next((l["href"] for l in g["links"] if l["href"].endswith(".hdf") and l["href"].startswith("https")), None)
        if href and start <= f"{year}-11-05":
            out.append((f"{short}|{start}", parts[2], href))
    return out


class KeepAuth(urllib.request.HTTPRedirectHandler):
    """LP DAAC는 S3 서명 주소로 넘기는데, 그곳에는 Bearer 헤더를 보내면 안 된다."""
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        new = super().redirect_request(req, fp, code, msg, headers, newurl)
        if new is not None and "earthdatacloud.nasa.gov" not in urllib.parse.urlparse(newurl).netloc:
            new.headers.pop("Authorization", None)
            new.unredirected_hdrs.pop("Authorization", None)
        return new


def download(href, token, path):
    opener = urllib.request.build_opener(KeepAuth())
    for i in range(4):
        try:
            req = urllib.request.Request(href, headers={"Authorization": f"Bearer {token}"})
            with opener.open(req, timeout=300) as r, open(path, "wb") as f:
                while True:
                    b = r.read(1 << 20)
                    if not b:
                        break
                    f.write(b)
            return
        except Exception as e:  # noqa: BLE001
            if i == 3:
                raise
            print("  재시도", type(e).__name__, str(e)[:120], flush=True)
            time.sleep(10 * (i + 1))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--year", type=int, default=dt.date.today().year, help="기본: 올해 (5월 전이면 할 일 없음)")
    ap.add_argument("--dry", action="store_true")
    a = ap.parse_args()
    if a.year == dt.date.today().year and dt.date.today().month < 5:
        print(f"{a.year}: 아직 생육기 전")
        return
    token = env_token()
    path = os.path.join(OUT, f"vi_{a.year}.npz")
    if os.path.exists(path):
        z = np.load(path)
        pix, comps = z["pix"], list(map(str, z["comp"]))
        arr = {k: z[k] for k in SDS}
    else:
        px = pd.read_csv(os.path.join(ROOT, "db", "clean", "rice", "paddy_modis.csv"))
        px = px[px.frac >= 0.5]
        pix = np.c_[px.col.values, px.row.values].astype("int32")
        comps, arr = [], {k: np.empty((0, len(pix)), "int16") for k in SDS}
    have = set(comps)
    todo = [g for g in granules("MOD13Q1", a.year) + granules("MYD13Q1", a.year) if g[0] not in have]
    new = sorted({g[0] for g in todo}, key=lambda c: (c.split("|")[1], c))
    # 두 타일이 다 있는 합성만 (한 타일만 올라온 합성은 다음 번에)
    new = [c for c in new if {t for cc, t, _ in todo if cc == c} == set(TILES)]
    print(f"{a.year}: 있는 합성 {len(comps)}개, 새 합성 {len(new)}개 {new}", flush=True)
    if a.dry or not new:
        return
    cols, rows = pix[:, 0], pix[:, 1]
    add = {k: np.full((len(new), len(pix)), FILL, "int16") for k in SDS}
    with tempfile.TemporaryDirectory(dir=OUT) as tmp:
        for ci, c in enumerate(new):
            for comp, tile, href in todo:
                if comp != c:
                    continue
                h, v = int(tile[1:3]), int(tile[4:6])
                m = (cols // 4800 == h) & (rows // 4800 == v)
                lc, lr = cols[m] - h * 4800, rows[m] - v * 4800
                f = os.path.join(tmp, os.path.basename(href))
                t0 = time.time()
                download(href, token, f)
                mb = os.path.getsize(f) / 1e6
                sd = SD(f, SDC.READ)
                for k, name in SDS.items():
                    d = sd.select(name)
                    add[k][ci, m] = d[:, :][lr, lc].astype("int16")
                    d.endaccess()
                sd.end()
                os.remove(f)
                print(f"  {c} {tile}: {mb:.0f}MB {time.time() - t0:.0f}초", flush=True)
    allc = comps + new
    order = sorted(range(len(allc)), key=lambda i: (allc[i].split("|")[1], allc[i]))
    out = {k: np.concatenate([arr[k], add[k]])[order] for k in SDS}
    np.savez_compressed(path + ".tmp.npz", pix=pix, comp=np.array([allc[i] for i in order]), **out)
    os.replace(path + ".tmp.npz", path)
    print(f"{a.year}: 저장, 합성 {len(allc)}개", flush=True)


if __name__ == "__main__":
    main()
