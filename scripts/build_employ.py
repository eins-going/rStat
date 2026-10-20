"""KOSIS 경제활동인구조사·지역별고용조사에서 농업 고용 자료를 받아 data/employ.js로 저장한다 (농업고용 화면).

경제활동인구조사 (월, 전국·시도) — 산업은 'A 농업, 임업 및 어업'(농림어업)까지만 나뉜다
- 산업별 취업자: 산업분류가 바뀔 때마다 표가 나뉘어 있어 이어 붙인다 (겹치는 시점은 새 표 값을 쓴다)
    전국  DT_1DA7007(1963~1992, 월은 1982.7~) · DT_1DA7006S(1992~2000) · DT_1DA7A06S(2000~2008)
          · DT_1DA7C06S(2004~2017) · DT_1DA7E06S_NEW(2013~)
    시도  DT_1DA7062(1989~1992, 연) · DT_1DA7033S(1992~2000, 월은 1998~) · DT_1DA7A33S · DT_1DA7C33S · DT_1DA7E33S_NEW
- 산업/취업시간별 취업자 DT_1DA7E43S_NEW (2013~, 월): 36시간 미만·일시휴직·주당 평균 취업시간
- 산업별 비임금 근로자 DT_1DE6070_11 (2013~, 해마다 8월 부가조사): 자영업자·무급가족종사자
지역별고용조사 (반기, 시군구까지) — 농업(01)·임업·어업, 작물재배업·축산업까지 나뉜다
- 시군구/산업별 취업자 DT_1ES3A30S(사는 곳 기준) · DT_1ES3C06S(일하는 곳 기준)
- 시군구/연령별 취업자 DT_1ES3A03_A01S (지역 취업자 중 65세 이상, 산업 구분 없음)
- 시도/산업별 DT_1ES3B05J · 전국 산업/성별(소분류) DT_1ES3B31J · 전국 산업/연령 DT_1ES3B27J

값은 천 명(취업시간은 시간, RSE는 %). 지역 키는 data.js와 같다: '00' 전국, '31' 시도, '31|수원시' 시군.
광역시의 구는 '○○시부'로 더한다(더한 값의 RSE는 없다). 2026 '전남광주통합특별시' 행은 빼고 광주·전남을 쓴다.
실행: python scripts/build_employ.py
"""
import functools
import json
import os
import re
import time
from datetime import date

import fetch_data
from fetch_data import num
from regions import ROOT, UNIT_KEYS, sido_code, unit_of

ORG = "101"


def call(path, params, tries=5):
    """KOSIS가 가끔 응답 없이 끊는다 → 쉬었다 다시 부른다"""
    for n in range(tries):
        try:
            return fetch_data.call(path, params)
        except (OSError, ValueError) as e:
            if n == tries - 1:
                raise
            print(f"  다시 부름 {n + 1}: {params.get('tblId')} {type(e).__name__}")
            time.sleep(5 * (n + 1))


@functools.cache
def dims_of(tbl):
    rows = call("statisticsData.do", {"method": "getMeta", "type": "ITM", "orgId": ORG, "tblId": tbl})
    d = {}
    for x in rows:
        d.setdefault(x["OBJ_ID"], {"name": x["OBJ_NM"], "items": []})["items"].append({"id": x["ITM_ID"], "name": x["ITM_NM"].strip()})
    return d, [k for k in d if k != "ITEM"]


def rows_of(tbl, prd, sel, start, end, itm="ALL"):
    """sel: {분류 ID: 'id+id' 또는 'ALL'} → 행 목록. 분류 순서는 표 정의를 따른다."""
    _, order = dims_of(tbl)
    p = {"method": "getList", "orgId": ORG, "tblId": tbl, "itmId": itm, "prdSe": prd,
         "startPrdDe": start, "endPrdDe": end}
    for i, oid in enumerate(order, 1):
        p[f"objL{i}"] = sel.get(oid, "ALL")
    out = call("Param/statisticsParameterData.do", p)
    return out if isinstance(out, list) else []


def prd_key(prd, s):
    """KOSIS 시점 → 화면 시점: 연 '2025', 월 '2025-09', 반기 '2025-2'"""
    if prd == "M":
        return f"{s[:4]}-{s[4:6]}"
    if prd == "H":
        return f"{s[:4]}-{int(s[4:6])}"
    return s[:4]


def sido_ids(tbl, oid):
    """시도 분류 → {ITM_ID: 지역키}. 통합특별시 행은 뺀다."""
    d, _ = dims_of(tbl)
    out = {}
    for it in d[oid]["items"]:
        if "통합" in it["name"]:
            continue
        if it["name"] in ("계", "전국"):
            out[it["id"]] = "00"
        elif sido_code(it["name"]):
            out[it["id"]] = sido_code(it["name"])
    return out


# ---------- 경제활동인구조사: 산업별 취업자 (계·농림어업) 이어 붙이기 ----------
# (표, 산업 분류 ID, 계, 농림어업, 지역 분류 ID 또는 None, [(주기, 시작, 끝)])
NATION_CHAIN = [
    ("DT_1DA7007", "D", "00", "10", None, [("Y", "1963", "1992"), ("M", "198207", "199212")]),
    ("DT_1DA7006S", "C", "00", "01", None, [("Y", "1992", "2000"), ("M", "199201", "200012")]),
    ("DT_1DA7A06S", "I", "00", "01", None, [("Y", "2000", "2008"), ("M", "200001", "200812")]),
    ("DT_1DA7C06S", "I", "00", "01", None, [("Y", "2004", "2017"), ("M", "200401", "201712")]),
    ("DT_1DA7E06S_NEW", "I", "00", "01", None, [("Y", "2013", "2100"), ("M", "201301", "210012")]),
]
SIDO_CHAIN = [
    ("DT_1DA7062", "D", "00", "10", "A", [("Y", "1989", "1992")]),
    ("DT_1DA7033S", "C", "00", "01", "A", [("Y", "1992", "2000"), ("M", "199801", "200012")]),
    ("DT_1DA7A33S", "I", "00", "01", "A", [("Y", "2000", "2008"), ("M", "200001", "200812")]),
    ("DT_1DA7C33S", "I", "00", "01", "A", [("Y", "2004", "2017"), ("M", "200401", "201712")]),
    ("DT_1DA7E33S_NEW", "I", "00", "01", "A", [("Y", "2013", "2100"), ("M", "201301", "210012")]),
]


def industry_chain():
    """→ {'Y': {지역: {시점: [계, 농림어업]}}, 'M': {...}} 뒤 표가 앞 표를 덮는다."""
    acc = {"Y": {}, "M": {}}
    for chain in (NATION_CHAIN, SIDO_CHAIN):
        for tbl, ind, tot, agri, reg, spans in chain:
            regs = sido_ids(tbl, reg) if reg else None
            for prd, a, b in spans:
                rows = rows_of(tbl, prd, {ind: f"{tot}+{agri}", **({reg: "ALL"} if reg else {})}, a, b, "T30")
                _, order = dims_of(tbl)
                ci = f"C{order.index(ind) + 1}"
                cr = f"C{order.index(reg) + 1}" if reg else None
                for r in rows:
                    key = regs.get(r[cr]) if reg else "00"
                    v = num(r["DT"])
                    if not key or v is None:
                        continue
                    cell = acc[prd].setdefault(key, {}).setdefault(prd_key(prd, r["PRD_DE"]), [None, None])
                    cell[0 if r[ci] == tot else 1] = v
            print(f"  {tbl}: {', '.join(p for p, _, _ in spans)}")
    return acc


def to_series(per_region, periods):
    out = {}
    for key, s in per_region.items():
        t = [s.get(p, [None, None])[0] for p in periods]
        a = [s.get(p, [None, None])[1] for p in periods]
        if any(v is not None for v in a):
            out[key] = {"t": t, "a": a}
    return out


# ---------- 경제활동인구조사: 취업시간 · 비임금 근로자 ----------
def hours():
    """월별 {'00'|'01': {'short': 36시간 미만 비중(%), 'absent': 일시휴직 비중(%), 'avg': 주당 평균 시간}}"""
    # 이 표는 첫 분류 자리가 비어 있고 산업·취업시간이 objL2·objL3(C2·C3)에 있다
    rows = call("Param/statisticsParameterData.do", {
        "method": "getList", "orgId": ORG, "tblId": "DT_1DA7E43S_NEW", "itmId": "T30", "prdSe": "M",
        "startPrdDe": "201301", "endPrdDe": "210012", "objL1": "ALL", "objL2": "00+01", "objL3": "00+45+80+90"})
    acc = {}
    for r in rows:
        v = num(r["DT"])
        if v is not None:
            acc.setdefault(prd_key("M", r["PRD_DE"]), {}).setdefault(r["C2"], {})[r["C3"]] = v
    months = sorted(acc)
    out = {"months": months}
    for ind in ("00", "01"):
        g = [acc[m].get(ind, {}) for m in months]
        share = lambda c: [round(x[c] / x["00"] * 100, 1) if x.get(c) is not None and x.get("00") else None for x in g]  # noqa: E731
        out[ind] = {"short": share("45"), "absent": share("80"), "avg": [x.get("90") for x in g]}
    return out


def nonwage():
    """연(8월) {'00'|'01': [비임금, 자영업자, 고용원 있는, 고용원 없는, 무급가족]}"""
    rows = rows_of("DT_1DE6070_11", "M", {"I": "00+01"}, "201308", "210012")
    items = ["T10", "T20", "T30", "T40", "T50"]
    acc = {}
    for r in rows:
        if r["ITM_ID"] in items:
            acc.setdefault(r["PRD_DE"][:4], {}).setdefault(r["C1"], [None] * 5)[items.index(r["ITM_ID"])] = num(r["DT"])
    years = sorted(acc)
    return {"years": years, **{ind: [acc[y].get(ind) for y in years] for ind in ("00", "01")}}


# ---------- 지역별고용조사 ----------
def halves_of(rows):
    return sorted({prd_key("H", r["PRD_DE"]) for r in rows})


def unit_rows(tbl, ind_ids, items):
    """시군구 표 → {(지역키, 산업 ID, 항목 ID): {반기: 값}}. 광역시 구는 시부에 더한다(RSE는 더하지 않는다)."""
    d, order = dims_of(tbl)
    reg, ind = order
    names = {it["id"]: it["name"] for it in d[reg]["items"]}
    rows = rows_of(tbl, "H", {ind: "+".join(ind_ids)}, "201301", "210002", "+".join(items))
    acc, missing = {}, set()
    for r in rows:
        rid = r["C1"]
        sido = rid[:2]
        name = re.sub(r"^\S+\s", "", names[rid]) if " " in names[rid] else names[rid]
        u = unit_of(sido, name)
        if not u or u[0] not in UNIT_KEYS:
            missing.add(names[rid])
            continue
        key, how = u
        v = num(r["DT"])
        if v is None:
            continue
        h = prd_key("H", r["PRD_DE"])
        cell = acc.setdefault((key, r["C2"], r["ITM_ID"]), {})
        if how == "sum":
            if r["ITM_ID"] in ("T2",):  # RSE는 더할 수 없다
                continue
            cell[h] = round(cell.get(h, 0) + v, 1)
        else:
            cell[h] = v
    if missing:
        print(f"  {tbl}: 지도 단위에 없는 지역 {sorted(missing)}")
    return acc, halves_of(rows)


def regional():
    halves = set()
    res, h = unit_rows("DT_1ES3A30S", ["00", "01"], ["T1", "T2"])
    halves |= set(h)
    work, h = unit_rows("DT_1ES3C06S", ["00", "01"], ["T1"])
    halves |= set(h)
    age, h = unit_rows("DT_1ES3A03_A01S", ["000", "040"], ["T00"])  # 지역 취업자 계·65세 이상 (산업 구분 없음)
    halves |= set(h)
    # 시도: 계·농림어업·농업·임업·어업
    regs = sido_ids("DT_1ES3B05J", "A")
    rows = rows_of("DT_1ES3B05J", "H", {"A": "ALL", "B": "0+A+01+02+03"}, "201301", "210002", "T1")
    sido = {}
    for r in rows:
        k = regs.get(r["C1"])
        if k:
            sido.setdefault((k, r["C2"]), {})[prd_key("H", r["PRD_DE"])] = num(r["DT"])
    halves |= set(halves_of(rows))
    H = sorted(halves)

    def ser(acc, key):
        s = acc.get(key)
        return [s.get(h) for h in H] if s else None

    units = {}
    for k in sorted(UNIT_KEYS):
        v = {"t": ser(res, (k, "00", "T1")), "a": ser(res, (k, "01", "T1")), "ar": ser(res, (k, "01", "T2")),
             "wt": ser(work, (k, "00", "T1")), "wa": ser(work, (k, "01", "T1")),
             "yt": ser(age, (k, "000", "T00")), "yo": ser(age, (k, "040", "T00"))}
        v = {f: s for f, s in v.items() if s and any(x is not None for x in s)}
        if v:
            units[k] = v
    sidos = {}
    for k in sorted({k for k, _ in sido}):
        sidos[k] = {f: [sido.get((k, i), {}).get(h) for h in H] for f, i in
                    (("t", "0"), ("a", "A"), ("n1", "01"), ("n2", "02"), ("n3", "03"))}
    # 세종은 시군구 표에 없다 → 시도 값(사는 곳 기준)을 쓴다
    if "29|세종시" in UNIT_KEYS and "29|세종시" not in units and "29" in sidos:
        units["29|세종시"] = {"t": sidos["29"]["t"], "a": sidos["29"]["a"]}
    return H, units, sidos


def national_mix(H):
    """전국 구성(반기): 농업 소분류(작물·축산·임업·어업), 농업 연령 (지역 단위 공표 표가 없는 항목)."""
    out = {}
    # 소분류: 계, 농림어업, 농업(작물·축산·복합·서비스), 임업, 어업
    ids = ["0", "A", "01", "011", "012", "013", "014", "02", "03"]
    rows = rows_of("DT_1ES3B31J", "H", {"A": "+".join(ids)}, "201301", "210002", "T00")
    acc = {}
    for r in rows:
        acc.setdefault(r["C1"], {})[prd_key("H", r["PRD_DE"])] = num(r["DT"])
    out["sub"] = {i: [acc.get(i, {}).get(h) for h in H] for i in ids}
    # 연령: 계, 농업 (15~29 · 30대 · 40대 · 50대 · 60세 이상)
    items = ["T20", "T21", "T22", "T23", "T24"]
    rows = rows_of("DT_1ES3B27J", "H", {"B": "0+01"}, "201301", "210002", "+".join(items))
    acc = {}
    for r in rows:
        acc.setdefault((r["C1"], r["ITM_ID"]), {})[prd_key("H", r["PRD_DE"])] = num(r["DT"])
    out["age"] = {i: [[acc.get((i, t), {}).get(h) for t in items] for h in H] for i in ("0", "01")}
    return out


def main():
    print("경제활동인구조사 산업별 취업자")
    chain = industry_chain()
    years = sorted({p for s in chain["Y"].values() for p in s})
    months = sorted({p for s in chain["M"].values() for p in s})
    print("경제활동인구조사 취업시간·비임금")
    hrs, nw = hours(), nonwage()
    print("지역별고용조사")
    H, units, sidos = regional()
    mix = national_mix(H)
    out = {
        "built": date.today().isoformat(),
        "years": years, "y": to_series(chain["Y"], years),
        "months": months, "m": to_series(chain["M"], months),
        "hours": hrs, "nonwage": nw,
        "halves": H, "u": units, "s": sidos, "mix": mix,
    }
    path = os.path.join(ROOT, "data", "employ.js")
    with open(path, "w", encoding="utf-8") as f:
        f.write("// 농업고용: 경제활동인구조사·지역별고용조사 (scripts/build_employ.py)\nwindow.AGRI_EMPLOY = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print(f"저장: {path} ({os.path.getsize(path) / 1024:.0f}KB) · 연 {years[0]}~{years[-1]} · 월 {months[0]}~{months[-1]}"
          f" · 반기 {H[0]}~{H[-1]} · 시군 {len(units)}곳")


if __name__ == "__main__":
    main()
