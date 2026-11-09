"""도열병 지수 평가 — features.py 문서의 사전 등록 그대로 (lswi/analyze.py 하네스, M4 9/15 +0.305 재현 확인).
(a) M4 wet_head → blast_neck 교체, (b) M4 + blast_neck (주) / 보조 변형들
긴 기간: 8도 시도 skill · 8도 합 skill (1996~2004 · 2005~2012 · 2013~2025)
(c) 도 안: Δ지수(시군 편차 − 시도 편차) vs 시군 a − 시도 a, γ 실시간
"""
import json
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
R = os.path.dirname(HERE)
sys.path[:0] = [R, os.path.join(R, "cropmodel")]
os.environ.setdefault("PHENO", "fixed")
import common as C  # noqa: E402
import model as M  # noqa: E402

BF = ["blast_neck", "blast_leaf", "blastam_leaf", "wet_neck_cnt"]
comp = M.prep(pd.read_csv(os.path.join(R, "cropmodel/components_sido_fixed.csv"), dtype={"sc": str, "asof": str}))
bs = pd.read_csv(os.path.join(HERE, "blast_sido.csv"), dtype={"sc": str, "asof": str})
comp = comp.merge(bs, on=["sc", "y", "asof"], how="left")
FE = M.COMP_ALL + ["sunless_pre", "sunless_post", "wind15"] + BF
an = M.anomalies(comp, sorted(set(FE)))
for tab in an.values():
    tab["rs_pre_def"] = tab["rs_pre"].clip(upper=0)
M4 = ["cold_mei", "heat_ant", "rs_pre", "rs_pre_def", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "rain_hv", "wet_head"]
NOWET = [f for f in M4 if f != "wet_head"]
st = M.sido_targets()

VARIANTS = {
    "M4 (기준)": M4,
    "M4 − wet_head": NOWET,
    "(a) 교체: blast_neck": NOWET + ["blast_neck"],
    "(b) 추가: M4 + blast_neck": M4 + ["blast_neck"],
    "보조: M4 + blast_leaf": M4 + ["blast_leaf"],
    "보조: 교체 neck+leaf": NOWET + ["blast_neck", "blast_leaf"],
    "보조: M4 + blastam_leaf": M4 + ["blastam_leaf"],
    "진단: 교체 wet_neck_cnt": NOWET + ["wet_neck_cnt"],
}
PERIODS = [(1996, 2004), (2005, 2012), (2013, 2025)]


def tot8(p, years):
    d = p.merge(st, on=["sc", "y"]).query("sc in @M.PROV and y >= @years[0] and y <= @years[1]")
    d = d.assign(pr=d.base * (1 + d.ahat))
    g = d.groupby("y").apply(lambda x: pd.Series({k: np.average(x[k], weights=x.area) for k in ("pr", "yield", "base")}))
    e, e0 = g.pr - g["yield"], g.base - g["yield"]
    return round(float(1 - np.sqrt((e ** 2).mean()) / np.sqrt((e0 ** 2).mean())), 3)


res, keep = {}, {}
an_print = an["0915"].merge(st, on=["sc", "y"]).query("sc in @M.PROV and y >= 1990")
print("8도 지표 편차 상관(9/15, 1990~):\n", an_print[["wet_head"] + BF + ["a"]].corr().round(2).to_string(), flush=True)
for name, feats in VARIANTS.items():
    r = {}
    for asof in ("0915", "1001"):
        p, coefs = M.backtest(an, st, feats, asof, icpt="cw")
        sg = M.to_sigun(p, None, 0.0)
        e = C.evaluate(sg, f"{name} {asof}", verbose=False)
        r[asof] = {k: e[k] for k in ("skill", "rmse", "rank_r", "nat_rmse", "nat_err_2020", "hit_2020")}
        if asof == "0915":
            r["sido"] = [M.sido_score(p, st, range(a, b + 1))[0] for a, b in PERIODS]
            r["tot8"] = [tot8(p, (a, b)) for a, b in PERIODS]
            j = p.merge(st, on=["sc", "y"]).query("sc == '35' and y == 2021")
            r["jb2021"] = [round(float(j.ahat.iloc[0]) * 100, 2), round(float(j.a.iloc[0]) * 100, 2)]
            bf = [f for f in feats if f in BF + ["wet_head"]]
            r["contrib2021_jb"] = {f: round(float(p[(p.sc == "35") & (p.y == 2021)]["c_" + f].iloc[0]) * 100, 2) for f in bf}
            r["contrib2020_8"] = {f: round(float(p[(p.y == 2020) & p.sc.isin(M.PROV)].merge(st, on=["sc", "y"]).pipe(
                lambda d: np.average(d["c_" + f], weights=d.area))) * 100, 2) for f in bf}
            r["coef2025"] = {f: coefs[2025][f] for f in bf}
            keep[name] = p
    res[name] = r
    print(f"{name:28s} 9/15 skill {r['0915']['skill']:+.3f} rank {r['0915']['rank_r']} 전국 {r['0915']['nat_rmse']} 2020 {r['0915']['nat_err_2020']}"
          f" | 10/1 {r['1001']['skill']:+.3f} 전국 {r['1001']['nat_rmse']} 2020 {r['1001']['nat_err_2020']}"
          f" | 시도 {r['sido']} 8도합 {r['tot8']} | 전북2021 â {r['jb2021'][0]} 실제 {r['jb2021'][1]} 기여 {r['contrib2021_jb']} | 2020 8도 기여 {r['contrib2020_8']}", flush=True)

# (c) 도 안 신호
cs = pd.read_csv(os.path.join(HERE, "blast_sigun.csv.gz"), dtype={"sc": str, "asof": str})
cw = pd.read_csv(os.path.join(R, "cropmodel/components_sigun_fixed.csv.gz"), dtype={"sc": str, "asof": str},
                 usecols=["y", "asof", "sc", "stem", "wet_head"])
cs = cs.merge(cw, on=["y", "asof", "sc", "stem"], how="left")
asg = M.anomalies_sigun(cs, ["blast_neck", "wet_head", "blast_leaf"])
t = C.targets().dropna(subset=["base"])
t = t.merge(st[["sc", "y", "a"]].rename(columns={"a": "a_sd"}), on=["sc", "y"], how="left")
t["res"] = t.a - t.a_sd
base_p = keep["M4 (기준)"]
sg0 = M.to_sigun(base_p, None, 0.0)
within = {}
for f in ("blast_neck", "wet_head", "blast_leaf"):
    tabs = {}
    for tag in ("0915", "1001"):
        x = asg[tag][["sc", "stem", "y", f]].merge(an[tag][["sc", "y", f]].rename(columns={f: "sd"}), on=["sc", "y"], how="left")
        x["d"] = x[f] - x.sd
        tabs[tag] = x[["sc", "stem", "y", "d"]]
    tr_all = t.merge(tabs["1001"], on=["sc", "stem", "y"]).dropna(subset=["d", "res"])
    tr_all = tr_all[tr_all.y >= 2001]
    pool = tr_all[tr_all.y <= 2025]
    gam, rows = {}, []
    for Y in range(2013, 2026):
        tr = pool[pool.y < Y]
        gam[Y] = float((tr.d * tr.res).sum() / (tr.d ** 2).sum())
    te = sg0.merge(tabs["0915"], on=["sc", "stem", "y"], how="left")
    te["d"] = te.d.fillna(0)
    te["ahat"] = te.ahat + te.y.map(gam).fillna(0) * te.d
    te["pred_yield"] = te.base * (1 + te.ahat)
    e = C.evaluate(te, f"(c) 도 안 γ·Δ{f} 9/15", verbose=True)
    jb = pool[(pool.sc == "35") & (pool.y == 2021)]
    jb9 = t.merge(tabs["0915"], on=["sc", "stem", "y"]).query("sc == '35' and y == 2021").dropna(subset=["d", "res"])
    within[f] = {"r_pool_2001_2025": round(float(pool.d.corr(pool.res)), 3),
                 "r_2013_2025": round(float(pool[pool.y >= 2013].d.corr(pool[pool.y >= 2013].res)), 3),
                 "gamma_2013": round(gam[2013], 4), "gamma_2025": round(gam[2025], 4),
                 "skill": e["skill"], "rank_r": e["rank_r"], "nat_rmse": e["nat_rmse"],
                 "jb2021_r": round(float(jb9.d.corr(jb9.res)), 3) if len(jb9) > 3 else None, "jb2021_n": int(len(jb9))}
    print(f"   {f}: {within[f]}", flush=True)
    if f == "blast_neck":
        print(jb9[["stem", "d", "res"]].assign(res=lambda d: (d.res * 100).round(1), d=lambda d: d.d.round(2)).to_string(index=False))
res["within"] = within
json.dump(res, open(os.path.join(HERE, "results.json"), "w"), ensure_ascii=False, indent=1)
