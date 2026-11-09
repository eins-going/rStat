"""단변량 진단: 시도 패널(시도 평균 뺀) 특징 vs 단수 편차 a 상관·1SD 효과."""
import sys, os
import numpy as np, pandas as pd
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import prov_model as pm
pw, ph = pm.load_feats()
PT = pm.PT.rename(columns={"sc": "pv"})
asof = sys.argv[1] if len(sys.argv) > 1 else "full"
d = pw[pw["asof"] == asof].merge(PT, on=["pv", "y"]).merge(ph[ph["asof"] == asof].drop(columns="asof"), on=["pv", "y"], how="left")
cols = [c for c in d.columns if c not in ("pv", "y", "asof", "yield", "area", "base", "a")]
rows = []
for start in (1985, 2001):
    s = d[d.y >= start].copy()
    s = s[s.y <= 2025]
    for c in cols:
        x = s[c] - s.groupby("pv")[c].transform("mean")
        ok = x.notna()
        if ok.sum() < 50 or x[ok].std() < 1e-9: continue
        r = np.corrcoef(x[ok], s.a[ok])[0, 1]
        b = np.polyfit(x[ok] / x[ok].std(), s.a[ok], 1)[0]
        # 해마다 전국 평균한 연도 신호 상관
        n = s[ok].assign(x=x[ok]).groupby("y")[["x", "a"]].mean()
        rows.append((start, c, round(r, 3), round(b * 100, 2), round(np.corrcoef(n.x, n.a)[0, 1], 3), int(ok.sum())))
R = pd.DataFrame(rows, columns=["start", "feat", "r", "pct_per_sd", "r_year", "n"])
R = R.pivot_table(index="feat", columns="start", values=["r", "pct_per_sd", "r_year"])
R.columns = [f"{a}_{b}" for a, b in R.columns]
R = R.sort_values("r_2001")
pd.set_option("display.width", 200); pd.set_option("display.max_rows", 200)
print(R.to_string())
R.to_csv(os.path.join(pm.OUT, f"diag_univariate_{asof}.csv"))
