"""물류기기 공동이용 원자료(CSV)를 시군·시도·전국으로 집계해 data/logistics.js로 저장한다.

원자료는 저장소에 올리지 않는다('물류기기 공동이용/' 폴더, .gitignore). 집계 결과만 배포한다.
- 지역: 출하 주체(상차 업체) 소재지 기준. 생산지가 아니다.
- 기간: 해마다 1~11월 (최신 연도 자료가 11월까지라 같은 기간끼리 비교)
- 수량: 물류기기 개수. 기기마다 담는 양이 달라 종류별로 따로 센다.
  품목·판로·출하 주체 같은 구성 비율은 컨테이너(전체의 94%) 수량 기준이다.
실행: python scripts/build_logistics.py
"""
import glob
import json
import os
import re
from collections import Counter, defaultdict

import pandas as pd

from regions import ROOT, UNIT_KEYS, sido_code, unit_of

RAW = os.path.join(ROOT, "물류기기 공동이용")
MONTHS = list(range(1, 12))  # 1~11월
METRO_DEST = {"11", "23", "31"}  # 서울·인천·경기
CONTAINER = "컨테이너"
COLS = ["LOAD_ETPS_TY_NM", "LOAD_ETPS_CTNP_NM", "LOAD_ETPS_SGGU_NM", "LDCG_YMD", "UNLOAD_ETPS_TY_NM",
        "UNLOAD_ETPS_CTNP_NM", "LGTC_MCTL_SE_NM", "QYT", "AGRI_NM"]


def region_key(ctnp, sgg):
    """출하지 (시도명, 시군구명) → 시군 키. 시군에 못 맞추면 시도 코드."""
    s = sido_code(str(ctnp))
    if not s:
        return None
    if s == "29":
        return "29|세종시"  # 세종은 읍면 이름으로 들어 있다
    u = unit_of(s, str(sgg))
    return u[0] if u and u[0] in UNIT_KEYS else s


def aggregate(path, year):
    """한 해 파일 → 지역 키(시군 또는 시도)별 누적값"""
    acc = defaultdict(lambda: {"qty": Counter(), "n": 0, "mon": Counter(), "crop": Counter(),
                               "dest": Counter(), "dsido": Counter(), "ship": Counter()})
    keys = {}
    for ch in pd.read_csv(path, encoding="cp949", dtype=str, usecols=COLS, chunksize=400000):
        ch = ch[ch.LDCG_YMD.str[:4] == str(year)]
        ch = ch.assign(month=ch.LDCG_YMD.str[4:6].astype(int), qty=pd.to_numeric(ch.QYT, errors="coerce").fillna(0))
        ch = ch[ch.month.isin(MONTHS)]
        pairs = list(zip(ch.LOAD_ETPS_CTNP_NM, ch.LOAD_ETPS_SGGU_NM))
        for p in set(pairs):
            if p not in keys:
                keys[p] = region_key(*p)
        ch = ch.assign(key=[keys[p] for p in pairs])
        ch = ch[ch.key.notna()]
        ch = ch.assign(dsido=ch.UNLOAD_ETPS_CTNP_NM.fillna("").map(lambda n: sido_code(n) or "미상"))
        con = ch[ch.LGTC_MCTL_SE_NM == CONTAINER]
        for k, g in ch.groupby("key"):
            a = acc[k]
            a["n"] += len(g)
            a["qty"].update(g.groupby("LGTC_MCTL_SE_NM").qty.sum().to_dict())
        for k, g in con.groupby("key"):
            a = acc[k]
            a["mon"].update(g.groupby("month").qty.sum().to_dict())
            a["crop"].update(g.groupby("AGRI_NM").qty.sum().to_dict())
            a["dest"].update(g.groupby("UNLOAD_ETPS_TY_NM").qty.sum().to_dict())
            a["dsido"].update(g.groupby("dsido").qty.sum().to_dict())
            a["ship"].update(g.groupby("LOAD_ETPS_TY_NM").qty.sum().to_dict())
    unmatched = sorted({p for p, k in keys.items() if k and "|" not in k})
    return acc, unmatched


def roll_up(acc):
    """시군 → 시도 → 전국으로 합친다 (시군에 못 맞춘 행은 시도·전국에만 들어간다)."""
    out = defaultdict(lambda: {"qty": Counter(), "n": 0, "mon": Counter(), "crop": Counter(),
                               "dest": Counter(), "dsido": Counter(), "ship": Counter()})
    for k, a in acc.items():
        sido = k.split("|")[0]
        targets = [k, sido, "00"] if "|" in k else [sido, "00"]
        for t in targets:
            o = out[t]
            o["n"] += a["n"]
            for f in ("qty", "mon", "crop", "dest", "dsido", "ship"):
                o[f].update(a[f])
    return out


def share(counter, total):
    return {k: round(v / total * 100, 1) for k, v in counter.items()} if total else {}


def build():
    files = {}
    for path in glob.glob(os.path.join(RAW, "*.csv")):
        m = re.match(r"(\d{4})년", os.path.basename(path))
        if m:
            files[int(m.group(1))] = path
    years = sorted(files)  # 예: [2023, 2024, 2025] — 값 배열은 이 순서
    if len(years) < 2:
        raise SystemExit("두 해 이상의 파일이 필요합니다.")
    data = {}
    for y in years:
        acc, unmatched = aggregate(files[y], y)
        print(y, "지역", len(acc), "시군 미일치(시도로만 집계):", unmatched[:10])
        data[y] = roll_up(acc)

    cur_y = years[-1]
    nation_crop = data[cur_y]["00"]["crop"]
    nation_total = sum(nation_crop.values()) or 1
    v = {}
    for key in sorted(set().union(*[set(data[y]) for y in years])):
        if key not in data[cur_y]:
            continue
        per = [data[y].get(key) for y in years]  # 해마다 집계 (없으면 None)
        con = [a["qty"].get(CONTAINER, 0) if a else 0 for a in per]
        cur, ccon = per[-1], con[-1]
        sido = key.split("|")[0]

        def by_year(fn):
            return [fn(a, c) if a and c else None for a, c in zip(per, con)]

        crops = []
        for name, q in cur["crop"].most_common(8):
            lq = (q / ccon) / (nation_crop[name] / nation_total) if ccon and nation_crop[name] else None
            crops.append([name, [round(a["crop"].get(name, 0)) if a else None for a in per], round(lq, 2) if lq else None])
        # 특화 품목: 지역 컨테이너의 3% 이상인 품목 가운데 특화도(LQ)가 가장 높은 것 (전국은 없음)
        spec = None if key == "00" else max(((n, (q / ccon) / (nation_crop[n] / nation_total)) for n, q in cur["crop"].items()
                                              if ccon and q / ccon >= 0.03 and nation_crop[n]), key=lambda x: x[1], default=None)
        types = sorted(set().union(*[set(a["qty"]) for a in per if a]))
        v[key] = {
            "qty": {tp: [round(a["qty"].get(tp, 0)) if a else None for a in per] for tp in types},
            "n": [a["n"] if a else None for a in per],
            "mon": [[round(a["mon"].get(m, 0)) for m in MONTHS] if a else None for a in per],
            "crops": crops,
            "spec": [spec[0], round(spec[1], 1)] if spec else None,
            "dest": by_year(lambda a, c: share(a["dest"], c)),
            "metro": by_year(lambda a, c: round(sum(a["dsido"].get(s, 0) for s in METRO_DEST) / c * 100, 1)),
            "same": by_year(lambda a, c: None if key == "00" else round(a["dsido"].get(sido, 0) / c * 100, 1)),
            "dsido": [[s, round(q / ccon * 100, 1)] for s, q in cur["dsido"].most_common(3)] if ccon else [],
            "ship": by_year(lambda a, c: share(a["ship"], c)),
        }
    out = {
        "years": years,
        "months": MONTHS,
        "period": f"{cur_y}년 1~11월",
        "source": f"물류기기 공동이용 실적 {years[0]}~{cur_y}년 (출하 주체 소재지 기준, 해마다 1~11월)",
        "v": v,
    }
    path = os.path.join(ROOT, "data", "logistics.js")
    with open(path, "w", encoding="utf-8") as f:
        f.write("// 물류기기 공동이용 시군별 집계 (scripts/build_logistics.py) — 원자료는 배포하지 않는다\n")
        f.write("window.AGRI_LOGI = ")
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
        f.write(";\n")
    print("saved", path, os.path.getsize(path), "bytes,", len(v), "regions")
    missing = sorted(k for k in UNIT_KEYS if k not in v)
    print("자료 없는 시군:", len(missing), missing[:20])


if __name__ == "__main__":
    build()
