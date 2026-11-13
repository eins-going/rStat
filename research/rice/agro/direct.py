"""자료원 비교: 기상청(ASOS 보간) 기상만 / 농업기상(농진청 실측)만 / 둘 다 — 같은 단순 모형 · 같은 해 · 같은 시군으로.

사용자 질문(11-13): "기존 기상청 자료 + 농업기상인가, 농업기상만 새로 쓰는가?" → 지금까지는 모두 앞쪽(M4 잔차에 덧붙임).
여기서는 농업기상만으로 세운 모형이 기상청만으로 세운 같은 모형보다 나은지 직접 본다. (결과 보기 전 고정)
  변수(두 자료원 공통 8개): 출수 전 30일(H−30..H−1) · 등숙기(H..H+40, 예측시점까지)의 일사 · 평균기온 · 강수 일평균, 등숙기 습도 평균 · 최대순간풍속 최댓값
  편차: 시군 값 − 그 시군 이전 해 평균(2년 이상, 실시간) → 시도 논 면적 가중
  모형: 시도 편차 a(단수/평년 − 1)를 직접 릿지(표준화 원점, λ=10 주 · 30 · 100 참고), y년은 그 전 해로만 학습(3년 이상)
  비교: 평년 / KMA짧게(농업기상과 같은 해 · 같은 시군) / AG / KMA+AG / KMA길게(1996~ 학습) / M4(지금 모형) / M4+d_rs_fill
  평가: 2016~2026 8도 RMSE(kg) · 시군 skill · 8도합 전국 MAE, 시점 8/15 · 9/15
사용: OMP_NUM_THREADS=2 memcap -m 3G .venv/bin/python research/rice/agro/direct.py
"""
import importlib.util, os, sys, warnings
import numpy as np, pandas as pd
warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__)); RICE = os.path.dirname(HERE); CM = os.path.join(RICE, "cropmodel")
_sp = importlib.util.spec_from_file_location("agro_model", os.path.join(HERE, "model.py"))
AM = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(AM)
B, M, common = AM.B, AM.M, AM.common
CUT = {"0815": 227, "0915": 258}
EVAL = range(2016, 2027)
AGV = {"srqty": ("rs", 0, 36), "temp": ("tavg", -5, 40), "rn": ("rain", 0, 500), "hum": ("hum", 5, 100), "max_Wind": ("wmax", 0, 70)}
FEATS = ["rs_pre", "rs_fill", "tavg_pre", "tavg_fill", "rain_pre", "rain_fill", "hum_fill", "wmax_fill"]
rm = lambda e, w: float(np.sqrt(np.average(np.asarray(e) ** 2, weights=w)))  # noqa: E731


def agro_daily():
    sp = pd.read_csv(os.path.join(HERE, "data", "spots.csv"), dtype={"Obsr_Spot_Code": str}).rename(
        columns={"Obsr_Spot_Code": "code", "Instl_La": "lat", "Instl_Lo": "lon", "Instl_Al": "alt"})
    sp = sp[sp.alt < 400]
    d = pd.read_csv(os.path.join(HERE, "data", "agro_daily.csv.gz"), dtype={"code": str}, usecols=["code", "date"] + list(AGV))
    d = d[d.code.isin(sp.code)].copy(); d["date"] = pd.to_datetime(d.date); d = d[d.date.dt.month.between(6, 10)]
    for c, (_, lo, hi) in AGV.items():
        d.loc[~d[c].between(lo, hi), c] = np.nan
    pc = pd.read_csv(os.path.join(CM, "sigun_centroids.csv"), dtype={"sc": str})
    la0, lo0 = np.radians(sp.lat.values), np.radians(sp.lon.values)
    out = []
    for _, r in pc.iterrows():
        la, lo = np.radians(r.lat), np.radians(r.lon)
        km = 6371 * np.arccos(np.clip(np.sin(la) * np.sin(la0) + np.cos(la) * np.cos(la0) * np.cos(lo - lo0), -1, 1))
        cand = pd.Series(km, index=sp.code.values); cand = cand[cand <= 30].nsmallest(6)
        if cand.empty: continue
        sub = d[d.code.isin(cand.index)]; res = {}
        for c, (nm, _, _) in AGV.items():
            p = sub.pivot_table(index="date", columns="code", values=c)
            if p.empty: continue
            wv = 1 / np.maximum(cand[p.columns].values, 2) ** 2
            w = pd.DataFrame(np.tile(wv, (len(p), 1)), index=p.index, columns=p.columns).where(p.notna())
            w = w.where(w.rank(axis=1, ascending=False) <= 3)
            res[nm] = (p * w).sum(axis=1) / w.sum(axis=1)
        if not res: continue
        g = pd.DataFrame(res); g["sc"], g["stem"] = r.sc, r.stem
        out.append(g.reset_index())
    a = pd.concat(out, ignore_index=True); a["y"], a["doy"] = a.date.dt.year, a.date.dt.dayofyear
    return a, pc


def wstat(x, col, lo, hi, cut, how="mean"):
    m = (x.doy >= x.H + lo) & (x.doy <= x.H + hi) & (x.doy <= cut); z = x[m]
    n_win = (np.minimum(z.H + hi, cut) - (z.H + lo) + 1).groupby([z.sc, z.stem, z.y]).first()
    g = z.groupby(["sc", "stem", "y"])[col]
    v = g.mean() if how == "mean" else g.max()
    v[(g.count() < 0.7 * n_win) | (n_win < 5)] = np.nan
    return v


def feats(daily, h, cut):
    x = daily.merge(h, on=["sc", "stem", "y"])
    f = pd.DataFrame({"rs_pre": wstat(x, "rs", -30, -1, cut), "rs_fill": wstat(x, "rs", 0, 40, cut),
                      "tavg_pre": wstat(x, "tavg", -30, -1, cut), "tavg_fill": wstat(x, "tavg", 0, 40, cut),
                      "rain_pre": wstat(x, "rain", -30, -1, cut), "rain_fill": wstat(x, "rain", 0, 40, cut),
                      "hum_fill": wstat(x, "hum", 0, 40, cut), "wmax_fill": wstat(x, "wmax", 0, 40, cut, "max")}).reset_index()
    f = f.sort_values(["sc", "stem", "y"])
    for c in FEATS:  # 그 시군 이전 해 평균 대비(실시간)
        f[c] = f[c] - f.groupby(["sc", "stem"])[c].transform(lambda s: s.shift(1).expanding(min_periods=2).mean())
    return f


def to_sido(f, pc, pre=""):
    f = f.merge(pc[["sc", "stem", "paddy_ha"]], on=["sc", "stem"], how="left"); rows = []
    for (sc, y), g in f.groupby(["sc", "y"]):
        o = {"sc": sc, "y": y}
        for c in FEATS:
            v = g[[c, "paddy_ha"]].dropna()
            o[pre + c] = np.average(v[c], weights=v.paddy_ha) if v.paddy_ha.sum() > 0 else np.nan
        rows.append(o)
    return pd.DataFrame(rows)


def direct(X, st, cols, lam, first):
    d = X.merge(st, on=["sc", "y"]); d = d[d.sc.isin(M.PROV) & d.a.notna() & (d.y >= first)].copy()
    d["w"] = np.sqrt(d.area / d.area.mean()); rows = []
    for Y in EVAL:
        tr = d[d.y < Y].dropna(subset=cols); te = d[d.y == Y]
        if tr.y.nunique() < 3: continue
        b = AM.ridge0(tr[cols].values, tr.a.values, tr.w.values, lam)
        rows.append(te[["sc", "y"]].assign(ahat=np.nan_to_num(te[cols].values) @ b))
    return pd.concat(rows)


def score(p, st):
    q = p.merge(st, on=["sc", "y"]); q = q[q.sc.isin(M.PROV) & q.y.isin(list(EVAL))]
    e = q.base * (1 + q.ahat) - q["yield"]
    nat = q.assign(e=e).groupby("y").apply(lambda g: np.average(g.e, weights=g.area))
    r = common.evaluate(M.to_sigun(p), "", years=EVAL, verbose=False)
    yr = q.assign(e=e).groupby("y").apply(lambda g: rm(g.e, g.area))
    return rm(e, q.area), r["skill"], float(nat.abs().mean()), yr


def main():
    ag, pc = agro_daily()
    wx = pd.read_pickle(os.path.join(CM, "wx_sigun.pkl"))
    wx = wx[(wx.y >= 1988) & wx.doy.between(150, 300)].rename(columns={"rn": "rain", "hm": "hum", "gust": "wmax"})[["sc", "stem", "y", "doy", "rs", "tavg", "rain", "hum", "wmax"]]
    cs = pd.read_csv(os.path.join(CM, "components_sigun_fixed.csv.gz"), dtype={"sc": str, "asof": str}, usecols=["sc", "stem", "y", "asof", "heading"])
    comp, _, an, _ = B.load(); st = M.sido_targets(); fs, _ = AM.load_feats()
    print(f"농업기상 시군 {ag[['sc', 'stem']].drop_duplicates().shape[0]}곳 · {ag.y.min()}~{ag.y.max()} | 평가 {EVAL[0]}~{EVAL[-1]}")
    for asof, cut in CUT.items():
        h = cs[cs["asof"] == asof][["sc", "stem", "y", "heading"]].rename(columns={"heading": "H"})
        fa = feats(ag, h, cut)
        cells = ag[["sc", "stem", "y"]].drop_duplicates()
        fk_s = feats(wx.merge(cells, on=["sc", "stem", "y"]), h, cut)     # 같은 해 · 같은 시군
        fk_l = feats(wx, h, cut)                                           # 1988~ 전체
        A, Ks, Kl = to_sido(fa, pc, "ag_"), to_sido(fk_s, pc, "k_"), to_sido(fk_l, pc, "k_")
        ac, kc = ["ag_" + c for c in FEATS], ["k_" + c for c in FEATS]
        both = A.merge(Ks, on=["sc", "y"])
        m4 = M.backtest(an, st, B.M4, asof, icpt="cw", years=range(1996, 2027))[0][["sc", "y", "ahat"]]
        f = fs[fs["asof"] == asof][["sc", "y", "d_rs_fill"]]
        d = m4.merge(st, on=["sc", "y"]).merge(f, on=["sc", "y"], how="left"); d = d[d.sc.isin(M.PROV)].copy()
        d["r"] = d.a - d.ahat; d["w"] = np.sqrt(d.area / d.area.mean()); m4d = m4.copy()
        for Y in EVAL:
            tr = d[d.y < Y].dropna(subset=["d_rs_fill", "r"])
            b = AM.ridge0(tr[["d_rs_fill"]].values, tr.r.values, tr.w.values, 10.0)
            te = m4[m4.y == Y].merge(f, on=["sc", "y"], how="left")
            m4d.loc[m4d.y == Y, "ahat"] = te.ahat.values + np.nan_to_num(te[["d_rs_fill"]].values) @ b
        zero = m4.assign(ahat=0.0)
        print(f"\n[{asof}]  {'':<34}8도 RMSE  시군 skill  전국 MAE   해마다 8도 RMSE")
        cand = {"평년": zero}
        for lam in (10.0, 30.0, 100.0):
            cand[f"기상청만 · 같은 해(2013~) λ{lam:g}"] = direct(Ks, st, kc, lam, 2011)
            cand[f"농업기상만 λ{lam:g}"] = direct(A, st, ac, lam, 2011)
            cand[f"기상청 + 농업기상 λ{lam:g}"] = direct(both, st, kc + ac, lam, 2011)
            cand[f"기상청만 · 길게(1996~) λ{lam:g}"] = direct(Kl, st, kc, lam, 1996)
        cand["지금 모형 M4(기상청, 작물 생리)"] = m4
        cand["M4 + 농업기상 일사 차이(d_rs_fill)"] = m4d
        for nm, p in cand.items():
            s, k, n, yr = score(p[["sc", "y", "ahat"]], st)
            print(f"  {nm:<36}{s:>7.2f}  {k:>+9.3f}  {n:>8.2f}   " + " ".join(f"{str(y)[2:]}:{v:.0f}" for y, v in yr.items()))


if __name__ == "__main__":
    main()
