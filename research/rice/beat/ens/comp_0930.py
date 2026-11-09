"""작물모델 성분을 as-of 9/30으로 다시 만든다 (cropmodel/components.py 그대로, ASOF만 바꿈, PHENO=fixed).
9/30 시점: doy 273(9/30)까지 실측, 그 뒤는 직전 10년 같은 날 기대값. 학습용 완전 시즌 '1001'도 같이 만든다(기존과 같아야 함 → 검산).
출력: beat/ens/comp/components_sido_fixed.csv (+ sigun gz)
"""
import os, sys
os.environ["PHENO"] = "fixed"
R = "/home/eins/project/rStat/research/rice"
sys.path[:0] = [f"{R}/cropmodel", R]
import components as CP
CP.HERE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "comp")
CP.ASOF = {"0930": CP.DOY(9, 30), "1001": CP.DOY(10, 1)}
print("ASOF", CP.ASOF, "PHENO", CP.PHENO, CP.SUFFIX, flush=True)
CP.run()
