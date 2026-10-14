"""물류기기 공동이용 2004~2025년 원자료를 하나의 DuckDB(db/logistics.duckdb)로 통합한다.

순서: python scripts/clean_raw.py → python scripts/build_db.py → python scripts/verify_db.py
- 입력: db/clean/<연도>.csv (clean_raw.py가 cp949 원자료를 검사해 UTF-8로 옮긴 것, SRC_LINE 포함)
- 원자료 22개 파일은 같은 22개 컬럼이다. 다른 점은 2024년부터 POOL_CO → POOL_CO_NM, 2021년부터 숫자 표기('1.0' → '1')뿐이다.

테이블
- movement      이동 한 줄(기기 한 종류) = 한 행. 원본 값은 *_raw로 그대로 두고, 정규화한 값을 따로 둔다.
- region_alias  원본 (시도명, 시군구명) → 지역 키 대응표 (출하지·도착지 공용)
- crop_alias    원본 품목명 → 표준 품목명 (2004~2005년 품종 단위 이름을 품목으로 묶는다)
- source_file   원본 파일별 줄 수·크기
- v_clean       분석용 보기: 수량 이상값(qty_flag <> 'ok')을 뺀 행
연도(year)는 상차일 기준이다. 파일마다 전년도 상차분이 0.01% 안팎 섞여 있고, 그 행은 전년도 파일에 없다(늦게 등록된 실적).
"""
import glob
import os
import re
import time

import duckdb

from regions import SIDOS, UNIT_KEYS, sido_code, unit_of

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "agri_distribution_data")
CLEAN = os.path.join(ROOT, "db", "clean")
DB = os.path.join(ROOT, "db", "logistics.duckdb")

# 수량 이상값: 이동 한 건에 2만 개 이상 (기기 종류 모두 99.99% 분위수의 3배 이상, 2017년 1,000,000·100,000 같은 입력값 포함)
EXTREME_QTY = 20000

# 시도 칸에 시군이 들어간 경우 → (시도 코드, 시군구 이름)
SIDO_FIX = {"수원시": ("31", "수원시"), "수원": ("31", "수원시"), "진주시": ("38", "진주시"),
            "충남당진군송악면": ("34", "당진시"), "인천시": ("23", None)}
# 옛 행정구역·줄임 표기 → 현행 시군구 이름
SGG_FIX = {"파주": "파주시", "고양": "고양시", "고창": "고창군", "달성": "달성군", "송파": "송파구",
           "청원군": "청주시", "포천군": "포천시", "화성군": "화성시", "여주군": "여주시", "당진군": "당진시",
           "남제주군": "서귀포시", "북제주군": "제주시", "마산시": "창원시", "진해시": "창원시"}
# 시도를 잘못 적은 경우 (시도 코드, 시군구) → 바른 시도 코드
SIDO_OF_SGG = {("35", "담양군"): "36", ("34", "연기군"): "29"}
CROP_FIX = {"단감부유": "단감", "서촌단감": "단감", "봄동배추": "봄동"}


def region_of(sido_nm, sgg_nm):
    """(시도명, 시군구명) → (시도 코드, 시군 키, 정규화한 시군구 이름, 방식)"""
    sido_nm = (sido_nm or "").strip()
    sgg = (sgg_nm or "").strip()
    if sido_nm in SIDO_FIX:
        s, fixed = SIDO_FIX[sido_nm]
        sgg = fixed or sgg
    else:
        s = sido_code(sido_nm)
    if not s:
        return None, None, sgg or None, "unknown"
    sgg = SGG_FIX.get(sgg, sgg)
    s = SIDO_OF_SGG.get((s, sgg), s)
    if s == "29":
        return s, "29|세종시", sgg, "unit"
    u = unit_of(s, sgg) if sgg else None
    if u and u[0] in UNIT_KEYS:
        return s, u[0], sgg, "unit"
    # 주소가 통째로 들어간 경우(예: '군위군효령면고곡리') 앞쪽 시군구 이름으로 다시 맞춘다
    m = re.match(r"^(.+?[시군구])", sgg)
    if m and m.group(1) != sgg:
        u = unit_of(s, m.group(1))
        if u and u[0] in UNIT_KEYS:
            return s, u[0], m.group(1), "prefix"
    return s, None, sgg or None, "sido"


def crop_std(name, names):
    if name is None:
        return None
    if name in CROP_FIX:
        return CROP_FIX[name]
    head = name.split(" ")[0]
    return head if " " in name and head in names else name


def main():
    t0 = time.time()
    if os.path.exists(DB):
        os.remove(DB)
    c = duckdb.connect(DB)
    c.sql("SET preserve_insertion_order=false")

    print("1) 원문 적재 (문자열 그대로)")
    c.sql(f"""CREATE TEMP TABLE raw AS
      SELECT CAST(regexp_extract(filename, '(\\d{{4}})\\.csv$', 1) AS SMALLINT) AS file_year, * EXCLUDE (filename)
      FROM read_csv('{CLEAN}/*.csv', all_varchar=true, header=true, delim=',', quote='', escape='',
                    strict_mode=true, filename=true)""")

    print("2) 지역·품목 대응표")
    pairs = c.sql("""SELECT DISTINCT LOAD_ETPS_CTNP_NM, LOAD_ETPS_SGGU_NM FROM raw
                     UNION SELECT DISTINCT UNLOAD_ETPS_CTNP_NM, UNLOAD_ETPS_SGGU_NM FROM raw""").fetchall()
    rows = []
    for sn, gn in pairs:
        s, key, sgg, how = region_of(sn, gn)
        label = f"{SIDOS[s]['short']} {sgg}" if s and sgg else (SIDOS[s]["short"] if s else None)
        rows.append((sn, gn, s, key, sgg, label, how))
    c.sql("""CREATE TABLE region_alias (sido_nm VARCHAR, sgg_nm VARCHAR, sido VARCHAR, region VARCHAR,
             sgg_std VARCHAR, place VARCHAR, how VARCHAR)""")
    c.executemany("INSERT INTO region_alias VALUES (?,?,?,?,?,?,?)", rows)
    names = {r[0] for r in c.sql("SELECT DISTINCT AGRI_NM FROM raw WHERE AGRI_NM IS NOT NULL").fetchall()}
    c.sql("CREATE TABLE crop_alias (crop_raw VARCHAR, crop VARCHAR)")
    c.executemany("INSERT INTO crop_alias VALUES (?,?)", [(n, crop_std(n, names)) for n in sorted(names)])

    print("3) movement 테이블")
    c.sql(f"""CREATE TABLE movement AS
      SELECT
        r.file_year,
        CAST(r.SRC_LINE AS INTEGER)                         AS src_line,
        r.MVMN_CODE                                         AS mvmn_code,
        CAST(CAST(r.MVMN_SN AS DOUBLE) AS SMALLINT)         AS mvmn_sn,
        CAST(strptime(r.LDCG_YMD, '%Y%m%d') AS DATE)        AS load_date,
        CAST(left(r.LDCG_YMD, 4) AS SMALLINT)               AS year,
        CAST(substr(r.LDCG_YMD, 5, 2) AS TINYINT)           AS month,
        CAST(strptime(r.UNLDCG_YMD, '%Y%m%d') AS DATE)      AS unload_date,
        r.LOAD_ETPS_TY_CODE                                 AS shipper_type_code,
        r.LOAD_ETPS_TY_NM                                   AS shipper_type,
        r.LOAD_ETPS_CTNP_NM                                 AS load_sido_raw,
        r.LOAD_ETPS_SGGU_NM                                 AS load_sgg_raw,
        la.sido                                             AS load_sido,
        la.region                                           AS load_region,
        r.VRSC_ISTN_CODE                                    AS agency_code,
        r.VRSC_ISTN_NM                                      AS agency,
        r.UNLOAD_ETPS_TY_CODE                               AS dest_type_code,
        r.UNLOAD_ETPS_TY_NM                                 AS dest_type,
        r.UNLOAD_ETPS_CTNP_NM                               AS dest_sido_raw,
        r.UNLOAD_ETPS_SGGU_NM                               AS dest_sgg_raw,
        ua.sido                                             AS dest_sido,
        ua.region                                           AS dest_region,
        ua.place                                            AS dest_place,
        r.POOL_CO                                           AS pool_co,
        r.LGTC_MCTL_CODE                                    AS equip_code,
        r.LGTC_MCTL_NM                                      AS equip_model,
        r.LGTC_MCTL_SE_NM                                   AS equip_type_raw,
        CASE r.LGTC_MCTL_SE_NM WHEN '팰릿' THEN '파렛트' ELSE r.LGTC_MCTL_SE_NM END AS equip_type,
        CAST(CAST(r.QYT AS DOUBLE) AS INTEGER)              AS qty,
        r.AGRI_CODE                                         AS crop_code,
        r.AGRI_NM                                           AS crop_raw,
        ca.crop                                             AS crop,
        CAST(strptime(r.ETL_LDG_DT, '%Y%m%d%H%M%S') AS TIMESTAMP) AS etl_loaded_at,
        CASE WHEN CAST(r.QYT AS DOUBLE) <= 0 THEN 'nonpositive'
             WHEN CAST(r.QYT AS DOUBLE) >= {EXTREME_QTY} THEN 'extreme'
             WHEN r.LGTC_MCTL_SE_NM IS NULL THEN 'no_equip'
             ELSE 'ok' END                                  AS qty_flag
      FROM raw r
      LEFT JOIN region_alias la ON la.sido_nm IS NOT DISTINCT FROM r.LOAD_ETPS_CTNP_NM AND la.sgg_nm IS NOT DISTINCT FROM r.LOAD_ETPS_SGGU_NM
      LEFT JOIN region_alias ua ON ua.sido_nm IS NOT DISTINCT FROM r.UNLOAD_ETPS_CTNP_NM AND ua.sgg_nm IS NOT DISTINCT FROM r.UNLOAD_ETPS_SGGU_NM
      LEFT JOIN crop_alias ca ON ca.crop_raw = r.AGRI_NM
      ORDER BY year, load_region, load_date""")

    print("4) 원본 파일 정보·보기")
    files = []
    for p in sorted(glob.glob(os.path.join(RAW, "*.csv"))):
        y = int(re.match(r"(\d{4})년", os.path.basename(p)).group(1))
        with open(p, "rb") as f:
            lines = sum(1 for _ in f) - 1
        files.append((y, os.path.basename(p), os.path.getsize(p), lines))
    c.sql("CREATE TABLE source_file (file_year SMALLINT, file_name VARCHAR, bytes BIGINT, data_lines INTEGER)")
    c.executemany("INSERT INTO source_file VALUES (?,?,?,?)", files)
    c.sql("CREATE VIEW v_clean AS SELECT * FROM movement WHERE qty_flag = 'ok'")
    c.sql("""COMMENT ON TABLE movement IS '물류기기 공동이용 이동 실적 2004~2025 (원본 1행 = 1행). year는 상차일 기준, qty_flag<>ok는 분석에서 뺀다.'""")
    c.close()
    print(f"완료 {DB} {os.path.getsize(DB) / 1e9:.2f}GB, {time.time() - t0:.0f}초")


if __name__ == "__main__":
    main()
