"""구성원 시도 â 만들기 (모두 엄격 실시간) → comp/members_{asof}.csv (y, sc, member, ahat).

M4   : cropmodel M4 backtest (model.py 그대로). 0915 = cropmodel/components_sido_fixed.csv, 0930 = ens/comp/components_sido_fixed.csv.
       2026은 run_final.py와 같게 2025까지 학습해 적용.
FUNC : functional 평활 릿지 실시간 선택 (fmodel.one_step + realtime_select), ens/comp/curves_sido_2026.pkl (0915·0930 곡선, 2026 포함).
PHENO: ens/comp/pheno_final_0915_long.csv (pheno_regen.py), 9/30에도 9/15 값.
사용: OMP_NUM_THREADS=2 memcap -m 3G python members.py
"""
import os, sys, warnings
warnings.filterwarnings("ignore")
os.environ["PHENO"] = "fixed"
HERE = os.path.dirname(os.path.abspath(__file__))
R = "/home/eins/project/rStat/research/rice"
sys.path[:0] = [f"{R}/functional", f"{R}/cropmodel", R]
import numpy as np, pandas as pd
import model as M

M4F = ["cold_mei", "heat_ant", "rs_pre", "rs_pre_def", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "rain_hv", "wet_head"]
st = M.sido_targets()


def m4(comp_path, asof):
    comp = M.prep(pd.read_csv(comp_path, dtype={"sc": str, "asof": str}))
    an = M.anomalies(comp, sorted(set(M.COMP_ALL + ["sunless_pre", "sunless_post", "wind15"])))
    for tab in an.values():
        tab["rs_pre_def"] = tab["rs_pre"].clip(upper=0)
    p, _ = M.backtest(an, st, M4F, asof, icpt="cw", years=range(1996, 2026))
    dfull = st.merge(an["1001"], on=["sc", "y"])
    tr = dfull[dfull.sc.isin(M.PROV) & (dfull.y >= M.START) & (dfull.y <= 2025)].dropna(subset=M4F + ["a"])
    te = an[asof][(an[asof].y == 2026) & an[asof].sc.isin(M.PROV)].dropna(subset=M4F)
    ah, *_ = M.fit_predict(tr, te, M4F, M.LAM, "cw", w=np.sqrt(tr.area.values / tr.area.mean()))
    p26 = pd.DataFrame({"sc": te.sc.values, "y": 2026, "ahat": ah})
    return pd.concat([p[p.sc.isin(M.PROV)][["sc", "y", "ahat"]], p26], ignore_index=True)


def func(asof):
    import fmodel as F
    cur = pd.read_pickle(f"{HERE}/comp/curves_sido_2026.pkl")
    cur = cur[cur.y >= 1988]
    F.full = st.merge(cur[cur["asof"] == "full"].drop(columns="asof"), on=["sc", "y"])
    F.TEST = {a: cur[cur["asof"] == a].drop(columns="asof") for a in ("0915", "0930", "1001")}
    P, _ = F.one_step(asof, years=range(1993, 2027))
    p, sel = F.realtime_select(P, [f"R{lr:g}_S{ls:g}" for lr, ls in F.RID], years=range(1996, 2027))
    return p[p.sc.isin(M.PROV)][["sc", "y", "ahat"]], sel


if __name__ == "__main__":
    out = {}
    ph = pd.read_csv(f"{HERE}/comp/pheno_final_0915_long.csv", dtype={"pv": str}).rename(columns={"pv": "sc"})
    for asof, cp in [("0915", f"{R}/cropmodel/components_sido_fixed.csv"), ("0930", f"{HERE}/comp/components_sido_fixed.csv")]:
        a = m4(cp, asof)
        f, sel = func(asof)
        print(asof, "FUNC 선택(마지막 5)", sel[-5:], flush=True)
        rows = [a.assign(member="M4"), f.assign(member="FUNC"), ph[["sc", "y", "ahat"]].assign(member="PHENO")]
        d = pd.concat(rows, ignore_index=True)[["y", "sc", "member", "ahat"]]
        d.to_csv(f"{HERE}/comp/members_{asof}.csv", index=False)
        print(asof, d.groupby("member").y.agg(["min", "max", "count"]).to_string(), flush=True)
    # 검산: 0915 M4가 cropmodel/out_fixed/contrib_sido_0915.csv와 같은가, 0930 성분의 1001이 기존과 같은가
    old = pd.read_csv(f"{R}/cropmodel/out_fixed/contrib_sido_0915.csv", dtype={"sc": str})
    new = pd.read_csv(f"{HERE}/comp/members_0915.csv", dtype={"sc": str}).query("member == 'M4'")
    m = old.merge(new, on=["sc", "y"], suffixes=("_o", "_n"))
    print("M4 0915 재현 최대차", float((m.ahat_o - m.ahat_n).abs().max()), len(m))
    o26 = pd.read_csv(f"{R}/cropmodel/out_fixed/pred_2026_sido.csv", dtype={"sc": str, "asof": str}).query("asof == '0915'")
    m = o26.merge(new[new.y == 2026], on="sc", suffixes=("_o", "_n"))
    print("M4 0915 2026 재현 최대차", float((m.ahat_o - m.ahat_n).abs().max()), len(m))
    c_old = pd.read_csv(f"{R}/cropmodel/components_sido_fixed.csv", dtype={"sc": str, "asof": str}).query("asof == '1001'")
    c_new = pd.read_csv(f"{HERE}/comp/components_sido_fixed.csv", dtype={"sc": str, "asof": str}).query("asof == '1001'")
    m = c_old.merge(c_new, on=["sc", "y"], suffixes=("_o", "_n"))
    print("성분 1001 재현 최대차(wind15, rs_pre)", float((m.wind15_o - m.wind15_n).abs().max()), float((m.rs_pre_o - m.rs_pre_n).abs().max()))
