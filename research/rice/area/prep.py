"""팜맵 2026 논 필지 → 시도별 필지 표 + 필지 번호 격자(EPSG:5179). 시도 파일을 두 번 스트리밍한다(메모리에 다 올리지 않음).

사용: memcap -m 4G .venv/bin/python research/rice/area/prep.py 52 [--res 20]
  52 = 팜맵 파일 앞자리(새 시도 코드: 41 경기, 43 충북, 44 충남, 46 전남, 47 경북, 48 경남, 51 강원, 52 전북, 36 세종, 11·26~31 특광역시, 50 제주)
결과 (research/rice/area/cache/):
  parcels_<pfx>.csv   idx, sc(KOSIS 2자리), sigun, area(m²), armt(경지정리 Y/N)
  label_<pfx>_r<res>.npy  int32 격자, 값 = idx+1 (0 = 논 아님). 화소 중심이 필지 안이면 그 필지.
  grid_<pfx>_r<res>.json  격자 원점·크기·타일(512화소) 목록과 타일별 논 화소 수
"""
import argparse, glob, gzip, json, os, sys, time
import numpy as np, pandas as pd
from rasterio.features import rasterize
from rasterio.transform import from_origin

sys.path.insert(0, "/home/eins/project/rStat/research/rice")
import common  # noqa: E402

FM = "/home/eins/project/rStat/db/raw/farmmap/2026"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "cache")
TILE = 512


def key(addr):
    tok = addr.split()
    sc = common.sido_code(tok[0])
    if sc == "29":
        return sc, "세종시"
    return sc, (tok[1] if len(tok) > 1 else "")


def stream(pfx):
    for f in sorted(glob.glob(f"{FM}/{pfx}_*.jsonl.gz")):
        with gzip.open(f, "rt") as fh:
            for line in fh:
                if '"clsf_nm":"논"' in line:
                    yield json.loads(line)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("pfx")
    ap.add_argument("--res", type=int, default=20)
    A = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)
    t0 = time.time()
    pcsv = f"{OUT}/parcels_{A.pfx}.csv"
    if not os.path.exists(pcsv):
        rows, x0, y0, x1, y1 = [], 1e12, 1e12, -1e12, -1e12
        for i, r in enumerate(stream(A.pfx)):
            sc, sg = key(r["stdg_addr"])
            c = np.asarray(r["geometry"]["coordinates"][0][0])
            x0, y0 = min(x0, c[:, 0].min()), min(y0, c[:, 1].min())
            x1, y1 = max(x1, c[:, 0].max()), max(y1, c[:, 1].max())
            rows.append((i, sc, sg, round(r["area"], 1), r.get("fl_armt_yn", "")))
        df = pd.DataFrame(rows, columns=["idx", "sc", "sigun", "area", "armt"])
        df.to_csv(pcsv, index=False)
        json.dump({"bbox": [x0, y0, x1, y1]}, open(f"{OUT}/bbox_{A.pfx}.json", "w"))
        print(f"필지 {len(df):,}개, {df.area.sum()/1e4:,.0f}ha, {time.time()-t0:.0f}초", flush=True)
    df = pd.read_csv(pcsv)
    x0, y0, x1, y1 = json.load(open(f"{OUT}/bbox_{A.pfx}.json"))["bbox"]
    R = A.res
    gx0, gy1 = np.floor(x0 / R) * R - R, np.ceil(y1 / R) * R + R
    W, H = int(np.ceil((x1 - gx0) / R)) + 2, int(np.ceil((gy1 - y0) / R)) + 2
    tf = from_origin(gx0, gy1, R, R)
    L = np.zeros((H, W), dtype="int32")
    buf = []

    def flush():
        rasterize(buf, out=L, transform=tf, all_touched=False)
        buf.clear()

    for i, r in enumerate(stream(A.pfx)):
        buf.append((r["geometry"], i + 1))
        if len(buf) >= 20000:
            flush()
    if buf:
        flush()
    np.save(f"{OUT}/label_{A.pfx}_r{R}.npy", L)
    npx = np.bincount(L.ravel(), minlength=len(df) + 1)[1:]
    df[f"npx{R}"] = npx
    df.to_csv(pcsv, index=False)
    tiles = []
    for r0 in range(0, H, TILE):
        for c0 in range(0, W, TILE):
            n = int((L[r0:r0 + TILE, c0:c0 + TILE] > 0).sum())
            if n:
                tiles.append([r0, c0, n])
    json.dump({"res": R, "x0": gx0, "y1": gy1, "W": W, "H": H, "tile": TILE, "tiles": tiles, "n": len(df)},
              open(f"{OUT}/grid_{A.pfx}_r{R}.json", "w"))
    cov = df.loc[npx > 0, "area"].sum() / df.area.sum()
    print(f"격자 {W}x{H} ({R}m), 타일 {len(tiles)}개, 화소 있는 필지 {np.mean(npx>0):.1%} (면적 {cov:.1%}), {time.time()-t0:.0f}초", flush=True)


if __name__ == "__main__":
    main()
