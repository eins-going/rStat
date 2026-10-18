"""농산물 유통시설 네 가지에 좌표를 붙여 data/facilities.js로 저장한다.

원자료 (at_data/, git 제외):
- 전국미곡처리장표준데이터-YYYYMMDD.xls       미곡처리장 (공공데이터포털 표준데이터; 대부분 도정업, 정미소 포함)
- 전국농산물산지유통센터_APC_표준데이터-YYYYMMDD.xls  산지유통센터(APC), 일부는 위경도 포함
- 국비지원+로컬푸드+직매장+운영현황(`21년기준).xlsx  로컬푸드 직매장 (2021년 기준)
- 농림축산식품부_6차산업 인증 사업자 현황_YYYYMMDD.csv  6차산업 인증 경영체 (CP949, 대표자 이름은 싣지 않는다)

좌표는 VWorld로 구한다 (scripts/build_farms.py의 주소 해석·지오코딩을 같이 쓴다).
1) 도로명주소 → 2) 지번주소 → 3) 시설 이름 장소검색(결과가 주소의 시군·읍면과 맞을 때만)
→ 4) 주소에서 읽히는 가장 자세한 행정구역 중심점.
APC 파일의 위경도는 주소로 건물 위치를 못 찾았을 때만 쓴다(그 지역 30km 안일 때).
주소로 찾은 위치와 1km 넘게 다르면 at_data/facilities_check.csv에 남긴다.
실행: python scripts/build_facilities.py
"""
import concurrent.futures as cf
import csv
import json
import math
import os
import re
import sys
import time
import unicodedata

import pandas as pd

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_farms import (AT, ROOT, SIDO_FULL, VWorld, district_point, geocode, load_env,  # noqa: E402
                         norm_name, parse_addr, same_area, same_emd, sido_key)

EXACT = ("도로명", "지번", "상호", "좌표")


def find(prefix):
    for f in sorted(os.listdir(AT), reverse=True):
        if unicodedata.normalize("NFC", f).startswith(prefix):
            return os.path.join(AT, f)
    raise FileNotFoundError(prefix)


def clean(v):
    if v is None or (isinstance(v, float) and math.isnan(v)):
        return ""
    v = unicodedata.normalize("NFC", str(v)).strip()
    return "" if v in ("-", "nan") else re.sub(r"\s+", " ", v)


def read_std(path):
    """공공데이터 표준데이터 엑셀: 첫 행은 비어 있고 둘째 행이 머리글."""
    x = pd.read_excel(path, header=1, dtype=str)
    return [{k: clean(v) for k, v in r.items()} for r in x.to_dict("records") if clean(r.get(x.columns[0]))]


# 원자료 주소 오타 (VWorld로 확인한 바른 표기)
TYPOS = {"탄현명 ": "탄현면 ", "월곶명 ": "월곶면 ", "홍전읍": "홍천읍", "늘픔로": "늘품로", "충남 세종시": "세종특별자치시", "모현동 2가": "모현동2가"}


def fix_typos(addr):
    for a, b in TYPOS.items():
        addr = addr.replace(a, b)
    return addr


def km(a, b):
    return math.hypot((a[0] - b[0]) * 88.8, (a[1] - b[1]) * 111.0)


# ---------------------------------------------------------------- 원자료

def load_rpc():
    out = []
    for r in read_std(find("전국미곡처리장표준데이터")):
        out.append({
            "kind": "rpc", "name": r["업체명"], "road": r["소재지도로명주소"], "jibun": r["소재지지번주소"],
            "tel": r["전화번호"], "provider": r["제공기관명"],
            "info": {"업종": r["업종명"], "월간 가공능력": r["월간가공능력규모"], "월간 보관능력": r["월간보관능력규모"],
                     "직원": r["총직원수"], "기준일": r["데이터기준일자"], "제공": r["제공기관명"]},
        })
    return out


def load_apc():
    out = []
    for r in read_std(find("전국농산물산지유통센터_APC_표준데이터")):
        ll = None
        try:
            lat, lon = float(r["위도"]), float(r["경도"])
            if 33 < lat < 39 and 124 < lon < 132:
                ll = (lon, lat)
            elif 33 < lon < 39 and 124 < lat < 132:  # 위도·경도가 바뀌어 들어간 경우
                ll = (lat, lon)
        except ValueError:
            pass
        out.append({
            "kind": "apc", "name": r["유통센터명"], "road": r["소재지도로명주소"], "jibun": r["소재지지번주소"],
            "tel": r["전화번호"], "ll": ll, "provider": r["제공기관명"],
            "info": {"주요 품목": r["주요품목명"].replace("+", ", "), "설립": r["설립연도"], "관리": r["관리기관명"],
                     "기준일": r["데이터기준일자"]},
        })
    return out


LF_SIDO = {"서울": "서울특별시", "부산": "부산광역시", "대구": "대구광역시", "인천": "인천광역시", "광주": "광주광역시",
           "대전": "대전광역시", "울산": "울산광역시", "세종": "세종특별자치시", "경기": "경기도", "강원": "강원특별자치도",
           "충북": "충청북도", "충남": "충청남도", "전북": "전북특별자치도", "전남": "전라남도", "경북": "경상북도",
           "경남": "경상남도", "제주": "제주특별자치도"}


def lf_address(sido, sgg, addr):
    """직매장 주소는 시도·시군이 빠진 경우가 있다(담양군 고서면…, 경기 양평읍…) → 시도·시군 열로 채운다."""
    toks = addr.split()
    if toks and not sido_key(toks[0]):
        toks = [LF_SIDO.get(sido, sido)] + toks
    if sgg and len(toks) > 1 and not toks[1].startswith(sgg) and not re.search(r"(시|군|구)$", toks[1]):
        # 시군이 빠졌다: 다음 토큰이 읍면이면 그 앞에 시군을 넣는다 (시인지 군인지는 VWorld 행정구역으로 고른다)
        toks.insert(1, sgg)
    return " ".join(toks)


def load_localfood():
    path = find("국비지원+로컬푸드+직매장")
    x = pd.read_excel(path, dtype=str)
    out = []
    for r in x.to_dict("records"):
        r = {k: clean(v) for k, v in r.items()}
        if not r.get("매장명"):
            continue
        out.append({
            "kind": "lf", "name": r["매장명"], "road": lf_address(r["시도"], r["시군구"], r["주소"]), "jibun": "",
            "raw": r["주소"], "sido": r["시도"], "sgg": r["시군구"], "tel": r["연락처"],
            "info": {"운영": r["운영주체"], "개장": r["개장일"], "기준": "2021년"},
        })
    return out


# 6차산업 소재지: 행정구역 개편(군위군 → 대구 2023, 청원군 → 청주 2014)과 오타·붙여 쓴 주소 (VWorld로 확인)
SIX_FIX = [
    (r"^(경상북도|경북) 군위군", "대구광역시 군위군"),
    (r"^충청북도 (청원군 )?(청주시 )?(청원군 )?(미원면|문의면)", r"충청북도 청주시 상당구 \4"),
    (r"^충청북도 청주시 청원군 오창읍", "충청북도 청주시 청원구 오창읍"),
    (r"^제주특별(자치)?시 ", "제주특별자치도 "),
    (r"\s*\((경북|경상북도) 군위군 [^)]*\)", ""),
    (r"창년군", "창녕군"), (r"서신시 고북면", "서산시 고북면"), (r"경기도 인천시 신둔면", "경기도 이천시 신둔면"),
    (r"화순군이서면규봉로984", "화순군 이서면 규봉로 984"), (r"경산시압량면 강서리185-16", "경산시 압량면 강서리 185-16"),
    (r"한티로2206-37", "한티로 2206-37"), (r"한밤8길11", "한밤8길 11"),
    (r" 신우목장내 신우에프티$", ""), (r"^경기 연천 군남 옥계 ", "경기도 연천군 군남면 옥계리 "),
    (r", \(신화1길 22\)$", ""),
]


def load_six():
    """6차산업 인증 사업자. 소재지에 시도·시군이 빠진 곳(남양주시 진건읍…, 고흥군…)은 지역·시군 열로 채운다.
    소재지가 도로명인지 지번인지 섞여 있어 두 방식 모두 시도한다."""
    path = find("농림축산식품부_6차산업 인증 사업자 현황")
    with open(path, encoding="cp949", newline="") as fh:
        recs = list(csv.DictReader(fh))
    out = []
    for r in recs:
        r = {clean(k): clean(v) for k, v in r.items()}
        if not r.get("경영체명"):
            continue
        addr = r["소재지"]
        for a, b in SIX_FIX:
            addr = re.sub(a, b, addr)
        addr = lf_address("대구" if "군위" in r["시군"] else r["지역"], r["시군"], addr)
        out.append({
            "kind": "six", "name": r["경영체명"], "road": addr, "jibun": addr,
            "raw": r["소재지"], "sido": r["지역"], "sgg": r["시군"], "tel": "",
            "info": {"인증번호": r["인증번호"], "인증연도": r["인증번호"][:4] + "년", "기준": "2020년 자료"},
        })
    return out


# ---------------------------------------------------------------- 좌표

def fix_sigungu(vw, p, sgg):
    """'양평' 같은 시군 약칭을 행정구역 이름(양평군)으로 바꾼다."""
    if not p or not sgg or re.search(r"(시|군|구)$", p["sigungu"].split()[0] if p["sigungu"] else ""):
        return p
    for it in vw.district(sgg, "L2"):
        toks = it["title"].split()
        if sido_key(toks[0]) == p["sido"] and toks[1].startswith(sgg):
            return dict(p, sigungu=toks[1])
    return p


def place_hit(vw, f, p):
    """시설 이름으로 장소 검색. 이름이 같고 주소의 시군(·읍면)과 맞는 첫 후보."""
    key = norm_name(f["name"])
    queries = dict.fromkeys([f["name"], re.sub(r"\([^)]*\)", " ", f["name"]).strip()])
    for q in queries:
        for it in vw.place(q):
            addr = it["address"].get("parcel") or it["address"].get("road") or ""
            if norm_name(it["title"]) != key or not p:
                continue
            if same_area(p, addr) and (same_emd(p, addr) or same_emd(p, it["address"].get("road", ""))):
                return float(it["point"]["x"]), float(it["point"]["y"]), f'{it["title"]} · {addr}'
    return None


def locate(vw, f):
    """(lon, lat, 정밀도, 기준) — 정밀도: 도로명·지번·상호·리·읍면동·시군구·시도."""
    f = dict(f, road=fix_typos(f["road"]), jibun=fix_typos(f["jibun"]))
    p = parse_addr(f["road"]) or parse_addr(f["jibun"])
    if f["kind"] in ("lf", "six"):
        p = fix_sigungu(vw, p, f["sgg"])
    for addr, kind in ((f["road"], "road"), (f["jibun"], "parcel")):
        if not addr:
            continue
        r = vw.coord(addr, kind)
        if r and (not p or same_area(p, r[2])):
            return r[0], r[1], "도로명" if kind == "road" else "지번", r[2]
    # 해석한 주소로 다시 (로컬푸드처럼 시군을 채운 경우)
    if p and p["level"] in ("도로명", "지번"):
        g = geocode(vw, dict(p))
        if g and g[2] in ("도로명", "지번"):
            return g
    hit = place_hit(vw, f, p)
    if hit:
        return hit[0], hit[1], "상호", hit[2]
    if p:
        return geocode(vw, p)
    return None


def main():
    vw = VWorld(load_env()["VWORLD_API_KEY"])
    facs = load_rpc() + load_apc() + load_localfood() + load_six()
    print({k: sum(f["kind"] == k for f in facs) for k in ("rpc", "apc", "lf", "six")}, file=sys.stderr)
    try:
        with cf.ThreadPoolExecutor(8) as pool:
            locs = list(pool.map(lambda f: locate(vw, f), facs))
    finally:
        vw.save()

    checks = []
    for f, g in zip(facs, locs):
        f["lon"] = f["lat"] = None
        f["prec"], f["ref"] = "없음", ""
        if g:
            f["lon"], f["lat"], f["prec"], f["ref"] = g
        ll = f.get("ll")
        if not ll:
            continue
        d = km(ll, (f["lon"], f["lat"])) if g else None
        if f["prec"] in EXACT:
            if d >= 1.0:
                checks.append({"name": f["name"], "addr": f["road"] or f["jibun"], "file_lat": ll[1], "file_lon": ll[0],
                               "geo_lat": f["lat"], "geo_lon": f["lon"], "geo_prec": f["prec"], "km": round(d, 2)})
        elif d is None or d < 30:
            # 주소로는 시군·읍면까지만 찾았다 → 그 지역 안에 있는 파일 좌표를 쓴다
            f["lon"], f["lat"], f["prec"], f["ref"] = ll[0], ll[1], "좌표", f["road"] or f["jibun"]

    with open(os.path.join(AT, "facilities_check.csv"), "w", newline="", encoding="utf-8-sig") as fh:
        w = csv.DictWriter(fh, fieldnames=["name", "addr", "file_lat", "file_lon", "geo_lat", "geo_lon", "geo_prec", "km"])
        w.writeheader()
        w.writerows(sorted(checks, key=lambda c: -c["km"]))

    precs = ["도로명", "지번", "좌표", "상호", "리", "읍면동", "시군구", "시도"]
    kinds = {"rpc": "미곡처리장(도정업체)", "apc": "산지유통센터(APC)", "lf": "로컬푸드 직매장", "six": "6차산업 인증 사업자"}
    # 표준데이터는 자료를 낸 지자체 것만 담는다 → 몇 곳의 자료인지 함께 싣는다 (직매장·6차산업은 전국 목록)
    providers = [len({f["provider"] for f in facs if f["kind"] == k}) if k in ("rpc", "apc") else None for k in kinds]
    rows = []
    for f in facs:
        info = {k: v for k, v in f["info"].items() if v}
        rows.append([list(kinds).index(f["kind"]),
                     round(f["lon"], 6) if f["lon"] is not None else None,
                     round(f["lat"], 6) if f["lat"] is not None else None,
                     precs.index(f["prec"]) if f["prec"] in precs else -1,
                     f["name"], f.get("raw", f["road"]), "" if f["kind"] == "six" else f["jibun"], f["tel"], info])
    data = {"built": time.strftime("%Y-%m-%d"), "kinds": list(kinds.values()), "providers": providers, "precs": precs, "rows": rows}
    with open(os.path.join(ROOT, "data", "facilities.js"), "w", encoding="utf-8") as fh:
        fh.write("// 미곡종합처리장·산지유통센터(공공데이터 표준데이터)·로컬푸드 직매장·6차산업 인증 사업자 + VWorld 좌표 (scripts/build_facilities.py)\n")
        fh.write("window.AGRI_FACILITIES = ")
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
        fh.write(";\n")

    import collections
    for k in kinds:
        print(kinds[k], dict(collections.Counter(f["prec"] for f in facs if f["kind"] == k)))
    print(f"APC 파일 좌표와 주소가 1km 이상 차이: {len(checks)}곳 (at_data/facilities_check.csv)")
    return facs


if __name__ == "__main__":
    main()
