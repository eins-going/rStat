"""위성 벼 면적 증감(sat_area.csv)으로 시군 면적 추정 — 엄격 실시간 검증 (README.md 사전 등록 그대로).

사용: .venv/bin/python research/rice/area/eval_area.py [--sat sat_area.csv] [--json results.json]
예측식: B0 = a1, B1 = a1·sa/sa1, S9 = B1·(r/r_sd)^w, S7 = a1·r^w. w·판별 후보는 그해 이전 짝으로만.
(사후) S9s = B1·(위성 시군 벼 / 층별 시도 비율로 낸 기대값)^w — 층 = 필지 40m 화소 수 4구간 × 경지정리.
"""
import argparse, json, os, sys
import numpy as np, pandas as pd

sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import common as C  # noqa: E402

D = os.path.dirname(os.path.abspath(__file__))
DEF = "f18d2"
CLIP = 0.3


def truth():
    t = C.targets().sort_values("y")
    g = t.groupby(["sc", "stem"])
    t["a1"], t["y1"] = g.area.shift(1), g.y.shift(1)
    k = C._kosis()
    s = k[k.code.str.len() == 2].rename(columns={"code": "sc", "area": "sa"})[["y", "sc", "sa"]].sort_values("y")
    s["sa1"] = s.groupby("sc").sa.shift(1)
    t = t.merge(s, on=["y", "sc"], how="left")
    t = t[(t.y1 == t.y - 1) & t.a1.notna() & t.sa1.notna()]
    return t


STR = None


def build(sat, t, var):
    s = sat[sat["var"] == var].copy()
    if STR is not None:  # (사후) 층별 시도 비율로 기대값
        q = STR[STR["var"] == var]
        rs = q.groupby(["y", "sc", "strat"])[["rice_prev", "rice_cur"]].sum()
        rs["r_s"] = rs.rice_cur / rs.rice_prev
        q = q.merge(rs[["r_s"]].reset_index(), on=["y", "sc", "strat"], how="left")
        q["exp"] = q.rice_prev * q.r_s.fillna(1)
        e = q.groupby(["y", "sc", "sigun"], as_index=False)["exp"].sum()
        s = s.merge(e, on=["y", "sc", "sigun"], how="left")
    sd = s.groupby(["y", "sc"])[["rice_prev", "rice_cur"]].sum()
    sd["r_sd"] = sd.rice_cur / sd.rice_prev
    s = s.merge(sd[["r_sd"]].reset_index(), on=["y", "sc"], how="left")
    d = t.merge(s[["y", "sc", "stem", "ratio", "r_sd", "ha_pair", "rice_prev", "rice_cur"] + (["exp"] if "exp" in s else [])], on=["y", "sc", "stem"], how="inner")
    d = d[np.isfinite(d.ratio) & (d.ratio > 0) & (d.rice_prev > 0)]
    d["x9"] = np.clip(np.log(d.ratio / d.r_sd), -CLIP, CLIP)
    d["x7"] = np.clip(np.log(d.ratio), -CLIP, CLIP)
    d["x9s"] = np.clip(np.log(d.rice_cur / d.exp), -CLIP, CLIP) if "exp" in d else d.x9
    d["b0"], d["b1"] = d.a1, d.a1 * d.sa / d.sa1
    d["y9"], d["y7"] = np.log(d.area / d.b1), np.log(d.area / d.b0)
    return d


def fitw(tr, x, y):
    if len(tr) == 0:
        return 0.5
    w = tr.area.values
    den = np.sum(w * tr[x] ** 2)
    return float(np.clip(np.sum(w * tr[x] * tr[y]) / den, 0, 1)) if den > 0 else 0.0


def metr(e, w):
    e = np.asarray(e); w = np.asarray(w)
    return {"rmse": round(float(np.sqrt(np.average(e ** 2, weights=w))) * 100, 2), "mad": round(float(np.median(np.abs(e))) * 100, 2),
            "gt5": round(float((np.abs(e) > .05).mean()) * 100, 1), "n": int(len(e))}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sat", default=f"{D}/sat_area.csv")
    ap.add_argument("--json", default=f"{D}/results.json")
    ap.add_argument("--asof", default="0731")
    ap.add_argument("--strata", default=f"{D}/sat_area_strata.csv", help="(사후) 층별 표. 없으면 S9s = S9")
    A = ap.parse_args()
    global STR
    if os.path.exists(A.strata):
        STR = pd.read_csv(A.strata, dtype={"sc": str})
        STR["sc"] = STR.sc.str.zfill(2)
    sat = pd.read_csv(A.sat, dtype={"sc": str})
    sat["sc"] = sat.sc.str.zfill(2)
    t = truth()
    tev = t[(t.area >= 500)]
    vars_ = sorted(sat["var"].unique())
    res = {}
    for asof in A.asof.split(","):
        vs = [v for v in vars_ if v.endswith(asof)]
        dd = {v: build(sat, tev, v) for v in vs}
        years = sorted(set(dd[vs[0]].y) & set(range(2018, 2026)))
        # 모든 후보가 같은 시군-연도를 쓰도록 공통 집합
        common = None
        for v in vs:
            k = set(zip(dd[v].y, dd[v].sc, dd[v].stem))
            common = k if common is None else common & k
        for v in vs:
            dd[v] = dd[v][[k in common for k in zip(dd[v].y, dd[v].sc, dd[v].stem)]]
        out = []
        sel = {}
        for Y in years:
            for kind, x, yv, base in [("S9", "x9", "y9", "b1"), ("S7", "x7", "y7", "b0"), ("S9s", "x9s", "y9", "b1")]:
                # 판별 후보 선택 (그해 이전)
                if Y == years[0]:
                    best = f"{DEF}_{asof}"
                else:
                    sc_ = {}
                    for v in vs:
                        tr = dd[v][dd[v].y < Y]
                        # 이전 해들도 각 해 시점의 실시간 w로 평가
                        ee = []
                        for Yp in sorted(tr.y.unique()):
                            w_ = fitw(tr[tr.y < Yp], x, yv) if Yp > years[0] else 0.5
                            q = tr[tr.y == Yp]
                            ee.append((q[base] * np.exp(w_ * q[x]) / q.area - 1, q.area))
                        e = np.concatenate([a for a, _ in ee]); w = np.concatenate([b for _, b in ee])
                        sc_[v] = np.sqrt(np.average(e ** 2, weights=w))
                    best = min(sc_, key=sc_.get)
                d = dd[best]
                w_ = fitw(d[d.y < Y], x, yv)
                q = d[d.y == Y].copy()
                q["pred"] = q[base] * np.exp(w_ * q[x])
                q["pred_w1"] = q[base] * np.exp(q[x])
                q["kind"], q["var"], q["w"] = kind, best, w_
                # 기본 판별·w 고정 참고
                dq = dd[f"{DEF}_{asof}"]; qq = dq[dq.y == Y].set_index(["sc", "stem"])
                q["pred_def_w1"] = q.set_index(["sc", "stem"]).index.map(lambda k: qq.loc[k, base] * np.exp(qq.loc[k, x]) if k in qq.index else np.nan)
                out.append(q)
                sel[(kind, Y)] = (best, round(w_, 2))
        o = pd.concat(out)
        r = {"sel": {f"{k}_{Y}": v for (k, Y), v in sel.items()}}
        for lab, m in [("all", o.y > 0), ("no2021", o.y != 2021)]:
            for kind in ["S9", "S7", "S9s"]:
                q = o[(o.kind == kind) & m]
                r[f"{lab}_{kind}"] = metr(q.pred / q.area - 1, q.area)
                r[f"{lab}_{kind}_w1"] = metr(q.pred_w1 / q.area - 1, q.area)
                qd = q.dropna(subset=["pred_def_w1"])
                r[f"{lab}_{kind}_def_w1"] = metr(qd.pred_def_w1 / qd.area - 1, qd.area)
            q = o[(o.kind == "S9") & m]
            r[f"{lab}_B1"] = metr(q.b1 / q.area - 1, q.area)
            r[f"{lab}_B0"] = metr(q.b0 / q.area - 1, q.area)
        yr = {}
        for Y, q in o.groupby("y"):
            q9, q7, qs = q[q.kind == "S9"], q[q.kind == "S7"], q[q.kind == "S9s"]
            yr[int(Y)] = {"B1": metr(q9.b1 / q9.area - 1, q9.area)["rmse"], "S9": metr(q9.pred / q9.area - 1, q9.area)["rmse"],
                          "B0": metr(q9.b0 / q9.area - 1, q9.area)["rmse"], "S7": metr(q7.pred / q7.area - 1, q7.area)["rmse"],
                          "S9_w1": metr(q9.pred_w1 / q9.area - 1, q9.area)["rmse"], "S9s": metr(qs.pred / qs.area - 1, qs.area)["rmse"],
                          "corr_x9s_y9": round(float(np.corrcoef(qs.x9s, qs.y9)[0, 1]), 3),
                          "corr_x9_y9": round(float(np.corrcoef(q9.x9, q9.y9)[0, 1]), 3),
                          "corr_x7_y7": round(float(np.corrcoef(q7.x7, q7.y7)[0, 1]), 3), "n": int(len(q9))}
        r["years"] = yr
        res[asof] = r
        o.to_csv(f"{D}/pred_{asof}.csv", index=False)
        print(f"== 시점 {asof}")
        for lab in ["all", "no2021"]:
            print(lab, {k.replace(lab + "_", ""): (v["rmse"], v["mad"], v["gt5"], v["n"]) for k, v in r.items() if k.startswith(lab)})
        print(pd.DataFrame(yr).T.to_string())
        print(r["sel"])
    json.dump(res, open(A.json, "w"), ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
