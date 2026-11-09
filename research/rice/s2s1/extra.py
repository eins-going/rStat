"""추가 시험: 직전 해 편차의 같은 해 순위(a_prev_c) + 위성 + 기상 혼합. 9/15."""
import sys, json; sys.path.insert(0, "/home/eins/project/rStat/research/rice")
from model import *
import run_eval as R
out = []
for asof in ["0915", "1001"]:
    d = load(asof)
    S = R.SETS[asof]
    s2 = [c for c in S["s2"] if c in d.columns]
    rs = [c for c in S["s2res"] if c in d.columns]
    W = R.W_0915
    d = transform(d, s2 + rs + ["a_prev", "a_prev2", "a_prev3"])
    tests = {"평년+a_prev_c": (["a_prev_c"], []), "평년+a_prev_c+a_prev3_c": (["a_prev_c", "a_prev3_c"], []),
             "기상+a_prev_c": (["a_prev_c"], W), "기상+a_prev_c+s2_c": (["a_prev_c"] + [c + "_c" for c in s2], W),
             "기상+a_prev_c+s2res_c": (["a_prev_c"] + [c + "_c" for c in rs], W),
             "기상+a_prev_c+a_prev3_c": (["a_prev_c", "a_prev3_c"], W)}
    for yl, yrs in [("2019-2025", list(range(2019, 2026))), ("2020-2025", list(range(2020, 2026)))]:
        for k, (cc, wc) in tests.items():
            p = hybrid(d, cc, wc, yrs)
            r = R.ev(p, f"{asof} {k} {yl}", yrs)
            r.update(asof=asof, feats=k, test=yl, mode="hybrid")
            out.append(r)
            if yl == "2020-2025":
                p.to_csv(f"{OUT}/pred_{asof}_X_{k}.csv", index=False)
json.dump(out, open(f"{OUT}/results_extra.json", "w"), ensure_ascii=False, indent=1)
