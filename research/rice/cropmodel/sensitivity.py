"""M4 민감도: 학습 시작 연도·λ·절편·바람 지표 대체 (실시간 검증, as-of 9/15·8/15). 주 모델 선택에는 쓰지 않음."""
import os, sys, warnings
import numpy as np, pandas as pd
warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE); sys.path.insert(0, os.path.dirname(HERE))
import common, model as M  # noqa
SUF = "" if os.environ.get("PHENO", "adaptive") == "adaptive" else "_fixed"
comp = M.prep(pd.read_csv(os.path.join(HERE, f"components_sido{SUF}.csv"), dtype={"sc": str, "asof": str}))
st = M.sido_targets()
FE = ["cold_mei", "heat_ant", "rs_pre", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "wind20", "wind_max", "wind", "rain_hv", "wet_head", "hot_fill", "tmin_fill", "rs_pre25"]
an = M.anomalies(comp, FE)
for t in an.values():
    t["rs_pre_def"] = t["rs_pre"].clip(upper=0)
M4 = ["cold_mei", "heat_ant", "rs_pre", "rs_pre_def", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "rain_hv", "wet_head"]
def run(feats, asof="0915", lam=M.LAM, icpt="cw", start=M.START, tag=""):
    M.START = start
    p, _ = M.backtest(an, st, feats, asof, lam=lam, icpt=icpt)
    M.START = 1985
    r = common.evaluate(M.to_sigun(p), "", verbose=False)
    print(f"{tag:28s} {asof} 시도skill {M.sido_score(p, st)[0]:+.3f} 시군 {r['skill']:+.3f} 전국 {r['nat_rmse']} 2020 {r['nat_err_2020']} hit {r['hit_2020']}", flush=True)
for asof in ["0815", "0915"]:
    run(M4, asof, tag="M4 기본(1985,λ3,cw)")
    for s in [1990, 1995]: run(M4, asof, start=s, tag=f"start {s}")
    for l in [1, 10, 30]: run(M4, asof, lam=l, tag=f"λ {l}")
    run(M4, asof, icpt="c0", tag="절편 0")
    for w in ["wind20", "wind_max", "wind"]: run([f if f != "wind15" else w for f in M4], asof, tag=f"wind15→{w}")
    run([f for f in M4 if f != "rs_pre_def"], asof, tag="경첩 없음")
    run([f for f in M4 if f not in ("rs_pre", "rs_pre_def")], asof, tag="rs_pre 없음(흐린날만)")
    run([f for f in M4 if f != "wet_head"], asof, tag="도열병(비) 없음")
    run(M4 + ["hot_fill"], asof, tag="+hot_fill")
    run(M4 + ["tmin_fill"], asof, tag="+tmin_fill")
