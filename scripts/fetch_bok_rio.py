"""한국은행 2020년 지역산업연관표(17개 시도) 파일을 ECOS에서 받아 db/raw/bok_rio2020/에 둔다.

지역표는 ECOS OpenAPI에 없다(전국표만 있다). ECOS 웹 '통계검색 > 2.2.1.1 파일 다운로드 > 2020 지역표'(dsId 271Y106)에
파일로만 있어, 그 화면이 쓰는 내부 주소를 그대로 부른다 (2026-10 확인, 로그인·키 불필요).
- POST /serviceEndpoint/httpService/request.json, 거래코드 OSUUA01R03 → 파일 항목 목록
- 같은 주소, OSDFA01R03 → 항목별 저장 경로(attFilePath)·파일명
- GET /serviceEndpoint/fileDownload?filePath=…&fileName=…
화면 내부 주소라 바뀔 수 있다. 실패하면 ECOS 화면에서 같은 파일을 받아 같은 폴더에 두면 된다.

받는 것: 투입산출표(생산자가격) 통합 대·중·소분류(소분류는 총거래표 및 투입계수, 생산·수입·부가가치 유발계수,
최종수요항목별 유발계수 5개 파일), 고용표 통합 대·중분류. 이미 있는 파일은 다시 받지 않는다.
실행: python scripts/fetch_bok_rio.py
"""
import json
import os
import time
import urllib.parse
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "db", "raw", "bok_rio2020")
ECOS = "https://ecos.bok.or.kr"
DS = {"dsId": "271Y106", "dsNm": "2020 지역표", "dsEngNm": "2020 Regional Tables"}
ITEM = {"statItmId": "ACC_ITEM", "cdGrpId": "G12344", "cdHircGrpId": "H000055", "untColYn": "N"}


def call(trx, data):
    body = {"header": {"guidSeq": 1, "trxCd": trx, "scrId": "IECOSPC", "sysCd": "03", "fstChnCd": "WEB",
                       "langDvsnCd": "KO", "envDvsnCd": "D", "sndRspnDvsnCd": "S",
                       "sndDtm": time.strftime("%Y%m%d%H%M%S000"), "ipAddr": "127.0.0.1", "usrId": "IECOSPC",
                       "pageNum": 1, "pageCnt": 10000},
            "data": data}
    req = urllib.request.Request(ECOS + "/serviceEndpoint/httpService/request.json", data=json.dumps(body).encode(),
                                 headers={"Content-Type": "application/json", "Referer": ECOS + "/"})
    with urllib.request.urlopen(req, timeout=120) as r:
        d = json.loads(r.read().decode("utf-8"))
    return d.get("data") or {}


def main():
    os.makedirs(RAW, exist_ok=True)
    items = call("OSUUA01R03", {"dsId": DS["dsId"], "fileOfrYn": "Y", **ITEM}).get("statClfItmCdList", [])
    if not items:
        raise SystemExit("파일 목록을 받지 못했습니다 (ECOS 화면 주소가 바뀌었을 수 있음)")
    for it in items:
        row = {"cd": it["cd"], "cdNm": it["cdNm"], "cdEngNm": it.get("cdEngNm"), "uppCd": it["uppCd"], **DS,
               "statItmId": ITEM["statItmId"], "cdGrpId": ITEM["cdGrpId"], "untColYn": "N", "untNm": None,
               "untEngNm": None, "hircSlctYn": it.get("hircSlctYn"), "langCd": "KO"}
        f = call("OSDFA01R03", row)
        if not f.get("attFilePath"):
            continue  # 묶음 항목(투입산출표·생산자가격 등)에는 파일이 없다
        path = os.path.join(RAW, f["attFileNm"])
        if os.path.exists(path):
            print("있음", f["attFileNm"])
            continue
        url = ECOS + "/serviceEndpoint/fileDownload?" + urllib.parse.urlencode(
            {"filePath": f["attFilePath"], "fileName": f["attFileNm"]})
        with urllib.request.urlopen(urllib.request.Request(url, headers={"Referer": ECOS + "/"}), timeout=900) as r:
            blob = r.read()
        if blob[:2] != b"PK":
            raise SystemExit(f"{f['attFileNm']}: xlsx가 아닙니다")
        with open(path + ".tmp", "wb") as out:
            out.write(blob)
        os.replace(path + ".tmp", path)
        print("받음", f["attFileNm"], f"{len(blob) / 1e6:.0f}MB")


if __name__ == "__main__":
    main()
