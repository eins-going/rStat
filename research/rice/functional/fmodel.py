"""기능적(functional) 기상 모델 — 출수 정렬 5일 구간 곡선에서 민감 시기를 자료가 찾게 한다.

사전 등록 (11-09 04:25, 결과 보기 전에 적음)
입력: curves.py → 8도(31~38) 연도별 6변수×20구간=120 편차(그해 − 직전 5년 평균). 9/15·10/1 이후 날 편차 0.
목표: 시도 a = 단수/올림픽 평년 − 1 (cropmodel M.sido_targets).
실시간: Y년 예측은 y<Y 해의 'full' 곡선(8도, 1988~)으로 학습, Y년 as-of 곡선에 적용. 시도 â → 시군 = 시군 평년×(1+â) (M.to_sigun, 광역시는 자기 sc 곡선).
가중: M4와 같게 √(면적/평균) × 0.5^((최근해−y)/8), 절편 = 가중 평균(벌점 없음, M4 'cw'와 같은 역할).
표준화: 변수마다 20구간 공통 가중 표준편차(구간 간 계수 크기가 원래 단위 비례 → 평활 벌점이 의미 있음).
(a) PLS1(가중 NIPALS) 성분 k ∈ {1,2,3,4}.
(b) 평활 릿지: min Σw(a−c−Zβ)² + λr‖β‖² + λs Σ_변수‖D²β_v‖² (구간 2차 차분), λr ∈ {1,10,100}, λs ∈ {0,10,100,1000,10000}.
하이퍼파라미터 실시간 선택(내부 시계열 CV): 모든 후보의 1년 앞 예측을 1993~ 해마다 만들고(그해 이전만 학습),
  Y년에는 1993~Y−1 해 8도 면적가중 제곱오차 합이 가장 작은 후보. 평가 1996~2025.
(c) 쌓기: â = w·M4 + (1−w)·F, w ∈ {0,0.05,…,1}를 1996~Y−1 해의 (같은 as-of) 표본 밖 예측으로 맞춤(5해 미만이면 w=1). F = (b) 실시간 선택, 보조로 (a).
보고: 9/15·10/1 시군 skill·순위r·전국 RMSE·2020 (common.evaluate 2013~2025), 8도 합 skill 1996–2004/2005–12/2013–25.
고정 후보 각각도 보고하되 사후(oracle)로 표시. 판정(미리): 9/15 시군 skill이 M4 +0.305보다 높고 8도 합 3기간 중 2개 이상에서 M4 이상일 때만 채택 후보.
"""
import os, sys, json
import numpy as np, pandas as pd
R = "/home/eins/project/rStat/research/rice"; sys.path[:0] = [R, f"{R}/cropmodel"]
os.environ.setdefault("PHENO", "fixed")
import common as C, model as M
from curves import VARS, NB

COLS = [f"{v}_{b:02d}" for v in VARS for b in range(NB)]
cur = pd.read_pickle(f"{R}/functional/curves_sido.pkl")
cur = cur[cur.y >= 1988]
st = M.sido_targets()
full = st.merge(cur[cur["asof"] == "full"].drop(columns="asof"), on=["sc", "y"])
TEST = {a: cur[cur["asof"] == a].drop(columns="asof") for a in ("0915", "1001")}
D2 = np.diff(np.eye(NB), 2, axis=0); PEN = np.kron(np.eye(len(VARS)), D2.T @ D2)
PLS_K = [1, 2, 3, 4]
RID = [(lr, ls) for lr in (1.0, 10.0, 100.0) for ls in (0.0, 10.0, 100.0, 1000.0, 10000.0)]


def prepare(tr):
    X, y = tr[COLS].values, tr.a.values
    w = np.sqrt(tr.area.values / tr.area.mean()) * 0.5 ** ((tr.y.max() - tr.y.values) / 8.0)
    w = w / w.mean()
    mu = np.average(X, axis=0, weights=w)
    Xc = X - mu
    sd = np.repeat([np.sqrt(np.average(Xc[:, i * NB:(i + 1) * NB] ** 2, weights=w[:, None] * np.ones((1, NB)))) + 1e-9
                    for i in range(len(VARS))], NB)
    c = np.average(y, weights=w)
    return Xc / sd, y - c, w, mu, sd, c


def fit_pls(Z, yc, w, kmax):
    """가중 PLS1 NIPALS → k=1..kmax 회귀계수(표준화 공간) 목록."""
    sw = np.sqrt(w)[:, None]
    X, yv = Z * sw, yc * sw[:, 0]
    W, P, Q, betas = [], [], [], []
    for _ in range(kmax):
        wk = X.T @ yv; wk /= np.linalg.norm(wk) + 1e-12
        t = X @ wk; tt = t @ t
        p = X.T @ t / tt; q = yv @ t / tt
        X = X - np.outer(t, p); yv = yv - q * t
        W.append(wk); P.append(p); Q.append(q)
        Wm, Pm = np.array(W).T, np.array(P).T
        betas.append(Wm @ np.linalg.solve(Pm.T @ Wm, np.array(Q)))
    return betas


def fit_ridge(Z, yc, w, lr, ls):
    G = Z.T @ (Z * w[:, None])
    return np.linalg.solve(G + lr * np.eye(Z.shape[1]) + ls * PEN, Z.T @ (w * yc))


def one_step(asof, years=range(1993, 2026)):
    """모든 후보의 1년 앞 예측. 반환 {cand: DataFrame[sc,y,ahat]}, {cand: {Y: 원 단위 계수}}"""
    P = {}; B = {}
    for Y in years:
        tr = full[full.sc.isin(M.PROV) & (full.y < Y)].dropna(subset=COLS + ["a"])
        te = TEST[asof][TEST[asof].y == Y]
        if len(tr) < 40 or te.empty:
            continue
        Z, yc, w, mu, sd, c = prepare(tr)
        Zt = (te[COLS].values - mu) / sd
        cands = {f"PLS{k}": b for k, b in zip(PLS_K, fit_pls(Z, yc, w, max(PLS_K)))}
        for lr, ls in RID:
            cands[f"R{lr:g}_S{ls:g}"] = fit_ridge(Z, yc, w, lr, ls)
        for k, b in cands.items():
            P.setdefault(k, []).append(pd.DataFrame({"sc": te.sc.values, "y": Y, "ahat": c + Zt @ b}))
            B.setdefault(k, {})[Y] = (b / sd, c)
    return {k: pd.concat(v, ignore_index=True) for k, v in P.items()}, B


STP = st[st.sc.isin(M.PROV)][["sc", "y", "a", "area"]]


def sse(p, lo, hi):
    e = p.merge(STP, on=["sc", "y"]); e = e[(e.y >= lo) & (e.y <= hi)]
    return float((e.area * (e.ahat - e.a) ** 2).sum())


def realtime_select(P, cands, years=range(1996, 2026), lo=1993):
    out, sel = [], []
    for Y in years:
        k = min(cands, key=lambda k: sse(P[k], lo, Y - 1)); sel.append((Y, k))
        out.append(P[k][P[k].y == Y])
    return pd.concat(out, ignore_index=True), sel


def stack(pa, pb, years=range(1996, 2026)):
    """â = w·pa + (1−w)·pb, w는 1996~Y−1 표본 밖 예측으로."""
    m = pa.merge(pb, on=["sc", "y"], suffixes=("_a", "_b"))
    e = m.merge(STP, on=["sc", "y"])
    out, ws = [], []
    for Y in years:
        h = e[(e.y >= 1996) & (e.y < Y)]
        if h.y.nunique() < 5:
            w = 1.0
        else:
            grid = np.linspace(0, 1, 21)
            w = float(grid[np.argmin([(h.area * (g * h.ahat_a + (1 - g) * h.ahat_b - h.a) ** 2).sum() for g in grid])])
        ws.append((Y, w))
        q = m[m.y == Y]
        out.append(pd.DataFrame({"sc": q.sc, "y": Y, "ahat": w * q.ahat_a + (1 - w) * q.ahat_b}))
    return pd.concat(out, ignore_index=True), ws


def score(p, label):
    sg = M.to_sigun(p, None, 0.0)
    r = C.evaluate(sg, label, verbose=False)
    e = p.merge(st[st.sc.isin(M.PROV)], on=["sc", "y"])
    e["err"] = e.area * (e.base * (1 + e.ahat) - e["yield"]); e["err0"] = e.area * (e.base - e["yield"])
    n = e.groupby("y")[["err", "err0", "area"]].sum()
    n["e"], n["e0"] = n.err / n.area, n.err0 / n.area
    def sk(lo, hi):
        q = n[(n.index >= lo) & (n.index <= hi)]
        return round(1 - np.sqrt((q.e ** 2).mean()) / np.sqrt((q.e0 ** 2).mean()), 3)
    r.update(p96=sk(1996, 2004), p05=sk(2005, 2012), p13=sk(2013, 2025))
    return r


def m4(asof):
    comp = M.prep(pd.read_csv(f"{R}/cropmodel/components_sido_fixed.csv", dtype={"sc": str, "asof": str}))
    an = M.anomalies(comp, sorted(set(M.COMP_ALL + ["sunless_pre", "sunless_post", "wind15"])))
    for tab in an.values():
        tab["rs_pre_def"] = tab["rs_pre"].clip(upper=0)
    F = ["cold_mei", "heat_ant", "rs_pre", "rs_pre_def", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "rain_hv", "wet_head"]
    p, _ = M.backtest(an, st, F, asof, icpt="cw")
    return p[["sc", "y", "ahat"]]


if __name__ == "__main__":
    res, curves_out, sels = {}, {}, {}
    fmt = lambda r: (f"시군 skill {r['skill']:+.3f} 순위r {r['rank_r']} 전국 {r['nat_rmse']} 2020 {r['nat_err_2020']} hit {r['hit_2020']}"
                     f" | 8도합 {r['p96']:+.3f} {r['p05']:+.3f} {r['p13']:+.3f}")
    for asof in ("0915", "1001"):
        P, B = one_step(asof)
        pm4 = m4(asof)
        rows = {"M4": pm4}
        rows["(a) PLS 실시간"], sa = realtime_select(P, [f"PLS{k}" for k in PLS_K])
        rows["(b) 평활릿지 실시간"], sb = realtime_select(P, [f"R{lr:g}_S{ls:g}" for lr, ls in RID])
        rows["(b0) 릿지(λs=0) 실시간"], sb0 = realtime_select(P, [f"R{lr:g}_S0" for lr in (1.0, 10.0, 100.0)])
        rows["(c) M4+평활릿지 쌓기"], wb = stack(pm4, rows["(b) 평활릿지 실시간"])
        rows["(c') M4+PLS 쌓기"], wa = stack(pm4, rows["(a) PLS 실시간"])
        sels[asof] = {"PLS": sa, "ridge": sb, "ridge0": sb0, "stack_w_ridge": wb, "stack_w_pls": wa}
        for k in P:
            rows["[사후 고정] " + k] = P[k][P[k].y >= 1996]
        res[asof] = {}
        for k, p in rows.items():
            r = score(p, k); res[asof][k] = {x: r[x] for x in ["skill", "rank_r", "nat_rmse", "nat_err_2020", "hit_2020", "p96", "p05", "p13"]}
            print(f"{asof} {k:28s} {fmt(r)}", flush=True)
        print(asof, "선택 PLS", sa[-13:], "\n선택 릿지", sb[-13:], "\n쌓기 w(릿지)", wb[-13:], "\n쌓기 w(PLS)", wa[-13:], flush=True)
        # 2025 학습(1988~2024) 계수: 선택된 후보, 원 단위 → +1 SD(학습 표본 편차) 당 %p
        for tag, kk in (("ridge", sb[-1][1]), ("pls", sa[-1][1])):
            b, c = B[kk][2025]
            tr = full[full.sc.isin(M.PROV) & (full.y < 2025)]
            sdv = {v: float(tr[[f"{v}_{i:02d}" for i in range(NB)]].values.std()) for v in VARS}
            curves_out[f"{asof}_{tag}_{kk}"] = {v: [round(float(b[j * NB + i]) * sdv[v] * 100, 3) for i in range(NB)] for j, v in enumerate(VARS)}
            curves_out[f"{asof}_{tag}_{kk}"]["_sd"] = sdv
    json.dump({"results": res, "selected": {a: {k: [list(map(str, x)) for x in v] for k, v in s.items()} for a, s in sels.items()},
               "curves_pct_per_sd_2025": curves_out}, open(f"{R}/functional/results.json", "w"), ensure_ascii=False, indent=1)
    print("bins: 구간 i = 출수 기준 [-50+5i, -46+5i]일")
    for k, cv in curves_out.items():
        print("==", k)
        for v in VARS:
            print(f"  {v:5s}", " ".join(f"{x:+.2f}" for x in cv[v]))
