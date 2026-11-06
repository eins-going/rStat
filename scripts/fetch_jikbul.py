"""공익직불 등 직불 사업 예산을 지방재정365 '세부사업별 세출현황'(QWGJK)에서 전국 지자체 한꺼번에 받아 db/raw/jikbul/에 둔다.

- 지자체 코드 없이 세부사업명으로 거른다(부분 일치). 지자체마다 사업 이름이 달라 세 낱말로 받아 합친다:
  '직불'(기본형 공익직불금·전략작물직불…), '직접지불'(경북 '공익증진직접지불제' 등), '공익기능'('농업농촌공익기능증진직접지불기금').
- 지난 연도는 12월 31일 기준(예산현액·지출액이 그해 마감 값), 올해는 자료가 있는 가장 최근 달 말일.
  지난 연도 파일은 한 번만 받고, 작년 것은 4월까지 30일마다 다시 받는다(결산 정리). 올해 것은 달이 바뀌면 새로 받는다.
- 검증용으로 e-나라지표 '직접지불금 현황'(농림축산식품부, idx_cd 2749) 통계표를 함께 받는다.

사용: .venv/bin/python scripts/fetch_jikbul.py [--force]
"""
import argparse
import gzip
import html
import json
import os
import re
import sys
import time
import urllib.request
from calendar import monthrange
from datetime import date, timedelta

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fetch_data import lofin  # noqa: E402  (지방재정365 키·쪽 넘기기 공용)
from regions import ROOT  # noqa: E402

RAW = os.path.join(ROOT, "db", "raw", "jikbul")
FIRST_YEAR = 2020          # 공익직불제 시행
KEYWORDS = ["직불", "직접지불", "공익기능"]
INDEX_URL = ("https://www.index.go.kr/unity/potal/eNara/sub/showStblGams3.do"
             "?stts_cd=274901&idx_cd=2749&freq=Y&period={a}:{b}")


def month_end(y, m):
    return date(y, m, monthrange(y, m)[1])


def probe(fyr, ymd):
    import urllib.parse
    from fetch_data import LOFIN_KEY
    q = urllib.parse.urlencode({"Key": LOFIN_KEY, "Type": "json", "pIndex": 1, "pSize": 1, "fyr": fyr,
                                "exe_ymd": ymd, "dbiz_nm": "직불"})
    req = urllib.request.Request(f"https://www.lofin365.go.kr/lf/hub/QWGJK?{q}", headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        return bool(json.loads(r.read().decode("utf-8")).get("QWGJK"))


def fetch_year(fyr, ymd):
    rows = {}
    for kw in KEYWORDS:
        for r in lofin("QWGJK", {"fyr": fyr, "exe_ymd": ymd, "dbiz_nm": kw}):
            rows[(r["laf_cd"], r["acnt_dv_cd"], r["dbiz_cd"])] = r
        time.sleep(0.5)
    return list(rows.values())


def save(path, obj):
    tmp = path + ".tmp"
    with gzip.open(tmp, "wt", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False)
    os.replace(tmp, path)


def age_days(p):
    return (time.time() - os.path.getmtime(p)) / 86400 if os.path.exists(p) else 1e9


def fetch_index(last_year):
    """e-나라지표 직접지불금 현황 표 → {항목: {연도: 억원}}"""
    req = urllib.request.Request(INDEX_URL.format(a=FIRST_YEAR - 2, b=last_year), headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=60) as r:
        s = r.read().decode("utf-8", errors="replace")
    table, years = {}, []
    for tr in re.findall(r"<tr[^>]*>(.*?)</tr>", s, re.S):
        cells = [re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", c))).strip() for c in re.findall(r"<t[hd][^>]*>(.*?)</t[hd]>", tr, re.S)]
        if not cells:
            continue
        if not years and all(re.fullmatch(r"\d{4}", c) for c in cells[1:] if c):
            years = cells[1:]
            continue
        if years and cells[0]:
            name = re.sub(r"^ㅇ\s*", "", cells[0])
            table[name] = {y: (float(v.replace(",", "")) if re.fullmatch(r"[\d,.]+", v) else None) for y, v in zip(years, cells[1:])}
    if "순직불제 예산" not in table:
        raise RuntimeError("e-나라지표 표 모양이 바뀜")
    return table


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()
    os.makedirs(RAW, exist_ok=True)
    today = date.today()
    # 올해: 자료가 있는 가장 최근 달 말일 (지난달 말부터 거슬러 3달)
    cur = None
    d = month_end(today.year, today.month) if today.day == monthrange(today.year, today.month)[1] else month_end(*((today.year, today.month - 1) if today.month > 1 else (today.year - 1, 12)))
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
    # 올해 옛 달 파일은 지운다(가장 최근 것만 쓴다)
    for f in os.listdir(RAW):
        m = re.match(rf"{today.year}_(\d{{8}})\.json\.gz$", f)
        if m and cur and m.group(1) != cur.strftime("%Y%m%d"):
            os.remove(os.path.join(RAW, f))
    ip = os.path.join(RAW, "index2749.json")
    if a.force or age_days(ip) > 30 or os.path.getsize(ip) == 0:
        table = fetch_index(today.year)   # 먼저 받고 나서 쓴다 (실패하면 지난 파일을 그대로 둔다)
        with open(ip + ".tmp", "w", encoding="utf-8") as f:
            json.dump(table, f, ensure_ascii=False, indent=0)
        os.replace(ip + ".tmp", ip)
        print("e-나라지표 직접지불금 현황 받음")
    print(f"새로 받은 연도 {n}")


if __name__ == "__main__":
    main()
