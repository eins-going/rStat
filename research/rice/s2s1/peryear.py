import sys; sys.path.insert(0, "/home/eins/project/rStat/research/rice")
from model import *
import run_eval as R
asof = sys.argv[1] if len(sys.argv) > 1 else "1001"
d = load(asof)
cols = ["peak_doy", "ndvi_max", "ndre_max", "ndre_s1", "lswi_s1", "cire_s1", "ndre_p10_30", "lswi_p10_30", "ndre_p30_50", "sen_slope", "ndre_r_as", "ndre_r_s", "lswi_r_s", "ndvi_r_s", "ndre_s2", "lswi_s2", "a_prev", "ss_0815_0915_an", "ta_0815_0915_an"]
cols = [c for c in cols if c in d.columns]
rows = []
for y, g in d.groupby("y"):
    r = {"y": y, "n": len(g)}
    for c in cols:
        q = g.dropna(subset=[c, "a"])
        r[c] = round(q[c].rank().corr(q.a.rank()), 2) if len(q) >= 20 else None
    rows.append(r)
pd.set_option("display.width", 250)
print(pd.DataFrame(rows).set_index("y").T.to_string())
