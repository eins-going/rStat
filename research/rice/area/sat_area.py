"""S1 필지 요약(out/s1_<pfx>_<y>_r<res>.npz) → 시군×연도 위성 벼 면적과 전년 대비 비율 (sat_area.csv). 가볍다(시도·연도 둘씩만 메모리에).

사용: .venv/bin/python research/rice/area/sat_area.py [--res 40] [--tag ""]
판별 (README.md 사전 등록):
  F  = 04-20~07-05 반달 구간 VH 최솟값(dB)            (모내기 담수 저점)
  G7 = 07-06~07-31 구간 VH 평균의 평균 (생육 후 회복)
  벼 = F <= TF 이고 G - F >= TD.   TF ∈ {-20,-19,-18,-17,-16}, TD ∈ {0, 2}, 시점 0731(G7)만(0831은 뺌)
  비율은 두 해 모두 관측된 같은 필지끼리(짝) 계산한다.
결과 sat_area.csv: y, sc(KOSIS), stem, sigun, var, ha_obs(그해 관측 논), rice(그해 벼), ha_pair, rice_prev, rice_cur(짝 필지), ratio
     sat_area_strata.csv: 같은 값을 (사후) 층(필지 40m 화소 수 4구간 × 경지정리)별로
"""
import argparse, glob, os, re
import numpy as np, pandas as pd

D = os.path.dirname(os.path.abspath(__file__))
TFS, TDS, ASOF = [-20, -19, -18, -17, -16], [0, 2], {"0731": [5, 6]}  # 8/31 시점은 비용 때문에 뺐다(README 수정 1)


def feats(f):
    z = np.load(f)
    dec = lambda a: np.where(a == 255, np.nan, a / 5.0 - 40).astype("float32")  # noqa: E731
    h, m = dec(z["vhmin"]), dec(z["vhmean"])
    with np.errstate(all="ignore"):
        import warnings
        warnings.simplefilter("ignore")
        F = np.nanmin(h[0:5], 0)
        out = {"F": F}
        for a, b in ASOF.items():
            out["G" + a] = np.nanmean(m[b], 0)
    return out


def rice(ft, tf, td, asof):
    F, G = ft["F"], ft["G" + asof]
    ok = np.isfinite(F) & np.isfinite(G)
    return ok, ok & (F <= tf) & (G - F >= td)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--res", type=int, default=40)
    ap.add_argument("--tag", default="")
    A = ap.parse_args()
    fs = sorted(glob.glob(f"{D}/out/s1_*_r{A.res}{A.tag}.npz"))
    fs = [f for f in fs if re.fullmatch(rf"s1_\d+_\d{{4}}_r{A.res}{A.tag}\.npz", os.path.basename(f))]
    by = {}
    for f in fs:
        _, pfx, y, _ = os.path.basename(f).split("_", 3)
        by.setdefault(pfx, {})[int(y)] = f
    rows = []
    for pfx, yf in sorted(by.items()):
        P = pd.read_csv(f"{D}/cache/parcels_{pfx}.csv", dtype={"sc": str})
        P["sc"] = P.sc.str.zfill(2)
        P.loc[P.sigun == "군위군", "sc"] = "37"  # KOSIS는 2023년 대구 편입 뒤에도 경북에 둔다
        key = P.sc + "|" + P.sigun
        # (사후) 층: 40m 화소 수(1, 2~3, 4~7, 8+) × 경지정리 — 촬영 빈도 효과가 필지 크기에 따라 다른 것을 시도 안 같은 층 비율로 지우려는 것
        npx = P[f"npx{A.res}"].values if f"npx{A.res}" in P else np.ones(len(P))
        strat = np.digitize(npx, [2, 4, 8]).astype(str)
        key = key + "|" + pd.Series(strat).radd("s") + np.where(P.armt.values == "Y", "Y", "N")
        area = P.area.values / 1e4
        prev = None
        for y in sorted(yf):
            ft = feats(yf[y])
            for tf in TFS:
                for td in TDS:
                    for asof in ASOF:
                        v = f"f{-tf}d{td}_{asof}"
                        ok, r = rice(ft, tf, td, asof)
                        df = pd.DataFrame({"k": key, "ha_obs": area * ok, "rice": area * r})
                        if prev is not None and prev[0] == y - 1:
                            ok0, r0 = rice(prev[1], tf, td, asof)
                            pr = ok & ok0
                            df["ha_pair"], df["rice_prev"], df["rice_cur"] = area * pr, area * (r0 & pr), area * (r & pr)
                        g = df.groupby("k").sum()
                        g["y"], g["var"] = y, v
                        rows.append(g.reset_index())
            prev = (y, ft)
        print(pfx, sorted(yf), flush=True)
    o = pd.concat(rows, ignore_index=True)
    o[["sc", "sigun", "strat"]] = o.k.str.split("|", expand=True)
    o.drop(columns="k").to_csv(f"{D}/sat_area_strata{A.tag}{'' if A.res == 40 else f'_r{A.res}'}.csv", index=False)
    o = o.groupby(["y", "var", "sc", "sigun"], as_index=False)[["ha_obs", "rice", "ha_pair", "rice_prev", "rice_cur"]].sum(min_count=1)
    o["stem"] = o.sigun.str[:-1]
    o.loc[o.sigun == "세종시", "sc"] = "29"
    o["ratio"] = o.rice_cur / o.rice_prev
    cols = ["y", "sc", "stem", "sigun", "var", "ha_obs", "rice", "ha_pair", "rice_prev", "rice_cur", "ratio"]
    for c in cols:
        if c not in o:
            o[c] = np.nan
    o = o[cols].round(2)
    o.to_csv(f"{D}/sat_area{A.tag}{'' if A.res == 40 else f'_r{A.res}'}.csv", index=False)
    print(len(o), "행")


if __name__ == "__main__":
    main()
