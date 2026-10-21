"""농작물재해보험 실적(농업정책보험금융원 누리집 '실적 통계 > 품목별')을 전국·시도·시군구마다 받아 db/raw/apfs/에 둔다.

- 공개 API가 없어 누리집 조회 화면(chart1ListPage.do)에 조건을 보내 표를 읽는다(1초 간격).
  시군구 목록은 연도마다 chart1ListPageCodeList.do가 준다(군위군 편입 등 해마다 다를 수 있다).
- 지난 연도는 12월(1년 확정)만 있고, 올해는 달마다 누계가 있다 → 올해는 자료가 있는 마지막 달을 받는다.
- 표: 대분류·중분류마다 가입건수(건), 가입금액(백만원), 가입면적(ha), 가입률(%), 순보험료(백만원), 지급보험금(백만원).
  가입률은 전국·시도만 공시하고 시군구는 '-'다. 값은 공시된 그대로 둔다(계산하지 않는다).

실행: python scripts/fetch_apfs.py [연도 ...]   (없으면 최근 3개년 확정 + 올해 누계, 이미 받은 확정 연도는 건너뛴다)
"""
import http.cookiejar
import json
import os
import re
import sys
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "db", "raw", "apfs")
BASE = "https://www.apfs.kr/front/contents"
PAGE = f"{BASE}/chart1ListPage.do"
COLS = ["cnt", "amt", "area", "rate", "prem", "paid"]  # 가입건수, 가입금액, 가입면적, 가입률, 순보험료, 지급보험금

jar = http.cookiejar.CookieJar()
opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(jar))
opener.addheaders = [("User-Agent", "Mozilla/5.0"), ("Referer", f"{PAGE}?menuId=5366")]


def get_json(url, **params):
    with opener.open(f"{url}?{urllib.parse.urlencode(params)}", timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def num(s):
    s = s.replace(",", "").strip()
    return None if s in ("", "-") else float(s)


def table(year, month, sido="", sgg=""):
    """[(대분류, 중분류, {열: 값})], 총합계는 ('총합계', '', …). 결과가 없으면 []"""
    data = urllib.parse.urlencode({"searchType": "701", "menuId": "5366", "searchKey": year, "strsearch": month,
                                   "searchYM": f"{year}{int(month):02d}", "searchCtpvNm": sido, "searchSggNm": sgg}).encode()
    with opener.open(PAGE, data=data, timeout=30) as r:
        html = r.read().decode("utf-8", "replace")
    t = html[html.find('<table class="table_style_auto3">'):]
    t = t[:t.find("</table>")]
    rows, big, left = [], None, 0
    for tr in re.findall(r"<tr[^>]*>([\s\S]*?)</tr>", t):
        tds = re.findall(r"<td([^>]*)>([\s\S]*?)</td>", tr)
        cells = [re.sub(r"\s+", " ", re.sub("<[^>]+>", "", c)).strip() for _, c in tds]
        if len(cells) < 7:
            continue
        attrs, vals = tds[0][0], dict(zip(COLS, map(num, cells[-6:])))
        if 'colspan="2"' in attrs:  # 대분류만 있는 행(총합계, 식량작물, 채소 …): 이름 칸이 두 칸을 덮는다
            rows.append((cells[0], "" if cells[0] == "총합계" else cells[0], vals))
            left = 0
        elif "rowspan" in attrs:  # 대분류가 여러 중분류 행을 덮는다 (과수 › 과수4종·과수기타)
            big = cells[0]
            left = int(re.search(r'rowspan="(\d+)"', attrs).group(1)) - 1
            rows.append((big, cells[1], vals))
        elif left > 0 and big:
            rows.append((big, cells[0], vals))
            left -= 1
        else:
            rows.append((cells[0], cells[0], vals))
    return rows


def last_month(year):
    """올해 자료가 있는 마지막 달"""
    for m in range(time.localtime().tm_mon, 0, -1):
        if table(year, m):
            return m
        time.sleep(1)
    return None


def fetch(year, month):
    opener.open(f"{PAGE}?menuId=5366", timeout=30).read()  # 세션
    out = {"year": year, "month": month, "fetched": time.strftime("%Y-%m-%d"), "nation": table(year, month), "sido": {}, "sgg": {}}
    sidos = [x["ctpvNm"] for x in get_json(f"{BASE}/chart1ListPageYRCodeList.do", searchKey=year)["selectCtpvNm"]]
    for sd in sidos:
        time.sleep(1)
        out["sido"][sd] = table(year, month, sd)
        sggs = [x["sggNm"] for x in get_json(f"{BASE}/chart1ListPageCodeList.do", searchYM=year, searchCtpvNm=sd)["selectSggNm"]
                if x["sggNm"] != "전체"]
        out["sgg"][sd] = {}
        for g in sggs:
            time.sleep(1)
            out["sgg"][sd][g] = table(year, month, sd, g)
        print(f"  {year}.{month} {sd} 시군구 {len(sggs)}", flush=True)
    os.makedirs(RAW, exist_ok=True)
    path = os.path.join(RAW, f"{year}{month:02d}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False)
    print("→", path)


def main():
    this = time.localtime().tm_year
    years = [int(y) for y in sys.argv[1:]] or [this - 3, this - 2, this - 1, this]
    for y in years:
        if y < this and not sys.argv[1:] and os.path.exists(os.path.join(RAW, f"{y}12.json")):
            continue  # 지난 연도 확정값은 한 번만 받는다 (연도를 적어 실행하면 다시 받는다)
        m = 12 if y < this else last_month(y)
        if m:
            fetch(y, m)
        else:
            print(f"{y}년 자료 없음")


if __name__ == "__main__":
    main()
