"""산지쌀값(KOSIS 10일 단위, 정곡 20kg)으로 단수를 더 잘 예측할 수 있나 — 엄격 실시간 단변량, 2014~2025.
목표: (a) 단수 평년 대비 편차, (b) 9/15 모델 오차(확정/예측−1), (c) 10/8 모델 오차. 특징은 그 시점 전에 나온 값만."""
import json, sys
import numpy as np, pandas as pd
sys.path.insert(0, "/home/eins/project/rStat/research/rice"); import common as c
def load(t):
    d = pd.DataFrame(json.load(open(f"/home/eins/project/rStat/db/raw/kosis_rice/price_{t}.json")))
    d = d[d.ITM_NM == "금회가격(A)"]
    d["date"] = pd.to_datetime(d.PRD_DE + d.C1_NM.str.replace("일", "").str.zfill(2), format="%Y%m%d")
    return d.set_index("date").DT.astype(float).sort_index()
a, b = load("DT_1EI10179"), load("DT_1EI10122")
ov = a.index.intersection(b.index); k = float((b[ov] / a[ov]).median())
P = pd.concat([a[a.index < b.index[0]] * k, b]).sort_index()
print("두 표 이음 비율", round(k, 4), "| 기간", P.index[0].date(), "~", P.index[-1].date())
def at(y, md): return P.get(pd.Timestamp(f"{y}-{md}"), np.nan)
rows = []
for y in range(2014, 2027):
    r = {"y": y}
    for md in ["08-25", "09-05", "09-15", "09-25", "10-05", "10-15", "10-25"]:
        r[f"p{md[:2]}{md[3:]}"] = at(y, md)
    r["yoy_0905"] = at(y, "09-05") / at(y - 1, "09-05") - 1
    r["yoy_1005"] = at(y, "10-05") / at(y - 1, "10-05") - 1
    r["d_0915_0825"] = at(y, "09-15") / at(y, "08-25") - 1
    r["d_1005_0915"] = at(y, "10-05") / at(y, "09-15") - 1
    r["d_1025_1005"] = at(y, "10-25") / at(y, "10-05") - 1   # 국가데이터처 예상 뒤
    r["new_old_1005"] = at(y, "10-05") / at(y, "08-25") - 1   # 햅쌀 vs 묵은쌀
    rows.append(r)
X = pd.DataFrame(rows).set_index("y")
n = c.nation().set_index("y")
fc = pd.read_csv("/home/eins/project/rStat/db/clean/rice/rice_forecast.csv", dtype={"sc": str, "asof": str})
nat = fc[fc.level == "nation"].pivot_table(index="y", columns="asof", values="yield")
D = X.join(n[["yield", "a"]]).join(nat[["0915", "1010"]])
D["e0915"] = D["yield"] / D["0915"] - 1; D["e1010"] = D["yield"] / D["1010"] - 1
print(D[["a", "e0915", "e1010", "yoy_0905", "yoy_1005", "d_1005_0915", "d_1025_1005", "new_old_1005"]].round(3).to_string())
feats = {  # 특징: 쓸 수 있는 시점
    "yoy_0905": "9/15 전", "d_0915_0825": "9/15 전", "yoy_1005": "10/8 전", "d_1005_0915": "10/8 전", "new_old_1005": "10/8 전", "d_1025_1005": "10/8 뒤"}
def rt(target, f, base_pred, base_kind):
    """그해 이전 해로 target ~ f 단변량 OLS, 예측 단수 오차(kg)"""
    errs, errs0 = [], []
    for y in D.index:
        if pd.isna(D.loc[y, "yield"]) or pd.isna(D.loc[y, f]): continue
        tr = D[(D.index < y)].dropna(subset=[f, target])
        if len(tr) < 5: continue
        b_ = np.polyfit(tr[f], tr[target], 1); adj = b_[0] * D.loc[y, f] + b_[1]
        if base_kind == "a":   # 평년 × (1+â)
            base = n.loc[y, "base"]; pred = base * (1 + adj); pred0 = base
        else:
            pred0 = D.loc[y, base_pred]; pred = pred0 * (1 + adj)
        errs.append(pred - D.loc[y, "yield"]); errs0.append(pred0 - D.loc[y, "yield"])
    e, e0 = np.array(errs), np.array(errs0)
    return len(e), np.abs(e0).mean(), np.abs(e).mean(), np.sqrt((e0 ** 2).mean()), np.sqrt((e ** 2).mean())
for target, base, kind in [("a", None, "a"), ("e0915", "0915", "m"), ("e1010", "1010", "m")]:
    print(f"\n== 목표 {target} (기준: {'평년' if kind == 'a' else base + ' 모델'}) ==")
    for f, when in feats.items():
        if target == "e0915" and when != "9/15 전": continue
        if target == "e1010" and when == "9/15 전": continue
        sub = D.dropna(subset=[f, target]); r = np.corrcoef(sub[f], sub[target])[0, 1] if len(sub) > 3 else np.nan
        nn, m0, m1, r0, r1 = rt(target, f, base, kind)
        print(f"  {f:14s} ({when}) r {r:+.2f} | {nn}년 MAE {m0:.1f} → {m1:.1f} · RMSE {r0:.1f} → {r1:.1f}")
