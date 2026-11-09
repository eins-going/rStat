"""사전 등록(README.md) 검정: ㎡당 벼알수 평년 대비 % vs 전국 a, 작물모델 9/15 잔차; 실시간·LOO 보정."""
import json, os, sys
import numpy as np
import pandas as pd
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import common  # noqa: E402

s = pd.read_csv(os.path.join(HERE, "survey.csv"))
m = s[(s.field == "㎡당 벼알수") & (s.variety == "평균")].set_index("year")
cm = pd.read_csv(os.path.join(HERE, "..", "cropmodel/out_fixed/contrib_nation_0915.csv")).set_index("y")[["a_obs", "a_hat"]]
n = common.nation().set_index("y")
d = pd.DataFrame({"x": m.pct_vs_norm, "xp": m.pct_vs_prev}).join(cm, how="left").join(n[["a", "base", "yield"]], how="left")
d["a_nat"] = 100 * d.a
d["yoy"] = 100 * (n["yield"] / n["yield"].shift(1) - 1).reindex(d.index)
d["res"] = d.a_obs - d.a_hat            # 실제 − 예측 (8도 합, %p)
d["err"] = d.a_hat - d.a_obs            # 예측 − 실제
print(d.round(2).to_string())
out = {}
P = d.dropna(subset=["x", "a_obs"])
P = P[P.index <= 2025]
r = lambda u, v: float(np.corrcoef(u, v)[0, 1])  # noqa: E731
out["n_primary"] = int(len(P)); out["years_primary"] = [int(y) for y in P.index]
out["r_x_a_nation"] = round(r(P.x, P.a_nat), 3)
out["r_x_a8"] = round(r(P.x, P.a_obs), 3)
out["r_x_resid(a_obs-a_hat)"] = round(r(P.x, P.res), 3)
out["r_ahat_a8"] = round(r(P.a_hat, P.a_obs), 3)
# 비교: x 혼자 a 예측(통과 원점 슬로프) vs 작물모델
def fit_b(x, y):
    return float((x * y).sum() / (x * x).sum())
# 엄격 실시간 (≥5 이전 해)
rows = []
for y in P.index:
    tr = P[P.index < y]
    if len(tr) < 5:
        continue
    b = fit_b(tr.x, tr.res)
    rows.append({"y": int(y), "b": round(b, 3), "err0": P.at[y, "err"], "err1": P.at[y, "a_hat"] + b * P.at[y, "x"] - P.at[y, "a_obs"], "base": P.at[y, "base"]})
rt = pd.DataFrame(rows)
rm = lambda e: float(np.sqrt(np.mean(np.square(e))))  # noqa: E731
out["realtime"] = {"years": rt.y.tolist(), "b": rt.b.tolist(),
                   "rmse_pp_before": round(rm(rt.err0), 2), "rmse_pp_after": round(rm(rt.err1), 2),
                   "rmse_kg_before": round(rm(rt.err0 * rt.base / 100), 1), "rmse_kg_after": round(rm(rt.err1 * rt.base / 100), 1),
                   "err_before": [round(v, 2) for v in rt.err0], "err_after": [round(v, 2) for v in rt.err1]}
# LOO
lo = []
for y in P.index:
    tr = P[P.index != y]
    b = fit_b(tr.x, tr.res)
    lo.append({"y": int(y), "b": b, "err0": P.at[y, "err"], "err1": P.at[y, "a_hat"] + b * P.at[y, "x"] - P.at[y, "a_obs"], "base": P.at[y, "base"]})
lo = pd.DataFrame(lo)
out["loo"] = {"b_range": [round(lo.b.min(), 3), round(lo.b.max(), 3)],
              "rmse_pp_before": round(rm(lo.err0), 2), "rmse_pp_after": round(rm(lo.err1), 2),
              "rmse_kg_before": round(rm(lo.err0 * lo.base / 100), 1), "rmse_kg_after": round(rm(lo.err1 * lo.base / 100), 1),
              "err_after": dict(zip(lo.y.astype(str), [round(v, 2) for v in lo.err1]))}
# 전체 표본 슬로프(참고)
out["b_full"] = round(fit_b(P.x, P.res), 3)
# x 단독으로 a 예측 (LOO, 원점 슬로프) — 작물모델과 비교용
lx = [P.at[y, "x"] * fit_b(P[P.index != y].x, P[P.index != y].a_obs) - P.at[y, "a_obs"] for y in P.index]
out["x_alone_loo_rmse_pp"] = round(rm(lx), 2); out["cropmodel_rmse_pp_same_years"] = round(rm(P.err), 2)
# 보조: 전년 대비 %
Q = d.dropna(subset=["xp", "a_obs"]); Q = Q[Q.index <= 2025]
out["aux_prev"] = {"n": int(len(Q)), "years": [int(y) for y in Q.index], "r_xp_yoy": round(r(Q.xp, Q.yoy), 3),
                   "r_xp_resid": round(r(Q.xp, Q.res), 3)}
# 사후 진단: 2020 빼기
P2 = P[P.index != 2020]
out["posthoc_excl2020"] = {"r_x_a8": round(r(P2.x, P2.a_obs), 3), "r_x_resid": round(r(P2.x, P2.res), 3)}
# 2026 적용(정답 없음): 작물모델 9/15 2026 예측과 보정값
out["x_2026"] = float(d.at[2026, "x"]) if 2026 in d.index else None
print(json.dumps(out, ensure_ascii=False, indent=1))
json.dump(out, open(os.path.join(HERE, "results.json"), "w"), ensure_ascii=False, indent=1)
