"""실시간 시험: (1) 단수 = 모델 + γ·(시도 면적 변화율)  (2) 시군 면적 = 직전해 × 시도 변화율 × (1 + κ·시군 상대 추세)"""
import sys; sys.path.insert(0, '/home/eins/project/rStat/research/rice')
import numpy as np, pandas as pd, common as C
t = C.targets().sort_values("y"); g = t.groupby(["sc", "stem"])
t["a1"] = g.area.shift(1); t["a2"] = g.area.shift(2); t["a4"] = g.area.shift(4)
k = C._kosis(); s = k[k.code.str.len() == 2].rename(columns={"code": "sc", "area": "sa"})[["y", "sc", "sa"]].sort_values("y")
s["sa1"] = s.groupby("sc").sa.shift(1); s["sa2"] = s.groupby("sc").sa.shift(2); s["sa4"] = s.groupby("sc").sa.shift(4)
n = s[s.sc == "00"][["y", "sa", "sa1"]].rename(columns={"sa": "na", "sa1": "na1"})
t = t.merge(s, on=["y", "sc"], how="left").merge(n, on="y", how="left")
t["ach"] = t.sa / t.sa1 - 1; t["nch"] = t.na / t.na1 - 1
for nm, f in [("m0915", "blend/pred_crop_persist_0915.csv"), ("m1010", "blend/pred_stat_crop.csv")]:
    p = pd.read_csv(f, dtype={"sc": str}).merge(t[["y", "sc", "stem", "yield", "area", "ach", "nch"]], on=["y", "sc", "stem"])
    hist = None
    if nm == "m0915":  # 학습용 과거: 1997~2012 작물모델 시군 예측이 없으므로 시도 단위 실시간 잔차는 2013~ 것만 → 앞쪽 해는 γ=0
        pass
    for var in ["ach", "nch"]:
        out = []
        for Y in range(2013, 2026):
            tr = p[(p.y < Y)].dropna(subset=["yield"])
            if tr.y.nunique() >= 3:
                r = tr["yield"] / tr.pred_yield - 1; x = tr[var]
                gam = float(np.sum(tr.area * x * r) / np.sum(tr.area * x ** 2))
            else:
                gam = 0.0
            te = p[p.y == Y].copy(); te["pred_yield"] = te.pred_yield * (1 + gam * te[var]); te["gam"] = gam; out.append(te)
        o = pd.concat(out)
        print(nm, var, "γ:", o.groupby("y").gam.first().round(2).to_dict())
        C.evaluate(o, f"{nm} + γ·{var}")
    C.evaluate(p, f"{nm} 그대로")
# 장기 시도 시험(1985~): KOSIS 시도 단수 편차(올림픽 평년) vs 시도 면적 변화, 해마다 시도 고정 없이
k2 = k[k.code.str.len() == 2].sort_values("y").copy()
k2["base"] = k2.groupby("code")["yield"].transform(lambda v: v.shift(1).rolling(5).apply(lambda w: (w.sum() - w.max() - w.min()) / 3, raw=True))
k2["a"] = k2["yield"] / k2.base - 1; k2["ach"] = k2.area / k2.groupby("code").area.shift(1) - 1
k2 = k2[(k2.code != "00") & k2.code.isin(["31", "32", "33", "34", "35", "36", "37", "38"])].dropna(subset=["a", "ach"])
for a, b in [(1985, 2025), (1985, 2004), (2005, 2025)]:
    q = k2[(k2.y >= a) & (k2.y <= b)]
    qd = q.assign(a=q.a - q.groupby("y").a.transform("mean"), ach=q.ach - q.groupby("y").ach.transform("mean"))
    print(f"8도 {a}~{b}: r(단수 편차, 면적 변화) {q.a.corr(q.ach):+.3f} | 같은 해 도 사이만 {qd.a.corr(qd.ach):+.3f} | n {len(q)}")
