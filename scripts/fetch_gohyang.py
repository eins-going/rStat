"""고향사랑기금: 지방재정365 세부사업별 세출현황(QWGJK)에서 고향사랑기금 회계 행과 '고향사랑' 사업 행을 받는다.

왜 전국을 통째로 받나 (2026-11 확인)
- QWGJK는 laf_cd를 빼면 전국 지자체 행이 다 온다(2025-12-31 하루치 약 48만 행, 1,000행씩 약 480번).
- 거르는 인자는 dbiz_nm(사업명 부분 일치)뿐이다. acnt_dv_nm·acnt_dv_cd·fld_cd·wa_laf_cd를 줘도 거르지 않는다.
- 고향사랑기금 회계 안의 지정기부 사업은 이름에 '고향사랑'이 없다(예: 화성 '외국인 노동자 겨울옷 나눔 행사').
  그래서 사업명으로 거르면 놓친다 → 전국을 받아 회계 이름(acnt_dv_nm)에 '고향사랑'이 든 행만 남긴다.
- 회계 코드는 지자체마다 다르다(용인 419, 고양 417, 서울 438, 창원 462). 이름으로 고른다.
- 일반회계 등에 있는 '고향사랑' 사업(답례품·홍보·정보시스템 운영)도 따로 남긴다.

받는 날짜: 2023~작년은 12월 31일, 올해는 자료가 있는 마지막 월말.
남기는 것: db/raw/gohyang/QWGJK_{날짜}.json.gz (고른 행 + 전체 행 수). 지난 해 파일은 다시 받지 않는다.
메모리: 1,000행씩 읽고 고른 행만 쥔다(수십 MB 이하).

실행: python scripts/fetch_gohyang.py [--force]
"""
import gzip
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from datetime import date, timedelta

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOME = os.environ.get("RSTAT_HOME", ROOT)  # .env와 db/가 있는 곳 (작업 사본에서 돌릴 때 본 사본을 가리킨다)
RAW = os.path.join(HOME, "db", "raw", "gohyang")
API = "https://www.lofin365.go.kr/lf/hub/QWGJK"
FIRST_YEAR = 2023
SLEEP = 0.3


def load_key():
    with open(os.path.join(HOME, ".env"), encoding="utf-8") as f:
        env = dict(line.strip().split("=", 1) for line in f if "=" in line and not line.lstrip().startswith("#"))
    for name in ("lofin365_open_api_key", "lofin_api_key"):
        if env.get(name):
            return env[name].strip().strip('"').strip("'")
    raise SystemExit("lofin_api_key가 .env에 없습니다")


KEY = None


def page(params, n, tries=5):
    q = urllib.parse.urlencode({"Key": KEY, "Type": "json", "pIndex": n, "pSize": 1000, **params})
    req = urllib.request.Request(f"{API}?{q}", headers={"User-Agent": "Mozilla/5.0"})
    for attempt in range(tries):
        try:
            time.sleep(SLEEP)
            with urllib.request.urlopen(req, timeout=180) as r:
                return json.loads(r.read().decode("utf-8"))
        except Exception as e:  # 주소에 키가 들어 있으니 오류 문구에는 넣지 않는다
            if attempt == tries - 1:
                raise RuntimeError(f"QWGJK {params} 쪽 {n}: {type(e).__name__}") from None
            time.sleep(5 * (attempt + 1))


def keep(r):
    acnt = (r.get("acnt_dv_nm") or "").replace(" ", "")
    biz = (r.get("dbiz_nm") or "").replace(" ", "")
    return "고향사랑" in acnt or "고향사랑" in biz


def snapshot(ymd):
    """하루치 전국 행을 받아 고른 행만 돌려준다. 자료가 없으면 None"""
    params = {"fyr": ymd[:4], "exe_ymd": ymd}
    kept, total, n, seen = [], None, 1, 0
    while True:
        body = page(params, n)
        part = body.get("QWGJK")
        if not part:
            if "INFO-200" in json.dumps(body):
                return None
            raise RuntimeError(f"QWGJK {ymd}: {json.dumps(body, ensure_ascii=False)[:200]}")
        total = part[0]["head"][0]["list_total_count"]
        rows = part[1]["row"] if len(part) > 1 else []
        seen += len(rows)
        kept += [r for r in rows if keep(r)]
        if n % 50 == 0:
            print(f"  {ymd} {seen:,}/{total:,} 행, 고른 행 {len(kept):,}", flush=True)
        if seen >= total or not rows:
            break
        n += 1
    return {"exe_ymd": ymd, "total": total, "seen": seen, "fetched": date.today().isoformat(), "rows": kept}


def month_ends(today):
    """올해 월말 날짜(최근부터). 이번 달은 아직 끝나지 않았으니 지난달부터."""
    d = today.replace(day=1) - timedelta(days=1)
    while d.year == today.year:
        yield d.strftime("%Y%m%d")
        d = d.replace(day=1) - timedelta(days=1)


def save(path, snap):
    tmp = path + ".tmp"
    with gzip.open(tmp, "wt", encoding="utf-8") as f:
        json.dump(snap, f, ensure_ascii=False)
    os.replace(tmp, path)
    print(f"{os.path.basename(path)}: 전국 {snap['total']:,}행 중 {len(snap['rows']):,}행", flush=True)


def main():
    global KEY
    KEY = load_key()
    force = "--force" in sys.argv
    os.makedirs(RAW, exist_ok=True)
    today = date.today()
    for y in range(FIRST_YEAR, today.year):
        path = os.path.join(RAW, f"QWGJK_{y}1231.json.gz")
        if os.path.exists(path) and not force:
            continue
        snap = snapshot(f"{y}1231")
        if snap:
            save(path, snap)
    # 올해: 자료가 있는 마지막 월말 하나 (이미 있으면 그대로 둔다)
    for ymd in month_ends(today):
        path = os.path.join(RAW, f"QWGJK_{ymd}.json.gz")
        if os.path.exists(path) and not force:
            break
        snap = snapshot(ymd)
        if snap:
            save(path, snap)
            break
        print(f"{ymd}: 자료 없음, 한 달 앞으로", flush=True)


if __name__ == "__main__":
    main()
