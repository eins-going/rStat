"""농업경영체 등록정보(uni.agrix.go.kr) '지역별 법인 현황'을 해마다 시군구 단위로 받아 DuckDB(db/agrix.duckdb)에 쌓는다.

화면: https://uni.agrix.go.kr/docs7/biOlap/fixType.do?reportId=corp
- 화면의 조회 버튼이 부르는 POST /docs7/biOlap/search.do를 그대로 부른다. 조건문은 화면 스크립트(fixType.js)처럼
  AND→'AAA ', '='→'EEE'로 바꾸고 끝에 'W<AND 개수>'를 붙인다. 경영체 구분은 화면 기본값과 같은 '법인'.
- 값: bzobCnt 경영체 수, corpYn 영농조합법인, corpNh 농업회사법인 (단위 건). 법인 소재지 주소 기준.
- 시군구로 고르면 응답에 시도 소계(시군구 이름 없음)와 전국 합계(시도 이름 없음) 행이 섞여 온다 → 따로 떼어
  시군구 합이 소계와, 소계 합이 전국과, 시도로 따로 조회한 값과 맞는지 확인한다.

테이블
- corp_sgg     연도 × 원자료 시군구 한 행 (원래 이름을 그대로 두고, 통계 페이지의 시군 키 region을 붙인다)
- corp_sido    연도 × 시도 (시도 소계 행), sido_nm '전국'은 전국 합계
- v_corp_region 통계 페이지 시군 단위(일반시의 구는 시로, 광역시의 구는 '○○시부'로 묶음) 연도별 합
- fetch_log    연도별 받은 시각·행 수
원자료 응답은 db/raw/agrix_corp/<연도>.json에 남긴다.
실행: python scripts/fetch_agrix_corp.py [시작연도 끝연도]   (기본 2015~올해-1)
"""
import http.cookiejar
import json
import os
import sys
import time
import urllib.parse
import urllib.request

import duckdb

from regions import UNIT_KEYS, sido_code, unit_of

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.join(ROOT, "db", "agrix.duckdb")
RAW = os.path.join(ROOT, "db", "raw", "agrix_corp")
PAGE = "https://uni.agrix.go.kr/docs7/biOlap/fixType.do?reportId=corp"
SEARCH = "https://uni.agrix.go.kr/docs7/biOlap/search.do"

opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))


def condition(year):
    where = f" AND PER_CORP_DV = '법인' AND CRT_YEAR = '{year}' "
    conv = where.replace("AND ", "AAA ").replace("=", "EEE")
    return conv + f"W{conv.count('AAA ')}"


def search(year, level):
    """level: 'SK'(시도+시군구) 또는 'SD'(시도)"""
    form = {
        "sidoType": "true", "siguType": "true" if level == "SK" else "false", "ubmnType": "false",
        "highLevelType": "false", "mediumLevelType": "false", "lowLevelType": "false",
        "eqptBkindType": "false", "eqptMkindType": "false", "oudorType": "true", "eqptType": "true",
        "selAreaStr": level, "selItemStr": "ALL", "reportId": "corp", "searchYear": str(year),
        "condition": condition(year), "subject1": "농업경영체 현황(농업법인)", "subject2": "지역별 법인 현황",
        "pageNo": "1", "pageRows": "5000",
    }
    req = urllib.request.Request(SEARCH, data=urllib.parse.urlencode(form).encode(), headers={"Referer": PAGE})
    for attempt in range(4):
        try:
            with opener.open(req, timeout=60) as r:
                d = json.loads(r.read().decode("utf-8"))
            if len(d["result"]) != int(d["totcnt"]):
                raise RuntimeError(f"{year} {level}: {len(d['result'])}행 / totcnt {d['totcnt']}")
            return d["result"]
        except (ValueError, OSError):
            # 세션이 끊기면 오류 HTML이 온다 → 화면을 다시 열어 쿠키를 받는다
            if attempt == 3:
                raise
            time.sleep(2 ** attempt)
            opener.open(PAGE, timeout=60).read()


def region(sido_nm, sgg_nm):
    """원자료 (시도, 시군구) → (시도 코드, 통계 페이지 시군 키, 방식). '수원시 장안구'처럼 일반시의 구는 시로 본다."""
    s = sido_code(sido_nm)
    if not s:
        return None, None, "unknown"
    name = sgg_nm.split()[0] if " " in sgg_nm else sgg_nm
    u = unit_of(s, name)
    if u and u[0] in UNIT_KEYS:
        return s, u[0], u[1]
    return s, None, "unmatched"


def main():
    this = time.localtime().tm_year
    y0, y1 = (int(sys.argv[1]), int(sys.argv[2])) if len(sys.argv) > 2 else (2015, this - 1)
    os.makedirs(RAW, exist_ok=True)
    opener.open(PAGE, timeout=60).read()

    sgg_rows, sido_rows, log, problems = [], [], [], []
    for year in range(y0, y1 + 1):
        sk = search(year, "SK")
        time.sleep(1)
        sd = search(year, "SD")
        time.sleep(1)
        with open(os.path.join(RAW, f"{year}.json"), "w", encoding="utf-8") as fh:
            json.dump({"year": year, "fetched": time.strftime("%Y-%m-%d %H:%M"), "sgg": sk, "sido": sd}, fh, ensure_ascii=False)

        vals = lambda x: (x["bzobCnt"], x["corpYn"], x["corpNh"])  # noqa: E731
        units = [x for x in sk if x["bubjungSdNm"] and x["bubjungSkNm"]]
        subtotal = {x["bubjungSdNm"]: vals(x) for x in sk if x["bubjungSdNm"] and not x["bubjungSkNm"]}
        nation = [vals(x) for x in sk if not x["bubjungSdNm"]]
        by_sido = {x["bubjungSdNm"]: vals(x) for x in sd if x["bubjungSdNm"]}

        # 검산: 시군구 합 = 시도 소계 = 시도 조회, 시도 소계 합 = 전국
        for nm, v in subtotal.items():
            s = tuple(map(sum, zip(*[vals(x) for x in units if x["bubjungSdNm"] == nm])))
            if s != v:
                problems.append(f"{year} {nm}: 시군구 합 {s} ≠ 소계 {v}")
            if by_sido.get(nm) != v:
                problems.append(f"{year} {nm}: 시도 조회 {by_sido.get(nm)} ≠ 소계 {v}")
        if nation and tuple(map(sum, zip(*subtotal.values()))) != nation[0]:
            problems.append(f"{year}: 시도 소계 합 ≠ 전국 {nation[0]}")
        if not nation:
            problems.append(f"{year}: 전국 합계 행이 없음")

        for x in units:
            s, key, how = region(x["bubjungSdNm"], x["bubjungSkNm"])
            if not key:
                problems.append(f"{year} {x['bubjungSdNm']} {x['bubjungSkNm']}: 시군 키를 못 붙임 ({how})")
            sgg_rows.append((year, x["bubjungSdNm"], x["bubjungSkNm"], *vals(x), s, key, how))
        for nm, v in subtotal.items():
            sido_rows.append((year, nm, *v))
        if nation:
            sido_rows.append((year, "전국", *nation[0]))
        log.append((year, time.strftime("%Y-%m-%d %H:%M:%S"), len(units), nation[0][0] if nation else None))
        print(f"{year}: 시군구 {len(units)}행 · 법인 {nation[0][0] if nation else '?':,}곳", file=sys.stderr)

    c = duckdb.connect(DB)
    c.sql("""CREATE TABLE IF NOT EXISTS corp_sgg (year SMALLINT, sido_nm VARCHAR, sgg_nm VARCHAR,
             total INTEGER, yeongnong INTEGER, hoesa INTEGER, sido VARCHAR, region VARCHAR, region_method VARCHAR)""")
    c.sql("CREATE TABLE IF NOT EXISTS corp_sido (year SMALLINT, sido_nm VARCHAR, total INTEGER, yeongnong INTEGER, hoesa INTEGER)")
    c.sql("CREATE TABLE IF NOT EXISTS fetch_log (year SMALLINT, fetched_at VARCHAR, sgg_rows INTEGER, nation_total INTEGER)")
    years = list(range(y0, y1 + 1))
    for t in ("corp_sgg", "corp_sido", "fetch_log"):
        c.execute(f"DELETE FROM {t} WHERE year BETWEEN ? AND ?", [y0, y1])
    c.executemany("INSERT INTO corp_sgg VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", sgg_rows)
    c.executemany("INSERT INTO corp_sido VALUES (?, ?, ?, ?, ?)", sido_rows)
    c.executemany("INSERT INTO fetch_log VALUES (?, ?, ?, ?)", log)
    c.sql("""CREATE OR REPLACE VIEW v_corp_region AS
             SELECT year, sido, region, sum(total) AS total, sum(yeongnong) AS yeongnong, sum(hoesa) AS hoesa,
                    count(*) AS source_rows
             FROM corp_sgg WHERE region IS NOT NULL GROUP BY ALL""")
    print(c.sql("SELECT year, count(*) AS 시군구, sum(total) AS 법인, sum(yeongnong) AS 영농조합, sum(hoesa) AS 농업회사 "
                "FROM corp_sgg GROUP BY year ORDER BY year"))
    c.close()
    print(f"db/agrix.duckdb · {years[0]}~{years[-1]}년")
    if problems:
        print(f"확인할 점 {len(problems)}건:")
        for p in problems:
            print(" -", p)


if __name__ == "__main__":
    main()
