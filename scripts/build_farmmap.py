"""db/raw/farmmap/<판>/(scripts/fetch_farmmap.py) → 시군별 팜맵 필지 지표와 자세히 보기용 필지 타일.

지역 키는 통계 페이지와 같다('31|수원시', 광역시의 구는 '○○시부'). 법정동주소(stdg_addr)의 시도·시군구 이름으로 정한다.

필지마다 (EPSG:5179, 미터)
- a 면적(m², 원자료 area) · 둘레 P · 직사각형도 r = 면적 / 최소 외접 직사각형 면적 (경지정리 논은 0.95 안팎)
- 장단비 = 최소 외접 직사각형 긴 변 / 짧은 변 · 형상지수 si = 0.25·P/√A (정사각형 1)
- 경지정리여부 fl_armt_yn(Y/N)

시군 지표 (분류별: 전체·논·밭, 과수·시설·인삼은 필지 수·면적만)
- n 필지 수, ha 면적, mean·med 평균·중앙 면적(m²), small 0.1ha 미만 필지 비율(개수), large 1ha 이상 필지의 면적 비중,
  gini 면적 지니계수, armt 경지정리 필지의 면적 비중, rect 직사각형도 중앙값, si 형상지수 중앙값
- 집적(분류 무관): 필지를 BLOCK_GAP/2만큼 부풀려 BLOCK_GAP 이하 틈(논두렁·농로·좁은 수로)으로만 떨어진 필지를
  한 덩어리로 묶는다. mesh 덩어리 유효 크기(ha, Σ덩어리면적²/Σ덩어리면적 = 무작위 농지 한 점이 속한 덩어리의 기대 면적),
  big10 10ha 이상 덩어리에 든 농지 비중, blocks 덩어리 수

출력
- db/clean/farmmap/<판>/metrics.json   시군 지표 + 확인용 값(직사각형도의 경지정리 구분력 등)
- db/clean/farmmap/<판>/<시도>.pmtiles  필지 타일(레이어 p: c 분류, a 면적, r 직사각형도, y 경지정리 1/0), z13~15
실행: python scripts/build_farmmap.py [시도코드 ...] [--tag 2026] [--no-tiles]
"""
import argparse
import collections
import glob
import gzip
import json
import os
import subprocess
import tempfile
import time

import numpy as np
import shapely
from pyproj import Transformer

from fetch_agrix_corp import region

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "db", "raw", "farmmap")
OUT = os.path.join(ROOT, "db", "clean", "farmmap")
TIPPECANOE = os.path.expanduser("~/.local/bin/tippecanoe")
BLOCK_GAP = 5.0  # m
GROUPS = ["전체", "논", "밭"]
CLASS_CODE = {"논": 1, "밭": 2, "과수": 3, "시설": 4, "인삼": 6}


def split_by_region(sido, tagdir, workdir):
    """시도의 필지를 시군 키별 임시 파일로 나눈다 (gid로 중복 제거). 시도 전체를 한 번에 메모리에 올리지 않기 위해서다.
    → ({키: 파일}, 못 맞춘 주소 Counter)"""
    seen, cache, files, unmatched = set(), {}, {}, collections.Counter()
    for path in sorted(glob.glob(os.path.join(tagdir, f"{sido}_*.jsonl.gz"))):
        with gzip.open(path, "rt", encoding="utf-8") as f:
            for line in f:
                r = json.loads(line)
                if r["gid"] in seen or not r.get("geometry"):
                    continue
                seen.add(r["gid"])
                key = region_key(r["stdg_addr"], cache)
                if not key:
                    unmatched[" ".join(r["stdg_addr"].split()[:2])] += 1
                    continue
                if key not in files:
                    files[key] = open(os.path.join(workdir, key.replace("|", "_") + ".jsonl"), "w", encoding="utf-8")
                files[key].write(line)
    for fh in files.values():
        fh.close()
    return {k: fh.name for k, fh in files.items()}, unmatched


def load(path):
    with open(path, encoding="utf-8") as f:
        return [json.loads(line) for line in f]


def region_key(addr, cache):
    if addr not in cache:
        parts = addr.split()
        sgg = parts[1] if len(parts) > 1 else ""
        if parts[0].startswith("세종"):
            sgg = "세종시"  # 세종은 주소에 시군구가 없다 (세종특별자치시 소정면 …)
        _, key, _ = region(parts[0], sgg)
        cache[addr] = key
    return cache[addr]


def shape_metrics(geoms):
    area = shapely.area(geoms)
    perim = shapely.length(geoms)
    mrr = shapely.oriented_envelope(geoms)
    ring = shapely.get_coordinates(shapely.get_exterior_ring(mrr)).reshape(-1, 5, 2)
    s1 = np.hypot(*(ring[:, 1] - ring[:, 0]).T)
    s2 = np.hypot(*(ring[:, 2] - ring[:, 1]).T)
    rect = np.where(s1 * s2 > 0, area / np.maximum(s1 * s2, 1e-9), np.nan)
    elong = np.maximum(s1, s2) / np.maximum(np.minimum(s1, s2), 1e-9)
    si = 0.25 * perim / np.sqrt(np.maximum(area, 1e-9))
    return rect, elong, si


def gini(x):
    x = np.sort(np.asarray(x, dtype=float))
    n = len(x)
    if n == 0 or x.sum() == 0:
        return None
    return float((2 * np.arange(1, n + 1) - n - 1).dot(x) / (n * x.sum()))


def blocks(geoms, area):
    """BLOCK_GAP 이하 틈으로 이어진 필지 덩어리별 면적 합"""
    merged = shapely.union_all(shapely.buffer(geoms, BLOCK_GAP / 2, quad_segs=2))
    parts = shapely.get_parts(merged)
    tree = shapely.STRtree(parts)
    pts = shapely.point_on_surface(geoms)
    idx_pt, idx_part = tree.query(pts, predicate="intersects")
    owner = np.full(len(geoms), -1)
    owner[idx_pt] = idx_part
    owner[owner < 0] = np.arange((owner < 0).sum()) + len(parts)  # 혹시 못 찾은 필지는 홀로 한 덩어리
    return np.bincount(owner, weights=area)


def summarize(a, rect, si, armt):
    n = len(a)
    if n == 0:
        return None
    tot = a.sum()
    return {
        "n": int(n), "ha": round(tot / 1e4, 1), "mean": round(float(a.mean())), "med": round(float(np.median(a))),
        "small": round(float((a < 1000).mean()), 4), "large": round(float(a[a >= 10000].sum() / tot), 4),
        "gini": round(gini(a), 4), "armt": round(float(a[armt].sum() / tot), 4),
        "rect": round(float(np.nanmedian(rect)), 3), "si": round(float(np.median(si)), 3),
    }


def build_region(rows):
    """시군 하나 → (지표, 타일·확인용 배열)"""
    geoms = shapely.make_valid(shapely.from_geojson([json.dumps(r["geometry"]) for r in rows]))
    a = np.array([float(r["area"] or 0) for r in rows])
    cls = np.array([r["clsf_nm"] or "" for r in rows], dtype=object)
    armt = np.array([r.get("fl_armt_yn") == "Y" for r in rows])
    rect, _, si = shape_metrics(geoms)
    out = {}
    for g in GROUPS:
        sel = slice(None) if g == "전체" else cls == g
        s = summarize(a[sel], rect[sel], si[sel], armt[sel])
        if s:
            out[g] = s
    for g in ["과수", "시설", "인삼"]:
        sel = cls == g
        if sel.any():
            out[g] = {"n": int(sel.sum()), "ha": round(a[sel].sum() / 1e4, 1)}
    b = blocks(geoms, a)
    out["집적"] = {"mesh": round(float((b ** 2).sum() / b.sum() / 1e4), 2),
                 "big10": round(float(b[b >= 1e5].sum() / b.sum()), 4), "blocks": int(len(b))}
    return out, (geoms, a, cls, rect, armt)


def build_sido(sido, tagdir, outdir, tiles):
    t0 = time.time()
    metrics = {}
    paddy_rect, paddy_armt, ratio = [], [], []
    flight, updt = collections.Counter(), collections.Counter()
    with tempfile.TemporaryDirectory() as work:
        files, unmatched = split_by_region(sido, tagdir, work)
        if not files:
            return {}, {}
        seq = open(os.path.join(work, "tiles.geojsons"), "w", encoding="utf-8") if tiles else None
        for key in sorted(files):
            rows = load(files[key])
            out, (geoms, a, cls, rect, armt) = build_region(rows)
            metrics[key] = out
            paddy = cls == "논"
            paddy_rect.append(rect[paddy])
            paddy_armt.append(armt[paddy])
            ratio.append(np.median(a / np.maximum(shapely.area(geoms), 1e-9)))
            flight.update(r["flight_ymd"] for r in rows)
            updt.update(r["updt_ymd"] for r in rows)
            if seq:
                write_tile_features(seq, rows, geoms, a, cls, rect, armt)
            print(f"  {key}: {out['전체']['n']:,}필지, 덩어리 {out['집적']['blocks']:,}개 ({time.time() - t0:.0f}초)", flush=True)
        if seq:
            seq.close()
            make_tiles(sido, seq.name, outdir)

    # 확인: 직사각형도가 경지정리 여부를 얼마나 가르나 (논)
    pr, pa = np.concatenate(paddy_rect), np.concatenate(paddy_armt)
    check = {
        "unmatched": dict(unmatched.most_common(20)),
        "area_attr_vs_geom": round(float(np.median(ratio)), 4),
        "paddy_rect_armt_Y": round(float(np.nanmedian(pr[pa])), 3) if pa.any() else None,
        "paddy_rect_armt_N": round(float(np.nanmedian(pr[~pa])), 3) if (~pa).any() else None,
        "paddy_auc_rect_for_armt": auc(pr, pa),
        "flight_ymd": dict(flight.most_common(5)),
        "updt_ymd": dict(updt.most_common(3)),
    }
    print(f"{sido} 끝 {time.time() - t0:.0f}초", flush=True)
    return metrics, check


def auc(score, label):
    ok = ~np.isnan(score)
    s, y = score[ok], label[ok]
    if y.all() or not y.any():
        return None
    ranks = s.argsort().argsort() + 1
    npos = y.sum()
    return round(float((ranks[y].sum() - npos * (npos + 1) / 2) / (npos * (len(y) - npos))), 3)


TO_4326 = Transformer.from_crs(5179, 4326, always_xy=True)


def write_tile_features(f, rows, geoms, a, cls, rect, armt):
    g4326 = shapely.transform(geoms, lambda xy: np.column_stack(TO_4326.transform(xy[:, 0], xy[:, 1])))
    for r, g, ai, c, ri, y in zip(rows, shapely.to_geojson(g4326, indent=None), a, cls, rect, armt):
        props = {"c": CLASS_CODE.get(c, 0), "a": int(round(ai)), "r": None if np.isnan(ri) else round(float(ri), 2),
                 "y": int(y)}
        f.write(json.dumps({"type": "Feature", "id": r["gid"], "properties": props,
                            "geometry": json.loads(g)}, separators=(",", ":")) + "\n")


def make_tiles(sido, seq_path, outdir):
    target = os.path.join(outdir, f"{sido}.pmtiles")
    subprocess.run([TIPPECANOE, "-o", target, "--force", "-l", "p", "-Z13", "-z15", "-P",
                    "--detect-shared-borders", "--drop-densest-as-needed", "--quiet", seq_path], check=True)
    print(f"  타일 {target} {os.path.getsize(target) / 1e6:.1f}MB", flush=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sidos", nargs="*")
    ap.add_argument("--tag", default=time.strftime("%Y"))
    ap.add_argument("--no-tiles", action="store_true")
    a = ap.parse_args()
    tagdir = os.path.join(RAW, a.tag)
    outdir = os.path.join(OUT, a.tag)
    os.makedirs(outdir, exist_ok=True)
    sidos = a.sidos or sorted({os.path.basename(p).split("_")[0] for p in glob.glob(os.path.join(tagdir, "*_*.jsonl.gz"))})

    path = os.path.join(outdir, "metrics.json")
    res = {"regions": {}, "check": {}}
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            res = json.load(f)
    for s in sidos:
        m, c = build_sido(s, tagdir, outdir, not a.no_tiles)
        res["regions"].update(m)
        res["check"][s] = c
    res["built"] = time.strftime("%Y-%m-%d")
    res["block_gap_m"] = BLOCK_GAP
    with open(path, "w", encoding="utf-8") as f:
        json.dump(res, f, ensure_ascii=False, indent=1)
    print("→", path)


if __name__ == "__main__":
    main()
