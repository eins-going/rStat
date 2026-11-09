"""prov 갈래 공통 평가: 전국(00)·8도 면적가중 RMSE, 통계청 10월 예상과 같은 해 비교."""
import os
import sys

import numpy as np
import pandas as pd

RICE = "/home/eins/project/rStat/research/rice"
sys.path.insert(0, RICE)
sys.path.insert(0, os.path.join(RICE, "cropmodel"))
import common  # noqa: E402

PROV = ["31", "32", "33", "34", "35", "36", "37", "38"]


def truth(ext=False):
    """ext=True: 2026 행 추가 (yield 없음, 면적 = 통계청 2026 조사 면적, 평년 = 2021~25 올림픽)."""
    k = common._kosis()
    if ext:
        sf = pd.read_csv(os.path.join(RICE, "statdown/stat_forecast_sido.csv"), dtype={"sido_code": str})
        sf = sf[sf.year == 2026].rename(columns={"year": "y", "sido_code": "code", "area_ha": "area"})[["y", "code", "area"]]
        sf["yield"] = np.nan
        k = pd.concat([k, sf], ignore_index=True)
    s = k[k.code.str.len() == 2].rename(columns={"code": "sc"}).sort_values("y").copy()
    s["base"] = s.groupby("sc")["yield"].transform(common._olympic)
    s["a"] = s["yield"] / s.base - 1
    return s[["y", "sc", "yield", "area", "base", "a"]].reset_index(drop=True)


def stat():
    sf = pd.read_csv(os.path.join(RICE, "statdown/stat_forecast_sido.csv"), dtype={"sido_code": str})
    return sf.rename(columns={"year": "y", "sido_code": "sc", "yield_kg10a": "pred_yield"})[["y", "sc", "pred_yield"]]


def metrics(pred, years, t=None, sf=None):
    """pred: [y, sc, pred_yield] with sc in 00, 31..38. 통계청 있는 해만."""
    t = truth() if t is None else t
    sf = stat() if sf is None else sf
    yrs = sorted(set(years) & set(sf.y))
    out = {}
    for lab, p in [("model", pred), ("stat", sf)]:
        d = t.merge(p, on=["y", "sc"]).query("y in @yrs")
        n = d[d.sc == "00"]
        en = n.pred_yield - n["yield"]
        g = d[d.sc.isin(PROV)]
        e = g.pred_yield - g["yield"]
        out[lab] = {"nat_mae": round(float(en.abs().mean()), 2), "nat_rmse": round(float(np.sqrt((en ** 2).mean())), 2),
                    "prov_rmse_w": round(float(np.sqrt(np.average(e ** 2, weights=g.area))), 2),
                    "prov_rmse": round(float(np.sqrt((e ** 2).mean())), 2),
                    "e2020": round(float(en[n.y == 2020].iloc[0]), 1) if 2020 in yrs else None,
                    "e2024": round(float(en[n.y == 2024].iloc[0]), 1) if 2024 in yrs else None,
                    "n_years": len(set(n.y))}
    return out


def nat_from_prov(p, t=None):
    """시도 â → 전국(00) 예측 (실제값 안 씀): 8도는 자기 â, 나머지 시도는 8도 면적가중 â로 채움,
    각 시도 올림픽 평년 × (1+â)를 그해 시도 면적(8월 말 조사로 알려짐)으로 가중 합."""
    t = truth() if t is None else t
    p = p[p.sc.isin(PROV)]
    a8 = p.merge(t[["y", "sc", "area"]], on=["y", "sc"]).groupby("y").apply(
        lambda g: np.average(g.ahat, weights=g.area)).rename("a8")
    s = t[(t.sc != "00") & t.sc.str.len().eq(2)].dropna(subset=["base"])
    s = s[s.y.isin(a8.index)].merge(p[["y", "sc", "ahat"]], on=["y", "sc"], how="left")
    s["ahat"] = s.ahat.fillna(s.y.map(a8))
    s["pred"] = s.base * (1 + s.ahat)
    w = s.groupby("y").apply(lambda g: np.average(g.pred, weights=g.area)).rename("pred_yield").reset_index()
    w["sc"] = "00"
    return w[["y", "sc", "pred_yield"]]


def from_ahat(p, t=None):
    """p: [y, sc, ahat] 8도 → [y, sc, pred_yield] 00 + 8도."""
    t = truth() if t is None else t
    d = p.merge(t[["y", "sc", "base"]], on=["y", "sc"])
    d["pred_yield"] = d.base * (1 + d.ahat)
    return pd.concat([nat_from_prov(p, t), d[["y", "sc", "pred_yield"]]], ignore_index=True)


def report(pred, label=""):
    r13 = metrics(pred, range(2013, 2026))
    r10 = metrics(pred, range(2010, 2026))
    m, s = r13["model"], r13["stat"]
    print(f"[{label}] 13-25 전국 MAE {m['nat_mae']} RMSE {m['nat_rmse']} | 8도w {m['prov_rmse_w']} | 2020 {m['e2020']} 2024 {m['e2024']}"
          f" || 10-25 전국 {r10['model']['nat_rmse']} 8도w {r10['model']['prov_rmse_w']}   (통계청 13-25 {s['nat_rmse']}/{s['prov_rmse_w']}, 10-25 {r10['stat']['nat_rmse']}/{r10['stat']['prov_rmse_w']})", flush=True)
    return {"13_25": r13, "10_25": r10}


if __name__ == "__main__":
    p = pd.read_csv(os.path.join(RICE, "cropmodel/out_fixed/contrib_sido_0915.csv"), dtype={"sc": str})[["y", "sc", "ahat"]]
    report(from_ahat(p), "M4 0915")
    p = pd.read_csv(os.path.join(RICE, "cropmodel/out_fixed/contrib_sido_1001.csv"), dtype={"sc": str})[["y", "sc", "ahat"]]
    report(from_ahat(p), "M4 1001")
