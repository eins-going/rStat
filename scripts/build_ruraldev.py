"""농촌개발 화면 자료: db/raw/ruraldev/ (fetch_ruraldev.py) → data/ruraldev.js (window.AGRI_RURALDEV)

예산 (지방재정365 세부사업, 백만원): 농식품부 농촌공간·지역개발 사업을 세부사업명으로 나눈다.
  중심지활성화   농촌중심지활성화·읍면소재지종합정비·소도읍
  기초생활거점   기초생활거점조성·권역단위 거점개발
  신활력플러스   농촌신활력플러스
  생활여건개조   취약지역 생활여건개조(농촌 새뜰마을)
  농촌공간정비   농촌공간정비·농촌재생
  공간계획·협약  농촌공간 재구조화·재생계획 수립, 이름에 사업 종류가 없는 농촌협약
  마을만들기·역량 마을만들기(전환사업)·시군역량강화·현장포럼·농촌다움복원
  유지관리·기타  일반농산어촌개발 준공지구 유지관리 등 종류가 안 적힌 것
  뺀 것: 어촌(해수부 어촌신활력·어촌뉴딜), 도시 새뜰마을·도시재생, 이름만 같은 다른 '마을만들기'(안전·건강·학습 등), 자치구 마을만들기
이중 계산: 도 본청 예산은 시군으로 내려가는 국비·도비 통로라 시도·전국은 시군 합계(시군 행이 없는 시도·유형만 본청) — build_jikbul.py와 같다.
사업 지구 (한국농어촌공사 농산어촌지역개발사업 API): 시군마다 [시작 연도, 유형, 지구명, 농어촌공사 유형 번호(krc.types), 준공예정일, 사업내용(100자), 경도, 위도]. 사업비 없음.
마을 (한국농어촌공사 농촌마을현황 API): 시군마다 [조사 마을, 인구가 적힌 마을, 인구, 65세 이상, 총가구, 빈집, 슬레이트], 마을 줄은 data/vill/{번호}.json.
"""
import gzip
import json
import os
import re
import sys
from collections import defaultdict
from datetime import date

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from build_jikbul import load_js, place, write_biz  # noqa: E402
from regions import ROOT, SIDOS, UNIT_KEYS, sido_code, unit_of  # noqa: E402

RAW = os.path.join(ROOT, "db", "raw", "ruraldev")
OUT = os.path.join(ROOT, "data", "ruraldev.js")
CATS = ["중심지활성화", "기초생활거점", "신활력플러스", "생활여건개조", "농촌공간정비", "공간계획·협약", "마을만들기·역량", "유지관리·기타"]
F = ["amt", "nat", "sido", "sigun", "ep"]
NOISE = r"안전|안심|건강|학습|평생|악취|탄소|소통|금연|치매|아동|여성|청소년|문화|교육|복지|에너지|자원순환|체육"




def cat_of(name, part=""):
    """세부사업명(·부문)으로 유형. None이면 농촌개발 사업이 아님."""
    n = re.sub(r"\s+", "", name)
    part = part or ""
    if part in ("해양수산ㆍ어촌", "해양") or re.search(r"(?<!농산)(?<!농)어촌|어항|항만|소상공인|마을기업|일자리", n):
        return None
    if "도시" in n and "농촌" not in n:
        return None
    if re.search(r"신활력", n):
        return "신활력플러스"
    if re.search(r"생활여건|새뜰|취약지역(생활)?개조|취약지역.{0,6}개조", n):
        return "생활여건개조"
    if re.search(r"중심지|소재지|소도읍|거점면", n):
        return "중심지활성화"
    if re.search(r"기초생활거점|생활거점|권역", n):
        return "기초생활거점"
    if re.search(r"공간정비|농촌재생|재생뉴딜", n):
        return "농촌공간정비"
    if re.search(r"재구조화|공간계획|재생계획|농촌협약", n):
        return "공간계획·협약"
    if re.search(r"마을만들기|역량강화|현장포럼|농촌다움|창의", n):
        if re.search(NOISE, n) or part not in ("농업ㆍ농촌", "지역및도시", "일반행정"):
            return None
        return "마을만들기·역량"
    if re.search(r"일반농산어촌|농산어촌개발", n):
        return "유지관리·기타"
    return None


def krc_type(t):
    """농어촌공사 사업유형(btypNm) → 같은 유형 체계"""
    t = re.sub(r"\s+", "", t or "")
    c = cat_of(t, "농업ㆍ농촌")
    if c:
        return c
    if re.search(r"연계협력", t):
        return "유지관리·기타"
    return "유지관리·기타"


# 농어촌공사 sggCd는 법정동 시군구 코드: 앞 두 자리 → 시도 이름 (강원 42→51, 전북 45→52, 전남 46→12 전남광주)
KRC_SIDO = {"11": "서울", "26": "부산", "27": "대구", "28": "인천", "29": "광주광역", "30": "대전", "31": "울산", "36": "세종", "41": "경기",
            "42": "강원", "51": "강원", "43": "충북", "44": "충남", "45": "전북", "52": "전북", "46": "전남", "12": "전남광주", "47": "경북", "48": "경남", "50": "제주"}


def krc_unit(sido_nm, sgg_nm):
    """농어촌공사 시도·시군구 이름 → 지역키"""
    name = (sgg_nm or "").strip()
    m = re.match(r"^(\S+시)\s+\S+구$", name)   # '청주시 흥덕구' → 청주시
    if m:
        name = m.group(1)
    sido_nm = (sido_nm or "").strip()
    cands = ["36", "24"] if sido_nm.startswith("전남광주") else [sido_code(sido_nm)]
    for s in cands:
        if not s:
            continue
        u = unit_of(s, name)
        if u and u[0] in UNIT_KEYS:
            return u[0]
    return None


def main():
    files = sorted(f for f in os.listdir(RAW) if re.match(r"\d{4}_\d{8}\.json\.gz$", f))
    periods = [{"y": int(f[:4]), "d": f[5:13]} for f in files]
    unit = defaultdict(lambda: [defaultdict(lambda: [0.0] * 5) for _ in files])
    prov = defaultdict(lambda: [defaultdict(lambda: [0.0] * 5) for _ in files])
    biz = defaultdict(lambda: [[] for _ in files])
    missed, dropped = defaultdict(float), defaultdict(float)
    for i, f in enumerate(files):
        with gzip.open(os.path.join(RAW, f), "rt", encoding="utf-8") as fh:
            rows = json.load(fh)
        for r in rows:
            c = cat_of(r["dbiz_nm"], r.get("part_nm"))
            v = [(r.get(k) or 0) / 1e6 for k in ("bdg_cash_amt", "bdg_ntep", "capep", "sggep", "ep_amt")]
            if c is None:
                dropped[r["dbiz_nm"]] += v[0]
                continue
            if not v[0] and not v[4]:
                continue
            pl = place(r)
            if not pl:
                missed[r["laf_hg_nm"]] += v[0]
                continue
            # 자치구의 마을만들기는 도시 공동체 사업이다
            if c == "마을만들기·역량" and pl[0] == "unit" and pl[1].endswith("시부"):
                dropped[r["dbiz_nm"]] += v[0]
                continue
            tgt = unit if pl[0] == "unit" else prov
            acc = tgt[pl[1]][i][c]
            for j in range(5):
                acc[j] += v[j]
            if pl[0] == "unit":
                biz[pl[1]][i].append([r["dbiz_nm"].strip(), CATS.index(c), *[round(x) for x in v]])
            else:
                biz[f"p{pl[1]}"][i].append([r["dbiz_nm"].strip(), CATS.index(c), *[round(x) for x in v]])
    if missed:
        print("지역을 못 찾은 지자체:", {k: round(v) for k, v in sorted(missed.items(), key=lambda x: -x[1])[:10]})

    regions = {}

    def pack(per):
        return [[[round(x) for x in d.get(c, [0] * 5)] for c in CATS] for d in per]

    for k in sorted(UNIT_KEYS):
        if k in unit:
            regions[k] = pack(unit[k])
    for s in SIDOS:
        per = []
        for i in range(len(files)):
            d = {}
            for c in CATS:
                us = [unit[k][i][c] for k in unit if k.startswith(f"{s}|") and c in unit[k][i]]
                tot = [sum(x[j] for x in us) for j in range(5)]
                if tot[0] or tot[4]:
                    d[c] = tot
                elif s in prov and c in prov[s][i]:
                    d[c] = prov[s][i][c]
            per.append(d)
        if any(per):
            regions[s] = pack(per)
        ks = [k for k in UNIT_KEYS if k.startswith(f"{s}|")]
        if len(ks) == 1 and ks[0] not in regions and s in regions:   # 세종: 시도 값을 그 시군에
            regions[ks[0]] = regions[s]
            biz[ks[0]] = biz.get(f"p{s}", biz[ks[0]])
    regions["00"] = [[[sum(regions[s][i][ci][j] for s in SIDOS if s in regions) for j in range(5)] for ci in range(len(CATS))] for i in range(len(files))]

    # 분모 (build_jikbul.py와 같다)
    D = load_js(os.path.join(ROOT, "data", "data.js"), "AGRI_DATA")
    den = {"households": {k: v[-1] for k, v in D["v"]["households"].items() if v and v[-1]},
           "agri": {}, "years": {"households": D["periods"]["farm"][-1]}}
    by = D["periods"]["budget"]
    for k, arr in D["v"]["budgetAgri"].items():
        den["agri"][k] = [arr[by.index(str(p["y"]))] if str(p["y"]) in by and arr[by.index(str(p["y"]))] is not None else None for p in periods]

    bz = write_biz("ruraldev", biz, regions, periods)   # 사업 줄은 기간마다 따로 파일(data/biz/ruraldev/)

    # ---- 농어촌공사: 사업 지구·마을 ----
    with gzip.open(os.path.join(RAW, "krc.json.gz"), "rt", encoding="utf-8") as fh:
        K = json.load(fh)
    from pyproj import Transformer
    to_ll = Transformer.from_crs("EPSG:5181", "EPSG:4326", always_xy=True)   # 농어촌공사 posX·posY = 중부원점(GRS80, 가산 50만)
    sites = defaultdict(list)
    ktypes = sorted({(r.get("btypNm") or "").strip() for r in K["dev"]})   # 농어촌공사 사업유형 이름은 번호로 싣는다
    kmiss = defaultdict(int)
    for r in K["dev"]:
        k = krc_unit(r.get("sidoNm") or KRC_SIDO.get(str(r.get("sggCd") or "")[:2]), r.get("sggNm"))
        if not k:
            kmiss[f"{r.get('sidoNm')} {r.get('sggNm')}"] += 1
            continue
        lon = lat = None
        try:
            x, y = float(r["posX"]), float(r["posY"])
            lo, la = to_ll.transform(x, y)
            if 124 < lo < 132 and 33 < la < 39:
                lon, lat = round(lo, 5), round(la, 5)
        except (TypeError, ValueError, KeyError):
            pass
        contents = re.sub(r"\s+", " ", (r.get("contents") or "").replace("○", "").replace("-", " ")).strip()
        sites[k].append([int(r["year"]) if str(r.get("year") or "").isdigit() else None, CATS.index(krc_type(r.get("btypNm"))),
                         (r.get("zoneName") or "").strip(), ktypes.index((r.get("btypNm") or "").strip()), int(r["cpplanDate"]) if str(r.get("cpplanDate") or "").isdigit() else None,
                         contents[:100], lon, lat])
    if kmiss:
        print("농어촌공사 지역을 못 찾음:", dict(sorted(kmiss.items(), key=lambda x: -x[1])[:10]))
    for k in sites:
        sites[k].sort(key=lambda s: (-(s[4] or 0), -(s[0] or 0)))
    vill = defaultdict(lambda: [0] * 7)
    vrows = defaultdict(list)   # 시군 → 마을 줄 (data/vill/{번호}.json, 시군을 고를 때 화면이 불러온다)
    YRS = [f"villHouseYear_{y}Cnt" for y in (5, 9, 10, 20, 30)]
    AGE = [f"vill{g}Age_{a}Cnt" for g in ("Male", "Female") for a in (0, 10, 20, 30, 40, 50, 60, 65)]
    for r in K["vill"]:
        k = krc_unit(r.get("sidoNm"), r.get("sggNm"))
        if not k:
            continue
        pop = sum(r.get(a) or 0 for a in AGE)
        v = vill[k]
        v[0] += 1
        if pop > 0:
            v[1] += 1
            v[2] += pop
            v[3] += (r.get("villMaleAge_65Cnt") or 0) + (r.get("villFemaleAge_65Cnt") or 0)
            v[4] += r.get("villHouseTotCnt") or 0
        v[5] += r.get("villHouseEmpty") or 0
        v[6] += r.get("villHouseSlate") or 0
        desc = re.sub(r"\s+", " ", r.get("villDescription") or "").strip()
        # [마을, 읍면, 인구, 65세 이상, 총가구, 1인가구, 빈집, 슬레이트, [남 0·15·20·30·40·50·60·65, 여 같은 순], [준공 5년 미만·5~9·10~19·20~29·30년 이상], 유래(400자)]
        vrows[k].append([(r.get("villNm") or "").strip(), (r.get("emdNm") or "").strip(), pop,
                         (r.get("villMaleAge_65Cnt") or 0) + (r.get("villFemaleAge_65Cnt") or 0),
                         r.get("villHouseTotCnt") or 0, r.get("villHouseOneCnt") or 0, r.get("villHouseEmpty") or 0, r.get("villHouseSlate") or 0,
                         [r.get(a) or 0 for a in AGE], [r.get(y) or 0 for y in YRS], desc[:400] + ("…" if len(desc) > 400 else "")])
    # 시군 마을 파일: 번호는 지역키 정렬 순. 지난 파일은 지우고 새로 쓴다
    vdir = os.path.join(ROOT, "data", "vill")
    os.makedirs(vdir, exist_ok=True)
    vids = {k: i for i, k in enumerate(sorted(vrows))}
    for f in os.listdir(vdir):
        if f.endswith(".json"):
            os.remove(os.path.join(vdir, f))
    for k, rows in vrows.items():
        rows.sort(key=lambda x: (x[1], x[0]))
        with open(os.path.join(vdir, f"{vids[k]}.json"), "w", encoding="utf-8") as fh:
            json.dump({"key": k, "rows": rows}, fh, ensure_ascii=False, separators=(",", ":"))

    out = {"built": date.today().isoformat(), "periods": periods, "cats": CATS, "fields": F, "regions": regions, "biz": bz, "den": den,
           "krc": {"got": K["got"], "types": ktypes, "sites": sites, "vill": vill, "villIds": vids},
           "source": "지방재정365 세부사업별 세출현황(QWGJK) · 농촌개발 세부사업 · 시군 예산현액 합계",
           "krcSource": "한국농어촌공사 농산어촌지역개발사업·농촌마을현황 OpenAPI"}
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// 농촌개발 예산·사업 지구 (지방재정365 세부사업 · 한국농어촌공사 OpenAPI, scripts/fetch_ruraldev.py → scripts/build_ruraldev.py). 금액 백만원\n")
        f.write("window.AGRI_RURALDEV = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    nat = regions["00"]
    for i, p in enumerate(periods):
        tot = sum(nat[i][c][0] for c in range(len(CATS)))
        natf = sum(nat[i][c][1] for c in range(len(CATS)))
        print(f"{p['y']} {p['d']}: 예산 {tot / 100:,.0f}억 (국비 {natf / 100:,.0f}억) · "
              + " ".join(f"{c} {nat[i][j][0] / 100:,.0f}" for j, c in enumerate(CATS))
              + f" · 시군 {sum(1 for k in regions if '|' in k and sum(x[0] for x in regions[k][i]))}곳")
    ns = sum(len(v) for v in sites.values())
    print(f"사업 지구 {ns:,} (좌표 {sum(1 for v in sites.values() for s in v if s[6]):,}) · 시군 {len(sites)} · 마을 시군 {len(vill)}")
    top = sorted(dropped.items(), key=lambda x: -x[1])[:25]
    print("뺀 사업(예산 큰 순):", [(n, round(v / 100)) for n, v in top])
    print(f"→ {OUT} {os.path.getsize(OUT) / 1024:.0f}KB")


if __name__ == "__main__":
    main()
