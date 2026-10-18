"""물류동향 화면(flow.html)의 월별 흐름 자료: db/logistics.duckdb → data/flow_mon.js

기종점 집계(data/od.js, build_od.py)에는 달이 없어 계절성을 따로 싣는다.
- 기기: 컨테이너·파렛트 (나머지 기기는 물량이 적어 월별 모양이 흔들린다)
- 방향: o 보낸 쪽(출하 주체 소재지) · d 받은 쪽(도착 업체 소재지). 지역 키는 od.js와 같다(시군, 못 맞추면 시도)
  시도 키('31')는 그 시도의 모든 행, '00'은 전국
- 최근 6개 연도, 1~11월 (build_logistics.py·build_od.py와 같은 기준: v_clean, 해마다 1~11월)
- 값: 연도마다 [그해 1~11월 합계, 1월 ‰, …, 11월 ‰] (‰ 합은 약 1000). 없으면 null
실행: python scripts/build_flow.py
"""
import collections
import json
import os

import duckdb

from regions import ROOT

DB = os.path.join(ROOT, "db", "logistics.duckdb")
OUT = os.path.join(ROOT, "data", "flow_mon.js")
EQUIPS = ["컨테이너", "파렛트"]
N_YEARS = 6


def main():
    c = duckdb.connect(DB, read_only=True)
    last = c.sql("SELECT max(year) FROM v_clean WHERE month <= 11").fetchone()[0]
    years = list(range(last - N_YEARS + 1, last + 1))
    data = {"years": years, "equips": EQUIPS, "o": {}, "d": {}}
    for side, reg, sido in (("o", "load_region", "load_sido"), ("d", "dest_region", "dest_sido")):
        rows = c.sql(f"""SELECT equip_type, year, month, coalesce({reg}, {sido}) AS k, {sido} AS s, sum(qty) AS q
            FROM v_clean
            WHERE month <= 11 AND year >= {years[0]} AND equip_type IN ({",".join("'" + e + "'" for e in EQUIPS)})
              AND {sido} IS NOT NULL
            GROUP BY ALL""").fetchall()
        acc = collections.defaultdict(lambda: [0] * 11)
        for e, y, m, k, s, q in rows:
            for key in {k, s, "00"}:
                acc[(e, key, y)][m - 1] += q
        out = {e: {} for e in EQUIPS}
        for (e, key, y), mon in acc.items():
            tot = sum(mon)
            if tot <= 0:
                continue
            arr = out[e].setdefault(key, [None] * len(years))
            arr[years.index(y)] = [int(tot), *[round(v / tot * 1000) for v in mon]]
        data[side] = out
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write("// 물류기기 공동이용 월별 흐름 모양 (scripts/build_flow.py) — 연도마다 [1~11월 합계, 월별 ‰]\n")
        fh.write("window.AGRI_FLOW_MON = ")
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
        fh.write(";\n")
    n = {s: {e: len(data[s][e]) for e in EQUIPS} for s in ("o", "d")}
    print(f"data/flow_mon.js {os.path.getsize(OUT) / 1e3:.0f}KB · {years[0]}~{years[-1]} · 지역 수 {n}")


if __name__ == "__main__":
    main()
