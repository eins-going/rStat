"""고향사랑기금 화면 자료: db/raw/gohyang/QWGJK_*.json.gz → data/gohyang.js (window.AGRI_GOHYANG)

무엇을 보나
- 지방재정365 세부사업별 세출현황(QWGJK)의 '고향사랑기금' 회계 행 = 지자체가 기금에서 쓰려고 잡은 돈(예산현액)과 쓴 돈(지출액).
  기금 회계의 세출 예산현액 합계는 그해 기금이 굴리는 돈 전체(전년에 남긴 돈 + 그해 들어올 기부금 예상)와 같다.
- 행을 이름으로 네 갈래로 나눈다(자체 기준, 화면에 적는다).
    적립: 보전지출·예치·예탁·여유자금 → 쓰지 않고 남겨 두는 돈(연말 기금 잔액 계획)
    넘김: 내부거래·전출 → 다른 회계로 보내는 돈
    운영: 기본경비·답례품·홍보·모금·기부제 운영 → 기부를 받고 관리하는 데 드는 돈
    사업: 그 밖의 모든 행 → 주민을 위한 기금사업(지정기부 사업 포함)
- 일반회계 등 다른 회계의 '고향사랑' 사업(답례품·홍보·정보시스템)은 '일반회계 운영비'로 따로 센다.

지역 키 (scripts/regions.py와 같다)
- 시군은 그 지자체, 광역시 구는 '○○시부'에 더한다.
- 고향사랑기금은 시도 본청도 따로 모금·운용한다(시군에 내려보내는 돈이 아니다).
  그래서 시도 값 = 본청 + 시군 합계, 전국 = 243곳 합계. 본청은 지도 칸이 없어 목록에서만 보인다.

검증: 행정안전부 발표 전국 모금액과 견준다(기획_고향사랑기금.md).
실행: python scripts/build_gohyang.py
"""
import glob
import gzip
import json
import os
import re
from collections import defaultdict
from datetime import datetime

from regions import SIDOS, UNIT_KEYS, unit_of

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HOME = os.environ.get("RSTAT_HOME", ROOT)
RAW = os.path.join(HOME, "db", "raw", "gohyang")
OUT = os.path.join(ROOT, "data", "gohyang.js")
NATION = "00"

# 지방재정365 시도 이름(wa_laf_hg_nm) → 지역 코드. 2026년 전남·광주 통합 뒤 이름은 따로 맞춘다
SHORT_TO_CODE = {v["short"]: k for k, v in SIDOS.items()}
GWANGJU_GU = {"동구", "서구", "남구", "북구", "광산구"}

KEEP = re.compile(r"보전|예치|예탁|여유자금|적립|조성")
MOVE = re.compile(r"내부거래|전출")
RUN = re.compile(r"기본경비|인력운영|답례|홍보|모금|기부제|정보시스템|시스템\s*운영|수수료|운영비")
# 행 값 순서 (원)
FIELDS = ["size", "biz", "bizEp", "run", "runEp", "keep", "move", "gen", "genEp", "genIn", "nBiz"]
NB = FIELDS.index("nBiz")


def kind_of(r):
    acnt = (r.get("acnt_dv_nm") or "").replace(" ", "")
    name = r.get("dbiz_nm") or ""
    if "고향사랑" not in acnt:
        # 일반회계에서 기금으로 보내는 돈(2023년에 기부금을 일반회계로 받아 기금에 옮긴 곳이 많다)은 운영비와 나눈다
        if MOVE.search(name) or "조성" in name or name.replace(" ", "").endswith("기금") or r.get("fld_cd") == "900":
            return "genIn"
        return "gen"
    if KEEP.search(name):
        return "keep"
    if MOVE.search(name):
        return "move"
    if RUN.search(name):
        return "run"
    return "biz"


def place(r):
    """(시도 코드, 지자체 이름, 지역 키). 본청은 지역 키가 시도 코드"""
    wa, laf = r["wa_laf_hg_nm"], r["laf_hg_nm"]
    name = laf[len(wa):] if laf.startswith(wa) else laf
    if wa.startswith("전남광주") and name == "본청":
        sido = "36"
    elif wa in SHORT_TO_CODE:
        sido = SHORT_TO_CODE[wa]
    elif wa.startswith("전남광주") or wa == "광주전남":
        # 통합 뒤: 옛 광주 구는 광주(24), 나머지는 전남(36)으로 둔다 (지도가 옛 시도 경계를 쓴다)
        sido = "24" if name in GWANGJU_GU else "36"
    else:
        raise SystemExit(f"알 수 없는 시도 이름: {wa} ({laf})")
    if name == "본청" and sido == "29":
        return sido, "세종시", "29|세종시"  # 단층제: 본청이 곧 시 (지도 칸이 하나)
    if name == "본청":
        # 통합 뒤 본청은 하나(옛 광주·전남 본청 기금이 합쳐짐) → 전남(36)에 둔다
        return sido, ("전남광주 본청" if wa.startswith("전남광주") else f"{SIDOS[sido]['short']} 본청"), sido
    u = unit_of(sido, name)
    if not u or u[0] not in UNIT_KEYS:
        raise SystemExit(f"지역 키를 찾지 못함: {laf}")
    return u[0].split("|")[0], name, u[0]


def load():
    snaps = []
    for path in sorted(glob.glob(os.path.join(RAW, "QWGJK_*.json.gz"))):
        with gzip.open(path, "rt", encoding="utf-8") as f:
            snaps.append(json.load(f))
    # 한 해에 하나 (올해가 여러 날이면 가장 늦은 날)
    by_year = {}
    for s in snaps:
        by_year[s["exe_ymd"][:4]] = s if s["exe_ymd"] > by_year.get(s["exe_ymd"][:4], {"exe_ymd": ""})["exe_ymd"] else by_year[s["exe_ymd"][:4]]
    return [by_year[y] for y in sorted(by_year)]


# 견줄 전국 값 (억원). 행정안전부 연간 모금액(2026-01-28 운영 결과 발표: 2023 651억·2024 879억·2025 1,515억)과
# 국회 행정안전위원회 박정현 의원 공개 자료(연합뉴스 2026-10-04: 2023~2026년 8월 누적 모금 3,457억, 기금 잔액 2,410억)
MOIS_RAISED = {2023: 650.6, 2024: 879.3, 2025: 1515.0}
MP_BALANCE = {"asof": "2026년 8월", "raised": 3457.43, "balance": 2410.09}


def check(regions, counts, years):
    """전국 값과 견준 결과 (화면 오른쪽 아래 한 줄 + 기획 문서)"""
    nat = regions[NATION]
    eok = lambda yi, f: nat[yi][FIELDS.index(f)] / 1e8
    out = {"years": {}}
    for yi, y in enumerate(years):
        if y["full"] and y["y"] in MOIS_RAISED:
            run = eok(yi, "runEp") + eok(yi, "genEp")
            out["years"][y["y"]] = {"raised": MOIS_RAISED[y["y"]], "govs": counts[NATION][yi], "size": round(eok(yi, "size")),
                                    "runShare": round(run / MOIS_RAISED[y["y"]] * 100)}
    last = len(years) - 1
    keep = eok(last, "keep")
    out["balance"] = {"ours": round(keep), "ymd": years[last]["ymd"], **MP_BALANCE, "pct": round(keep / MP_BALANCE["balance"] * 100)}
    full = [yi for yi, y in enumerate(years) if y["full"] and y["y"] in MOIS_RAISED]
    if full:
        yi = full[-1]
        cum = sum(v for k, v in MOIS_RAISED.items() if k <= years[yi]["y"])
        out["cum"] = {"y": years[yi]["y"], "size": round(eok(yi, "size")), "raised": round(cum), "pct": round(eok(yi, "size") / cum * 100)}
    shares = " · ".join(f"{y} {v['runShare']}%" for y, v in out["years"].items())
    out["text"] = (f"{years[last]['ymd'][:4]}년 {int(years[last]['ymd'][4:6])}월 말 남겨 둔 돈 {out['balance']['ours']:,}억원은 국회 자료의 "
                   f"{MP_BALANCE['asof']} 기금 잔액 {MP_BALANCE['balance']:,.0f}억원의 {out['balance']['pct']}%. "
                   + (f"{out['cum']['y']}년 기금 규모 {out['cum']['size']:,}억원은 행정안전부 발표 누적 모금 {out['cum']['raised']:,}억원의 {out['cum']['pct']}%. " if full else "")
                   + f"운영비 지출(기금 안+일반회계)은 그해 모금액의 {shares}로 답례품 한도(30%)와 맞는 크기입니다.")
    return out


def main():
    snaps = load()
    if not snaps:
        raise SystemExit("db/raw/gohyang/에 받은 파일이 없습니다 (scripts/fetch_gohyang.py)")
    years = []
    govs = {}             # laf_cd → {n, r, s}
    vals = defaultdict(lambda: defaultdict(lambda: [0] * len(FIELDS)))  # laf → yi → 값
    items = []            # [laf, yi, 사업명, 예산현액, 지출액, 갈래]
    fund_govs = defaultdict(set)
    for yi, s in enumerate(snaps):
        ymd = s["exe_ymd"]
        years.append({"y": int(ymd[:4]), "ymd": ymd, "full": ymd.endswith("1231")})
        for r in s["rows"]:
            sido, name, key = place(r)
            laf = r["laf_cd"]
            govs.setdefault(laf, {"n": name, "r": key, "s": sido})
            cash, ep = r.get("bdg_cash_amt") or 0, r.get("ep_amt") or 0
            k = kind_of(r)
            v = vals[laf][yi]
            if k not in ("gen", "genIn"):
                v[0] += cash
                fund_govs[yi].add(laf)
            if k == "biz":
                v[1] += cash; v[2] += ep; v[NB] += 1 if (cash or ep) else 0
            elif k == "run":
                v[3] += cash; v[4] += ep
            elif k == "keep":
                v[5] += cash
            elif k == "move":
                v[6] += cash
            elif k == "gen":
                v[7] += cash; v[8] += ep
            else:
                v[9] += cash
            if k in ("biz", "run", "gen") and (cash or ep):
                items.append([laf, yi, re.sub(r"\s+", " ", r["dbiz_nm"]).strip(), cash, ep, k])

    # 지역 합계 (전국·시도·시군)
    regions = defaultdict(lambda: defaultdict(lambda: [0] * len(FIELDS)))
    counts = defaultdict(lambda: defaultdict(int))  # 기금 회계가 있는 지자체 수
    for laf, per in vals.items():
        g = govs[laf]
        targets = {NATION, g["s"], g["r"]}
        for yi, v in per.items():
            for t in targets:
                acc = regions[t][yi]
                for i, x in enumerate(v):
                    acc[i] += x
                if laf in fund_govs[yi]:
                    counts[t][yi] += 1

    def pack(per):
        # 값은 백만원 단위로 줄인다(사업 수는 그대로)
        return [[round(x / 1e6) if i < NB else x for i, x in enumerate(per[yi])] if yi in per else None for yi in range(len(years))]

    gov_ids = sorted(govs, key=lambda c: (govs[c]["s"], govs[c]["r"] != govs[c]["s"], govs[c]["n"]))
    idx = {c: i for i, c in enumerate(gov_ids)}
    out = {
        "built": datetime.now().strftime("%Y-%m-%d"),
        "years": years,
        "fields": FIELDS,
        "govs": [[govs[c]["n"], govs[c]["r"]] for c in gov_ids],
        "gv": [pack(vals[c]) for c in gov_ids],
        "regions": {k: pack(per) for k, per in regions.items()},
        "counts": {k: [per.get(yi, 0) for yi in range(len(years))] for k, per in counts.items()},
        # 사업: [지자체 번호, 연도 번호, 이름, 예산현액(백만원, 소수 1자리), 지출액, 갈래]
        "items": [[idx[l], yi, n, round(c / 1e6, 1), round(e / 1e6, 1), {"biz": "b", "run": "r", "gen": "g"}[k]]
                  for l, yi, n, c, e, k in sorted(items, key=lambda x: (x[1], idx[x[0]], -x[3]))],
        "check": check(regions, counts, years),
        "source": {"service": "지방재정365 세부사업별 세출현황(QWGJK)",
                   "rows": {s["exe_ymd"]: [s["total"], len(s["rows"])] for s in snaps}},
    }
    text = json.dumps(out, ensure_ascii=False, separators=(",", ":"))
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// 고향사랑기금 (scripts/build_gohyang.py가 만든다. 손으로 고치지 않는다)\n")
        f.write(f"window.AGRI_GOHYANG = {text};\n")
    print(f"{OUT}: {len(text) / 1024:.0f}KB, 지자체 {len(gov_ids)}곳, 사업 {len(out['items']):,}행")
    for yi, y in enumerate(years):
        n = out["regions"][NATION][yi]
        print(f"  {y['ymd']}: 기금 회계 {counts[NATION][yi]}곳, 규모 {n[0] / 100:,.0f}억, 사업 {n[1] / 100:,.0f}억(지출 {n[2] / 100:,.0f}억), "
              f"운영 {n[3] / 100:,.0f}억, 적립 {n[5] / 100:,.0f}억, 넘김 {n[6] / 100:,.0f}억, 일반회계 운영 {n[7] / 100:,.0f}억(지출 {n[8] / 100:,.0f}억), 일반회계→기금 {n[9] / 100:,.0f}억")


if __name__ == "__main__":
    main()
