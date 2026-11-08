"""광역시 구·군 벼(미곡) 재배면적·생산량을 KOSIS 시도·구군 기본통계 표에서 모아
db/raw/kosis_rice/metro_gugun.csv에 저장한다.

왜: 국가 표 DT_1ET0034(시군별 논벼)는 2016년부터 광역시 구·군 값이 없고
(군위군은 2023년까지), 기장군·달성군은 처음부터 없다. 지자체가 KOSIS에 올린
기본통계(통계연보) 표로 그 빈칸을 채운다.

- 형식: year, sido, gugun, crop, area_ha, prod_ton, yield_kg10a, org_id, tbl_id, note
  sido 21 부산 22 대구 23 인천 24 광주 25 대전 26 울산, gugun '합계'는 광역시 전체.
  crop: 논벼(표에 논벼 행이 있을 때) / 미곡합계(논벼+밭벼, 밭벼는 거의 0).
  단위: 면적 ha, 생산량 톤(M/T, 정곡), 10a당 kg.
- note: yield_calc(표에 단수가 없어 생산량/면적으로 계산), yield_outlier(단수 250~800 밖,
  원표 오기 의심), yield_mismatch(표 단수와 계산값이 5% 넘게 다름), partial(면적·생산량 중 하나 없음).
- 한 단위·연도에 표가 여럿이면 TABLES 순서대로 앞의 것을 쓴다(논벼 표 → 식량작물 표).
  앞 표에 면적·생산량이 비어 있으면 뒤 표로 채운다.
- 받은 행만 바꾸고 응답에 없는 옛 행은 그대로 둔다(표가 끊기거나 지워져도 보존).
- 검증(2026-11): 시 '합계'는 DT_1ET0034 광역시 행과 면적이 같고, 생산량은 대구 2017~·인천 2018~·
  울산 2022~ 표만 0.973배(현백률 90.4/92.9로 추정, 나머지 해·시도는 같음).
  구·군 표는 DT_1ET0034와 기준이 달라(강화 +12~19%, 울주 +18~22%, 광산 -15~21%, 군위 0~-16%)
  광역시 합계에서 그대로 빼면 안 된다. 같은 값 되풀이·단수 이상값이 많다(note 참고).
- 인천 중구(561)·서구(568)는 2026 개편 뒤 기관명이 제물포구·서해구지만 자료 연도 기준 옛 이름을 쓴다.

사용: .venv/bin/python scripts/fetch_metro_rice.py [--start 2010] [--end 2025]
"""
import argparse
import csv
import importlib.util
import os
import sys
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))
spec = importlib.util.spec_from_file_location("fetch_data", os.path.join(ROOT, "scripts", "fetch_data.py"))
fd = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fd)

PATH = os.path.join(ROOT, "db", "raw", "kosis_rice", "metro_gugun.csv")
COLS = ["year", "sido", "gugun", "crop", "area_ha", "prod_ton", "yield_kg10a", "org_id", "tbl_id", "note"]

# (sido, gugun, orgId, tblId, kind, region)
#   kind 'rice': 미곡 표(합계·논벼·밭벼), 'food': 식량작물(정곡) 표에서 '미곡' 행만
#   region: None, 또는 (지역 분류 이름에 들어간 글자, 남길 항목 이름 집합 | None=항목 이름을 gugun으로)
TABLES = [
    # 부산: 시 표는 구·군 구분 없음. 구·군 표는 강서구·기장군만 있다.
    ("21", "합계", "202", "DT_202N_BSY506", "rice", None),
    ("21", "강서구", "542", "DT_54201_E001081", "food", None),
    ("21", "기장군", "546", "DT_54601_E001009", "food", None),
    # 대구: 달성군·구 지역 생산량 표 없음(공공비축 매입실적만). 군위군은 2023년까지.
    ("22", "합계", "203", "DT_E18001", "rice", None),
    ("22", "군위군", "559", "DT_77101_E001010", "rice", None),
    ("22", "군위군", "559", "DT_77101_E001009", "food", None),
    # 인천: 동구·미추홀구·연수구 표 없음.
    ("23", "합계", "204", "DT_20402_E000028", "rice", None),
    ("23", "강화군", "569", "DT_56901_E000028", "rice", None),
    ("23", "강화군", "569", "DT_56901_E000043", "food", None),
    ("23", "옹진군", "570", "DT_57001_E000028", "rice", None),
    ("23", "옹진군", "570", "DT_57001_E000043", "food", ("면", {"합계"})),
    ("23", "중구", "561", "DT_56101_E000043", "food", None),
    ("23", "남동구", "565", "DT_56501_E000028", "rice", None),
    ("23", "남동구", "565", "DT_56501_E000043", "food", None),
    ("23", "부평구", "566", "DT_56601_E000043", "food", None),
    ("23", "계양구", "567", "DT_56701_E000028", "rice", None),
    ("23", "계양구", "567", "DT_56701_E000043", "food", None),
    ("23", "서구", "568", "DT_56801_E000043", "food", None),
    # 광주: 5개 구 모두 있음.
    ("24", "합계", "205", "DT_20503_E001010", "rice", None),
    ("24", "동구", "581", "DT_58101_E001010", "rice", None),
    ("24", "동구", "581", "DT_58101_E001009", "food", None),
    ("24", "서구", "582", "DT_58201_E001010", "rice", None),
    ("24", "서구", "582", "DT_58201_E001009", "food", None),
    ("24", "남구", "583", "DT_58301_E001010", "rice", None),
    ("24", "남구", "583", "DT_58301_E001009", "food", None),
    ("24", "북구", "584", "DT_58401_E001010", "rice", None),
    ("24", "북구", "584", "DT_58401_E001009", "food", None),
    ("24", "광산구", "585", "DT_58501_E001010", "rice", None),
    ("24", "광산구", "585", "DT_58501_E001009", "food", None),
    # 대전: 동구 표 없음, 유성구는 2021년부터.
    ("25", "합계", "206", "DT_20603_E001010", "rice", None),
    ("25", "합계", "206", "DT_20603_E001010_1", "rice", None),
    ("25", "중구", "592", "DT_592001_E000002", "food", None),
    ("25", "서구", "593", "DT_59301_E001009", "food", None),
    ("25", "유성구", "594", "DT_594002_E000030", "food", None),
    ("25", "대덕구", "595", "DT_59501_E001009", "food", None),
    # 울산: 시 표 DT_2071E09의 구·군 분류는 1997~2004년만 값이 있다. 2014년부터 구·군 자체 표.
    ("26", None, "207", "DT_2071E09", "rice", ("행정구역", None)),
    ("26", "울주군", "605", "DT_605001_E008", "rice", ("행정구역", {"전체", "합계"})),
    ("26", "중구", "601", "DT_60101_E000010", "rice", None),
    ("26", "남구", "602", "DT_60201_E000010", "rice", None),
    ("26", "동구", "603", "DT_60301_E000010", "rice", None),
    ("26", "북구", "604", "DT_604001_E000005", "rice", None),
]

UNITS = {"area": "ha", "prod": "M/T", "yield": "kg/10a"}


def norm(s):
    return (s or "").replace(" ", "").replace("㏊", "ha").replace("㎏", "kg").replace("Kg", "kg").strip()


def fetch(org, tbl, start, end):
    meta = fd.meta(org, tbl)
    time.sleep(0.3)
    dims = [k for k in meta if k != "ITEM"]
    p = {"method": "getList", "orgId": org, "tblId": tbl, "itmId": "ALL", "prdSe": "Y",
         "startPrdDe": str(start), "endPrdDe": str(end)}
    for i, k in enumerate(dims, 1):
        p[f"objL{i}"] = "ALL"
    rows = fd.call("Param/statisticsParameterData.do", p)
    time.sleep(0.3)
    return meta, rows


def parse(meta, rows, kind, region):
    """→ {(gugun|None, year): {crop: {measure: value}}}"""
    # 분류 이름 → {항목ID: (이름, 부모 이름)}
    lookup = {}
    for k, d in meta.items():
        names = {i["id"]: norm(i["name"]) for i in d["items"]}
        lookup[norm(d["name"])] = {i["id"]: (names[i["id"]], names.get(i["up"], "")) for i in d["items"]}
    out = {}
    for r in rows:
        tokens, reg = {norm(r.get("ITM_NM"))}, None
        for n in range(1, 9):
            cid = r.get(f"C{n}")
            if cid is None:
                continue
            dname = norm(r.get(f"C{n}_OBJ_NM"))
            name, up = lookup.get(dname, {}).get(cid, (norm(r.get(f"C{n}_NM")), ""))
            if region and region[0] in dname:
                reg = name
            else:
                tokens |= {name, up}
        if region:
            if region[1] is None:
                gugun = reg
            elif reg in region[1]:
                gugun = "keep"
            else:
                continue
        else:
            gugun = "keep"
        measure = ("yield" if "단위생산량" in tokens else "prod" if "생산량" in tokens
                   else "area" if "면적" in tokens else None)
        if "논벼" in tokens:
            crop = "논벼"
        elif "밭벼" in tokens:
            continue
        elif (kind == "rice" and "합계" in tokens) or (kind == "food" and "미곡" in tokens):
            crop = "미곡합계"
        else:
            continue
        if measure is None:
            continue
        unit = norm(r.get("UNIT_NM"))
        if unit and unit != UNITS[measure]:
            raise SystemExit(f"단위가 다르다: {r.get('TBL_ID')} {measure} {unit}")
        v = fd.num(r.get("DT"))
        out.setdefault((gugun, r["PRD_DE"]), {}).setdefault(crop, {})[measure] = v
    return out


def pick(crops):
    """논벼에 면적·생산량이 있으면 논벼, 아니면 미곡합계. 값이 더 많은 쪽."""
    def score(m):
        return sum(m.get(k) is not None for k in ("area", "prod")) * 2 + (m.get("yield") is not None)
    best = None
    for c in ("논벼", "미곡합계"):
        m = crops.get(c)
        if m and score(m) > 0 and (best is None or score(m) > score(best[1])):
            best = (c, m)
    return best


def filled(row):
    return (row["area_ha"] != "") + (row["prod_ton"] != "")


def fmt(v):
    if v is None:
        return ""
    return str(int(v)) if float(v).is_integer() else f"{v:.1f}".rstrip("0").rstrip(".")


def build_row(year, sido, gugun, crop, m, org, tbl):
    area, prod, yld = m.get("area"), m.get("prod"), m.get("yield")
    if area == 0 and not prod:
        return None
    notes = []
    calc = prod / area * 100 if area and prod is not None else None  # t/ha → kg/10a
    if yld is None and calc is not None:
        yld = round(calc, 1)
        notes.append("yield_calc")
    elif yld is not None and calc and abs(yld - calc) / calc > 0.05:
        notes.append("yield_mismatch")
    if yld is not None and not 250 <= yld <= 800:
        notes.append("yield_outlier")
    if area is None or prod is None:
        notes.append("partial")
    return {"year": year, "sido": sido, "gugun": gugun, "crop": crop, "area_ha": fmt(area),
            "prod_ton": fmt(prod), "yield_kg10a": fmt(yld), "org_id": org, "tbl_id": tbl,
            "note": ";".join(notes)}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--start", type=int, default=2010)
    ap.add_argument("--end", type=int, default=2025)
    a = ap.parse_args()
    new = {}
    for sido, gugun, org, tbl, kind, region in TABLES:
        try:
            meta, rows = fetch(org, tbl, a.start, a.end)
        except Exception as e:  # 표가 비었거나 사라짐: 옛 행 유지
            print(f"  {org} {tbl}: 건너뜀 ({e})")
            continue
        got = 0
        for (g, year), crops in sorted(parse(meta, rows, kind, region).items()):
            name = g if gugun is None else gugun
            if name is None:
                continue
            key = (year, sido, name)
            best = pick(crops)
            if not best:
                continue
            row = build_row(year, sido, name, best[0], best[1], org, tbl)
            # 앞 표가 우선, 단 앞 표에 면적·생산량이 비어 있으면 뒤 표로 채운다
            if row and (key not in new or filled(row) > filled(new[key])):
                new[key] = row
                got += 1
        print(f"  {org} {tbl}: {got}행")
    if not new:
        raise SystemExit("받은 행이 없다")
    old = list(csv.DictReader(open(PATH, encoding="utf-8"))) if os.path.exists(PATH) else []
    keep = [r for r in old if (r["year"], r["sido"], r["gugun"]) not in new]
    out = sorted(keep + list(new.values()), key=lambda r: (r["sido"], r["gugun"] != "합계", r["gugun"], r["year"]))
    os.makedirs(os.path.dirname(PATH), exist_ok=True)
    tmp = PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, COLS)
        w.writeheader()
        w.writerows(out)
    os.replace(tmp, PATH)
    print(f"광역시 구·군 벼: 새로 {len(new)}행, 전체 {len(out)}행 → {os.path.relpath(PATH, ROOT)}")


if __name__ == "__main__":
    main()
