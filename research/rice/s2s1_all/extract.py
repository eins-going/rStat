# s2s1_all: s2s1 복사본 — 상위 60시군 뒤 나머지 시군(2025 재배면적 500ha+)으로 넓히기 (11-10)
"""Sentinel-2 L2A / Sentinel-1 RTC 논 필지 화소 중앙값 추출 (Planetary Computer). 이어받기 가능.
python extract.py s2|s1 [--years 2018-2025] [--boxes N] [--limit-items K] [--start MM-DD --end MM-DD]
결과: rows_<coll>.jsonl (한 줄 = item×box), done_<coll>.txt (끝난 item id)
"""
import argparse, json, os, sys, threading, time, traceback
from concurrent.futures import ThreadPoolExecutor, as_completed
import numpy as np, pandas as pd, requests
os.environ.update(GDAL_DISABLE_READDIR_ON_OPEN="EMPTY_DIR", GDAL_HTTP_MULTIPLEX="YES", GDAL_HTTP_VERSION="2",
                  VSI_CACHE="TRUE", VSI_CACHE_SIZE="8000000", GDAL_CACHEMAX="96", CPL_VSIL_CURL_ALLOWED_EXTENSIONS=".tif,.tiff,.TIF",
                  GDAL_HTTP_MAX_RETRY="4", GDAL_HTTP_RETRY_DELAY="3", GDAL_HTTP_TIMEOUT="60", OMP_NUM_THREADS="2")
import rasterio
from rasterio.enums import Resampling
from rasterio.features import rasterize
from rasterio.windows import from_bounds
from pyproj import Transformer
from shapely import wkb
from shapely.geometry import box as sbox
from shapely.ops import transform as stransform
import warnings
warnings.filterwarnings('ignore')

OUT = os.path.dirname(os.path.abspath(__file__))
STAC = "https://planetarycomputer.microsoft.com/api/stac/v1/search"
CELL = 2000.0
COLL = {"s2": "sentinel-2-l2a", "s1": "sentinel-1-rtc"}
S2B = ["B04", "B05", "B8A", "B11"]

ap = argparse.ArgumentParser()
ap.add_argument("kind")
ap.add_argument("--years", default="2018-2025")
ap.add_argument("--boxes", type=int, default=999)
ap.add_argument("--limit-items", type=int, default=0)
ap.add_argument("--start", default="06-01")
ap.add_argument("--end", default="10-31")
ap.add_argument("--cloud", type=float, default=80)
ap.add_argument("--threads", type=int, default=6)
ap.add_argument("--tag", default="")
ap.add_argument("--dry", action="store_true")
ap.add_argument("--dec", type=int, default=1)
ap.add_argument("--maxbox", type=int, default=2)
A = ap.parse_args()
KIND = A.kind
coll = COLL[KIND]
ROWS = f"{OUT}/rows_{KIND}{A.tag}.jsonl"
DONE = f"{OUT}/done_{KIND}{A.tag}.txt"

# ---------- 토큰 ----------
_tok = {"t": None, "at": 0}
_tl = threading.Lock()


def token():
    with _tl:
        if _tok["t"] is None or time.time() - _tok["at"] > 1800:
            for k in range(6):
                try:
                    r = requests.get(f"https://planetarycomputer.microsoft.com/api/sas/v1/token/{coll}", timeout=30)
                    r.raise_for_status()
                    _tok["t"], _tok["at"] = r.json()["token"], time.time()
                    break
                except Exception as e:
                    time.sleep(5 * (k + 1))
        return _tok["t"]


# ---------- 상자 ----------
boxes = pd.read_csv(f"{OUT}/boxes.csv")
boxes = boxes[boxes["rank"] < A.boxes] if A.boxes < 999 else boxes
boxes = boxes[boxes.box.str[-1].astype(int) < A.maxbox]
pol = pd.read_pickle(f"{OUT}/box_polys.pkl")
pol = pol[pol.box.isin(boxes.box)]
# 경지정리 필지가 상자 논의 절반 이상이면 경지정리만
POLYS = {}
for b, g in pol.groupby("box"):
    gy = g[g.armt == "Y"]
    use = gy if gy.area.sum() >= 0.5 * g.area.sum() else g
    POLYS[b] = [wkb.loads(x) for x in use.wkb]
boxes = boxes[boxes.box.isin(POLYS)].reset_index(drop=True)
BOXGEO = {r.box: sbox(r.lon0, r.lat0, r.lon1, r.lat1) for r in boxes.itertuples()}
BOXCELL = {r.box: (r.cx * CELL, r.cy * CELL) for r in boxes.itertuples()}
print(f"{KIND}: 상자 {len(boxes)}개", flush=True)

_tr = {}
_mask = {}
_ml = threading.Lock()


def tr5179(epsg):
    if epsg not in _tr:
        _tr[epsg] = Transformer.from_crs(5179, epsg, always_xy=True)
    return _tr[epsg]


def box_window(bx, ds, epsg):
    x0, y0 = BOXCELL[bx]
    t = tr5179(epsg)
    xs, ys = t.transform([x0 - 60, x0 + CELL + 60, x0 - 60, x0 + CELL + 60], [y0 - 60, y0 - 60, y0 + CELL + 60, y0 + CELL + 60])
    w = from_bounds(min(xs), min(ys), max(xs), max(ys), ds.transform).round_offsets().round_lengths()
    return w


def paddy_mask(bx, epsg, transform, shape):
    k = (bx, epsg, tuple(round(v, 3) for v in transform[:6]), shape)
    with _ml:
        if k in _mask:
            return _mask[k]
    t = tr5179(epsg)
    geoms = [stransform(t.transform, g) for g in POLYS[bx]]
    m = rasterize(((g, 1) for g in geoms), out_shape=shape, transform=transform, fill=0, all_touched=False, dtype="uint8").astype(bool)
    with _ml:
        _mask[k] = m
    return m


def retry(fn, *a, n=5, **kw):
    for k in range(n):
        try:
            return fn(*a, **kw)
        except Exception as e:
            if k == n - 1:
                raise
            time.sleep(3 * (k + 1) + np.random.rand() * 2)


def sign(href):
    return href + "?" + token()


def read_windows(href, bxs, epsg, out_shape_from=None):
    """한 자산을 한 번 열어 여러 상자 창을 읽는다. out_shape_from: {box: (window, shape)} 같은 격자로 맞출 때."""
    res = {}
    with rasterio.open(sign(href)) as ds:
        for bx in bxs:
            if out_shape_from is not None:
                w20, shp, tf = out_shape_from[bx]
                # 20m 창과 같은 땅 범위를 이 자산 격자로
                bounds = rasterio.windows.bounds(w20, tf)
                w = from_bounds(*bounds, ds.transform).round_offsets().round_lengths()
                a = ds.read(1, window=w, out_shape=shp, resampling=Resampling.average, boundless=True, fill_value=0)
                res[bx] = (a, w, ds.transform)
            else:
                w = box_window(bx, ds, epsg)
                if A.dec > 1 and KIND == "s1":
                    k = A.dec
                    w = rasterio.windows.Window(w.col_off, w.row_off, (int(w.width) // k) * k, (int(w.height) // k) * k)
                    shp = (int(w.height) // k, int(w.width) // k)
                    a = ds.read(1, window=w, out_shape=shp, resampling=Resampling.average, boundless=True, fill_value=0)
                    res[bx] = (a, w, ds.transform)
                else:
                    a = ds.read(1, window=w, boundless=True, fill_value=0)
                    res[bx] = (a, w, ds.transform)
    return res


def do_s2(it, bxs):
    p = it["properties"]
    epsg = p["proj:epsg"]
    off = 1000 if float(p.get("s2:processing_baseline", "0")) >= 4.0 else 0
    scl = retry(read_windows, it["assets"]["SCL"]["href"], bxs, epsg)
    out, need = [], {}
    for bx in bxs:
        a, w, tf = scl[bx]
        wt = rasterio.windows.transform(w, tf)
        m = paddy_mask(bx, epsg, wt, a.shape)
        npad = int(m.sum())
        sc = a[m]
        row = dict(box=bx, item=it["id"], date=p["datetime"][:10], epsg=epsg, tile=p.get("s2:mgrs_tile"),
                   cloud=p.get("eo:cloud_cover"), n_paddy=npad,
                   f_clear=float(np.isin(sc, [4, 5]).mean()) if npad else 0, f_water=float((sc == 6).mean()) if npad else 0,
                   f_cloud=float(np.isin(sc, [3, 8, 9, 10]).mean()) if npad else 0, f_nodata=float((sc == 0).mean()) if npad else 1)
        out.append(row)
        if npad >= 50 and row["f_clear"] * npad >= 50 and row["f_clear"] >= 0.4:
            need[bx] = (w, a.shape, tf, m & np.isin(a, [4, 5]), row)
    if need:
        bands = {}
        geo = {bx: (v[0], v[1], v[2]) for bx, v in need.items()}
        for b in S2B:
            bands[b] = retry(read_windows, it["assets"][b]["href"], list(need), epsg, out_shape_from=geo)
        for bx, (w, shp, tf, valid, row) in need.items():
            R = {b: (bands[b][bx][0].astype("float32") - off) / 10000.0 for b in S2B}
            v = valid & (R["B8A"] > 0) & (R["B04"] > -0.05)
            row["n_valid"] = int(v.sum())
            if v.sum() < 30:
                continue
            r4, r5, r8, r11 = (R[b][v] for b in S2B)
            eps = 1e-6
            idx = {"ndvi": (r8 - r4) / (r8 + r4 + eps), "ndre": (r8 - r5) / (r8 + r5 + eps), "cire": r8 / (r5 + eps) - 1,
                   "lswi": (r8 - r11) / (r8 + r11 + eps), "evi2": 2.5 * (r8 - r4) / (r8 + 2.4 * r4 + 1)}
            for b, x in zip(S2B, (r4, r5, r8, r11)):
                row[b] = round(float(np.median(x)), 5)
            for k, x in idx.items():
                row[k] = round(float(np.median(x)), 5)
            q = np.percentile(idx["ndvi"], [25, 75])
            row["ndvi_q25"], row["ndvi_q75"] = round(float(q[0]), 4), round(float(q[1]), 4)
    return out


def do_s1(it, bxs):
    p = it["properties"]
    epsg = p["proj:epsg"]
    vv = retry(read_windows, it["assets"]["vv"]["href"], bxs, epsg)
    if "vh" not in it["assets"]:
        return []
    vh = retry(read_windows, it["assets"]["vh"]["href"], bxs, epsg)
    out = []
    for bx in bxs:
        a, w, tf = vv[bx]
        h = vh[bx][0]
        wt = rasterio.windows.transform(w, tf)
        if A.dec > 1:
            k = A.dec
            mf = paddy_mask(bx, epsg, wt, (int(w.height), int(w.width)))
            m = mf.reshape(a.shape[0], k, a.shape[1], k).mean((1, 3)) >= 0.8
        else:
            m = paddy_mask(bx, epsg, wt, a.shape)
        v = m & np.isfinite(a) & (a > 0) & np.isfinite(h) & (h > 0)
        row = dict(box=bx, item=it["id"], date=p["datetime"][:10], time=p["datetime"][11:16], epsg=epsg,
                   orbit=p.get("sat:orbit_state"), rel=p.get("sat:relative_orbit"), plat=p.get("platform"),
                   n_paddy=int(m.sum()), n_valid=int(v.sum()))
        if v.sum() >= 50:
            A_, H = a[v], h[v]
            row["vv"] = round(float(10 * np.log10(np.median(A_))), 3)
            row["vh"] = round(float(10 * np.log10(np.median(H))), 3)
            row["vhvv"] = round(float(10 * np.log10(np.median(H / A_))), 3)
            row["vh_mean"] = round(float(10 * np.log10(np.mean(H))), 3)
            row["vv_mean"] = round(float(10 * np.log10(np.mean(A_))), 3)
        out.append(row)
    return out


def search(year):
    lon0, lat0, lon1, lat1 = boxes.lon0.min(), boxes.lat0.min(), boxes.lon1.max(), boxes.lat1.max()
    body = {"collections": [coll], "bbox": [lon0 - .05, lat0 - .05, lon1 + .05, lat1 + .05],
            "datetime": f"{year}-{A.start}T00:00:00Z/{year}-{A.end}T23:59:59Z", "limit": 500}
    if KIND == "s2":
        body["query"] = {"eo:cloud_cover": {"lt": A.cloud}}
    feats, url = [], STAC
    while True:
        r = retry(lambda: requests.post(url, json=body, timeout=90))
        r.raise_for_status()
        j = r.json()
        feats += j["features"]
        nxt = [l for l in j.get("links", []) if l.get("rel") == "next"]
        if not nxt:
            break
        body = nxt[0].get("body", body)
        url = nxt[0]["href"]
    return feats


def plan(feats):
    """item → 그 안에 완전히 들어가는 상자. 같은 날 같은 상자는 한 item만 (S2 겹치는 타일)."""
    from shapely.geometry import shape
    seen = set()
    units = []
    feats = sorted(feats, key=lambda f: f["id"])
    for f in feats:
        g = shape(f["geometry"])
        d = f["properties"]["datetime"][:10]
        key2 = f["properties"].get("sat:relative_orbit", "")
        bx = []
        for b, bg in BOXGEO.items():
            k = (b, d, key2 if KIND == "s1" else "")
            if k in seen:
                continue
            if g.contains(bg):
                bx.append(b)
                seen.add(k)
        if bx:
            units.append((f, bx))
    return units


def main():
    y0, y1 = map(int, A.years.split("-"))
    done = set(open(DONE).read().split()) if os.path.exists(DONE) else set()
    units = []
    for y in range(y0, y1 + 1):
        fs = search(y)
        u = plan(fs)
        print(f"{y}: items {len(fs)} → 쓸 item {len(u)}, item×상자 {sum(len(b) for _, b in u)}", flush=True)
        units += u
    units = [u for u in units if u[0]["id"] not in done]
    if A.limit_items:
        units = units[:A.limit_items]
    if A.dry:
        return
    print(f"남은 item {len(units)}, item×상자 {sum(len(b) for _, b in units)}", flush=True)
    fn = do_s2 if KIND == "s2" else do_s1
    lock = threading.Lock()
    t0 = time.time()
    nd = 0
    with open(ROWS, "a") as fo, open(DONE, "a") as fd, ThreadPoolExecutor(A.threads) as ex:
        futs = {ex.submit(fn, f, b): f["id"] for f, b in units}
        for fu in as_completed(futs):
            iid = futs[fu]
            try:
                rows = fu.result()
            except Exception as e:
                print("실패", iid, repr(e).split("?")[0][-200:], flush=True)
                continue
            with lock:
                for r in rows:
                    fo.write(json.dumps(r, ensure_ascii=False) + "\n")
                fo.flush()
                fd.write(iid + "\n"); fd.flush()
            nd += 1
            if nd % 20 == 0 or nd == len(units):
                el = time.time() - t0
                print(f"{nd}/{len(units)} {el/60:.1f}분, 남은 예상 {el/nd*(len(units)-nd)/60:.0f}분", flush=True)


if __name__ == "__main__":
    main()
