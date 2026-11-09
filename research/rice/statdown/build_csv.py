"""raw/ 의 통계청 '쌀 예상생산량조사 결과' 보도자료 → stat_forecast_sido.csv
논벼, 현백률 92.9%(정곡; KOSIS DT_1ET0034와 같은 기준). 2014는 PDF 글꼴 깨짐 → HWP(hwp5html) 표, 2010은 2단 배치라 원문(p.5) 수기 전사.
실행: .venv/bin/python -I build_csv.py  (pdftotext, hwp5html 필요)"""
import os
import re
import subprocess
import sys
import tempfile

import pandas as pd

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from parse_pdfs import NAMES, parse  # noqa: E402

CODE = {"전국": "00", "서울": "11", "부산": "21", "대구": "22", "인천": "23", "광주": "24", "대전": "25", "울산": "26", "세종": "29",
        "경기": "31", "강원": "32", "충북": "33", "충남": "34", "전북": "35", "전남": "36", "경북": "37", "경남": "38", "제주": "39"}
URL = "https://mods.go.kr/boardDownload.es?bid=228&list_no={}&seq={}"
SEQ = {2010: 2, 2011: 2, 2012: 1, 2013: 2, 2014: 1, 2015: 1, 2016: 1, 2017: 2, 2018: 2, 2019: 2, 2020: 1, 2021: 1, 2022: 1,
       2023: 4, 2024: 1, 2025: 1, 2026: 4}

# 2010 논벼 예상(현백률 92.9%): 면적 ha, 10a당 kg, 생산량 톤 — 2010.pdf p.5 '나. 논벼 예상 생산량' '10 열
Y2010 = {"전국": (886516, 489, 4331523), "서울": (267, 438, 1169), "부산": (3644, 471, 17163), "대구": (3217, 495, 15924),
         "인천": (12588, 475, 59793), "광주": (6182, 469, 28994), "대전": (1628, 486, 7912), "울산": (6341, 469, 29739),
         "경기": (95894, 438, 418518), "강원": (38809, 454, 176193), "충북": (46758, 482, 225374), "충남": (156456, 516, 807313),
         "전북": (134123, 525, 704146), "전남": (180163, 465, 835197), "경북": (116472, 511, 595172), "경남": (83950, 487, 408837),
         "제주": (24, 332, 80)}


def fnum(s):
    s = str(s).replace(",", "").strip()
    if s in ("-", "", "nan"):
        return None
    neg = s.startswith("△") or s.startswith("-")
    return -float(s.lstrip("△-")) if neg else float(s)


def merge_tokens(toks):
    out, i = [], 0
    while i < len(toks):
        if toks[i] == "-" and i + 1 < len(toks) and re.fullmatch(r"\d+\.\d+", toks[i + 1]):
            out.append("-" + toks[i + 1])
            i += 2
        else:
            out.append(toks[i])
            i += 1
    return out


def from_pdf(y):
    txt = subprocess.run(["pdftotext", "-layout", os.path.join(HERE, "raw", f"{y}.pdf"), "-"], capture_output=True).stdout.decode("utf-8", "replace")
    _, o = parse(txt)
    rows = {}
    for k, (nm, toks) in o.items():
        t = merge_tokens(toks)
        rows[k] = (fnum(t[1]), fnum(t[4]), fnum(t[7]))
    return rows


def from_hwp(y):
    d = tempfile.mkdtemp()
    subprocess.run([os.path.join(os.path.dirname(sys.executable), "hwp5html"), "--output", d, os.path.join(HERE, "raw", f"{y}.hwp")],
                   capture_output=True, check=True)
    for t in pd.read_html(os.path.join(d, "index.xhtml")):
        s = t.to_string()
        if "10a당생산량" in s and "전남" in s:
            t = t[t[0].isin(NAMES)]
            if fnum(t[t[0] == "전국"].iloc[0, 6]) > 505:  # 첫 번째 = 92.9% (논벼 표가 밭벼 표보다 앞)
                return {r[0]: (fnum(r[2]), fnum(r[6]), fnum(r[10])) for r in t.itertuples(index=False)}
    raise ValueError("2014 표 없음")


def main():
    dates = pd.read_csv(os.path.join(HERE, "raw", "dates.txt"), sep=" ", names=["y", "list_no", "date"])
    recs = []
    for r in dates.itertuples():
        y = r.y
        rows = Y2010 if y == 2010 else from_hwp(y) if y == 2014 else from_pdf(y)
        for k, (a, yl, p) in rows.items():
            recs.append(dict(year=y, release_date=r.date, sido_code=CODE[k], sido_name=k, yield_kg10a=yl, area_ha=a, prod_ton=p,
                             source_url=URL.format(r.list_no, SEQ[y])))
    df = pd.DataFrame(recs).sort_values(["year", "sido_code"])
    # 점검: 생산량 ≈ 면적×단수/100
    chk = (df.area_ha * df.yield_kg10a / 100 / df.prod_ton - 1).abs()
    bad = df[(chk > 0.01) & (df.area_ha > 100)]
    if len(bad):
        print("일관성 경고:\n", bad)
    df.to_csv(os.path.join(HERE, "stat_forecast_sido.csv"), index=False)
    print(df.pivot_table(index="year", columns="sido_name", values="yield_kg10a").to_string())


if __name__ == "__main__":
    main()
