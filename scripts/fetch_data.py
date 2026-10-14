"""KOSIS에서 전국·시도·시군 농업 통계를 받아 data/data.js로 저장한다.

- 지역 단위는 data/geo.js(scripts/build_geo.py)의 현행 시군 단위에 맞춘다.
  광역시는 '○○시부'(구 지역)와 군, 일반시의 구는 시로 합친다.
- 지역 키: '00' 전국, '31' 시도(코드), '31|수원시' 시군
- API 키는 .env(KOSIS_API_KEY)에서만 읽고 결과 파일에는 넣지 않는다.
실행: python scripts/build_geo.py (경계가 없을 때) → python scripts/fetch_data.py
"""
import json
import os
import re
import urllib.parse
import urllib.request
from collections import defaultdict
from datetime import date

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
METRO = {"11", "21", "22", "23", "24", "25", "26"}
SIDO_PREFIX = [("서울", "11"), ("부산", "21"), ("대구", "22"), ("인천", "23"), ("광주광역", "24"),
               ("대전", "25"), ("울산", "26"), ("세종", "29"), ("경기", "31"), ("강원", "32"),
               ("충청북", "33"), ("충북", "33"), ("충청남", "34"), ("충남", "34"), ("전라북", "35"),
               ("전북", "35"), ("전라남", "36"), ("전남", "36"), ("경상북", "37"), ("경북", "37"),
               ("경상남", "38"), ("경남", "38"), ("제주", "39")]


def load_key():
    with open(os.path.join(ROOT, ".env"), encoding="utf-8") as f:
        for line in f:
            if line.startswith("KOSIS_API_KEY="):
                return line.split("=", 1)[1].strip().strip("\"'")
    raise SystemExit("KOSIS_API_KEY가 .env에 없습니다.")


KEY = load_key()


def load_geo():
    with open(os.path.join(ROOT, "data", "geo.js"), encoding="utf-8") as f:
        text = f.read()
    topo = json.loads(text[text.index("{"):text.rindex("}") + 1])
    units = {(g["properties"]["sido"], g["properties"]["unit"]) for g in topo["objects"]["municipalities"]["geometries"]}
    return topo["sidos"], units


SIDOS, UNITS = load_geo()
UNIT_KEYS = {f"{s}|{u}" for s, u in UNITS}


# ---------- KOSIS 호출 ----------
def call(path, params):
    q = urllib.parse.urlencode({"apiKey": KEY, "format": "json", "jsonVD": "Y", **params}, safe="+")
    with urllib.request.urlopen(f"https://kosis.kr/openapi/{path}?{q}", timeout=90) as r:
        text = r.read().decode("utf-8")
    try:
        out = json.loads(text)
    except json.JSONDecodeError:
        out = json.loads(re.sub(r'([{,])\s*([A-Za-z_]\w*)\s*:', r'\1"\2":', text))
    if isinstance(out, dict) and out.get("err"):
        raise RuntimeError(f"{params.get('tblId')}: {out.get('errMsg')}")
    return out


def meta(org, tbl):
    """분류 목록: [(OBJ_ID, OBJ_NM, [items])], items = dict(id, name, up)"""
    rows = call("statisticsData.do", {"method": "getMeta", "type": "ITM", "orgId": org, "tblId": tbl})
    dims = {}
    for x in rows:
        d = dims.setdefault(x["OBJ_ID"], {"name": x["OBJ_NM"], "items": []})
        d["items"].append({"id": x["ITM_ID"], "name": x["ITM_NM"].strip(), "up": x.get("UP_ITM_ID") or None})
    return dims


def data(org, tbl, prd_se, recent, levels):
    params = {"method": "getList", "orgId": org, "tblId": tbl, "itmId": "ALL",
              "prdSe": prd_se, "newEstPrdCnt": str(recent)}
    for i, v in enumerate(levels, 1):
        params[f"objL{i}"] = v
    return call("Param/statisticsParameterData.do", params)


def num(v):
    try:
        return float(str(v).replace(",", ""))
    except ValueError:
        return None


# ---------- 지역 정규화 ----------
def sido_code(name):
    for prefix, code in SIDO_PREFIX:
        if name.startswith(prefix):
            return code
    return None


def unit_of(sido, name):
    """(지역키, 방식) — 방식: 'unit' 그대로, 'explicit' 시부 값, 'sum' 시부에 더할 구"""
    name = name.strip()
    if name in ("동부", "읍부", "면부"):
        return None
    short = SIDOS[sido]["short"]
    if sido in METRO:
        if name.endswith("시부") or name.endswith("군외") or name.endswith("구외"):
            return f"{sido}|{short}시부", "explicit"
        if name.endswith("군") or (sido == "24" and name == "광산구"):
            return f"{sido}|{name}", "unit"
        if name.endswith("구"):
            return f"{sido}|{short}시부", "sum"
        return None
    if sido == "29":
        return ("29|세종시", "unit") if name.startswith("세종") else None
    if name.endswith("구") or " " in name:
        return None  # 일반시의 구는 시 행에 이미 합쳐져 있다
    name = {"여주군": "여주시", "당진군": "당진시"}.get(name, name)
    if sido == "37" and name == "군위군":
        return "22|군위군", "unit"
    return f"{sido}|{name}", "unit"


def region_map(dim):
    """지역 분류 → {ITM_ID: (지역키, 방식)}. 전국·시도는 방식 'area'."""
    items = dim["items"]
    out = {}
    sido_ids = {}
    for it in items:
        if it["name"] == "전국":
            out[it["id"]] = ("00", "area")
        elif (it["up"] in (None, "00") or it["up"] not in {x["id"] for x in items}) and sido_code(it["name"]):
            code = sido_code(it["name"])
            if it["name"].endswith("시") and code in ("24",) and it["up"] not in (None, "00"):
                continue
            out[it["id"]] = (code, "area")
            sido_ids[it["id"]] = code
    for it in items:
        sido = sido_ids.get(it["up"])
        if not sido:
            continue
        u = unit_of(sido, it["name"])
        if u and u[0] in UNIT_KEYS:
            out[it["id"]] = u
    return out


def region_dim(dims):
    for oid, d in dims.items():
        if oid != "ITEM" and re.search(r"행정|시도|시군|구군|자치구|지역", d["name"]):
            return oid
    raise RuntimeError("지역 분류를 찾지 못했습니다")


def collect(rows, rmap, ritem_col, item_names, extra=None):
    """rows → {항목: {지역키: {시점: 값}}}, 시부는 명시값 우선, 없으면 구 합계"""
    acc = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: {"explicit": None, "sum": None, "val": None})))
    for r in rows:
        if r["ITM_NM"].strip() not in item_names:
            continue
        if extra and not extra(r):
            continue
        hit = rmap.get(r[ritem_col])
        if not hit:
            continue
        key, how = hit
        v = num(r["DT"])
        cell = acc[r["ITM_NM"].strip()][key][r["PRD_DE"]]
        if how in ("area", "unit"):
            cell["val"] = v if v is not None else cell["val"]
        elif how == "explicit":
            cell["explicit"] = v
        elif v is not None:
            cell["sum"] = (cell["sum"] or 0) + v
    out = {}
    for item, regs in acc.items():
        out[item] = {}
        for key, per in regs.items():
            out[item][key] = {p: (c["val"] if c["val"] is not None else c["explicit"] if c["explicit"] is not None else c["sum"])
                              for p, c in per.items()}
    return out


def fill_single_units(series):
    """하위 지역이 없는 표에서 단위가 하나뿐인 시도(서울·대전·세종)는 시도 값을 그대로 쓴다."""
    single = {s: [k for k in UNIT_KEYS if k.startswith(f"{s}|")] for s in SIDOS}
    for s, ks in single.items():
        if len(ks) == 1 and ks[0] not in series and s in series:
            series[ks[0]] = series[s]
    return series


def fetch(org, tbl, prd_se, recent, items, fixed=None, region_ids=False):
    """표 하나를 받아 {항목: {지역키: {시점: 값}}}. fixed: 지역 외 분류의 고정값(이름)."""
    dims = meta(org, tbl)
    rdim = region_dim(dims)
    rmap = region_map(dims[rdim])
    order = [k for k in dims if k != "ITEM"]
    levels = []
    for oid in order:
        if oid == rdim:
            levels.append("+".join(rmap) if region_ids else "ALL")
        else:
            name = (fixed or {}).get(oid, "계")
            ids = [it["id"] for it in dims[oid]["items"] if it["name"] == name]
            levels.append(ids[0] if ids else "ALL")
    rows = data(org, tbl, prd_se, recent, levels)
    col = f"C{order.index(rdim) + 1}"
    out = collect(rows, rmap, col, set(items))
    for k in out:
        out[k] = fill_single_units(out[k])
    return out, rows


def series(per_region, periods, digits=0):
    out = {}
    for key, s in per_region.items():
        vals = [s.get(p) for p in periods]
        if any(v is not None for v in vals):
            out[key] = [None if v is None else (round(v, digits) if digits else round(v)) for v in vals]
    return out


def latest(per_region, digits=0):
    out = {}
    for key, s in per_region.items():
        vals = [(p, v) for p, v in s.items() if v is not None]
        if vals:
            v = max(vals)[1]
            out[key] = round(v, digits) if digits else round(v)
    return out


def periods_of(block):
    return sorted({p for regs in block.values() for s in regs.values() for p in s})


# ---------- 지표별 수집 ----------
def main():
    out = {"updated": date.today().isoformat(), "sources": {}, "periods": {}, "v": {}}
    v = out["v"]

    print("농가·농가인구")
    b, _ = fetch("101", "DT_1EA1011", "Y", 10, ["농가", "농가인구"])
    yrs = periods_of(b)
    out["periods"]["farm"] = yrs
    v["households"] = series(b["농가"], yrs)
    v["population"] = series(b["농가인구"], yrs)
    out["sources"]["farm"] = "통계청 농림어업조사 (KOSIS DT_1EA1011)"

    print("고령인구 비율")
    b, rows = fetch("101", "DT_1AG25202", "F", 1, None or [], region_ids=True)
    dims = meta("101", "DT_1AG25202")
    rmap = region_map(dims[region_dim(dims)])
    items = {r["ITM_NM"].strip() for r in rows}
    old_items = {n for n in items if (m := re.match(r"(\d+)(?:~\d+|세 이상)?_소계$", n.split(":")[-1])) and int(m.group(1)) >= 65}
    total = collect(rows, rmap, "C1", {"농가 인구:계"})["농가 인구:계"]
    olds = collect(rows, rmap, "C1", old_items)
    aging = {}
    for key, s in total.items():
        p = max(s)
        t = s[p]
        o = sum((olds[i].get(key, {}).get(p) or 0) for i in old_items)
        if t:
            aging[key] = [round(t), round(o)]
    v["aging"] = fill_single_units(aging)
    out["periods"]["aging"] = rows[0]["PRD_DE"]
    out["sources"]["aging"] = "통계청 2025 농림어업총조사 (KOSIS DT_1AG25202)"

    print("귀농·귀촌")
    b1, _ = fetch("101", "DT_1A02008", "Y", 5, ["가구수"])
    b2, _ = fetch("101", "DT_1A02015", "Y", 5, ["귀촌인수"])
    yrs = sorted(set(periods_of(b1)) | set(periods_of(b2)))
    out["periods"]["returning"] = yrs
    v["returnFarm"] = series(b1["가구수"], yrs)
    v["returnRural"] = series(b2["귀촌인수"], yrs)
    out["sources"]["returning"] = "통계청 귀농어·귀촌인통계 (KOSIS DT_1A02008, DT_1A02015)"

    print("경지면적")
    b, _ = fetch("101", "DT_1EB002", "Y", 10, ["경지면적: 계", "논", "밭"])
    yrs = periods_of(b)
    out["periods"]["land"] = yrs
    v["land"] = series(b["경지면적: 계"], yrs, 1)
    v["paddy"] = series(b["논"], yrs, 1)
    v["field"] = series(b["밭"], yrs, 1)
    out["sources"]["land"] = "통계청 농업면적조사 (KOSIS DT_1EB002) · 인천 옹진군은 인천시부에 포함"

    print("가축")
    b, rows = fetch("101", "DT_1EO251", "Q", 1, ["한육우:농장수", "한육우:마리수", "젖소:농장수", "젖소:마리수"])
    q = rows[0]["PRD_DE"]
    pair = lambda a, c: {k: [a.get(k), c.get(k)] for k in set(a) | set(c)}
    v["cattle"] = pair(latest(b["한육우:농장수"]), latest(b["한육우:마리수"]))
    v["dairy"] = pair(latest(b["젖소:농장수"]), latest(b["젖소:마리수"]))
    b, _ = fetch("101", "DT_1EO100", "Q", 1, ["합계:가구수", "합계:마리수"])
    v["chicken"] = pair(latest(b["합계:가구수"]), latest(b["합계:마리수"]))
    b, _ = fetch("101", "DT_1AG25505", "F", 1, ["돼지 사육 규모별 농가:계", "총 마릿수"], region_ids=True)
    v["pig"] = pair(latest(b["돼지 사육 규모별 농가:계"]), latest(b["총 마릿수"]))
    b, _ = fetch("101", "DT_1AG25508", "F", 1, ["오리 사육 규모별 농가:계", "총 마릿수"], region_ids=True)
    v["duck"] = pair(latest(b["오리 사육 규모별 농가:계"]), latest(b["총 마릿수"]))
    out["periods"]["livestock"] = f"{q[:4]}년 {int(q[4:])}/4분기"
    out["periods"]["census"] = "2025"
    out["sources"]["livestock"] = "통계청 가축동향조사 (DT_1EO251, DT_1EO100) · 2025 농림어업총조사 (DT_1AG25505, DT_1AG25508)"

    print("논벼")
    b, rows = fetch("101", "DT_1ET0294", "Y", 1, ["논벼:재배면적(ha)", "논벼:생산량(톤)"])
    a, p = latest(b["논벼:재배면적(ha)"]), latest(b["논벼:생산량(톤)"])
    v["rice"] = {k: [a.get(k), p.get(k)] for k in set(a) | set(p)}
    out["periods"]["rice"] = rows[0]["PRD_DE"]
    out["sources"]["rice"] = "통계청 농작물생산조사 (KOSIS DT_1ET0294)"

    print("채소·특용작물")
    dims = meta("101", "DT_1AG25403")
    names = [it["name"] for it in dims["ITEM"]["items"] if it["name"].endswith("_면적")]
    b, _ = fetch("101", "DT_1AG25403", "F", 1, names, region_ids=True)
    crops = defaultdict(dict)
    for item, regs in b.items():
        for key, val in latest(regs).items():
            if val:
                crops[key][item[:-3]] = val
    v["crops"] = crops
    out["sources"]["crops"] = "통계청 2025 농림어업총조사 (KOSIS DT_1AG25403)"

    print("지역내총생산")
    v["grdp"], out["periods"]["grdp"], out["sources"]["grdp"] = grdp()

    print("농가경제")
    dims = meta("101", "DT_1EA1201")
    cmap = {it["id"]: ("00" if it["name"] == "평균" else sido_code(it["name"]))
            for it in dims["C"]["items"] if it["name"] == "평균" or (it["id"].startswith("A") and sido_code(it["name"]))}
    rows = data("101", "DT_1EA1201", "Y", 1, ["+".join(cmap)])
    want = ["농가소득(경상소득+비경상소득)", "농업소득", "자산", "부채"]
    econ = defaultdict(lambda: [None] * 4)
    for r in rows:
        if r["ITM_NM"] in want and r["C1"] in cmap:
            econ[cmap[r["C1"]]][want.index(r["ITM_NM"])] = round(num(r["DT"]))
    v["economy"] = dict(econ)
    out["periods"]["economy"] = rows[0]["PRD_DE"]
    out["units"] = {"economy": "천원", "grdp": "백만원"}
    out["sources"]["economy"] = "통계청 농가경제조사 (KOSIS DT_1EA1201) · 도 단위"

    skip = {"grdp": {s for s, y in out["periods"]["grdp"]["bySido"].items() if y != GRDP_YEAR}}
    for m in ["households", "population", "land", "paddy", "field", "returnFarm", "returnRural", "aging",
              "cattle", "dairy", "chicken", "pig", "duck", "rice", "grdp"]:
        reconcile(v[m], skip.get(m, set()))

    path = os.path.join(ROOT, "data", "data.js")
    with open(path, "w", encoding="utf-8") as f:
        f.write("window.AGRI_DATA = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print("saved", path, os.path.getsize(path), "bytes")
    missing = sorted(k for k in UNIT_KEYS if k not in v["households"])
    print("농가수 없는 시군:", missing)


def reconcile(values, skip_sidos):
    """시군 값이 모두 있으면 시도 값을 시군 합계로 맞춘다.
    표마다 행정구역 개편(예: 2023년 군위군 대구 편입) 반영 시점이 달라 시도 합계가 어긋나기 때문이다."""
    for s in SIDOS:
        if s in skip_sidos:
            continue
        keys = [k for k in UNIT_KEYS if k.startswith(f"{s}|")]
        rows = [values.get(k) for k in keys]
        if not rows or any(r is None for r in rows):
            continue
        n = len(rows[0])
        merged = list(values.get(s) or [None] * n)
        for i in range(n):
            col = [r[i] for r in rows]
            if all(c is not None for c in col):
                total = sum(col)
                merged[i] = round(total, 1) if isinstance(total, float) and not total.is_integer() else round(total)
        values[s] = merged


# 시도별 시군 GRDP 표 (KOSIS 기관 코드, 표 ID). 서울은 자치구별, 나머지는 시군(구군)별.
GRDP_TABLES = {
    "11": ("201", "DT_201012_D040027"), "21": ("202", "DT_F10107"), "22": ("203", "DT_2020Y22GRDP1"),
    "23": ("204", "DT_2020Y23GRDP1"), "24": ("205", "DT_2020Y24GRDP1"), "25": ("206", "DT_2020Y25GRDP1"),
    "26": ("207", "DT_GRDP_2020_01"), "31": ("210", "DT_GRDP004_2020"), "32": ("211", "DT_2020Y32GRDP1"),
    "33": ("212", "DT_2020Y33GRDP1"), "34": ("213", "DT_2020Y34GRDP1"), "35": ("214", "DT_2020Y35GRDP1"),
    "36": ("215", "DT_2020Y36GRDP1"), "37": ("216", "DT_GRDP202037_01"), "38": ("217", "DT_2020Y38GRDP1"),
    "39": ("218", "DT_2020GRDP39_01"),
}
GRDP_YEAR = "2023"


def unit_scale(unit):
    return {"십억원": 1000, "억원": 100, "백만원": 1, "천원": 0.001}.get((unit or "").replace(" ", ""), 1)


def activity_ids(dim):
    total = next(it["id"] for it in dim["items"] if it["name"].startswith("지역내총생산"))
    agri = next(it["id"] for it in dim["items"] if re.match(r"농(업|림)", it["name"]))
    return total, agri


def grdp():
    """{지역키: [농림어업, 지역내총생산]} 백만원(명목), 시도·전국은 DT_1C91, 시군은 시도별 표."""
    res = {}
    dims = meta("101", "DT_1C91")
    rdim = region_dim(dims)
    adim = next(k for k in dims if k not in ("ITEM", rdim))
    t_id, a_id = activity_ids(dims[adim])
    rmap = region_map(dims[rdim])
    item = next(it["id"] for it in dims["ITEM"]["items"] if it["name"] == "명목")
    order = [k for k in dims if k != "ITEM"]
    levels = ["ALL" if k == rdim else f"{t_id}+{a_id}" for k in order]
    params = {"method": "getList", "orgId": "101", "tblId": "DT_1C91", "itmId": item, "prdSe": "Y",
              "startPrdDe": GRDP_YEAR, "endPrdDe": GRDP_YEAR}
    params.update({f"objL{i + 1}": lv for i, lv in enumerate(levels)})
    rows = call("Param/statisticsParameterData.do", params)
    rc, ac = f"C{order.index(rdim) + 1}", f"C{order.index(adim) + 1}"
    for r in rows:
        hit = rmap.get(r[rc])
        if hit and hit[1] == "area":
            pair = res.setdefault(hit[0], [None, None])
            pair[0 if r[ac] == a_id else 1] = round(num(r["DT"]) * unit_scale(r.get("UNIT_NM")))
    years = {}
    for sido, (org, tbl) in GRDP_TABLES.items():
        try:
            dims = meta(org, tbl)
            rdim = region_dim(dims)
            adim = next(k for k in dims if k not in ("ITEM", rdim))
            t_id, a_id = activity_ids(dims[adim])
            item = dims["ITEM"]["items"][0]["id"]  # 명목(당해년가격)
            order = [k for k in dims if k != "ITEM"]
            levels = ["ALL" if k == rdim else f"{t_id}+{a_id}" for k in order]
            params = {"method": "getList", "orgId": org, "tblId": tbl, "itmId": item, "prdSe": "Y", "newEstPrdCnt": "3"}
            params.update({f"objL{i + 1}": lv for i, lv in enumerate(levels)})
            rows = call("Param/statisticsParameterData.do", params)
        except Exception as e:  # 표 하나가 실패해도 나머지 시도는 계속
            print("  GRDP 실패", sido, e)
            continue
        year = GRDP_YEAR if any(r["PRD_DE"] == GRDP_YEAR for r in rows) else max(r["PRD_DE"] for r in rows)
        years[sido] = year
        rc, ac = f"C{order.index(rdim) + 1}", f"C{order.index(adim) + 1}"
        acc = defaultdict(lambda: {"explicit": [None, None], "sum": [None, None], "val": [None, None]})
        for r in rows:
            if r["PRD_DE"] != year:
                continue
            name = r[f"{rc}_NM"].strip()
            if sido_code(name) == sido or name in ("서울시",):
                continue  # 시도 합계는 DT_1C91 값을 쓴다
            u = unit_of(sido, name)
            if not u or u[0] not in UNIT_KEYS:
                continue
            key, how = u
            idx = 0 if r[ac] == a_id else 1
            val = num(r["DT"])
            if val is None:
                continue
            val *= unit_scale(r.get("UNIT_NM"))
            slot = acc[key]["val" if how == "unit" else how]
            slot[idx] = val if how != "sum" else (slot[idx] or 0) + val
        for key, c in acc.items():
            pick = [c["val"][i] if c["val"][i] is not None else c["explicit"][i] if c["explicit"][i] is not None else c["sum"][i]
                    for i in range(2)]
            if any(x is not None for x in pick):
                res[key] = [None if x is None else round(x) for x in pick]
    years_note = sorted({y for y in years.values() if y != GRDP_YEAR})
    period = GRDP_YEAR + (f" (일부 {', '.join(years_note)})" if years_note else "")
    src = "통계청 시도별 지역내총생산 (DT_1C91) · 각 시도 시군별 지역내총생산"
    return fill_single_units(res), {"label": period, "bySido": years}, src


if __name__ == "__main__":
    main()
