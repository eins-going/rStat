"""쌀 단수 예측 가능성 시험 — 기상만으로 시도 단수의 평년 대비 편차를 설명할 수 있나.

정답: KOSIS DT_1ET0034 시도 10a당 생산량(정곡) 1980~2025 (db/raw/kosis_rice/dt_1et0034.csv)
기상: 기상청 ASOS 일자료 장기 지점 (db/raw/kma/asos_daily.csv.gz)
평년: 직전 5년 중 최고·최저를 뺀 3년 평균(올림픽 평년)
목표: 편차율 a = 단수 / 평년 - 1
모델: 의미가 분명한 기상 변수 몇 개의 릿지 회귀(시도 모두 함께 학습)
검증: (A) 한 해씩 빼고 학습  (B) 실시간처럼 그 해 이전 자료만으로 학습(2001~2025)
기준선: 평년 그대로(a=0)

사용: .venv/bin/python scripts/rice_feasibility.py OUT_DIR
"""
import json
import os
import sys

import numpy as np
import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, "db", "clean", "rice")
os.makedirs(OUT, exist_ok=True)

PROV = {"31": "경기", "32": "강원", "33": "충북", "34": "충남", "35": "전북", "36": "전남", "37": "경북", "38": "경남"}
LAW2PROV = {"41": "31", "11": "31", "28": "31", "42": "32", "51": "32", "43": "33", "44": "34", "30": "34", "36": "34",
            "45": "35", "52": "35", "46": "36", "29": "36", "12": "36", "47": "37", "27": "37", "48": "38", "26": "38", "31": "38"}
ISLANDS = {"102", "115", "169"}  # 백령도·울릉도·흑산도

# ---------------- 정답 ----------------
k = pd.read_csv(os.path.join(ROOT, "db/raw/kosis_rice/dt_1et0034.csv"), dtype={"code": str})
yl = k[(k.item == "10a당 생산량") & k.code.isin(PROV)].pivot(index="year", columns="code", values="value").astype(float)
ar = k[(k.item == "재배면적") & k.code.isin(PROV)].pivot(index="year", columns="code", values="value").astype(float)


def olympic(s, t):
    v = s.loc[t - 5:t - 1].dropna().values
    if len(v) < 5:
        return np.nan
    v = np.sort(v)[1:-1]
    return v.mean()


base = pd.DataFrame({c: {t: olympic(yl[c], t) for t in yl.index} for c in PROV})

# ---------------- 기상 ----------------
st = pd.read_csv(os.path.join(ROOT, "db/raw/kma/asos_stations.csv"), dtype={"stn": str, "law_id": str})
st["prov"] = st.law_id.str[:2].map(LAW2PROV)
st = st[st.prov.notna() & (st.ht.astype(float) < 300) & ~st.stn.isin(ISLANDS) & ~st.addr.str.contains("산지", na=False)]
d = pd.read_csv(os.path.join(ROOT, "db/raw/kma/asos_daily.csv.gz"), dtype={"stn": str})
cnt = d.groupby("stn").size()
longs = set(cnt[cnt >= 16500].index) & set(st.stn)
d = d[d.stn.isin(longs)].copy()
d["date"] = pd.to_datetime(d.date.astype(str))
d["y"] = d.date.dt.year
d["md"] = d.date.dt.month * 100 + d.date.dt.day
d["prov"] = d.stn.map(st.set_index("stn").prov)
print("기상 지점", d.stn.nunique(), {p: d[d.prov == p].stn.nunique() for p in PROV})


def win(df, a, b):
    return df[(df.md >= a) & (df.md <= b)]


def station_feats(cut):
    """cut=930: 9월 말까지, cut=831: 8월 말까지 자료만 사용."""
    fill_end = min(930, cut)
    rows = []
    for (stn, y), g in d.groupby(["stn", "y"]):
        f = {"stn": stn, "y": y}
        w = win(g, 811, fill_end)
        if w.ss_day.count() >= 0.8 * len(w) and len(w) > 15:
            f["ss_fill"] = w.ss_day.mean() * len(pd.date_range(f"{y}-08-11", f"{y}-{fill_end // 100:02d}-{fill_end % 100:02d}"))
        f["ta_fill"] = w.ta_avg.mean() if w.ta_avg.count() >= 0.8 * len(w) else np.nan
        w = win(g, 801, 820)
        f["tmin_head"] = w.ta_min.mean() if w.ta_min.count() >= 15 else np.nan
        w = win(g, 601, 731)
        f["ta_veg"] = w.ta_avg.mean() if w.ta_avg.count() >= 50 else np.nan
        w = win(g, 701, 731)
        f["ss_jul"] = w.ss_day.mean() * 31 if w.ss_day.count() >= 25 else np.nan
        w = win(g, 811, fill_end) if cut < 930 else win(g, 901, 930)
        f["rain_days"] = (w.rn_day.fillna(0) >= 1).sum() if len(w) else np.nan
        w = win(g, 801, fill_end)
        f["wind_max"] = w.ws_ins.max() if w.ws_ins.count() >= 0.8 * len(w) else np.nan
        w = win(g, 801, 831)
        f["hot_days"] = (w.ta_max >= 33).sum() if w.ta_max.count() >= 25 else np.nan
        # --- v2: 생리적 문턱 변수 ---
        w = win(g, 715, min(825, fill_end))
        f["cold_head"] = (20 - w.ta_avg).clip(lower=0).sum() if w.ta_avg.count() >= 0.8 * len(w) else np.nan  # 감수분열~출수 냉해
        w = win(g, 826, fill_end)
        f["cold_fill"] = (20 - w.ta_avg).clip(lower=0).sum() if len(w) and w.ta_avg.count() >= 0.8 * len(w) else 0  # 등숙 지연
        w = win(g, 810, fill_end)
        f["typhoon_days"] = (w.ws_ins >= 20).sum() if w.ws_ins.count() >= 0.7 * len(w) else np.nan
        w = win(g, 701, fill_end)
        f["heavy_rain"] = (w.rn_day.fillna(0) >= 80).sum()
        w = win(g, 801, 831)
        f["hot_fill"] = (w.ta_avg - 27).clip(lower=0).sum() if w.ta_avg.count() >= 25 else np.nan
        w = win(g, 811, fill_end)
        f["sunless"] = (w.ss_day < 1).sum() if w.ss_day.count() >= 0.8 * len(w) else np.nan
        rows.append(f)
    sf = pd.DataFrame(rows)
    sf["prov"] = sf.stn.map(st.set_index("stn").prov)
    pf = sf.groupby(["prov", "y"]).mean(numeric_only=True).reset_index()
    pf["ta_dev2"] = (pf.ta_fill - 22.0) ** 2
    return pf


V1 = ["ss_fill", "ta_fill", "ta_dev2", "tmin_head", "ta_veg", "ss_jul", "rain_days", "wind_max", "hot_days"]
V2 = ["ss_fill", "ss_jul", "sunless", "cold_head", "cold_fill", "typhoon_days", "heavy_rain", "hot_fill", "rain_days"]
FEATS = V2 if (len(sys.argv) > 2 and sys.argv[2] == "v2") else V1
LABEL = {"ss_fill": "등숙기 일조", "ta_fill": "등숙기 기온", "ta_dev2": "등숙기 기온의 22℃ 이탈", "tmin_head": "출수기 최저기온",
         "ta_veg": "6~7월 기온", "ss_jul": "7월 일조", "rain_days": "강우일수", "wind_max": "최대순간풍속(태풍)",
         "hot_days": "8월 폭염일수", "sunless": "등숙기 흐린 날(일조<1h)", "cold_head": "출수 전후 냉해 적산(20℃ 미만)",
         "cold_fill": "등숙 후기 저온 적산", "typhoon_days": "강풍일(순간 20m/s 이상)", "heavy_rain": "호우일(80mm 이상)",
         "hot_fill": "8월 고온 적산(27℃ 초과)"}


def dataset(cut):
    pf = station_feats(cut)
    rows = []
    for c in PROV:
        for t in range(1985, 2026):
            b = base.at[t, c] if t in base.index else np.nan
            y = yl.at[t, c] if t in yl.index else np.nan
            if np.isnan(b) or np.isnan(y):
                continue
            rows.append({"prov": c, "y": t, "yield": y, "base": b, "a": y / b - 1, "area": ar.at[t, c]})
    df = pd.DataFrame(rows).merge(pf, on=["prov", "y"], how="left")
    for f in FEATS:
        df["z_" + f] = (df[f] - df.groupby("prov")[f].transform("mean")).fillna(0)
    return df


def fit_predict(tr, te, alpha):
    # 시도별 평균을 뺀 편차(학습 기간 기준) — 기후가 다른 시도를 같이 학습
    ZC = ["z_" + f for f in FEATS]
    X_tr, X_te = tr[ZC].values, te[ZC].values
    sd = X_tr.std(axis=0); sd[sd == 0] = 1
    Z_tr, Z_te = X_tr / sd, X_te / sd
    yb = tr.a.mean()
    A = Z_tr.T @ Z_tr + alpha * np.eye(len(FEATS))
    beta = np.linalg.solve(A, Z_tr.T @ (tr.a.values - yb))
    return yb + Z_te @ beta, beta / sd, Z_te * beta


ALPHAS = [0.3, 1, 3, 10, 30, 100, 300]


def inner_alpha(tr):
    """학습 자료 안에서만 한 해씩 빼고 alpha 선택."""
    ys = sorted(tr.y.unique())
    best, be = None, 1e9
    for al in ALPHAS:
        err = []
        for t in ys:
            a_tr, a_te = tr[tr.y != t], tr[tr.y == t]
            p, _, _ = fit_predict(a_tr, a_te, al)
            err.append(((p - a_te.a.values) ** 2).sum())
        e = sum(err)
        if e < be:
            best, be = al, e
    return best


def evaluate(df, mode, alpha=None):
    pred = pd.Series(np.nan, index=df.index)
    pred0 = pd.Series(np.nan, index=df.index)
    chosen = []
    years = sorted(df.y.unique())
    test_years = years if mode == "loyo" else [t for t in years if t >= 2001]
    for t in test_years:
        tr = df[df.y != t] if mode == "loyo" else df[df.y < t]
        te = df[df.y == t]
        al = alpha if alpha is not None else inner_alpha(tr)
        chosen.append(al)
        p, _, _ = fit_predict(tr, te, al)
        pred.loc[te.index] = p
        pred0.loc[te.index] = tr.a.mean()
    out = df.loc[pred.notna()].copy()
    out["base0"] = out.base * (1 + pred0.dropna())
    out["a_hat"] = pred.dropna()
    out["pred"] = out.base * (1 + out.a_hat)
    out.attrs["alphas"] = chosen
    return out


def metrics(o):
    e_m = o.pred - o["yield"]
    e_b = o.base - o["yield"]
    nat = o.groupby("y").apply(lambda g: pd.Series({
        "act": np.average(g["yield"], weights=g.area), "pred": np.average(g.pred, weights=g.area),
        "base": np.average(g.base, weights=g.area), "base0": np.average(g.base0, weights=g.area)}), include_groups=False)
    r = lambda e: float(np.sqrt(np.mean(e ** 2)))
    res = {"prov_rmse_model": r(e_m), "prov_rmse_base": r(e_b),
           "nat_rmse_model": r(nat.pred - nat.act), "nat_rmse_base": r(nat.base - nat.act),
           "nat_mape_model": float(np.mean(np.abs(nat.pred / nat.act - 1)) * 100),
           "nat_mape_base": float(np.mean(np.abs(nat.base / nat.act - 1)) * 100),
           "nat_rmse_base0": r(nat.base0 - nat.act), "prov_rmse_base0": r(o.base0 - o["yield"]),
           "dir_hit": float(np.mean(np.sign(nat.pred - nat.base) == np.sign(nat.act - nat.base)) * 100)}
    res["prov_skill"] = 1 - res["prov_rmse_model"] / res["prov_rmse_base"]
    res["nat_skill"] = 1 - res["nat_rmse_model"] / res["nat_rmse_base"]
    return res, nat


results = {}
for cut in (930, 831):
    df = dataset(cut)
    for mode in ("loyo", "realtime"):
        o = evaluate(df, mode)
        m, nat = metrics(o)
        al = pd.Series(o.attrs["alphas"]).value_counts().to_dict()
        m["alpha"] = str(al)
        best = max(al, key=al.get)
        results[f"{cut}_{mode}"] = m
        nat.round(1).to_csv(os.path.join(OUT, f"nat_{cut}_{mode}.csv"))
        o[["prov", "y", "yield", "base", "pred"]].round(1).to_csv(os.path.join(OUT, f"prov_{cut}_{mode}.csv"), index=False)
        print(f"\n== 자료 {cut // 100}월 말까지, {mode}, alpha={best}")
        print({k2: (round(v, 3) if isinstance(v, float) else v) for k2, v in m.items()})
        for yy in (1993, 2003, 2012, 2016, 2020, 2024, 2025):
            if yy in nat.index:
                r = nat.loc[yy]
                print(f"  {yy}: 실제 {r.act:.0f} 평년 {r.base:.0f} 예측 {r.pred:.0f}")
    # 전체 자료로 학습한 계수(설명용)
    _, coef, _ = fit_predict(df, df, best)
    eff = {LABEL[f]: round(float(coef[i] * df["z_" + f].std() * 100), 2) for i, f in enumerate(FEATS)}
    results[f"{cut}_effect_pct_per_sd"] = eff
    print("  변수 1표준편차당 단수 변화(%):", eff)
    df.to_csv(os.path.join(OUT, f"dataset_{cut}.csv"), index=False)

json.dump(results, open(os.path.join(OUT, "results.json"), "w"), ensure_ascii=False, indent=1)
print("\n저장", OUT)
