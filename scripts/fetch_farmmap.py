"""팜맵 오픈API(농식품팜맵, agis.epis.or.kr)의 WFS로 전국 팜맵 필지(경계+속성)를 받아 db/raw/farmmap/<판>/에 쌓는다.

필지 면적 분포·모양·집적 지표(build_farmmap.py)와 자세히 보기 필지 타일의 원자료다. 원자료는 이 PC에만 둔다.

WFS (2026-10 확인, 명세서: 팜맵 사이트 FarmOpenAPI.zip의 '붙임1.팜맵오픈API 명세서')
- https://agis.epis.or.kr/ASD/farmmapApi/wfs.do, typename=farm_map_api, version 2.0.0, outputformat=json.
  https만 응답한다. srsname이 없으면 오류.
- 키는 .env FARM_MAP_API_KEY. domain은 키에 등록한 'http://ag-rstat.vercel.app'(http:// 필수, https면 거절).
- 한 번에 최대 200건(count), 요청 하나에 6~10초. 경계를 빼도 시간은 같다 → 요청 수가 곧 시간이다.
- sortby=asc는 팜맵ID가 아니라 내부 번호 gid(응답 feature id 'farm_map_api.<gid>') 순이다. propertyname에 gid는
  못 넣지만 filter에는 쓸 수 있다 → 'gid > 마지막 gid'로 이어 받는다(startindex를 깊게 넘기지 않는다).
- 속성 이름은 명세서 기준(clsf_nm 농경지분류, area 면적, fl_armt_yn 경지정리여부, shape 경계). 매뉴얼 그림과 다르다.

나누어 받기
- 시도(법정동 코드 앞 두 자리, stdg_cd LIKE '41*')마다 gid 최소·최대를 보고, 약 CHUNK건씩 gid 구간으로 나눈다.
  구간마다 '<시도>_<번호>.jsonl.gz'(한 줄에 필지 하나)와 진행 상태 '.state.json'(마지막 gid, 건수, 끝남)을 둔다.
- 구간들을 WORKERS개씩 동시에 받는다. 끊겼다 다시 실행하면 끝난 구간은 건너뛰고 마지막 gid 다음부터 잇는다.
  쓰기와 상태 저장 사이에 끊기면 같은 필지가 두 번 들어갈 수 있다 → build_farmmap.py가 gid로 중복을 지운다.
- 좌표는 EPSG:5179, 소수 둘째 자리(cm)로 줄여 저장한다.

실행: python scripts/fetch_farmmap.py [시도코드 ...] [--workers 4] [--tag 2026]
      예) python scripts/fetch_farmmap.py 36        (세종만)
      systemd로 오래 돌릴 때: systemd-run --user --unit=farmmap-collect <venv python> scripts/fetch_farmmap.py
"""
import argparse
import gzip
import json
import math
import os
import sys
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
from concurrent.futures import ThreadPoolExecutor

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "db", "raw", "farmmap")
WFS = "https://agis.epis.or.kr/ASD/farmmapApi/wfs.do"
DOMAIN = "http://ag-rstat.vercel.app"
PROPS = "id,uid,clsf_nm,stdg_cd,stdg_addr,pnu,ldcg_cd,area,cad_con_ra,flight_ymd,updt_ymd,updt_tp_nm,fl_armt_yn,shape"
PAGE = 200
CHUNK = 40000
# 법정동 시도 코드 (강원 51·전북 52 특별자치도)
SIDOS = ["11", "26", "27", "28", "29", "30", "31", "36", "41", "43", "44", "46", "47", "48", "50", "51", "52"]

log_lock = threading.Lock()


def log(msg):
    with log_lock:
        print(time.strftime("%m-%d %H:%M:%S"), msg, flush=True)


def load_key():
    with open(os.path.join(ROOT, ".env"), encoding="utf-8") as f:
        for line in f:
            if line.startswith("FARM_MAP_API_KEY="):
                return line.split("=", 1)[1].strip()
    sys.exit("FARM_MAP_API_KEY가 .env에 없습니다")


KEY = load_key()


def like(sido):
    return ('<PropertyIsLike wildCard="*" singleChar="." escapeChar="!"><ValueReference>stdg_cd</ValueReference>'
            f"<Literal>{sido}*</Literal></PropertyIsLike>")


def gid_cmp(op, v):
    return f"<{op}><ValueReference>gid</ValueReference><Literal>{v}</Literal></{op}>"


def wfs(filter_xml, props, count, sort="asc"):
    q = {
        "service": "wfs", "version": "2.0.0", "request": "GetFeature", "typename": "farm_map_api",
        "outputformat": "json", "srsname": "EPSG:5179", "sortby": sort, "count": str(count),
        "propertyname": props, "apiKey": KEY, "domain": DOMAIN, "filter": f"<Filter>{filter_xml}</Filter>",
    }
    url = WFS + "?" + urllib.parse.urlencode(q, quote_via=urllib.parse.quote)
    wait = 10
    for attempt in range(12):
        try:
            with urllib.request.urlopen(url, timeout=180) as r:
                d = json.loads(r.read().decode("utf-8"))
            if "features" in d:
                return d
            err = (d.get("status") or {}).get("errorMsg", str(d)[:200])
        except (urllib.error.URLError, TimeoutError, ConnectionError, json.JSONDecodeError) as e:
            err = f"{type(e).__name__}: {e}"
        log(f"  재시도 {attempt + 1}: {err}")
        time.sleep(wait)
        wait = min(wait * 2, 1800)
    raise RuntimeError(f"WFS 실패: {err}")


def gid_of(feature):
    return int(feature["id"].rsplit(".", 1)[1])


def rnd(coords):
    if isinstance(coords[0], (int, float)):
        return [round(coords[0], 2), round(coords[1], 2)]
    return [rnd(c) for c in coords]


def plan(sido, tagdir):
    """시도의 gid 구간 목록. 처음 한 번만 계산해 plan_<시도>.json에 남긴다."""
    path = os.path.join(tagdir, f"plan_{sido}.json")
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    lo = wfs(like(sido), "id", 1, "asc")
    hi = wfs(like(sido), "id", 1, "desc")
    total = lo["numberMatched"]
    if not total:
        chunks = []
    else:
        g0, g1 = gid_of(lo["features"][0]), gid_of(hi["features"][0])
        k = max(1, math.ceil(total / CHUNK))
        step = (g1 - g0 + 1) / k
        edges = [g0 - 1 + round(step * i) for i in range(k)] + [g1]
        chunks = [{"name": f"{sido}_{i:03d}", "after": edges[i], "upto": edges[i + 1]} for i in range(k)]
    p = {"sido": sido, "total": total, "chunks": chunks, "planned": time.strftime("%Y-%m-%d %H:%M")}
    with open(path, "w", encoding="utf-8") as f:
        json.dump(p, f, ensure_ascii=False, indent=1)
    log(f"{sido}: {total:,}필지, 구간 {len(chunks)}개")
    return p


def run_chunk(c, tagdir):
    data = os.path.join(tagdir, c["name"] + ".jsonl.gz")
    spath = os.path.join(tagdir, c["name"] + ".state.json")
    st = {"last": c["after"], "n": 0, "done": False}
    if os.path.exists(spath):
        with open(spath, encoding="utf-8") as f:
            st = json.load(f)
    if st["done"]:
        return st["n"]
    sido = c["name"].split("_")[0]
    t0 = time.time()
    while True:
        flt = f"<And>{like(sido)}{gid_cmp('PropertyIsGreaterThan', st['last'])}{gid_cmp('PropertyIsLessThanOrEqualTo', c['upto'])}</And>"
        d = wfs(flt, PROPS, PAGE)
        feats = d["features"]
        if feats:
            with gzip.open(data, "at", encoding="utf-8") as out:
                for ft in feats:
                    g = ft.get("geometry")
                    rec = {"gid": gid_of(ft), **ft["properties"],
                           "geometry": {"type": g["type"], "coordinates": rnd(g["coordinates"])} if g else None}
                    out.write(json.dumps(rec, ensure_ascii=False, separators=(",", ":")) + "\n")
            st["last"] = max(gid_of(ft) for ft in feats)
            st["n"] += len(feats)
        if len(feats) < PAGE:
            st["done"] = True
        with open(spath + ".tmp", "w", encoding="utf-8") as f:
            json.dump(st, f)
        os.replace(spath + ".tmp", spath)
        if st["done"]:
            log(f"{c['name']} 끝: {st['n']:,}필지 ({(time.time() - t0) / 60:.0f}분)")
            return st["n"]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("sidos", nargs="*", default=SIDOS)
    ap.add_argument("--workers", type=int, default=4)
    ap.add_argument("--tag", default=time.strftime("%Y"))
    a = ap.parse_args()
    tagdir = os.path.join(RAW, a.tag)
    os.makedirs(tagdir, exist_ok=True)

    plans = [plan(s, tagdir) for s in a.sidos]
    chunks = [c for p in plans for c in p["chunks"]]
    # 큰 시도부터 섞어 받도록 구간 번호 순 → 시도 순으로 고르게 늘어놓는다
    chunks.sort(key=lambda c: (int(c["name"].split("_")[1]), c["name"]))
    log(f"구간 {len(chunks)}개, 예상 {sum(p['total'] for p in plans):,}필지, 동시 {a.workers}")
    with ThreadPoolExecutor(a.workers) as ex:
        got = sum(ex.map(lambda c: run_chunk(c, tagdir), chunks))
    for p in plans:
        n = 0
        for c in p["chunks"]:
            with open(os.path.join(tagdir, c["name"] + ".state.json"), encoding="utf-8") as f:
                n += json.load(f)["n"]
        mark = "" if n == p["total"] else f"  ← 계획 {p['total']:,}와 다름"
        log(f"{p['sido']}: {n:,}필지{mark}")
    log(f"모두 끝: {got:,}필지")


if __name__ == "__main__":
    main()
