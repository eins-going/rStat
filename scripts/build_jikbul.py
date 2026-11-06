"""공익직불 예산 화면 자료: db/raw/jikbul/ (fetch_jikbul.py) → data/jikbul.js (window.AGRI_JIKBUL)

분류 (세부사업명 규칙, 지자체마다 이름이 달라 낱말로 가른다):
  공익직불(농림축산식품부 '농업·농촌 공익기능 증진 직접지불제')
    기본형     기본형 공익직불(소농·면적직불). '공익증진직접지불제'(경북), '공익기능증진직접지불기금' 등
    경관보전 · 친환경 · 전략작물(논이모작·논활용 포함) · 저탄소   = 선택형
    행정·점검  행정경비·이행점검·토양검사·사업관리
  참고(공익직불이 아닌 직불): 임업(임업·산림 공익직불), 수산(수산 공익직불·소규모어가 등), FTA 피해보전, 경영이양, 자체·기타(청년 취농직불·토종농산물 등 지자체 자체 사업)
이중 계산: 도 본청 예산은 국비가 시군으로 내려가는 통로라 시도·전국 합계는 시군 합계로 센다.
  어떤 시도·분류에 시군 행이 하나도 없으면(세종·제주 등) 본청 금액을 그 시도 값으로 쓴다.
금액: 백만원. 예산 = 예산현액(bdg_cash_amt), 재원 = 국비·시도비·시군구비, 지출 = 지출액(ep_amt, 그 날짜까지).
분모: data/data.js의 농가(가구, 최근 해)·경지면적(ha, 최근 해)·농업·농촌 예산(지방재정365 기능별, 같은 회계연도).
"""
import gzip
import json
import os
import re
import sys
from collections import defaultdict
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from regions import ROOT, SIDOS, UNIT_KEYS, unit_of  # noqa: E402

RAW = os.path.join(ROOT, "db", "raw", "jikbul")
OUT = os.path.join(ROOT, "data", "jikbul.js")
# 공익직불 구성은 농식품부 안내(mafra.go.kr/gong/2593)를 따른다:
#   기본형(소농직불금·면적직불금) / 선택형(친환경농업·친환경안전축산물·경관보전·전략작물). 저탄소 프로그램 등 이름으로 못 가른 선택형은 '선택형 기타'.
CATS = ["기본형", "친환경", "친환경축산", "경관보전", "전략작물", "선택형 기타", "행정·점검"]
SELECT = ["친환경", "친환경축산", "경관보전", "전략작물", "선택형 기타"]   # 선택형
# 공익직불이 아닌 직불. 화면에는 농업 직불(자체·FTA·경영이양·옛 직불)만 보이고 임업·수산은 뺀다(사용자 2026-11-07)
REFS = ["자체·기타", "FTA", "경영이양", "옛 직불", "임업", "수산"]   # 옛 직불: 2020년 국비로 남은 쌀소득보전·밭농업 직불
F = ["amt", "nat", "sido", "sigun", "ep"]     # 금액 칸


def cat_of(name, part=""):
    """세부사업명(과 지방재정365 부문)으로 분류. 이름으로 안 갈리는 '직접지불금지급' 같은 행은 부문(임업ㆍ산촌·해양수산ㆍ어촌)으로 가른다.
    None이면 직불이 아님(예: '사회단체 공익기능활성화')."""
    n = re.sub(r"\s+", "", name)
    part = part or ""
    if "일반행정" in part:
        return None
    if re.search(r"수출", n):
        return "자체·기타"   # '농수산 수출 특화품목 직불금' 등 지자체 자체 사업
    if re.search(r"어가|(?<!농)수산|어선원|어업|양식|배합사료|해양", n):
        return "수산"
    if re.search(r"임업|산림", n):
        return "임업"
    if re.search(r"FTA|피해보전", n):
        return "FTA"
    if re.search(r"경영이양", n):
        return "경영이양"
    if re.search(r"행정|이행점검|토양검사|사업관리|운영비|관리비|도우미|입력요원|운영지원", n):
        return "행정·점검"
    if re.search(r"친환경축산|안전축산|축산물직불|친환경안전", n):
        return "친환경축산"
    if re.search(r"경관보전|경관작물", n):
        return "경관보전"
    if re.search(r"전략작물|전락작물|논이모작|논활용", n):
        return "전략작물"
    if re.search(r"친환경농업|유기|무농약|친환경생태|친환경직접지불|친환경직불", n):
        return "친환경"
    if re.search(r"탄소|선택형", n):
        return "선택형 기타"   # 저탄소 프로그램, '공익직불사업(선택형)'처럼 종류를 적지 않은 선택형
    if re.search(r"기본형|공익직불|공익형직불|공익형직접지불|공익증진|공익기능증진|공익기능직접지불|공익직접지불|기본직불|소농직불|면적직불", n):
        return "기본형"   # '(자체)'·'(시비)'가 붙은 기본형은 지자체가 얹어 주는 몫 → 기본형의 시군비로 드러난다
    if re.search(r"자체|군비|시비|도비|지방비|지자체|농가군비", n):
        return "자체·기타"
    if "임업" in part:
        return "임업"
    if re.search(r"해양|수산", part):
        return "수산"
    if re.search(r"쌀소득|쌀소득등|밭농업|논농업|조건불리", n):
        return "옛 직불"
    return "자체·기타"


SHORT = {v["short"]: k for k, v in SIDOS.items()}


def place(r):
    """→ ('unit', 지역키) | ('prov', 시도코드) | None"""
    wa = r["wa_laf_hg_nm"]
    name = r["laf_hg_nm"][len(wa):] if r["laf_hg_nm"].startswith(wa) else r["laf_hg_nm"]
    sidos = ["36", "24"] if wa == "전남광주" else [SHORT.get(wa)]
    if not sidos[0]:
        return None
    if name == "본청" or r["laf_cd"] == r["wa_laf_cd"]:
        return ("prov", sidos[0])
    for s in sidos:
        u = unit_of(s, name)
        if u and u[0] in UNIT_KEYS:
            return ("unit", u[0])
    return None


def load_js(path, var):
    with open(path, encoding="utf-8") as f:
        t = f.read()
    return json.loads(t[t.index("{"):t.rindex("}") + 1])


def main():
    files = sorted(f for f in os.listdir(RAW) if re.match(r"\d{4}_\d{8}\.json\.gz$", f))
    periods = [{"y": int(f[:4]), "d": f[5:13]} for f in files]
    unit = defaultdict(lambda: [defaultdict(lambda: [0.0] * 5) for _ in files])     # key → [기간] → 분류 → 금액칸
    prov = defaultdict(lambda: [defaultdict(lambda: [0.0] * 5) for _ in files])     # 시도 본청
    biz = defaultdict(lambda: [[] for _ in files])                                  # key → [기간] → 사업 줄
    missed = defaultdict(float)
    for i, f in enumerate(files):
        with gzip.open(os.path.join(RAW, f), "rt", encoding="utf-8") as fh:
            rows = json.load(fh)
        for r in rows:
            c = cat_of(r["dbiz_nm"], r.get("part_nm"))
            if c is None:
                continue
            if c == "옛 직불" and int(r["fyr"]) >= 2021 and not r.get("bdg_ntep"):
                c = "자체·기타"   # 2021년부터 쌀·밭 직불은 국비가 없다 → 지자체가 제 돈으로 주는 자체 직불(예: 고창 쌀소득보전직접지불제)
            v = [(r.get(k) or 0) / 1e6 for k in ("bdg_cash_amt", "bdg_ntep", "capep", "sggep", "ep_amt")]
            if c == "FTA" and v[2]:
                # FTA 피해보전직불금은 국가 사업(FTA 이행지원기금)인데 전남·경남·충북·제주는 도 본청부터 '시도비'로 적고
                # 도를 거쳐 받은 시군도 시도비로 적는다(같은 사업을 경북·충남 등은 국비로 적음). 시도비 표기분을 국비로 본다.
                v[1] += v[2]
                v[2] = 0.0
            if not v[0] and not v[4]:
                continue
            pl = place(r)
            if not pl:
                missed[r["laf_hg_nm"]] += v[0]
                continue
            tgt = unit if pl[0] == "unit" else prov
            acc = tgt[pl[1]][i][c]
            for j in range(5):
                acc[j] += v[j]
            key = pl[1] if pl[0] == "unit" else f"{pl[1]}"
            biz[key if pl[0] == "unit" else f"p{key}"][i].append([r["dbiz_nm"].strip(), c, *[round(x) for x in v]])
    if missed:
        print("지역을 못 찾은 지자체:", {k: round(v) for k, v in sorted(missed.items(), key=lambda x: -x[1])[:10]})

    allc = CATS + REFS
    regions = {}

    def pack(per):   # [기간] → {분류: [5칸]} → [기간] → [[분류 순서대로 5칸]] (백만원 반올림)
        return [[[round(x) for x in d.get(c, [0] * 5)] for c in allc] for d in per]

    for k in sorted(UNIT_KEYS):
        if k in unit:
            regions[k] = pack(unit[k])
    # 시도: 분류마다 시군 합계, 시군 행이 없으면 본청
    for s in SIDOS:
        per = []
        for i in range(len(files)):
            d = {}
            for c in allc:
                us = [unit[k][i][c] for k in unit if k.startswith(f"{s}|") and c in unit[k][i]]
                tot = [sum(x[j] for x in us) for j in range(5)]
                if tot[0] or tot[4]:
                    d[c] = tot
                elif s in prov and c in prov[s][i]:
                    d[c] = prov[s][i][c]
            per.append(d)
        if any(per):
            regions[s] = pack(per)
        # 시군이 하나뿐인 시도(세종)는 시도 값을 그 시군에 둔다
        ks = [k for k in UNIT_KEYS if k.startswith(f"{s}|")]
        if len(ks) == 1 and ks[0] not in regions and s in regions:
            regions[ks[0]] = regions[s]
            biz[ks[0]] = biz.get(f"p{s}", biz[ks[0]])
    nat = [[[sum(regions[s][i][ci][j] for s in SIDOS if s in regions) for j in range(5)] for ci in range(len(allc))] for i in range(len(files))]
    regions["00"] = nat

    # 분모
    D = load_js(os.path.join(ROOT, "data", "data.js"), "AGRI_DATA")
    hh_y, land_y = D["periods"]["farm"][-1], D["periods"]["land"][-1]
    den = {"households": {k: v[-1] for k, v in D["v"]["households"].items() if v and v[-1]},
           "land": {k: v[-1] for k, v in D["v"]["land"].items() if v and v[-1]},
           "agri": {}, "years": {"households": hh_y, "land": land_y}}
    by = D["periods"]["budget"]
    for k, arr in D["v"]["budgetAgri"].items():
        den["agri"][k] = [arr[by.index(str(p["y"]))] if str(p["y"]) in by and arr[by.index(str(p["y"]))] is not None else None for p in periods]

    # e-나라지표 (억원 → 백만원)
    idx = json.load(open(os.path.join(RAW, "index2749.json"), encoding="utf-8"))
    ext = {"공익직불": [idx["공익기능증진직불"].get(str(p["y"])) for p in periods],
           "이행점검": [idx.get("직불제이행점검", {}).get(str(p["y"])) for p in periods]}
    ext = {k: [round(v * 100) if v is not None else None for v in vs] for k, vs in ext.items()}

    # 사업 줄은 시군(과 세종)만, 금액 큰 순
    # 파일 크기 때문에 최근 두 기간(올해·작년 말)만 싣는다
    keep = set(range(max(0, len(files) - 2), len(files)))
    bz = {k: [sorted(b, key=lambda x: -x[2]) if i in keep else [] for i, b in enumerate(v)]
          for k, v in biz.items() if not k.startswith("p") and k in regions}
    out = {"built": date.today().isoformat(), "periods": periods, "cats": CATS, "select": SELECT, "refs": REFS,
           "fields": F, "regions": regions, "biz": bz, "den": den, "ext": ext,
           "source": "지방재정365 세부사업별 세출현황(QWGJK) · 세부사업명 '직불'·'직접지불'·'공익기능' · 시군 예산현액 합계",
           "extSource": "e-나라지표 직접지불금 현황(농림축산식품부) · 공익기능증진직불 정부 예산"}
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// 공익직불 예산 (지방재정365 세부사업, scripts/fetch_jikbul.py → scripts/build_jikbul.py). 금액 백만원\n")
        f.write("window.AGRI_JIKBUL = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    # 검증 출력
    for i, p in enumerate(periods):
        pub = sum(nat[i][CATS.index(c)][0] for c in CATS if c != "행정·점검")
        pn = sum(nat[i][CATS.index(c)][1] for c in CATS if c != "행정·점검")
        e = ext["공익직불"][i]
        print(f"{p['y']} {p['d']}: 공익직불(기본+선택) 예산 {pub / 100:,.0f}억 (국비 {pn / 100:,.0f}억) · e-나라지표 {e / 100 if e else 0:,.0f}억"
              f" · 국비 {pn / e * 100 if e else 0:.1f}% · 시군 {sum(1 for k in regions if '|' in k and regions[k][i][0][0])}곳")
    print(f"→ {OUT} {os.path.getsize(OUT) / 1024:.0f}KB")


if __name__ == "__main__":
    main()
