import sys; sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import pandas as pd, numpy as np, common
from model import *
b = pd.read_csv('boxes.csv', dtype={'sc': str}); units = b[['sc', 'stem']].drop_duplicates()
t = common.targets().merge(units, on=['sc', 'stem'])
W4 = ['ss_0815_0915_an', 'ta_0815_0915_an', 'rn_0716_0915_an', 'ss_0801_0831_an']
W6 = W4 + ['ss_0901_0930_an', 'tmin_0901_0930_an']
if __name__ == "__main__":
    for yrs in [range(2015, 2026), range(2019, 2026), range(2020, 2026)]:
        yrs = list(yrs)
        base = t[t.y.isin(yrs)][['y', 'sc', 'stem']].assign(pred_yield=t.base)
        common.evaluate(base, '평년', years=yrs)
        lv = pd.concat([t[t.y == y][['y', 'sc', 'stem', 'base']].assign(pred_yield=lambda x: x.base * (1 + long_level(y, units))) for y in yrs])
        common.evaluate(lv, '평년+수준보정', years=yrs)
        for cols in [W4, W6]:
            wp = weather_model(units, cols, yrs).merge(t, on=['y', 'sc', 'stem']); wp['pred_yield'] = wp.base * (1 + wp.a_w)
            common.evaluate(wp, f'기상 {len(cols)}', years=yrs)
