"""cropmodel 주 모델(M4, PHENO=fixed) 재현 — 시도 실시간 â와 성분 편차표를 돌려준다 (cropmodel 파일은 읽기만)."""
import os
import sys

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
RICE = os.path.dirname(HERE)
CM = os.path.join(RICE, "cropmodel")
sys.path.insert(0, RICE)
sys.path.insert(0, CM)
import common  # noqa: E402
import model as M  # noqa: E402

M4 = ["cold_mei", "heat_ant", "rs_pre", "rs_pre_def", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "rain_hv", "wet_head"]
EXTRA = ["tmin_fill", "hot_fill", "tfill", "heading", "cold_q"]


def load():
    comp = M.prep(pd.read_csv(os.path.join(CM, "components_sido_fixed.csv"), dtype={"sc": str, "asof": str}))
    cs = M.prep(pd.read_csv(os.path.join(CM, "components_sigun_fixed.csv.gz"), dtype={"sc": str, "asof": str}))
    fe = sorted(set(M.COMP_ALL + EXTRA + ["sunless_pre", "sunless_post", "wind15"]))
    an = M.anomalies(comp, fe)
    an_sg = M.anomalies_sigun(cs, fe)
    for tab in list(an.values()) + list(an_sg.values()):
        tab["rs_pre_def"] = tab["rs_pre"].clip(upper=0)
    return comp, cs, an, an_sg


if __name__ == "__main__":
    comp, cs, an, an_sg = load()
    st = M.sido_targets()
    for asof in ["0815", "0915"]:
        p, _ = M.backtest(an, st, M4, asof, icpt="cw")
        common.evaluate(M.to_sigun(p), f"cropmodel M4 {asof}")
