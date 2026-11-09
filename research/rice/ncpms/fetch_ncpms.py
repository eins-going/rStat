"""NCPMS 논벼 병해충 예찰 수집 (.env NCPMS_API_KEY).

- SVC51 예찰 목록(조사년도) → 논벼 '벼관찰포' 회차(해마다 8회, 6/1~9/16)의 insectKey
- SVC52 시도별 상세(insectKey) → 병해충 × 항목(발생추정면적·감수율·피해율·발생면적율) × 시도
- SVC53 시군구별 상세(insectKey + sidoCode) → 같은 항목 × 시군구
- 회차마다 data/raw/{insectKey}_sido.json, _sgg_{sido}.json 저장(이어받기). 끝나면 data/ncpms_sido.csv.gz, ncpms_sgg.csv.gz.
사용: python fetch_ncpms.py [--from 2014] [--to 2026]
"""
import argparse
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from datetime import date

import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = "/home/eins/project/rStat"
RAW = os.path.join(HERE, "data", "raw")
URL = "http://ncpms.rda.go.kr/npmsAPI/service"


def key():
    for line in open(os.path.join(ROOT, ".env"), encoding="utf-8"):
        if line.startswith("NCPMS_API_KEY="):
            return line.split("=", 1)[1].strip().strip('"').strip("\r")
    sys.exit("NCPMS_API_KEY 없음")


K = None


def call(tries=4, **p):
    q = urllib.parse.urlencode({"apiKey": K, "serviceType": "AA003", **p})
    for i in range(tries):
        try:
            d = json.loads(urllib.request.urlopen(f"{URL}?{q}", timeout=60).read().decode("utf-8", "ignore"))
            return d.get("service", d)
        except Exception as e:
            if i == tries - 1:
                raise
            time.sleep(3 * (i + 1))
            print("  재시도", e, flush=True)


def cached(fn, **p):
    path = os.path.join(RAW, fn)
    if os.path.exists(path):
        return json.load(open(path, encoding="utf-8"))
    d = call(**p)
    json.dump(d, open(path, "w", encoding="utf-8"), ensure_ascii=False)
    time.sleep(0.2)
    return d


def main():
    global K
    ap = argparse.ArgumentParser()
    ap.add_argument("--from", dest="y0", type=int, default=2014)
    ap.add_argument("--to", dest="y1", type=int, default=date.today().year)
    a = ap.parse_args()
    K = key()
    os.makedirs(RAW, exist_ok=True)
    rounds = []
    for y in range(a.y0, a.y1 + 1):
        sp, rows = 1, []
        while True:
            d = call(serviceCode="SVC51", searchExaminYear=str(y), displayCount=50, startPoint=sp)
            rows += d.get("list", [])
            sp += 50
            if sp > int(d.get("totalCount", 0)) or sp > 500:
                break
        rice = [r for r in rows if r.get("kncrNm") == "논벼"]
        rounds += rice
        print(y, "논벼 회차", len(rice), flush=True)
    pd.DataFrame(rounds).to_csv(os.path.join(HERE, "data", "rounds.csv"), index=False)
    sido_rows, sgg_rows = [], []
    for r in rounds:
        ik = r["insectKey"]
        meta = {"y": int(r["examinYear"]), "round": int(r["examinTmrd"]), "date": r["inputStdrDatetm"], "kind": r["predictnSpchcknNm"]}
        d = cached(f"{ik}_sido.json", serviceCode="SVC52", insectKey=ik)
        lst = d.get("structList") or []
        sido_rows += [{**meta, **x} for x in lst]
        for sc in sorted({x["sidoCode"] for x in lst}):
            g = cached(f"{ik}_sgg_{sc}.json", serviceCode="SVC53", insectKey=ik, sidoCode=str(sc))
            sgg_rows += [{**meta, "sidoCode": sc, **x} for x in (g.get("structList") or [])]
        print(" ", meta["y"], meta["round"], meta["date"], "시도행", len(lst), "누적 시군구행", len(sgg_rows), flush=True)
    pd.DataFrame(sido_rows).to_csv(os.path.join(HERE, "data", "ncpms_sido.csv.gz"), index=False)
    pd.DataFrame(sgg_rows).to_csv(os.path.join(HERE, "data", "ncpms_sgg.csv.gz"), index=False)
    print("완료 시도", len(sido_rows), "시군구", len(sgg_rows), flush=True)


if __name__ == "__main__":
    main()
