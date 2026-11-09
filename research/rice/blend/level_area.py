"""(a) 재배면적 변화 구성 효과: 시군 고유 편차(res = a − 도 a) vs 면적 변화율(그해/직전 3년 평균 − 1, 도 평균 뺌). 실제 면적 = 상한 시험.
(d) 시군 상대 수준: 9/15 작물모델 시도 â 위에 res를 지수평활(반감기 h)로 더함. h·축소 계수 모두 실시간."""
import sys; sys.path.insert(0, '/home/eins/project/rStat/research/rice')
import numpy as np, pandas as pd, common as C
t = C.targets().dropna(subset=["a"]).sort_values("y")
pa = t.groupby(["y", "sc"]).apply(lambda g: np.average(g.a, weights=g.area)).rename("pa").reset_index()
t = t.merge(pa, on=["y", "sc"]); t["res"] = t.a - t.pa
k = C._kosis(); k = k[k.code.str.len() > 2].copy(); k["sc"] = k.code.str[:2]; k["stem"] = k.name.str[:-1]; k = k.sort_values("y")
k["ach"] = k.area / k.groupby(["sc", "stem"]).area.transform(lambda v: v.shift(1).rolling(3, min_periods=3).mean()) - 1
t = t.merge(k[["y", "sc", "stem", "ach"]], on=["y", "sc", "stem"], how="left")
t["achc"] = t.ach - t.groupby(["y", "sc"]).ach.transform("mean")
e = t.dropna(subset=["achc"]); e = e[e.achc.abs() < 0.5]
print("(a) r(res, 면적변화 도내편차) =", round(e.res.corr(e.achc), 3), "n", len(e), "| 해마다:", e.groupby("y").apply(lambda g: round(g.res.corr(g.achc), 2)).to_dict())
# (d)
p = pd.read_csv("cropmodel/out_fixed/pred_sigun_0915.csv", dtype={"sc": str}).merge(t[["y", "sc", "stem", "base", "a", "res", "area"]], on=["y", "sc", "stem"])
p["ahat"] = p.pred_yield / p.base - 1
t["key"] = t.sc + t.stem
def ew(h):
    out = {}
    for key, g in t.groupby("key"):
        g = g.set_index("y").res.sort_index(); s, w, cur = 0.0, 0.0, {}
        for y in range(g.index.min(), 2027):
            cur[y] = s / w if w > 0 else np.nan
            if y in g.index:
                s = s * 0.5 ** (1 / h) + g[y]; w = w * 0.5 ** (1 / h) + 1
            else:
                s *= 0.5 ** (1 / h); w *= 0.5 ** (1 / h)
        out.update({(key, y): v for y, v in cur.items()})
    return out
H = [0.5, 1, 2, 4, 8]
E = {h: ew(h) for h in H}
p["key"] = p.sc + p.stem
for h in H:
    p[f"r{h}"] = [E[h].get((kk, y), np.nan) for kk, y in zip(p.key, p.y)]
res_rows = []
for Y in range(2013, 2026):
    tr = p[(p.y < Y) & (p.y >= 2000)]
    best = None
    for h in H:
        q = tr.dropna(subset=[f"r{h}"]); x = q[f"r{h}"]; r = q.a - q.ahat
        if len(q) < 50:
            best = best or (np.inf, 1, 0.0); continue
        rho = float(np.clip(np.sum(q.area * x * r) / np.sum(q.area * x ** 2), 0, 1))
        sse = np.average((r - rho * x) ** 2, weights=q.area)
        if best is None or sse < best[0]: best = (sse, h, rho)
    _, h, rho = best
    te = p[p.y == Y].copy(); te["pred_yield"] = te.base * (1 + te.ahat + rho * te[f"r{h}"].fillna(0)); te["h"] = h; te["rho"] = rho
    res_rows.append(te)
o = pd.concat(res_rows)
print("해마다 선택 (반감기, 계수):", o.groupby("y")[["h", "rho"]].first().round(2).to_dict("index"))
C.evaluate(o, "9/15 작물모델 + 시군 잔차 지수평활 (h·ρ 실시간)")
o[["y", "sc", "stem", "pred_yield"]].to_csv("blend/pred_crop_ew_0915.csv", index=False)
