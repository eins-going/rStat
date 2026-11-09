"""10/10 시점: statfix(통계청 시도 예상 + 태풍 gust 보정 + beta_p 내려쓰기) 시군 예측과
9/15 작물모델+전년잔차 시군 예측을 실시간 가중 평균 (가중치는 y<Y 시군 오차로 고름)."""
import sys, os
R = '/home/eins/project/rStat/research/rice'
sys.path[:0] = [R, f'{R}/statdown', f'{R}/statfix']
os.chdir(f'{R}/statfix')
import numpy as np, pandas as pd, common as C
import importlib.util
spec = importlib.util.spec_from_file_location("sfm", f"{R}/statfix/model.py"); M = importlib.util.module_from_spec(spec); spec.loader.exec_module(M)
sd = M.sd
eh = M.nat_realtime(["gust_fill"], intercept=True)
e = M.nat_to_prov(eh).rename("eh").reset_index()
T = M.T0.merge(e, on=["y", "sc"], how="left")
nat_e = e.merge(M.PROV[["y", "sc", "area"]], on=["y", "sc"]).groupby("y").apply(lambda g: np.average(g.eh, weights=g.area))
T["eh"] = T.eh.fillna(T.y.map(nat_e)).fillna(0.0)
T["A"] = (1 + T.A) * (1 + T.eh) - 1
sd.T = T
p, _ = sd.realtime("beta_p", select={"tau": [0.005, 0.02, 0.05, 0.2, 1.0]})
sd.T = M.T0
os.chdir(R)
C.evaluate(p, "statfix gust + beta_p (재현)")
p[["y", "sc", "stem", "pred_yield"]].to_csv("blend/pred_statfix_beta_p.csv", index=False)
cr = pd.read_csv("blend/pred_crop_persist_0915.csv", dtype={"sc": str}).rename(columns={"pred_yield": "p_crop"})
t = C.targets()[["y", "sc", "stem", "yield", "area", "base"]]
d = p.rename(columns={"pred_yield": "p_stat"})[["y", "sc", "stem", "p_stat"]].merge(cr[["y", "sc", "stem", "p_crop"]], on=["y", "sc", "stem"], how="left").merge(t, on=["y", "sc", "stem"])
d["p_crop"] = d.p_crop.fillna(d.p_stat)
W = {}
for Y in sorted(d.y.unique()):
    tr = d[d.y < Y]
    if tr.y.nunique() < 3: W[Y] = 1.0; continue
    W[Y] = min(np.linspace(0, 1, 21), key=lambda w: np.average((w * tr.p_stat + (1 - w) * tr.p_crop - tr["yield"]) ** 2, weights=tr.area))
print("통계청 가중", W)
d["pred_yield"] = d.y.map(W) * d.p_stat + (1 - d.y.map(W)) * d.p_crop
C.evaluate(d, "statfix + 작물모델 9/15 시군 실시간 가중")
for w in (0.9, 0.8, 0.7, 0.6, 0.5):
    C.evaluate(d.assign(pred_yield=w * d.p_stat + (1 - w) * d.p_crop), f"고정 w={w} (참고, 사후)")
d[["y", "sc", "stem", "pred_yield"]].to_csv("blend/pred_stat_crop.csv", index=False)
