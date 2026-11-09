"""태풍 바람 노출 피처를 cropmodel M4에 넣어 실시간 검증 (lswi/analyze.py 하단과 같은 틀, PHENO=fixed).

변형(features.py 문서에 미리 등록): (a) wind15 → tc_* 교체, (b) M4 + tc_*; 9/15·10/1.
지표: 시군 skill·순위r·전국 RMSE·2020 전국 오차(2013~2025), 8도 시도 skill과 8도 합 skill (1996~2004, 2005~2012, 1996~2012, 2013~2025),
      태풍 해 8도 합 오차(%p). (c) 시군 내: 시군 a − 시도 a ~ γ·Δx (Δx = 시군 tc_dd 편차 − 시도 tc_dd 편차), γ 실시간.
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

TC = ["tc_dd", "tc_max", "tc_dd_pre", "tc_dd_post", "tc_dd_cal"]
M4 = ["cold_mei", "heat_ant", "rs_pre", "rs_pre_def", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "rain_hv", "wet_head"]
PER = {"96_04": range(1996, 2005), "05_12": range(2005, 2013), "96_12": range(1996, 2013), "13_25": range(2013, 2026)}

comp = M.prep(pd.read_csv(os.path.join(R, "cropmodel/components_sido_fixed.csv"), dtype={"sc": str, "asof": str}))
tc = pd.read_csv(os.path.join(HERE, "tc_sido.csv"), dtype={"sc": str, "asof": str})
comp = comp.merge(tc, on=["sc", "y", "asof"], how="left")
# 사후(post-hoc, 결과를 본 뒤 추가): tc_dd 꼬리가 무거워 2020(1.59, 학습 최대 0.69)을 과대 외삽 → 압축 변환
comp["tc_sqrt"] = np.sqrt(comp.tc_dd)
comp["tc_log"] = np.log1p(10 * comp.tc_dd)
POST = ["tc_sqrt", "tc_log", "tc_days15", "tc_days20"]  # days: features.py 사후 추가
FE = sorted(set(M.COMP_ALL + ["sunless_pre", "sunless_post", "wind15"] + TC + POST))
an = M.anomalies(comp, FE)
for tab in an.values():
    tab["rs_pre_def"] = tab["rs_pre"].clip(upper=0)
sts = M.sido_targets()


def agg8(p, years):
    d = p.merge(sts, on=["sc", "y"]).query("sc in @M.PROV and y in @years")
    g = d.assign(wb=d.area * d.base).groupby("y").apply(lambda x: pd.Series({
        "ahat": np.average(x.ahat, weights=x.wb), "a": (x.area * x["yield"]).sum() / x.wb.sum() - 1}))
    e = g.ahat - g.a
    return round(float(1 - np.sqrt((e ** 2).mean()) / np.sqrt((g.a ** 2).mean())), 3), g


def run(feats, asof, label):
    p, coefs = M.backtest({k: v.copy() for k, v in an.items()}, sts, feats, asof, icpt="cw")
    sg = M.to_sigun(p, None, 0.0)
    r = C.evaluate(sg, label, verbose=False)
    out = {k: r[k] for k in ("skill", "rmse", "rank_r", "nat_rmse", "nat_err_2020", "hit_2020")}
    for k, yrs in PER.items():
        out["sido_" + k] = M.sido_score(p, sts, yrs)[0]
        out["agg8_" + k] = agg8(p, yrs)[0]
    _, g = agg8(p, range(1996, 2026))
    out["agg8_err_pp"] = {int(y): round(float((g.ahat - g.a).loc[y] * 100), 1) for y in (2002, 2003, 2012, 2019, 2020, 2022)}
    tcf = [f for f in feats if f.startswith("tc_") or f == "wind15"]
    out["coef_last"] = {f: coefs[max(coefs)][f] for f in tcf}
    out["coef_2012_2013"] = {f: [coefs.get(2012, {}).get(f), coefs.get(2013, {}).get(f)] for f in tcf}
    print(f"[{label:28s}] 시군 skill {out['skill']:+.3f} 순위r {out['rank_r']} 전국 {out['nat_rmse']} 2020 {out['nat_err_2020']:+.1f} | "
          f"시도 96-04 {out['sido_96_04']:+.3f} 05-12 {out['sido_05_12']:+.3f} 96-12 {out['sido_96_12']:+.3f} 13-25 {out['sido_13_25']:+.3f} | "
          f"8도합 96-04 {out['agg8_96_04']:+.3f} 05-12 {out['agg8_05_12']:+.3f} 13-25 {out['agg8_13_25']:+.3f} | err {out['agg8_err_pp']}", flush=True)
    return out, p, sg


res = {}
base_p = {}
for asof in ("0915", "1001"):
    o, p, sg = run(M4, asof, f"M4 {asof}")
    res[f"M4|{asof}"] = o
    base_p[asof] = (p, sg)
    for f in TC:
        res[f"replace:{f}|{asof}"] = run([f if x == "wind15" else x for x in M4], asof, f"wind15→{f} {asof}")[0]
        res[f"add:{f}|{asof}"] = run(M4 + [f], asof, f"M4+{f} {asof}")[0]
    res[f"add:pre+post|{asof}"] = run(M4 + ["tc_dd_pre", "tc_dd_post"], asof, f"M4+pre+post {asof}")[0]
    for f in POST:
        res[f"posthoc_replace:{f}|{asof}"] = run([f if x == "wind15" else x for x in M4], asof, f"(사후) wind15→{f} {asof}")[0]
        res[f"posthoc_add:{f}|{asof}"] = run(M4 + [f], asof, f"(사후) M4+{f} {asof}")[0]

# (c) 시군 내 검정
cs = pd.read_csv(os.path.join(HERE, "tc_sigun.csv.gz"), dtype={"sc": str, "asof": str})
asg = M.anomalies_sigun(cs, ["tc_dd"])
t = C.targets().dropna(subset=["base"])
sa = sts[["sc", "y", "a"]].rename(columns={"a": "a_sd"})
res["within"] = {}
for asof in ("0915", "1001"):
    x = asg[asof].merge(an[asof][["sc", "y", "tc_dd"]].rename(columns={"tc_dd": "tc_sd"}), on=["sc", "y"])
    x["dx"] = x.tc_dd - x.tc_sd
    d = t.merge(sa, on=["sc", "y"]).merge(x[["sc", "stem", "y", "dx", "tc_sd"]], on=["sc", "stem", "y"])
    d["resid"] = d.a - d.a_sd
    full = asg["1001"].merge(an["1001"][["sc", "y", "tc_dd"]].rename(columns={"tc_dd": "tc_sd"}), on=["sc", "y"])
    full["dx"] = full.tc_dd - full.tc_sd
    dtr = t.merge(sa, on=["sc", "y"]).merge(full[["sc", "stem", "y", "dx", "tc_sd"]], on=["sc", "stem", "y"])
    dtr["resid"] = dtr.a - dtr.a_sd
    ty = dtr[dtr.tc_sd > 0.2]  # 태풍 도-해 (시도 tc_dd 편차 > 0.2)
    desc = {"n_typhoon_sigun_years": int(len(ty)), "r_typhoon": round(float(ty.dx.corr(ty.resid)), 3),
            "r_all": round(float(dtr.dx.corr(dtr.resid)), 3), "sd_dx_typhoon": round(float(ty.dx.std()), 3),
            "r_by_year": {int(y): [int(len(g)), round(float(g.dx.corr(g.resid)), 2)] for y, g in ty.groupby("y") if len(g) >= 10}}
    p, _ = base_p[asof]
    sg = M.to_sigun(p, None, 0.0)
    sg = sg.merge(d[["sc", "stem", "y", "dx"]], on=["sc", "stem", "y"], how="left")
    gam = {}
    for Y in range(2013, 2026):
        tr = dtr[(dtr.y < Y) & (dtr.y >= 1996)].dropna(subset=["dx", "resid"])
        w = tr.area
        gam[Y] = float((w * tr.dx * tr.resid).sum() / ((w * tr.dx ** 2).sum() + 1e-9))
    sg["g"] = sg.y.map(gam)
    sg["pred_yield"] = sg.base * (1 + sg.ahat + (sg.g * sg.dx).fillna(0))
    r = C.evaluate(sg, f"(c) 시군 내 γ {asof}", verbose=True)
    desc.update({k: r[k] for k in ("skill", "rank_r", "nat_rmse", "nat_err_2020")})
    desc["gamma"] = {y: round(g, 4) for y, g in gam.items()}
    res["within"][asof] = desc
    print("  (c)", asof, {k: desc[k] for k in ("n_typhoon_sigun_years", "r_typhoon", "r_all")}, desc["r_by_year"], flush=True)

json.dump(res, open(os.path.join(HERE, "results.json"), "w"), ensure_ascii=False, indent=1)
