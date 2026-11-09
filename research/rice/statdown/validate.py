"""통계청 10월 예상(시도) vs KOSIS 확정(시도·전국)."""
import json
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import common as c  # noqa: E402

f = pd.read_csv(os.path.join(HERE, "stat_forecast_sido.csv"), dtype={"sido_code": str})
k = c._kosis()
s = k[k.code.str.len() == 2].rename(columns={"code": "sido_code", "y": "year"})
s = s.sort_values("year")
s["base"] = s.groupby("sido_code")["yield"].transform(c._olympic)
d = f.merge(s[["year", "sido_code", "yield", "area", "base"]], on=["year", "sido_code"], how="inner")
d["err"] = d.yield_kg10a - d["yield"]
d["aerr"] = d.area_ha / d.area - 1

# 1) 전국: 시도 면적가중 합 vs 발표 전국 vs KREI 표의 통계청 값
krei = pd.read_csv(os.path.join(c.ROOT, "db/raw/krei/krei_rice_outlook.csv"))
krei = krei[krei.source_org == "통계청"].drop_duplicates("year").set_index("year").yield_kg_10a
fs = f[f.sido_code != "00"]
wsum = fs.groupby("year").apply(lambda g: np.average(g.yield_kg10a, weights=g.area_ha))
nat = pd.DataFrame({"pub": f[f.sido_code == "00"].set_index("year").yield_kg10a, "wsum": wsum.round(1), "krei": pd.to_numeric(krei, errors="coerce")})
nat = nat.join(s[s.sido_code == "00"].set_index("year")[["yield", "base"]].round(1))
nat["err"] = nat.pub - nat["yield"]
nat["err_base"] = nat.base - nat["yield"]
print(nat.to_string())

# 2) 시도 오차 (전국 제외, 서울·제주처럼 작은 곳은 따로)
ds = d[d.sido_code != "00"]
big = ds[ds.area >= 1000]
rows = []
for y, g in big.groupby("year"):
    w = g.area
    rows.append(dict(year=y, n=len(g), mae=np.average(g.err.abs(), weights=w), rmse=np.sqrt(np.average(g.err ** 2, weights=w)),
                     mae_unw=g.err.abs().mean(), bias=np.average(g.err, weights=w),
                     rmse_base=np.sqrt(np.average((g.base - g["yield"]) ** 2, weights=w)),
                     rank_r=g.yield_kg10a.rank().corr(g["yield"].rank()),
                     anom_r=(g.yield_kg10a / g.base).corr(g["yield"] / g.base),
                     area_err_pct=100 * np.average(g.aerr.abs(), weights=w)))
v = pd.DataFrame(rows).round(2)
print(v.to_string(index=False))
allg = big[big.year.between(2010, 2025)]
w = allg.area
summ = dict(n=int(len(allg)), mae=float(np.average(allg.err.abs(), weights=w)), rmse=float(np.sqrt(np.average(allg.err ** 2, weights=w))),
            bias=float(np.average(allg.err, weights=w)), rmse_base=float(np.sqrt(np.average((allg.base - allg["yield"]) ** 2, weights=w))),
            nat_mae=float(nat.err.abs().mean()), nat_rmse=float(np.sqrt((nat.err ** 2).mean())), nat_bias=float(nat.err.mean()),
            nat_rmse_base=float(np.sqrt((nat.err_base.dropna() ** 2).mean())))
summ = {k_: round(v_, 2) for k_, v_ in summ.items()}
print("시도(면적>=1000ha) 2010~2025:", summ)
# 시도별 평균 편향
print(big.groupby("sido_name").err.agg(["mean", "std", "count"]).round(1).to_string())
json.dump({"national": nat.reset_index().rename(columns={"index": "year"}).to_dict("records"), "sido_by_year": v.to_dict("records"), "summary": summ},
          open(os.path.join(HERE, "validate.json"), "w"), ensure_ascii=False, indent=1, default=float)
