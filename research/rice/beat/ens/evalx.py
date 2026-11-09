"""공통 평가 (BRIEF + 조정자 정정 11-09): 전국은 예측량만으로 — 시도 예측 × 그해 시도 면적(8월 조사) 가중 합.
 - 8도 시도 â → 8도는 자기 값, 나머지 시도는 8도 면적가중 â로 채움, 평년 없는 시도(세종 2016~20)는 뺌.
 - 8도 RMSE = 31~38 면적가중 (통계청 9.78/9.52). 참고: 17개 시도 전체 면적가중(통계청 9.95/9.80).
"""
import os, sys
import numpy as np, pandas as pd
R = "/home/eins/project/rStat/research/rice"
sys.path[:0] = [R, f"{R}/cropmodel"]
os.environ.setdefault("PHENO", "fixed")
import common as C  # noqa
PROV = ["31", "32", "33", "34", "35", "36", "37", "38"]


def sido_all():
    k = C._kosis()
    s = k[k.code.str.len() == 2].rename(columns={"code": "sc"}).sort_values("y").copy()
    s["base"] = s.groupby("sc")["yield"].transform(C._olympic)
    s["a"] = s["yield"] / s.base - 1
    return s[["y", "sc", "yield", "area", "base", "a"]].reset_index(drop=True)


def _with_2026(s):
    """2026 행 추가: 정답 없음, 면적 = 통계청 2026 예상의 면적(8월 재배면적 조사 = 확정과 같음), 평년 = 2021~25 올림픽."""
    sf = pd.read_csv(f"{R}/statdown/stat_forecast_sido.csv", dtype={"sido_code": str})
    sf = sf[sf.year == 2026].rename(columns={"sido_code": "sc", "area_ha": "area"})[["sc", "area"]]
    last = s[s.y.between(2021, 2025)].pivot_table(index="sc", columns="y", values="yield")
    b = last.apply(lambda r: np.sort(r.values)[1:-1].mean() if r.notna().sum() == 5 else np.nan, axis=1).rename("base").reset_index()
    n = sf.merge(b, on="sc", how="left").assign(y=2026, a=np.nan)
    n["yield"] = np.nan
    return pd.concat([s, n[s.columns]], ignore_index=True)


ST = _with_2026(sido_all())
SIDO = ST[ST.sc != "00"].dropna(subset=["base"])
NAT = ST[ST.sc == "00"].set_index("y")


def stat():
    sf = pd.read_csv(f"{R}/statdown/stat_forecast_sido.csv", dtype={"sido_code": str})
    return sf.rename(columns={"year": "y", "sido_code": "sc", "yield_kg10a": "pred_yield"})[["y", "sc", "pred_yield"]]


def area(y, sc):
    return ST.set_index(["y", "sc"]).area


AREA = ST.set_index(["sc", "y"]).area
BASE = ST.set_index(["sc", "y"]).base


def a8(p):
    """p[y,sc,ahat] 8도 → 연도별 8도 면적가중 â."""
    q = p[p.sc.isin(PROV)].copy()
    q["w"] = [AREA.get((s, y), np.nan) for s, y in zip(q.sc, q.y)]
    return q.groupby("y").apply(lambda g: np.average(g.ahat, weights=g.w))


def all_sido(p):
    """8도 â → 17개 시도 예측 단수 (y, sc, pred_yield, area)."""
    m = a8(p)
    s = SIDO[SIDO.y.isin(m.index)].merge(p[p.sc.isin(PROV)][["y", "sc", "ahat"]], on=["y", "sc"], how="left")
    s["ahat"] = s.ahat.fillna(s.y.map(m))
    s["pred_yield"] = s.base * (1 + s.ahat)
    return s


def from_ahat(p):
    """p: [y, sc, ahat] (8도) → [y, sc, pred_yield] (00 + 8도) — 실제값 안 씀."""
    s = all_sido(p)
    n = s.groupby("y").apply(lambda g: np.average(g.pred_yield, weights=g.area)).rename("pred_yield").reset_index()
    n["sc"] = "00"
    return pd.concat([n[["y", "sc", "pred_yield"]], s[s.sc.isin(PROV)][["y", "sc", "pred_yield"]]], ignore_index=True)


def score(pred, years=range(2013, 2026), allsido=None):
    st = stat()
    yrs = sorted(set(years) & set(st.y))
    d = pred.merge(ST, on=["y", "sc"])
    d = d[d.y.isin(yrs)]
    n, p = d[d.sc == "00"], d[d.sc.isin(PROV)]
    e, ep = n.pred_yield - n["yield"], p.pred_yield - p["yield"]
    out = {"nat_mae": float(e.abs().mean()), "nat_rmse": float(np.sqrt((e ** 2).mean())),
           "prov_rmse": float(np.sqrt(np.average(ep ** 2, weights=p.area))), "n_years": int(n.y.nunique())}
    if allsido is not None:
        q = allsido.drop(columns=["yield"], errors="ignore").merge(ST[["y", "sc", "yield"]], on=["y", "sc"])
        q = q[q.y.isin(yrs) & (q.sc != "00")]
        out["sido17_rmse"] = float(np.sqrt(np.average((q.pred_yield - q["yield"]) ** 2, weights=q.area)))
    for yy in (2020, 2024):
        if yy in set(n.y):
            out[f"e{yy}"] = float(e[n.y == yy].iloc[0])
    return {k: (round(v, 2) if isinstance(v, float) else v) for k, v in out.items()}


def score2(pred, label="", allsido=None):
    a, b = score(pred, allsido=allsido), score(pred, range(2010, 2026), allsido=allsido)
    s = (f"{label:40s} 13-25 전국 MAE {a['nat_mae']:5.2f} RMSE {a['nat_rmse']:5.2f} 8도 {a['prov_rmse']:5.2f} 17시도 {a.get('sido17_rmse', np.nan):5.2f}"
         f" | 10-25 {b['nat_mae']:5.2f} {b['nat_rmse']:5.2f} 8도 {b['prov_rmse']:5.2f} | 2020 {a.get('e2020', np.nan):+6.1f} 2024 {a.get('e2024', np.nan):+6.1f}")
    return {"13_25": a, "10_25": b}, s


def score_ahat(p, label=""):
    return score2(from_ahat(p), label, allsido=all_sido(p))


if __name__ == "__main__":
    st = stat()
    sa = st[st.sc != "00"].merge(ST[["y", "sc", "area"]], on=["y", "sc"])
    print(score2(st, "통계청 10월 예상", allsido=sa)[1])
    for asof in ["0915", "1001"]:
        p = pd.read_csv(f"{R}/cropmodel/out_fixed/contrib_sido_{asof}.csv", dtype={"sc": str})
        print(score_ahat(p[["y", "sc", "ahat"]], f"M4 {asof}")[1])
