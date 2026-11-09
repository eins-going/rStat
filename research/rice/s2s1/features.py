"""rows_s2.jsonl → 상자-연도 시계열 특징 → 시군-연도 특징 (as-of별). feats_s2.csv"""
import json, os, sys
import numpy as np, pandas as pd
OUT = os.path.dirname(os.path.abspath(__file__))
IDX = ["ndvi", "ndre", "cire", "lswi", "evi2"]
ASOF = {"0815": 227, "0915": 258, "1001": 274, "1015": 288}  # 평년 DOY (윤년 무시)


def load_s2():
    d = pd.read_json(f"{OUT}/rows_s2.jsonl", lines=True)
    if os.environ.get("S2_C80") and os.path.exists(f"{OUT}/rows_s2_c80.jsonl"):
        d = pd.concat([d, pd.read_json(f"{OUT}/rows_s2_c80.jsonl", lines=True)], ignore_index=True)
    d = d[d.ndvi.notna()].copy()
    d["date"] = pd.to_datetime(d.date)
    d["y"] = d.date.dt.year
    d["doy"] = d.date.dt.dayofyear
    # 같은 상자 같은 날 중복(겹치는 궤도) → 유효 화소 많은 것
    d = d.sort_values("n_valid").drop_duplicates(["box", "date"], keep="last")
    return d.sort_values(["box", "date"])


def despike(g, col="ndvi", thr=0.08):
    """이웃 두 관측보다 thr 이상 낮은 점(남은 구름·연무) 제거, 반복."""
    g = g.copy()
    for _ in range(3):
        v = g[col].values
        if len(v) < 3:
            break
        bad = np.zeros(len(v), bool)
        bad[1:-1] = (v[1:-1] < v[:-2] - thr) & (v[1:-1] < v[2:] - thr)
        if not bad.any():
            break
        g = g[~bad]
    return g


def curve(g, col, asof_doy, d0=191, d1=288):
    """asof_doy까지 관측으로 일별 선형 보간 + 끝은 마지막 값 유지(외삽 안 함, 이후는 NaN)."""
    g = g[g.doy <= asof_doy]
    if len(g) < 2:
        return None
    days = np.arange(d0, d1 + 1)
    v = np.interp(days, g.doy.values, g[col].values, left=np.nan, right=np.nan)
    # 마지막 관측 뒤는 NaN, 첫 관측 전 NaN
    s = pd.Series(v, index=days).rolling(9, center=True, min_periods=1).mean()
    return s


def box_feats(g, asof):
    a = ASOF[asof]
    g = despike(g)
    g = g[g.doy <= a]
    f = {"n_obs": len(g)}
    if len(g) < 3:
        return f
    cs = {c: curve(g, c, a) for c in IDX}
    nd = cs["ndvi"]
    if nd is None or nd.notna().sum() < 10:
        return f
    # 출수 근사: NDVI 정점 (7/20~9/10 사이), 정점 이후 관측이 있어야 의미
    seg = nd.loc[200:253].dropna()
    if len(seg):
        pk = int(seg.idxmax())
        f["peak_doy"] = pk
        last = g.doy.max()
        f["peak_ok"] = int(last >= pk + 10)
        for c in IDX:
            s = cs[c]
            f[f"{c}_max"] = s.loc[200:253].max()
            for lo, hi in [(10, 30), (30, 50)]:
                w = s.loc[pk + lo:pk + hi].dropna()
                f[f"{c}_p{lo}_{hi}"] = w.mean() if len(w) >= 10 else np.nan
    for c in IDX:
        s = cs[c]
        for nm, (lo, hi) in {"jul": (196, 212), "a1": (213, 227), "a2": (228, 243), "s1": (244, 258), "s2": (259, 273), "o1": (274, 288)}.items():
            if hi > a:
                continue
            w = s.loc[lo:hi].dropna()
            f[f"{c}_{nm}"] = w.mean() if len(w) >= 8 else np.nan
        w = s.loc[205:min(a, 258)].dropna()
        f[f"{c}_auc"] = w.mean() if len(w) >= 30 else np.nan
    # 노화 기울기: 9/1 → min(as-of, 9/30) NDVI 변화/일
    if a >= 265:
        e = min(a, 273)
        v0, v1 = nd.get(244), nd.get(e)
        if v0 == v0 and v1 == v1 and v0 is not None and v1 is not None:
            f["sen_slope"] = (v1 - v0) / (e - 244) * 30
    return f


RW = {"r_a": (213, 243), "r_s": (244, 273), "r_as": (213, 258), "r_o": (274, 288)}


def resid_feats(d):
    """상자별 직전 해들 관측으로 만든 계절 기준선(10일 구간 중앙값) 대비 올해 관측 잔차의 창 평균. 실시간 가능."""
    d = d.copy()
    d["bin"] = (d.doy // 10).astype(int)
    out = []
    for bx, g in d.groupby("box"):
        g = pd.concat([despike(q) for _, q in g.groupby("y")])
        for y in sorted(g.y.unique()):
            prev = g[g.y < y]
            cur = g[g.y == y]
            if prev.y.nunique() < 1 or len(prev) < 5:
                continue
            for asof, a in ASOF.items():
                c = cur[cur.doy <= a]
                f = dict(box=bx, y=y, asof=asof)
                for col in IDX:
                    ref = prev.groupby("bin")[col].median()
                    if len(ref) < 4:
                        continue
                    r = c[col].values - np.interp(c.doy.values / 10.0 - 0.5, ref.index.values.astype(float), ref.values)
                    for nm, (lo, hi) in RW.items():
                        if lo > a:
                            continue
                        m = (c.doy.values >= lo) & (c.doy.values <= hi)
                        f[f"{col}_{nm}"] = float(np.mean(r[m])) if m.sum() >= 1 else np.nan
                out.append(f)
    return pd.DataFrame(out)


def build():
    d = load_s2()
    boxes = pd.read_csv(f"{OUT}/boxes.csv")
    out = []
    for (bx, y), g in d.groupby(["box", "y"]):
        for asof in ASOF:
            f = box_feats(g, asof)
            f.update(box=bx, y=y, asof=asof)
            out.append(f)
    bf = pd.DataFrame(out).merge(resid_feats(d), on=["box", "y", "asof"], how="left")
    bf = bf.merge(boxes[["box", "sc", "stem", "buf_ha"]], on="box")
    bf.to_csv(f"{OUT}/feats_s2_box.csv", index=False)
    num = [c for c in bf.columns if c not in ("box", "y", "asof", "sc", "stem", "buf_ha")]
    sg = bf.groupby(["sc", "stem", "y", "asof"])[num].mean().reset_index()
    sg["n_box"] = bf.groupby(["sc", "stem", "y", "asof"]).size().values
    sg["sc"] = sg.sc.astype(str).str.zfill(2)
    sg.to_csv(f"{OUT}/feats_s2.csv", index=False)
    return sg


if __name__ == "__main__":
    s = build()
    print(s.groupby(["asof", "y"]).agg(n=("stem", "size"), pk=("peak_doy", "mean"), nd=("ndre_max", "mean")).to_string())
