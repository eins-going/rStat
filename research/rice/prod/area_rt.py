"""시군 면적 예측 실시간 비교 (2013~2025, 생산량 가중 log 오차 %RMSE). 시도 면적 변화율은 8월 통계청 재배면적 조사로 9/15 이전에 앎."""
import sys; sys.path.insert(0, '/home/eins/project/rStat/research/rice')
import numpy as np, pandas as pd, common as C
t = C.targets().sort_values("y"); g = t.groupby(["sc", "stem"])
for i in range(1, 5): t[f"a{i}"] = g.area.shift(i)
k = C._kosis(); s = k[k.code.str.len() == 2].rename(columns={"code": "sc", "area": "sa"})[["y", "sc", "sa"]].sort_values("y")
for i in range(1, 5): s[f"sa{i}"] = s.groupby("sc").sa.shift(i)
t = t.merge(s, on=["y", "sc"], how="left").dropna(subset=["a1", "a2", "a3", "a4", "sa1", "sa2", "sa3", "sa4", "area"])
t = t[t.area > 0]
t["base"] = t.a1 * t.sa / t.sa1
t["rel"] = np.log((t.a1 / t.a4) / (t.sa1 / t.sa4)) / 3          # 시군 3년 상대 추세(연)
t["dev"] = np.log(t.a1 / ((t.a1 + t.a2 + t.a3) / 3) / (t.sa1 / ((t.sa1 + t.sa2 + t.sa3) / 3)))  # 직전해 튐(평균회귀)
t["y_"] = np.log(t.area / t.base); t["w"] = t.area * t["yield"]
ev = lambda d, col: np.sqrt(np.average((np.log(d[col] / d.area)) ** 2, weights=d.w)) * 100
out = []
for Y in range(2013, 2026):
    tr = t[(t.y < Y) & (t.y >= 1998)]; te = t[t.y == Y].copy()
    X = tr[["rel", "dev"]].values; W = tr.w.values
    b = np.linalg.solve(X.T @ (X * W[:, None]) + 1e-9 * np.eye(2), X.T @ (tr.y_.values * W))
    te["fit"] = te.base * np.exp(te[["rel", "dev"]].values @ b); te["b"] = [b.round(2)] * len(te); out.append(te)
o = pd.concat(out)
print("계수(rel, dev):", o.groupby("y").b.first().to_dict())
print(f"직전해 그대로 {ev(o.assign(p=o.a1),'p'):.2f}% | 직전해×시도 변화 {ev(o,'base'):.2f}% | + 추세·평균회귀(실시간) {ev(o,'fit'):.2f}%")
o["p3"] = (o.a1 + o.a2 + o.a3) / 3 * o.sa / ((o.sa1 + o.sa2 + o.sa3) / 3)
print(f"직전 3년 평균×시도 변화 {ev(o,'p3'):.2f}%")
