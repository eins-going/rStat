"""db/raw/nhcoop/(scripts/fetch_nhcoop.py) → 조합별 공시값 data/nhcoop.js (농업금융보험 탭).

조합 → 지역
- FISIS는 조합마다 시도('농협(충남)', 농협 지역본부 관할)를 정해 둔다. 축협·품목농협은 이 시도에 넣는다.
- 지역농협은 시군이 필요하다. FISIS에는 시군이 없어 농협중앙회 누리집 본점 주소로 정한다.
  이름이 같은 조합이 다른 시도에 있으므로 FISIS 시도 안의 주소에서만 찾는다. 본부 관할이 행정구역과 다른 곳
  (충남본부의 세종, 대구본부의 경산, 서울본부의 과천·광명·고양, 인천본부의 부천, 경북본부의 대구 군위)은 그 시도도 함께 본다.
  지역농협의 시도 합계는 주소 시군이 속한 시도로 간다(시군 합이 시도와 맞게).
- 같은 이름이 여럿이면(송악·대산 등) FISIS 코드 앞 10자리(농협 시군지부 묶음)에서 다수인 시군을 고른다.
  목록에 없는 코드(합병돼 이름이 바뀐 조합 등)도 그 묶음의 시군으로 둔다(묶음이 한 시군일 때만).
- 영업 여부는 그 반기에 임직원 자료(SQ001)가 있는지로 본다.

값
- 공시된 값을 그대로 싣는다. 합계·비율·증감은 만들지 않는다(화면도 계산하지 않는다). 금액만 원 → 억원으로 바꾼다.
- 지역농협은 시군에, 축협·품목농협(원예·인삼·낙농·양돈 등)은 시도에만 놓는다(사업 구역이 여러 시군에 걸친다).
- 당기순이익은 반기 누계(6월은 상반기, 12월은 1년), ROA는 12월에만 공시된다.

출력: data/nhcoop.js, db/clean/nhcoop/<기간>/match.json(코드별 짝짓기 결과)
실행: python scripts/build_nhcoop.py [--start 202312] [--end 202606]
"""
import argparse
import collections
import glob
import json
import os
import re
import time

from fetch_agrix_corp import region
from fetch_nhcoop import RAW, TABLES, default_window
from regions import SIDO_PREFIX, UNIT_KEYS

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "db", "clean", "nhcoop")
JS = os.path.join(ROOT, "data", "nhcoop.js")

# FISIS 이름 → 농협 누리집 이름 (이름만 바뀐 조합, 2026-10 웹 검색으로 확인)
ALIAS = {"중부농협": "남한산성농협", "예산능금농협": "예당사과원예농협", "천안배농협": "천안배원예농협"}
# FISIS 시도(농협 지역본부 관할) → 함께 볼 행정 시도
BONBU_EXTRA = {"34": {"29"}, "22": {"37"}, "11": {"31"}, "23": {"31"}, "37": {"22"}}
ITEM = re.compile(r"원예|인삼|사과|능금|감귤|채소|화훼|단감|참외|양돈|낙농|우유|양계|양봉|양토|치즈")
LIVESTOCK_GROUPS = {f"0010027{n}" for n in range(170, 179)}  # 전국 축협 코드 묶음
# (필드, 통계표, 계정, 억원으로 나눔) — 값 열은 a(금액·비율), a가 없는 표(손익)는 b
FIELDS = [
    ("members", "SQ001", "B", False),   # 조합원 (명)
    ("assets", "SQ003", "A", True),     # 자산총계
    ("deposits", "SQ004", "A1", True),  # 예수부채
    ("loans", "SQ021", "A", True),      # 총대출
    ("loanM", "SQ021", "A1", True),     # 조합원 대출
    ("loanA", "SQ021", "A2", True),     # 준조합원 대출
    ("loanN", "SQ021", "A3", True),     # 비조합원 대출
    ("policy", "SQ014", "A2", True),    # 정책자금대출금
    ("income", "SQ005", "A", True),     # 당기순이익 (반기 누계)
    ("npl", "SQ007", "C", False),       # 고정이하여신비율 (%)
    ("roa", "SQ008", "C", False),       # 총자산순이익률 (%, 12월)
    ("ldr", "SQ009", "C", False),       # 예대율 (%)
]
KIND_CODE = {"지역농협": "L", "축협": "X", "품목": "I"}


def norm(s):
    return re.sub(r"\s+|\(.*?\)", "", s).replace("축산농협", "축협").replace("농업협동조합", "농협")


def kind_of(c):
    if ITEM.search(c["finance_nm"]):
        return "품목"
    if c["finance_cd"][:10] in LIVESTOCK_GROUPS or norm(c["finance_nm"]).endswith("축협"):
        return "축협"
    return "지역농협"


def is_coop(row):
    n = row["name"]
    return not (n.endswith(("본부", "지부")) or "지원단" in n or "회원지원국" in n or "지점" in n)


def addr_region(addr):
    """본점 주소 → 지역 키 ('37|의성군', 광역시 구는 '○○시부', 세종은 '29|세종시')"""
    t = addr.split()
    if len(t) < 2:
        return None
    sgg = "세종시" if t[0].startswith("세종") else t[1]
    _, key, _ = region(t[0], sgg)
    return key


def path_sido(c):
    m = re.search(r"\((\S+?)\)", c["finance_path"])
    name = m.group(1) if m else ""
    if name == "광주":  # SIDO_PREFIX는 경기 광주시와 헷갈리지 않게 '광주광역'으로 찾는다
        return "24"
    return next((code for p, code in SIDO_PREFIX if name.startswith(p)), None)


def load(start, end):
    with open(os.path.join(RAW, "nh_list.json"), encoding="utf-8") as f:
        nh = json.load(f)
    with open(os.path.join(RAW, "fisis_companies.json"), encoding="utf-8") as f:
        companies = json.load(f)["list"]
    base = os.path.join(RAW, "fisis", f"{start}-{end}")
    stats = collections.defaultdict(dict)  # 코드 → 통계표 → 행 목록
    for t in TABLES:
        for p in glob.glob(os.path.join(base, t, "*.json")):
            with open(p, encoding="utf-8") as f:
                stats[os.path.basename(p)[:-5]][t] = json.load(f)["list"]
    return nh, companies, stats


def match(nh, companies, active):
    coops = [dict(r, key=addr_region(r["addr"])) for r in nh["rows"] if is_coop(r)]
    by_name = collections.defaultdict(list)
    for r in coops:
        by_name[norm(r["name"])].append(r)

    def candidates(c):
        ps = path_sido(c)
        ok = {ps} | BONBU_EXTRA.get(ps, set())
        inside = lambda rs: [r for r in rs if r["key"] and r["key"].split("|")[0] in ok]  # noqa: E731
        n = norm(ALIAS.get(c["finance_nm"], c["finance_nm"]))
        if inside(by_name.get(n, [])):
            return inside(by_name[n])
        # 누리집 이름 앞에 지역명이 더 붙은 경우 (고촌 → 김포고촌, 강서 → 서울강서)
        return inside([r for k, rs in by_name.items() if k.endswith(n) and len(k) - len(n) <= 4 for r in rs])

    res, groups = {}, collections.defaultdict(collections.Counter)
    pending = []
    for c in companies:
        if c["finance_cd"] not in active:
            continue
        cand = candidates(c)
        keys = {r["key"] for r in cand}
        if len(keys) == 1:
            res[c["finance_cd"]] = (cand[0], "이름")
            groups[c["finance_cd"][:10]][cand[0]["key"]] += 1
        else:
            pending.append((c, cand))
    for c, cand in pending:
        cd, grp = c["finance_cd"], c["finance_cd"][:10]
        major = groups[grp].most_common(1)[0][0] if groups[grp] and grp not in LIVESTOCK_GROUPS else None
        pick = [r for r in cand if r["key"] == major]
        how = "이름+코드 묶음"
        if len({r["key"] for r in pick}) == 1:
            res[cd] = (pick[0], how)
        elif not cand and major:
            total = sum(groups[grp].values())
            if groups[grp][major] / total >= 0.75:
                res[cd] = ({"name": None, "addr": None, "key": major}, "코드 묶음")
    return coops, res


def num(v):
    try:
        return float(str(v).replace(",", ""))
    except ValueError:
        return None


def main():
    ap = argparse.ArgumentParser()
    s0, e0 = default_window()
    ap.add_argument("--start", default=s0)
    ap.add_argument("--end", default=e0)
    a = ap.parse_args()
    nh, companies, stats = load(a.start, a.end)
    active = {cd for cd, t in stats.items() if t.get("SQ001")}
    coops, res = match(nh, companies, active)

    periods = sorted({row["base_month"] for t in stats.values() for row in t.get("SQ001", [])})
    with open(os.path.join(RAW, "geo.json"), encoding="utf-8") as f:
        geo = json.load(f)
    report, problems, out = [], [], []
    for c in companies:
        cd = c["finance_cd"]
        if cd not in active:
            continue
        kind = kind_of(c)
        hit, how = res.get(cd, (None, None))
        key = hit["key"] if hit else None
        if kind != "지역농협":
            key, how = path_sido(c) or (key and key.split("|")[0]), "FISIS 시도"
        report.append({"code": cd, "fisis": c["finance_nm"], "kind": kind, "nh": hit and hit["name"], "addr": hit and hit["addr"],
                       "region": key, "how": how})
        if not key or (kind == "지역농협" and key not in UNIT_KEYS):
            problems.append(f"{cd} {c['finance_nm']} ({kind}) → {key or '지역 못 정함'}")
            continue
        vals = []  # FIELDS 순서. 금액은 억원(정수, 작은 값인 당기순이익·정책자금은 소수 한 자리)
        for f, t, acc, money in FIELDS:
            arr = [None] * len(periods)
            for row in stats[cd].get(t, []):
                if row["account_cd"] == acc and row["base_month"] in periods:
                    v = num(row.get("a", row.get("b")))
                    if v is not None:
                        x = v / 1e8 if money else v
                        arr[periods.index(row["base_month"])] = (round(x, 1) if f in ("income", "policy") else round(x)) if money else (int(v) if f == "members" else v)
            vals.append(arr if any(x is not None for x in arr) else None)
        alive = {row["base_month"] for row in stats[cd]["SQ001"]}
        rec = {"c": cd, "n": c["finance_nm"], "k": KIND_CODE[kind], "r": key, "p": [int(p in alive) for p in periods], "v": vals}
        if hit and hit["name"] and norm(hit["name"]) != norm(c["finance_nm"]):
            rec["h"] = hit["name"]  # 누리집 이름 (이름이 바뀐 조합)
        xy = hit and hit["addr"] and geo.get(hit["addr"])
        if xy:
            rec["xy"] = xy
        out.append(rec)

    out_dir = os.path.join(OUT, f"{a.start}-{a.end}")
    os.makedirs(out_dir, exist_ok=True)
    used = {id(h) for h, _ in res.values()}
    nh_unmatched = [{"name": r["name"], "addr": r["addr"]} for r in coops if id(r) not in used]
    with open(os.path.join(out_dir, "match.json"), "w", encoding="utf-8") as f:
        json.dump({"built": time.strftime("%Y-%m-%d"), "codes": report, "problems": problems, "nh_unmatched": nh_unmatched},
                  f, ensure_ascii=False, indent=1)

    data = {"built": time.strftime("%Y-%m-%d"), "periods": periods, "nh_list": nh["fetched"],
            "fields": [f for f, *_ in FIELDS], "coops": out}
    with open(JS, "w", encoding="utf-8") as f:
        f.write("// 조합별 공시값 (금감원 FISIS · 농협중앙회 조합 목록, scripts/build_nhcoop.py). 금액 억원, 비율 %. k: L 지역농협·X 축협·I 품목농협\n")
        f.write("window.AGRI_NHCOOP = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n")
    kinds = collections.Counter(r["kind"] for r in report)
    hows = collections.Counter(r["how"] for r in report)
    print(f"자료가 있는 코드 {len(report)} {dict(kinds)} · 짝짓기 {dict(hows)}")
    print(f"지역 못 정함 {len(problems)}" + ("".join(f"\n  {p}" for p in problems)))
    print(f"누리집 조합 {len(coops)} 중 짝이 없는 곳 {len(nh_unmatched)}" + "".join(f"\n  {r['name']} | {r['addr']}" for r in nh_unmatched))
    print(f"좌표 없는 조합 {sum(1 for r in out if 'xy' not in r)}")
    print("→", JS, f"{os.path.getsize(JS) / 1e3:.0f}KB · 반기 {periods}")


if __name__ == "__main__":
    main()
