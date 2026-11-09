"""10/1 시도 â 보정 — 11-10 채택(explore/README '결합 시험 사전 등록', explore/combo.py와 같은 계산).

N: NCPMS 논벼 예찰 도열병(잎·이삭) 9/16 회차 '같은 해 8도 평균 대비'(ncpms/feat_sido.csv np_blast_c)로 M4 잔차를 릿지(λ10, 표준화 원점).
   그 해 전 자료만, 3년 이상 쌓인 해부터. 평년에는 거의 0, 발생 해(2020 강원·2021 전북)에 낮춰 줌.
P: N 적용 뒤 예측의 실시간 잔차 직전 2년 평균 × ρ (그 해 전 쌍으로 추정, 0~1)에서 그해 8도 면적가중 평균을 뺀 것
   (시도 사이 재배분만, 8도 공통 이동 없음 → 전국은 N만큼만 움직임). 11-10 사용자 "전국 오차도 지켜야" → explore/combo_center.py.
재현(2013~25): 8도 시도 RMSE 13.53 → 12.84kg, 시군 skill +0.310 → +0.325, 8도 합 MAE 5.71 → 5.53·RMSE 7.90 → 7.59, 13년 중 10년 개선.
"""
import numpy as np
import pandas as pd

P8 = ["31", "32", "33", "34", "35", "36", "37", "38"]


def _ridge0(X, y, w, lam=10.0):
    sd = X.std(0) + 1e-9
    Z = X / sd
    b = np.linalg.solve(Z.T @ (Z * w[:, None]) + lam * np.eye(X.shape[1]), Z.T @ (w * y))
    return b / sd


def adjust(d, nc, years):
    """d: sc, y, a(모르면 NaN), ahat, area (8도). nc: sc, y, np_blast_c. 반환: 같은 순서의 보정 â."""
    d = d.reset_index(drop=True).merge(nc[["sc", "y", "np_blast_c"]], on=["sc", "y"], how="left")
    n = d.ahat.copy()
    for Y in years:
        tr = d[(d.y < Y) & d.sc.isin(P8)].dropna(subset=["np_blast_c", "a"])
        te = d.y == Y
        if tr.y.nunique() < 3:
            continue
        b = _ridge0(tr[["np_blast_c"]].values, (tr.a - tr.ahat).values, np.sqrt(tr.area / tr.area.mean()).values)
        n[te] = d.ahat[te] + np.nan_to_num(d.np_blast_c[te].values) * b[0]
    d["n"] = n
    o = d.sort_values(["sc", "y"]).copy()
    o["r"] = o.a - o.n
    o["lag"] = o.groupby("sc").r.transform(lambda s: s.shift(1).rolling(2, min_periods=1).mean())
    out = o.n.copy()
    for Y in years:
        past = o[(o.y < Y) & o.lag.notna() & o.r.notna() & o.sc.isin(P8)]
        rho = float(np.clip(np.sum(past.lag * past.r) / np.sum(past.lag ** 2), 0, 1)) if len(past) >= 16 else 0.0
        te = o.y == Y
        sh = rho * o.lag[te].fillna(0)
        w = o.area[te].fillna(o.area.mean())
        sh = sh - np.average(sh, weights=w) if w.sum() > 0 else sh  # 8도 공통 이동은 빼고 시도 사이 재배분만 (전국 지키기)
        out[te] = o.n[te] + sh
    return out.reindex(d.index).values
