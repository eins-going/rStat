"""강한 기상 기반 예측(다른 갈래: cropmodel+시군 전년잔차, blend/pred_crop_persist_0915.csv, 실시간) 위에
위성 같은-해 편차(xc)로 시군 잔차를 보정하면 나아지는가? 위성 부분은 같은 해 평균 0(순위만)."""
import sys, json; sys.path.insert(0, "/home/eins/project/rStat/research/rice")
from model import *
import run_eval as R
BASE = {"0915": "/home/eins/project/rStat/research/rice/blend/pred_crop_persist_0915.csv",
        "0815": "/home/eins/project/rStat/research/rice/blend/pred_crop_persist_0815.csv"}


def stack(d, cols, years, lam=None):
    preds = []
    for y in years:
        tr = d[d.y < y].dropna(subset=["a", "base_a"]).copy()
        te = d[d.y == y].dropna(subset=["base_a"]).copy()
        keep = [c for c in cols if tr[c].notna().mean() > 0.3 and te[c].notna().mean() > 0.3]
        ah = te.base_a.values.copy()
        if keep:
            r = tr.a - tr.base_a
            tr["r_cs"] = r - r.groupby(tr.y).transform("mean")
            l = lam if lam is not None else choose_lam(tr, keep, "r_cs")
            f, b = ridge_fit(tr[keep].values, tr.r_cs.values, l)
            adj = f(te[keep].values)
            ah = ah + adj - adj.mean()
        te["pred_yield"] = te.base * (1 + ah)
        preds.append(te[["y", "sc", "stem", "pred_yield"]])
    return pd.concat(preds)


out = []
for asof in ["0815", "0915"]:
    d = load(asof)
    S = R.SETS[asof]
    groups = {k: [c for c in v if c in d.columns] for k, v in S.items() if k != "w"}
    allc = sorted(set(sum(groups.values(), [])))
    d = transform(d, allc)
    b = pd.read_csv(BASE[asof], dtype={"sc": str}).rename(columns={"pred_yield": "pb"})
    d = d.merge(b, on=["y", "sc", "stem"], how="left")
    d["base_a"] = d.pb / d.base - 1
    for yl, yrs in [("2019-2025", list(range(2019, 2026))), ("2020-2025", list(range(2020, 2026)))]:
        p0 = d[d.y.isin(yrs)].dropna(subset=["pb"])[["y", "sc", "stem", "pb"]].rename(columns={"pb": "pred_yield"})
        r = R.ev(p0, f"{asof} 기반(cropmodel+지속) {yl}", yrs); r.update(asof=asof, feats="base", test=yl); out.append(r)
        for k, cols in groups.items():
            for suf in ["_c", "_oc"]:
                p = stack(d, [c + suf for c in cols], yrs)
                r = R.ev(p, f"{asof} 기반+{k}{suf} {yl}", yrs); r.update(asof=asof, feats=k + suf, test=yl); out.append(r)
json.dump(out, open(f"{OUT}/results_stack.json", "w"), ensure_ascii=False, indent=1)
