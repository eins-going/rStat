"""한국은행 2020년 지역산업연관표(통합소분류, 17개 시도) → data/rio.js — '지역산업연관표(농업)' 탭 자료.

원천은 db/raw/bok_rio2020/(scripts/fetch_bok_rio.py)의 한은 공표 파일뿐이다. 추정·배분은 하지 않는다.
화면의 값은 ① 한은 공표값(거래액, 유발계수, 취업자 수)과 ② 그 단순 합계·비율(비중, 자급률 등) 두 종류다.

표 (생산자가격, 백만원) — 행: 17개 시도×165부문 국산 공급, 수입계×165, 부가가치 항목 / 열: 17개 시도×(165부문+최종수요 7항목)
- 수출은 각 시도의 최종수요 열(9140)에 있다. 역내 수요를 셀 때 수출 열은 뺀다.
- 수입은 국산 행이 아니라 수입계 행에 있다 → 시도 s의 수입 사용 = 수입계 행 × s의 열(수출 열 제외).

품목 (농식품 소분류 18개 + 묶음 5개: 농축산물·농산물·축산물·농림수산물·음식료품. 묶음은 거래액을 더한 것)
- x 산출액, va 부가가치, vaRate 부가가치율, share 시도 전체 산출 중 비중, lq 특화계수(시도 비중 ÷ 전국 비중)
- 공급처(역내 수요): own 역내산, inflow 타지역 이입, imp 수입 / 판매처: own 역내, out 타지역 이출, exp 수출
  → self 자급률 = own / (own+inflow+imp), outRate 이출률 = out / x
- flow[r][s] 시도 r에서 s로 간 금액 (s의 중간·최종수요, 수출 제외)
- inputs: 투입 상위 부문(+고정 관심 부문: 비료 및 농약, 사료, 석유제품, 전력, 농림어업 서비스, 농기계)별 [역내, 타지역, 수입], 부가가치 구성
- sales: 판로 상위 부문과 최종수요 항목별 [역내, 타지역], 수출
- 유발(한은 소분류 유발계수표의 그 품목 열): prod 생산유발 지역별 합(17) · 상위 부문, va 부가가치유발 지역별 합, imp 수입유발 합.
  묶음은 품목 산출액 가중평균(원표로 계산).
- 취업(고용표 통합중분류 — 소분류 고용표는 없다): 품목이 속한 중분류의 취업자 수, 취업유발 인원(10억 원당) 지역별 합.
- linkage[시도] = 165부문 [영향력계수, 감응도계수]: 한은 생산유발계수표(17개 시도×165부문 전체)의 열 합·행 합을
  전체 평균으로 나눈 값(원표로 계산). 1보다 크면 전 지역 평균보다 후방(투입)·전방(판로) 연관이 크다.
- regionX[시도] = 165부문 산출액 (산점도 점 크기)
실행: python scripts/build_rio.py   (시트 읽기 결과는 db/clean/bok_rio2020/에 캐시)
"""
import glob
import json
import os
import time

import numpy as np

from rio_sheets import read_sheet, read_simple

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "db", "raw", "bok_rio2020")
OUT = os.path.join(ROOT, "data", "rio.js")

# 한은 지역 이름 → 통계 페이지 시도 코드
SIDO = {"서울": "11", "부산": "21", "대구": "22", "인천": "23", "광주": "24", "대전": "25", "울산": "26", "세종": "29",
        "경기": "31", "강원": "32", "충북": "33", "충남": "34", "전북": "35", "전남": "36", "경북": "37", "경남": "38", "제주": "39"}
ITEMS = [  # (소분류 코드, 화면 이름, 중분류 코드)
    ("011", "곡물·식량작물", "01"), ("012", "채소·과실", "01"), ("019", "기타작물", "01"),
    ("021", "낙농·축우", "02"), ("029", "기타축산", "02"), ("030", "임산물", "03"), ("040", "수산물", "04"),
    ("050", "농림어업 서비스", "05"),
    ("081", "육류·낙농품", "08"), ("082", "수산가공품", "08"), ("083", "정곡·제분", "08"), ("084", "제당·전분", "08"),
    ("085", "떡·과자·면류", "08"), ("086", "조미료·유지", "08"), ("087", "기타 식료품", "08"), ("088", "사료", "08"),
    ("091", "주류", "09"), ("092", "음료", "09"),
]
GROUPS = {"농축산물": ["011", "012", "019", "021", "029"],
          "농산물": ["011", "012", "019"],
          "축산물": ["021", "029"],
          "농림수산물": ["011", "012", "019", "021", "029", "030", "040", "050"],
          "음식료품": ["081", "082", "083", "084", "085", "086", "087", "088", "091", "092"]}
KEY_INPUTS = ["210", "088", "162", "050", "391"]  # 비료 및 농약, 사료, 원유정제처리제품, 농림어업 서비스, 농업 및 건설용 기계
TOP_N = 8
FD = ["9111", "9112", "9121", "9122", "9131", "9132"]  # 수출(9140)은 따로
FD_NAME = {"9111": "가계소비", "9112": "정부소비", "9121": "민간투자", "9122": "정부투자", "9131": "재고증감", "9132": "귀중품"}
VA_ROWS = {"9610": "피용자보수", "9621": "영업잉여", "9622": "고정자본소모", "9630": "생산세"}


def find(pattern):
    path = glob.glob(os.path.join(RAW, pattern))
    if not path:
        raise SystemExit(f"{pattern} 없음 — scripts/fetch_bok_rio.py를 먼저 실행하세요")
    return path[0]


def r0(v):
    return int(round(float(v)))


def main():
    t0 = time.time()
    rows, cols, Z = read_sheet(find("*소분류_총거래표*.xlsx"), 1)
    regions = [r for r in SIDO if any(x[0] == r for x in rows)]
    regions = list(dict.fromkeys(x[0] for x in rows if x[0] in SIDO))  # 한은 표 순서
    sectors = [x[1] for x in rows if x[0] == regions[0]]
    names = {x[1]: x[2] for x in rows if x[0] == regions[0]}
    R, S = len(regions), len(sectors)
    ri = {(x[0], x[1]): i for i, x in enumerate(rows)}
    ci = {(x[0], x[1]): j for j, x in enumerate(cols)}
    print(f"총거래표 {Z.shape} 읽음 {time.time() - t0:.0f}초", flush=True)

    # 블록: dom[r, i, s, k] 국산 중간거래, fdm[r, i, s, f] 국산 최종수요, imp[i, s, k] 수입 중간, impf[i, s, f]
    dom = np.zeros((R, S, R, S))
    fin = np.zeros((R, S, R, len(FD) + 1))  # 마지막 = 수출
    imp = np.zeros((S, R, S))
    impf = np.zeros((S, R, len(FD) + 1))
    va = {c: np.zeros((R, S)) for c in list(VA_ROWS) + ["9690"]}
    rows_dom = np.array([[ri[(r, i)] for i in sectors] for r in regions])
    cols_sec = np.array([[ci[(s, k)] for k in sectors] for s in regions])
    cols_fd = np.array([[ci[(s, f)] for f in FD + ["9140"]] for s in regions])
    rows_imp = np.array([ri[("수입계", i)] for i in sectors])
    for a, r in enumerate(regions):
        blk = Z[rows_dom[a]]
        for b in range(R):
            dom[a, :, b, :] = blk[:, cols_sec[b]]
            fin[a, :, b, :] = blk[:, cols_fd[b]]
    blk = Z[rows_imp]
    for b in range(R):
        imp[:, b, :] = blk[:, cols_sec[b]]
        impf[:, b, :] = blk[:, cols_fd[b]]
    for c in va:
        row = Z[ri[("지역계", c)]]
        for b in range(R):
            va[c][b] = row[cols_sec[b]]
    X = dom.sum(axis=(2, 3)) + fin.sum(axis=(2, 3))  # 행 합 = 총산출 (R, S)
    total_in = dom.sum(axis=(0, 1)) + imp.sum(axis=0) + va["9690"]  # 열 합 = 총투입 (R, S)
    assert np.abs(X - total_in).max() < 1, "행·열 합이 맞지 않음"
    print(f"블록 정리, 총산출 {X.sum() / 1e6:,.1f}조원 {time.time() - t0:.0f}초", flush=True)

    # 유발계수 (한은 공표): 행 = 공급 시도×부문, 열 = 수요 시도×부문
    mult = {}
    for key, pat in [("prod", "*소분류_생산유발계수*"), ("va", "*소분류_부가가치유발계수*"), ("imp", "*소분류_수입유발계수*")]:
        mrows, mcols, M = read_sheet(find(pat + ".xlsx"), 1)
        mri = {(x[0], x[1]): i for i, x in enumerate(mrows)}
        mci = {(x[0], x[1]): j for j, x in enumerate(mcols)}
        mult[key] = (M, mri, mci)
        print(f"{key} 유발계수 {M.shape} {time.time() - t0:.0f}초", flush=True)

    # 고용표 통합중분류
    emp_path = find("*고용표_통합중분류*.xlsx")
    erows, ecols, E = read_simple(emp_path, 1)  # 취업자수 (명): 행 = 중분류, 열 = 시도 + 전지역
    jobs = {(code, reg): E[i, j] for i, (code, _) in enumerate(erows) for j, reg in enumerate(ecols)}
    jrows, jcols, J = read_sheet(emp_path, 3)  # 취업유발계수표 (명/10억원)
    jri = {(x[0], x[1]): i for i, x in enumerate(jrows)}
    jcol_idx = {}
    for j, x in enumerate(jcols):  # 열의 부문코드 칸이 비어 있어 순서로 맞춘다 (시도마다 83부문)
        if x[0] in SIDO:
            jcol_idx.setdefault(x[0], []).append(j)
    mid_codes = [c for c, _ in erows]

    def job_mult(reg, mid):
        j = jcol_idx[reg][mid_codes.index(mid)]
        return {SIDO[r]: float(sum(J[jri[(r, m)], j] for m in mid_codes if (r, m) in jri)) for r in regions}

    sec_index = {k: n for n, k in enumerate(sectors)}
    reg_tot_x = X.sum(axis=1)
    nat_share = X.sum(axis=0) / X.sum()

    def item_block(codes, label):
        idx = [sec_index[c] for c in codes]
        out = {}
        for a, r in enumerate(regions):
            x = X[a, idx].sum()
            v = va["9690"][a, idx].sum()
            own_sale = dom[a, idx, a, :].sum() + fin[a, idx, a, :-1].sum()
            out_sale = sum(dom[a, idx, b, :].sum() + fin[a, idx, b, :-1].sum() for b in range(R) if b != a)
            exp = fin[a, idx, :, -1].sum()
            inflow = sum(dom[b, idx, a, :].sum() + fin[b, idx, a, :-1].sum() for b in range(R) if b != a)
            imp_use = imp[idx, a, :].sum() + impf[idx, a, :-1].sum()
            demand = own_sale + inflow + imp_use
            share = x / reg_tot_x[a]
            d = {"x": r0(x), "va": r0(v), "vaRate": round(v / x, 4) if x else None,
                 "share": round(share, 5), "lq": round(share / nat_share[idx].sum(), 3) if nat_share[idx].sum() else None,
                 "own": r0(own_sale), "out": r0(out_sale), "exp": r0(exp), "inflow": r0(inflow), "imp": r0(imp_use),
                 "self": round(own_sale / demand, 4) if demand else None, "outRate": round(out_sale / x, 4) if x else None}
            # 투입구조: 부문 k별 [역내, 타지역, 수입]
            col_in_own = dom[a, :, a, :][:, idx].sum(axis=1)
            col_in_oth = dom[:, :, a, :][:, :, idx].sum(axis=(0, 2)) - col_in_own
            col_in_imp = imp[:, a, idx].sum(axis=1)
            tot_k = col_in_own + col_in_oth + col_in_imp
            keep = list(dict.fromkeys([int(n) for n in np.argsort(-tot_k)[:TOP_N]] + [sec_index[c] for c in KEY_INPUTS]))
            d["inputs"] = [[sectors[n], r0(col_in_own[n]), r0(col_in_oth[n]), r0(col_in_imp[n])] for n in keep]
            d["inputsTotal"] = [r0(col_in_own.sum()), r0(col_in_oth.sum()), r0(col_in_imp.sum())]
            d["vaParts"] = {VA_ROWS[c]: r0(va[c][a, idx].sum()) for c in VA_ROWS}
            # 판로: 사는 부문 k별 [역내, 타지역], 최종수요 항목별 [역내, 타지역], 수출
            buy_own = dom[a, idx, a, :].sum(axis=0)
            buy_all = dom[a, idx, :, :].sum(axis=(0, 1))
            keep_s = [int(n) for n in np.argsort(-buy_all)[:TOP_N]]
            d["sales"] = [[sectors[n], r0(buy_own[n]), r0(buy_all[n] - buy_own[n])] for n in keep_s]
            d["salesInter"] = [r0(buy_own.sum()), r0(buy_all.sum() - buy_own.sum())]
            fd_own = fin[a, idx, a, :-1].sum(axis=0)
            fd_all = fin[a, idx, :, :-1].sum(axis=(0, 1))
            d["salesFinal"] = [[FD_NAME[f], r0(fd_own[n]), r0(fd_all[n] - fd_own[n])] for n, f in enumerate(FD)]
            # 지역 간 흐름 (r → s), 수출 제외
            d["flowOut"] = [r0(dom[a, idx, b, :].sum() + fin[a, idx, b, :-1].sum()) for b in range(R)]
            # 유발계수: 품목 열 (묶음은 산출액 가중평균)
            w = X[a, idx] / X[a, idx].sum() if X[a, idx].sum() else np.ones(len(idx)) / len(idx)
            for key, (M, mri, mci) in mult.items():
                colv = sum(wt * M[:, mci[(r, sectors[n])]] for wt, n in zip(w, idx))
                by_reg = {SIDO[rr]: round(float(sum(colv[mri[(rr, k)]] for k in sectors)), 4) for rr in regions}
                d.setdefault("mult", {})[key] = by_reg
                if key == "prod":
                    by_sec = np.array([sum(colv[mri[(rr, k)]] for rr in regions) for k in sectors])
                    d["multTop"] = [[sectors[n], round(float(by_sec[n]), 4)] for n in np.argsort(-by_sec)[:TOP_N]]
            out[SIDO[r]] = d
        # 전국: 지역 합
        nat = {"x": r0(X[:, idx].sum()), "va": r0(va["9690"][:, idx].sum()),
               "exp": r0(fin[:, idx, :, -1].sum()), "imp": r0(imp[idx].sum() + impf[idx, :, :-1].sum())}
        nat["vaRate"] = round(nat["va"] / nat["x"], 4) if nat["x"] else None
        nat["share"] = round(X[:, idx].sum() / X.sum(), 5)
        # 전국 투입·판로: 시도 구분 없이 [국내, 0, 수입] · [국내, 0]
        in_dom = dom[:, :, :, idx].sum(axis=(0, 2, 3))
        in_imp = imp[:, :, idx].sum(axis=(1, 2))
        keep = list(dict.fromkeys([int(n) for n in np.argsort(-(in_dom + in_imp))[:TOP_N]] + [sec_index[c] for c in KEY_INPUTS]))
        nat["inputs"] = [[sectors[n], r0(in_dom[n]), 0, r0(in_imp[n])] for n in keep]
        nat["inputsTotal"] = [r0(in_dom.sum()), 0, r0(in_imp.sum())]
        nat["vaParts"] = {VA_ROWS[c]: r0(va[c][:, idx].sum()) for c in VA_ROWS}
        buy = dom[:, idx, :, :].sum(axis=(0, 1, 2))
        nat["sales"] = [[sectors[n], r0(buy[n]), 0] for n in np.argsort(-buy)[:TOP_N]]
        nat["salesInter"] = [r0(buy.sum()), 0]
        fd = fin[:, idx, :, :-1].sum(axis=(0, 1, 2))
        nat["salesFinal"] = [[FD_NAME[f], r0(fd[n]), 0] for n, f in enumerate(FD)]
        out["00"] = nat
        return out

    items = {}
    for code, label, mid in ITEMS:
        blk = item_block([code], label)
        blk_meta = {"name": label, "fullName": names[code], "mid": mid}
        for r in regions:
            jm = job_mult(r, mid)
            blk[SIDO[r]]["jobs"] = r0(jobs[(mid, r)])
            blk[SIDO[r]]["multJobs"] = {k: round(v, 2) for k, v in jm.items()}
        blk["00"]["jobs"] = r0(jobs[(mid, "전지역")])
        items[code] = {**blk_meta, "regions": blk}
        print(f"  {code} {label} {time.time() - t0:.0f}초", flush=True)
    for g, codes in GROUPS.items():
        blk = item_block(codes, g)
        mids = sorted({m for c, _, m in ITEMS if c in codes})
        for r in regions:
            blk[SIDO[r]]["jobs"] = r0(sum(jobs[(m, r)] for m in mids))
            # 취업유발: 품목이 속한 중분류의 계수를 품목 산출액으로 가중평균 (원표로 계산)
            xs = {c: items[c]["regions"][SIDO[r]]["x"] for c in codes}
            tot = sum(xs.values()) or 1
            jm = {}
            for c in codes:
                for k, v in items[c]["regions"][SIDO[r]]["multJobs"].items():
                    jm[k] = jm.get(k, 0) + v * xs[c] / tot
            blk[SIDO[r]]["multJobs"] = {k: round(v, 2) for k, v in jm.items()}
        blk["00"]["jobs"] = r0(sum(jobs[(m, "전지역")] for m in mids))
        items[g] = {"name": g, "members": codes, "mids": mids, "regions": blk}

    # 영향력계수(후방)·감응도계수(전방): 한은 생산유발계수표(17개 시도×165부문)의 열 합·행 합 ÷ 전체 평균 (원표로 계산)
    M, mri, mci = mult["prod"]
    rix = np.array([mri[(r, k)] for r in regions for k in sectors])
    cix = np.array([mci[(r, k)] for r in regions for k in sectors])
    L = M[np.ix_(rix, cix)]
    back, fwd = L.sum(axis=0), L.sum(axis=1)
    back, fwd = back / back.mean(), fwd / fwd.mean()
    linkage = {SIDO[r]: [[round(float(back[a * S + n]), 3), round(float(fwd[a * S + n]), 3)] for n in range(S)]
               for a, r in enumerate(regions)}
    region_x = {SIDO[r]: [r0(v) for v in X[a]] for a, r in enumerate(regions)}

    region_info = {SIDO[r]: {"name": r, "x": r0(reg_tot_x[a]), "va": r0(va["9690"][a].sum()),
                             "jobs": r0(sum(jobs[(m, r)] for m in mid_codes))} for a, r in enumerate(regions)}
    region_info["00"] = {"name": "전국", "x": r0(X.sum()), "va": r0(va["9690"].sum()),
                         "jobs": r0(sum(jobs[(m, "전지역")] for m in mid_codes))}
    data = {
        "built": time.strftime("%Y-%m-%d"), "year": 2020, "unit": "백만원",
        "source": "한국은행, 2020년 지역산업연관표(생산자가격, 통합소분류) · 고용표(통합중분류)",
        "regions": [SIDO[r] for r in regions], "sectorNames": names,
        "order": [c for c, _, _ in ITEMS], "groups": list(GROUPS), "regionInfo": region_info, "items": items,
        "sectors": sectors, "linkage": linkage, "regionX": region_x,
    }
    with open(OUT, "w", encoding="utf-8") as f:
        f.write("// 한국은행 2020년 지역산업연관표 농식품 부문 (scripts/fetch_bok_rio.py → scripts/build_rio.py)\n")
        f.write("window.AGRI_RIO = " + json.dumps(data, ensure_ascii=False, separators=(",", ":")) + ";\n")
    print(f"→ {OUT} {os.path.getsize(OUT) / 1e3:.0f}KB ({time.time() - t0:.0f}초)")


if __name__ == "__main__":
    main()
