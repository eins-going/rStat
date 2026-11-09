"""후보 평가 + 실시간 메타 선택 + 쌓기(NNLS). README 사전 등록.

사용: python3 select.py sido 0915   /  python3 select.py sigun 0915
- 시도 후보 → 8도 RMSE(kg), 시군으로 내려(B0p 구조: â_시도 + ρ·작년 편차) 시군 skill
- 시군 후보 → 시군 skill, 시도로 올려(같은 시군 집합 면적가중) 8도 RMSE
- 메타: 해마다 직전 6년 성적 최고 후보(시도는 8도 RMSE, 시군은 시군 RMSE). 쌓기: 직전 해들(5년 이상) 표본 밖 예측으로 NNLS(상위 8 + 기준선), 합 1.
출력: out/eval_{level}_{asof}.csv, out/select_{level}_{asof}.json
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
import battery as BT  # noqa: E402
from scipy.optimize import nnls  # noqa: E402

M, common = BT.M, BT.common
OUT = BT.OUT
YRS = list(range(2013, 2026))
YRS2 = list(range(2015, 2026))
WIN = 6


def load(level, asof):
    if level == "sidoall":  # 기본 묶음 + 확장 묶음 합치기
        a = pd.read_csv(os.path.join(OUT, f"oos_sido_{asof}.csv"), dtype={"sc": str})
        b = pd.read_csv(os.path.join(OUT, f"oos_sidox_{asof}.csv"), dtype={"sc": str}).drop(columns="base")
        o = a.merge(b, on=["sc", "y"], how="left").rename(columns={"base": "BASE"})
    else:
        o = pd.read_csv(os.path.join(OUT, f"oos_{level}_{asof}.csv"), dtype={"sc": str}).rename(columns={"base": "BASE"})
    st = M.sido_targets()
    sg = BT.sigun_table(asof)[["sc", "stem", "y", "yield", "area", "base", "ahat_sd", "rho", "dev_prev", "grp"]]
    return o, st, sg


def sido_err(o, st, cols):
    """시도 후보 표 → 해·시도별 kg 오차."""
    d = o.merge(st[["sc", "y", "yield", "base", "area"]], on=["sc", "y"])
    E = {c: d.base * (1 + d[c]) - d["yield"] for c in cols}
    return d[["sc", "y", "area"]], pd.DataFrame(E)


def to_sigun_from_sido(o, sg, c):
    ah = o.set_index(["sc", "y"])[c]
    a_sd = [ah.get((s, y), ah.get((g, y), np.nan)) for s, y, g in zip(sg.sc, sg.y, sg.grp)]
    a_sd = pd.Series(a_sd, index=sg.index).fillna(sg.ahat_sd).fillna(0)
    p = sg[["y", "sc", "stem"]].copy()
    p["pred_yield"] = sg.base * (1 + a_sd + sg.rho * sg.dev_prev.fillna(0))
    return p


def sigun_pred(oo, sg):
    """oo: sc, stem, y, v(후보 a), bv(기준선 a) → 모든 시군 예측(후보 없으면 기준선, 그것도 없으면 M4 시도 â)."""
    d = sg.merge(oo, on=["sc", "stem", "y"], how="left")
    a = d.v.fillna(d.bv).fillna(d.ahat_sd).fillna(0)
    p = d[["y", "sc", "stem"]].copy()
    p["pred_yield"] = d.base * (1 + a)
    return p, d


def bu_sido_err(p, sg):
    d = p.merge(sg[["sc", "stem", "y", "yield", "area"]], on=["sc", "stem", "y"]).dropna(subset=["pred_yield", "yield"])
    d = d[d.sc.isin(M.PROV)]
    g = d.groupby(["sc", "y"]).apply(lambda q: pd.Series({"e": np.average(q.pred_yield, weights=q.area) - np.average(q["yield"], weights=q.area),
                                                          "area": q.area.sum()})).reset_index()
    return g


def rmse(e, w):
    m = np.isfinite(e)
    return float(np.sqrt(np.average(e[m] ** 2, weights=w[m]))) if m.any() else np.nan


def main():
    level, asof = sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "0915"
    o, st, sg = load(level, asof)
    cands = [c for c in o.columns if c not in ("sc", "stem", "y")]
    # 해별 오차 행렬 (메타·쌓기용): 시도 수준은 시도 kg 오차, 시군 수준은 시군 kg 오차
    if level.startswith("sido"):
        key, E = sido_err(o, st, cands)
        key = key.reset_index(drop=True)
        E = E.reset_index(drop=True)
        prov = key.sc.isin(M.PROV)
        key, E = key[prov], E[prov]
        A = o.merge(st[["sc", "y"]], on=["sc", "y"]).loc[lambda q: q.sc.isin(M.PROV)][cands].reset_index(drop=True)
        truth_a = o.merge(st[["sc", "y", "a"]], on=["sc", "y"]).loc[lambda q: q.sc.isin(M.PROV)].a.reset_index(drop=True)
        key = key.reset_index(drop=True)
        E = E.reset_index(drop=True)
    else:
        d = sg.merge(o, on=["sc", "stem", "y"], how="inner")
        d = d.dropna(subset=["yield", "base"])
        key = d[["sc", "stem", "y", "area"]].reset_index(drop=True)
        E = pd.DataFrame({c: d.base * (1 + d[c].fillna(d["base_y"] if "base_y" in d else d[c])) - d["yield"] for c in cands}).reset_index(drop=True) if False else \
            pd.DataFrame({c: (d.base * (1 + d[c])).values - d["yield"].values for c in cands})
        A = d[cands].reset_index(drop=True)
        truth_a = (d["yield"] / d.base - 1).reset_index(drop=True)
    w = key.area.values
    # 메타 선택 / 쌓기
    meta_a = pd.Series(np.nan, index=A.index)
    stack_a = pd.Series(np.nan, index=A.index)
    picks, weights = {}, {}
    for Y in YRS:
        past = key.y.between(Y - WIN, Y - 1).values
        sc_ = {}
        for c in cands:
            e = E[c].values[past]
            if np.isfinite(e).mean() > 0.95:
                sc_[c] = rmse(e, w[past])
        best = min(sc_, key=sc_.get)
        picks[Y] = best
        cur = (key.y == Y).values
        meta_a[cur] = A[best].values[cur]
        # 쌓기
        allp = (key.y < Y).values & (key.y >= 2007).values
        top = sorted(sc_, key=sc_.get)[:8]
        top = list(dict.fromkeys(top + ["BASE"]))
        Xp = A.loc[allp, top].values
        ok = np.isfinite(Xp).all(1) & np.isfinite(truth_a.values[allp])
        if ok.sum() >= 20 and key.y[allp][ok].nunique() >= 5:
            sw = np.sqrt(w[allp][ok])
            wt, _ = nnls(Xp[ok] * sw[:, None], truth_a.values[allp][ok] * sw)
            wt = wt / wt.sum() if wt.sum() > 0 else np.eye(len(top))[top.index("BASE")]
        else:
            wt = np.eye(len(top))[top.index("BASE")]
        weights[Y] = {k: round(float(v), 3) for k, v in zip(top, wt) if v > 0.001}
        stack_a[cur] = np.nan_to_num(A.loc[cur, top].values) @ wt
    A["META"], A["STACK"] = meta_a, stack_a
    ext = cands + ["META", "STACK"]
    # 평가
    rows = []
    for c in ext:
        r = {"cand": c}
        if level.startswith("sido"):
            ob = key.assign(a=A[c]).rename(columns={"a": c})[["sc", "y", c]]
            ob = o[["sc", "y"]].merge(ob, on=["sc", "y"], how="left")
            ob[c] = ob[c].fillna(o["BASE"])
            _, Es = sido_err(ob, st, [c])
            kk = ob.merge(st[["sc", "y", "area"]], on=["sc", "y"])
            pm = kk.sc.isin(M.PROV)
            for tag, yy in (("13", YRS), ("15", YRS2)):
                m = pm & kk.y.isin(yy)
                r[f"sido_{tag}"] = round(rmse(Es[c].values[m.values], kk.area.values[m.values]), 2)
            p = to_sigun_from_sido(ob, sg, c)
        else:
            oo = o[["sc", "stem", "y"]].copy()
            tmp = key[["sc", "stem", "y"]].assign(v=A[c].values)
            oo = oo.merge(tmp, on=["sc", "stem", "y"], how="left")
            oo["bv"] = o["BASE"].values
            p, _ = sigun_pred(oo, sg)
            bu = bu_sido_err(p, sg)
            for tag, yy in (("13", YRS), ("15", YRS2)):
                m = bu.y.isin(yy)
                r[f"sido_{tag}"] = round(rmse(bu.e.values[m.values], bu.area.values[m.values]), 2)
        for tag, yy in (("13", YRS), ("15", YRS2)):
            e = common.evaluate(p, c, years=yy, verbose=False)
            r[f"sg_skill_{tag}"] = e["skill"]
            if tag == "13":
                r["rank_r"], r["nat"], r["nat2020"] = e["rank_r"], e["nat_rmse"], e.get("nat_err_2020")
        rows.append(r)
    ev = pd.DataFrame(rows).set_index("cand")
    ev.to_csv(os.path.join(OUT, f"eval_{level}_{asof}.csv"))
    b = ev.loc["BASE"]
    show = ev.copy()
    show["Δsido13"] = (show.sido_13 - b.sido_13).round(2)
    show["Δsg13"] = (show.sg_skill_13 - b.sg_skill_13).round(3)
    print(f"[{level} {asof}] 후보 {len(cands) - 1}개 + META·STACK | 기준: 시도 {b.sido_13}/{b.sido_15}kg, 시군 {b.sg_skill_13:+.3f}/{b.sg_skill_15:+.3f}")
    print(show.loc[["BASE", "META", "STACK"]].to_string())
    print("\n사후 상위(시도 13~25):")
    print(show.drop(index=["META", "STACK"]).sort_values("sido_13").head(8).to_string())
    print("\n사후 상위(시군 skill 13~25):")
    print(show.drop(index=["META", "STACK"]).sort_values("sg_skill_13", ascending=False).head(8).to_string())
    print("\n메타 선택:", picks)
    json.dump({"picks": {int(k): v for k, v in picks.items()}, "weights": {int(k): v for k, v in weights.items()},
               "n_cands": len(cands) - 1}, open(os.path.join(OUT, f"select_{level}_{asof}.json"), "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
