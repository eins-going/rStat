"""벼 작황 모델 예측 갱신 — 시즌 중 매주 (update_plan.toml 'rice_model').

순서 (연구 코드 research/rice/ 를 그대로 돌린다. 각 단계는 memcap으로 메모리 상한을 건다)
  1. 올해 ASOS 일자료 받기      research/rice/wx2026/fetch_2026.py --start {올해}0101   (기상청 API허브, 지점 약 100곳 × 3초)
  2. 시군 논 중심 일기상         research/rice/cropmodel/build_weather.py
  3. 작물 생리 지표              research/rice/cropmodel/components.py   (PHENO=fixed, RICE_ASOF=보일 시점)
  4. 실시간 재현 + 올해 예측      research/rice/cropmodel/run_final.py
  5. 시군·시도·전국 내보내기      research/rice/prod/pipeline.py          → db/clean/rice/rice_forecast.csv
  그다음 update.py가 scripts/build_rice.py로 data/rice.js를 만든다.

보일 시점: 기본 시점(7/31·8/15·9/1·9/15·10/1) 중 어제까지 지난 것 + 어제(기본 시점이 아니면 '최신').
  어제 날짜 시점도 모든 해를 그 날짜 기준으로 다시 계산해 재현 정확도와 80% 범위를 낸다.
  10월 국가데이터처 예상을 반영한 값(1010)은 statdown·statfix 자료가 그해 것으로 있을 때만 나온다(해마다 10월에 직접 넣음).
시즌(7/20~10/12) 밖이면 아무것도 하지 않는다. --force: 시즌 밖에도 기본 시점 전부로 다시 계산. --no-fetch: 1단계 건너뜀. --date·--dry: 점검용.
"""
import argparse
import datetime as dt
import os
import subprocess
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
R = os.path.join(ROOT, "research", "rice")
PY = os.path.join(ROOT, ".venv", "bin", "python")
GRID = ["0731", "0815", "0901", "0915", "1001"]
SEASON = ("0720", "1012")


def step(name, args, env=None, mem="4G", cwd=R):
    print(f"\n== {name} ==", flush=True)
    e = dict(os.environ, OMP_NUM_THREADS="2", PHENO="fixed", **(env or {}))
    r = subprocess.run(["memcap", "-m", mem, PY, *args], cwd=cwd, env=e)
    if r.returncode:
        sys.exit(f"{name} 실패 (종료 코드 {r.returncode})")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--force", action="store_true")
    ap.add_argument("--no-fetch", action="store_true")
    ap.add_argument("--date", help="오늘 대신 이 날짜로 (YYYY-MM-DD, 점검용)")
    ap.add_argument("--dry", action="store_true", help="보일 시점만 출력")
    a = ap.parse_args()
    today = dt.date.fromisoformat(a.date) if a.date else dt.date.today()
    yday = today - dt.timedelta(days=1)
    md = yday.strftime("%m%d")
    in_season = SEASON[0] <= md <= SEASON[1]
    if not in_season and not a.force:
        print(f"시즌({SEASON[0]}~{SEASON[1]}) 밖이라 건너뜀 ({today})")
        return
    if in_season:
        show = [g for g in GRID if g <= md] + ([md] if md not in GRID and md < GRID[-1] else [])
    else:
        show = list(GRID)
    print("보일 시점", show, "| 기상 기준일", yday)
    if a.dry:
        return
    if not a.no_fetch:
        step("올해 기상 받기", ["wx2026/fetch_2026.py", "--start", f"{yday.year}0101", "--end", yday.strftime("%Y%m%d")], mem="2G")
    step("시군 일기상", ["cropmodel/build_weather.py"], mem="5G")
    step("작물 생리 지표", ["cropmodel/components.py"], env={"RICE_ASOF": ",".join(show)})
    step("재현·올해 예측", ["cropmodel/run_final.py"])
    step("내보내기", ["prod/pipeline.py"], env={"RICE_SHOW": ",".join(show + ["1010"])})
    print("완료")


if __name__ == "__main__":
    main()
