"""시군 논 중심점 일기상 (1980~2025) — 작물 생리 지표의 입력.

- 관측소: 해발 300m 미만, 섬(울릉도·흑산도·백령도·제주권 제외는 제주 시군만 사용) 산지 제외
- 시군 중심점(common.paddy_centroids)마다 그날 자료가 있는 가장 가까운 3곳을 역거리제곱 가중(100km 이내)
- 일사(Rs, MJ/m2): Ångström Rs = Ra·(a + b·n/N). a·b는 si_day가 있는 관측소-일로 최소제곱 보정.
출력: cropmodel/wx_sigun.pkl  (sc, stem, date, doy, y, tavg, tmax, tmin, rs, ss, rn, gust, wavg, hm), cropmodel/angstrom.json
"""
import json
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import common  # noqa: E402

st = common.stations()
st = st[(st.ht < 300) & ~st.stn.isin([115, 169, 102, 175])].copy()
jeju = {184, 185, 188, 189, 265}
d = common.asos()
W26 = os.path.join(os.path.dirname(HERE), "wx2026", "asos_daily.csv.gz")  # 2026 일자료(같은 형식) 있으면 이어 붙임
if os.path.exists(W26):
    d = pd.concat([d, pd.read_csv(W26)], ignore_index=True).drop_duplicates(subset=["date", "stn"], keep="last")
d = d[d.stn.isin(st.stn)].copy()
d["dt"] = pd.to_datetime(d.date.astype(str))
d["doy"] = d.dt.dt.dayofyear
lat_s = d.stn.map(st.set_index("stn").lat)


def ra_n(lat_deg, doy):
    """대기 밖 일사 Ra (MJ/m2/d), 가조시간 N (h) — FAO-56."""
    phi = np.radians(lat_deg)
    dr = 1 + 0.033 * np.cos(2 * np.pi * doy / 365)
    delta = 0.409 * np.sin(2 * np.pi * doy / 365 - 1.39)
    ws = np.arccos(np.clip(-np.tan(phi) * np.tan(delta), -1, 1))
    ra = 24 * 60 / np.pi * 0.0820 * dr * (ws * np.sin(phi) * np.sin(delta) + np.cos(phi) * np.cos(delta) * np.sin(ws))
    return ra, 24 / np.pi * ws


ra, nn = ra_n(lat_s.values, d.doy.values)
d["ra"], d["N"] = ra, nn
rel = (d.ss_day / d.N).clip(0, 1)
m = d.si_day.notna() & rel.notna() & (d.si_day > 0) & (d.si_day < d.ra)
A = np.c_[d.ra[m], d.ra[m] * rel[m]]
ab, *_ = np.linalg.lstsq(A, d.si_day[m], rcond=None)
pred = A @ ab
r2 = 1 - ((d.si_day[m] - pred) ** 2).sum() / ((d.si_day[m] - d.si_day[m].mean()) ** 2).sum()
print("Ångström a,b", ab.round(3), "R2", round(float(r2), 3), "n", int(m.sum()))
json.dump({"a": float(ab[0]), "b": float(ab[1]), "r2": float(r2), "n": int(m.sum())}, open(os.path.join(HERE, "angstrom.json"), "w"))
d["rs"] = d.ra * (ab[0] + ab[1] * rel)
# 측정 일사가 있으면 그것을 쓰지 않는다(관측소마다 시작 연도가 달라 시계열이 끊긴다) — 일조 기반으로 통일
VARS = {"ta_avg": "tavg", "ta_max": "tmax", "ta_min": "tmin", "rs": "rs", "ss_day": "ss", "rn_day": "rn", "ws_ins": "gust",
        "ws_avg": "wavg", "hm_avg": "hm"}
d["rn_day"] = d.rn_day.fillna(0)  # 강수 결측 = 무강수(ASOS 관행)

pc = common.paddy_centroids()
pc = pc[pc.paddy_ha >= 50].reset_index(drop=True)
lat0, lon0 = np.radians(st.lat.values), np.radians(st.lon.values)
out = []
for _, r in pc.iterrows():
    la, lo = np.radians(r.lat), np.radians(r.lon)
    dist = 6371 * np.arccos(np.clip(np.sin(la) * np.sin(lat0) + np.cos(la) * np.cos(lat0) * np.cos(lo - lon0), -1, 1))
    cand = pd.Series(dist, index=st.stn.values)
    if r.sc == "39":
        cand = cand[cand.index.isin(jeju)]
    else:
        cand = cand[~cand.index.isin(jeju)]
    cand = cand[cand <= 100].nsmallest(6)
    if cand.empty:
        cand = pd.Series(dist, index=st.stn.values).nsmallest(3)
    sub = d[d.stn.isin(cand.index)][["dt", "stn"] + list(VARS)]
    res = {}
    for v in VARS:
        p = sub.pivot(index="dt", columns="stn", values=v)
        wv = 1 / np.maximum(cand[p.columns].values, 5) ** 2
        w = pd.DataFrame(np.tile(wv, (len(p), 1)), index=p.index, columns=p.columns).where(p.notna())
        # 가장 가까운 3곳만
        rk = w.rank(axis=1, ascending=False)
        w = w.where(rk <= 3)
        res[VARS[v]] = (p * w).sum(axis=1) / w.sum(axis=1)
    g = pd.DataFrame(res)
    g["sc"], g["stem"] = r.sc, r.stem
    out.append(g.reset_index())
wx = pd.concat(out, ignore_index=True)
wx["date"] = wx.dt
wx["y"] = wx.dt.dt.year
wx["doy"] = wx.dt.dt.dayofyear
wx = wx.drop(columns="dt")
for c in VARS.values():
    wx[c] = wx[c].astype("float32")
pc.to_csv(os.path.join(HERE, "sigun_centroids.csv"), index=False)
wx.to_pickle(os.path.join(HERE, "wx_sigun.pkl"))
print(wx.shape, wx.isna().mean().round(3).to_dict())
