"""큰 시군 재검증 — 정답 잡음이 적은 큰 시군에서는 위성이 시군 편차를 맞히는가 (사전 등록: README '큰 시군 재검증').

큰 시군 = 2013~25 평균 논벼 면적 상위 1/4(39곳), 비교군 = 하위 1/2.
방식 A: 전체 시군 학습 → 부분집합 평가 / 방식 B: 큰 시군만 학습·평가.  기준선 B0p(a_base).
사용: OMP_NUM_THREADS=2 memcap -m 3G python3 big_sigun.py 0915 [NPERM]
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
sys.path.insert(0, HERE)
import battery as BT  # noqa: E402
import s2s1_battery as SB  # noqa: E402

common = BT.common
ASOF = sys.argv[1] if len(sys.argv) > 1 else "0915"
NPERM = int(sys.argv[2]) if len(sys.argv) > 2 else 200
MODELS = ["ridge", "enet", "pls", "rf"]
PRE = {"S2": "ndvi_o|ridge", "MOD": "MODd|ridge"}


def size_groups():
    t = common.targets()
    m = t[t.y.between(2013, 2025)].groupby(["sc", "stem"]).area.mean()
    big = set(m[m >= m.quantile(0.75)].index)
    small = set(m[m <= m.quantile(0.5)].index)
    return big, small


def fit_family(d, sets, test, y0, train_mask=None, models=MODELS):
    preds = {"BASE": d.a_base.copy()}
    for sname, feats in sets.items():
        for mn in models:
            p = pd.Series(np.nan, index=d.index)
            for Y in test:
                tr = d[(d.y < Y) & (d.y >= y0)]
                if train_mask is not None:
                    tr = tr[train_mask[tr.index]]
                tr = tr.dropna(subset=["r"])
                te = d[d.y == Y]
                if tr.y.nunique() < 3 or te.empty:
                    continue
                kw = {"leaf": 20} if mn == "rf" else {}
                pr, _ = BT.MODELS[mn](tr[feats].values.astype(float), tr.r.values, tr.w.values,
                                      te[feats].values.astype(float), tr.y.values, **kw)
                p.loc[te.index] = te.a_base.values + pr
            preds[f"{sname}|{mn}"] = p
    return pd.DataFrame(preds)


def score(d, P, mask, test):
    ok = mask & d.y.isin(test) & d.base.notna() & d["yield"].notna() & P.notna().all(axis=1)
    q, w = d[ok], d.area[ok]
    e = {c: q.base * (1 + P.loc[ok, c]) - q["yield"] for c in P.columns}
    e0 = q.base - q["yield"]
    rm = lambda x, ww=w: float(np.sqrt(np.average(x ** 2, weights=ww)))  # noqa: E731
    rows = []
    for c in P.columns:
        yr = [rm(e[c][q.y == Y], w[q.y == Y]) - rm(e["BASE"][q.y == Y], w[q.y == Y]) for Y in test if (q.y == Y).any()]
        rows.append({"cand": c, "rmse": round(rm(e[c]), 2), "d": round(rm(e[c]) - rm(e["BASE"]), 2),
                     "rel": round((rm(e[c]) - rm(e["BASE"])) / rm(e["BASE"]), 4), "skill": round(1 - rm(e[c]) / rm(e0), 3),
                     "yrs_better": int(sum(x < 0 for x in yr)), "n_yrs": len(yr), "n": int(ok.sum())})
    return pd.DataFrame(rows).set_index("cand")


def meta(d, P, mask, test):
    """그해 쓸 후보 = 직전 해들(test 안) 큰 시군 면적가중 RMSE 최소."""
    out = pd.Series(np.nan, index=d.index)
    ok = mask & d.base.notna() & d["yield"].notna()
    picks = {}
    for Y in test:
        past = ok & d.y.isin([t for t in test if t < Y])
        cols = [c for c in P.columns if P.loc[past, c].notna().all()] if past.any() else []
        b = min(cols, key=lambda c: np.average((d.base[past] * (1 + P.loc[past, c]) - d["yield"][past]) ** 2,
                                               weights=d.area[past])) if cols else "BASE"
        picks[Y] = b
        out[d.y == Y] = P.loc[d.y == Y, b]
    return out, picks


def perm_p(d, feats, test, y0, train_mask, mask, obs, rng):
    """같은 해 안에서 위성 변수 행을 시군끼리 섞어 관계를 끊은 null. 방식 B ridge."""
    null = []
    shuf = [f for f in feats if not f.startswith(("S_", "Wd_", "W_"))]  # 위성 변수만 섞는다
    for _ in range(NPERM):
        dd = d.copy()
        for Y, g in dd.groupby("y"):
            idx = g.index.values
            dd.loc[idx, shuf] = dd.loc[rng.permutation(idx), shuf].values
        P = fit_family(dd, {"x": feats}, test, y0, train_mask, models=["ridge"])
        null.append(score(dd, P, mask, test).loc["x|ridge", "d"])
    null = np.array(null)
    return float((1 + (null <= obs).sum()) / (1 + len(null))), float(np.median(null))


def run(tag, d, sets, test, y0, big_m, small_m, rng):
    res = {}
    PA = fit_family(d, sets, test, y0)
    PB = fit_family(d, sets, test, y0, train_mask=big_m)
    eA_big, eA_small, eB = score(d, PA, big_m, test), score(d, PA, small_m, test), score(d, PB, big_m, test)
    mA, pkA = meta(d, PA, big_m, test)
    mB, pkB = meta(d, PB, big_m, test)
    for nm, (P, m_) in {"A": (PA, mA), "B": (PB, mB)}.items():
        e = score(d, pd.DataFrame({"BASE": P.BASE, "META": m_}), big_m, test).loc["META"]
        res[f"meta_{nm}"] = e.to_dict()
    res["picks"] = {"A": {int(k): v for k, v in pkA.items()}, "B": {int(k): v for k, v in pkB.items()}}
    c = eA_big.index.drop("BASE")
    res["noise_masks"] = {"cands": len(c), "big_better_rel": int((eA_big.loc[c, "rel"] < eA_small.loc[c, "rel"]).sum()),
                          "median_rel_big": float(eA_big.loc[c, "rel"].median()), "median_rel_small": float(eA_small.loc[c, "rel"].median())}
    pre = PRE[tag]
    obs = eB.loc[pre, "d"]
    p, med = perm_p(d, sets[pre.split("|")[0]], test, y0, big_m, big_m, obs, rng)
    res["pre"] = {"cand": pre, **eB.loc[pre].to_dict(), "perm_p": round(p, 3), "perm_median_d": round(med, 2)}
    tab = eA_big.add_suffix("_A_big").join(eA_small[["d", "rel"]].add_suffix("_A_small")).join(eB.add_suffix("_B"))
    tab.to_csv(os.path.join(BT.OUT, f"big_{tag}_{ASOF}.csv"))
    res["base_big"] = {"rmse": float(eA_big.loc["BASE", "rmse"]), "skill": float(eA_big.loc["BASE", "skill"]), "n": int(eA_big.loc["BASE", "n"])}
    res["best_A"] = eA_big.drop("BASE").sort_values("d").head(5)[["rmse", "d", "yrs_better"]].reset_index().to_dict("records")
    res["best_B"] = eB.drop("BASE").sort_values("d").head(5)[["rmse", "d", "yrs_better"]].reset_index().to_dict("records")
    res["n_improved_A"] = int((eA_big.loc[c, "d"] < 0).sum())
    res["n_improved_B"] = int((eB.loc[c, "d"] < 0).sum())
    return res


def main():
    t0 = time.time()
    rng = np.random.default_rng(0)
    big, small = size_groups()
    t = BT.sigun_table(ASOF)
    key = list(zip(t.sc, t.stem))
    t["big"] = [k in big for k in key]
    t["small"] = [k in small for k in key]
    out = {"asof": ASOF, "nperm": NPERM}

    # Sentinel 2020~25
    sat = pd.read_csv(os.path.join(HERE, "sat_s2s1_sigun_all.csv"), dtype={"sc": str, "asof": str})
    sat = sat[sat["asof"] == ASOF].drop(columns="asof")
    allc = [c for c in sat.columns if c not in ("sc", "stem", "y")]
    d = t.merge(sat, on=["sc", "stem", "y"], how="inner").reset_index(drop=True)
    sets = {}
    for nm, pre in SB.IDX.items():
        for kind in ("o", "c", "oc"):
            f = SB.cols_for(allc, pre, kind)
            if f:
                sets[f"{nm}_{kind}"] = f
    for kind in ("o", "c", "oc"):
        s2 = sorted(set(sum([SB.cols_for(allc, SB.IDX[k], kind) for k in ("ndvi", "ndre", "cire", "ndmi", "evi2", "combo")], [])))
        sets[f"S2all_{kind}"] = s2
        sets[f"all_{kind}"] = sorted(set(s2 + SB.cols_for(allc, SB.IDX["s1"], kind)))
    out["S2"] = run("S2", d, sets, range(2020, 2026), 2017, d.big, d.small, rng)
    out["S2"]["n_big_sigun"] = int(d[d.big][["sc", "stem"]].drop_duplicates().shape[0])
    print(f"S2 끝 {time.time() - t0:.0f}s", flush=True)

    # MODIS 2013~25
    MODd = [c for c in t.columns if c.startswith("MODd_")]
    Wd = [c for c in t.columns if c.startswith("Wd_")]
    S = [c for c in t.columns if c.startswith("S_")]
    dm = t[t[MODd].notna().any(axis=1)].reset_index(drop=True)
    msets = {"MODd": MODd + S, "Wd+MODd": Wd + MODd + S}
    out["MOD"] = run("MOD", dm, msets, range(2013, 2026), 2005, dm.big, dm.small, rng)
    out["MOD"]["n_big_sigun"] = int(dm[dm.big][["sc", "stem"]].drop_duplicates().shape[0])
    json.dump(out, open(os.path.join(BT.OUT, f"big_{ASOF}.json"), "w"), ensure_ascii=False, indent=1, default=float)
    print(json.dumps(out, ensure_ascii=False, indent=1, default=float))
    print(f"끝 {time.time() - t0:.0f}s")


if __name__ == "__main__":
    main()
