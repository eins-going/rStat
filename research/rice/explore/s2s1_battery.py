"""Sentinel-2/1 지수·결합 변수(60시군) × 모델 묶음 — 실시간 2020~2025 (학습 2017~그 전 해).

시군: 목표 a_시군, 기준선 B0p(â_시도 M4 + ρ·작년 편차). 잔차 r = a − a_base 를 위성 변수로 (모델별).
시도: 같은 시도 상자 시군 평균(논 면적 가중) 위성 변수 → M4 시도 잔차 (8도, 상자 있는 시도만).
변수 묶음: 지수 하나씩(ndvi, ndre, cire, ndmi, evi2, s1) / 결합 5개 / S2 전체 / 전체, 편차 종류 _o(자기 과거) · _c(같은 해 시군 사이) · 둘 다.
사용: OMP_NUM_THREADS=2 memcap -m 3G python3 s2s1_battery.py [asof]
"""
import json
import os
import sys
import warnings

import numpy as np
import pandas as pd

warnings.filterwarnings("ignore")
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import battery as BT  # noqa: E402

M, common = BT.M, BT.common
ASOF = sys.argv[1] if len(sys.argv) > 1 else "0915"
TEST = range(2020, 2026)
MODELS = ["ridge", "enet", "pls", "lgbm", "rf"]
IDX = {"ndvi": ["ndvi_"], "ndre": ["ndre_pre", "ndre_e", "ndre_l", "ndre_cum", "ndre_pk", "ndre_sl"], "cire": ["cire_pre", "cire_e", "cire_l", "cire_cum", "cire_pk", "cire_sl", "cire_pkd"],
       "ndmi": ["ndmi_"], "evi2": ["evi2_"], "combo": ["ndre_ndvi", "ndre_m_ndvi", "ndvi_m_ndmi", "ndvi_x_ndmi", "cire_ndvi"],
       "s1": ["vv_", "vh_", "vhvv_", "rvi_"]}


def cols_for(allc, prefixes, kind):
    suf = {"o": ("_o",), "c": ("_c",), "oc": ("_o", "_c")}[kind]
    out = [c for c in allc if any(c.startswith(p) for p in prefixes) and c.endswith(suf)]
    if prefixes == ["ndre_pre", "ndre_e", "ndre_l", "ndre_cum", "ndre_pk", "ndre_sl"]:
        out = [c for c in out if not c.startswith("ndre_ndvi") and not c.startswith("ndre_m_ndvi")]
    if prefixes == ["ndvi_"]:
        out = [c for c in out if not c.startswith(("ndvi_m_ndmi", "ndvi_x_ndmi"))]
    return out


def evaluate_subset(d, pred, label):
    m = d.y.isin(TEST) & pred.notna() & d.base.notna() & d["yield"].notna() & d.a_base.notna()
    q = d[m]
    e = q.base * (1 + pred[m]) - q["yield"]
    e0 = q.base - q["yield"]
    eb = q.base * (1 + q.a_base) - q["yield"]
    w = q.area
    rm = lambda x: float(np.sqrt(np.average(x ** 2, weights=w)))  # noqa: E731
    rr = np.nanmean([g.assign(p=pred[g.index]).p.rank().corr(g.a.rank()) for _, g in q.groupby("y") if len(g) >= 15])
    return {"cand": label, "rmse": round(rm(e), 2), "rmse_base": round(rm(eb), 2), "rmse_norm": round(rm(e0), 2),
            "skill": round(1 - rm(e) / rm(e0), 3), "skill_base": round(1 - rm(eb) / rm(e0), 3), "rank_r": round(float(rr), 3)}


def main():
    sat = pd.read_csv(os.path.join(HERE, "sat_s2s1_sigun_all.csv" if os.environ.get("ALL") else "sat_s2s1_sigun.csv"), dtype={"sc": str, "asof": str})
    sat = sat[sat["asof"] == ASOF].drop(columns="asof")
    allc = [c for c in sat.columns if c not in ("sc", "stem", "y")]
    t = BT.sigun_table(ASOF)[["sc", "stem", "y", "yield", "area", "base", "a", "a_base", "w", "ahat_sd"]]
    d = t.merge(sat, on=["sc", "stem", "y"], how="inner").reset_index(drop=True)
    d["r"] = d.a - d.a_base
    sets = {}
    for nm, pre in IDX.items():
        for kind in ("o", "c", "oc"):
            sets[f"{nm}_{kind}"] = cols_for(allc, pre, kind)
    for kind in ("o", "c", "oc"):
        s2 = sorted(set(sum([cols_for(allc, IDX[k], kind) for k in ("ndvi", "ndre", "cire", "ndmi", "evi2", "combo")], [])))
        sets[f"S2all_{kind}"] = s2
        sets[f"all_{kind}"] = sorted(set(s2 + cols_for(allc, IDX["s1"], kind)))
    rows = [evaluate_subset(d, d.a_base, "BASE")]
    preds = {"BASE": d.a_base}
    for sname, feats in sets.items():
        if not feats:
            continue
        for mn in MODELS:
            p = pd.Series(np.nan, index=d.index)
            for Y in TEST:
                tr, te = d[d.y < Y].dropna(subset=["r"]), d[d.y == Y]
                if tr.y.nunique() < 3 or te.empty:
                    continue
                kw = {"leaf": 20} if mn in ("lgbm", "rf") else {}
                pr, _ = BT.MODELS[mn](tr[feats].values.astype(float), tr.r.values, tr.w.values, te[feats].values.astype(float), tr.y.values, **kw)
                p.loc[te.index] = te.a_base.values + pr
            preds[f"{sname}|{mn}"] = p
            rows.append(evaluate_subset(d, p, f"{sname}|{mn}"))
    ev = pd.DataFrame(rows).set_index("cand")
    ev["Δrmse"] = (ev.rmse - ev.rmse_base).round(2)
    # 메타 선택(직전 해들 성적, 2021~)
    P = pd.DataFrame(preds)
    meta = pd.Series(np.nan, index=d.index)
    ok = d.base.notna() & d['yield'].notna() & d.a_base.notna()
    picks = {}
    for Y in TEST:
        past = d.y.between(2020, Y - 1)
        if past.sum() == 0:
            meta[d.y == Y] = P.loc[d.y == Y, "BASE"]
            picks[Y] = "BASE"
            continue
        pm = past & ok
        sc = {c: np.sqrt(np.average((d.base[pm] * (1 + P.loc[pm, c]) - d['yield'][pm]) ** 2, weights=d.area[pm]))
              for c in P.columns if P.loc[pm, c].notna().all()}
        b = min(sc, key=sc.get)
        picks[Y] = b
        meta[d.y == Y] = P.loc[d.y == Y, b]
    ev.loc["META"] = pd.Series(evaluate_subset(d, meta, "META")).drop("cand")
    ev.loc["META", "Δrmse"] = round(ev.loc["META", "rmse"] - ev.loc["BASE", "rmse"], 2)
    ev.to_csv(os.path.join(BT.OUT, f"eval_s2s1{'_all' if os.environ.get('ALL') else ''}_{ASOF}.csv"))
    print(f"[S2/S1 {ASOF}] {d[["sc","stem"]].drop_duplicates().shape[0]}시군 2020~2025, 후보 {len(rows) - 1} | 기준선 RMSE {ev.loc['BASE', 'rmse']} (평년 {ev.loc['BASE', 'rmse_norm']}, skill {ev.loc['BASE', 'skill']:+.3f})")
    print("META", ev.loc["META"].to_dict(), "\n선택", picks)
    print("상위 12(사후):")
    print(ev.drop(index=["META"]).sort_values("rmse").head(12)[["rmse", "Δrmse", "skill", "rank_r"]].to_string())
    print("하위 5:")
    print(ev.sort_values("rmse").tail(5)[["rmse", "Δrmse", "skill"]].to_string())
    print("개선 후보 수:", int((ev.drop(index=["BASE", "META"]).Δrmse < 0).sum()), "/", len(ev) - 2)

    # ---- 시도 수준: 상자 시군 평균 위성 변수 → M4 시도 잔차 ----
    an, an_sg, st, base = BT.load_common(ASOF)
    agg = d.groupby(["sc", "y"]).apply(lambda q: pd.Series({c: np.average(q[c].fillna(0), weights=q.area) for c in sets["all_oc"]})).reset_index()
    sd = st[st.sc.isin(M.PROV)].merge(base, on=["sc", "y"]).merge(agg, on=["sc", "y"], how="inner")
    sd["r"] = sd.a - sd.ahat
    sd["w"] = np.sqrt(sd.area / sd.area.mean())
    out = {}
    for sname in ["combo_c", "S2all_c", "all_c", "ndre_c", "s1_c", "S2all_o", "all_oc"]:
        feats = sets[sname]
        for mn in ["ridge", "pls"]:
            p = pd.Series(np.nan, index=sd.index)
            for Y in TEST:
                tr, te = sd[sd.y < Y], sd[sd.y == Y]
                if tr.y.nunique() < 3 or te.empty:
                    continue
                pr, _ = BT.MODELS[mn](tr[feats].values, tr.r.values, tr.w.values, te[feats].values, tr.y.values)
                p.loc[te.index] = te.ahat.values + pr
            m = sd.y.isin(TEST) & p.notna()
            e = sd.base[m] * (1 + p[m]) - sd["yield"][m]
            e0 = sd.base[m] * (1 + sd.ahat[m]) - sd["yield"][m]
            out[f"{sname}|{mn}"] = (round(float(np.sqrt(np.average(e ** 2, weights=sd.area[m]))), 2), round(float(np.sqrt(np.average(e0 ** 2, weights=sd.area[m]))), 2))
    print("\n시도(8도, 2020~25) 위성 잔차: (후보 RMSE, M4 RMSE)", out)
    json.dump({"picks": {int(k): v for k, v in picks.items()}, "sido": out}, open(os.path.join(BT.OUT, f"s2s1{'_all' if os.environ.get('ALL') else ''}_{ASOF}.json"), "w"), ensure_ascii=False)


if __name__ == "__main__":
    main()
