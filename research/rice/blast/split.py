"""보조 확인: 기간 나눔(2013~19 / 2020~25) 시군 skill, 2021 도별 실제 a (evaluate.py 뒤에 실행)."""
import os, sys
sys.argv = ["x"]
HERE = os.path.dirname(os.path.abspath(__file__))
exec(open(os.path.join(HERE, "evaluate.py")).read().split("res, keep = {}, {}")[0])
for name in ("M4 (기준)", "(a) 교체: blast_neck", "(b) 추가: M4 + blast_neck", "보조: M4 + blast_leaf"):
    p, _ = M.backtest(an, st, VARIANTS[name], "0915", icpt="cw")
    sg = M.to_sigun(p, None, 0.0)
    s = [C.evaluate(sg, name, years=range(a, b), verbose=False) for a, b in ((2013, 2020), (2020, 2026))]
    print(f"{name:28s} 2013~19 skill {s[0]['skill']:+.3f} 전국 {s[0]['nat_rmse']} | 2020~25 skill {s[1]['skill']:+.3f} 전국 {s[1]['nat_rmse']}")
print(st[(st.y == 2021) & st.sc.isin(M.PROV)][["sc", "a"]].assign(a=lambda d: (d.a * 100).round(1)).to_string(index=False))
