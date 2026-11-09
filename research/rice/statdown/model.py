"""시도 예상(통계청 10월 초, 9/15 기준 실측) → 시군 내려 쓰기. as-of ≈ 10/10 (발표일 10/2~10/17).
모든 계수는 실시간(y년 예측에 y년 이전 해만). 학습 가능한 해: 2010~ (예상 자료 시작)."""
import json
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import common as c  # noqa: E402

YEARS = range(2013, 2026)

# ---------- 자료 ----------
f = pd.read_csv(os.path.join(HERE, "stat_forecast_sido.csv"), dtype={"sido_code": str})
k = c._kosis()
s = k[k.code.str.len() == 2].rename(columns={"code": "sc"}).sort_values("y")
s["sbase"] = s.groupby("sc")["yield"].transform(c._olympic)
s = s.rename(columns={"yield": "syield", "area": "sarea"})[["y", "sc", "syield", "sarea", "sbase"]]
F = f.rename(columns={"year": "y", "sido_code": "sc", "yield_kg10a": "F"})[["y", "sc", "F"]]
S = s.merge(F, on=["y", "sc"], how="left")
S["A"] = S.F / S.sbase - 1                      # 시도 예상 편차
nat = S[S.sc == "00"][["y", "A"]].rename(columns={"A": "An"})
S = S[S.sc != "00"].merge(nat, on="y", how="left")
# 세종 예상 없는 해(2012~2015)는 충남 편차로
cn = S[S.sc == "34"][["y", "A", "F", "sbase"]].rename(columns={"A": "A34"})
S = S.merge(cn[["y", "A34"]], on="y", how="left")
S["A"] = S.A.fillna(S.A34)

t = c.targets()
t = t.merge(S[["y", "sc", "A", "An", "syield", "sbase", "F"]], on=["y", "sc"], how="left")
t["A"] = t.A.fillna(t.An)
t = t.sort_values(["sc", "stem", "y"]).reset_index(drop=True)
g = t.groupby(["sc", "stem"])
# 시군/시도 상대 수준 (직전 해들의 확정 → 실시간 가능)
t["rel"] = t["yield"] / t.syield
t["rel3"] = g.rel.transform(lambda x: x.shift(1).rolling(3, min_periods=2).mean())
t["rel5"] = g.rel.transform(lambda x: x.shift(1).rolling(5, min_periods=3).mean())
t["sa"] = t.syield / t.sbase - 1                 # 시도 확정 편차 (학습용 정답 쪽)
t["a_lag"] = g.a.shift(1)
t["sa_lag"] = g.sa.shift(1)

# MODIS: 7/20~9/14(doy 201~257) NDVI 평균의 시군 자체 평년(직전 5년 평균) 대비 편차 − 시도 편차
m = pd.read_csv(os.path.join(c.ROOT, "db/clean/rice/modis_curves.csv"))
m = m[m.doy.between(201, 257)]
mg = m[m.level == "sigun"].groupby(["sido", "sigun", "y"]).ndvi.mean().reset_index()
mg["sc"] = mg.sido.map(c.sido_code)
mg["stem"] = mg.sigun.str[:-1]
ms = m[m.level == "sido"].groupby(["sido", "y"]).ndvi.mean().reset_index()
ms["sc"] = ms.sido.map(c.sido_code)
for d_, keys in ((mg, ["sc", "stem"]), (ms, ["sc"])):
    d_.sort_values("y", inplace=True)
    d_["nan"] = d_.ndvi - d_.groupby(keys).ndvi.transform(lambda x: x.shift(1).rolling(5, min_periods=3).mean())
mg = mg.groupby(["sc", "stem", "y"]).nan.mean().reset_index()
mg = mg.merge(ms.groupby(["sc", "y"]).nan.mean().rename("nan_s").reset_index(), on=["sc", "y"], how="left")
mg["x_modis"] = mg.nan - mg.nan_s
t = t.merge(mg[["sc", "stem", "y", "x_modis"]], on=["sc", "stem", "y"], how="left")

T = t[t.y >= 2010].dropna(subset=["base", "A"]).copy()


# ---------- 모형 ----------
def wls(X, y, w, ridge=0.0):
    W = np.sqrt(w)[:, None]
    Xw, yw = X * W, y * W[:, 0]
    return np.linalg.solve(Xw.T @ Xw + ridge * np.eye(X.shape[1]), Xw.T @ yw)


def fit_predict(tr, te, spec, hp=None):
    """tr/te: 행 = 시군-연도. 반환: te 의 예측 편차 a_hat."""
    hp = hp or {}
    if spec == "nat":
        return te.An.values
    if spec == "k1":
        return te.A.values
    if spec == "k":                             # a = k·A (원점 회귀)
        kk = wls(tr[["A"]].values, tr.a.values, tr.area.values)[0]
        return kk * te.A.values
    if spec == "kb":                            # a = b + k·A
        X = np.c_[np.ones(len(tr)), tr.A]
        b, kk = wls(X, tr.a.values, tr.area.values)
        return b + kk * te.A.values
    if spec in ("beta", "beta_p", "beta_p_m"):
        kk = wls(tr[["A"]].values, tr.a.values, tr.area.values)[0]
        tau = hp.get("tau", 0.02)
        r = tr.a - kk * tr.A
        num = (tr.A * r).groupby([tr.sc, tr.stem]).sum()
        den = (tr.A ** 2).groupby([tr.sc, tr.stem]).sum() + tau
        db = (num / den).rename("db").reset_index()
        e = te.merge(db, on=["sc", "stem"], how="left").db.fillna(0).values
        ahat = (kk + e) * te.A.values
        if spec in ("beta_p", "beta_p_m"):
            # 직전 해 잔차(시군 확정 편차 − 시도 확정 편차 × β) 지속성
            b_tr = tr.merge(db, on=["sc", "stem"], how="left").db.fillna(0).values + kk
            b_te = (kk + e)
            res_lag_tr = (tr.a_lag - tr.sa_lag * b_tr).fillna(0).values
            res_lag_te = (te.a_lag - te.sa_lag * b_te).fillna(0).values
            cols_tr, cols_te = [res_lag_tr], [res_lag_te]
            if spec == "beta_p_m":
                cols_tr.append(tr.x_modis.fillna(0).values)
                cols_te.append(te.x_modis.fillna(0).values)
            Xtr = np.c_[cols_tr].T
            ytr = (tr.a - b_tr * tr.A).values
            coef = wls(Xtr, ytr, tr.area.values, ridge=hp.get("ridge", 0.0))
            ahat = ahat + np.c_[cols_te].T @ coef
            fit_predict.last = coef
        return ahat
    if spec == "persist":                       # k·A + ρ·(직전 해 시군 편차 − 직전 해 시도 확정 편차)
        kk = wls(tr[["A"]].values, tr.a.values, tr.area.values)[0]
        xr = (tr.a_lag - tr.sa_lag).fillna(0).values
        rho = wls(xr[:, None], (tr.a - kk * tr.A).values, tr.area.values)[0]
        fit_predict.last = (kk, rho)
        return kk * te.A.values + rho * (te.a_lag - te.sa_lag).fillna(0).values
    if spec in ("blend", "blend_p", "blend_p_m"):  # a = k1·A(시도) + k2·An(전국) [+ ρ·직전해 잔차 + γ·MODIS]
        cols = ["A", "An"]
        Xtr = np.c_[tr.A, tr.An]
        Xte = np.c_[te.A, te.An]
        if spec != "blend":
            Xtr = np.c_[Xtr, (tr.a_lag - tr.sa_lag).fillna(0)]
            Xte = np.c_[Xte, (te.a_lag - te.sa_lag).fillna(0)]
        if spec == "blend_p_m":
            Xtr = np.c_[Xtr, tr.x_modis.fillna(0)]
            Xte = np.c_[Xte, te.x_modis.fillna(0)]
        coef = wls(Xtr, tr.a.values, tr.area.values)
        fit_predict.last = coef
        return Xte @ coef
    if spec == "modis":
        kk = wls(tr[["A"]].values, tr.a.values, tr.area.values)[0]
        xr = tr.x_modis.fillna(0).values
        gm = wls(xr[:, None], (tr.a - kk * tr.A).values, tr.area.values)[0]
        fit_predict.last = (kk, gm)
        return kk * te.A.values + gm * te.x_modis.fillna(0).values
    raise ValueError(spec)


def realtime(spec, hp=None, years=YEARS, select=None):
    """select: {'tau': [..]} 이면 학습 해 안에서 다시 실시간 내부검증으로 고른다."""
    out, log = [], []
    for y in years:
        tr, te = T[T.y < y], T[T.y == y]
        if te.empty:
            continue
        h = dict(hp or {})
        if select:
            key, grid = next(iter(select.items()))
            best = None
            for v in grid:
                errs = []
                for yy in sorted(tr.y.unique())[3:]:
                    t2, e2 = tr[tr.y < yy], tr[tr.y == yy]
                    ah = fit_predict(t2, e2, spec, {**h, key: v})
                    errs.append(np.average((ah - e2.a.values) ** 2 * e2.base.values ** 2, weights=e2.area.values))
                sc_ = np.mean(errs) if errs else np.inf
                if best is None or sc_ < best[0]:
                    best = (sc_, v)
            h[key] = best[1]
            log.append((y, best[1]))
        ah = fit_predict(tr, te, spec, h)
        out.append(te[["y", "sc", "stem"]].assign(pred_yield=te.base.values * (1 + ah)))
    return pd.concat(out), log


def rel_level(col):
    d = T.dropna(subset=[col])
    return d[["y", "sc", "stem"]].assign(pred_yield=d.F * d[col]).dropna()


if __name__ == "__main__":
    res = {}
    base = T[["y", "sc", "stem"]].assign(pred_yield=T.base)
    res["base"] = c.evaluate(base, "평년 (예상 자료 있는 시군-연도)")
    for spec, lab in [("nat", "전국 예상 편차 일괄"), ("k1", "시도 예상 편차 그대로 (k=1)"), ("k", "시도 편차 × k(실시간)"),
                      ("kb", "시도 편차 × k + b(실시간)"), ("persist", "k·A + ρ·직전해 시군잔차"), ("modis", "k·A + γ·MODIS 시군−시도 NDVI 편차"),
                      ("blend", "k1·시도 + k2·전국 편차"), ("blend_p", "blend + ρ·직전해 잔차"), ("blend_p_m", "blend + ρ + γ·MODIS")]:
        p, _ = realtime(spec)
        res[spec] = c.evaluate(p, lab)
        if spec in ("persist", "modis", "blend", "blend_p", "blend_p_m"):
            print("   마지막 해 계수", np.round(fit_predict.last, 3))
    for spec in ("beta", "beta_p", "beta_p_m"):
        p, log = realtime(spec, select={"tau": [0.005, 0.02, 0.05, 0.2, 1.0]})
        res[spec] = c.evaluate(p, f"{spec} (시군 β, τ 실시간 선택)")
        print("   τ", log, "마지막 계수", np.round(getattr(fit_predict, "last", []), 3))
    for col in ("rel3", "rel5"):
        p = rel_level(col)
        res[col] = c.evaluate(p, f"시도 예상 × 시군/시도 비({col})")
    # 시도 확정을 알 때 (천장) — 비교용
    Tc = T.assign(A=T.sa)
    pc = Tc[["y", "sc", "stem"]].assign(pred_yield=Tc.base * (1 + Tc.sa))
    res["ceiling_sido_actual"] = c.evaluate(pc, "천장: 시도 확정 편차 그대로")
    # 시도 예상 대신 평년으로 연도별 표
    p_best, _ = realtime("persist")
    d = c.targets().merge(p_best, on=["y", "sc", "stem"])
    d = d.dropna(subset=["base"])
    yr = d.groupby("y").apply(lambda g: pd.Series({
        "rmse": np.sqrt(np.average((g.pred_yield - g["yield"]) ** 2, weights=g.area)),
        "rmse_base": np.sqrt(np.average((g.base - g["yield"]) ** 2, weights=g.area)),
        "rank_r": (g.pred_yield / g.base).rank().corr((g["yield"] / g.base).rank())})).round(2)
    print(yr.to_string())
    res["by_year_persist"] = yr.reset_index().to_dict("records")
    p_best.to_csv(os.path.join(HERE, "pred_persist.csv"), index=False)
    json.dump(res, open(os.path.join(HERE, "results.json"), "w"), ensure_ascii=False, indent=1, default=float)


def predict_2026(spec="beta_p_m", tau=0.02):
    """2026 시군 예측 (정답 아직 없음, 11월 중순 확정 발표 후 대조용)."""
    tt = c.targets().sort_values("y")
    last = tt[tt.y.between(2021, 2025)]
    w = last.pivot_table(index=["sc", "stem"], columns="y", values="yield")
    w = w.dropna()
    base26 = w.apply(lambda r: np.sort(r.values)[1:-1].mean(), axis=1).rename("base")
    r25 = T[T.y == 2025].set_index(["sc", "stem"])
    te = base26.reset_index().assign(y=2026)
    te = te.merge(r25[["a", "sa", "area", "name"]].rename(columns={"a": "a_lag", "sa": "sa_lag"}).reset_index(), on=["sc", "stem"], how="left")
    sw = s[s.y.between(2021, 2025)].pivot_table(index="sc", columns="y", values="syield").dropna()
    sb = sw.apply(lambda r: np.sort(r.values)[1:-1].mean(), axis=1).rename("sb26")
    s26 = F[F.y == 2026].set_index("sc").join(sb)
    s26["A"] = s26.F / s26.sb26 - 1
    an = s26.loc["00", "A"]
    s26 = s26.drop("00").reset_index()[["sc", "A"]].assign(An=an)
    te = te.merge(s26, on="sc", how="left")
    te["A"] = te.A.fillna(te.An)
    te = te.merge(mg[mg.y == 2026][["sc", "stem", "x_modis"]], on=["sc", "stem"], how="left")
    ah = fit_predict(T, te, spec, {"tau": tau})
    te["pred_yield"] = te.base * (1 + ah)
    return te[["y", "sc", "stem", "name", "base", "A", "x_modis", "pred_yield"]]


if __name__ == "__main__":
    p26 = predict_2026()
    p26.round(2).to_csv(os.path.join(HERE, "pred_2026.csv"), index=False)
    wa = p26.merge(T[T.y == 2025][["sc", "stem", "area"]], on=["sc", "stem"])
    print("2026 시군 예측", len(p26), "면적가중 평균", round(np.average(wa.pred_yield, weights=wa.area), 1))
