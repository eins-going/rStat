"""9/15 결합 Pc + S1 (사전 등록: README '9/15 결합 시험')."""
import os, sys, warnings
import numpy as np, pandas as pd
warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import battery as BT, combo as CB, sigun_beta as SBt  # noqa: E401
M, common = BT.M, BT.common

def sido_shift(asof):
    an, an_sg, st, base = BT.load_common(asof)
    sd = base.merge(st, on=["sc", "y"], how="left")
    sd = sd[sd.sc.isin(M.PROV) & sd.y.between(1995, 2026)].reset_index(drop=True)
    P, rho = CB.add_P(sd.assign(cur=sd.ahat), "cur")
    s = pd.Series(P - sd.ahat.values)
    m = s.groupby(sd.y).transform(lambda q: np.average(q, weights=sd.area[q.index].fillna(sd.area.mean())))
    sd["shift"] = (s - m).values
    return sd, rho

def sigun_preds(t, shift_map, use_beta):
    t = t.copy()
    t["sh"] = [shift_map.get((s, y), shift_map.get((g, y), 0.0)) for s, y, g in zip(t.sc, t.y, t.grp)]
    t["ahat_sd"] = t.ahat_sd + t.sh
    if not use_beta:
        return t.a_base + t.sh
    p = pd.Series(np.nan, index=t.index)
    for Y in range(2013, 2026):
        tr = t[(t.y < Y) & (t.y >= 1996)].dropna(subset=["a", "a_sd"])
        te = t[t.y == Y].dropna(subset=["ahat_sd"])
        ph, _, _ = SBt.predict(tr, te, "a_sd")
        p.loc[te.index] = ph
    return p

def main(asof="0915"):
    sd, rho = sido_shift(asof)
    t = BT.sigun_table(asof).sort_values(["sc", "stem", "y"]).copy()
    t["a_lag"] = t.groupby(["sc", "stem"]).a.shift(1)
    t["sa_lag"] = t.groupby(["sc", "stem"]).a_sd.shift(1)
    zero = {}
    shift = dict(zip(zip(sd.sc, sd.y), sd["shift"]))
    tt = common.targets()
    C = {"BASE": (zero, False), "Pc": (shift, False), "S1": (zero, True), "Pc+S1": (shift, True)}
    yr, out = {}, {}
    for nm, (sm, ub) in C.items():
        p = sigun_preds(t, sm, ub)
        pr = t[["y", "sc", "stem"]].assign(pred_yield=t.base * (1 + p))
        o = {}
        for lo in (2013, 2015):
            r = common.evaluate(pr, nm, years=range(lo, 2026), verbose=False)
            o[f"시군skill{lo}"] = r["skill"]; o[f"시군RMSE{lo}"] = r["rmse"]
            q = sd[sd.y.between(lo, 2025) & sd.a.notna()]
            ps = q.ahat + (q["shift"] if sm else 0)
            o[f"시도{lo}"] = round(float(np.sqrt(np.average((q.base * (1 + ps) - q["yield"]) ** 2, weights=q.area))), 2)
        z = sd[sd.y.between(2013, 2025) & sd.a.notna()].copy(); z["p"] = z.ahat + (z["shift"] if sm else 0)
        e = z.groupby("y").apply(lambda r: np.average(r.base * (1 + r.p), weights=r.area) - np.average(r["yield"], weights=r.area))
        o["8도합MAE"], o["8도합RMSE"] = round(float(e.abs().mean()), 2), round(float(np.sqrt((e ** 2).mean())), 2)
        m = tt.merge(pr, on=["y", "sc", "stem"]).dropna(subset=["pred_yield", "base"]); m = m[m.y.between(2013, 2025)]
        yr[nm] = m.groupby("y").apply(lambda g: np.sqrt(np.average((g.pred_yield - g["yield"]) ** 2, weights=g.area)))
        out[nm] = o
    for nm in C:
        d = yr[nm] - yr["BASE"]
        out[nm]["개선해"] = int((d < 0).sum()); out[nm]["최악"] = round(float(d.max()), 2)
    print(f"=== {asof} ρ(2013,2025)={rho.get(2013)},{rho.get(2025)}")
    print(pd.DataFrame(out).T.to_string())
    print("Pc+S1 해마다 Δ시군RMSE:", (yr["Pc+S1"] - yr["BASE"]).round(2).to_dict())

if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else "0915")
