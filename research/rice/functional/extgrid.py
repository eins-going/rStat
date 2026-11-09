"""[사후 추가 — 결과 본 뒤] 사전 등록 격자에서 실시간 선택이 늘 가장자리(λr=100, λs=1e4)였으므로 격자를 넓혀 다시 실시간 선택.
λr ∈ {100, 300, 1000, 3000, 10000}, λs ∈ {1e4, 1e5, 1e6}. 선택 규칙·쌓기 규칙은 fmodel.py와 같다. 사후 선택이므로 채택 근거로 쓰지 않는다."""
import fmodel as F
F.RID = [(lr, ls) for lr in (100.0, 300.0, 1000.0, 3000.0, 10000.0) for ls in (1e4, 1e5, 1e6)]
for asof in ("0915", "1001"):
    P, B = F.one_step(asof)
    pm4 = F.m4(asof)
    pb, sb = F.realtime_select(P, [f"R{lr:g}_S{ls:g}" for lr, ls in F.RID])
    pc, wc = F.stack(pm4, pb)
    for k, p in (("(b+) 확장격자 실시간", pb), ("(c+) M4+확장격자 쌓기", pc)):
        r = F.score(p, k)
        print(f"{asof} {k:24s} 시군 skill {r['skill']:+.3f} 순위r {r['rank_r']} 전국 {r['nat_rmse']} 2020 {r['nat_err_2020']} | 8도합 {r['p96']:+.3f} {r['p05']:+.3f} {r['p13']:+.3f}")
    print(asof, "선택", sorted(set(k for _, k in sb[-13:])), "쌓기 w", sorted(set(w for _, w in wc[-13:])))
    k = sb[-1][1]; b, c = B[k][2025]
    print("  2025 계수(원단위) 최대|β| 변수별:", {v: round(float(abs(b[j*20:(j+1)*20]).max()), 4) for j, v in enumerate(F.VARS)})
