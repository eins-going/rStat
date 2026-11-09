"""순열 검정 — Sentinel 변수 개선이 우연인지. 같은 해 안에서 위성 변수를 단위(시도/시군)끼리 섞어 관계를 끊고 같은 모델 재실행.

시도: S2/S1 '_c' 묶음 × 릿지(8도, 2020~25) — 실제 RMSE vs 순열 분포(200회)
시군: ndvi_o·ndre_oc 등 상위 묶음 × 릿지(60시군, 2020~25) — 실제 vs 순열(100회)
또 '같은 해 섞기'로 묶음 135개 중 최대 개선의 분포(다중 비교)도 시군 릿지 묶음으로 근사(50회).
사용: OMP_NUM_THREADS=2 memcap -m 3G python3 perm_test.py [asof]
"""
import json
import os
import sys
import warnings

import numpy as np
import pandas as pd

warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import battery as BT  # noqa: E402
import s2s1_battery as SB  # noqa: E402

M = BT.M
ASOF = sys.argv[1] if len(sys.argv) > 1 else "0915"
TEST = range(2020, 2026)
rng = np.random.default_rng(0)


def realtime(d, feats, ycol, basecol, Xall):
    p = pd.Series(np.nan, index=d.index)
    for Y in TEST:
        tr, te = d.y < Y, d.y == Y
        if d.y[tr].nunique() < 3 or te.sum() == 0:
            continue
        pr, _ = BT.m_ridge(Xall[tr.values], d[ycol].values[tr.values], d.w.values[tr.values], Xall[te.values], d.y.values[tr.values])
        p[te] = d[basecol].values[te.values] + pr
    return p


def shuffle_within_year(X, years):
    Xs = X.copy()
    for y in np.unique(years):
        idx = np.where(years == y)[0]
        Xs[idx] = X[rng.permutation(idx)]
    return Xs


def rmse(d, p, m):
    e = d.base[m] * (1 + p[m]) - d["yield"][m]
    return float(np.sqrt(np.average(e ** 2, weights=d.area[m])))


def main():
    SB.ASOF = ASOF
    sat = pd.read_csv(os.path.join(HERE, "sat_s2s1_sigun_all.csv" if os.environ.get("ALL") else "sat_s2s1_sigun.csv"), dtype={"sc": str, "asof": str})
    sat = sat[sat["asof"] == ASOF].drop(columns="asof")
    allc = [c for c in sat.columns if c not in ("sc", "stem", "y")]
    sets = {}
    for nm, pre in SB.IDX.items():
        for kind in ("o", "c", "oc"):
            sets[f"{nm}_{kind}"] = SB.cols_for(allc, pre, kind)
    for kind in ("o", "c", "oc"):
        s2 = sorted(set(sum([SB.cols_for(allc, SB.IDX[k], kind) for k in ("ndvi", "ndre", "cire", "ndmi", "evi2", "combo")], [])))
        sets[f"S2all_{kind}"] = s2
        sets[f"all_{kind}"] = sorted(set(s2 + SB.cols_for(allc, SB.IDX["s1"], kind)))
    res = {"asof": ASOF}
    # ---- 시도 ----
    t = BT.sigun_table(ASOF)[["sc", "stem", "y", "yield", "area", "base", "a", "a_base", "w", "ahat_sd"]]
    d = t.merge(sat, on=["sc", "stem", "y"], how="inner").reset_index(drop=True)
    an, an_sg, st, base = BT.load_common(ASOF)
    agg = d.groupby(["sc", "y"]).apply(lambda q: pd.Series({c: np.average(q[c].fillna(0), weights=q.area) for c in sets["all_oc"]})).reset_index()
    sd = st[st.sc.isin(M.PROV)].merge(base, on=["sc", "y"]).merge(agg, on=["sc", "y"], how="inner").reset_index(drop=True)
    sd["r"] = sd.a - sd.ahat
    sd["w"] = np.sqrt(sd.area / sd.area.mean())
    m = sd.y.isin(TEST).values
    r0 = rmse(sd, sd.ahat, m)
    res["sido_base"] = round(r0, 2)
    res["sido"] = {}
    for sname in ([] if os.environ.get("SKIP_SIDO") else ["combo_c", "S2all_c", "all_c", "s1_c", "ndre_c"]):
        X = np.nan_to_num(sd[sets[sname]].values.astype(float))
        real = rmse(sd, realtime(sd, None, "r", "ahat", X), m)
        null = [rmse(sd, realtime(sd, None, "r", "ahat", shuffle_within_year(X, sd.y.values)), m) for _ in range(200)]
        pv = float((np.array(null) <= real).mean())
        res["sido"][sname] = {"real": round(real, 2), "null_median": round(float(np.median(null)), 2), "null_p10": round(float(np.percentile(null, 10)), 2), "p": round(pv, 3)}
        print(f"시도 {sname}: 실제 {real:.2f} (M4 {r0:.2f}) | 순열 중앙 {np.median(null):.2f}, 하위10% {np.percentile(null, 10):.2f} | p={pv:.3f}", flush=True)
    # ---- 시군 ----
    d["r"] = d.a - d.a_base
    d = d.dropna(subset=["r", "base", "yield"]).reset_index(drop=True)
    mg = d.y.isin(TEST).values
    g0 = rmse(d, d.a_base, mg)
    res["sigun_base"] = round(g0, 2)
    res["sigun"] = {}
    ridge_sets = [s for s in sets if sets[s]]
    real_all = {}
    for sname in ridge_sets:
        X = np.nan_to_num(d[sets[sname]].values.astype(float))
        real_all[sname] = rmse(d, realtime(d, None, "r", "a_base", X), mg)
    best_real = min(real_all.values())
    for sname in ["ndvi_o", "S2all_c", "ndmi_oc", "S2all_o"]:
        X = np.nan_to_num(d[sets[sname]].values.astype(float))
        null = [rmse(d, realtime(d, None, "r", "a_base", shuffle_within_year(X, d.y.values)), mg) for _ in range(100)]
        pv = float((np.array(null) <= real_all[sname]).mean())
        res["sigun"][sname] = {"real": round(real_all[sname], 2), "null_median": round(float(np.median(null)), 2), "p": round(pv, 3)}
        print(f"시군 {sname}: 실제 {real_all[sname]:.2f} (기준 {g0:.2f}) | 순열 중앙 {np.median(null):.2f} | p={pv:.3f}", flush=True)
    # 다중 비교: 릿지 묶음 전체 중 최소 RMSE의 순열 분포
    mins = []
    for _ in range(20):
        perm = {}
        idx_perm = shuffle_within_year(np.arange(len(d))[:, None], d.y.values).ravel()
        for sname in ridge_sets:
            X = np.nan_to_num(d[sets[sname]].values.astype(float))[idx_perm]
            perm[sname] = rmse(d, realtime(d, None, "r", "a_base", X), mg)
        mins.append(min(perm.values()))
    pv = float((np.array(mins) <= best_real).mean())
    res["sigun_multi"] = {"best_real": round(best_real, 2), "null_min_median": round(float(np.median(mins)), 2), "p": round(pv, 3), "n_sets": len(ridge_sets)}
    print(f"시군 릿지 묶음 {len(ridge_sets)}개 중 최소: 실제 {best_real:.2f} | 순열 최소 중앙 {np.median(mins):.2f} | p={pv:.3f}", flush=True)
    json.dump(res, open(os.path.join(BT.OUT, f"perm{'_all' if os.environ.get('ALL') else ''}_{ASOF}.json"), "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
