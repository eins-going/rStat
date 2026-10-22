"""db/raw/soil/<판>/(scripts/fetch_soil.py) → 토양 화면용 data/soil.js (window.AGRI_SOIL).

지역 키는 통계 페이지와 같다('31|수원시', 광역시의 구는 '○○시부'). 시군구 코드의 이름(VWorld)으로 정하고,
일반시의 구는 시로 더한다. 전남광주통합특별시(12)의 구 다섯은 광주(24), 나머지는 전남(36)으로 나눈다.
시도('38')·전국('00')은 시군 값을 더한다. 값은 모두 면적(ha)이고 '-'는 0으로 읽는다.

- chem: 농경지화학성 구간별 면적. 항목마다 [논, 밭, 시설, 과수] × 6구간 (유효규산은 논만).
  구간 경계는 API 명세 그대로 적는다(명세의 유효인산 논 '251~250'은 '201~250'의 오기). 판정 기준은 화면(soil.js)이 갖는다.
- grade: 토양도 논·밭 적성등급 [1급지 … 5급지, 기타], obst: 저해요인 {이름: 면적}.
- farm: 팜맵 논·밭 면적(data/farmmap.js) — 지금 경지가 얼마인지 옆에 적기만 한다.

실행: python scripts/build_soil.py [--tag 2026]
"""
import argparse
import datetime as dt
import glob
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))
import regions  # noqa: E402

LANDS = [("Rfld", "논"), ("Pfld", "밭"), ("Fachs", "시설"), ("Fruit", "과수")]
# 항목: (API 기능, 응답 머리, 이름, 단위, {경지: 구간 이름 6개})
UPLAND_PH = ["4.5 이하", "4.6~5.0", "5.1~5.5", "5.6~6.0", "6.1~6.5", "6.6 이상"]
OM = ["10 이하", "11~20", "21~30", "31~40", "41~50", "51 이상"]
CHEM = [
    ("ph", "getFarmExamPhInfo", "acid", "pH", "(1:5)", {
        "논": UPLAND_PH, "밭": UPLAND_PH, "과수": UPLAND_PH,
        "시설": ["5.0 이하", "5.1~5.5", "5.6~6.0", "6.1~6.5", "6.6~7.0", "7.1 이상"]}),
    ("om", "getFarmExamOmInfo", "om", "유기물", "g/kg", {"논": OM, "밭": OM, "시설": OM, "과수": OM}),
    ("ap", "getFarmExamApInfo", "vldpha", "유효인산", "mg/kg", {
        "논": ["50 이하", "51~100", "101~150", "151~200", "201~250", "251 이상"],
        "밭": ["200 이하", "201~300", "301~400", "401~500", "501~600", "601 이상"],
        "과수": ["200 이하", "201~300", "301~400", "401~500", "501~600", "601 이상"],
        "시설": ["400 이하", "401~800", "801~1200", "1201~1600", "1601~2000", "2001 이상"]}),
    ("k", "getFarmExamKalInfo", "posifertk", "칼륨", "cmolc/kg", {
        "논": ["0.10 이하", "0.11~0.20", "0.21~0.30", "0.31~0.40", "0.41~0.50", "0.51 이상"],
        "밭": ["0.30 이하", "0.31~0.40", "0.41~0.50", "0.51~0.60", "0.61~0.70", "0.71 이상"],
        "과수": ["0.30 이하", "0.31~0.40", "0.41~0.50", "0.51~0.60", "0.61~0.70", "0.71 이상"],
        "시설": ["0.50 이하", "0.51~1.00", "1.01~1.50", "1.51~2.00", "2.01~2.50", "2.51 이상"]}),
    ("ca", "getFarmExamCalInfo", "posifertca", "칼슘", "cmolc/kg", {
        "논": ["2.0 이하", "2.1~3.0", "3.1~4.0", "4.1~5.0", "5.1~6.0", "6.1 이상"],
        "밭": ["3.0 이하", "3.1~4.0", "4.1~5.0", "5.1~6.0", "6.1~7.0", "7.1 이상"],
        "과수": ["3.0 이하", "3.1~4.0", "4.1~5.0", "5.1~6.0", "6.1~7.0", "7.1 이상"],
        "시설": ["4.0 이하", "4.1~5.5", "5.6~7.0", "7.1~8.5", "8.6~10.0", "10.1 이상"]}),
    ("mg", "getFarmExamMgInfo", "posifertmg", "마그네슘", "cmolc/kg", {
        land: ["0.5 이하", "0.6~1.0", "1.1~1.5", "1.6~2.0", "2.1~2.5", "2.6 이상"] for land in ("논", "밭", "시설", "과수")}),
    ("si", "getFarmExamSaInfo", "vldsia", "유효규산", "mg/kg", {
        "논": ["50 이하", "51~100", "101~150", "151~200", "201~250", "251 이상"]}),
]
GRADE = [("pg", "getSoilPaddyGradSpecificInfo", "paddy"), ("fg", "getSoilFieldGradSpecificInfo", "field")]
# 저해요인: 응답 이름 → 화면 이름 ('제외'=5급지, '없음'=1급지라 빼고, 2~4급지의 이유만 남긴다)
OBST_NAMES = {"slope": "경사", "low_Moist": "저습", "sand": "사질", "stone_Power": "석력", "salt": "염해", "spaicd": "특이산성",
              "unripe": "미숙", "rock": "암반", "volcano": "화산회", "emphs": "중점", "light_Rock": "경반", "crush_Stone": "분석"}
OBST = [("po", "getSoilPaddyObstrcFctrSpecificInfo"), ("fo", "getSoilFieldObstrcFctrSpecificInfo")]
SIDO = {"서울특별시": "11", "부산광역시": "21", "대구광역시": "22", "인천광역시": "23", "대전광역시": "25", "울산광역시": "26",
        "세종특별자치시": "29", "경기도": "31", "강원특별자치도": "32", "충청북도": "33", "충청남도": "34", "전북특별자치도": "35",
        "경상북도": "37", "경상남도": "38", "제주특별자치도": "39"}
GWANGJU_GU = {"동구", "서구", "남구", "북구", "광산구"}


def key_of(title):
    """'경상남도 창원시 의창구' → '38|창원시', '전남광주통합특별시 광산구' → 광주 키"""
    p = title.split()
    rest = p[1:] or p
    s = ("24" if rest[0] in GWANGJU_GU else "36") if p[0] == "전남광주통합특별시" else SIDO[p[0]]
    name = "세종시" if s == "29" else rest[-1] if s in regions.METRO else rest[0]
    k = regions.unit_of(s, name)
    return k[0] if k else None


def areas(path):
    """XML → {응답 이름: 면적}. 자료 없음(301)이면 빈 사전"""
    with open(path, encoding="utf-8") as f:
        t = f.read()
    return {k: (0.0 if v.strip() in ("", "-") else float(v)) for k, v in re.findall(r"<(\w+_Area)>([^<]*)<", t)}


def add(a, b):
    if isinstance(a, dict):
        for k, v in b.items():
            a[k] = add(a.get(k), v) if k in a else (json.loads(json.dumps(v)))
        return a
    if isinstance(a, list):
        return [x + y for x, y in zip(a, b)]
    return a + b


def unit_record(raw, code):
    r = {"c": {}, "o": {}}
    for item, op, head, _, _, bins in CHEM:
        d = areas(os.path.join(raw, "chem", op, f"{code}.xml"))
        r["c"][item] = {land: [d.get(f"{head}_{api}{i}_Area", 0.0) for i in range(1, 7)] for api, land in LANDS if land in bins}
    for k, op, head in GRADE:
        d = areas(os.path.join(raw, "charac", op, f"{code}.xml"))
        r[k] = [d.get(f"{head}_Grade{i}_Area", 0.0) for i in range(1, 6)] + [d.get("etc_Area", 0.0)]
    for k, op in OBST:
        d = areas(os.path.join(raw, "charac", op, f"{code}.xml"))
        r["o"][k] = {name: d.get(f"{api}_Area", 0.0) for api, name in OBST_NAMES.items() if f"{api}_Area" in d}
    return r


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tag", default=None, help="판 (빼면 가장 최근 판)")
    a = ap.parse_args()
    tags = sorted(os.path.basename(p) for p in glob.glob(os.path.join(ROOT, "db", "raw", "soil", "*")) if os.path.isdir(p))
    if not tags:
        sys.exit("db/raw/soil/에 받은 자료가 없다 — scripts/fetch_soil.py부터")
    tag = a.tag or tags[-1]
    raw = os.path.join(ROOT, "db", "raw", "soil", tag)
    sgg = json.load(open(os.path.join(raw, "sgg.json"), encoding="utf-8"))

    units, unmapped, missing = {}, [], []
    for s in sgg:
        k = key_of(s["t"])
        if not k or k not in regions.UNIT_KEYS:
            unmapped.append(s["t"])
            continue
        code = s["id"] + "00000"
        need = [os.path.join(raw, g, op, f"{code}.xml") for g, ops in (("chem", [c[1] for c in CHEM]), ("charac", [g[1] for g in GRADE] + [o[1] for o in OBST])) for op in ops]
        if not all(os.path.exists(p) for p in need):
            missing.append(s["t"])
            continue
        rec = unit_record(raw, code)
        units[k] = add(units[k], rec) if k in units else rec
    if unmapped:
        sys.exit(f"지역 키를 못 정한 시군구: {unmapped}")
    if missing:
        sys.exit(f"아직 받지 않은 시군구 {len(missing)}곳 (fetch_soil.py를 다시 돌린다): {missing[:5]}")
    lost = sorted(regions.UNIT_KEYS - set(units))
    if lost:
        sys.exit(f"자료가 없는 시군: {lost}")

    out = dict(units)
    for k, v in units.items():
        s = k.split("|")[0]
        out[s] = add(out[s], v) if s in out else json.loads(json.dumps(v))
        out["00"] = add(out["00"], v) if "00" in out else json.loads(json.dumps(v))

    # 팜맵 논·밭 면적 (같은 지역 키)
    t = open(os.path.join(ROOT, "data", "farmmap.js"), encoding="utf-8").read()
    fm = json.loads(t[t.index("{"):t.rindex("}") + 1])
    for k, v in out.items():
        reg = fm["regions"].get(k, {})
        v["f"] = [reg.get("논", {}).get("ha"), reg.get("밭", {}).get("ha")]

    def rnd(x):
        if isinstance(x, dict):
            return {k: rnd(v) for k, v in x.items()}
        if isinstance(x, list):
            return [rnd(v) for v in x]
        return round(x) if isinstance(x, float) and x == x and abs(x) >= 1 else (round(x, 1) if isinstance(x, float) else x)

    data = {
        "built": dt.date.today().isoformat(), "tag": tag, "farmYear": fm.get("year"),
        "chem": [{"k": item, "name": name, "unit": unit, "bins": bins} for item, _, _, name, unit, bins in CHEM],
        "obst": list(OBST_NAMES.values()),
        "r": rnd(out),
    }
    path = os.path.join(ROOT, "data", "soil.js")
    with open(path, "w", encoding="utf-8") as f:
        f.write("// 농경지 토양: 농촌진흥청 토양도 기반 토양특성 통계·농경지화학성 통계 (scripts/build_soil.py)\n")
        f.write("window.AGRI_SOIL = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n")
    nat = out["00"]
    print(f"시군 {len(units)} · 판 {tag} · 전국 논 1·2급지 {nat['pg'][0] + nat['pg'][1]:,.0f}ha · 밭 1·2급지 {nat['fg'][0] + nat['fg'][1]:,.0f}ha"
          f" · {os.path.getsize(path) / 1024:.0f}KB")


if __name__ == "__main__":
    main()
