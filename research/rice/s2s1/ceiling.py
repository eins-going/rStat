"""서술: 같은 해 시군 a의 공간 일관성 — 같은 도 다른 시군 평균 a와의 순위상관 (상한 감 잡기용, 모형 아님)"""
import sys; sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import pandas as pd, numpy as np, common
b = pd.read_csv("boxes.csv", dtype={"sc": str}); u = b[["sc", "stem"]].drop_duplicates()
t = common.targets().merge(u, on=["sc", "stem"]).dropna(subset=["a"])
t = t[t.y >= 2013]
out = []
for y, g in t.groupby("y"):
    s = g.groupby("sc").a.transform("sum"); n = g.groupby("sc").a.transform("count")
    loo = (s - g.a) / (n - 1)
    ok = n > 1
    r = g.a[ok].rank().corr(loo[ok].rank())
    # 직전 해 a 지속성
    p = common.targets().merge(u, on=["sc", "stem"]); p = p[p.y == y - 1][["sc", "stem", "a"]].rename(columns={"a": "a_prev"})
    q = g.merge(p, on=["sc", "stem"])
    out.append((y, round(g.a.std(), 3), round(r, 2), round(q.a.rank().corr(q.a_prev.rank()), 2)))
print(pd.DataFrame(out, columns=["y", "sd_a", "r_도내다른시군", "r_직전해"]).to_string())
