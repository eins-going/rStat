"""작물시험포(crpst) 회차 7 출수기(exam5) → 시도별 출수일 (1988~2019). 연구용 진단 + 시도 GDD 보정 후보."""
import glob
import json

import numpy as np
import pandas as pd

R = "/home/eins/project/rStat/research/rice"
MAP = {'화성': '31', '남양': '31', '춘천': '32', '강릉': '32', '진부': '32', '철원': '32', '청주': '33', '제천': '33', '청원': '33',
       '대전': '34', '예산': '34', '익산': '35', '계화': '35', '운봉': '35', '진안': '35', '나주': '36', '해남': '36', '광주': '36',
       '남평': '36', '안동': '37', '대구': '37', '영덕': '37', '상주': '37', '칠곡': '37', '진주': '38', '함양': '38'}


def load():
    rows = []
    for f in sorted(glob.glob(f'{R}/crpst/data/y*_getExprTmrd_07List_v2.json')):
        for r in json.load(open(f)):
            rows.append({"area": r.get("areaNm"), "y": int(r["exprYear"]), "sp": r.get("spciesCode"), "form": str(r.get("examForm")),
                         "H": pd.to_datetime(r.get("exam5"), errors="coerce")})
    df = pd.DataFrame(rows)
    df["sc"] = df["area"].map(MAP)
    df["H"] = df["H"].dt.dayofyear
    df["cls"] = df["sp"].str[1]
    return df


if __name__ == "__main__":
    df = load()
    df = df[(df.form == "1") & df.sc.notna()]
    g = df.groupby(["sc", "y", "cls"])["H"].median().unstack("cls")
    c = pd.read_csv(f'{R}/cropmodel/components_sido_fixed.csv', dtype={'sc': str, 'asof': str})
    c = c[c["asof"] == "1001"][["sc", "y", "heading"]]
    x = g.reset_index().merge(c, on=["sc", "y"])
    print(x.groupby("sc")[["1", "2", "3", "heading"]].median().round(1))
    for sc, gg in x.groupby("sc"):
        gg = gg.dropna(subset=["3"])
        print(sc, len(gg), "corr", round(gg["3"].corr(gg.heading), 2), "sd(crpst-model)", round((gg["3"] - gg.heading).std(), 1),
              "sd crpst", round(gg["3"].std(), 1), "sd model", round(gg.heading.std(), 1))
    x.to_csv(f"{R}/beat/prov/work/crpst_heading_sido.csv", index=False)
    build_yield()


def build_yield():
    """회차 9 exam4(현미 kg/10a) ÷ 같은 시험포·품종 직전 5년(최소 3년) 평균 − 1 → 시도-연도 중앙값 → work/crpst_yield_sido.csv."""
    import sys
    sys.path.insert(0, f"{R}/beat/prov")
    from evalp import truth
    rows = []
    for f in sorted(glob.glob(f'{R}/crpst/data/y*_getExprTmrd_09List_v2.json')):
        rows += json.load(open(f))
    df = pd.DataFrame(rows)
    df["sc"] = df.areaNm.map(MAP)
    df["y"] = df.exprYear.astype(int)
    df["form"] = df.examForm.astype(str)
    df["exam4"] = pd.to_numeric(df.exam4, errors="coerce")
    df = df[(df.form == "1") & df.sc.notna() & (df.exam4 > 0)].sort_values("y")
    df["k"] = df.areaNm + df.spciesCode
    df["m5"] = df.groupby("k").exam4.transform(lambda s: s.shift(1).rolling(5, min_periods=3).mean())
    df["r"] = df.exam4 / df.m5 - 1
    g = df.dropna(subset=["r"]).groupby(["sc", "y"]).r.median().rename("cr").reset_index()
    x = g.merge(truth(), on=["sc", "y"])
    x.to_csv(f"{R}/beat/prov/work/crpst_yield_sido.csv", index=False)
    return x
