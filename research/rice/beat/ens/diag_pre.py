"""사전 등록 전 진단 (후보 시험 아님): 시도 오차 = 전국 공통 + 시도 상대. 기존 M4·통계청·정답만 사용."""
from evalx import *
import json
st = stat()
m4 = pd.read_csv(f"{R}/cropmodel/out_fixed/contrib_sido_0915.csv", dtype={"sc": str})[["y", "sc", "ahat"]]
d = ST[ST.sc.isin(PROV)].merge(m4, on=["y", "sc"]).merge(st.rename(columns={"pred_yield": "stat"}), on=["y", "sc"], how="left")
d["ahat_stat"] = d.stat / d.base - 1
out = {}
for lab, yrs in [("13_25", range(2013, 2026)), ("10_25", range(2010, 2026)), ("96_12", range(1996, 2013))]:
    g = d[d.y.isin(list(yrs))].copy()
    aN = g.groupby("y").apply(lambda x: np.average(x.a, weights=x.area)); g["aN"] = g.y.map(aN)
    for k in ["ahat", "ahat_stat"]:
        if g[k].isna().any():
            continue
        hN = g.groupby("y").apply(lambda x: np.average(x[k], weights=x.area)); g["hN"] = g.y.map(hN)
        w = g.area
        tot = np.sqrt(np.average(((g[k] - g.a) * g.base) ** 2, weights=w))
        com = np.sqrt(np.average(((g.hN - g.aN) * g.base) ** 2, weights=w))
        rel = np.sqrt(np.average((((g[k] - g.hN) - (g.a - g.aN)) * g.base) ** 2, weights=w))
        out[f"{lab}|{k}"] = dict(total=round(tot, 2), common=round(com, 2), relative=round(rel, 2))
    # 상대 편차를 0으로 둘 때(=전국 â 일괄)의 상대 오차, 상대 편차 지속성
    g["rel"] = g.a - g.aN
    out[f"{lab}|rel_zero"] = round(float(np.sqrt(np.average((g.rel * g.base) ** 2, weights=g.area))), 2)
    g = g.sort_values("y"); g["rel_prev"] = g.groupby("sc").rel.shift(1)
    q = g.dropna(subset=["rel_prev"])
    out[f"{lab}|rel_autocorr"] = round(float(np.corrcoef(q.rel, q.rel_prev)[0, 1]), 3)
    out[f"{lab}|rel_mean_by_sc_pct"] = (g.groupby("sc").rel.mean() * 100).round(2).to_dict()
for k, v in out.items():
    print(k, v)
json.dump(out, open("diag_pre.json", "w"), ensure_ascii=False, indent=1)
