"""작물 생리 모델(시도 â) vs 통계청 10월 예상 — 같은 시도·같은 해 비교 (kg/10a).

사용: PHENO=fixed .venv/bin/python research/rice/cropmodel/compare_stat.py
"""
import json
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
sys.path.insert(0, os.path.dirname(HERE))
import model as M  # noqa: E402

SUF = "" if os.environ.get("PHENO", "adaptive") == "adaptive" else "_fixed"
OUT = os.path.join(HERE, "out" + SUF)
st = M.sido_targets()
sf = pd.read_csv(os.path.join(os.path.dirname(HERE), "statdown/stat_forecast_sido.csv"), dtype={"sido_code": str})
sf = sf.rename(columns={"year": "y", "sido_code": "sc", "yield_kg10a": "stat"})[["y", "sc", "stat"]]
res = {}
for a in ["0815", "0915", "1001"]:
    p = pd.read_csv(os.path.join(OUT, f"contrib_sido_{a}.csv"), dtype={"sc": str})
    d = p.merge(st, on=["sc", "y"]).merge(sf, on=["sc", "y"], how="left")
    d["pred"] = d.base * (1 + d.ahat)
    for yrs, lab in [(range(2010, 2026), "10_25"), (range(2013, 2026), "13_25")]:
        g = d[d.sc.isin(M.PROV) & d.y.isin(list(yrs))]
        r = lambda e: round(float(np.sqrt((e ** 2).mean())), 2)  # noqa: E731
        res[f"{a}|8도|{lab}"] = {"model": r(g.pred - g["yield"]), "base": r(g.base - g["yield"]), "stat": r((g.stat - g["yield"]).dropna())}
    g = d[d.sc.isin(M.PROV)]
    nat = g.groupby("y").apply(lambda x: pd.Series({"obs": np.average(x["yield"], weights=x.area), "model": np.average(x.pred, weights=x.area),
                                                  "base": np.average(x.base, weights=x.area), "stat": np.average(x.stat, weights=x.area) if x.stat.notna().all() else np.nan}))
    e = nat.sub(nat.obs, axis=0).drop(columns="obs").round(1)
    e.to_csv(os.path.join(OUT, f"nation8_err_{a}.csv"))
    print(f"\n[as-of {a}] 8도 면적가중 전국 오차 (예측-실제, kg)\n", e.loc[2010:].T.to_string())
    print("RMSE 2013~25:", e.loc[2013:].pow(2).mean().pow(0.5).round(2).to_dict(), " MAE:", e.loc[2013:].abs().mean().round(2).to_dict())
for k, v in res.items():
    print(k, v)
json.dump(res, open(os.path.join(OUT, "compare_stat.json"), "w"), ensure_ascii=False, indent=1)
