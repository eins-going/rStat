"""시군 편차 이웃 평활 (사전 등록: README '시군 편차 이웃 평활')."""
import os, sys, warnings
import numpy as np, pandas as pd
warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import battery as BT  # noqa: E402
common = BT.common
pc = pd.read_csv(os.path.join(os.path.dirname(HERE), "cropmodel", "sigun_centroids.csv"), dtype={"sc": str})

def nbr_table(R=40):
    out = {}
    for _, r in pc.iterrows():
        s = pc[(pc.sc == r.sc) & (pc.stem != r.stem)]
        la, lo = np.radians(r.lat), np.radians(r.lon)
        dist = 6371 * np.arccos(np.clip(np.sin(la) * np.sin(np.radians(s.lat)) + np.cos(la) * np.cos(np.radians(s.lat)) * np.cos(np.radians(s.lon) - lo), -1, 1))
        out[(r.sc, r.stem)] = list(s.stem[dist.values <= R])
    return out

def run(asof):
    t = BT.sigun_table(asof).copy()
    nb = nbr_table()
    t = t.sort_values(["sc", "stem", "y"])
    t["dev23"] = t.groupby(["sc", "stem"]).dev.transform(lambda s: s.shift(2).rolling(2, min_periods=1).mean())
    key = t.set_index(["sc", "stem", "y"])
    devp = key.dev_prev.to_dict(); area = key.area.to_dict()
    nv = []
    for sc, stem, y in zip(t.sc, t.stem, t.y):
        xs = [(devp.get((sc, s, y)), area.get((sc, s, y), 0)) for s in nb.get((sc, stem), [])]
        xs = [(v, a) for v, a in xs if v == v and v is not None]
        nv.append(np.average([v for v, _ in xs], weights=[a for _, a in xs]) if xs else 0.0)
    t["nbr_prev"] = nv
    t["has_nbr"] = [len(nb.get((s, st), [])) > 0 for s, st in zip(t.sc, t.stem)]
    res = {}
    preds = {"B0p": t.a_base.copy()}
    for name, cols in {"N1": ["dev_prev", "nbr_prev"], "N2": ["dev_prev", "nbr_prev", "dev23"]}.items():
        p = pd.Series(np.nan, index=t.index); coefs = {}
        for Y in range(2013, 2026):
            tr = t[(t.y < Y) & (t.y >= 1997)].dropna(subset=cols + ["dev"])
            X = tr[cols].fillna(0).values; w = tr.area.values
            b = np.linalg.lstsq(X * np.sqrt(w)[:, None], tr.dev.values * np.sqrt(w), rcond=None)[0]
            te = t.y == Y
            p[te] = t.ahat_sd[te].fillna(0) + t.loc[te, cols].fillna(0).values @ b
            coefs[Y] = b.round(3).tolist()
        preds[name] = p
        res[name + "_coef"] = {2013: coefs[2013], 2025: coefs[2025]}
    rows = []
    for name, p in preds.items():
        pr = t[["y", "sc", "stem"]].assign(pred_yield=t.base * (1 + p))
        for yrs, lab in [(range(2013, 2026), "13"), (range(2015, 2026), "15")]:
            r = common.evaluate(pr, f"{name}/{asof}/{lab}", years=yrs, verbose=False)
            rows.append({"cand": name, "per": lab, "skill": r["skill"], "rmse": r["rmse"], "rank_r": r["rank_r"], "nat": r["nat_rmse"]})
        # 해마다 시군 RMSE
        tt = common.targets()
        m = tt.merge(pr, on=["y", "sc", "stem"]).dropna(subset=["pred_yield", "base"])
        m = m[m.y.between(2013, 2025)]
        res[name + "_yr"] = m.groupby("y").apply(lambda g: float(np.sqrt(np.average((g.pred_yield - g["yield"]) ** 2, weights=g.area)))).round(2).to_dict()
    ev = pd.DataFrame(rows)
    b = res["B0p_yr"]
    for n in ("N1", "N2"):
        res[n + "_yrs_better"] = int(sum(res[n + "_yr"][y] < b[y] for y in b))
    return ev, res

if __name__ == "__main__":
    for asof in ("0915", "1001"):
        ev, res = run(asof)
        print("=====", asof); print(ev.to_string(index=False))
        print({k: v for k, v in res.items() if not k.endswith("_yr")})
