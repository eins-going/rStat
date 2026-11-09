"""ASOS 일자료 → 시군 논 중심점 일기상 (가까운 관측소 3곳 역거리제곱 가중, 산지·섬 제외).

출력: pheno/wx_daily.npz  units[sc|stem], years 1980~2025, doy 121~305, vars, arr[unit, year, day, var] float32
"""
import os
import sys

import numpy as np
import pandas as pd

sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import common  # noqa: E402

OUT = "/home/eins/project/rStat/research/rice/pheno"
VARS = ["ta_avg", "ta_max", "ta_min", "hm_avg", "ws_avg", "ws_ins", "ss_day", "si_day", "rn_day"]
D0, D1 = 121, 305
YEARS = np.arange(1980, 2027)  # 2026은 research/rice/wx2026 (11/8까지)

st = common.stations()
st = st[(st.ht < 300) & ~st.stn.isin([102, 115, 169, 185, 188, 189, 265, 184, 90])]  # 섬·제주 해안 일부 제외 (제주는 별도 처리)
cent = common.paddy_centroids()
cent = cent[cent.paddy_ha > 0].reset_index(drop=True)
# 제주 시군은 제주 관측소 허용
stj = common.stations()
w = common.asos(["date", "stn"] + VARS)
w["y"] = w.date // 10000
w = w[(w.y >= 1980) & (w.y <= 2025)]
W26 = "/home/eins/project/rStat/research/rice/wx2026/asos_daily.csv.gz"
if os.path.exists(W26):
    w26 = pd.read_csv(W26, usecols=["date", "stn"] + VARS)
    w26["y"] = w26.date // 10000
    w = pd.concat([w, w26[w26.y == 2026]], ignore_index=True)
dt = pd.to_datetime(w.date.astype(str), format="%Y%m%d")
w["doy"] = dt.dt.dayofyear.values
w = w[(w.doy >= D0) & (w.doy <= D1)]
stns = sorted(w.stn.unique())
sidx = {s: i for i, s in enumerate(stns)}
ND = D1 - D0 + 1
cube = np.full((len(stns), len(YEARS), ND, len(VARS)), np.nan, dtype=np.float32)
cube[w.stn.map(sidx).values, (w.y - 1980).values, (w.doy - D0).values, :] = w[VARS].values.astype(np.float32)
del w
ri, ti = VARS.index("rn_day"), VARS.index("ta_avg")
rn = cube[..., ri]
rn[np.isnan(rn) & ~np.isnan(cube[..., ti])] = 0  # 무강수일은 빈칸


def hav(lat1, lon1, lat2, lon2):
    p = np.pi / 180
    a = np.sin((lat2 - lat1) * p / 2) ** 2 + np.cos(lat1 * p) * np.cos(lat2 * p) * np.sin((lon2 - lon1) * p / 2) ** 2
    return 12742 * np.arcsin(np.sqrt(a))


arr = np.full((len(cent), len(YEARS), ND, len(VARS)), np.nan, dtype=np.float32)
used = []
for i, r in cent.iterrows():
    cand = stj[stj.stn.isin([184, 189])] if r.sc == "39" else st
    cand = cand[cand.stn.isin(stns)]
    d = hav(r.lat, r.lon, cand.lat.values, cand.lon.values)
    o = np.argsort(d)[:8]
    ids = cand.stn.values[o]
    wt = 1 / np.maximum(d[o], 3) ** 2
    sub = cube[[sidx[s] for s in ids]]  # (8, Y, D, V) 가까운 순
    av = ~np.isnan(sub)
    use = av & (np.cumsum(av, axis=0) <= 3)  # 그날 자료 있는 가까운 3곳
    W = np.where(use, wt[:, None, None, None], 0)
    num = np.sum(np.where(use, sub, 0) * W, axis=0)
    den = W.sum(axis=0)
    with np.errstate(invalid="ignore"):
        arr[i] = np.where(den > 0, num / den, np.nan)
    used.append((r.sc, r.stem, *ids[:3], *np.round(d[o][:3], 1)))

units = (cent.sc + "|" + cent.stem).values
np.savez_compressed(os.path.join(OUT, "wx_daily.npz"), units=units, years=YEARS, doy=np.arange(D0, D1 + 1), vars=np.array(VARS),
                    arr=arr, paddy_ha=cent.paddy_ha.values, lat=cent.lat.values, lon=cent.lon.values)
pd.DataFrame(used, columns=["sc", "stem", "s1", "s2", "s3", "d1", "d2", "d3"]).to_csv(os.path.join(OUT, "wx_stations_used.csv"), index=False)
print("saved", arr.shape, np.isnan(arr).mean(axis=(0, 1, 2)).round(3))
