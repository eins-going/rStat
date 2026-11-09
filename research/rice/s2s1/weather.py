"""상자 중심에서 가장 가까운 ASOS 관측소의 등숙기 일조·기온 (시군-연도). 값과 그 관측소 직전 10년 평균 대비 편차."""
import os, sys
import numpy as np, pandas as pd
sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import common
OUT = os.path.dirname(os.path.abspath(__file__))


def build():
    b = pd.read_csv(f"{OUT}/boxes.csv")
    g = b.groupby(["sc", "stem"]).agg(lon=("lon0", "mean"), lat=("lat0", "mean")).reset_index()
    st = common.stations()
    a = common.asos(["date", "stn", "ta_avg", "ta_min", "ss_day", "rn_day"])
    a["y"] = a.date // 10000
    a["md"] = a.date % 10000
    a = a[(a.y >= 2005)]
    cnt = a[(a.md >= 801) & (a.md <= 930)].groupby(["stn", "y"]).ss_day.count().unstack()
    good = cnt.columns[cnt.columns >= 2015]
    ok = set(cnt.index[(cnt[good] >= 55).all(axis=1)])
    st = st[st.stn.isin(ok)]
    rows = []
    for r in g.itertuples():
        d = (st.lon - r.lon) ** 2 * np.cos(np.radians(r.lat)) ** 2 + (st.lat - r.lat) ** 2
        rows.append((r.sc, r.stem, int(st.stn.iloc[int(np.argmin(d.values))])))
    m = pd.DataFrame(rows, columns=["sc", "stem", "stn"])
    win = {"ss_0815_0915": (815, 915), "ss_0901_0930": (901, 930), "ss_0801_0831": (801, 831), "ss_0716_0815": (716, 815),
           "ta_0815_0915": (815, 915), "rn_0716_0915": (716, 915), "tmin_0901_0930": (901, 930),
           "rn_0716_0815": (716, 815), "ta_0716_0815": (716, 815)}
    out = []
    for name, (s, e) in win.items():
        col = {"ss": "ss_day", "ta": "ta_avg", "rn": "rn_day", "tmin": "ta_min"}[name.split("_")[0]]
        f = "sum" if col in ("ss_day", "rn_day") else "mean"
        v = a[(a.md >= s) & (a.md <= e)].groupby(["stn", "y"])[col].agg(f).rename(name)
        out.append(v)
    w = pd.concat(out, axis=1).reset_index().sort_values("y")
    for c in win:
        w[c + "_an"] = w[c] - w.groupby("stn")[c].transform(lambda s: s.shift(1).rolling(10, min_periods=5).mean())
    res = m.merge(w, on="stn")
    res.to_csv(f"{OUT}/weather_sigun.csv", index=False)
    return res


if __name__ == "__main__":
    r = build()
    print(r[r.y == 2020].describe().T[["mean", "std"]])
