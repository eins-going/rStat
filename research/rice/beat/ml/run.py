"""사전 등록 변형(README) 실시간 검증 → preds_all_{asof}.csv, results.json, pred_sido_{asof}.csv.

사용: OMP_NUM_THREADS=2 memcap -m 3G python3 run.py [asof ...]
"""
import json
import os
import sys
import time
import warnings

import numpy as np
import pandas as pd

warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__))
RICE = "/home/eins/project/rStat/research/rice"
sys.path[:0] = [HERE, os.path.join(RICE, "pheno/_pylib"), os.path.join(RICE, "cropmodel"), RICE]
import lightgbm as lgb  # noqa: E402
from sklearn.ensemble import RandomForestRegressor  # noqa: E402
from sklearn.gaussian_process import GaussianProcessRegressor  # noqa: E402
from sklearn.gaussian_process.kernels import RBF, ConstantKernel, DotProduct, WhiteKernel  # noqa: E402
from sklearn.kernel_ridge import KernelRidge  # noqa: E402

import common  # noqa: E402
import evalx as E  # noqa: E402
import model as M  # noqa: E402

PROV = E.PROV
START = 1985
M4 = ["cold_mei", "heat_ant", "rs_pre", "rs_pre_def", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "rain_hv", "wet_head"]
NEG = ["cold_mei", "cold_q", "heat_ant", "sunless_pre", "sunless_post", "wind15", "wind_sum", "gust_max", "rain_hv", "wet_head",
       "w15_cal", "gmax_cal"]
POS = ["rs_pre", "rs_pre_def", "ptq_fill"]
ID = ["sc", "stem", "y", "asof", "paddy_ha"]
YEARS = [int(x) for x in os.environ["YRS"].split(",")] if os.environ.get("YRS") else list(range(1996, 2027))
INNER = 8


def anomalies(f, keys):
    """그해 값 − 같은 단위 직전 5년 완전 시즌 평균."""
    cols = [c for c in f.columns if c not in ID]
    full = f[f["asof"] == "full"].set_index(keys + ["y"])[cols].sort_index()
    prev = full.groupby(level=list(range(len(keys)))).transform(lambda s: s.shift(1).rolling(5, min_periods=5).mean())
    out = {}
    for tag, g in f.groupby("asof"):
        g = g.set_index(keys + ["y"])[cols].sort_index()
        a = (g - prev.reindex(g.index)).reset_index()
        a["rs_pre_def"] = a.rs_pre.clip(upper=0)
        out[tag] = a
    return out


def wts(d):
    return np.sqrt(d.area.values / d.area.mean())


# ---------------- 모델 ----------------
def m4_fit(tr, te):
    p, _, _, _, _ = M.fit_predict(tr, te, M4, 3.0, "cw", w=wts(tr))
    pin, _, _, _, _ = M.fit_predict(tr, tr, M4, 3.0, "cw", w=wts(tr))
    return p, pin


def lgb_model(feats, n, seed=0):
    mono = [(-1 if f in NEG else 1 if f in POS else 0) for f in feats]
    return lgb.LGBMRegressor(objective="regression", num_leaves=4, max_depth=2, learning_rate=0.03, n_estimators=n,
                             min_child_samples=20, reg_lambda=10, colsample_bytree=0.5, subsample=0.8, subsample_freq=1,
                             monotone_constraints=mono, monotone_constraints_method="advanced", n_jobs=2, verbose=-1, random_state=seed)


def g1_multi(tr, te, ext, ns):
    """M4 + LGBM 잔차; ns 횟수별 예측 dict."""
    p, pin = m4_fit(tr, te)
    m = lgb_model(ext, max(ns)).fit(tr[ext].values, tr.a.values - pin, sample_weight=wts(tr))
    return {n: p + (m.predict(te[ext].values, num_iteration=n) if n > 0 else 0) for n in ns}


def g2(tr, te, ext):
    m = lgb_model(ext, 300).fit(tr[ext].values, tr.a.values, sample_weight=wts(tr))
    return m.predict(te[ext].values)


def rf1(tr, te, ext):
    p, pin = m4_fit(tr, te)
    m = RandomForestRegressor(n_estimators=500, min_samples_leaf=15, max_features=0.33, n_jobs=2, random_state=0)
    m.fit(tr[ext].values, tr.a.values - pin, sample_weight=wts(tr))
    return p + m.predict(te[ext].values)


def std(tr, te, feats):
    X, Xt = tr[feats].values, te[feats].values
    mu, sd = X.mean(0), X.std(0) + 1e-9
    return (X - mu) / sd, (Xt - mu) / sd


def gp1(tr, te):
    X, Xt = std(tr, te, M4)
    k = ConstantKernel(1e-3, (1e-6, 1)) * DotProduct(1.0, (1e-3, 1e2)) + ConstantKernel(1e-3, (1e-6, 1)) * RBF(
        np.full(len(M4), 3.0), (0.3, 100)) + WhiteKernel(1e-3, (1e-6, 1e-1))
    ym = np.average(tr.a.values, weights=wts(tr) * 0.5 ** ((tr.y.max() - tr.y.values) / 8))  # 최근 가중 평균을 빼고 학습(M4 절편과 같은 뜻)
    g = GaussianProcessRegressor(k, normalize_y=False, n_restarts_optimizer=1, random_state=0).fit(X, tr.a.values - ym)
    return ym + g.predict(Xt)


def kr_pred(tr, te, alpha, gamma):
    X, Xt = std(tr, te, M4)
    ym = np.average(tr.a.values, weights=wts(tr) * 0.5 ** ((tr.y.max() - tr.y.values) / 8))
    m = KernelRidge(alpha=alpha, kernel="rbf", gamma=gamma).fit(X, tr.a.values - ym, sample_weight=wts(tr))
    return ym + m.predict(Xt)


KR_GRID = [(a, g) for a in (0.3, 1, 3, 10) for g in (0.01, 0.03, 0.1)]


def p1(tr, te):
    p, pin = m4_fit(tr, te)
    r = pd.DataFrame({"sc": tr.sc.values, "r": tr.a.values - pin, "w": 0.5 ** ((tr.y.max() - tr.y.values) / 8)})
    b = r.groupby("sc").apply(lambda g: (g.w * g.r).sum() / (g.w.sum() + 3))
    return p + te.sc.map(b).fillna(0).values


# ---------------- 실행 ----------------
def inner_rmse(D, Y, predict_fn):
    """predict_fn(tr, te) -> dict(key -> pred). 내부 해 Y−8..Y−1 의 8도 면적가중 RMSE dict."""
    errs = {}
    for yi in range(Y - INNER, Y):
        tr = D[(D.y < yi)]
        te = D[D.y == yi]
        if tr.y.nunique() < 6 or te.empty:
            continue
        for k, p in predict_fn(tr, te).items():
            errs.setdefault(k, []).append((te.area.values, (p - te.a.values) * te.base.values))
    out = {}
    for k, v in errs.items():
        w = np.concatenate([x[0] for x in v])
        e = np.concatenate([x[1] for x in v])
        out[k] = np.sqrt(np.average(e ** 2, weights=w))
    return out


def run(asof):
    t0 = time.time()
    fs = pd.read_pickle(os.path.join(HERE, "feats_sido.pkl"))
    an = anomalies(fs, ["sc"])
    ext = [c for c in an["full"].columns if c not in ID]
    st = E.truth()
    D = st.merge(an["full"], on=["sc", "y"]).query("sc in @PROV and y >= @START").dropna(subset=ext + ["a"])
    T = an[asof][an[asof].sc.isin(PROV)].dropna(subset=ext)
    # 시군 패널 (S1)
    fg = pd.read_pickle(os.path.join(HERE, "feats_sigun.pkl"))
    ang = anomalies(fg, ["sc", "stem"])
    tg = common.targets()
    tg = tg[tg.sc.isin(PROV)]
    DG = tg.merge(ang["full"], on=["sc", "stem", "y"]).dropna(subset=ext + ["a"])
    TG = ang[asof][ang[asof].sc.isin(PROV)].dropna(subset=ext)
    area_prev = tg.assign(y=tg.y + 1)[["sc", "stem", "y", "area"]]

    rows, sel = [], {}
    for Y in YEARS:
        tr = D[D.y < Y]
        te = T[T.y == Y].copy()
        if te.empty:
            continue
        te["area"] = 1.0
        o = te[["sc", "y"]].copy()
        r0 = m4_fit(tr, te)[0]
        o["R0"] = r0
        gm = g1_multi(tr, te, ext, [0, 50, 150, 400])
        o["G1"] = gm[150]
        cv = inner_rmse(D[D.y < Y], Y, lambda a, b: g1_multi(a, b, ext, [0, 50, 150, 400]))
        nbest = min(cv, key=cv.get) if cv else 150
        o["G1cv"] = gm[nbest]
        o["G2"] = g2(tr, te, ext)
        o["RF1"] = rf1(tr, te, ext)
        o["GP1"] = gp1(tr, te)
        cvk = inner_rmse(D[D.y < Y], Y, lambda a, b: {g: kr_pred(a, b, *g) for g in KR_GRID})
        kbest = min(cvk, key=cvk.get) if cvk else (1, 0.03)
        o["KR1"] = kr_pred(tr, te, *kbest)
        o["P1"] = p1(tr, te)
        # S1
        trg = DG[DG.y < Y]
        teg = TG[TG.y == Y]
        if trg.y.nunique() >= 5 and not teg.empty:
            m = lgb_model(ext, 300).fit(trg[ext].values, trg.a.values, sample_weight=np.sqrt(trg.area.values / trg.area.mean()))
            pg = teg[["sc", "stem", "y"]].copy()
            pg["p"] = m.predict(teg[ext].values)
            pg = pg.merge(area_prev, on=["sc", "stem", "y"])
            s1 = pg.groupby("sc").apply(lambda g: np.average(g.p, weights=g.area))
            o["S1"] = o.sc.map(s1).values
        else:
            o["S1"] = np.nan
        o["E1"] = o[["R0", "G1", "RF1", "GP1", "KR1"]].mean(axis=1)
        sel[Y] = {"G1cv_n": int(nbest), "KR1": list(kbest)}
        rows.append(o)
        print(f"{asof} {Y} n={nbest} kr={kbest} {time.time() - t0:.0f}s", flush=True)
    P = pd.concat(rows, ignore_index=True)
    # E2: 직전 8년 8도 RMSE 최저 변형
    V = ["R0", "G1", "G1cv", "G2", "RF1", "GP1", "KR1", "P1", "S1"]
    Pm = P.merge(st[["y", "sc", "a", "area", "base"]], on=["y", "sc"], how="left")
    e2 = []
    for Y in sorted(P.y.unique()):
        h = Pm[(Pm.y >= Y - 8) & (Pm.y < Y)].dropna(subset=["a"])
        best, bv = "R0", np.inf
        if h.y.nunique() == 8:
            for v in V:
                if h[v].isna().any():
                    continue
                r = np.sqrt(np.average(((h[v] - h.a) * h.base) ** 2, weights=h.area))
                if r < bv:
                    best, bv = v, r
        sel.setdefault(Y, {})["E2"] = best
        e2.append(P.loc[P.y == Y, best].values)
    P["E2"] = np.concatenate(e2)
    P.round(5).to_csv(os.path.join(HERE, f"preds_all_{asof}.csv"), index=False)
    return P, sel


def to_yield(P, col, st):
    """역사 해: evalx.from_ahat; 2026: 평년 = 2021~25 올림픽, 면적 = 통계청 2026 조사 면적."""
    p = P[["y", "sc", col]].rename(columns={col: "ahat"}).dropna()
    hist = E.from_ahat(p[p.y <= 2025], st)
    p26 = p[p.y == 2026]
    if p26.empty:
        return hist
    s = st[(st.sc != "00") & st.y.between(2021, 2025)].pivot_table(index="sc", columns="y", values="yield")
    base = s.apply(lambda r: np.sort(r.values)[1:-1].mean() if r.notna().sum() == 5 else np.nan, axis=1)
    sf = pd.read_csv(os.path.join(RICE, "statdown/stat_forecast_sido.csv"), dtype={"sido_code": str})
    ar = sf[(sf.year == 2026) & (sf.sido_code != "00")].set_index("sido_code").area_ha
    d = pd.DataFrame({"base": base, "area": ar}).dropna()
    m = p26.set_index("sc").ahat
    a8 = np.average(m.reindex(PROV), weights=d.area.reindex(PROV))
    d["ahat"] = [m.get(sc, a8) for sc in d.index]
    d["pred_yield"] = d.base * (1 + d.ahat)
    nat = pd.DataFrame({"y": [2026], "sc": ["00"], "pred_yield": [np.average(d.pred_yield, weights=d.area)]})
    pr = d.loc[PROV, ["pred_yield"]].reset_index(names="sc")
    pr["y"] = 2026
    return pd.concat([hist, nat, pr[["y", "sc", "pred_yield"]]], ignore_index=True)


def prov_early(P, col, st):
    d = P[["y", "sc", col]].merge(st, on=["y", "sc"]).query("y >= 1996 and y <= 2012").dropna(subset=[col, "a"])
    if d.empty:
        return None, None
    e = (d[col] - d.a) * d.base
    e0 = d.a * d.base
    return round(float(np.sqrt(np.average(e ** 2, weights=d.area))), 2), round(float(np.sqrt(np.average(e0 ** 2, weights=d.area))), 2)


if __name__ == "__main__":
    asofs = sys.argv[1:] or ["0915", "0930"]
    st = E.truth()
    res = json.load(open(os.path.join(HERE, "results.json"))) if os.path.exists(os.path.join(HERE, "results.json")) else {}
    res["stat"] = E.report(E.stat(), "통계청 10월")
    for asof in asofs:
        P, sel = run(asof)
        out = {}
        for v in ["R0", "G1", "G1cv", "G2", "RF1", "GP1", "KR1", "P1", "S1", "E1", "E2"]:
            pr = to_yield(P, v, st)
            r = E.report(pr[pr.y <= 2025], v)
            r["prov_96_12"], r["prov_96_12_base"] = prov_early(P, v, st)
            n26 = pr[(pr.y == 2026) & (pr.sc == "00")].pred_yield
            r["nat_2026"] = round(float(n26.iloc[0]), 1) if len(n26) else None
            out[v] = r
            a, b = r["13_25"], r["10_25"]
            print(f"{asof} {v:5s} 13-25 전국 MAE {a['nat_mae']:5.2f} RMSE {a['nat_rmse']:5.2f} 8도 {a['prov_rmse']:5.2f} | 10-25 {b['nat_rmse']:5.2f} {b['prov_rmse']:5.2f}"
                  f" | 2020 {a['nat_err_2020']} 2024 {a['nat_err_2024']} | 96-12 8도 {r['prov_96_12']} (평년 {r['prov_96_12_base']}) | 2026 {r['nat_2026']}", flush=True)
            pr.round(2).to_csv(os.path.join(HERE, f"pred_sido_{asof}_{v}.csv"), index=False) if v in ("E1", "E2", "R0") else None
        res[asof] = {"variants": out, "selection": {str(k): v for k, v in sel.items()}}
    s = res["stat"]
    print("통계청", s)
    json.dump(res, open(os.path.join(HERE, "results.json"), "w"), ensure_ascii=False, indent=1, default=float)
