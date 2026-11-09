"""통계청 '쌀 예상생산량조사 결과' 보도자료 PDF(pdftotext -layout) → 시도별 논벼 예상 10a당·면적·생산량 (현백률 92.9%)."""
import re
import sys

NAMES = ["전국", "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주"]
NUM = r"△?-?[\d,]+(?:\.\d+)?|-"


def num(s):
    s = s.replace(",", "")
    if s in ("-", ""):
        return None
    neg = s.startswith("△")
    v = float(s.lstrip("△"))
    return -v if neg else v


def parse(txt):
    lines = txt.splitlines()
    # 논벼 예상생산량 표 머리
    start = next(i for i, l in enumerate(lines) if re.search(r"논\s*벼\s*예\s*상", l))
    out = {}
    for l in lines[start:start + 80]:
        m = re.match(r"^\s*(?:-\s*)?([가-힣]+)(?:\d\)|\*)?\s+((?:(?:%s)\s+){6,}(?:%s))\s*$" % (NUM, NUM), l)
        if not m:
            continue
        nm = m.group(1)
        key = nm
        if key not in NAMES or key in out:
            continue
        toks = m.group(2).split()
        out[key] = (nm, toks)
        if len(out) >= 17 and "제주" in out:
            break
    return start, out


if __name__ == "__main__":
    for f in sys.argv[1:]:
        st, o = parse(open(f, encoding="utf-8", errors="replace").read())
        print(f, st, len(o), {k: v[1] for k, v in list(o.items())[:2]}, [k for k in NAMES if k not in o])
