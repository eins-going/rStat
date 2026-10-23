"""국립환경과학원 전국오염원조사 축산계·환경기초시설 → db/raw/livestock/<연도>/ (공공데이터포털 OpenAPI).

- ri.json   축산계 정보제공서비스(StobrService): 리 × 축종 한 줄 (사육두수·농가수·법적규제·분뇨 발생량·처리 방법)
- sgg.json  시군구 통계 서비스 축산계(getSigunguStobrInfo): 리 합계와 대조해 검증만 한다
- fac.json  시군구 통계 서비스 환경기초시설 기본현황: 가축분뇨 공공처리시설 목록에 쓴다

자료는 2012년부터 있고 약 2년 늦게 나온다. 받은 해는 다시 받지 않고(--redo로 다시), 마지막으로 받은 해 다음 해부터
자료가 나왔는지 본다. 포털 화면에는 첫 기능 이름만 보여, 기능 이름은 개별 서비스 이름에서 따왔다 (getSigungu + 꼬리).
실행: python scripts/fetch_livestock.py [--redo 2024]
"""
import argparse
import datetime as dt
import json
import os
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = "https://apis.data.go.kr/1480523"
FIRST = 2012
FILES = {  # 파일: (서비스, 기능, 한 번에 받을 줄)
    "ri.json": ("StobrService", "getStobrInfo", 10000),
    "sgg.json": ("SigunguStatService", "getSigunguStobrInfo", 1000),
    "fac.json": ("SigunguStatService", "getSigunguFcltyBassSttusInfo", 500),  # 1000줄이면 끊기는 일이 있다
}


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


def get(url, tries=4):
    for t in range(tries):
        try:
            return urllib.request.urlopen(url, timeout=180).read().decode("utf-8")
        except Exception:
            if t == tries - 1:
                raise
            time.sleep(3 * (t + 1))


def pull(key, svc, op, year, per):
    """한 해 전부 → 줄 목록. 그해 자료가 없으면 []"""
    rows, page = [], 1
    while True:
        q = urllib.parse.urlencode({"serviceKey": key, "pageNo": page, "numOfRows": per, "resultType": "json", "startYear": year, "endYear": year})
        t = get(f"{BASE}/{svc}/{op}?{q}")
        if "LIMITED_NUMBER_OF_SERVICE_REQUESTS" in t:
            raise DailyLimit(op)
        d = json.loads(t)
        if op not in d:
            raise RuntimeError(f"{op} {year}: {t[:200]!r}")
        d = d[op]
        if d["header"]["code"] != "00":
            raise RuntimeError(f"{op} {year}: {d['header']}")
        rows += d["item"] or []
        if len(rows) >= d["totalCount"] or not d["item"]:
            return rows
        page += 1
        time.sleep(0.2)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--redo", type=int, action="append", default=[], help="이 해는 다시 받는다")
    a = ap.parse_args()
    key = env()["DATA_PORTAL_API_KEY"]
    raw = os.path.join(ROOT, "db", "raw", "livestock")
    new = []
    try:
        for y in range(FIRST, dt.date.today().year + 1):
            d = os.path.join(raw, str(y))
            if y not in a.redo and all(os.path.exists(os.path.join(d, f)) for f in FILES):
                continue
            got = {}
            for f, (svc, op, per) in FILES.items():
                got[f] = pull(key, svc, op, y, per)
                if f == "ri.json" and not got[f]:
                    break  # 그해 자료가 아직 없다
            if not got["ri.json"]:
                print(f"{y}년: 아직 없음")
                break
            os.makedirs(d, exist_ok=True)
            for f, rows in got.items():
                with open(os.path.join(d, f), "w", encoding="utf-8") as fh:
                    json.dump(rows, fh, ensure_ascii=False)
            new.append(y)
            print(f"{y}년: 리 {len(got['ri.json']):,}줄 · 시군구 {len(got['sgg.json'])} · 시설 {len(got['fac.json']):,}")
    except DailyLimit as e:
        print(f"하루 허용 횟수를 넘었다({e}). 내일 다시 돌리면 잇는다.")
        sys.exit(2)
    print(f"끝: 새로 받은 해 {new or '없음'}")


if __name__ == "__main__":
    main()
