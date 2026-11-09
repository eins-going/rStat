"""전국 연도 신호 모델: 전국 단수 편차를 전국(논 면적 가중) 기상 지표로 예측 → 모든 시군 = 시군 평년 × (1 + 전국 â).
또 시도 모델과 섞기(blend). 실시간·내부 연도CV.
사용: python nat_model.py
"""
import json
import os
import sys
import warnings

import numpy as np
import pandas as pd

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
warnings.filterwarnings("ignore")
import prov_model as pm  # noqa: E402
import common  # noqa: E402

OUT = pm.OUT
pw, ph = pm.load_feats()
N = common.nation()[["y", "a", "area"]]
K6 = ["dtr_rip_c", "rndays_rip_c", "gust_max_c", "ss_pre_c", "cold20_pre_c", "rndays_fl_c"]
K8 = K6 + ["ss_sep1h", "gust17_a1s14"]
WXC = [c + "_c" for c in ["cold17_meio", "cold20_pre", "ta_pre", "ss_pre", "rn_pre", "ta_veg", "ss_veg", "rn_veg", "heat33_fl",
                          "rndays_fl", "ss_fl", "ta_rip", "tdev_rip", "dtr_rip", "ss_rip", "rn_rip", "rndays_rip", "hm_rip",
                          "tn_rip", "gust_max", "gust17_days", "rn3d_max"]]
SETS = {"K6": K6, "K8": K8, "WXC": WXC}
# 시도 → 전국: 시도 재배면적(직전 해) 가중
PA = pm.PT[["sc", "y", "area"]].rename(columns={"sc": "pv"})
PA = PA.assign(y=PA.y + 1)  # 직전 해 면적으로 가중 (실시간, 2026도 가능)


def nat_panel(asof):
    d = pw[pw["asof"] == asof].merge(PA, on=["pv", "y"])
    d = d[d.y >= 1985]
    cols = [c for c in d.columns if c not in ("pv", "y", "asof", "area")]
    n = d.groupby("y").apply(lambda g: pd.Series(np.average(g[cols], axis=0, weights=g.area), index=cols)).reset_index()
    return n.drop(columns=["area"], errors="ignore").merge(N, on="y", how="left")


def hinge_feat(tr, te, c, q):
    mu, sd = tr[c].mean(), tr[c].std()
    z, zt = (tr[c] - mu) / sd, (te[c] - mu) / sd
    qq = z.quantile(q)
    return np.minimum(z - qq, 0).values, np.minimum(zt - qq, 0).values


def run_nat(asof, cols, start, hinge=(), qs=(0.2, 0.33, 0.5)):
    d = nat_panel(asof)
    out, coefs = {}, []
    for Y in pm.TEST:
        tr = d[(d.y < Y) & (d.y >= start)].dropna(subset=["a"])
        te = d[d.y == Y]
        best = (np.inf, None)
        for q in (qs if hinge else [None]):
            A, B = tr[cols].values, te[cols].values
            if hinge:
                hs = [hinge_feat(tr, te, c, q) for c in hinge]
                A = np.c_[A, np.array([h[0] for h in hs]).T]
                B = np.c_[B, np.array([h[1] for h in hs]).T]
            hp, err = pm.inner_cv("ridge", A, tr.a.values, tr.y.values, np.ones(len(tr)))
            if err < best[0]:
                best = (err, (q, hp, A, B))
        q, hp, A, B = best[1]
        p, m = pm.fit_predict("ridge", hp, A, tr.a.values, B)
        out[Y] = float(p[0])
        coefs.append(pd.Series(m.coef_, index=list(cols) + [h + "_hinge" for h in hinge], name=Y))
    return pd.Series(out), pd.concat(coefs, axis=1)


def to_sigun(ahat_by_pv):
    sg = pm.T.merge(ahat_by_pv, on=["pv", "y"], how="inner")
    sg["pred_yield"] = sg.base * (1 + sg.ahat)
    return sg


if __name__ == "__main__":
    results, coefs = {}, {}
    for asof in ["0815", "0915", "1001"]:
        for s, cols in SETS.items():
            for start in (1985, 2001):
                for hinge in ([], ["ss_pre_c"]):
                    name = f"nat_{s}{'h' if hinge else ''}_{start}_{asof}"
                    a, C = run_nat(asof, cols, start, hinge)
                    P = pd.DataFrame([(pv, y, v) for y, v in a.items() for pv in pm.PROV], columns=["pv", "y", "ahat"])
                    P.to_csv(os.path.join(OUT, "preds", f"{name}.csv"), index=False)
                    r = common.evaluate(to_sigun(P)[["y", "sc", "stem", "pred_yield"]], name, verbose=False)
                    r.update(asof=asof, start=start, feats=cols, hinge=hinge)
                    results[name] = r
                    coefs[name] = C.mean(axis=1).round(4).to_dict()
                    print(f"{name:26s} skill {r['skill']:+.3f} nat {r['nat_rmse']} ({r['nat_rmse_base']}) e2020 {r.get('nat_err_2020')} hit {r.get('hit_2020')}", flush=True)
    for fn, obj in (("results_nat.json", results), ("coefs_nat.json", coefs)):
        json.dump(obj, open(os.path.join(OUT, fn), "w"), ensure_ascii=False, indent=1)
