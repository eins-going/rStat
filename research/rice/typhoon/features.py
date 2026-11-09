"""태풍 바람 노출 피처 (시군 논 중심 → 논 면적 가중 시도) — 수량 결과를 보기 전에 정함 (11-09 03:45).

입력: windfield.py 모델 풍속 × calib.json 의 a (ASOS ws_ins 보정, a = 0.738) = V_g (순간풍속 상당, m/s),
      시군 날마다 모든 태풍 중 최대. 시군 출수일 H = cropmodel components_sigun_fixed (같은 as-of의 heading).
사전 등록 피처 (V0 = 15 m/s, wind15 문턱과 같게 미리 고정):
  tc_dd      Σ_day max(0, V_g − 15)^2 / 100,  H−10..H+40         ← 주 피처
  tc_max     max V_g,                         H−10..H+40
  tc_dd_pre  tc_dd 창 H−30..H−1  (영화수·출수 전)
  tc_dd_post tc_dd 창 H..H+40    (출수~등숙)
  tc_dd_cal  tc_dd 달력 창 8/1~9/30
as-of: cutoff(9/15, 10/1, 8/15) 이후 날은 cropmodel과 같게 '직전 10년 같은 날 일별 함수 평균'으로 채움
       (tc_max는 cutoff 이후 날 V_g의 10년 평균). 학습은 cropmodel처럼 1001 표(완전 시즌).
사전 등록 비교: (a) M4에서 wind15를 tc_dd로 교체, (b) M4 + tc_dd. 보조: tc_max·pre/post·cal 각각 (a)(b).
                (c) 시군 내 검정: 시군 a − 시도 a  ~  γ·(시군 tc_dd 편차 − 시도 tc_dd 편차), γ 실시간.
사후 추가 (11-09 03:50, 위 결과가 모두 기준 미달인 것을 본 뒤): tc_days15 / tc_days20 = V_g ≥ 15 / 20 m/s 날수,
  창 H−10..H+30 (wind15와 똑같은 정의를 모델 바람으로) — 바람장 문제인지 함수 꼴 문제인지 가르기용.
"""
import json
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
R = os.path.dirname(HERE)
sys.path[:0] = [R, HERE]
import windfield as W  # noqa: E402

V0 = 15.0
CUT = {"0815": 227, "0915": 258, "1001": 274}  # 2001 기준 doy (components.ASOF와 같음)
Y0, Y1 = 1975, 2026


def build():
    a = json.load(open(os.path.join(HERE, "calib.json")))["a"]
    cent = pd.read_csv(os.path.join(R, "cropmodel/sigun_centroids.csv"), dtype={"sc": str})
    h = W.load_tracks(Y0, Y1)
    dm = W.daily_max(h, cent, max_km=800)
    years = np.arange(Y0, Y1 + 1)
    V = np.zeros((len(cent), len(years), 366))
    doy = np.minimum(dm.date.dt.dayofyear.values, 365)
    V[dm.i.values, dm.date.dt.year.values - Y0, doy] = a * dm.v.values
    np.save(os.path.join(HERE, "data/vg_sigun.npy"), V)
    dm.assign(sc=cent.sc.values[dm.i], stem=cent.stem.values[dm.i], vg=a * dm.v).drop(columns="i").to_csv(
        os.path.join(HERE, "data/vg_sigun_daily.csv.gz"), index=False, float_format="%.2f")
    return cent, V, years


def clim_fill(X, cut, ny=10):
    """X[site, year, doy]: cutoff 이후 날을 직전 ny년 같은 날 평균으로."""
    out = X.copy()
    for j in range(X.shape[1]):
        lo = max(0, j - ny)
        clim = X[:, lo:j, :].mean(1) if j > lo else np.zeros_like(X[:, j, :])
        out[:, j, cut + 1:] = clim[:, cut + 1:]
    return out


def features():
    cent, V, years = build()
    cs = pd.read_csv(os.path.join(R, "cropmodel/components_sigun_fixed.csv.gz"), dtype={"sc": str, "asof": str},
                     usecols=["sc", "stem", "y", "asof", "heading", "paddy_ha"])
    key = {(s, t): i for i, (s, t) in enumerate(zip(cent.sc, cent.stem))}
    DD = np.clip(V - V0, 0, None) ** 2 / 100
    D15, D20 = (V >= 15).astype(float), (V >= 20).astype(float)
    rows = []
    for tag, cut in CUT.items():
        dd = clim_fill(DD, cut)
        vg = clim_fill(V, cut)
        d15, d20 = clim_fill(D15, cut), clim_fill(D20, cut)
        g = cs[(cs["asof"] == tag) & (cs.y >= Y0 + 3)]
        for r in g.itertuples():
            i = key.get((r.sc, r.stem))
            if i is None:
                continue
            j = r.y - Y0
            H = int(r.heading)
            rows.append({"sc": r.sc, "stem": r.stem, "y": r.y, "asof": tag, "paddy_ha": r.paddy_ha,
                         "tc_dd": dd[i, j, H - 10:H + 41].sum(), "tc_max": vg[i, j, H - 10:H + 41].max(),
                         "tc_dd_pre": dd[i, j, H - 30:H].sum(), "tc_dd_post": dd[i, j, H:H + 41].sum(),
                         "tc_dd_cal": dd[i, j, 213:274].sum(),
                         "tc_days15": d15[i, j, H - 10:H + 31].sum(), "tc_days20": d20[i, j, H - 10:H + 31].sum()})
    f = pd.DataFrame(rows)
    f.to_csv(os.path.join(HERE, "tc_sigun.csv.gz"), index=False, float_format="%.4g")
    cols = ["tc_dd", "tc_max", "tc_dd_pre", "tc_dd_post", "tc_dd_cal", "tc_days15", "tc_days20"]
    sd = f.groupby(["sc", "y", "asof"]).apply(lambda d: pd.Series(np.average(d[cols], axis=0, weights=d.paddy_ha), index=cols)).reset_index()
    sd.to_csv(os.path.join(HERE, "tc_sido.csv"), index=False, float_format="%.4g")
    return f, sd


if __name__ == "__main__":
    f, sd = features()
    s = sd[(sd["asof"] == "1001") & sd.sc.isin([str(c) for c in range(31, 39)])]
    print(s.groupby("y")[["tc_dd", "tc_max", "tc_dd_pre", "tc_dd_post", "tc_dd_cal"]].mean().round(2).to_string())
