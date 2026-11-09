"""시도 패널: 특징 묶음 × 학습 시작 × 절편(전체/최근10년) × as-of. 사용: python run_prov3.py [필터...]"""
import json, os, sys
import numpy as np, pandas as pd
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import prov_model as pm
OUT = pm.OUT
pw, ph = pm.load_feats()
PT = pm.PT.rename(columns={"sc": "pv"})
def panel(asof):
    d = pw[pw["asof"] == asof].merge(PT, on=["pv", "y"], how="left")
    return d.merge(ph[ph["asof"] == asof].drop(columns=["asof"]), on=["pv", "y"], how="left")
K6 = ["dtr_rip_c", "rndays_rip_c", "gust_max_c", "ss_pre_c", "cold20_pre_c", "rndays_fl_c"]
K8 = K6 + ["ss_sep1h", "gust17_a1s14"]
WXC = [c + "_c" for c in ["cold17_meio", "cold20_pre", "ta_pre", "ss_pre", "rn_pre", "ta_veg", "ss_veg", "rn_veg", "heat33_fl",
                          "rndays_fl", "ss_fl", "ta_rip", "tdev_rip", "dtr_rip", "ss_rip", "rn_rip", "rndays_rip", "hm_rip",
                          "tn_rip", "gust_max", "gust17_days", "rn3d_max"]]
MOD = ["m_ndvi_last_v", "m_evi_drop30", "m_ndvi_veg_len", "m_evi_trans_doy", "m_ndvi_auc_gs"]
SETS = {"K6": (K6, []), "K8": (K8, []), "WXC": (WXC, []), "K6h": (K6, ["ss_pre_c"]), "K8h": (K8, ["ss_pre_c"]),
        "WXCh": (WXC, ["ss_pre_c"]), "K8hm": (K8 + MOD, ["ss_pre_c"])}
EXPS = []
for asof in ["0815", "0915", "1001"]:
    for s in SETS:
        for start in (1985, 2001):
            for ic in ("all", "recent10"):
                EXPS.append((f"{s}_{start}_{ic}_{asof}", asof, s, start, ic))
which = sys.argv[1:]
results, coefs = {}, {}
for name, asof, s, start, ic in EXPS:
    if which and not all(w in name.split("_") for w in which[0].split(",")):
        continue
    cols, hinge = SETS[s]
    d = panel(asof)
    r, P, C = pm.run(d, cols, kind="ridge", start=start, label=name, verbose=False, hinge=hinge, qs=(0.2, 0.33, 0.5), hinge_pooled=True, icpt=ic)
    r.update(asof=asof, kind="ridge", start=start, icpt=ic, feats=cols, hinge=hinge)
    results[name] = r
    coefs[name] = C.mean(axis=1).round(4).to_dict()
    P.to_csv(os.path.join(OUT, "preds", f"prov3_{name}.csv"), index=False)
    print(f"{name:26s} skill {r['skill']:+.3f} rank {r['rank_r']} nat {r['nat_rmse']} ({r['nat_rmse_base']}) e2020 {r.get('nat_err_2020')} "
          f"hit {r.get('hit_2020')} | prov rmse {r['prov_rmse']} ({r['prov_rmse_base']}) skill {r['prov_skill']:+.3f} r {r['prov_corr']}", flush=True)
for fn, obj in (("results_prov3.json", results), ("coefs_prov3.json", coefs)):
    p = os.path.join(OUT, fn)
    old = json.load(open(p)) if os.path.exists(p) else {}
    old.update(obj)
    json.dump(old, open(p, "w"), ensure_ascii=False, indent=1)
