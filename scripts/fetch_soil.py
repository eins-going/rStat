"""농경지 토양: 농촌진흥청 국립농업과학원 OpenAPI 두 가지를 시군구마다 db/raw/soil/<판>/에 받는다.

- 농경지화학성 통계정보 V2 (SoilExamStat/V2): 토양검정 결과를 구간별 면적(ha)으로 묶은 값. 7항목 × 논·밭·시설·과수 × 6구간.
  면적은 실제 경지가 아니라 검정을 받은 필지의 누적 면적이다(팜맵 경지의 약 1.6배, 시군마다 0.1~8배).
- 토양도 기반 토양특성 통계정보 V2 (SoilCharacStat/V2): 정밀토양도의 시군 전체 땅(산 포함)을 등급별 면적으로 묶은 값.
  논·밭 적성등급(1~5급지)과 저해요인만 받는다(최소 수집). 저해요인의 '제외'는 5급지, '없음'은 1급지와 같다.

받는 방식 (2026-10-22 전수 시험으로 정했다)
- 시군구 코드(5자리 + '00000')로만 부른다. 시도는 시군 합과 같아(확인) 부르지 않고, 전국 코드는 없다.
  구가 있는 시(창원 4812000000 등)는 시 코드로는 자료가 없어 구 코드를 받아 더한다(build_soil.py).
- 시군구 코드 목록은 VWorld 검색(type=district, category=L2)으로 시도 이름마다 받는다. 2026년 통합한 전남·광주는
  '전남광주통합특별시'(코드 12)로만 나오고 옛 46·29 코드는 자료가 없다. 키: .env VWORLD_API_KEY
- 응답의 bjd_Nm(이름)은 틀리는 일이 있다(4800000000 → 부산광역시 등). 코드만 믿는다.
- 받은 파일은 다시 받지 않는다(끊기면 이어 받는다). 하루 허용 횟수(개발계정 기능마다 1,000건)를 넘으면 멈추고 다음 날 잇는다.

실행: python scripts/fetch_soil.py [--tag 2026] [--codes]   (--codes: 시군구 코드 목록을 다시 받는다)
"""
import argparse
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://apis.data.go.kr/1390802/SoilEnviron"
GROUPS = {
    "chem": ("SoilExamStat/V2", ["getFarmExamPhInfo", "getFarmExamOmInfo", "getFarmExamApInfo", "getFarmExamKalInfo",
                                 "getFarmExamCalInfo", "getFarmExamMgInfo", "getFarmExamSaInfo"]),
    "charac": ("SoilCharacStat/V2", ["getSoilPaddyGradSpecificInfo", "getSoilFieldGradSpecificInfo",
                                     "getSoilPaddyObstrcFctrSpecificInfo", "getSoilFieldObstrcFctrSpecificInfo"]),
}
SIDO_QUERIES = ["서울특별시", "부산광역시", "대구광역시", "인천광역시", "대전광역시", "울산광역시", "세종특별자치시", "경기도",
                "강원특별자치도", "충청북도", "충청남도", "전북특별자치도", "전남광주통합특별시", "경상북도", "경상남도", "제주특별자치도"]


class DailyLimit(Exception):
    pass


def env():
    out = {}
    with open(os.path.join(ROOT, ".env"), encoding="utf-8") as f:
        for line in f:
            if "=" in line and not line.lstrip().startswith("#"):
                k, v = line.rstrip("\n").split("=", 1)
                out[k.strip()] = v.strip().strip("'\"")
    return out


def get(url, tries=3):
    for t in range(tries):
        try:
            return urllib.request.urlopen(url, timeout=40).read().decode("utf-8")
        except Exception:
            if t == tries - 1:
                raise
            time.sleep(2 * (t + 1))


def fetch_codes(raw, key):
    """VWorld 시군구(L2) 목록 → sgg.json [{id, t}] (id 5자리, t '경상남도 창원시 의창구')"""
    rows = {}
    for q in SIDO_QUERIES:
        u = "https://api.vworld.kr/req/search?" + urllib.parse.urlencode(
            {"request": "search", "type": "district", "category": "L2", "size": 1000, "page": 1, "query": q, "key": key})
        r = json.loads(get(u))["response"]
        items = r.get("result", {}).get("items", []) if r.get("status") == "OK" else []
        got = [i for i in items if i["title"].startswith(q)]
        if not got:
            sys.exit(f"VWorld에서 {q} 시군구를 받지 못했다: {r.get('status')} {r.get('error')}")
        for i in got:
            rows[i["id"]] = i["title"]
        time.sleep(0.2)
    out = [{"id": k, "t": v} for k, v in sorted(rows.items())]
    with open(os.path.join(raw, "sgg.json"), "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=0)
    print(f"시군구 코드 {len(out)}개")
    return out


def call(path, key, code):
    """한 번 부른다 → XML 문자열. 하루 허용 횟수를 넘으면 DailyLimit"""
    t = get(f"{BASE}/{path}?" + urllib.parse.urlencode({"serviceKey": key, "STDG_CD": code}))
    if "LIMITED_NUMBER_OF_SERVICE_REQUESTS" in t or "<returnReasonCode>22<" in t:
        raise DailyLimit(path)
    code_ = re.search(r"<result_Code>\s*(\d+)\s*<", t)
    if not code_ or code_.group(1) not in ("200", "301"):  # 301: 그 지역 자료 없음 (도시의 구 등)
        raise RuntimeError(f"{path} {code}: {t[:200]!r}")
    return t


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tag", default=time.strftime("%Y"), help="판 (같은 판은 이어 받는다)")
    ap.add_argument("--codes", action="store_true", help="시군구 코드 목록을 다시 받는다")
    a = ap.parse_args()
    keys = env()
    raw = os.path.join(ROOT, "db", "raw", "soil", a.tag)
    os.makedirs(raw, exist_ok=True)
    sgg_file = os.path.join(raw, "sgg.json")
    sgg = fetch_codes(raw, keys["VWORLD_API_KEY"]) if a.codes or not os.path.exists(sgg_file) else json.load(open(sgg_file, encoding="utf-8"))
    codes = [s["id"] + "00000" for s in sgg]
    new = 0
    try:
        for g, (base, ops) in GROUPS.items():
            for op in ops:
                d = os.path.join(raw, g, op)
                os.makedirs(d, exist_ok=True)
                todo = [c for c in codes if not os.path.exists(os.path.join(d, f"{c}.xml"))]
                for c in todo:
                    t = call(f"{base}/{op}", keys["DATA_PORTAL_API_KEY"], c)
                    with open(os.path.join(d, f"{c}.xml"), "w", encoding="utf-8") as f:
                        f.write(t)
                    new += 1
                    time.sleep(0.12)  # 기능마다 초당 10건까지
                print(f"{g}/{op}: {len(codes) - len(todo)} 있음, {len(todo)} 받음")
    except DailyLimit as e:
        print(f"하루 허용 횟수를 넘었다({e}). 이번에 {new}건 받음 — 내일 다시 돌리면 잇는다.")
        sys.exit(2)
    print(f"끝: 새로 {new}건")


if __name__ == "__main__":
    main()
