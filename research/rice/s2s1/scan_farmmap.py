"""팜맵 논 필지를 2km 격자(EPSG:5179)로 집계 → cells.csv. 상위 시군만."""
import glob, gzip, json, os, sys
from collections import defaultdict
from multiprocessing import Pool
import numpy as np, pandas as pd
sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import common

ROOT = "/home/eins/project/rStat/db/raw/farmmap/2026"
OUT = os.path.dirname(os.path.abspath(__file__))
CELL = 2000.0


def top_sigun(n=60):
    t = common.targets()
    d = t[t.y == 2025].sort_values("area", ascending=False).head(n)
    return set(zip(d.sc, d.name))


TOP = top_sigun()


def key(addr):
    tok = addr.split()
    sc = common.sido_code(tok[0])
    if sc == "29":
        return sc, "세종시"
    return sc, tok[1] if len(tok) > 1 else None


def scan(f):
    acc = defaultdict(lambda: [0.0, 0.0, 0])
    with gzip.open(f, "rt") as fh:
        for line in fh:
            if '"clsf_nm":"논"' not in line:
                continue
            r = json.loads(line)
            k = key(r["stdg_addr"])
            if k not in TOP:
                continue
            ring = r["geometry"]["coordinates"][0][0]
            a = np.asarray(ring)
            cx, cy = int(a[:, 0].mean() // CELL), int(a[:, 1].mean() // CELL)
            v = acc[(k[0], k[1], cx, cy)]
            v[0] += r["area"]
            if r.get("fl_armt_yn") == "Y":
                v[1] += r["area"]
            v[2] += 1
    return [(*k, *v) for k, v in acc.items()]


if __name__ == "__main__":
    files = sorted(glob.glob(f"{ROOT}/*.jsonl.gz"))
    rows = []
    with Pool(3) as p:
        for i, r in enumerate(p.imap_unordered(scan, files)):
            rows += r
            if i % 50 == 0:
                print(i, len(files), flush=True)
    df = pd.DataFrame(rows, columns=["sc", "sigun", "cx", "cy", "area", "area_y", "n"])
    df = df.groupby(["sc", "sigun", "cx", "cy"], as_index=False).sum()
    df.to_csv(f"{OUT}/cells.csv", index=False)
    print(df.groupby(["sc", "sigun"]).area.sum().sort_values().head(), len(df))
