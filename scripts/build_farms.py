"""aT 농식품 생산자 목록(at_data/농가리스트.xls)에 좌표를 붙여 at_data/farms_geocoded.csv로 저장한다.

(지도에는 아직 싣지 않는다: 개인·단체는 주소가 시군까지만 있어 위치가 불명확하다. 주소 해석·지오코딩 함수는
scripts/build_facilities.py가 같이 쓴다.)

원자료: https://www.atfis.or.kr/home/producer.do (aT 식품산업통계정보 생산자 정보)
- 엑셀과 사이트 목록은 행 순서가 같다. 사이트 목록(at_data/atfis_list.csv)에서 상세 id를 붙인다.
- 개인·단체는 이름이 가려져(김**) 있고 주소가 시군까지만 있다 → 행정구역 중심점
- 상호가 공개된 법인·RPC·농협·온라인농가는 VWorld 장소검색으로 상호를 찾아,
  결과 주소가 목록 주소(시도·시군·읍면)와 맞을 때만 그 지점을 쓴다
- 주소가 없는 행은 상호검색 결과를 전화 지역번호로 확인하고, 그래도 없으면
  at_data/manual_addr.csv(웹 검색으로 찾은 주소)를 쓴다. 끝까지 없으면 지역번호로 시도만 잡는다
- 그 밖의 주소는 지번·도로명 → 리 → 읍면동 → 시군구 순으로 가장 자세한 단위를 지오코딩한다
VWorld 응답은 at_data/cache/vworld.json에 저장해 다시 부르지 않는다.
실행: python scripts/build_farms.py   (키: .env의 VWORLD_API_KEY)
"""
import concurrent.futures as cf
import csv
import json
import os
import re
import sys
import threading
import time
import unicodedata
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
AT = os.path.join(ROOT, "at_data")
CACHE = os.path.join(AT, "cache", "vworld.json")

# 시도 이름(약칭 포함) → 묶음 키. 2026년 전남·광주 통합(전남광주통합특별시)을 감안해 한 묶음으로 본다
SIDO_KEYS = [
    ("서울", "서울"), ("부산", "부산"), ("대구", "대구"), ("인천", "인천"), ("광주", "전남광주"),
    ("대전", "대전"), ("울산", "울산"), ("세종", "세종"), ("경기", "경기"), ("강원", "강원"),
    ("충청북", "충북"), ("충북", "충북"), ("충청남", "충남"), ("충남", "충남"),
    ("전라북", "전북"), ("전북", "전북"), ("전라남", "전남광주"), ("전남", "전남광주"),
    ("경상북", "경북"), ("경북", "경북"), ("경상남", "경남"), ("경남", "경남"), ("제주", "제주"),
]
SIDO_FULL = {
    "서울": "서울특별시", "부산": "부산광역시", "대구": "대구광역시", "인천": "인천광역시",
    "대전": "대전광역시", "울산": "울산광역시", "세종": "세종특별자치시", "경기": "경기도",
    "강원": "강원특별자치도", "충북": "충청북도", "충남": "충청남도", "전북": "전북특별자치도", "전남광주": "전남광주통합특별시",
    "경북": "경상북도", "경남": "경상남도", "제주": "제주특별자치도",
}
SIDO_NAMES = {
    "서울특별시", "부산광역시", "대구광역시", "인천광역시", "광주광역시", "대전광역시", "울산광역시", "세종특별자치시",
    "세종특별시", "세종시", "경기도", "강원도", "강원특별자치도", "충청북도", "충청남도", "전라북도", "전북특별자치도",
    "전라남도", "전남광주통합특별시", "경상북도", "경상남도", "제주특별자치도", "제주도", "서울", "부산", "대구", "인천", "광주", "대전",
    "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주",
}
# 전화 지역번호 → 시도 묶음 (주소가 없는 행 확인용)
AREA_CODES = {
    "02": "서울", "031": "경기", "032": "인천", "033": "강원", "041": "충남", "042": "대전",
    "043": "충북", "044": "세종", "051": "부산", "052": "울산", "053": "대구", "054": "경북",
    "055": "경남", "061": "전남광주", "062": "전남광주", "063": "전북", "064": "제주",
}
LEGAL = r"농업회사법인|영농조합법인|농업법인|주식회사|유한회사|합명회사|합자회사|협동조합|조합공동사업법인|㈜|\(주\)|\(유\)|\(합\)|주\)"


def sido_key(token):
    for prefix, key in SIDO_KEYS:
        if token.startswith(prefix):
            return key
    return None


def area_sido(tel):
    m = re.match(r"^(0\d{1,2})-", tel or "")
    return AREA_CODES.get(m.group(1)) if m else None


def full_name(name):
    """법인 형태는 남기고 표기만 맞춘 이름 (㈜ = (주), 띄어쓰기·괄호 무시)."""
    name = unicodedata.normalize("NFC", name).replace("㈜", "주식회사").replace("(주)", "주식회사").replace("(유)", "유한회사")
    return re.sub(r"[\s()（）\[\]·.,\-_]", "", name).upper()


def norm_name(name):
    name = unicodedata.normalize("NFC", name)
    name = re.sub(LEGAL, "", name)
    name = re.sub(r"[\s()（）\[\]·.,\-_]", "", name)
    return name.upper()


# ---------------------------------------------------------------- 주소 해석

def parse_addr(raw):
    """목록 주소 → dict(sido, sigungu, emd, ri, rest, text). 해석이 안 되면 None."""
    a = unicodedata.normalize("NFC", raw or "").strip()
    a = re.sub(r"\([^)]*\)|,", " ", a)
    a = re.sub(r"\s+", " ", a).strip()
    if not a or a == "-":
        return None
    # 주소가 두 번 이어 붙은 경우(…방림리강원 평창군 …): 뒤쪽 주소를 쓴다
    for m in re.finditer(r"(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충청|충북|충남|전라|전북|전남|경상|경북|경남|제주)\S*\s", a):
        tail = a[m.start():].split()
        if m.start() > 0 and tail[0] in SIDO_NAMES and len(tail) >= 3 and re.search(r"(시|군)$", tail[1]):
            a = " ".join(tail)
            break
    # 시도와 시군이 붙은 경우(경북구미시, 인천광역시강화군)
    first = a.split()[0]
    if first not in SIDO_NAMES:
        for nm in sorted(SIDO_NAMES, key=len, reverse=True):
            if first.startswith(nm) and re.search(r"(시|군|구)$", first[len(nm):]):
                a = nm + " " + a[len(nm):]
                break
    # 지명과 번지가 붙은 경우(원당리5692-24, 후죽리산12). 성수동1가·향양로370번길 같은 이름은 두고
    a = re.sub(r"(\S(?:리|동|가|로|길))(산?\d+(?![\d가]|번?길|로))", r"\1 \2", a)
    # 도로명 사이 띄어쓰기(기월 4길, 포충로 511번길)를 붙인다
    a = re.sub(r"(\S)\s+(\d+번?길)(?=\s)", r"\1\2", a)
    toks = a.split()
    key = sido_key(toks[0])
    if not key:
        return None
    out = {"sido": key, "sigungu": "", "emd": "", "ri": "", "rest": "", "road": False}
    i = 1
    if key == "세종":
        out["sigungu"] = "세종시"
        if i < len(toks) and toks[i].startswith("세종"):
            i += 1
    else:
        if i < len(toks) and re.search(r"(시|군|구)$", toks[i]):
            out["sigungu"] = toks[i]
            i += 1
            if i < len(toks) and out["sigungu"].endswith("시") and re.search(r"구$", toks[i]):
                out["sigungu"] += " " + toks[i]
                i += 1
    if i < len(toks) and re.search(r"(읍|면|동|가)$", toks[i]) and not re.search(r"\d-", toks[i]):
        out["emd"] = toks[i]
        i += 1
    if i < len(toks) and re.search(r"리$", toks[i]) and not re.search(r"\d", toks[i]):
        out["ri"] = toks[i]
        i += 1
    rest = toks[i:]
    if rest and re.search(r"(로|길)$", rest[0]) and len(rest) > 1 and re.match(r"^\d", rest[1]):
        out["road"] = True
        out["rest"] = rest[0] + " " + re.match(r"^[\d-]+", rest[1]).group(0)
    elif rest:
        m = re.match(r"^(산\s?)?(\d+)(?:번지)?(?:\s*-\s*(\d+)|\s+(\d+)호)?", " ".join(rest))
        if m:
            out["rest"] = ("산" if m.group(1) else "") + m.group(2) + (("-" + (m.group(3) or m.group(4))) if (m.group(3) or m.group(4)) else "")
        elif re.search(r"(동|가)$", rest[0]) and not out["emd"]:
            out["emd"] = rest[0]
    if not out["sigungu"] and key not in ("세종",):
        out["level"] = "시도"
    elif out["rest"]:
        out["level"] = "도로명" if out["road"] else "지번"
    elif out["ri"]:
        out["level"] = "리"
    elif out["emd"]:
        out["level"] = "읍면동"
    else:
        out["level"] = "시군구"
    return out


def addr_text(p, upto):
    """해석한 주소를 upto 단위까지 문자열로 (시도는 VWorld가 알아듣는 현행 이름)."""
    parts = [SIDO_FULL.get(p["sido"], ""), p["sigungu"]]
    if upto in ("읍면동", "리", "지번") or (upto == "도로명" and not p["road"]):
        parts.append(p["emd"])
    if upto in ("리", "지번"):
        parts.append(p["ri"])
    if upto in ("지번", "도로명"):
        parts.append(p["rest"])
    return " ".join(x for x in parts if x)


# ---------------------------------------------------------------- VWorld

class VWorld:
    def __init__(self, key):
        self.key = key
        self.lock = threading.Lock()
        os.makedirs(os.path.dirname(CACHE), exist_ok=True)
        self.cache = json.load(open(CACHE, encoding="utf-8")) if os.path.exists(CACHE) else {}
        self.new = 0

    def save(self):
        with self.lock:
            tmp = CACHE + ".tmp"
            with open(tmp, "w", encoding="utf-8") as f:
                json.dump(self.cache, f, ensure_ascii=False)
            os.replace(tmp, CACHE)

    def call(self, url, params):
        ck = url + "?" + urllib.parse.urlencode(sorted(params.items()))
        if ck in self.cache:
            return self.cache[ck]
        q = dict(params, key=self.key, format="json", crs="EPSG:4326")
        for attempt in range(4):
            try:
                with urllib.request.urlopen(url + "?" + urllib.parse.urlencode(q), timeout=20) as r:
                    res = json.loads(r.read().decode("utf-8"), strict=False)["response"]
                break
            except Exception:
                if attempt == 3:
                    raise
                time.sleep(2 ** attempt)
        if res.get("status") not in ("OK", "NOT_FOUND"):
            raise RuntimeError(f"VWorld {res.get('status')}: {res.get('error')} ({params})")
        with self.lock:
            self.cache[ck] = res
            self.new += 1
            if self.new % 500 == 0:
                pass
        if self.new % 500 == 0:
            self.save()
        return res

    def coord(self, address, kind):
        res = self.call("https://api.vworld.kr/req/address",
                        {"service": "address", "request": "getcoord", "type": kind, "address": address, "refine": "true"})
        if res.get("status") != "OK":
            return None
        pt = res["result"]["point"]
        return float(pt["x"]), float(pt["y"]), res["refined"]["text"]

    def district(self, query, category):
        res = self.call("https://api.vworld.kr/req/search",
                        {"request": "search", "type": "district", "category": category, "query": query, "size": "30"})
        return res["result"]["items"] if res.get("status") == "OK" else []

    def place(self, query):
        res = self.call("https://api.vworld.kr/req/search",
                        {"request": "search", "type": "place", "query": query, "size": "30"})
        return res["result"]["items"] if res.get("status") == "OK" else []


def load_env():
    env = {}
    for line in open(os.path.join(ROOT, ".env"), encoding="utf-8"):
        if "=" in line and not line.lstrip().startswith("#"):
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"')
    return env


# ---------------------------------------------------------------- 지오코딩

def same_area(p, text):
    """VWorld가 돌려준 주소(text)가 목록 주소 p의 시도·시군(·읍면동)과 맞는지."""
    toks = text.split()
    if not toks or sido_key(toks[0]) != p["sido"]:
        return False
    if p["sigungu"] and p["sido"] != "세종":
        base = p["sigungu"].split()[0]
        if base not in toks[1:3] and not (p["sigungu"] == "여주시" and "여주군" in toks):
            return False
        if " " in p["sigungu"] and p["sigungu"].split()[1] not in toks[1:4]:
            return False
    return True


def same_emd(p, text):
    return not p["emd"] or p["emd"] in text.split()


def district_point(vw, p, level):
    """행정구역 중심점: level '읍면동'(L4), '시군구'(L2), '시도'(L1)."""
    if level == "읍면동":
        items = vw.district(f'{p["sigungu"]} {p["emd"]}', "L4")
        hits = [it for it in items if same_area(p, it["title"]) and it["title"].split()[-1] == p["emd"]]
    elif level == "시군구":
        items = vw.district(p["sigungu"].split()[-1] if p["sido"] != "세종" else "세종특별자치시", "L2")
        hits = [it for it in items if same_area(p, it["title"])]
        if p["sido"] == "세종":
            hits = items[:1]
        if not hits and " " not in p["sigungu"]:
            # 구가 있는 시(창원시 등)는 L2가 구 단위다 → 그 시의 구 중심점 평균
            items = vw.district(p["sigungu"], "L2")
            hits = [it for it in items if same_area(p, it["title"])]
            if hits:
                xs = [float(it["point"]["x"]) for it in hits]
                ys = [float(it["point"]["y"]) for it in hits]
                return sum(xs) / len(xs), sum(ys) / len(ys), f'{hits[0]["title"].rsplit(" ", 1)[0]} (구 평균)'
    else:
        items = vw.district(SIDO_FULL[p["sido"]], "L1")
        hits = items[:1]
    if not hits:
        return None
    it = hits[0]
    return float(it["point"]["x"]), float(it["point"]["y"]), it["title"]


def geocode(vw, p):
    """가장 자세한 단위부터 시도. (lon, lat, 정밀도, 기준 주소) 또는 None."""
    order = ["지번", "도로명", "리", "읍면동", "시군구", "시도"]
    for level in order[order.index(p["level"]):]:
        if level == "도로명" and not p["road"]:
            continue
        if level == "지번" and p["road"]:
            continue
        if level == "리" and not p["ri"]:
            continue
        if level == "읍면동" and not p["emd"]:
            continue
        if level in ("지번", "도로명", "리"):
            r = vw.coord(addr_text(p, level), "road" if level == "도로명" else "parcel")
            if not r and level == "도로명" and p["emd"]:
                r = vw.coord(" ".join(x for x in [SIDO_FULL.get(p["sido"], ""), p["sigungu"], p["emd"], p["rest"]] if x), "road")
            if r and same_area(p, r[2]) and (level == "도로명" or same_emd(p, r[2])):
                return r[0], r[1], level, r[2]
        else:
            r = district_point(vw, p, level)
            if r:
                return r[0], r[1], level, r[2]
    return None


# ---------------------------------------------------------------- 상호 검색

def poi_candidates(vw, name):
    key = norm_name(name)
    if len(key) < 2:
        return []
    out = []
    queries = [re.sub(r"\s+", " ", re.sub(r"\([^)]*\)", " ", name)).strip()]
    if re.sub(LEGAL, "", queries[0]).strip() and re.sub(LEGAL, "", queries[0]).strip() != queries[0]:
        queries.append(re.sub(r"\s+", " ", re.sub(LEGAL, " ", queries[0])).strip())
    # 괄호 안 상호(…(고은이네고운쌀))도 따로 찾는다
    queries += [m.strip() for m in re.findall(r"\(([^)]{3,})\)", name) if not re.fullmatch(LEGAL, m.strip())]
    alias = {key} | {norm_name(m) for m in re.findall(r"\(([^)]{3,})\)", name)}
    for q in dict.fromkeys(queries):
        for it in vw.place(q):
            if norm_name(it["title"]) in alias:
                addr = it["address"].get("parcel") or it["address"].get("road") or ""
                out.append((float(it["point"]["x"]), float(it["point"]["y"]), addr, it["title"], it.get("address", {})))
    return out


def pick_poi(p, tel, cands, name=""):
    """목록 주소(p, 없으면 None)와 맞는 후보 하나. 주소가 없으면 전화 지역번호로 확인한다."""
    if p:
        ok = [c for c in cands if same_area(p, c[2]) and (same_emd(p, c[2]) or same_emd(p, c[4].get("road", "")))]
        return ok[0] if ok else None
    # 주소가 없으면 '토마토', '(주)자연'처럼 흔한 이름에 붙기 쉽다 → 핵심 이름이 4자 이상이거나 법인 형태까지 같을 때만
    cands = [c for c in cands if len(norm_name(c[3])) >= 4 or full_name(c[3]) == full_name(name)]
    want = area_sido(tel)
    if want:
        ok = [c for c in cands if sido_key(c[2].split()[0] if c[2] else "") == want]
        return ok[0] if ok else None
    # 주소도 전화번호도 없으면 같은 이름의 다른 곳인지 가릴 수 없다
    return None


# ---------------------------------------------------------------- main

def read_rows():
    import xlrd  # noqa: F401  (pandas가 .xls를 읽을 때 필요)
    import pandas as pd
    xls = [f for f in os.listdir(AT) if unicodedata.normalize("NFC", f) == "농가리스트.xls"][0]
    x = pd.read_excel(os.path.join(AT, xls), header=1, dtype=str).fillna("")
    x.columns = ["type", "name", "item", "addr", "tel"]
    site = list(csv.DictReader(open(os.path.join(AT, "atfis_list.csv"), encoding="utf-8")))
    assert len(site) == len(x), (len(site), len(x))
    rows = []
    for (_, r), s in zip(x.iterrows(), site):
        r = {k: re.sub(r"\s+", " ", unicodedata.normalize("NFC", str(v))).strip() for k, v in r.items()}
        assert r["name"].replace(" ", "") == s["name"].replace(" ", "") and r["item"].replace(" ", "") == s["item"].replace(" ", ""), (r, s)
        r["id"] = s["id"]
        rows.append(r)
    return rows


def read_manual():
    path = os.path.join(AT, "manual_addr.csv")
    if not os.path.exists(path):
        return {}
    return {r["id"]: r for r in csv.DictReader(open(path, encoding="utf-8")) if r.get("addr", "").strip() and r.get("confidence") in ("high", "medium")}


def main():
    vw = VWorld(load_env()["VWORLD_API_KEY"])
    rows = read_rows()
    manual = read_manual()
    for r in rows:
        r["p"] = parse_addr(r["addr"])
        r["masked"] = "*" in r["name"]

    pool = cf.ThreadPoolExecutor(8)
    try:
        # 1) 주소 지오코딩 (고유 주소별)
        uniq = {}
        for r in rows:
            if r["p"]:
                uniq.setdefault(json.dumps(r["p"], sort_keys=True, ensure_ascii=False), r["p"])
        geo = dict(zip(uniq, pool.map(lambda p: geocode(vw, p), uniq.values())))
        print(f"주소 {len(uniq)}곳 지오코딩, 실패 {sum(v is None for v in geo.values())}", file=sys.stderr)

        # 2) 상호 검색 (이름이 가려지지 않았고 지번·도로명보다 덜 자세한 행)
        exact = lambda r: r["p"] and (geo[json.dumps(r["p"], sort_keys=True, ensure_ascii=False)] or (0, 0, ""))[2] in ("지번", "도로명")
        targets = [r for r in rows if not r["masked"] and not exact(r)]
        names = sorted({r["name"] for r in targets})
        cands = dict(zip(names, pool.map(lambda n: poi_candidates(vw, n), names)))
        print(f"상호 {len(names)}개 검색", file=sys.stderr)
    finally:
        pool.shutdown()
        vw.save()

    out = []
    for r in rows:
        p = r["p"]
        g = geo.get(json.dumps(p, sort_keys=True, ensure_ascii=False)) if p else None
        rec = {"id": r["id"], "type": r["type"], "name": r["name"], "item": r["item"], "addr": r["addr"],
               "tel": r["tel"], "lon": None, "lat": None, "prec": "없음", "src": "", "ref": ""}
        if g:
            rec.update(lon=g[0], lat=g[1], prec=g[2], src="주소", ref=g[3])
        # 주소가 없는 행: 웹 검색으로 출처를 확인한 주소(at_data/manual_addr.csv)를 목록 주소처럼 쓴다
        if not p and r["id"] in manual:
            m = manual[r["id"]]
            p = parse_addr(m["addr"])
            mg = geocode(vw, p) if p else None
            if mg:
                rec.update(lon=mg[0], lat=mg[1], prec=mg[2], src="웹검색", ref=f'{mg[3]} · {m.get("source", "")}'.strip(" ·"))
        if not r["masked"] and rec["prec"] not in ("지번", "도로명"):
            c = pick_poi(p, r["tel"], cands.get(r["name"], []), r["name"])
            if c:
                rec.update(lon=c[0], lat=c[1], prec="상호", src="상호검색", ref=f'{c[3]} · {c[2]}')
        if rec["lon"] is None and area_sido(r["tel"]):
            k = area_sido(r["tel"])
            mg = district_point(vw, {"sido": k, "sigungu": "", "emd": ""}, "시도")
            if mg:
                rec.update(lon=mg[0], lat=mg[1], prec="시도", src="전화 지역번호", ref=mg[2])
        out.append(rec)
    vw.save()
    return out


if __name__ == "__main__":
    recs = main()
    import collections
    print(collections.Counter((r["src"], r["prec"]) for r in recs))
    with open(os.path.join(AT, "farms_geocoded.csv"), "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(recs[0].keys()))
        w.writeheader()
        w.writerows(recs)
