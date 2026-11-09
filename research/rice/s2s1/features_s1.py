"""rows_s1.jsonl → 시군-연도 S1 특징 (궤도 보정: 같은 해 같은 상자에서 궤도별 평균 차이 제거). feats_s1.csv"""
import os
import numpy as np, pandas as pd
OUT = os.path.dirname(os.path.abspath(__file__))
ASOF = {"0815": 227, "0915": 258, "1001": 274, "1015": 288}
WIN = {"a1": (213, 227), "a2": (228, 243), "s1": (244, 258), "s2": (259, 273)}
V = ["vh", "vv", "vhvv"]


def build():
    d = pd.read_json(f"{OUT}/rows_s1.jsonl", lines=True)
    d = d[d.vh.notna() & (d.n_valid >= 0.5 * d.n_paddy)].copy()
    d["date"] = pd.to_datetime(d.date)
    d["y"], d["doy"] = d.date.dt.year, d.date.dt.dayofyear
    boxes = pd.read_csv(f"{OUT}/boxes.csv")
    out = []
    for (bx, y), g in d.groupby(["box", "y"]):
        for asof, a in ASOF.items():
            h = g[g.doy <= a].copy()
            f = dict(box=bx, y=y, asof=asof, s1_n=len(h))
            if len(h) < 3:
                out.append(f); continue
            for v in V:
                om = h.groupby("rel")[v].transform("mean")
                h[v + "_k"] = h[v] - om + h[v].mean()
            for v in V:
                for nm, (lo, hi) in WIN.items():
                    if hi > a:
                        continue
                    w = h[(h.doy >= lo) & (h.doy <= hi)][v + "_k"]
                    f[f"s1{v}_{nm}"] = w.mean() if len(w) else np.nan
                # 같은 궤도 연속 관측 사이 최대 하락/상승 (8/20~9/30), 쓰러짐·태풍 흔적
                ch = []
                for rel, q in h.sort_values("doy").groupby("rel"):
                    q = q[(q.doy >= 220) & (q.doy <= 273)]
                    if len(q) >= 2:
                        ch += list(np.diff(q[v].values))
                f[f"s1{v}_maxdrop"] = min(ch) if ch else np.nan
                f[f"s1{v}_maxrise"] = max(ch) if ch else np.nan
            for v in V:
                if f.get(f"s1{v}_s1") is not None and f.get(f"s1{v}_a1") is not None:
                    f[f"s1{v}_d_s1a1"] = f[f"s1{v}_s1"] - f[f"s1{v}_a1"]
            out.append(f)
    bf = pd.DataFrame(out).merge(boxes[["box", "sc", "stem"]], on="box")
    num = [c for c in bf.columns if c not in ("box", "y", "asof", "sc", "stem")]
    sg = bf.groupby(["sc", "stem", "y", "asof"])[num].mean().reset_index()
    sg["sc"] = sg.sc.astype(str).str.zfill(2)
    sg.to_csv(f"{OUT}/feats_s1.csv", index=False)
    return sg


if __name__ == "__main__":
    s = build()
    print(s.groupby(["asof", "y"])[["s1_n", "s1vh_a1", "s1vh_s1", "s1vv_maxdrop"]].mean().round(2).to_string())
