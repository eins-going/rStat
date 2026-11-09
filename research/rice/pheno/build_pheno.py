"""MODIS 논 순수 격자 → 시군·시도·전국 연도별 생육 곡선 → 생육 단계(phenology) 지표.

- 순수 격자: paddy_modis frac>=0.7 & share>=0.6, 품질 rel 0·1
- 합성마다 격자 중앙값(값)과 격자별 실제 관측일(doy) 중앙값을 시점으로 씀
- 일 단위 선형보간 → Savitzky-Golay(31일, 2차) 평활
- as-of: 합성 시작일 + 20일 <= 기준일인 합성만 (공개 지연 반영). full / 0815(227) / 0915(258) / 1001(274)
출력: pheno/pheno_feats.csv (level, sc, stem, y, asof, 지표들)
"""
import os
import sys

import numpy as np
import pandas as pd

sys.path.insert(0, "/home/eins/project/rStat/research/rice")
sys.path.append("/home/eins/project/rStat/research/rice/pheno/_pylib")
from scipy.signal import savgol_filter  # noqa: E402

import common  # noqa: E402

ROOT = common.ROOT
OUT = os.path.join(ROOT, "research/rice/pheno")
FILL = -32768
ASOF = {"full": 999, "0815": 227, "0915": 258, "1001": 274}
GRID = np.arange(100, 321)
years = [int(a) for a in sys.argv[1:]] or list(range(2000, 2027))

px = pd.read_csv(os.path.join(ROOT, "db/clean/rice/paddy_modis.csv"))
px["sc"] = px.sido.map(common.sido_code)
px["stem"] = px.sigun.str[:-1]
# 행정구역 이음: 통합 전 이름으로 된 정답과 맞춤은 모델 단계에서


def curves(y):
    z = np.load(os.path.join(ROOT, f"db/raw/modis/vi_{y}.npz"))
    meta = pd.DataFrame(z["pix"], columns=["col", "row"]).merge(px, on=["col", "row"], how="left")
    keep = ((meta.frac >= 0.7) & (meta.share >= 0.6) & meta.sc.notna()).values
    meta = meta[keep].reset_index(drop=True)
    ok = (z["ndvi"] != FILL) & np.isin(z["rel"], [0, 1]) & (z["doy"] > 0)
    ok = ok[:, keep]
    ndvi = np.where(ok, z["ndvi"][:, keep] / 1e4, np.nan)
    evi = np.where(ok, z["evi"][:, keep] / 1e4, np.nan)
    dd = np.where(ok, z["doy"][:, keep].astype(float), np.nan)
    rows = []
    for ci, comp in enumerate(z["comp"]):
        start = pd.Timestamp(str(comp).split("|")[1]).dayofyear
        s = pd.DataFrame({"sc": meta.sc, "stem": meta.stem, "ndvi": ndvi[ci], "evi": evi[ci], "t": dd[ci]}).dropna()
        if s.empty:
            continue
        # doy가 연초 넘어가는 경우(합성 시작이 연말) 없음: 4~11월만
        for lev, keys in (("sigun", ["sc", "stem"]), ("sido", ["sc"]), ("nation", [])):
            g = s.groupby(keys) if keys else [((), s)]
            for k, d in g:
                k = k if isinstance(k, tuple) else (k,)
                sc = k[0] if len(k) > 0 else "00"
                stem = k[1] if len(k) > 1 else ""
                rows.append((lev, sc, stem, y, start, d.t.median(), d.ndvi.median(), d.evi.median(), len(d)))
    tot = meta.groupby(["sc", "stem"]).size().rename("npix_tot").reset_index()
    c = pd.DataFrame(rows, columns=["level", "sc", "stem", "y", "start", "t", "ndvi", "evi", "n"])
    return c, tot


def smooth(t, v, w, tl):
    o = np.argsort(t)
    t, v = t[o], v[o]
    if len(t) < 5:
        return None
    s = np.interp(GRID, t, v)
    s = savgol_filter(s, 31, 2)
    s[GRID > tl] = np.nan
    return s


def at(s, d):
    i = d - GRID[0]
    return s[i] if 0 <= i < len(s) else np.nan


def feats(c, asof_doy, nmin):
    c = c[(c.start + 20 <= asof_doy) & (c.n >= nmin)]
    if len(c) < 6:
        return None
    tl = int(min(c.t.max(), asof_doy))
    out = {"last_doy": tl, "ncomp": len(c)}
    for vi in ("ndvi", "evi"):
        s = smooth(c.t.values, c[vi].values, c.n.values, tl)
        if s is None:
            return None
        win = (GRID >= 120) & (GRID <= 185) & ~np.isnan(s)
        if not win.any():
            return None
        it = np.nanargmin(np.where(win, s, np.nan))
        trans_doy, trans_v = GRID[it], s[it]
        win = (GRID >= 190) & (GRID <= 275) & ~np.isnan(s)
        f = {"trans_doy": trans_doy, "trans_v": trans_v}
        if win.any():
            ip = np.nanargmax(np.where(win, s, np.nan))
            peak_doy, peak_v = GRID[ip], s[ip]
            reached = peak_doy < tl - 10
            amp = peak_v - trans_v
            f.update(peak_v=peak_v, amp=amp, peak_reached=float(reached))
            seg = s[it:ip + 1]
            gi = np.argmax(seg >= trans_v + 0.5 * amp) if amp > 0 else 0
            f["green_doy"] = GRID[it + gi]
            f["grow_rate"] = np.nanmax(np.diff(s[it:ip + 1])) * 10 if ip > it + 1 else np.nan
            if reached:
                f["peak_doy"] = peak_doy
                f["veg_len"] = peak_doy - f["green_doy"]
                for k in (20, 30, 40):
                    vk = at(s, peak_doy + k)
                    f[f"post{k}"] = vk
                    f[f"drop{k}"] = (vk - peak_v) if vk == vk else np.nan
                post = s[ip:ip + 41]
                f["auc_post40"] = np.nanmean(post) if np.isfinite(post).sum() >= 30 else np.nan
                after = s[ip:]
                below = np.where(after <= trans_v + 0.5 * amp)[0]
                f["sen_doy"] = GRID[ip + below[0]] if len(below) else np.nan
                f["season_len"] = f["sen_doy"] - f["green_doy"] if len(below) else np.nan
        for d in (200, 215, 230, 245, 260):
            f[f"v{d}"] = at(s, d)
        f["last_v"] = at(s, tl)
        f["auc_gs"] = np.nanmean(s[(GRID >= 170) & (GRID <= tl)])
        out.update({f"{vi}_{k}": v for k, v in f.items()})
    return out


allrows = []
for y in years:
    path = os.path.join(ROOT, f"db/raw/modis/vi_{y}.npz")
    if not os.path.exists(path):
        continue
    c, tot = curves(y)
    for (lev, sc, stem), g in c.groupby(["level", "sc", "stem"]):
        npix = int(g.n.max())
        nmin = max(3, int(0.15 * npix))
        for a, ad in ASOF.items():
            f = feats(g, ad, nmin)
            if f is None:
                continue
            f.update(level=lev, sc=sc, stem=stem, y=y, asof=a, npix=npix)
            allrows.append(f)
    print(y, len(allrows), flush=True)

df = pd.DataFrame(allrows)
lead = ["level", "sc", "stem", "y", "asof", "npix"]
df = df[lead + [k for k in df.columns if k not in lead]]
fn = os.path.join(OUT, "pheno_feats.csv" if len(sys.argv) == 1 else "pheno_feats_test.csv")
df.round(4).to_csv(fn, index=False)
print("saved", fn, df.shape)
