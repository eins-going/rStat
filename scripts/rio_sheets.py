"""한은 지역산업연관표 xlsx 시트를 행렬로 읽는다 (build_rio.py가 쓴다).

시트 하나가 압축을 풀면 수백 MB라 openpyxl 대신 시트 XML을 줄 단위로 훑는다. 결과는
db/clean/bok_rio2020/<파일>__<시트번호>.npz에 남겨 두고 원본이 바뀌지 않으면 다시 읽지 않는다.

시트 모양 (2020 지역표, 2026-10 확인)
- 머리: '지역' 행(열의 지역), '부문' 행(열의 부문코드), '부문명' 행(열의 부문명). 값 행은 A열 지역, B열 부문코드, C열 부문명.
- 값은 D열부터. 열에는 17개 시도×부문 뒤에 합계·최종수요·수입 같은 부속열(코드 9xxx)이 붙는다.
→ (행 라벨 [(지역, 코드, 이름)], 열 라벨 [(지역, 코드, 이름)], float64 행렬)
"""
import os
import re
import zipfile

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CACHE = os.path.join(ROOT, "db", "clean", "bok_rio2020")

CELL = re.compile(r'<c r="([A-Z]+)(\d+)"([^>]*?)(?:/>|>(.*?)</c>)', re.S)
VAL = re.compile(r"<v>(.*?)</v>", re.S)


def col_index(ref):
    n = 0
    for ch in ref:
        n = n * 26 + ord(ch) - 64
    return n - 1


def shared_strings(z):
    try:
        xml = z.read("xl/sharedStrings.xml").decode("utf-8")
    except KeyError:
        return []
    return [re.sub(r"<[^>]+>", "", s).replace("\r", "").replace("\n", " ").strip()
            for s in re.findall(r"<si>(.*?)</si>", xml, re.S)]


def sheet_names(path):
    with zipfile.ZipFile(path) as z:
        return re.findall(r'<sheet name="([^"]+)"', z.read("xl/workbook.xml").decode("utf-8"))


def rows_of(z, member):
    """시트 XML에서 행을 하나씩 (행 번호, {열 번호: 원래 문자열}) 로 낸다"""
    with z.open(member) as fh:
        rest = ""
        while True:
            chunk = fh.read(1 << 22)
            if not chunk:
                break
            rest += chunk.decode("utf-8", errors="ignore")
            parts = rest.split("</row>")
            rest = parts.pop()
            for p in parts:
                i = p.find("<row ")
                if i < 0:
                    continue
                p = p[i:]
                rnum = int(re.match(r'<row r="(\d+)"', p).group(1))
                cells = {}
                for m in CELL.finditer(p):
                    ref, _, attrs, inner = m.groups()
                    v = VAL.search(inner or "")
                    if v:
                        cells[col_index(ref)] = (v.group(1), 't="s"' in attrs)
                yield rnum, cells


def head_key(label):
    """머리 행 이름 → '지역'·'부문'·'부문명' (시트마다 '번호', '최종수요 부문명'처럼 조금씩 다르다)"""
    t = " ".join(label.split())
    if t == "지역":
        return "지역"
    if t in ("부문", "번호"):
        return "부문"
    if t.endswith("부문명"):
        return "부문명"
    return None


def read_simple(path, sheet_no):
    """취업자수·취업계수처럼 행 = 부문(코드, 이름), 열 = 시도인 표 → (행 [(코드, 이름)], 열 [시도], 행렬)"""
    with zipfile.ZipFile(path) as z:
        ss = shared_strings(z)
        txt = lambda c: ss[int(c[0])] if c[1] else c[0]  # noqa: E731
        cols, rows, vals = None, [], []
        for _, cells in rows_of(z, f"xl/worksheets/sheet{sheet_no}.xml"):
            first = txt(cells[0]) if 0 in cells else ""
            if cols is None:
                if first in ("상품", "부문"):
                    cols = {i: txt(v) for i, v in cells.items() if i >= 2}
                continue
            if not first or 1 not in cells:
                continue
            rows.append((first, txt(cells[1])))
            vals.append([float(txt(cells[i])) if i in cells else 0.0 for i in sorted(cols)])
    return rows, [cols[i] for i in sorted(cols)], np.array(vals)


def read_sheet(path, sheet_no):
    """sheet_no: 1부터 (workbook 순서)"""
    os.makedirs(CACHE, exist_ok=True)
    cache = os.path.join(CACHE, f"{os.path.basename(path)[:-5]}__{sheet_no}.npz")
    if os.path.exists(cache) and os.path.getmtime(cache) > os.path.getmtime(path):
        with np.load(cache, allow_pickle=False) as d:
            return [tuple(r) for r in d["rows"]], [tuple(c) for c in d["cols"]], d["m"]
    with zipfile.ZipFile(path) as z:
        ss = shared_strings(z)
        txt = lambda c: ss[int(c[0])] if c[1] else c[0]  # noqa: E731
        head, rows, vals = {}, [], []
        ncol = None
        for rnum, cells in rows_of(z, f"xl/worksheets/sheet{sheet_no}.xml"):
            a, b, c = (txt(cells[i]) if i in cells else "" for i in (0, 1, 2))
            key = head_key(c) if not a or a == "지역" else None
            if key:
                head[key] = {i: txt(v) for i, v in cells.items() if i >= 3}
                continue
            if not (a and b) or "부문명" not in head:
                continue
            if ncol is None:
                ncol = max(head["부문명"]) + 1
            row = np.zeros(ncol - 3)
            for i, v in cells.items():
                if 3 <= i < ncol and not v[1]:
                    try:
                        row[i - 3] = float(v[0])
                    except ValueError:
                        pass
            rows.append((a, b, c))
            vals.append(row)
    idx = range(3, ncol)
    cols = [(head.get("지역", {}).get(i, ""), head.get("부문", {}).get(i, ""), head["부문명"].get(i, "")) for i in idx]
    m = np.vstack(vals)
    np.savez_compressed(cache, rows=np.array(rows, dtype=str), cols=np.array(cols, dtype=str), m=m)
    return rows, cols, m
