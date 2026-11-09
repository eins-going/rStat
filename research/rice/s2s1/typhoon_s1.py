"""서술: 태풍 전후 같은 궤도 S1 변화(ΔVV, ΔVH, ΔVH/VV)와 그해 시군 편차 a의 같은 해 순위상관. 쓰러짐(도복) 가설."""
import sys; sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import pandas as pd, numpy as np, common
OUT = "/home/eins/project/rStat/research/rice/s2s1"
TY = {2018: ["08-23", "10-06"], 2019: ["09-07", "09-22", "10-02"], 2020: ["08-26", "09-03", "09-07"], 2021: ["09-17"],
      2022: ["09-06"], 2023: ["08-10"]}
d = pd.read_json(f"{OUT}/rows_s1.jsonl", lines=True)
d = d[d.vh.notna()].copy(); d["date"] = pd.to_datetime(d.date); d["y"] = d.date.dt.year
b = pd.read_csv(f"{OUT}/boxes.csv", dtype={"sc": str})
t = common.targets()
rows = []
for y, tys in TY.items():
    for ty in tys:
        T = pd.Timestamp(f"{y}-{ty}")
        for (bx, rel), g in d[d.y == y].groupby(["box", "rel"]):
            pre = g[(g.date < T) & (g.date >= T - pd.Timedelta(days=13))].sort_values("date")
            post = g[(g.date > T) & (g.date <= T + pd.Timedelta(days=13))].sort_values("date")
            if len(pre) and len(post):
                p0, p1 = pre.iloc[-1], post.iloc[0]
                rows.append(dict(box=bx, y=y, ty=ty, rel=rel, dvv=p1.vv - p0.vv, dvh=p1.vh - p0.vh, dr=p1.vhvv - p0.vhvv))
c = pd.DataFrame(rows)
c = c.groupby(["box", "y", "ty"])[["dvv", "dvh", "dr"]].mean().reset_index().merge(b[["box", "sc", "stem"]], on="box")
c = c.merge(t[["y", "sc", "stem", "a"]], on=["y", "sc", "stem"])
out = []
for (y, ty), g in c.groupby(["y", "ty"]):
    r = {"y": y, "ty": ty, "n": len(g)}
    for v in ["dvv", "dvh", "dr"]:
        r[v + "_mean"] = round(g[v].mean(), 2)
        r["r_" + v] = round(g[v].rank().corr(g.a.rank()), 2) if len(g) >= 15 else None
    out.append(r)
print(pd.DataFrame(out).to_string())
c.to_csv(f"{OUT}/typhoon_s1_changes.csv", index=False)
