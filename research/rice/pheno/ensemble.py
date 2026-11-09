"""시도 예측 파일 평균(앙상블) → 시군 평가. 사용: python ensemble.py 이름 파일1 파일2 ..."""
import json, os, sys
import numpy as np, pandas as pd
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import prov_model as pm, common
name, files = sys.argv[1], sys.argv[2:]
Ps = [pd.read_csv(os.path.join(pm.OUT, "preds", f + ".csv"), dtype={"pv": str}) for f in files]
P = pd.concat(Ps).groupby(["pv", "y"], as_index=False).ahat.mean()
P.to_csv(os.path.join(pm.OUT, "preds", f"ens_{name}.csv"), index=False)
sg = pm.T.merge(P, on=["pv", "y"]); sg["pred_yield"] = sg.base * (1 + sg.ahat)
r = common.evaluate(sg[["y", "sc", "stem", "pred_yield"]], f"ens_{name}")
pp = pm.PT.merge(P.rename(columns={"pv": "sc"}), on=["sc", "y"])
e = pp.base * (1 + pp.ahat) - pp["yield"]; e0 = pp.base - pp["yield"]
r["prov_rmse"] = round(float(np.sqrt(np.average(e ** 2, weights=pp.area))), 2)
r["prov_rmse_base"] = round(float(np.sqrt(np.average(e0 ** 2, weights=pp.area))), 2)
big = pp.area >= 1000
r["prov_rmse_1000ha"] = round(float(np.sqrt(np.average(e[big] ** 2, weights=pp.area[big]))), 2)
r["members"] = files
print("   시도 RMSE", r["prov_rmse"], "(평년", r["prov_rmse_base"], ")")
p = os.path.join(pm.OUT, "results_ens.json")
old = json.load(open(p)) if os.path.exists(p) else {}
old[name] = r
json.dump(old, open(p, "w"), ensure_ascii=False, indent=1)
