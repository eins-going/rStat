"""작물모델 M4 9/15: 도별 계수를 공통 계수 쪽으로 축소(부분 풀링). 결과 보기 전 기록: λ2 ∈ {3, 10, 30, 100, ∞(=M4)} 모두 보고, 실시간 선택은 직전 해들의 1년 앞 예측 오차로.
β_p = argmin Σ w (a − c_p − Z β_p)² + λ2 ||β_p − β_pool||²,  c_p = 도 절편(최근 가중 평균 잔차, 축소 없음 대신 0으로 둠: pooled 절편 사용)."""
import os, sys
import numpy as np, pandas as pd
R = '/home/eins/project/rStat/research/rice'; sys.path[:0] = [R, f'{R}/cropmodel']
os.environ.setdefault("PHENO", "fixed")
import common as C, model as M
comp = M.prep(pd.read_csv(f"{R}/cropmodel/components_sido_fixed.csv", dtype={"sc": str, "asof": str}))
FE = sorted(set(M.COMP_ALL + ["sunless_pre", "sunless_post", "wind15"]))
an = M.anomalies(comp, FE)
for tab in an.values(): tab["rs_pre_def"] = tab["rs_pre"].clip(upper=0)
F = ["cold_mei", "heat_ant", "rs_pre", "rs_pre_def", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "rain_hv", "wet_head"]
st = M.sido_targets()
d_te = {a: st.merge(an[a], on=["sc", "y"]) for a in ("0815", "0915")}
dfull = st.merge(an["1001"], on=["sc", "y"])
LAM, HL = M.LAM, 8.0
def fit(tr, lam2):
    X, y = tr[F].values, tr.a.values; w = np.sqrt(tr.area.values / tr.area.mean()) * 0.5 ** ((tr.y.max() - tr.y.values) / HL)
    mu, sd = X.mean(0), X.std(0) + 1e-9; Z = (X - mu) / sd
    A = np.c_[np.ones(len(y)), Z]; P = LAM * np.eye(len(F) + 1); P[0, 0] = 1e-6
    b = np.linalg.solve(A.T @ (A * w[:, None]) + P, A.T @ (w * y)); c, bp = b[0], b[1:]
    out = {}
    for sc in M.PROV:
        m = tr.sc.values == sc
        if lam2 is None or m.sum() < 10: out[sc] = bp; continue
        Zs, ys, ws = Z[m], y[m] - c, w[m]
        out[sc] = np.linalg.solve(Zs.T @ (Zs * ws[:, None]) + lam2 * np.eye(len(F)), Zs.T @ (ws * ys) + lam2 * bp)
    out["_pool"] = bp
    return c, out, mu, sd
def predict(model, te):
    c, out, mu, sd = model
    Z = (te[F].values - mu) / sd
    return np.array([c + Z[i] @ out.get(s, out["_pool"]) for i, s in enumerate(te.sc.values)])
GRID = [None, 100.0, 30.0, 10.0, 3.0]
for asof in ("0815", "0915"):
    rows = {g: [] for g in GRID}; sel = []
    for Y in range(1996, 2026):
        tr = dfull[dfull.sc.isin(M.PROV) & (dfull.y >= M.START) & (dfull.y < Y)].dropna(subset=F + ["a"])
        te = d_te[asof][d_te[asof].y == Y].dropna(subset=F)
        if len(tr) < 40 or te.empty: continue
        for g in GRID:
            o = te[["sc", "y"]].copy(); o["ahat"] = predict(fit(tr, g), te); rows[g].append(o)
    P = {g: pd.concat(v) for g, v in rows.items()}
    # 실시간 선택: Y 이전 해들(1996~Y-1)의 1년 앞 예측 오차가 가장 작은 λ2 (8도, 면적 가중)
    stp = st[["sc", "y", "a", "area"]]
    E = {g: P[g].merge(stp, on=["sc", "y"]).assign(se=lambda d: d.area * (d.ahat - d.a) ** 2) for g in GRID}
    chosen = []
    for Y in range(2013, 2026):
        g = min(GRID, key=lambda g: E[g][(E[g].y < Y) & (E[g].y >= 2000)].se.sum()); sel.append((Y, g))
        chosen.append(P[g][P[g].y == Y])
    P["실시간선택"] = pd.concat(chosen + [P[None][P[None].y < 2013]])
    print(asof, "선택", sel)
    for g, p in P.items():
        sg = M.to_sigun(p, None, 0.0)
        r = C.evaluate(sg, "", verbose=False)
        e = p.merge(st, on=["sc", "y"])
        def sk(lo, hi):
            q = e[(e.y >= lo) & (e.y <= hi)]; x = q.base * (1 + q.ahat) - q["yield"]; x0 = q.base - q["yield"]
            return round(1 - np.sqrt(np.average(x ** 2, weights=q.area)) / np.sqrt(np.average(x0 ** 2, weights=q.area)), 3)
        print(f"  {asof} λ2={g}: 시군 skill {r['skill']:+.3f} 순위r {r['rank_r']} 전국 {r['nat_rmse']} 2020 {r['nat_err_2020']} | 시도 skill 96-04 {sk(1996,2004)} 05-12 {sk(2005,2012)} 13-25 {sk(2013,2025)}")
