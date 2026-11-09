"""시도 패널 실험 묶음. 사용: python run_prov.py [실험이름...]"""
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

WX_H = ["cold17_meio", "cold20_pre", "ta_pre", "ss_pre", "rn_pre", "ta_veg", "ss_veg", "rn_veg", "heat33_fl", "rndays_fl", "ss_fl",
        "ta_rip", "tdev_rip", "dtr_rip", "ss_rip", "rn_rip", "rndays_rip", "hm_rip", "tn_rip", "gust_max", "gust17_days", "rn3d_max"]
WX_C = [c + "_c" for c in WX_H]
CAL = ["ss_jul", "ss_aug", "ss_sep", "ta_jul", "ta_aug", "ta_sep", "rn_jul", "rn_aug", "gdd_jun_aug"]
WX_SMALL = ["cold17_meio", "ss_pre", "ss_rip", "tdev_rip", "rndays_fl", "gust_max", "rn3d_max", "heat33_fl"]
M_ALL = [c for c in ph.columns if c.startswith("m_") and c not in ("m_npix", "m_ncomp", "m_last_doy")]
M_SMALL = ["m_ndvi_peak_v", "m_ndvi_peak_doy", "m_ndvi_green_doy", "m_ndvi_drop30", "m_ndvi_auc_post40", "m_evi_peak_v", "m_evi_drop30",
           "m_ndvi_trans_doy", "m_ndvi_last_v", "m_ndvi_v230", "m_evi_auc_post40", "m_ndvi_amp"]


def panel(asof):
    d = pw[pw["asof"] == asof].merge(PT, on=["pv", "y"], how="left")
    m = ph[ph["asof"] == asof].drop(columns=["asof"])
    d = d.merge(m, on=["pv", "y"], how="left")
    return d


results = {}
which = sys.argv[1:]
EXPS = []
for asof in ["0815", "0915", "1001", "full"]:
    EXPS += [
        (f"wxH_ridge_{asof}", asof, WX_H, "ridge", 1985),
        (f"wxC_ridge_{asof}", asof, WX_C, "ridge", 1985),
        (f"cal_ridge_{asof}", asof, CAL, "ridge", 1985),
        (f"wxH+cal_ridge_{asof}", asof, WX_H + CAL, "ridge", 1985),
        (f"wxsmall_ridge_{asof}", asof, WX_SMALL, "ridge", 1985),
        (f"wxH_ridge01_{asof}", asof, WX_H, "ridge", 2001),
        (f"modis_ridge_{asof}", asof, M_SMALL, "ridge", 2001),
        (f"modisall_ridge_{asof}", asof, M_ALL, "ridge", 2001),
        (f"wxH+modis_ridge_{asof}", asof, WX_H + M_SMALL, "ridge", 2001),
        (f"wxH+modis_enet_{asof}", asof, WX_H + M_SMALL, "enet", 2001),
        (f"wxH_hgb_{asof}", asof, WX_H + CAL, "hgb", 1985),
        (f"wxH+modis_hgb_{asof}", asof, WX_H + M_SMALL, "hgb", 2001),
        (f"wxH+modis_rf_{asof}", asof, WX_H + M_SMALL, "rf", 2001),
    ]
coefs = {}
for name, asof, cols, kind, start in EXPS:
    if which and not any(w in name for w in which):
        continue
    d = panel(asof)
    cols = [c for c in cols if c in d.columns and d[c].notna().mean() > 0.5]
    r, P, C = pm.run(d, cols, kind=kind, start=start, label=name)
    r.update(asof=asof, kind=kind, start=start, nfeat=len(cols))
    results[name] = r
    if C is not None:
        coefs[name] = C.mean(axis=1).round(4).to_dict()
    P.to_csv(os.path.join(OUT, "preds", f"prov_{name}.csv"), index=False)

fn = os.path.join(OUT, "results_prov.json")
old = json.load(open(fn)) if os.path.exists(fn) else {}
old.update(results)
json.dump(old, open(fn, "w"), ensure_ascii=False, indent=1)
cf = os.path.join(OUT, "coefs_prov.json")
oc = json.load(open(cf)) if os.path.exists(cf) else {}
oc.update(coefs)
json.dump(oc, open(cf, "w"), ensure_ascii=False, indent=1)
print(pd.DataFrame(results).T[["skill", "rank_r", "nat_rmse", "nat_rmse_base", "nat_err_2020", "hit_2020", "prov_skill", "prov_corr"]].to_string())
