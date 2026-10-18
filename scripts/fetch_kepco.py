"""한전 전력데이터 개방포털 OpenAPI에서 농사용 전력을 시군·월 단위로 받아 DuckDB(db/kepco.duckdb)에 쌓는다.

받는 것 (2010년 1월 ~ 자료가 있는 마지막 달)
- 계약종별 전력사용량, 계약종별 농사용(cntrCd 500): 시도를 빼고 부르면 한 번에 전국 시군과 전국 합계(totData)가 온다.
  고객호수·사용량(kWh)·요금(원)·단가(원/kWh)·계약전력(kW). 월은 검침월이다.
- 산업분류별 전기사용고객 증감, 농업·임업·어업(bizCd A): 시도(법정동 코드)가 필수라 시도마다 부른다.
  신설·증설·해지 건수.

함정 (2026-10 확인)
- 시도·시군 코드는 법정동 코드다(경남 48). 공통코드 metroCd 목록(경남 38)과 다르다.
- 시도를 빼면 본문이 JSON 두 개를 이어 붙인 것({"totData":…}{"data":…})이다 → raw_decode로 차례로 읽는다.
- 자료가 없는 달은 HTTP 404 {"errCd":"404"}.
- 빠르게 연달아 부르면 맞는 키에도 잠시 HTTP 401(InvalidApiKeyException)을 준다 → 이미 한 번 통한 키면 쉬었다가 다시 부른다.
- 강원·전북은 특별자치도 코드(51·52)를 쓰고, 예전 달에 자료가 없으면 옛 코드(42·45)로 다시 부른다.
  광주·전남이 통합특별시(12)로 바뀐 뒤의 달은 29·46에 자료가 없으면 12로 부른다.

응답은 db/raw/kepco/에 남기고 다시 부르지 않는다(마지막 두 달은 고쳐질 수 있어 늘 다시 받는다).
실행: python scripts/fetch_kepco.py [시작연월 끝연월]   예) 201001 202608
"""
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

import duckdb

from fetch_agrix_corp import region as agrix_region  # (시도명, 시군구명) → (시도 코드, 시군 키, 방식)

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.join(ROOT, "db", "kepco.duckdb")
RAW = os.path.join(ROOT, "db", "raw", "kepco")
API = "https://bigdata.kepco.co.kr/openapi/v1/"

# 법정동 시도 코드 (산업분류별 고객 증감용)
METROS = ["11", "26", "27", "28", "29", "30", "31", "36", "41", "43", "44", "46", "47", "48", "50", "51", "52"]
OLD_CODE = {"51": "42", "52": "45"}
GWANGJU_GU = {"동구", "서구", "남구", "북구", "광산구"}


def load_key():
    for line in open(os.path.join(ROOT, ".env"), encoding="utf-8"):
        if line.startswith("KEPCO_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"')
    raise SystemExit("KEPCO_API_KEY가 .env에 없습니다")


KEY = load_key()
key_ok = False  # 이 실행에서 키가 한 번이라도 통했는지 (그 뒤의 401은 호출 제한으로 본다)


def objects(body):
    dec, i, out = json.JSONDecoder(), 0, {}
    while i < len(body):
        while i < len(body) and body[i].isspace():
            i += 1
        if i >= len(body):
            break
        o, i = dec.raw_decode(body, i)
        out.update(o)
    return out


def call(path, params, cache, refresh=False):
    """응답 dict. 자료가 없으면 None. cache 파일이 있으면 그것을 쓴다."""
    if os.path.exists(cache) and not refresh:
        with open(cache, encoding="utf-8") as fh:
            return json.load(fh)
    global key_ok
    q = urllib.parse.urlencode(dict(params, apiKey=KEY, returnType="json"))
    for attempt in range(6):
        wait = 2 ** attempt
        try:
            with urllib.request.urlopen(API + path + "?" + q, timeout=60) as r:
                d = objects(r.read().decode("utf-8"))
            key_ok = True
            break
        except urllib.error.HTTPError as e:
            if e.code == 404:
                key_ok = True
                d = None
                break
            if e.code == 401 and not key_ok:
                raise SystemExit("한전 API 키가 맞지 않습니다 (401)")
            if e.code == 401:
                wait = 30 * (attempt + 1)  # 호출 제한: 길게 쉰다
            err = e
        except (OSError, ValueError) as e:
            err = e
        if attempt == 5:
            raise RuntimeError(f"{path} {params}: {err}")
        print(f"  {path} {params.get('year')}-{params.get('month')}: {err} → {wait}초 뒤 다시", file=sys.stderr)
        time.sleep(wait)
    os.makedirs(os.path.dirname(cache), exist_ok=True)
    with open(cache, "w", encoding="utf-8") as fh:
        json.dump(d, fh, ensure_ascii=False)
    time.sleep(0.25)
    return d


def months(a, b):
    y, m = divmod(a, 100)
    while y * 100 + m <= b:
        yield y, m
        m += 1
        if m > 12:
            y, m = y + 1, 1


def region(metro, city):
    """한전 (시도명, 시군명) → (시도 코드, 시군 키, 방식). 통합특별시는 시군 이름으로 광주·전남을 가른다.
    세종은 시군 이름이 빈칸으로 온다."""
    city = city.strip() or metro
    if metro.startswith("전남광주"):
        metro = "광주광역시" if city in GWANGJU_GU else "전라남도"
    return agrix_region(metro, city)


def num(v):
    return None if v in ("", None) else v


def latest_month():
    """자료가 있는 마지막 달: 이번 달부터 거꾸로 찾는다 (캐시를 쓰지 않는다)."""
    t = time.localtime()
    y, m = t.tm_year, t.tm_mon
    for _ in range(6):
        q = urllib.parse.urlencode({"year": y, "month": f"{m:02d}", "metroCd": "48", "cityCd": "250", "cntrCd": "500",
                                    "apiKey": KEY, "returnType": "json"})
        try:
            with urllib.request.urlopen(API + "powerUsage/contractType.do?" + q, timeout=60) as r:
                if objects(r.read().decode()).get("data"):
                    return y * 100 + m
        except urllib.error.HTTPError:
            pass
        y, m = (y, m - 1) if m > 1 else (y - 1, 12)
    raise RuntimeError("최근 여섯 달에 자료가 없습니다")


def main():
    last = latest_month()
    a, b = (int(sys.argv[1]), int(sys.argv[2])) if len(sys.argv) > 2 else (201001, last)
    fresh = {last, (last - 1) if last % 100 != 1 else last - 89}  # 마지막 두 달은 다시 받는다
    use, use_tot, chg, log, problems = [], [], [], [], []

    for y, m in months(a, b):
        ym = y * 100 + m
        refresh = ym in fresh
        d = call("powerUsage/contractType.do", {"year": y, "month": f"{m:02d}", "cntrCd": "500"},
                 os.path.join(RAW, "contract", f"{ym}.json"), refresh)
        if not d or not d.get("data"):
            problems.append(f"{ym}: 농사용 사용량 자료 없음")
            continue
        rows = d["data"]
        for t in d.get("totData", []):
            use_tot.append((y, m, t["custCnt"], t["powerUsage"], t["bill"], t["unitCost"], num(t["cntrPwr"])))
        for r in rows:
            s, key, how = region(r["metro"], r["city"])
            if not key:
                problems.append(f"{ym} {r['metro']} {r['city']}: 시군 키 없음 ({how})")
            use.append((y, m, r["metro"], r["city"], r["custCnt"], r["powerUsage"], r["bill"], r["unitCost"],
                        num(r["cntrPwr"]), s, key, how))
        tot = d.get("totData", [{}])[0]
        if tot and (sum(r["custCnt"] for r in rows), sum(r["powerUsage"] for r in rows)) != (tot["custCnt"], tot["powerUsage"]):
            problems.append(f"{ym}: 시군 합 ≠ 전국 (고객 {sum(r['custCnt'] for r in rows):,}/{tot['custCnt']:,}, "
                            f"kWh {sum(r['powerUsage'] for r in rows):,}/{tot['powerUsage']:,})")

        n_chg = 0
        got = set()
        for code in METROS:
            p = {"year": y, "month": f"{m:02d}", "metroCd": code, "bizCd": "A"}
            c = call("change/custNum/industryType.do", p, os.path.join(RAW, "change", f"{ym}_{code}.json"), refresh)
            if (not c or not c.get("data")) and code in OLD_CODE:
                c = call("change/custNum/industryType.do", dict(p, metroCd=OLD_CODE[code]),
                         os.path.join(RAW, "change", f"{ym}_{OLD_CODE[code]}.json"), refresh)
            for r in (c or {}).get("data", []):
                got.add(code)
                s, key, how = region(r["metro"], r["city"])
                chg.append((y, m, r["metro"], r["city"], r["new"], r["expansion"], r["cancel"], s, key, how))
                n_chg += 1
        if not ({"29", "46"} & got):
            c = call("change/custNum/industryType.do", {"year": y, "month": f"{m:02d}", "metroCd": "12", "bizCd": "A"},
                     os.path.join(RAW, "change", f"{ym}_12.json"), refresh)
            for r in (c or {}).get("data", []):
                s, key, how = region(r["metro"], r["city"])
                chg.append((y, m, r["metro"], r["city"], r["new"], r["expansion"], r["cancel"], s, key, how))
                n_chg += 1
        if not n_chg:
            problems.append(f"{ym}: 고객 증감 자료 없음")
        log.append((y, m, time.strftime("%Y-%m-%d %H:%M:%S"), len(rows), n_chg))
        if m == 12 or ym == b:
            print(f"{y}년 ~{m}월: 사용량 {len(rows)}행, 증감 {n_chg}행", file=sys.stderr)

    c = duckdb.connect(DB)
    c.sql("""CREATE TABLE IF NOT EXISTS farm_power (year SMALLINT, month TINYINT, metro VARCHAR, city VARCHAR,
             cust INTEGER, kwh BIGINT, bill BIGINT, unit_cost DOUBLE, kw BIGINT, sido VARCHAR, region VARCHAR, region_method VARCHAR)""")
    c.sql("""CREATE TABLE IF NOT EXISTS farm_power_total (year SMALLINT, month TINYINT, cust INTEGER, kwh BIGINT,
             bill BIGINT, unit_cost DOUBLE, kw BIGINT)""")
    c.sql("""CREATE TABLE IF NOT EXISTS agri_cust_change (year SMALLINT, month TINYINT, metro VARCHAR, city VARCHAR,
             new INTEGER, expansion INTEGER, cancel INTEGER, sido VARCHAR, region VARCHAR, region_method VARCHAR)""")
    c.sql("CREATE TABLE IF NOT EXISTS fetch_log (year SMALLINT, month TINYINT, fetched_at VARCHAR, power_rows INTEGER, change_rows INTEGER)")
    for t in ("farm_power", "farm_power_total", "agri_cust_change", "fetch_log"):
        c.execute(f"DELETE FROM {t} WHERE CAST(year AS INTEGER) * 100 + month BETWEEN ? AND ?", [a, b])
    c.executemany("INSERT INTO farm_power VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", use)
    c.executemany("INSERT INTO farm_power_total VALUES (?, ?, ?, ?, ?, ?, ?)", use_tot)
    c.executemany("INSERT INTO agri_cust_change VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", chg)
    c.executemany("INSERT INTO fetch_log VALUES (?, ?, ?, ?, ?)", log)
    print(c.sql("""SELECT year, count(DISTINCT month) AS 월, round(sum(kwh) / 1e9, 2) AS 사용량_GWh천,
                          max(cust) AS 최대고객_시군 FROM farm_power GROUP BY year ORDER BY year"""))
    c.close()
    print(f"db/kepco.duckdb · {a}~{b} (자료가 있는 마지막 달 {last})")
    if problems:
        print(f"확인할 점 {len(problems)}건:")
        for p in problems[:60]:
            print(" -", p)


if __name__ == "__main__":
    main()
