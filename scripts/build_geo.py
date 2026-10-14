"""전국 시군구 경계(TopoJSON)를 받아 현행 시도·시군 단위를 붙여 data/geo.js로 저장한다.

원자료: southkorea-maps (통계청 2013 행정경계, 단순화본)
- 일반시의 구는 시로 묶는다 (예: 수원시장안구 → 수원시)
- 광역시는 구 지역을 '○○시부'로 묶고 군은 그대로 둔다 (광주 광산구는 별도 단위)
- 2013년 이후 바뀐 행정구역을 반영한다: 청원군 → 청주시, 군위군 → 대구광역시, 여주군 → 여주시
실행: python scripts/build_geo.py
"""
import json
import os
import re
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = "https://cdn.jsdelivr.net/gh/southkorea/southkorea-maps@master/kostat/2013/json/skorea_municipalities_topo_simple.json"

# 2013 경계 코드 앞 두 자리 → (현행 시도명, 짧은 이름)
SIDOS = {
    "11": ("서울특별시", "서울"), "21": ("부산광역시", "부산"), "22": ("대구광역시", "대구"),
    "23": ("인천광역시", "인천"), "24": ("광주광역시", "광주"), "25": ("대전광역시", "대전"),
    "26": ("울산광역시", "울산"), "29": ("세종특별자치시", "세종"), "31": ("경기도", "경기"),
    "32": ("강원특별자치도", "강원"), "33": ("충청북도", "충북"), "34": ("충청남도", "충남"),
    "35": ("전북특별자치도", "전북"), "36": ("전라남도", "전남"), "37": ("경상북도", "경북"),
    "38": ("경상남도", "경남"), "39": ("제주특별자치도", "제주"),
}
METRO = {"11", "21", "22", "23", "24", "25", "26"}


def unit_of(code, name):
    sido = code[:2]
    if sido == "37" and name == "군위군":
        return "22", "군위군"
    if sido in METRO:
        if name.endswith("군") or (sido == "24" and name == "광산구"):
            return sido, name
        return sido, f"{SIDOS[sido][1]}시부"
    if sido == "29":
        return sido, "세종시"
    m = re.match(r"^(.+?시).+구$", name)
    if m:
        name = m.group(1)
    name = {"청원군": "청주시", "여주군": "여주시"}.get(name, name)
    return sido, name


def main():
    with urllib.request.urlopen(SRC, timeout=60) as r:
        topo = json.loads(r.read().decode("utf-8"))
    obj = topo["objects"].pop("skorea_municipalities_geo")
    for g in obj["geometries"]:
        p = g["properties"]
        sido, unit = unit_of(p["code"], p["name"])
        g["properties"] = {"sido": sido, "unit": unit}
    topo["objects"]["municipalities"] = obj
    topo["sidos"] = {k: {"name": v[0], "short": v[1]} for k, v in SIDOS.items()}

    path = os.path.join(ROOT, "data", "geo.js")
    with open(path, "w", encoding="utf-8") as f:
        f.write("// 통계청 2013 행정경계(southkorea-maps) · 현행 시군 단위로 묶음 (scripts/build_geo.py)\n")
        f.write("window.AGRI_TOPO = ")
        json.dump(topo, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    units = sorted({(g["properties"]["sido"], g["properties"]["unit"]) for g in obj["geometries"]})
    print("saved", path, os.path.getsize(path), "bytes,", len(units), "units")


if __name__ == "__main__":
    main()
