"""논 1km 격자 LST → 시군·시도-연도-예측시점 특징 (엄격 실시간).

편차 정의 (격자·센서·합성 DOY별):
  A = LST(그해) − 직전 NC년(같은 격자·같은 센서·같은 합성 DOY, 유효값 3년 이상) 평균.  NC=5 (평년·cropmodel과 맞춤)
  Terra(10:30/22:30)·Aqua(13:30/01:30)는 따로 편차를 낸 뒤 평균 (관측 시각 차 제거).
  품질: LST>0 (MOD11A2는 맑은 날만 합성; QC는 읽지 않음 — 시험 합성에서 오차>2K 0.01%).
  시군 합성 편차 = 그 시군 격자 편차의 중앙값 (유효 격자 20% 이상 & 1개 이상).

창 (출수일 H = cropmodel PHENO=fixed 시군 출수 doy, 그 예측시점 값 — 8/15엔 기후값으로 채운 추정):
  n_pre30  밤 H-30..H-1 (영화수·감수분열기 냉해)
  n_mei    밤 H-18..H-6 (감수분열기)
  d_head   낮 H-5..H+5 (개화기 고온)
  n_fill   밤 H..H+40 (등숙기 밤온도)
  d_fill   낮 H..H+40
  n_sep    밤 9/1..9/30
  d_sep    낮 9/1..9/30
  dmax_head 개화기(H-5..H+10) Aqua 낮 LST 원값 최대 (뒤에서 직전 5년 편차로)
공개 지연: 합성 시작일 + 20일 ≤ 예측일인 합성만 사용. 창 중 아직 안 나온 날은 편차 0(기대값)으로 채움
  → 특징 = Σ(겹친 날×A)/Σ(겹친 날, 유효) × (공개된 겹친 날 / 창 길이).

출력: lst/feat_sigun.csv (sc, stem, y, asof, 특징…, ncell), lst/feat_sido.csv (논 면적 가중)
사용: OMP_NUM_THREADS=2 memcap -m 3G .venv/bin/python research/rice/lst/features.py
"""
import glob
import os
import sys

import warnings

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
RICE = os.path.dirname(HERE)
sys.path.insert(0, RICE)
import common  # noqa: E402

warnings.filterwarnings("ignore", category=RuntimeWarning)

D = os.environ.get("LST_DATA", os.path.join(HERE, "data"))
OUTD = os.environ.get("LST_OUT", HERE)
NC = int(os.environ.get("LST_NC", 5))
KS = list(range(19, 37))  # 합성 시작 doy = 1+8k → 153(6/2)..289
DOYS = np.array([1 + 8 * k for k in KS])
ASOF = {"0815": 227, "0915": 258, "1001": 274}
LAG = 20
WIN = {"n_pre30": ("night", -30, -1), "n_mei": ("night", -18, -6), "d_head": ("day", -5, 5), "n_fill": ("night", 0, 40),
       "d_fill": ("day", 0, 40), "n_sep": ("night", None, None), "d_sep": ("day", None, None)}
SEP = (244, 273)


def load_cube():
    """반환: years, L[sensor][var] = (Y, K, N) float32 ℃ (NaN 결측)."""
    files = sorted(f for f in glob.glob(os.path.join(D, "lst_*.npz")) if not f.endswith(".tmp.npz"))
    years = [int(os.path.basename(f)[4:8]) for f in files]
    cl = pd.read_csv(os.path.join(HERE, "data", "cells.csv"))
    N = len(cl)
    L = {s: {v: np.full((len(years), len(KS), N), np.nan, "float32") for v in ("day", "night")} for s in ("MOD", "MYD")}
    for yi, f in enumerate(files):
        z = np.load(f)
        for ci, c in enumerate(z["comp"]):
            sen, date = str(c).split("|")
            sen = sen[:3]
            doy = pd.Timestamp(date).dayofyear
            k = (doy - 1) // 8
            if k not in KS:
                continue
            for v, q in (("day", "qcd"), ("night", "qcn")):
                raw = z[v][ci].astype("float32")
                ok = (raw > 0) & (((z[q][ci] >> 6) <= 1) if q in z.files else True)
                L[sen][v][yi, KS.index(k)] = np.where(ok, raw * 0.02 - 273.15, np.nan)
    return years, L, cl


def anomalies(years, L):
    """격자 편차 A[var] (Y,K,N): 센서별 직전 NC년 평균 대비, 센서 평균."""
    A = {}
    for v in ("day", "night"):
        acc, cnt = None, None
        for s in ("MOD", "MYD"):
            X = L[s][v]
            clim = np.full_like(X, np.nan)
            for yi in range(len(years)):
                lo = max(0, yi - NC)
                if yi - lo < 3:
                    continue
                past = X[lo:yi]
                n = np.sum(~np.isnan(past), axis=0)
                with np.errstate(invalid="ignore"):
                    m = np.nanmean(past, axis=0) if yi - lo > 0 else np.nan
                clim[yi] = np.where(n >= 3, m, np.nan)
            a = X - clim
            ok = ~np.isnan(a)
            acc = np.where(ok, a, 0) if acc is None else acc + np.where(ok, a, 0)
            cnt = ok.astype("int8") if cnt is None else cnt + ok
        with np.errstate(invalid="ignore", divide="ignore"):
            A[v] = np.where(cnt > 0, acc / np.maximum(cnt, 1), np.nan).astype("float32")
    return A


def sigun_series(A, L, cl, years):
    """시군 × 연도 × 합성 편차 중앙값 (+ Aqua 낮 원값 중앙값)."""
    cl = cl.copy()
    cl["sc"] = cl.sido.map(common.sido_code)
    cl["stem"] = cl.sigun.str[:-1]
    out = {}
    for (sc, stem), g in cl.groupby(["sc", "stem"]):
        idx = g.cell.values
        rec = {}
        for v in ("day", "night"):
            a = A[v][:, :, idx]
            nv = np.sum(~np.isnan(a), axis=2)
            with np.errstate(all="ignore"):
                med = np.nanmedian(a, axis=2)
            med[(nv < max(1, 0.2 * len(idx)))] = np.nan
            rec[v] = med
        raw = L["MYD"]["day"][:, :, idx]
        with np.errstate(all="ignore"):
            rec["aqua_day"] = np.nanmedian(raw, axis=2)
        rec["ncell"] = len(idx)
        out[(sc, stem)] = rec
    return out


def window_feat(series, h, lo, hi, cut):
    """series (K,) 합성 편차, h 출수 doy. 창 [h+lo, h+hi] 또는 절대 doy (lo,hi given as abs if h None)."""
    a0, a1 = (h + lo, h + hi) if h is not None else (lo, hi)
    L = a1 - a0 + 1
    s0 = DOYS
    s1 = DOYS + 7
    ov = np.clip(np.minimum(s1, a1) - np.maximum(s0, a0) + 1, 0, None).astype(float)
    rel = (DOYS + LAG) <= cut
    ovr = ov * rel
    valid = ovr * ~np.isnan(series)
    if valid.sum() == 0:
        return 0.0 if ovr.sum() == 0 else np.nan
    m = np.nansum(valid * np.nan_to_num(series)) / valid.sum()
    return m * ovr.sum() / L


def window_max(series, h, lo, hi, cut):
    a0, a1 = h + lo, h + hi
    ov = (np.minimum(DOYS + 7, a1) - np.maximum(DOYS, a0) + 1) > 0
    rel = (DOYS + LAG) <= cut
    x = series[ov & rel]
    x = x[~np.isnan(x)]
    return float(x.max()) if len(x) else np.nan


def build():
    years, L, cl = load_cube()
    print("연도", years[0], "~", years[-1], len(years), "격자", len(cl), flush=True)
    A = anomalies(years, L)
    ser = sigun_series(A, L, cl, years)
    cs = pd.read_csv(os.path.join(RICE, "cropmodel", "components_sigun_fixed.csv.gz"), dtype={"sc": str, "asof": str},
                     usecols=["sc", "stem", "y", "asof", "heading", "paddy_ha"])
    hd = cs.set_index(["sc", "stem", "y", "asof"]).heading
    hsd = cs.groupby(["sc", "y", "asof"]).heading.median()
    hall = cs.groupby(["y", "asof"]).heading.median()
    rows = []
    for (sc, stem), rec in ser.items():
        for yi, y in enumerate(years):
            for tag, cut in ASOF.items():
                h = hd.get((sc, stem, y, tag), hsd.get((sc, y, tag), hall.get((y, tag), np.nan)))
                if np.isnan(h):
                    continue
                h = int(round(h))
                r = {"sc": sc, "stem": stem, "y": y, "asof": tag, "heading": h, "ncell": rec["ncell"]}
                for name, (v, lo, hi) in WIN.items():
                    s = rec[v][yi]
                    if lo is None:
                        r[name] = window_feat(s, None, SEP[0], SEP[1], cut)
                    else:
                        r[name] = window_feat(s, h, lo, hi, cut)
                r["dmax_head"] = window_max(rec["aqua_day"][yi], h, -5, 10, cut)
                # 계절(6/1~9/30) 평균 편차 — 참고
                r["n_all"] = window_feat(rec["night"][yi], None, 153, 273, cut)
                r["d_all"] = window_feat(rec["day"][yi], None, 153, 273, cut)
                rows.append(r)
    f = pd.DataFrame(rows)
    # dmax_head: 원값 → 직전 5년(1001 완전 시즌) 평균 대비 편차
    full = f[f["asof"] == "1001"].set_index(["sc", "stem", "y"]).dmax_head.sort_index()
    prev = full.groupby(level=[0, 1]).transform(lambda s: s.shift(1).rolling(5, min_periods=3).mean())
    f["dmax_head"] = f.dmax_head.values - prev.reindex(pd.MultiIndex.from_frame(f[["sc", "stem", "y"]])).values
    f.to_csv(os.path.join(OUTD, "feat_sigun.csv"), index=False, float_format="%.4f")
    # 시도: 논 면적 가중 (cropmodel paddy_ha)
    pa = cs.groupby(["sc", "stem"]).paddy_ha.first()
    f["w"] = [pa.get((a, b), 0.0) for a, b in zip(f.sc, f.stem)]
    f.loc[f.w <= 0, "w"] = 1.0
    feats = list(WIN) + ["dmax_head", "n_all", "d_all"]

    def wavg(g):
        out = {}
        for c in feats:
            ok = g[c].notna()
            out[c] = np.average(g.loc[ok, c], weights=g.loc[ok, "w"]) if ok.any() else np.nan
        out["heading"] = np.average(g.heading, weights=g.w)
        return pd.Series(out)
    sd = f.groupby(["sc", "y", "asof"]).apply(wavg).reset_index()
    sd.to_csv(os.path.join(OUTD, "feat_sido.csv"), index=False, float_format="%.4f")
    # 진단용: 시군 연도 합성 편차표 (긴 형식)
    lg = []
    for (sc, stem), rec in ser.items():
        for v in ("day", "night"):
            m = pd.DataFrame(rec[v], index=years, columns=DOYS).stack(future_stack=True).rename("anom").reset_index()
            m.columns = ["y", "doy", "anom"]
            m["sc"], m["stem"], m["var"] = sc, stem, v
            lg.append(m)
    pd.concat(lg).dropna().to_csv(os.path.join(OUTD, "comp_anom_sigun.csv.gz"), index=False, float_format="%.3f")
    print("저장 feat_sigun.csv", f.shape, "feat_sido.csv", sd.shape, flush=True)
    print(sd[(sd["asof"] == "1001") & sd.sc.isin(["31", "33", "34", "35", "36", "37", "38"])].groupby("y")[feats].mean().round(2).to_string())


if __name__ == "__main__":
    build()
