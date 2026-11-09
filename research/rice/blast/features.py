"""도열병(특히 이삭목·이삭도열병) 감염 위험 지수 — 일별 기상(시군 논 중심 IDW, cropmodel/wx_sigun.pkl)에서 계산.

사전 등록 (2026-11-09 03:50 KST, 단수 자료를 보기 전에 작성; 이 문서의 정의·창·주 지표는 결과를 본 뒤 바꾸지 않는다)
------------------------------------------------------------------------------------------------
목적: 작물모델 M4의 거친 대리 변수 wet_head(출수 H−10..H+15 강우 ≥1mm 일수)를 문헌식 감염 위험 지수로 바꾸거나 더하면
      실시간 시군 skill이 좋아지는가.

일별 감염 적합도 (EPIRICE 방식, Savary et al. 2012 Crop Protection 34:6-17 의 잎도열병 일별 감염효율 = 습윤 × 온도 함수)
  습윤일 W_d = 1  if  강수 rn ≥ 0.5 mm  또는  일평균 상대습도 hm ≥ 90 %   (EPIRICE: RH ≥ 90% 를 잎 젖음 대리로 씀;
               강수 0.5mm 는 우리나라 BLAST 계열·일본 BLASTAM 의 '강우 있음' 기준을 일자료로 옮긴 것)
  온도 f(T)  = Yin et al.(1995) 베타 함수, Tmin 15 ℃, Topt 26 ℃, Tmax 35 ℃, 일평균기온 T 사용
               (Ou 1985 'Rice Diseases': 도열병 감염·병반 형성 적온 24~28 ℃, 15 ℃ 아래·35 ℃ 위에서 거의 없음)
               f = ((Tmax−T)/(Tmax−Topt)) · ((T−Tmin)/(Topt−Tmin))^((Topt−Tmin)/(Tmax−Topt)),  T∉(Tmin,Tmax) → 0
  r_d = W_d · f(T_d)   (0~1)

지표 (시군에서 계산 → 논 면적 가중으로 시도 합산, components.py 와 같은 방식)
  blast_neck   Σ r_d,  H−5 .. H+15   (이삭목·이삭도열병 감염 창: 출수 직전 잎집 속 이삭 ~ 출수 후 2주)   ← 주 지표(PRIMARY)
  blast_leaf   Σ r_d,  H−30 .. H−6   (잎도열병 → 이삭으로 옮는 전염원 창)                                 ← 보조
  blastam_leaf BLASTAM(Koshimizu 1988) 일자료판: 습윤일 W_d 이면서 직전 5일 평균기온 20~25 ℃ 인 날 수, H−30..H−6  ← 보조
  진단용(특징 아님): wet_neck_cnt = H−5..H+15 습윤일 수 (온도 함수 효과를 떼어 보기 위함)
  (출수일 H 는 cropmodel/components_sigun_fixed.csv.gz 의 heading — PHENO=fixed, as-of 마다 다름)

예측 시점(as-of): components.py 와 같다. cutoff(8/15·9/15·10/1) 이후 날은 일별 r_d 의 직전 10년 같은 날 평균(기대값).
  9/15 예측은 9/15까지의 관측만 쓴다. (출수가 8월 중순이면 H+15 ≈ 8/31 이라 9/15·10/1 값은 사실상 같다.)

평가 (blast/evaluate.py; lswi/analyze.py 의 하네스 그대로, 학습 8도 1985~(y−1), λ=3, 절편 cw)
  (a) 주: M4 에서 wet_head → blast_neck 으로 교체              (b) 주: M4 + blast_neck
  보조: M4 + blast_leaf, M4 − wet_head + blast_neck + blast_leaf, M4 + blastam_leaf
  (c) 도 안: 시군 지표 편차 − 시도 지표 편차 vs 시군 a − 시도 a, γ 해마다 실시간(y<Y 시군-연도, 2001~) 적합 → 시군 â = 시도 â + γ·Δ
  판정(미리): 9/15 시군 skill 이 기준 +0.305 보다 +0.005 이상 좋고, 10/1 도 나빠지지 않고, 8도 1996~2012 시도 skill 이 나빠지지 않을 때만 채택.
"""
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
R = os.path.dirname(HERE)
sys.path[:0] = [R, os.path.join(R, "cropmodel")]
from components import ASOF, clim_fill, cube, wsum  # noqa: E402

TMIN, TOPT, TMAX = 15.0, 26.0, 35.0
FEATS = ["blast_neck", "blast_leaf", "blastam_leaf", "wet_neck_cnt"]


def beta_t(t):
    t = np.asarray(t, float)
    e = (TOPT - TMIN) / (TMAX - TOPT)
    x = np.clip((TMAX - t) / (TMAX - TOPT), 0, None) * np.clip((t - TMIN) / (TOPT - TMIN), 0, None) ** e
    return np.where((t > TMIN) & (t < TMAX), x, 0.0)


def run():
    wx = pd.read_pickle(os.path.join(R, "cropmodel/wx_sigun.pkl"))
    wx = wx[wx.doy <= 365]
    cs = pd.read_csv(os.path.join(R, "cropmodel/components_sigun_fixed.csv.gz"), dtype={"sc": str, "asof": str},
                     usecols=["heading", "y", "asof", "sc", "stem", "paddy_ha"])
    years = list(range(1980, int(wx.y.max()) + 1))
    rows = []
    wetfrac = []
    for k, ((sc, stem), hd) in enumerate(cs.groupby(["sc", "stem"])):
        g = wx[(wx.sc == sc) & (wx.stem == stem)]
        if g.empty:
            continue
        c = cube(g, ["tavg", "rn", "hm"], years)
        wet = ((c["rn"] >= 0.5) | (c["hm"] >= 90)).astype(float)
        r = wet * beta_t(c["tavg"])
        t5 = pd.DataFrame(c["tavg"].T).rolling(5, min_periods=1).mean().shift(1).bfill().values.T  # 직전 5일 평균
        bam = wet * ((t5 >= 20) & (t5 <= 25))
        wetfrac.append(wet[:, 200:260].mean())
        for tag, cut in ASOF.items():
            rr, bb, ww = clim_fill(r, cut, years), clim_fill(bam, cut, years), clim_fill(wet, cut, years)
            h = hd[hd["asof"] == tag].set_index("y").heading.reindex(years)
            ok = h.notna().values
            hh = h.fillna(220).astype(int).values
            df = pd.DataFrame({
                "y": years, "asof": tag, "sc": sc, "stem": stem,
                "blast_neck": wsum(rr, hh, -5, 15), "blast_leaf": wsum(rr, hh, -30, -6),
                "blastam_leaf": wsum(bb, hh, -30, -6), "wet_neck_cnt": wsum(ww, hh, -5, 15)})
            df = df[ok]
            df["paddy_ha"] = hd.paddy_ha.iloc[0]
            rows.append(df)
        if k % 40 == 0:
            print(k, sc, stem, flush=True)
    out = pd.concat(rows, ignore_index=True)
    print("습윤일 비율(doy 200~260) 평균", round(float(np.mean(wetfrac)), 3))
    out.to_csv(os.path.join(HERE, "blast_sigun.csv.gz"), index=False, float_format="%.4g")
    sd = out.groupby(["sc", "y", "asof"]).apply(
        lambda d: pd.Series(np.average(d[FEATS], axis=0, weights=d.paddy_ha), index=FEATS)).reset_index()
    sd.to_csv(os.path.join(HERE, "blast_sido.csv"), index=False, float_format="%.4g")
    print(sd[sd["asof"] == "0915"].groupby("y")[FEATS].mean().round(2).tail(15))


if __name__ == "__main__":
    run()
