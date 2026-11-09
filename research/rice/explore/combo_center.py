"""전국 지키기 변형 — 보정량에서 그해 8도 면적가중 평균 이동을 빼 시도 사이 재배분만 (전국 불변).
변형: NP(지금), NPc(N+P 둘 다 중심화), N+Pc(N은 그대로, P만 중심화). 기준선·채택 규칙은 combo.py와 같음 + 전국 MAE·RMSE 나빠지지 않을 것.
"""
import os, sys, warnings
import numpy as np, pandas as pd
warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import battery as BT, combo as CB
M = BT.M
asof = "1001"
an, an_sg, st, base = BT.load_common(asof)
sd = base.merge(st, on=["sc", "y"], how="left")
sd = sd[sd.sc.isin(M.PROV) & sd.y.between(1995, 2026)].reset_index(drop=True)
nc = pd.read_csv(os.path.join(CB.RICE, "ncpms", "feat_sido.csv"), dtype={"sc": str, "asof": str}); nc = nc[nc["asof"] == asof][["sc", "y", "np_blast_c"]]
N = CB.add_N(sd, nc)
NP, _ = CB.add_P(sd.assign(cur=N), "cur")
def center(v):
    s = pd.Series(v - sd.ahat.values)
    m = s.groupby(sd.y).transform(lambda q: np.average(q, weights=sd.area[q.index].fillna(sd.area.mean())))
    return sd.ahat.values + (s - m).values
NPc = center(NP)
Nc_part = N - sd.ahat.values
NPonly = NP - N  # P 몫
NcP = sd.ahat.values + Nc_part + (center(sd.ahat.values + NPonly) - sd.ahat.values)
t = BT.sigun_table(asof); t = t[t.sc.isin(set(M.PROV)) | t.grp.isin(set(M.PROV))]
for nm, v in [("BASE", sd.ahat.values), ("NP", NP), ("NPc", NPc), ("N+Pc", NcP)]:
    q = sd.assign(p=v); shift = dict(zip(zip(sd.sc, sd.y), v - sd.ahat.values)); o = {}
    for lo in (2013, 2015):
        m = q.y.between(lo, 2025) & q.a.notna()
        o[f"시도{lo}"] = round(float(np.sqrt(np.average((q.base[m] * (1 + q.p[m]) - q["yield"][m]) ** 2, weights=q.area[m]))), 2)
        g = t[t.y.between(lo, 2025)].dropna(subset=["base", "yield", "a_base"]).copy()
        g["ab"] = g.a_base + [shift.get((s, y), shift.get((gg, y), 0.0)) for s, y, gg in zip(g.sc, g.y, g.grp)]
        rm = lambda p: float(np.sqrt(np.average((g.base * (1 + p) - g["yield"]) ** 2, weights=g.area)))  # noqa: E731
        o[f"시군skill{lo}"] = round(1 - rm(g.ab) / rm(0 * g.ab), 4)
    z = q[q.y.between(2013, 2025) & q.a.notna()]
    natp = z.groupby("y").apply(lambda r: np.average(r.base * (1 + r.p), weights=r.area)); natt = z.groupby("y").apply(lambda r: np.average(r["yield"], weights=r.area))
    e = natp - natt
    o["8도합 MAE"], o["8도합 RMSE"] = round(float(e.abs().mean()), 2), round(float(np.sqrt((e ** 2).mean())), 2)
    yrs = {Y: round(float(np.sqrt(np.average((r.base * (1 + r.p) - r["yield"]) ** 2, weights=r.area)) - np.sqrt(np.average((r.base * (1 + r.ahat) - r["yield"]) ** 2, weights=r.area))), 2) for Y, r in z.groupby("y")}
    o["개선해"], o["최악"] = sum(x < 0 for x in yrs.values()), max(yrs.values())
    print(nm, o)
