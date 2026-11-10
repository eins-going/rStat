"""NASA POWER 일별 지표면 일사(ALLSKY_SFC_SW_DWN, MJ/m2/d) 지점 수집 → data/power_{lat}_{lon}.csv (있으면 건너뜀).
POWER 격자는 일사 1°(0.5° 제공)라 0.5° 격자 중심으로 맞춰 중복을 줄인다.
사용: python fetch_power.py points.csv [start] [end]   (points.csv: id,lat,lon)
"""
import json, os, sys, time, urllib.request
import pandas as pd
HERE = os.path.dirname(os.path.abspath(__file__))
D = os.path.join(HERE, "data"); os.makedirs(D, exist_ok=True)
P = "ALLSKY_SFC_SW_DWN,CLRSKY_SFC_SW_DWN,T2M,T2M_MAX,T2M_MIN"

def cell(v):
    return round(round(v * 2) / 2, 1)

def fetch(lat, lon, s, e):
    fn = os.path.join(D, f"power_{lat}_{lon}.csv")
    if os.path.exists(fn):
        return fn
    url = (f"https://power.larc.nasa.gov/api/temporal/daily/point?parameters={P}&community=AG"
           f"&longitude={lon}&latitude={lat}&start={s}&end={e}&format=JSON")
    for i in range(4):
        try:
            j = json.load(urllib.request.urlopen(url, timeout=300))
            break
        except Exception as ex:
            print("  재시도", ex, flush=True); time.sleep(10 * (i + 1))
    else:
        raise RuntimeError(url)
    pr = j["properties"]["parameter"]
    df = pd.DataFrame(pr).replace(-999.0, float("nan"))
    df.index.name = "date"
    df.to_csv(fn)
    return fn

if __name__ == "__main__":
    pts = pd.read_csv(sys.argv[1])
    s = sys.argv[2] if len(sys.argv) > 2 else "19840101"
    e = sys.argv[3] if len(sys.argv) > 3 else "20261231"
    cells = sorted({(cell(a), cell(b)) for a, b in zip(pts.lat, pts.lon)})
    print("격자", len(cells), flush=True)
    for i, (a, b) in enumerate(cells):
        fetch(a, b, s, e)
        print(f"{i+1}/{len(cells)} {a},{b}", flush=True)
        time.sleep(1)
