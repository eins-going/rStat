"""쌀 단수 예측 연구 공통 도구 — 모든 연구 갈래가 같은 정답·같은 검증으로 비교한다.

정답 (KOSIS DT_1ET0034, 논벼 정곡 10a당 생산량)
  targets()  시군-연도 표: y, sc(시도 2자리), stem(시군 이름에서 끝 글자 뺀 것), name, yield, area, base(올림픽 평년), a(yield/base-1)
             - 평년 = 직전 5년 중 최고·최저 뺀 3년 평균 (그해 이전 자료만 → 실시간에 쓸 수 있음)
             - 청주 2014 통합 전, 세종 2012 전 등 행정구역 끊김은 제외
  nation()   전국 연도별 yield, area, base, a

검증 (evaluate)
  - 예측표: DataFrame[y, sc, stem, pred_yield] (kg/10a). 시군 단위가 기본. 전국은 재배면적 가중 합으로 따로 계산.
  - 반드시 '실시간'(expanding window): y년 예측은 y년 이전 해 자료로만 학습·조정(하이퍼파라미터 포함). 같은 해 다른 시군 정답 사용 금지.
  - 기간: 2013~2025 (13년). Sentinel-2처럼 2017~만 가능한 자료는 2019~2025로 하되 같은 기간 평년과 비교.
  - 지표: 시군 RMSE·MAE(kg), 평년 대비 개선율(skill = 1 - RMSE/RMSE_평년), 같은 해 시군 순위상관 평균,
          전국 RMSE(면적가중 합), 2020년 전국 오차, 2020년 감수 시군(평년 대비 -5% 이하) 방향 적중률.
  - 예측 시점(as-of)을 꼭 밝힌다: 8/15, 9/15, 10/1 중 어디서 쓸 수 있는 자료만 썼는지.
  - 비교 기준: 평년(0 예측), 통계청 10월 예상(전국 ±5.7kg MAE), KREI 9월 전망(전국 ±7.0kg).

보조
  paddy_centroids()  시군별 논 격자 면적가중 중심 경위도 (기상 관측소 연결용)
  stations(), asos()  기상청 ASOS 관측소·일자료 (1980~2025)
"""
import os

import numpy as np
import pandas as pd

ROOT = "/home/eins/project/rStat"
R_EARTH, PX = 6371007.181, 231.65635826395834
X0, Y0 = -20015109.354, 10007554.677
SIDO = [("서울", "11"), ("부산", "21"), ("대구", "22"), ("인천", "23"), ("광주", "24"), ("대전", "25"), ("울산", "26"),
        ("세종", "29"), ("경기", "31"), ("강원", "32"), ("충청북", "33"), ("충북", "33"), ("충청남", "34"), ("충남", "34"),
        ("전라북", "35"), ("전북", "35"), ("전라남", "36"), ("전남", "36"), ("경상북", "37"), ("경북", "37"),
        ("경상남", "38"), ("경남", "38"), ("제주", "39")]


def sido_code(n):
    return next((c for p, c in SIDO if str(n).startswith(p)), None)


def _olympic(s):
    return s.shift(1).rolling(5, min_periods=5).apply(lambda w: np.sort(w)[1:-1].mean(), raw=True)


def _kosis():
    k = pd.read_csv(os.path.join(ROOT, "db/raw/kosis_rice/dt_1et0034.csv"), dtype={"code": str})
    k = k[k.item.isin(["10a당 생산량", "재배면적"])].pivot_table(
        index=["year", "code", "name"], columns="item", values="value").reset_index()
    k = k.rename(columns={"year": "y", "10a당 생산량": "yield", "재배면적": "area"})
    k.columns.name = None
    return k


def targets(min_area=0):
    k = _kosis()
    k["sc"] = k.code.str[:2]
    sg = k[k.code.str.len() > 2].copy()
    sej = k[k.code == "29"].copy()
    sej["name"] = "세종시"
    sg = pd.concat([sg, sej])
    sg = sg[~((sg.name == "청주시") & (sg.y < 2014))]
    sg["stem"] = sg.name.str[:-1]
    sg = sg.sort_values("y")
    sg["base"] = sg.groupby(["sc", "stem"])["yield"].transform(_olympic)
    sg["a"] = sg["yield"] / sg["base"] - 1
    sg = sg[sg.area >= min_area]
    return sg[["y", "sc", "stem", "name", "yield", "area", "base", "a"]].reset_index(drop=True)


def nation():
    k = _kosis()
    n = k[k.code == "00"].sort_values("y").copy()
    n["base"] = _olympic(n["yield"])
    n["a"] = n["yield"] / n["base"] - 1
    return n[["y", "yield", "area", "base", "a"]].reset_index(drop=True)


def paddy_centroids():
    px = pd.read_csv(os.path.join(ROOT, "db/clean/rice/paddy_modis.csv"))
    x = X0 + (px.col + 0.5) * PX
    yy = Y0 - (px.row + 0.5) * PX
    lat = yy / R_EARTH
    px["lat"] = np.degrees(lat)
    px["lon"] = np.degrees(x / (R_EARTH * np.cos(lat)))
    px["sc"] = px.sido.map(sido_code)
    px["stem"] = px.sigun.str[:-1]
    g = px.groupby(["sc", "stem"])
    w = px.paddy_m2
    out = pd.DataFrame({
        "lat": g.apply(lambda d: np.average(d.lat, weights=d.paddy_m2)),
        "lon": g.apply(lambda d: np.average(d.lon, weights=d.paddy_m2)),
        "paddy_ha": g.paddy_m2.sum() / 1e4}).reset_index()
    return out


def stations():
    return pd.read_csv(os.path.join(ROOT, "db/raw/kma/asos_stations.csv"))


def asos(cols=None):
    """일자료 (date int YYYYMMDD, stn, ta_avg, ta_max, ta_min, hm_avg, ws_avg, ws_ins, ss_day, ss_dur, si_day, rn_day). 약 150만 행."""
    return pd.read_csv(os.path.join(ROOT, "db/raw/kma/asos_daily.csv.gz"), usecols=cols)


def evaluate(pred, label="", years=range(2013, 2026), verbose=True):
    """pred: DataFrame[y, sc, stem, pred_yield]. 반환: 지표 dict."""
    t = targets()
    t = t[t.y.isin(list(years))].dropna(subset=["base"])
    d = t.merge(pred[["y", "sc", "stem", "pred_yield"]], on=["y", "sc", "stem"], how="inner").dropna(subset=["pred_yield"])
    if d.empty:
        raise ValueError("예측과 정답이 겹치지 않는다")
    e, e0 = d.pred_yield - d["yield"], d.base - d["yield"]
    w = d.area
    rm = lambda x: float(np.sqrt(np.average(x ** 2, weights=w)))  # noqa: E731 (면적가중)
    res = {"label": label, "n": int(len(d)), "years": f"{d.y.min()}~{d.y.max()}", "units": int(d.groupby(['sc', 'stem']).ngroups),
           "rmse": round(rm(e), 2), "rmse_base": round(rm(e0), 2),
           "mae": round(float(np.average(e.abs(), weights=w)), 2), "mae_base": round(float(np.average(e0.abs(), weights=w)), 2)}
    res["skill"] = round(1 - res["rmse"] / res["rmse_base"], 3)
    # 같은 해 시군들 사이: 예측 편차(pred/평년)와 실제 편차(yield/평년)의 순위상관 — 나쁜 시군을 가려내는 힘
    rs = [(g.pred_yield / g.base).rank().corr((g["yield"] / g.base).rank()) for _, g in d.groupby("y") if len(g) >= 20]
    rs = [r for r in rs if r == r]
    res["rank_r"] = round(float(np.mean(rs)), 3) if rs else None
    # 전국: 면적가중 합 (예측이 있는 시군만)
    nat = d.groupby("y").apply(lambda g: pd.Series({
        "pred": np.average(g.pred_yield, weights=g.area), "obs": np.average(g["yield"], weights=g.area),
        "base": np.average(g.base, weights=g.area)}))
    res["nat_rmse"] = round(float(np.sqrt(((nat.pred - nat.obs) ** 2).mean())), 2)
    res["nat_rmse_base"] = round(float(np.sqrt(((nat.base - nat.obs) ** 2).mean())), 2)
    if 2020 in nat.index:
        res["nat_err_2020"] = round(float(nat.loc[2020, "pred"] - nat.loc[2020, "obs"]), 1)
        g = d[d.y == 2020]
        bad = g[g["yield"] / g.base - 1 <= -0.05]
        res["hit_2020"] = round(float(((bad.pred_yield / bad.base - 1) < 0).mean()), 3) if len(bad) else None
    if verbose:
        print(f"[{label}] n={res['n']} {res['years']} 시군 {res['units']} | 시군 RMSE {res['rmse']} (평년 {res['rmse_base']}, skill {res['skill']:+.3f})"
              f" | 순위r {res['rank_r']} | 전국 RMSE {res['nat_rmse']} (평년 {res['nat_rmse_base']}) | 2020 전국오차 {res.get('nat_err_2020')} 감수시군 적중 {res.get('hit_2020')}")
    return res


if __name__ == "__main__":
    t = targets()
    print(t.tail(), len(t), t.groupby(["sc", "stem"]).ngroups)
    base = t[["y", "sc", "stem"]].assign(pred_yield=t.base)
    evaluate(base, "평년 그대로")
    print(paddy_centroids().head())
