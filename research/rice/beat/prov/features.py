"""시도-연도-as-of 특징표 → 편차(그해 − 직전 5년 완전시즌 평균) → 상대편차(− 그해 8도 면적가중 평균).

원천 (모두 읽기만):
  cropmodel/components_sido_fixed.csv  (M4 성분, GDD 출수 기준 창)
  typhoon/tc_sido.csv                  (바람장 태풍 노출)
  pheno/wx_feats.csv                   (시군, MODIS 정점 기후 출수일 기준 창 '_c' + 달력 창) → 논 면적 가중 시도
출력: work/feat_sido.pkl  {asof: DataFrame[sc, y, feats...(편차)]}  + work/feat_rel.pkl (상대편차)
"""
import os
import sys

import numpy as np
import pandas as pd

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from evalp import RICE, PROV, truth, common  # noqa: E402

W = os.path.join(os.path.dirname(os.path.abspath(__file__)), "work")
os.makedirs(W, exist_ok=True)
ASOFS = ["0815", "0915", "1001"]


def anomalies(tab, keys, cols):
    """tab[asof 포함]: 그해 as-of 값 − 직전 5년 완전시즌('1001') 평균 (M4와 같은 규칙)."""
    full = tab[tab["asof"] == "1001"].set_index(keys)[cols].sort_index()
    prev = full.groupby(level=0).transform(lambda s: s.shift(1).rolling(5, min_periods=5).mean())
    out = {}
    for a in ASOFS:
        g = tab[tab["asof"] == a].set_index(keys)[cols].sort_index()
        out[a] = (g - prev.reindex(g.index)).reset_index()
    return out


def build():
    comp = pd.read_csv(os.path.join(RICE, "cropmodel/components_sido_fixed.csv"), dtype={"sc": str, "asof": str})
    comp = comp[comp.sc.isin(PROV)]
    ccols = [c for c in comp.columns if c not in ("sc", "y", "asof")]
    tc = pd.read_csv(os.path.join(RICE, "typhoon/tc_sido.csv"), dtype={"sc": str, "asof": str})
    tc = tc[tc.sc.isin(PROV)]
    tcols = [c for c in tc.columns if c not in ("sc", "y", "asof")]
    wx = pd.read_csv(os.path.join(RICE, "pheno/wx_feats.csv"), dtype={"sc": str, "stem": str, "asof": str})
    wx["stem"] = wx["stem"].fillna("")
    wx["asof"] = wx["asof"].replace({"full": "full"})
    keep = ["dtr_rip_c", "rndays_rip_c", "ss_rip_c", "tn_rip_c", "ta_rip_c", "gust17_days_c", "gust_max_c", "ss_pre_c", "rndays_fl_c",
            "hm_rip_c", "ss_sep", "ss_sep1h", "rndays_sep1h", "ta_sep", "ss_aug", "rn_aug", "gust17_a1s14", "Hc"]
    pc = common.paddy_centroids()[["sc", "stem", "paddy_ha"]]
    wx = wx.merge(pc, on=["sc", "stem"], how="left")
    wx["paddy_ha"] = wx.paddy_ha.fillna(wx.paddy_ha.median())
    wx = wx[wx.sc.isin(PROV)]
    agg = wx.groupby(["sc", "y", "asof"]).apply(lambda g: pd.Series(
        {k: np.average(g[k].fillna(g[k].mean()), weights=g.paddy_ha) for k in keep})).reset_index()
    # wx_feats 의 1001 = 10/1 as-of, 'full' = 완전시즌. 편차 기준(완전시즌)은 1001과 거의 같으므로 1001을 씀 (M4 규칙과 통일)
    agg = agg[agg["asof"].isin(ASOFS)]
    wcols = keep
    an_c = anomalies(comp, ["sc", "y"], ccols)
    an_t = anomalies(tc, ["sc", "y"], tcols)
    an_w = anomalies(agg, ["sc", "y"], wcols)
    out = {}
    for a in ASOFS:
        d = an_c[a].merge(an_t[a], on=["sc", "y"], how="left").merge(an_w[a].rename(columns={"Hc": "H_modis"}), on=["sc", "y"], how="left")
        d["rs_pre_def"] = d["rs_pre"].clip(upper=0)
        out[a] = d
    return out


def relative(an, t=None):
    """상대편차: 그해 8도 면적가중(그해 면적) 평균을 뺌. 면적은 8월 말 조사로 알려짐."""
    t = truth() if t is None else t
    area = t[t.sc.isin(PROV)][["y", "sc", "area"]]
    rel = {}
    for a, d in an.items():
        x = d.merge(area, on=["y", "sc"], how="left")
        # 2026 등 면적 없는 해: 직전 해 면적
        last = area.sort_values("y").groupby("sc").area.last()
        x["area"] = x.area.fillna(x.sc.map(last))
        cols = [c for c in d.columns if c not in ("sc", "y")]
        m = x.groupby("y").apply(lambda g: pd.Series({c: np.average(g[c], weights=g.area) if g[c].notna().all() else np.nan for c in cols}))
        r = x.set_index(["y", "sc"])[cols] - m.reindex(x.y).values
        rel[a] = r.reset_index()
    return rel


if __name__ == "__main__":
    an = build()
    pd.to_pickle(an, os.path.join(W, "feat_sido.pkl"))
    rel = relative(an)
    pd.to_pickle(rel, os.path.join(W, "feat_rel.pkl"))
    for a in ASOFS:
        print(a, an[a].shape, an[a].y.min(), an[a].y.max(), "결측 비율 상위:", an[a].isna().mean().sort_values().tail(4).round(2).to_dict())
