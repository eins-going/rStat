"""화면용 예측 내보내기 → db/clean/rice/rice_forecast.csv
행: y, asof(0915|1010), level(nation|sido|sigun), sc, name, yield, area, prod, y_lo, y_hi, p_lo, p_hi
- 단수: 0915 = 작물모델+시군 잔차(blend/pred_crop_persist_0915), 1010 = 통계청 시도 예상 내려쓰기+작물모델(blend/pred_stat_crop). 2026은 blend/forecast_2026.csv.
- 면적: 시군 = 직전해 시군 면적 × 그해 시도 면적 / 직전해 시도 면적 (시도 면적은 8월 말 통계청 재배면적 조사 = 확정과 같음)
- 시도·전국 단수 = prod/natsido.csv (작물모델 시도 â·통계청 시도 예상 보정 혼합; 전국 = 시도 면적 가중). 시군은 시도 예측에 비례 조정. 생산량 = 단수 × 면적.
- 범위(80%): 그해 이전 검증 오차 log(실제/예측)의 10·90 분위, 시군은 면적 3구간별. 2013~2015는 범위 없음."""
import sys; R = '/home/eins/project/rStat/research/rice'; sys.path.insert(0, R)
import numpy as np, pandas as pd, common as C
OUT = "/home/eins/project/rStat/db/clean/rice/rice_forecast.csv"
t = C.targets().sort_values("y")
t["a1"] = t.groupby(["sc", "stem"]).area.shift(1)
k = C._kosis()
sid = k[k.code.str.len() == 2].rename(columns={"code": "sc"})[["y", "sc", "yield", "area"]]
sf = pd.read_csv(f"{R}/statdown/stat_forecast_sido.csv", dtype={"sido_code": str})
s26 = sf[sf.year == 2026].rename(columns={"year": "y", "sido_code": "sc", "area_ha": "area"})[["y", "sc", "area"]]
sid = pd.concat([sid, s26.assign(**{"yield": np.nan})], ignore_index=True).sort_values("y")
sid["base"] = sid.groupby("sc")["yield"].transform(lambda v: v.shift(1).rolling(5).apply(lambda w: (w.sum() - w.max() - w.min()) / 3, raw=True))
sid["sa1"] = sid.groupby("sc").area.shift(1)
# 2026 시군 행 (정답 없음): 2025 시군 행을 한 해 밀어 a1로
t25 = t[t.y == 2025][["sc", "stem", "name", "area"]].rename(columns={"area": "a1"}).assign(y=2026)
f26 = pd.read_csv(f"{R}/blend/forecast_2026.csv", dtype={"sc": str})
t26 = t25.merge(f26[["sc", "stem", "base"]], on=["sc", "stem"], how="left")
T = pd.concat([t[t.y.between(2013, 2025)][["y", "sc", "stem", "name", "yield", "area", "a1", "base"]], t26], ignore_index=True)
T = T.merge(sid[["y", "sc", "area", "sa1"]].rename(columns={"area": "sa"}), on=["y", "sc"], how="left")
T["parea"] = T.a1 * T.sa / T.sa1
P = {"0915": pd.read_csv(f"{R}/blend/pred_crop_persist_0915.csv", dtype={"sc": str}),
     "1010": pd.read_csv(f"{R}/blend/pred_stat_crop.csv", dtype={"sc": str})}
P["0915"] = pd.concat([P["0915"], f26.assign(y=2026, pred_yield=f26.p0915)[["y", "sc", "stem", "pred_yield"]]])
P["1010"] = pd.concat([P["1010"], f26.assign(y=2026, pred_yield=f26.p1010)[["y", "sc", "stem", "pred_yield"]]])
NS = pd.read_csv(f"{R}/prod/natsido.csv", dtype={"sc": str})
cls = lambda a: np.where(a < 2000, 0, np.where(a < 8000, 1, 2))
rows = []
for asof, p in P.items():
    d = T.merge(p[["y", "sc", "stem", "pred_yield"]], on=["y", "sc", "stem"], how="inner").dropna(subset=["pred_yield", "parea"])
    sb = sid[["y", "sc", "base"]].rename(columns={"base": "sbase"})
    g = d.groupby(["y", "sc"]).apply(lambda q: np.sum(q.pred_yield * q.a1) / np.sum(q.base * q.a1)).rename("r").reset_index()
    g = g.merge(NS[["y", "sc", f"p{asof}"]], on=["y", "sc"], how="left").merge(sb, on=["y", "sc"], how="left")
    g["f"] = (g[f"p{asof}"] / g.sbase / g.r).fillna(1.0)
    d = d.merge(g[["y", "sc", "f"]], on=["y", "sc"], how="left"); d["pred_yield"] = d.pred_yield * d.f.fillna(1.0)
    d["pprod"] = d.pred_yield * d.parea / 100
    d["ey"] = np.log(d["yield"] / d.pred_yield); d["ep"] = np.log(d["yield"] * d.area / 100 / d.pprod); d["c"] = cls(d.a1)
    for c in ["ylo", "yhi", "plo", "phi"]: d[c] = np.nan
    for Y in sorted(d.y.unique()):
        past = d[(d.y < Y) & d.ey.notna()]
        if past.y.nunique() < 3: continue
        for c in range(3):
            q = past[past.c == c]; m = (d.y == Y) & (d.c == c)
            d.loc[m, "ylo"] = d.loc[m, "pred_yield"] * np.exp(q.ey.quantile(.1)); d.loc[m, "yhi"] = d.loc[m, "pred_yield"] * np.exp(q.ey.quantile(.9))
            d.loc[m, "plo"] = d.loc[m, "pprod"] * np.exp(q.ep.quantile(.1)); d.loc[m, "phi"] = d.loc[m, "pprod"] * np.exp(q.ep.quantile(.9))
    v = d[d.y.between(2016, 2025)]
    cov = lambda lo, hi, x: float(((x >= lo) & (x <= hi)).mean())
    print(asof, "시군 80% 범위 적중: 단수", round(cov(v.ylo, v.yhi, v["yield"]), 3), "생산량", round(cov(v.plo, v.phi, v["yield"] * v.area / 100), 3))
    for _, r in d.iterrows():
        rows.append(dict(y=r.y, asof=asof, level="sigun", sc=r.sc, name=r["name"], **{"yield": r.pred_yield}, area=r.parea, prod=r.pprod,
                         y_lo=r.ylo, y_hi=r.yhi, p_lo=r.plo, p_hi=r.phi))
    # 시도·전국: prod/natsido.py (시도 직접 예측, 전국 = 시도 면적 가중)
    A = NS[["y", "sc", f"p{asof}", "yield", "area"]].rename(columns={f"p{asof}": "pyield"}).copy()
    A["e"] = np.log(A["yield"] / A.pyield); A["lvl"] = np.where(A.sc == "00", "nation", "sido")
    A = A[A.y >= 2013]
    for _, r in A.iterrows():
        past = A[(A.y < r.y) & (A.lvl == r.lvl) & A.e.notna()]
        if r.lvl == "sido": past = past[past.area >= 1000]
        lo = hi = np.nan
        if past.y.nunique() >= 3:
            lo, hi = r.pyield * np.exp(past.e.quantile(.1)), r.pyield * np.exp(past.e.quantile(.9))
        rows.append(dict(y=r.y, asof=asof, level=r.lvl, sc=r.sc, name="", **{"yield": r.pyield}, area=r.area, prod=r.pyield * r.area / 100,
                         y_lo=lo, y_hi=hi, p_lo=lo * r.area / 100 if lo == lo else np.nan, p_hi=hi * r.area / 100 if hi == hi else np.nan))
    n = A[(A.lvl == "nation") & A.e.notna()]
    print(asof, "전국 단수 MAE", round(float((n["yield"] - n.pyield).abs().mean()), 2), "RMSE", round(float(np.sqrt(((n["yield"] - n.pyield) ** 2).mean())), 2),
          "| 2026", round(float(A[(A.lvl == 'nation') & (A.y == 2026)].pyield.iloc[0]), 1))
    s8 = A[(A.lvl == "sido") & A.sc.isin(list("31 32 33 34 35 36 37 38".split())) & A.e.notna()]
    print(asof, "8도 RMSE(면적가중)", round(float(np.sqrt(np.average((s8["yield"] - s8.pyield) ** 2, weights=s8.area))), 2))
o = pd.DataFrame(rows)
for c in ["yield", "y_lo", "y_hi"]: o[c] = o[c].round(1)
for c in ["area", "prod", "p_lo", "p_hi"]: o[c] = o[c].round(0)
o.to_csv(OUT, index=False)
print(OUT, len(o), "행")
