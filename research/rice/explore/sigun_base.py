"""시군 기준선(평년) 바꾸기 — 시도 예측(M4 실시간 â)은 그대로, 시군으로 나누는 방식만 비교. 엄격 실시간.

B0      시군 올림픽 평년 × (1 + â_시도)                         (지금 연구 기준)
B0p     B0 + ρ·(작년 시군 편차 a_시군 − a_시도), ρ는 그해 이전 해로 원점 회귀 (지금 화면 방식과 같은 구조)
B1_k    시군/시도 단수 비율의 직전 k년 평균(k=1,3,5,8), B1_o5 올림픽(5년 중 최고·최저 뺀 3년), B1_eα 지수평활
        → 시군 예측 = 시도 예측 단수(시도 평년 × (1+â)) × 비율
B1_sel  해마다 직전 6년 실시간 성적이 가장 좋았던 B1 변형 선택 (메타 선택)
B3      시군 직전 10년 Theil-Sen 추세 외삽 × (1 + â_시도 − 시도 추세 편차)  … 참고
평가: common.evaluate (시군 skill = 1 − RMSE/평년 RMSE, 2013~2025 · 2015~2025)
사용: OMP_NUM_THREADS=2 memcap -m 3G python3 research/rice/explore/sigun_base.py [asof]
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
ASOF = sys.argv[1] if len(sys.argv) > 1 else "0915"
YEARS = range(2013, 2026)


def olymp(w):
    w = np.sort(np.asarray(w))
    return w[1:-1].mean()


def main():
    comp, cs, an, an_sg = B.load()
    st = M.sido_targets()
    p, _ = M.backtest(an, st, B.M4, ASOF, icpt="cw", years=range(1996, 2026))
    t = common.targets()
    t["grp"] = t.sc.map(M.SD_GROUP)
    # 시도 단수·평년 (실제), 시도 예측
    sd = st[["sc", "y", "yield", "base"]].rename(columns={"yield": "y_sd", "base": "b_sd"})
    t = t.merge(sd, on=["sc", "y"], how="left")
    ah = p.set_index(["sc", "y"]).ahat
    t["ahat"] = [ah.get((s, y), ah.get((g, y), np.nan)) for s, y, g in zip(t.sc, t.y, t.grp)]
    t["ahat"] = t.ahat.fillna(0)
    t["sd_pred"] = t.b_sd * (1 + t.ahat)
    t["ratio"] = t["yield"] / t.y_sd
    t = t.sort_values(["sc", "stem", "y"])
    g = t.groupby(["sc", "stem"])
    preds = {}
    # B0
    t["B0"] = t.base * (1 + t.ahat)
    # B0p: 작년 시군 편차 지속
    t["a_sd"] = t.y_sd / t.b_sd - 1
    t["dev"] = t.a - t.a_sd
    t["dev_prev"] = g.dev.shift(1)
    rho = {}
    for Y in YEARS:
        tr = t[(t.y < Y) & (t.y >= 2001)].dropna(subset=["dev", "dev_prev"])
        rho[Y] = float((tr.dev * tr.dev_prev).sum() / (tr.dev_prev ** 2).sum())
    t["rho"] = t.y.map(rho)
    t["B0p"] = t.base * (1 + t.ahat + t.rho.fillna(0) * t.dev_prev.fillna(0))
    # B1 비율
    rs = g.ratio
    for k in [1, 3, 5, 8]:
        t[f"r{k}"] = rs.transform(lambda s: s.shift(1).rolling(k, min_periods=k).mean())
        t[f"B1_{k}"] = t.sd_pred * t[f"r{k}"]
    t["ro5"] = rs.transform(lambda s: s.shift(1).rolling(5, min_periods=5).apply(olymp, raw=True))
    t["B1_o5"] = t.sd_pred * t.ro5
    for al in [0.3, 0.5, 0.7]:
        t[f"re{al}"] = rs.transform(lambda s: s.shift(1).ewm(alpha=al, min_periods=3).mean())
        t[f"B1_e{al}"] = t.sd_pred * t[f"re{al}"]
    # B3 추세
    def ts_pred(s, yrs):
        out = np.full(len(s), np.nan)
        v, yy = s.values, yrs.values
        for i in range(len(v)):
            m = (yy < yy[i]) & (yy >= yy[i] - 10) & ~np.isnan(v)
            if m.sum() >= 8:
                x, z = yy[m], v[m]
                sl = np.median([(z[j] - z[k]) / (x[j] - x[k]) for j in range(len(x)) for k in range(j) if x[j] != x[k]])
                ic = np.median(z - sl * x)
                out[i] = ic + sl * yy[i]
        return pd.Series(out, index=s.index)
    t["trend"] = pd.concat([ts_pred(d["yield"], d.y) for _, d in g])
    t["B3"] = t.trend * (1 + t.ahat)
    variants = ["B0", "B0p"] + [f"B1_{k}" for k in [1, 3, 5, 8]] + ["B1_o5", "B1_e0.3", "B1_e0.5", "B1_e0.7", "B3"]
    # 결측(비율 이력 부족 등)은 B0로 채움 — 같은 표본에서 비교
    for v in variants:
        t[v] = t[v].fillna(t.B0)
    # 메타 선택: 해마다 직전 6년(2007~) 시군 RMSE 최소 B1 변형
    cands = [f"B1_{k}" for k in [1, 3, 5, 8]] + ["B1_o5", "B1_e0.3", "B1_e0.5", "B1_e0.7"]
    sel = {}
    t["B1_sel"] = np.nan
    for Y in YEARS:
        past = t[(t.y < Y) & (t.y >= Y - 6)].dropna(subset=["yield"])
        sc_ = {c: np.sqrt(np.average((past[c] - past["yield"]) ** 2, weights=past.area)) for c in cands}
        best = min(sc_, key=sc_.get)
        sel[Y] = best
        t.loc[t.y == Y, "B1_sel"] = t.loc[t.y == Y, best]
    variants.append("B1_sel")
    res = {"asof": ASOF, "rho": {int(k): round(v, 3) for k, v in rho.items()}, "sel": {int(k): v for k, v in sel.items()}}
    rows = []
    for v in variants:
        d = t[["y", "sc", "stem"]].copy()
        d["pred_yield"] = t[v]
        r = common.evaluate(d, v, years=YEARS, verbose=False)
        r2 = common.evaluate(d, v, years=range(2015, 2026), verbose=False)
        rows.append({"변형": v, "시군 RMSE": r["rmse"], "skill 13~25": r["skill"], "skill 15~25": r2["skill"], "순위r": r["rank_r"],
                     "전국 RMSE": r["nat_rmse"], "2020": r.get("nat_err_2020")})
    tab = pd.DataFrame(rows).set_index("변형")
    print(f"[{ASOF}] 시도 â = M4 실시간, 시군 나누기만 다름 (평년 RMSE {r['rmse_base']})")
    print(tab.to_string())
    print("B1_sel 선택:", sel)
    # 천장: 시도 실제 단수를 알 때 비율 방식
    for k in ["r5", "ro5", "re0.5"]:
        d = t[["y", "sc", "stem"]].copy()
        d["pred_yield"] = (t.y_sd * t[k]).fillna(t.base * (1 + t.a_sd))
        r = common.evaluate(d, k, years=YEARS, verbose=False)
        print(f"참고 천장(시도 확정 단수 × 비율 {k}): skill {r['skill']:+.3f} 순위r {r['rank_r']}")
    d = t[["y", "sc", "stem"]].copy()
    d["pred_yield"] = t.base * (1 + t.a_sd)
    r = common.evaluate(d, "ceil", years=YEARS, verbose=False)
    print(f"참고 천장(시도 확정 증감 × 시군 평년): skill {r['skill']:+.3f}")
    res["table"] = tab.reset_index().to_dict("records")
    json.dump(res, open(os.path.join(HERE, f"sigun_base_{ASOF}.json"), "w"), ensure_ascii=False, indent=1, default=float)


if __name__ == "__main__":
    main()
