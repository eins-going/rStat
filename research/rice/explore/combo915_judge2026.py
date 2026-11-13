"""9/15 결합 Pc+S1 재판정 (README '9/15 결합 시험'의 후속 사전 등록): 2026 확정 뒤 2013~2026 · 2015~2026으로 같은 기준을 다시 적용.

2013~2025 예측은 combo915.py 와 같은 방식으로 다시 내고, 2026은 확정 전에 적어 둔 out/combo915_pred2026.csv 를 그대로 쓴다(다시 계산하지 않는다).
사용: .venv/bin/python research/rice/explore/combo915_judge2026.py
"""
import os, sys, warnings
import numpy as np, pandas as pd
warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import battery as BT, combo915 as C9  # noqa: E401
common = BT.common

sd, rho = C9.sido_shift("0915")
t = BT.sigun_table("0915").sort_values(["sc", "stem", "y"]).copy()
t["a_lag"] = t.groupby(["sc", "stem"]).a.shift(1)
t["sa_lag"] = t.groupby(["sc", "stem"]).a_sd.shift(1)
shift = dict(zip(zip(sd.sc, sd.y), sd["shift"]))
rec = pd.read_csv(os.path.join(BT.OUT, "combo915_pred2026.csv"), dtype={"sc": str})
tt = common.targets()
res, yr = {}, {}
for nm, (sm, ub, col) in {"BASE": ({}, False, "pred_BASE"), "Pc+S1": (shift, True, "pred_PcS1")}.items():
    p = C9.sigun_preds(t, sm, ub)
    pr = t[["y", "sc", "stem"]].assign(pred_yield=t.base * (1 + p))
    pr = pd.concat([pr[pr.y <= 2025], rec[["sc", "stem"]].assign(y=2026, pred_yield=rec[col])], ignore_index=True)
    o = {}
    for lo in (2013, 2015):
        r = common.evaluate(pr, nm, years=range(lo, 2027), verbose=False)
        o[f"skill{lo}~26"] = r["skill"]; o[f"RMSE{lo}~26"] = r["rmse"]
        r0 = common.evaluate(pr, nm, years=range(lo, 2026), verbose=False)
        o[f"skill{lo}~25"] = r0["skill"]
    m = tt.merge(pr, on=["y", "sc", "stem"]).dropna(subset=["pred_yield", "base", "yield"]); m = m[m.y.between(2013, 2026)]
    yr[nm] = m.groupby("y").apply(lambda g: np.sqrt(np.average((g.pred_yield - g["yield"]) ** 2, weights=g.area)))
    # 정밀한 skill(반올림 전)
    for lo in (2013, 2015):
        q = m[m.y >= lo]; w = q.area
        o[f"skill{lo}~26 정밀"] = round(1 - np.sqrt(np.average((q.pred_yield - q["yield"]) ** 2, weights=w)) / np.sqrt(np.average((q.base - q["yield"]) ** 2, weights=w)), 5)
    res[nm] = o
d = yr["Pc+S1"] - yr["BASE"]
print(pd.DataFrame(res).T.to_string())
print("해마다 Δ시군 RMSE(Pc+S1 − BASE):", d.round(2).to_dict())
print(f"개선한 해 {int((d < 0).sum())}/14 · 최악 {d.max():+.2f}kg")
for lo in (2013, 2015):
    print(f"{lo}~2026 skill 차이 {res['Pc+S1'][f'skill{lo}~26 정밀'] - res['BASE'][f'skill{lo}~26 정밀']:+.5f} (기준 +0.005)")
