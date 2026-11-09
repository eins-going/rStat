"""전국·전 기간 S1 추출 드라이버. 시도×연도마다 새 프로세스로 extract_s1.py를 돌리고, 이미 있는 결과는 건너뛴다(이어받기).

사용(원격 연결이 끊겨도 계속되게 서비스로):
  systemd-run --user --unit=rice-area-s1 -p MemoryMax=4G -p MemorySwapMax=0 \
    /home/eins/project/rStat/.venv/bin/python /home/eins/project/rStat/research/rice/area/run_all.py
  진행: journalctl --user -u rice-area-s1 -f   또는 research/rice/area/run_all.log
"""
import os, subprocess, sys, time

D = os.path.dirname(os.path.abspath(__file__))
PY = "/home/eins/project/rStat/.venv/bin/python"
ORDER = ["52", "46", "44", "41", "47", "48", "43", "51", "28", "27", "26", "29", "30", "31", "36"]
YEARS = range(2017, 2026)
RES = sys.argv[1] if len(sys.argv) > 1 else "40"


def log(s):
    with open(f"{D}/run_all.log", "a") as f:
        f.write(time.strftime("%m-%d %H:%M:%S ") + s + "\n")


for pfx in ORDER:
    if not os.path.exists(f"{D}/cache/grid_{pfx}_r{RES}.json"):
        log(f"{pfx} 격자 없음, 건너뜀")
        continue
    for y in YEARS:
        out = f"{D}/out/s1_{pfx}_{y}_r{RES}.npz"
        if os.path.exists(out):
            continue
        for k in range(3):
            t0 = time.time()
            p = subprocess.run([PY, f"{D}/extract_s1.py", pfx, str(y), "--res", RES, "--threads", "8", "--end", "07-31"],
                               capture_output=True, text=True)
            tail = [l for l in p.stdout.splitlines() if not l.startswith("  ")]
            log(f"{pfx} {y} rc={p.returncode} {(time.time()-t0)/60:.1f}분 | " + " / ".join(tail[-2:]) + (" | " + p.stderr[-300:] if p.returncode else ""))
            if p.returncode == 0:
                break
            time.sleep(60)
log("끝")
