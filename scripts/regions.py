"""지역 이름 정규화 (KOSIS 수집과 물류기기 집계가 함께 쓴다).

- 지역 단위는 data/geo.js(scripts/build_geo.py)의 현행 시군 단위
- 지역 키: '00' 전국, '31' 시도(코드), '31|수원시' 시군
- 광역시는 '○○시부'(구 지역)와 군, 일반시의 구는 시로 합친다
"""
import json
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
METRO = {"11", "21", "22", "23", "24", "25", "26"}
SIDO_PREFIX = [("서울", "11"), ("부산", "21"), ("대구", "22"), ("인천", "23"), ("광주광역", "24"),
               ("대전", "25"), ("울산", "26"), ("세종", "29"), ("경기", "31"), ("강원", "32"),
               ("충청북", "33"), ("충북", "33"), ("충청남", "34"), ("충남", "34"), ("전라북", "35"),
               ("전북", "35"), ("전라남", "36"), ("전남", "36"), ("경상북", "37"), ("경북", "37"),
               ("경상남", "38"), ("경남", "38"), ("제주", "39")]


def load_geo():
    with open(os.path.join(ROOT, "data", "geo.js"), encoding="utf-8") as f:
        text = f.read()
    topo = json.loads(text[text.index("{"):text.rindex("}") + 1])
    units = {(g["properties"]["sido"], g["properties"]["unit"]) for g in topo["objects"]["municipalities"]["geometries"]}
    return topo["sidos"], units


SIDOS, UNITS = load_geo()
UNIT_KEYS = {f"{s}|{u}" for s, u in UNITS}


def sido_code(name):
    for prefix, code in SIDO_PREFIX:
        if name.startswith(prefix):
            return code
    return None


def unit_of(sido, name):
    """(지역키, 방식) — 방식: 'unit' 그대로, 'explicit' 시부 값, 'sum' 시부에 더할 구"""
    name = name.strip()
    if name in ("동부", "읍부", "면부"):
        return None
    short = SIDOS[sido]["short"]
    if sido in METRO:
        if name.endswith("시부") or name.endswith("군외") or name.endswith("구외"):
            return f"{sido}|{short}시부", "explicit"
        if name.endswith("군") or (sido == "24" and name == "광산구"):
            return f"{sido}|{name}", "unit"
        if name.endswith("구"):
            return f"{sido}|{short}시부", "sum"
        return None
    if sido == "29":
        return ("29|세종시", "unit") if name.startswith("세종") else None
    if name.endswith("구") or " " in name:
        return None  # 일반시의 구는 시 행에 이미 합쳐져 있다
    name = {"여주군": "여주시", "당진군": "당진시"}.get(name, name)
    if sido == "37" and name == "군위군":
        return "22|군위군", "unit"
    return f"{sido}|{name}", "unit"
