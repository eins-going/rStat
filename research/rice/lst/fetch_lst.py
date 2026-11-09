"""MODIS 8일 지표면온도(MOD11A2 Terra + MYD11A2 Aqua, 1km)를 논 1km 격자에서만 뽑는다.

- 논 1km 격자: db/clean/rice/paddy_modis.csv(250m) → col//4,row//4 로 묶어 논 면적 합 / 1km 격자 면적 = frac1k
  frac1k >= MINFRAC 인 격자만 (시군 = 그 격자에서 논 면적이 가장 큰 시군)
- 자료: Planetary Computer modis-11A2-061, 자산 LST_Day_1km, LST_Night_1km (uint16; QC는 생략)
- 기간: 해마다 6/1 ~ 10/15 시작 합성
- 저장: lst/data/lst_{year}.npz (comp: "MOD|2024-08-12" 목록, day/night: [합성, n] uint16 (×0.02K, 0=결측))
  격자 표: lst/data/cells.csv (cell, c1, r1, frac1k, sido, sigun)
  연도 파일이 있으면 건너뛴다(이어받기).

사용: .venv/bin/python research/rice/lst/fetch_lst.py --years 2002-2026 --threads 4 [--test]
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

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/home/eins/project/rStat"
OUT = os.path.join(HERE, "data")
STAC = "https://planetarycomputer.microsoft.com/api/stac/v1/search"
COLL = "modis-11A2-061"
ASSETS = {"day": "LST_Day_1km", "night": "LST_Night_1km"}  # QC는 시험(2024-08) 결과 오차>2K 격자가 0.01%뿐이라 생략 (읽기 절반)
DT = {"day": "uint16", "night": "uint16", "qcd": "uint8", "qcn": "uint8"}
A1K = (231.65635826395834 * 4) ** 2
MINFRAC = 0.15

_tok = {"t": None, "at": 0}
_lock = threading.Lock()


def token():
    with _lock:
        if _tok["t"] is None or time.time() - _tok["at"] > 1800:
            with urllib.request.urlopen("https://planetarycomputer.microsoft.com/api/sas/v1/token/modiseuwest/modis-061-cogs", timeout=60) as r:
                _tok["t"] = json.load(r)["token"]
            _tok["at"] = time.time()
        return _tok["t"]


def search(year, d0="06-01", d1="10-15"):
    body = {"collections": [COLL], "bbox": [125.0, 33.0, 130.0, 38.7],
            "datetime": f"{year}-{d0}/{year}-{d1}", "limit": 1000}
    req = urllib.request.Request(STAC, json.dumps(body).encode(), {"Content-Type": "application/json"})
    for i in range(5):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                feats = json.load(r)["features"]
            break
        except Exception as e:  # noqa: BLE001
            if i == 4:
                raise
            print("  검색 재시도", type(e).__name__, flush=True)
            time.sleep(10 * (i + 1))
    feats = [f for f in feats if (".h27v05." in f["id"] or ".h28v05." in f["id"])]
    # 시작일이 d0~d1 사이인 합성만
    return [f for f in feats if f"{year}-{d0}" <= f["properties"]["start_datetime"][:10] <= f"{year}-{d1}"]


def read_asset(href, rows, cols, r0, c0, h, w):
    for i in range(6):
        try:
            with rasterio.open(href + "?" + token()) as src:
                a = src.read(1, window=Window(c0, r0, w, h))
            return a[rows - r0, cols - c0]
        except Exception as e:  # noqa: BLE001
            if i == 5:
                raise
            print("  재시도", type(e).__name__, str(e)[:100].replace("se=", "").split("?")[0], flush=True)
            time.sleep(5 * (i + 1))
            with _lock:
                _tok["t"] = None


def cells():
    path = os.path.join(OUT, "cells.csv")
    if os.path.exists(path):
        return pd.read_csv(path)
    px = pd.read_csv(os.path.join(ROOT, "db", "clean", "rice", "paddy_modis.csv"))
    px["c1"], px["r1"] = px.col // 4, px.row // 4
    f = (px.groupby(["c1", "r1"]).paddy_m2.sum() / A1K).rename("frac1k")
    s = px.groupby(["c1", "r1", "sido", "sigun"]).paddy_m2.sum().reset_index().sort_values("paddy_m2")
    s = s.groupby(["c1", "r1"]).tail(1).drop(columns="paddy_m2").merge(f.reset_index(), on=["c1", "r1"])
    s = s[s.frac1k >= MINFRAC].sort_values(["r1", "c1"]).reset_index(drop=True)
    s.insert(0, "cell", np.arange(len(s)))
    os.makedirs(OUT, exist_ok=True)
    s.to_csv(path, index=False)
    return s


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--years", default="2002-2026")
    ap.add_argument("--threads", type=int, default=4)
    ap.add_argument("--test", action="store_true", help="한 합성·한 타일만 읽어 보고 끝")
    a = ap.parse_args()
    y0, y1 = (int(x) for x in a.years.split("-"))
    os.makedirs(OUT, exist_ok=True)
    cl = cells()
    cg, rg = cl.c1.values, cl.r1.values
    tiles = {}
    for h, v in ((27, 5), (28, 5)):
        m = (cg // 1200 == h) & (rg // 1200 == v)
        idx = np.where(m)[0]
        lc, lr = cg[idx] - h * 1200, rg[idx] - v * 1200
        tiles[f"h{h}v{v:02d}"] = (idx, lr, lc, lr.min(), lc.min(), lr.max() - lr.min() + 1, lc.max() - lc.min() + 1)
    print("논 1km 격자", len(cl), {k: (len(t[0]), t[5], t[6]) for k, t in tiles.items()}, flush=True)

    if a.test:
        feats = search(y0, "08-01", "08-08")
        f = [x for x in feats if "h28v05" in x["id"]][0]
        idx, lr, lc, r0, c0, h, w = tiles["h28v05"]
        t0 = time.time()
        out = {k: read_asset(f["assets"][asset]["href"], lr, lc, r0, c0, h, w) for k, asset in ASSETS.items()}
        print(f["id"], f"{time.time() - t0:.1f}초", {k: (v.dtype, int((v > 0).sum()), int(v.max())) for k, v in out.items()})
        n = out["night"][out["night"] > 0] * 0.02 - 273.15
        d = out["day"][out["day"] > 0] * 0.02 - 273.15
        print("밤 LST ℃ 분위", np.percentile(n, [5, 50, 95]).round(1), "낮", np.percentile(d, [5, 50, 95]).round(1))
        print("QC_Night 값 빈도", dict(zip(*np.unique(out["qcn"], return_counts=True))))
        return

    for year in range(y0, y1 + 1):
        path = os.path.join(OUT, f"lst_{year}.npz")
        if os.path.exists(path):
            print(year, "있음, 건너뜀", flush=True)
            continue
        t_start = time.time()
        feats = search(year)
        if not feats:
            print(year, "합성 없음", flush=True)
            continue
        comps = sorted({(f["id"][:7], f["properties"]["start_datetime"][:10]) for f in feats}, key=lambda c: (c[1], c[0]))
        arr = {k: np.zeros((len(comps), len(cl)), DT[k]) for k in ASSETS}
        jobs = []
        for f in feats:
            ci = comps.index((f["id"][:7], f["properties"]["start_datetime"][:10]))
            tile = f["id"].split(".")[2]
            for k, asset in ASSETS.items():
                if asset in f["assets"]:
                    jobs.append((ci, tile, k, f["assets"][asset]["href"]))

        def run(job):
            ci, tile, k, href = job
            idx, lr, lc, r0, c0, h, w = tiles[tile]
            arr[k][ci, idx] = read_asset(href, lr, lc, r0, c0, h, w)

        with ThreadPoolExecutor(a.threads) as ex:
            for i, _ in enumerate(ex.map(run, jobs)):
                if (i + 1) % 80 == 0:
                    print(f"  {year}: {i + 1}/{len(jobs)}", flush=True)
        np.savez_compressed(path + ".tmp.npz", comp=np.array([f"{s}|{d}" for s, d in comps]), **arr)
        os.replace(path + ".tmp.npz", path)
        print(f"{year}: 합성 {len(comps)}개, 읽기 {len(jobs)}회, {time.time() - t_start:.0f}초", flush=True)
    print("완료", dt.datetime.now().isoformat(timespec="seconds"), flush=True)


if __name__ == "__main__":
    main()
