"""사후(결과 본 뒤) 변형 — 사전 등록 아님.
P1 이삭도열병만, P2 벼멸구+흰등멸구만, P3 세균벼알마름병+깨씨무늬병 (9/16, 자기 편차, D1)
P4 사건 피해(events_sido.csv)를 2010~2025 전체 평가에 얹기: 사건 해만 β=한 해 빼기(증거용) / 실시간
"""
import json
import os
import sys

import numpy as np
import pandas as pd

D = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, D)
import test as T  # noqa: E402
from build_feats import sc_of, stem_of  # noqa: E402,F401

SETS = {"P1_panicle_blast": ["이삭도열병"], "P2_planthoppers": ["벼멸구", "흰등멸구"], "P3_grainrot_brownspot": ["세균벼알마름병", "깨씨무늬병"]}


def pest_feats(pests):
    d = pd.read_csv(os.path.join(D, "raw/ncpms/ncpms_rice_sido.csv"), dtype={"sc": str})
    d = d[(d.measure == "발생추정면적") & d.pest.isin(pests)]
    d["rnd"] = d.date.str[5:]
    a = d.groupby(["year", "sc", "rnd"])["sum"].sum().rename("ha").reset_index().rename(columns={"year": "y"})
    f = pd.read_csv(os.path.join(D, "feats_sido.csv"), dtype={"sc": str})[["y", "sc", "rnd", "area"]]
    a = a.merge(f, on=["y", "sc", "rnd"])
    a["F_area"] = a.ha / a.area
    return a


def main():
    t, m4, _ = T.load()
    R = {}
    for lab, ps in SETS.items():
        f = pest_feats(ps)
        o, b = T.run_sido(t, m4, f, col="F_area", rnd="09-16", anom=True, mode="rel")
        res, _ = T.summarize(o, t, lab + " (사후)")
        res["beta"] = {k: v for k, v in b.items() if v}
        R[lab] = res
    # P4: 사건 피해 β를 2010~2025 전체에
    ev = pd.read_csv(os.path.join(D, "events_sido.csv"), dtype={"sc": str})
    re = json.load(open(os.path.join(D, "results_events.json")))
    for mode in ["LOO", "RT"]:
        o = m4[m4.sc.isin(T.PROV)].copy()
        o["adj"] = 0.0
        for y, bb in re["beta_by_year"].items():
            b = bb[mode]
            g = ev[ev.y == int(y)].set_index("sc").xr
            m = o.y == int(y)
            o.loc[m, "adj"] = b * o.loc[m, "sc"].map(g).fillna(0).values
        o["ahat_new"] = o.ahat + o.adj
        new = T.evalp.from_ahat(o[["y", "sc", "ahat_new"]].rename(columns={"ahat_new": "ahat"}), t[t.y <= 2025])
        base = T.evalp.from_ahat(o[["y", "sc", "ahat"]], t[t.y <= 2025])
        out = {}
        for nm, yrs in [("10_25", range(2010, 2026)), ("13_25", range(2013, 2026))]:
            r = T.evalp.metrics(new, yrs, t[t.y <= 2025])
            r0 = T.evalp.metrics(base, yrs, t[t.y <= 2025])
            out[nm] = {"model": r["model"], "M4": r0["model"], "stat": r["stat"]}
            print(f"[P4 사건 {mode} {nm}] 8도w {r['model']['prov_rmse_w']} (M4 {r0['model']['prov_rmse_w']}, 통계청 {r['stat']['prov_rmse_w']}) 전국 {r['model']['nat_mae']}/{r['model']['nat_rmse']} (M4 {r0['model']['nat_mae']}/{r0['model']['nat_rmse']})")
        R[f"P4_events_{mode}"] = out
    json.dump(R, open(os.path.join(D, "results_posthoc.json"), "w"), ensure_ascii=False, indent=1, default=float)


if __name__ == "__main__":
    main()
