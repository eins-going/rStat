"""농진청 농업기상 관측 일자료 수집 (data.go.kr 15078057, DATA_PORTAL_API_KEY).

- 관측소 목록: AgriWeather/getObsrSpotList (217곳) → data/spots.csv
- 일자료: GnrlWeather/getWeatherYearDayList3 (관측소 × 연도, 한 번에 1년 365행)
  항목: temp·hghst_Artmp·lowst_Artmp(기온), hum(습도), wind·max_Wind(바람), rn(강수), sun_Time(일조),
        srqty(일사 MJ/m2), condens_Time(결로시간, 분), gr_Temp·soil_Temp·soil_Wt(지면·토양)
- 관측소-연도마다 data/raw/{code}_{year}.csv 로 저장 → 다시 돌리면 받은 것은 건너뛴다(올해는 늘 다시 받음).
- 끝나면 data/agro_daily.csv.gz 로 합친다.
사용: python fetch_agro.py [--from 2010] [--to 2026]
"""
import argparse
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import date

import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/home/eins/project/rStat"
RAW = os.path.join(HERE, "data", "raw")
BASE = "https://apis.data.go.kr/1390802/AgriWeather"
COLS = ["date", "temp", "hghst_Artmp", "lowst_Artmp", "hum", "wind", "max_Wind", "rn", "sun_Time", "srqty",
        "condens_Time", "gr_Temp", "soil_Temp", "soil_Wt"]


def key():
    for line in open(os.path.join(ROOT, ".env"), encoding="utf-8"):
        if line.startswith("DATA_PORTAL_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"')
    sys.exit("DATA_PORTAL_API_KEY 없음")


def get(url, params, tries=4):
    q = urllib.parse.urlencode(params)
    for i in range(tries):
        try:
            return urllib.request.urlopen(f"{url}?{q}", timeout=60).read().decode("utf-8", "ignore")
        except Exception as e:  # 일시 오류는 잠깐 쉬고 다시
            if i == tries - 1:
                raise
            time.sleep(3 * (i + 1))
            print("  재시도", e, flush=True)


def items(xml):
    return [dict(re.findall(r"<(\w+)>([^<]*)</\1>", it)) for it in re.findall(r"<item>(.*?)</item>", xml, re.S)]


class Limited(Exception):
    pass


def term_fetch(k, code, y0, y1, page=1000):
    """기간별 일자료(getWeatherTermDayList3)로 y0-01-01~오늘을 쪽 단위로 받아 연도별 파일로 나눈다 (호출 수 절약)."""
    rows, p = [], 1
    end = min(date.today(), date(y1, 12, 31)).strftime("%Y-%m-%d")
    while True:
        try:
            xml = get(f"{BASE}/WeatherObsrInfo/V3/GnrlWeather/getWeatherTermDayList3",
                      {"serviceKey": k, "Page_No": p, "Page_Size": page, "begin_Date": f"{y0}-01-01", "end_Date": end,
                       "obsr_Spot_Cd": code}, tries=2)
        except urllib.error.HTTPError as e:
            if e.code == 429:
                raise Limited()
            raise
        got = items(xml)
        rows += got
        tot = re.search(r"<total_Count>(\d+)</total_Count>", xml)
        tot = int(tot.group(1)) if tot else (len(rows) + 1 if len(got) >= page else len(rows))
        if not got or len(rows) >= tot or p >= 40:
            break
        p += 1
        time.sleep(0.15)
    df = pd.DataFrame(rows)
    if not df.empty:
        df = df[[c for c in COLS if c in df.columns]]
        num = [c for c in df.columns if c != "date"]
        df[num] = df[num].apply(pd.to_numeric, errors="coerce")
        df = df.dropna(subset=["temp", "srqty", "rn"], how="all")
    for y in range(y0, y1 + 1):
        part = df[df.date.astype(str).str.startswith(str(y))] if not df.empty else df
        part.to_csv(os.path.join(RAW, f"{code}_{y}.csv"), index=False)
    return p, len(df)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--from", dest="y0", type=int, default=2010)
    ap.add_argument("--to", dest="y1", type=int, default=date.today().year)
    ap.add_argument("--term", action="store_true", help="관측소마다 기간별 일자료로 한꺼번에 (호출 절약)")
    a = ap.parse_args()
    k = key()
    os.makedirs(RAW, exist_ok=True)
    spots = pd.DataFrame(items(get(f"{BASE}/getObsrSpotList", {"serviceKey": k, "Page_No": 1, "Page_Size": 400})))
    spots.to_csv(os.path.join(HERE, "data", "spots.csv"), index=False)
    print("관측소", len(spots), flush=True)
    this_year = date.today().year
    n_call = n_rows = 0
    for i, s in spots.iterrows():
        code = s.Obsr_Spot_Code
        if a.term:
            if all(os.path.exists(os.path.join(RAW, f"{code}_{y}.csv")) for y in range(a.y0, this_year)):
                continue
            try:
                c, n = term_fetch(k, code, a.y0, a.y1)
            except Limited:
                print("하루 호출 한도(1,000) 도달 — 내일 이어받기", flush=True)
                return
            n_call += c
            n_rows += n
            print(f"{i + 1}/{len(spots)} {code} {s.Obsr_Spot_Nm} · 호출 {c} · 행 {n}", flush=True)
            continue
        for y in range(a.y0, a.y1 + 1):
            fn = os.path.join(RAW, f"{code}_{y}.csv")
            if os.path.exists(fn) and y != this_year:
                continue
            xml = get(f"{BASE}/WeatherObsrInfo/V3/GnrlWeather/getWeatherYearDayList3",
                      {"serviceKey": k, "Page_No": 1, "Page_Size": 400, "search_Year": y, "obsr_Spot_Cd": code})
            n_call += 1
            if "<result_Code>200" not in xml and "<items>" not in xml:
                print("  응답 이상", code, y, xml[:200].replace("\n", " "), flush=True)
                time.sleep(2)
                continue
            df = pd.DataFrame(items(xml))
            if not df.empty:
                df = df[[c for c in COLS if c in df.columns]]
                num = [c for c in df.columns if c != "date"]
                df[num] = df[num].apply(pd.to_numeric, errors="coerce")
                df = df.dropna(subset=["temp", "srqty", "rn"], how="all")  # 관측 전 빈 행 버림
            df.to_csv(fn, index=False)  # 빈 해도 빈 파일로 남겨 다시 묻지 않는다
            n_rows += len(df)
            time.sleep(0.15)
        if i % 20 == 0:
            print(f"{i + 1}/{len(spots)} {code} {s.Obsr_Spot_Nm} · 호출 {n_call} · 행 {n_rows}", flush=True)
    # 합치기
    parts = []
    for f in sorted(os.listdir(RAW)):
        if not f.endswith(".csv") or os.path.getsize(f"{RAW}/{f}") < 20:
            continue
        d = pd.read_csv(f"{RAW}/{f}")
        if d.empty:
            continue
        d.insert(0, "code", f.split("_")[0])
        parts.append(d)
    allx = pd.concat(parts, ignore_index=True)
    allx.to_csv(os.path.join(HERE, "data", "agro_daily.csv.gz"), index=False)
    print("완료", allx.shape, "관측소", allx.code.nunique(), "기간", allx.date.min(), allx.date.max(), flush=True)


if __name__ == "__main__":
    main()
