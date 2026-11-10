"""wx_sigun.pkl의 일사(rs)·흐린 날 입력을 POWER로 바꾼 변형 → cropmodel/wx_sigun_{P1,P2,P3}.pkl (README 사전 등록)."""
import os, sys
import numpy as np, pandas as pd
HERE = os.path.dirname(os.path.abspath(__file__)); CM = os.path.join(os.path.dirname(HERE), "cropmodel")
wx = pd.read_pickle(os.path.join(CM, "wx_sigun.pkl"))
pc = pd.read_csv(os.path.join(CM, "sigun_centroids.csv"), dtype={"sc": str})
cell = lambda v: round(round(v * 2) / 2, 1)
cache = {}
def power(lat, lon):
    k = (cell(lat), cell(lon))
    if k not in cache:
        p = pd.read_csv(os.path.join(HERE, "data", f"power_{k[0]}_{k[1]}.csv"))
        p["date"] = pd.to_datetime(p.date.astype(str))
        cache[k] = p.set_index("date")[["ALLSKY_SFC_SW_DWN", "CLRSKY_SFC_SW_DWN"]]
    return cache[k]
wx["sc"] = wx.sc.astype(str)
out = {v: [] for v in ("P1", "P2", "P3")}
for (sc, stem), g in wx.groupby(["sc", "stem"], sort=False):
    r = pc[(pc.sc == sc) & (pc.stem == stem)].iloc[0]
    p = power(r.lat, r.lon).reindex(pd.to_datetime(g.date).values)
    A = g.rs.values.astype(float)
    B = p.ALLSKY_SFC_SW_DWN.values
    dt = pd.to_datetime(g.date)
    era = np.where(dt.dt.year <= 2000, 0, 1)
    mon = dt.dt.month.values
    Bs = np.full(len(g), np.nan)
    for e in (0, 1):
        for m in range(1, 13):
            k = (era == e) & (mon == m) & ~np.isnan(B) & ~np.isnan(A)
            if k.sum() > 50:
                kk = (era == e) & (mon == m)
                Bs[kk] = B[kk] * (A[k].mean() / B[k].mean())
    ok = ~np.isnan(Bs) & (dt.dt.year.values >= 1984)
    rs1 = np.where(ok, Bs, A)
    g1 = g.copy(); g1["rs"] = rs1.astype("float32"); out["P1"].append(g1)
    g3 = g.copy(); g3["rs"] = np.where(ok, (A + Bs) / 2, A).astype("float32"); out["P3"].append(g3)
    # P2: 흐린 날 = 맑음 비 kt < 문턱 (1985~2012 빈도를 일조<1h 빈도와 같게)
    kt = (p.ALLSKY_SFC_SW_DWN / p.CLRSKY_SFC_SW_DWN).values
    cal = (dt.dt.year.between(1985, 2012)).values & ~np.isnan(kt) & g.ss.notna().values
    freq = (g.ss.values[cal] < 1).mean()
    thr = np.quantile(kt[cal], freq)
    okk = ~np.isnan(kt) & (dt.dt.year.values >= 1984)
    ss2 = np.where(okk, np.where(kt < thr, 0.0, 5.0), g.ss.values)
    g2 = g1.copy(); g2["ss"] = ss2.astype("float32"); out["P2"].append(g2)
for v, parts in out.items():
    d = pd.concat(parts, ignore_index=True)
    d.to_pickle(os.path.join(CM, f"wx_sigun_{v}.pkl"))
    print(v, d.shape, "rs 결측", round(float(d.rs.isna().mean()), 4))
