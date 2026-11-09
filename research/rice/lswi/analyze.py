"""LSWI 가설 검증 (fetch_lswi.py 문서의 미리 정한 판정 그대로).
1) 해 수준: 전국·도 9/1~15 LSWI 편차(그해 − 직전 5년 평균) vs 단수 편차 a — 2005~2016(S2 이전, 독립) / 2017~2025 따로
2) 작물모델 M4(9/15)에 LSWI 편차 하나 추가, 같은 실시간 backtest → 시군 skill 비교 (학습 시작 1985: LSWI 없는 해는 0)
"""
import os, sys, glob
import numpy as np, pandas as pd
HERE = os.path.dirname(os.path.abspath(__file__)); R = os.path.dirname(HERE)
sys.path[:0] = [R, os.path.join(R, "cropmodel")]
import common as C

cl = pd.read_csv(os.path.join(HERE, "data/cells.csv"))
cl["sc"] = cl.sido.map(C.sido_code); cl["stem"] = cl.sigun.str[:-1]
WIN = {"s1": ("08-29", "09-13"), "a2": ("08-13", "08-28"), "s2": ("09-14", "09-30")}  # s1이 1차, 나머지는 참고


def clear(state):
    s = state.astype(np.int64)
    return ((s & 3) == 0) & (((s >> 2) & 1) == 0) & (((s >> 8) & 3) == 0)


rows = []
for f in sorted(glob.glob(os.path.join(HERE, "data/sr_*.npz"))):
    y = int(f[-8:-4]); z = np.load(f); comp = [str(c) for c in z["comp"]]
    b2, b6, b1 = z["b02"].astype(float), z["b06"].astype(float), z["b01"].astype(float)
    ok = clear(z["state_500m"]) & (b2 > 0) & (b6 > 0) & (b1 > -100) & (b2 < 10000)
    lswi = np.where(ok, (b2 - b6) / (b2 + b6), np.nan); ndvi = np.where(ok, (b2 - b1) / (b2 + b1), np.nan)
    for w, (d0, d1) in WIN.items():
        idx = [i for i, c in enumerate(comp) if f"{y}-{d0}" <= c[4:] <= f"{y}-{d1}"]
        if not idx: continue
        with np.errstate(all="ignore"):
            L = np.nanmean(lswi[idx], 0); N = np.nanmean(ndvi[idx], 0)
        rows.append(pd.DataFrame({"y": y, "win": w, "sc": cl.sc, "stem": cl.stem, "frac": cl.frac, "lswi": L, "ndvi": N}))
px = pd.concat(rows)
cov = px.groupby(["y", "win"]).lswi.apply(lambda s: s.notna().mean()).unstack()
print("맑은 격자 비율\n", cov.round(2).T.to_string())


def agg(g, keys):
    g = g.dropna(subset=["lswi"])
    return g.groupby(keys).apply(lambda d: pd.Series({"lswi": np.average(d.lswi, weights=d.frac), "ndvi": np.average(d.ndvi, weights=d.frac), "n": len(d)}))


sd = agg(px, ["win", "sc", "y"]).reset_index()
na = agg(px, ["win", "y"]).reset_index()
def anom(df, keys):
    df = df.sort_values("y").copy()
    for v in ("lswi", "ndvi"):
        df[v + "_an"] = df[v] - df.groupby(keys)[v].transform(lambda s: s.shift(1).rolling(5, min_periods=5).mean())
    return df
sd = anom(sd, ["win", "sc"]); na = anom(na, ["win"])
nat = C.nation()[["y", "a"]]
print("\n== 1) 전국 해 수준 상관 (LSWI 편차 vs 단수 편차 a) ==")
for w in WIN:
    d = na[na.win == w].merge(nat, on="y").dropna()
    for lo, hi in ((2005, 2016), (2017, 2025), (2005, 2025)):
        e = d[(d.y >= lo) & (d.y <= hi)]
        print(f"  {w} {lo}~{hi} n={len(e)} r(lswi)={e.lswi_an.corr(e.a):+.2f} r(ndvi)={e.ndvi_an.corr(e.a):+.2f}  (최저 맑음 n {int(e.n.min()) if len(e) else 0})")
st = C._kosis(); st = st[st.code.isin([str(c) for c in range(31, 39)])].rename(columns={"code": "sc"}).sort_values("y")
st["base"] = st.groupby("sc")["yield"].transform(C._olympic); st["a"] = st["yield"] / st.base - 1
print("\n== 도 패널 (8도, 도 평균 뺀 편차 상관) ==")
for w in WIN:
    d = sd[sd.win == w].merge(st[["sc", "y", "a"]], on=["sc", "y"]).dropna()
    for lo, hi in ((2005, 2016), (2017, 2025)):
        e = d[(d.y >= lo) & (d.y <= hi)]
        print(f"  {w} {lo}~{hi} n={len(e)} r={e.lswi_an.corr(e.a):+.2f}")
sd.to_csv(os.path.join(HERE, "lswi_sido.csv"), index=False); na.to_csv(os.path.join(HERE, "lswi_nat.csv"), index=False)

# 2) 작물모델에 추가
import importlib
os.environ.setdefault("PHENO", "fixed")
import model as M
comp = M.prep(pd.read_csv(os.path.join(R, "cropmodel/components_sido_fixed.csv"), dtype={"sc": str, "asof": str}))
FE = M.COMP_ALL + ["sunless_pre", "sunless_post", "wind15"]
an = M.anomalies(comp, sorted(set(FE)))
for tab in an.values():
    tab["rs_pre_def"] = tab["rs_pre"].clip(upper=0)
M4 = ["cold_mei", "heat_ant", "rs_pre", "rs_pre_def", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "rain_hv", "wet_head"]
sts = M.sido_targets()
L1 = sd[sd.win == "s1"][["sc", "y", "lswi_an"]]
for tag in ("0915", "1001"):
    an[tag] = an[tag].merge(L1, on=["sc", "y"], how="left")
for tag in an:
    if tag not in ("0915", "1001"):
        an[tag]["lswi_an"] = np.nan
# 학습(1001 표)에도 같은 값
for start, fill in ((1985, True), (2006, False)):
    M.START = start
    out = {}
    for name, feats in (("M4", M4), ("M4+LSWI", M4 + ["lswi_an"])):
        A = {k: v.copy() for k, v in an.items()}
        if fill:
            for k in ("0915", "1001"):
                A[k]["lswi_an"] = A[k]["lswi_an"].fillna(0.0)
        p, coefs = M.backtest(A, sts, feats, "0915", icpt="cw")
        sg = M.to_sigun(p, None, 0.0)
        r = C.evaluate(sg, f"학습시작 {start} {name} 9/15", verbose=True)
        if "lswi_an" in feats:
            print("   LSWI 계수(해마다):", {y: c.get("lswi_an") for y, c in list(coefs.items())[-13:]})
