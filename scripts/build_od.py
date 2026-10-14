"""통합 DB(db/logistics.duckdb)에서 기종점(출발 시군 → 도착 시군) × 품목 × 판로 집계를 만들어 data/od.js로 저장한다.

기종점 분석 화면(od.html)이 쓴다. 화면에서 출발·도착·품목·판로로 걸러 비중을 계산하므로 원 단위 집계를 그대로 싣는다.
- 기준은 build_logistics.py와 같다: 컨테이너, 2005~최신 연도의 1~11월, 수량 이상값 제외(v_clean)
- 출발은 출하 주체 소재지(시군, 못 맞춘 행은 시도), 도착은 도착 업체 소재지(시군, 못 맞춘 행은 시도). 도착 시도도 모르는 행은 뺀다
- 지역 키는 data/geo.js의 현행 시군 단위('31|안성시'), 시도만 알면 '31'
값은 연도마다 열 배열 [출발, 도착, 품목, 판로, 수량]이고 출발·도착·품목·판로는 목록 번호다.
실행: python scripts/build_od.py
"""
import json
import os

import duckdb

from regions import ROOT

DB = os.path.join(ROOT, "db", "logistics.duckdb")
OUT = os.path.join(ROOT, "data", "od.js")
Y0 = 2005
DEST = ["대형유통센터", "종합유통센터", "도매시장", "식품가공공장"]  # build_logistics.py와 같은 순서, 나머지는 '기타'


def main():
    c = duckdb.connect(DB, read_only=True)
    rows = c.sql(f"""SELECT year, coalesce(load_region, load_sido) o, coalesce(dest_region, dest_sido) d,
        coalesce(crop, '미상') crop, dest_type, sum(qty) q
      FROM v_clean
      WHERE equip_type = '컨테이너' AND month <= 11 AND year >= {Y0}
        AND load_sido IS NOT NULL AND dest_sido IS NOT NULL
      GROUP BY ALL HAVING sum(qty) > 0""").fetchall()
    years = sorted({r[0] for r in rows})
    # 품목은 최근 5년 전국 이용량 순서 (화면 목록 순서)
    recent = {}
    for y, _, _, crop, _, q in rows:
        recent[crop] = recent.get(crop, 0) + (q if y > years[-1] - 5 else q * 1e-6)
    crops = sorted(recent, key=lambda k: -recent[k])
    regions = sorted({r[1] for r in rows} | {r[2] for r in rows})
    ri = {k: i for i, k in enumerate(regions)}
    ci = {k: i for i, k in enumerate(crops)}
    dtypes = DEST + ["기타"]
    ti = lambda t: DEST.index(t) if t in DEST else len(DEST)

    facts = {y: [[], [], [], [], []] for y in years}
    merged = {}
    for y, o, d, crop, t, q in rows:
        k = (y, ri[o], ri[d], ci[crop], ti(t))
        merged[k] = merged.get(k, 0) + int(q)
    for (y, o, d, cr, t), q in sorted(merged.items()):
        f = facts[y]
        for col, val in zip(f, (o, d, cr, t, q)):
            col.append(val)

    out = {
        "years": years,
        "regions": regions,
        "crops": crops,
        "dtypes": dtypes,
        "f": [facts[y] for y in years],
        "source": f"물류기기 공동이용 실적 {years[0]}~{years[-1]}년 (컨테이너, 해마다 1~11월)",
    }
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// 물류기기 공동이용 기종점 × 품목 × 판로 집계 (scripts/build_od.py) — 원자료·DB는 배포하지 않는다\n")
        f.write("window.AGRI_OD = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print("saved", OUT, os.path.getsize(OUT), "bytes,", len(merged), "rows,", len(regions), "regions,", len(crops), "crops")


if __name__ == "__main__":
    main()
