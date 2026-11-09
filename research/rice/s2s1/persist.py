"""기준선 점검: 평년 + 직전 해 편차 지속(긴 이력 실시간 학습), 기상과 함께. 60시군."""
import sys; sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import pandas as pd, numpy as np, common
from model import weather_model
from wbase import units, t, W4
for yrs in [list(range(2015, 2026)), list(range(2019, 2026)), list(range(2020, 2026))]:
    for cols in [["a_prev"], ["a_prev3"], ["a_prev", "a_prev3"], W4 + ["a_prev3"]]:
        wp = weather_model(units, cols, yrs).merge(t, on=["y", "sc", "stem"]); wp["pred_yield"] = wp.base * (1 + wp.a_w)
        common.evaluate(wp, f"{yrs[0]}~ {'+'.join(cols) if len(cols) < 4 else '기상4+a_prev3'}", years=yrs)
