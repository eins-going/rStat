"""9/15 결합 Pc+S1과 지금 방식(BASE)의 2026 시군 예측을 확정(11/13) 전에 기록 → out/combo915_pred2026.csv."""
import os, sys, warnings
import numpy as np, pandas as pd
warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import battery as BT, sigun_beta as SBt  # noqa: E401
B, M, common = BT.B, BT.M, BT.common
asof = "0915"
comp, cs, an, an_sg = B.load()
st = M.sido_targets()
base = M.backtest(an, st, B.M4, asof, icpt="cw", years=range(1990, 2026))[0][["sc", "y", "ahat"]]
# 2026: 정답이 없어 backtest가 빼므로 같은 식(M.fit_predict, 1985~2025 완전 시즌 학습)으로 직접
dfull = st.merge(an["1001"], on=["sc", "y"], how="inner")
trn = dfull[dfull.sc.isin(M.PROV) & (dfull.y >= M.START) & (dfull.y < 2026)].dropna(subset=B.M4 + ["a"])
te26 = an[asof][an[asof].y == 2026].dropna(subset=B.M4).copy()
p26 = M.fit_predict(trn, te26, B.M4, M.LAM, "cw", w=np.sqrt(trn.area.values / trn.area.mean()))[0]
base = pd.concat([base, te26[["sc", "y"]].assign(ahat=p26)], ignore_index=True)
print("2026 시도 â(%):", {a: round(b * 100, 2) for a, b in zip(te26.sc, p26)})
# 시도 Pc (combo.add_P와 같은 식, 2026까지)
sd = base.merge(st, on=["sc", "y"], how="left")
sd = sd[sd.sc.isin(M.PROV) & sd.y.between(1995, 2026)].sort_values(["sc", "y"]).reset_index(drop=True)
sd["r"] = sd.a - sd.ahat
sd["lag"] = sd.groupby("sc").r.transform(lambda s: s.shift(1).rolling(2, min_periods=1).mean())
past = sd[(sd.y < 2026) & sd.lag.notna() & sd.r.notna()]
rho = float(np.clip(np.sum(past.lag * past.r) / np.sum(past.lag ** 2), 0, 1))
z = sd[sd.y == 2026].copy()
z["area"] = z.sc.map(sd[sd.y == 2025].set_index("sc").area).values
s = rho * z.lag.fillna(0)
z["shift"] = s - np.average(s, weights=z.area)
shift = dict(zip(z.sc, z["shift"]))
ah26 = dict(zip(z.sc, z.ahat))
# 시군 2026 행
t = BT.sigun_table(asof).sort_values(["sc", "stem", "y"]).copy()
t["a_lag"] = t.groupby(["sc", "stem"]).a.shift(1)
t["sa_lag"] = t.groupby(["sc", "stem"]).a_sd.shift(1)
k = common._kosis(); k = k[k.code.str.len() > 2]
last = t[t.y == 2025].copy()
yy = t[t.y.between(2021, 2025)].groupby(["sc", "stem"])["yield"].apply(lambda v: np.sort(v.values)[1:-1].mean() if len(v) == 5 else np.nan)
n = last[["sc", "stem", "grp", "area"]].copy()
n["y"] = 2026
n["base"] = [yy.get((a, b), np.nan) for a, b in zip(n.sc, n.stem)]
n["a_lag"], n["sa_lag"], n["dev_prev"] = last.a.values, last.a_sd.values, last.dev.values
n["ahat_sd"] = [ah26.get(s, ah26.get(g, np.nan)) for s, g in zip(n.sc, n.grp)]
n["sh"] = [shift.get(s, shift.get(g, 0.0)) for s, g in zip(n.sc, n.grp)]
tr = t[(t.y >= 1990)].dropna(subset=["dev", "dev_prev"])
rho_s = float((tr.dev * tr.dev_prev).sum() / (tr.dev_prev ** 2).sum())
n["a_BASE"] = n.ahat_sd + rho_s * n.dev_prev.fillna(0)
te = n.copy(); te["ahat_sd"] = te.ahat_sd + te.sh
trb = t[(t.y < 2026) & (t.y >= 1996)].dropna(subset=["a", "a_sd"])
ok = te.ahat_sd.notna()
ph, kk, r = SBt.predict(trb, te[ok], "a_sd")
n.loc[ok, "a_PcS1"] = ph
n["pred_BASE"] = n.base * (1 + n.a_BASE)
n["pred_PcS1"] = n.base * (1 + n.a_PcS1)
o = n[["sc", "stem", "area", "base", "ahat_sd", "sh", "pred_BASE", "pred_PcS1"]].dropna(subset=["pred_BASE"]).round(4)
o.to_csv(os.path.join(BT.OUT, "combo915_pred2026.csv"), index=False)
w = o.area
print(f"2026 9/15: 시군 {len(o)} · 시도 ρ {rho:.3f} · 시군 ρ {rho_s:.3f} · 면적가중 평균 BASE {np.average(o.pred_BASE, weights=w):.1f} / Pc+S1 {np.average(o.pred_PcS1, weights=w):.1f} kg · 시군 |Δ| 평균 {float((o.pred_PcS1 - o.pred_BASE).abs().mean()):.2f}")
print("시도 이동(Pc, %p):", {k_: round(v * 100, 2) for k_, v in shift.items()})
