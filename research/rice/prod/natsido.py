"""전국·시도 단수 예측(실제값 안 씀): 0915 = 작물모델 시도 â × 시도 평년, 1010 = W·통계청 시도 예상×(1+태풍 ê) + (1−W)·0915.
전국 = 시도 예측의 그해 시도 면적 가중 합. 출력 prod/natsido.csv (y, sc, asof, pred, obs, stat)"""
import sys, os
R = '/home/eins/project/rStat/research/rice'; sys.path[:0] = [R, f'{R}/statdown', f'{R}/statfix']
import numpy as np, pandas as pd, common as C
import importlib.util
cwd = os.getcwd(); os.chdir(f'{R}/statfix')
spec = importlib.util.spec_from_file_location("sfm", f"{R}/statfix/model.py"); M = importlib.util.module_from_spec(spec); spec.loader.exec_module(M)
eh = M.nat_realtime(["gust_fill"], intercept=True); os.chdir(cwd)
eh[2026] = -0.0009  # blend/forecast_2026.py 와 같은 식(2010~2025 OLS)
k = C._kosis(); s = k[k.code.str.len() == 2].rename(columns={"code": "sc"})[["y", "sc", "yield", "area"]]
sf = pd.read_csv(f"{R}/statdown/stat_forecast_sido.csv", dtype={"sido_code": str}).rename(columns={"year": "y", "sido_code": "sc", "yield_kg10a": "stat"})
s = pd.concat([s, sf[sf.y == 2026][["y", "sc", "area_ha"]].rename(columns={"area_ha": "area"})], ignore_index=True).sort_values("y")
s["base"] = s.groupby("sc")["yield"].transform(lambda v: v.shift(1).rolling(5).apply(lambda w: (w.sum() - w.max() - w.min()) / 3, raw=True))
s = s.merge(sf[["y", "sc", "stat"]], on=["y", "sc"], how="left")
c = pd.read_csv(f"{R}/cropmodel/out_fixed/contrib_sido_0915.csv", dtype={"sc": str})[["sc", "y", "ahat"]]
c26 = pd.read_csv(f"{R}/cropmodel/out_fixed/pred_2026_sido.csv", dtype={"sc": str, "asof": str}); c26 = c26[c26["asof"] == "0915"].assign(y=2026)[["sc", "y", "ahat"]]
s = s.merge(pd.concat([c, c26]), on=["sc", "y"], how="left")
P8 = list("31 32 33 34 35 36 37 38".split())
rows = []
for y in range(2010, 2027):
    g = s[(s.y == y) & (s.sc != "00")].copy()
    m8 = g[g.sc.isin(P8) & g.ahat.notna()]
    if m8.empty: continue
    aN = np.average(m8.ahat, weights=m8.area)
    g["p0915"] = g.base * (1 + g.ahat.fillna(aN))
    g["ps"] = g.stat * (1 + eh.get(y, 0.0))
    g = g.dropna(subset=["base", "area"])
    rows.append(g)
G = pd.concat(rows)
# W 실시간: 8도 면적가중 SSE 최소 (그해 이전, 통계청 예상이 있는 해)
W = {}
for Y in sorted(G.y.unique()):
    tr = G[(G.y < Y) & G.sc.isin(P8) & G["yield"].notna() & G.ps.notna()]
    W[Y] = 1.0 if tr.y.nunique() < 3 else min(np.linspace(0, 1, 21), key=lambda w: np.average((w * tr.ps + (1 - w) * tr.p0915 - tr["yield"]) ** 2, weights=tr.area))
G["p1010"] = np.where(G.ps.notna(), G.y.map(W) * G.ps + (1 - G.y.map(W)) * G.p0915, G.p0915)
print("W", {k_: round(v, 2) for k_, v in W.items()})
N = G.groupby("y").apply(lambda g: pd.Series({c_: np.average(g[c_], weights=g.area) for c_ in ["p0915", "p1010"]})).reset_index()
N = N.merge(s[s.sc == "00"][["y", "yield", "stat", "area", "base"]], on="y").assign(sc="00")
out = pd.concat([G[["y", "sc", "p0915", "p1010", "yield", "stat", "area", "base"]], N])
out.round(2).to_csv(f"{R}/prod/natsido.csv", index=False)
for a, b in [(2013, 2025), (2010, 2025)]:
    n = N[N.y.between(a, b)]; g8 = G[G.y.between(a, b) & G.sc.isin(P8)]
    f = lambda col: "MAE %.2f RMSE %.2f" % ((n[col] - n["yield"]).abs().mean(), np.sqrt(((n[col] - n["yield"]) ** 2).mean()))
    f8 = lambda col: "%.2f" % np.sqrt(np.average((g8[col] - g8["yield"]) ** 2, weights=g8.area))
    print(f"{a}~{b} 전국: 9/15 {f('p0915')} | 10/10 {f('p1010')} | 통계청 {f('stat')} | 평년 {f('base')}")
    print(f"{a}~{b} 8도 RMSE: 9/15 {f8('p0915')} | 10/10 {f8('p1010')} | 통계청 {f8('stat')} | 평년 {f8('base')}")
print(N[N.y.isin([2020, 2024, 2026])][["y", "p0915", "p1010", "stat", "yield"]].round(1).to_string(index=False))
