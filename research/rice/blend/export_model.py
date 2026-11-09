"""화면 시안용: 작물모델(9/15, 시군 전년 잔차 포함) 전국 단수 예측 — 2013~2025 실시간 검증값 + 2026 예측.
전국 = 예측 있는 시군 면적가중 비율(예측/확정) × KOSIS 전국 확정. 2026은 2025 면적 가중."""
import sys; sys.path.insert(0, '/home/eins/project/rStat/research/rice')
import numpy as np, pandas as pd, common as C
t = C.targets(); n = C.nation().set_index("y")
p = pd.read_csv("blend/pred_crop_persist_0915.csv", dtype={"sc": str}).merge(t, on=["y", "sc", "stem"])
r = p.groupby("y").apply(lambda g: np.average(g.pred_yield, weights=g.area) / np.average(g["yield"], weights=g.area))
out = pd.DataFrame({"y": r.index, "model": (r * n.loc[r.index, "yield"]).round(1).values})
f = pd.read_csv("blend/forecast_2026.csv", dtype={"sc": str}).dropna(subset=["area"])
out = pd.concat([out, pd.DataFrame({"y": [2026], "model": [round(float(np.average(f.p0915, weights=f.area)), 1)]})])
out.to_csv("blend/model_nat_0915.csv", index=False); print(out.to_string(index=False))
e = (out.set_index("y").model - n["yield"]).dropna(); print("MAE", round(e.abs().mean(), 2), "RMSE", round(np.sqrt((e**2).mean()), 2), "bias", round(e.mean(), 2))
