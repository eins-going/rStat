"""지역 농·축협: 농협중앙회 조합 목록(주소)과 금감원 FISIS 조합별 재무를 db/raw/nhcoop/에 받는다.

- 조합 목록·주소: 농협중앙회 누리집 농·축협 안내(nhInfo.do). 공개 API가 없어 목록 화면을 쪽마다 읽는다(1초 간격).
  지역본부·시군지부 등 조합이 아닌 행도 섞여 있다 → build_nhcoop.py가 가른다. 조합 목록·시군은 이 목록이 기준이다.
- 재무: FISIS(금융통계정보시스템) OpenAPI, 업권 Q(농협단위조합). 키는 .env FISIS_API_KEY.
  조합 코드마다 통계표 하나를 한 번 부르면 기간 안의 반기 값이 모두 온다(농협은 반기 term=H만 된다).
  조합 코드 없이 한꺼번에 받을 수는 없다(오류 100) → 조합 수 × 통계표 수만큼 부른다.
  FISIS의 [폐] 표시는 믿을 수 없다(합병된 조합도 남아 있다) → 영업 여부는 자료가 있는지로 본다.
- 받은 파일은 다시 받지 않는다(끊기면 이어 받는다). 일일 허용 횟수를 넘으면(오류 020) 멈추고 다음 날 잇는다.

실행: python scripts/fetch_nhcoop.py [--list] [--fisis] [--start 202312] [--end 202606] [--refresh]
      (둘 다 빼면 둘 다 받는다)
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
RAW = os.path.join(ROOT, "db", "raw", "nhcoop")
NH_URL = "https://www.nonghyup.com/introduce/organization/nhInfo.do"
FISIS = "https://fisis.fss.or.kr/openapi"
# 임직원현황(조합원 B·총임직원 A), 자산(자산총계 A), 부채·자본(예수부채 A1·자본총계 AA),
# 손익(당기순이익 A, 반기 누계), 여신건전성(총여신 A·고정이하여신 B), 유동성(예대율 대출금 C1·예수금 C2)
TABLES = ["SQ001", "SQ003", "SQ004", "SQ005", "SQ007", "SQ009"]
UA = {"user-agent": "Mozilla/5.0"}


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


def default_window():
    """끝: 공표가 끝났을 반기(반기 말 + 3개월), 시작: 그 2년 반 전 — 반기 6개 (최근 3개년)"""
    t = time.localtime()
    ym = t.tm_year * 12 + t.tm_mon - 1 - 3
    y, m = divmod(ym, 12)
    end = (y, 12) if m + 1 >= 12 else (y, 6) if m + 1 >= 6 else (y - 1, 12)
    start = (end[0] - 3, 12) if end[1] == 6 else (end[0] - 2, 6)
    return f"{start[0]}{start[1]:02d}", f"{end[0]}{end[1]:02d}"


# ---------- 농협중앙회 조합 목록 ----------
def fetch_list():
    rows, page = [], 1
    while True:
        data = urllib.parse.urlencode({"pageIndex": page, "indexRegion": "entire", "searchCcwnm": "", "searchWrd": ""}).encode()
        req = urllib.request.Request(NH_URL, data=data, headers=UA)
        with urllib.request.urlopen(req, timeout=30) as r:
            html = r.read().decode("utf-8")
        body = html[html.find("<tbody>", html.find("농.축협 안내 - 지역")):]
        body = body[:body.find("</tbody>")]
        got = 0
        for tr in re.findall(r"<tr>(.*?)</tr>", body, re.S):
            cells = [re.sub(r"\s+", " ", re.sub("<[^>]+>", "", c)).strip() for c in re.findall(r"<td[^>]*>(.*?)</td>", tr, re.S)]
            if len(cells) >= 4:
                rows.append({"name": cells[0], "zip": cells[1].strip("() "), "addr": cells[2], "tel": cells[3]})
                got += 1
        total = re.search(r"전체건수 :.*?<span>([\d,]+)</span>", html, re.S)
        if not got or (total and len(rows) >= int(total.group(1).replace(",", ""))):
            break
        page += 1
        time.sleep(1)
    os.makedirs(RAW, exist_ok=True)
    path = os.path.join(RAW, "nh_list.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump({"fetched": time.strftime("%Y-%m-%d"), "rows": rows}, f, ensure_ascii=False, indent=0)
    print(f"농협 목록 {len(rows)}행 ({page}쪽) → {path}")


# ---------- FISIS ----------
def fisis(svc, key, **params):
    q = urllib.parse.urlencode({"lang": "kr", "auth": key, **params})
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(f"{FISIS}/{svc}.json?{q}", headers=UA), timeout=60) as r:
                res = json.loads(r.read().decode("utf-8"))["result"]
            break
        except (OSError, ValueError):
            if attempt == 2:
                raise
            time.sleep(5)
    code = res.get("err_cd")
    if code == "020":
        raise DailyLimit(res.get("err_msg"))
    if code not in ("000", None):
        # 자료가 없는 조합 코드는 빈 목록이거나 오류로 온다 → 빈 것으로 둔다
        return {"err_cd": code, "err_msg": res.get("err_msg"), "list": []}
    return {"err_cd": code, "list": res.get("list") or []}


def fetch_fisis(start, end, refresh):
    key = env()["FISIS_API_KEY"]
    companies = fisis("companySearch", key, partDiv="Q")["list"]
    os.makedirs(RAW, exist_ok=True)
    with open(os.path.join(RAW, "fisis_companies.json"), "w", encoding="utf-8") as f:
        json.dump({"fetched": time.strftime("%Y-%m-%d"), "list": companies}, f, ensure_ascii=False, indent=0)
    win = f"{start}-{end}"
    calls = 0
    try:
        for i, c in enumerate(companies):
            cd = c["finance_cd"]
            for t in TABLES:
                path = os.path.join(RAW, "fisis", win, t, f"{cd}.json")
                if os.path.exists(path) and not refresh:
                    if t == "SQ001" and not json.load(open(path, encoding="utf-8"))["list"]:
                        break  # 임직원 자료가 없는 코드(합병·해산)는 다른 표도 없다
                    continue
                res = fisis("statisticsInfoSearch", key, financeCd=cd, listNo=t, term="H", startBaseMm=start, endBaseMm=end)
                calls += 1
                os.makedirs(os.path.dirname(path), exist_ok=True)
                with open(path, "w", encoding="utf-8") as f:
                    json.dump(res, f, ensure_ascii=False)
                if t == "SQ001" and not res["list"]:
                    break
            if (i + 1) % 100 == 0:
                print(f"  {i + 1}/{len(companies)} 조합 · 이번 호출 {calls}", flush=True)
    except DailyLimit as e:
        print(f"FISIS 일일 허용 횟수 초과({e}) — 이번 호출 {calls}번. 내일 다시 실행하면 이어 받는다.")
        sys.exit(2)
    print(f"FISIS {len(companies)}개 코드 · {win} · 이번 호출 {calls}번 → {os.path.join(RAW, 'fisis', win)}")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--list", action="store_true", help="농협중앙회 조합 목록만")
    ap.add_argument("--fisis", action="store_true", help="FISIS 재무만")
    s0, e0 = default_window()
    ap.add_argument("--start", default=s0)
    ap.add_argument("--end", default=e0)
    ap.add_argument("--refresh", action="store_true", help="받아 둔 FISIS 파일도 다시 받는다")
    a = ap.parse_args()
    both = not a.list and not a.fisis
    if a.list or both:
        fetch_list()
    if a.fisis or both:
        fetch_fisis(a.start, a.end, a.refresh)


if __name__ == "__main__":
    main()
