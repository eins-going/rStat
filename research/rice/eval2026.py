"""2026 확정(11/13) 뒤 점검: 시점별 예측의 2026 성적과 지난 13년 평균, 기준선(평년·국가데이터처 10월 예상)과의 비교.

- 예측: db/clean/rice/rice_forecast.csv (화면에 쓴 값 그대로 — 2026은 확정 전에 낸 값, 2013~2025는 실시간 재현)
- 정답: KOSIS DT_1ET0034 (common.targets · nation, 시도는 원자료의 시도 행)
사용: .venv/bin/python research/rice/eval2026.py
"""
import os, sys, json, re
import numpy as np, pandas as pd
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import common
ROOT = common.ROOT
PROV = ["31", "32", "33", "34", "35", "36", "37", "38"]
ASOF = ["0731", "0815", "0901", "0915", "1001", "1010"]
rm = lambda e, w: float(np.sqrt(np.average(np.asarray(e) ** 2, weights=w)))  # noqa: E731

fc = pd.read_csv(os.path.join(ROOT, "db/clean/rice/rice_forecast.csv"), dtype={"asof": str, "sc": str})
late = sorted(a for a in fc["asof"].unique() if a.startswith("S"))
asofs = ASOF + late[-1:]
tg = common.targets()
k = common._kosis(); sd = k[(k.code.str.len() == 2) & (k.code != "00")].rename(columns={"code": "sc"})[["y", "sc", "yield", "area"]]
sd = sd.sort_values("y"); sd["base"] = sd.groupby("sc")["yield"].transform(common._olympic)
nat = common.nation().set_index("y")
stat = None
try:  # 국가데이터처 10월 예상(시도 단수): 화면 자료에서
    s = open(os.path.join(ROOT, "data/rice.js"), encoding="utf-8").read()
    i = s.index("window.AGRI_RICE"); d = json.loads(s[s.index("{", i):s.rindex("}") + 1])
    stat = {c: v[0] for c, v in (d["fc"].get("stat") or {}).items() if len(c) == 2}
except Exception as e:  # noqa: BLE001
    print("국가데이터처 시도 예상을 읽지 못함:", e)

def sigun(y0, y1, a):
    f = fc[(fc.level == "sigun") & (fc["asof"] == a) & fc.y.between(y0, y1)].rename(columns={"yield": "pred"})
    m = tg.merge(f[["y", "sc", "name", "pred"]], on=["y", "sc", "name"]).dropna(subset=["pred", "base", "yield"])
    if m.empty: return None
    return {"n": len(m), "rmse": rm(m.pred - m["yield"], m.area), "base": rm(m.base - m["yield"], m.area),
            "rank": float(np.mean([(g.pred / g.base).rank().corr((g["yield"] / g.base).rank()) for _, g in m.groupby("y") if len(g) >= 20]))}

def sido(y0, y1, a):
    f = fc[(fc.level == "sido") & (fc["asof"] == a) & fc.y.between(y0, y1) & fc.sc.isin(PROV)].rename(columns={"yield": "pred"})
    m = sd.merge(f[["y", "sc", "pred"]], on=["y", "sc"]).dropna(subset=["pred", "yield", "base"])
    return {"rmse": rm(m.pred - m["yield"], m.area), "base": rm(m.base - m["yield"], m.area)} if len(m) else None

def nation(y0, y1, a):
    f = fc[(fc.level == "nation") & (fc["asof"] == a) & fc.y.between(y0, y1)].set_index("y")["yield"]
    e = (f - nat["yield"]).dropna()
    return {"mae": float(e.abs().mean()), "err": {int(y): round(float(v), 1) for y, v in e.items()}}

print("=== 시점별: 2026 성적 | 2013~2025 평균 (kg/10a)")
print(f"{'시점':<7}{'전국 오차 2026':>14}{'전국 MAE 13~25':>16}{'8도 RMSE 2026':>15}{'13~25':>8}{'시군 RMSE 2026':>16}{'13~25':>8}{'시군 skill 2026':>16}{'13~25':>8}{'순위r 2026':>11}")
rows = {}
for a in asofs:
    n26, nh = nation(2026, 2026, a), nation(2013, 2025, a)
    d26, dh = sido(2026, 2026, a), sido(2013, 2025, a)
    g26, gh = sigun(2026, 2026, a), sigun(2013, 2025, a)
    rows[a] = (n26, nh, d26, dh, g26, gh)
    print(f"{a:<7}{n26['err'].get(2026, float('nan')):>+14.1f}{nh['mae']:>16.2f}{d26['rmse']:>15.2f}{dh['rmse']:>8.2f}{g26['rmse']:>16.2f}{gh['rmse']:>8.2f}{1 - g26['rmse'] / g26['base']:>+16.3f}{1 - gh['rmse'] / gh['base']:>+8.3f}{g26['rank']:>11.3f}")
g26 = rows["1010"][4]; d26 = rows["1010"][2]
print(f"평년    {nat.loc[2026, 'base'] - nat.loc[2026, 'yield']:>+14.1f}{'':>16}{d26['base']:>15.2f}{rows['1010'][3]['base']:>8.2f}{g26['base']:>16.2f}{rows['1010'][5]['base']:>8.2f}")
if stat:
    m = sd[(sd.y == 2026) & sd.sc.isin(PROV)].copy(); m["pred"] = m.sc.map(stat); m = m.dropna(subset=["pred"])
    print(f"국가데이터처 10월 예상(시도)  8도 RMSE 2026 {rm(m.pred - m['yield'], m.area):.2f}  · 시도별 오차 " + ", ".join(f"{c} {p - y:+.1f}" for c, p, y in zip(m.sc, m.pred, m["yield"])))

print("\n=== 2026 시도별 오차(예측 − 확정, kg) — 8도")
f = fc[(fc.level == "sido") & (fc.y == 2026) & fc.sc.isin(PROV)]
piv = f.pivot_table(index="sc", columns="asof", values="yield").reset_index().merge(sd[sd.y == 2026][["sc", "yield", "base"]], on="sc")
NAME = {"31": "경기", "32": "강원", "33": "충북", "34": "충남", "35": "전북", "36": "전남", "37": "경북", "38": "경남"}
for _, r in piv.iterrows():
    print(f"{r.sc} {NAME[r.sc]:<4} 확정 {r['yield']:.1f} (평년 대비 {100 * (r['yield'] / r.base - 1):+.1f}%) | " + " ".join(f"{a} {r[a] - r['yield']:+.1f}" for a in asofs if a in piv.columns))

print("\n=== 2026 시군: 가장 크게 빗나간 10곳 (10월 8일 예측)")
f = fc[(fc.level == "sigun") & (fc["asof"] == "1010") & (fc.y == 2026)].rename(columns={"yield": "pred"})
m = tg[tg.y == 2026].merge(f[["sc", "name", "pred", "y_lo", "y_hi"]], on=["sc", "name"]).dropna(subset=["pred", "yield"])
m["err"] = m.pred - m["yield"]
for _, r in m.reindex(m.err.abs().sort_values(ascending=False).index).head(10).iterrows():
    print(f"  {r.sc} {r['name']:<6} 예측 {r.pred:.0f} 확정 {r['yield']:.0f} ({r.err:+.0f}) 평년 {r.base:.0f} 면적 {r.area:.0f}ha")
inr = ((m["yield"] >= m.y_lo) & (m["yield"] <= m.y_hi)).mean() if m.y_lo.notna().any() else float("nan")
print(f"80% 범위 안에 든 시군 비율: {100 * inr:.0f}% ({len(m)}곳)")

print("\n=== 해마다 전국 오차(예측 − 확정, kg): 기상만 쓴 시점과 국가데이터처 반영 시점")
for a in ("0915", "1001", "1010"):
    e = rows[a][1]["err"]; e.update(rows[a][0]["err"])
    print(a, " ".join(f"{str(y)[2:]}:{v:+.0f}" for y, v in sorted(e.items())), f"| 최근 5년 평균 {np.mean([v for y, v in e.items() if y >= 2022]):+.1f} · 그 전 {np.mean([v for y, v in e.items() if y < 2022]):+.1f}")
print("\n=== 해마다 8도 RMSE(9/15): 모델 vs 평년")
f = fc[(fc.level == "sido") & (fc["asof"] == "0915") & fc.sc.isin(PROV)].rename(columns={"yield": "pred"})
m = sd.merge(f[["y", "sc", "pred"]], on=["y", "sc"]).dropna(subset=["pred", "yield", "base"])
print(" ".join(f"{str(y)[2:]}:{rm(g.pred - g['yield'], g.area):.0f}/{rm(g.base - g['yield'], g.area):.0f}" for y, g in m.groupby("y")))
print("모델이 평년보다 나빴던 해:", [int(y) for y, g in m.groupby("y") if rm(g.pred - g["yield"], g.area) > rm(g.base - g["yield"], g.area)])
