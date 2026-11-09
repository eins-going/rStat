"""진단: 8도 시도 오차 = 전국 공통(그해 8도 면적가중 평균 오차) + 시도 고유(시도 오차 − 공통). 우리 M4 vs 통계청."""
import json
import sys

sys.path.insert(0, ".")
from evalp import *  # noqa

t = truth()
sf = stat()
out = {}
srcs = {"M4_0915": "cropmodel/out_fixed/contrib_sido_0915.csv", "M4_1001": "cropmodel/out_fixed/contrib_sido_1001.csv"}
preds = {k: from_ahat(pd.read_csv(os.path.join(RICE, v), dtype={"sc": str})[["y", "sc", "ahat"]], t) for k, v in srcs.items()}
preds["stat"] = sf
preds["base"] = t.assign(pred_yield=t.base)[["y", "sc", "pred_yield"]]
tabs = {}
for yrs, lab in [(list(range(2013, 2026)), "13_25"), (list(range(2010, 2026)), "10_25")]:
    for k, p in preds.items():
        d = t.merge(p, on=["y", "sc"]).query("sc in @PROV and y in @yrs").copy()
        d["e"] = d.pred_yield - d["yield"]
        d["ep"] = d.pred_yield / d["yield"] - 1
        com = d.groupby("y").apply(lambda g: np.average(g.e, weights=g.area)).rename("ec")
        d = d.merge(com, on="y")
        d["es"] = d.e - d.ec
        W = d.area
        tot = np.average(d.e ** 2, weights=W)
        c = np.average(d.ec ** 2, weights=W)
        s = np.average(d.es ** 2, weights=W)
        out[f"{k}|{lab}"] = {"rmse_w": round(float(np.sqrt(tot)), 2), "common_rmse": round(float(np.sqrt(c)), 2),
                             "specific_rmse": round(float(np.sqrt(s)), 2), "common_share": round(float(c / tot), 3)}
        tabs[(k, lab)] = d
        print(lab, k, out[f"{k}|{lab}"])
# 시도 고유 오차: 시도별 평균(편향)과 해마다
d = tabs[("M4_0915", "13_25")]
ds = tabs[("stat", "13_25")]
print("\n시도별 고유 오차 (M4 0915): 평균(편향)·RMSE  | 통계청")
for sc in PROV:
    a, b = d[d.sc == sc].es, ds[ds.sc == sc].es
    print(sc, f"{a.mean():+6.1f} {np.sqrt((a**2).mean()):5.1f} | {b.mean():+6.1f} {np.sqrt((b**2).mean()):5.1f}")
pv = d.pivot(index="y", columns="sc", values="es").round(1)
print("\nM4 0915 시도 고유 오차 (kg)\n", pv.to_string())
print("\n통계청 시도 고유 오차 (kg)\n", ds.pivot(index="y", columns="sc", values="es").round(1).to_string())
print("\n공통 오차 M4 / stat\n", pd.DataFrame({"M4": d.groupby("y").ec.first(), "stat": ds.groupby("y").ec.first()}).round(1).T.to_string())
# 시도 고유 오차 중 편향(시도 평균)으로 설명되는 비중
bias = d.groupby("sc").es.transform("mean")
print("M4 고유 MSE 중 시도 고정 편향 몫:", round(float(np.average(bias ** 2, weights=d.area) / np.average(d.es ** 2, weights=d.area)), 3))
# 실제 시도 고유 편차(a_p - a_nat) 크기 vs 우리가 예측한 것
d["a_dev"] = d.a - d.groupby("y").apply(lambda g: np.average(g.a, weights=g.area)).reindex(d.y).values
d["ahat"] = d.pred_yield / d.base - 1
d["ahat_dev"] = d.ahat - d.groupby("y").apply(lambda g: np.average(g.ahat, weights=g.area)).reindex(d.y).values
print("실제 시도 상대편차 sd %.4f, 예측 상대편차 sd %.4f, corr %.3f" % (d.a_dev.std(), d.ahat_dev.std(), d.a_dev.corr(d.ahat_dev)))
ds["a_dev"] = ds.a - ds.groupby("y").apply(lambda g: np.average(g.a, weights=g.area)).reindex(ds.y).values
ds["ahat"] = ds.pred_yield / ds.base - 1
ds["ahat_dev"] = ds.ahat - ds.groupby("y").apply(lambda g: np.average(g.ahat, weights=g.area)).reindex(ds.y).values
print("통계청 예측 상대편차 sd %.4f, corr %.3f" % (ds.ahat_dev.std(), ds.a_dev.corr(ds.ahat_dev)))
json.dump(out, open("diagnose.json", "w"), indent=1)
