"""8/15 ~ 9/14 시점 시도 â 보정 — 11-13 채택(RESULTS.md '농업기상 전체(217곳) 재평가', agro/diag2026.py와 같은 계산).

특징 d_rs_fill: 등숙기(출수일 H ~ H+40, 예측시점까지)의 Σ(농업기상 실측 일사 − ASOS 일조로 추정해 모델에 넣은 일사) [MJ/m2],
  시군(30km 안 농업기상 관측소 3곳) → 시도 논 면적 가중. agro/features.py의 d_rs_fill과 같은 값.
보정: M4 잔차(a − â)를 d_rs_fill 하나로 릿지(λ10, 표준화 원점, 가중 √면적). 그 해 전 자료만, 2015년부터(그 전은 학습 해가 모자라 그대로).
  특징이 없는 시도·해는 보정 0 (시즌 중 농업기상을 못 받았을 때도 예측은 그대로 나온다).
적용 시점: 0815 ≤ 시점 < 0915 (8/15 · 9/1과 그 사이 주간 최신). 9/15 뒤는 효과가 기준에 못 미쳐 넣지 않는다.
재현(2015~26): 8도 RMSE 8/15 17.20 → 16.76 · 9/1 16.23 → 15.97kg, 8도합 전국 MAE 10.88 → 10.13 · 8.54 → 8.15.
사후에 고른 시점이라 2027 확정 뒤 다시 본다: 2015~2027 8도 RMSE가 보정 없는 값보다 나쁘면 뺀다.
"""
import importlib.util
import os

import numpy as np
import pandas as pd

R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AG = os.path.join(R, "agro")
CM = os.path.join(R, "cropmodel")
P8 = ["31", "32", "33", "34", "35", "36", "37", "38"]
LO, HI = "0815", "0915"
FIRST = 2015
CACHE = os.path.join(R, "prod", "agro_drs_sido.csv")


def applies(asof):
    return len(asof) == 4 and asof.isdigit() and LO <= asof < HI


def features(asofs):
    """시도 d_rs_fill [sc, y, asof, d_rs_fill, cov]. 농업기상 자료가 없으면 빈 표."""
    asofs = [a for a in asofs if applies(a)]
    empty = pd.DataFrame(columns=["sc", "y", "asof", "d_rs_fill", "cov"])
    if not asofs or not os.path.exists(os.path.join(AG, "data", "agro_daily.csv.gz")):
        return empty
    spec = importlib.util.spec_from_file_location("agro_features", os.path.join(AG, "features.py"))
    F = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(F)
    a, pc = F.sigun_daily()
    wx = pd.read_pickle(os.path.join(CM, "wx_sigun.pkl"))
    wx = wx[(wx.y >= a.y.min()) & (wx.doy.between(150, 300))][["sc", "stem", "y", "doy", "rs"]]
    a = a.merge(wx, on=["sc", "stem", "y", "doy"], how="left")
    a["d_rs"] = a.rs_a - a.rs
    cs = pd.read_csv(os.path.join(CM, "components_sigun_fixed.csv.gz"), dtype={"sc": str, "asof": str},
                     usecols=["sc", "stem", "y", "asof", "heading"])
    rows = []
    for asof in asofs:
        h = cs[cs["asof"] == asof][["sc", "stem", "y", "heading"]].rename(columns={"heading": "H"})
        if h.empty:
            continue
        cut = pd.Timestamp(2001, int(asof[:2]), int(asof[2:])).dayofyear
        v = F.window_sum(a.merge(h, on=["sc", "stem", "y"]), "d_rs", *F.WIN["fill"], cut).rename("d_rs_fill").reset_index()
        v = v.merge(pc[["sc", "stem", "paddy_ha"]], on=["sc", "stem"], how="left")
        for (sc, y), g in v.groupby(["sc", "y"]):
            q = g.dropna(subset=["d_rs_fill"])
            rows.append({"sc": sc, "y": y, "asof": asof,
                         "d_rs_fill": np.average(q.d_rs_fill, weights=q.paddy_ha) if q.paddy_ha.sum() > 0 else np.nan,
                         "cov": q.paddy_ha.sum() / g.paddy_ha.sum()})
    f = pd.DataFrame(rows) if rows else empty
    f.round(4).to_csv(CACHE, index=False)
    return f


def _ridge0(X, y, w, lam=10.0):
    sd = X.std(0) + 1e-9
    Z = X / sd
    b = np.linalg.solve(Z.T @ (Z * w[:, None]) + lam * np.eye(X.shape[1]), Z.T @ (w * y))
    return b / sd


def adjust(d, f, years):
    """d: sc, y, a(모르면 NaN), ahat, area (8도). f: sc, y, d_rs_fill (그 시점). 반환: 같은 순서의 보정 â."""
    d = d.reset_index(drop=True).merge(f[["sc", "y", "d_rs_fill"]], on=["sc", "y"], how="left")
    n = d.ahat.copy()
    for Y in years:
        if Y < FIRST:
            continue
        tr = d[(d.y < Y) & d.sc.isin(P8)].dropna(subset=["d_rs_fill", "a", "ahat"])
        if tr.y.nunique() < 3:
            continue
        b = _ridge0(tr[["d_rs_fill"]].values, (tr.a - tr.ahat).values, np.sqrt(tr.area / tr.area.mean()).values)
        te = d.y == Y
        n[te] = d.ahat[te] + np.nan_to_num(d.d_rs_fill[te].values) * b[0]
    return n.values
