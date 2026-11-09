"""최종: as-of별 앙상블(시도 ridge + 전국 ridge) 실시간 검증 2013~2025 + 2026 예측, 특징 효과(%/1SD).
출력: pheno/results.json, pheno/pred_2026.csv, pheno/preds/final_*.csv, pheno/effects.csv
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
import nat_model as nm  # noqa: E402
import common  # noqa: E402

OUT = pm.OUT
pm.TEST = list(range(2013, 2027))
pw, ph = pm.load_feats()
PT = pm.PT.rename(columns={"sc": "pv"})
K6 = ["dtr_rip_c", "rndays_rip_c", "gust_max_c", "ss_pre_c", "cold20_pre_c", "rndays_fl_c"]
K8 = K6 + ["ss_sep1h", "gust17_a1s14"]
WXC = nm.WXC
QS = (0.2, 0.33, 0.5)
# 구성원: (종류, 특징, hinge, 학습시작)
# 구성원: (수준, 특징, hinge, 학습시작, 모델, 반감기)
M915 = [("prov", WXC, [], 2001, "hgb", None), ("prov", WXC, ["ss_pre_c"], 1985, "ridge", 10), ("prov", WXC, [], 2001, "ridge", None),
        ("prov", K8, ["ss_pre_c"], 2001, "ridge", None), ("nat", K8, ["ss_pre_c"], 2001, "ridge", None), ("nat", WXC, [], 2001, "ridge", None)]
MEMBERS = {
    # 8/15: 농진청 출수기(시도 doy 225~231) 전 30일 일조 꺾은선 하나 (+ 같은 것 전국판)
    "0815": [("prov", ["ss_pre_r"], ["ss_pre_r"], 1985, "ridge", None), ("nat", ["ss_pre_r"], ["ss_pre_r"], 1985, "ridge", None)],
    "0915": M915,
    "1001": M915,
}


def panel(asof):
    d = pw[pw["asof"] == asof].merge(PT, on=["pv", "y"], how="left")
    return d.merge(ph[ph["asof"] == asof].drop(columns=["asof"]), on=["pv", "y"], how="left")


def base2026():
    t = common.targets()
    t = t[(t.y >= 2021) & (t.y <= 2025)]
    b = t.groupby(["sc", "stem"]).agg(n=("yield", "size"), name=("name", "last"),
                                     base=("yield", lambda s: np.sort(s.values)[1:-1].mean() if len(s) == 5 else np.nan),
                                     area=("area", "last")).reset_index()
    b = b[b.n == 5].drop(columns="n")
    b["y"] = 2026
    b["pv"] = b.sc.map(lambda s: pm.PMAP.get(s, s))
    return b


results, effects, p26 = {}, [], []
B26 = base2026()
for asof, mem in MEMBERS.items():
    Ps = []
    for kind, cols, hinge, start, mdl, hl in mem:
        if kind == "prov":
            r, P, C = pm.run(panel(asof), cols, kind=mdl, start=start, label=f"{asof} prov", verbose=False, hinge=hinge, qs=QS, hinge_pooled=True, decay=hl)
        else:
            nm.pw = pw
            a, C = nm.run_nat(asof, cols, start, hinge, QS)
            P = pd.DataFrame([(pv, y, v) for y, v in a.items() for pv in pm.PROV], columns=["pv", "y", "ahat"])
        Ps.append(P)
        if C is None:
            continue
        eff = (C.mean(axis=1) * 100).round(2)  # 표준화 계수 → 단수 %/1SD (해마다 학습한 계수 평균)
        for f, v in eff.items():
            effects.append((asof, kind, f"{len(cols)}feat" + ("+hinge" if hinge else ""), start, f, v))
    P = pd.concat(Ps).groupby(["pv", "y"], as_index=False).ahat.mean()
    P.to_csv(os.path.join(OUT, "preds", f"final_{asof}.csv"), index=False)
    sg = pm.T.merge(P, on=["pv", "y"])
    sg["pred_yield"] = sg.base * (1 + sg.ahat)
    r = common.evaluate(sg[["y", "sc", "stem", "pred_yield"]], f"pheno 최종 앙상블 as-of {asof}")
    pp = pm.PT.merge(P.rename(columns={"pv": "sc"}), on=["sc", "y"])
    e, e0 = pp.base * (1 + pp.ahat) - pp["yield"], pp.base - pp["yield"]
    big = pp.area >= 1000
    r["prov_rmse"] = round(float(np.sqrt(np.average(e ** 2, weights=pp.area))), 2)
    r["prov_rmse_base"] = round(float(np.sqrt(np.average(e0 ** 2, weights=pp.area))), 2)
    r["prov_skill"] = round(1 - r["prov_rmse"] / r["prov_rmse_base"], 3)
    r["members"] = [dict(level=k, n_feat=len(c), feats=c, hinge=h, start=s, model=m, halflife=hl) for k, c, h, s, m, hl in mem]
    print(f"   시도 RMSE {r['prov_rmse']} (평년 {r['prov_rmse_base']}, skill {r['prov_skill']:+.3f}; 통계청 10월 시도 9.8)")
    nat = sg.groupby("y").apply(lambda g: pd.Series({"pred_pct": 100 * (np.average(g.pred_yield, weights=g.area) / np.average(g.base, weights=g.area) - 1),
                                                     "obs_pct": 100 * (np.average(g["yield"], weights=g.area) / np.average(g.base, weights=g.area) - 1)}))
    r["nat_by_year_pct"] = nat.round(2).reset_index().to_dict("records")
    results[asof] = r
    b = B26.merge(P[P.y == 2026], on=["pv", "y"], how="left")
    b["asof"] = asof
    b["pred_yield"] = b.base * (1 + b.ahat)
    p26.append(b)

E = pd.DataFrame(effects, columns=["asof", "level", "set", "start", "feature", "pct_per_sd"])
E.to_csv(os.path.join(OUT, "effects.csv"), index=False)
P26 = pd.concat(p26)[["asof", "y", "sc", "stem", "name", "pv", "base", "ahat", "pred_yield", "area"]]
P26.round(4).to_csv(os.path.join(OUT, "pred_2026.csv"), index=False)
for asof, g in P26.groupby("asof"):
    g = g.dropna(subset=["pred_yield"])
    print(f"2026 as-of {asof}: 전국(2025 면적 가중) 평년 {np.average(g.base, weights=g.area):.1f} → 예측 {np.average(g.pred_yield, weights=g.area):.1f} kg/10a"
          f" ({100 * np.average(g.ahat, weights=g.area):+.1f}%)")
    results[asof]["pred_2026_nat"] = round(float(np.average(g.pred_yield, weights=g.area)), 1)
    results[asof]["base_2026_nat"] = round(float(np.average(g.base, weights=g.area)), 1)
json.dump({"final": results}, open(os.path.join(OUT, "results_final.json"), "w"), ensure_ascii=False, indent=1, default=str)
