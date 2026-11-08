"""KOSIS 시군별 논벼 생산량(DT_1ET0034, 정곡) 최근 몇 해를 받아 db/raw/kosis_rice/dt_1et0034.csv에 덮어 쓴다.

- 형식: year, code, name, item(재배면적·10a당 생산량·생산량), value
- 받은 해의 행만 바꾸고 나머지 해는 그대로 둔다(행정구역 개편 전 옛 행 보존).
- 확정 발표(매년 11월 중순)가 아직이면 그해 행이 없어 파일이 바뀌지 않는다.

사용: .venv/bin/python scripts/fetch_kosis_rice.py [--recent 3]
"""
import argparse
import csv
import importlib.util
import os
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))
spec = importlib.util.spec_from_file_location("fetch_data", os.path.join(ROOT, "scripts", "fetch_data.py"))
fd = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fd)

PATH = os.path.join(ROOT, "db", "raw", "kosis_rice", "dt_1et0034.csv")
COLS = ["year", "code", "name", "item", "value"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--recent", type=int, default=3)
    a = ap.parse_args()
    rows = fd.call("Param/statisticsParameterData.do", {
        "method": "getList", "orgId": "101", "tblId": "DT_1ET0034", "itmId": "ALL", "objL1": "ALL",
        "prdSe": "Y", "newEstPrdCnt": str(a.recent)})
    new = []
    for r in rows:
        v = fd.num(r.get("DT"))
        if v is None:
            continue
        item = r["ITM_NM"].split(":")[-1].strip()
        new.append({"year": r["PRD_DE"], "code": r["C1"], "name": r["C1_NM"].strip(), "item": item,
                    "value": str(r["DT"]).replace(",", "").strip()})
    years = {r["year"] for r in new}
    if not new or not any(r["code"] == "00" for r in new):
        raise SystemExit("KOSIS 응답에 전국 행이 없다")
    old = list(csv.DictReader(open(PATH, encoding="utf-8"))) if os.path.exists(PATH) else []
    keep = [r for r in old if r["year"] not in years]
    out = sorted(keep + new, key=lambda r: (r["year"], r["code"], r["item"]))
    tmp = PATH + ".tmp"
    with open(tmp, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, COLS)
        w.writeheader()
        w.writerows(out)
    os.replace(tmp, PATH)
    print(f"KOSIS DT_1ET0034: {sorted(years)}년 {len(new)}행 받음, 전체 {len(out)}행")


if __name__ == "__main__":
    main()
