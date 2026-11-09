"""시군 일기상 + 출수일(MODIS 정점) → 출수 기준 기상 창 지표, as-of 별.

출수일 H (시군-연도-as-of):
  H_clim = 그 시군 MODIS 정점일(full)의 과거 해 중앙값 (y 이전; 2005 전은 2000~2004)  ─ 없으면 시도 중앙값
  H      = H_clim + (그해 시도 정점일 - 시도 H_clim)  ─ as-of 시점에 시도 정점이 확인됐을 때만, ±12일로 자름
  (H_fix = H_clim 만 쓰는 판도 따로 저장: suffix 없음=H, '_c'=H_clim)
as-of A 이후 날은 그 시군의 직전 15년 같은 날 평균(기후값)으로 채움.
출력: pheno/wx_feats.csv
"""
import os
import sys

import numpy as np
import pandas as pd

sys.path.insert(0, "/home/eins/project/rStat/research/rice")
OUT = "/home/eins/project/rStat/research/rice/pheno"
ASOF = {"full": 999, "0815": 227, "0915": 258, "1001": 274}

z = np.load(os.path.join(OUT, "wx_daily.npz"), allow_pickle=True)
units, years, doys, VARS, arr = z["units"], z["years"], z["doy"], list(z["vars"]), z["arr"]
D0 = int(doys[0])
V = {v: i for i, v in enumerate(VARS)}
U, Y, D, NV = arr.shape

# 기후값(직전 15년 평균)
S = np.nancumsum(np.nan_to_num(arr, nan=0.0), axis=1, dtype=np.float64)
C = np.cumsum(~np.isnan(arr), axis=1)
S = np.concatenate([np.zeros((U, 1, D, NV)), S], axis=1)
C = np.concatenate([np.zeros((U, 1, D, NV)), C], axis=1)
clim = np.full_like(arr, np.nan)
for yi in range(Y):
    a, b = max(0, yi - 15), yi
    if b - a < 3:
        a, b = 0, min(Y, 15)  # 초기 해: 1980~1994 평균 (특징에만 쓰임)
    with np.errstate(invalid="ignore", divide="ignore"):
        clim[:, yi] = (S[:, b] - S[:, a]) / (C[:, b] - C[:, a])
del S, C
# 결측일은 기후값으로
arr = np.where(np.isnan(arr), clim, arr)

# 출수일
ph = pd.read_csv(os.path.join(OUT, os.environ.get("PHENO", "pheno_feats.csv")), dtype={"sc": str, "stem": str, "asof": str})
ph["stem"] = ph["stem"].fillna("")
full = ph[ph["asof"] == "full"]


def clim_peak(df, keys):
    rows = []
    for k, g in df.groupby(keys):
        g = g.set_index("y")["ndvi_peak_doy"].dropna()
        for y in years:
            past = g[(g.index < y)] if y >= 2005 else g[g.index <= 2004]
            if len(past) >= 3:
                rows.append((*((k,) if isinstance(k, str) else k), y, float(past.median())))
    return pd.DataFrame(rows, columns=keys + ["y", "Hc"])


hc_sg = clim_peak(full[full["level"] == "sigun"], ["sc", "stem"])
hc_sd = clim_peak(full[full["level"] == "sido"], ["sc"])
sd_obs = ph[(ph["level"] == "sido") & (ph.ndvi_peak_reached == 1)][["sc", "y", "asof", "ndvi_peak_doy"]]

# 농진청 벼 생육조사(2021~25) 중만생종 출수기 시도 중앙값 — 수량과 무관한 외부 달력 (없으면 229)
import glob  # noqa: E402
import common  # noqa: E402
_r = pd.concat([pd.read_csv(f, encoding="cp949") for f in sorted(glob.glob("/home/eins/project/rStat/research/rice/lit/data/rda_growth/*.csv"))])
_r = _r[(_r["모작"] == "중만생종") & _r["출수기"].notna()]
_r["h"] = pd.to_datetime(_r["출수기"], errors="coerce").dt.dayofyear
_r["sc"] = _r["지역시도"].map(common.sido_code)
_r = _r.dropna(subset=["h"]).groupby(["sc", "조사년도", "지역시군구", "지역읍면동"]).h.median().reset_index()
RDA_H = _r.groupby("sc").h.median().round().astype(int).to_dict()
print("RDA 출수기", RDA_H)
rows = []
uinfo = [u.split("|") for u in units]
hc_sg_d = {(a, b, y): h for a, b, y, h in hc_sg.itertuples(index=False)}
hc_sd_d = {(a, y): h for a, y, h in hc_sd.itertuples(index=False)}
sd_obs_d = {(a, y, s): h for a, y, s, h in sd_obs.itertuples(index=False)}
nat_hc = hc_sd.groupby("y").Hc.median().to_dict()


def win(x, lo, hi):
    lo, hi = int(max(lo, D0)), int(min(hi, D0 + D - 1))
    return x[lo - D0: hi - D0 + 1]


def feats(d, H):
    ta, tx, tn = d[:, V["ta_avg"]], d[:, V["ta_max"]], d[:, V["ta_min"]]
    ss, si, rn, hm, gi = d[:, V["ss_day"]], d[:, V["si_day"]], d[:, V["rn_day"]], d[:, V["hm_avg"]], d[:, V["ws_ins"]]
    f = {}
    f["cold17_meio"] = np.sum(np.maximum(0, 17 - win(tn, H - 25, H - 8)))
    f["cold20_pre"] = np.sum(np.maximum(0, 20 - win(ta, H - 30, H - 1)))
    f["ta_pre"] = win(ta, H - 30, H - 1).mean()
    f["ss_pre"] = win(ss, H - 30, H - 1).mean()
    f["rn_pre"] = win(rn, H - 30, H - 1).sum()
    f["ta_veg"] = win(ta, H - 70, H - 31).mean()
    f["ss_veg"] = win(ss, H - 70, H - 31).mean()
    f["rn_veg"] = win(rn, H - 70, H - 31).sum()
    f["heat33_fl"] = np.sum(np.maximum(0, win(tx, H - 3, H + 10) - 33))
    f["rndays_fl"] = np.sum(win(rn, H - 3, H + 10) >= 5)
    f["ss_fl"] = win(ss, H - 3, H + 10).mean()
    r = slice(H, H + 40)
    f["ta_rip"] = win(ta, H, H + 40).mean()
    f["tdev_rip"] = np.mean((win(ta, H, H + 40) - 22) ** 2)
    f["dtr_rip"] = (win(tx, H, H + 40) - win(tn, H, H + 40)).mean()
    f["ss_rip"] = win(ss, H, H + 40).mean()
    f["si_rip"] = win(si, H, H + 40).mean()
    f["rn_rip"] = win(rn, H, H + 40).sum()
    f["rndays_rip"] = np.sum(win(rn, H, H + 40) >= 1)
    f["hm_rip"] = win(hm, H, H + 40).mean()
    f["tn_rip"] = win(tn, H, H + 40).mean()
    g = win(gi, H - 10, H + 45)
    f["gust_max"] = g.max()
    f["gust17_days"] = np.sum(g >= 17)
    rr = win(rn, H - 10, H + 45)
    f["rn3d_max"] = np.convolve(rr, np.ones(3), "valid").max()
    # 달력 창
    f["ss_jul"] = win(ss, 182, 212).mean()
    f["ss_aug"] = win(ss, 213, 243).mean()
    f["ss_sep"] = win(ss, 244, 273).mean()
    f["ta_jul"] = win(ta, 182, 212).mean()
    f["ta_aug"] = win(ta, 213, 243).mean()
    f["ta_sep"] = win(ta, 244, 273).mean()
    f["rn_jul"] = win(rn, 182, 212).sum()
    f["rn_aug"] = win(rn, 213, 243).sum()
    f["ss_sep1h"] = win(ss, 244, 258).mean()
    f["rndays_sep1h"] = np.sum(win(rn, 244, 258) >= 1)
    f["gust17_a1s14"] = np.sum(win(gi, 213, 257) >= 17)
    f["ss_jl18_au11"] = win(ss, 199, 223).mean()
    f["gdd_jun_aug"] = np.sum(np.maximum(0, win(ta, 152, 243) - 10))
    del r
    return f


CALK = {"ss_jul", "ss_aug", "ss_sep", "ta_jul", "ta_aug", "ta_sep", "rn_jul", "rn_aug", "gdd_jun_aug", "ss_sep1h", "rndays_sep1h", "gust17_a1s14", "ss_jl18_au11"}
for asof, A in ASOF.items():
    a_idx = A - D0
    for ui, (sc, stem) in enumerate(uinfo):
        for yi, y in enumerate(years):
            d = arr[ui, yi].copy()
            if a_idx < D:
                d[a_idx:] = clim[ui, yi, a_idx:]
            hc = hc_sg_d.get((sc, stem, y), hc_sd_d.get((sc, y), nat_hc.get(y, 225)))
            sdh = hc_sd_d.get((sc, y), nat_hc.get(y, 225))
            ob = sd_obs_d.get((sc, y, asof)) if y >= 2000 else None
            H = int(round(hc + (np.clip(ob - sdh, -12, 12) if ob is not None else 0)))
            f = {"sc": sc, "stem": stem, "y": int(y), "asof": asof, "H": H, "Hc": round(hc, 1)}
            f.update(feats(d, H))
            fr = feats(d, RDA_H.get(sc, 229))
            f.update({k + "_r": v for k, v in fr.items() if k not in CALK})
            fc = feats(d, int(round(hc)))
            f.update({k + "_c": v for k, v in fc.items() if k not in CALK})
            rows.append(f)
    print(asof, len(rows), flush=True)

out = pd.DataFrame(rows)
out.round(3).to_csv(os.path.join(OUT, "wx_feats.csv"), index=False)
print("saved", out.shape)
