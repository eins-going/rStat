"""시도 M4 실시간 잔차의 해 사이 지속(AR) 보정 — â' = â + ρ·(직전 k년 잔차 평균), ρ는 Y 이전 쌍으로만 추정(0~1로 자름)."""
import os, sys, warnings
import numpy as np, pandas as pd
warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import battery as BT
M = BT.M
for ASOF in ["0915", "1001"]:
    an, an_sg, st, base = BT.load_common(ASOF)
    sd = st[st.sc.isin(M.PROV)].merge(base, on=["sc", "y"]).sort_values(["sc", "y"]).reset_index(drop=True)
    sd["r"] = sd.a - sd.ahat
    sd["rc"] = sd.r - sd.groupby("y").r.transform("mean")   # 시도 고유 부분
    out = {}
    for k in (1, 2, 3, 5):
        for col in ("r", "rc"):
            sd["lag"] = sd.groupby("sc")[col].transform(lambda s: s.shift(1).rolling(k, min_periods=1).mean())
            p = sd.ahat.copy() * np.nan
            for Y in range(2013, 2026):
                past = sd[(sd.y < Y) & sd.lag.notna()]
                if len(past) < 16: p[sd.y == Y] = sd.ahat[sd.y == Y]; continue
                rho = np.clip(np.sum(past.lag * past[col]) / np.sum(past.lag ** 2), 0, 1)
                te = sd.y == Y
                p[te] = sd.ahat[te] + rho * sd.lag[te].fillna(0)
            for lo in (2013, 2015):
                m = sd.y.between(lo, 2025)
                e = sd.base[m] * (1 + p[m]) - sd["yield"][m]; e0 = sd.base[m] * (1 + sd.ahat[m]) - sd["yield"][m]
                out[(k, col, lo)] = (round(float(np.sqrt(np.average(e ** 2, weights=sd.area[m]))), 2), round(float(np.sqrt(np.average(e0 ** 2, weights=sd.area[m]))), 2))
    print(ASOF, "lag1 상관 r:", round(sd.groupby("sc").r.apply(lambda s: s.corr(s.shift(1))).mean(), 3), "rc:", round(sd.groupby("sc").rc.apply(lambda s: s.corr(s.shift(1))).mean(), 3))
    for kk, v in out.items(): print(" ", ASOF, kk, "후보/M4", v)

# ---- 시군으로 전파: â_시도에 k=2 지속 보정을 넣은 B0p ----
print("\n시군 skill (평년 RMSE 대비, 면적가중) — B0p vs B0p+시도지속(k=2)")
for ASOF in ["0915", "1001"]:
    an, an_sg, st, base = BT.load_common(ASOF)
    sd = st[st.sc.isin(M.PROV)].merge(base, on=["sc", "y"]).sort_values(["sc", "y"]).reset_index(drop=True)
    sd["r"] = sd.a - sd.ahat
    sd["lag"] = sd.groupby("sc").r.transform(lambda s: s.shift(1).rolling(2, min_periods=1).mean())
    adj = {}
    for Y in range(1995, 2026):
        past = sd[(sd.y < Y) & sd.lag.notna()]
        rho = np.clip(np.sum(past.lag * past.r) / np.sum(past.lag ** 2), 0, 1) if len(past) >= 16 else 0
        for _, q in sd[sd.y == Y].iterrows():
            adj[(q.sc, Y)] = rho * (0 if np.isnan(q.lag) else q.lag)
    t = BT.sigun_table(ASOF)
    t["a_base2"] = t.a_base + [adj.get((s, y), adj.get((g, y), 0.0)) for s, y, g in zip(t.sc, t.y, t.grp)]
    for lo in (2013, 2015):
        q = t[t.y.between(lo, 2025)].dropna(subset=["base", "yield", "a_base"])
        rm = lambda p: float(np.sqrt(np.average((q.base * (1 + p) - q["yield"]) ** 2, weights=q.area)))  # noqa: E731
        r0 = rm(0 * q.a_base)
        print(f"  {ASOF} {lo}~25: B0p {1 - rm(q.a_base) / r0:+.4f} → +지속 {1 - rm(q.a_base2) / r0:+.4f} (RMSE {rm(q.a_base):.2f}→{rm(q.a_base2):.2f})")
    yrs = {}
    for Y in range(2013, 2026):
        q = t[t.y == Y].dropna(subset=["base", "yield", "a_base"])
        rm = lambda p: float(np.sqrt(np.average((q.base * (1 + p) - q["yield"]) ** 2, weights=q.area)))  # noqa: E731
        yrs[Y] = round(rm(q.a_base2) - rm(q.a_base), 2)
    print("   연도별 시군 ΔRMSE", yrs, "개선 해", sum(v < 0 for v in yrs.values()), "/ 13")
