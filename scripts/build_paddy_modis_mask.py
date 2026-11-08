"""팜맵 논 필지 → MODIS 250m(사인곡선 격자) 격자별 논 면적·시군.

필지 중심점(외곽선 꼭짓점 평균)이 속한 MODIS 전역 격자(col,row)에 필지 면적을 더한다.
필지(대부분 1ha 미만)가 격자(약 5.4ha)보다 훨씬 작아서 근사 오차는 작다.

출력: db/clean/rice/paddy_modis.csv  (col,row,paddy_m2,frac,sido,sigun,share)
  - frac: 논 면적 / 격자 면적, sigun: 그 격자에서 논 면적이 가장 큰 시군, share: 그 시군 비중
사용: .venv/bin/python scripts/build_paddy_modis_mask.py [--procs 3]
"""
import argparse
import gzip
import json
import math
import os
from collections import defaultdict
from multiprocessing import Pool

from pyproj import Transformer

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "db", "raw", "farmmap", "2026")
OUT = os.path.join(ROOT, "db", "clean", "rice")
R = 6371007.181
PX = 231.65635826395834
X0, Y0 = -20015109.354, 10007554.677
PX_AREA = PX * PX


def sigun_of(addr):
    p = addr.split()
    if not p:
        return None, None
    sido = p[0]
    if sido.startswith("세종"):
        return sido, "세종시"
    return sido, (p[1] if len(p) > 1 else None)


def work(path):
    tr = Transformer.from_crs(5179, 4326, always_xy=True)
    acc = defaultdict(float)
    n = 0
    with gzip.open(path, "rt", encoding="utf-8") as fh:
        for line in fh:
            if '"clsf_nm":"논"' not in line:
                continue
            r = json.loads(line)
            g = r.get("geometry")
            if not g:
                continue
            ring = g["coordinates"][0][0] if g["type"] == "MultiPolygon" else g["coordinates"][0]
            xs = [c[0] for c in ring]; ys = [c[1] for c in ring]
            lon, lat = tr.transform(sum(xs) / len(xs), sum(ys) / len(ys))
            la = math.radians(lat)
            x = R * math.radians(lon) * math.cos(la)
            y = R * la
            col = int((x - X0) // PX); row = int((Y0 - y) // PX)
            sido, sg = sigun_of(r.get("stdg_addr") or "")
            acc[(col, row, sido, sg)] += float(r.get("area") or 0)
            n += 1
    return n, dict(acc)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--procs", type=int, default=3)
    a = ap.parse_args()
    files = sorted(f for f in os.listdir(SRC) if f.endswith(".jsonl.gz"))
    files = [os.path.join(SRC, f) for f in files]
    tot = defaultdict(float)
    by = defaultdict(lambda: defaultdict(float))
    n = 0
    with Pool(a.procs) as pool:
        for i, (k, acc) in enumerate(pool.imap_unordered(work, files)):
            n += k
            for (col, row, sido, sg), v in acc.items():
                tot[(col, row)] += v
                by[(col, row)][(sido, sg)] += v
            if (i + 1) % 20 == 0:
                print(f"{i + 1}/{len(files)} 파일, 논 필지 {n:,}, 격자 {len(tot):,}", flush=True)
    os.makedirs(OUT, exist_ok=True)
    with open(os.path.join(OUT, "paddy_modis.csv"), "w", encoding="utf-8") as f:
        f.write("col,row,paddy_m2,frac,sido,sigun,share\n")
        for key, v in tot.items():
            (sido, sg), mv = max(by[key].items(), key=lambda kv: kv[1])
            f.write(f"{key[0]},{key[1]},{v:.0f},{v / PX_AREA:.3f},{sido},{sg},{mv / v:.3f}\n")
    print("완료: 논 필지", n, "격자", len(tot))


if __name__ == "__main__":
    main()
