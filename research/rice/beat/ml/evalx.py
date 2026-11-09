"""공통 평가: 전국·8도 면적가중 단수 오차, 통계청 10월 예상과 같은 해 비교."""
import os, sys
import numpy as np
import pandas as pd
RICE = "/home/eins/project/rStat/research/rice"
sys.path.insert(0, RICE)
import common  # noqa: E402
PROV = ["31", "32", "33", "34", "35", "36", "37", "38"]


def truth():
    k = common._kosis()
    s = k[(k.code.str.len() == 2)].rename(columns={"code": "sc"}).sort_values("y").copy()
    s["base"] = s.groupby("sc")["yield"].transform(common._olympic)
    s["a"] = s["yield"] / s.base - 1
    return s[["y", "sc", "yield", "area", "base", "a"]].reset_index(drop=True)


def stat():
    sf = pd.read_csv(os.path.join(RICE, "statdown/stat_forecast_sido.csv"), dtype={"sido_code": str})
    return sf.rename(columns={"year": "y", "sido_code": "sc", "yield_kg10a": "pred_yield"})[["y", "sc", "pred_yield"]]


def score(pred, years, ref=None):
    """pred: y, sc, pred_yield (sc '00' 전국 + 31..38). ref가 있으면 같은 해만."""
    t = truth()
    d = t.merge(pred, on=["y", "sc"])
    d = d[d.y.isin(list(years))]
    if ref is not None:
        d = d[d.y.isin(set(ref.y))]
    n = d[d.sc == "00"]
    en = n.pred_yield - n["yield"]
    p = d[d.sc.isin(PROV)]
    ep = p.pred_yield - p["yield"]
    out = {"nat_mae": round(float(en.abs().mean()), 2), "nat_rmse": round(float(np.sqrt((en ** 2).mean())), 2),
           "prov_rmse": round(float(np.sqrt(np.average(ep ** 2, weights=p.area))), 2), "n_years": int(n.y.nunique())}
    for yy in (2020, 2024):
        v = en[n.y == yy]
        out[f"nat_err_{yy}"] = round(float(v.iloc[0]), 1) if len(v) else None
    return out


def report(pred, label=""):
    r = {"label": label}
    for lab, yrs in [("13_25", range(2013, 2026)), ("10_25", range(2010, 2026))]:
        r[lab] = score(pred, yrs)
    return r


if __name__ == "__main__":
    print("통계청", report(stat(), "stat"))
    t = truth()
    b = t[["y", "sc", "base"]].rename(columns={"base": "pred_yield"})
    print("평년", report(b, "base"))


def from_ahat(p, t=None):
    """p: [y, sc, ahat] (8도; 그 밖 시도는 8도 면적가중 â로 채움) → [y, sc, pred_yield] (00 + 8도).
    전국 = 모든 시도(00 제외) 예측 단수 × 그해 시도 면적 합 / 면적 합 — 정답은 쓰지 않음(면적은 8월 말 조사로 알려짐)."""
    t = truth() if t is None else t
    p = p[p.sc.isin(PROV)][["y", "sc", "ahat"]]
    s = t[(t.sc != "00")][["y", "sc", "area", "base"]].dropna(subset=["base", "area"])
    s = s[s.y.isin(set(p.y))]
    s = s.merge(p, on=["y", "sc"], how="left")
    a8 = s[s.sc.isin(PROV)].dropna(subset=["ahat"]).groupby("y").apply(lambda g: np.average(g.ahat, weights=g.area))
    s["ahat"] = s.ahat.fillna(s.y.map(a8))
    s["pred_yield"] = s.base * (1 + s.ahat)
    nat = s.groupby("y").apply(lambda g: np.average(g.pred_yield, weights=g.area)).rename("pred_yield").reset_index()
    nat["sc"] = "00"
    return pd.concat([nat, s[s.sc.isin(PROV)][["y", "sc", "pred_yield"]]], ignore_index=True)
