"""MODIS 논 NDVI 곡선(db/clean/rice/modis_curves.csv, 16일 합성, 2000~) → 시군·시도 × 연도 × 예측시점 특징.

공개 지연: 합성 시작일 + 20일에 쓸 수 있다고 본다(pheno 갈래와 같음). 그 뒤 합성은 그 시점에 안 씀.
생육 정렬: cropmodel 시군 출수일 H(같은 시점 행). 시도는 시군 값을 논 면적(MODIS 화소 수 n) 가중.
특징(모두 그 단위의 직전 5년 같은 특징 평균 대비 편차, 실시간):
  cum_season   이앙 뒤(doy 160~) 쓸 수 있는 합성 NDVI 합 × 16 (누적, 생육량 대리)
  cum_pre      출수 전 40일 ~ 출수 NDVI 적분(선형 보간 일별)
  cum_post     출수 ~ 시점(최대 출수+40) 적분
  m_jul, m_aug1, m_aug2, m_sep1  달력 창 평균 (7월, 8/1~15, 8/16~31, 9/1~15)
  peak, peak_doy, decline  최대 NDVI·그 날·최대 후 32일 하락
출력: sat_modis_sigun.csv, sat_modis_sido.csv  (sc, stem, y, asof, 특징…)
"""
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
RICE = os.path.dirname(HERE)
sys.path.insert(0, RICE)
import common  # noqa: E402

CUT = {"0815": 227, "0915": 258, "1001": 274}
LAG = 20
FEATS = ["cum_season", "cum_pre", "cum_post", "m_jul", "m_aug1", "m_aug2", "m_sep1", "peak", "peak_doy", "decline"]


def unit_feats(g, H, cut):
    g = g[g.doy + LAG <= cut].sort_values("doy")
    o = dict.fromkeys(FEATS, np.nan)
    if len(g) < 4:
        return o
    d, v = g.doy.values, g.ndvi.values
    day = np.arange(100, cut + 1)
    vi = np.interp(day, d + 8, v, left=np.nan, right=np.nan)  # 합성 중앙(시작+8) 기준 보간, 마지막 합성 뒤는 결측
    s = g[g.doy >= 160]
    o["cum_season"] = float(s.ndvi.sum() * 16) if len(s) else np.nan
    if not np.isnan(H):
        pre = (day >= H - 40) & (day < H)
        post = (day >= H) & (day <= min(H + 40, cut))
        o["cum_pre"] = float(np.nansum(vi[pre])) if np.isfinite(vi[pre]).mean() > 0.7 else np.nan
        o["cum_post"] = float(np.nansum(vi[post])) if post.sum() and np.isfinite(vi[post]).mean() > 0.7 else np.nan
    for nm, (a, b) in {"m_jul": (182, 212), "m_aug1": (213, 227), "m_aug2": (228, 243), "m_sep1": (244, 258)}.items():
        m = (day >= a) & (day <= b) & np.isfinite(vi)
        o[nm] = float(vi[m].mean()) if m.sum() >= 5 else np.nan
    j = int(np.argmax(v))
    o["peak"], o["peak_doy"] = float(v[j]), float(d[j])
    later = g[(g.doy >= d[j] + 28) & (g.doy <= d[j] + 36)]
    o["decline"] = float(v[j] - later.ndvi.iloc[0]) if len(later) else np.nan
    return o


def main():
    m = pd.read_csv(os.path.join(common.ROOT, "db/clean/rice/modis_curves.csv"))
    m = m[m.level == "sigun"].copy()
    m["sc"] = m.sido.map(common.sido_code)
    m["stem"] = m.sigun.astype(str).str[:-1]
    m.loc[m.sigun.astype(str).str.startswith("세종"), ["sc", "stem"]] = ["29", "세종"]
    cs = pd.read_csv(os.path.join(RICE, "cropmodel", "components_sigun_fixed.csv.gz"), dtype={"sc": str, "asof": str},
                     usecols=["sc", "stem", "y", "asof", "heading"])
    w = m.groupby(["sc", "stem"]).n.median().rename("wpx")
    rows = []
    for asof, cut in CUT.items():
        H = cs[cs["asof"] == asof].set_index(["sc", "stem", "y"]).heading
        for (sc, stem, y), g in m.groupby(["sc", "stem", "y"]):
            o = unit_feats(g, H.get((sc, stem, y), np.nan), cut)
            rows.append({"sc": sc, "stem": stem, "y": y, "asof": asof, **o})
    f = pd.DataFrame(rows).sort_values(["sc", "stem", "asof", "y"])
    # 직전 5년 평균 대비 편차 (그해 제외, 실시간)
    for c in FEATS:
        prior = f.groupby(["sc", "stem", "asof"])[c].transform(lambda s: s.shift(1).rolling(5, min_periods=3).mean())
        f[c] = f[c] - prior
    f = f.merge(w, on=["sc", "stem"], how="left")
    f.drop(columns="wpx").to_csv(os.path.join(HERE, "sat_modis_sigun.csv"), index=False)
    out = []
    for (sc, y, asof), g in f.groupby(["sc", "y", "asof"]):
        o = {"sc": sc, "y": y, "asof": asof}
        for c in FEATS:
            v = g[[c, "wpx"]].dropna()
            o[c] = float(np.average(v[c], weights=v.wpx)) if len(v) and v.wpx.sum() > 0 else np.nan
        out.append(o)
    s = pd.DataFrame(out)
    s.to_csv(os.path.join(HERE, "sat_modis_sido.csv"), index=False)
    print("시군", f.shape, "시도", s.shape, "연도", f.y.min(), f.y.max())
    print("결측률(0915)", f[f["asof"] == "0915"][FEATS].isna().mean().round(2).to_dict())


if __name__ == "__main__":
    main()
