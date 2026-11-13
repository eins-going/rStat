"""쌀 농가판매가격지수(미곡 · 총지수, 분기) 받기 → data/farm_price_index_q.csv

KOSIS 농가판매및구입가격조사: DT_1J50(2005=100, 1959~2012) + DT_1J60(2020=100, 2005~). prod/area_early.py가 이어 붙여 쓴다.
수확기(4분기) 값은 이듬해 1~2월에 나온다 → 7월 말 예측 때 전년 4분기 값을 쓸 수 있다.
사용: .venv/bin/python research/rice/areafc/fetch_price.py
"""
import csv
import importlib.util
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(HERE)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))
spec = importlib.util.spec_from_file_location("fetch_data", os.path.join(ROOT, "scripts", "fetch_data.py"))
fd = importlib.util.module_from_spec(spec)
spec.loader.exec_module(fd)
OUT = os.path.join(HERE, "data", "farm_price_index_q.csv")


def main():
    out = []
    for tbl, ids in (("DT_1J50", {"0": "총지수", "41": "미곡"}), ("DT_1J60", {"0": "총지수", "11": "미곡"})):
        for iid, nm in ids.items():
            rows = fd.call("Param/statisticsParameterData.do", {"method": "getList", "orgId": "101", "tblId": tbl, "itmId": "ALL",
                                                                "objL1": iid, "prdSe": "Q", "startPrdDe": "195901", "endPrdDe": "209904"})
            out += [{"tbl": tbl, "item": nm, "itm": r.get("ITM_NM"), "q": r["PRD_DE"], "v": r["DT"]} for r in rows]
    if len(out) < 500:
        raise SystemExit(f"받은 행이 너무 적다 ({len(out)})")
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    w = csv.DictWriter(open(OUT, "w", newline="", encoding="utf-8"), fieldnames=["tbl", "item", "itm", "q", "v"])
    w.writeheader()
    w.writerows(out)
    last = max(r["q"] for r in out if r["item"] == "미곡" and r["itm"] == "농가판매가격지수")
    print(OUT, len(out), "행 · 미곡 마지막 분기", last)


if __name__ == "__main__":
    main()
