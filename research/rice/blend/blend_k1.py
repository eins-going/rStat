"""10월 시점: 통계청 시도 예상 편차와 작물 생리 모델(9/15) 시도 편차를 실시간 가중 평균 → 시군 = 평년×(1+A)."""
import sys; sys.path.insert(0, '/home/eins/project/rStat/research/rice')
import numpy as np, pandas as pd, common as C
f = pd.read_csv("statdown/stat_forecast_sido.csv", dtype={"sido_code": str})
k = C._kosis(); s = k[k.code.str.len() == 2].copy().sort_values("y")
s["base"] = s.groupby("code")["yield"].transform(C._olympic); s["a"] = s["yield"] / s.base - 1
f = f[f.sido_code != "00"].rename(columns={"year": "y", "sido_code": "sc"}).merge(s[["y", "code", "base", "a", "area"]].rename(columns={"code": "sc"}), on=["y", "sc"], how="left")
f["A_stat"] = f.yield_kg10a / f.base - 1
cm = pd.read_csv(sys.argv[1] if len(sys.argv) > 1 else "cropmodel/out_fixed/contrib_sido_0915.csv", dtype={"sc": str})[["sc", "y", "ahat"]].rename(columns={"ahat": "A_crop"})
f = f.merge(cm, on=["sc", "y"], how="left")
W = {}
for Y in range(2013, 2026):
    tr = f[(f.y < Y) & f.A_crop.notna() & f.a.notna()]
    best = min(np.linspace(0, 1, 21), key=lambda w: np.average((w * tr.A_stat + (1 - w) * tr.A_crop - tr.a) ** 2, weights=tr.area))
    W[Y] = best
f["w"] = f.y.map(W)
f["A"] = np.where(f.A_crop.notna() & f.w.notna(), f.w * f.A_stat + (1 - f.w) * f.A_crop, f.A_stat)
print("해마다 통계청 가중치", W)
A = f.set_index(["y", "sc"]).A
t = C.targets()
def get(r):
    v = A.get((r.y, r.sc))
    if (v is None or v != v) and r.sc == "29": v = A.get((r.y, "34"))
    return v
t["A"] = t.apply(get, axis=1); t["pred_yield"] = t.base * (1 + t.A)
C.evaluate(t.dropna(subset=["pred_yield"]), "통계청 시도 예상 + 작물모델 9/15 실시간 가중 (k1)")
t.dropna(subset=["pred_yield"])[["y", "sc", "stem", "pred_yield"]].to_csv("blend/pred_blend_k1.csv", index=False)
