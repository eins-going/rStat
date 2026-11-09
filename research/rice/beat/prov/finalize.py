"""추천 구성(P8) 예측표 저장 + 결과 정리 → pred_sido_{0915,1001}.csv, results.json."""
import json
import os
import sys

import numpy as np
import pandas as pd

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import relmodel as R  # noqa: E402

rel = json.load(open(os.path.join(R.HERE, "results_rel.json")))
ph = json.load(open(os.path.join(R.HERE, "results_posthoc.json")))
REC = "P8"
res = {"recommended": REC, "definition": "M4 전국(8도 면적가중 â) + 작황시험포 시도 상대수량편차로 학습한 상대 릿지(cold_q, heading, ss_pre_c, tc_dd_cal, rn_aug; λ LOYO) × κ(직전 OOS)",
       "national_note": "전국은 예측값만으로(시도 평년×(1+â), 비8도는 8도 가중 â, 그해 시도 면적). 모든 변형에서 같음.",
       "variants_tried": {"preregistered_per_asof": 16, "posthoc_per_asof": 4, "asofs": 2, "total_runs": 40}, "asof": {}}
for asof in ["0915", "1001"]:
    pk = pd.read_pickle(os.path.join(R.HERE, f"work/rel_{asof}.pkl"))
    pr = pk["preds"][REC]
    p0 = pk["preds"]["P0"]
    o = pr[(pr.y >= 2010)].sort_values(["y", "sc"]).copy()
    o["pred_yield"] = o.pred_yield.round(2)
    o[["y", "sc", "pred_yield"]].to_csv(os.path.join(R.HERE, f"pred_sido_{asof}.csv"), index=False)
    # 해마다 고유 MSE 차이 (P8 − P0, P8 − P1) 2013~25 : 평균 ± 표준오차
    def yr_mse(p):
        x = p.merge(R.T, on=["y", "sc"]).dropna(subset=["yield"])
        g = x[x.sc.isin(R.PROV)].copy()
        g["e"] = g.pred_yield - g["yield"]
        return g.groupby("y").apply(lambda q: np.average(q.e ** 2, weights=q.area))
    diffs = {}
    for k in ["P0", "P1"]:
        d = (yr_mse(pr) - yr_mse(pk["preds"][k])).loc[2013:2025]
        diffs[f"{REC}-{k}"] = {"mean_mse_diff": round(float(d.mean()), 1), "se": round(float(d.std(ddof=1) / np.sqrt(len(d))), 1),
                               "years_better": int((d < 0).sum()), "n": int(len(d))}
    y26 = pr[pr.y == 2026].set_index("sc").pred_yield.round(1).to_dict()
    m26 = p0[p0.y == 2026].set_index("sc").pred_yield.round(1).to_dict()
    sf = R.stat()
    s26 = sf[sf.y == 2026].set_index("sc").pred_yield.to_dict()
    res["asof"][asof] = {"scores": {k: v for k, v in rel[asof]["scores"].items()},
                         "posthoc": {k.split("|")[1]: v for k, v in ph.items() if k.startswith(asof)},
                         "paired_year_test_13_25": diffs, "meta_pick": rel[asof]["extra"]["meta_pick"],
                         "pred_2026": {"P8": y26, "M4": m26, "stat_oct": s26}}
    print(asof, diffs)
    print(asof, "2026", pd.DataFrame({"P8": y26, "M4": m26, "stat": s26}).T.to_string())
json.dump(res, open(os.path.join(R.HERE, "results.json"), "w"), ensure_ascii=False, indent=1, default=str)
