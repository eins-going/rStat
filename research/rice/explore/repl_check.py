"""재현 확인 — 60시군에서 고른 ndvi_o|ridge를 새 65시군(s2s1_all)에만 적용. 학습 단위 3가지: 옛 60 / 새 65 / 전체. 연도별 Δ도."""
import os, sys, warnings
import numpy as np, pandas as pd
warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, HERE)
import battery as BT, s2s1_battery as SB
ASOF = sys.argv[1] if len(sys.argv) > 1 else "0915"
old = set(pd.read_csv(os.path.join(os.path.dirname(HERE), "s2s1", "boxes.csv"), dtype={"sc": str}).stem)
sat = pd.read_csv(os.path.join(HERE, "sat_s2s1_sigun_all.csv"), dtype={"sc": str, "asof": str})
sat = sat[sat["asof"] == ASOF].drop(columns="asof")
allc = [c for c in sat.columns if c not in ("sc", "stem", "y")]
t = BT.sigun_table(ASOF)[["sc", "stem", "y", "yield", "area", "base", "a", "a_base", "w"]]
d = t.merge(sat, on=["sc", "stem", "y"]).dropna(subset=["base", "yield", "a_base", "a"]).reset_index(drop=True)
d["r"] = d.a - d.a_base; d["new"] = ~d.stem.isin(old)
rm = lambda q, p: float(np.sqrt(np.average((q.base * (1 + p) - q["yield"]) ** 2, weights=q.area)))
for sname in ([] if os.environ.get("YEARLY") else ["ndvi_o", "S2all_o", "S2all_c", "ndmi_oc"]):
    kind = sname.split("_")[1]; pre = SB.IDX["ndvi"] if sname.startswith("ndvi") else (SB.IDX["ndmi"] if sname.startswith("ndmi") else None)
    feats = SB.cols_for(allc, pre, kind) if pre else sorted(set(sum([SB.cols_for(allc, SB.IDX[k], kind) for k in ("ndvi", "ndre", "cire", "ndmi", "evi2", "combo")], [])))
    for trname, trmask in [("옛60학습", ~d.new), ("새65학습", d.new), ("전체학습", d.new | ~d.new)]:
        p = pd.Series(np.nan, index=d.index)
        for Y in SB.TEST:
            tr = d[(d.y < Y) & trmask]; te = d[(d.y == Y) & d.new]
            if tr.y.nunique() < 3: continue
            X = np.nan_to_num(tr[feats].values.astype(float)); Xt = np.nan_to_num(te[feats].values.astype(float))
            pr, _ = BT.m_ridge(X, tr.r.values, tr.w.values, Xt, tr.y.values)
            p[te.index] = te.a_base.values + pr
        q = d[d.new & d.y.isin(SB.TEST)]
        yr = {Y: round(rm(q[q.y == Y], p[q.index][q.y == Y]) - rm(q[q.y == Y], q.a_base[q.y == Y]), 2) for Y in SB.TEST}
        print(f"{ASOF} {sname:8s} {trname} 새65 평가: {rm(q, p[q.index]):.2f} vs 기준 {rm(q, q.a_base):.2f} | 연도별Δ {yr}", flush=True)
# 전체 125 연도별 (전체 학습)
if os.environ.get("YEARLY"):
    feats = SB.cols_for(allc, SB.IDX["ndvi"], "o")
    p = pd.Series(np.nan, index=d.index)
    for Y in SB.TEST:
        tr = d[d.y < Y]; te = d[d.y == Y]
        pr, _ = BT.m_ridge(np.nan_to_num(tr[feats].values.astype(float)), tr.r.values, tr.w.values, np.nan_to_num(te[feats].values.astype(float)), tr.y.values)
        p[te.index] = te.a_base.values + pr
    q = d[d.y.isin(SB.TEST)]
    print(ASOF, "125시군 ndvi_o 연도별Δ", {Y: round(rm(q[q.y == Y], p[q.index][q.y == Y]) - rm(q[q.y == Y], q.a_base[q.y == Y]), 2) for Y in SB.TEST},
          "전체", round(rm(q, p[q.index]), 2), "vs", round(rm(q, q.a_base), 2))
