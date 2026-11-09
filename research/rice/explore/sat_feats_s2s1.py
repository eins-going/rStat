"""Sentinel-2/1 상자 관측(s2s1/rows_*.jsonl, 60시군 × 상자 1~2, 2017~2025) → 지수·결합지수 × 시간 특징 → 시군 × 연도 × 시점.

지수(S2): ndvi, ndre, cire, ndmi(=lswi), evi2
결합(S2): ndre_ndvi(비), ndre_m_ndvi(차), ndvi_m_ndmi(수분 스트레스), ndvi_x_ndmi, cire_ndvi
레이더(S1): vv, vh, vhvv(dB 차), rvi(4·VH/(VV+VH), 선형)
시간 특징(출수일 H = cropmodel 시군 출수일, 같은 시점 행):
  S2 각 지수: pre(H−30..H−1 평균), e(H..H+19), l(H+20..H+39), cum(7/10~시점 일별 보간 합), pk(정점 값), pkd(정점일), sl(H+10~시점 기울기, /10일)
  S1 각 값: pre, e, l, aug(8/1~시점 평균), chg(l − pre)  — 궤도(rel)별로 따로 계산한 뒤 편차를 내고 궤도 평균
편차: _o = 그 시군 이전 해(2년 이상) 평균 대비(실시간), _c = 같은 해 60시군 평균 대비(시군 사이 차이만)
출력: sat_s2s1_sigun.csv (sc, stem, y, asof, 특징 …)
"""
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
RICE = os.path.dirname(HERE)
S2S1 = os.path.join(RICE, "s2s1")
sys.path.insert(0, S2S1)
import features as F  # noqa: E402  (s2s1 품질 처리: 중복 제거·despike·curve)

ASOF = {"0815": 227, "0915": 258, "1001": 274}
S2I = ["ndvi", "ndre", "cire", "ndmi", "evi2", "ndre_ndvi", "ndre_m_ndvi", "ndvi_m_ndmi", "ndvi_x_ndmi", "cire_ndvi"]
S1I = ["vv", "vh", "vhvv", "rvi"]


DIRS = [S2S1] + ([os.path.join(RICE, "s2s1_all")] if os.environ.get("ALL") else [])


def s2_rows():
    parts = []
    for dd in DIRS:
        for fn in ("rows_s2.jsonl", "rows_s2_c80.jsonl"):
            f = os.path.join(dd, fn)
            if os.path.exists(f):
                parts.append(pd.read_json(f, lines=True))
    d = pd.concat(parts, ignore_index=True)
    d = d[d.ndvi.notna()].copy()
    d["date"] = pd.to_datetime(d.date)
    d["y"], d["doy"] = d.date.dt.year, d.date.dt.dayofyear
    d = d.sort_values("n_valid").drop_duplicates(["box", "date"], keep="last").sort_values(["box", "date"])
    d["ndmi"] = d.lswi
    d["ndre_ndvi"] = d.ndre / d.ndvi.where(d.ndvi > 0.05)
    d["ndre_m_ndvi"] = d.ndre - d.ndvi
    d["ndvi_m_ndmi"] = d.ndvi - d.ndmi
    d["ndvi_x_ndmi"] = d.ndvi * d.ndmi
    d["cire_ndvi"] = d.cire / d.ndvi.where(d.ndvi > 0.05)
    return d


def s2_box_feats(g, H, cut):
    g = F.despike(g)
    g = g[g.doy <= cut]
    o = {}
    if len(g) < 3:
        return o
    for c in S2I:
        s = F.curve(g, c, cut)
        if s is None:
            continue
        day = s.index.values
        v = s.values
        ok = np.isfinite(v)
        o[f"{c}_cum"] = float(np.nansum(v[(day <= cut)])) if ok.sum() >= 20 else np.nan
        if ok.any():
            j = np.nanargmax(v) if c not in ("ndvi_m_ndmi",) else np.nanargmax(v)
            o[f"{c}_pk"], o[f"{c}_pkd"] = float(v[j]), float(day[j])
        if np.isfinite(H):
            for nm, (a, b) in {"pre": (H - 30, H - 1), "e": (H, H + 19), "l": (H + 20, H + 39)}.items():
                m = (day >= a) & (day <= min(b, cut)) & ok
                o[f"{c}_{nm}"] = float(v[m].mean()) if m.sum() >= 5 else np.nan
            obs = g[(g.doy >= H + 10) & (g.doy <= cut)]
            if len(obs) >= 2 and obs.doy.nunique() >= 2:
                o[f"{c}_sl"] = float(np.polyfit(obs.doy, obs[c], 1)[0] * 10)
    return o


def s1_box_feats(g, H, cut):
    """궤도(rel)별 특징 dict 목록."""
    out = {}
    g = g[g.doy <= cut]
    for rel, q in g.groupby("rel"):
        o = {}
        for c in S1I:
            for nm, (a, b) in {"pre": (H - 30, H - 1), "e": (H, H + 19), "l": (H + 20, H + 39), "aug": (213, cut)}.items():
                if not np.isfinite(H) and nm != "aug":
                    continue
                m = (q.doy >= a) & (q.doy <= min(b, cut))
                o[f"{c}_{nm}"] = float(q.loc[m, c].mean()) if m.sum() >= 1 else np.nan
            if f"{c}_l" in o and f"{c}_pre" in o:
                o[f"{c}_chg"] = o[f"{c}_l"] - o[f"{c}_pre"]
        out[rel] = o
    return out


def main():
    boxes = pd.concat([pd.read_csv(os.path.join(dd, "boxes.csv"), dtype={"sc": str}) for dd in DIRS if os.path.exists(os.path.join(dd, "boxes.csv"))])
    bmap = boxes.set_index("box")[["sc", "stem"]]
    cs = pd.read_csv(os.path.join(RICE, "cropmodel", "components_sigun_fixed.csv.gz"), dtype={"sc": str, "asof": str},
                     usecols=["sc", "stem", "y", "asof", "heading"])
    s2 = s2_rows()
    s1 = pd.concat([pd.read_json(os.path.join(dd, "rows_s1.jsonl"), lines=True) for dd in DIRS if os.path.exists(os.path.join(dd, "rows_s1.jsonl"))], ignore_index=True)
    s1 = s1[s1.vv.notna() & s1.vh.notna()].copy()
    s1["date"] = pd.to_datetime(s1.date)
    s1["y"], s1["doy"] = s1.date.dt.year, s1.date.dt.dayofyear
    s1["rvi"] = 4 * 10 ** (s1.vh / 10) / (10 ** (s1.vv / 10) + 10 ** (s1.vh / 10))
    rows2, rows1 = [], []
    for asof, cut in ASOF.items():
        Hs = cs[cs["asof"] == asof].set_index(["sc", "stem", "y"]).heading
        for (box, y), g in s2.groupby(["box", "y"]):
            sc, stem = bmap.loc[box]
            o = s2_box_feats(g, Hs.get((sc, stem, y), np.nan), cut)
            rows2.append({"box": box, "sc": sc, "stem": stem, "y": y, "asof": asof, **o})
        for (box, y), g in s1.groupby(["box", "y"]):
            sc, stem = bmap.loc[box]
            for rel, o in s1_box_feats(g, Hs.get((sc, stem, y), np.nan), cut).items():
                rows1.append({"box": box, "rel": rel, "sc": sc, "stem": stem, "y": y, "asof": asof, **o})
    b2 = pd.DataFrame(rows2)
    b1 = pd.DataFrame(rows1)
    f2 = [c for c in b2.columns if c not in ("box", "sc", "stem", "y", "asof")]
    f1 = [c for c in b1.columns if c not in ("box", "rel", "sc", "stem", "y", "asof")]
    # S1: 상자·궤도별 자기 과거 대비 편차 → 궤도 평균 (기하 차이 제거)
    b1 = b1.sort_values(["box", "rel", "asof", "y"])
    for c in f1:
        b1[c + "_o"] = b1[c] - b1.groupby(["box", "rel", "asof"])[c].transform(lambda s: s.shift(1).expanding(min_periods=2).mean())
    s1g = b1.groupby(["sc", "stem", "y", "asof"])[[c + "_o" for c in f1] + f1].mean().reset_index()
    s2g = b2.groupby(["sc", "stem", "y", "asof"])[f2].mean().reset_index().sort_values(["sc", "stem", "asof", "y"])
    for c in f2:
        s2g[c + "_o"] = s2g[c] - s2g.groupby(["sc", "stem", "asof"])[c].transform(lambda s: s.shift(1).expanding(min_periods=2).mean())
    g = s2g.merge(s1g, on=["sc", "stem", "y", "asof"], how="outer")
    # 같은 해 시군 사이 편차 (_c)
    base_cols = f2 + f1
    for c in base_cols:
        g[c + "_c"] = g[c] - g.groupby(["y", "asof"])[c].transform("mean")
    keep = ["sc", "stem", "y", "asof"] + [c + "_o" for c in base_cols] + [c + "_c" for c in base_cols]
    g = g[keep]
    g.to_csv(os.path.join(HERE, "sat_s2s1_sigun_all.csv" if os.environ.get("ALL") else "sat_s2s1_sigun.csv"), index=False)
    print("시군-연도", g.shape, "시군", g[["sc", "stem"]].drop_duplicates().shape[0], "연도", g.y.min(), g.y.max())
    print("결측률(0915) 상위", g[g["asof"] == "0915"].isna().mean().sort_values().tail(5).round(2).to_dict())


if __name__ == "__main__":
    main()
