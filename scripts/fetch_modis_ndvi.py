"""MODIS 16일 식생지수(MOD13Q1 Terra + MYD13Q1 Aqua, 250m)를 논 격자에서만 뽑는다.

- 논 격자: db/clean/rice/paddy_modis.csv 중 논 비율 >= 0.5 (build_paddy_modis_mask.py)
- 자료: Planetary Computer modis-13Q1-061 (계정 불필요, SAS 토큰 자동 갱신)
- 기간: 해마다 5/1 ~ 11/5 합성
- 저장: db/raw/modis/vi_{year}.npz  (pix: [n,2] col,row / comp: 합성 목록 / ndvi, evi, rel, doy: [합성, n] int16, 결측 -32768)
  연도 파일이 있으면 건너뛴다(이어받기).

사용: .venv/bin/python scripts/fetch_modis_ndvi.py [--years 2000-2026] [--threads 4]
원격 연결과 무관하게 돌리려면 systemd-run --user 서비스로 실행.
"""
import argparse
import datetime as dt
import json
import os
import threading
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor

import numpy as np
import pandas as pd
import rasterio
from rasterio.windows import Window

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "db", "raw", "modis")
STAC = "https://planetarycomputer.microsoft.com/api/stac/v1/search"
COLL = "modis-13Q1-061"
ASSETS = {"ndvi": "250m_16_days_NDVI", "evi": "250m_16_days_EVI",
          "rel": "250m_16_days_pixel_reliability", "doy": "250m_16_days_composite_day_of_the_year"}
FILL = -32768

_tok = {"t": None, "at": 0}
_lock = threading.Lock()


def token():
    with _lock:
        if _tok["t"] is None or time.time() - _tok["at"] > 1800:
            with urllib.request.urlopen("https://planetarycomputer.microsoft.com/api/sas/v1/token/modiseuwest/modis-061-cogs", timeout=60) as r:
                _tok["t"] = json.load(r)["token"]
            _tok["at"] = time.time()
        return _tok["t"]


def search(year):
    body = {"collections": [COLL], "bbox": [125.0, 33.0, 130.0, 38.7],
            "datetime": f"{year}-05-01/{year}-11-05", "limit": 1000}
    req = urllib.request.Request(STAC, json.dumps(body).encode(), {"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=120) as r:
        feats = json.load(r)["features"]
    return [f for f in feats if (".h27v05." in f["id"] or ".h28v05." in f["id"])]


def read_asset(href, rows, cols, r0, c0, h, w):
    for i in range(5):
        try:
            with rasterio.open(href + "?" + token()) as src:
                a = src.read(1, window=Window(c0, r0, w, h))
            return a[rows - r0, cols - c0].astype("int16")
        except Exception as e:  # noqa: BLE001
            if i == 4:
                raise
            print("  재시도", type(e).__name__, str(e)[:120], flush=True)
            time.sleep(5 * (i + 1))
            with _lock:
                _tok["t"] = None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--years", default="2000-2026")
    ap.add_argument("--threads", type=int, default=4)
    ap.add_argument("--minfrac", type=float, default=0.5)
    a = ap.parse_args()
    y0, y1 = (int(x) for x in a.years.split("-"))
    os.makedirs(OUT, exist_ok=True)
    px = pd.read_csv(os.path.join(ROOT, "db", "clean", "rice", "paddy_modis.csv"))
    px = px[px.frac >= a.minfrac].reset_index(drop=True)
    cols_g, rows_g = px.col.values, px.row.values
    tiles = {}
    for h, v in ((27, 5), (28, 5)):
        m = (cols_g // 4800 == h) & (rows_g // 4800 == v)
        idx = np.where(m)[0]
        lc, lr = cols_g[idx] - h * 4800, rows_g[idx] - v * 4800
        tiles[f"h{h}v{v:02d}"] = (idx, lr, lc, lr.min(), lc.min(), lr.max() - lr.min() + 1, lc.max() - lc.min() + 1)
    print("논 격자", len(px), {k: len(t[0]) for k, t in tiles.items()}, flush=True)

    for year in range(y0, y1 + 1):
        path = os.path.join(OUT, f"vi_{year}.npz")
        if os.path.exists(path):
            print(year, "있음, 건너뜀", flush=True)
            continue
        t_start = time.time()
        feats = search(year)
        comps = sorted({(f["id"][:7], f["properties"]["start_datetime"][:10]) for f in feats}, key=lambda c: (c[1], c[0]))
        arr = {k: np.full((len(comps), len(px)), FILL, "int16") for k in ASSETS}
        jobs = []
        for f in feats:
            ci = comps.index((f["id"][:7], f["properties"]["start_datetime"][:10]))
            tile = f["id"].split(".")[2]
            for k, asset in ASSETS.items():
                jobs.append((ci, tile, k, f["assets"][asset]["href"]))

        def run(job):
            ci, tile, k, href = job
            idx, lr, lc, r0, c0, h, w = tiles[tile]
            arr[k][ci, idx] = read_asset(href, lr, lc, r0, c0, h, w)

        with ThreadPoolExecutor(a.threads) as ex:
            for i, _ in enumerate(ex.map(run, jobs)):
                if (i + 1) % 40 == 0:
                    print(f"  {year}: {i + 1}/{len(jobs)}", flush=True)
        np.savez_compressed(path + ".tmp.npz", pix=np.c_[cols_g, rows_g].astype("int32"),
                            comp=np.array([f"{s}|{d}" for s, d in comps]), **arr)
        os.replace(path + ".tmp.npz", path)
        print(f"{year}: 합성 {len(comps)}개, 읽기 {len(jobs)}회, {time.time() - t_start:.0f}초", flush=True)
    print("완료", dt.datetime.now().isoformat(timespec="seconds"), flush=True)


if __name__ == "__main__":
    main()
