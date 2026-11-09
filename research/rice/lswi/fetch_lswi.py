"""MODIS 8일 반사율(MOD09A1 Terra + MYD09A1 Aqua, 500m)에서 논 격자의 적·근적외·단파적외 반사율을 뽑는다.

목적 (미리 정한 가설, 결과를 보기 전에 적음 2026-11-09 02:55)
  Sentinel-2 갈래(2017~2025, 7개 연도)에서 '9/1~15 LSWI 해 평균'이 전국 단수 편차와 r +0.90이었다.
  이 관계가 진짜라면 S2가 없던 2000~2016년 MODIS LSWI에서도 같은 부호로 나타나야 한다(독립 연도 검증).
  1차 지표 = 시작일 8/29·9/6 합성(doy 241·249, 윤년 240·248)의 LSWI = (b02−b06)/(b02+b06), 구름 없는 논 격자 중앙값.
  판정: 2000~2016 전국 상관이 양(+)이고, 작물모델 9/15 실시간 학습에 넣어 시군 skill이 오르면 채택.

- 논 500m 격자: paddy_modis.csv(250m) → col//2,row//2, 논 면적/격자 면적 ≥ 0.5
- 자산: sur_refl_b01·b02·b06·b07(int16, ×1e-4), sur_refl_state_500m(uint16; 구름 비트 0~1, 그림자 2, 권운 8~9)
- 기간: 해마다 시작일 7/28~9/30 합성
- 저장: data/sr_{year}.npz (comp, b01,b02,b06,b07,state: [합성, n]) + data/cells.csv
사용: .venv/bin/python research/rice/lswi/fetch_lswi.py --years 2000-2026 --threads 4
"""
import argparse, json, os, sys, threading, time, urllib.request
from concurrent.futures import ThreadPoolExecutor
import numpy as np, pandas as pd, rasterio
from rasterio.windows import Window

sys.path.insert(0, "/home/eins/project/rStat/research/rice/lst")
import fetch_lst as L  # token(), read_asset() 재사용

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/home/eins/project/rStat"
OUT = os.path.join(HERE, "data")
COLL = "modis-09A1-061"
ASSETS = ["sur_refl_b01", "sur_refl_b02", "sur_refl_b06", "sur_refl_b07", "sur_refl_state_500m"]
A500 = (231.65635826395834 * 2) ** 2


def cells():
    p = os.path.join(OUT, "cells.csv")
    if os.path.exists(p):
        return pd.read_csv(p)
    px = pd.read_csv(os.path.join(ROOT, "db/clean/rice/paddy_modis.csv"))
    px["c5"], px["r5"] = px.col // 2, px.row // 2
    f = (px.groupby(["c5", "r5"]).paddy_m2.sum() / A500).rename("frac")
    s = px.groupby(["c5", "r5", "sido", "sigun"]).paddy_m2.sum().reset_index().sort_values("paddy_m2")
    s = s.groupby(["c5", "r5"]).tail(1).drop(columns="paddy_m2").merge(f.reset_index(), on=["c5", "r5"])
    s = s[s.frac >= 0.5].sort_values(["r5", "c5"]).reset_index(drop=True)
    os.makedirs(OUT, exist_ok=True)
    s.to_csv(p, index=False)
    return s


def search(year):
    body = {"collections": [COLL], "bbox": [125.0, 33.0, 130.0, 38.7], "datetime": f"{year}-07-28/{year}-09-30", "limit": 1000}
    req = urllib.request.Request(L.STAC, json.dumps(body).encode(), {"Content-Type": "application/json"})
    for i in range(5):
        try:
            with urllib.request.urlopen(req, timeout=120) as r:
                feats = json.load(r)["features"]
            break
        except Exception:
            if i == 4: raise
            time.sleep(10 * (i + 1))
    feats = [f for f in feats if (".h27v05." in f["id"] or ".h28v05." in f["id"])]
    return [f for f in feats if f"{year}-07-28" <= f["properties"]["start_datetime"][:10] <= f"{year}-09-30"]


def main():
    ap = argparse.ArgumentParser(); ap.add_argument("--years", default="2000-2026"); ap.add_argument("--threads", type=int, default=4)
    a = ap.parse_args(); y0, y1 = (int(x) for x in a.years.split("-"))
    cl = cells(); cg, rg = cl.c5.values, cl.r5.values
    tiles = {}
    for h, v in ((27, 5), (28, 5)):
        idx = np.where((cg // 2400 == h) & (rg // 2400 == v))[0]
        lc, lr = cg[idx] - h * 2400, rg[idx] - v * 2400
        tiles[f"h{h}v{v:02d}"] = (idx, lr, lc, lr.min(), lc.min(), lr.max() - lr.min() + 1, lc.max() - lc.min() + 1)
    print("논 500m 격자", len(cl), {k: (len(t[0]), t[5], t[6]) for k, t in tiles.items()}, flush=True)
    for y in range(y0, y1 + 1):
        path = os.path.join(OUT, f"sr_{y}.npz")
        if os.path.exists(path):
            continue
        t0 = time.time(); feats = search(y)
        comps = sorted({(f["id"][:3] + "|" + f["properties"]["start_datetime"][:10]) for f in feats}, key=lambda c: (c[4:], c))
        ci = {c: i for i, c in enumerate(comps)}
        arr = {k: np.zeros((len(comps), len(cl)), "uint16" if "state" in k else "int16") for k in ASSETS}
        for k in ASSETS:
            if "state" not in k: arr[k][:] = -28672
        jobs = []
        for f in feats:
            tile = "h27v05" if ".h27v05." in f["id"] else "h28v05"
            c = f["id"][:3] + "|" + f["properties"]["start_datetime"][:10]
            for k in ASSETS:
                if k in f["assets"]:
                    jobs.append((ci[c], tile, k, f["assets"][k]["href"]))
        def run(j):
            i, tile, k, href = j
            idx, lr, lc, r0, c0, hh, ww = tiles[tile]
            arr[k][i, idx] = L.read_asset(href, lr, lc, r0, c0, hh, ww)
        with ThreadPoolExecutor(a.threads) as ex:
            list(ex.map(run, jobs))
        np.savez_compressed(path + ".tmp.npz", comp=np.array(comps), **{k.replace("sur_refl_", ""): v for k, v in arr.items()})
        os.replace(path + ".tmp.npz", path)
        print(f"{y}: 합성 {len(comps)}개, 읽기 {len(jobs)}회, {time.time() - t0:.0f}초", flush=True)


if __name__ == "__main__":
    main()
