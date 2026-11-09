"""statfix: 통계청 10월 예상 오차 e = 확정/예상 - 1 을 예측해 보정 → 시군으로 내려 쓰기.
as-of ≈ 10/10 (또는 발표일 중 늦은 날). 엄격 실시간: y년 보정은 y년 이전 해의 (특징, e)로만 학습. 특징 선택까지 실시간인 변형도 따로.
"""
import json
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
RICE = os.path.dirname(HERE)
sys.path.insert(0, RICE)
sys.path.insert(0, os.path.join(RICE, "statdown"))
import common as c  # noqa: E402

D = pd.read_csv(os.path.join(HERE, "features_sido.csv"), dtype={"sc": str})
NAT = D[D.sc == "00"].set_index("y").sort_index()
PROV = D[(D.sc != "00") & (D.area >= 1000)].copy()
EVAL_Y = list(range(2013, 2026))
MIN_TR = 5           # 학습 해가 5년 미만이면 보정하지 않음 (2013·2014 = 보정 0)

POOL = [cc for cc in D.columns if cc.split("_")[-1] in ("post", "fill", "sep") or cc.startswith("m_")] + ["A", "krei_gap"]
# 사전 등록(과제 문구의 물리적 가설에서 고정, 기대 부호): 실시간 결과를 보기 전 정함
PREREG = {"A": "?", "hot_post": "-", "ss_post": "+", "rd_post": "-", "t_post": "-", "gust_fill": "-", "ss_fill": "+",
          "m_dec257": "+", "krei_gap": "+"}
POSTHOC = ["tmin_fill", "hr_sep"]   # 전체 기간 상관표를 보고 눈에 띈 것 (사후, 낙관적으로 봐야 함)


def ols(X, y, w=None, ridge=0.0, intercept=True):
    X = np.asarray(X, float).reshape(len(y), -1)
    if intercept:
        X = np.c_[np.ones(len(y)), X]
    w = np.ones(len(y)) if w is None else np.asarray(w, float)
    sw = np.sqrt(w)[:, None]
    R = ridge * np.eye(X.shape[1])
    if intercept:
        R[0, 0] = 0
    return np.linalg.solve((X * sw).T @ (X * sw) + R, (X * sw).T @ (np.asarray(y) * sw[:, 0]))


def pred1(b, x, intercept=True):
    x = np.atleast_1d(np.asarray(x, float))
    return (b[0] + x @ b[1:]) if intercept else x @ b


# ---------- 전국 수준 ----------
def nat_realtime(feats, intercept=True, years=EVAL_Y, loyo=False):
    out = {}
    for y in years:
        tr = NAT[(NAT.index != y) if loyo else (NAT.index < y)].dropna(subset=feats + ["e"])
        te = NAT.loc[y]
        if len(tr) < MIN_TR or te[feats].isna().any():
            out[y] = 0.0
            continue
        b = ols(tr[feats].values, tr.e.values, intercept=intercept) if feats else np.array([tr.e.mean()])
        out[y] = float(pred1(b, te[feats].values.astype(float), intercept)) if feats else float(b[0])
    return pd.Series(out)


def nat_select_realtime(pool, years=EVAL_Y):
    """특징 선택까지 실시간: y년 이전 해 안에서 '내부 실시간 오차'가 가장 작은 단일 특징."""
    out, log = {}, {}
    for y in years:
        tr = NAT[NAT.index < y]
        if len(tr) < MIN_TR + 2:
            out[y] = 0.0
            continue
        best = None
        for f in pool:
            errs = []
            for yy in tr.index[MIN_TR:]:
                t2 = tr[tr.index < yy].dropna(subset=[f, "e"])
                if len(t2) < MIN_TR - 1 or pd.isna(tr.loc[yy, f]):
                    continue
                b = ols(t2[[f]].values, t2.e.values)
                errs.append((pred1(b, [tr.loc[yy, f]]) - tr.loc[yy, "e"]) ** 2)
            if len(errs) >= 2:
                sc_ = np.mean(errs)
                if best is None or sc_ < best[0]:
                    best = (sc_, f)
        f = best[1]
        t2 = tr.dropna(subset=[f, "e"])
        te = NAT.loc[y, f]
        out[y] = 0.0 if pd.isna(te) else float(pred1(ols(t2[[f]].values, t2.e.values), [te]))
        log[y] = f
    return pd.Series(out), log


def nat_score(ehat, years=EVAL_Y):
    n = NAT.loc[years]
    corr = n.F * (1 + ehat.loc[years])
    err = corr - n["yield"]
    err0 = n.F - n["yield"]
    return {"mae": round(float(err.abs().mean()), 2), "rmse": round(float(np.sqrt((err ** 2).mean())), 2),
            "mae0": round(float(err0.abs().mean()), 2), "rmse0": round(float(np.sqrt((err0 ** 2).mean())), 2),
            "sign_hit": round(float((np.sign(ehat.loc[years]) == np.sign(n.e)).mean()), 2),
            "better_years": int(((err.abs() < err0.abs() - 0.5)).sum()), "worse_years": int(((err.abs() > err0.abs() + 0.5)).sum()),
            "err2020": round(float(err.loc[2020]), 1), "err2024": round(float(err.loc[2024]), 1),
            "err2015": round(float(err.loc[2015]), 1), "err2012_n/a": None}


# ---------- 시도 패널 ----------
def prov_realtime(feats, years=EVAL_Y, demean=False):
    """시도 e = b0 + b·x_시도 (면적가중, y년 이전). 반환 Series[(y, sc)]."""
    out = []
    for y in years:
        tr = PROV[PROV.y < y].dropna(subset=feats + ["e"])
        te = PROV[PROV.y == y]
        if tr.y.nunique() < MIN_TR:
            out.append(pd.Series(0.0, index=pd.MultiIndex.from_arrays([te.y, te.sc])))
            continue
        b = ols(tr[feats].values, tr.e.values, w=tr.area.values)
        p = b[0] + te[feats].fillna(tr[feats].mean()).values @ b[1:]
        out.append(pd.Series(p, index=pd.MultiIndex.from_arrays([te.y, te.sc])))
    return pd.concat(out)


def prov_score(ehat_ys):
    p = PROV[PROV.y.isin(EVAL_Y)].set_index(["y", "sc"])
    eh = ehat_ys.reindex(p.index).fillna(0)
    err = p.F * (1 + eh) - p["yield"]
    err0 = p.F - p["yield"]
    w = p.area
    return {"rmse": round(float(np.sqrt(np.average(err ** 2, weights=w))), 2), "rmse0": round(float(np.sqrt(np.average(err0 ** 2, weights=w))), 2)}


def nat_to_prov(ehat):
    p = PROV[PROV.y.isin(EVAL_Y)]
    return pd.Series(ehat.reindex(p.y).values, index=pd.MultiIndex.from_arrays([p.y, p.sc]))


# ---------- 시군 내려 쓰기 (statdown 재사용) ----------
import model as sd  # noqa: E402  (statdown/model.py; 모듈 수준에서 T 생성)

T0 = sd.T.copy()


def downscale(ehat_ys, label, specs=("k1", "beta_p")):
    """ehat_ys: Series[(y, sc)] 시도별 보정 ê. 없는 시도(1,000ha 미만·세종 대체 등)는 그해 전국 ê의 면적가중 평균."""
    res = {}
    e = ehat_ys.rename("eh").reset_index()
    T = T0.merge(e, on=["y", "sc"], how="left")
    nat_e = e.merge(PROV[["y", "sc", "area"]], on=["y", "sc"]).groupby("y").apply(lambda g: np.average(g.eh, weights=g.area))
    T["eh"] = T.eh.fillna(T.y.map(nat_e)).fillna(0.0)
    T["A"] = (1 + T.A) * (1 + T.eh) - 1
    sd.T = T
    for spec in specs:
        if spec == "k1":
            p, _ = sd.realtime("k1")
        else:
            p, _ = sd.realtime(spec, select={"tau": [0.005, 0.02, 0.05, 0.2, 1.0]})
        res[spec] = c.evaluate(p, f"{label} [{spec}]")
    sd.T = T0
    return res


if __name__ == "__main__":
    R = {"n_years_nat": int(len(NAT)), "eval_years": "2013~2025", "min_train_years": MIN_TR, "pool_size": len(POOL),
         "pool": POOL, "prereg": PREREG, "posthoc": POSTHOC}
    # 0) 전체 기간 단순상관 (참고, 사후)
    R["insample_corr_nat"] = {f: round(float(NAT[[f, "e"]].corr().iloc[0, 1]), 2) for f in POOL}

    # 1) 전국 단일 특징, 엄격 실시간
    print("== 전국 e 예측 (엄격 실시간, 보정 후 전국 kg 오차; 2013~2025, 보정 전 MAE/RMSE) ==")
    nat_rt = {}
    cand = [[]] + [[f] for f in list(PREREG) + POSTHOC] + [["A", "gust_fill"], ["A", "tmin_fill"], ["A", "hot_post"]]
    for feats in cand:
        for icpt in ([True, False] if feats else [True]):
            key = ("+".join(feats) or "bias_only") + ("" if icpt else "_noint")
            eh = nat_realtime(feats, intercept=icpt)
            sc_ = nat_score(eh)
            sc_["loyo"] = nat_score(nat_realtime(feats, intercept=icpt, loyo=True))
            sc_["ehat_kg"] = {int(y): round(float(v * NAT.loc[y, "F"]), 1) for y, v in eh.items()}
            nat_rt[key] = sc_
            tag = "사후" if any(f in POSTHOC for f in feats) else ""
            print(f"{key:22s}{tag:3s} MAE {sc_['mae']:5.2f} RMSE {sc_['rmse']:5.2f} (보정전 {sc_['mae0']}/{sc_['rmse0']}) 부호적중 {sc_['sign_hit']}"
                  f" 개선/악화 {sc_['better_years']}/{sc_['worse_years']} | 2020 {sc_['err2020']:+.1f} 2024 {sc_['err2024']:+.1f} 2015 {sc_['err2015']:+.1f}"
                  f" | LOYO RMSE {sc_['loyo']['rmse']}")
    R["nat_realtime"] = nat_rt

    # 계수 부호 안정성 (실시간 창마다)
    stab = {}
    for f in list(PREREG) + POSTHOC:
        bs = []
        for y in EVAL_Y:
            tr = NAT[NAT.index < y].dropna(subset=[f, "e"])
            if len(tr) >= MIN_TR:
                bs.append(ols(tr[[f]].values, tr.e.values)[1])
        bs = np.array(bs)
        stab[f] = {"pos_share": round(float((bs > 0).mean()), 2), "first": round(float(bs[0]), 4), "last": round(float(bs[-1]), 4)}
    R["coef_sign_stability"] = stab
    print("계수 부호 안정성(양수 비율):", {k: v["pos_share"] for k, v in stab.items()})

    # 2) 특징 선택까지 실시간 (탐색 비용 포함)
    for nm, pool in (("prereg", list(PREREG)), ("pool_all", POOL)):
        eh, log = nat_select_realtime(pool)
        sc_ = nat_score(eh)
        sc_["chosen"] = {int(k): v for k, v in log.items()}
        sc_["ehat_kg"] = {int(y): round(float(v * NAT.loc[y, "F"]), 1) for y, v in eh.items()}
        R[f"nat_select_{nm}"] = sc_
        print(f"선택 실시간 [{nm}, {len(pool)}개] MAE {sc_['mae']} RMSE {sc_['rmse']} 2020 {sc_['err2020']:+.1f} 2024 {sc_['err2024']:+.1f} 선택 {log}")

    # 3) 시도 패널
    print("== 시도 e (1,000ha 이상, 엄격 실시간, 시도 RMSE kg) ==")
    pr = {}
    for feats in [[], ["A"], ["hot_post"], ["gust_fill"], ["tmin_fill"], ["ss_post"], ["A", "gust_fill"]]:
        key = "+".join(feats) or "bias_only"
        if feats:
            eh = prov_realtime(feats)
        else:
            eh = nat_to_prov(nat_realtime([]))
        pr[key] = prov_score(eh)
        pr[key + "|nat->prov"] = prov_score(nat_to_prov(nat_realtime(feats)))
        print(f"{key:16s} 시도패널 {pr[key]}  | 전국 ê 일괄 {pr[key + '|nat->prov']}")
    R["prov_realtime"] = pr

    # 4) 시군 내려 쓰기
    print("== 시군 (common.evaluate 2013~2025) ==")
    zero = pd.Series(0.0, index=nat_to_prov(nat_realtime([])).index)
    ds = {"none": downscale(zero, "보정 없음(statdown 재현)")}
    for feats in [[], ["A"], ["gust_fill"], ["hot_post"], ["tmin_fill"], ["A", "gust_fill"]]:
        key = "+".join(feats) or "bias_only"
        ds["nat:" + key] = downscale(nat_to_prov(nat_realtime(feats)), f"전국 ê[{key}] 일괄")
    ds["prov:A"] = downscale(prov_realtime(["A"]), "시도 ê[A] 패널")
    eh_sel, _ = nat_select_realtime(list(PREREG))
    ds["nat:select_prereg"] = downscale(nat_to_prov(eh_sel), "전국 ê[사전등록 중 실시간 선택]")
    # 천장: 전국 오차를 완벽히 안다면
    ds["ceiling_nat_e"] = downscale(nat_to_prov(NAT.e), "천장: 전국 e 정답")
    R["sigun"] = ds
    json.dump(R, open(os.path.join(HERE, "results.json"), "w"), ensure_ascii=False, indent=1, default=float)
