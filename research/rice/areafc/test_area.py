"""벼 재배면적 변화를 쌀값 · 직불 예산 · 전년 생산량으로 미리 맞출 수 있나 (11-13 사용자 제안: "면적을 모르는 구간에 산지가격 · 직불금 예산 · 생산량 자료").

배경: 7/31 · 8/15 시점은 재배면적 조사(8월 말) 전이라 작년 면적을 그대로 쓴다(+1.7% 치우침). 시군 면적은 모든 시점에서 '작년 × 시도 증감' 어림(오차 4.5%).
(결과 보기 전 고정)
A. 전국 · 8도 면적 변화 d_t = log(A_t/A_{t−1}), 7월 말까지 아는 정보만:
   tr3   직전 3년 평균 변화(지금 제안된 기준선)
   pq4   쌀 농가판매가격지수(미곡) 수확기(4분기) 전년 대비: log P_Q4(t−1) − log P_Q4(t−2)
   pq4b  한 해 더 앞: log P_Q4(t−2) − log P_Q4(t−3)
   rel   상대가격 log(미곡/총지수) Q4(t−1) − 그 앞 3년 Q4 평균
   pq1   모내기 직전: log P_Q1(t) − log P_Q1(t−1)
   dprod 전년 생산량 변화 log(Q_{t−1}/Q_{t−2}),  ya 전년 단수 편차(평년 대비)
   모형: d ~ 1 + tr3 + x (OLS, 그 해 전 자료만; 학습 시작 1990 주 · 2005(양정개혁 뒤) 참고). 평가 2013~2026(14년).
   채택: 전국 면적 %RMSE가 '추세3'보다 0.1%p 이상 낮고 14년 중 8년 이상 나음. 8도는 전국 예측을 똑같이 적용해 RMSE 비교.
B. 시군 면적(모든 시점): r = 시군 변화 − 시도 변화. 특징: 전략작물직불(논이모작 · 논활용 포함) 예산현액 변화 / 작년 논벼 면적(백만원/ha),
   전년 시군 단수 편차, 전년 r. 직불 예산은 지방재정365 2020~ → 변화는 2021~2026. 그 해 전 자료로만 맞춰 2023~2026 평가(면적 가중 %RMSE), 기준 = 0(지금 방식).
   주의: 지난 해 예산현액은 12/31 값(추경 포함)이라 7월에 아는 값보다 좋다 → 상한. 채택: 4년 합쳐 0.1%p 이상 낮음.
사용: .venv/bin/python research/rice/areafc/test_area.py
"""
import json, os, sys
import numpy as np, pandas as pd
HERE = os.path.dirname(os.path.abspath(__file__)); R = os.path.dirname(HERE); ROOT = os.path.dirname(os.path.dirname(R))
sys.path.insert(0, R)
import common as C
P8 = ["31", "32", "33", "34", "35", "36", "37", "38"]
rms = lambda e, w=None: 100 * float(np.sqrt(np.average(np.asarray(e, float) ** 2, weights=w)))  # noqa: E731

# ---------- 자료 ----------
k = pd.read_csv(os.path.join(ROOT, "db/raw/kosis_rice/dt_1et0034.csv"), dtype={"code": str})
k = k.pivot_table(index=["year", "code"], columns="item", values="value").reset_index().rename(
    columns={"year": "y", "code": "sc", "재배면적": "area", "생산량": "prod", "10a당 생산량": "yield"})
s = k[k.sc.str.len() == 2].sort_values("y").copy(); g = s.groupby("sc")
s["d"] = np.log(s.area / g.area.shift(1)); s["dprod"] = g["prod"].transform(lambda x: np.log(x / x.shift(1)).shift(1))
s["ya"] = g["yield"].transform(lambda x: (x / C._olympic(x) - 1).shift(1))
nat = s[s.sc == "00"].set_index("y")
nat["tr3"] = nat.d.shift(1).rolling(3).mean()
p = pd.read_csv(os.path.join(HERE, "data/farm_price_index_q.csv"), dtype={"q": str}); p = p[p.itm == "농가판매가격지수"]
def chain(item):
    a = p[(p.tbl == "DT_1J50") & (p.item == item)].set_index("q").v; b = p[(p.tbl == "DT_1J60") & (p.item == item)].set_index("q").v
    ov = a.index.intersection(b.index); a = a * (b[ov].mean() / a[ov].mean())
    return pd.concat([a[a.index < b.index.min()], b]).sort_index()
rice, tot = chain("미곡"), chain("총지수")
q = lambda ser, y, n: ser.get(f"{y}0{n}", np.nan)  # noqa: E731
for y in nat.index:
    nat.loc[y, "pq4"] = np.log(q(rice, y - 1, 4) / q(rice, y - 2, 4))
    nat.loc[y, "pq4b"] = np.log(q(rice, y - 2, 4) / q(rice, y - 3, 4))
    nat.loc[y, "pq1"] = np.log(q(rice, y, 1) / q(rice, y - 1, 1))
    rl = lambda yy: np.log(q(rice, yy, 4) / q(tot, yy, 4))  # noqa: E731
    nat.loc[y, "rel"] = rl(y - 1) - np.mean([rl(y - 2), rl(y - 3), rl(y - 4)])
print("쌀 농가판매가격지수(미곡) 이은 기간", rice.index.min(), "~", rice.index.max())

# ---------- A. 전국 · 8도 ----------
EV = range(2013, 2027)
print("\n=== A-0. 면적 변화와 변수의 상관(전국) — 1990~2026 / 2005~2026 / 2013~2026")
for c in ["tr3", "pq4", "pq4b", "pq1", "rel", "dprod", "ya"]:
    print(f"  {c:<6}" + " · ".join(f"{nat[nat.index >= y0][['d', c]].corr().iloc[0, 1]:+.2f}" for y0 in (1990, 2005, 2013))
          + "   (추세3을 뺀 나머지와: " + " · ".join(f"{(nat.d - nat.tr3)[nat.index >= y0].corr(nat[c][nat.index >= y0]):+.2f}" for y0 in (1990, 2005, 2013)) + ")")
def rt(cols, start):
    out = {}
    for Y in EV:
        tr = nat[(nat.index >= start) & (nat.index < Y)].dropna(subset=["d"] + cols)
        X = np.c_[np.ones(len(tr)), tr[cols].values]; b = np.linalg.lstsq(X, tr.d.values, rcond=None)[0]
        out[Y] = float(np.r_[1, nat.loc[Y, cols].values.astype(float)] @ b)
    return pd.Series(out)
act = nat.d[list(EV)]
cands = {"작년 그대로": act * 0, "추세3": nat.tr3[list(EV)]}
for start in (1990, 2005):
    for nm, cols in {"tr3+pq4": ["tr3", "pq4"], "tr3+pq4+pq4b": ["tr3", "pq4", "pq4b"], "tr3+pq1": ["tr3", "pq1"], "tr3+rel": ["tr3", "rel"],
                     "tr3+dprod": ["tr3", "dprod"], "tr3+ya": ["tr3", "ya"], "tr3+pq4+dprod": ["tr3", "pq4", "dprod"], "pq4+rel+dprod(추세 없이)": ["pq4", "rel", "dprod"]}.items():
        cands[f"{nm} [{start}~]"] = rt(cols, start)
sd = s[s.sc.isin(P8) & s.y.isin(list(EV))]
print("\n=== A-1. 면적 예측 오차 %RMSE (2013~2026) | 전국 · 8도(전국 예측을 그대로 적용) · 추세3보다 나은 해")
base = (cands["추세3"] - act).abs()
for nm, pr in cands.items():
    e = pr - act
    es = sd.y.map(pr) - sd.d
    print(f"  {nm:<34} 전국 {rms(e):.2f} (편향 {100 * e.mean():+.2f}) · 8도 {rms(es, sd.area):.2f} · {int((e.abs() < base - 1e-12).sum())}/14")
best = min((n for n in cands if n not in ("작년 그대로", "추세3")), key=lambda n: rms(cands[n] - act))
print("  가장 나은 후보:", best, "| 해마다 오차 %:", {int(y): round(100 * v, 1) for y, v in (cands[best] - act).items()})
print("  추세3 해마다 오차 %:", {int(y): round(100 * v, 1) for y, v in (cands["추세3"] - act).items()})

# ---------- B. 시군 ----------
t = C.targets().sort_values("y"); gg = t.groupby(["sc", "stem"])
t["a1"] = gg.area.shift(1); t["d"] = np.log(t.area / t.a1); t["ya1"] = gg.a.shift(1)
t = t.merge(s[["y", "sc", "d", "ya"]].rename(columns={"d": "ds", "ya": "ya_s"}), on=["y", "sc"], how="left")
t["r"] = t.d - t.ds; t["r1"] = t.groupby(["sc", "stem"]).r.shift(1); t["yrel1"] = t.ya1 - t.ya_s
js = open(os.path.join(ROOT, "data/jikbul.js"), encoding="utf-8").read(); J = json.loads(js[js.index("{"):js.rindex("}") + 1])
ci = J["cats"].index("전략작물"); rows = []
for key, per in J["regions"].items():
    if "|" not in key:  # 시도 · 전국 합계 줄
        continue
    sc, name = key.split("|")
    for pi, pinfo in enumerate(J["periods"]):
        rows.append({"sc": sc, "name": name, "y": pinfo["y"], "jb": per[pi][ci][0]})
jb = pd.DataFrame(rows).sort_values("y"); jb["jb1"] = jb.groupby(["sc", "name"]).jb.shift(1)
t = t.merge(jb, on=["sc", "name", "y"], how="left")
t["djb"] = (t.jb - t.jb1) / t.a1; t["ljb"] = t.jb / t.a1
B = t[t.y.between(2021, 2026) & (t.a1 >= 500)].dropna(subset=["r"]).copy()
print(f"\n=== B. 시군 면적(작년 500ha 이상) 2021~2026 n={len(B)} · 직불 예산 있는 행 {int(B.djb.notna().sum())}")
print("  전략작물 예산(백만원/ha) 해마다 중앙값:", B.groupby("y").ljb.median().round(3).to_dict())
for c in ["djb", "ljb", "yrel1", "r1"]:
    v = B.dropna(subset=[c])
    print(f"  r(시군 상대 변화, {c}) 전체 {v.r.corr(v[c]):+.3f} · 해마다 " + " ".join(f"{y}:{gq.r.corr(gq[c]):+.2f}" for y, gq in v.groupby("y")))
print("  실시간(그 해 전 자료로 계수) 2023~2026 면적 가중 %RMSE — 기준(지금 방식) vs 후보")
for nm, cols in {"직불 변화": ["djb"], "직불 수준": ["ljb"], "직불 변화+수준": ["djb", "ljb"], "전년 단수 편차": ["yrel1"], "전년 상대 변화": ["r1"], "직불 변화+전년 단수": ["djb", "yrel1"]}.items():
    e0, e1, ww, yy = [], [], [], []
    for Y in range(2023, 2027):
        tr = B[B.y < Y].dropna(subset=cols); te = B[B.y == Y].dropna(subset=cols)
        X = np.c_[np.ones(len(tr)), tr[cols].values]; W = np.sqrt(tr.a1.values)
        b = np.linalg.lstsq(X * W[:, None], tr.r.values * W, rcond=None)[0]
        pr = np.c_[np.ones(len(te)), te[cols].values] @ b
        e0 += list(-te.r.values); e1 += list(pr - te.r.values); ww += list(te.a1.values); yy += [Y] * len(te)
    e0, e1, ww, yy = map(np.array, (e0, e1, ww, yy))
    print(f"    {nm:<16} {rms(e0, ww):.2f} → {rms(e1, ww):.2f} | 해마다 " + " ".join(f"{Y}:{rms(e0[yy == Y], ww[yy == Y]):.1f}→{rms(e1[yy == Y], ww[yy == Y]):.1f}" for Y in range(2023, 2027)))
