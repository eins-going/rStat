"""물류기기 공동이용 원자료(cp949 CSV)를 검사해 UTF-8 CSV로 정제한다.

원자료에는 NUL 바이트가 섞인 손상 줄, cp949로 풀리지 않는 줄이 드물게 있다.
그런 줄은 db/clean/rejects_<연도>.txt에 남기고 빼며, 연도마다 처리 결과를 db/clean/report.json에 적는다.
2024년부터 POOL_CO 컬럼 이름이 POOL_CO_NM으로 바뀌었으므로 헤더를 POOL_CO로 통일한다.
맨 앞에 원본 줄 번호(SRC_LINE, 헤더가 1)를 붙여 원자료와 대조할 수 있게 한다.
실행: python scripts/clean_raw.py   (결과: db/clean/<연도>.csv)
"""
import glob
import json
import os
import re
from concurrent.futures import ProcessPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "agri_distribution_data")
OUT = os.path.join(ROOT, "db", "clean")
NCOL = 22


def clean(path):
    year = int(re.match(r"(\d{4})년", os.path.basename(path)).group(1))
    stats = {"year": year, "file": os.path.basename(path), "lines": 0, "kept": 0, "nul": 0, "decode": 0, "fields": 0}
    with open(path, "rb") as src, \
         open(os.path.join(OUT, f"{year}.csv"), "w", encoding="utf-8", newline="") as dst, \
         open(os.path.join(OUT, f"rejects_{year}.txt"), "w", encoding="utf-8") as rej:
        header = src.readline().decode("cp949").rstrip("\r\n").replace("POOL_CO_NM", "POOL_CO")
        dst.write("SRC_LINE," + header + "\n")
        for no, raw in enumerate(src, start=2):
            stats["lines"] += 1
            line = raw.rstrip(b"\r\n")
            if b"\x00" in line:
                stats["nul"] += 1
                rej.write(f"{no}\tnul\t{line[:200].replace(b'\x00', b'').decode('cp949', 'replace')}\n")
                continue
            try:
                text = line.decode("cp949")
            except UnicodeDecodeError:
                stats["decode"] += 1
                rej.write(f"{no}\tdecode\t{line[:200].decode('cp949', 'replace')}\n")
                continue
            if text.count(",") != NCOL - 1:
                stats["fields"] += 1
                rej.write(f"{no}\tfields\t{text[:200]}\n")
                continue
            dst.write(f"{no},{text}\n")
            stats["kept"] += 1
    return stats


def main():
    os.makedirs(OUT, exist_ok=True)
    paths = sorted(glob.glob(os.path.join(RAW, "*.csv")))
    with ProcessPoolExecutor(max_workers=4) as ex:
        report = sorted(ex.map(clean, paths), key=lambda s: s["year"])
    for s in report:
        print(s)
    with open(os.path.join(OUT, "report.json"), "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
