"""농사로 과수 생산단지(fruitGrowingArea) 목록과 상세를 받아 at_data/fruit_area.json으로 저장한다.

농사로 Open API는 AJAX 방식이라 신청할 때 적은 도메인에서만 인증키가 통한다.
.env에 NONGSARO_API_KEY가 있으면 api.nongsaro.go.kr/service/를 직접 부르고,
없으면 농사로 샘플 페이지가 쓰는 콜백(공개 샘플키)을 거친다. 회장 이름(chirmnNm)은 저장하지 않는다.
실행: python scripts/fetch_fruit_area.py
"""
import json
import os
import sys
import time
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_farms import AT, load_env  # noqa: E402

SAMPLE = "https://api.nongsaro.go.kr/sample/ajax/fruitGrowingArea/fruitGrowingArea.html"
CALLBACK = "https://api.nongsaro.go.kr/sample/ajax/ajax_local_callback.jsp"
SKIP = {"chirmnNm"}


def call(key, op, **params):
    q = urllib.parse.urlencode(dict(params, apiKey=key or "nongsaroSampleKey"))
    if key:
        url, headers = f"http://api.nongsaro.go.kr/service/fruitGrowingArea/{op}?{q}", {}
    else:
        url, headers = f"{CALLBACK}?fruitGrowingArea/{op}?{q}", {"Referer": SAMPLE}
    for attempt in range(4):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=30) as r:
                root = ET.fromstring(r.read().decode("utf-8").strip())
            break
        except Exception:
            if attempt == 3:
                raise
            time.sleep(2 ** attempt)
    code = root.findtext("header/resultCode")
    if code != "00":
        raise RuntimeError(f"농사로 {code}: {root.findtext('header/resultMsg')}")
    return [{c.tag: (c.text or "").strip() for c in it if c.tag not in SKIP} for it in root.iter("item")]


def main():
    key = load_env().get("NONGSARO_API_KEY")
    rows = call(key, "fruitGrowingAreaList", numOfRows=1000, pageNo=1)
    print(f"목록 {len(rows)}건", file=sys.stderr)
    out = []
    for i, r in enumerate(rows):
        detail = call(key, "fruitGrowingAreaView", dataNo=r["dataNo"])
        out.append(dict(r, **(detail[0] if detail else {})))
        if i % 50 == 49:
            print(f"  상세 {i + 1}건", file=sys.stderr)
        time.sleep(0.3)
    with open(os.path.join(AT, "fruit_area.json"), "w", encoding="utf-8") as fh:
        json.dump({"fetched": time.strftime("%Y-%m-%d"), "rows": out}, fh, ensure_ascii=False, indent=1)
    print(f"at_data/fruit_area.json {len(out)}건")


if __name__ == "__main__":
    main()
