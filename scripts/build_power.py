"""db/kepco.duckdb(scripts/fetch_kepco.py) → data/power.js — 농사용 전력 모니터(power.html) 자료.

지역 키는 통계 페이지와 같다: '00' 전국, '31' 시도, '31|수원시' 시군(일반시의 구는 시, 광역시의 구는 '○○시부').
시도 값은 현재 행정구역 기준 시군 합이다(군위군은 2010년부터 대구). 전국은 한전 전국 합계(totData).

값 (월별 배열, months 순서)
- k 사용량(MWh) · c 고객호수 · w 계약전력(kW, 2010년 등 일부 달은 비어 있다)
- n 신설 · e 증설 · x 해지 (산업분류 농업·임업·어업 고객 증감, 건). 한전에 자료가 없는 달은 비어 있다
- gap 원자료에서 그 지역의 시군구 행이 직전 12개월보다 적게 온 달 (예: 2026년 7월 인천 행정구역 개편 뒤 서구·검단구 누락)
  → 증감·이상 신호에서 뺀다.
계절 유형: 최근 3개 완결 연도의 월별 사용량을 그해 평균으로 나눈 값(×100)의 평균. 검침월 기준.
실행: python scripts/build_power.py
"""
import collections
import json
import os
import time

import duckdb

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB = os.path.join(ROOT, "db", "kepco.duckdb")
OUT = os.path.join(ROOT, "data", "power.js")

# 계절 유형: 진폭(최대/최소)이 작으면 평탄형, 아니면 가장 높은 계절
TYPES = ["겨울형", "여름형", "가을형", "평탄형"]
FLAT_AMP = 1.35
SEASONS = {"겨울형": (11, 0, 1), "여름형": (6, 7, 8), "가을형": (9, 10)}  # 0 = 1월


def season(prof):
    amp = max(prof) / min(prof)
    if amp < FLAT_AMP:
        return 3, amp
    means = {t: sum(prof[m] for m in ms) / len(ms) for t, ms in SEASONS.items()}
    return TYPES.index(max(means, key=means.get)), amp


def main():
    c = duckdb.connect(DB, read_only=True)
    months = [f"{y}-{m:02d}" for y, m in c.sql(
        "SELECT DISTINCT year, month FROM farm_power ORDER BY 1, 2").fetchall()]
    N = len(months)
    pos = {m: i for i, m in enumerate(months)}
    v = collections.defaultdict(dict)

    def put(key, field, ym, val):
        arr = v[key].setdefault(field, [None] * N)
        arr[pos[ym]] = val

    def mwh(kwh):
        return None if kwh is None else round(kwh / 1000)

    # 시군·시도: 현재 행정구역 기준으로 묶는다
    q = """SELECT printf('%d-%02d', year, month) AS ym, {key} AS key, sum(cust), sum(kwh), sum(kw), count(*)
           FROM farm_power WHERE region IS NOT NULL GROUP BY ALL"""
    rows_n = collections.defaultdict(dict)
    for key_sql in ("region", "split_part(region, '|', 1)"):
        for ym, key, cust, kwh, kw, n in c.sql(q.format(key=key_sql)).fetchall():
            put(key, "c", ym, cust)
            put(key, "k", ym, mwh(kwh))
            put(key, "w", ym, kw)
            rows_n[key][ym] = n
    for y, m, cust, kwh, kw in c.sql("SELECT year, month, cust, kwh, kw FROM farm_power_total").fetchall():
        ym = f"{y}-{m:02d}"
        put("00", "c", ym, cust)
        put("00", "k", ym, mwh(kwh))
        put("00", "w", ym, kw)

    q = """SELECT printf('%d-%02d', year, month) AS ym, {key} AS key, sum(new), sum(expansion), sum(cancel)
           FROM agri_cust_change WHERE region IS NOT NULL GROUP BY ALL"""
    for key_sql in ("region", "split_part(region, '|', 1)", "'00'"):
        for ym, key, n, e, x in c.sql(q.format(key=key_sql)).fetchall():
            if ym in pos:
                put(key, "n", ym, n)
                put(key, "e", ym, e)
                put(key, "x", ym, x)

    # 증감은 시도마다 부르는데 한전에 자료가 없는 달이 있다(2017년 8~11월, 2021년 7월~2022년 3월 등 HTTP 404).
    # 전국 값은 시도가 16곳 이상 온 달만 남긴다 (시군·시도는 자료가 없으면 원래 비어 있다)
    for ym, n_sido in c.sql("""SELECT printf('%d-%02d', year, month), count(DISTINCT split_part(region, '|', 1))
                               FROM agri_cust_change GROUP BY ALL""").fetchall():
        if ym in pos and n_sido < 16:
            for f in ("n", "e", "x"):
                v["00"][f][pos[ym]] = None

    # 원자료 행이 빠진 달: 직전 12개월의 최대 행 수보다 적으면 표시
    gaps = {}
    for key, d in rows_n.items():
        g = []
        for i, ym in enumerate(months):
            prev = [d.get(months[j], 0) for j in range(max(0, i - 12), i)]
            if ym in d and prev and d[ym] < max(prev):
                g.append(i)
        if g:
            gaps[key] = g

    # 계절 유형: 최근 3개 완결 연도
    full_years = sorted(y for y in {m[:4] for m in months} if all(f"{y}-{mm:02d}" in pos for mm in range(1, 13)))
    years = full_years[-3:]
    seasons = {}
    for key, d in v.items():
        k = d.get("k")
        if not k:
            continue
        profs = []
        for y in years:
            vals = [k[pos[f"{y}-{mm:02d}"]] for mm in range(1, 13)]
            if None in vals or not sum(vals):
                continue
            mean = sum(vals) / 12
            profs.append([x / mean for x in vals])
        if not profs:
            continue
        prof = [sum(p[i] for p in profs) / len(profs) for i in range(12)]
        if min(prof) <= 0:
            continue
        t, amp = season(prof)
        seasons[key] = [t, round(amp * 100), *[round(x * 100) for x in prof]]

    built = time.strftime("%Y-%m-%d")
    data = {"built": built, "months": months, "types": TYPES, "seasonYears": [int(years[0]), int(years[-1])],
            "flatAmp": FLAT_AMP, "v": v, "season": seasons, "gap": gaps}
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write("// 한전 전력데이터 개방포털 농사용 전력·농업 고객 증감 (scripts/fetch_kepco.py → scripts/build_power.py)\n")
        fh.write("window.AGRI_POWER = ")
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
        fh.write(";\n")
    cnt = collections.Counter(TYPES[s[0]] for k, s in seasons.items() if "|" in k)
    print(f"data/power.js {os.path.getsize(OUT) / 1e6:.2f}MB · {months[0]}~{months[-1]} · 지역 {len(v)} · "
          f"계절 유형(시군, {years[0]}~{years[-1]}) {dict(cnt)} · 자료 빠진 지역 {len(gaps)}")


if __name__ == "__main__":
    main()
