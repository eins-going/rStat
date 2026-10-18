"""농산물 유통시설·생산단지·수출단지 일곱 가지에 좌표를 붙여 data/facilities.js로 저장한다.

원자료 (at_data/, git 제외):
- 전국미곡처리장표준데이터-YYYYMMDD.xls       미곡처리장 (공공데이터포털 표준데이터; 대부분 도정업, 정미소 포함)
- 전국농산물산지유통센터_APC_표준데이터-YYYYMMDD.xls  산지유통센터(APC), 일부는 위경도 포함
- 국비지원+로컬푸드+직매장+운영현황(`21년기준).xlsx  로컬푸드 직매장 (2021년 기준)
- 농림축산식품부_6차산업 인증 사업자 현황_YYYYMMDD.csv  6차산업 인증 경영체 (CP949, 대표자 이름은 싣지 않는다)
- fruit_area.json  농사로 과수 생산단지 (scripts/fetch_fruit_area.py로 받는다)
- 한국농수산식품유통공사_수출전문농가단지 정보_YYYYMMDD.csv  aT 수출전문농가단지 (CP949)
- 2026년+신선+생과실+수출검역단지(선과장)+등록+현황(…).xlsx  농림축산검역본부 수출검역단지. 주소가 없어
  같은 시군의 같은 이름 시설 → 이름 장소검색 → 시군 중심 순으로 놓는다.

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
KINDS = {"rpc": "미곡처리장(도정업체)", "apc": "산지유통센터(APC)", "lf": "로컬푸드 직매장", "six": "6차산업 인증 사업자",
         "fruit": "과수 생산단지", "exp": "수출전문농가단지", "quar": "수출검역단지(선과장)"}
# 점 색 (유통시설 지도와 통계 페이지의 '자세히 보기'가 같이 쓴다)
COLORS = {"rpc": "#f5a524", "apc": "#5fb37c", "lf": "#ff7ab6", "six": "#6cb8ff",
          "fruit": "#ff5d5d", "exp": "#c6e05a", "quar": "#b28dff"}


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
    if toks and (not sido_key(toks[0]) or toks[0] in ("제주시", "서귀포시")):
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


# 행정구역 개편: 군위군 → 대구광역시(2023), 청원군 → 청주시의 구(2014), 제주특별시 → 제주특별자치도,
# 그 밖에 옛 주소에 남은 시군·읍면 이름 (과수 생산단지는 2006~2014년 자료)
RENAMED = [
    (r"(충청북도|충북) 청원군 부용면", "세종특별자치시 부강면"), (r"(충청남도|충남) 연기군 서면", "세종특별자치시 연서면"),
    (r"(충청남도|충남) 연기군 ", "세종특별자치시 "), (r"여주군", "여주시"), (r"당진군", "당진시"),
    (r"(경상남도|경남) 마산시 내서읍", "경상남도 창원시 마산회원구 내서읍"), (r"예천군 하리면", "예천군 은풍면"),
    (r"상주시 사벌면", "상주시 사벌국면"), (r"영월군 하동면", "영월군 김삿갓면"), (r"남원시 운봉$", "남원시 운봉읍"),
]
CHEONGWON = {"낭성면": "상당구", "미원면": "상당구", "가덕면": "상당구", "남일면": "상당구", "문의면": "상당구",
             "남이면": "서원구", "현도면": "서원구", "오송읍": "흥덕구", "강내면": "흥덕구", "옥산면": "흥덕구",
             "내수읍": "청원구", "오창읍": "청원구", "북이면": "청원구"}


def fix_admin(addr):
    for a, b in RENAMED:
        addr = re.sub(a, b, addr)
    addr = re.sub(r"^(경상북도|경북) 군위군", "대구광역시 군위군", addr)
    addr = re.sub(r"^제주특별(자치)?시 ", "제주특별자치도 ", addr)
    m = re.match(r"^(충청북도|충북) (?:청주시 )?청원군 (\S+)", addr)
    if m:
        gu = CHEONGWON.get(m.group(2))
        addr = f"충청북도 청주시 {gu + ' ' if gu else ''}{m.group(2)}" + addr[m.end():]
    return addr


# 6차산업 소재지 오타·붙여 쓴 주소 (VWorld로 확인)
SIX_FIX = [
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
        addr = fix_admin(addr)
        addr = lf_address("대구" if "군위" in r["시군"] else r["지역"], r["시군"], addr)
        out.append({
            "kind": "six", "name": r["경영체명"], "road": addr, "jibun": addr,
            "raw": r["소재지"], "sido": r["지역"], "sgg": r["시군"], "tel": "",
            "info": {"인증번호": r["인증번호"], "인증연도": r["인증번호"][:4] + "년", "기준": "2020년 자료"},
        })
    return out


def load_fruit():
    """농사로 과수 생산단지 (scripts/fetch_fruit_area.py가 받은 at_data/fruit_area.json).
    주소가 '…면 일원'처럼 지역 단위인 곳이 많다 → 대개 읍면·리 중심에 놓인다."""
    with open(os.path.join(AT, "fruit_area.json"), encoding="utf-8") as fh:
        rows = json.load(fh)["rows"]
    out = []
    for r in rows:
        r = {k: clean(v) for k, v in r.items()}
        addr = fix_admin(lf_address(r["area"], r["city"], r["adres"]))
        out.append({
            "kind": "fruit", "name": r["cntntsSj"], "road": addr, "jibun": addr, "raw": r["adres"],
            "sido": r["area"], "sgg": r["city"], "tel": "",
            "info": {"과종": r["ftrClCode"], "재배면적": r.get("ctvtAr", ""), "농가": r.get("frmhsCo", ""),
                     "단지": r["hsmpClCode"], "조성": r["stepClCode"], "자료": "농사로"},
        })
    return out


def load_export():
    """aT 수출전문농가단지 (재배면적은 ㎡)."""
    with open(find("한국농수산식품유통공사_수출전문농가단지"), encoding="cp949", newline="") as fh:
        recs = [{clean(k): clean(v) for k, v in r.items()} for r in csv.DictReader(fh)]
    out = []
    for r in recs:
        if not r.get("단지명"):
            continue
        addr = fix_admin(r["상세 주소"])
        try:
            area = f'{float(r["재배면적(제곱미터)"]) / 10000:,.1f}ha'
        except ValueError:
            area = ""
        out.append({
            "kind": "exp", "name": r["단지명"], "road": addr, "jibun": addr, "raw": r["상세 주소"], "tel": "",
            "info": {"품목": r["재배 품목"], "재배면적": area, "농가": f'{r["소속농가수"]}호' if r["소속농가수"] else "",
                     "관할": r["관할 지역"], "기준": "2026년 9월"},
        })
    return out


# 검역본부 지역본부 → 그 관할에 들 수 있는 시도 (시군 이름이 겹칠 때 고르는 데 쓴다)
QUAR_SIDO = {"서울": {"서울", "경기", "인천", "강원"}, "중부": {"충북", "충남", "대전", "세종", "경기", "인천", "강원"},
             "영남": {"경북", "경남", "대구", "부산", "울산"}, "호남": {"전북", "전남광주"}, "제주": {"제주"}}


def load_quarantine():
    """농림축산검역본부 신선 생과실 수출검역단지(선과장). 주소가 없고 시군·이름만 있다.
    한 단지가 품목·수출국마다 한 줄씩 있어 (지역본부, 시군, 단지명)으로 묶는다."""
    x = pd.read_excel(find("2026년+신선+생과실+수출검역단지"), header=4, dtype=str).iloc[:, 1:]
    x.columns = [clean(c).replace("\u2024", "") for c in x.columns]
    groups = {}
    for r in x.to_dict("records"):
        r = {k: clean(v) for k, v in r.items()}
        if not r.get("단지명/선과장명"):
            continue
        g = groups.setdefault((r["지역본부"], r["시군명"], r["단지명/선과장명"]), {"items": {}, "office": r["사무소"]})
        g["items"].setdefault(r["수출품목"], []).append(r["수출국"])
    out = []
    for (region, sgg, name), g in groups.items():
        items = ", ".join(f'{k}({"·".join(dict.fromkeys(v))})' for k, v in g["items"].items())
        out.append({
            "kind": "quar", "name": name, "road": "", "jibun": "", "raw": "", "tel": "",
            "region": region, "sgg": sgg,
            "info": {"시군": sgg, "수출 품목(국가)": items, "검역 사무소": g["office"], "기준": "2026년 7월 15일"},
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
    if f["kind"] in ("lf", "six", "fruit"):
        p = fix_sigungu(vw, p, f["sgg"])
    for addr, kind in ((f["road"], "road"), (f["jibun"], "parcel")):
        # 번지·건물번호가 없는 주소('…면 일원')를 넣으면 VWorld가 그 지역의 아무 지점이나 준다
        if not re.search(r"\d", addr):
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


def quar_area(vw, f):
    """검역단지의 시군 → parse_addr 꼴 dict. '이천,여주'는 앞 시군, 부산시·울산시는 시도 전체."""
    sgg = f["sgg"].split(",")[0].strip()
    ok = QUAR_SIDO.get(f["region"], set())
    base = {"sigungu": "", "emd": "", "ri": "", "rest": "", "road": False, "level": "시군구"}
    if sgg in ("부산시", "울산시"):
        return dict(base, sido=sgg[:2], level="시도")
    if sgg == "세종시":
        return dict(base, sido="세종", sigungu="세종시")
    for it in vw.district(sgg, "L2"):
        toks = it["title"].split()
        if len(toks) > 1 and sido_key(toks[0]) in ok and toks[1].startswith(sgg):
            return dict(base, sido=sido_key(toks[0]), sigungu=toks[1])
    return None


def name_variants(name):
    """'상주외서농협/연봉선과장, 남적수출선과장' → 각 이름 (괄호 안 설명은 뺀 것, 농업협동조합 → 농협,
    '… 포도수출단지'·'선과장' 같은 꼬리를 뗀 것도)."""
    out = []
    for part in re.split(r"[/,]", name):
        part = part.strip()
        base = re.sub(r"\([^)]*\)", " ", part).strip()
        short = base.replace("농업협동조합", "농협").replace("농산물산지유통센터", "산지유통센터")
        suffix = r"(수출단지|수출선과장|선과장|수출농단|가공공장|수출작목반)$"
        toks = short.split()
        tail = " ".join(toks[:-1]) if len(toks) > 1 and re.search(suffix, toks[-1]) else re.sub(suffix, "", short)
        for v in (part, base, short, tail):
            if len(norm_name(v)) >= 2 and v not in out:
                out.append(v)
    return out


def locate_quar(vw, f, known):
    """1) 지도에 이미 있는 같은 이름 시설(같은 시군) → 2) 이름 장소검색(같은 시군, 이름이 같거나 한쪽이 다른 쪽으로
    시작할 때 — 동청도농협 ≠ 청도농협 — 후보가 2km 안에 모일 때만) → 3) 시군(또는 시도) 중심."""
    p = quar_area(vw, f)
    if not p:
        return None
    for v in name_variants(f["name"]):
        for lon, lat, prec, text, kind in known.get(norm_name(v), []):
            if same_area(p, text):
                return lon, lat, prec, f"{v} = {kind} · {text}"
    for v in name_variants(f["name"]):
        key = norm_name(v)
        exact, loose = [], []
        for it in vw.place(v):
            addr = it["address"].get("parcel") or it["address"].get("road") or ""
            if not same_area(p, addr):
                continue
            t = norm_name(it["title"])
            hit = (float(it["point"]["x"]), float(it["point"]["y"]), f'{it["title"]} · {addr}')
            if t == key:
                exact.append(hit)
            elif len(key) >= 4 and len(t) >= 4 and (t.startswith(key) or key.startswith(t)):
                loose.append(hit)
        for hits in (exact, loose):
            if hits and all(km(h[:2], hits[0][:2]) < 2 for h in hits):
                return hits[0][0], hits[0][1], "상호", hits[0][2]
    level = "시도" if p["level"] == "시도" else "시군구"
    r = district_point(vw, p, level)
    return (r[0], r[1], level, r[2]) if r else None


def sgg_of(f):
    """시설이 속한 시군 이름(김해시, 청주시; 광역시는 구). 좌표를 찾은 주소에서, 없으면 고친 원주소에서 읽는다.
    통계 페이지의 '자세히 보기'가 단순화한 시군 경계 가까이에 있는 시설을 주소로 가려 담는 데 쓴다."""
    for text in (f["ref"].split(" · ")[-1], fix_admin(fix_typos(f["road"] or f["jibun"]))):
        p = parse_addr(text)
        if p and p["sigungu"]:
            return p["sigungu"].split()[0]
    return ""


def main():
    vw = VWorld(load_env()["VWORLD_API_KEY"])
    facs = load_rpc() + load_apc() + load_localfood() + load_six() + load_fruit() + load_export()
    quar = load_quarantine()
    print({k: sum(f["kind"] == k for f in facs + quar) for k in KINDS}, file=sys.stderr)
    try:
        with cf.ThreadPoolExecutor(8) as pool:
            locs = list(pool.map(lambda f: locate(vw, f), facs))
            # 검역단지는 주소가 없다 → 이미 찾은 시설 중 같은 이름을 먼저 본다
            known = {}
            for f, g in zip(facs, locs):
                if g and g[2] in EXACT:
                    known.setdefault(norm_name(f["name"]), []).append((g[0], g[1], g[2], g[3].split(" · ")[-1], KINDS[f["kind"]]))
            qlocs = list(pool.map(lambda f: locate_quar(vw, f, known), quar))
            locs += qlocs
            facs += quar
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
    kinds = KINDS
    # 표준데이터는 자료를 낸 지자체 것만 담는다 → 몇 곳의 자료인지 함께 싣는다 (직매장·6차산업은 전국 목록)
    providers = [len({f["provider"] for f in facs if f["kind"] == k}) if k in ("rpc", "apc") else None for k in kinds]
    rows = []
    for f in facs:
        info = {k: v for k, v in f["info"].items() if v}
        rows.append([list(kinds).index(f["kind"]),
                     round(f["lon"], 6) if f["lon"] is not None else None,
                     round(f["lat"], 6) if f["lat"] is not None else None,
                     precs.index(f["prec"]) if f["prec"] in precs else -1,
                     f["name"], f.get("raw", f["road"]), "" if "raw" in f else f["jibun"], f["tel"], info, sgg_of(f)])
    # 행: [종류, 경도, 위도, 정밀도, 이름, 주소, 지번, 전화, {정보}, 시군]
    data = {"built": time.strftime("%Y-%m-%d"), "kinds": list(kinds.values()), "colors": [COLORS[k] for k in kinds], "providers": providers, "precs": precs, "rows": rows}
    with open(os.path.join(ROOT, "data", "facilities.js"), "w", encoding="utf-8") as fh:
        fh.write("// 미곡처리장·APC·로컬푸드 직매장·6차산업·과수 생산단지·수출전문농가단지·수출검역단지 + VWorld 좌표 (scripts/build_facilities.py)\n")
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
