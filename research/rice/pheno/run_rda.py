"""농진청 출수기(외부 달력, 시도 중앙값 doy 225~231) 기준 창 '_r' 실험 — 창은 수량을 보지 않고 정함."""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import prov_model as pm
OUT = pm.OUT
pw, ph = pm.load_feats()
PT = pm.PT.rename(columns={"sc": "pv"})
B = ["cold17_meio", "cold20_pre", "ta_pre", "ss_pre", "rn_pre", "ta_veg", "ss_veg", "rn_veg", "heat33_fl", "rndays_fl", "ss_fl", "ta_rip",
     "tdev_rip", "dtr_rip", "ss_rip", "rn_rip", "rndays_rip", "hm_rip", "tn_rip", "gust_max", "gust17_days", "rn3d_max"]
WXR = [c + "_r" for c in B]
K6R = ["dtr_rip_r", "rndays_rip_r", "gust_max_r", "ss_pre_r", "cold20_pre_r", "rndays_fl_r"]
K8R = K6R + ["ss_sep1h", "gust17_a1s14"]
EXPS = []
for asof in ["0815", "0915", "1001"]:
    EXPS += [(f"R_ssH_only_1985_{asof}", asof, ["ss_pre_r"], ["ss_pre_r"], 1985, "ridge", None),
             (f"R_K6h_1985_{asof}", asof, K6R, ["ss_pre_r"], 1985, "ridge", None),
             (f"R_K8h_1985_{asof}", asof, K8R, ["ss_pre_r"], 1985, "ridge", None),
             (f"R_K8h_2001_{asof}", asof, K8R, ["ss_pre_r"], 2001, "ridge", None),
             (f"R_WXRh_1985_hl10_{asof}", asof, WXR, ["ss_pre_r"], 1985, "ridge", 10),
             (f"R_WXR_2001_{asof}", asof, WXR, [], 2001, "ridge", None),
             (f"R_WXRh_1985_{asof}", asof, WXR, ["ss_pre_r"], 1985, "ridge", None)]
which = sys.argv[1:]
results, coefs = {}, {}
for name, asof, cols, h, start, kind, hl in EXPS:
    if which and not any(w in name for w in which):
        continue
    d = pw[pw["asof"] == asof].merge(PT, on=["pv", "y"], how="left")
    r, P, C = pm.run(d, cols, kind=kind, start=start, label=name, verbose=False, hinge=h, qs=(0.2, 0.33, 0.5), hinge_pooled=True, decay=hl)
    r.update(asof=asof, kind=kind, start=start, halflife=hl, feats=cols, hinge=h)
    results[name] = r
    if C is not None:
        coefs[name] = C.mean(axis=1).round(4).to_dict()
    P.to_csv(os.path.join(OUT, "preds", f"prov5_{name}.csv"), index=False)
    print(f"{name:26s} skill {r['skill']:+.3f} rank {r['rank_r']} nat {r['nat_rmse']} ({r['nat_rmse_base']}) e2020 {r.get('nat_err_2020')} "
          f"hit {r.get('hit_2020')} | prov rmse {r['prov_rmse']} ({r['prov_rmse_base']}) skill {r['prov_skill']:+.3f} r {r['prov_corr']}", flush=True)
for fn, obj in (("results_prov5.json", results), ("coefs_prov5.json", coefs)):
    p = os.path.join(OUT, fn)
    old = json.load(open(p)) if os.path.exists(p) else {}
    old.update(obj)
    json.dump(old, open(p, "w"), ensure_ascii=False, indent=1)
