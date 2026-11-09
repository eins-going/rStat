"""설계 기간(1985~2012)만: 도 사이(그해 평균을 뺀) a 차이를 기상 편차 차이가 얼마나 설명하나. 2013~ 정답은 안 봄."""
import sys, numpy as np, pandas as pd
sys.path[:0] = ["/home/eins/project/rStat/research/rice/pheno/_pylib"]
import run as R, evalx as E
fs = pd.read_pickle("feats_sido.pkl"); an = R.anomalies(fs, ["sc"]); ext = [c for c in an["full"].columns if c not in R.ID]
st = E.truth()
D = st.merge(an["full"], on=["sc", "y"]).query("sc in @E.PROV and y>=1985 and y<=2012").dropna(subset=ext + ["a"])
def dm(d, cols):
    w = d.area
    return d[cols] - d.groupby("y")[cols].transform(lambda s: np.average(s, weights=w.loc[s.index]))
X = dm(D, ext); yv = dm(D, ["a"]).a
print("도-특유 a sd(kg≈×500):", round(yv.std() * 500, 1), "n", len(D))
r = {f: np.corrcoef(X[f], yv)[0, 1] for f in ext}
print("상관 상위:", sorted(r.items(), key=lambda kv: -abs(kv[1]))[:12])
# leave-one-year-out ridge within design
for lam in [10, 30, 100, 300, 1000]:
    for feats, nm in [(R.M4, "M4"), (ext, "EXT")]:
        e, e0 = [], []
        for Y in sorted(D.y.unique()):
            tr, te = D.y != Y, D.y == Y
            Z = X[feats].values; mu, sd = Z[tr].mean(0), Z[tr].std(0) + 1e-9; Z = (Z - mu) / sd
            A = Z[tr]; b = np.linalg.solve(A.T @ A + lam * np.eye(len(feats)), A.T @ yv.values[tr])
            e += list(Z[te] @ b - yv.values[te]); e0 += list(-yv.values[te])
        print(nm, lam, "LOYO skill", round(1 - np.sqrt(np.mean(np.square(e))) / np.sqrt(np.mean(np.square(e0))), 3))
# M4 pooled coefficients applied to demeaned (what R0 does implicitly)
