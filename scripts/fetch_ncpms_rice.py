"""NCPMS 논벼 예찰(벼관찰포) 올해 회차 받기 + 회차별 처음 보인 날 기록 → ncpms 특징 다시 만들기.

벼 작황 10/1 예측의 도열병 보정(research/rice/prod/sido_adjust.py)이 9/16 회차를 쓴다. update.py가 6~10월 매일 돌린다.
1. 올해 회차 상세 캐시는 지우고 다시 받는다(처음 공개 때 일부 시도만 입력돼 있을 수 있어서).
2. research/rice/ncpms/data/first_seen.csv: 회차(조사 기준일)마다 목록에 처음 보인 날(listed_on)과
   8도(41~48) 도열병 값이 다 들어온 첫날(complete_on) — 공개 시차를 재서 10/1에 9/16 회차를 쓸 수 있는지 확인한다.
3. research/rice/ncpms/features.py → feat_sido.csv
사용: .venv/bin/python scripts/fetch_ncpms_rice.py
"""
import datetime as dt
import glob
import os
import subprocess
import sys

import pandas as pd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
NC = os.path.join(ROOT, "research", "rice", "ncpms")
DATA = os.path.join(NC, "data")
FS = os.path.join(DATA, "first_seen.csv")
P8 = {41, 42, 43, 44, 45, 46, 47, 48}


def run(script, *args):
    r = subprocess.run([sys.executable, os.path.join(NC, script), *args], cwd=NC)
    if r.returncode:
        sys.exit(r.returncode)


def main():
    today = dt.date.today()
    y = today.year
    for f in glob.glob(os.path.join(DATA, "raw", f"{y}*.json")):
        os.remove(f)
    run("fetch_ncpms.py", "--from", "2014", "--to", str(y))
    rounds = pd.read_csv(os.path.join(DATA, "rounds.csv"))
    rounds = rounds[(rounds.examinYear == y) & (rounds.kncrNm == "논벼")]
    sido = pd.read_csv(os.path.join(DATA, "ncpms_sido.csv.gz"))
    blast = sido[(sido.y == y) & sido.dbyhsNm.astype(str).str.contains("도열병")]
    cols = ["y", "round", "date", "listed_on", "complete_on", "n_sido", "note"]
    fs = pd.read_csv(FS, dtype=str).fillna("") if os.path.exists(FS) else pd.DataFrame(columns=cols)
    for _, r in rounds.iterrows():
        rd = int(r.examinTmrd)
        k = (str(y), str(rd))
        n = int(blast[(blast["round"] == rd) & blast.sidoCode.isin(P8)].sidoCode.nunique())
        hit = (fs.y == k[0]) & (fs["round"] == k[1])
        if not hit.any():
            ref = dt.datetime.strptime(str(r.inputStdrDatetm), "%Y%m%d").date()
            late = (today - ref).days > 45  # 기록을 시작하기 전에 이미 공개된 회차 → 공개 시차를 모름
            fs = pd.concat([fs, pd.DataFrame([{"y": k[0], "round": k[1], "date": str(r.inputStdrDatetm),
                                               "listed_on": "" if late else str(today),
                                               "complete_on": "" if late or n < 8 else str(today), "n_sido": str(n),
                                               "note": f"기록 시작({today}) 전에 공개" if late else ""}])], ignore_index=True)
        else:
            if n >= 8 and str(fs.loc[hit, "complete_on"].iloc[0]).strip() == "" and fs.loc[hit, "note"].iloc[0] == "":
                fs.loc[hit, "complete_on"] = str(today)
            fs.loc[hit, "n_sido"] = str(n)
    fs.sort_values(["y", "round"], key=lambda s: s.astype(int)).to_csv(FS, index=False)
    print("회차별 처음 보인 날\n", fs[fs.y == str(y)].to_string(index=False))
    run("features.py")


if __name__ == "__main__":
    main()
