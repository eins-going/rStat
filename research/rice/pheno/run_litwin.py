"""비교용(사후 선택 창): 문헌 갈래의 전국 창 7/18~8/11 일조(ss_jl18_au11) 꺾은선을 시도 패널에 — 8/15. 미리 정한 창(ss_pre_c)과 나란히."""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import prov_model as pm
pw, ph = pm.load_feats()
PT = pm.PT.rename(columns={"sc": "pv"})
d = pw[pw["asof"] == "0815"].merge(PT, on=["pv", "y"], how="left")
for name, cols, h in [("lit창 단독", ["ss_jl18_au11"], ["ss_jl18_au11"]), ("미리정한 창 단독", ["ss_pre_c"], ["ss_pre_c"]),
                      ("lit창 hinge만", ["cold20_pre_c"], ["ss_jl18_au11"])]:
    r, P, C = pm.run(d, cols, kind="ridge", start=1985, label=f"0815 {name}", verbose=True, hinge=h, qs=(0.2, 0.33, 0.5), hinge_pooled=True)
