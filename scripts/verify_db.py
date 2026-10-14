"""통합 DB(db/logistics.duckdb)가 원자료 CSV와 같은지 점검한다.

원자료(cp949)를 DuckDB를 거치지 않고 Python으로 직접 읽어 파일마다 아래를 계산하고 DB와 맞춰 본다.
1. 행 수
2. 숫자 합계: QYT, MVMN_SN, 상차일·도착일(yyyymmdd 정수)
3. 문자 컬럼마다 전체 글자 수 합 (값이 하나라도 바뀌거나 빠지면 달라진다)
4. 기기 구분별 행 수·수량
5. 표본 행 대조: 파일마다 무작위 2,000줄을 원본 줄 번호(src_line)로 찾아 22개 값 모두 비교
그리고 정규화 결과(지역 매칭률, 이상값 표시)를 요약한다.
실행: python scripts/verify_db.py   (결과: db/verify_report.json, 하나라도 어긋나면 종료 코드 1)
"""
import glob
import json
import os
import random
import re
import sys
from collections import Counter, defaultdict
from concurrent.futures import ProcessPoolExecutor

import duckdb

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "agri_distribution_data")
DB = os.path.join(ROOT, "db", "logistics.duckdb")
SAMPLE = 2000

COLS = ["MVMN_CODE", "MVMN_SN", "LOAD_ETPS_TY_CODE", "LOAD_ETPS_TY_NM", "LOAD_ETPS_CTNP_NM", "LOAD_ETPS_SGGU_NM",
        "LDCG_YMD", "VRSC_ISTN_CODE", "VRSC_ISTN_NM", "UNLOAD_ETPS_TY_CODE", "UNLOAD_ETPS_TY_NM", "UNLOAD_ETPS_CTNP_NM",
        "UNLOAD_ETPS_SGGU_NM", "UNLDCG_YMD", "POOL_CO", "LGTC_MCTL_CODE", "LGTC_MCTL_NM", "LGTC_MCTL_SE_NM", "QYT",
        "AGRI_CODE", "AGRI_NM", "ETL_LDG_DT"]
# 원본 컬럼 → DB 컬럼 (문자 그대로 보관하는 것)
TEXT = {"MVMN_CODE": "mvmn_code", "LOAD_ETPS_TY_CODE": "shipper_type_code", "LOAD_ETPS_TY_NM": "shipper_type",
        "LOAD_ETPS_CTNP_NM": "load_sido_raw", "LOAD_ETPS_SGGU_NM": "load_sgg_raw", "VRSC_ISTN_CODE": "agency_code",
        "VRSC_ISTN_NM": "agency", "UNLOAD_ETPS_TY_CODE": "dest_type_code", "UNLOAD_ETPS_TY_NM": "dest_type",
        "UNLOAD_ETPS_CTNP_NM": "dest_sido_raw", "UNLOAD_ETPS_SGGU_NM": "dest_sgg_raw", "POOL_CO": "pool_co",
        "LGTC_MCTL_CODE": "equip_code", "LGTC_MCTL_NM": "equip_model", "LGTC_MCTL_SE_NM": "equip_type_raw",
        "AGRI_CODE": "crop_code", "AGRI_NM": "crop_raw"}


def num(s):
    return float(s) if s else 0.0


def scan(path):
    """원본 파일 한 개를 직접 읽어 점검값을 만든다"""
    year = int(re.match(r"(\d{4})년", os.path.basename(path)).group(1))
    n = 0
    sums = Counter()
    chars = Counter()
    equip = defaultdict(lambda: [0, 0.0])
    with open(path, "rb") as f:
        f.readline()
        for raw in f:
            v = raw.rstrip(b"\r\n").decode("cp949").split(",")
            d = dict(zip(COLS, v))
            n += 1
            sums["qty"] += num(d["QYT"])
            sums["sn"] += num(d["MVMN_SN"])
            sums["ld"] += int(d["LDCG_YMD"])
            sums["uld"] += int(d["UNLDCG_YMD"])
            for col in TEXT:
                chars[col] += len(d[col])
            e = equip[d["LGTC_MCTL_SE_NM"] or None]
            e[0] += 1
            e[1] += num(d["QYT"])
    # 표본 줄 (줄 번호는 헤더가 1)
    rng = random.Random(year)
    picks = set(rng.sample(range(2, n + 2), min(SAMPLE, n)))
    sample = {}
    with open(path, "rb") as f:
        for no, raw in enumerate(f, start=1):
            if no in picks:
                sample[no] = raw.rstrip(b"\r\n").decode("cp949").split(",")
    return {"year": year, "rows": n, "sums": dict(sums), "chars": dict(chars),
            "equip": {k: v for k, v in equip.items()}, "sample": sample}


def db_side(c, year):
    sel = ", ".join(f"coalesce(sum(length({db})), 0)" for db in TEXT.values())
    r = c.execute(f"""SELECT count(*), sum(qty), sum(mvmn_sn),
        sum(CAST(strftime(load_date, '%Y%m%d') AS BIGINT)), sum(CAST(strftime(unload_date, '%Y%m%d') AS BIGINT)), {sel}
        FROM movement WHERE file_year = ?""", [year]).fetchone()
    eq = {k: [n, q] for k, n, q in c.execute(
        "SELECT equip_type_raw, count(*), sum(qty) FROM movement WHERE file_year = ? GROUP BY 1", [year]).fetchall()}
    return {"rows": r[0], "sums": {"qty": r[1], "sn": r[2], "ld": r[3], "uld": r[4]},
            "chars": dict(zip(TEXT, r[5:])), "equip": eq}


def compare_sample(c, year, sample):
    rows = c.execute(f"""SELECT src_line, mvmn_code, mvmn_sn, shipper_type_code, shipper_type, load_sido_raw, load_sgg_raw,
        strftime(load_date, '%Y%m%d'), agency_code, agency, dest_type_code, dest_type, dest_sido_raw, dest_sgg_raw,
        strftime(unload_date, '%Y%m%d'), pool_co, equip_code, equip_model, equip_type_raw, qty, crop_code, crop_raw,
        strftime(etl_loaded_at, '%Y%m%d%H%M%S')
        FROM movement WHERE file_year = ? AND src_line IN (SELECT unnest(?))""", [year, list(sample)]).fetchall()
    bad = []
    for r in rows:
        src = sample[r[0]]
        got = list(r[1:])
        for i, (a, b) in enumerate(zip(src, got)):
            col = COLS[i]
            if col in ("MVMN_SN", "QYT"):
                ok = num(a) == (b or 0)
            else:
                ok = (a or None) == b
            if not ok:
                bad.append({"line": r[0], "col": col, "raw": a, "db": b})
    return len(rows), bad


def main():
    paths = sorted(glob.glob(os.path.join(RAW, "*.csv")))
    with ProcessPoolExecutor(max_workers=4) as ex:
        raws = list(ex.map(scan, paths))
    c = duckdb.connect(DB, read_only=True)
    report, fails = [], 0
    for r in raws:
        y = r["year"]
        d = db_side(c, y)
        checks = {
            "rows": r["rows"] == d["rows"],
            "qty": round(r["sums"]["qty"]) == d["sums"]["qty"],
            "mvmn_sn": round(r["sums"]["sn"]) == d["sums"]["sn"],
            "load_date": r["sums"]["ld"] == d["sums"]["ld"],
            "unload_date": r["sums"]["uld"] == d["sums"]["uld"],
            "text_chars": r["chars"] == d["chars"],
            "equip": {k: [v[0], round(v[1])] for k, v in r["equip"].items()} == {k: [v[0], v[1]] for k, v in d["equip"].items()},
        }
        n_s, bad = compare_sample(c, y, r["sample"])
        checks["sample"] = n_s == len(r["sample"]) and not bad
        ok = all(checks.values())
        fails += not ok
        line = f"{y}  행 {r['rows']:>9,} / DB {d['rows']:>9,}  수량 {round(r['sums']['qty']):>12,}  표본 {n_s}줄 불일치 {len(bad)}  " + \
               ("OK" if ok else "실패 " + ", ".join(k for k, v in checks.items() if not v))
        print(line)
        if not checks["text_chars"]:
            print("   글자수 차이:", {k: (r["chars"][k], d["chars"][k]) for k in TEXT if r["chars"][k] != d["chars"][k]})
        if bad:
            print("   표본 불일치 예:", bad[:5])
        report.append({"year": y, "rows_raw": r["rows"], "rows_db": d["rows"], "qty_raw": round(r["sums"]["qty"]),
                       "qty_db": d["sums"]["qty"], "sample": n_s, "sample_bad": len(bad), "checks": checks})

    print("\n정규화 요약 (상차 연도 기준)")
    summary = c.sql("""SELECT year, count(*) n,
        round(100.0 * count(load_region) / count(*), 2) AS load_unit_pct,
        round(100.0 * count(load_sido) / count(*), 2) AS load_sido_pct,
        round(100.0 * count(dest_sido) / count(*), 2) AS dest_sido_pct,
        count(*) FILTER (WHERE qty_flag = 'extreme') AS extreme_n,
        sum(qty) FILTER (WHERE qty_flag = 'extreme') AS extreme_qty,
        round(100.0 * sum(qty) FILTER (WHERE qty_flag = 'extreme') / sum(qty), 2) AS extreme_pct,
        count(*) FILTER (WHERE qty_flag = 'nonpositive') AS nonpos_n,
        count(*) FILTER (WHERE qty_flag = 'no_equip') AS no_equip_n
        FROM movement GROUP BY 1 ORDER BY 1""").df()
    print(summary.to_string(index=False))
    with open(os.path.join(ROOT, "db", "verify_report.json"), "w", encoding="utf-8") as f:
        json.dump({"files": report, "normalize": summary.to_dict("records")}, f, ensure_ascii=False, indent=1, default=str)
    print("\n결과:", "모두 일치" if not fails else f"{fails}개 파일 불일치")
    sys.exit(1 if fails else 0)


if __name__ == "__main__":
    main()
