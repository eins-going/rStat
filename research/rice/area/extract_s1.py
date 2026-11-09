"""Sentinel-1 RTC(Planetary Computer) → 팜맵 논 필지별 VH·VV 평균, 반달 구간 요약. 시도×연도 하나를 한 번에 처리.

사용: memcap -m 4G .venv/bin/python research/rice/area/extract_s1.py 52 2024 [--res 40] [--threads 8] [--plat all] [--orb all] [--end 07-31]
  먼저 prep.py <pfx> --res <res> 로 필지 격자를 만든다.
  원 영상은 저장하지 않는다. 장면마다 시도 격자 타일(512화소) 중 논이 있고 장면 안에 드는 것만
  개관(20m=1단, 40m=2단)으로 읽어 EPSG:5179 격자로 다시 맞춘 뒤, 필지 번호로 bincount 해 선형 평균을 쌓는다.
결과: out/s1_<pfx>_<year>_r<res>.npz  (이미 있으면 건너뜀 → 이어받기)
  vhmin, vhmean, vvmin : uint8 [구간 9, 필지 N], 값 = round((dB+40)*5), 255 = 관측 없음
  구간(일자 시작): 04-20 05-06 05-21 06-06 06-21 07-06 07-21 08-01 08-16 (~08-31)
  cols, ncol : 날짜_궤도 목록과 구간별 관측 수
  out/s1_sigun_dates<꼬리표>.csv 에 시군×날짜 논 평균 VH·VV(dB)를 이어 쓴다.
"""
import argparse, json, os, sys, threading, time
from concurrent.futures import ThreadPoolExecutor, as_completed
os.environ.update(GDAL_DISABLE_READDIR_ON_OPEN="EMPTY_DIR", GDAL_HTTP_MULTIPLEX="YES", GDAL_HTTP_VERSION="2",
                  VSI_CACHE="TRUE", VSI_CACHE_SIZE="16000000", GDAL_CACHEMAX="128", CPL_VSIL_CURL_ALLOWED_EXTENSIONS=".tif,.tiff,.TIF",
                  GDAL_HTTP_MAX_RETRY="5", GDAL_HTTP_RETRY_DELAY="3", GDAL_HTTP_TIMEOUT="90", OMP_NUM_THREADS="2")
import numpy as np, pandas as pd, requests
import rasterio
from rasterio.enums import Resampling
from rasterio.vrt import WarpedVRT
from rasterio.windows import Window
from rasterio.transform import from_origin
from pyproj import Transformer
from shapely.geometry import shape, box as sbox
from shapely.ops import transform as stransform
import warnings
warnings.filterwarnings("ignore")

D = os.path.dirname(os.path.abspath(__file__))
STAC = "https://planetarycomputer.microsoft.com/api/stac/v1/search"
COLL = "sentinel-1-rtc"
BINS = ["04-20", "05-06", "05-21", "06-06", "06-21", "07-06", "07-21", "08-01", "08-16"]
END = "08-31"

ap = argparse.ArgumentParser()
ap.add_argument("pfx")
ap.add_argument("year", type=int)
ap.add_argument("--res", type=int, default=20)
ap.add_argument("--threads", type=int, default=8)
ap.add_argument("--limit", type=int, default=0, help="시험용: 장면 수 제한")
ap.add_argument("--plat", default="all", help="위성(1A, 1B, 1C 중 쉼표로, all=전부). 주 분석은 전부(1A 상승만은 2018 5월·2023 5월이 빔)")
ap.add_argument("--orb", default="all", help="asc, des, all")
ap.add_argument("--end", default="08-31", help="마지막 날(월-일). 주 분석은 07-31")
ap.add_argument("--minpx", type=int, default=None, help="논 화소가 이보다 적은 타일(512²)은 건너뜀. 기본: 전북(52, 시험 시도) 0, 나머지 2000(=320ha, 논의 약 2%%, 타일 1/3 절약)")
A = ap.parse_args()
if A.minpx is None:
    A.minpx = 0 if A.pfx == "52" else 2000
OUTF = f"{D}/out/s1_{A.pfx}_{A.year}_r{A.res}{'' if (A.plat, A.orb) == ('all', 'all') else f'_{A.plat}{A.orb}'.replace(',', '')}{'_test' if A.limit else ''}.npz"

_tok = {"t": None, "at": 0}
_tl = threading.Lock()


def token():
    with _tl:
        if _tok["t"] is None or time.time() - _tok["at"] > 1500:
            for k in range(8):
                try:
                    r = requests.get(f"https://planetarycomputer.microsoft.com/api/sas/v1/token/{COLL}", timeout=30)
                    r.raise_for_status()
                    _tok["t"], _tok["at"] = r.json()["token"], time.time()
                    break
                except Exception:
                    time.sleep(5 * (k + 1))
        return _tok["t"]


def search(bbox):
    body = {"collections": [COLL], "bbox": bbox, "limit": 500,
            "datetime": f"{A.year}-{BINS[0]}T00:00:00Z/{A.year}-{A.end}T23:59:59Z"}
    feats, url = [], STAC
    while True:
        for k in range(6):
            try:
                r = requests.post(url, json=body, timeout=90)
                r.raise_for_status()
                break
            except Exception:
                if k == 5:
                    raise
                time.sleep(5 * (k + 1))
        j = r.json()
        feats += j["features"]
        nxt = [l for l in j.get("links", []) if l.get("rel") == "next"]
        if not nxt:
            return feats
        body, url = nxt[0].get("body", body), nxt[0]["href"]


def main():
    if os.path.exists(OUTF):
        print("이미 있음", OUTF)
        return
    os.makedirs(f"{D}/out", exist_ok=True)
    t0 = time.time()
    G = json.load(open(f"{D}/cache/grid_{A.pfx}_r{A.res}.json"))
    L = np.load(f"{D}/cache/label_{A.pfx}_r{A.res}.npy", mmap_mode="r")
    P = pd.read_csv(f"{D}/cache/parcels_{A.pfx}.csv")
    N, R, T = G["n"], G["res"], G["tile"]
    tf = from_origin(G["x0"], G["y1"], R, R)
    tiles = [(r0, c0, sbox(G["x0"] + c0 * R, G["y1"] - (r0 + T) * R, G["x0"] + (c0 + T) * R, G["y1"] - r0 * R))
             for r0, c0, n in G["tiles"] if n >= A.minpx]
    to5179 = Transformer.from_crs(4326, 5179, always_xy=True).transform
    to4326 = Transformer.from_crs(5179, 4326, always_xy=True).transform
    x1, y0 = G["x0"] + G["W"] * R, G["y1"] - G["H"] * R
    lo0, la0 = to4326(G["x0"], y0)
    lo1, la1 = to4326(x1, G["y1"])
    lo2, la2 = to4326(G["x0"], G["y1"])
    lo3, la3 = to4326(x1, y0)
    feats = search([min(lo0, lo2), min(la0, la3), max(lo1, lo3), max(la1, la2)])
    units = []
    for f in sorted(feats, key=lambda f: f["id"]):
        if "vh" not in f["assets"] or "vv" not in f["assets"]:
            continue
        pp = f["properties"]
        if A.plat != "all" and pp["platform"].upper()[-2:] not in A.plat.upper().split(","):
            continue
        if A.orb != "all" and not pp["sat:orbit_state"].startswith(A.orb):
            continue
        g = stransform(to5179, shape(f["geometry"]))
        ts = [(r0, c0) for r0, c0, b in tiles if g.intersects(b)]
        if ts:
            p = f["properties"]
            units.append((f, f"{p['datetime'][:10]}_{p.get('sat:relative_orbit')}", ts))
    if A.limit:
        units = units[:A.limit]
    print(f"{A.pfx} {A.year}: 장면 {len(feats)} → 쓸 장면 {len(units)}, 장면×타일 {sum(len(u[2]) for u in units)}, 날짜_궤도 {len(set(u[1] for u in units))}", flush=True)
    ovl = {20: 0, 40: 1, 10: None}[R]
    acc = {}
    lock = threading.Lock()

    def work(f, col, ts):
        tok = token()
        kw = {} if ovl is None else {"overview_level": ovl}
        labs, vhs, vvs = [], [], []
        with rasterio.open(f["assets"]["vh"]["href"] + "?" + tok, **kw) as sh, \
                rasterio.open(f["assets"]["vv"]["href"] + "?" + tok, **kw) as sv:
            vrth = WarpedVRT(sh, crs="EPSG:5179", transform=tf, width=G["W"], height=G["H"], resampling=Resampling.bilinear,
                             src_nodata=-32768, nodata=0)
            vrtv = WarpedVRT(sv, crs="EPSG:5179", transform=tf, width=G["W"], height=G["H"], resampling=Resampling.bilinear,
                             src_nodata=-32768, nodata=0)
            for r0, c0 in ts:
                h, w = min(T, G["H"] - r0), min(T, G["W"] - c0)
                win = Window(c0, r0, w, h)
                lb = np.asarray(L[r0:r0 + h, c0:c0 + w])
                m = lb > 0
                a = vrth.read(1, window=win)
                b = vrtv.read(1, window=win)
                v = m & np.isfinite(a) & np.isfinite(b) & (a > 0) & (b > 0)
                if v.any():
                    labs.append(lb[v] - 1)
                    vhs.append(a[v])
                    vvs.append(b[v])
            vrth.close(); vrtv.close()
        if not labs:
            return col, None
        lb = np.concatenate(labs)
        return col, (np.bincount(lb, weights=np.concatenate(vhs), minlength=N),
                     np.bincount(lb, weights=np.concatenate(vvs), minlength=N),
                     np.bincount(lb, minlength=N).astype("float64"))

    def work_retry(*a):
        for k in range(5):
            try:
                return work(*a)
            except Exception as e:
                if k == 4:
                    raise
                print("  재시도", a[1], repr(e)[:160], flush=True)
                time.sleep(10 * (k + 1))

    fails, nd = [], 0
    with ThreadPoolExecutor(A.threads) as ex:
        futs = {ex.submit(work_retry, f, col, ts): f["id"] for f, col, ts in units}
        for fu in as_completed(futs):
            try:
                col, s = fu.result()
            except Exception as e:
                fails.append(futs[fu])
                print("실패", futs[fu], repr(e)[:200], flush=True)
                continue
            nd += 1
            if s is not None:
                with lock:
                    if col in acc:
                        for i in range(3):
                            acc[col][i] += s[i]
                    else:
                        acc[col] = list(s)
            if nd % 10 == 0 or nd == len(units):
                el = time.time() - t0
                print(f"  {nd}/{len(units)} {el/60:.1f}분", flush=True)
    if len(fails) > max(2, 0.05 * len(units)):
        print(f"실패 {len(fails)}개 → 결과를 쓰지 않음(다시 실행하면 처음부터)", flush=True)
        sys.exit(3)
    cols = sorted(acc)
    doy = lambda s: pd.Timestamp(f"{A.year}-{s}").dayofyear  # noqa: E731
    edges = [doy(b) for b in BINS] + [doy(END) + 1]
    nb = len(BINS)
    enc = lambda x: np.where(np.isfinite(x), np.clip(np.round((x + 40) * 5), 0, 254), 255).astype("uint8")  # noqa: E731
    vhmin = np.full((nb, N), np.inf, "float32"); vvmin = np.full((nb, N), np.inf, "float32")
    vhsum = np.zeros((nb, N), "float32"); vhn = np.zeros((nb, N), "float32")
    ncol = np.zeros(nb, int)
    rows = []
    sg = P.sc.astype(str).str.zfill(2) + "|" + P.sigun.astype(str)
    for c in cols:
        sh, sv, n = acc[c]
        ok = n > 0
        with np.errstate(divide="ignore", invalid="ignore"):
            dh = np.where(ok, 10 * np.log10(sh / np.maximum(n, 1)), np.nan).astype("float32")
            dv = np.where(ok, 10 * np.log10(sv / np.maximum(n, 1)), np.nan).astype("float32")
        d = pd.Timestamp(c.split("_")[0]).dayofyear
        k = np.searchsorted(edges, d, side="right") - 1
        if not 0 <= k < nb:
            continue
        ncol[k] += 1
        vhmin[k] = np.fmin(vhmin[k], np.where(ok, dh, np.inf))
        vvmin[k] = np.fmin(vvmin[k], np.where(ok, dv, np.inf))
        vhsum[k] += np.where(ok, dh, 0); vhn[k] += ok
        w = P.area.values * ok
        q = pd.DataFrame({"sg": sg, "w": w, "h": np.nan_to_num(dh) * w, "v": np.nan_to_num(dv) * w}).groupby("sg").sum()
        for s, r in q[q.w > 0].iterrows():
            rows.append((A.pfx, A.year, A.res, c, s.split("|")[0], s.split("|")[1], round(r.w / 1e4, 1), round(r.h / r.w, 3), round(r.v / r.w, 3)))
    vhmin[~np.isfinite(vhmin)] = np.nan; vvmin[~np.isfinite(vvmin)] = np.nan
    with np.errstate(invalid="ignore"):
        vhmean = np.where(vhn > 0, vhsum / np.maximum(vhn, 1), np.nan)
    tmp = OUTF + ".tmp.npz"
    np.savez_compressed(tmp, vhmin=enc(vhmin), vhmean=enc(vhmean), vvmin=enc(vvmin), cols=np.array(cols), ncol=ncol,
                        bins=np.array(BINS), fails=np.array(fails))
    os.replace(tmp, OUTF)
    sd = f"{D}/out/s1_sigun_dates{os.path.basename(OUTF)[len(f's1_{A.pfx}_{A.year}_r{A.res}'):-4]}.csv"
    pd.DataFrame(rows, columns=["pfx", "y", "res", "col", "sc", "sigun", "ha_obs", "vh", "vv"]).to_csv(
        sd, mode="a", header=not os.path.exists(sd), index=False)
    print(f"끝 {A.pfx} {A.year}: 날짜_궤도 {len(cols)}, 구간별 {ncol.tolist()}, 실패 {len(fails)}, {(time.time()-t0)/60:.1f}분", flush=True)


if __name__ == "__main__":
    main()
