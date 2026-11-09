"""출수 전 일조 꺾은선(hinge) 실험 — 창은 미리 정한 '시도 기후 출수일(MODIS 정점 과거 중앙값) 전 30일'(ss_pre_c), q는 내부 검증으로 고름."""
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
QS = (0.2, 0.33, 0.5)
EXPS = []
for asof in ["0815", "0915", "1001"]:
    EXPS += [(f"ssH_only_{asof}", asof, ["ss_pre_c"], ["ss_pre_c"], False),
             (f"ssH_pooled_{asof}", asof, ["ss_pre_c"], ["ss_pre_c"], True),
             (f"K6+ssH_{asof}", asof, K6, ["ss_pre_c"], False),
             (f"K6+ssH_pooled_{asof}", asof, K6, ["ss_pre_c"], True),
             (f"K6+ssH+dtrH_pooled_{asof}", asof, K6, ["ss_pre_c", "dtr_rip_c"], True)]
which = sys.argv[1:]
results, coefs = {}, {}
for name, asof, cols, hinge, pooled in EXPS:
    if which and not any(w in name for w in which):
        continue
    d = panel(asof)
    r, P, C = pm.run(d, cols, kind="ridge", start=1985, label=name, verbose=False, hinge=hinge, qs=QS, hinge_pooled=pooled)
    r.update(asof=asof, kind="ridge", start=1985, feats=cols, hinge=hinge, pooled=pooled)
    results[name] = r
    coefs[name] = C.mean(axis=1).round(4).to_dict()
    P.to_csv(os.path.join(OUT, "preds", f"prov_{name}.csv"), index=False)
    print(f"{name:28s} skill {r['skill']:+.3f} rank {r['rank_r']} nat {r['nat_rmse']} ({r['nat_rmse_base']}) e2020 {r.get('nat_err_2020')} "
          f"hit {r.get('hit_2020')} | prov rmse {r['prov_rmse']} ({r['prov_rmse_base']}) skill {r['prov_skill']:+.3f} r {r['prov_corr']}", flush=True)
for fn, obj in (("results_prov.json", results), ("coefs_prov.json", coefs)):
    p = os.path.join(OUT, fn)
    old = json.load(open(p)) if os.path.exists(p) else {}
    old.update(obj)
    json.dump(old, open(p, "w"), ensure_ascii=False, indent=1)
