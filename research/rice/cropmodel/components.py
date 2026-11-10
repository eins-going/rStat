"""작물 생리 지표 (시군-연도-예측시점) — 적산온도 생육단계 + 단계별 기상 피해/광합성 지표 + SIMRIW 간이 모델.

생육단계
  이앙 T0(시도별 고정 doy) → 출수 H: GDD(기준 10℃, 상한 30℃)가 G_sd에 이를 때.
  (fixed) G_sd는 2001~2012 평균 출수일이 시도별 문헌 출수기(H_TARGET)와 같도록 시도마다 한 번 보정.
  (adaptive, 기본) G_y = 직전 10년 실측 기온으로 이앙→H_TARGET 적산온도 평균 → 평균 출수일은 문헌값에 고정, 해마다 기온 편차만큼 앞뒤로.
  감수분열기 H-18..H-6, 개화기 H-2..H+7, 등숙기 H..H+40, 출수 전 30일 H-30..H-1.

예측 시점(as-of) 처리
  cutoff 이후 날은 '기대값'으로 채운다: 일별 지표 함수 f(기상)의 직전 10년 같은 날 평균 (비선형 함수의 기대값).
  출수일 계산용 기온도 cutoff 이후는 직전 10년 같은 날 평균.

지표 (모두 시군에서 계산 → 논 면적 가중으로 시도 합산)
  cold_mei  감수분열기 냉해 적산 Σmax(0, 20-tavg)            (Horie·Shimono 장해형 냉해)
  cold_q    SIMRIW 냉각도일 Q=Σmax(0,22-tavg) (H-25..H+5)  → 불임률 γ=4.6+0.054Q^1.56 (%)
  heat_ant  개화기 고온 Σmax(0, tmax-34)
  rs_pre    출수 전 30일 일사 합 (영화수·저장 탄수화물)
  rs_fill   등숙기 일사 합
  ptq_fill  등숙기 일사×온도효율 Σ rs·exp(-((tavg-22)/6)^2)
  tfill     등숙기 평균기온
  sunless   H-30..H+40 일조<1h 일수 (장마·가을장마)
  wind      H-10..H+45 Σmax(0, gust-14) (m/s·일, 쓰러짐·백수·염해)
  rain_hv   H-10..H+45 Σmax(0, rn-80) (mm, 침수·도복)
  wet_head  H-10..H+15 강우일(≥1mm) 수 (이삭도열병 위험)
  wind20/wind_early/wind_max  강풍일(순간≥20m/s, H-5..H+40) / Σmax(0,gust-14) H..H+25 / 최대순간풍속
  sunless_pre/post  흐린 날을 출수 전 30일(영화수 결정)과 등숙기로 나눔, wind15 H-10..H+30 순간≥15m/s 일수, rs_pre25 H-25..H-1 일사
  tmin_fill 등숙기 평균 최저기온, hot_fill 등숙기 Σmax(0, tavg-26) (2023~2025 고온 등숙)
  simriw    간이 SIMRIW: Y = HI·W, W = RUE·ΣPAR·f_int(LAI(DVI)), HI = HI0·(1-γ_cold)·γ_heat·완숙도
"""
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.dirname(HERE))

DOY = lambda m, d: pd.Timestamp(2001, m, d).dayofyear  # noqa: E731 (평년 기준)
SD_GROUP = {"11": "31", "23": "31", "31": "31", "32": "32", "33": "33", "34": "34", "25": "34", "29": "34", "35": "35",
            "36": "36", "24": "36", "37": "37", "22": "37", "38": "38", "21": "38", "26": "38", "39": "38"}
T0 = {"31": DOY(5, 20), "32": DOY(5, 18), "33": DOY(5, 22), "34": DOY(5, 25), "35": DOY(5, 28), "36": DOY(6, 1),
      "37": DOY(5, 25), "38": DOY(6, 3)}
H_TARGET = {"31": DOY(8, 10), "32": DOY(8, 8), "33": DOY(8, 11), "34": DOY(8, 13), "35": DOY(8, 14), "36": DOY(8, 16),
            "37": DOY(8, 12), "38": DOY(8, 15)}
# 예측 시점: RICE_ASOF="0731,0815,0901,0915,1001" (mmdd). 1001은 학습용 완전 시즌이라 늘 넣는다.
ASOF = {t: DOY(int(t[:2]), int(t[2:])) for t in sorted(set(os.environ.get("RICE_ASOF", "0731,0815,0901,0915,1001").split(",")) | {"1001"})}
CLIM_YEARS = 10
PHENO = os.environ.get("PHENO", "adaptive")  # adaptive: 직전 10년 기후로 G 갱신 / fixed: 2001~2012 보정 G 고정
SUFFIX = ("" if PHENO == "adaptive" else "_fixed") + os.environ.get("WX_VARIANT_SUFFIX", "")  # 입력 변형 시험(solar/)
COMP = ["cold_mei", "cold_q", "heat_ant", "rs_pre", "rs_fill", "ptq_fill", "tfill", "sunless", "wind", "rain_hv",
        "wet_head", "simriw", "gamma_cold", "biomass", "heading", "wind_max", "wind20", "wind_early", "tmin_fill", "hot_fill", "sunless_pre", "sunless_post", "wind15", "rs_pre25"]


def load():
    wx = pd.read_pickle(os.path.join(HERE, os.environ.get("WX_FILE", "wx_sigun.pkl")))
    wx = wx[wx.doy <= 365]
    wx["gust"] = wx.gust.fillna(wx.wavg * 2.2)
    return wx


def cube(g, cols, years):
    """시군 하나의 (연도, 365일) 배열들."""
    idx = pd.MultiIndex.from_product([years, range(1, 366)], names=["y", "doy"])
    g = g.set_index(["y", "doy"])[cols].reindex(idx)
    g = g.groupby(level="doy").transform(lambda s: s.interpolate(limit_direction="both"))
    return {c: g[c].values.reshape(len(years), 365) for c in cols}


def clim_fill(a, cutoff, years):
    """cutoff(doy) 이후를 직전 CLIM_YEARS년 같은 날 평균으로 채운 배열."""
    out = a.copy()
    for i in range(len(years)):
        lo = max(0, i - CLIM_YEARS)
        if i - lo < 3:
            continue
        out[i, cutoff:] = a[lo:i, cutoff:].mean(axis=0)  # doy cutoff+1.. → index cutoff..
    return out


def heading_doy(tavg, t0, G):
    """tavg: (n, 365). doy(1-based) of heading."""
    gdd = np.clip(np.minimum(tavg, 30) - 10, 0, None)
    gdd[:, : t0 - 1] = 0
    cs = gdd.cumsum(axis=1)
    G = np.broadcast_to(np.asarray(G, dtype=float), (tavg.shape[0],))[:, None]
    h = (cs >= G).argmax(axis=1) + 1
    h[cs[:, -1] < G[:, 0]] = 300
    return h, cs


def adaptive_G(tavg_actual, t0, htarget):
    """해마다 G_y = 직전 10년(실측) 이앙→H_TARGET 적산온도 평균. 농가가 최근 기후에 맞춰 품종·이앙을 바꾼다는 가정
    (온난화로 출수가 해마다 당겨지지 않음: 농진청 2021~25 출수기 8/14~17 유지). 앞 3년은 첫 3년 평균."""
    gdd = np.clip(np.minimum(tavg_actual, 30) - 10, 0, None)
    gdd[:, : t0 - 1] = 0
    gh = gdd[:, : htarget].sum(axis=1)
    G = np.empty(len(gh))
    for i in range(len(gh)):
        lo = max(0, i - CLIM_YEARS)
        G[i] = gh[lo:i].mean() if i - lo >= 3 else gh[:3].mean()
    return G


def wsum(daily, h, lo, hi):
    """Σ daily[i, d] for d in [h+lo, h+hi] (doy, 1-based)."""
    n = daily.shape[0]
    out = np.zeros(n)
    for i in range(n):
        a, b = h[i] + lo - 1, min(h[i] + hi, 365)
        out[i] = daily[i, a:b].sum()
    return out


def wmax(daily, h, lo, hi):
    """max daily[i, d] (cutoff 이후는 기후값이라 사실상 실측 최대)."""
    return np.array([daily[i, h[i] + lo - 1:min(h[i] + hi, 365)].max() for i in range(daily.shape[0])])


def lai_curve(dvi):
    """기후평균 LAI 모양: 이앙 0.3 → 출수 직후(DVI 1.1) 최대 5 → 성숙(DVI 2) 2.5."""
    up = 0.3 + 4.7 / (1 + np.exp(-9 * (dvi - 0.6)))
    return np.where(dvi <= 1.1, up, 5 - 2.5 * (dvi - 1.1) / 0.9).clip(0.3, 5)


def simriw(tavg, tmax, rs, t0, h, G, cs):
    """간이 SIMRIW (Horie 1987 구조, 상수는 문헌값 근사). 반환 (Y g/m2, γ_cold, W)."""
    n = tavg.shape[0]
    gdd = np.clip(np.minimum(tavg, 30) - 10, 0, None)
    Y, GC, W = np.zeros(n), np.zeros(n), np.zeros(n)
    for i in range(n):
        H = h[i]
        if H >= 300:
            Y[i] = GC[i] = W[i] = np.nan
            continue
        dvi = np.zeros(365)
        dvi[t0 - 1:] = cs[i, t0 - 1:] / G[i]
        post = np.cumsum(np.where(np.arange(1, 366) > H, gdd[i], 0))
        dvi = np.where(np.arange(1, 366) > H, 1 + post / 850.0, dvi).clip(0, 2.0)  # 등숙 850℃·d
        mat = np.argmax(dvi >= 2.0) + 1 if (dvi >= 2.0).any() else 365
        f = 1 - np.exp(-0.6 * lai_curve(dvi))
        live = (np.arange(1, 366) >= t0) & (np.arange(1, 366) <= mat)
        W[i] = 1.3 * (0.5 * rs[i] * f * live).sum()  # g/m2
        sens = (dvi >= 0.75) & (dvi <= 1.2)
        Q = np.clip(22 - tavg[i][sens], 0, None).sum()
        gam = min(1.0, (4.6 + 0.054 * Q ** 1.56) / 100)
        ant = (np.arange(1, 366) >= H - 2) & (np.arange(1, 366) <= H + 7)
        tx = tmax[i][ant].mean()
        heat = 1 / (1 + np.exp(0.853 * (tx - 36.6)))
        ripe = min(1.0, dvi[364] - 1) if dvi[364] < 2 else 1.0
        Y[i] = 0.45 * W[i] * (1 - gam) * heat * ripe
        GC[i] = gam
    return Y, GC, W


def calibrate_G(wx, cent):
    """시도 그룹별 G: 2001~2012 실제 기온으로 평균 출수일(논 면적 가중) = H_TARGET."""
    yrs = list(range(2001, 2013))
    G = {}
    for grp in T0:
        sub = cent[cent.grp == grp]
        cand = np.arange(800, 1800, 10)
        best = None
        hs = []
        for _, r in sub.iterrows():
            g = wx[(wx.sc == r.sc) & (wx.stem == r.stem) & wx.y.isin(yrs)]
            c = cube(g, ["tavg"], yrs)["tavg"]
            gdd = np.clip(np.minimum(c, 30) - 10, 0, None)
            gdd[:, : T0[grp] - 1] = 0
            cs = gdd.cumsum(axis=1)
            hs.append([(cs >= G_).argmax(axis=1).mean() + 1 for G_ in cand])
        hs = np.average(np.array(hs), axis=0, weights=sub.paddy_ha.values)
        best = cand[np.argmin(np.abs(hs - H_TARGET[grp]))]
        G[grp] = float(best)
    return G


def run():
    wx = load()
    cent = pd.read_csv(os.path.join(HERE, "sigun_centroids.csv"), dtype={"sc": str})
    cent["grp"] = cent.sc.map(SD_GROUP)
    cent = cent[cent.grp.notna()]
    G = calibrate_G(wx, cent)
    print("G (℃·d, 이앙→출수):", G, flush=True)
    years = list(range(1980, int(wx.y.max()) + 1))
    rows = []
    for k, (_, r) in enumerate(cent.iterrows()):
        g = wx[(wx.sc == r.sc) & (wx.stem == r.stem)]
        c = cube(g, ["tavg", "tmax", "tmin", "rs", "ss", "rn", "gust"], years)
        t0 = T0[r.grp]
        Gs = adaptive_G(c["tavg"], t0, H_TARGET[r.grp]) if PHENO == "adaptive" else np.full(len(years), G[r.grp])
        # 일별 지표 함수 (실제)
        daily = {
            "cold_mei": np.clip(20 - c["tavg"], 0, None),
            "cold_q": np.clip(22 - c["tavg"], 0, None),
            "heat_ant": np.clip(c["tmax"] - 34, 0, None),
            "rs": c["rs"],
            "ptq": c["rs"] * np.exp(-((c["tavg"] - 22) / 6) ** 2),
            "tavg": c["tavg"],
            "sunless": (c["ss"] < 1).astype(float),
            "wind": np.clip(c["gust"] - 14, 0, None),
            "rain_hv": np.clip(c["rn"] - 80, 0, None),
            "wet": (c["rn"] >= 1).astype(float),
            "wind20": (c["gust"] >= 20).astype(float),
            "wind15": (c["gust"] >= 15).astype(float),
            "gust": c["gust"],
            "tmin": c["tmin"],
            "hot_fill": np.clip(c["tavg"] - 26, 0, None),
        }
        for tag, cut in ASOF.items():
            dd = {kk: clim_fill(v, cut, years) for kk, v in daily.items()}
            tav = dd["tavg"]
            h, cs = heading_doy(tav, t0, Gs)
            tmx = clim_fill(c["tmax"], cut, years)
            rsf = dd["rs"]
            Y, GC, W = simriw(tav, tmx, rsf, t0, h, Gs, cs)
            comp = {
                "heading": h,
                "cold_mei": wsum(dd["cold_mei"], h, -18, -6),
                "cold_q": wsum(dd["cold_q"], h, -25, 5),
                "heat_ant": wsum(dd["heat_ant"], h, -2, 7),
                "rs_pre": wsum(dd["rs"], h, -30, -1),
                "rs_fill": wsum(dd["rs"], h, 0, 40),
                "ptq_fill": wsum(dd["ptq"], h, 0, 40),
                "tfill": wsum(dd["tavg"], h, 0, 40) / 41,
                "sunless": wsum(dd["sunless"], h, -30, 40),
                "wind": wsum(dd["wind"], h, -10, 45),
                "rain_hv": wsum(dd["rain_hv"], h, -10, 45),
                "wet_head": wsum(dd["wet"], h, -10, 15),
                "wind20": wsum(dd["wind20"], h, -5, 40),
                "wind15": wsum(dd["wind15"], h, -10, 30),
                "sunless_pre": wsum(dd["sunless"], h, -30, -1),
                "sunless_post": wsum(dd["sunless"], h, 0, 40),
                "rs_pre25": wsum(dd["rs"], h, -25, -1),
                "wind_early": wsum(dd["wind"], h, 0, 25),
                "wind_max": wmax(np.where(np.arange(1, 366) <= cut, c["gust"], dd["gust"]), h, -5, 40),
                "tmin_fill": wsum(dd["tmin"], h, 0, 40) / 41,
                "hot_fill": wsum(dd["hot_fill"], h, 0, 40),
                "simriw": Y, "gamma_cold": GC, "biomass": W,
            }
            df = pd.DataFrame(comp)
            df["y"], df["asof"], df["sc"], df["stem"], df["paddy_ha"] = years, tag, r.sc, r.stem, r.paddy_ha
            rows.append(df)
        if k % 20 == 0:
            print(k, r.sc, r.stem, flush=True)
    out = pd.concat(rows, ignore_index=True)
    out = out[out.y >= 1983]  # 기후값 채움에 3년 이상 필요
    out.to_csv(os.path.join(HERE, f"components_sigun{SUFFIX}.csv.gz"), index=False, float_format="%.4g")
    # 시도(코드 그대로) 합산: 논 면적 가중
    num = [c for c in COMP]
    sd = out.groupby(["sc", "y", "asof"]).apply(lambda d: pd.Series(np.average(d[num], axis=0, weights=d.paddy_ha), index=num))
    sd = sd.reset_index()
    sd.to_csv(os.path.join(HERE, f"components_sido{SUFFIX}.csv"), index=False, float_format="%.4g")
    print(sd[(sd["asof"] == "1001")].groupby("y")[["heading", "cold_mei", "rs_fill", "sunless", "wind", "simriw"]].mean().round(1).tail(26))


if __name__ == "__main__":
    run()
