"""최종 실행: 후보 모델 실시간 검증 → results.json, 예측표, 성분 기여표.

사용: OMP_NUM_THREADS=2 memcap -m 3G .venv/bin/python research/rice/cropmodel/run_final.py
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
sys.path.insert(0, os.path.dirname(HERE))
import common  # noqa: E402
import model as M  # noqa: E402

pd.set_option("display.width", 250)
SUF = ("" if os.environ.get("PHENO", "adaptive") == "adaptive" else "_fixed") + os.environ.get("WX_VARIANT_SUFFIX", "")
comp = M.prep(pd.read_csv(os.path.join(HERE, f"components_sido{SUF}.csv"), dtype={"sc": str, "asof": str}))
cs = M.prep(pd.read_csv(os.path.join(HERE, f"components_sigun{SUF}.csv.gz"), dtype={"sc": str, "asof": str}))
ASOFS = sorted(comp["asof"].unique())  # components.py RICE_ASOF
OUT = os.path.join(HERE, "out" + SUF)
os.makedirs(OUT, exist_ok=True)
st = M.sido_targets()
EXTRA = ["wind_max", "wind20", "wind_early", "tmin_fill", "hot_fill", "cold_q", "lsim", "rs_fill", "tfill", "heading",
         "sunless_pre", "sunless_post", "wind15", "rs_pre25"]
FE = sorted(set(M.COMP_ALL + [e for e in EXTRA if e in comp.columns]))
an = M.anomalies(comp, FE)
an_sg = M.anomalies_sigun(cs, FE)
# 영화수(sink) 제한은 비대칭: 출수 전 일사 부족만 깎고 많다고 더 늘지 않음 → 편차의 음(-) 부분 (경첩 0 고정, 2020 보고 정한 값 아님)
for tab in list(an.values()) + list(an_sg.values()):
    tab["rs_pre_def"] = tab["rs_pre"].clip(upper=0)
FE = FE + ["rs_pre_def"]
M.LABEL.update({"rs_pre_def": "출수 전 일사 부족(영화수)", "sunless_pre": "출수 전 흐린 날", "sunless_post": "등숙기 흐린 날",
                "wind15": "강풍일(≥15m/s)", "hot_fill": "등숙기 고온(>26℃)", "tmin_fill": "등숙기 밤기온"})
M4 = ["cold_mei", "heat_ant", "rs_pre", "rs_pre_def", "sunless_pre", "ptq_fill", "sunless_post", "wind15", "rain_hv", "wet_head"]
CAND = {
    "M2_comp": M.COMP_ALL,  # 사전 선언 주 모델
    "M2w_comp+wind20": [f for f in M.COMP_ALL if f != "wind"] + ["wind20"],
    "M2h_comp+hotfill": M.COMP_ALL + ["hot_fill"],
    "M3_simriw+dmg": ["lsim"] + M.DMG,
    "M4_sink-source": M4,  # 영화수(출수 전) · 등숙(출수 후) · 불임 · 피해 · 도열병
    "M4h_sink-source+heat": M4 + ["hot_fill", "tmin_fill"],
}
CAND = {k: v for k, v in CAND.items() if all(f in FE for f in v)}
res, preds = {}, {}
for name, feats in CAND.items():
    for asof in ASOFS:
        p, coefs = M.backtest(an, st, feats, asof, icpt="cw", years=range(1996, int(comp.y.max())))
        s13 = M.sido_score(p, st)
        kg = M.sido_kg(p, st)
        kg13 = M.sido_kg(p, st, range(2013, 2026))
        sg_pred = M.apply_sigun(an_sg, asof, years=range(2013, int(comp.y.max())))
        for blend in [0.0, 0.5]:
            sg = M.to_sigun(p, sg_pred, blend)
            r = common.evaluate(sg, f"{name}/{asof}/b{blend}", verbose=False)
            key = f"{name}|{asof}|blend{blend}"
            res[key] = {"feats": feats, "sido_skill_13_25": s13[0], "sido_rmse_kg_10_25": kg[0], "sido_rmse_kg_base_10_25": kg[1],
                        "sido_rmse_kg_13_25": kg13[0], "sido_rmse_kg_base_13_25": kg13[1],
                        **{k: r[k] for k in ["skill", "rmse", "rmse_base", "mae", "rank_r", "nat_rmse", "nat_rmse_base", "nat_err_2020", "hit_2020"]}}
            preds[key] = (p, sg, coefs)
            print(f"{key:36s} 시도skill {s13[0]:+.3f} 시도RMSE(10-25,≥1000ha) {kg[0]} (평년 {kg[1]}) | 시군 skill {r['skill']:+.3f} RMSE {r['rmse']} 순위r {r['rank_r']}"
                  f" | 전국 {r['nat_rmse']} (평년 {r['nat_rmse_base']}) 2020 {r['nat_err_2020']} hit {r['hit_2020']}", flush=True)

GROUPS = {"영화수(출수전 일사)": ["rs_pre", "rs_pre_def", "sunless_pre"], "등숙(일사·온도)": ["ptq_fill", "sunless_post", "rs_fill", "tfill", "hot_fill", "tmin_fill"],
          "불임(냉해·고온)": ["cold_mei", "heat_ant", "cold_q"], "태풍·호우": ["wind", "wind15", "wind20", "rain_hv"], "도열병(출수기 비)": ["wet_head"],
          "흐린 날": ["sunless"], "SIMRIW": ["lsim"]}
MAIN = os.environ.get("MAIN", "M4_sink-source")
best = {a: f"{MAIN}|{a}|blend0.0" for a in ASOFS}

# ---- 성분 기여: 전국(면적가중 8도) 연도별, 주 모델 9/15·10/1 ----
exp = {}
for a in ASOFS:
    p, sg, coefs = preds[best[a]]
    d = p.merge(st, on=["sc", "y"]).query("sc in @M.PROV")
    cc = [c for c in d.columns if c.startswith("c_")] + ["icpt"]
    nat = d.groupby("y").apply(lambda g: pd.Series({"a_obs": np.average(g.a, weights=g.area), "a_hat": np.average(g.ahat, weights=g.area),
                                                  **{c: np.average(g[c], weights=g.area) for c in cc}}))
    nat = (nat * 100).round(2)
    for gname, members in GROUPS.items():
        cols = ["c_" + m_ for m_ in members if "c_" + m_ in nat.columns]
        if cols:
            nat["G_" + gname] = nat[cols].sum(axis=1).round(2)
    nat.to_csv(os.path.join(OUT, f"contrib_nation_{a}.csv"))
    exp[a] = nat
    print(f"\n전국 기여(%p), as-of {a}\n", nat.loc[[y for y in [2003, 2012, 2016, 2019, 2020, 2024] + list(range(2013, 2026)) if y in nat.index]].drop_duplicates().to_string())
    # 시도 기여표
    d[["sc", "y", "a", "ahat", "icpt"] + cc[:-1]].round(4).to_csv(os.path.join(OUT, f"contrib_sido_{a}.csv"), index=False)

# ---- 설명용 전기간 적합(검증 아님): 1993 등 실시간 검증 밖의 해까지 성분 기여 ----
feats = CAND[MAIN]
dfull = st.merge(an["1001"], on=["sc", "y"])
tr = dfull[dfull.sc.isin(M.PROV) & (dfull.y >= M.START)].dropna(subset=feats + ["a"])
ah, contrib, c, coef, mu = M.fit_predict(tr, tr, feats, M.LAM, "cw", w=np.sqrt(tr.area.values / tr.area.mean()))
x = tr[["sc", "y", "a", "area"]].copy()
x["ahat"] = ah
for j, f in enumerate(feats):
    x["c_" + f] = contrib[:, j]
insample = x.groupby("y").apply(lambda g: pd.Series({k: np.average(g[k], weights=g.area) for k in ["a", "ahat"] + ["c_" + f for f in feats]}))
insample = (insample * 100).round(2)
for gname, members in GROUPS.items():
    cols = ["c_" + m_ for m_ in members if "c_" + m_ in insample.columns]
    if cols:
        insample["G_" + gname] = insample[cols].sum(axis=1).round(2)
insample.to_csv(os.path.join(OUT, "contrib_nation_insample_1001.csv"))
print("\n설명용 전기간 적합(1001, in-sample) 계수:", dict(zip(feats, coef.round(6))), "절편", round(float(c), 4))
print(insample.loc[[y for y in [1993, 2003, 2012, 2016, 2019, 2020, 2024] if y in insample.index]].to_string())

# ---- 시군-연도 성분표(원값 + 편차 + 시도 모델 기여 + 예측) ----
p, sg, _ = preds[best["0915"]]
RAWC = [c for c in dict.fromkeys(CAND[MAIN] + ["hot_fill", "tmin_fill", "simriw", "gamma_cold"]) if c in cs.columns]
raw = cs[cs["asof"] == "0915"][["sc", "stem", "y", "heading"] + RAWC]
anom = an_sg["0915"][["sc", "stem", "y"] + CAND[MAIN]].rename(columns={c: "d_" + c for c in CAND[MAIN]})
tab = sg[["y", "sc", "stem", "name", "yield", "base", "a", "ahat", "pred_yield"]].merge(raw, on=["sc", "stem", "y"], how="left").merge(
    anom, on=["sc", "stem", "y"], how="left")
tab.round(4).to_csv(os.path.join(OUT, "components_sigun_table_0915.csv"), index=False)
for a in best:
    preds[best[a]][1][["y", "sc", "stem", "pred_yield"]].to_csv(os.path.join(OUT, f"pred_sigun_{a}.csv"), index=False)

out = {"main_model": MAIN, "feats": CAND[MAIN], "pheno": SUF or "adaptive", "lambda": M.LAM, "intercept": "최근 가중(반감 8년)", "train": f"8개 도 {M.START}~(y-1)",
       "best": {a: res[best[a]] for a in best}, "all": res,
       "coefs_2025_0915": preds[best["0915"]][2].get(2025)}
json.dump(out, open(os.path.join(OUT, "results.json"), "w"), ensure_ascii=False, indent=1, default=float)
print("저장 results.json")

# ---- 예측 연도 FY(기상이 있는 마지막 해) 예측: FY-1년까지 학습, 모든 as-of ----
FY = int(comp.y.max())
if FY > 2025:
    t = common.targets()
    last = t[t.y.between(FY - 5, FY - 1)].pivot_table(index=["sc", "stem"], columns="y", values="yield")
    base26 = last.apply(lambda r: np.sort(r.values)[1:-1].mean() if r.notna().sum() == 5 else np.nan, axis=1).rename("base").reset_index()
    sdk = M.sido_targets()
    sdl = sdk[sdk.y.between(FY - 5, FY - 1)].pivot_table(index="sc", columns="y", values="yield")
    sdbase = sdl.apply(lambda r: np.sort(r.values)[1:-1].mean() if r.notna().sum() == 5 else np.nan, axis=1)
    rows = []
    feats = CAND[MAIN]
    for a in ASOFS:
        dfull = st.merge(an["1001"], on=["sc", "y"])
        tr = dfull[dfull.sc.isin(M.PROV) & (dfull.y >= M.START) & (dfull.y <= FY - 1)].dropna(subset=feats + ["a"])
        te = an[a][an[a].y == FY].dropna(subset=feats)
        ah, contrib, c, coef, mu = M.fit_predict(tr, te, feats, M.LAM, "cw", w=np.sqrt(tr.area.values / tr.area.mean()))
        o = te[["sc"]].copy()
        o["asof"], o["ahat"], o["icpt"] = a, ah, c
        for j, f in enumerate(feats):
            o["c_" + f] = contrib[:, j]
        rows.append(o)
    sd26 = pd.concat(rows, ignore_index=True)
    sd26["base"] = sd26.sc.map(sdbase)
    sd26["pred_yield"] = sd26.base * (1 + sd26.ahat)
    sd26.assign(y=FY).round(4).to_csv(os.path.join(OUT, "pred_fy_sido.csv"), index=False)
    from components import SD_GROUP
    b = base26.copy()
    b["grp"] = b.sc.map(SD_GROUP)
    out26 = []
    for a in ASOFS:
        m = sd26[sd26["asof"] == a].set_index("sc").ahat
        x = b.copy()
        x["asof"] = a
        x["ahat"] = [m.get(s_, m.get(g_, np.nan)) for s_, g_ in zip(x.sc, x.grp)]
        x["pred_yield"] = x.base * (1 + x.ahat)
        out26.append(x)
    p26 = pd.concat(out26).dropna(subset=["base"])
    p26["y"] = FY
    p26[["y", "asof", "sc", "stem", "base", "ahat", "pred_yield"]].round(4).to_csv(os.path.join(OUT, "pred_fy.csv"), index=False)
    pr = sd26[sd26.sc.isin(M.PROV)]
    ar = st[st.y == FY - 1].set_index("sc").area
    for a, g in pr.groupby("asof"):
        w = g.sc.map(ar)
        cc = {c[2:]: round(float(np.average(g[c], weights=w) * 100), 2) for c in g.columns if c.startswith("c_")}
        print(f"{FY} as-of {a}: 8도 면적가중 â {np.average(g.ahat, weights=w) * 100:+.2f}% 기여 {cc}")
