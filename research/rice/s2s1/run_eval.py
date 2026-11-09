"""특징 묶음별 실시간 평가 → results.json"""
import json, os, sys, io, contextlib
import numpy as np, pandas as pd
sys.path.insert(0, "/home/eins/project/rStat/research/rice")
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import common
from model import load, transform, realtime, diag, hybrid
OUT = os.path.dirname(os.path.abspath(__file__))

S2_0815 = ["ndvi_a1", "ndre_a1", "cire_a1", "lswi_a1", "ndvi_jul", "lswi_jul"]
S2_CAL = ["ndvi_s1", "ndre_s1", "cire_s1", "lswi_s1", "ndre_a2", "lswi_a2"]
S2_REL = ["peak_doy", "ndre_p10_30", "cire_p10_30", "lswi_p10_30", "ndre_max", "ndvi_max"]
S2_LATE = ["ndre_s2", "lswi_s2", "ndvi_s2", "sen_slope", "ndre_p30_50", "lswi_p30_50"]
W_0815 = ["ss_0716_0815_an", "rn_0716_0815_an", "ta_0716_0815_an"]
W_0915 = ["ss_0815_0915_an", "ta_0815_0915_an", "rn_0716_0915_an", "ss_0801_0831_an"]
W_1001 = W_0915 + ["ss_0901_0930_an", "tmin_0901_0930_an"]
S1_0915 = ["s1vh_s1", "s1vv_s1", "s1vhvv_s1", "s1vh_d_s1a1", "s1vv_d_s1a1", "s1vv_maxdrop", "s1vh_maxdrop"]
S1_1001 = S1_0915 + ["s1vh_s2", "s1vv_s2", "s1vhvv_s2"]

SETS = {
    "0815": {"s2": S2_0815, "s2res": ["ndvi_r_a", "ndre_r_a", "cire_r_a", "lswi_r_a"], "w": W_0815, "s1": ["s1vh_a1", "s1vv_a1", "s1vhvv_a1"]},
    "0915": {"s2": S2_CAL + S2_REL, "s2res": ["ndvi_r_as", "ndre_r_as", "cire_r_as", "lswi_r_as", "ndre_r_s", "lswi_r_s"], "s2cal": S2_CAL, "s2rel": S2_REL, "w": W_0915, "s1": S1_0915},
    "1001": {"s2": S2_CAL + S2_REL + S2_LATE, "s2res": ["ndvi_r_as", "ndre_r_as", "cire_r_as", "lswi_r_as", "ndre_r_s", "lswi_r_s", "ndvi_r_s"], "s2cal": S2_CAL + ["ndre_s2", "lswi_s2", "ndvi_s2"], "s2rel": S2_REL + ["ndre_p30_50", "lswi_p30_50", "sen_slope"],
             "w": W_1001, "s1": S1_1001},
}


def ev(pred, label, years):
    with contextlib.redirect_stdout(io.StringIO()):
        r = common.evaluate(pred, label, years=years)
    print(f"  {label:42s} n={r['n']:4d} RMSE {r['rmse']:6.2f} (평년 {r['rmse_base']:6.2f}) skill {r['skill']:+.3f} rank_r {r['rank_r']} 전국 {r['nat_rmse']}/{r['nat_rmse_base']} 2020 {r.get('nat_err_2020')} hit {r.get('hit_2020')}")
    return r


def main(years_rt=range(2019, 2026)):
    res = {"realtime": [], "loyo": [], "diag": {}}
    for asof, S in SETS.items():
        d = load(asof)
        allc = sorted(set(sum(S.values(), [])))
        allc = [c for c in allc if c in d.columns]
        d = transform(d, allc)
        print(f"== as-of {asof}: 시군-연도 {len(d)} 연도 {sorted(d.y.unique())}")
        res["diag"][asof] = diag(d, [c + "_c" for c in allc] + [c + "_o" for c in allc] + [c + "_oc" for c in allc])
        combos = {}
        for k in S:
            cols = [c for c in S[k] if c in d.columns]
            combos[f"{k}_c"] = [c + "_c" for c in cols]
            combos[f"{k}_o"] = [c + "_o" for c in cols]
            combos[f"{k}_raw"] = cols
            combos[f"{k}_oc"] = [c + "_oc" for c in cols]
        s2 = [c for c in S["s2"] if c in d.columns]
        w = [c for c in S["w"] if c in d.columns]
        s1 = [c for c in S["s1"] if c in d.columns]
        combos["s2_c+o"] = [c + "_c" for c in s2] + [c + "_o" for c in s2]
        combos["s2_c+w"] = [c + "_c" for c in s2] + w
        combos["s2_c+o+w"] = [c + "_c" for c in s2] + [c + "_o" for c in s2] + w
        if s1:
            combos["s2_c+s1_c"] = [c + "_c" for c in s2] + [c + "_c" for c in s1]
            combos["s2_c+s1_c+w"] = [c + "_c" for c in s2] + [c + "_c" for c in s1] + w
        for yrs_lbl, yrs in [("2019-2025", list(years_rt)), ("2020-2025", [y for y in years_rt if y >= 2020])]:
            print(f" -- 실시간 {yrs_lbl}")
            for name, cols in combos.items():
                for mode in (["full", "cs"] if name.endswith("_c") or name.endswith("_oc") or "_c+" in name else ["full"]):
                    p = realtime(d, cols, yrs, mode=mode)
                    if p is None or p.empty:
                        continue
                    r = ev(p, f"{asof} {name} {mode}", yrs)
                    r.update(asof=asof, feats=name, mode=mode, test=yrs_lbl)
                    res["realtime"].append(r)
                    if yrs_lbl == "2020-2025" and asof == "0915" and mode == "full":
                        p.to_csv(f"{OUT}/pred_{asof}_{name}.csv", index=False)
        W4 = {"0815": W_0815, "0915": W_0915, "1001": W_0915}[asof]
        hyb = {"평년+s2_c": ([c + "_c" for c in s2], []), "평년+s2_oc": ([c + "_oc" for c in s2], []),
               "기상+s2_oc": ([c + "_oc" for c in s2], W4), "기상+s2_c+oc": ([c + "_c" for c in s2] + [c + "_oc" for c in s2], W4), "기상": ([], W4), "기상+s2_c": ([c + "_c" for c in s2], W4),
               "기상+s2cal_c": ([c + "_c" for c in S.get("s2cal", s2) if c in d.columns], W4),
               "기상+s2rel_c": ([c + "_c" for c in S.get("s2rel", s2) if c in d.columns], W4)}
        rs = [c for c in S["s2res"] if c in d.columns]
        hyb["평년+s2res_c"] = ([c + "_c" for c in rs], [])
        hyb["기상+s2res_c"] = ([c + "_c" for c in rs], W4)
        hyb["기상+s2res_c+s2_c"] = ([c + "_c" for c in rs] + [c + "_c" for c in s2], W4)
        if s1:
            hyb["기상+s2res_c+s1_c"] = ([c + "_c" for c in rs] + [c + "_c" for c in s1], W4)
            hyb["기상+s2_c+s1_c"] = ([c + "_c" for c in s2] + [c + "_c" for c in s1], W4)
            hyb["기상+s1_c"] = ([c + "_c" for c in s1], W4)
        for yrs_lbl, yrs in [("2019-2025", list(years_rt)), ("2020-2025", [y for y in years_rt if y >= 2020])]:
            print(f" -- 혼합(기상 긴 이력 + 위성 같은 해 편차) {yrs_lbl}")
            for name, (cc, wc) in hyb.items():
                p = hybrid(d, cc, wc, yrs)
                if p is None:
                    continue
                r = ev(p, f"{asof} H {name}", yrs)
                r.update(asof=asof, feats="H " + name, mode="hybrid", test=yrs_lbl)
                res["realtime"].append(r)
                if yrs_lbl == "2020-2025":
                    p.to_csv(f"{OUT}/pred_{asof}_H_{name}.csv", index=False)
        print(" -- (보조) leave-one-year-out 2018-2025")
        for name in ["s2_c", "s2_o", "s2_c+o", "s2_c+w", "w_raw"] + (["s2_c+s1_c"] if s1 else []):
            p = realtime(d, combos[name], list(range(2018, 2026)), mode="full", loyo=True)
            if p is None:
                continue
            r = ev(p, f"LOYO {asof} {name}", list(range(2018, 2026)))
            r.update(asof=asof, feats=name, mode="loyo")
            res["loyo"].append(r)
    json.dump(res, open(f"{OUT}/results.json", "w"), ensure_ascii=False, indent=1)
    return res


if __name__ == "__main__":
    main()
