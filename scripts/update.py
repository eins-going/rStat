"""자료 수집 계획(scripts/update_plan.toml)을 따라 이 PC에서 자료를 갱신하고, 검사를 통과하면 배포한다.

  python scripts/update.py status            자료별 마지막 실행·자료 시점·다음 할 일 (docs/data_sources.md도 다시 쓴다)
  python scripts/update.py run               때가 된 자료만: auto는 일정이 지났으면, manual은 새 원자료 파일이 보이면
  python scripts/update.py run kepco --force 지금 바로 (때와 상관없이)
  python scripts/update.py run --no-push     커밋까지만 (확인용)
  python scripts/update.py mark facilities   수동 자료를 '확인함(새 자료 없음)'으로 기록해 알림을 미룬다

매일 systemd 사용자 타이머(rstat-update.timer)가 `run`을 부른다. PC가 꺼져 있던 날은 켜진 뒤 따라잡는다.
- 명령이 실패하거나 검사(check)를 통과하지 못하면 outputs를 되돌리고 배포하지 않는다.
- outputs가 실제로 바뀌었으면 그 파일과 docs/data_sources.md만 커밋해 main에 푸시한다(Vercel 자동 배포).
- 결과는 데스크톱 알림(notify-send)과 db/update_logs/에 남긴다. 상태는 db/update_state.json.
- 자료 수집 현황 화면(status.html)용 data/status.js와 docs/data_sources.md를 함께 쓰고, 실행한 자료가 있으면 커밋·푸시한다.
"""
import argparse
import datetime as dt
import glob
import hashlib
import json
import os
import shutil
import subprocess
import sys
import tomllib
import unicodedata
from fnmatch import fnmatch

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PLAN = os.path.join(ROOT, "scripts", "update_plan.toml")
STATE = os.path.join(ROOT, "db", "update_state.json")
LOGS = os.path.join(ROOT, "db", "update_logs")
DOC = os.path.join(ROOT, "docs", "data_sources.md")
STATUS_JS = os.path.join(ROOT, "data", "status.js")  # 자료 수집 현황 화면(status.html)이 읽는다
METHOD = {"auto": "자동", "manual": "수동 파일", "event": "개편 때", "live": "실시간"}


# ---------------------------------------------------------------- 상태·계획
def load_plan():
    with open(PLAN, "rb") as fh:
        return tomllib.load(fh)["source"]


def load_state():
    if os.path.exists(STATE):
        with open(STATE, encoding="utf-8") as fh:
            return json.load(fh)
    return {}


def save_state(state):
    os.makedirs(os.path.dirname(STATE), exist_ok=True)
    tmp = STATE + ".tmp"
    with open(tmp, "w", encoding="utf-8") as fh:
        json.dump(state, fh, ensure_ascii=False, indent=1)
    os.replace(tmp, STATE)


def now():
    return dt.datetime.now().strftime("%Y-%m-%d %H:%M")


def notify(title, body=""):
    print(f"[알림] {title} {body}".strip())
    if shutil.which("notify-send"):
        subprocess.run(["notify-send", "-a", "rStat 자료 갱신", title, body[:500]], check=False)


# ---------------------------------------------------------------- 자료 읽기 (window.X = {...};)
def read_js(path):
    path = os.path.join(ROOT, path)
    if not os.path.exists(path):
        return None
    with open(path, encoding="utf-8") as fh:
        text = fh.read()
    body = text[text.index("= ") + 2:text.rstrip().rindex(";")]
    return json.loads(body)


def content(path, raw):
    """바뀌었는지 볼 내용: .js 자료는 작성일(built·updated)을 뺀 값, 나머지는 바이트 그대로."""
    if raw is None or not path.endswith(".js"):
        return raw
    try:
        text = raw.decode("utf-8")
        d = json.loads(text[text.index("= ") + 2:text.rstrip().rindex(";")])
        return {k: v for k, v in d.items() if k not in ("built", "updated")} if isinstance(d, dict) else d
    except ValueError:
        return raw


def latest(v):
    """기간 표기(문자열·목록·사전)에서 가장 늦은 값."""
    if isinstance(v, list):
        return max(map(latest, v)) if v else ""
    if isinstance(v, dict):
        return max(map(latest, v.values())) if v else ""
    return str(v)


# ---------------------------------------------------------------- 검사: (통과 여부, 바뀐 점, 문제)
def check_kosis(old, new):
    changes, problems = [], []
    for key, val in new["periods"].items():
        a, b = latest(old["periods"].get(key, "")) if old else "", latest(val)
        if old and b < a:
            problems.append(f"{key} 시점이 뒤로 갔다 ({a} → {b})")
        elif a != b:
            changes.append(f"{key} {a or '–'} → {b}")
    n_old = len(old["v"].get("households", {})) if old else 0
    n_new = len(new["v"].get("households", {}))
    if n_new < n_old - 2:
        problems.append(f"농가 수 지역이 줄었다 ({n_old} → {n_new})")
    return not problems, changes, problems


def check_kepco(old, new):
    changes, problems = [], []
    a, b = (old["months"][-1] if old else ""), new["months"][-1]
    if b < a:
        problems.append(f"마지막 달이 뒤로 갔다 ({a} → {b})")
    elif a != b:
        changes.append(f"사용량 {a or '–'} → {b}")
    i = len(new["months"]) - 1
    units = [k for k, v in new["v"].items() if "|" in k and v.get("k") and v["k"][i] is not None]
    if len(units) < 160:
        problems.append(f"마지막 달 시군이 {len(units)}곳뿐이다")
    nat = new["v"]["00"]["k"][i]
    tot = sum(new["v"][k]["k"][i] for k in units)
    if nat and abs(tot - nat) / nat > 0.05:
        problems.append(f"시군 합이 전국과 5% 넘게 다르다 ({tot:,} / {nat:,} MWh)")
    return not problems, changes, problems


def check_logistics(old, new):
    a, b = (old["years"][-1] if old else 0), new["years"][-1]
    if b < a:
        return False, [], [f"마지막 연도가 뒤로 갔다 ({a} → {b})"]
    return True, ([f"물류기기 {a or '–'} → {b}년"] if a != b else ["같은 연도 자료 갱신"]), []


def check_facilities(old, new):
    a, b = (len(old["rows"]) if old else 0), len(new["rows"])
    if b < a * 0.9:
        return False, [], [f"시설이 10% 넘게 줄었다 ({a:,} → {b:,})"]
    return True, ([f"시설 {a:,} → {b:,}곳"] if a != b else []), []


CHECKS = {"kosis": ("data/data.js", check_kosis), "kepco": ("data/power.js", check_kepco),
          "logistics": ("data/logistics.js", check_logistics), "facilities": ("data/facilities.js", check_facilities)}


def period_of(src):
    """status에 보일 자료 시점."""
    if src["id"].startswith("kosis_") and src.get("dataset"):
        return dataset_period(src["dataset"][0])
    try:
        if src["id"] == "kosis":
            p = read_js("data/data.js")["periods"]
            return f"가축 {p['livestock']} · 농가 {latest(p['farm'])} · 예산 {latest(p['budget'])}"
        if src["id"] == "kepco":
            return f"{read_js('data/power.js')['months'][-1]}까지"
        if src["id"] == "logistics":
            return f"{read_js('data/logistics.js')['years'][-1]}년까지"
        if src["id"] == "facilities":
            d = read_js("data/facilities.js")
            return f"{len(d['rows']):,}곳 · {d['built']} 작성"
        if src["id"] == "agrix_corp":
            import duckdb
            c = duckdb.connect(os.path.join(ROOT, "db", "agrix.duckdb"), read_only=True)
            return f"{c.sql('SELECT max(year) FROM corp_sgg').fetchone()[0]}년까지"
        if src["id"] == "geo":
            return "2013 경계 + 현행 시군 규칙"
    except Exception as e:  # 자료가 없거나 읽지 못하면 비워 둔다
        return f"(읽지 못함: {type(e).__name__})"
    return ""


# ---------------------------------------------------------------- 때가 되었나
def match_files(pattern):
    """glob과 같되 파일 이름의 한글 정규화(NFD·NFC)를 가리지 않는다 (맥에서 받은 파일은 NFD로 저장된다)."""
    nfc = lambda t: unicodedata.normalize("NFC", t)  # noqa: E731
    d, pat = os.path.split(os.path.join(ROOT, pattern))
    if not os.path.isdir(d):
        return []
    return sorted(os.path.join(d, f) for f in os.listdir(d) if fnmatch(nfc(f), nfc(pat)))


def input_sig(src):
    files = sorted({f for g in src.get("inputs", []) for f in match_files(g)})
    h = hashlib.sha1()
    for f in files:
        st = os.stat(f)
        h.update(f"{os.path.relpath(f, ROOT)}|{st.st_size}|{int(st.st_mtime)}\n".encode())
    return h.hexdigest()[:12], len(files)


def due_date(src, today):
    """auto 자료의 이번 주기 기준일 (이 날짜 이후 성공 기록이 없으면 때가 된 것)."""
    s = src["schedule"]
    if s["kind"] == "monthly":
        d = today.replace(day=min(s["day"], 28))
        return d if today >= d else (d.replace(day=1) - dt.timedelta(days=1)).replace(day=min(s["day"], 28))
    if s["kind"] == "yearly":
        cands = [dt.date(y, m, s.get("day", 1)) for y in (today.year - 1, today.year) for m in s["months"]]
        return max(c for c in cands if c <= today)
    raise ValueError(s)


def next_due(src, today):
    """오늘 뒤에 오는 첫 기준일."""
    s = src["schedule"]
    if s["kind"] == "monthly":
        d = today.replace(day=min(s["day"], 28))
        return d if d > today else (d.replace(day=1) + dt.timedelta(days=32)).replace(day=min(s["day"], 28))
    cands = [dt.date(y, m, s.get("day", 1)) for y in (today.year, today.year + 1) for m in s["months"]]
    return min(c for c in cands if c > today)


def is_due(src, st, today):
    if src["method"] == "auto":
        last = st.get("last_ok")
        d = due_date(src, today)
        if not last or dt.date.fromisoformat(last[:10]) < d:
            return True
        # 공표 대기: 정한 날에 새 자료가 없었으면 retry_days 동안 1주마다 다시 본다
        return bool(src.get("retry_days") and st.get("waiting") == str(d)
                    and today <= d + dt.timedelta(days=src["retry_days"])
                    and dt.date.fromisoformat(last[:10]) <= today - dt.timedelta(days=7))
    if src["method"] == "manual":
        sig, n = input_sig(src)
        return n > 0 and st.get("input_sig") not in (None, sig)
    return False


def remind_due(src, st, today):
    """수동 자료의 '새 자료 확인' 알림 때가 되었나 (마지막 확인·반영 이후 remind.months가 지났나)."""
    if src["method"] != "manual" or "remind" not in src:
        return False
    last = max(filter(None, [st.get("last_ok", ""), st.get("last_mark", ""), st.get("baseline", "")]), default="")
    if not last:
        return True
    d = dt.date.fromisoformat(last[:10])
    months = src["remind"]["months"]
    return (today.year - d.year) * 12 + today.month - d.month >= months


# ---------------------------------------------------------------- 실행
def git(*args, check=True):
    return subprocess.run(["git", *args], cwd=ROOT, check=check, capture_output=True, text=True)


def run_source(src, st, push=True):
    sid = src["id"]
    os.makedirs(LOGS, exist_ok=True)
    log_path = os.path.join(LOGS, f"{dt.date.today()}_{sid}.log")
    outputs = src.get("outputs", [])
    before = {p: open(os.path.join(ROOT, p), "rb").read() if os.path.exists(os.path.join(ROOT, p)) else None for p in outputs}
    old = read_js(CHECKS[src["check"]][0]) if src.get("check") in CHECKS else None
    st["last_run"] = now()

    def restore():
        for p, b in before.items():
            if b is not None:
                with open(os.path.join(ROOT, p), "wb") as fh:
                    fh.write(b)

    with open(log_path, "a", encoding="utf-8") as log:
        for cmd in src.get("commands", []):
            log.write(f"\n$ {' '.join(cmd)}  ({now()})\n")
            log.flush()
            r = subprocess.run([sys.executable, *cmd], cwd=ROOT, stdout=log, stderr=subprocess.STDOUT, timeout=4 * 3600)
            if r.returncode:
                restore()
                st.update(status="실패", message=f"{' '.join(cmd)} 종료 코드 {r.returncode} (로그 {os.path.relpath(log_path, ROOT)})")
                notify(f"{src['name']} 갱신 실패", st["message"])
                return False

    changes = []
    if src.get("check") in CHECKS:
        ok, changes, problems = CHECKS[src["check"]][1](old, read_js(CHECKS[src["check"]][0]))
        if not ok:
            restore()
            st.update(status="검사 실패", message="; ".join(problems))
            notify(f"{src['name']} 검사 실패 — 배포 안 함", st["message"])
            return False

    if src["method"] == "manual":
        st["input_sig"] = input_sig(src)[0]
    st["last_ok"] = now()
    def raw(p):
        f = os.path.join(ROOT, p)
        return open(f, "rb").read() if os.path.exists(f) else None
    changed = [p for p in outputs if content(p, raw(p)) != content(p, before[p])]
    # 작성일만 바뀐 파일은 원래대로 돌려 쓸데없는 배포를 막는다
    for p in outputs:
        if p not in changed and before[p] is not None and raw(p) != before[p]:
            with open(os.path.join(ROOT, p), "wb") as fh:
                fh.write(before[p])
    if not changed:
        if src.get("retry_days") and src["method"] == "auto":
            st.update(status="공표 대기", message="아직 새 자료가 없어 1주 뒤 다시 확인", waiting=str(due_date(src, dt.date.today())))
        else:
            st.update(status="변경 없음", message="; ".join(changes) or "새 자료 없음")
        return True
    st.pop("waiting", None)

    summary = "; ".join(changes) or "자료 갱신"
    st.update(status="갱신", message=summary, last_change=now())
    write_doc(load_plan(), STATE_CACHE)
    paths = changed + [os.path.relpath(DOC, ROOT), os.path.relpath(STATUS_JS, ROOT)]
    git("add", "--", *paths)
    r = git("commit", "-m", f"자동 갱신: {src['name']}\n\n{summary}\n\n(scripts/update.py, {now()})", "--", *paths, check=False)
    if r.returncode:
        st.update(status="커밋 실패", message=r.stderr.strip()[:300])
        notify(f"{src['name']} 커밋 실패", st["message"])
        return False
    st["commit"] = git("rev-parse", "--short", "HEAD").stdout.strip()
    if push:
        r = git("push", "-q", "origin", "main", check=False)
        if r.returncode:
            st.update(status="푸시 실패", message=r.stderr.strip()[:300])
            notify(f"{src['name']} 푸시 실패", st["message"])
            return False
        notify(f"{src['name']} 갱신·배포", summary)
    return True


# ---------------------------------------------------------------- 기록 문서
STATE_CACHE = {}


def write_doc(plan, state):
    today = dt.date.today()
    lines = ["# 자료 수집 현황", "",
             f"`python scripts/update.py status`가 {now()}에 만든 문서입니다. 계획은 `scripts/update_plan.toml`, "
             "실행은 이 PC의 systemd 사용자 타이머(`rstat-update.timer`, 매일)입니다.", "",
             "| 자료 | 화면 | 방식 | 자료 시점 | 마지막 성공 | 상태 | 다음 |", "|---|---|---|---|---|---|---|"]
    for src in plan:
        st = state.get(src["id"], {})
        nxt = next_text(src, st, today) or "–"
        lines.append(f"| {src['name']} | {src.get('page', '')} | {METHOD[src['method']]} | {period_of(src)} | {st.get('last_ok', '–')} | {st.get('status', '–')} | {nxt} |")
    lines += ["", "## 자동으로 받지 못하는 자료와 갱신 방법", ""]
    for src in plan:
        if src["method"] == "auto":
            continue
        lines.append(f"### {src['name']} ({METHOD[src['method']]})")
        if src.get("remind"):
            lines.append(f"- 확인 주기: {src['remind']['months']}개월 — {src['remind']['note']}")
        for h in src.get("how", []):
            lines.append(f"- {h}")
        if src.get("inputs"):
            lines.append(f"- 넣을 자리: {', '.join(f'`{g}`' for g in src['inputs'])}")
        if src.get("commands"):
            lines.append(f"- 반영 명령: {' → '.join(f'`{c[0]}`' for c in src['commands'])}")
        lines.append("")
    lines += ["## 자동 수집", ""]
    for src in plan:
        if src["method"] != "auto":
            continue
        s = src["schedule"]
        when = f"매월 {s['day']}일 이후" if s["kind"] == "monthly" else f"매년 {'·'.join(map(str, s['months']))}월 {s.get('day', 1)}일 이후"
        lines.append(f"- **{src['name']}**: {when} · {' → '.join(f'`{c[0]}`' for c in src['commands'])} · {src.get('note', '')}")
    os.makedirs(os.path.dirname(DOC), exist_ok=True)
    with open(DOC, "w", encoding="utf-8") as fh:
        fh.write("\n".join(lines) + "\n")
    write_status_js(plan, state)


def next_text(src, st, today):
    if src["method"] == "auto":
        if st.get("waiting") and is_due(src, st, today):
            return "곧 다시 확인"
        if st.get("waiting") == str(due_date(src, today)):
            nxt = dt.date.fromisoformat(st["last_ok"][:10]) + dt.timedelta(days=7)
            end = due_date(src, today) + dt.timedelta(days=src.get("retry_days", 0))
            if nxt <= end:
                return f"공표 대기 · {nxt} 다시 확인"
        if is_due(src, st, today):
            return "곧 실행"
        return f"{next_due(src, today)} 이후"
    if src["method"] == "manual":
        if is_due(src, st, today):
            return "새 파일 반영 대기"
        return "새 자료 확인 필요" if remind_due(src, st, today) else f"{src.get('remind', {}).get('months', '–')}개월마다 확인"
    return ""


def dataset_period(ds):
    """지표의 자료 시점 (update_plan.toml의 period)."""
    kind, _, arg = ds.get("period", "").partition(":")
    try:
        if kind == "kosis":
            v = read_js("data/data.js")["periods"][arg]
            if arg == "grdp":
                last = latest(v["years"])
                lag = sorted({y for y in v["bySido"].values() if y < last})
                return f"{last}년" + (f" (일부 시도 {lag[0]}년)" if lag else "")
            v = latest(v)
            return f"{v}년" if v.isdigit() else v
        if kind == "kepco":
            y, m = read_js("data/power.js")["months"][-1].split("-")
            return f"{y}년 {int(m)}월"
        if kind == "agrix":
            import duckdb
            c = duckdb.connect(os.path.join(ROOT, "db", "agrix.duckdb"), read_only=True)
            return f"{c.sql('SELECT max(year) FROM corp_sgg').fetchone()[0]}년"
        if kind == "logistics":
            return f"{read_js('data/logistics.js')['years'][-1]}년 1~11월"
        if kind == "fac":
            d = read_js("data/facilities.js")
            return f"{sum(1 for r in d['rows'] if r[0] == int(arg)):,}곳"
        if kind == "static":
            return arg
    except Exception as e:
        return f"(읽지 못함: {type(e).__name__})"
    return ""


def dataset_files(ds):
    out = []
    for f in match_files(ds["file"]) if ds.get("file") else []:
        st = os.stat(f)
        out.append({"name": unicodedata.normalize("NFC", os.path.basename(f)), "dir": os.path.dirname(os.path.relpath(f, ROOT)),
                    "size": st.st_size, "date": dt.date.fromtimestamp(st.st_mtime).isoformat()})
    return out


def write_status_js(plan, state):
    """status.html용: 자료별 수집일·상태, 파일로 넣는 자료는 지금 들어 있는 파일 목록."""
    today = dt.date.today()
    rows = []
    for src in plan:
        st = state.get(src["id"], {})
        files = []
        for g in src.get("inputs", []):
            for f in match_files(g):
                stt = os.stat(f)
                files.append({"name": unicodedata.normalize("NFC", os.path.basename(f)), "dir": os.path.dirname(os.path.relpath(f, ROOT)),
                              "size": stt.st_size, "date": dt.date.fromtimestamp(stt.st_mtime).isoformat()})
        rows.append({
            "id": src["id"], "name": src["name"], "page": src.get("page", ""), "method": src["method"],
            "methodText": METHOD[src["method"]], "period": period_of(src),
            "lastOk": st.get("last_ok"), "lastRun": st.get("last_run"), "lastChange": st.get("last_change"),
            "lastMark": st.get("last_mark"), "status": st.get("status"), "message": st.get("message"),
            "next": next_text(src, st, today), "schedule": src.get("schedule"), "remind": src.get("remind"),
            "how": src.get("how", []), "note": src.get("note", ""), "files": files,
        })
    # 지표별 표: 지표마다 수집 방식·주기·자료 시점·수집일·상태
    items = []
    for src in plan:
        st = state.get(src["id"], {})
        for ds in src.get("dataset", []):
            files = dataset_files(ds)
            manual = src["method"] == "manual" and not ds.get("auto")
            method = "자동" if (src["method"] == "auto" or ds.get("auto")) else METHOD[src["method"]]
            if src["method"] in ("event", "live"):
                collected, status = None, METHOD[src["method"]]
            elif manual:
                collected = max((f["date"] for f in files), default=None)
                status = "파일 없음" if not files else ("실패" if "실패" in (st.get("status") or "") else "반영됨")
            else:
                collected = (st.get("last_ok") or "")[:10] or None
                status = st.get("status") or "–"
            items.append({
                "name": ds["name"], "page": src.get("page", ""), "origin": ds.get("origin", ""), "method": method,
                "manual": manual, "freq": ds.get("freq", ""), "cadence": ds.get("cadence", ""), "period": dataset_period(ds),
                "collected": collected, "status": status, "where": ds.get("where", ""), "files": files,
                "next": next_text(src, st, today) if src["method"] in ("auto", "manual") else "",
                "source": src["id"],
            })
    data = {"generated": now(), "items": items, "sources": rows}
    with open(STATUS_JS, "w", encoding="utf-8") as fh:
        fh.write("// 자료 수집 현황 (scripts/update.py) — status.html이 읽는다\n")
        fh.write("window.AGRI_STATUS = ")
        json.dump(data, fh, ensure_ascii=False, separators=(",", ":"))
        fh.write(";\n")


# ---------------------------------------------------------------- 명령
def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("cmd", choices=["status", "run", "mark"])
    ap.add_argument("ids", nargs="*")
    ap.add_argument("--force", action="store_true", help="때와 상관없이 실행")
    ap.add_argument("--no-push", action="store_true", help="커밋까지만")
    a = ap.parse_args()

    plan = load_plan()
    state = load_state()
    STATE_CACHE.clear()
    STATE_CACHE.update(state)
    today = dt.date.today()
    by_id = {s["id"]: s for s in plan}
    for i in a.ids:
        if i not in by_id:
            raise SystemExit(f"계획에 없는 자료: {i} (있는 것: {', '.join(by_id)})")

    # 수동 자료는 처음 볼 때 지금 파일을 기준선으로 삼는다 (이미 반영된 파일을 다시 돌리지 않게)
    for src in plan:
        st = state.setdefault(src["id"], {})
        if src["method"] == "manual" and "input_sig" not in st:
            st["input_sig"] = input_sig(src)[0]
            st["baseline"] = now()

    if a.cmd == "mark":
        for i in a.ids:
            state[i]["last_mark"] = now()
            print(f"{by_id[i]['name']}: 확인함으로 기록")
    elif a.cmd == "run":
        targets = [by_id[i] for i in a.ids] if a.ids else plan
        ran = False
        for src in targets:
            st = state[src["id"]]
            if src["method"] in ("event", "live") and not (a.ids and a.force):
                continue
            if a.force or is_due(src, st, today):
                print(f"▶ {src['name']}")
                ran = True
                run_source(src, st, push=not a.no_push)
                print(f"  {st.get('status')}: {st.get('message')}")
                save_state(state)
            elif remind_due(src, st, today) and st.get("reminded", "")[:10] < str(today - dt.timedelta(days=7)):
                notify(f"{src['name']}: 새 자료 확인할 때", src["remind"]["note"] + " — 확인만 했으면 update.py mark " + src["id"])
                st["reminded"] = now()
    save_state(state)
    STATE_CACHE.clear()
    STATE_CACHE.update(state)
    write_doc(plan, state)
    # 자료를 하나라도 돌렸으면 현황(수집일·상태)도 배포한다
    if a.cmd == "run" and ran:
        paths = [os.path.relpath(DOC, ROOT), os.path.relpath(STATUS_JS, ROOT)]
        git("add", "--", *paths)
        if git("diff", "--cached", "--quiet", "--", *paths, check=False).returncode:
            git("commit", "-m", f"자료 수집 현황 기록 ({now()})", "--", *paths, check=False)
            if not a.no_push:
                git("push", "-q", "origin", "main", check=False)
    if a.cmd == "status":
        for src in plan:
            st = state.get(src["id"], {})
            flag = "때가 됨" if is_due(src, st, today) else ("확인 필요" if remind_due(src, st, today) else "")
            print(f"{src['id']:<11} {METHOD[src['method']]:<5} {period_of(src):<46} 마지막 {st.get('last_ok', '–'):<16} {st.get('status', ''):<6} {flag}")
        print(f"\n{os.path.relpath(DOC, ROOT)} 갱신")


if __name__ == "__main__":
    main()
