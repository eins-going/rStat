"""시도 상대편차 모델 (사전 등록 README §2) — 엄격 실시간 백테스트 1996~2026.

사용: OMP_NUM_THREADS=2 memcap -m 3G .venv/bin/python research/rice/beat/prov/relmodel.py
"""
import json
import os
import sys
import warnings

import numpy as np
import pandas as pd

warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from evalp import RICE, PROV, truth, stat, nat_from_prov  # noqa: E402

YEARS = list(range(1996, 2027))
LAMS = [1, 3, 10, 30, 100]
M4F = ["cold_mei", "heat_ant", "rs_pre", "rs_pre_def", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "rain_hv", "wet_head"]
EXT = ["cold_q", "heading", "ss_pre_c", "sunless_pre", "rn_aug", "tc_dd_cal", "gust17_days_c", "ptq_fill", "tmin_fill", "dtr_rip_c",
       "wet_head", "rs_pre_def"]
SMALL = ["cold_q", "heading", "ss_pre_c", "tc_dd_cal", "rn_aug"]

T = truth(ext=True)
S8 = T[T.sc.isin(PROV)].copy()
S8["abar"] = S8.y.map(S8.groupby("y").apply(lambda g: np.average(g.a, weights=g.area) if g.a.notna().all() else np.nan))
S8["d"] = S8.a - S8.abar
REL = pd.read_pickle(os.path.join(HERE, "work/feat_rel.pkl"))
ALLF = [c for c in REL["1001"].columns if c not in ("y", "sc") and REL["1001"][c].notna().sum() > 300]
CR = pd.read_csv(os.path.join(HERE, "work/crpst_yield_sido.csv"), dtype={"sc": str})
CR["dc"] = CR.cr - CR.y.map(CR.groupby("y").apply(lambda g: np.average(g.cr, weights=g.area)))


def m4(asof):
    p = pd.read_csv(os.path.join(RICE, f"cropmodel/out_fixed/contrib_sido_{asof}.csv"), dtype={"sc": str})[["y", "sc", "ahat"]]
    p26 = pd.read_csv(os.path.join(RICE, "cropmodel/out_fixed/pred_2026_sido.csv"), dtype={"sc": str, "asof": str})
    p26 = p26[p26["asof"] == asof].assign(y=2026)[["y", "sc", "ahat"]]
    return pd.concat([p, p26])


# ---------- 릿지 ----------
def ridge_fit(X, y, w, lam):
    mu, sd = X.mean(0), X.std(0) + 1e-9
    Z = (X - mu) / sd
    b = np.linalg.solve(Z.T @ (Z * w[:, None]) + lam * np.eye(Z.shape[1]), Z.T @ (w * y))
    return mu, sd, b


def ridge_pred(model, X):
    mu, sd, b = model
    return ((X - mu) / sd) @ b


def loyo_err(X, y, w, yr, lam):
    e = 0.0
    for t in np.unique(yr):
        m = yr != t
        mod = ridge_fit(X[m], y[m], w[m], lam)
        e += np.sum(w[~m] * (ridge_pred(mod, X[~m]) - y[~m]) ** 2)
    return e


def train_rows(Y, feats, target="kosis"):
    if target == "kosis":
        d = S8[(S8.y >= 1985) & (S8.y < Y)][["y", "sc", "d", "area"]].merge(REL["1001"], on=["y", "sc"])
    else:  # crpst
        d = CR[(CR.y < Y)][["y", "sc", "dc", "area"]].rename(columns={"dc": "d"}).merge(REL["1001"], on=["y", "sc"])
    d = d.dropna(subset=feats + ["d"])
    return d[feats].values, d.d.values, np.sqrt(d.area.values / d.area.mean()), d.y.values


def rel_ridge(asof, feats, lam="cv", target="kosis", fs=False):
    """해마다 학습 → OOS 상대 예측 d̂ (8도, 그해 가중 평균 0으로 중심화)."""
    out = []
    te_all = REL[asof]
    for Y in YEARS:
        f = list(feats)
        if fs:
            f = forward_select(Y)
        X, y, w, yr = train_rows(Y, f, target)
        if len(y) < 40 or (target == "crpst" and len(y) < 30):
            continue
        L = lam if lam != "cv" else min(LAMS, key=lambda l_: loyo_err(X, y, w, yr, l_))
        mod = ridge_fit(X, y, w, L)
        te = te_all[te_all.y == Y].dropna(subset=f)
        if len(te) < 8:
            continue
        o = te[["y", "sc"]].copy()
        o["dhat"] = ridge_pred(mod, te[f].values)
        o["lam"] = L
        o["nf"] = len(f)
        out.append(o)
    o = pd.concat(out, ignore_index=True)
    return center(o)


_FS_CACHE = {}


def forward_select(Y, kmax=6, lam=10):
    if Y in _FS_CACHE:
        return _FS_CACHE[Y]
    d = S8[(S8.y >= 1985) & (S8.y < Y)][["y", "sc", "d", "area"]].merge(REL["1001"], on=["y", "sc"]).dropna(subset=ALLF + ["d"])
    y, w, yr = d.d.values, np.sqrt(d.area.values / d.area.mean()), d.y.values
    base = np.sum(w * y ** 2)
    chosen = []
    while len(chosen) < kmax:
        best, be = None, base
        for c in ALLF:
            if c in chosen:
                continue
            e = loyo_err(d[chosen + [c]].values, y, w, yr, lam)
            if e < be:
                best, be = c, e
        if best is None:
            break
        chosen.append(best)
        base = be
    _FS_CACHE[Y] = chosen if chosen else ["heading"]
    return _FS_CACHE[Y]


def center(o):
    a = o.merge(S8[["y", "sc", "area"]], on=["y", "sc"])
    m = a.groupby("y").apply(lambda g: np.average(g.dhat, weights=g.area))
    o["dhat"] = o.dhat - o.y.map(m).values
    return o


def m4_rel(asof):
    p = m4(asof).merge(S8[["y", "sc", "area"]], on=["y", "sc"])
    p = p[p.sc.isin(PROV)]
    p["dhat"] = p.ahat - p.y.map(p.groupby("y").apply(lambda g: np.average(g.ahat, weights=g.area)))
    return p[["y", "sc", "dhat"]]


def with_truth(o):
    return o.merge(S8[["y", "sc", "d", "area", "base"]], on=["y", "sc"], how="left")


def scale_k(o, lo=0.0, hi=1.5, start=1996):
    """d̂ ← κ_Y·d̂, κ_Y = 직전 해 OOS 무절편 가중 OLS."""
    x = with_truth(o)
    res = []
    for Y in sorted(x.y.unique()):
        tr = x[(x.y < Y) & (x.y >= start) & x.d.notna()]
        k = float(np.sum(tr.area * tr.d * tr.dhat) / np.sum(tr.area * tr.dhat ** 2)) if len(tr) >= 40 else 0.0
        k = min(max(k, lo), hi)
        g = x[x.y == Y][["y", "sc"]].copy()
        g["dhat"] = k * x[x.y == Y].dhat.values
        g["k"] = k
        res.append(g)
    return pd.concat(res, ignore_index=True)


def stack(o1, o2, start=1996):
    x = with_truth(o1).merge(o2.rename(columns={"dhat": "dhat2"})[["y", "sc", "dhat2"]], on=["y", "sc"])
    res = []
    for Y in sorted(x.y.unique()):
        tr = x[(x.y < Y) & (x.y >= start) & x.d.notna()]
        k = np.zeros(2)
        if len(tr) >= 40:
            A = np.c_[tr.dhat, tr.dhat2] * np.sqrt(tr.area.values)[:, None]
            b = tr.d.values * np.sqrt(tr.area.values)
            k = nnls2(A, b)
        g = x[x.y == Y]
        r = g[["y", "sc"]].copy()
        r["dhat"] = k[0] * g.dhat.values + k[1] * g.dhat2.values
        res.append(r)
    return pd.concat(res, ignore_index=True)


def nnls2(A, b):
    k = np.linalg.lstsq(A, b, rcond=None)[0]
    if (k >= 0).all():
        return k
    best, be = np.zeros(2), np.sum(b ** 2)
    for j in range(2):
        kj = max(0.0, float(A[:, j] @ b / (A[:, j] @ A[:, j])))
        kk = np.zeros(2)
        kk[j] = kj
        e = np.sum((b - A @ kk) ** 2)
        if e < be:
            best, be = kk, e
    return best


def ratio_base(asof, lag1=False):
    """P9: 시도 = 8도 예측 수준 × ρ̂_p (ρ = 시도 단수 / 8도 면적가중 단수, 직전 5년 올림픽 또는 직전 해)."""
    s = S8.copy()
    lvl = s.groupby("y").apply(lambda g: np.average(g["yield"], weights=g.area) if g["yield"].notna().all() else np.nan)
    s["rho"] = s["yield"] / s.y.map(lvl)
    s = s.sort_values("y")
    if lag1:
        s["rhat"] = s.groupby("sc").rho.shift(1)
    else:
        s["rhat"] = s.groupby("sc").rho.transform(lambda v: v.shift(1).rolling(5, min_periods=5).apply(lambda w: np.sort(w)[1:-1].mean(), raw=True))
    p = m4(asof).merge(s[["y", "sc", "area", "base", "rhat"]], on=["y", "sc"])
    p["lv"] = p.base * (1 + p.ahat)
    L8 = p.groupby("y").apply(lambda g: np.average(g.lv, weights=g.area))
    abar = p.groupby("y").apply(lambda g: np.average(g.ahat, weights=g.area))
    p["dhat"] = (p.y.map(L8) * p.rhat / p.base - 1) - p.y.map(abar)
    return p.dropna(subset=["dhat"])[["y", "sc", "dhat"]]


HS = [2, 4, 8, np.inf]
SS = [1, 2, 4, 8]


def re_est(r, Y, h, s):
    """r: [y, sc, res] 직전 OOS 잔차 → 시도별 축소 평균."""
    g = r[r.y < Y]
    if g.empty:
        return {}
    w = np.ones(len(g)) if np.isinf(h) else 0.5 ** ((Y - 1 - g.y.values) / h)
    g = g.assign(w=w, wr=w * g.res.values)
    a = g.groupby("sc")[["w", "wr"]].sum()
    return (a.wr / (a.w + s)).to_dict()


def add_re(o, start=1996, sel_from=2000):
    """o: OOS d̂. 잔차 편향 û_p 더함, (h, s)는 직전 해들 1년 앞 오차로 실시간 선택."""
    x = with_truth(o)
    x["res"] = x.d - x.dhat
    r = x[x.y >= start].dropna(subset=["res"])[["y", "sc", "res", "area"]]
    out = []
    for Y in sorted(x.y.unique()):
        best, be = (np.inf, 1e9), np.inf
        for h in HS:
            for s in SS:
                e = 0.0
                for t in range(sel_from, Y):
                    u = re_est(r, t, h, s)
                    gt = r[r.y == t]
                    if gt.empty:
                        continue
                    e += np.sum(gt.area * (gt.res - gt.sc.map(u).fillna(0)) ** 2)
                if e < be:
                    best, be = (h, s), e
        u = re_est(r, Y, *best) if Y > sel_from else {}
        g = x[x.y == Y][["y", "sc", "dhat"]].copy()
        g["dhat"] = g.dhat + g.sc.map(u).fillna(0)
        g["h"], g["s"] = best
        out.append(g)
    return center(pd.concat(out, ignore_index=True)[["y", "sc", "dhat", "h", "s"]])


# ---------- 조립·평가 ----------
def assemble(o, asof):
    """d̂ → 시도 â (전국 kg 합은 M4와 같게) → 예측표 [y, sc, pred_yield] (00 + 8도)."""
    p = m4(asof).merge(T[["y", "sc", "area", "base"]], on=["y", "sc"])
    p8 = p[p.sc.isin(PROV)].copy()
    p8["abar"] = p8.y.map(p8.groupby("y").apply(lambda g: np.average(g.ahat, weights=g.area)))
    p8 = p8.merge(o[["y", "sc", "dhat"]], on=["y", "sc"], how="left")
    p8["dhat"] = p8.dhat.fillna(p8.ahat - p8.abar)  # 상대 예측 없는 해는 M4 그대로
    p8["new"] = p8.abar + p8.dhat
    adj = p8.groupby("y").apply(lambda g: np.sum(g.area * g.base * (g.ahat - g.new)) / np.sum(g.area * g.base))
    p8["new"] = p8.new + p8.y.map(adj)
    nat = nat_from_prov(m4(asof), T)  # M4 전국 (바뀌지 않음)
    p8["pred_yield"] = p8.base * (1 + p8.new)
    return pd.concat([nat, p8[["y", "sc", "pred_yield"]]], ignore_index=True), p8[["y", "sc", "new"]].rename(columns={"new": "ahat"})


def score(pred, years):
    x = pred.merge(T, on=["y", "sc"]).dropna(subset=["yield"])
    x = x[x.y.isin(years)]
    n = x[x.sc == "00"]
    en = n.pred_yield - n["yield"]
    g = x[x.sc.isin(PROV)].copy()
    g["e"] = g.pred_yield - g["yield"]
    ec = g.groupby("y").apply(lambda q: np.average(q.e, weights=q.area))
    g["es"] = g.e - g.y.map(ec)
    w = g.area
    return {"nat_mae": round(float(en.abs().mean()), 2), "nat_rmse": round(float(np.sqrt((en ** 2).mean())), 2),
            "prov_rmse_w": round(float(np.sqrt(np.average(g.e ** 2, weights=w))), 2),
            "prov_spec": round(float(np.sqrt(np.average(g.es ** 2, weights=w))), 2),
            "e2020": round(float(en[n.y == 2020].iloc[0]), 1) if (n.y == 2020).any() else None,
            "e2024": round(float(en[n.y == 2024].iloc[0]), 1) if (n.y == 2024).any() else None}


Y13, Y10, Y96 = list(range(2013, 2026)), list(range(2010, 2026)), list(range(1996, 2010))


def meta_select(cands, asof, sel_from=2000):
    """해마다 직전 해(sel_from~Y−1) 8도 RMSE가 가장 낮은 변형의 그해 예측."""
    preds = {k: assemble(v, asof)[0] for k, v in cands.items()}
    errs = {}
    for k, p in preds.items():
        x = p.merge(T, on=["y", "sc"])
        x = x[x.sc.isin(PROV)].dropna(subset=["yield"])
        errs[k] = x.assign(se=x.area * (x.pred_yield - x["yield"]) ** 2).groupby("y").se.sum()
    rows, pick = [], {}
    for Y in YEARS:
        sc = {k: e[(e.index >= sel_from) & (e.index < Y)].sum() for k, e in errs.items()}
        k = min(sc, key=sc.get) if Y > sel_from else "P0"
        pick[Y] = k
        rows.append(cands[k][cands[k].y == Y][["y", "sc", "dhat"]])
    return pd.concat(rows, ignore_index=True), pick


def run(asof):
    V = {}
    V["P0"] = m4_rel(asof)
    V["P1"] = V["P0"].assign(dhat=0.0)
    V["P2"] = scale_k(V["P0"])
    V["P0r"] = add_re(V["P0"])
    V["P3"] = rel_ridge(asof, M4F, lam=3)
    V["P3cv"] = rel_ridge(asof, M4F)
    V["P4"] = rel_ridge(asof, EXT)
    V["P4s"] = rel_ridge(asof, SMALL)
    V["P4fs"] = rel_ridge(asof, [], lam=10, fs=True)
    V["P5"] = add_re(V["P4"])
    V["P6"] = add_re(V["P2"])
    V["P7"] = stack(V["P0"], V["P4"])
    V["P8"] = scale_k(rel_ridge(asof, SMALL, target="crpst"))
    V["P9"] = ratio_base(asof)
    V["P9b"] = ratio_base(asof, lag1=True)
    cands = {k: V[k] for k in ["P0", "P1", "P2", "P3cv", "P4", "P4s", "P5", "P6", "P7"]}
    V["MS"], pick = meta_select(cands, asof)
    res = {}
    preds = {}
    for k, o in V.items():
        pr, ah = assemble(o, asof)
        preds[k] = pr
        res[k] = {"13_25": score(pr, Y13), "10_25": score(pr, Y10), "96_09": score(pr, Y96)}
        r = res[k]
        print(f"{asof} {k:5s} 8도w 13-25 {r['13_25']['prov_rmse_w']:6.2f} (고유 {r['13_25']['prov_spec']:5.2f}) | 10-25 {r['10_25']['prov_rmse_w']:6.2f} "
              f"(고유 {r['10_25']['prov_spec']:5.2f}) | 96-09 고유 {r['96_09']['prov_spec']:5.2f} | 전국 13-25 {r['13_25']['nat_rmse']} 2020 {r['13_25']['e2020']} 2024 {r['13_25']['e2024']}", flush=True)
    ss = stat()
    for lab, yrs in [("13_25", Y13), ("10_25", Y10)]:
        res.setdefault("STAT", {})[lab] = score(ss, yrs)
    print(asof, "통계청", res["STAT"])
    extra = {"meta_pick": {int(k): v for k, v in pick.items()}, "P4fs_feats": {int(k): v for k, v in _FS_CACHE.items()},
             "P2_k": V["P2"].groupby("y").k.first().round(3).to_dict(), "P5_hs": V["P5"].groupby("y")[["h", "s"]].first().astype(str).agg("/".join, axis=1).to_dict(),
             "P4_lam": V["P4"].groupby("y").lam.first().to_dict()}
    return res, preds, V, extra


if __name__ == "__main__":
    allres = {}
    for asof in ["0915", "1001"]:
        _FS_CACHE.clear()
        res, preds, V, extra = run(asof)
        allres[asof] = {"scores": res, "extra": {k: {str(a): b for a, b in v.items()} for k, v in extra.items()}}
        pd.to_pickle({"preds": preds, "V": V}, os.path.join(HERE, f"work/rel_{asof}.pkl"))
        print(asof, "메타 선택:", extra["meta_pick"])
        print(asof, "P4fs 특징(2013, 2025):", extra["P4fs_feats"].get(2013), extra["P4fs_feats"].get(2025))
    json.dump(allres, open(os.path.join(HERE, "results_rel.json"), "w"), ensure_ascii=False, indent=1, default=str)
