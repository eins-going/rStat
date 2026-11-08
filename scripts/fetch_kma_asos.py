"""기상청 API허브 ASOS 일자료 수집 (쌀 작황 예측용).

- 지점: stn_inf(SFC)를 여러 시점(1980~현재)으로 불러 폐쇄 지점까지 합친다.
- 자료: kma_sfcdd3 로 지점별 전체 기간을 한 번에 받는다(지점당 약 3초).
- 저장: db/raw/kma/asos_stations.csv, db/raw/kma/asos_daily.csv.gz (필요한 열만)

사용: .venv/bin/python scripts/fetch_kma_asos.py [--start 19800101] [--end YYYYMMDD]
"""
import argparse
import csv
import datetime as dt
import gzip
import os
import sys
import time
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "db", "raw", "kma")
BASE = "https://apihub.kma.go.kr/api/typ01/url/"
KEEP = ["TA_AVG", "TA_MAX", "TA_MIN", "HM_AVG", "WS_AVG", "WS_INS", "SS_DAY", "SS_DUR", "SI_DAY", "RN_DAY"]


def key():
    with open(os.path.join(ROOT, ".env"), encoding="utf-8") as f:
        for line in f:
            if line.startswith("KMA_API_KEY="):
                return line.split("=", 1)[1].strip().strip("'\"")
    sys.exit("KMA_API_KEY 없음")


def get(url, tries=4):
    for i in range(tries):
        try:
            with urllib.request.urlopen(url, timeout=180) as r:
                b = r.read()
            if b[:1] == b"{":
                raise RuntimeError(b.decode("utf-8", "replace")[:200])
            return b.decode("euc-kr", "replace")
        except Exception as e:  # noqa: BLE001
            if i == tries - 1:
                raise
            print("  재시도", e, file=sys.stderr)
            time.sleep(3 * (i + 1))


def header_cols(text):
    cols = {}
    for line in text.splitlines():
        if not line.startswith("#"):
            continue
        parts = line[1:].split()
        if len(parts) >= 2 and parts[0].rstrip(".").isdigit() and parts[1].isupper():
            cols[parts[1]] = int(parts[0].rstrip(".")) - 1
    return cols


def stations(k):
    found = {}
    years = list(range(1980, dt.date.today().year + 1, 5)) + [dt.date.today().year]
    for y in years:
        tm = f"{y}0701" + "0900"
        t = get(f"{BASE}stn_inf.php?inf=SFC&stn=&tm={tm}&help=0&authKey={k}")
        for line in t.splitlines():
            if not line.strip() or line.startswith("#"):
                continue
            p = line.split()
            stn = p[0]
            # 고정 열: STN LON LAT STN_SP HT HT_PA HT_TA HT_WD HT_RN STN_AD STN_KO STN_EN FCT_ID LAW_ID BASIN LAW_ADDR...
            li = next((j for j in range(11, len(p)) if len(p[j]) == 10 and p[j].isdigit()), None)
            rec = {"stn": stn, "lon": p[1], "lat": p[2], "ht": p[4], "name": p[10],
                   "law_id": p[li] if li else "", "addr": " ".join(p[li + 2:]) if li else "",
                   "seen_first": y, "seen_last": y}
            if stn in found:
                found[stn]["seen_last"] = y
                found[stn].update({k2: rec[k2] for k2 in ("lon", "lat", "ht", "law_id", "addr")})
            else:
                found[stn] = rec
        print(f"지점 목록 {y}: 누적 {len(found)}")
    return found


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--start", default="19800101")
    ap.add_argument("--end", default=(dt.date.today() - dt.timedelta(days=1)).strftime("%Y%m%d"))
    a = ap.parse_args()
    k = key()
    os.makedirs(OUT, exist_ok=True)
    st = stations(k)
    with open(os.path.join(OUT, "asos_stations.csv"), "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(next(iter(st.values())).keys()))
        w.writeheader()
        w.writerows(st.values())
    n = 0
    with gzip.open(os.path.join(OUT, "asos_daily.csv.gz"), "wt", newline="", encoding="utf-8") as g:
        w = csv.writer(g)
        w.writerow(["date", "stn"] + [c.lower() for c in KEEP])
        for i, stn in enumerate(sorted(st, key=int)):
            t = get(f"{BASE}kma_sfcdd3.php?tm1={a.start}&tm2={a.end}&stn={stn}&help=1&authKey={k}")
            cols = header_cols(t)
            idx = [cols[c] for c in KEEP]
            rows = 0
            for line in t.splitlines():
                if not line.strip() or line.lstrip().startswith("#"):
                    continue
                p = line.split()
                if len(p) <= max(idx) or not p[0].isdigit():
                    continue
                vals = []
                for j in idx:
                    v = float(p[j])
                    vals.append("" if v == -9.0 or v <= -99 else p[j])
                w.writerow([p[0], p[1]] + vals)
                rows += 1
            n += rows
            print(f"[{i + 1}/{len(st)}] {stn} {st[stn]['name']}: {rows}일")
    print("완료", n, "행")


if __name__ == "__main__":
    main()
