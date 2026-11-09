"""시도 단위 연도 신호 모델: 시도 패널(8개 도 × 연도)에서 단수 편차 a를 기상·생육 지표로 예측
→ 시군 예측 = 시군 평년 × (1 + 그 시도 â). 모든 학습·조정은 y 이전 해만(실시간).

사용: python prov_model.py  (결과를 results_prov.json 에 저장하고 표로 출력)
"""
import json
import os
import sys
import warnings

import numpy as np
import pandas as pd

sys.path.insert(0, "/home/eins/project/rStat/research/rice")
sys.path.append("/home/eins/project/rStat/research/rice/pheno/_pylib")
warnings.filterwarnings("ignore")
import common  # noqa: E402

OUT = "/home/eins/project/rStat/research/rice/pheno"
PROV = ["31", "32", "33", "34", "35", "36", "37", "38"]
PMAP = {"11": "31", "23": "31", "21": "38", "26": "38", "22": "37", "24": "36", "25": "34", "29": "34"}
TEST = list(range(2013, 2026))
SW_INNER = False


# ---------- 정답 ----------
def prov_targets():
    k = common._kosis()
    p = k[k.code.isin(PROV)].sort_values("y").copy()
    p["sc"] = p.code
    p["base"] = p.groupby("sc")["yield"].transform(common._olympic)
    p["a"] = p["yield"] / p["base"] - 1
    return p[["sc", "y", "yield", "area", "base", "a"]].dropna()


T = common.targets()
T["pv"] = T.sc.map(lambda s: PMAP.get(s, s))
PT = prov_targets()


# ---------- 지표 ----------
def load_feats():
    wx = pd.read_csv(os.path.join(OUT, "wx_feats.csv"), dtype={"sc": str, "stem": str, "asof": str})
    cent = common.paddy_centroids()[["sc", "stem", "paddy_ha"]]
    wx = wx.merge(cent, on=["sc", "stem"], how="left")
    wx["pv"] = wx.sc.map(lambda s: PMAP.get(s, s))
    wx = wx[wx.pv.isin(PROV)]
    cols = [c for c in wx.columns if c not in ("sc", "stem", "y", "asof", "paddy_ha", "pv")]
    pw = wx.groupby(["pv", "y", "asof"]).apply(lambda g: pd.Series(np.average(g[cols], axis=0, weights=g.paddy_ha), index=cols)).reset_index()
    ph = pd.read_csv(os.path.join(OUT, os.environ.get("PHENO", "pheno_feats.csv")), dtype={"sc": str, "asof": str})
    ph = ph[(ph["level"] == "sido") & ph.sc.isin(PROV)].drop(columns=["level", "stem"]).rename(columns={"sc": "pv"})
    ph.columns = ["pv", "y", "asof"] + ["m_" + c for c in ph.columns[3:]]
    return pw, ph


def anomalize(df, cols, key="pv"):
    """특징을 같은 시도 과거 해 평균(그 해 이전 전부) 대비 편차로 — 실시간."""
    df = df.sort_values("y").copy()
    for c in cols:
        m = df.groupby(key)[c].transform(lambda s: s.shift(1).expanding(min_periods=3).mean())
        df[c + "_d"] = df[c] - m
    return df


# ---------- 모델 ----------
from sklearn.linear_model import Ridge, ElasticNet  # noqa: E402
from sklearn.ensemble import HistGradientBoostingRegressor, RandomForestRegressor  # noqa: E402


def zfit(X):
    mu, sd = np.nanmean(X, 0), np.nanstd(X, 0)
    sd[~(sd > 1e-9)] = 1
    return mu, sd


def make(kind, hp):
    if kind == "ridge":
        return Ridge(alpha=hp)
    if kind == "enet":
        return ElasticNet(alpha=hp, l1_ratio=0.5, max_iter=20000)
    if kind == "hgb":
        return HistGradientBoostingRegressor(max_iter=hp, learning_rate=0.05, max_depth=2, min_samples_leaf=10, l2_regularization=1.0)
    if kind == "rf":
        return RandomForestRegressor(n_estimators=300, min_samples_leaf=hp, max_features=0.33, n_jobs=2, random_state=0)


GRID = {"ridge": [1, 3, 10, 30, 100, 300, 1000], "enet": [0.001, 0.003, 0.01, 0.03], "hgb": [50, 100, 200], "rf": [5, 10, 20]}


def fit_predict(kind, hp, Xtr, ytr, Xte, fit_intercept=True, sw=None):
    mu, sd = zfit(Xtr)
    Xtr = np.nan_to_num((Xtr - mu) / sd)
    Xte = np.nan_to_num((Xte - mu) / sd)
    m = make(kind, hp)
    if kind in ("ridge", "enet"):
        m.set_params(fit_intercept=fit_intercept)
    m = m.fit(Xtr, ytr, sample_weight=sw)
    return m.predict(Xte), m


def inner_cv(kind, Xtr, ytr, yrs, w):
    """연도 묶음 교차검증(학습 해 안에서만)으로 하이퍼파라미터 선택."""
    uy = np.unique(yrs)
    folds = np.array_split(uy[::-1], min(8, len(uy)))
    best, bs = None, np.inf
    for hp in GRID[kind]:
        err = 0
        for f in folds:
            te = np.isin(yrs, f)
            p, _ = fit_predict(kind, hp, Xtr[~te], ytr[~te], Xtr[te], sw=(w[~te] if SW_INNER else None))
            err += np.sum(w[te] * (p - ytr[te]) ** 2)
        if err < bs:
            best, bs = hp, err
    return best, bs


def run(df, cols, kind="ridge", start=1985, label="", center=True, verbose=True, hinge=(), qs=(0.25,), hinge_pooled=False, icpt="all", decay=None):
    """df: pv, y, a(정답) + cols. 실시간 예측 → 시군 평가."""
    preds, coefs = [], []
    df = df.copy()  # 정답 없는 해(2026)도 예측 대상으로 남김
    for Y in TEST:
        tr = df[(df.y < Y) & (df.y >= start) & df.a.notna()]
        te = df[df.y == Y]
        if te.empty:
            continue
        Xtr, Xte = tr[cols].values.astype(float), te[cols].values.astype(float)
        ytr = tr.a.values.copy()
        off = 0.0
        if icpt == "recent10":
            off = tr[tr.y >= Y - 10].a.mean()
        elif icpt == "zero":
            off = 0.0
        if icpt != "all":
            ytr = ytr - off
        if center:
            # 시도별 특징 평균 빼기(학습 해 기준) = 시도 고정효과
            for c_i, c in enumerate(cols):
                mu = tr.groupby("pv")[c].mean()
                Xtr[:, c_i] -= tr.pv.map(mu).values
                Xte[:, c_i] -= te.pv.map(mu).fillna(0).values
        w = (tr.area.values / tr.area.mean()) if decay is None else 0.5 ** ((Y - 1 - tr.y.values) / decay)
        swf = None if decay is None else w
        globals()["SW_INNER"] = decay is not None
        best = (None, None, np.inf, Xtr, Xte)
        for q in (qs if hinge else [None]):
            A, B = Xtr, Xte
            if hinge:
                hs_tr, hs_te = [], []
                for c in hinge:
                    if hinge_pooled:  # 시도별 표준화 후 같은 분위수
                        mu, sd = tr.groupby("pv")[c].mean(), tr.groupby("pv")[c].std()
                        ztr = (tr[c] - tr.pv.map(mu)) / tr.pv.map(sd)
                        zte = (te[c] - te.pv.map(mu)) / te.pv.map(sd)
                        qq = ztr.quantile(q)
                        hs_tr.append(np.minimum(ztr - qq, 0).values); hs_te.append(np.minimum(zte - qq, 0).values)
                    else:
                        qp = tr.groupby("pv")[c].quantile(q)
                        hs_tr.append(np.minimum(tr[c] - tr.pv.map(qp), 0).values)
                        hs_te.append(np.minimum(te[c] - te.pv.map(qp), 0).values)
                A = np.c_[Xtr, np.array(hs_tr).T]
                B = np.c_[Xte, np.array(hs_te).T]
            hp, err = inner_cv(kind, A, ytr, tr.y.values, w)
            if err < best[2]:
                best = (q, hp, err, A, B)
        q, hp, _, A, B = best

        p, m = fit_predict(kind, hp, A, ytr, B, fit_intercept=(icpt == "all"), sw=swf)
        preds.append(pd.DataFrame({"pv": te.pv.values, "y": Y, "ahat": p + off}))
        if kind in ("ridge", "enet"):
            coefs.append(pd.Series(m.coef_, index=list(cols) + [h + "_hinge" for h in hinge], name=Y))
    P = pd.concat(preds)
    sg = T.merge(P, on=["pv", "y"], how="inner")
    sg["pred_yield"] = sg.base * (1 + sg.ahat)
    r = common.evaluate(sg[["y", "sc", "stem", "pred_yield"]], label, verbose=verbose)
    # 시도 단위 성적
    pp = PT.merge(P.rename(columns={"pv": "sc"}), on=["sc", "y"])
    e = (pp.base * (1 + pp.ahat) - pp["yield"])
    e0 = (pp.base - pp["yield"])
    r["prov_rmse"] = round(float(np.sqrt(np.average(e ** 2, weights=pp.area))), 2)
    r["prov_rmse_base"] = round(float(np.sqrt(np.average(e0 ** 2, weights=pp.area))), 2)
    r["prov_skill"] = round(1 - r["prov_rmse"] / r["prov_rmse_base"], 3)
    r["prov_corr"] = round(float(np.corrcoef(pp.ahat, pp.a)[0, 1]), 3)
    if verbose:
        print(f"    시도 RMSE {r['prov_rmse']} (평년 {r['prov_rmse_base']}, skill {r['prov_skill']:+.3f}) corr {r['prov_corr']}")
    C = pd.concat(coefs, axis=1) if coefs else None
    return r, P, C
