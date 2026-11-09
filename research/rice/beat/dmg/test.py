"""사전 등록(README) 변형 8개: NCPMS 병해충 피처로 M4 9/15 시도 â 보정 → 8도·전국 평가, 시군 내 γ.
엄격 실시간: Y년 β는 Y−1년까지 시도-해만, 피처 편차는 그해 이전 NCPMS 해 평균 대비.
"""
import json
import os
import sys

import numpy as np
import pandas as pd

RICE = "/home/eins/project/rStat/research/rice"
D = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, RICE)
sys.path.insert(0, os.path.join(RICE, "beat/prov"))
import common  # noqa: E402
import evalp  # noqa: E402

PROV = evalp.PROV
MIN_TRAIN = 3


def load():
    t = evalp.truth(ext=True)
    m4 = pd.read_csv(os.path.join(RICE, "cropmodel/out_fixed/contrib_sido_0915.csv"), dtype={"sc": str})[["y", "sc", "ahat"]]
    # 2026 â (M4 운영 예측)
    p26 = os.path.join(RICE, "cropmodel/out_fixed/pred_2026_sido.csv")
    if os.path.exists(p26) and 2026 not in set(m4.y):
        q = pd.read_csv(p26, dtype={"sc": str, "asof": str})
        q = q[q["asof"].astype(str).str.zfill(4) == "0915"]
        m4 = pd.concat([m4, q[q.sc.isin(PROV)].assign(y=2026)[["y", "sc", "ahat"]]], ignore_index=True)
    f = pd.read_csv(os.path.join(D, "feats_sido.csv"), dtype={"sc": str})
    return t, m4, f


def transform(f, col, rnd, anom):
    """시도-해 피처: 자기 과거(그해 이전 NCPMS 해) 평균 편차 또는 수준."""
    g = f[f.rnd == rnd][["y", "sc", col]].sort_values(["sc", "y"]).copy()
    if anom:
        prev = g.groupby("sc")[col].transform(lambda s: s.shift(1).expanding().mean())
        g["x"] = (g[col] - prev).fillna(0.0)
        g["valid"] = prev.notna()
    else:
        g["x"] = g[col]
        g["valid"] = True
    return g[["y", "sc", "x", "valid"]]


def rel(d, col, wcol="area"):
    """8도 면적가중 평균 뺀 값."""
    m = d.groupby("y").apply(lambda g: np.average(g[col], weights=g[wcol])).rename(col + "_8")
    d = d.merge(m, left_on="y", right_index=True)
    return d[col] - d[col + "_8"]


def fit_beta(tr, xcol, ycol, sign=None):
    x, yv = tr[xcol].values, tr[ycol].values
    den = float((x ** 2).sum())
    if den <= 0:
        return 0.0
    b = float((x * yv).sum() / den)
    if sign == "neg":
        b = min(b, 0.0)
    return b


def run_sido(t, m4, f, col="F_area", rnd="09-16", anom=True, mode="rel", sign=None):
    x = transform(f, col, rnd, anom)
    d = m4.merge(t[["y", "sc", "a", "area"]], on=["y", "sc"]).merge(x, on=["y", "sc"], how="left")
    d = d[d.sc.isin(PROV)].copy()
    d["x"] = d.x.fillna(0.0)
    d["valid"] = d.valid.fillna(False).astype(bool)
    d["xr"] = rel(d, "x")
    d["ar"] = rel(d.assign(a=d.a.fillna(0)), "a")
    d["hr"] = rel(d, "ahat")
    d["res_rel"] = d.ar - d.hr
    d["res_lvl"] = d.a - d.ahat
    out, betas = [], {}
    for y in sorted(d.y.unique()):
        tr = d[(d.y < y) & d.valid & d.a.notna()]
        ok = tr.y.nunique() >= MIN_TRAIN
        if mode == "rel":
            b = fit_beta(tr, "xr", "res_rel", sign) if ok else 0.0
            adj = b * d.loc[d.y == y, "xr"]
        else:
            b = fit_beta(tr, "x", "res_lvl", sign) if ok else 0.0
            adj = b * d.loc[d.y == y, "x"]
        betas[int(y)] = round(b, 4)
        g = d[d.y == y][["y", "sc", "ahat", "x", "xr"]].copy()
        g["adj"] = adj.values
        g["ahat_new"] = g.ahat + g.adj
        out.append(g)
    return pd.concat(out, ignore_index=True), betas


def per_year(pred, t):
    d = t.merge(pred, on=["y", "sc"])
    g = d[d.sc.isin(PROV)]
    return g.groupby("y").apply(lambda h: float(np.sqrt(np.average((h.pred_yield - h["yield"]) ** 2, weights=h.area))))


def summarize(o, t, label):
    base = evalp.from_ahat(o[["y", "sc", "ahat"]], t)
    new = evalp.from_ahat(o[["y", "sc", "ahat_new"]].rename(columns={"ahat_new": "ahat"}), t)
    res = {}
    for nm, yrs in [("13_25", range(2013, 2026)), ("14_25", range(2014, 2026)), ("active", sorted(set(o[o.adj.abs() > 0].y) - {2026}))]:
        if not len(list(yrs)):
            continue
        r = evalp.metrics(new, yrs, t[t.y <= 2025])
        r0 = evalp.metrics(base, yrs, t[t.y <= 2025])
        res[nm] = {"years": f"{min(yrs)}~{max(yrs)}" if len(list(yrs)) else "", "model": r["model"], "M4": r0["model"], "stat": r["stat"]}
    py_new, py_m4 = per_year(new, t[t.y <= 2025]), per_year(base, t[t.y <= 2025])
    act = sorted(set(o[o.adj.abs() > 0].y) - {2026})
    diff = (py_new - py_m4).loc[act] if act else pd.Series(dtype=float)
    res["pair"] = {"n_active": len(act), "n_better": int((diff < 0).sum()), "mean_diff": round(float(diff.mean()), 2) if len(diff) else None,
                   "by_year": {int(k): round(float(v), 2) for k, v in diff.items()}}
    m, m0, s = res["13_25"]["model"], res["13_25"]["M4"], res["13_25"]["stat"]
    print(f"[{label}] 13-25 전국 MAE {m['nat_mae']} RMSE {m['nat_rmse']} 8도w {m['prov_rmse_w']} | M4 {m0['nat_mae']}/{m0['nat_rmse']}/{m0['prov_rmse_w']}"
          f" | 통계청 {s['nat_mae']}/{s['nat_rmse']}/{s['prov_rmse_w']} | 보정해 {res['pair']['n_active']} 나아짐 {res['pair']['n_better']} 평균차 {res['pair']['mean_diff']}", flush=True)
    return res, new


def run_sigun(t_s, f_sg, m4_sigun, rnd="09-16"):
    """시군 내 γ: (a_g − a_s_obs) = γ (x_g − x_s), x 자기 과거 평균 편차."""
    sg = f_sg[f_sg.rnd == rnd].sort_values(["sc", "stem", "y"]).copy()
    prev = sg.groupby(["sc", "stem"]).x_rate.transform(lambda s: s.shift(1).expanding().mean())
    sg["x"] = (sg.x_rate - prev).fillna(0.0)
    sg["valid"] = prev.notna()
    tg = common.targets().dropna(subset=["base"])
    d = tg.merge(sg[["y", "sc", "stem", "x", "valid"]], on=["y", "sc", "stem"], how="left")
    d["x"] = d.x.fillna(0.0)
    d["valid"] = d.valid.fillna(False).astype(bool)
    so = d.groupby(["y", "sc"]).apply(lambda g: pd.Series({"a_s": np.average(g.a, weights=g.area), "x_s": np.average(g.x, weights=g.area)})).reset_index()
    d = d.merge(so, on=["y", "sc"])
    d["ra"], d["rx"] = d.a - d.a_s, d.x - d.x_s
    out, gam = [], {}
    p = m4_sigun.merge(d[["y", "sc", "stem", "base", "rx"]], on=["y", "sc", "stem"], how="left")
    for y in sorted(p.y.unique()):
        tr = d[(d.y < y) & d.valid]
        g = 0.0
        if tr.y.nunique() >= MIN_TRAIN:
            w = tr.area.values
            g = float((w * tr.rx * tr.ra).sum() / (w * tr.rx ** 2).sum())
        gam[int(y)] = round(g, 4)
        q = p[p.y == y].copy()
        q["pred_yield"] = q.pred_yield + q.base.fillna(0) * g * q.rx.fillna(0)
        out.append(q)
    new = pd.concat(out, ignore_index=True)
    r0 = common.evaluate(m4_sigun, "M4 시군 9/15", years=range(2013, 2026))
    r1 = common.evaluate(new, "M4 + 시군 병해충 γ", years=range(2013, 2026))
    act = [y for y, g in gam.items() if g != 0]
    r0a = common.evaluate(m4_sigun, "M4 시군 (보정해)", years=act) if act else None
    r1a = common.evaluate(new, "M4+γ (보정해)", years=act) if act else None
    # 같은 해 시군 상대 상관 (사후 진단, 학습 안 씀)
    cr = d[d.valid].groupby("y").apply(lambda g: g.rx.corr(g.ra)).round(3).to_dict()
    return {"gamma": gam, "13_25": {"M4": r0, "new": r1}, "active": {"M4": r0a, "new": r1a}, "corr_by_year": {int(k): v for k, v in cr.items()}}


def main():
    t, m4, f = load()
    V = [("V1_D1_area_0916_anom [주]", dict(col="F_area", rnd="09-16", anom=True, mode="rel")),
         ("V2_D1_area_0916_level", dict(col="F_area", rnd="09-16", anom=False, mode="rel")),
         ("V3_D1_area_0901_anom", dict(col="F_area", rnd="09-01", anom=True, mode="rel")),
         ("V4_D1_area_0901_level", dict(col="F_area", rnd="09-01", anom=False, mode="rel")),
         ("V5_D2_area_0916_anom_neg", dict(col="F_area", rnd="09-16", anom=True, mode="rel", sign="neg")),
         ("V6_D3_area_0916_anom_level_effect", dict(col="F_area", rnd="09-16", anom=True, mode="lvl")),
         ("V7_D1_dmg_0916_anom", dict(col="F_dmg", rnd="09-16", anom=True, mode="rel"))]
    R = {}
    for lab, kw in V:
        o, b = run_sido(t, m4, f, **kw)
        res, new = summarize(o, t, lab)
        res["beta"] = b
        if 2026 in set(o.y):
            res["y2026"] = o[o.y == 2026][["sc", "ahat", "adj", "ahat_new"]].round(4).to_dict("records")
        R[lab] = res
        if lab.startswith("V1"):
            o.to_csv(os.path.join(D, "v1_detail.csv"), index=False)
            pr = new.copy()
            pr["pred_yield"] = pr.pred_yield.round(2)
            pr.sort_values(["y", "sc"]).to_csv(os.path.join(D, "pred_sido_0930.csv"), index=False)
    # 시군
    fsg = pd.read_csv(os.path.join(D, "feats_sigun.csv"), dtype={"sc": str})
    m4s = pd.read_csv(os.path.join(RICE, "cropmodel/out_fixed/pred_sigun_0915.csv"), dtype={"sc": str})
    R["V8_sigun_gamma_0916_anom"] = run_sigun(None, fsg, m4s)
    print("V8 γ:", R["V8_sigun_gamma_0916_anom"]["gamma"])
    print("V8 해별 시군 상대 r:", R["V8_sigun_gamma_0916_anom"]["corr_by_year"])
    json.dump(R, open(os.path.join(D, "results.json"), "w"), ensure_ascii=False, indent=1, default=float)


if __name__ == "__main__":
    main()
