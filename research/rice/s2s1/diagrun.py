import sys; sys.path.insert(0, "/home/eins/project/rStat/research/rice")
from model import *
import run_eval as R
for asof in ["0915", "1001"]:
    d = load(asof)
    S = R.SETS[asof]
    allc = [c for c in sorted(set(sum(S.values(), []))) if c in d.columns]
    d = transform(d, allc)
    d = d[d.y <= (int(sys.argv[1]) if len(sys.argv) > 1 else 2030)]
    print(asof, sorted(d.y.unique()), len(d))
    dg = diag(d, [c + "_c" for c in allc] + [c + "_o" for c in allc])
    for k, v in sorted(dg.items(), key=lambda kv: -abs(kv[1][0])):
        print(f"  {k:28s} r={v[0]:+.3f} 부호일치 {v[1]:+.2f} 연수 {v[2]}")
