"""쌀 단수·생산량 모델 예측 → db/clean/rice/rice_forecast.csv  (모든 예측 시점: 재현 2013~FY-1 + 예측 연도 FY)

blend/crop_persist.py · blend/forecast_2026.py · prod/natsido.py · prod/export_forecast.py 를 시점·연도 일반화로 합친 것.

입력
- cropmodel/out_fixed/: pred_sigun_{A}.csv(시군 재현) · contrib_sido_{A}.csv(8도 재현 â) · pred_fy.csv·pred_fy_sido.csv(FY 예측)  ← cropmodel/run_final.py
- blend/pred_stat_crop.csv · pred_statfix_beta_p.csv (국가데이터처 반영 시군 재현) ← blend/stat_crop.py
- statdown/stat_forecast_sido.csv (국가데이터처 시도 예상) · statdown/pred_{FY}.csv (FY 시군 내려쓰기) · blend/features_sido_2026.csv (태풍 보정 특징)
시점
- 작물모델 A (0731·0815·0901·0915·1001 + 시즌 중 주간 최신): 시도 = 시도 평년 × (1+â), 8도 밖 시도는 8도 면적가중 â
  시군 = 시군 평년 × (1+시도 â) + ρ·(직전해 시군 잔차), ρ는 그해 이전으로 맞춤 [0, 0.5]
- 1010 (국가데이터처 시도 예상 발표 후): 시도 = W·예상×(1+태풍 ê) + (1−W)·0915, 시군도 같은 방식(W는 그해 이전으로 고름)
면적
- 9/1 이후 시점: 그해 시도 재배면적(확정과 같은 재배면적 조사; FY는 국가데이터처 예상 발표값, 없으면 직전해)
- 9/1 전 시점: 직전해 면적 (재배면적 조사 공표 전)
- 시군 면적 = 직전해 시군 면적 × (그해 시도 면적 / 직전해 시도 면적). 시군 단수는 시도 예측에 비례 맞춤. 생산량 = 단수 × 면적.
범위(80%): 그해 이전 재현 오차 log(실제/예측)의 10·90분위(시군은 면적 3구간별), 3년 이상 쌓인 해부터.
사용: .venv/bin/python research/rice/prod/pipeline.py
"""
import glob
import os
import sys
import importlib.util

import numpy as np
import pandas as pd

R = "/home/eins/project/rStat/research/rice"
sys.path[:0] = [R, f"{R}/statdown", f"{R}/statfix", f"{R}/prod"]
import common as C  # noqa: E402

OUT = "/home/eins/project/rStat/db/clean/rice/rice_forecast.csv"
CM = f"{R}/cropmodel/out_fixed"
P8 = ["31", "32", "33", "34", "35", "36", "37", "38"]
EARLY = "0901"  # 이보다 앞선 시점은 직전해 면적

fy_sg = pd.read_csv(f"{CM}/pred_fy.csv", dtype={"sc": str, "asof": str})
fy_sd = pd.read_csv(f"{CM}/pred_fy_sido.csv", dtype={"sc": str, "asof": str})
FY = int(fy_sg.y.iloc[0])
SHOW = os.environ.get("RICE_SHOW")  # scripts/rice_model.py: 보일 시점만 (시즌 중엔 아직 오지 않은 기본 시점 빼기)
SHOW = set(SHOW.split(",")) if SHOW else None
ALLA = sorted(a for a in fy_sg["asof"].unique() if os.path.exists(f"{CM}/pred_sigun_{a}.csv"))  # 계산한 작물모델 시점 전부
ASOFS = [a for a in ALLA if SHOW is None or a in SHOW]  # 그대로 내보낼 작물모델 시점
LATE = os.environ.get("RICE_LATE")  # 국가데이터처 예상 뒤 최신 기상 시점(mmdd) → 'S'+mmdd: 국가데이터처 예상 + 그날까지 기상 작물모델
LATE = LATE if LATE in ALLA else None
print("예측 연도", FY, "시점", ASOFS)

# ---------- 정답·평년·면적 ----------
t = C.targets().sort_values("y")
pa = t.dropna(subset=["a"]).groupby(["y", "sc"]).apply(lambda g: np.average(g.a, weights=g.area)).rename("pa").reset_index()
t = t.merge(pa, on=["y", "sc"], how="left")
t["res"] = t.a - t.pa
t["res1"] = t.groupby(["sc", "stem"]).res.shift(1)
t["a1"] = t.groupby(["sc", "stem"]).area.shift(1)

k = C._kosis()
S = k[k.code.str.len() == 2].rename(columns={"code": "sc"})[["y", "sc", "yield", "area"]]
sf = pd.read_csv(f"{R}/statdown/stat_forecast_sido.csv", dtype={"sido_code": str}).rename(
    columns={"year": "y", "sido_code": "sc", "yield_kg10a": "stat", "area_ha": "sarea"})
if not ((S.y == FY).any()):
    S = pd.concat([S, S[S.y == FY - 1].assign(y=FY, **{"yield": np.nan, "area": np.nan})], ignore_index=True)
S = S.merge(sf[["y", "sc", "stat", "sarea"]], on=["y", "sc"], how="left").sort_values("y")
S["area"] = S.area.fillna(S.sarea)  # FY: 국가데이터처 예상 발표 면적
S["area1"] = S.groupby("sc").area.shift(1)
S["area"] = S.area.fillna(S.area1)  # 그것도 없으면 직전해
S["base"] = S.groupby("sc")["yield"].transform(C._olympic)
SY = S[S.y.between(2010, FY)].copy()


def area_col(asof):
    return "area1" if asof < EARLY else "area"


# ---------- 시도·전국: 작물모델 시점 ----------
ADJ_ASOF = "1001"  # 11-10 채택: 10/1 시도 â에 NCPMS 도열병 + 시도 잔차 2년 지속 보정 (prod/sido_adjust.py)


def sido_crop(asof):
    c = pd.read_csv(f"{CM}/contrib_sido_{asof}.csv", dtype={"sc": str})[["sc", "y", "a", "ahat"]]
    c = c[c.y < FY]
    f = fy_sd[(fy_sd["asof"] == asof) & fy_sd.sc.isin(P8)][["sc", "ahat"]].assign(y=FY, a=np.nan)
    cf = pd.concat([c, f], ignore_index=True)
    if asof == ADJ_ASOF:
        import sido_adjust as SA
        nc = pd.read_csv(f"{R}/ncpms/feat_sido.csv", dtype={"sc": str, "asof": str})
        nc = nc[nc["asof"] == asof]
        cf = cf.merge(SY[["sc", "y", "area"]], on=["sc", "y"], how="left")
        cf["area"] = cf.area.fillna(cf.groupby("sc").area.transform("last"))
        a0 = cf.ahat.copy()
        cf["ahat"] = SA.adjust(cf, nc, range(2013, FY + 1))
        print(f"{asof} 시도 â 보정(NCPMS 도열병+2년 지속) FY:", {s: round(float(v), 4) for s, v in zip(cf.sc[cf.y == FY], (cf.ahat - a0)[cf.y == FY])})
    g = SY.merge(cf[["sc", "y", "ahat"]], on=["sc", "y"], how="left")
    g = g[g.sc != "00"].copy()
    ac = area_col(asof)
    aN = g[g.sc.isin(P8) & g.ahat.notna()].groupby("y").apply(lambda q: np.average(q.ahat, weights=q[ac])).rename("aN")
    g = g.merge(aN, on="y", how="left")
    g["p"] = g.base * (1 + g.ahat.fillna(g.aN))
    return g.dropna(subset=["p", ac])


# 태풍 보정 ê (국가데이터처 예상의 오차 e ~ 강풍 일수 편차): 재현은 statfix 실시간, FY는 그해 이전 OLS
cwd = os.getcwd()
os.chdir(f"{R}/statfix")
spec = importlib.util.spec_from_file_location("sfm", f"{R}/statfix/model.py")
SFM = importlib.util.module_from_spec(spec)
spec.loader.exec_module(SFM)
os.chdir(cwd)
EH = SFM.nat_realtime(["gust_fill"], intercept=True, years=[y for y in range(2013, FY) if y in SFM.NAT.index]).to_dict()
fb = pd.read_csv(f"{R}/blend/features_sido_2026.csv", dtype={"sc": str})
nb = fb[fb.sc == "00"].set_index("y")
if FY in nb.index and pd.notna(nb.loc[FY, "gust_fill"]):
    tr = nb.loc[nb.index < FY].dropna(subset=["e", "gust_fill"])
    b = np.linalg.lstsq(np.c_[np.ones(len(tr)), tr.gust_fill], tr.e.values, rcond=None)[0]
    EH[FY] = float(b[0] + b[1] * nb.loc[FY, "gust_fill"])
print("태풍 보정 ê", {y: round(v, 4) for y, v in EH.items() if y >= 2020})

SD = {a: sido_crop(a) for a in ALLA}


def sido_blend(ck):
    """시도: W·국가데이터처 예상×(1+ê) + (1−W)·작물모델(ck). W는 그해 이전 8도 오차로."""
    g = SY[SY.sc != "00"].merge(SD[ck][["y", "sc", "p"]].rename(columns={"p": "pc"}), on=["y", "sc"], how="left")
    g["ps"] = g.stat * (1 + g.y.map(EH).fillna(0.0))
    W = {}
    for Y in sorted(g.y.unique()):
        tr = g[(g.y < Y) & g.sc.isin(P8) & g["yield"].notna() & g.ps.notna() & g.pc.notna()]
        W[Y] = 1.0 if tr.y.nunique() < 3 else min(np.linspace(0, 1, 21), key=lambda w: np.average((w * tr.ps + (1 - w) * tr.pc - tr["yield"]) ** 2, weights=tr.area))
    g["p"] = np.where(g.ps.notna(), g.y.map(W) * g.ps + (1 - g.y.map(W)) * g.pc, np.nan)
    return g.dropna(subset=["p"]), W


WANT1010 = "0915" in SD and (SHOW is None or "1010" in SHOW)
SD["1010"], W = sido_blend("0915")
HAS1010 = WANT1010 and bool((SD["1010"].y == FY).any())
print("국가데이터처 가중 W", {y: round(v, 2) for y, v in W.items() if y >= 2020}, "| FY 국가데이터처 예상", "있음" if HAS1010 else "없음")
SKEY = f"S{LATE}" if LATE and HAS1010 else None
if SKEY:
    SD[SKEY], WL = sido_blend(LATE)
    print(f"{SKEY} 국가데이터처 가중 W", {y: round(v, 2) for y, v in WL.items() if y >= 2020})

# ---------- 시군 ----------
SG = {}
for a in ALLA:
    p = pd.read_csv(f"{CM}/pred_sigun_{a}.csv", dtype={"sc": str})
    p = p[p.y < FY]
    d = p.merge(t[["y", "sc", "stem", "base", "a", "res1", "area"]], on=["y", "sc", "stem"], how="left")
    d["ahat"] = d.pred_yield / d.base - 1
    out = []
    for Y in list(range(2013, FY)) + [FY]:
        tr = d[(d.y < Y) & (d.y >= 2000) & d.res1.notna() & d.a.notna()]
        rho = float(np.clip(np.sum(tr.area * tr.res1 * (tr.a - tr.ahat)) / np.sum(tr.area * tr.res1 ** 2), 0, 0.5)) if len(tr) > 50 else 0.0
        if Y < FY:
            te = d[d.y == Y].copy()
            te["pred_yield"] = te.base * (1 + te.ahat + rho * te.res1.fillna(0))
        else:
            r1 = t[t.y == FY - 1][["sc", "stem", "res"]].rename(columns={"res": "res1"})
            te = fy_sg[fy_sg["asof"] == a][["sc", "stem", "base", "ahat"]].merge(r1, on=["sc", "stem"], how="left").assign(y=FY)
            te["pred_yield"] = te.base * (1 + te.ahat + rho * te.res1.fillna(0))
        out.append(te[["y", "sc", "stem", "pred_yield"]])
    SG[a] = pd.concat(out, ignore_index=True)
print("시군 잔차 계수 ρ(FY)", round(rho, 3))


def sg_blend(ck):
    """시군: 국가데이터처 시도 예상 내려쓰기(statfix beta_p, 태풍 보정)와 작물모델(ck)의 가중. W는 그해 이전 시군 오차로(blend/stat_crop.py와 같음)."""
    ps = pd.read_csv(f"{R}/blend/pred_statfix_beta_p.csv", dtype={"sc": str}).rename(columns={"pred_yield": "p_stat"})
    cr = SG[ck].rename(columns={"pred_yield": "p_crop"})
    d = ps[ps.y < FY].merge(cr, on=["y", "sc", "stem"], how="left").merge(t[["y", "sc", "stem", "yield", "area"]], on=["y", "sc", "stem"])
    d["p_crop"] = d.p_crop.fillna(d.p_stat)
    Wy = {}
    for Y in sorted(d.y.unique()) + [FY]:
        tr = d[d.y < Y]
        Wy[Y] = 1.0 if tr.y.nunique() < 3 else min(np.linspace(0, 1, 21), key=lambda w: np.average((w * tr.p_stat + (1 - w) * tr.p_crop - tr["yield"]) ** 2, weights=tr.area))
    d["pred_yield"] = d.y.map(Wy) * d.p_stat + (1 - d.y.map(Wy)) * d.p_crop
    out = [d[["y", "sc", "stem", "pred_yield"]]]
    sdp = f"{R}/statdown/pred_{FY}.csv"
    if HAS1010 and os.path.exists(sdp):
        s26 = pd.read_csv(sdp, dtype={"sc": str})[["sc", "stem", "pred_yield"]].rename(columns={"pred_yield": "p_stat"})
        s26["p_stat"] *= 1 + EH.get(FY, 0.0)
        f = cr[cr.y == FY].merge(s26, on=["sc", "stem"], how="left")
        f["pred_yield"] = np.where(f.p_stat.notna(), Wy[FY] * f.p_stat + (1 - Wy[FY]) * f.p_crop, f.p_crop)
        out.append(f[["y", "sc", "stem", "pred_yield"]])
    print(f"{ck} 시군 국가데이터처 가중 W(FY)", round(float(Wy[FY]), 2))
    return pd.concat(out, ignore_index=True)


SG["1010"] = sg_blend("0915")
if SKEY:
    SG[SKEY] = sg_blend(LATE)
# 재현 점검: 예전 blend/stat_crop.py 결과와 같아야 한다
_old = pd.read_csv(f"{R}/blend/pred_stat_crop.csv", dtype={"sc": str}).merge(SG["1010"], on=["y", "sc", "stem"], suffixes=("_o", "_n"))
print("1010 시군 재현 점검: stat_crop.py와 최대 차이", round(float((_old.pred_yield_o - _old.pred_yield_n).abs().max()), 3), "kg")

# ---------- 내보내기 ----------
# 시군 행: 2013~FY-1 재현(정답 있음) + FY(직전해 행을 한 해 밀고, 확정 있으면 정답도)
TT = t[t.y.between(2013, FY)][["y", "sc", "stem", "name", "yield", "area", "a1", "base"]]
if not (TT.y == FY).any():
    nxt = t[t.y == FY - 1][["sc", "stem", "name", "area"]].rename(columns={"area": "a1"}).assign(y=FY)
    nxt = nxt.merge(fy_sg[fy_sg["asof"] == ASOFS[0]][["sc", "stem", "base"]], on=["sc", "stem"], how="left")
    TT = pd.concat([TT, nxt], ignore_index=True)
TT = TT.merge(SY[["y", "sc", "area", "area1", "base"]].rename(columns={"area": "sa", "area1": "sa1", "base": "sbase"}), on=["y", "sc"], how="left")
cls = lambda a: np.where(a < 2000, 0, np.where(a < 8000, 1, 2))  # noqa: E731
rows = []
for asof in ASOFS + (["1010"] if WANT1010 else []) + ([SKEY] if SKEY else []):
    early = asof < EARLY
    T = TT.copy()
    T["parea"] = T.a1 if early else T.a1 * T.sa / T.sa1
    d = T.merge(SG[asof], on=["y", "sc", "stem"], how="inner").dropna(subset=["pred_yield", "parea", "a1"])
    sd = SD[asof][["y", "sc", "p"]]
    r = d.groupby(["y", "sc"]).apply(lambda q: np.sum(q.pred_yield * q.a1) / np.sum(q.base * q.a1)).rename("r").reset_index()
    r = r.merge(sd, on=["y", "sc"], how="left").merge(SY[["y", "sc", "base"]].rename(columns={"base": "sbase"}), on=["y", "sc"], how="left")
    r["f"] = (r.p / r.sbase / r.r).fillna(1.0)
    d = d.merge(r[["y", "sc", "f"]], on=["y", "sc"], how="left")
    d["pred_yield"] = d.pred_yield * d.f.fillna(1.0)
    d["pprod"] = d.pred_yield * d.parea / 100
    d["ey"] = np.log(d["yield"] / d.pred_yield)
    d["ep"] = np.log(d["yield"] * d.area / 100 / d.pprod)
    d["c"] = cls(d.a1)
    for col in ["ylo", "yhi", "plo", "phi"]:
        d[col] = np.nan
    for Y in sorted(d.y.unique()):
        past = d[(d.y < Y) & d.ey.notna()]
        if past.y.nunique() < 3:
            continue
        for c in range(3):
            q = past[past.c == c]
            m = (d.y == Y) & (d.c == c)
            d.loc[m, "ylo"], d.loc[m, "yhi"] = d.loc[m, "pred_yield"] * np.exp(q.ey.quantile(.1)), d.loc[m, "pred_yield"] * np.exp(q.ey.quantile(.9))
            d.loc[m, "plo"], d.loc[m, "phi"] = d.loc[m, "pprod"] * np.exp(q.ep.quantile(.1)), d.loc[m, "pprod"] * np.exp(q.ep.quantile(.9))
    v = d[d.y.between(2016, FY - 1)]
    cov = lambda lo, hi, x: float(((x >= lo) & (x <= hi)).mean())  # noqa: E731
    for _, q in d.iterrows():
        rows.append(dict(y=q.y, asof=asof, level="sigun", sc=q.sc, name=q["name"], **{"yield": q.pred_yield}, area=q.parea, prod=q.pprod,
                         y_lo=q.ylo, y_hi=q.yhi, p_lo=q.plo, p_hi=q.phi))
    # 시도·전국 (전국 = 시도 예측의 면적 가중)
    ac = "area1" if early and asof != "1010" else "area"
    A = SD[asof].copy()
    A["parea_s"] = A[ac]
    A = A[A.y >= 2013]
    N = A.groupby("y").apply(lambda q: pd.Series({"p": np.average(q.p, weights=q.parea_s), "parea_s": q.parea_s.sum()})).reset_index()
    N = N.merge(S[S.sc == "00"][["y", "yield", "area"]], on="y", how="left").assign(sc="00")
    B = pd.concat([A[["y", "sc", "p", "parea_s", "yield", "area"]], N[["y", "sc", "p", "parea_s", "yield", "area"]]], ignore_index=True)
    B["e"] = np.log(B["yield"] / B.p)
    B["ep"] = np.log(B["yield"] * B.area / (B.p * B.parea_s))
    B["lvl"] = np.where(B.sc == "00", "nation", "sido")
    for _, q in B.iterrows():
        past = B[(B.y < q.y) & (B.lvl == q.lvl) & B.e.notna()]
        if q.lvl == "sido":
            past = past[past.area >= 1000]
        lo = hi = plo = phi = np.nan
        if past.y.nunique() >= 3:
            lo, hi = q.p * np.exp(past.e.quantile(.1)), q.p * np.exp(past.e.quantile(.9))
            plo, phi = q.p * q.parea_s / 100 * np.exp(past.ep.quantile(.1)), q.p * q.parea_s / 100 * np.exp(past.ep.quantile(.9))
        rows.append(dict(y=q.y, asof=asof, level=q.lvl, sc=q.sc, name="", **{"yield": q.p}, area=q.parea_s, prod=q.p * q.parea_s / 100,
                         y_lo=lo, y_hi=hi, p_lo=plo, p_hi=phi))
    n = B[(B.lvl == "nation") & B.e.notna() & (B.y < FY)]
    s8 = B[(B.lvl == "sido") & B.sc.isin(P8) & B.e.notna() & (B.y < FY)]
    fyv = B[(B.lvl == "nation") & (B.y == FY)]
    print(f"{asof} 전국 단수 MAE {(n['yield'] - n.p).abs().mean():.2f} RMSE {np.sqrt(((n['yield'] - n.p) ** 2).mean()):.2f}"
          f" · 생산량 MAE {(n['yield'] * n.area / 100 - n.p * n.parea_s / 100).abs().mean() / 1e4:.2f}만 톤"
          f" · 8도 RMSE {np.sqrt(np.average((s8['yield'] - s8.p) ** 2, weights=s8.area)):.2f}"
          f" · 시군 범위 적중 단수 {cov(v.ylo, v.yhi, v['yield']):.2f} 생산량 {cov(v.plo, v.phi, v['yield'] * v.area / 100):.2f}"
          f" | {FY} {fyv.p.iloc[0]:.1f}kg {fyv.p.iloc[0] * fyv.parea_s.iloc[0] / 1e6:.1f}만 톤" if len(fyv) else "")
o = pd.DataFrame(rows)
for col in ["yield", "y_lo", "y_hi"]:
    o[col] = o[col].round(1)
for col in ["area", "prod", "p_lo", "p_hi"]:
    o[col] = o[col].round(0)
o.to_csv(OUT, index=False)
print(OUT, len(o), "행")
