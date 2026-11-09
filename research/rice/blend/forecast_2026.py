"""2026 시점별 예측 (검증한 모델 그대로, 2025년까지 학습):
 8/15·9/15 = 작물모델 시군 + ρ·(2025 시군 잔차)   (ρ: 2000~2025 적합, [0,0.5])
 10/10     = w·[통계청 시도 예상 내려쓰기 × (1+태풍 보정 ê)] + (1−w)·9/15   (w: 2013~2025 시군 오차로 고름)
 출력 blend/forecast_2026.csv (시군), 화면 요약 출력."""
import sys; R = '/home/eins/project/rStat/research/rice'; sys.path.insert(0, R)
import numpy as np, pandas as pd, common as C
t = C.targets().dropna(subset=["a"])
pa = t.groupby(["y", "sc"]).apply(lambda g: np.average(g.a, weights=g.area)).rename("pa").reset_index()
t = t.merge(pa, on=["y", "sc"]); t["res"] = t.a - t.pa
r25 = t[t.y == 2025][["sc", "stem", "res", "area"]].rename(columns={"res": "res1"})
t = t.sort_values("y"); t["res1"] = t.groupby(["sc", "stem"]).res.shift(1)
cm26 = pd.read_csv(f"{R}/cropmodel/pred_2026.csv", dtype={"sc": str, "asof": str})
out = {}
for asof in ["0815", "0915"]:
    p = pd.read_csv(f"{R}/cropmodel/out_fixed/pred_sigun_{asof}.csv", dtype={"sc": str})
    d = p.merge(t[["y", "sc", "stem", "base", "a", "res1", "area"]], on=["y", "sc", "stem"])
    d["ahat"] = d.pred_yield / d.base - 1
    tr = d[(d.y >= 2000) & d.res1.notna() & d.a.notna()]
    rho = float(np.clip(np.sum(tr.area * tr.res1 * (tr.a - tr.ahat)) / np.sum(tr.area * tr.res1 ** 2), 0, 0.5))
    g = cm26[cm26["asof"] == asof].merge(r25, on=["sc", "stem"], how="left")
    g["pred"] = g.base * (1 + g.ahat + rho * g.res1.fillna(0))
    out[asof] = g.set_index(["sc", "stem"])
    print(asof, "rho", round(rho, 3))
# 10/10: 태풍 보정 ê (전국 e ~ gust_fill, 2010~2025 OLS)
f = pd.read_csv(f"{R}/blend/features_sido_2026.csv", dtype={"sc": str}); n = f[f.sc == "00"].set_index("y")
tr = n.loc[n.index < 2026].dropna(subset=["e", "gust_fill"])
X = np.c_[np.ones(len(tr)), tr.gust_fill]; b = np.linalg.lstsq(X, tr.e.values, rcond=None)[0]
eh = float(b[0] + b[1] * n.loc[2026, "gust_fill"])
print(f"태풍 보정: 2026 강풍일 편차 {n.loc[2026, 'gust_fill']:+.2f}, ê {eh:+.4f}")
sd = pd.read_csv(f"{R}/statdown/pred_2026.csv", dtype={"sc": str}).set_index(["sc", "stem"])
sd["p_stat"] = sd.pred_yield * (1 + eh)
W = 0.7  # blend/stat_crop.py 실시간 가중치의 2025년 값
o = out["0915"][["base", "pred"]].rename(columns={"pred": "p0915"}).join(out["0815"].pred.rename("p0815")).join(sd.p_stat, how="left").join(r25.set_index(["sc", "stem"]).area)
o["p1010"] = np.where(o.p_stat.notna(), W * o.p_stat + (1 - W) * o.p0915, o.p0915)
o = o.reset_index(); o.round(1).to_csv(f"{R}/blend/forecast_2026.csv", index=False)
m = o.dropna(subset=["area"])
print("전국(149~시군 2025 면적 가중) kg/10a:", {c: round(float(np.average(m[c], weights=m.area)), 1) for c in ["base", "p0815", "p0915", "p_stat", "p1010"] if m[c].notna().all()})
print("p_stat 결측", int(m.p_stat.isna().sum()))
