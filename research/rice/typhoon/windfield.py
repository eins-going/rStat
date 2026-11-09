"""태풍 바람장 (JMA RSMC Tokyo best track → 시군 논 중심·ASOS 관측소의 일 최대 모델 풍속).

자료 선택
  과제 원안은 IBTrACS v04r01 (NCEI). 그러나 www.ncei.noaa.gov/robots.txt 가 'Disallow: /data*' (모든 UA) →
  받지 않음. 대신 JMA RSMC Tokyo best track (bst_all.zip; jma.go.jp/robots.txt 없음(404)) 사용.
  JMA는 IBTrACS의 TOKYO_* 열 원천과 같다: 6시간 위치·중심기압·10분 평균 최대풍(kt, 1977~)·
  50kt/30kt 바람 반경(긴 쪽 방향·긴 반경·짧은 반경, nm). RMW(최대풍 반경)는 없음.
  2026 태풍(~DOLPHIN 10/28)은 속보치가 들어 있음.

바람장 (간단·문서화)
  수정 Rankine: r ≤ Rm  V = Vmax·r/Rm,  r > Rm  V = Vmax·(Rm/r)^α
  - 방향 θ(관측점이 태풍 중심에서 본 방위)의 반경 R50(θ), R30(θ) = 짧은 + (긴−짧은)·(1+cos(θ−θ긴))/2
  - R50·R30 둘 다 있으면  α = ln(50/30)/ln(R30/R50) (0.3~1.0로 자름), Rm = R50·(50/Vmax)^(1/α)
  - R30만 있으면 α = 0.5, Rm = R30·(30/Vmax)^2
  - 반경 없음(약한 TD·옛 자료) → Rm = Willoughby et al. (2006) 46.4·exp(−0.0155·Vmax + 0.0169·lat) km, α = 0.5,
    그리고 이동속도 비대칭 +0.5·Vt·cos(이동방향 오른쪽 90°와의 각) (반경 자료가 있으면 이미 비대칭이 들어 있어 안 더함)
  - Vmax 없음(TD, 'grade 2'에 풍속 칸 빈 경우) → 기압으로 Vmax = 3.4·(1010−p)^0.644 m/s (Atkinson–Holliday 꼴, 10분 환산 ×0.88)
  - 6시간 점을 1시간으로 선형 보간(경도·위도·Vmax·반경), 2분 이내 같은 시각 중복은 무시
  - 육상 감쇠: best track Vmax가 이미 상륙 후 약화를 담고 있음 + 관측소/논 지표 거칠기 → 단일 계수 a로 보정
    (calibrate.py: ASOS 일 최대순간풍속 ws_ins ≈ a·V_model, 태풍 영향일만; 수량은 보지 않음)
  - 일 최대: 시각(UTC+9 KST)별 모델 풍속의 하루 최대, 같은 날 여러 태풍이면 최대.
"""
import math
import os

import numpy as np
import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
KT = 0.514444
NM = 1.852
DIR = {1: 45, 2: 90, 3: 135, 4: 180, 5: 225, 6: 270, 7: 315, 8: 0}  # JMA 방향 코드 → 방위각(북=0, 시계방향)


def _num(s):
    s = s.strip()
    return float(s) if s else np.nan


def parse_bst(path=os.path.join(HERE, "data/bst_all.txt")):
    rows, sid, name = [], None, None
    with open(path) as f:
        for line in f:
            if line.startswith("66666"):
                sid = line[6:10].strip()
                name = line[30:50].strip()
                continue
            yy = int(line[0:2])
            yr = 1900 + yy if yy >= 51 else 2000 + yy
            t = pd.Timestamp(yr, int(line[2:4]), int(line[4:6]), int(line[6:8]))
            ln = line.rstrip("\n").ljust(80)
            rows.append({"sid": sid, "name": name, "t": t, "grade": int(ln[13]), "lat": int(ln[15:18]) / 10,
                         "lon": int(ln[19:23]) / 10, "p": _num(ln[24:28]), "vmax_kt": _num(ln[33:36]),
                         "d50": _num(ln[41]), "r50l": _num(ln[42:46]), "r50s": _num(ln[47:51]),
                         "d30": _num(ln[52]), "r30l": _num(ln[53:57]), "r30s": _num(ln[58:62])})
    d = pd.DataFrame(rows)
    d.loc[d.vmax_kt <= 0, "vmax_kt"] = np.nan
    for c in ("r50l", "r50s", "r30l", "r30s"):
        d.loc[d[c] <= 0, c] = np.nan
    return d


def hourly(tr):
    """한 태풍의 6시간 점 → 1시간 보간, 이동속도·방향 추가."""
    tr = tr.drop_duplicates("t").sort_values("t").set_index("t")
    v = tr.vmax_kt * KT
    vp = 3.4 * np.clip(1010 - tr.p, 0, None) ** 0.644 * 0.88
    tr = tr.assign(vmax=v.fillna(vp))
    num = ["lat", "lon", "vmax", "r50l", "r50s", "r30l", "r30s", "d50", "d30"]
    idx = pd.date_range(tr.index.min(), tr.index.max(), freq="1h")
    h = tr[num].reindex(tr.index.union(idx))
    h[["lat", "lon", "vmax"]] = h[["lat", "lon", "vmax"]].interpolate("time", limit_area="inside")
    # 반경: 양쪽 끝이 모두 있을 때만 보간, 방향은 앞 값 유지
    h[["r50l", "r50s", "r30l", "r30s"]] = h[["r50l", "r50s", "r30l", "r30s"]].interpolate("time", limit_area="inside", limit=5)
    h[["d50", "d30"]] = h[["d50", "d30"]].ffill(limit=5)
    h = h.reindex(idx)
    lat0 = np.radians(h.lat.values)
    dx = np.gradient(np.radians(h.lon.values)) * np.cos(lat0) * 6371.0
    dy = np.gradient(np.radians(h.lat.values)) * 6371.0
    h["vt"] = np.hypot(dx, dy) / 3.6  # km/h → m/s
    h["hdg"] = np.degrees(np.arctan2(dx, dy)) % 360
    return h.reset_index().rename(columns={"index": "t"})


def wind_at(h, lat, lon):
    """1시간 점들(h) × 지점 하나 → 모델 풍속(m/s, 10분 평균 상당) 배열."""
    la1, lo1 = np.radians(h.lat.values), np.radians(h.lon.values)
    la2, lo2 = math.radians(lat), math.radians(lon)
    dlat, dlon = la2 - la1, lo2 - lo1
    a = np.sin(dlat / 2) ** 2 + np.cos(la1) * np.cos(la2) * np.sin(dlon / 2) ** 2
    r = 2 * 6371.0 * np.arcsin(np.sqrt(a))  # km
    brg = (np.degrees(np.arctan2(np.sin(dlon) * np.cos(la2),
                                 np.cos(la1) * np.sin(la2) - np.sin(la1) * np.cos(la2) * np.cos(dlon))) + 360) % 360
    vmax = h.vmax.values

    def rad(l, s, d):
        dd = np.array([DIR.get(int(x), np.nan) if x == x else np.nan for x in d])
        cosf = np.where(np.isnan(dd), 0.0, np.cos(np.radians(brg - np.nan_to_num(dd))))
        return (s + (l - s) * (1 + cosf) / 2) * NM

    R50 = rad(h.r50l.values, h.r50s.values, h.d50.values)
    R30 = rad(h.r30l.values, h.r30s.values, h.d30.values)
    v50, v30 = 50 * KT, 30 * KT
    alpha = np.full(len(h), 0.5)
    Rm = 46.4 * np.exp(-0.0155 * vmax + 0.0169 * h.lat.values)
    has30 = ~np.isnan(R30) & (vmax > v30)
    has50 = has30 & ~np.isnan(R50) & (vmax > v50) & (R30 > R50)
    Rm = np.where(has30, R30 * (v30 / np.maximum(vmax, 1)) ** 2, Rm)
    al50 = np.clip(np.log(50 / 30) / np.log(np.where(has50, R30 / np.maximum(R50, 1e-3), 2.0)), 0.3, 1.0)
    alpha = np.where(has50, al50, alpha)
    Rm = np.where(has50, R50 * (v50 / np.maximum(vmax, 1)) ** (1 / alpha), Rm)
    Rm = np.clip(Rm, 10, 300)
    V = np.where(r <= Rm, vmax * r / Rm, vmax * (Rm / np.maximum(r, 1e-3)) ** alpha)
    # 반경 자료가 없을 때만 이동속도 비대칭 (북반구: 진행 방향 오른쪽 강함)
    ang = np.radians(brg - (h.hdg.values + 90))
    V = np.where(has30, V, V + 0.5 * h.vt.values * np.cos(ang) * (V > 0))
    V = np.where(np.isnan(V), 0.0, np.clip(V, 0, None))
    return V, r


def daily_max(trk_h, sites, max_km=800):
    """trk_h: 모든 태풍 1시간 점(sid 포함), sites: DataFrame[key..., lat, lon]. → DataFrame[site_idx, date, v, r_min, sid]."""
    out = []
    kst = (trk_h.t + pd.Timedelta(hours=9)).dt.normalize()
    for i, s in enumerate(sites.itertuples()):
        V, r = wind_at(trk_h, s.lat, s.lon)
        m = r <= max_km
        if not m.any():
            continue
        d = pd.DataFrame({"i": i, "date": kst.values[m], "v": V[m], "r": r[m], "sid": trk_h.sid.values[m]})
        g = d.sort_values("v").groupby("date").agg(v=("v", "max"), r=("r", "min"), sid=("sid", "last")).reset_index()
        g["i"] = i
        out.append(g)
    return pd.concat(out, ignore_index=True)


def load_tracks(y0=1975, y1=2026, months=(6, 7, 8, 9, 10, 11)):
    d = parse_bst()
    d = d[(d.t.dt.year >= y0) & (d.t.dt.year <= y1) & d.t.dt.month.isin(months)]
    # 한반도 근처를 지난 태풍만 (중심 37N 127.5E 에서 1200km 이내 점이 하나라도)
    la, lo = np.radians(d.lat), np.radians(d.lon)
    rr = 6371 * np.arccos(np.clip(np.sin(la) * math.sin(math.radians(36.5)) + np.cos(la) * math.cos(math.radians(36.5)) *
                                  np.cos(lo - math.radians(127.5)), -1, 1))
    keep = set(d.sid[rr < 1200])
    hs = []
    for sid, tr in d[d.sid.isin(keep)].groupby("sid"):
        h = hourly(tr)
        h["sid"] = sid
        h["name"] = tr.name.iloc[0]
        hs.append(h)
    h = pd.concat(hs, ignore_index=True).dropna(subset=["lat", "lon", "vmax"])
    return h


if __name__ == "__main__":
    h = load_tracks()
    print(len(h), h.sid.nunique(), h.t.min(), h.t.max())
    print(h[h.name.isin(["MAEMI", "BOLAVEN", "LINGLING"])].groupby("name")[["vmax", "r30l", "r50l"]].max())
