"""NCPMS 논벼 예찰 → 시도 × 연도 × 예측시점 특징 (실시간).

예측시점에 쓸 수 있는 회차: 조사기준일 ≤ cutoff  (0815 → 8/1 회차, 0915 → 9/1 회차, 1001 → 9/16 회차)
병해충 묶음별 감수율(%)
  np_loss    전체 병해충 감수율 합
  np_blast   잎·이삭도열병
  np_hopper  벼멸구·흰등멸구·애멸구
  np_sheath  잎집무늬마름병
  np_area    전체 발생면적율 합
각각 '쓸 수 있는 회차 중 최대'(그해 피해 정점)를 그 시도의 이전 해(3년 이상) 평균 대비 편차로.
시도 코드: NCPMS(행안부) → KOSIS (41→31 …, 46 전남광주통합 → 36)
출력: feat_sido.csv
"""
import os

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
SC = {41: "31", 42: "32", 43: "33", 44: "34", 45: "35", 46: "36", 47: "37", 48: "38", 11: "11", 26: "21", 27: "22", 28: "23",
      29: "24", 30: "25", 31: "26", 36: "29", 50: "39", 51: "32", 52: "35"}
CUT = {"0815": "0815", "0915": "0915", "1001": "1001"}
GROUPS = {"np_blast": ["잎도열병", "이삭도열병"], "np_hopper": ["벼멸구", "흰등멸구", "애멸구"], "np_sheath": ["잎집무늬마름병"]}


def main():
    d = pd.read_csv(os.path.join(HERE, "data", "ncpms_sido.csv.gz"))
    d["pest"] = d.dbyhsNm.str.extract(r"^(.*?)\(")[0]
    d["item"] = d.dbyhsNm.str.extract(r"\((.*?)\)")[0].str.replace("률", "율")
    d["sc"] = d.sidoCode.map(SC)
    d = d.dropna(subset=["sc"])
    d["mmdd"] = d.date.astype(str).str[4:8]
    out = []
    for asof, cut in CUT.items():
        x = d[d.mmdd <= cut]
        loss = x[x.item == "감수율"]
        # 회차마다 병해충 묶음 합 → 회차 중 최대
        def peak(sub, name):
            s = sub.groupby(["sc", "y", "round"]).inqireValue.sum().groupby(["sc", "y"]).max()
            return s.rename(name)
        cols = [peak(loss, "np_loss"), peak(x[x.item == "발생면적율"], "np_area")]
        for g, pests in GROUPS.items():
            cols.append(peak(loss[loss.pest.isin(pests)], g))
        f = pd.concat(cols, axis=1).reset_index()
        f["asof"] = asof
        out.append(f)
    f = pd.concat(out, ignore_index=True).sort_values(["sc", "asof", "y"])
    feats = ["np_loss", "np_area"] + list(GROUPS)
    f[feats] = f[feats].fillna(0)
    raw = f.copy()
    # 같은 해 8도 평균 대비(시도 간 차이만 — 그해 전국 수준은 작물 모델이 이미 봄), 원값(2014~ 전부 학습)
    prov = f.sc.isin(["31", "32", "33", "34", "35", "36", "37", "38"])
    for c in ["np_loss", "np_blast", "np_hopper"]:
        mu = f[prov].groupby(["y", "asof"])[c].mean().rename(c + "_mu")
        f = f.merge(mu, on=["y", "asof"], how="left")
        f[c + "_c"] = f[c] - f.pop(c + "_mu")
        f[c + "_raw"] = f[c]
    for c in feats:
        prior = f.groupby(["sc", "asof"])[c].transform(lambda s: s.shift(1).expanding(min_periods=3).mean())
        f[c] = f[c] - prior
    f.to_csv(os.path.join(HERE, "feat_sido.csv"), index=False)
    raw.to_csv(os.path.join(HERE, "feat_sido_raw.csv"), index=False)
    print(f.shape, "연도", f.y.min(), f.y.max())
    piv = raw[(raw["asof"] == "1001") & raw.sc.isin(["31", "33", "34", "35", "36", "37", "38"])].pivot(index="y", columns="sc", values="np_loss")
    print("전체 감수율 합(9/16 회차까지 최대, %)\n", piv.round(3).to_string())


if __name__ == "__main__":
    main()
