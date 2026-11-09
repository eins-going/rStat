"""시군 예측을 시도 예측에 맞춰 비례 조정(합 일치)했을 때 시군 정확도 변화"""
import sys; R='/home/eins/project/rStat/research/rice'; sys.path.insert(0,R)
import numpy as np, pandas as pd, common as C
ns = pd.read_csv(f"{R}/prod/natsido.csv", dtype={"sc": str})
t = C.targets()
for asof, f in [("0915", "blend/pred_crop_persist_0915.csv"), ("1010", "blend/pred_stat_crop.csv")]:
    p = pd.read_csv(f, dtype={"sc": str}).merge(t[["y", "sc", "stem", "base", "area"]], on=["y", "sc", "stem"])
    t1 = t.sort_values("y").copy(); t1["a1"] = t1.groupby(["sc", "stem"]).area.shift(1)
    p = p.merge(t1[["y", "sc", "stem", "a1"]], on=["y", "sc", "stem"])
    p["w"] = p.a1
    g = p.groupby(["y", "sc"]).apply(lambda q: np.sum(q.pred_yield * q.w) / np.sum(q.base * q.w)).rename("r").reset_index()
    g = g.merge(ns[["y", "sc", f"p{asof}", "base"]].rename(columns={"base": "sbase"}), on=["y", "sc"], how="left")
    g["f"] = (g[f"p{asof}"] / g.sbase) / g.r
    q = p.merge(g[["y", "sc", "f"]], on=["y", "sc"], how="left"); q["f"] = q.f.fillna(1.0)
    print(asof, "조정 계수 분포", q.groupby(["y","sc"]).f.first().describe()[["mean","std","min","max"]].round(3).to_dict())
    C.evaluate(p, f"{asof} 그대로"); C.evaluate(q.assign(pred_yield=q.pred_yield * q.f), f"{asof} 시도 예측에 맞춤")
