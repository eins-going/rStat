"""db/raw/livestock/<연도>/(scripts/fetch_livestock.py) → 축산 환경 화면용 data/livestock.js (window.AGRI_LIVESTOCK).

모든 값은 리 × 축종 자료(ri.json)를 더해 만든다. 해마다 리 합계가 시군구 통계(sgg.json)의 사육두수·농가수·분뇨 발생량과
맞는지 먼저 대조하고, 어긋나면 멈춘다. 지역 키는 통계 페이지와 같다('31|수원시', 일반시의 구는 시로, 청원군은 청주시로).

- 분뇨 발생량은 수질오염원 산정용 값(톤/일)이다. 폐수 + 고형물. 닭·오리 등 가금은 거의 0으로 잡혀 있다.
- 처리 방법은 줄마다 적힌 방법 이름으로 그 줄의 분뇨를 나눈다(축종별로도 싣는다)(폐수는 폐수 처리 방법, 고형물은 고형물 처리 방법,
  방법이 여럿이면 똑같이). 처리량 칸(공공·위탁 처리량)은 해에 따라 발생량을 넘어(2016년 124%) 쓰지 않는다.
- 방법 이름은 2015·2018년에 바뀌었다. 해마다 견주는 것은 '농가 자체 처리' 비중만, 자세한 구성은 마지막 해만 싣는다.
- 농가수는 축종별 농가를 더한 값이다(두 축종을 기르면 두 번 센다). 시군구 통계도 같은 셈이다.
- 법적규제 '3'(2016년 일부 줄)은 시군구 통계의 셋째 칸(신고미만)으로 본다.

실행: python scripts/build_livestock.py
"""
import collections
import datetime as dt
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))
import regions  # noqa: E402

KINDS = ["돼지", "한우", "젖소", "닭", "오리", "그 밖"]
KIND_OF = {"돼지": "돼지", "한우(소)": "한우", "유우(젖소)": "젖소", "닭": "닭", "오리": "오리"}
COURTS = ["허가", "신고", "신고미만"]
COURT_OF = {"허가": "허가", "신고": "신고", "신고미만": "신고미만", "3": "신고미만"}
PROCS = ["퇴비화", "액비화", "정화", "재활용 위탁", "공공처리", "그 밖"]
PROC_OF = {"개별_퇴비화": "퇴비화", "개별_액비화": "액비화", "개별_정화": "정화", "개별_정화처리": "정화",
           "위탁_재활용신고자": "재활용 위탁", "위탁_공공처리": "공공처리", "공공처리시설": "공공처리"}
SELF = {"개별_퇴비화", "개별_액비화", "개별_정화", "개별_정화처리", "개별_미처리", "미처리"}  # 농가 자체 처리
TOP_VILLAGES = 10


def unit_key(sido_name, name):
    sd = regions.sido_code(sido_name or "")
    name = name or ""
    if sd == "29":
        name = "세종시"
    m = re.match(r"^(.+?시)(.+구)$", name)
    if m and sd not in regions.METRO:
        name = m.group(1)  # '천안시동남구' → 천안시
    name = {"청원군": "청주시"}.get(name, name)  # 2014년 청주시에 합쳐짐
    u = regions.unit_of(sd, name) if sd else None
    return u[0] if u and u[0] in regions.UNIT_KEYS else None


def num(v):
    return v or 0


def check_totals(y, ri, sgg):
    f = lambda rows, k: sum(num(r.get(k)) for r in rows)  # noqa: E731
    for k, tol in (("BREECNT", 0), ("FARMFAMYCNT", 0), ("PERSONGENERWASTE", 1), ("PERSONGENERSOOMATT", 1)):
        a, b = f(ri, k), f(sgg, k)
        if abs(a - b) > tol:
            sys.exit(f"{y}년 리 합계와 시군구 통계가 다르다: {k} {a:,.2f} ≠ {b:,.2f}")


def land_by_year():
    """data/data.js 경지면적(ha) {연도: {지역 키: ha}}"""
    t = open(os.path.join(ROOT, "data", "data.js"), encoding="utf-8").read()
    d = json.loads(t[t.index("{"):t.rstrip().rstrip(";").rindex("}") + 1])
    years = [str(p)[:4] for p in d["periods"]["land"]]
    out = collections.defaultdict(dict)
    for k, arr in d["v"]["land"].items():
        for y, v in zip(years, arr):
            if v is not None:
                out[int(y)][k] = v
    return out


def main():
    years = sorted(int(os.path.basename(p)) for p in glob.glob(os.path.join(ROOT, "db", "raw", "livestock", "*")) if os.path.basename(p).isdigit())
    if not years:
        sys.exit("db/raw/livestock/에 받은 자료가 없다 — scripts/fetch_livestock.py부터")
    last = years[-1]
    n = len(years)
    zeros = lambda: [0.0] * n  # noqa: E731
    series = collections.defaultdict(lambda: {"farm": zeros(), "man": zeros(), "self": zeros(), "h": {k: zeros() for k in KINDS[:5]}})
    detail = collections.defaultdict(lambda: {"k": [[0, 0, 0.0] for _ in KINDS], "c": [[0, 0, 0.0] for _ in COURTS], "p": [0.0] * len(PROCS),
                                                        "pk": [[0.0] * len(PROCS) for _ in KINDS],
                                                        "ck": [[[0, 0, 0.0] for _ in COURTS] for _ in KINDS]})
    villages = collections.defaultdict(lambda: {"man": 0.0, "farm": 0, "heads": 0, "kind": collections.Counter()})
    unmapped = collections.Counter()

    for i, y in enumerate(years):
        d = os.path.join(ROOT, "db", "raw", "livestock", str(y))
        ri = json.load(open(os.path.join(d, "ri.json"), encoding="utf-8"))
        check_totals(y, ri, json.load(open(os.path.join(d, "sgg.json"), encoding="utf-8")))
        for r in ri:
            k = unit_key(r["CITYNM"], r["CITICOUNGUNM"])
            if not k:
                unmapped[(r["CITYNM"], r["CITICOUNGUNM"])] += 1
                continue
            kind = KIND_OF.get(r["LSTOCKKINDNM"], "그 밖")
            heads, farms = num(r["BREECNT"]), num(r["FARMFAMYCNT"])
            parts = [(num(r["PERSONGENERWASTE"]), r["PERSONPROCWASTE"]), (num(r["PERSONGENERSOOMATT"]), r["PERSONPROCSOOMATT"])]
            man = sum(a for a, _ in parts)
            s = series[k]
            s["farm"][i] += farms
            s["man"][i] += man
            if kind in s["h"]:
                s["h"][kind][i] += heads
            for amt, txt in parts:
                ms = (txt or "").split()
                if ms:
                    s["self"][i] += amt * sum(m in SELF for m in ms) / len(ms)
            if y != last:
                continue
            dd = detail[k]
            ci = COURTS.index(COURT_OF.get(r["COURTRULEDIV"], "신고미만"))
            for row, j in ((dd["k"], KINDS.index(kind)), (dd["c"], ci), (dd["ck"][KINDS.index(kind)], ci)):
                row[j][0] += farms
                row[j][1] += heads
                row[j][2] += man
            for amt, txt in parts:
                ms = (txt or "").split()
                for m in ms:
                    j = PROCS.index(PROC_OF.get(m, "그 밖"))
                    dd["p"][j] += amt / len(ms)
                    dd["pk"][KINDS.index(kind)][j] += amt / len(ms)
            v = villages[(k, r["ADIVICD"])]
            v["emd"], v["ri"] = r["ADIVIDOUNGNM"] or "", r["ADIVININM"] or ""
            v["man"] += man
            v["farm"] += farms
            v["heads"] += heads
            v["kind"][kind] += man
    if unmapped:
        sys.exit(f"지역 키를 못 정한 시군구: {dict(unmapped)}")
    lost = sorted(k for k in regions.UNIT_KEYS if k not in series and not k.endswith("시부"))
    print(f"축산 자료가 없는 시군 {len(lost)}곳 (도시): {', '.join(lost[:8])}{' …' if len(lost) > 8 else ''}")

    # 가축분뇨 공공처리시설: 시설 코드 7번째 글자 S (마지막 해)
    fac = collections.defaultdict(list)
    for f in json.load(open(os.path.join(ROOT, "db", "raw", "livestock", str(last), "fac.json"), encoding="utf-8")):
        if f["FACILCD"][6:7] != "S":
            continue
        k = unit_key(f["CITYNM"], f["CITICOUNGUNM"])
        if not k:
            sys.exit(f"가축분뇨 공공처리시설의 지역을 못 정했다: {f['FACILNM']} ({f['CITYNM']} {f['CITICOUNGUNM']})")
        fac[k].append([f["FACILNM"].strip(), num(f["FACILSUM"]), k])

    # 시군 → 시도·전국
    keys = sorted(series)
    def add_to(dst, src):
        for f in ("farm", "man", "self"):
            dst[f] = [a + b for a, b in zip(dst[f], src[f])]
        for kd in dst["h"]:
            dst["h"][kd] = [a + b for a, b in zip(dst["h"][kd], src["h"][kd])]
    for k in keys:
        for up in (k.split("|")[0], "00"):
            add_to(series[up], series[k])
            dd, sd = detail[up], detail[k]
            for f in ("k", "c"):
                dd[f] = [[a + b for a, b in zip(x, z)] for x, z in zip(dd[f], sd[f])]
            dd["p"] = [a + b for a, b in zip(dd["p"], sd["p"])]
            dd["pk"] = [[a + b for a, b in zip(x, z)] for x, z in zip(dd["pk"], sd["pk"])]
            dd["ck"] = [[[a + b for a, b in zip(x, z)] for x, z in zip(xs, zs)] for xs, zs in zip(dd["ck"], sd["ck"])]
            fac[up] += fac.get(k, [])
    vgroups = collections.defaultdict(list)
    for (k, code), v in villages.items():
        for up in (k, k.split("|")[0], "00"):
            vgroups[up].append((k, v))

    land = land_by_year()
    ly = last if last in land else max(land)
    r1 = lambda x: round(x, 1) if abs(x) < 100 else round(x)  # noqa: E731
    out = {}
    for k in series:
        s, dd = series[k], detail[k]
        vs = sorted(vgroups.get(k, []), key=lambda t: -t[1]["man"])
        out[k] = {
            "t": {"farm": [round(x) for x in s["farm"]], "man": [r1(x) for x in s["man"]], "self": [r1(x) for x in s["self"]],
                  "h": {kd: [round(x) for x in v] for kd, v in s["h"].items()}},
            "k": [[round(a), round(b), r1(c)] for a, b, c in dd["k"]],
            "c": [[round(a), round(b), r1(c)] for a, b, c in dd["c"]],
            "p": [r1(x) for x in dd["p"]],
            "pk": [[r1(x) for x in row] for row in dd["pk"]],  # 축종(KINDS) × 처리 방법(PROCS)
            "ck": [[[round(a), round(b), r1(c)] for a, b, c in row] for row in dd["ck"]],  # 축종 × 법적규제 × [농가, 마릿수, 분뇨]
            "nv": len(vs),
            "v": [[u, v["emd"], v["ri"], r1(v["man"]), KINDS.index(v["kind"].most_common(1)[0][0]), round(v["farm"]), round(v["heads"])]
                  for u, v in vs[:TOP_VILLAGES]],
            "fac": sorted(fac.get(k, []), key=lambda f: -f[1]),
            "land": land[ly].get(k),
        }

    data = {"built": dt.date.today().isoformat(), "years": years, "landYear": ly, "kinds": KINDS, "courts": COURTS, "procs": PROCS, "r": out}
    path = os.path.join(ROOT, "data", "livestock.js")
    with open(path, "w", encoding="utf-8") as f:
        f.write("// 축산 환경: 국립환경과학원 전국오염원조사 축산계·환경기초시설 (scripts/build_livestock.py)\n")
        f.write("window.AGRI_LIVESTOCK = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n")
    nat = out["00"]
    print(f"{years[0]}~{last}년 · 시군 {sum('|' in k for k in out)} · 전국 분뇨 {nat['t']['man'][-1]:,.0f}톤/일 · 마을 {nat['nv']:,}곳"
          f" · 가축분뇨 공공처리시설 {len(nat['fac'])}곳 · {os.path.getsize(path) / 1024:.0f}KB")


if __name__ == "__main__":
    main()
