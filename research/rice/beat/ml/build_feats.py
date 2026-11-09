"""시군 논 중심 일기상(cropmodel/wx_sigun.pkl) → 출수 기준 생육단계·10일 단위·달력 특징 (시군·시도, as-of별).

as-of: full(지난해 학습용, 완전 시즌), 0915(9/15까지 관측), 0930(9/30까지 관측).
       as-of 이후 날은 일별 지표 함수의 직전 10년 같은 날 평균(cropmodel과 같은 방식)으로 채운다.
달력: 2/29 제거, 1..365 = 평년(2001) 날짜 → 9/15 = 258, 9/30 = 273.
출수 H: cropmodel 고정 G(2001~12 기상으로 문헌 출수기에 맞춤, 수량 안 씀) 적산온도 GDD10(상한 30).
결측: 하루 결측은 같은 해 안에서 선형 보간(미래 해 값 안 씀). gust 결측 = wavg×2.2 (cropmodel과 같음).
출력: feats_sigun.pkl (sc, stem, y, asof, paddy_ha, 특징들), feats_sido.pkl (논 면적 가중).
"""
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
RICE = "/home/eins/project/rStat/research/rice"
sys.path.insert(0, os.path.join(RICE, "cropmodel"))
sys.path.insert(0, RICE)
import components as C  # noqa: E402  (읽기만: 상수·함수)

CUT = {"0915": 258, "0930": 273}
CLIM = 10
DOY = lambda m, d: pd.Timestamp(2001, m, d).dayofyear  # noqa: E731


def cube(g, cols, years):
    g = g[~((g.date.dt.month == 2) & (g.date.dt.day == 29))].copy()
    g["d"] = pd.to_datetime(pd.DataFrame({"year": 2001, "month": g.date.dt.month, "day": g.date.dt.day})).dt.dayofyear.values
    idx = pd.MultiIndex.from_product([years, range(1, 366)], names=["y", "d"])
    g = g.set_index(["y", "d"])[cols].reindex(idx)
    out = {}
    for c in cols:
        a = g[c].values.reshape(len(years), 365).astype(float)
        for i in range(len(years)):
            r = a[i]
            m = np.isnan(r)
            if m.any() and (~m).sum() > 10:
                r[m] = np.interp(np.flatnonzero(m), np.flatnonzero(~m), r[~m])
        out[c] = a
    return out


def clim_fill(a, cut):
    out = a.copy()
    for i in range(a.shape[0]):
        lo = max(0, i - CLIM)
        if i - lo < 3:
            continue
        out[i, cut:] = np.nanmean(a[lo:i, cut:], axis=0)
    return out


def wsum(x, h, lo, hi):
    cs = np.c_[np.zeros(x.shape[0]), np.cumsum(x, axis=1)]
    a = np.clip(h + lo - 1, 0, 365)
    b = np.clip(h + hi, 0, 365)
    r = np.arange(x.shape[0])
    return cs[r, b] - cs[r, a]


def wmax(x, h, lo, hi):
    return np.array([x[i, max(0, h[i] + lo - 1):min(h[i] + hi, 365)].max() for i in range(x.shape[0])])


def feats_one(c, h, years):
    """c: dict of (n,365) 지표 함수 배열(이미 as-of 채움), h: 출수 doy."""
    f = {"heading": h.astype(float)}
    # M4 성분 (cropmodel components.py와 같은 정의·창)
    f["cold_mei"] = wsum(c["cold20"], h, -18, -6)
    f["heat_ant"] = wsum(c["heat34"], h, -2, 7)
    f["rs_pre"] = wsum(c["rs"], h, -30, -1)
    f["sunless_pre"] = wsum(c["sunless"], h, -30, -1)
    f["ptq_fill"] = wsum(c["ptq"], h, 0, 40)
    f["sunless_post"] = wsum(c["sunless"], h, 0, 40)
    f["wind15"] = wsum(c["w15"], h, -10, 30)
    f["rain_hv"] = wsum(c["rain80"], h, -10, 45)
    f["wet_head"] = wsum(c["wet"], h, -10, 15)
    # 추가 생리
    f["cold_q"] = wsum(c["cold22"], h, -25, 5)
    f["hot_fill"] = wsum(c["hot26"], h, 0, 40)
    f["tmin_fill"] = wsum(c["tmin"], h, 0, 40) / 41
    f["wind_sum"] = wsum(c["wind14"], h, -10, 45)
    f["gust_max"] = wmax(c["gust"], h, -10, 40)
    # 출수 기준 10일 단위 (k = -4..+4: [H+10k, H+10k+9])
    for k in range(-4, 5):
        lo, hi = 10 * k, 10 * k + 9
        tag = f"d{k:+d}".replace("+", "p").replace("-", "m")
        f[f"ta_{tag}"] = wsum(c["tavg"], h, lo, hi) / 10
        f[f"rs_{tag}"] = wsum(c["rs"], h, lo, hi)
        f[f"wet_{tag}"] = wsum(c["wet"], h, lo, hi)
        f[f"gx_{tag}"] = wmax(c["gust"], h, lo, hi)
    # 달력 창
    for nm, (a, b) in {"s1": (DOY(9, 1), DOY(9, 15)), "s2": (DOY(9, 16), DOY(9, 30))}.items():
        z = np.zeros_like(h)
        f[f"ta_{nm}"] = wsum(c["tavg"], z, a, b) / (b - a + 1)
        f[f"rs_{nm}"] = wsum(c["rs"], z, a, b)
        f[f"w15_{nm}"] = wsum(c["w15"], z, a, b)
    z = np.zeros_like(h)
    f["w15_cal"] = wsum(c["w15"], z, DOY(8, 1), DOY(9, 30))
    f["gmax_cal"] = wmax(c["gust"], z, DOY(8, 1), DOY(9, 30))
    return f


def main():
    wx = pd.read_pickle(os.path.join(RICE, "cropmodel/wx_sigun.pkl"))
    wx["gust"] = wx.gust.fillna(wx.wavg * 2.2)
    cent = pd.read_csv(os.path.join(RICE, "cropmodel/sigun_centroids.csv"), dtype={"sc": str})
    cent["grp"] = cent.sc.map(C.SD_GROUP)
    cent = cent[cent.grp.notna()]
    wxc = wx.copy()
    wxc = wxc[wxc.doy <= 365]
    G = C.calibrate_G(wxc, cent)
    print("G", G, flush=True)
    del wxc
    years = list(range(1980, int(wx.y.max()) + 1))
    rows = []
    for k, (_, r) in enumerate(cent.iterrows()):
        g = wx[(wx.sc == r.sc) & (wx.stem == r.stem)]
        c = cube(g, ["tavg", "tmax", "tmin", "rs", "ss", "rn", "gust"], years)
        daily = {"tavg": c["tavg"], "tmin": c["tmin"], "rs": c["rs"], "gust": c["gust"],
                 "cold20": np.clip(20 - c["tavg"], 0, None), "cold22": np.clip(22 - c["tavg"], 0, None),
                 "heat34": np.clip(c["tmax"] - 34, 0, None), "hot26": np.clip(c["tavg"] - 26, 0, None),
                 "ptq": c["rs"] * np.exp(-((c["tavg"] - 22) / 6) ** 2), "sunless": (c["ss"] < 1).astype(float),
                 "w15": (c["gust"] >= 15).astype(float), "wind14": np.clip(c["gust"] - 14, 0, None),
                 "rain80": np.clip(c["rn"] - 80, 0, None), "wet": (c["rn"] >= 1).astype(float)}
        t0, Gs = C.T0[r.grp], G[r.grp]
        # 2026은 관측 끝(11/8) 이후 NaN일 수 있음 → full은 쓰지 않음(정답 없음), as-of만
        for tag in ["full", "0915", "0930"]:
            if tag == "full":
                dd = daily
            else:
                dd = {kk: clim_fill(v, CUT[tag]) for kk, v in daily.items()}
            h, _ = C.heading_doy(np.nan_to_num(dd["tavg"], nan=15.0), t0, Gs)
            f = feats_one(dd, h, years)
            df = pd.DataFrame(f)
            df["y"], df["asof"], df["sc"], df["stem"], df["paddy_ha"] = years, tag, r.sc, r.stem, r.paddy_ha
            rows.append(df)
        if k % 20 == 0:
            print(k, r.sc, r.stem, flush=True)
    out = pd.concat(rows, ignore_index=True)
    out = out[out.y >= 1983]
    out.to_pickle(os.path.join(HERE, "feats_sigun.pkl"))
    num = [c for c in out.columns if c not in ("y", "asof", "sc", "stem", "paddy_ha")]
    sd = out.groupby(["sc", "y", "asof"]).apply(lambda d: pd.Series(np.average(d[num], axis=0, weights=d.paddy_ha), index=num)).reset_index()
    sd.to_pickle(os.path.join(HERE, "feats_sido.pkl"))
    print(sd[sd["asof"] == "0915"].groupby("y")[["heading", "rs_pre", "sunless_pre", "wind15", "wet_head"]].mean().round(1).tail(8))


if __name__ == "__main__":
    main()
