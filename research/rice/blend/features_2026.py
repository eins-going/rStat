"""statfix 특징 만들기: 통계청 10월 예상의 오차(확정/예상-1)를 설명할 '조사 이후(9/15~10/10)' 정보.
출력 features_sido.csv (y, sc, e, A, F, area, 특징들). 시도 2자리 + '00'(전국, 면적가중).
모든 편차는 그해 이전 15년 평균 대비 (실시간)."""
import os
import sys

import numpy as np
import pandas as pd

HERE = "/home/eins/project/rStat/research/rice/statfix"
sys.path.insert(0, os.path.dirname(HERE))
import common as c  # noqa: E402

# ---------- 정답: 예상 대비 확정 ----------
f = pd.read_csv(os.path.join(os.path.dirname(HERE), "statdown/stat_forecast_sido.csv"), dtype={"sido_code": str})
F = f.rename(columns={"year": "y", "sido_code": "sc", "yield_kg10a": "F"})[["y", "sc", "F", "release_date"]]
k = c._kosis()
s = k[k.code.str.len() == 2].rename(columns={"code": "sc"}).sort_values("y")
s["sbase"] = s.groupby("sc")["yield"].transform(c._olympic)
D = s.merge(F, on=["y", "sc"], how="right")[["y", "sc", "yield", "area", "sbase", "F", "release_date"]]
D["e"] = D["yield"] / D.F - 1          # 목표: 확정/예상 - 1
D["A"] = D.F / D.sbase - 1             # 예상 편차 (평년 대비)

# ---------- 기상: 시군 논 중심 → 가까운 장기 관측소, 논 면적 가중으로 시도·전국 ----------
st = c.stations()
st = st[(st.seen_first <= 1995) & (st.seen_last >= 2025) & (st.ht < 400)]
cen = c.paddy_centroids().dropna(subset=["sc"])
lat0 = np.radians(36)
dx = (cen.lon.values[:, None] - st.lon.values[None]) * np.cos(lat0)
dy = cen.lat.values[:, None] - st.lat.values[None]
cen["stn"] = st.stn.values[np.argmin(dx ** 2 + dy ** 2, axis=1)]
w_st = cen.groupby(["sc", "stn"]).paddy_ha.sum().reset_index()
w_nat = cen.groupby("stn").paddy_ha.sum().reset_index().assign(sc="00")
W = pd.concat([w_st, w_nat])

a = c.asos(["date", "stn", "ta_avg", "ta_max", "ta_min", "ws_ins", "ss_day", "rn_day"])
a = a[a.stn.isin(W.stn.unique())]
a["y"] = a.date // 10000
md = a.date % 10000
a = a[(md >= 801) & (md <= 1010) & (a.y >= 1995)]
md = a.date % 10000
a["rn_day"] = a.rn_day.fillna(0)
WIN = {"post": (915, 1010), "fill": (801, 914), "sep": (901, 930)}
rows = []
for wn, (d0, d1) in WIN.items():
    x = a[(md >= d0) & (md <= d1)]
    g = x.groupby(["stn", "y"])
    rows.append(pd.DataFrame({
        f"t_{wn}": g.ta_avg.mean(), f"tmax_{wn}": g.ta_max.mean(), f"tmin_{wn}": g.ta_min.mean(),
        f"hot_{wn}": g.ta_max.apply(lambda v: (v > 30).sum()),
        f"ss_{wn}": g.ss_day.mean() * (d1 - d0 if wn != "post" else 26),   # 기간 합 비례(결측 보정)
        f"rd_{wn}": g.rn_day.apply(lambda v: (v >= 1).sum()), f"hr_{wn}": g.rn_day.apply(lambda v: (v >= 30).sum()),
        f"rn_{wn}": g.rn_day.sum(), f"gust_{wn}": g.ws_ins.apply(lambda v: (v >= 15).sum())}))
X = pd.concat(rows, axis=1).reset_index()
X = W.merge(X, on="stn")
cols = [cc for cc in X.columns if "_" in cc and cc.split("_")[1] in WIN]
Wx = X.groupby(["sc", "y"]).apply(lambda d: pd.Series(np.average(d[cols].fillna(d[cols].mean()), weights=d.paddy_ha, axis=0), index=cols)).reset_index()
Wx = Wx.sort_values("y")
for cc in cols:  # 이전 15년 평균 대비 편차
    Wx[cc] = Wx[cc] - Wx.groupby("sc")[cc].transform(lambda v: v.shift(1).rolling(15, min_periods=10).mean())

# ---------- MODIS: 9/14 합성(doy 257, 9/14~9/29; 10/10 전 공개)과 doy 265(9/22~10/7, 낙관) ----------
m = pd.read_csv(os.path.join(c.ROOT, "db/clean/rice/modis_curves.csv"))
m = m[m.level.isin(["sido", "nation"])].copy()
m["sc"] = np.where(m.level == "nation", "00", m.sido.map(c.sido_code))
p = m.pivot_table(index=["sc", "y"], columns="doy", values="ndvi")
M = pd.DataFrame(index=p.index)
M["peak"] = p[[d for d in p.columns if 201 <= d <= 241]].max(axis=1)
M["n257"] = p[257]
M["n265"] = p[265]
M["dec257"] = p[257] - M.peak          # 피크 이후 감소 (음수)
M["dec265"] = p[265] - M.peak
M["late"] = p[[249, 257]].mean(axis=1)
M = M.reset_index().sort_values("y")
for cc in ["peak", "n257", "n265", "dec257", "dec265", "late"]:
    M[f"m_{cc}"] = M[cc] - M.groupby("sc")[cc].transform(lambda v: v.shift(1).rolling(5, min_periods=3).mean())
M = M[["sc", "y"] + [cc for cc in M.columns if cc.startswith("m_")]]

# ---------- KREI 10월호(9월 말 발표, 통계청 예상보다 먼저) ----------
kr = pd.read_csv(os.path.join(c.ROOT, "db/raw/krei/krei_rice_outlook.csv"))
kr = kr[(kr.source_org == "KREI") & kr.release.str.contains("10월호|속보")].copy()
kr["kv"] = (kr.yield_lo + kr.yield_hi) / 2
kr = kr.sort_values("release_date").groupby("year").kv.last().reset_index().rename(columns={"year": "y"})

out = D.merge(Wx, on=["sc", "y"], how="left").merge(M, on=["sc", "y"], how="left")
out = out.merge(kr, on="y", how="left")
out.loc[out.sc != "00", "kv"] = np.nan
out["krei_gap"] = out.kv / out.F - 1
out = out.sort_values(["y", "sc"])
out.to_csv("/home/eins/project/rStat/research/rice/blend/features_sido_2026.csv", index=False)
print(out[out.sc == "00"][["y", "F", "yield", "e", "A", "t_post", "hot_post", "ss_post", "rd_post", "m_dec257", "m_dec265", "krei_gap"]].round(3).to_string())
