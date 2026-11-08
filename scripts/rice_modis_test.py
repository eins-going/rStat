"""위성(MODIS) 시군 시험 — 논 격자 식생지수의 평년 대비 편차가 단수 편차와 같이 움직이나.

입력: db/raw/modis/vi_{year}.npz (fetch_modis_ndvi.py), db/clean/rice/paddy_modis.csv,
      db/raw/kosis_rice/dt_1et0034.csv, (선택) 기상 시험 결과 dataset_930.csv(v2)
시험:
  T1 같은 해 안에서: 시군들 사이 위성 편차와 단수 편차의 순위상관(해마다) — 나쁜 시군을 가려내나
  T2 해마다 차이: 시도·전국 단수 편차를 위성 편차(+기상)로 실시간 검증(그 해 이전 자료만) — 평년·기상·KREI와 비교
  T3 시군 단위 실시간 검증 RMSE
사용: .venv/bin/python scripts/rice_modis_test.py OUT_DIR [기상결과_dataset_930.csv]
"""
import glob
import json
import os
import re
import sys

import numpy as np
import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))
OUT = sys.argv[1]
WX = sys.argv[2] if len(sys.argv) > 2 else None
os.makedirs(OUT, exist_ok=True)
FILL = -32768
MINFRAC, MINSHARE, MINPIX = 0.7, 0.6, 8
SIDO = [("서울", "11"), ("부산", "21"), ("대구", "22"), ("인천", "23"), ("광주", "24"), ("대전", "25"), ("울산", "26"),
        ("세종", "29"), ("경기", "31"), ("강원", "32"), ("충청북", "33"), ("충북", "33"), ("충청남", "34"), ("충남", "34"),
        ("전라북", "35"), ("전북", "35"), ("전라남", "36"), ("전남", "36"), ("경상북", "37"), ("경북", "37"),
        ("경상남", "38"), ("경남", "38"), ("제주", "39")]
PROV = {"31", "32", "33", "34", "35", "36", "37", "38"}


def sido_code(n):
    return next((c for p, c in SIDO if str(n).startswith(p)), None)


# ---------- 위성: 격자 → 시군-연도 지표 ----------
px = pd.read_csv(os.path.join(ROOT, "db/clean/rice/paddy_modis.csv"))
px["sc"] = px.sido.map(sido_code)
WINDOWS = {"aug": (209, 240), "sep": (241, 272), "jul": (182, 208)}


def year_feats(path):
    z = np.load(path)
    year = int(re.search(r"vi_(\d{4})", path).group(1))
    pix = pd.DataFrame(z["pix"], columns=["col", "row"])
    meta = pix.merge(px, on=["col", "row"], how="left")
    keep = (meta.frac >= MINFRAC) & (meta.share >= MINSHARE) & meta.sc.notna()
    ndvi, evi, rel, doy = (z[k].astype("float32") for k in ("ndvi", "evi", "rel", "doy"))
    ok = (z["ndvi"] != FILL) & np.isin(z["rel"], [0, 1]) & (z["doy"] > 0)
    out = {}
    for name, a in (("ndvi", ndvi), ("evi", evi)):
        a = np.where(ok, a / 1e4, np.nan)
        for w, (d0, d1) in WINDOWS.items():
            m = (doy >= d0) & (doy <= d1)
            with np.errstate(all="ignore"):
                out[f"{name}_{w}"] = np.nanmean(np.where(m, a, np.nan), axis=0)
        m = (doy >= 182) & (doy <= 272)
        with np.errstate(all="ignore"):
            out[f"{name}_peak"] = np.nanpercentile(np.where(m, a, np.nan), 90, axis=0)
    df = pd.DataFrame(out)
    df["sc"], df["sigun"], df["paddy_m2"] = meta.sc, meta.sigun, meta.paddy_m2
    df = df[keep.values]
    g = df.groupby(["sc", "sigun"])
    feats = g.median(numeric_only=True).drop(columns=["paddy_m2"])
    feats["npix"] = g.size()
    feats = feats[feats.npix >= MINPIX].reset_index()
    feats["y"] = year
    return feats


files = sorted(glob.glob(os.path.join(ROOT, "db/raw/modis/vi_*.npz")))
cache = os.path.join(OUT, "sat_feats.csv")
if os.path.exists(cache):
    sat = pd.read_csv(cache, dtype={"sc": str})
else:
    sat = pd.concat([year_feats(f) for f in files], ignore_index=True)
    sat.to_csv(cache, index=False)
sat = sat[sat.y != 2025]  # Planetary Computer에 2025년 7~10월 MODIS 없음
SF = [c for c in sat.columns if c.startswith(("ndvi_", "evi_"))]
print("위성 연도", sorted(sat.y.unique()), "시군", sat.groupby(["sc", "sigun"]).ngroups)

# ---------- 정답: 시군 단수 ----------
k = pd.read_csv(os.path.join(ROOT, "db/raw/kosis_rice/dt_1et0034.csv"), dtype={"code": str})
k = k[k.item.isin(["10a당 생산량", "재배면적"])].pivot_table(index=["year", "code", "name"], columns="item", values="value").reset_index()
k = k.rename(columns={"year": "y", "10a당 생산량": "yield", "재배면적": "area"})
k.columns.name = None
k["sc"] = k.code.str[:2]
sg = k[k.code.str.len() > 2].copy()
sej = k[k.code == "29"].copy(); sej["name"] = "세종시"
sg = pd.concat([sg, sej])
sg["stem"] = sg.name.str[:-1]
sat["stem"] = sat.sigun.str[:-1]
# 청주: 2014 통합 전에는 KOSIS 청주시가 옛 시만 → 제외
sg = sg[~((sg.name == "청주시") & (sg.y < 2014))]


def olympic(s):
    v = s.shift(1).rolling(5, min_periods=5)
    return v.apply(lambda w: np.sort(w)[1:-1].mean(), raw=True)


sg = sg.sort_values("y")
sg["base"] = sg.groupby(["sc", "stem"])["yield"].transform(olympic)
sg["a"] = sg["yield"] / sg["base"] - 1
d = sat.merge(sg[["y", "sc", "stem", "name", "yield", "base", "a", "area"]], on=["y", "sc", "stem"], how="inner").dropna(subset=["a"])
print("시군-연도 표본", len(d), "시군", d.groupby(["sc", "stem"]).ngroups, "연도", d.y.min(), "~", d.y.max())


# 위성 평년: 같은 시군의 직전 5년 평균(실시간에 쓸 수 있는 값)
d = d.sort_values("y")
for f in SF:
    prev = d.groupby(["sc", "stem"])[f].transform(lambda s: s.shift(1).rolling(5, min_periods=3).mean())
    d["d_" + f] = d[f] - prev
DF = ["d_" + f for f in SF]

# ---------- T1: 같은 해 안에서 시군 순위상관 ----------
t1 = {}
for f in DF:
    rs = []
    for y, g in d.dropna(subset=[f]).groupby("y"):
        if len(g) >= 20:
            rs.append(g[f].rank().corr(g.a.rank()))
    t1[f] = {"mean_r": round(float(np.mean(rs)), 3), "pos_years": int(np.sum(np.array(rs) > 0)), "years": len(rs)}
print("\nT1 같은 해 시군 순위상관(위성 편차 vs 단수 편차):")
for f, v in sorted(t1.items(), key=lambda kv: -kv[1]["mean_r"]):
    print(f"  {f:16s} 평균 r={v['mean_r']:+.3f}  양(+)인 해 {v['pos_years']}/{v['years']}")


# ---------- T2/T3: 실시간 검증 ----------
def ridge(Xtr, ytr, Xte, alpha):
    mu, sd = Xtr.mean(0), Xtr.std(0); sd[sd == 0] = 1
    Z, Zt = (Xtr - mu) / sd, (Xte - mu) / sd
    b0 = ytr.mean()
    beta = np.linalg.solve(Z.T @ Z + alpha * np.eye(Z.shape[1]), Z.T @ (ytr - b0))
    return b0 + Zt @ beta, beta / sd


def realtime(df, feats, alpha, start):
    pred = pd.Series(np.nan, index=df.index)
    for t in sorted(df.y.unique()):
        if t < start:
            continue
        tr, te = df[(df.y < t)].dropna(subset=feats + ["a"]), df[df.y == t].dropna(subset=feats)
        if len(tr) < 30 or len(te) == 0:
            continue
        p, _ = ridge(tr[feats].values, tr.a.values, te[feats].values, alpha)
        pred.loc[te.index] = p
    return pred


best_f = sorted(t1, key=lambda f: -t1[f]["mean_r"])[:3]
res = {"t1": t1, "best_feats": best_f}
# T3 시군
for alpha in (10, 100):
    p = realtime(d, best_f, alpha, 2009)
    m = p.notna()
    e_m = d.base[m] * (1 + p[m]) - d["yield"][m]
    e_b = d.base[m] - d["yield"][m]
    r = lambda e: float(np.sqrt(np.mean(e ** 2)))
    res[f"t3_alpha{alpha}"] = {"n": int(m.sum()), "rmse_model": r(e_m), "rmse_base": r(e_b), "skill": 1 - r(e_m) / r(e_b)}
    print(f"\nT3 시군 실시간(2009~, alpha={alpha}): n={m.sum()} RMSE 평년 {r(e_b):.1f} → 위성 {r(e_m):.1f} kg (개선 {100 * (1 - r(e_m) / r(e_b)):.1f}%)")

# T2 시도: 시군 위성 편차를 면적 가중 → 시도
dp = d.dropna(subset=best_f).copy()
dp["w"] = dp.area
agg = dp.groupby(["sc", "y"]).apply(lambda g: pd.Series({f: np.average(g[f], weights=g.w) for f in best_f}), include_groups=False).reset_index()
pk = k[k.code.isin(PROV)].copy().sort_values("y")
pk["base"] = pk.groupby("code")["yield"].transform(olympic)
pk["a"] = pk["yield"] / pk["base"] - 1
pv = pk.merge(agg, left_on=["code", "y"], right_on=["sc", "y"]).dropna(subset=["a"])
feats_p = best_f
if WX and os.path.exists(WX):
    wx = pd.read_csv(WX, dtype={"prov": str})
    zc = [c for c in wx.columns if c.startswith("z_")]
    pv = pv.merge(wx[["prov", "y"] + zc], left_on=["code", "y"], right_on=["prov", "y"], how="left")
    combos = {"위성": best_f, "기상": zc, "위성+기상": best_f + zc}
else:
    combos = {"위성": best_f}
nat_rows = {}
for name, fs in combos.items():
    p = realtime(pv, fs, 100, 2009)
    pv["p_" + name] = pv.base * (1 + p)
    nat_rows[name] = pv.dropna(subset=["p_" + name]).groupby("y").apply(
        lambda g: pd.Series({"act": np.average(g["yield"], weights=g.area), "pred": np.average(g["p_" + name], weights=g.area),
                             "base": np.average(g.base, weights=g.area)}), include_groups=False)
kr = pd.read_csv(os.path.join(ROOT, "db/raw/krei/krei_rice_outlook.csv"))
kr["v"] = pd.to_numeric(kr[["yield_lo", "yield_hi"]].mean(axis=1).fillna(kr.yield_kg_10a), errors="coerce")
first = kr.dropna(subset=["v"]).sort_values(["year", "release_date"]).groupby(["source_org", "year"]).v.first().unstack(0)
print("\nT2 전국 실시간(시도 합산):")
t2 = {}
for name, nat in nat_rows.items():
    nat = nat.join(first)
    for a_, b_ in ((2009, 2025), (2013, 2025)):
        g = nat.loc[a_:b_]
        r = lambda e: float(np.sqrt(np.nanmean(e ** 2)))
        t2[f"{name}_{a_}"] = {"base": r(g.base - g.act), "model": r(g.pred - g.act), "krei": r(g.KREI - g.act), "kostat": r(g["통계청"] - g.act)}
        print(f"  [{name}] {a_}~{b_}: 평년 {t2[f'{name}_{a_}']['base']:.1f} | 모델 {t2[f'{name}_{a_}']['model']:.1f} | KREI {t2[f'{name}_{a_}']['krei']:.1f} | 통계청 {t2[f'{name}_{a_}']['kostat']:.1f}")
    nat.round(1).to_csv(os.path.join(OUT, f"nat_{name}.csv"))
    print("   ", {int(y): (round(r_.act), round(r_.pred)) for y, r_ in nat.loc[[y for y in (2012, 2016, 2020, 2024, 2025) if y in nat.index]].iterrows()})
res["t2"] = t2
d.to_csv(os.path.join(OUT, "sigun_dataset.csv"), index=False)
json.dump(res, open(os.path.join(OUT, "results.json"), "w"), ensure_ascii=False, indent=1)
print("저장", OUT)
