"""S2(+S1, 기상) 시군 특징 → 평년 대비 편차 a 예측. 실시간(expanding) 능선회귀. results.json"""
import json, os, sys
import numpy as np, pandas as pd
sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import common
OUT = os.path.dirname(os.path.abspath(__file__))
FIRST = 2017


def load(asof, s1=True):
    f = pd.read_csv(f"{OUT}/feats_s2.csv", dtype={"sc": str})
    f = f[f["asof"].astype(str).str.zfill(4) == asof].drop(columns=["asof"])
    if s1 and os.path.exists(f"{OUT}/feats_s1.csv"):
        g = pd.read_csv(f"{OUT}/feats_s1.csv", dtype={"sc": str})
        g = g[g["asof"].astype(str).str.zfill(4) == asof].drop(columns=["asof"])
        f = f.merge(g, on=["sc", "stem", "y"], how="left")
    w = pd.read_csv(f"{OUT}/weather_sigun.csv", dtype={"sc": str})
    w["sc"] = w.sc.str.zfill(2)
    f = f.merge(w.drop(columns=["stn"]), on=["sc", "stem", "y"], how="left")
    t = common.targets().sort_values("y")
    g = t.groupby(["sc", "stem"]).a
    t["a_prev"] = g.shift(1)  # 직전 해 확정 단수 기준 편차 (전년 12월 공표 → 실시간 사용 가능)
    t["a_prev2"] = g.transform(lambda s: s.shift(1).rolling(2, min_periods=1).mean())
    t["a_prev3"] = g.transform(lambda s: s.shift(1).rolling(3, min_periods=1).mean())
    d = t.merge(f, on=["sc", "stem", "y"], how="inner")
    return d


def transform(d, cols):
    """특징 변환: 원값 x, 같은 해 시군 평균 대비 xc, 그 시군 직전 해들 평균 대비 xo (모두 위성/기상 값만 사용 → 실시간 가능)"""
    d = d.sort_values("y").copy()
    for c in cols:
        d[c + "_c"] = d[c] - d.groupby("y")[c].transform("mean")
        prev = d.groupby(["sc", "stem"])[c].transform(lambda s: s.shift(1).expanding().mean())
        d[c + "_o"] = d[c] - prev
        d[c + "_oc"] = d[c + "_o"] - d.groupby("y")[c + "_o"].transform("mean")
    return d


def ridge_fit(X, y, lam):
    mu, sd = np.nanmean(X, 0), np.nanstd(X, 0) + 1e-9
    Z = np.nan_to_num((X - mu) / sd)
    ym = y.mean()
    n, p = Z.shape
    b = np.linalg.solve(Z.T @ Z + lam * n * np.eye(p), Z.T @ (y - ym))
    return lambda Xn: ym + np.nan_to_num((Xn - mu) / sd) @ b, b


LAMS = [0.01, 0.03, 0.1, 0.3, 1, 3, 10]


def choose_lam(tr, cols, tgt):
    yrs = sorted(tr.y.unique())
    if len(yrs) < 3:
        return 1.0
    best, bl = 1e9, 1.0
    for lam in LAMS:
        err = []
        for v in yrs[1:]:  # 안쪽도 시간 순(expanding)
            a, b = tr[tr.y < v], tr[tr.y == v]
            f, _ = ridge_fit(a[cols].values, a[tgt].values, lam)
            err.append(np.mean((f(b[cols].values) - b[tgt].values) ** 2))
        e = np.mean(err)
        if e < best:
            best, bl = e, lam
    return bl


def realtime(d, cols, years, mode="full", lam=None, loyo=False):
    """mode full: a 자체를 예측. cs: 같은 해 평균을 뺀 a를 예측하고 수준은 과거 a 평균(=0 근방)."""
    preds = []
    d = d.dropna(subset=["a"])
    for y in years:
        tr = d[(d.y != y) if loyo else (d.y < y)].copy()
        te = d[d.y == y].copy()
        if tr.y.nunique() < 1 or te.empty:
            continue
        keep = [c for c in cols if tr[c].notna().mean() > 0.3 and te[c].notna().mean() > 0.3]
        if not keep:
            continue
        tgt = "a"
        if mode == "cs":
            tr["a_cs"] = tr.a - tr.groupby("y").a.transform("mean")
            tgt = "a_cs"
        l = lam if lam is not None else choose_lam(tr, keep, tgt)
        f, b = ridge_fit(tr[keep].values, tr[tgt].values, l)
        ah = f(te[keep].values)
        if mode == "cs":
            ah = ah - ah.mean() + tr.groupby("y").a.mean().mean()  # 같은 해 순위만 쓰고 수준은 과거 평균
        te["pred_yield"] = te.base * (1 + ah)
        preds.append(te[["y", "sc", "stem", "pred_yield"]])
    return pd.concat(preds) if preds else None


def diag(d, cols):
    """서술용: 해마다 시군 사이 순위상관(특징 xc vs a) 평균. (모형 선택에 쓰지 않음)"""
    out = {}
    for c in cols:
        rs = []
        for y, g in d.groupby("y"):
            g = g.dropna(subset=[c, "a"])
            if len(g) >= 20:
                rs.append(g[c].rank().corr(g.a.rank()))
        if rs:
            out[c] = (round(float(np.mean(rs)), 3), round(float(np.mean(np.sign(rs))), 2), len(rs))
    return out


def long_level(y, units, span=10):
    """같은 시군들의 직전 span년 a 평균 (정답 이력만 → 실시간 가능). 평년의 평균 치우침 보정용."""
    t = common.targets()
    t = t.merge(units, on=["sc", "stem"])
    g = t[(t.y < y) & (t.y >= y - span)].dropna(subset=["a"])
    return float(np.average(g.a, weights=g.area)) if len(g) else 0.0


_WCACHE = {}


def weather_model(units, cols, years, lam=None, first=2010):
    k = (tuple(sorted(map(tuple, units.values.tolist()))), tuple(cols), tuple(years), lam, first)
    if k not in _WCACHE:
        _WCACHE[k] = _weather_model(units, cols, years, lam, first)
    return _WCACHE[k].copy()


def _weather_model(units, cols, years, lam=None, first=2010):
    """기상만, 긴 이력(2010~y-1) 학습. 반환: 예측 a (y, sc, stem, a_w)."""
    w = pd.read_csv(f"{OUT}/weather_sigun.csv", dtype={"sc": str})
    w["sc"] = w.sc.str.zfill(2)
    t = common.targets().sort_values("y")
    g = t.groupby(["sc", "stem"]).a
    t["a_prev"] = g.shift(1)
    t["a_prev2"] = g.transform(lambda s: s.shift(1).rolling(2, min_periods=1).mean())
    t["a_prev3"] = g.transform(lambda s: s.shift(1).rolling(3, min_periods=1).mean())
    t = t.merge(units, on=["sc", "stem"])
    d = t.merge(w, on=["sc", "stem", "y"]).dropna(subset=["a"] + cols)
    out = []
    for y in years:
        tr, te = d[(d.y < y) & (d.y >= first)], d[d.y == y].copy()
        if te.empty:
            continue
        l = lam if lam is not None else choose_lam(tr, cols, "a")
        f, b = ridge_fit(tr[cols].values, tr.a.values, l)
        te["a_w"] = f(te[cols].values)
        out.append(te[["y", "sc", "stem", "a_w"]])
    return pd.concat(out)


def hybrid(d, cs_cols, wcols, years, loyo=False, lam=None, level=False):
    """기상(긴 이력) 예측 + 위성 같은-해 편차(xc)로 시군 사이 잔차 보정. 위성 부분은 같은 해 평균 0으로 맞춤(순위만)."""
    units = d[["sc", "stem"]].drop_duplicates()
    if wcols:
        wp = weather_model(units, wcols, years)
        d = d.merge(wp, on=["y", "sc", "stem"], how="left")
        # 학습 연도의 기상 예측도 필요 (잔차용): 각 해 실시간 예측을 그대로 사용
        allw = weather_model(units, wcols, sorted(d.y.unique()))
        d = d.drop(columns=["a_w"]).merge(allw, on=["y", "sc", "stem"], how="left")
    else:
        d = d.copy()
        d["a_w"] = np.nan
    preds = []
    for y in years:
        lvl = long_level(y, units) if level else 0.0
        d["base_a"] = d.a_w.fillna(lvl) if wcols else lvl
        tr = d[((d.y != y) if loyo else (d.y < y))].dropna(subset=["a"]).copy()
        te = d[d.y == y].copy()
        if te.empty:
            continue
        ah = te.base_a.values.copy()
        keep = [c for c in cs_cols if len(tr) and tr[c].notna().mean() > 0.3 and te[c].notna().mean() > 0.3]
        if keep and tr.y.nunique() >= 1:
            r = tr.a - tr.base_a
            tr["r_cs"] = r - r.groupby(tr.y).transform("mean")
            l = lam if lam is not None else choose_lam(tr, keep, "r_cs")
            f, b = ridge_fit(tr[keep].values, tr.r_cs.values, l)
            adj = f(te[keep].values)
            ah = ah + (adj - adj.mean())
        te["pred_yield"] = te.base * (1 + ah)
        preds.append(te[["y", "sc", "stem", "pred_yield"]])
    return pd.concat(preds) if preds else None
