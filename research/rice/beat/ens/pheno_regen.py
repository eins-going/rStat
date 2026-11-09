"""pheno 최종 9/15 앙상블(pheno/final.py MEMBERS['0915'] 그대로)을 TEST 2008~2026으로 다시 돌려 긴 실시간 이력을 만든다.
출력: comp/pheno_final_0915_long.csv (pv, y, ahat). pheno/ 폴더에는 쓰지 않음.
주의: pheno 코드는 환경변수 PHENO를 MODIS 파일명으로 쓰므로 PHENO를 지움.
"""
import os, sys, warnings
os.environ.pop("PHENO", None)
P = "/home/eins/project/rStat/research/rice/pheno"
sys.path[:0] = [P]
warnings.filterwarnings("ignore")
import pandas as pd
import prov_model as pm
import nat_model as nm
pm.TEST = list(range(2008, 2027))
pw, ph = pm.load_feats()
PT = pm.PT.rename(columns={"sc": "pv"})
K6 = ["dtr_rip_c", "rndays_rip_c", "gust_max_c", "ss_pre_c", "cold20_pre_c", "rndays_fl_c"]
K8 = K6 + ["ss_sep1h", "gust17_a1s14"]
WXC = nm.WXC
QS = (0.2, 0.33, 0.5)
M915 = [("prov", WXC, [], 2001, "hgb", None), ("prov", WXC, ["ss_pre_c"], 1985, "ridge", 10), ("prov", WXC, [], 2001, "ridge", None),
        ("prov", K8, ["ss_pre_c"], 2001, "ridge", None), ("nat", K8, ["ss_pre_c"], 2001, "ridge", None), ("nat", WXC, [], 2001, "ridge", None)]
asof = "0915"
d = pw[pw["asof"] == asof].merge(PT, on=["pv", "y"], how="left").merge(ph[ph["asof"] == asof].drop(columns=["asof"]), on=["pv", "y"], how="left")
Ps = []
for kind, cols, hinge, start, mdl, hl in M915:
    if kind == "prov":
        r, Pm, Cf = pm.run(d, cols, kind=mdl, start=start, label="prov", verbose=False, hinge=hinge, qs=QS, hinge_pooled=True, decay=hl)
    else:
        nm.pw = pw
        a, Cf = nm.run_nat(asof, cols, start, hinge, QS)
        Pm = pd.DataFrame([(pv, y, v) for y, v in a.items() for pv in pm.PROV], columns=["pv", "y", "ahat"])
    Ps.append(Pm.assign(member=f"{kind}_{mdl}_{len(cols)}_{start}"))
    print(kind, mdl, len(cols), start, Pm.y.min(), Pm.y.max(), flush=True)
A = pd.concat(Ps)
A.to_csv(os.path.join(os.path.dirname(os.path.abspath(__file__)), "comp/pheno_members_0915_long.csv"), index=False)
F = A.groupby(["pv", "y"], as_index=False).ahat.mean()
F.to_csv(os.path.join(os.path.dirname(os.path.abspath(__file__)), "comp/pheno_final_0915_long.csv"), index=False)
# 검산: 2013~2026이 기존 final_0915.csv와 같은가
old = pd.read_csv(f"{P}/preds/final_0915.csv", dtype={"pv": str})
m = old.merge(F.astype({"pv": str}), on=["pv", "y"], suffixes=("_old", "_new"))
print("기존과 최대 차이", float((m.ahat_old - m.ahat_new).abs().max()), len(m))
