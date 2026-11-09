"""모델 묶음 실시간 검증 — 시도·시군 × 변수 묶음 × 방식(잔차 R / 직접 D) × 모델. README 사전 등록대로.

사용: OMP_NUM_THREADS=2 memcap -m 3G python3 battery.py sido 0915      (또는 sigun, 시점 여러 개)
출력: out/oos_{level}_{asof}.csv  (후보별 표본 밖 예측 a_hat, 해마다), out/cands_{level}_{asof}.json
메타 선택·쌓기·평가는 select.py.
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
RICE = os.path.dirname(HERE)
sys.path[:0] = [os.path.join(RICE, "pheno", "_pylib"), os.path.join(RICE, "lst")]
import lightgbm as lgb  # noqa: E402
from sklearn.cross_decomposition import PLSRegression  # noqa: E402
from sklearn.ensemble import ExtraTreesRegressor, RandomForestRegressor  # noqa: E402
from sklearn.linear_model import ElasticNet, Ridge  # noqa: E402

import baseline as B  # noqa: E402

M, common = B.M, B.common
OUT = os.path.join(HERE, "out")
os.makedirs(OUT, exist_ok=True)
PRED_YEARS = range(2007, 2026)
NJ = 2


# ---------------- 모델 ----------------
def _std(Xtr, Xte):
    mu, sd = np.nanmean(Xtr, 0), np.nanstd(Xtr, 0) + 1e-9
    return np.nan_to_num((Xtr - mu) / sd), np.nan_to_num((Xte - mu) / sd)


def _inner(fit_pred, Xtr, ytr, wtr, yrs, grid):
    """학습 기간 안 최근 8개 해 leave-one-year-out으로 grid 고르기."""
    uy = sorted(set(yrs))[-8:]
    if len(uy) < 4:
        return grid[len(grid) // 2]
    best, bl = None, None
    for g in grid:
        e = 0.0
        for yy in uy:
            tr, te = yrs != yy, yrs == yy
            p = fit_pred(g, Xtr[tr], ytr[tr], wtr[tr], Xtr[te])
            e += np.sum(wtr[te] * (ytr[te] - p) ** 2)
        if bl is None or e < bl:
            best, bl = g, e
    return best


def m_ridge(Xtr, ytr, wtr, Xte, yrs):
    Z, Zt = _std(Xtr, Xte)
    f = lambda a, X, y, w, Xt: Ridge(alpha=a).fit(X, y, sample_weight=w).predict(Xt)  # noqa: E731
    a = _inner(f, Z, ytr, wtr, yrs, [1, 10, 100, 1000, 10000])
    return f(a, Z, ytr, wtr, Zt), {"alpha": a}


def m_enet(Xtr, ytr, wtr, Xte, yrs, l1=0.5):
    Z, Zt = _std(Xtr, Xte)
    f = lambda a, X, y, w, Xt: ElasticNet(alpha=a, l1_ratio=l1, max_iter=5000).fit(X, y, sample_weight=w).predict(Xt)  # noqa: E731
    a = _inner(f, Z, ytr, wtr, yrs, [3e-4, 1e-3, 3e-3, 1e-2, 3e-2])
    return f(a, Z, ytr, wtr, Zt), {"alpha": a}


def m_lasso(Xtr, ytr, wtr, Xte, yrs):
    return m_enet(Xtr, ytr, wtr, Xte, yrs, l1=1.0)


def m_pls(Xtr, ytr, wtr, Xte, yrs):
    Z, Zt = _std(Xtr, Xte)
    def f(k, X, y, w, Xt):
        k = min(k, X.shape[1], max(1, len(y) - 1))
        mu = np.average(y, weights=w)
        return PLSRegression(n_components=k, scale=False).fit(X, y - mu).predict(Xt).ravel() + mu
    k = _inner(f, Z, ytr, wtr, yrs, [1, 2, 3])
    return f(k, Z, ytr, wtr, Zt), {"k": k}


def m_lgbm(Xtr, ytr, wtr, Xte, yrs, leaf=15):
    m = lgb.LGBMRegressor(n_estimators=300, learning_rate=0.03, num_leaves=4, max_depth=2, min_child_samples=leaf,
                          reg_lambda=10, subsample=0.8, subsample_freq=1, colsample_bytree=0.5, verbose=-1, n_jobs=NJ)
    m.fit(Xtr, ytr, sample_weight=wtr)
    return m.predict(Xte), {}


def m_rf(Xtr, ytr, wtr, Xte, yrs, leaf=10):
    m = RandomForestRegressor(n_estimators=300, min_samples_leaf=leaf, max_features=0.33, n_jobs=NJ, random_state=0)
    m.fit(np.nan_to_num(Xtr), ytr, sample_weight=wtr)
    return m.predict(np.nan_to_num(Xte)), {}


def m_et(Xtr, ytr, wtr, Xte, yrs, leaf=10):
    m = ExtraTreesRegressor(n_estimators=300, min_samples_leaf=leaf, max_features=0.33, n_jobs=NJ, random_state=0)
    m.fit(np.nan_to_num(Xtr), ytr, sample_weight=wtr)
    return m.predict(np.nan_to_num(Xte)), {}


def m_knn(Xtr, ytr, wtr, Xte, yrs):
    from sklearn.neighbors import KNeighborsRegressor
    Z, Zt = _std(Xtr, Xte)
    f = lambda k, X, y, w, Xt: KNeighborsRegressor(n_neighbors=min(k, len(y)), weights="distance").fit(X, y).predict(Xt)  # noqa: E731
    k = _inner(f, Z, ytr, wtr, yrs, [5, 10, 20, 40])
    return f(k, Z, ytr, wtr, Zt), {"k": k}


MODELS = {"knn": m_knn, "ridge": m_ridge, "enet": m_enet, "lasso": m_lasso, "pls": m_pls, "lgbm": m_lgbm, "rf": m_rf, "et": m_et}


# ---------------- 자료 ----------------
def load_common(asof):
    comp, cs, an, an_sg = B.load()
    st = M.sido_targets()
    base = M.backtest(an, st, B.M4, asof, icpt="cw", years=range(1990, 2026))[0][["sc", "y", "ahat"]]
    return an, an_sg, st, base


def sido_table(asof):
    an, an_sg, st, base = load_common(asof)
    w = an[asof].copy()
    wcols = [c for c in w.columns if c not in ("sc", "y")]
    w = w.rename(columns={c: "W_" + c for c in wcols})
    mod = pd.read_csv(os.path.join(HERE, "sat_modis_sido.csv"), dtype={"sc": str, "asof": str})
    mod = mod[mod["asof"] == asof].drop(columns="asof")
    mod = mod.rename(columns={c: "MOD_" + c for c in mod.columns if c not in ("sc", "y")})
    nc = pd.read_csv(os.path.join(RICE, "ncpms", "feat_sido.csv"), dtype={"sc": str, "asof": str})
    nc = nc[nc["asof"] == asof].drop(columns="asof")
    nc = nc.rename(columns={c: "NC_" + c for c in nc.columns if c not in ("sc", "y")})
    d = st[st.sc.isin(M.PROV)].merge(base, on=["sc", "y"]).merge(w, on=["sc", "y"], how="left")
    d = d.merge(mod, on=["sc", "y"], how="left").merge(nc, on=["sc", "y"], how="left")
    if os.environ.get("AG"):
        ag = pd.read_csv(os.path.join(RICE, "agro", "feat_sido.csv"), dtype={"sc": str, "asof": str})
        ag = ag[ag["asof"] == asof].drop(columns="asof")
        ag = ag[[c for c in ag.columns if not c.endswith("_cov")]]
        ag = ag.rename(columns={c: "AG_" + c for c in ag.columns if c not in ("sc", "y")})
        d = d.merge(ag, on=["sc", "y"], how="left")
    d["r"] = d.a - d.ahat
    d["w"] = np.sqrt(d.area / d.area.mean())
    if os.environ.get("EXT"):
        M4c = ["W_" + c for c in B.M4 if "W_" + c in d.columns]
        new = {}
        for i, a in enumerate(M4c):
            for b in M4c[i:]:
                new[f"X_{a}*{b}"] = d[a] * d[b]
        for m_ in ["MOD_cum_season", "MOD_cum_pre", "MOD_m_aug1", "MOD_peak"]:
            for w_ in ["W_rs_pre", "W_ptq_fill", "W_sunless_pre", "W_cold_mei", "W_wet_head"]:
                if m_ in d.columns and w_ in d.columns:
                    new[f"XM_{m_}*{w_}"] = d[m_] * d[w_]
        d = pd.concat([d, pd.DataFrame(new, index=d.index)], axis=1)
    return d


def sigun_table(asof):
    an, an_sg, st, base = load_common(asof)
    t = common.targets()
    t["grp"] = t.sc.map(M.SD_GROUP)
    sd = st[["sc", "y", "a"]].rename(columns={"a": "a_sd"})
    t = t.merge(sd, on=["sc", "y"], how="left")
    ah = base.set_index(["sc", "y"]).ahat
    t["ahat_sd"] = [ah.get((s, y), ah.get((g, y), np.nan)) for s, y, g in zip(t.sc, t.y, t.grp)]
    t = t.sort_values(["sc", "stem", "y"])
    t["dev"] = t.a - t.a_sd
    t["dev_prev"] = t.groupby(["sc", "stem"]).dev.shift(1)
    rho = {}
    for Y in range(1995, 2027):
        tr = t[(t.y < Y) & (t.y >= 1990)].dropna(subset=["dev", "dev_prev"])
        rho[Y] = float((tr.dev * tr.dev_prev).sum() / (tr.dev_prev ** 2).sum()) if len(tr) > 50 else 0.0
    t["rho"] = t.y.map(rho)
    t["a_base"] = t.ahat_sd.fillna(0) + t.rho * t.dev_prev.fillna(0)
    # 시군 기상 성분 (시군 값과 시도 값 차이도)
    g = an_sg[asof].copy()
    gcols = [c for c in g.columns if c not in ("sc", "stem", "y")]
    sdw = an[asof].rename(columns={c: c + "_sd" for c in gcols if c in an[asof].columns})
    g = g.merge(sdw, on=["sc", "y"], how="left")
    for c in gcols:
        if c + "_sd" in g.columns:
            g["Wd_" + c] = g[c] - g[c + "_sd"]
        g = g.rename(columns={c: "W_" + c})
    g = g[["sc", "stem", "y"] + [c for c in g.columns if c.startswith("W_") or c.startswith("Wd_")]]
    mod = pd.read_csv(os.path.join(HERE, "sat_modis_sigun.csv"), dtype={"sc": str, "asof": str})
    mod = mod[mod["asof"] == asof].drop(columns="asof")
    mfe = [c for c in mod.columns if c not in ("sc", "stem", "y")]
    mods = pd.read_csv(os.path.join(HERE, "sat_modis_sido.csv"), dtype={"sc": str, "asof": str})
    mods = mods[mods["asof"] == asof].drop(columns="asof").rename(columns={c: c + "_sd" for c in mfe})
    mod = mod.merge(mods, on=["sc", "y"], how="left")
    for c in mfe:
        mod["MODd_" + c] = mod[c] - mod[c + "_sd"]
        mod = mod.rename(columns={c: "MOD_" + c})
    mod = mod[["sc", "stem", "y"] + [c for c in mod.columns if c.startswith("MOD")]]
    nc = pd.read_csv(os.path.join(RICE, "ncpms", "feat_sido.csv"), dtype={"sc": str, "asof": str})
    nc = nc[nc["asof"] == asof].drop(columns="asof")
    nc = nc.rename(columns={c: "NC_" + c for c in nc.columns if c not in ("sc", "y")})
    t = t.merge(g, on=["sc", "stem", "y"], how="left").merge(mod, on=["sc", "stem", "y"], how="left")
    t = t.merge(nc, on=["sc", "y"], how="left")
    if os.environ.get("AG"):
        ag = pd.read_csv(os.path.join(RICE, "agro", "feat_sigun.csv"), dtype={"sc": str, "asof": str})
        ag = ag[ag["asof"] == asof].drop(columns="asof")
        afe = [c for c in ag.columns if c not in ("sc", "stem", "y")]
        ags = pd.read_csv(os.path.join(RICE, "agro", "feat_sido.csv"), dtype={"sc": str, "asof": str})
        ags = ags[ags["asof"] == asof][["sc", "y"] + afe].rename(columns={c: c + "_sd" for c in afe})
        ag = ag.merge(ags, on=["sc", "y"], how="left")
        for c in afe:
            ag["AGd_" + c] = ag[c] - ag[c + "_sd"]
            ag = ag.rename(columns={c: "AG_" + c})
        t = t.merge(ag[["sc", "stem", "y"] + [c for c in ag.columns if c.startswith("AG")]], on=["sc", "stem", "y"], how="left")
    t["S_dev_prev"] = t.dev_prev
    t["S_ahat_sd"] = t.ahat_sd
    t["S_logarea"] = np.log(t.area.clip(lower=1))
    t["r"] = t.a - t.a_base
    t["w"] = np.sqrt(t.area.clip(lower=1) / t.area.mean())
    return t


def featsets(cols, level):
    W = [c for c in cols if c.startswith("W_")]
    Wd = [c for c in cols if c.startswith("Wd_")]
    MOD = [c for c in cols if c.startswith("MOD_")]
    MODd = [c for c in cols if c.startswith("MODd_")]
    NC = [c for c in cols if c.startswith("NC_")]
    S = [c for c in cols if c.startswith("S_")]
    AG = [c for c in cols if c.startswith("AG_")]
    AGd = [c for c in cols if c.startswith("AGd_")]
    if os.environ.get("AG"):
        if level == "sido":
            return {"AG": (AG, 2012), "W+AG": (W + AG, 2012), "MOD+AG": (MOD + AG, 2012)}, {"W+AG"}
        return {"AGd": (AGd + S, 2012), "Wd+AGd": (Wd + AGd + S, 2012), "W+Wd+AG+AGd": (W + Wd + AG + AGd + S, 2012)}, {"W+Wd+AG+AGd"}
    if level == "sido" and os.environ.get("EXT"):
        M4c = ["W_" + c for c in B.M4 if "W_" + c in cols]
        return {"Wx": (M4c + [f"X_{a}*{b}" for i, a in enumerate(M4c) for b in M4c[i:]], 1990),
                "Wx+MODx": (M4c + [c for c in cols if c.startswith("XM_")] + MOD, 2005),
                "M4": (M4c, 1990), "M4+MOD": (M4c + MOD, 2005)}, {"Wx", "Wx+MODx", "M4", "M4+MOD"}
    if level == "sido":
        fs = {"W": (W, 1990), "W+MOD": (W + MOD, 2005), "W+NC": (W + NC, 2014), "W+MOD+NC": (W + MOD + NC, 2014),
              "MOD": (MOD, 2005), "NC": (NC, 2014), "MOD+NC": (MOD + NC, 2014)}
        direct = {"W", "W+MOD", "W+NC", "W+MOD+NC"}
    else:
        fs = {"Wd": (Wd + S, 1995), "W+Wd": (W + Wd + S, 1995), "Wd+MODd": (Wd + MODd + S, 2005),
              "W+Wd+MOD+MODd": (W + Wd + MOD + MODd + S, 2005), "MODd": (MODd + S, 2005), "Wd+MODd+NC": (Wd + MODd + NC + S, 2014)}
        direct = {"W+Wd", "W+Wd+MOD+MODd"}
    return fs, direct


def run(level, asof):
    t0 = time.time()
    d = sido_table(asof) if level == "sido" else sigun_table(asof)
    cols = list(d.columns)
    fs, direct = featsets(cols, level)
    ext = bool(os.environ.get("EXT")) and level == "sido"
    models = (["ridge", "enet", "pls", "lgbm", "rf", "knn"] if ext else [m for m in MODELS if m != "knn"]) if level == "sido" else ["ridge", "enet", "lgbm", "rf", "et"]
    leaf = {"lgbm": 15, "rf": 10, "et": 10} if level == "sido" else {"lgbm": 40, "rf": 30, "et": 30}
    keys = ["sc", "y"] if level == "sido" else ["sc", "stem", "y"]
    oos = d[keys].copy()
    oos["base"] = d.ahat if level == "sido" else d.a_base
    meta = {}
    for fname, (feats, y0) in fs.items():
        if not feats:
            continue
        for mode in (["R", "D"] if fname in direct else ["R"]) + (["G"] if ext else []):
            for mn in models:
                if mode == "G" and mn not in ("ridge", "lgbm", "knn"):
                    continue
                cname = f"{mode}|{fname}|{mn}"
                pred = pd.Series(np.nan, index=d.index)
                info = {}
                for Y in PRED_YEARS:
                  for grp in ([["31", "32", "33", "34"], ["35", "36", "37", "38"]] if mode == "G" else [None]):
                    tr = d[(d.y < Y) & (d.y >= y0)].dropna(subset=["a"])
                    if grp is not None:
                        tr = tr[tr.sc.isin(grp)]
                    if level == "sido":
                        tr = tr.dropna(subset=["ahat"])
                    te = d[d.y == Y] if grp is None else d[(d.y == Y) & d.sc.isin(grp)]
                    if tr.y.nunique() < 5 or te.empty:
                        continue
                    ycol = "a" if mode == "D" else "r"
                    Xtr, Xte = tr[feats].values.astype(float), te[feats].values.astype(float)
                    if mn not in ("lgbm",):
                        pass
                    fn = MODELS[mn]
                    kw = {"leaf": leaf[mn]} if mn in leaf else {}
                    p, hp = fn(Xtr, tr[ycol].values, tr.w.values, Xte, tr.y.values, **kw)
                    if mode in ("R", "G"):
                        p = (te.ahat.values if level == "sido" else te.a_base.values) + p
                    pred.loc[te.index] = p
                    info[int(Y)] = hp
                oos[cname] = pred.values
                meta[cname] = {"feats": len(feats), "y0": y0, "hp": info}
                print(f"  {cname:28s} {time.time() - t0:6.0f}s", flush=True)
    tag = level + ("x" if ext else "") + ("ag" if os.environ.get("AG") else "")
    oos.to_csv(os.path.join(OUT, f"oos_{tag}_{asof}.csv"), index=False)
    json.dump(meta, open(os.path.join(OUT, f"cands_{tag}_{asof}.json"), "w"), ensure_ascii=False, default=str)
    print(f"끝 {level} {asof} 후보 {len(meta)} · {time.time() - t0:.0f}s", flush=True)


if __name__ == "__main__":
    lv = sys.argv[1]
    for a in sys.argv[2:] or ["0915"]:
        run(lv, a)
