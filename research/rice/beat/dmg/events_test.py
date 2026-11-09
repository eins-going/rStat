"""보조(증거용) 검정: 농식품부 사건 보고(≤9/30) 시도 벼 피해 면적 / 시도 논 면적 vs M4 9/15 시도 상대 잔차.
README 사전 등록 보충의 규칙: 시도가 4개 이상 나온 해만, 빠진 도는 0, 같은 해 사건은 합.
"""
import json
import os
import sys

import numpy as np
import pandas as pd

RICE = "/home/eins/project/rStat/research/rice"
D = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, RICE)
sys.path.insert(0, os.path.join(RICE, "beat/prov"))
import evalp  # noqa: E402

SC = {"경기": "31", "강원": "32", "충북": "33", "충남": "34", "전북": "35", "전남": "36", "경북": "37", "경남": "38"}


def event_table():
    ev = pd.concat([pd.read_csv(os.path.join(D, f"raw/events_{r}.csv"), dtype=str) for r in ["2010_2017", "2018_2021", "2022_2026"]])
    ev = ev[ev.ha.notna() & ev.sido.isin(SC)].copy()
    ev["ha"] = ev.ha.astype(float)
    ev = ev[ev.report_date <= ev.year + "-09-30"]
    ev = ev[ev.dtype != "낙과"]
    rows = []
    for (y, e, s), g in ev.groupby(["year", "event", "sido"]):
        b = g[g.crop == "벼"]
        if len(b):
            v = b.groupby("dtype").ha.max().sum()  # 같은 유형 여러 보고면 큰 값(나중 집계)
        else:
            c = g[g.crop == "농작물"]
            v = c[c.dtype == "전체"].ha.max() if (c.dtype == "전체").any() else c.groupby("dtype").ha.max().sum()
        rows.append((int(y), e, SC[s], v))
    t = pd.DataFrame(rows, columns=["y", "event", "sc", "ha"])
    return t


def main():
    t = evalp.truth()
    ev = event_table()
    n_prov = ev.groupby("y").sc.nunique()
    yrs = sorted(n_prov[n_prov >= 4].index)
    x = ev.groupby(["y", "sc"]).ha.sum().reset_index()
    full = pd.MultiIndex.from_product([yrs, list(SC.values())], names=["y", "sc"]).to_frame(index=False)
    x = full.merge(x, on=["y", "sc"], how="left").fillna({"ha": 0.0})
    m4 = pd.read_csv(os.path.join(RICE, "cropmodel/out_fixed/contrib_sido_0915.csv"), dtype={"sc": str})[["y", "sc", "ahat"]]
    d = x.merge(t[["y", "sc", "a", "area"]], on=["y", "sc"]).merge(m4, on=["y", "sc"])
    d["x"] = d.ha / d.area

    def rel(c):
        m = d.groupby("y").apply(lambda g: np.average(g[c], weights=g.area))
        return d[c] - d.y.map(m)
    d["xr"], d["res"] = rel("x"), rel("a") - rel("ahat")
    out = {"years": yrs, "n_prov_reported": {int(k): int(v) for k, v in n_prov.items()}}
    out["corr_by_year"] = {int(y): round(float(g.xr.corr(g.res)), 3) for y, g in d.groupby("y")}
    b_all = float((d.xr * d.res).sum() / (d.xr ** 2).sum())
    out["pooled_beta"] = round(b_all, 4)
    out["pooled_r"] = round(float(d.xr.corr(d.res)), 3)
    # 한 해 빼기(증거용)와 실시간(앞 해만, 해 ≥2) β로 8도 RMSE (그 해들만)
    res = []
    for y in yrs:
        tr = d[d.y != y]
        b_loo = float((tr.xr * tr.res).sum() / (tr.xr ** 2).sum())
        tr2 = d[d.y < y]
        b_rt = float((tr2.xr * tr2.res).sum() / (tr2.xr ** 2).sum()) if tr2.y.nunique() >= 2 else 0.0
        g = d[d.y == y]
        base = t[(t.y == y) & t.sc.isin(SC.values())].set_index("sc")
        for lab, b in [("M4", 0.0), ("LOO", b_loo), ("RT", b_rt)]:
            ah = g.set_index("sc").ahat + b * g.set_index("sc").xr
            pred = base.base * (1 + ah)
            e = pred - base["yield"]
            res.append({"y": y, "variant": lab, "beta": round(b, 4), "rmse_w": float(np.sqrt(np.average(e ** 2, weights=base.area)))})
    r = pd.DataFrame(res)
    piv = r.pivot(index="y", columns="variant", values="rmse_w").round(2)
    out["rmse_by_year"] = piv.to_dict("index")
    tot = r.groupby("variant").apply(lambda g: float(np.sqrt((g.rmse_w ** 2).mean()))).round(2).to_dict()
    out["rmse_pooled_years"] = tot
    out["beta_by_year"] = r[r.variant != "M4"].pivot(index="y", columns="variant", values="beta").to_dict("index")
    d.round(5).to_csv(os.path.join(D, "events_sido.csv"), index=False)
    print(d.pivot_table(index="sc", columns="y", values=["xr", "res"]).round(3).to_string())
    print(json.dumps(out, ensure_ascii=False, indent=1, default=float))
    json.dump(out, open(os.path.join(D, "results_events.json"), "w"), ensure_ascii=False, indent=1, default=float)


if __name__ == "__main__":
    main()
