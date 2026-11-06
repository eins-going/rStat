"""전국 행정동 경계를 현행 시도·시군 단위로 묶어 data/geo.js(TopoJSON)로 저장한다.

원자료: vuski/admdongkor 행정동 경계 (CC BY 4.0, 원자료 국가데이터처 SGIS) — 판 이름 verYYYYMMDD
  https://github.com/vuski/admdongkor  (받은 파일: db/raw/geo/HangJeongDong_{판}.geojson)
  2026년 11월까지는 southkorea-maps(통계청 2013 행정경계 단순화본)를 썼다:
  https://cdn.jsdelivr.net/gh/southkorea/southkorea-maps@master/kostat/2013/json/skorea_municipalities_topo_simple.json

단위 규칙 (지도 단위·키는 2013 경계 때와 같다, 168개)
- 일반시의 구는 시로 묶는다 (예: 수원시장안구 → 수원시, 화성시동탄구 → 화성시)
- 광역시는 구 지역을 '○○시부'로 묶고 군은 그대로 둔다 (광주 광산구는 별도 단위)
- 인천 2026년 7월 개편 구(제물포구·영종구·서해구·검단구)도 '인천시부'에 들어간다
- 전남광주통합특별시(2026년 7월, SGIS 코드 12)는 통계가 아직 나뉘어 나오므로
  통합 전처럼 광주광역시(24: 동구·서구·남구·북구 → 광주시부, 광산구)와 전라남도(36)로 나눠 그린다
- 시도 코드는 이 사이트의 키(11, 21~26, 29, 31~39)로 바꾼다 (SGIS 코드와 다르다)

객체
- municipalities: 시군 단위 {sido, unit} — 모든 지도 화면이 쓴다
- gus: 서울·광역시 자치구 {sido, unit(지금 속한 시부 단위), gu} — 같은 arcs를 함께 쓴다 (아직 화면에서 쓰지 않음)

실행: python scripts/build_geo.py [--ver ver20261001]   (npx mapshaper가 필요하다)
      python scripts/build_geo.py --check                새 판이 나왔는지만 본다
"""
import argparse
import json
import os
import re
import subprocess
import tempfile
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VER = "ver20261001"
URL = "https://raw.githubusercontent.com/vuski/admdongkor/master/{ver}/HangJeongDong_{ver}.geojson"
REPO_URL = "https://github.com/vuski/admdongkor"
RAW = os.path.join(ROOT, "db", "raw", "geo")
MAPSHAPER = ["npx", "-y", "mapshaper@0.7.101"]
SIMPLIFY = "2.2%"      # 남길 점의 비율 (keep-shapes: 작은 섬 단위도 지우지 않는다)
MIN_ISLAND = "4km2"    # 이보다 작은 떨어진 섬은 뺀다 (단위 전체가 사라지지는 않게 확인한다)

# 이 사이트의 시도 키 → (현행 시도명, 짧은 이름)
SIDOS = {
    "11": ("서울특별시", "서울"), "21": ("부산광역시", "부산"), "22": ("대구광역시", "대구"),
    "23": ("인천광역시", "인천"), "24": ("광주광역시", "광주"), "25": ("대전광역시", "대전"),
    "26": ("울산광역시", "울산"), "29": ("세종특별자치시", "세종"), "31": ("경기도", "경기"),
    "32": ("강원특별자치도", "강원"), "33": ("충청북도", "충북"), "34": ("충청남도", "충남"),
    "35": ("전북특별자치도", "전북"), "36": ("전라남도", "전남"), "37": ("경상북도", "경북"),
    "38": ("경상남도", "경남"), "39": ("제주특별자치도", "제주"),
}
METRO = {"11", "21", "22", "23", "24", "25", "26"}
# SGIS 시도 코드 → 이 사이트 키 (12 전남광주통합특별시는 구·시군 이름으로 나눈다)
SGIS = {"11": "11", "26": "21", "27": "22", "28": "23", "29": "24", "30": "25", "31": "26", "36": "29",
        "41": "31", "42": "32", "51": "32", "43": "33", "44": "34", "45": "35", "52": "35", "46": "36",
        "47": "37", "48": "38", "50": "39"}
GWANGJU_GU = {"동구", "서구", "남구", "북구", "광산구"}


def unit_of(sgis_sido, sgg):
    """(시도 키, 시군 단위, 자치구 이름 또는 None)"""
    if sgis_sido == "12":
        sido = "24" if sgg in GWANGJU_GU else "36"
    else:
        sido = SGIS[sgis_sido]
    if sido == "37" and sgg == "군위군":  # 2023년 7월 대구 편입 (옛 판 대비)
        sido = "22"
    if sido in METRO:
        if sgg.endswith("군"):
            return sido, sgg, None
        if not sgg.endswith("구"):
            raise ValueError(f"광역시 단위를 모름: {sgis_sido} {sgg}")
        if sido == "24" and sgg == "광산구":
            return sido, sgg, sgg
        return sido, f"{SIDOS[sido][1]}시부", sgg
    if sido == "29":
        return sido, "세종시", None
    m = re.match(r"^(.+?시).+구$", sgg)
    return sido, (m.group(1) if m else sgg), None


def latest_ver():
    """저장소 첫 화면에 보이는 verYYYYMMDD 폴더 가운데 가장 새 것 (GitHub API는 횟수 제한이 잦아 쓰지 않는다)."""
    req = urllib.request.Request(REPO_URL, headers={"User-Agent": "Mozilla/5.0 (rStat build_geo)"})
    with urllib.request.urlopen(req, timeout=60) as r:
        names = set(re.findall(r"ver\d{8}", r.read().decode("utf-8", "replace")))
    if not names:
        raise SystemExit("판 목록을 읽지 못했다: " + REPO_URL)
    return max(names)


def load_source(ver):
    path = os.path.join(RAW, f"HangJeongDong_{ver}.geojson")
    if not os.path.exists(path):
        os.makedirs(RAW, exist_ok=True)
        print("받는 중", URL.format(ver=ver))
        urllib.request.urlretrieve(URL.format(ver=ver), path + ".part")
        os.replace(path + ".part", path)
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--ver", default=VER)
    ap.add_argument("--check", action="store_true", help="admdongkor에 더 새 판이 있는지만 본다")
    a = ap.parse_args()
    if a.check:
        new = latest_ver()
        print(f"쓰는 판 {VER}, 최신 판 {new}" + (" → 새 판이 있다: --ver로 다시 만든다" if new > VER else " (같다)"))
        return

    src = load_source(a.ver)
    feats = []
    for f in src["features"]:
        p = f["properties"]
        sido, unit, gu = unit_of(p["sido"], p["sggnm"])
        feats.append({"type": "Feature", "geometry": f["geometry"],
                      "properties": {"k": f"{sido}|{unit}|{gu or ''}", "sido": sido, "unit": unit, "gu": gu or ""}})
    del src

    with tempfile.TemporaryDirectory() as tmp:
        src_path, out_path = os.path.join(tmp, "dong.json"), os.path.join(tmp, "out.json")
        with open(src_path, "w", encoding="utf-8") as f:
            json.dump({"type": "FeatureCollection", "features": feats}, f, ensure_ascii=False)
        del feats
        # 행정동 → (시군·자치구) 조각으로 합치고 단순화한 뒤, 같은 arcs로 시군(municipalities)과 자치구(gus)를 만든다
        subprocess.run([*MAPSHAPER, "-i", src_path, "snap",
                        "-dissolve", "k", "copy-fields=sido,unit,gu", "name=base",
                        "-filter-islands", f"min-area={MIN_ISLAND}", "remove-empty",
                        "-simplify", SIMPLIFY, "keep-shapes",
                        "-dissolve", "sido,unit", "+", "name=municipalities",
                        "-filter", "gu != ''", "target=base", "+", "name=gus",
                        "-o", "format=topojson", "target=municipalities,gus", "quantization=20000", out_path],
                       check=True)
        with open(out_path, encoding="utf-8") as f:
            topo = json.load(f)

    topo.pop("bbox", None)
    for g in topo["objects"]["municipalities"]["geometries"]:
        g["properties"] = {"sido": g["properties"]["sido"], "unit": g["properties"]["unit"]}
    for g in topo["objects"]["gus"]["geometries"]:
        g["properties"] = {k: g["properties"][k] for k in ("sido", "unit", "gu")}
    topo["sidos"] = {k: {"name": v[0], "short": v[1]} for k, v in SIDOS.items()}
    topo["source"] = "vuski/admdongkor 행정동 경계 (CC BY 4.0, 원자료 국가데이터처 SGIS)"
    topo["version"] = a.ver

    units = sorted({(g["properties"]["sido"], g["properties"]["unit"]) for g in topo["objects"]["municipalities"]["geometries"]})
    if len(units) != 168:
        raise SystemExit(f"시군 단위가 168개가 아니다: {len(units)}")
    empty = [g["properties"] for g in topo["objects"]["municipalities"]["geometries"] if not g.get("arcs")]
    if empty:
        raise SystemExit(f"경계가 빈 단위: {empty}")

    path = os.path.join(ROOT, "data", "geo.js")
    with open(path, "w", encoding="utf-8") as f:
        f.write(f"// 행정동 경계 {a.ver} (vuski/admdongkor, CC BY 4.0, 원자료 국가데이터처 SGIS) · 현행 시군 단위로 묶음 (scripts/build_geo.py)\n")
        f.write("window.AGRI_TOPO = ")
        json.dump(topo, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print("saved", path, os.path.getsize(path), "bytes,", len(units), "units,",
          len(topo["objects"]["gus"]["geometries"]), "gus")


if __name__ == "__main__":
    main()
