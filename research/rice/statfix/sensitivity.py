"""gust_fill(8/1~9/14 순간최대풍 ≥15m/s 일수) 민감도: 문턱·기간을 바꿔도 같은 결론인지, 2020을 빼도 남는지."""
import json
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import common as c  # noqa: E402

D = pd.read_csv(os.path.join(HERE, "features_sido.csv"), dtype={"sc": str})
NAT = D[D.sc == "00"].set_index("y").sort_index()
st = c.stations()
st = st[(st.seen_first <= 1995) & (st.seen_last >= 2025) & (st.ht < 400)]
cen = c.paddy_centroids().dropna(subset=["sc"])
dx = (cen.lon.values[:, None] - st.lon.values[None]) * np.cos(np.radians(36))
dy = cen.lat.values[:, None] - st.lat.values[None]
cen["stn"] = st.stn.values[np.argmin(dx ** 2 + dy ** 2, axis=1)]
w = cen.groupby("stn").paddy_ha.sum()
a = c.asos(["date", "stn", "ws_ins"])
a = a[a.stn.isin(w.index)]
a["y"] = a.date // 10000
a["md"] = a.date % 10000
a = a[(a.y >= 1995) & (a.md.between(701, 1010))]


def feat(thr, d0, d1):
    x = a[a.md.between(d0, d1)]
    g = x.groupby(["y", "stn"]).ws_ins.apply(lambda v: (v >= thr).sum()).unstack()
    v = g.apply(lambda r: np.average(r.fillna(r.mean()), weights=w.reindex(r.index).values), axis=1)
    return v - v.shift(1).rolling(15, min_periods=10).mean()


def rt(x, years=range(2013, 2026), min_tr=5):
    out = {}
    for y in years:
        tr = NAT[NAT.index < y].assign(x=x).dropna(subset=["x", "e"])
        if len(tr) < min_tr:
            out[y] = 0.0
            continue
        b = np.polyfit(tr.x, tr.e, 1)
        out[y] = b[0] * x.loc[y] + b[1]
    return pd.Series(out)


res = {}
ys = list(range(2013, 2026))
err0 = (NAT.F - NAT["yield"]).loc[ys]
for thr in (12, 15, 20):
    for (d0, d1) in ((801, 914), (815, 914), (801, 831), (701, 914)):
        x = feat(thr, d0, d1)
        eh = rt(x)
        err = (NAT.F.loc[ys] * (1 + eh) - NAT["yield"].loc[ys])
        no20 = [y for y in ys if y != 2020]
        k = f"thr{thr}_{d0}-{d1}"
        res[k] = {"rmse": round(float(np.sqrt((err ** 2).mean())), 2), "mae": round(float(err.abs().mean()), 2),
                  "rmse_no2020": round(float(np.sqrt((err.loc[no20] ** 2).mean())), 2),
                  "rmse0_no2020": round(float(np.sqrt((err0.loc[no20] ** 2).mean())), 2),
                  "err2020": round(float(err.loc[2020]), 1), "err2024": round(float(err.loc[2024]), 1),
                  "r_full": round(float(pd.concat([x, NAT.e], axis=1).dropna().corr().iloc[0, 1]), 2)}
        print(k, res[k])
print("보정 전 RMSE", round(float(np.sqrt((err0 ** 2).mean())), 2))
json.dump(res, open(os.path.join(HERE, "sensitivity.json"), "w"), ensure_ascii=False, indent=1)
