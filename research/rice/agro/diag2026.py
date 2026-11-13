"""농업기상(217곳 전체) 재평가 보조: (1) d_rs_fill 잔차 보정의 해마다 효과, (2) 2026 시도별 잔차와 농업기상 변수.

사용: OMP_NUM_THREADS=2 memcap -m 3G .venv/bin/python research/rice/agro/diag2026.py
"""
import os, sys, warnings
import numpy as np, pandas as pd
warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__))
os.environ["EVAL_END"] = "2026"
import importlib.util  # noqa: E402
_sp = importlib.util.spec_from_file_location("agro_model", os.path.join(HERE, "model.py"))  # 작물 모델의 model.py 와 이름이 겹쳐 따로 읽는다
AM = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(AM)
B, M = AM.B, AM.M
NAME = {"31": "경기", "32": "강원", "33": "충북", "34": "충남", "35": "전북", "36": "전남", "37": "경북", "38": "경남"}
rm = lambda e, w: float(np.sqrt(np.average(np.asarray(e) ** 2, weights=w)))  # noqa: E731

comp, cs, an, an_sg = B.load()
st = M.sido_targets()
fs, fg = AM.load_feats()
for a in ("0815", "0915", "1001"):
    base = M.backtest(an, st, B.M4, a, icpt="cw", years=range(1996, 2027))[0]
    d = base.merge(st, on=["sc", "y"]).merge(fs[fs["asof"] == a], on=["sc", "y"], how="left")
    d = d[d.sc.isin(M.PROV)].copy()
    d["r"] = d.a - d.ahat; d["w"] = np.sqrt(d.area / d.area.mean())
    for feat in ("d_rs_fill", "wet_head"):
        d["adj"] = 0.0
        for Y in range(2015, 2027):
            tr = d[d.y < Y].dropna(subset=[feat, "r"])
            if tr.y.nunique() < 3: continue
            b = AM.ridge0(tr[[feat]].values, tr.r.values, tr.w.values, 10.0)
            i = d.y == Y
            d.loc[i, "adj"] = np.nan_to_num(d.loc[i, [feat]].values) @ b
        e0 = d.base * (1 + d.ahat) - d["yield"]; e1 = d.base * (1 + d.ahat + d.adj) - d["yield"]
        q = d[d.y.between(2015, 2026)]
        yr = {int(y): round(rm(e1[g.index], g.area) - rm(e0[g.index], g.area), 1) for y, g in q.groupby("y")}
        nat = lambda e: q.assign(e=e[q.index]).groupby("y").apply(lambda g: np.average(g.e, weights=g.area))  # noqa: E731
        n0, n1 = nat(e0), nat(e1)
        print(f"[{a} {feat}] 8도 RMSE 2015~26 {rm(e0[q.index], q.area):.2f} → {rm(e1[q.index], q.area):.2f} · 나아진 해 {sum(v < 0 for v in yr.values())}/12 · 전국 MAE {n0.abs().mean():.2f} → {n1.abs().mean():.2f} · 2026 전국 {n0[2026]:+.1f} → {n1[2026]:+.1f}")
        print("   해마다 Δ8도 RMSE:", yr)
        print(f"   잔차와의 상관(8도×해, 2015~26) {q[[feat, 'r']].corr().iloc[0, 1]:+.2f} · 해 평균끼리 {q.groupby('y')[[feat, 'r']].mean().corr().iloc[0, 1]:+.2f} · 같은 해 안(시도 차이) {q.assign(x=q[feat] - q.groupby('y')[feat].transform('mean'), z=q.r - q.groupby('y').r.transform('mean'))[['x', 'z']].corr().iloc[0, 1]:+.2f}")
    if a == "0915":
        g = d[d.y == 2026]
        cols = [c for c in ("d_rs_pre", "d_rs_fill", "d_t_fill", "wet_head", "wetd_head", "rs_fill_a", "np_blast_c", "np_hopper_c", "np_sheath") if c in g.columns]
        print("\n2026 시도별(9/15): 오차 kg(예측 − 확정)과 변수 — 괄호는 그 변수의 2015~25 표준편차 대비")
        sdv = d[d.y.between(2015, 2025)][cols].std()
        for _, r in g.iterrows():
            print(f"  {NAME[r.sc]} {r.base * (1 + r.ahat) - r['yield']:+6.1f} | " + " ".join(f"{c} {r[c]:+.2f}({r[c] / sdv[c]:+.1f})" for c in cols))
        print("  2026 오차와 변수의 상관(8도):", {c: round(float(np.corrcoef(g.base * (1 + g.ahat) - g['yield'], g[c])[0, 1]), 2) for c in cols})


print("\n=== d_rs_fill 보정: 시점 · λ 민감도 (8도 RMSE · 시군 skill · 전국 MAE, 2015~2026 | 괄호는 2015~2025)")
print("    사전 예상(9/1을 보기 전): 8/15의 개선(−0.44kg)이 진짜면 9/1도 −0.2kg 이상 나아야 한다.")
common = AM.common
for a in ("0815", "0901", "0915"):
    base = M.backtest(an, st, B.M4, a, icpt="cw", years=range(1996, 2027))[0]
    f = fs[fs["asof"] == a][["sc", "y", "d_rs_fill"]]
    d = base.merge(st, on=["sc", "y"]).merge(f, on=["sc", "y"], how="left")
    d = d[d.sc.isin(M.PROV)].copy(); d["r"] = d.a - d.ahat; d["w"] = np.sqrt(d.area / d.area.mean())
    sg0 = M.to_sigun(base)
    def ev(p):
        o = []
        for lo, hi in ((2015, 2026), (2015, 2025)):
            q = p.merge(st, on=["sc", "y"]); q = q[q.sc.isin(M.PROV) & q.y.between(lo, hi)]
            e = q.base * (1 + q.ahat) - q["yield"]
            nat = q.assign(e=e).groupby("y").apply(lambda g: np.average(g.e, weights=g.area))
            r = common.evaluate(M.to_sigun(p), "", years=range(lo, hi + 1), verbose=False)
            o.append((rm(e, q.area), r["skill"], float(nat.abs().mean()), r))
        return o
    b0 = ev(base[["sc", "y", "ahat"]])
    print(f"[{a}] 기준            시도 {b0[0][0]:.2f} ({b0[1][0]:.2f}) · 시군 {b0[0][1]:+.3f} ({b0[1][1]:+.3f}) · 전국 MAE {b0[0][2]:.2f} ({b0[1][2]:.2f})")
    for lam in (3.0, 10.0, 30.0, 100.0):
        p = base[["sc", "y", "ahat"]].copy(); coef = {}
        for Y in range(2015, 2027):
            tr = d[d.y < Y].dropna(subset=["d_rs_fill", "r"])
            if tr.y.nunique() < 3: continue
            b = AM.ridge0(tr[["d_rs_fill"]].values, tr.r.values, tr.w.values, lam); coef[Y] = b[0]
            te = base[base.y == Y].merge(f, on=["sc", "y"], how="left")
            p.loc[p.y == Y, "ahat"] = te.ahat.values + np.nan_to_num(te[["d_rs_fill"]].values) @ b
        b1 = ev(p)
        print(f"     λ={lam:<5g} 시도 {b1[0][0]:.2f} ({b1[1][0]:.2f}) Δ{b1[0][0] - b0[0][0]:+.2f} ({b1[1][0] - b0[1][0]:+.2f}) · 시군 {b1[0][1]:+.3f} Δ{b1[0][1] - b0[0][1]:+.3f} ({b1[1][1] - b0[1][1]:+.3f}) · 전국 MAE {b1[0][2]:.2f} ({b1[1][2]:.2f}) · 계수(100MJ당 %) {100 * 100 * coef[2018]:+.2f} → {100 * 100 * coef[2026]:+.2f}")


print("\n=== d_rs_fill 보정(λ10) 해마다: Δ8도 RMSE · Δ시군 RMSE · 전국 오차")
tt = common.targets()
for a in ("0815", "0901"):
    base = M.backtest(an, st, B.M4, a, icpt="cw", years=range(1996, 2027))[0]
    f = fs[fs["asof"] == a][["sc", "y", "d_rs_fill"]]
    d = base.merge(st, on=["sc", "y"]).merge(f, on=["sc", "y"], how="left")
    d = d[d.sc.isin(M.PROV)].copy(); d["r"] = d.a - d.ahat; d["w"] = np.sqrt(d.area / d.area.mean())
    p = base[["sc", "y", "ahat"]].copy()
    for Y in range(2015, 2027):
        tr = d[d.y < Y].dropna(subset=["d_rs_fill", "r"])
        if tr.y.nunique() < 3: continue
        b = AM.ridge0(tr[["d_rs_fill"]].values, tr.r.values, tr.w.values, 10.0)
        te = base[base.y == Y].merge(f, on=["sc", "y"], how="left")
        p.loc[p.y == Y, "ahat"] = te.ahat.values + np.nan_to_num(te[["d_rs_fill"]].values) @ b
    def yearly(pp):
        q = pp.merge(st, on=["sc", "y"]); q = q[q.sc.isin(M.PROV) & q.y.between(2015, 2026)]
        e = q.base * (1 + q.ahat) - q["yield"]
        sd_ = q.assign(e=e).groupby("y").apply(lambda g: rm(g.e, g.area)); nt = q.assign(e=e).groupby("y").apply(lambda g: np.average(g.e, weights=g.area))
        m = tt.merge(M.to_sigun(pp)[["y", "sc", "stem", "pred_yield"]], on=["y", "sc", "stem"]).dropna(subset=["pred_yield", "base", "yield"]); m = m[m.y.between(2015, 2026)]
        sg_ = m.groupby("y").apply(lambda g: rm(g.pred_yield - g["yield"], g.area))
        return sd_, sg_, nt
    s0, g0, n0 = yearly(base[["sc", "y", "ahat"]]); s1, g1, n1 = yearly(p)
    print(f"[{a}] Δ8도:", (s1 - s0).round(1).to_dict(), f"· 나아진 해 {int((s1 < s0).sum())}/12 · 최악 {float((s1 - s0).max()):+.1f}")
    print(f"       Δ시군:", (g1 - g0).round(1).to_dict(), f"· 나아진 해 {int((g1 < g0).sum())}/12 · 최악 {float((g1 - g0).max()):+.1f}")
    print(f"       전국 오차 전:", n0.round(0).astype(int).to_dict()); print(f"       전국 오차 뒤:", n1.round(0).astype(int).to_dict())
    print(f"       전국 RMSE {float(np.sqrt((n0 ** 2).mean())):.2f} → {float(np.sqrt((n1 ** 2).mean())):.2f}")
