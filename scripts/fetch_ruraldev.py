"""농촌개발 화면 자료 받기 → db/raw/ruraldev/

1) 지방재정365 '세부사업별 세출현황'(QWGJK): 농촌개발 세부사업 예산 (지자체 코드 없이 사업명 낱말로 전국을 받는다)
   농식품부 농촌공간·지역개발 사업 이름: 농촌중심지활성화·기초생활거점·농촌신활력플러스·취약지역 생활여건개조(새뜰마을)·
   농촌공간정비·농촌협약·마을만들기·시군역량강화·권역단위·일반농산어촌개발 등. 낱말마다 받아 합친 뒤 build에서 거른다.
   지난 연도는 12월 31일 값 한 번(작년은 4월까지 30일마다 다시), 올해는 자료가 있는 가장 최근 달 말일 (fetch_jikbul.py와 같다).
2) 한국농어촌공사 '농산어촌지역개발사업' OpenAPI (B552149/raiseLocalDev/sggLocalDev, 시도마다): 사업 지구 목록
   (사업유형·지구명·사업내용·시작 연도·준공예정일·위치). 사업비는 없다.
3) 한국농어촌공사 '농촌마을현황' OpenAPI (B552149/raiseRuralVill/infoVill): 조사 마을 인구·가구·빈집·슬레이트
   2)·3)은 30일마다 다시 받는다. 초당 호출 제한이 빡빡해 2초 간격으로 부른다.

사용: .venv/bin/python scripts/fetch_ruraldev.py [--force]
"""
import argparse
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fetch_data import lofin  # noqa: E402
from fetch_jikbul import age_days, month_end, probe, save  # noqa: E402
from regions import ROOT  # noqa: E402

RAW = os.path.join(ROOT, "db", "raw", "ruraldev")
FIRST_YEAR = 2020
KEYWORDS = ["농촌중심지", "읍면소재지", "소재지종합정비", "기초생활거점", "권역단위", "신활력", "생활여건개조", "새뜰", "취약지역",
            "농촌공간", "공간정비", "재구조화", "농촌재생", "재생뉴딜", "농촌협약", "마을만들기", "시군역량", "시ㆍ군역량", "현장포럼",
            "농촌다움", "일반농산어촌", "소도읍"]
# 농어촌공사 시도코드: 옛 강원(42)·전북(45)·전남(46)은 비고 새 코드(51·52·12)에 있다. 둘 다 부른다.
KRC_SIDOS = [11, 26, 27, 28, 29, 30, 31, 36, 41, 42, 43, 44, 45, 46, 47, 48, 50, 51, 52, 12]
KRC = "https://apis.data.go.kr/B552149"


def env():
    out = {}
    with open(os.path.join(ROOT, ".env"), encoding="utf-8") as f:
        for line in f:
            if "=" in line and not line.lstrip().startswith("#"):
                k, v = line.rstrip("\n").split("=", 1)
                out[k.strip()] = v.strip().strip("'\"")
    return out


def fetch_year(fyr, ymd):
    rows = {}
    for kw in KEYWORDS:
        for r in lofin("QWGJK", {"fyr": fyr, "exe_ymd": ymd, "dbiz_nm": kw}):
            rows[(r["laf_cd"], r["acnt_dv_cd"], r["dbiz_cd"])] = r
        time.sleep(0.5)
    return list(rows.values())


def krc(key, path, **p):
    """농어촌공사 API 한 번 (초당 제한에 걸리면 기다렸다가 다시)"""
    q = urllib.parse.urlencode({"serviceKey": key, "dataType": "json", "pageNo": 1, "numOfRows": 1000, **p}, safe="%")
    for t in range(6):
        time.sleep(2)
        try:
            with urllib.request.urlopen(f"{KRC}/{path}?{q}", timeout=60) as r:
                body = json.loads(r.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code == 429:
                time.sleep(20 * (t + 1))
                continue
            raise
        res = body.get("response")
        if not res or res["header"]["resultCode"] != "00":
            raise RuntimeError(f"{path} {p}: {str(body)[:200]}")
        b = res["body"]
        items = (b.get("items") or {}).get("item") or [] if b.get("items") else []
        return (items if isinstance(items, list) else [items]), b.get("totalCount", 0)
    raise RuntimeError(f"{path} {p}: 호출 제한이 풀리지 않음")


def fetch_krc(key):
    dev = []
    for c in KRC_SIDOS:
        items, n = krc(key, "raiseLocalDev/sggLocalDev", sidoCode=c, numOfRows=2000)
        if len(items) < n:
            raise RuntimeError(f"시도 {c}: {len(items)}/{n}건만 받음")
        dev += items
    seen, uniq = set(), []
    for r in dev:
        if r["inbpnCode"] not in seen:
            seen.add(r["inbpnCode"])
            uniq.append(r)
    vill, page = [], 1
    while True:
        items, n = krc(key, "raiseRuralVill/infoVill", pageNo=page)
        vill += items
        if not items or len(vill) >= n:
            break
        page += 1
    return uniq, vill


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()
    os.makedirs(RAW, exist_ok=True)
    today = date.today()
    cur = None
    d = month_end(today.year, today.month) if today == month_end(today.year, today.month) else month_end(*((today.year, today.month - 1) if today.month > 1 else (today.year - 1, 12)))
    for _ in range(4):
        if d.year == today.year and probe(today.year, d.strftime("%Y%m%d")):
            cur = d
            break
        d = month_end(*((d.year, d.month - 1) if d.month > 1 else (d.year - 1, 12)))
        if d.year < today.year:
            break
    jobs = [(y, f"{y}1231") for y in range(FIRST_YEAR, today.year)]
    if cur:
        jobs.append((today.year, cur.strftime("%Y%m%d")))
    n = 0
    for y, ymd in jobs:
        p = os.path.join(RAW, f"{y}_{ymd}.json.gz")
        stale = a.force or not os.path.exists(p) or (y == today.year - 1 and today.month <= 4 and age_days(p) > 30)
        if not stale:
            continue
        rows = fetch_year(y, ymd)
        if not rows:
            print(f"{y} {ymd}: 자료 없음")
            continue
        save(p, rows)
        n += 1
        print(f"{y} {ymd}: {len(rows)}행")
    for f in os.listdir(RAW):
        m = re.match(rf"{today.year}_(\d{{8}})\.json\.gz$", f)
        if m and cur and m.group(1) != cur.strftime("%Y%m%d"):
            os.remove(os.path.join(RAW, f))
    kp = os.path.join(RAW, "krc.json.gz")
    if a.force or age_days(kp) > 30:
        dev, vill = fetch_krc(env()["DATA_PORTAL_API_KEY"])
        if len(dev) < 3000 or len(vill) < 25000:
            raise RuntimeError(f"농어촌공사 자료가 너무 적다 (사업 {len(dev)} · 마을 {len(vill)})")
        save(kp, {"got": today.isoformat(), "dev": dev, "vill": vill})
        print(f"농어촌공사: 사업 지구 {len(dev):,} · 마을 {len(vill):,}")
    print(f"새로 받은 연도 {n}")


if __name__ == "__main__":
    main()
