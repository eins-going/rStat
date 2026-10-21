"""db/raw/apfs/(scripts/fetch_apfs.py) → 농작물재해보험 실적 data/apfs.js (농업금융보험 탭).

- 공시값을 그대로 싣는다(합계·비율을 만들지 않는다). 금액은 백만원, 면적은 ha, 가입률은 %(전국·시도만 공시).
- 지역 키는 통계 페이지와 같다. 광역시의 구는 지도에서 '○○시부' 한 칸이라 구 값을 더해야 채울 수 있다 →
  더하지 않고 구별 목록(gu)으로 따로 둔다. 광역시의 군(달성·기장·울주·강화·옹진·군위)과 광주 광산구는 지도 칸 그대로.
- 기간: 지난 연도는 12월(1년), 올해는 받은 달까지의 누계. 최근 4개 연도만 싣는다.

실행: python scripts/build_apfs.py
"""
import glob
import json
import os
import time

from regions import METRO, UNIT_KEYS, sido_code, unit_of

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "db", "raw", "apfs")
JS = os.path.join(ROOT, "data", "apfs.js")
COLS = ["cnt", "amt", "area", "rate", "prem", "paid"]


def pack(rows, cats):
    """표 → {t: 총합계 6값, c: [[분류 번호, 6값], …]}"""
    if not rows:
        return None
    out = {"t": None, "c": []}
    for big, mid, v in rows:
        vals = [v.get(c) for c in COLS]
        vals = [None if x is None else (round(x, 1) if c in ("area", "rate") else int(x)) for c, x in zip(COLS, vals)]
        if big == "총합계":
            out["t"] = vals
        else:
            name = f"{big}|{mid}"
            if name not in cats:
                cats.append(name)
            out["c"].append([cats.index(name), *vals])
    return out


def main():
    # 연도마다 가장 늦은 달 파일 하나(지난 연도는 12월 확정, 올해는 최신 누계), 최근 4개 연도(3개년 확정 + 올해)
    latest = {}
    for p in sorted(glob.glob(os.path.join(RAW, "[0-9]" * 6 + ".json"))):
        latest[os.path.basename(p)[:4]] = p
    files = [latest[y] for y in sorted(latest)[-4:]]
    cats, periods = [], []
    regions, gu, problems = {}, {}, []
    for i, path in enumerate(files):
        with open(path, encoding="utf-8") as f:
            raw = json.load(f)
        periods.append({"y": raw["year"], "m": raw["month"], "fetched": raw["fetched"]})
        put = lambda d, k, v: d.setdefault(k, [None] * len(files)).__setitem__(i, v)  # noqa: E731
        put(regions, "00", pack(raw["nation"], cats))
        for sd, rows in raw["sido"].items():
            s = sido_code(sd)
            if not s:
                problems.append(f"{raw['year']} 시도 {sd}")
                continue
            put(regions, s, pack(rows, cats))
            for g, grows in raw["sgg"].get(sd, {}).items():
                if s == "29":
                    put(regions, "29|세종시", pack(grows, cats))
                    continue
                if s in METRO and g.endswith("구") and not (s == "24" and g == "광산구"):
                    gu.setdefault(s, {}).setdefault(g, [None] * len(files))[i] = pack(grows, cats)
                    continue
                u = unit_of(s, g)
                if u and u[0] in UNIT_KEYS:
                    put(regions, u[0], pack(grows, cats))
                else:
                    problems.append(f"{raw['year']} {sd} {g}")
    data = {"built": time.strftime("%Y-%m-%d"), "periods": periods, "cols": COLS, "cats": cats, "regions": regions, "gu": gu}
    with open(JS, "w", encoding="utf-8") as f:
        f.write("// 농작물재해보험 실적 공시값 (농업정책보험금융원, scripts/fetch_apfs.py → scripts/build_apfs.py). 금액 백만원, 면적 ha, 가입률 %\n")
        f.write("window.AGRI_APFS = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n")
    units = [k for k in regions if "|" in k]
    print(f"기간 {[(p['y'], p['m']) for p in periods]} · 시군 {len(units)} / {len(UNIT_KEYS)} · 광역시 구 {sum(len(v) for v in gu.values())}")
    print(f"지역 못 정함 {len(problems)}" + "".join(f"\n  {p}" for p in problems))
    print("→", JS, f"{os.path.getsize(JS) / 1e3:.0f}KB")


if __name__ == "__main__":
    main()
