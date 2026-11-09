"""문헌 갈래 빠른 점검 — 출수 전 일조(이삭 형성기) 부족을 꺾은선(hinge) 하나로 쓰면 전국 단수 편차를 맞히나.

근거: 통계청 2020 설명("낟알이 형성되는 7~8월 일조 감소 → 완전낟알수 감소"), 일본 jcs 90(4):393
(출수 전 29일 기온·일사가 수량과 가장 밀접), 영수(sink) 크기 = 출수 전 25~30일 일사에 비례(Horie/Murata 계열).
특징: 전국 ASOS(섬 제외) 일조 평균, 창 doy a~b(기본 199~224 = 7/18~8/11) → h = min(S - q, 0), q = 학습 해들의 분위수.
검증: 실시간(그해 이전 해 1985~ 로만 학습, 분위수도 학습 해에서) 2013~2025, 전국만. 8/15 시점에 쓸 수 있음.
주의: 창은 2020을 본 뒤 고른 것(사후 선택). 창·분위수 격자에서 고르게 +0.2 안팎이 나오는지로만 판단할 것.

사용: memcap -m 3G .venv/bin/python research/rice/lit/quick_preheading_check.py
"""
import sys

import numpy as np
import pandas as pd

sys.path.insert(0, "/home/eins/project/rStat/research/rice")
from common import nation  # noqa: E402

ISL = {102, 115, 169, 185, 184, 189}
d = pd.read_csv("/home/eins/project/rStat/db/raw/kma/asos_daily.csv.gz", usecols=["date", "stn", "ss_day"])
d["date"] = pd.to_datetime(d.date.astype(str))
d["y"], d["doy"] = d.date.dt.year, d.date.dt.dayofyear
d = d[(d.doy >= 150) & (d.doy <= 280) & (d.y >= 1980) & ~d.stn.isin(ISL)]
n = nation().set_index("y")


def sun(a, b):
    w = d[(d.doy >= a) & (d.doy < b)]
    g = w.groupby(["y", "stn"]).ss_day.agg(["mean", "count"]).reset_index()
    g = g[g["count"] >= 0.9 * (b - a)]
    return g.groupby("y")["mean"].mean()


rows = []
for a, b in [(189, 219), (194, 224), (199, 224), (204, 224), (199, 229), (209, 229), (184, 214), (214, 234)]:
    f = pd.DataFrame({"S": sun(a, b)}).join(n[["a", "base"]]).dropna()
    for q in [0.2, 0.25, 0.33, 0.5]:
        pr = {}
        for y in range(2013, 2026):
            tr = f[(f.index < y) & (f.index >= 1985)]
            qq = tr.S.quantile(q)
            X = np.c_[np.ones(len(tr)), np.minimum(tr.S - qq, 0)]
            bb = np.linalg.lstsq(X, tr.a.values, rcond=None)[0]
            pr[y] = bb[0] + bb[1] * min(f.loc[y, "S"] - qq, 0)
        p = pd.Series(pr)
        o, base = f.a.loc[2013:2025], f.base.loc[2013:2025]
        e, e0 = (p - o) * base, o * base
        m = o.index != 2020
        rows.append((f"{a}-{b}", q, round(np.sqrt((e ** 2).mean()), 1), round(np.sqrt((e0 ** 2).mean()), 1),
                     round(1 - np.sqrt((e ** 2).mean()) / np.sqrt((e0 ** 2).mean()), 2),
                     round(1 - np.sqrt((e[m] ** 2).mean()) / np.sqrt((e0[m] ** 2).mean()), 2), round(p[2020], 3)))
print(pd.DataFrame(rows, columns=["doy창", "분위", "RMSE", "평년RMSE", "skill", "skill(2020제외)", "2020예측a"]).to_string())
print("2020 실제 a =", round(n.loc[2020, "a"], 3))
