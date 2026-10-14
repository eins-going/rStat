"""통합 DB(db/logistics.duckdb)를 시군·시도·전국으로 집계해 data/logistics.js로 저장한다.

먼저 scripts/clean_raw.py → build_db.py → verify_db.py 를 실행해 DB를 만든다. 원자료·DB는 배포하지 않는다.
- 지역: 출하 주체(상차 업체) 소재지 기준. 생산지가 아니다.
- 기간: 2005~최신 연도, 해마다 1~11월 (최신 연도 자료가 11월까지라 같은 기간끼리 비교. 2004년은 4월부터라 뺀다)
- 수량: 물류기기 개수, 수량 이상값(이동 한 건 2만 개 이상·0 이하)은 뺀다 (DB 보기 v_clean)
- 구성 비율(판로·출하 주체·품목·풀 운영사)은 컨테이너(전체 수량의 90% 이상) 기준, 파렛트 운영사만 파렛트 기준
- 사업 예산 규모가 해마다 달라 절대량의 증감보다 전국 대비 비중·구성비를 중심으로 쓴다 (비중은 화면에서 계산)
비율은 천분율 정수(‰)로 저장한다. 값 배열은 years 순서이며, 그해 자료가 없으면 null.
실행: python scripts/build_logistics.py
"""
import json
import os
from collections import defaultdict

import duckdb

from regions import ROOT

DB = os.path.join(ROOT, "db", "logistics.duckdb")
OUT = os.path.join(ROOT, "data", "logistics.js")
Y0 = 2005
MONTHS = list(range(1, 12))
METRO = ("11", "23", "31")
TOP_CROPS = 10
TOP_PLACES = 6
RECENT = 5  # 품목·도착지 상위 목록을 고르는 최근 연수

# 구성 범주 (화면 색 순서와 같다. 목록에 없는 값은 '기타')
DEST = ["대형유통센터", "종합유통센터", "도매시장", "식품가공공장"]
SHIP = ["농업회사법인", "영농조합법인", "농협", "산지유통인", "조합공동사업법인"]
CPOOL = ["KCP", "NPC", "SJL", "KPN"]
PPOOL = ["KPP", "AJN", "SJL", "KPN"]


def main():
    c = duckdb.connect(DB, read_only=True)
    c.sql("SET preserve_insertion_order=false")
    years = list(range(Y0, c.sql("SELECT max(year) FROM movement").fetchone()[0] + 1))
    yi = {y: i for i, y in enumerate(years)}
    ny = len(years)
    # 행 하나를 시군·시도·전국 세 지역 키로 펼친다 (시군에 못 맞춘 행은 시도·전국에만)
    c.sql(f"""CREATE TEMP VIEW b AS
      SELECT k.key, m.* FROM v_clean m, unnest([m.load_region, m.load_sido, '00']) AS k(key)
      WHERE m.month <= 11 AND m.year >= {Y0} AND m.load_sido IS NOT NULL AND k.key IS NOT NULL""")
    c.sql("""CREATE TEMP TABLE con AS SELECT * FROM b WHERE equip_type = '컨테이너'""")

    v = defaultdict(lambda: {})
    arr = lambda: [None] * ny

    def put(key, field, year, value):
        d = v[key]
        if field not in d:
            d[field] = arr()
        d[field][yi[year]] = value

    print("규모")
    for key, y, cq, pq, n, nc in c.sql("""SELECT key, year, sum(qty) FILTER (WHERE equip_type='컨테이너'),
        sum(qty) FILTER (WHERE equip_type='파렛트'), count(DISTINCT mvmn_code),
        count(DISTINCT mvmn_code) FILTER (WHERE equip_type='컨테이너') FROM b GROUP BY 1, 2""").fetchall():
        put(key, "c", y, int(cq or 0))
        put(key, "p", y, int(pq or 0))
        put(key, "n", y, n)
        put(key, "nc", y, nc)

    equip = [r[0] for r in c.sql("SELECT equip_type FROM b WHERE key='00' GROUP BY 1 ORDER BY sum(qty) DESC").fetchall()]
    for key, y, e, q in c.sql("SELECT key, year, equip_type, sum(qty) FROM b GROUP BY 1, 2, 3").fetchall():
        d = v[key].setdefault("eq", [arr() for _ in equip])
        d[equip.index(e)][yi[y]] = int(q)

    print("월별")
    for key, y, mo, q in c.sql("SELECT key, year, month, sum(qty) FROM con GROUP BY 1, 2, 3").fetchall():
        d = v[key].setdefault("mon", [None] * ny)
        if d[yi[y]] is None:
            d[yi[y]] = [0] * len(MONTHS)
        d[yi[y]][mo - 1] = int(q)

    print("구성비")

    def shares(field, col, cats, table="con"):
        tot = {}
        rows = c.sql(f"SELECT key, year, {col}, sum(qty) FROM {table} GROUP BY 1, 2, 3").fetchall()
        for key, y, _, q in rows:
            tot[(key, y)] = tot.get((key, y), 0) + q
        for key, y, k, q in rows:
            d = v[key].setdefault(field, [arr() for _ in range(len(cats) + 1)])
            i = cats.index(k) if k in cats else len(cats)
            for j in range(len(cats) + 1):  # 자료가 있는 해에는 없는 범주를 0으로
                if d[j][yi[y]] is None:
                    d[j][yi[y]] = 0
            d[i][yi[y]] += q / tot[(key, y)] * 1000
        for key in v:
            for s in v[key].get(field, []):
                for j, x in enumerate(s):
                    if x is not None:
                        s[j] = round(x)

    shares("dest", "dest_type", DEST)
    shares("ship", "shipper_type", SHIP)
    shares("cpool", "pool_co", CPOOL)
    c.sql("CREATE TEMP TABLE pal AS SELECT * FROM b WHERE equip_type = '파렛트'")
    shares("ppool", "pool_co", PPOOL, "pal")

    for key, y, tot, metro, same in c.sql(f"""SELECT key, year, sum(qty),
        sum(qty) FILTER (WHERE dest_sido IN {METRO}), sum(qty) FILTER (WHERE dest_sido = load_sido) FROM con GROUP BY 1, 2""").fetchall():
        put(key, "metro", y, round((metro or 0) / tot * 1000))
        put(key, "same", y, None if key == "00" else round((same or 0) / tot * 1000))

    print("품목")
    # 품목 집중도(HHI, 0~10000)와 품목 수
    for key, y, hhi, ncrop in c.sql("""WITH s AS (SELECT key, year, crop, sum(qty) q FROM con GROUP BY 1, 2, 3)
        SELECT key, year, round(sum(power(q / t, 2)) * 10000), count(*) FROM
        (SELECT *, sum(q) OVER (PARTITION BY key, year) t FROM s) GROUP BY 1, 2""").fetchall():
        put(key, "hhi", y, int(hhi))
        put(key, "ncrop", y, ncrop)
    crop_rows = c.sql("SELECT key, crop, year, sum(qty) FROM con WHERE crop IS NOT NULL GROUP BY 1, 2, 3").fetchall()
    by_key = defaultdict(lambda: defaultdict(lambda: arr()))
    for key, crop, y, q in crop_rows:
        by_key[key][crop][yi[y]] = int(q)
    used = set()
    for key, crops in by_key.items():
        recent = lambda s: sum(x or 0 for x in s[-RECENT:])
        top = sorted(crops.items(), key=lambda kv: -recent(kv[1]))[:TOP_CROPS]
        v[key]["crops"] = [[name, s] for name, s in top if recent(s) > 0]
        used.update(name for name, _ in top)
    nation_crops = {name: by_key["00"][name] for name in sorted(used) if name in by_key["00"]}

    print("도착지")
    place_rows = c.sql("""SELECT key, dest_place, any_value(dest_region), year, sum(qty) FROM con
        WHERE dest_place IS NOT NULL GROUP BY 1, 2, 4""").fetchall()
    tot = {(k, y): q for k, y, q in c.sql("SELECT key, year, sum(qty) FROM con GROUP BY 1, 2").fetchall()}
    by_key = defaultdict(dict)
    for key, place, region, y, q in place_rows:
        p = by_key[key].setdefault(place, [region, arr()])
        p[1][yi[y]] = round(q / tot[(key, y)] * 1000)
    for key, places in by_key.items():
        recent = lambda s: sum(x or 0 for x in s[-RECENT:])
        top = sorted(places.items(), key=lambda kv: -recent(kv[1][1]))[:TOP_PLACES]
        v[key]["places"] = [[name, region, s] for name, (region, s) in top if recent(s) > 0]

    print("지역 간 이동")
    # 시도 × 시도 이동 행렬 (컨테이너, 해마다): od[연도][출발][도착]
    sidos = [r[0] for r in c.sql("SELECT load_sido FROM con WHERE key='00' GROUP BY 1 ORDER BY 1").fetchall()]
    si = {s: i for i, s in enumerate(sidos)}
    od = [[[0] * len(sidos) for _ in sidos] for _ in years]
    for y, o, d, q in c.sql("""SELECT year, load_sido, dest_sido, sum(qty) FROM con
        WHERE key='00' AND dest_sido IS NOT NULL GROUP BY 1, 2, 3""").fetchall():
        if d in si:
            od[yi[y]][si[o]][si[d]] = int(q)
    # 지역마다 도착 시도 분포 (‰, sidos 순서)
    for key, y, d, q in c.sql("SELECT key, year, dest_sido, sum(qty) FROM con WHERE dest_sido IS NOT NULL GROUP BY 1, 2, 3").fetchall():
        if d not in si:
            continue
        s = v[key].setdefault("dsido", [arr() for _ in sidos])
        for j in range(len(sidos)):
            if s[j][yi[y]] is None:
                s[j][yi[y]] = 0
        s[si[d]][yi[y]] = round(q / tot[(key, y)] * 1000)
    # 받는 곳 기준: 도착 지역 키(시군·시도·전국)로 펼쳐 유입량과 상위 출발 시군을 센다
    c.sql(f"""CREATE TEMP TABLE inflow AS
      SELECT k.key, m.year, m.load_region, m.load_sido, m.qty FROM v_clean m, unnest([m.dest_region, m.dest_sido, '00']) AS k(key)
      WHERE m.month <= 11 AND m.year >= {Y0} AND m.equip_type = '컨테이너' AND m.dest_sido IS NOT NULL
        AND m.load_sido IS NOT NULL AND k.key IS NOT NULL""")
    tin = {}
    for key, y, q, own in c.sql("""SELECT key, year, sum(qty),
        sum(qty) FILTER (WHERE load_sido = split_part(key, '|', 1)) FROM inflow GROUP BY 1, 2""").fetchall():
        put(key, "in", y, int(q))
        put(key, "inOwn", y, None if key == "00" else round((own or 0) / q * 1000))
        tin[(key, y)] = q
    by_key = defaultdict(dict)
    for key, origin, y, q in c.sql("""SELECT key, coalesce(load_region, load_sido), year, sum(qty) FROM inflow
        WHERE key <> '00' GROUP BY 1, 2, 3""").fetchall():
        by_key[key].setdefault(origin, arr())[yi[y]] = round(q / tin[(key, y)] * 1000)
    for key, origins in by_key.items():
        recent = lambda s: sum(x or 0 for x in s[-RECENT:])
        top = sorted(origins.items(), key=lambda kv: -recent(kv[1]))[:TOP_PLACES]
        v[key]["origins"] = [[o, s] for o, s in top if recent(s) > 0]

    # 최신 연도 자료가 없는 지역도 과거 자료는 남긴다
    out = {
        "years": years,
        "months": MONTHS,
        "cats": {"dest": DEST, "ship": SHIP, "cpool": CPOOL, "ppool": PPOOL, "equip": equip},
        "od": {"sidos": sidos, "m": od},
        "cropNation": nation_crops,
        "source": f"물류기기 공동이용 실적 {years[0]}~{years[-1]}년 (출하 주체 소재지 기준, 해마다 1~11월)",
        "v": dict(sorted(v.items())),
    }
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// 물류기기 공동이용 시군별 집계 (scripts/build_logistics.py) — 원자료·DB는 배포하지 않는다\n")
        f.write("window.AGRI_LOGI = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print("saved", OUT, os.path.getsize(OUT), "bytes,", len(v), "regions,", len(nation_crops), "crops")


if __name__ == "__main__":
    main()
