"""태풍 해에만 위성 피해 신호가 시군 차이를 설명하는가 (상호작용 가설, 11-09 03:50 결과 전 기록).
x = 시군 NDVI 노화량 Δ(9/14~9/30 합성 평균 − 8/13~8/28 평균) 의 자기 직전 5년 대비 편차, 같은 해 같은 도 평균을 뺀 값
y = 시군 실제 편차 a − 같은 해 도 면적가중 a (시군 고유 몫)
강풍 해·도 = statfix gust_fill(8/1~9/14 순간풍속 15m/s 이상 날수의 15년 대비 편차) > +1일.
가설: 강풍 도-해에서 r(x, y) > 0 (덜 떨어진 시군이 덜 손해), 아닌 해에서는 0 근처."""
import glob, os, sys
import numpy as np, pandas as pd
R = '/home/eins/project/rStat/research/rice'; sys.path.insert(0, R)
import common as C
cl = pd.read_csv(f"{R}/lswi/data/cells.csv"); cl["sc"] = cl.sido.map(C.sido_code); cl["stem"] = cl.sigun.str[:-1]
rows = []
for f in sorted(glob.glob(f"{R}/lswi/data/sr_*.npz")):
    y = int(f[-8:-4]); z = np.load(f); comp = [str(c)[4:] for c in z["comp"]]
    if not comp: continue
    s = z["state_500m"].astype(np.int64); b1, b2 = z["b01"].astype(float), z["b02"].astype(float)
    ok = ((s & 3) == 0) & (((s >> 2) & 1) == 0) & (((s >> 8) & 3) == 0) & (b2 > 0) & (b1 > -100)
    nd = np.where(ok, (b2 - b1) / (b2 + b1), np.nan)
    pk = [i for i, c in enumerate(comp) if f"{y}-08-13" <= c <= f"{y}-08-28"]
    lt = [i for i, c in enumerate(comp) if f"{y}-09-14" <= c <= f"{y}-09-30"]
    with np.errstate(all="ignore"):
        dlt = np.nanmean(nd[lt], 0) - np.nanmean(nd[pk], 0)
    g = pd.DataFrame({"sc": cl.sc, "stem": cl.stem, "frac": cl.frac, "d": dlt}).dropna()
    g = g.groupby(["sc", "stem"]).apply(lambda q: pd.Series({"d": np.average(q.d, weights=q.frac), "n": len(q)})).reset_index()
    g["y"] = y; rows.append(g)
x = pd.concat(rows); x = x[x.n >= 10].sort_values("y")
x["dan"] = x.d - x.groupby(["sc", "stem"]).d.transform(lambda v: v.shift(1).rolling(5, min_periods=3).mean())
x["xc"] = x.dan - x.groupby(["y", "sc"]).dan.transform("mean")
t = C.targets().dropna(subset=["a"])
pa = t.groupby(["y", "sc"]).apply(lambda q: np.average(q.a, weights=q.area)).rename("pa").reset_index()
t = t.merge(pa, on=["y", "sc"]); t["res"] = t.a - t.pa
d = t.merge(x[["y", "sc", "stem", "xc"]], on=["y", "sc", "stem"]).dropna(subset=["xc"])
gf = pd.read_csv(f"{R}/statfix/features_sido.csv", dtype={"sc": str})[["y", "sc", "gust_fill"]]
d = d.merge(gf, on=["y", "sc"], how="left")
d["windy"] = d.gust_fill > 1
print("시군-연도", len(d), "강풍 도-해 시군", int(d.windy.sum()))
for k, g in d.groupby("windy"):
    rr = [q.xc.corr(q.res) for _, q in g.groupby(["y", "sc"]) if len(q) >= 6]
    print(f"강풍={k}: 전체 r {g.xc.corr(g.res):+.3f} (n {len(g)}), 도-해별 r 평균 {np.nanmean(rr):+.3f} 양수 비율 {np.mean(np.array(rr) > 0):.2f} ({len(rr)}개)")
w = d[d.windy]
print(w.groupby(["y", "sc"]).apply(lambda q: pd.Series({"n": len(q), "gust": q.gust_fill.iloc[0], "r": q.xc.corr(q.res)})).round(2).to_string())
d.to_csv(f"{R}/lswi/damage_sigun.csv", index=False)
