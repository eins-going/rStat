"""통합 DB(db/logistics.duckdb)에서 기종점(출발 시군 → 도착 시군) × 품목 × 판로 × 출하 주체 집계를 물류기기별로 만든다.

기종점 분석 화면(od.html)이 쓴다. 화면에서 출발·도착·품목·판로·출하 주체로 걸러 비중을 계산하므로 원 단위 집계를 그대로 싣는다.
- data/od.js: 공통 목록(연도·지역·품목·판로·출하 주체·기기)과 컨테이너 집계. 첫 화면은 이 파일만 읽는다
- data/od_<기기>.js: 나머지 기기 집계. 화면에서 그 기기를 고를 때 불러온다
- 기기마다 수량 단위(기기 개수)가 달라 기기끼리 더하지 않는다
- 기준은 build_logistics.py와 같다: 2005~최신 연도의 1~11월, 수량 이상값 제외(v_clean)
- 출발은 출하 주체 소재지(시군, 못 맞춘 행은 시도), 도착은 도착 업체 소재지(시군, 못 맞춘 행은 시도). 도착 시도도 모르는 행은 뺀다
- 지역 키는 data/geo.js의 현행 시군 단위('31|안성시'), 시도만 알면 '31'
값은 연도마다 열 배열 [출발, 도착, 품목, 판로, 출하 주체, 수량]이고 수량 말고는 목록 번호다.
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
SHIP = ["농업회사법인", "영농조합법인", "농협", "산지유통인", "조합공동사업법인"]  # build_logistics.py와 같은 순서, 나머지는 '기타'
# 기기 이름과 파일 이름. 첫 기기(컨테이너)는 data/od.js에 함께 싣는다
EQUIP = [("컨테이너", None), ("파렛트", "pallet"), ("다단식목재상자", "woodbox"), ("상자형파렛트", "boxpallet"),
         ("옥타곤상자", "octagon"), ("와이어매시", "wiremesh"), ("팰릿철상자", "steelbox")]
HEAD = "// 물류기기 공동이용 기종점 × 품목 × 판로 × 출하 주체 집계 (scripts/build_od.py) — 원자료·DB는 배포하지 않는다\n"


def main():
    c = duckdb.connect(DB, read_only=True)
    rows = c.sql(f"""SELECT equip_type, year, coalesce(load_region, load_sido) o, coalesce(dest_region, dest_sido) d,
        coalesce(crop, '미상') crop, dest_type, shipper_type, sum(qty) q
      FROM v_clean
      WHERE month <= 11 AND year >= {Y0} AND load_sido IS NOT NULL AND dest_sido IS NOT NULL
      GROUP BY ALL HAVING sum(qty) > 0""").fetchall()
    names = [n for n, _ in EQUIP]
    unknown = {r[0] for r in rows} - set(names)
    assert not unknown, f"EQUIP에 없는 기기: {unknown}"
    years = sorted({r[1] for r in rows})
    # 품목은 최근 5년 컨테이너 전국 이용량 순서, 컨테이너에 없는 품목은 뒤에 (화면 목록 순서)
    recent = {}
    for e, y, _, _, crop, _, _, q in rows:
        w = 1 if e == names[0] else 1e-9
        recent[crop] = recent.get(crop, 0) + q * w * (1 if y > years[-1] - 5 else 1e-6)
    crops = sorted(recent, key=lambda k: -recent[k])
    regions = sorted({r[2] for r in rows} | {r[3] for r in rows})
    ri = {k: i for i, k in enumerate(regions)}
    ci = {k: i for i, k in enumerate(crops)}
    dtypes = DEST + ["기타"]
    ti = lambda t: DEST.index(t) if t in DEST else len(DEST)
    stypes = SHIP + ["기타"]
    si = lambda t: SHIP.index(t) if t in SHIP else len(SHIP)

    merged = {}
    for e, y, o, d, crop, t, st, q in rows:
        k = (e, y, ri[o], ri[d], ci[crop], ti(t), si(st))
        merged[k] = merged.get(k, 0) + int(q)
    facts = {n: {y: [[], [], [], [], [], []] for y in years} for n in names}
    for (e, y, o, d, cr, t, sh), q in sorted(merged.items()):
        for col, val in zip(facts[e][y], (o, d, cr, t, sh, q)):
            col.append(val)
    equips = []
    for n, code in EQUIP:
        ys = [y for y in years if facts[n][y][5]]
        equips.append({"name": n, "file": code and f"od_{code}.js", "from": ys[0], "to": ys[-1]})
        if code:
            path = os.path.join(ROOT, "data", f"od_{code}.js")
            with open(path, "w", encoding="utf-8") as f:
                f.write(HEAD)
                f.write(f"(window.AGRI_OD_EQ = window.AGRI_OD_EQ || {{}})[{json.dumps(n, ensure_ascii=False)}] = ")
                json.dump([facts[n][y] for y in years], f, separators=(",", ":"))
                f.write(";\n")
            print("saved", path, os.path.getsize(path), "bytes")

    out = {
        "years": years,
        "regions": regions,
        "crops": crops,
        "dtypes": dtypes,
        "stypes": stypes,
        "equips": equips,
        "f": [facts[names[0]][y] for y in years],
        "source": f"물류기기 공동이용 실적 {years[0]}~{years[-1]}년 (해마다 1~11월)",
    }
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(HEAD)
        f.write("window.AGRI_OD = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print("saved", OUT, os.path.getsize(OUT), "bytes,", len(merged), "rows (all equipment),", len(regions), "regions,", len(crops), "crops")


if __name__ == "__main__":
    main()
