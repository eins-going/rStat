"""LST가 cropmodel(ASOS 작물 생리 지표) 위에 신호를 더하는가 — 엄격 실시간 시험.

(a) 시도: ① 잔차 단계  â = â_crop(as-of) + Σβ·LST편차(as-of), β는 y년 이전 해(2003~)의 cropmodel 실시간 잔차(a − â_crop,1001)에 릿지
          ② 합동 릿지  M4 + LST를 한 릿지에 (LST가 있는 2003~ 학습) vs 같은 기간 M4만
(b) 시군: â_시군 = â_시도 + γ·(시군 LST편차 − 시도 LST편차), γ는 y년 이전 시군 (a_시군 − a_시도 실제)에 원점 릿지
(c) 2003·2024 진단
λ는 사전 고정(잔차 λ=10, 시군 λ=시군 수 기준 상대 1) + 실시간 내부 연도 CV 선택 둘 다 보고.
사용: OMP_NUM_THREADS=2 memcap -m 3G .venv/bin/python research/rice/lst/model.py
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
import baseline as B  # noqa: E402

M, common = B.M, B.common
pd.set_option("display.width", 250)
LSTF = ["n_pre30", "n_mei", "d_head", "n_fill", "d_fill", "n_sep", "d_sep", "dmax_head", "n_all", "d_all"]
MAIN = ["n_pre30", "d_head", "n_fill", "d_fill", "n_sep"]  # 사전 등록 주 세트 (과제 제안 그대로)
LSTART = int(os.environ.get("LSTART", 2003))
YEARS = range(2013, 2026)
LAMS = [0.3, 1, 3, 10, 30, 100, 1e9]


def ridge0(X, y, w, lam):
    """표준화 원점 릿지 (가중). 반환 β(원 단위)."""
    sd = X.std(0) + 1e-9
    Z = X / sd
    b = np.linalg.solve(Z.T @ (Z * w[:, None]) + lam * np.eye(X.shape[1]), Z.T @ (w * y))
    return b / sd


def cv_lam(df, feats, ycol, wcol, lams=LAMS):
    """내부 연도별 leave-one-year-out CV로 λ 선택 (학습 자료 안에서만)."""
    best, bl = None, None
    yrs = sorted(df.y.unique())
    if len(yrs) < 4:
        return lams[-1]
    for lam in lams:
        e = []
        for yy in yrs:
            tr, te = df[df.y != yy], df[df.y == yy]
            b = ridge0(tr[feats].values, tr[ycol].values, tr[wcol].values, lam)
            e.append(np.average((te[ycol].values - te[feats].values @ b) ** 2, weights=te[wcol].values))
        s = np.mean(e)
        if bl is None or s < bl - 1e-12:
            best, bl = lam, s
    return best


def ev(pred, label, verbose=True):
    r = common.evaluate(pred, label, verbose=verbose)
    r2 = common.evaluate(pred, label + " (2013~24)", years=range(2013, 2025), verbose=False)
    out = {k: r[k] for k in ["skill", "rmse", "rank_r", "nat_rmse", "nat_err_2020", "hit_2020"] if k in r}
    out.update({"skill_13_24": r2["skill"], "rank_r_13_24": r2["rank_r"], "nat_rmse_13_24": r2["nat_rmse"]})
    return out


def main():
    comp, cs, an, an_sg = B.load()
    st = M.sido_targets()
    fs = pd.read_csv(os.path.join(HERE, "feat_sido.csv"), dtype={"sc": str, "asof": str})
    fg = pd.read_csv(os.path.join(HERE, "feat_sigun.csv"), dtype={"sc": str, "asof": str})
    # 2025: Planetary Computer에 MOD11A2/MYD11A2 2025-07-04~11-24 합성이 없음 → 2025 LST 결측 (예측은 cropmodel 그대로가 됨)
    fs.loc[fs.y == 2025, LSTF] = np.nan
    fg.loc[fg.y == 2025, LSTF] = np.nan
    res = {"lst_years": f"{fs.y.min()}~{fs.y.max()} (2025 결측: PC 카탈로그 7~11월 없음)", "train_start": LSTART}

    # ---- cropmodel 기준선 (실시간) ----
    base = {}
    for asof in ["0815", "0915", "1001"]:
        p, _ = M.backtest(an, st, B.M4, asof, icpt="cw", years=range(1996, 2026))
        base[asof] = p
        res[f"base_{asof}"] = ev(M.to_sigun(p), f"cropmodel M4 {asof}", verbose=asof != "1001")
    resid = base["1001"].merge(st, on=["sc", "y"])
    resid["r"] = resid.a - resid.ahat
    resid["w"] = np.sqrt(resid.area / resid.area.mean())

    # ---- 단변량 진단: 시도 패널(8도, LSTART~2025) LST 편차 vs cropmodel 잔차 / vs a ----
    dd = resid[resid.sc.isin(M.PROV)].merge(fs[fs["asof"] == "1001"], on=["sc", "y"])
    dd = dd[dd.y >= LSTART]
    uni = {}
    for f in LSTF:
        x = dd[[f, "r", "a"]].dropna()
        uni[f] = {"r_resid": round(float(x[f].corr(x.r)), 3), "r_a": round(float(x[f].corr(x.a)), 3),
                  "r_resid_13_25": round(float(x[dd.y >= 2013][f].corr(x[dd.y >= 2013].r)), 3), "sd": round(float(x[f].std()), 3)}
    res["univariate_sido"] = uni
    print("\n단변량(시도 8도, 1001 특징): LST 편차 vs cropmodel 실시간 잔차 / vs a")
    print(pd.DataFrame(uni).T.to_string())
    # ASOS 지표와의 상관 (중복 정도)
    asos = an["1001"][["sc", "y", "tmin_fill", "tfill", "cold_mei", "heat_ant", "hot_fill"]]
    x = dd.merge(asos, on=["sc", "y"])
    cr = x[["n_pre30", "n_fill", "d_fill", "n_sep", "d_head", "tmin_fill", "tfill", "cold_mei", "heat_ant", "hot_fill"]].corr().round(2)
    print("\nLST vs ASOS 편차 상관\n", cr.loc[["n_pre30", "n_fill", "d_fill", "n_sep", "d_head"], ["tmin_fill", "tfill", "cold_mei", "heat_ant", "hot_fill"]].to_string())
    res["corr_lst_asos"] = cr.loc[["n_pre30", "n_fill", "d_fill", "n_sep", "d_head"], ["tmin_fill", "tfill", "cold_mei", "heat_ant", "hot_fill"]].to_dict()

    # ---- (a①) 잔차 단계 ----
    sets = {"MAIN": MAIN, "night3": ["n_pre30", "n_fill", "n_sep"], "all10": LSTF}
    sets.update({f"1:{f}": [f] for f in LSTF})
    full = resid.merge(fs[fs["asof"] == "1001"], on=["sc", "y"])
    full = full[full.sc.isin(M.PROV) & (full.y >= LSTART)]
    res["a_resid"] = {}
    keep_pred = {}
    for asof in ["0815", "0915"]:
        fa = fs[fs["asof"] == asof]
        for sname, feats in sets.items():
            for mode in ["lam10", "cv"]:
                rows = []
                lam_used = {}
                for Y in YEARS:
                    tr = full[full.y < Y].dropna(subset=feats + ["r"])
                    if tr.y.nunique() < 4:
                        continue
                    lam = 10.0 if mode == "lam10" else cv_lam(tr, feats, "r", "w")
                    lam_used[Y] = lam
                    b = ridge0(tr[feats].values, tr.r.values, tr.w.values, lam)
                    te = base[asof][base[asof].y == Y].merge(fa, on=["sc", "y"], how="left")
                    adj = np.nan_to_num(te[feats].values) @ b
                    o = te[["sc", "y"]].copy()
                    o["ahat"] = te.ahat.values + adj
                    o["adj"] = adj
                    rows.append(o)
                p = pd.concat(rows)
                p = pd.concat([p, base[asof][~base[asof].y.isin(p.y.unique())]])
                r = ev(M.to_sigun(p), f"잔차 {sname} {mode} {asof}", verbose=sname in ("MAIN", "night3", "all10"))
                ss = M.sido_score(p, st)
                res["a_resid"][f"{sname}|{mode}|{asof}"] = r | {
                    "sido_skill": ss[0], "lam": {int(k): v for k, v in lam_used.items()}}
                keep_pred[(sname, mode, asof)] = p
    print("\n잔차 단계 요약 (시군 skill; 기준 0815 %+.3f, 0915 %+.3f)" % (res["base_0815"]["skill"], res["base_0915"]["skill"]))
    tab = pd.DataFrame({k: {"skill": v["skill"], "skill_13_24": v["skill_13_24"], "rank_r": v["rank_r"], "nat": v["nat_rmse"], "nat_13_24": v["nat_rmse_13_24"], "sido_skill": v["sido_skill"]} for k, v in res["a_resid"].items()}).T
    print(tab.to_string())

    # ---- (a②) 합동 릿지: M4 + LST (2003~ 학습) vs M4 (같은 기간) ----
    res["a_joint"] = {}
    an2 = {k: v.merge(fs[fs["asof"] == k][["sc", "y"] + LSTF], on=["sc", "y"], how="left") for k, v in an.items()}
    old = M.START
    M.START = LSTART
    for asof in ["0815", "0915"]:
        for name, feats in {"M4_same_years": B.M4, "M4+MAIN": B.M4 + MAIN, "M4+night3": B.M4 + ["n_pre30", "n_fill", "n_sep"]}.items():
            d1 = {k: v.dropna(subset=MAIN) if k == "1001" else v for k, v in an2.items()}  # 같은 학습 행
            p, _ = M.backtest(d1, st, feats, asof, icpt="cw", years=YEARS)
            res["a_joint"][f"{name}|{asof}"] = ev(M.to_sigun(p), f"합동 {name} {asof}")
    M.START = old

    # ---- (b) 시군: 시도 â + γ·(시군 LST − 시도 LST) ----
    t = common.targets()
    t = t.merge(st[["sc", "y", "a"]].rename(columns={"a": "a_sd"}), on=["sc", "y"], how="left")
    t["dev"] = t.a - t.a_sd
    sdf = fs.rename(columns={f: f + "_sd" for f in LSTF})
    g = fg.merge(sdf[["sc", "y", "asof"] + [f + "_sd" for f in LSTF]], on=["sc", "y", "asof"], how="left")
    for f in LSTF:
        g["x_" + f] = g[f] - g[f + "_sd"]
    gfull = t.merge(g[g["asof"] == "1001"], on=["sc", "stem", "y"])
    gfull = gfull[gfull.y >= LSTART].dropna(subset=["dev"])
    gfull["w"] = np.sqrt(gfull.area / gfull.area.mean())
    # 단변량: 시군 편차 dev vs x_f
    uni_b = {f: round(float(gfull[["dev", "x_" + f]].dropna().corr().iloc[0, 1]), 3) for f in LSTF}
    print("\n시군 단변량: (a_시군 − a_시도) vs (시군 − 시도 LST 편차), 2003~2025:", uni_b)
    res["univariate_within"] = uni_b
    # 연도별 상관 (2003, 2024 포함)
    yr_corr = {int(y): {f: round(float(d[["dev", "x_" + f]].corr().iloc[0, 1]), 2) for f in ["n_pre30", "n_mei", "n_fill", "d_fill", "n_sep", "d_head"]}
               for y, d in gfull.groupby("y") if len(d) > 30}
    res["within_corr_by_year"] = yr_corr
    print(pd.DataFrame(yr_corr).T.to_string())
    # ASOS 시군 편차 비교용 (cropmodel 시군 성분 − 시도 성분)
    asg = an_sg["1001"][["sc", "stem", "y", "tmin_fill", "tfill", "cold_mei"]].merge(
        an["1001"][["sc", "y", "tmin_fill", "tfill", "cold_mei"]], on=["sc", "y"], suffixes=("", "_sd"))
    for c in ["tmin_fill", "tfill", "cold_mei"]:
        asg["xa_" + c] = asg[c] - asg[c + "_sd"]
    ga = gfull.merge(asg[["sc", "stem", "y", "xa_tmin_fill", "xa_tfill", "xa_cold_mei"]], on=["sc", "stem", "y"], how="left")
    res["univariate_within_asos"] = {c: round(float(ga[["dev", c]].dropna().corr().iloc[0, 1]), 3) for c in ["xa_tmin_fill", "xa_tfill", "xa_cold_mei"]}
    print("ASOS 시군−시도 편차 vs dev:", res["univariate_within_asos"])

    res["b_within"] = {}
    for asof in ["0815", "0915"]:
        sd_hat = base[asof]
        ga_ = g[g["asof"] == asof]
        for sname, feats in {"MAIN": MAIN, "night3": ["n_pre30", "n_fill", "n_sep"], "n_pre30": ["n_pre30"], "n_fill": ["n_fill"],
                             "d_fill": ["d_fill"], "n_sep": ["n_sep"], "d_head": ["d_head"], "all10": LSTF}.items():
            xs = ["x_" + f for f in feats]
            for mode in ["lam1", "cv"]:
                rows = []
                for Y in YEARS:
                    tr = gfull[gfull.y < Y].dropna(subset=xs + ["dev"])
                    lam = len(tr) / 100.0 if mode == "lam1" else cv_lam(tr, xs, "dev", "w", [len(tr) * s for s in [0.001, 0.01, 0.1, 1, 1e9]])
                    b = ridge0(tr[xs].values, tr.dev.values, tr.w.values, lam)
                    te = ga_[ga_.y == Y][["sc", "stem", "y"] + xs]
                    o = te[["sc", "stem", "y"]].copy()
                    o["adj"] = np.nan_to_num(te[xs].values) @ b
                    rows.append(o)
                adj = pd.concat(rows)
                sg = M.to_sigun(sd_hat).merge(adj, on=["sc", "stem", "y"], how="left")
                sg["adj"] = sg.adj.fillna(0)
                sg["pred_yield"] = sg.base * (1 + sg.ahat + sg.adj)
                res["b_within"][f"{sname}|{mode}|{asof}"] = ev(sg, f"시군 {sname} {mode} {asof}", verbose=sname in ("MAIN", "night3", "all10"))
    print("\n시군 요약 (기준 rank_r 0815 %.3f, 0915 %.3f)" % (res["base_0815"]["rank_r"], res["base_0915"]["rank_r"]))
    print(pd.DataFrame(res["b_within"]).T.to_string())
    # 천장: 시도 a를 알 때 LST 시군 편차가 순위를 얼마나 올리나 (참고, 비실시간 아님 — 시도 확정값 사용)
    sgc = t[t.y.isin(YEARS)].dropna(subset=["base", "a_sd"]).copy()
    sgc["pred_yield"] = sgc.base * (1 + sgc.a_sd)
    r = common.evaluate(sgc, "참고: 시도 확정 편차 그대로", verbose=True)
    res["ceiling_sido_actual"] = {k: r[k] for k in ["skill", "rank_r"]}

    # ---- (c) 2003·2024 진단 ----
    diag = {}
    yrs_d = [2003, 2012, 2020, 2024]
    b1001 = base["1001"].merge(st, on=["sc", "y"])
    for Y in yrs_d:
        x = b1001[(b1001.y == Y) & b1001.sc.isin(M.PROV)].merge(fs[fs["asof"] == "1001"], on=["sc", "y"], how="left").merge(
            an["1001"][["sc", "y", "tfill", "tmin_fill", "cold_mei", "hot_fill"]], on=["sc", "y"], how="left")
        cols = ["sc", "a", "ahat", "n_pre30", "n_mei", "d_head", "n_fill", "d_fill", "n_sep", "d_sep", "tfill", "tmin_fill", "cold_mei", "hot_fill"]
        x = x[cols].round(3)
        print(f"\n[{Y}] 시도: 실제 a, cropmodel 1001 실시간 â, LST 편차(℃), ASOS 편차")
        print(x.to_string(index=False))
        diag[Y] = x.to_dict("records")
    # 전 기간 적합(설명용, 비실시간): 잔차 ~ MAIN, 2003·2024 기여
    tr = full.dropna(subset=MAIN + ["r"])
    lam = 10.0
    b = ridge0(tr[MAIN].values, tr.r.values, tr.w.values, lam)
    tr = tr.assign(adj=tr[MAIN].values @ b)
    nat = tr.groupby("y").apply(lambda d: pd.Series({"r": np.average(d.r, weights=d.area), "adj": np.average(d.adj, weights=d.area)}))
    print("\n설명용 전기간 잔차 적합 β(%/℃):", dict(zip(MAIN, (b * 100).round(2))))
    print((nat * 100).round(2).loc[[y for y in yrs_d + [2016, 2019] if y in nat.index]].to_string())
    res["insample_resid_beta_pct_per_C"] = dict(zip(MAIN, (b * 100).round(3).tolist()))
    res["insample_resid_nat"] = (nat * 100).round(2).to_dict("index")
    # 2003 시군 횡단: 시군 dev vs LST 시군 편차, 산간 여부
    for Y in [2003, 2024]:
        d = gfull[gfull.y == Y]
        c = {f: round(float(d[["dev", "x_" + f]].corr().iloc[0, 1]), 3) for f in LSTF}
        c_a = {f: round(float(d[["a", f]].corr().iloc[0, 1]), 3) for f in LSTF}
        print(f"\n[{Y}] 시군 횡단 상관 dev~x: {c}\n      a~LST(절대 편차): {c_a}")
        diag[f"{Y}_within"] = {"dev_x": c, "a_lst": c_a, "n": int(len(d))}
    res["diag"] = diag
    json.dump(res, open(os.path.join(HERE, "results.json"), "w"), ensure_ascii=False, indent=1, default=float)
    print("저장 results.json")


if __name__ == "__main__":
    main()
