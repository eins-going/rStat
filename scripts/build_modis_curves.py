"""MODIS 논 격자 NDVI → 시군·시도·전국 연도별 생육 곡선(합성 시기별 중앙값).

입력: db/raw/modis/vi_{year}.npz, db/clean/rice/paddy_modis.csv
출력: db/clean/rice/modis_curves.csv  (level[sigun/sido/nation], sido, sigun, y, doy, ndvi, n)
  - doy: 합성 시작일의 day-of-year (Terra·Aqua가 번갈아 8일 간격)
  - ndvi: 논 비율 0.7 이상·한 시군 비중 0.6 이상 격자 중 품질 양호(신뢰도 0·1) 값의 중앙값
  - n: 쓴 격자 수 (n이 적으면 화면에서 흐리게)
주의: Planetary Computer에 2025년 7~10월 MODIS가 없다(그 시기는 빈칸).
"""
import glob
import os
import re

import numpy as np
import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILL = -32768
px = pd.read_csv(os.path.join(ROOT, "db/clean/rice/paddy_modis.csv"))
rows = []
for path in sorted(glob.glob(os.path.join(ROOT, "db/raw/modis/vi_*.npz"))):
    y = int(re.search(r"vi_(\d{4})", path).group(1))
    z = np.load(path)
    meta = pd.DataFrame(z["pix"], columns=["col", "row"]).merge(px, on=["col", "row"], how="left")
    keep = ((meta.frac >= 0.7) & (meta.share >= 0.6)).values
    ok = (z["ndvi"] != FILL) & np.isin(z["rel"], [0, 1])
    v = np.where(ok, z["ndvi"] / 1e4, np.nan)[:, keep]
    sido = meta.sido.values[keep]; sigun = meta.sigun.values[keep]
    for ci, comp in enumerate(z["comp"]):
        doy = pd.Timestamp(str(comp).split("|")[1]).dayofyear
        s = pd.DataFrame({"sido": sido, "sigun": sigun, "v": v[ci]}).dropna()
        if s.empty:
            continue
        for (a, b), g in s.groupby(["sido", "sigun"]):
            rows.append(("sigun", a, b, y, doy, g.v.median(), len(g)))
        for a, g in s.groupby("sido"):
            rows.append(("sido", a, "", y, doy, g.v.median(), len(g)))
        rows.append(("nation", "", "", y, doy, s.v.median(), len(s)))
    print(y, flush=True)
out = pd.DataFrame(rows, columns=["level", "sido", "sigun", "y", "doy", "ndvi", "n"])
out["ndvi"] = out.ndvi.round(3)
out.to_csv(os.path.join(ROOT, "db/clean/rice/modis_curves.csv"), index=False)
print("저장", len(out), "행")
