"""출수 정렬 5일 구간 기상 곡선 (시도-연도) — 기능적(functional) 모델 입력.

시군 논 중심 일기상(cropmodel/wx_sigun.pkl)과 시군별 출수일(components_sigun_fixed, PHENO=fixed)로
출수 −50..+49일(100일, 5일 × 20구간) 일값을 정렬한다.
변수(6): tavg, tmax, tmin, rs(일사, MJ), wet(강수 ≥1mm 일 → 구간 강우일 비율), gust(일 최대순간풍속; 결측은 wavg×2.2, cropmodel과 같음)
편차 = 그해 정렬 일값 − 직전 5년(완전 시즌) 같은 상대일 평균 → 시군 편차를 논 면적 가중 평균으로 시도(sc 코드 그대로) 합산 → 5일 평균.
예측 시점: 달력일 > cutoff(9/15=258, 10/1=274) 인 날은 편차 0 (= 기대값). 학습용 'full'은 가림 없음(cropmodel이 1001 표로 학습하는 것과 같은 자리).
출수일: full·1001은 asof=1001 출수일, 0915는 asof=0915 출수일(9/15 이전 출수라 사실상 같음).
"""
import os
import numpy as np, pandas as pd

R = "/home/eins/project/rStat/research/rice"
VARS = ["tavg", "tmax", "tmin", "rs", "wet", "gust"]
NB, BW, LO = 20, 5, -50
CUT = {"0915": 258, "1001": 274}


def main():
    wx = pd.read_pickle(f"{R}/cropmodel/wx_sigun.pkl")
    wx = wx[(wx.doy <= 365) & (wx.y <= 2025)].copy()
    wx["gust"] = wx.gust.fillna(wx.wavg * 2.2)
    wx["wet"] = (wx.rn >= 1).astype("float32")
    hd = pd.read_csv(f"{R}/cropmodel/components_sigun_fixed.csv.gz", dtype={"sc": str, "asof": str},
                     usecols=["sc", "stem", "y", "asof", "heading", "paddy_ha"])
    years = list(range(1980, 2026))
    out = {t: [] for t in ("full", "0915", "1001")}
    for (sc, stem), g in wx.groupby(["sc", "stem"]):
        h = hd[(hd.sc == sc) & (hd.stem == stem)]
        if h.empty:
            continue
        pha = float(h.paddy_ha.iloc[0])
        idx = pd.MultiIndex.from_product([years, range(1, 366)], names=["y", "doy"])
        gg = g.set_index(["y", "doy"])[VARS].reindex(idx)
        gg = gg.groupby(level="doy").transform(lambda s: s.interpolate(limit_direction="both"))
        cube = {v: gg[v].values.reshape(len(years), 365) for v in VARS}
        H = {t: h[h["asof"] == ("1001" if t == "full" else t)].set_index("y").heading.reindex(years).values for t in out}
        rel = np.arange(LO, LO + NB * BW)
        def align(t):
            A = {v: np.full((len(years), len(rel)), np.nan) for v in VARS}
            doy = np.full((len(years), len(rel)), 999)
            for i in range(len(years)):
                if not (H[t][i] == H[t][i]) or H[t][i] >= 300:
                    continue
                d = (int(H[t][i]) + rel).clip(1, 365)
                doy[i] = d
                for v in VARS:
                    A[v][i] = cube[v][i, d - 1]
            return A, doy
        Af, _ = align("full")
        prev = {v: pd.DataFrame(Af[v]).shift(1).rolling(5, min_periods=5).mean().values for v in VARS}
        for t in out:
            A, doy = (Af, None) if t == "full" else align(t)
            rec = {}
            for v in VARS:
                D = A[v] - prev[v]
                if t != "full":
                    D = np.where(doy > CUT[t], 0.0, D)
                rec[v] = D.reshape(len(years), NB, BW).mean(2)
            df = pd.DataFrame(np.hstack([rec[v] for v in VARS]), columns=[f"{v}_{b:02d}" for v in VARS for b in range(NB)])
            df["y"], df["sc"], df["stem"], df["w"] = years, sc, stem, pha
            out[t].append(df)
    cols = [f"{v}_{b:02d}" for v in VARS for b in range(NB)]
    res = []
    for t, L in out.items():
        d = pd.concat(L).dropna(subset=cols)
        s = d.groupby(["sc", "y"]).apply(lambda q: pd.Series(np.average(q[cols], axis=0, weights=q.w), index=cols)).reset_index()
        s["asof"] = t
        res.append(s)
    res = pd.concat(res, ignore_index=True)
    res.to_pickle(f"{R}/functional/curves_sido.pkl")
    print(res.shape, res.groupby("asof").y.agg(["min", "max", "count"]))


if __name__ == "__main__":
    main()
