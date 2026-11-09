"""생육·기상 '곡선 모양' 시험 — 요약값 대신 출수일 기준 곡선 전체를 입력으로 (11-10 사용자 제안: 포화·결합·시계열).

곡선(출수일 H 기준 상대일 격자, 예측시점 뒤는 비움):
  S2(125시군, 2017~): ndvi, ndre, cire, wdrvi(α=0.2, 포화 덜함), splice(H−10 전 NDVI, 뒤 NDRE를 이어 붙임)
  MOD(MODIS 전 시군, 2003~): ndvi (16일 합성, 공개 지연 20일)
  AG(농업기상 131시군, 2010~): 실측 일사·기온·결로시간 5일 평균
  추가 스칼라: sen = splice 노화 속도(H+5→H+25), can = 출수기 NDRE(H−5..H+10)
편차: _o = 그 시군 이전 해 평균 곡선 대비(실시간, 2년 이상), _c = 같은 해 시군 평균 대비
모델(해마다 그 전 해로만 학습): FPCA(학습 해로만 주성분 3개)+릿지, 격자 릿지, PLS
목표: 시군 = B0p 잔차, 시도 = M4 잔차(8도, 시군 곡선 면적 가중 평균)
사용: OMP_NUM_THREADS=2 memcap -m 3G python3 curves.py build | test [0915 1001]
"""
import os
import pickle
import sys
import warnings

import numpy as np
import pandas as pd

warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__))
RICE = os.path.dirname(HERE)
sys.path.insert(0, HERE)
os.environ["ALL"] = "1"
import battery as BT  # noqa: E402
import sat_feats_s2s1 as S  # noqa: E402

sys.path.insert(0, os.path.join(RICE, "s2s1"))
import features as F  # noqa: E402

M, common = BT.M, BT.common
CUT = {"0915": 258, "1001": 274}
GRID = {"0915": np.arange(-40, 26, 5), "1001": np.arange(-40, 41, 5)}
PKL = os.path.join(HERE, "curves.pkl")


def heading():
    cs = pd.read_csv(os.path.join(RICE, "cropmodel", "components_sigun_fixed.csv.gz"), dtype={"sc": str, "asof": str},
                     usecols=["sc", "stem", "y", "asof", "heading"])
    return {a: cs[cs["asof"] == a].set_index(["sc", "stem", "y"]).heading for a in CUT}


def at(s, H, rel, cut):
    return np.array([s.get(H + r, np.nan) if H + r <= cut else np.nan for r in rel], float)


def build_s2(Hs):
    d = S.s2_rows()
    nd = d.ndvi.clip(-0.99, 0.99)
    rho = (1 + nd) / (1 - nd)
    d["wdrvi"] = (0.2 * rho - 1) / (0.2 * rho + 1)
    boxes = pd.concat([pd.read_csv(os.path.join(dd, "boxes.csv"), dtype={"sc": str}) for dd in S.DIRS])
    bmap = boxes.drop_duplicates("box").set_index("box")[["sc", "stem"]]
    out = {}
    for asof, cut in CUT.items():
        rel = GRID[asof]
        rows = []
        for (box, y), g in d.groupby(["box", "y"]):
            sc, stem = bmap.loc[box]
            H = Hs[asof].get((sc, stem, y), np.nan)
            if not np.isfinite(H):
                continue
            g = F.despike(g)
            g = g[g.doy <= cut]
            if len(g) < 3:
                continue
            cv = {c: F.curve(g, c, cut) for c in ("ndvi", "ndre", "cire", "wdrvi")}
            if any(v is None for v in cv.values()):
                continue
            a0, b0 = cv["ndvi"].get(H - 10, np.nan), cv["ndre"].get(H - 10, np.nan)
            k = a0 / b0 if np.isfinite(a0) and np.isfinite(b0) and b0 > 0.05 else np.nan
            day = cv["ndvi"].index.values
            cv["splice"] = pd.Series(np.where(day < H - 10, cv["ndvi"].values, cv["ndre"].values * k), index=day)
            o = {"sc": sc, "stem": stem, "y": y}
            for c, s in cv.items():
                o[c] = at(s, H, rel, cut)
            sp = cv["splice"]
            e = min(H + 25, cut)
            o["sen"] = (sp.get(e, np.nan) - sp.get(H + 5, np.nan)) / max(e - H - 5, 1) * 10 if e > H + 10 else np.nan
            w = cv["ndre"].loc[H - 5:min(H + 10, cut)]
            o["can"] = float(w.mean()) if w.notna().sum() >= 5 else np.nan
            rows.append(o)
        b = pd.DataFrame(rows)
        for c in ("ndvi", "ndre", "cire", "wdrvi", "splice"):
            arr = np.vstack(b[c].values)
            g = pd.DataFrame(arr, columns=[f"r{r}" for r in rel])
            g[["sc", "stem", "y"]] = b[["sc", "stem", "y"]].values
            out[(asof, "S2", c)] = g.groupby(["sc", "stem", "y"]).mean()
        out[(asof, "S2", "scal")] = b.groupby(["sc", "stem", "y"])[["sen", "can"]].mean()
        print("S2", asof, out[(asof, "S2", "ndvi")].shape, flush=True)
    return out


def build_modis(Hs):
    m = pd.read_csv(os.path.join(common.ROOT, "db/clean/rice/modis_curves.csv"))
    m = m[m.level == "sigun"].copy()
    m["sc"] = m.sido.map(common.sido_code)
    m["stem"] = m.sigun.astype(str).str[:-1]
    m.loc[m.sigun.astype(str).str.startswith("세종"), ["sc", "stem"]] = ["29", "세종"]
    out = {}
    for asof, cut in CUT.items():
        rel = GRID[asof]
        rows = []
        for (sc, stem, y), g in m.groupby(["sc", "stem", "y"]):
            H = Hs[asof].get((sc, stem, y), np.nan)
            g = g[g.doy + 20 <= cut].sort_values("doy")
            if not np.isfinite(H) or len(g) < 4:
                continue
            day = np.arange(100, cut + 1)
            s = pd.Series(np.interp(day, g.doy.values + 8, g.ndvi.values, left=np.nan, right=np.nan), index=day)
            rows.append({"sc": sc, "stem": stem, "y": y, **{f"r{r}": v for r, v in zip(rel, at(s, H, rel, cut))}})
        out[(asof, "MOD", "ndvi")] = pd.DataFrame(rows).set_index(["sc", "stem", "y"])
        print("MOD", asof, out[(asof, "MOD", "ndvi")].shape, flush=True)
    return out


def build_agro(Hs):
    import importlib.util
    spec = importlib.util.spec_from_file_location("agro_features", os.path.join(RICE, "agro", "features.py"))
    AF = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(AF)  # 농업기상 시군 일자료 (s2s1/features 와 이름 겹침 피함)
    a, _ = AF.sigun_daily()
    out = {}
    for asof, cut in CUT.items():
        h = Hs[asof].rename("H").reset_index()
        x = a.merge(h, on=["sc", "stem", "y"])
        x = x[x.doy <= cut]
        x["rel"] = x.doy - x.H
        x = x[x.rel.between(-30, 44)]
        x["bin"] = (x.rel // 5) * 5
        for v in ("rs_a", "tavg_a", "wet_a"):
            p = x.pivot_table(index=["sc", "stem", "y"], columns="bin", values=v, aggfunc="mean")
            cnt = x.pivot_table(index=["sc", "stem", "y"], columns="bin", values=v, aggfunc="count")
            p = p.where(cnt >= 3)
            p.columns = [f"r{int(c)}" for c in p.columns]
            out[(asof, "AG", v)] = p
        print("AG", asof, out[(asof, "AG", "rs_a")].shape, flush=True)
    return out


def build():
    Hs = heading()
    cur = {}
    cur.update(build_modis(Hs))
    cur.update(build_s2(Hs))
    cur.update(build_agro(Hs))
    pickle.dump(cur, open(PKL, "wb"))


# ------------------------------------------------------------------ 시험
def anomalies(X, kind):
    """X: (sc, stem, y) 색인 곡선. _o = 이전 해 평균 대비(2년 이상), _c = 같은 해 평균 대비."""
    X = X.sort_index()
    if kind == "o":
        prior = X.groupby(level=["sc", "stem"]).transform(lambda s: s.shift(1).expanding(min_periods=2).mean())
        return X - prior
    return X - X.groupby(level="y").transform("mean")


def fit_predict(mode, Xtr, ytr, wtr, Xte, yrs):
    if mode == "fpca":
        from sklearn.decomposition import PCA
        mu = Xtr.mean(0)
        k = min(3, Xtr.shape[1], len(Xtr) - 1)
        p = PCA(k).fit(Xtr - mu)
        Xtr, Xte = p.transform(Xtr - mu), p.transform(Xte - mu)
        return BT.m_ridge(Xtr, ytr, wtr, Xte, yrs)[0]
    if mode == "pls":
        return BT.MODELS["pls"](Xtr, ytr, wtr, Xte, yrs)[0]
    return BT.m_ridge(Xtr, ytr, wtr, Xte, yrs)[0]


def realtime(df, feats, ycol, basecol, test, mode):
    p = pd.Series(np.nan, index=df.index)
    for Y in test:
        tr = df[(df.y < Y)].dropna(subset=[ycol])
        te = df[df.y == Y]
        if tr.y.nunique() < 3 or te.empty:
            continue
        Xtr = np.nan_to_num(tr[feats].values.astype(float))
        Xte = np.nan_to_num(te[feats].values.astype(float))
        p[te.index] = te[basecol].values + fit_predict(mode, Xtr, tr[ycol].values, tr.w.values, Xte, tr.y.values)
    return p


def score(df, p, basecol, test):
    m = df.y.isin(test) & p.notna()
    q = df[m]
    rm = lambda v: float(np.sqrt(np.average((q.base * (1 + v) - q["yield"]) ** 2, weights=q.area)))  # noqa: E731
    yrs = {}
    for Y in test:
        z = q.y == Y
        if z.sum():
            e = lambda v: float(np.sqrt(np.average((q.base[z] * (1 + v[z]) - q["yield"][z]) ** 2, weights=q.area[z])))  # noqa: E731
            yrs[Y] = round(e(p[m]) - e(q[basecol]), 2)
    return round(rm(p[m]), 2), round(rm(q[basecol]), 2), yrs


def test(asof):
    cur = pickle.load(open(PKL, "rb"))
    t = BT.sigun_table(asof)[["sc", "stem", "y", "yield", "area", "base", "a", "a_base", "w"] + [c for c in BT.sigun_table(asof).columns if c.startswith("W_")]]
    t = t.dropna(subset=["base", "yield", "a_base", "a"]).set_index(["sc", "stem", "y"])
    t["r"] = t.a - t.a_base
    an, an_sg, st, base = BT.load_common(asof)
    sd0 = st[st.sc.isin(M.PROV)].merge(base, on=["sc", "y"]).set_index(["sc", "y"])
    sd0["r"] = sd0.a - sd0.ahat
    sd0["w"] = np.sqrt(sd0.area / sd0.area.mean())
    span = {"S2": (range(2020, 2026), 2017), "MOD": (range(2013, 2026), 2003), "AG": (range(2015, 2026), 2010)}
    sets = {}
    for (a, src, nm), X in cur.items():
        if a != asof or nm == "scal":
            continue
        for kind in ("o", "c"):
            sets[f"{src}:{nm}_{kind}"] = (src, anomalies(X, kind).add_prefix(f"{nm}_"))
    # 묶음: S2 포화 보정 묶음, 농업기상 세 곡선 함께
    for kind in ("o", "c"):
        sets[f"S2:sat3_{kind}"] = ("S2", pd.concat([sets[f"S2:{n}_{kind}"][1] for n in ("splice", "ndre", "wdrvi")], axis=1))
        sets[f"AG:all_{kind}"] = ("AG", pd.concat([sets[f"AG:{n}_{kind}"][1] for n in ("rs_a", "tavg_a", "wet_a")], axis=1))
    # ②·③ 스칼라: 노화 속도·출수기 캐노피(자기 과거 대비)와 기상 성분 곱
    sc_ = anomalies(cur[(asof, "S2", "scal")], "o")
    wx = t[["W_ptq_fill", "W_tfill", "W_sunless_post", "W_hot_fill"]]
    wz = (wx - wx.mean()) / wx.std()
    sx = sc_.join(wz, how="inner")
    for c in wz.columns:
        sx[f"can_x_{c}"] = sx.can * sx[c]
        sx[f"sen_x_{c}"] = sx.sen * sx[c]
    sets["S2:sen_can_o"] = ("S2", sc_)
    sets["S2:sen_can_x_wx"] = ("S2", sx[[c for c in sx.columns if "_x_" in c] + ["sen", "can"]])
    res = []
    for sname, (src, X) in sets.items():
        test_y, y0 = span[src]
        X = X[X.index.get_level_values("y") >= y0]
        feats = list(X.columns)
        d = t.join(X, how="inner").reset_index()
        d = d[d[feats].notna().mean(axis=1) > 0.5].reset_index(drop=True)
        # 시도: 시군 곡선 면적 가중 평균 → M4 잔차
        g = d.groupby(["sc", "y"]).apply(lambda q: pd.Series(np.average(np.nan_to_num(q[feats].values), axis=0, weights=q.area), index=feats))
        sd = sd0.join(g, how="inner").reset_index()
        modes = ["fpca", "ridge", "pls"] if not sname.startswith("S2:sen") else ["ridge", "pls"]
        for mode in modes:
            p = realtime(d, feats, "r", "a_base", test_y, mode)
            r1, r0, yrs = score(d, p, "a_base", test_y)
            ps = realtime(sd, feats, "r", "ahat", test_y, mode)
            s1, s0, syrs = score(sd, ps, "ahat", test_y)
            res.append({"set": sname, "mode": mode, "n_sg": d[["sc", "stem"]].drop_duplicates().shape[0], "years": f"{min(test_y)}-{max(test_y)}",
                        "sg": r1, "sg_base": r0, "sg_d": round(r1 - r0, 2), "sg_win": sum(v < 0 for v in yrs.values()),
                        "sd": s1, "sd_base": s0, "sd_d": round(s1 - s0, 2), "sd_win": sum(v < 0 for v in syrs.values()), "sg_years": yrs})
            print(f"{asof} {sname:22s} {mode:5s} 시군 {r1:.2f}/{r0:.2f} ({r1 - r0:+.2f}, {res[-1]['sg_win']}/{len(yrs)}년) | 시도 {s1:.2f}/{s0:.2f} ({s1 - s0:+.2f}, {res[-1]['sd_win']}/{len(syrs)}년)", flush=True)
    pd.DataFrame(res).to_csv(os.path.join(BT.OUT, f"curves_{asof}.csv"), index=False)


if __name__ == "__main__":
    if sys.argv[1] == "build":
        build()
    else:
        for a in sys.argv[2:] or ["0915", "1001"]:
            test(a)
