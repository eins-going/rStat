"""2단계: 시군 잔차 r = a_시군 − a_시도(확정) 를 시군−시도 차이 지표로 강하게 줄여 예측.
최종 â_시군 = â_시도(1단계 예측) + r̂.  실시간: y 이전 해로만 학습·조정.
사용: python sigun_model.py PROV_PRED_NAME ASOF
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
name, asof = sys.argv[1], sys.argv[2]
P = pd.read_csv(os.path.join(OUT, "preds", f"{name}.csv"), dtype={"pv": str})

T = pm.T.copy()
PT = pm.PT.rename(columns={"sc": "pv", "a": "a_pv"})[["pv", "y", "a_pv"]]
T = T.merge(PT, on=["pv", "y"], how="left")
T["r"] = T.a - T.a_pv
T = T.sort_values("y")
g = T.groupby(["sc", "stem"])["r"]
T["r_lag1"] = g.shift(1)
T["r_mean3"] = g.transform(lambda s: s.shift(1).rolling(3, min_periods=2).mean())
T["r_mean10"] = g.transform(lambda s: s.shift(1).rolling(10, min_periods=3).mean())

# 시군−시도 차이 지표 (MODIS·기상), 시군 과거 평균 대비
ph = pd.read_csv(os.path.join(OUT, "pheno_feats.csv"), dtype={"sc": str, "stem": str, "asof": str})
ph = ph[ph["asof"] == asof]
MC = ["ndvi_last_v", "evi_drop30", "ndvi_auc_post40", "ndvi_veg_len", "ndvi_peak_doy", "evi_peak_v", "ndvi_v230", "evi_trans_doy"]
sg = ph[(ph["level"] == "sigun") & (ph.npix >= 15)][["sc", "stem", "y"] + MC]
sd = ph[ph["level"] == "sido"][["sc", "y"] + MC]
m = sg.merge(sd, on=["sc", "y"], suffixes=("", "_p"))
for c in MC:
    m["dm_" + c] = m[c] - m[c + "_p"]
m = m[["sc", "stem", "y"] + ["dm_" + c for c in MC]]
wx = pd.read_csv(os.path.join(OUT, "wx_feats.csv"), dtype={"sc": str, "stem": str, "asof": str})
wx = wx[wx["asof"] == asof]
WC = ["dtr_rip_c", "rndays_rip_c", "gust_max_c", "ss_pre_c", "cold20_pre_c", "rn_rip_c", "ss_rip_c"]
cent = common.paddy_centroids()[["sc", "stem", "paddy_ha"]]
wx = wx.merge(cent, on=["sc", "stem"])
wx["pv"] = wx.sc.map(lambda s: pm.PMAP.get(s, s))
pwx = wx.groupby(["pv", "y"]).apply(lambda d: pd.Series(np.average(d[WC], axis=0, weights=d.paddy_ha), index=WC)).reset_index()
wx = wx.merge(pwx, on=["pv", "y"], suffixes=("", "_p"))
for c in WC:
    wx["dw_" + c] = wx[c] - wx[c + "_p"]
wx = wx[["sc", "stem", "y"] + ["dw_" + c for c in WC]]

D = T.merge(m, on=["sc", "stem", "y"], how="left").merge(wx, on=["sc", "stem", "y"], how="left").merge(P, on=["pv", "y"], how="left")
FE = [c for c in D.columns if c.startswith(("dm_", "dw_"))]
D = D.sort_values("y")
for c in FE:  # 시군 과거 평균 대비 편차
    D[c] = D[c] - D.groupby(["sc", "stem"])[c].transform(lambda s: s.shift(1).expanding(min_periods=3).mean())

SETS = {"persist": ["r_lag1", "r_mean3", "r_mean10"], "persist+modis": ["r_lag1", "r_mean3", "r_mean10"] + [c for c in FE if c.startswith("dm_")],
        "persist+wx": ["r_lag1", "r_mean3", "r_mean10"] + [c for c in FE if c.startswith("dw_")], "all": ["r_lag1", "r_mean3", "r_mean10"] + FE}
from sklearn.linear_model import Ridge  # noqa: E402

res = {}
r0 = D.dropna(subset=["ahat"]).copy()
r0["pred_yield"] = r0.base * (1 + r0.ahat)
res["stage1"] = common.evaluate(r0[["y", "sc", "stem", "pred_yield"]], f"{name} 1단계만")
for sname, cols in SETS.items():
    out = []
    for Y in pm.TEST:
        tr = D[(D.y < Y) & (D.y >= 2004)].dropna(subset=["r"])
        te = D[(D.y == Y)].dropna(subset=["ahat"])
        X, Xt = tr[cols].fillna(0).values, te[cols].fillna(0).values
        mu, sdv = X.mean(0), X.std(0) + 1e-9
        X, Xt = (X - mu) / sdv, (Xt - mu) / sdv
        w = tr.area.values
        # 연도 묶음 내부 검증으로 alpha
        yrs = tr.y.values
        best, be = None, np.inf
        for al in [10, 100, 1000, 3000, 10000, 30000]:
            e = 0
            for fy in np.unique(yrs):
                k = yrs == fy
                mdl = Ridge(alpha=al).fit(X[~k], tr.r.values[~k], sample_weight=w[~k])
                e += np.sum(w[k] * (mdl.predict(X[k]) - tr.r.values[k]) ** 2)
            if e < be:
                best, be = al, e
        mdl = Ridge(alpha=best).fit(X, tr.r.values, sample_weight=w)
        te = te.assign(rhat=mdl.predict(Xt) - mdl.intercept_ * 0, alpha=best)
        out.append(te)
    O = pd.concat(out)
    O["pred_yield"] = O.base * (1 + O.ahat + O.rhat)
    res[sname] = common.evaluate(O[["y", "sc", "stem", "pred_yield"]], f"{name} + 시군({sname})")
    res[sname]["alpha_med"] = float(O.alpha.median())
    O[["y", "sc", "stem", "pred_yield", "ahat", "rhat"]].to_csv(os.path.join(OUT, "preds", f"sigun_{name}_{sname}.csv"), index=False)
p = os.path.join(OUT, "results_sigun.json")
old = json.load(open(p)) if os.path.exists(p) else {}
old[name] = res
json.dump(old, open(p, "w"), ensure_ascii=False, indent=1)
