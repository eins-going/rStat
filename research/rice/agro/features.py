"""농업기상(농진청 217곳) 특징 — 시군·시도 × 연도 × 예측시점.

시군 일기상: 시군 논 중심(cropmodel/sigun_centroids.csv)에서 30km 안, 해발 400m 미만 농업기상 관측소 중
            그날 자료가 있는 가까운 3곳 역거리제곱 가중. 없으면 결측.
생육 창: cropmodel 시군 출수일 H(같은 예측시점 행의 heading) 기준
  pre30 H-30..H-1 · fill H..H+40 · head H-10..H+15
예측시점 cutoff(0815·0915·1001) 뒤 날은 쓰지 않는다.

특징
  d_rs_pre, d_rs_fill  Σ(실측 일사 − ASOS 일조 추정 일사) [MJ/m2] — 지금 모델 입력이 틀린 만큼 (평년 불필요)
  d_t_fill             등숙기 평균 (농업기상 기온 − ASOS 보간 기온) [℃]
  wet_head             출수기 결로시간 합 [h]의 그 시군 이전 해(3년 이상) 평균 대비 편차
  wetd_head            출수기 '결로 10시간 이상 & 일평균 20~28℃' 날수의 같은 편차 (도열병 감염 조건)
  rs_pre_a, rs_fill_a  실측 일사 합의 이전 해 평균 대비 편차 (참고)
창 안 유효일이 70% 미만이면 결측, 아니면 빈 날을 평균으로 채워 창 길이로 환산.
출력: feat_sigun.csv, feat_sido.csv (논 면적 가중, 유효 시군만)
사용: OMP_NUM_THREADS=2 memcap -m 3G python3 research/rice/agro/features.py
"""
import os

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
RICE = os.path.dirname(HERE)
CM = os.path.join(RICE, "cropmodel")
CUT = {"0815": pd.Timestamp(2001, 8, 15).dayofyear, "0915": pd.Timestamp(2001, 9, 15).dayofyear,
       "1001": pd.Timestamp(2001, 10, 1).dayofyear}
WIN = {"pre30": (-30, -1), "fill": (0, 40), "head": (-10, 15)}
MAXKM, NEAR = 30, 3


def sigun_daily():
    sp = pd.read_csv(os.path.join(HERE, "data", "spots.csv"), dtype={"Obsr_Spot_Code": str})
    sp = sp.rename(columns={"Obsr_Spot_Code": "code", "Instl_La": "lat", "Instl_Lo": "lon", "Instl_Al": "alt"})
    sp = sp[sp.alt < 400]
    d = pd.read_csv(os.path.join(HERE, "data", "agro_daily.csv.gz"), dtype={"code": str})
    d = d[d.code.isin(sp.code)].copy()
    d["date"] = pd.to_datetime(d.date)
    d = d[d.date.dt.month.between(6, 10)]
    # 품질: 범위 밖은 결측
    d.loc[~d.srqty.between(0, 36), "srqty"] = np.nan
    d.loc[~d.temp.between(-5, 40), "temp"] = np.nan
    d.loc[~d.condens_Time.between(0, 1440), "condens_Time"] = np.nan
    pc = pd.read_csv(os.path.join(CM, "sigun_centroids.csv"), dtype={"sc": str})
    la0, lo0 = np.radians(sp.lat.values), np.radians(sp.lon.values)
    out = []
    for _, r in pc.iterrows():
        la, lo = np.radians(r.lat), np.radians(r.lon)
        km = 6371 * np.arccos(np.clip(np.sin(la) * np.sin(la0) + np.cos(la) * np.cos(la0) * np.cos(lo - lo0), -1, 1))
        cand = pd.Series(km, index=sp.code.values)
        cand = cand[cand <= MAXKM].nsmallest(6)
        if cand.empty:
            continue
        sub = d[d.code.isin(cand.index)]
        res = {}
        for v, nm in [("srqty", "rs_a"), ("temp", "tavg_a"), ("condens_Time", "wet_a")]:
            p = sub.pivot_table(index="date", columns="code", values=v)
            if p.empty:
                continue
            wv = 1 / np.maximum(cand[p.columns].values, 2) ** 2
            w = pd.DataFrame(np.tile(wv, (len(p), 1)), index=p.index, columns=p.columns).where(p.notna())
            w = w.where(w.rank(axis=1, ascending=False) <= NEAR)
            res[nm] = (p * w).sum(axis=1) / w.sum(axis=1)
        if not res:
            continue
        g = pd.DataFrame(res)
        g["sc"], g["stem"], g["km1"] = r.sc, r.stem, float(cand.iloc[0])
        out.append(g.reset_index())
    a = pd.concat(out, ignore_index=True)
    a["y"], a["doy"] = a.date.dt.year, a.date.dt.dayofyear
    return a, pc


def window_sum(df, col, lo, hi, cut, min_frac=0.7):
    """시군-연도별 [H+lo, H+hi] ∩ ≤cut 의 col 합(빈 날 평균으로 채움). 유효 70% 미만 결측."""
    m = (df.doy >= df.H + lo) & (df.doy <= df.H + hi) & (df.doy <= cut)
    x = df[m]
    n_win = (np.minimum(x.H + hi, cut) - (x.H + lo) + 1).groupby([x.sc, x.stem, x.y]).first()
    g = x.groupby(["sc", "stem", "y"])[col]
    s, n = g.mean(), g.count()
    v = s * n_win
    v[n < min_frac * n_win] = np.nan
    v[n_win <= 0] = 0.0
    return v


def main():
    a, pc = sigun_daily()
    print("농업기상 시군 일자료", a.shape, "시군", a[["sc", "stem"]].drop_duplicates().shape[0], "연도", a.y.min(), a.y.max(), flush=True)
    wx = pd.read_pickle(os.path.join(CM, "wx_sigun.pkl"))
    wx = wx[(wx.y >= a.y.min()) & (wx.doy.between(150, 300))][["sc", "stem", "y", "doy", "rs", "tavg"]]
    a = a.merge(wx, on=["sc", "stem", "y", "doy"], how="left")
    a["d_rs"] = a.rs_a - a.rs
    a["d_t"] = a.tavg_a - a.tavg
    a["wet_h"] = a.wet_a / 60.0
    a["wetd"] = ((a.wet_a >= 600) & a.tavg_a.between(20, 28)).astype(float).where(a.wet_a.notna() & a.tavg_a.notna())
    cs = pd.read_csv(os.path.join(CM, "components_sigun_fixed.csv.gz"), dtype={"sc": str, "asof": str},
                     usecols=["sc", "stem", "y", "asof", "heading"])
    feats = []
    for asof, cut in CUT.items():
        h = cs[cs["asof"] == asof][["sc", "stem", "y", "heading"]].rename(columns={"heading": "H"})
        x = a.merge(h, on=["sc", "stem", "y"])
        f = pd.DataFrame({
            "d_rs_pre": window_sum(x, "d_rs", *WIN["pre30"], cut),
            "d_rs_fill": window_sum(x, "d_rs", *WIN["fill"], cut),
            "rs_pre_a": window_sum(x, "rs_a", *WIN["pre30"], cut),
            "rs_fill_a": window_sum(x, "rs_a", *WIN["fill"], cut),
            "wet_head": window_sum(x, "wet_h", *WIN["head"], cut),
            "wetd_head": window_sum(x, "wetd", *WIN["head"], cut),
        })
        tf = window_sum(x, "d_t", *WIN["fill"], cut)
        nf = (np.minimum(h.set_index(["sc", "stem", "y"]).H + 40, cut) - h.set_index(["sc", "stem", "y"]).H + 1).clip(lower=1)
        f["d_t_fill"] = tf / nf.reindex(tf.index)
        f = f.reset_index()
        f["asof"] = asof
        feats.append(f)
    f = pd.concat(feats, ignore_index=True).sort_values(["sc", "stem", "asof", "y"])
    # 절대량 특징은 그 시군 이전 해(3년 이상) 평균 대비 편차로 (실시간)
    for c in ["wet_head", "wetd_head", "rs_pre_a", "rs_fill_a"]:
        prior = f.groupby(["sc", "stem", "asof"])[c].transform(lambda s: s.shift(1).expanding(min_periods=3).mean())
        f[c] = f[c] - prior
    f = f.merge(pc[["sc", "stem", "paddy_ha"]], on=["sc", "stem"], how="left")
    f.drop(columns="paddy_ha").to_csv(os.path.join(HERE, "feat_sigun.csv"), index=False)
    cols = ["d_rs_pre", "d_rs_fill", "d_t_fill", "wet_head", "wetd_head", "rs_pre_a", "rs_fill_a"]
    rows = []
    for (sc, y, asof), g in f.groupby(["sc", "y", "asof"]):
        o = {"sc": sc, "y": y, "asof": asof}
        for c in cols:
            v = g[[c, "paddy_ha"]].dropna()
            o[c] = np.average(v[c], weights=v.paddy_ha) if v.paddy_ha.sum() > 0 else np.nan
            o[c + "_cov"] = v.paddy_ha.sum() / g.paddy_ha.sum()
        rows.append(o)
    s = pd.DataFrame(rows)
    s.to_csv(os.path.join(HERE, "feat_sido.csv"), index=False)
    print("시군 특징", f.shape, "\n결측률", f[cols].isna().mean().round(2).to_dict())
    print("시도 특징 연도별 유효(0915, 8도)\n", s[(s["asof"] == "0915") & s.sc.isin(list("31 32 33 34 35 36 37 38".split()))]
          .groupby("y")[["d_rs_pre", "wet_head"]].count().T.to_string())


if __name__ == "__main__":
    main()
