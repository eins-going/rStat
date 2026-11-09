"""NCPMS 예찰(raw/ncpms/ncpms_rice_survey_long.csv) → 시도·시군 피처. 수량은 보지 않는다(면적만).
출력: feats_sido.csv (y, sc, rnd, F_area, F_dmg), feats_sigun.csv (y, sc, stem, rnd, x_rate)
"""
import os
import sys

import pandas as pd

RICE = "/home/eins/project/rStat/research/rice"
sys.path.insert(0, RICE)
import common  # noqa: E402

D = os.path.dirname(os.path.abspath(__file__))
K = ["이삭도열병", "벼멸구", "흰등멸구", "세균벼알마름병", "깨씨무늬병", "흰잎마름병", "혹명나방", "먹노린재", "이삭누룩병"]
SIDO = {"경기": "31", "강원": "32", "충청북": "33", "충청남": "34", "전북": "35", "전남": "36", "경상북": "37", "경상남": "38"}


def sc_of(s):
    for k, v in SIDO.items():
        if s.startswith(k):
            return v
    return None


def stem_of(n):
    n = n.strip()
    if len(n) > 2 and n[-1] in "시군구":
        return n[:-1]
    return n


def main():
    d = pd.read_csv(os.path.join(D, "raw/ncpms/ncpms_rice_survey_long.csv"), dtype=str)
    d = d[d.sigun.notna() & (d.sigun.str.strip() != "")]
    d["value"] = pd.to_numeric(d.value, errors="coerce")
    d["y"] = d.year.astype(int)
    d["rnd"] = d.date.str[5:]
    d = d[d.rnd.isin(["09-01", "09-16"])]
    d["sc"] = d.sido.map(sc_of)
    d.loc[d.sigun == "군위군", "sc"] = "37"  # 2023 대구 편입, 정답은 경북 쪽으로 둠
    d = d[d.sc.notna()]
    d["stem"] = d.sigun.map(stem_of)
    d = d[~((d.sc == "36") & d.stem.isin(["광산", "남", "북", "서", "동", "남구", "북구", "서구", "동구"]))]  # 광주(2026 통합 전 별도 시도)
    t = common.targets()
    area = common._kosis()
    area = area[area.code.str.len() == 2].rename(columns={"code": "sc"})[["y", "sc", "area"]]

    # 시도: F_area = Σ_K 발생추정면적 / 시도 논 면적, F_dmg = Σ 12종 피해율 시군 평균
    a = d[(d.measure == "발생추정면적") & d.pest.isin(K)].groupby(["y", "sc", "rnd"]).value.sum().rename("dmg_ha").reset_index()
    a = a.merge(area, on=["y", "sc"], how="left")
    # 2026 면적: 통계청 2026 조사
    sf = pd.read_csv(os.path.join(RICE, "statdown/stat_forecast_sido.csv"), dtype={"sido_code": str})
    sf = sf[sf.year == 2026].set_index("sido_code").area_ha
    m = a.y == 2026
    a.loc[m, "area"] = a.loc[m, "sc"].map(sf)
    a["F_area"] = a.dmg_ha / a.area
    g = d[d.measure == "피해율"].groupby(["y", "sc", "rnd", "pest"]).value.mean().groupby(["y", "sc", "rnd"]).sum().rename("F_dmg").reset_index()
    fs = a.merge(g, on=["y", "sc", "rnd"])
    fs.to_csv(os.path.join(D, "feats_sido.csv"), index=False)
    print(fs.pivot_table(index="y", columns="sc", values="F_area", aggfunc="first").query("index>0").round(3).to_string())

    # 시군: x_rate = Σ_K 발생면적율 / 100
    r = d[(d.measure == "발생면적율") & d.pest.isin(K)].groupby(["y", "sc", "stem", "rnd"]).value.sum().div(100).rename("x_rate").reset_index()
    keys = t[["sc", "stem"]].drop_duplicates()
    mm = r.merge(keys, on=["sc", "stem"], how="left", indicator=True)
    un = mm[mm._merge == "left_only"][["sc", "stem"]].drop_duplicates()
    print("시군 이름 안 맞음:", len(un), un.values.tolist()[:40])
    r.to_csv(os.path.join(D, "feats_sigun.csv"), index=False)


if __name__ == "__main__":
    main()
