"""생산량(=면적×단수) 예측: 면적 예측 방식 × 단수 예측 방식, 2013~2025 시군·전국. 오차 분해와 면적→단수 구성 효과.
면적: prev(직전해), trend(직전 3년 추세), sido(직전해 × 시도 면적 변화율; 통계청 8월 재배면적 조사 = 확정 면적, 9/15 이전 공표), true(상한)
단수: base(평년), m0915(작물모델+잔차), m1010(통계청 시도 예상+모델)"""
import sys; sys.path.insert(0, '/home/eins/project/rStat/research/rice')
import numpy as np, pandas as pd, common as C
t = C.targets().sort_values("y")
g = t.groupby(["sc", "stem"])
t["a1"] = g.area.shift(1); t["a4"] = g.area.shift(4)
k = C._kosis(); s = k[k.code.str.len() == 2].rename(columns={"code": "sc", "area": "sa"})[["y", "sc", "sa"]].sort_values("y")
s["sa1"] = s.groupby("sc").sa.shift(1)
t = t.merge(s, on=["y", "sc"], how="left")
t["A_prev"] = t.a1
t["A_trend"] = t.a1 * (t.a1 / t.a4) ** (1 / 3)
t["A_sido"] = t.a1 * t.sa / t.sa1
t["A_true"] = t.area
P = {"base": t[["y", "sc", "stem"]].assign(pred_yield=t.base)}
P["m0915"] = pd.read_csv("blend/pred_crop_persist_0915.csv", dtype={"sc": str})
P["m1010"] = pd.read_csv("blend/pred_stat_crop.csv", dtype={"sc": str})
d0 = t[(t.y >= 2013) & (t.y <= 2025)].dropna(subset=["base", "yield", "a1", "a4", "A_sido"])
d0 = d0[d0.area > 0]
d0["P"] = d0["yield"] * d0.area / 100  # 톤
rows = []
for yk, pr in P.items():
    d = d0.merge(pr[["y", "sc", "stem", "pred_yield"]].rename(columns={"pred_yield": "Y"}), on=["y", "sc", "stem"])
    for ak in ["A_prev", "A_trend", "A_sido", "A_true"]:
        ph = d.Y * d[ak] / 100
        le = np.log(ph / d.P); w = d.P
        nat = d.assign(ph=ph).groupby("y")[["ph", "P"]].sum(); ne = (nat.ph / nat.P - 1) * 100
        rows.append({"단수": yk, "면적": ak, "n": len(d), "시군 %RMSE": np.sqrt(np.average(le ** 2, weights=w)) * 100,
                     "면적몫 %": np.sqrt(np.average(np.log(d[ak] / d.area) ** 2, weights=w)) * 100,
                     "단수몫 %": np.sqrt(np.average(np.log(d.Y / d["yield"]) ** 2, weights=w)) * 100,
                     "전국 %RMSE": np.sqrt((ne ** 2).mean()), "전국 최대 %": ne.abs().max()})
r = pd.DataFrame(rows).round(2)
print(r.to_string(index=False))
r.to_csv("prod/prod_test.csv", index=False)
# 구성 효과: 시도 면적 변화가 시도 단수 편차(모델 잔차)를 설명하나
d = d0.merge(P["m0915"].rename(columns={"pred_yield": "Y"}), on=["y", "sc", "stem"])
sd = d.groupby(["y", "sc"]).apply(lambda q: pd.Series({"res": np.average(q["yield"] / q.Y - 1, weights=q.area), "ach": q.sa.iloc[0] / q.sa1.iloc[0] - 1, "w": q.area.sum()})).reset_index()
print("시도: r(모델 단수 잔차, 시도 면적 변화율) =", round(sd.res.corr(sd.ach), 3), "n", len(sd))
d["ach_c"] = d.area / d.a1 - d.sa / d.sa1
d["res_c"] = (d["yield"] / d.Y - 1) - d.groupby(["y", "sc"])["yield"].transform(lambda v: 0)  # placeholder
q = d[(d.ach_c.abs() < 0.5)]
print("시군: r(모델 단수 잔차, 시군 면적 변화 − 시도 변화) [사후 면적, 상한] =", round((q["yield"] / q.Y - 1).corr(q.ach_c), 3), "n", len(q))
