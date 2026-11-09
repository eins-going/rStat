# s2s1_all: s2s1 복사본 — 상위 60시군 뒤 나머지 시군(2025 재배면적 500ha+)으로 넓히기 (11-10)
"""cells.csv → 시군별 논 밀집 2km 칸 2개 선택 → 그 칸의 논 필지(경지정리 우선, -10m 버퍼) 폴리곤 저장 boxes.json / box_polys.parquet"""
import glob, gzip, json, os, sys
from multiprocessing import Pool
import numpy as np, pandas as pd
from shapely.geometry import shape, box
from shapely import wkb
from pyproj import Transformer
sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import common
OUT = os.path.dirname(os.path.abspath(__file__))
ROOT = "/home/eins/project/rStat/db/raw/farmmap/2026"
CELL = 2000.0
NSIG = int(sys.argv[1]) if len(sys.argv) > 1 else 60


def choose():
    c = pd.read_csv(f"{OUT}/cells.csv")
    t = common.targets()
    d = t[t.y == 2025].sort_values("area", ascending=False).reset_index(drop=True)
    d = d[(d.index >= 60) & (d.area >= 500)].reset_index(drop=True)  # s2s1(상위 60시군) 뒤 나머지, 2025 재배면적 500ha 이상
    d.index = d.index + 60
    rows = []
    for rank, r in d.iterrows():
        g = c[(c.sc.astype(str).str.zfill(2) == r.sc) & (c.sigun == r["name"])].copy()
        if g.empty:
            print("없음", r.sc, r["name"]); continue
        g["score"] = g.area_y + 0.3 * (g.area - g.area_y)
        g = g.sort_values("score", ascending=False)
        first = g.iloc[0]
        picks = [first]
        for _, h in g.iloc[1:].iterrows():
            if max(abs(h.cx - first.cx), abs(h.cy - first.cy)) >= 3 and h.score >= 0.5 * first.score:
                picks.append(h); break
        if len(picks) == 1:
            for _, h in g.iloc[1:].iterrows():
                if max(abs(h.cx - first.cx), abs(h.cy - first.cy)) >= 2:
                    picks.append(h); break
        for k, p in enumerate(picks):
            rows.append(dict(box=f"{r.sc}_{r['stem']}_{k}", sc=r.sc, stem=r["stem"], sigun=r["name"], rank=rank,
                             cx=int(p.cx), cy=int(p.cy), paddy_ha=round(p.area / 1e4, 1), armt_ha=round(p.area_y / 1e4, 1)))
    return pd.DataFrame(rows)


SEL = None


def init(sel):
    global SEL
    SEL = sel


def grab(f):
    out = []
    with gzip.open(f, "rt") as fh:
        for line in fh:
            if '"clsf_nm":"논"' not in line:
                continue
            r = json.loads(line)
            a = np.asarray(r["geometry"]["coordinates"][0][0])
            k = (int(a[:, 0].mean() // CELL), int(a[:, 1].mean() // CELL))
            if k in SEL:
                g = shape(r["geometry"]).buffer(-10)
                if g.is_empty:
                    continue
                out.append((SEL[k], r.get("fl_armt_yn"), r["area"], g.wkb))
    return out


if __name__ == "__main__":
    b = choose()
    print(b.to_string())
    sel = {(r.cx, r.cy): r.box for r in b.itertuples()}
    rows = []
    with Pool(3, initializer=init, initargs=(sel,)) as p:
        for r in p.imap_unordered(grab, sorted(glob.glob(f"{ROOT}/*.jsonl.gz"))):
            rows += r
    pol = pd.DataFrame(rows, columns=["box", "armt", "area", "wkb"])
    pol.to_pickle(f"{OUT}/box_polys.pkl")
    tr = Transformer.from_crs(5179, 4326, always_xy=True)
    b["lon0"], b["lat0"] = tr.transform((b.cx * CELL).values, (b.cy * CELL).values)
    b["lon1"], b["lat1"] = tr.transform(((b.cx + 1) * CELL).values, ((b.cy + 1) * CELL).values)
    st = pol.groupby("box").agg(n=("area", "size"), buf_ha=("wkb", lambda s: sum(wkb.loads(x).area for x in s) / 1e4))
    b = b.merge(st, left_on="box", right_index=True, how="left")
    b.to_csv(f"{OUT}/boxes.csv", index=False)
    print(b[["box", "paddy_ha", "armt_ha", "n", "buf_ha"]].describe())
