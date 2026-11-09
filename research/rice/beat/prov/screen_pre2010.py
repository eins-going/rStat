"""탐색(사전 등록 전): 1985~2009 만 사용. 시도 상대편차 d = a − ā(8도 면적가중) 와 상대 기상 편차의 단변량 상관, d의 지속성."""
import os
import sys

import numpy as np
import pandas as pd

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from evalp import RICE, PROV, truth  # noqa

t = truth()
s = t[t.sc.isin(PROV)].copy()
s["abar"] = s.y.map(s.groupby("y").apply(lambda g: np.average(g.a, weights=g.area)))
s["d"] = s.a - s.abar
rel = pd.read_pickle("work/feat_rel.pkl")["1001"]
x = s.merge(rel, on=["y", "sc"])
x = x[x.y.between(1985, 2009)]
cols = [c for c in rel.columns if c not in ("y", "sc")]
r = {c: x.d.corr(x[c]) for c in cols if x[c].notna().sum() > 100}
print("상대 특징 vs d (1985~2009, n≈200):")
for c, v in sorted(r.items(), key=lambda kv: -abs(kv[1])):
    print(f"  {c:16s} {v:+.3f}  n={x[c].notna().sum()}")
s = s.sort_values("y")
s["d1"] = s.groupby("sc").d.shift(1)
s["d3"] = s.groupby("sc").d.transform(lambda v: v.shift(1).rolling(3).mean())
z = s[s.y.between(1985, 2009)]
print("d 지속성 lag1 r", round(z.d.corr(z.d1), 3), " 직전3년평균 r", round(z.d.corr(z.d3), 3))
# M4 실시간 상대 잔차 지속성 (1996~2009)
p = pd.read_csv(os.path.join(RICE, "cropmodel/out_fixed/contrib_sido_0915.csv"), dtype={"sc": str})
p = p.merge(t[["y", "sc", "area"]], on=["y", "sc"])
p["hbar"] = p.y.map(p.groupby("y").apply(lambda g: np.average(g.ahat, weights=g.area)))
p["abar"] = p.y.map(p.groupby("y").apply(lambda g: np.average(g.a, weights=g.area)))
p["res"] = (p.a - p.abar) - (p.ahat - p.hbar)
p["dh"] = p.ahat - p.hbar
p["d"] = p.a - p.abar
p = p.sort_values("y")
p["res1"] = p.groupby("sc").res.shift(1)
q = p[p.y.between(1997, 2009)]
print("M4 0915 상대 잔차 lag1 r (1997~2009)", round(q.res.corr(q.res1), 3), " M4 상대예측 vs d r", round(q.d.corr(q.dh), 3),
      " 기울기", round(float(np.sum(q.d * q.dh) / np.sum(q.dh ** 2)), 2))
