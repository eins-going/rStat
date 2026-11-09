"""시도 패널: 선별 특징 묶음(기후 출수일 기준 _c) 실험. 사용: python run_prov2.py [이름필터...]"""
import json
import os
import sys

import numpy as np
import pandas as pd

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import prov_model as pm  # noqa: E402

OUT = pm.OUT
pw, ph = pm.load_feats()
PT = pm.PT.rename(columns={"sc": "pv"})


def panel(asof):
    d = pw[pw["asof"] == asof].merge(PT, on=["pv", "y"], how="left")
    return d.merge(ph[ph["asof"] == asof].drop(columns=["asof"]), on=["pv", "y"], how="left")


SETS = {
    "K4": ["dtr_rip_c", "rndays_rip_c", "gust_max_c", "ss_pre_c"],
    "K6": ["dtr_rip_c", "rndays_rip_c", "gust_max_c", "ss_pre_c", "cold20_pre_c", "rndays_fl_c"],
    "K9": ["dtr_rip_c", "rndays_rip_c", "gust_max_c", "ss_pre_c", "cold20_pre_c", "rndays_fl_c", "ss_rip_c", "hm_rip_c", "ta_pre_c"],
    "K6m": ["dtr_rip_c", "rndays_rip_c", "gust_max_c", "ss_pre_c", "cold20_pre_c", "rndays_fl_c",
            "m_ndvi_last_v", "m_evi_drop30", "m_ndvi_veg_len", "m_evi_trans_doy"],
    "K8": ["dtr_rip_c", "rndays_rip_c", "gust_max_c", "ss_pre_c", "cold20_pre_c", "rndays_fl_c", "ss_sep1h", "gust17_a1s14"],
    "WXC": [c + "_c" for c in ["cold17_meio", "cold20_pre", "ta_pre", "ss_pre", "rn_pre", "ta_veg", "ss_veg", "rn_veg", "heat33_fl",
                               "rndays_fl", "ss_fl", "ta_rip", "tdev_rip", "dtr_rip", "ss_rip", "rn_rip", "rndays_rip", "hm_rip",
                               "tn_rip", "gust_max", "gust17_days", "rn3d_max"]],
}
EXPS = []
for asof in ["0815", "0915", "1001", "full"]:
    for s in ["K4", "K6", "K8", "K9", "K6m"]:
        for start in (1985, 2001):
            if s == "K6m" and start == 1985:
                continue
            EXPS.append((f"{s}_ridge_{start}_{asof}", asof, SETS[s], "ridge", start))
    EXPS.append((f"K9_hgb_1985_{asof}", asof, SETS["K9"], "hgb", 1985))
    EXPS.append((f"WXC_ridge_2001_{asof}", asof, SETS["WXC"], "ridge", 2001))
    EXPS.append((f"WXC_enet_1985_{asof}", asof, SETS["WXC"], "enet", 1985))

which = sys.argv[1:]
results, coefs = {}, {}
for name, asof, cols, kind, start in EXPS:
    if which and not any(w in name for w in which):
        continue
    d = panel(asof)
    cols = [c for c in cols if c in d.columns]
    r, P, C = pm.run(d, cols, kind=kind, start=start, label=name, verbose=False)
    r.update(asof=asof, kind=kind, start=start, nfeat=len(cols), feats=cols)
    results[name] = r
    if C is not None:
        coefs[name] = C.mean(axis=1).round(4).to_dict()
    P.to_csv(os.path.join(OUT, "preds", f"prov_{name}.csv"), index=False)
    print(f"{name:28s} skill {r['skill']:+.3f} rank {r['rank_r']} nat {r['nat_rmse']} ({r['nat_rmse_base']}) e2020 {r.get('nat_err_2020')} "
          f"hit {r.get('hit_2020')} | prov rmse {r['prov_rmse']} ({r['prov_rmse_base']}) skill {r['prov_skill']:+.3f} r {r['prov_corr']}", flush=True)

for fn, obj in (("results_prov.json", results), ("coefs_prov.json", coefs)):
    p = os.path.join(OUT, fn)
    old = json.load(open(p)) if os.path.exists(p) else {}
    old.update(obj)
    json.dump(old, open(p, "w"), ensure_ascii=False, indent=1)
