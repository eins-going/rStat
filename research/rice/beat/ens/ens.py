"""사전 등록(README §1)대로 전국 결합 × 시도 분배 변형 21개를 돌리고 결과·예측표를 쓴다.
사용: OMP_NUM_THREADS=2 python ens.py
"""
import itertools, json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from evalx import *  # noqa

YEARS = list(range(1996, 2027))
N0 = 10.0


# ---------------- 자료 ----------------
def load_members(asof):
    d = pd.read_csv(f"{HERE}/comp/members_{asof}.csv", dtype={"sc": str})
    return d.pivot_table(index=["y", "sc"], columns="member", values="ahat").reset_index()


def krei(rule="0930"):
    """전국 KREI 단수 전망 → â_N (KOSIS 전국 올림픽 평년 대비). rule: '0930' 발표 ≤ 9/30, '1002' 발표 ≤ 10/2."""
    k = pd.read_csv(os.path.join(C.ROOT, "db/raw/krei/krei_rice_outlook.csv"))
    k = k[k.source_org == "KREI"].copy()
    k["rd"] = pd.to_datetime(k.release_date)
    lim = {"0930": (9, 30), "1002": (10, 2)}[rule]
    k = k[k.rd <= pd.to_datetime(k.year.astype(str) + f"-{lim[0]:02d}-{lim[1]:02d}")]
    k = k.sort_values("rd").groupby("year").tail(1)
    k["v"] = (k.yield_lo + k.yield_hi) / 2
    b = NAT.base
    s = pd.Series({int(y): v / b.get(int(y), np.nan) - 1 for y, v in zip(k.year, k.v)})
    return s.dropna(), k.set_index("year")[["release", "release_date", "v"]]


# 8도 정답·면적
P8 = ST[ST.sc.isin(PROV)].set_index(["y", "sc"])


def wavg(df, col):
    w = [P8.area.get((y, s), np.nan) for y, s in zip(df.y, df.sc)]
    return df.assign(_w=w).groupby("y").apply(lambda g: np.average(g[col], weights=g._w))


A8 = wavg(ST[ST.sc.isin(PROV)].dropna(subset=["a"]), "a")          # 8도 실제 â (면적가중)
Y8 = wavg(ST[ST.sc.isin(PROV)].dropna(subset=["yield"]), "yield")  # 8도 실제 단수


# ---------------- 결합 가중 ----------------
def simplex_grid(K, step):
    n = int(round(1 / step))
    for c in itertools.product(range(n + 1), repeat=K - 1):
        if sum(c) <= n:
            yield np.array(list(c) + [n - sum(c)]) * step


GRID = {K: np.array(list(simplex_grid(K, 0.01 if K <= 3 else 0.02))) for K in (1, 2, 3, 4)}


def w_cls(H, a):
    """H: (n, K) 표본 밖 전국 â, a: (n,) 정답 → Σ=1, ≥0 최소제곱 (격자)."""
    G = GRID[H.shape[1]]
    sse = ((H @ G.T - a[:, None]) ** 2).sum(0)
    return G[np.argmin(sse)]


def w_ivar(H, a, yrs):
    hl = 0.5 ** ((yrs.max() - yrs) / 10.0)
    mse = (hl[:, None] * (H - a[:, None]) ** 2).sum(0) / hl.sum()
    w = 1 / mse
    return w / w.sum()


def combine(HN, names, rule, Y):
    """HN: DataFrame index y, columns 구성원 전국 â (NaN 가능). Y년 가중(이름→w)."""
    avail = [k for k in names if pd.notna(HN.loc[Y, k])] if Y in HN.index else []
    if not avail:
        return {}
    K = len(avail)
    eq = np.full(K, 1 / K)
    if rule == "eq":
        return dict(zip(avail, eq))
    tr = HN.loc[(HN.index >= 1996) & (HN.index < Y), avail].dropna()
    tr = tr[tr.index.isin(A8.index)]
    n = len(tr)
    if n < 5:
        return dict(zip(avail, eq))
    H, a = tr.values, A8.reindex(tr.index).values
    w = w_cls(H, a) if rule == "cls" else w_ivar(H, a, tr.index.values.astype(float))
    w = (n * w + N0 * eq) / (n + N0)
    return dict(zip(avail, w))


# ---------------- 한 변형 ----------------
def run_variant(asof, nrule, prule, kre=None):
    mem = load_members(asof)
    names = {"N1": ["M4"], "N2": ["M4", "FUNC", "PHENO"], "N3": ["M4", "FUNC", "PHENO"], "N4": ["M4", "FUNC", "PHENO"],
             "N5": ["M4", "FUNC", "PHENO", "KREI"], "N6": ["M4", "KREI"]}[nrule]
    rule = {"N1": "eq", "N2": "eq", "N3": "cls", "N4": "ivar", "N5": "cls", "N6": "eq"}[nrule]
    HN = pd.DataFrame({k: wavg(mem.dropna(subset=[k]), k) for k in ["M4", "FUNC", "PHENO"]})
    if kre is not None:
        HN["KREI"] = kre.reindex(HN.index)
    hN, wlog = {}, {}
    for Y in YEARS:
        if Y not in HN.index or pd.isna(HN.loc[Y, "M4"]):
            continue
        w = combine(HN, names, rule, Y)
        hN[Y] = sum(w[k] * HN.loc[Y, k] for k in w)
        wlog[Y] = {k: round(float(v), 3) for k, v in w.items()}
    hN = pd.Series(hN)
    m = mem[["y", "sc", "M4"]].dropna().copy()
    m["hM4"] = m.y.map(HN.M4)
    m["relM4"] = m.M4 - m.hM4
    m["hN"] = m.y.map(hN)
    m["a"] = [P8.a.get((y, s), np.nan) for y, s in zip(m.y, m.sc)]
    m["area"] = [P8.area.get((y, s), np.nan) for y, s in zip(m.y, m.sc)]
    m["rel"] = m.a - m.y.map(A8)
    m = m.dropna(subset=["hN"])
    out, klog = [], {}
    for Y in sorted(m.y.unique()):
        g = m[m.y == Y].copy()
        tr = m[(m.y < Y) & (m.y >= 1996)].dropna(subset=["rel"])
        if prule == "P0" or len(tr) == 0:
            kap = 1.0
        else:
            ks = np.round(np.arange(0, 1.01, 0.1), 1)
            kap = float(ks[np.argmin([(tr.area * (tr.rel - k * tr.relM4) ** 2).sum() for k in ks])])
        klog[int(Y)] = kap
        g["ahat"] = g.hN + kap * g.relM4
        if prule in ("P3", "P4") and len(tr):
            tr = tr.assign(res=tr.rel - kap * tr.relM4)
            if prule == "P3":
                win = tr[tr.y >= Y - 10]
                n = win.y.nunique()
                beta = win.groupby("sc").res.mean() * n / (n + N0)
            else:
                t2 = tr.sort_values("y").copy()
                t2["res_prev"] = t2.groupby("sc").res.shift(1)
                t2 = t2[t2.y >= 1997].dropna(subset=["res_prev"])
                ks = np.round(np.arange(0, 1.01, 0.1), 1)
                rho = float(ks[np.argmin([(t2.area * (t2.res - k * t2.res_prev) ** 2).sum() for k in ks])]) if len(t2) else 0.0
                last = tr[tr.y == Y - 1].set_index("sc").res
                beta = rho * last
                klog[int(Y)] = (kap, rho)
            g["ahat"] = g.ahat + g.sc.map(beta).fillna(0)
        out.append(g)
    p = pd.concat(out)[["y", "sc", "ahat"]]
    return p, hN, wlog, klog


def ratio_base(Y):
    """P2: b'_p = c × (직전 10년 평균 y_p/y_8도), Σ면적·b' = Σ면적·b (올림픽)."""
    yrs = [t for t in range(Y - 10, Y) if t in Y8.index]
    r = {s: np.mean([P8["yield"].get((t, s)) / Y8[t] for t in yrs]) for s in PROV}
    ar = {s: P8.area.get((Y, s)) for s in PROV}
    bo = {s: P8.base.get((Y, s)) for s in PROV}
    c = sum(ar[s] * bo[s] for s in PROV) / sum(ar[s] * r[s] for s in PROV)
    return {s: c * r[s] for s in PROV}


def to_pred(p, prule):
    """8도 â → (00 + 8도 예측 단수, 17시도 표)."""
    s = all_sido(p)
    if prule == "P2":
        for Y in s.y.unique():
            rb = ratio_base(int(Y))
            i = (s.y == Y) & s.sc.isin(PROV)
            s.loc[i, "pred_yield"] = s.loc[i, "sc"].map(rb) * (1 + s.loc[i, "ahat"])
    n = s.groupby("y").apply(lambda g: np.average(g.pred_yield, weights=g.area)).rename("pred_yield").reset_index()
    n["sc"] = "00"
    pred = pd.concat([n[["y", "sc", "pred_yield"]], s[s.sc.isin(PROV)][["y", "sc", "pred_yield"]]], ignore_index=True)
    return pred, s


VARIANTS = (
    [("0915", n, "P1", None) for n in ["N1", "N2", "N3", "N4"]] + [("0915", "N3", p, None) for p in ["P0", "P2", "P3", "P4"]]
    + [("0930", n, "P1", "0930") for n in ["N1", "N2", "N3", "N4", "N5", "N6"]] + [("0930", "N3", p, None) for p in ["P0", "P2", "P3", "P4"]]
    + [("0930", "N5", "P2", "0930"), ("0930", "N5", "P2", "1002"), ("0930", "N6", "P1", "1002")]
)
# [사후] 등록 21개 결과를 본 뒤 추가한 2개 (README에 사후로 표시)
POSTHOC = [("0915", "N1", "P2", None), ("0930", "N6", "P2", "0930")]
VARIANTS = VARIANTS + POSTHOC
# 출력 파일: 등록 주 구성 → *_primary, 권장 구성 → pred_sido_{asof}.csv
OUTFILES = {("0915", "N3", "P2", None): "0915_primary", ("0930", "N3", "P2", None): "0930_primary",
            ("0930", "N5", "P2", "0930"): "0930_krei_stack", ("0915", "N1", "P1", None): "0915", ("0930", "N6", "P1", "0930"): "0930"}

if __name__ == "__main__":
    res, lines = {}, []
    st_ = stat()
    sa = st_[st_.sc != "00"].merge(ST[["y", "sc", "area"]], on=["y", "sc"])
    r, s = score2(st_, "통계청 10월 예상", allsido=sa)
    res["STAT"] = r
    lines.append(s)
    kre = {k: krei(k) for k in ("0930", "1002")}
    print("KREI(≤9/30):", kre["0930"][1].to_string())
    for asof, nr, pr, kr in VARIANTS:
        lab = ("[사후] " if (asof, nr, pr, kr) in POSTHOC else "") + f"{asof} {nr}+{pr}" + (f" KREI≤{kr[:2]}/{kr[2:]}" if kr and nr in ("N5", "N6") else "")
        p, hN, wlog, klog = run_variant(asof, nr, pr, kre[kr][0] if (kr and nr in ("N5", "N6")) else None)
        pred, s17 = to_pred(p, pr)
        r, s = score2(pred, lab, allsido=s17)
        r["weights_last"] = {y: wlog.get(y) for y in (2013, 2020, 2025, 2026)}
        r["kappa"] = {y: klog.get(y) for y in (2013, 2020, 2025, 2026)}
        nat = pred[pred.sc == "00"].set_index("y").pred_yield
        r["nat_by_year"] = {int(y): round(float(nat[y] - NAT["yield"].get(y, np.nan)), 1) for y in nat.index if y >= 2010}
        r["pred_2026"] = pred[pred.y == 2026].set_index("sc").pred_yield.round(1).to_dict()
        res[lab] = r
        lines.append(s)
        print(s, flush=True)
        if (asof, nr, pr, kr) in OUTFILES:
            tag = OUTFILES[(asof, nr, pr, kr)]
            q = pred[pred.y >= 2010].sort_values(["y", "sc"]).round(2)
            q.to_csv(f"{HERE}/pred_sido_{tag}.csv", index=False)
            pd.DataFrame(wlog).T.to_csv(f"{HERE}/weights_{tag}.csv")
    json.dump(res, open(f"{HERE}/results.json", "w"), ensure_ascii=False, indent=1, default=float)
    open(f"{HERE}/results_table.txt", "w").write("\n".join(lines) + "\n")
