"""서술: 해마다 상자 평균 위성 특징(자기 이력 대비 잔차) vs 60시군 면적가중 a. (연수가 적어 모형엔 못 씀)"""
import sys; sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import pandas as pd, numpy as np, common
OUT = "/home/eins/project/rStat/research/rice/s2s1"
f = pd.read_csv(f"{OUT}/feats_s2.csv", dtype={"sc": str})
f = f[f["asof"] == int(sys.argv[1]) if len(sys.argv) > 1 else 1001]
t = common.targets()
d = t.merge(f, on=["sc", "stem", "y"])
cols = [c for c in d.columns if "_r_" in c or c in ("peak_doy", "ndre_max", "ndvi_max", "lswi_s1", "ndre_s1", "sen_slope", "n_obs")]
g = d.groupby("y").apply(lambda q: pd.Series({"a": np.average(q.a, weights=q.area), **{c: q[c].mean() for c in cols}}))
pd.set_option("display.width", 250)
print(g.round(3).T.to_string())
print(g.corr()["a"].round(2).sort_values().to_string())
