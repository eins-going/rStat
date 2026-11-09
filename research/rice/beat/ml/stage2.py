"""사후 2단계: R0 도 특유 부분 축소 (README 참조)."""
import json, os, sys
import numpy as np, pandas as pd
sys.path[:0] = ["/home/eins/project/rStat/research/rice/pheno/_pylib"]
import evalx as E
import run as R
st = E.truth()
res = json.load(open("results.json"))
for asof in ["0915", "0930"]:
    P = pd.read_csv(f"preds_all_{asof}.csv", dtype={"sc": str})
    ar = st[["y", "sc", "area"]]
    ar26 = pd.read_csv(os.path.join(E.RICE, "statdown/stat_forecast_sido.csv"), dtype={"sido_code": str}).query("year==2026").rename(columns={"year": "y", "sido_code": "sc", "area_ha": "area"})[["y", "sc", "area"]]
    P = P.merge(pd.concat([ar, ar26]), on=["y", "sc"], how="left")
    P["com"] = P.y.map(P.groupby("y").apply(lambda g: np.average(g.R0, weights=g.area)))
    Ks = [0, 0.25, 0.5, 0.75, 1]
    for k in Ks:
        P[f"k{k}"] = P.com + k * (P.R0 - P.com)
    Pm = P.merge(st[["y", "sc", "a", "base"]], on=["y", "sc"], how="left")
    sel, d1 = {}, []
    for Y in sorted(P.y.unique()):
        h = Pm[(Pm.y >= Y - 8) & (Pm.y < Y)].dropna(subset=["a"])
        kb = 1
        if h.y.nunique() == 8:
            r = {k: np.sqrt(np.average(((h[f"k{k}"] - h.a) * h.base) ** 2, weights=h.area)) for k in Ks}
            kb = min(r, key=r.get)
        sel[int(Y)] = kb
        d1.append(P.loc[P.y == Y, f"k{kb}"].values)
    P["D1"] = np.concatenate(d1)
    P["D0"] = P["k0"]
    out = {}
    for v in ["D1", "D0"]:
        pr = R.to_yield(P, v, st)
        r = E.report(pr[pr.y <= 2025], v)
        r["prov_96_12"], r["prov_96_12_base"] = R.prov_early(P, v, st)
        r["nat_2026"] = round(float(pr[(pr.y == 2026) & (pr.sc == "00")].pred_yield.iloc[0]), 1)
        out[v] = r
        a, b = r["13_25"], r["10_25"]
        print(asof, v, "13-25", a, "| 10-25", b, "| 96-12", r["prov_96_12"], r["prov_96_12_base"], "| 2026", r["nat_2026"])
    print(asof, "D1 k 선택:", {y: sel[y] for y in sel if y >= 2010})
    res[asof]["variants"].update(out)
    res[asof]["selection_D1_k"] = sel
    P[["y", "sc", "D1", "D0"]].round(5).to_csv(f"preds_stage2_{asof}.csv", index=False)
json.dump(res, open("results.json", "w"), ensure_ascii=False, indent=1, default=float)
