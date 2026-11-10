"""9/15·10/1 시군 민감도 β (사전 등록: README '9/15 시군 민감도 β'). statdown beta_p 방식."""
import os, sys, warnings
import numpy as np, pandas as pd
warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import battery as BT  # noqa: E402
common = BT.common
TAU = 0.02

def wls(X, y, w):
    sw = np.sqrt(w)
    return np.linalg.lstsq(X * sw[:, None], y * sw, rcond=None)[0]

def predict(tr, te, Acol_tr):
    A_tr, A_te = tr[Acol_tr].values, te.ahat_sd.values
    kk = wls(A_tr[:, None], tr.a.values, tr.area.values)[0]
    r = tr.a.values - kk * A_tr
    g = pd.DataFrame({"sc": tr.sc, "stem": tr.stem, "num": A_tr * r, "den": A_tr ** 2})
    db = g.groupby(["sc", "stem"]).agg(num=("num", "sum"), den=("den", "sum"))
    db = (db.num / (db.den + TAU)).rename("db").reset_index()
    e_tr = tr[["sc", "stem"]].merge(db, how="left").db.fillna(0).values
    e_te = te[["sc", "stem"]].merge(db, how="left").db.fillna(0).values
    b_tr, b_te = kk + e_tr, kk + e_te
    lag_tr = (tr.a_lag - tr.sa_lag * b_tr).fillna(0).values
    lag_te = (te.a_lag - te.sa_lag * b_te).fillna(0).values
    rho = wls(lag_tr[:, None], tr.a.values - b_tr * A_tr, tr.area.values)[0]
    return b_te * A_te + rho * lag_te, kk, rho

def run(asof):
    t = BT.sigun_table(asof).sort_values(["sc", "stem", "y"]).copy()
    t["a_lag"] = t.groupby(["sc", "stem"]).a.shift(1)
    t["sa_lag"] = t.groupby(["sc", "stem"]).a_sd.shift(1)
    preds = {"B0p": t.a_base.copy()}
    info = {}
    for name, acol in {"S1": "a_sd", "S2": "ahat_sd"}.items():
        p = pd.Series(np.nan, index=t.index)
        for Y in range(2013, 2026):
            tr = t[(t.y < Y) & (t.y >= 1996)].dropna(subset=["a", acol])
            te = t[(t.y == Y)].dropna(subset=["ahat_sd"])
            ph, kk, rho = predict(tr, te, acol)
            p.loc[te.index] = ph
            if Y in (2013, 2025):
                info[f"{name}_{Y}"] = (round(kk, 3), round(rho, 3))
        preds[name] = p
    rows, yr = [], {}
    tt = common.targets()
    for name, p in preds.items():
        pr = t[["y", "sc", "stem"]].assign(pred_yield=t.base * (1 + p))
        for yrs, lab in [(range(2013, 2026), "13"), (range(2015, 2026), "15")]:
            r = common.evaluate(pr, name, years=yrs, verbose=False)
            rows.append({"cand": name, "per": lab, "skill": r["skill"], "rmse": r["rmse"], "rank_r": r["rank_r"], "nat": r["nat_rmse"]})
        m = tt.merge(pr, on=["y", "sc", "stem"]).dropna(subset=["pred_yield", "base"]); m = m[m.y.between(2013, 2025)]
        yr[name] = m.groupby("y").apply(lambda g: np.sqrt(np.average((g.pred_yield - g["yield"]) ** 2, weights=g.area)))
    for n in ("S1", "S2"):
        info[n + "_yrs_better"] = int((yr[n] < yr["B0p"]).sum())
    info["yr_delta_S1"] = (yr["S1"] - yr["B0p"]).round(2).to_dict()
    return pd.DataFrame(rows), info

if __name__ == "__main__":
    for asof in ("0915", "1001"):
        ev, info = run(asof)
        print("=====", asof); print(ev.to_string(index=False)); print(info)
