"""재배면적 조사(8월 말) 전 시점(7/31 · 8/15)의 면적 — 11-13 채택(RESULTS.md '면적 미리 맞추기', areafc/test_area.py와 같은 계산).

전국 면적 변화 d_t = log(A_t/A_{t−1})를 그 해 전 자료(1990~)로 맞춘 OLS로 예측:
  d ~ 1 + tr3(직전 3년 평균 변화) + pq4(쌀 농가판매가격지수 4분기 전년 대비, log P_Q4(t−1) − log P_Q4(t−2))
수확기 쌀값이 오른 이듬해에는 면적이 덜 줄고, 내린 이듬해에는 더 준다. 전국 값을 시도 · 시군에 똑같이 곱한다.
쌀값 자료가 없으면 tr3만, 그것도 없으면 0(작년 그대로).
재현(2013~26): 전국 면적 오차 작년 그대로 1.97% → 추세만 1.25% → 추세+쌀값 0.91%, 8도 2.46 → 1.89 → 1.67%.
"""
import os

import numpy as np
import pandas as pd

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PRICE = os.path.join(R, "areafc", "data", "farm_price_index_q.csv")
START = 1990


def _rice_price():
    if not os.path.exists(PRICE):
        return pd.Series(dtype=float)
    p = pd.read_csv(PRICE, dtype={"q": str})
    p = p[(p.itm == "농가판매가격지수") & (p.item == "미곡")]
    a, b = p[p.tbl == "DT_1J50"].set_index("q").v, p[p.tbl == "DT_1J60"].set_index("q").v
    ov = a.index.intersection(b.index)
    a = a * (b[ov].mean() / a[ov].mean())
    return pd.concat([a[a.index < b.index.min()], b]).sort_index()


def dhat(nat_area, years):
    """nat_area: Series(연도 → 전국 논벼 면적, 확정). 반환: {연도: 예측 log 변화}. 그 해 전 자료만 쓴다."""
    A = nat_area.dropna().sort_index()
    d = np.log(A / A.shift(1))
    rice = _rice_price()
    idx = range(int(A.index.min()) + 1, max(years) + 1)
    f = pd.DataFrame(index=idx)
    f["d"] = d.reindex(f.index)
    f["tr3"] = f.d.shift(1).rolling(3).mean()
    f["pq4"] = [np.log(rice.get(f"{y - 1}04", np.nan) / rice.get(f"{y - 2}04", np.nan)) if len(rice) else np.nan for y in f.index]
    out = {}
    for Y in years:
        if Y not in f.index or pd.isna(f.loc[Y, "tr3"]):
            out[Y] = 0.0
            continue
        cols = ["tr3", "pq4"] if pd.notna(f.loc[Y, "pq4"]) else ["tr3"]
        tr = f[(f.index >= START) & (f.index < Y)].dropna(subset=["d"] + cols)
        if len(tr) < 10:
            out[Y] = float(f.loc[Y, "tr3"])
            continue
        b = np.linalg.lstsq(np.c_[np.ones(len(tr)), tr[cols].values], tr.d.values, rcond=None)[0]
        out[Y] = float(np.r_[1, f.loc[Y, cols].values.astype(float)] @ b)
    return out
