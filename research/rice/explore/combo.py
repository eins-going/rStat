"""결합 시험(사전 등록: README '결합 시험') — P(시도 잔차 2년 지속), N(10/1 NCPMS 도열병 _c), N+P. 시군은 B0p 전파.
사용: OMP_NUM_THREADS=2 memcap -m 3G python3 combo.py
"""
import json
import os
import sys
import warnings

import numpy as np
import pandas as pd

warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__))
RICE = os.path.dirname(HERE)
sys.path.insert(0, HERE)
import battery as BT  # noqa: E402

M = BT.M
YEARS = range(2013, 2027)


def ridge0(X, y, w, lam=10.0):
    sd = X.std(0) + 1e-9
    Z = X / sd
    b = np.linalg.solve(Z.T @ (Z * w[:, None]) + lam * np.eye(X.shape[1]), Z.T @ (w * y))
    return b / sd


def add_N(sd, nc):
    """N: 실시간 릿지 r ~ np_blast_c (그 해 전 자료만, 3년 이상)."""
    d = sd.merge(nc, on=["sc", "y"], how="left")
    out = d.ahat.copy()
    for Y in YEARS:
        tr = d[(d.y < Y) & d.sc.isin(M.PROV)].dropna(subset=["np_blast_c", "a"])
        te = d.y == Y
        if tr.y.nunique() < 3:
            continue
        b = ridge0(tr[["np_blast_c"]].values, (tr.a - tr.ahat).values, np.sqrt(tr.area / tr.area.mean()).values)
        out[te] = d.ahat[te] + np.nan_to_num(d.np_blast_c[te].values) * b[0]
    return out.values


def add_P(sd, col):
    """P: col(현재 예측)의 실시간 잔차 직전 2년 평균 × ρ(그 해 전 쌍으로 추정, 0~1)."""
    d = sd.sort_values(["sc", "y"]).copy()
    d["r"] = d.a - d[col]
    d["lag"] = d.groupby("sc").r.transform(lambda s: s.shift(1).rolling(2, min_periods=1).mean())
    out = d[col].copy()
    rhos = {}
    for Y in YEARS:
        past = d[(d.y < Y) & d.lag.notna() & d.r.notna() & d.sc.isin(M.PROV)]
        rho = float(np.clip(np.sum(past.lag * past.r) / np.sum(past.lag ** 2), 0, 1)) if len(past) >= 16 else 0.0
        rhos[Y] = round(rho, 3)
        te = d.y == Y
        out[te] = d[col][te] + rho * d.lag[te].fillna(0)
    return out.reindex(sd.index).values, rhos


def main():
    res = {}
    pred26 = []
    nc_all = pd.read_csv(os.path.join(RICE, "ncpms", "feat_sido.csv"), dtype={"sc": str, "asof": str})
    for asof in ["0915", "1001"]:
        an, an_sg, st, base = BT.load_common(asof)
        sd = base.merge(st, on=["sc", "y"], how="left")
        sd = sd[sd.sc.isin(M.PROV) & sd.y.between(1995, 2026)].reset_index(drop=True)
        cands = {"BASE": sd.ahat.values}
        cands["P"], rhoP = add_P(sd.assign(cur=sd.ahat), "cur")
        if asof == "1001":
            nc = nc_all[nc_all["asof"] == asof][["sc", "y", "np_blast_c"]]
            cands["N"] = add_N(sd, nc)
            cands["N+P"], _ = add_P(sd.assign(cur=cands["N"]), "cur")
        t = BT.sigun_table(asof)
        t = t[t.sc.isin(set(M.PROV)) | t.grp.isin(set(M.PROV))]
        res[asof] = {}
        for nm, v in cands.items():
            shift = dict(zip(zip(sd.sc, sd.y), v - sd.ahat.values))
            q = sd.assign(p=v)
            row = {}
            for lo in (2013, 2015):
                m = q.y.between(lo, 2025) & q.a.notna()
                e = q.base[m] * (1 + q.p[m]) - q["yield"][m]
                row[f"sido_{lo}"] = round(float(np.sqrt(np.average(e ** 2, weights=q.area[m]))), 2)
                g = t[t.y.between(lo, 2025)].dropna(subset=["base", "yield", "a_base"]).copy()
                g["ab"] = g.a_base + [shift.get((s, y), shift.get((gg, y), 0.0)) for s, y, gg in zip(g.sc, g.y, g.grp)]
                rm = lambda p: float(np.sqrt(np.average((g.base * (1 + p) - g["yield"]) ** 2, weights=g.area)))  # noqa: E731
                row[f"sg_skill_{lo}"] = round(1 - rm(g.ab) / rm(0 * g.ab), 4)
            yrs = {}
            for Y in range(2013, 2026):
                z = q[(q.y == Y) & q.a.notna()]
                e1 = np.sqrt(np.average((z.base * (1 + z.p) - z["yield"]) ** 2, weights=z.area))
                e0 = np.sqrt(np.average((z.base * (1 + z.ahat) - z["yield"]) ** 2, weights=z.area))
                yrs[Y] = round(float(e1 - e0), 2)
            row["years"] = yrs
            row["win"] = sum(v < 0 for v in yrs.values())
            row["worst"] = max(yrs.values())
            res[asof][nm] = row
            z = q[q.y == 2026][["sc", "p"]].assign(asof=asof, cand=nm)
            pred26.append(z)
        b = res[asof]["BASE"]
        for nm, r in res[asof].items():
            if nm == "BASE":
                continue
            ok1 = all((b[f"sido_{lo}"] - r[f"sido_{lo}"] >= 0.3 and r[f"sg_skill_{lo}"] >= b[f"sg_skill_{lo}"]) or
                      (r[f"sg_skill_{lo}"] - b[f"sg_skill_{lo}"] >= 0.005 and r[f"sido_{lo}"] <= b[f"sido_{lo}"]) for lo in (2013, 2015))
            r["pass"] = bool(ok1 and r["win"] >= 7 and r["worst"] <= 3)
        print(f"\n[{asof}] ρ(P) {rhoP.get(2025)}")
        for nm, r in res[asof].items():
            print(f"  {nm:4s} 시도 {r['sido_2013']:.2f}/{r['sido_2015']:.2f}  시군 {r['sg_skill_2013']:+.4f}/{r['sg_skill_2015']:+.4f}  개선 {r['win']}/13년 최악 {r['worst']:+.2f}  채택 {r.get('pass', '-')}")
            print(f"       연도별 {r['years']}")
    json.dump(res, open(os.path.join(BT.OUT, "combo.json"), "w"), ensure_ascii=False, indent=1)
    p26 = pd.concat(pred26)
    p26.to_csv(os.path.join(BT.OUT, "combo_pred2026.csv"), index=False)
    print("\n2026 시도 â(평년 대비 비율) 후보별:\n", p26.pivot_table(index="sc", columns=["asof", "cand"], values="p").round(4).to_string())


if __name__ == "__main__":
    main()
