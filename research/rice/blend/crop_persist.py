"""작물모델 시군 예측 + ρ·(직전해 시군 잔차: 시군 실제 편차 − 시도 실제 편차). ρ는 실시간(그해 이전)으로 맞춤."""
import sys; sys.path.insert(0, '/home/eins/project/rStat/research/rice')
import numpy as np, pandas as pd, common as C
t = C.targets().dropna(subset=["a"])
pa = t.groupby(["y", "sc"]).apply(lambda g: np.average(g.a, weights=g.area)).rename("pa").reset_index()
t = t.merge(pa, on=["y", "sc"]); t["res"] = t.a - t.pa
t = t.sort_values("y"); t["res1"] = t.groupby(["sc", "stem"]).res.shift(1)
for asof in ["0815", "0915"]:
    p = pd.read_csv(f"cropmodel/out_fixed/pred_sigun_{asof}.csv", dtype={"sc": str})
    d = p.merge(t[["y", "sc", "stem", "base", "a", "res1", "area"]], on=["y", "sc", "stem"], how="left")
    d["ahat"] = d.pred_yield / d.base - 1
    out = []
    for Y in range(2013, 2026):
        tr = d[(d.y < Y) & (d.y >= 2000) & d.res1.notna() & d.a.notna()]
        r = (tr.a - tr.ahat)
        rho = float(np.sum(tr.area * tr.res1 * r) / np.sum(tr.area * tr.res1 ** 2)) if len(tr) > 50 else 0.0
        rho = max(0.0, min(rho, 0.5))
        te = d[d.y == Y].copy(); te["pred_yield"] = te.base * (1 + te.ahat + rho * te.res1.fillna(0)); te["rho"] = rho
        out.append(te)
    o = pd.concat(out)
    print(asof, "rho", o.groupby("y").rho.first().round(3).to_dict())
    C.evaluate(o, f"{asof} 작물모델 + 시군 전년잔차")
    o[["y", "sc", "stem", "pred_yield"]].to_csv(f"blend/pred_crop_persist_{asof}.csv", index=False)
