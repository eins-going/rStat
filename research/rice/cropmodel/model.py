"""작물 생리 지표 → 평년 대비 편차율 a — 실시간(expanding window) 보정·검증.

학습 단위: 8개 도(31~38) 연도별 a (KOSIS 시도, 1985~). 특징 = 지표 그해 값 − 직전 5년 평균(평년 정의와 맞춤).
예측: 시도 â → 시군 pred = 시군 평년 × (1 + â_시도).  (B안: 같은 계수를 시군 지표에 적용, 시도 â와 반반)
모델 (모두 계수 몇 개):
  M1 SIMRIW  a = c + β·Δlog(Y_simriw)
  M2 성분     a = c + Σ β_k·Δx_k  (표준화 릿지, λ 고정)
  M3 SIMRIW + 피해(바람·호우·흐린날·도열병 습윤)
절편: 'c0' 0 고정, 'cw' 최근 가중(반감 8년) 절편
"""
import json
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))
import common  # noqa: E402
from components import SD_GROUP  # noqa: E402

PROV = ["31", "32", "33", "34", "35", "36", "37", "38"]
START = 1985
LAM = 3.0
COMP_ALL = ["cold_mei", "heat_ant", "rs_pre", "ptq_fill", "sunless", "wind", "rain_hv", "wet_head"]
DMG = ["wind", "rain_hv", "sunless", "wet_head"]
LABEL = {"cold_mei": "감수분열기 냉해", "heat_ant": "개화기 고온", "rs_pre": "출수 전 일사", "ptq_fill": "등숙기 일사·온도",
         "sunless": "흐린 날", "wind": "강풍(태풍)", "rain_hv": "호우", "wet_head": "출수기 강우일(도열병)",
         "lsim": "SIMRIW 수량지수", "rs_fill": "등숙기 일사", "cold_q": "냉각도일"}


def sido_targets():
    k = common._kosis()
    s = k[k.code.str.len() == 2].rename(columns={"code": "sc"}).sort_values("y").copy()
    s["base"] = s.groupby("sc")["yield"].transform(common._olympic)
    s["a"] = s["yield"] / s.base - 1
    return s[["y", "sc", "yield", "area", "base", "a"]]


def anomalies(comp, cols):
    """그해 값(as-of) − 직전 5년(완전 시즌=1001) 평균."""
    full = comp[comp["asof"] == "1001"].set_index(["sc", "y"])[cols].sort_index()
    prev = full.groupby(level=0).transform(lambda s: s.shift(1).rolling(5, min_periods=5).mean())
    out = {}
    for tag, g in comp.groupby("asof"):
        g = g.set_index(["sc", "y"])[cols].sort_index()
        out[tag] = (g - prev.reindex(g.index)).reset_index()
    return out


def prep(comp):
    comp = comp.copy()
    comp["lsim"] = np.log(comp.simriw)
    return comp


def fit_predict(train, test, feats, lam, icpt, w=None):
    X, y = train[feats].values, train.a.values
    w = np.ones(len(y)) if w is None else w
    mu, sd = X.mean(0), X.std(0) + 1e-9
    Z = (X - mu) / sd
    if icpt == "c0":
        A = Z
        b = np.linalg.solve(A.T @ (A * w[:, None]) + lam * np.eye(len(feats)), A.T @ (w * y))
        c = 0.0
        coef = b
    else:
        hl = 8.0
        yr = train.y.values
        ww = w * 0.5 ** ((yr.max() - yr) / hl)
        A = np.c_[np.ones(len(y)), Z]
        P = lam * np.eye(len(feats) + 1)
        P[0, 0] = 1e-6
        b = np.linalg.solve(A.T @ (A * ww[:, None]) + P, A.T @ (ww * y))
        c, coef = b[0], b[1:]
    Zt = (test[feats].values - mu) / sd
    contrib = Zt * coef
    return c + contrib.sum(1), contrib, c, coef / sd, mu


def backtest(an, st, feats, asof, lam=LAM, icpt="cw", years=range(1996, 2026)):
    d = st.merge(an[asof], on=["sc", "y"], how="inner")
    dfull = st.merge(an["1001"], on=["sc", "y"], how="inner")  # 학습은 지난해 완전 시즌 지표
    rows, coefs = [], {}
    for Y in years:
        tr = dfull[dfull.sc.isin(PROV) & (dfull.y >= START) & (dfull.y < Y)].dropna(subset=feats + ["a"])
        te = d[d.y == Y].dropna(subset=feats)
        if len(tr) < 40 or te.empty:
            continue
        p, contrib, c, coef, mu = fit_predict(tr, te, feats, lam, icpt, w=np.sqrt(tr.area.values / tr.area.mean()))
        o = te[["sc", "y"]].copy()
        o["ahat"] = p
        o["icpt"] = c
        for j, f in enumerate(feats):
            o["c_" + f] = contrib[:, j]
        rows.append(o)
        coefs[Y] = dict(zip(feats, coef.round(6))) | {"icpt": round(float(c), 4)}
        MODELS_[Y] = (list(feats), mu, coef, c)
    return pd.concat(rows, ignore_index=True), coefs


MODELS_ = {}


def apply_sigun(an_sg, asof, years=range(2013, 2026)):
    """직전 backtest의 해마다 모델(시도 학습)을 시군 지표 편차에 적용."""
    d = an_sg[asof]
    out = []
    for Y in years:
        if Y not in MODELS_:
            continue
        feats, mu, coef, c = MODELS_[Y]
        g = d[d.y == Y].dropna(subset=feats)
        o = g[["sc", "stem", "y"]].copy()
        o["ahat_sg"] = c + ((g[feats].values - mu) * coef).sum(1)
        out.append(o)
    return pd.concat(out, ignore_index=True)


def anomalies_sigun(cs, cols):
    full = cs[cs["asof"] == "1001"].set_index(["sc", "stem", "y"])[cols].sort_index()
    prev = full.groupby(level=[0, 1]).transform(lambda s: s.shift(1).rolling(5, min_periods=5).mean())
    out = {}
    for tag, g in cs.groupby("asof"):
        g = g.set_index(["sc", "stem", "y"])[cols].sort_index()
        out[tag] = (g - prev.reindex(g.index)).reset_index()
    return out


def sido_kg(p, st, years=range(2010, 2026), min_area=1000):
    """시도 단수 RMSE (kg/10a, 재배면적 min_area ha 이상 시도, 단순 평균) — 통계청 10월 예상 9.8kg과 비교용."""
    d = p.merge(st, on=["sc", "y"]).query("y in @years and area >= @min_area and sc != '00'")
    e = d.base * (1 + d.ahat) - d["yield"]
    e0 = d.base - d["yield"]
    return round(float(np.sqrt((e ** 2).mean())), 2), round(float(np.sqrt((e0 ** 2).mean())), 2), int(len(d))


def sido_score(p, st, years=range(2013, 2026)):
    d = p.merge(st, on=["sc", "y"]).query("sc in @PROV and y in @years")
    e = d.ahat - d.a
    w = d.area
    rm = np.sqrt(np.average(e ** 2, weights=w))
    rb = np.sqrt(np.average(d.a ** 2, weights=w))
    return round(float(1 - rm / rb), 3), round(float(rm * 100), 2), round(float(rb * 100), 2)


def to_sigun(p, comp_sigun_pred=None, blend=0.0):
    t = common.targets()
    t = t[t.y >= 2013].dropna(subset=["base"])
    t["grp"] = t.sc.map(SD_GROUP)
    m = p.set_index(["sc", "y"]).ahat
    a_own = [m.get((sc, y), np.nan) for sc, y in zip(t.sc, t.y)]
    a_grp = [m.get((g, y), np.nan) for g, y in zip(t.grp, t.y)]
    t["ahat"] = np.where(np.isnan(a_own), a_grp, a_own)
    if comp_sigun_pred is not None and blend > 0:
        t = t.merge(comp_sigun_pred, on=["sc", "stem", "y"], how="left")
        t["ahat"] = np.where(t.ahat_sg.notna(), (1 - blend) * t.ahat + blend * t.ahat_sg, t.ahat)
    t["ahat"] = t.ahat.fillna(0)
    t["pred_yield"] = t.base * (1 + t.ahat)
    return t


if __name__ == "__main__":
    comp = prep(pd.read_csv(os.path.join(HERE, "components_sido.csv"), dtype={"sc": str, "asof": str}))
    st = sido_targets()
    feats_all = sorted(set(COMP_ALL + ["lsim", "rs_fill", "cold_q"]))
    an = anomalies(comp, feats_all)
    MODELS = {"M1_simriw": ["lsim"], "M2_comp": COMP_ALL, "M3_simriw+dmg": ["lsim"] + DMG}
    res = {}
    for name, feats in MODELS.items():
        for icpt in ["c0", "cw"]:
            for asof in ["0815", "0915", "1001"]:
                p, coefs = backtest(an, st, feats, asof, icpt=icpt)
                s13 = sido_score(p, st)
                s96 = sido_score(p, st, range(1996, 2026))
                sg = to_sigun(p)
                r = common.evaluate(sg, f"{name}/{icpt}/{asof}", verbose=False)
                key = f"{name}|{icpt}|{asof}"
                res[key] = {"sido_skill_13_25": s13[0], "sido_skill_96_25": s96[0], **{k: r[k] for k in
                            ["skill", "rmse", "rmse_base", "rank_r", "nat_rmse", "nat_rmse_base", "nat_err_2020", "hit_2020"]}}
                print(f"{key:28s} 시도skill13 {s13[0]:+.3f} 96 {s96[0]:+.3f} | 시군 skill {r['skill']:+.3f} 전국 {r['nat_rmse']} (평년 {r['nat_rmse_base']}) 2020 {r['nat_err_2020']} hit {r['hit_2020']}", flush=True)
    json.dump(res, open(os.path.join(HERE, "results_grid.json"), "w"), ensure_ascii=False, indent=1)
