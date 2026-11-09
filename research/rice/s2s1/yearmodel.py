"""해(연도) 수준 신호 시험: 도(시도) 또는 전국 평균 위성 특징의 '자기 직전 해들 대비' 편차로 그 도의 a를 예측 → 시군 예측 = 평년×(1+â_도).
가설 특징을 미리 정해 모두 보고(사후 선택 아님): 등숙기 엽록소(ndre_s1·cire_s1), 캐노피 수분(lswi_s1), 출수일(peak_doy), 출수 후(ndre_p10_30), 노화(sen_slope)."""
import sys, json; sys.path.insert(0, "/home/eins/project/rStat/research/rice")
from model import *
import run_eval as R
HYP = {"0915": ["ndre_s1", "cire_s1", "lswi_s1", "peak_doy", "ndre_p10_30", "ndre_a2", "lswi_a2"],
       "1001": ["ndre_s1", "cire_s1", "lswi_s1", "peak_doy", "ndre_p10_30", "sen_slope", "ndre_s2", "lswi_s2", "ndre_p30_50"]}


def agg(d, cols, level):
    key = ["y"] if level == "nat" else ["y", "sc"]
    g = d.groupby(key).apply(lambda q: pd.Series({**{c: q[c].mean() for c in cols},
                                                   "a": np.average(q.a.fillna(q.a.mean()), weights=q.area)})).reset_index()
    grp = ["sc"] if level != "nat" else []
    g = g.sort_values("y")
    for c in cols:
        prev = g.groupby(grp)[c].transform(lambda s: s.shift(1).expanding().mean()) if grp else g[c].shift(1).expanding().mean()
        g[c + "_o"] = g[c] - prev
    return g


def run(asof, cols, level, years, lam=None):
    d = load(asof, s1=False)
    g = agg(d, cols, level)
    fc = [c + "_o" for c in cols]
    preds = []
    for y in years:
        tr = g[(g.y < y)].dropna(subset=fc + ["a"], how="any")
        te = g[g.y == y]
        if tr.y.nunique() < 2 or te.empty:
            continue
        l = lam if lam is not None else choose_lam(tr, fc, "a") if tr.y.nunique() >= 3 else 1.0
        if NOINT:
            X, yv = np.nan_to_num(tr[fc].values), tr.a.values
            sd = X.std(0) + 1e-9
            Z = X / sd
            b = np.linalg.solve(Z.T @ Z + l * len(Z) * np.eye(Z.shape[1]), Z.T @ yv)
            te = te.assign(a_hat=np.nan_to_num(te[fc].values) / sd @ b)
        else:
            f, b = ridge_fit(tr[fc].values, tr.a.values, l)
            te = te.assign(a_hat=f(te[fc].values))
        key = ["y"] if level == "nat" else ["y", "sc"]
        x = d[d.y == y].merge(te[key + ["a_hat"]], on=key)
        x["pred_yield"] = x.base * (1 + x.a_hat)
        preds.append(x[["y", "sc", "stem", "pred_yield"]])
    return pd.concat(preds) if preds else None


NOINT = len(sys.argv) > 1 and sys.argv[1] == "noint"
out = []
for asof in ["0915", "1001"]:
    for level in ["nat", "sido"]:
        for yl, yrs in [("2020-2025", list(range(2020, 2026)))]:
            sets = {c: [c] for c in HYP[asof]}
            sets["모두"] = HYP[asof]
            for k, cols in sets.items():
                for lam in [None]:
                    p = run(asof, cols, level, yrs, lam)
                    if p is None:
                        continue
                    r = R.ev(p, f"{asof} {level} {k}{' 절편없음' if NOINT else ''}", yrs)
                    r.update(asof=asof, level=level, feats=k, test=yl, noint=NOINT)
                    out.append(r)
json.dump(out, open(f"{OUT}/results_year{'_noint' if NOINT else ''}.json", "w"), ensure_ascii=False, indent=1)
