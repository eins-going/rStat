"""KOSIS에서 전라남도·시군 농업 통계를 받아 data/data.js로 저장한다.

API 키는 .env(KOSIS_API_KEY)에서만 읽고, 결과 파일에는 넣지 않는다.
실행: python scripts/fetch_data.py
"""
import json
import os
import re
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SIDO = "전라남도"
SIGUNGU = ["목포시", "여수시", "순천시", "나주시", "광양시", "담양군", "곡성군", "구례군",
           "고흥군", "보성군", "화순군", "장흥군", "강진군", "해남군", "영암군", "무안군",
           "함평군", "영광군", "장성군", "완도군", "진도군", "신안군"]
REGIONS = [SIDO] + SIGUNGU
SIDO_ALIASES = {"전라남도", "전라남도 소계", "전남"}


def load_key():
    with open(os.path.join(ROOT, ".env"), encoding="utf-8") as f:
        for line in f:
            if line.startswith("KOSIS_API_KEY="):
                return line.split("=", 1)[1].strip().strip("\"'")
    raise SystemExit("KOSIS_API_KEY가 .env에 없습니다.")


KEY = load_key()


def call(path, params):
    q = urllib.parse.urlencode({"apiKey": KEY, "format": "json", "jsonVD": "Y", **params}, safe="+")
    with urllib.request.urlopen(f"https://kosis.kr/openapi/{path}?{q}", timeout=60) as r:
        text = r.read().decode("utf-8")
    try:
        out = json.loads(text)
    except json.JSONDecodeError:
        out = json.loads(re.sub(r'([{,])\s*([A-Za-z_]\w*)\s*:', r'\1"\2":', text))
    if isinstance(out, dict) and out.get("err"):
        raise RuntimeError(f"{params.get('tblId')}: {out.get('errMsg')}")
    return out


def meta(org, tbl):
    """분류 ID별로 {이름: 코드} 사전을 돌려준다."""
    rows = call("statisticsData.do", {"method": "getMeta", "type": "ITM", "orgId": org, "tblId": tbl})
    dims = defaultdict(dict)
    for x in rows:
        dims[x["OBJ_ID"]].setdefault(x["ITM_NM"], x["ITM_ID"])
    return dims


def data(org, tbl, prd_se, recent=1, **objs):
    params = {"method": "getList", "orgId": org, "tblId": tbl, "itmId": "ALL",
              "prdSe": prd_se, "newEstPrdCnt": str(recent)}
    for i, v in enumerate(objs.get("levels", ["ALL"]), 1):
        params[f"objL{i}"] = v
    return call("Param/statisticsParameterData.do", params)


def region_of(name):
    name = name.strip()
    if name in SIDO_ALIASES:
        return SIDO
    return name if name in SIGUNGU else None


def num(v):
    try:
        return float(v.replace(",", ""))
    except (AttributeError, ValueError):
        return None


def pick(rows, item_names, c2=None):
    """rows → {지역: {항목: {시점: 값}}}"""
    out = defaultdict(lambda: defaultdict(dict))
    for r in rows:
        reg = region_of(r.get("C1_NM", ""))
        if not reg or r["ITM_NM"] not in item_names:
            continue
        if c2 is not None and r.get("C2_NM") != c2:
            continue
        out[reg][r["ITM_NM"]][r["PRD_DE"]] = num(r["DT"])
    return out


def region_ids(dims, dim):
    ids = [dims[dim][n] for n in REGIONS if n in dims[dim]]
    return "+".join(ids)


def latest(series):
    return series[max(series)] if series else None


def main():
    out = {"updated": date.today().isoformat(), "sido": SIDO, "regions": REGIONS}

    # 농가·농가인구 (연간, 최근 10년)
    rows = data("101", "DT_1EA1011", "Y", recent=10)
    p = pick(rows, {"농가", "농가인구"})
    years = sorted({y for r in p.values() for s in r.values() for y in s})
    out["farm"] = {
        "years": years,
        "households": {k: [p[k]["농가"].get(y) for y in years] for k in REGIONS},
        "population": {k: [p[k]["농가인구"].get(y) for y in years] for k in REGIONS},
        "source": "통계청 농림어업조사 (KOSIS DT_1EA1011)",
    }

    # 고령인구 비율 (2025 농림어업총조사, 5년 주기)
    dims = meta("101", "DT_1AG25202")
    rows = data("101", "DT_1AG25202", "F", levels=[region_ids(dims, "A")])
    aging = {}
    for reg in REGIONS:
        rs = [r for r in rows if region_of(r["C1_NM"]) == reg]
        total = next((num(r["DT"]) for r in rs if r["ITM_NM"] == "농가 인구:계"), None)
        old = 0.0
        for r in rs:
            m = re.match(r"(\d+)(?:~\d+|세 이상)?_소계$", r["ITM_NM"].split(":")[-1])
            if m and int(m.group(1)) >= 65:
                old += num(r["DT"]) or 0
        if total:
            aging[reg] = {"population": total, "over65": old, "ratio": round(old / total * 100, 1)}
    out["aging"] = {"year": rows[0]["PRD_DE"], "byRegion": aging,
                    "source": "통계청 2025 농림어업총조사 (KOSIS DT_1AG25202)"}

    # 귀농·귀촌 (최근 5년)
    rows = data("101", "DT_1A02008", "Y", recent=5, levels=["ALL", "ALL"])
    p = pick(rows, {"가구수"}, c2="계")
    rows2 = data("101", "DT_1A02015", "Y", recent=5, levels=["ALL", "ALL"])
    p2 = pick(rows2, {"귀촌인수", "귀촌가구주수"}, c2="계")
    ry = sorted({y for r in p2.values() for s in r.values() for y in s})
    out["returning"] = {
        "years": ry,
        "farmHouseholds": {k: [p[k]["가구수"].get(y) for y in ry] for k in REGIONS},
        "ruralPersons": {k: [p2[k]["귀촌인수"].get(y) for y in ry] for k in REGIONS},
        "ruralHouseholds": {k: [p2[k]["귀촌가구주수"].get(y) for y in ry] for k in REGIONS},
        "source": "통계청 귀농어·귀촌인통계 (KOSIS DT_1A02008, DT_1A02015)",
    }

    # 경지면적 (최근 10년)
    rows = data("101", "DT_1EB002", "Y", recent=10)
    p = pick(rows, {"경지면적: 계", "논", "밭"})
    ly = sorted({y for r in p.values() for s in r.values() for y in s})
    out["land"] = {
        "years": ly,
        "total": {k: [p[k]["경지면적: 계"].get(y) for y in ly] for k in REGIONS},
        "paddy": {k: [p[k]["논"].get(y) for y in ly] for k in REGIONS},
        "field": {k: [p[k]["밭"].get(y) for y in ly] for k in REGIONS},
        "source": "통계청 농업면적조사 (KOSIS DT_1EB002)",
    }

    # 가축: 한육우·젖소(분기), 닭(분기), 돼지·오리(2025 총조사)
    rows = data("101", "DT_1EO251", "Q")
    p = pick(rows, {"한육우:농장수", "한육우:마리수", "젖소:농장수", "젖소:마리수"})
    quarter = rows[0]["PRD_DE"]
    rows = data("101", "DT_1EO100", "Q")
    pc = pick(rows, {"합계:가구수", "합계:마리수"})
    live = {}
    for reg in REGIONS:
        live[reg] = {
            "cattle": [latest(p[reg]["한육우:농장수"]), latest(p[reg]["한육우:마리수"])],
            "dairy": [latest(p[reg]["젖소:농장수"]), latest(p[reg]["젖소:마리수"])],
            "chicken": [latest(pc[reg]["합계:가구수"]), latest(pc[reg]["합계:마리수"])],
        }
    for key, tbl, farm_item in [("pig", "DT_1AG25505", "돼지 사육 규모별 농가:계"),
                                ("duck", "DT_1AG25508", "오리 사육 규모별 농가:계")]:
        dims = meta("101", tbl)
        rows = data("101", tbl, "F", levels=[region_ids(dims, "A"), dims["B"]["계"]])
        pp = pick(rows, {farm_item, "총 마릿수"})
        for reg in REGIONS:
            live[reg][key] = [latest(pp[reg][farm_item]), latest(pp[reg]["총 마릿수"])]
    out["livestock"] = {
        "quarter": f"{quarter[:4]}년 {int(quarter[4:])}/4분기",
        "censusYear": "2025",
        "byRegion": live,
        "source": "통계청 가축동향조사 (DT_1EO251, DT_1EO100) · 2025 농림어업총조사 (DT_1AG25505, DT_1AG25508)",
    }

    # 논벼 생산
    rows = data("101", "DT_1ET0294", "Y")
    p = pick(rows, {"논벼:재배면적(ha)", "논벼:생산량(톤)"})
    out["rice"] = {
        "year": rows[0]["PRD_DE"],
        "byRegion": {k: {"area": latest(p[k]["논벼:재배면적(ha)"]),
                         "production": latest(p[k]["논벼:생산량(톤)"])} for k in REGIONS},
        "source": "통계청 농작물생산조사 (KOSIS DT_1ET0294)",
    }

    # 채소·특용작물 재배면적 (2025 총조사)
    dims = meta("101", "DT_1AG25403")
    rows = data("101", "DT_1AG25403", "F", levels=[region_ids(dims, "A"), dims["B"]["계"]])
    crops = defaultdict(dict)
    for r in rows:
        reg = region_of(r["C1_NM"])
        if reg and r["ITM_NM"].endswith("_면적"):
            crops[reg][r["ITM_NM"][:-3]] = num(r["DT"])
    out["crops"] = {"year": "2025", "unit": "ha", "byRegion": crops,
                    "source": "통계청 2025 농림어업총조사 (KOSIS DT_1AG25403)"}

    # 지역내총생산 (전라남도 작성, 시군별)
    dims = meta("215", "DT_2020Y36GRDP1")
    rows = data("215", "DT_2020Y36GRDP1", "Y", levels=["ALL", "ALL"])
    grdp = defaultdict(dict)
    for r in rows:
        reg = region_of(r["C1_NM"])
        if not reg or r["ITM_NM"] != "명목":
            continue
        if r["C2_NM"].startswith("지역내총생산"):
            grdp[reg]["total"] = num(r["DT"])
        elif r["C2_NM"].startswith("농업"):
            grdp[reg]["agri"] = num(r["DT"])
    out["grdp"] = {"year": rows[0]["PRD_DE"], "unit": rows[0].get("UNIT_NM", ""), "byRegion": grdp,
                   "source": "전라남도 시군단위 지역내총생산 (KOSIS 215/DT_2020Y36GRDP1)"}

    # 농가경제 (시도 단위만 있음)
    dims = meta("101", "DT_1EA1201")
    c = next(v for k, v in dims["C"].items() if "전남" in k or "전라남도" in k)
    rows = data("101", "DT_1EA1201", "Y", levels=[c])
    want = {"농가소득(경상소득+비경상소득)": "income", "농업소득": "agriIncome", "자산": "assets", "부채": "debt"}
    econ = {want[r["ITM_NM"]]: num(r["DT"]) for r in rows if r["ITM_NM"] in want}
    unit = next(r.get("UNIT_NM", "") for r in rows if r["ITM_NM"] == "농업소득")
    out["economy"] = {"year": rows[0]["PRD_DE"], "unit": unit, "values": econ,
                      "source": "통계청 농가경제조사 (KOSIS DT_1EA1201) · 시도 단위"}

    path = os.path.join(ROOT, "data", "data.js")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write("window.AGRI_DATA = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print("saved", path, os.path.getsize(path), "bytes")


if __name__ == "__main__":
    main()
