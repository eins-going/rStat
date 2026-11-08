"""db/raw/kosis_rice·db/raw/krei → data/rice.js — 벼 작황(rice.html) 자료.

원자료
- KOSIS 논벼 생산량(DT_1ET0034): db/raw/kosis_rice/dt_1et0034.csv (year, code, name, item, value)
  item: 재배면적(ha) · 10a당 생산량(kg, 정곡) · 생산량(톤, 정곡). 전국·시도 1980~, 시군 1996~
- KREI 쌀 관측 전망 + 통계청(국가데이터처) 예상생산량: db/raw/krei/krei_rice_outlook.csv

지역 키는 다른 화면과 같다: '00' 전국, '31' 시도, '31|수원시' 시군(현행 시군, data/geo.js).
- 시군: 현행 단위로 합친다(청원군→청주시, 마산·진해→창원시, 연기군→세종시, 군위군→대구). 합친 해의 단수는 생산량÷면적으로 다시 계산
- 시도: KOSIS 시도 행(그해 행정구역 기준). 시도 행이 없는 해(2026 전남광주통합특별시 등)는 시군 합으로 채운다
- '통합' 이름 행은 쓰지 않는다(fetch_data.region_map과 같은 처리)

값 (years 순서 배열, 없으면 null)
- a 재배면적(ha) · y 10a당 생산량(kg) · p 생산량(톤)
- n 평년 단수: 직전 5년 중 최고·최저를 뺀 3년 평균(올림픽 평균, 5년 모두 있을 때) · d 평년 대비(%)

전망(outlook)
- stat: 통계청 10월 예상(단수·생산량·면적·발표일) · krei: 통계청 예상 발표 전 마지막 KREI 전망(범위 가운데 값)
- kreiAll: 그해 KREI 발표 전부 · final: 확정치(KOSIS 전국) · pending: 확정 발표 대기
- err: 기관별 오차(전망 − 확정, kg/10a). 요약은 KREI가 9월 하순 전망을 낸 2013년부터의 공통 기간

위성 생육(ndvi): db/clean/rice/modis_curves.csv (level sigun/sido/nation, sido 이름, sigun 이름, y, doy, ndvi, n 논 격자 수)
  MODIS 250m 논 격자(팜맵 논 70% 이상) 평균 NDVI, 8일 간격 합성 시작일(doy). 빈 합성은 행이 없다(2025년 7~10월 등)
  ndvi: {
    src, years: [2000, …], doy: [113, 121, …, 305],
    v: {"36|해남군": [[…doy 순 NDVI×1000, 없으면 null…], …years 순…]},  # 광역시 구는 '○○시부'로 격자 수 가중 평균
    cells: {"36|해남군": 논 격자 수(연도·합성 중앙값)}
  }
  격자 수가 CELL_MIN 미만인 시군은 넣지 않는다. 평년 곡선(직전 5년 doy별 평균·범위)은 화면에서 계산한다
실행: python scripts/build_rice.py
"""
import csv
import json
import os
import time
from collections import defaultdict

from regions import SIDOS, UNIT_KEYS, sido_code, unit_of

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KOSIS = os.path.join(ROOT, "db", "raw", "kosis_rice", "dt_1et0034.csv")
KREI = os.path.join(ROOT, "db", "raw", "krei", "krei_rice_outlook.csv")
MODIS = os.path.join(ROOT, "db", "clean", "rice", "modis_curves.csv")
OUT = os.path.join(ROOT, "data", "rice.js")
CELL_MIN = 8  # 논 격자가 이보다 적은 시군은 생육 곡선을 싣지 않는다

# 확정 발표를 기다리는 해 (KOSIS에 그해 전국 값이 들어오면 저절로 빠진다)
PENDING = {2026: "2026-11-13"}
ERR_FROM = 2013  # 정확도 요약 기간 시작
ITEM = {"재배면적": "a", "10a당 생산량": "y", "생산량": "p"}
OLD = {"청원군": "청주시", "마산시": "창원시", "진해시": "창원시", "연기군": "세종시"}


def num(s):
    try:
        return float(str(s).replace(",", ""))
    except (TypeError, ValueError):
        return None


def unit_key(code, name):
    """KOSIS 시군 행 → 현행 시군 키 (없으면 None)"""
    name = OLD.get(name.strip(), name.strip())
    if name == "세종시":
        return "29|세종시"
    sido = code[:2]
    if sido in SIDOS:
        u = unit_of(sido, name)
        if u and u[0] in UNIT_KEYS:
            return u[0]
    # 시도 코드가 바뀐 행(통합 특별시 등): 이름이 한 곳에만 있으면 그 시군
    hit = [k for k in UNIT_KEYS if k.split("|")[1] == name]
    return hit[0] if len(hit) == 1 else None


def olympic(vals):
    if len(vals) < 5 or any(v is None for v in vals):
        return None
    s = sorted(vals)
    return sum(s[1:4]) / 3


def build_ndvi():
    """MODIS 논 NDVI 곡선 → {src, years, doy, v, cells} (파일이 없으면 None)"""
    if not os.path.exists(MODIS):
        return None
    acc = defaultdict(lambda: [0.0, 0])  # (키, 연도, doy) → [Σndvi×n, Σn]
    cells = defaultdict(list)
    for r in csv.DictReader(open(MODIS, encoding="utf-8")):
        lv, nd, n = r["level"], num(r["ndvi"]), int(num(r["n"]) or 0)
        if nd is None or n <= 0:
            continue
        if lv == "nation":
            key = "00"
        elif lv == "sido":
            key = sido_code(r["sido"])
        else:
            sc = sido_code(r["sido"])
            if sc == "29":
                key = "29|세종시"
            else:
                u = unit_of(sc, r["sigun"]) if sc else None
                key = u[0] if u and u[0] in UNIT_KEYS else None
        if not key:
            continue
        k = (key, int(r["y"]), int(r["doy"]))
        acc[k][0] += nd * n
        acc[k][1] += n
    for (key, y, d), (s_, n) in acc.items():
        cells[key].append(n)
    med = {k: sorted(v)[len(v) // 2] for k, v in cells.items()}
    keep = {k for k, m in med.items() if "|" not in k or m >= CELL_MIN}
    years = sorted({y for _, y, _ in acc})
    doys = sorted({d for _, _, d in acc})
    Yx, Dx = {y: i for i, y in enumerate(years)}, {d: i for i, d in enumerate(doys)}
    v = {k: [[None] * len(doys) for _ in years] for k in keep}
    for (key, y, d), (s_, n) in acc.items():
        if key in keep:
            v[key][Yx[y]][Dx[d]] = round(s_ / n * 1000)
    dropped = sorted(k for k in med if k not in keep)
    print(f"ndvi: 지역 {len(v)} · {years[0]}~{years[-1]} · doy {doys[0]}~{doys[-1]} · 격자 {CELL_MIN}개 미만 뺌 {len(dropped)}")
    return {"src": "MODIS 250m 논 격자(팜맵 논 70% 이상)", "years": years, "doy": doys, "cellMin": CELL_MIN,
            "v": dict(sorted(v.items())), "cells": dict(sorted((k, med[k]) for k in keep))}


def main():
    rows = list(csv.DictReader(open(KOSIS, encoding="utf-8")))
    years = sorted({int(r["year"]) for r in rows})
    Y = {y: i for i, y in enumerate(years)}
    N = len(years)
    sido_raw = defaultdict(lambda: defaultdict(dict))   # key → field → year → value
    unit_sum = defaultdict(lambda: defaultdict(lambda: defaultdict(float)))  # key → year → field → 합
    unit_n = defaultdict(lambda: defaultdict(int))
    unmatched = set()
    for r in rows:
        code, name, f, v, y = r["code"].strip(), r["name"].strip(), ITEM.get(r["item"]), num(r["value"]), int(r["year"])
        if f is None or v is None or "통합" in name:
            continue
        if len(code) <= 2:
            key = "00" if code in ("00", "0") or name == "전국" else code
            if key != "00" and key not in SIDOS:
                continue
            sido_raw[key][f][y] = v
        else:
            key = unit_key(code, name)
            if not key:
                unmatched.add(name)
                continue
            unit_sum[key][y][f] += v
            if f == "a":
                unit_n[key][y] += 1

    v = {}

    def put(key, a, yv, p):
        v[key] = {"a": a, "y": yv, "p": p}

    for key, by in unit_sum.items():
        a, yv, p = [None] * N, [None] * N, [None] * N
        for y, d in by.items():
            i = Y[y]
            if d.get("a"):
                a[i] = round(d["a"], 1)
                p[i] = round(d.get("p", 0))
                # 한 행이면 KOSIS 단수, 여러 행을 합친 해는 생산량÷면적
                yv[i] = round(d["p"] / d["a"] * 100, 1) if unit_n[key][y] > 1 else round(d.get("y", 0), 1) or None
        put(key, a, yv, p)
    for key, by in sido_raw.items():
        a = [round(by["a"].get(y), 1) if by["a"].get(y) is not None else None for y in years]
        yv = [round(by["y"].get(y), 1) if by["y"].get(y) is not None else None for y in years]
        p = [round(by["p"].get(y)) if by["p"].get(y) is not None else None for y in years]
        put(key, a, yv, p)
    # 시도 행이 없는 해는 시군 합으로 채운다
    for s in SIDOS:
        cur = v.setdefault(s, {"a": [None] * N, "y": [None] * N, "p": [None] * N})
        for i in range(N):
            if cur["a"][i] is not None:
                continue
            parts = [v[k] for k in v if "|" in k and k.startswith(s + "|") and v[k]["a"][i]]
            if parts:
                A = sum(x["a"][i] for x in parts)
                P = sum(x["p"][i] or 0 for x in parts)
                cur["a"][i], cur["p"][i], cur["y"][i] = round(A, 1), round(P), round(P / A * 100, 1) if A else None
    # 세종은 시도가 곧 시군: 2016년부터는 시도 행, 그 전은 연기군
    if "29" in sido_raw:
        u = v.setdefault("29|세종시", {"a": [None] * N, "y": [None] * N, "p": [None] * N})
        for f in ("a", "y", "p"):
            u[f] = [s if s is not None else x for s, x in zip(v["29"][f], u[f])]
    # 빈 지역은 뺀다
    v = {k: d for k, d in v.items() if any(x is not None for x in d["a"])}
    # 평년·평년 대비
    for d in v.values():
        n, dv = [None] * N, [None] * N
        for i, y in enumerate(years):
            prev = [d["y"][Y[y - j]] if (y - j) in Y else None for j in range(1, 6)]
            o = olympic(prev)
            if o:
                n[i] = round(o, 1)
                if d["y"][i]:
                    dv[i] = round((d["y"][i] / o - 1) * 100, 2)
        d["n"], d["d"] = n, dv

    # ---------- 전망 ----------
    nat = v["00"]
    final = {y: nat["y"][Y[y]] for y in years if nat["y"][Y[y]]}
    out_rows = list(csv.DictReader(open(KREI, encoding="utf-8")))
    by_year = defaultdict(list)
    for r in out_rows:
        by_year[int(r["year"])].append(r)
    outlook = {}
    err = {"stat": [], "krei": []}

    def point(r):
        lo, hi = num(r["yield_lo"]), num(r["yield_hi"])
        if lo is None and hi is None:
            return num(r["yield_kg_10a"])
        lo, hi = lo if lo is not None else hi, hi if hi is not None else lo
        return round((lo + hi) / 2, 1)

    for y in sorted(by_year):
        rs = sorted(by_year[y], key=lambda r: r["release_date"])
        st = next((r for r in rs if r["source_org"] == "통계청"), None)
        kr = [r for r in rs if r["source_org"] == "KREI"]
        cut = st["release_date"] if st else "9999"
        pre = [r for r in kr if r["release_date"] < cut]
        main_k = pre[-1] if pre else None
        o = {}
        if st:
            o["stat"] = {"y": num(st["yield_kg_10a"]), "p": num(st["production_ton"]), "a": num(st["area_ha"]),
                         "date": st["release_date"]}
        if main_k:
            o["krei"] = {"y": point(main_k), "lo": num(main_k["yield_lo"]), "hi": num(main_k["yield_hi"]),
                         "date": main_k["release_date"], "rel": main_k["release"]}
        o["kreiAll"] = [{"y": point(r), "lo": num(r["yield_lo"]), "hi": num(r["yield_hi"]), "date": r["release_date"],
                         "rel": r["release"]} for r in kr]
        f = final.get(y)
        o["final"] = f
        if y in PENDING and not f:
            o["pending"] = PENDING[y]
        if f:
            for org in ("stat", "krei"):
                if o.get(org, {}).get("y"):
                    e = round(o[org]["y"] - f, 1)
                    o[org]["err"] = e
                    err[org].append([y, e])
        outlook[str(y)] = o

    def summary(lst):
        xs = [e for y, e in lst if y >= ERR_FROM]
        if not xs:
            return None
        return {"n": len(xs), "mae": round(sum(abs(e) for e in xs) / len(xs), 1),
                "bias": round(sum(xs) / len(xs), 1), "rmse": round((sum(e * e for e in xs) / len(xs)) ** 0.5, 1),
                "max": max(xs, key=abs)}

    # 평년값을 전망으로 썼다면(기준선): 같은 기간 확정치 대비 오차
    base = [[y, round(nat["n"][Y[y]] - final[y], 1)] for y in years if y >= ERR_FROM and y in final and nat["n"][Y[y]]]
    acc = {"from": ERR_FROM, "stat": summary(err["stat"]), "krei": summary(err["krei"]), "norm": summary(base),
           "years": {"stat": err["stat"], "krei": err["krei"], "norm": base}}

    data = {
        "built": time.strftime("%Y-%m-%d"),
        "years": years,
        "unitFrom": 1996,
        "v": dict(sorted(v.items())),
        "outlook": outlook,
        "acc": acc,
        "ndvi": build_ndvi(),  # 위성 생육 곡선 (형식은 이 파일 머리 주석)
    }
    with open(OUT, "w", encoding="utf-8") as fh:
        fh.write("// KOSIS 논벼 생산량(시군·시도·전국) + KREI 쌀 관측 전망 + 통계청 예상생산량 (scripts/build_rice.py)\n")
        fh.write("// ndvi: MODIS 논 NDVI 곡선 {src, years, doy, v:{키:[[연도별 doy순 NDVI×1000]]}, cells:{키:논 격자 수}}\n")
        fh.write("window.AGRI_RICE = ")
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
        fh.write(";\n")
    units = [k for k in v if "|" in k]
    print(f"data/rice.js {os.path.getsize(OUT) / 1e3:.0f}KB · {years[0]}~{years[-1]} · 시군 {len(units)} / 지도 {len(UNIT_KEYS)} · "
          f"맞추지 못한 이름 {sorted(unmatched)}")
    print("정확도", json.dumps({k: acc[k] for k in ("stat", "krei", "norm")}, ensure_ascii=False))
    print("2026", json.dumps(outlook.get("2026"), ensure_ascii=False))


if __name__ == "__main__":
    main()
