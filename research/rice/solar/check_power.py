"""POWER 일사 vs 지금 방식(이웃 3곳 일조→Ångström, 그 관측소 제외) — 일사계 관측소 실측과 비교.
핵심 지표: 출수 전 창(7/10~8/9, 시도 평균 출수 8월 중순 기준 H-30..H-1 근처) 연 합계의 해마다 편차가 실측과 얼마나 맞나.
"""
import json, os, sys
import numpy as np, pandas as pd
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.dirname(HERE))
import common as C
sys.path.insert(0, os.path.join(os.path.dirname(HERE), "cropmodel"))
ab = json.load(open(os.path.join(os.path.dirname(HERE), "cropmodel", "angstrom.json")))

def ra_n(lat, doy):
    phi = np.radians(lat); dr = 1 + 0.033 * np.cos(2 * np.pi * doy / 365); de = 0.409 * np.sin(2 * np.pi * doy / 365 - 1.39)
    ws = np.arccos(np.clip(-np.tan(phi) * np.tan(de), -1, 1))
    return 24 * 60 / np.pi * 0.082 * dr * (ws * np.sin(phi) * np.sin(de) + np.cos(phi) * np.cos(de) * np.sin(ws)), 24 / np.pi * ws

st = C.stations(); st = st[(st.ht < 300) & ~st.stn.isin([115, 169, 102, 175, 184, 185, 188, 189, 265])]
d = C.asos(["date", "stn", "ss_day", "si_day"]); d = d[d.date >= 19840101]
d["dt"] = pd.to_datetime(d.date.astype(str)); d["doy"] = d.dt.dt.dayofyear
d = d.merge(st[["stn", "lat"]], on="stn")
ra, N = ra_n(d.lat.values, d.doy.values)
d["rs"] = ra * (ab["a"] + ab["b"] * (d.ss_day / N).clip(0, 1))
RS = d.pivot(index="dt", columns="stn", values="rs"); SI = d.pivot(index="dt", columns="stn", values="si_day")
vp = pd.read_csv(os.path.join(HERE, "val_points.csv"))
cell = lambda v: round(round(v * 2) / 2, 1)
rows, daily = [], []
for _, p in vp.iterrows():
    if p.id in (169,):
        continue
    s = st[st.stn != p.id]
    dist = 6371 * np.arccos(np.clip(np.sin(np.radians(p.lat)) * np.sin(np.radians(s.lat)) + np.cos(np.radians(p.lat)) * np.cos(np.radians(s.lat)) * np.cos(np.radians(p.lon - s.lon)), -1, 1))
    nb = pd.Series(dist.values, index=s.stn.values); nb = nb[nb <= 100].nsmallest(6)
    sub = RS[[c for c in nb.index if c in RS.columns]]
    w = (1 / np.maximum(nb[sub.columns].values, 5) ** 2)
    W = pd.DataFrame(np.tile(w, (len(sub), 1)), index=sub.index, columns=sub.columns).where(sub.notna())
    W = W.where(W.rank(axis=1, ascending=False) <= 3)
    A = (sub * W).sum(axis=1) / W.sum(axis=1)
    pw = pd.read_csv(os.path.join(HERE, "data", f"power_{cell(p.lat)}_{cell(p.lon)}.csv"))
    pw.index = pd.to_datetime(pw.date.astype(str)); B = pw.ALLSKY_SFC_SW_DWN
    df = pd.DataFrame({"obs": SI[p.id], "A": A, "B": B}).dropna()
    df = df[(df.obs > 0.3)]
    df["Cm"] = (df.A + df.B) / 2
    df["y"] = df.index.year; df["doy"] = df.index.dayofyear
    df["era"] = np.where(df.y <= 2000, "1985-2000", "2001-2025")
    df = df[df.y >= 1985]
    for era, g in df.groupby("era"):
        r = {"stn": p.id, "era": era}
        for k in ["A", "B", "Cm"]:
            r[f"dayR2_{k}"] = 1 - ((g.obs - g[k]) ** 2).sum() / ((g.obs - g.obs.mean()) ** 2).sum()
        win = g[(g.doy >= 191) & (g.doy <= 221)]
        yy = win.groupby("y").agg(n=("obs", "size"), obs=("obs", "sum"), A=("A", "sum"), B=("B", "sum"), Cm=("Cm", "sum"))
        yy = yy[yy.n >= 28]
        if len(yy) >= 8:
            for k in ["A", "B", "Cm"]:
                a = yy[k] - yy[k].mean(); o = yy.obs - yy.obs.mean()
                r[f"winR_{k}"] = float(np.corrcoef(a, o)[0, 1]); r[f"winRMSEanom_{k}"] = float(np.sqrt(((a - o) ** 2).mean()))
            r["win_sd_obs"] = float(yy.obs.std()); r["nyr"] = len(yy)
        rows.append(r)
R = pd.DataFrame(rows)
pd.set_option("display.width", 220)
print(R.groupby("era").mean(numeric_only=True).drop(columns="stn").round(3).T.to_string())
print("\n관측소별 창 편차 상관 (2001-2025):")
print(R[R.era == "2001-2025"][["stn", "winR_A", "winR_B", "winR_Cm", "nyr"]].round(2).to_string(index=False))
R.to_csv(os.path.join(HERE, "check_power.csv"), index=False)
