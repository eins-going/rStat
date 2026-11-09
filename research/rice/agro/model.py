"""새 자료(농업기상·NCPMS 예찰)가 작물 모델(cropmodel M4) 위에 시도·시군 신호를 더하는가 — 엄격 실시간.

우선순위(사용자 11-09): 전국보다 시도·시군 정확도.
사전 판정(결과 보기 전 고정):
  주 시점 9/15, 평가 2015~2025(11년), λ=10 고정(표준화 원점 릿지).
  채택 = 8도 시도 RMSE(kg) 감소 AND 시군 skill 하락 0.002 이내.  λ 내부 CV 결과는 참고.

(a) 시도 잔차 단계: 같은 예측시점 기준선 â_asof의 실시간 잔차 r = a − â_asof 를 특징 x(같은 시점)로 릿지.
    y년 예측은 y년 이전 해(특징이 있는 해)만 학습.  â' = â_asof + x·β
(b) 시군 안 차이: dev = a_시군 − a_시도(확정) 를 (x_시군 − x_시도)로 릿지, γ 실시간 → â_시군 = â'_시도 + γ·Δx
사용: OMP_NUM_THREADS=2 memcap -m 3G python3 research/rice/agro/model.py
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
sys.path.insert(0, os.path.join(RICE, "lst"))
import baseline as B  # noqa: E402

M, common = B.M, B.common
pd.set_option("display.width", 250)
EVAL = list(range(2015, 2026))
ASOFS = ["0815", "0915", "1001"]
LAMS = [0.3, 1, 3, 10, 30, 100, 1e9]


def ridge0(X, y, w, lam):
    sd = X.std(0) + 1e-9
    Z = X / sd
    b = np.linalg.solve(Z.T @ (Z * w[:, None]) + lam * np.eye(X.shape[1]), Z.T @ (w * y))
    return b / sd


def cv_lam(df, feats, ycol, wcol, lams=LAMS):
    yrs = sorted(df.y.unique())
    if len(yrs) < 4:
        return 10.0
    best, bl = None, None
    for lam in lams:
        e = []
        for yy in yrs:
            tr, te = df[df.y != yy], df[df.y == yy]
            b = ridge0(tr[feats].values, tr[ycol].values, tr[wcol].values, lam)
            e.append(np.average((te[ycol].values - te[feats].values @ b) ** 2, weights=te[wcol].values))
        if bl is None or np.mean(e) < bl - 1e-12:
            best, bl = lam, np.mean(e)
    return best


def score(p_sido, st, label, sg=None):
    """p_sido: [sc,y,ahat] → 8도 시도 kg RMSE, 시군 skill(2015~2025), 전국."""
    d = p_sido.merge(st, on=["sc", "y"]).query("sc in @M.PROV and y in @EVAL")
    e = d.base * (1 + d.ahat) - d["yield"]
    sido_kg = float(np.sqrt(np.average(e ** 2, weights=d.area)))
    sido_mae = float(np.average(np.abs(e), weights=d.area))
    if sg is None:
        sg = M.to_sigun(p_sido)
    r = common.evaluate(sg, label, years=EVAL, verbose=False)
    return {"sido_rmse_kg": round(sido_kg, 2), "sido_mae_kg": round(sido_mae, 2), "sigun_skill": r["skill"], "sigun_rmse": r["rmse"],
            "rank_r": r["rank_r"], "nat_rmse": r["nat_rmse"], "nat_2020": r.get("nat_err_2020")}


def load_feats():
    fs, fg = [], []
    a = os.path.join(HERE, "feat_sido.csv")
    if os.path.exists(a):
        fs.append(pd.read_csv(a, dtype={"sc": str, "asof": str}))
        fg.append(pd.read_csv(os.path.join(HERE, "feat_sigun.csv"), dtype={"sc": str, "asof": str}))
    n = os.path.join(RICE, "ncpms", "feat_sido.csv")
    if os.path.exists(n):
        fs.append(pd.read_csv(n, dtype={"sc": str, "asof": str}))
        g = os.path.join(RICE, "ncpms", "feat_sigun.csv")
        if os.path.exists(g):
            fg.append(pd.read_csv(g, dtype={"sc": str, "asof": str}))
    merge = lambda L, k: L[0] if len(L) == 1 else L[0].merge(L[1], on=k, how="outer")  # noqa: E731
    return merge(fs, ["sc", "y", "asof"]), (merge(fg, ["sc", "stem", "y", "asof"]) if fg else None)


def main():
    comp, cs, an, an_sg = B.load()
    st = M.sido_targets()
    fs, fg = load_feats()
    fcols = [c for c in fs.columns if c not in ("sc", "y", "asof") and not c.endswith("_cov")]
    print("특징", fcols, flush=True)
    base = {a: M.backtest(an, st, B.M4, a, icpt="cw", years=range(1996, 2026))[0] for a in ASOFS}
    res = {"eval_years": f"{EVAL[0]}~{EVAL[-1]}", "base": {}}
    for a in ASOFS:
        res["base"][a] = score(base[a], st, f"기준 {a}")
    # 참고: 국가데이터처 10월 예상(시도) 같은 기간
    sf = os.path.join(RICE, "statdown", "stat_forecast_sido.csv")
    if os.path.exists(sf):
        s = pd.read_csv(sf, dtype={"sido_code": str}).rename(columns={"year": "y", "sido_code": "sc", "yield_kg10a": "fy"})
        d = s[["sc", "y", "fy"]].merge(st, on=["sc", "y"]).query("sc in @M.PROV and y in @EVAL")
        e = d.fy - d["yield"]
        res["stat_oct_sido_rmse_kg"] = round(float(np.sqrt(np.average(e ** 2, weights=d.area))), 2)
    print("기준", json.dumps(res["base"], ensure_ascii=False), "| 국가데이터처 10월 시도", res.get("stat_oct_sido_rmse_kg"), flush=True)

    # 특징 묶음
    sets = {f"1:{c}": [c] for c in fcols}
    ag = [c for c in ["d_rs_pre", "d_rs_fill"] if c in fcols]
    if ag:
        sets["rs2"] = ag
        sets["rs2+wet"] = ag + [c for c in ["wetd_head"] if c in fcols]
    nc = [c for c in fcols if c.startswith("np_")]
    if nc:
        sets["ncpms_all"] = nc
    res["a_resid"] = {}
    best_pred = {}
    for a in ASOFS:
        tr_all = base[a].merge(st, on=["sc", "y"]).merge(fs[fs["asof"] == a], on=["sc", "y"], how="left")
        tr_all = tr_all[tr_all.sc.isin(M.PROV)]
        tr_all["r"] = tr_all.a - tr_all.ahat
        tr_all["w"] = np.sqrt(tr_all.area / tr_all.area.mean())
        for sname, feats in sets.items():
            for mode in ["lam10", "cv"]:
                rows = []
                for Y in EVAL:
                    tr = tr_all[tr_all.y < Y].dropna(subset=feats + ["r"])
                    te = base[a][base[a].y == Y].merge(fs[fs["asof"] == a], on=["sc", "y"], how="left")
                    o = te[["sc", "y"]].copy()
                    if tr.y.nunique() < 3:
                        o["ahat"] = te.ahat.values
                    else:
                        lam = 10.0 if mode == "lam10" else cv_lam(tr, feats, "r", "w")
                        b = ridge0(tr[feats].values, tr.r.values, tr.w.values, lam)
                        o["ahat"] = te.ahat.values + np.nan_to_num(te[feats].values) @ b
                    rows.append(o)
                p = pd.concat(rows + [base[a][~base[a].y.isin(EVAL)][["sc", "y", "ahat"]]])
                k = f"{sname}|{mode}|{a}"
                res["a_resid"][k] = score(p, st, k)
                best_pred[k] = p
    tab = pd.DataFrame(res["a_resid"]).T
    for a in ASOFS:
        b0 = res["base"][a]
        t = tab[tab.index.str.endswith(a)].copy()
        t["Δ시도kg"] = (t.sido_rmse_kg - b0["sido_rmse_kg"]).round(2)
        t["Δ시군skill"] = (t.sigun_skill - b0["sigun_skill"]).round(3)
        t["채택"] = (t["Δ시도kg"] < 0) & (t["Δ시군skill"] >= -0.002)
        print(f"\n[{a}] 기준 시도 {b0['sido_rmse_kg']}kg · 시군 skill {b0['sigun_skill']:+.3f} · 전국 {b0['nat_rmse']}")
        print(t[["sido_rmse_kg", "Δ시도kg", "sigun_skill", "Δ시군skill", "rank_r", "nat_rmse", "nat_2020", "채택"]].to_string())

    # (b) 시군 안 차이 (농업기상 시군 특징이 있을 때)
    if fg is not None:
        t = common.targets().merge(st[["sc", "y", "a"]].rename(columns={"a": "a_sd"}), on=["sc", "y"], how="left")
        t["dev"] = t.a - t.a_sd
        gcols = [c for c in fcols if c in fg.columns]
        sdf = fs.rename(columns={c: c + "_sd" for c in gcols})
        g = fg.merge(sdf[["sc", "y", "asof"] + [c + "_sd" for c in gcols]], on=["sc", "y", "asof"], how="left")
        for c in gcols:
            g["x_" + c] = g[c] - g[c + "_sd"]
        res["b_univariate"] = {}
        res["b_within"] = {}
        for a in ["0915"]:
            ga = t.merge(g[g["asof"] == a], on=["sc", "stem", "y"]).dropna(subset=["dev"])
            ga["w"] = np.sqrt(ga.area / ga.area.mean())
            res["b_univariate"][a] = {c: round(float(ga[["dev", "x_" + c]].dropna().corr().iloc[0, 1]), 3) for c in gcols}
            print(f"\n시군 안 단변량 [{a}] corr(a_시군 − a_시도, x_시군 − x_시도):", res["b_univariate"][a])
            for c in gcols:
                xs = ["x_" + c]
                rows = []
                for Y in EVAL:
                    tr = ga[ga.y < Y].dropna(subset=xs + ["dev"])
                    te = g[(g["asof"] == a) & (g.y == Y)][["sc", "stem", "y"] + xs]
                    o = te[["sc", "stem", "y"]].copy()
                    if tr.y.nunique() < 3:
                        o["adj"] = 0.0
                    else:
                        b = ridge0(tr[xs].values, tr.dev.values, tr.w.values, len(tr) / 100.0)
                        o["adj"] = np.nan_to_num(te[xs].values) @ b
                    rows.append(o)
                adj = pd.concat(rows)
                sg = M.to_sigun(base[a]).merge(adj, on=["sc", "stem", "y"], how="left")
                sg["adj"] = sg.adj.fillna(0)
                sg["pred_yield"] = sg.base * (1 + sg.ahat + sg.adj)
                r = common.evaluate(sg, f"시군 {c} {a}", years=EVAL, verbose=False)
                res["b_within"][f"{c}|{a}"] = {"sigun_skill": r["skill"], "rank_r": r["rank_r"],
                                               "Δskill": round(r["skill"] - res["base"][a]["sigun_skill"], 4),
                                               "Δrank_r": round(r["rank_r"] - res["base"][a]["rank_r"], 4)}
            print(pd.DataFrame(res["b_within"]).T.to_string())
    out = os.path.join(HERE, "results.json")
    json.dump(res, open(out, "w"), ensure_ascii=False, indent=1, default=float)
    print("저장", out)


if __name__ == "__main__":
    main()
