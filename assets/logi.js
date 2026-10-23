(() => {
  // 한눈에 보는 지역물류기기 사업동향 — 지역 체계·지도·순위는 지역농업 통계 대시보드(app.js)와 같다
  // 사업 예산 규모가 해마다 달라 절대량의 증감 대신 전국 대비 비중·구성비의 변화를 중심으로 보여준다
  const D = window.AGRI_LOGI;
  const T = window.AGRI_TOPO;
  const V = D.v;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ---------- 지역 체계: '00' 전국 · '31' 시도 · '31|수원시' 시군 ----------
  const NATION = "00";
  const SIDO_ORDER = ["31", "32", "33", "34", "35", "36", "37", "38", "39", "11", "21", "22", "23", "24", "25", "26", "29"];
  const SIDO_CODES = [...SIDO_ORDER.filter((c) => T.sidos[c]), ...Object.keys(T.sidos).filter((c) => !SIDO_ORDER.includes(c)).sort()];
  const GEOMS = T.objects.municipalities.geometries;
  const unitKeyOf = (g) => `${g.properties.sido}|${g.properties.unit}`;

  const unitRank = (name) => (name.endsWith("시부") ? 0 : name.endsWith("시") ? 1 : name.endsWith("구") ? 2 : 3);
  const UNITS_BY_SIDO = {};
  for (const g of GEOMS) {
    const list = (UNITS_BY_SIDO[g.properties.sido] ||= []);
    const k = unitKeyOf(g);
    if (!list.includes(k)) list.push(k);
  }
  for (const s of SIDO_CODES) {
    UNITS_BY_SIDO[s].sort((a, b) => {
      const [na, nb] = [a.split("|")[1], b.split("|")[1]];
      return unitRank(na) - unitRank(nb) || na.localeCompare(nb, "ko");
    });
  }

  const level = (k) => (k === NATION ? 0 : k.includes("|") ? 2 : 1);
  const sidoOf = (k) => (level(k) === 2 ? k.split("|")[0] : level(k) === 1 ? k : null);
  const parentOf = (k) => (level(k) === 2 ? sidoOf(k) : level(k) === 1 ? NATION : null);
  const childrenOf = (k) => (level(k) === 0 ? SIDO_CODES : level(k) === 1 ? UNITS_BY_SIDO[k] : []);
  const label = (k) => (k === NATION ? "전국" : level(k) === 1 ? T.sidos[k]?.name ?? k : k.split("|")[1]);
  const shortLabel = (k) => (level(k) === 1 ? T.sidos[k]?.short ?? k : label(k));
  // 다른 시도의 시군까지 섞일 때 쓰는 이름 (예: '경기 안성시')
  const fullLabel = (k) => (level(k) === 2 ? `${T.sidos[sidoOf(k)]?.short ?? ""} ${label(k)}` : shortLabel(k));
  const peersOf = (k) => (k === NATION ? [] : childrenOf(parentOf(k)));

  // ---------- 숫자 ----------
  const nf0 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const ok = (n) => n != null && !Number.isNaN(n) && Number.isFinite(n);
  const int = (n) => (ok(n) ? nf0.format(n) : "–");
  const pct = (n) => (ok(n) ? `${nf1.format(n)}%` : "–");
  // 점유율은 작은 값이 많아 1% 미만이면 소수 둘째 자리까지
  const pctS = (n) => (ok(n) ? `${Math.abs(n) < 1 ? nf2.format(n) : nf1.format(n)}%` : "–");
  const pp = (n) => (ok(n) ? `${n > 0 ? "+" : n < 0 ? "−" : ""}${Math.abs(n) < 1 ? nf2.format(Math.abs(n)) : nf1.format(Math.abs(n))}%p` : "–");
  const idx = (n) => (ok(n) ? nf0.format(n) : "–");
  const times = (v) => (ok(v) ? `${nf1.format(v)}배` : "–");
  const signed = (n) => (ok(n) ? `${n > 0 ? "+" : n < 0 ? "−" : ""}${nf2.format(Math.abs(n))}` : "–");

  function compact(n) {
    if (!ok(n)) return "–";
    const a = Math.abs(n);
    if (a >= 1e8) return `${nf1.format(n / 1e8)}억`;
    if (a >= 1e6) return `${nf0.format(n / 1e4)}만`;
    if (a >= 1e4) return `${nf1.format(n / 1e4)}만`;
    return nf0.format(n);
  }

  function countTo(el, target, format) {
    if (!el) return;
    if (!ok(target) || reduceMotion) {
      el.textContent = ok(target) ? format(target) : "–";
      el._v = target;
      return;
    }
    const from = ok(el._v) ? el._v : 0;
    el._v = target;
    const t0 = performance.now();
    cancelAnimationFrame(el._raf);
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 500);
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = format(from + (target - from) * e);
      if (k < 1) el._raf = requestAnimationFrame(step);
    };
    el._raf = requestAnimationFrame(step);
  }

  const setV = (key, value, format = int) => countTo($(`[data-v="${key}"]`), value, format);
  const setD = (key, html) => { const el = $(`[data-d="${key}"]`); if (el) el.innerHTML = html; };
  const setNote = (key, text) => {
    const el = $(`[data-note="${key}"]`);
    if (!el) return;
    el.textContent = text || "";
    const row = el.closest(".meter-row");
    if (row) row.title = text || "";
  };
  const setRank = (key, text) => { const el = $(`[data-rank="${key}"]`); if (el) el.textContent = text || ""; };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // 증감 표시: 값 차이(%p 또는 지수 포인트)
  function diffHTML(d, fmt = pp, title = "") {
    if (!ok(d)) return "";
    const cls = d > 0 ? "up" : d < 0 ? "down" : "";
    const arrow = d > 0 ? "▲" : d < 0 ? "▼" : "–";
    return `<span class="${cls}"${title ? ` title="${esc(title)}"` : ""}>${arrow} ${fmt(Math.abs(d)).replace(/^[+−]/, "")}</span>`;
  }

  // ---------- 연도 ----------
  const Y = D.years; // [2005, …, 2025], 값 배열은 이 순서
  const LAST = Y.length - 1;
  const state = { key: NATION, yi: LAST, cmp: 1, metric: null, group: null, rankScope: "local", dir: "out", flow: false, playing: null };
  const yearOf = (i) => Y[i];
  const baseI = () => (state.yi - state.cmp >= 0 ? state.yi - state.cmp : null);
  const yearText = () => `${yearOf(state.yi)}년 1~11월`;
  const cmpText = () => (baseI() == null ? "비교 시점 없음" : `${yearOf(baseI())}년 대비`);

  // ---------- 지표 계산 (i: 연도 위치) ----------
  const at = (arr, i) => (arr && i != null ? arr[i] ?? null : null);
  const has = (k, i = state.yi) => (at(V[k]?.c, i) ?? 0) > 0;
  const container = (k, i = state.yi) => (V[k] ? at(V[k].c, i) : null);
  const pallet = (k, i = state.yi) => (V[k] ? at(V[k].p, i) : null);
  const moves = (k, i = state.yi) => (V[k] ? at(V[k].n, i) : null);
  const share = (k, i = state.yi) => {
    const c = container(k, i), n = container(NATION, i);
    return ok(c) && n ? (c / n) * 100 : null;
  };
  const palShare = (k, i = state.yi) => {
    const c = pallet(k, i), n = pallet(NATION, i);
    return ok(c) && n ? (c / n) * 100 : null;
  };
  const inShare = (k, i = state.yi) => {
    const c = at(V[k]?.in, i), n = at(V[NATION]?.in, i);
    return ok(c) && n ? (c / n) * 100 : null;
  };
  const balance = (k, i = state.yi) => {
    if (k === NATION) return null;
    const o = container(k, i) ?? 0, n = at(V[k]?.in, i) ?? 0;
    return o + n > 0 ? (o - n) / (o + n) : null;
  };
  const permil = (name) => (k, i = state.yi) => { const v = at(V[k]?.[name], i); return v == null ? null : v / 10; };
  const catShare = (field, cat) => (k, i = state.yi) => {
    const j = D.cats[field].indexOf(cat);
    const v = at(V[k]?.[field]?.[j], i);
    return v == null ? null : v / 10;
  };
  const lot = (k, i = state.yi) => { const c = container(k, i), n = at(V[k]?.nc, i); return c && n ? c / n : null; };
  const pal100 = (k, i = state.yi) => { const c = container(k, i), p = pallet(k, i); return c ? ((p ?? 0) / c) * 100 : null; };
  const effCrops = (k, i = state.yi) => { const h = at(V[k]?.hhi, i); return h ? 10000 / h : null; };
  // 성수기 집중도: 이용량이 많은 세 달이 1~11월 합에서 차지하는 비중
  const peak3 = (k, i = state.yi) => {
    const m = at(V[k]?.mon, i);
    if (!m) return null;
    const tot = m.reduce((a, b) => a + b, 0);
    return tot ? ([...m].sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0) / tot) * 100 : null;
  };
  // 품목 특화도: 지역 안 비중 ÷ 전국 비중
  const cropLQ = (k, name, i = state.yi) => {
    const s = V[k]?.crops?.find((c) => c[0] === name)?.[1];
    const q = at(s, i), c = container(k, i), nq = at(D.cropNation[name], i), nc = container(NATION, i);
    return q && c && nq && nc ? (q / c) / (nq / nc) : null;
  };
  // 특화 품목: 지역 안 비중 3% 이상인 품목 가운데 특화도가 가장 높은 것 (전국은 없음)
  const spec = (k, i = state.yi) => {
    if (k === NATION || !has(k, i)) return null;
    const c = container(k, i);
    let best = null;
    for (const [name, s] of V[k].crops || []) {
      const q = at(s, i);
      if (!q || q / c < 0.03) continue;
      const lq = cropLQ(k, name, i);
      if (lq && (!best || lq > best[1])) best = [name, lq];
    }
    return best;
  };
  // 비교 시점 대비: 차이와 상대성장지수
  const diff = (fn) => (k) => { const b = baseI(); if (b == null) return null; const a = fn(k, state.yi), p = fn(k, b); return ok(a) && ok(p) ? a - p : null; };
  // 기준 해 점유율이 아주 작으면(0.02% 미만) 지수가 튀므로 계산하지 않는다
  const REL_MIN = 0.02;
  const rel = (k) => { const b = baseI(); if (b == null || k === NATION) return null; const a = share(k), p = share(k, b); return ok(a) && p >= REL_MIN ? (a / p) * 100 : null; };

  // ---------- 지도 지표 (묶음별) ----------
  // kind: seq 크기(한 색 명암) · div 증감(파랑-회색-빨강, mid 기준)
  const GROUPS = [
    { key: "pos", label: "위상" },
    { key: "flow", label: "지역 간 이동" },
    { key: "dest", label: "판로" },
    { key: "ship", label: "출하 주체" },
    { key: "equip", label: "기기·운영사" },
    { key: "crop", label: "품목·계절" },
  ];
  const M = (o) => ({ kind: "seq", ...o });
  const shareMetric = (group, key, lbl, get) => [
    M({ group, key, label: lbl, unit: "%", get, fmt: pct }),
    M({ group, key: `${key}D`, label: `${lbl} 변화`, unit: "%p", get: diff(get), fmt: pp, kind: "div", mid: 0, cmp: true }),
  ];
  const METRICS = [
    M({ group: "pos", key: "share", label: "전국 점유율", unit: "%", get: share, fmt: pctS }),
    M({ group: "pos", key: "shareD", label: "점유율 변화", unit: "%p", get: diff(share), fmt: pp, kind: "div", mid: 0, cmp: true }),
    M({ group: "pos", key: "rel", label: "상대성장지수", unit: "", get: rel, fmt: idx, kind: "div", mid: 100, cmp: true, log: true }),
    M({ group: "pos", key: "pshare", label: "파렛트 점유율", unit: "%", get: palShare, fmt: pctS }),
    M({ group: "pos", key: "container", label: "컨테이너 이용량(참고)", unit: "개", get: container, fmt: int }),
    M({ group: "flow", key: "inShare", label: "도착 점유율", unit: "%", get: inShare, fmt: pctS }),
    M({ group: "flow", key: "balance", label: "출하·도착 균형", unit: "", get: balance, fmt: signed, kind: "div", mid: 0, ends: ["받는 쪽", "보내는 쪽"] }),
    ...shareMetric("flow", "metro", "수도권 출하 비중", permil("metro")),
    ...shareMetric("flow", "same", "도내 출하 비중", permil("same")),
    M({ group: "flow", key: "inOwn", label: "도착량 중 도내 출발", unit: "%", get: permil("inOwn"), fmt: pct }),
    ...shareMetric("dest", "bigdc", "대형유통센터 비중", catShare("dest", "대형유통센터")),
    ...shareMetric("dest", "dc", "종합유통센터 비중", catShare("dest", "종합유통센터")),
    M({ group: "dest", key: "market", label: "도매시장 비중", unit: "%", get: catShare("dest", "도매시장"), fmt: pct }),
    M({ group: "dest", key: "factory", label: "식품가공공장 비중", unit: "%", get: catShare("dest", "식품가공공장"), fmt: pct }),
    ...shareMetric("ship", "corp", "농업회사법인 비중", catShare("ship", "농업회사법인")),
    ...shareMetric("ship", "assoc", "영농조합법인 비중", catShare("ship", "영농조합법인")),
    M({ group: "ship", key: "nh", label: "농협 비중", unit: "%", get: catShare("ship", "농협"), fmt: pct }),
    M({ group: "ship", key: "trader", label: "산지유통인 비중", unit: "%", get: catShare("ship", "산지유통인"), fmt: pct }),
    M({ group: "equip", key: "lot", label: "이동 1건당 컨테이너", unit: "개", get: lot, fmt: int }),
    M({ group: "equip", key: "pal100", label: "컨테이너 100개당 파렛트", unit: "개", get: pal100, fmt: (v) => (ok(v) ? nf1.format(v) : "–") }),
    M({ group: "equip", key: "kcp", label: "KCP 비중(컨테이너)", unit: "%", get: catShare("cpool", "KCP"), fmt: pct }),
    M({ group: "equip", key: "npc", label: "NPC 비중(컨테이너)", unit: "%", get: catShare("cpool", "NPC"), fmt: pct }),
    M({ group: "equip", key: "kpp", label: "KPP 비중(파렛트)", unit: "%", get: catShare("ppool", "KPP"), fmt: pct }),
    M({ group: "crop", key: "spec", label: "특화 품목 특화도", unit: "배", get: (k) => spec(k)?.[1] ?? null, fmt: times }),
    M({ group: "crop", key: "eff", label: "실질 품목 수", unit: "개", get: effCrops, fmt: (v) => (ok(v) ? nf1.format(v) : "–") }),
    M({ group: "crop", key: "peak", label: "성수기 집중도", unit: "%", get: peak3, fmt: pct }),
  ];
  const withUnit = (m, v) => `${m.fmt(v)}${m.unit && !["%", "%p", "배", ""].includes(m.unit) ? ` ${m.unit}` : ""}`;
  const metricYear = (m) => (m.cmp ? `${yearText()} · ${cmpText()}` : yearText());
  state.metric = METRICS[0];
  state.group = "pos";

  // ---------- 선택 상자 ----------
  const sidoSel = $("#sido");
  const sggSel = $("#sgg");
  const yearSel = $("#year");
  const cmpSel = $("#cmp");
  sidoSel.innerHTML = [`<option value="${NATION}">전국</option>`, ...SIDO_CODES.map((s) => `<option value="${s}">${T.sidos[s].name}</option>`)].join("");
  yearSel.innerHTML = Y.map((y, i) => `<option value="${i}">${y}년</option>`).reverse().join("");
  sidoSel.addEventListener("change", () => select(sidoSel.value));
  sggSel.addEventListener("change", () => select(sggSel.value));
  yearSel.addEventListener("change", () => { stopPlay(); setYear(+yearSel.value); });
  cmpSel.addEventListener("change", () => { state.cmp = +cmpSel.value; syncURL(); render(); });
  $("#reset").addEventListener("click", () => select(parentOf(state.key) ?? NATION));

  function syncControls() {
    const s = sidoOf(state.key);
    sidoSel.value = s || NATION;
    const units = s ? UNITS_BY_SIDO[s] : [];
    sggSel.innerHTML = [`<option value="${s || NATION}">전체</option>`, ...units.map((u) => `<option value="${u}">${label(u)}</option>`)].join("");
    sggSel.disabled = !s || units.length < 2;
    sggSel.value = level(state.key) === 2 ? state.key : s || NATION;
    yearSel.value = String(state.yi);
    cmpSel.value = String(state.cmp);
    const reset = $("#reset");
    reset.hidden = state.key === NATION;
    reset.textContent = level(state.key) === 2 ? `${T.sidos[s].name} 전체보기` : "전국보기";
  }

  function toHash(k) {
    if (k === NATION) return "";
    return `#${encodeURIComponent(level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`)}`;
  }

  function fromHash() {
    const [a, b] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = SIDO_CODES.find((c) => T.sidos[c].name === a || T.sidos[c].short === a);
    if (!s) return NATION;
    const u = b && UNITS_BY_SIDO[s].find((k) => label(k) === b);
    return u || s;
  }

  // 주소: #시도/시군 + ?y=연도&c=비교&m=지표
  function syncURL() {
    const q = new URLSearchParams(location.search);
    state.yi === LAST ? q.delete("y") : q.set("y", yearOf(state.yi));
    state.cmp === 1 ? q.delete("c") : q.set("c", state.cmp);
    state.metric === METRICS[0] ? q.delete("m") : q.set("m", state.metric.key);
    const s = q.toString();
    const url = `${location.pathname}${s ? `?${s}` : ""}${toHash(state.key)}`;
    if (url !== location.pathname + location.search + location.hash) history.replaceState(null, "", url);
  }

  function select(k) {
    state.key = k;
    syncControls();
    syncURL();
    render();
  }

  function setYear(i) {
    state.yi = Math.max(0, Math.min(LAST, i));
    syncControls();
    syncURL();
    render();
  }

  // 연도 재생: 2005년부터 한 해씩 넘긴다
  const playBtn = $("#play");
  function stopPlay() {
    if (!state.playing) return;
    clearInterval(state.playing);
    state.playing = null;
    playBtn.textContent = "▶";
    playBtn.setAttribute("aria-pressed", "false");
  }
  playBtn.addEventListener("click", () => {
    if (state.playing) { stopPlay(); return; }
    if (state.yi === LAST) setYear(0);
    playBtn.textContent = "❚❚";
    playBtn.setAttribute("aria-pressed", "true");
    state.playing = setInterval(() => {
      if (state.yi >= LAST) { stopPlay(); return; }
      setYear(state.yi + 1);
    }, 900);
  });

  // ---------- 차트 툴팁 ----------
  const ctip = $("#ctip");
  function showCtip(e, html) {
    ctip.innerHTML = html;
    ctip.hidden = false;
    const pad = 14;
    const w = ctip.offsetWidth, h = ctip.offsetHeight;
    let x = e.clientX + pad, y = e.clientY + pad;
    if (x + w > window.innerWidth - 8) x = e.clientX - w - pad;
    if (y + h > window.innerHeight - 8) y = e.clientY - h - pad;
    ctip.style.left = `${x}px`;
    ctip.style.top = `${y}px`;
  }
  const hideCtip = () => { ctip.hidden = true; };

  const COLORS = { cur: "#f5a524", grid: "#2f333b", faint: "#7d8490", text: "#eef0f3", panel: "#1d2026" };
  // 범주 색: 검증한 6색(어두운 바탕 #1d2026, 인접 쌍 CVD ΔE ≥ 8.4), 마지막은 '기타'
  const CAT = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#9085e9"];
  const OTHER = "#5a606b";
  // 풀 운영사는 컨테이너·파렛트 어느 쪽이든 같은 회사에 같은 색
  const POOL_COLOR = { KCP: CAT[0], NPC: CAT[1], SJL: CAT[2], KPN: CAT[3], KPP: CAT[4], AJN: CAT[5] };

  // ---------- 선 그래프: 연도별 한 줄, 고른 해 강조, 누르면 그 해로 ----------
  function lineChart(sel, values, fmt, name) {
    const el = $(sel);
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    const pts = Y.map((y, i) => ({ y, i, v: values?.[i] })).filter((d) => ok(d.v));
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`)
      .attr("role", "img").attr("aria-label", pts.length ? `${name} ${pts[0].y}년 ${fmt(pts[0].v)}에서 ${pts.at(-1).y}년 ${fmt(pts.at(-1).v)}` : "자료 없음");
    if (!pts.length) { svg.selectAll("*").remove(); return; }
    const m = { t: 14, r: 8, b: 14, l: 8 };
    const x = d3.scaleLinear().domain([Y[0], Y.at(-1)]).range([m.l, w - m.r]);
    const ext = d3.extent(pts, (d) => d.v);
    const pad = (ext[1] - ext[0]) * 0.15 || Math.abs(ext[1]) * 0.1 || 1;
    const y = d3.scaleLinear().domain([Math.max(0, ext[0] - pad), ext[1] + pad]).range([h - m.b, m.t]);
    const line = d3.line().x((d) => x(d.y)).y((d) => y(d.v)).curve(d3.curveMonotoneX);
    svg.selectAll("line.base").data([0]).join("line").attr("class", "base")
      .attr("x1", m.l).attr("x2", w - m.r).attr("y1", h - m.b + 0.5).attr("y2", h - m.b + 0.5).attr("stroke", COLORS.grid);
    svg.selectAll("path.line").data([pts]).join("path").attr("class", "line").attr("fill", "none")
      .attr("stroke", COLORS.cur).attr("stroke-width", 2).attr("d", line);
    const cur = pts.find((d) => d.i === state.yi);
    const base = pts.find((d) => d.i === baseI());
    const marks = [base, cur].filter(Boolean);
    svg.selectAll("circle.pt").data(marks).join("circle").attr("class", "pt")
      .attr("r", (d) => (d === cur ? 4.5 : 3.5)).attr("cx", (d) => x(d.y)).attr("cy", (d) => y(d.v))
      .attr("fill", (d) => (d === cur ? COLORS.cur : COLORS.panel)).attr("stroke", COLORS.cur).attr("stroke-width", 2);
    // 값 이름은 고른 해만 (비교 해는 툴팁·점으로)
    svg.selectAll("text.val").data(cur ? [cur] : []).join("text").attr("class", "val")
      .attr("x", (d) => Math.min(w - 4, Math.max(4, x(d.y)))).attr("y", (d) => Math.max(10, y(d.v) - 8))
      .attr("text-anchor", (d) => (x(d.y) > w - 40 ? "end" : x(d.y) < 40 ? "start" : "middle"))
      .attr("fill", (d) => (d === cur ? COLORS.text : "#9aa1ad")).attr("font-size", 11).attr("font-weight", (d) => (d === cur ? 700 : 500))
      .text((d) => fmt(d.v));
    yearAxis(svg, x, h, w);
    hoverLayer(svg, x, w, h, m, (i) => `<b>${Y[i]}년</b>${name} ${fmt(values?.[i])}`, (i) => [y(values?.[i])]);
  }

  // 연도 눈금: 처음·끝·고른 해
  function yearAxis(svg, x, h) {
    const ticks = [...new Set([0, LAST, state.yi])].map((i) => Y[i]);
    svg.selectAll("g.axis").data([0]).join("g").attr("class", "axis")
      .selectAll("text").data(ticks, (d) => d).join("text")
      .attr("x", (d) => x(d)).attr("y", h - 2)
      .attr("text-anchor", (d) => (d === Y[0] ? "start" : d === Y.at(-1) ? "end" : "middle"))
      .attr("fill", (d) => (d === Y[state.yi] ? COLORS.cur : COLORS.faint))
      .text((d) => (d === Y[0] || d === Y.at(-1) ? d : `'${String(d).slice(2)}`));
  }

  // 마우스 위치의 연도에 세로선·툴팁, 누르면 그 해로 옮긴다
  function hoverLayer(svg, x, w, h, m, html, ys = () => []) {
    const g = svg.selectAll("g.hover").data([0]).join("g").attr("class", "hover");
    const vline = g.selectAll("line").data([0]).join("line").attr("stroke", "#9aa1ad").attr("stroke-width", 1).attr("y1", m.t - 4).attr("y2", h - m.b).style("opacity", 0);
    const dots = g.selectAll("circle").data([0, 1, 2]).join("circle").attr("r", 3).attr("fill", COLORS.text).style("opacity", 0);
    const pick = (e) => {
      const [px] = d3.pointer(e, svg.node());
      const yr = Math.round(x.invert(px));
      return Math.max(0, Math.min(LAST, yr - Y[0]));
    };
    svg.selectAll("rect.hit").data([0]).join("rect").attr("class", "hit")
      .attr("x", 0).attr("y", 0).attr("width", w).attr("height", h).attr("fill", "transparent").style("cursor", "pointer")
      .on("mousemove", (e) => {
        const i = pick(e);
        vline.attr("x1", x(Y[i])).attr("x2", x(Y[i])).style("opacity", 0.5);
        const yy = ys(i).filter(ok);
        dots.each(function (d, j) { d3.select(this).attr("cx", x(Y[i])).attr("cy", yy[j] ?? 0).style("opacity", yy[j] != null ? 1 : 0); });
        showCtip(e, html(i));
      })
      .on("mouseleave", () => { vline.style("opacity", 0); dots.style("opacity", 0); hideCtip(); })
      .on("click", (e) => { stopPlay(); setYear(pick(e)); });
  }

  // ---------- 연도별 막대 (절대량 참고용) ----------
  function barChart(sel, values, fmt, name) {
    const el = $(sel);
    const w = el.clientWidth, h = el.clientHeight;
    if (!w || !h) return;
    const pts = Y.map((y, i) => ({ y, i, v: values?.[i] ?? null }));
    const known = pts.filter((d) => ok(d.v));
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`)
      .attr("role", "img").attr("aria-label", known.length ? `${name} ${known.map((d) => `${d.y}년 ${fmt(d.v)}`).join(", ")}` : "자료 없음");
    if (!known.length) { svg.selectAll("*").remove(); return; }
    const top = 12, bottom = 12;
    const x = d3.scaleBand().domain(Y).range([0, w]).paddingInner(0.25);
    const y = d3.scaleLinear().domain([0, d3.max(known, (d) => d.v) || 1]).range([h - bottom, top]);
    svg.selectAll("rect.bar").data(pts).join("rect").attr("class", "bar")
      .attr("x", (d) => x(d.y)).attr("width", x.bandwidth()).attr("rx", 1)
      .attr("y", (d) => (ok(d.v) ? y(d.v) : h - bottom)).attr("height", (d) => (ok(d.v) ? h - bottom - y(d.v) : 0))
      .attr("fill", (d) => (d.i === state.yi ? COLORS.cur : d.i === baseI() ? "#8a8f99" : "#4a505b"));
    const cur = pts[state.yi];
    svg.selectAll("text.val").data(ok(cur.v) ? [cur] : []).join("text").attr("class", "val")
      .attr("x", (d) => Math.min(w - 2, Math.max(2, x(d.y) + x.bandwidth() / 2))).attr("y", (d) => Math.max(9, y(d.v) - 3))
      .attr("text-anchor", (d) => (d.i > LAST - 3 ? "end" : d.i < 3 ? "start" : "middle"))
      .attr("fill", COLORS.text).attr("font-size", 10.5).attr("font-weight", 700).text((d) => fmt(d.v));
    const xl = d3.scaleLinear().domain([Y[0], Y.at(-1)]).range([x(Y[0]) + x.bandwidth() / 2, x(Y.at(-1)) + x.bandwidth() / 2]);
    yearAxis(svg, xl, h + 1);
    hoverLayer(svg, xl, w, h, { t: top, b: bottom }, (i) => `<b>${Y[i]}년</b>${name} ${fmt(values?.[i])}개`);
  }

  // ---------- 누적 영역 (구성비 추이, 합 100%) ----------
  function stackChart(sel, legendSel, names, colors, series) {
    const el = $(sel);
    const w = el.clientWidth, h = el.clientHeight;
    const legend = $(legendSel);
    const rows = Y.map((y, i) => {
      const r = { y, i };
      names.forEach((n, j) => { r[n] = at(series?.[j], i); });
      r.ok = names.some((n) => r[n] != null);
      return r;
    });
    // 지역에 한 번도 없는 범주는 범례에서 뺀다 (색은 범주에 붙어 있으므로 바뀌지 않는다)
    const present = names.filter((n, j) => series?.[j]?.some((v) => v > 0));
    legend.innerHTML = present.map((n) => `<span><i style="background:${colors[names.indexOf(n)]}"></i>${n}</span>`).join("");
    if (!w || !h) return;
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`).attr("role", "img");
    const data = rows.filter((r) => r.ok);
    if (!data.length) { svg.selectAll("*").remove(); svg.attr("aria-label", "자료 없음"); return; }
    const cur = rows[state.yi];
    svg.attr("aria-label", cur.ok ? `${Y[state.yi]}년 ${present.map((n) => `${n} ${pct(cur[n] / 10)}`).join(", ")}` : "자료 없음");
    const m = { t: 4, r: 4, b: 14, l: 4 };
    const x = d3.scaleLinear().domain([Y[0], Y.at(-1)]).range([m.l, w - m.r]);
    const y = d3.scaleLinear().domain([0, 1000]).range([h - m.b, m.t]);
    const stack = d3.stack().keys(names).value((r, k) => r[k] ?? 0)(data);
    const area = d3.area().x((d) => x(d.data.y)).y0((d) => y(d[0])).y1((d) => y(d[1])).curve(d3.curveMonotoneX);
    // 층 사이 2px 바탕색 틈
    svg.selectAll("path.layer").data(stack, (d) => d.key).join("path").attr("class", "layer")
      .attr("fill", (d) => colors[names.indexOf(d.key)]).attr("stroke", COLORS.panel).attr("stroke-width", 1).attr("d", area);
    svg.selectAll("line.sel").data([state.yi]).join("line").attr("class", "sel")
      .attr("x1", x(Y[state.yi])).attr("x2", x(Y[state.yi])).attr("y1", m.t).attr("y2", h - m.b)
      .attr("stroke", COLORS.text).attr("stroke-width", 1.5);
    yearAxis(svg, x, h);
    hoverLayer(svg, x, w, h, m, (i) => {
      const r = rows[i];
      if (!r.ok) return `<b>${Y[i]}년</b>자료 없음`;
      return `<b>${Y[i]}년</b>${names.map((n, j) => ({ n, v: r[n], c: colors[j] })).filter((d) => d.v > 0).sort((a, b) => b.v - a.v)
        .map((d) => `<span class="trow"><i style="background:${d.c}"></i>${d.n}<em>${pct(d.v / 10)}</em></span>`).join("")}`;
    });
  }

  // 비중 막대 한 줄: 이름 · 막대 · 비중 · 비교 시점 대비(%p)
  function shareRows(items, max = 100, opts = {}) {
    return items.map(({ name, cur, prev, color, title = "", key }) => {
      const d = ok(cur) && ok(prev) ? cur - prev : null;
      const cls = d == null ? "" : d > 0 ? "up" : d < 0 ? "down" : "";
      const txt = d == null ? (prev == null && baseI() != null && cur > 0 ? "신규" : "–") : `${d > 0 ? "▲" : d < 0 ? "▼" : ""}${nf1.format(Math.abs(d))}%p`;
      const tag = key ? "button" : "div";
      return `
        <${tag} ${key ? `type="button" data-go="${key}"` : ""} class="bar-row share-row${opts.wide ? " wide" : ""}${key ? " go" : ""}" title="${esc(title || `${name} · ${pct(cur)}${ok(prev) ? ` (${yearOf(baseI())}년 ${pct(prev)})` : ""}`)}">
          <span class="name">${color ? `<i class="sw" style="background:${color}"></i>` : ""}${esc(name)}</span>
          <span class="track"><span class="fill" style="width:${Math.max(0, Math.min(100, ((cur || 0) / max) * 100))}%${color ? `;background:${color}` : ""}"></span></span>
          <span class="val">${pct(cur)}</span><span class="chg ${cls}">${txt}</span></${tag}>`;
    }).join("");
  }
  const bindGo = (root) => $$("[data-go]", root).forEach((b) => b.addEventListener("click", () => {
    const k = b.dataset.go;
    if (V[k] || T.sidos[k] || UNITS_BY_SIDO[sidoOf(k)]?.includes(k)) select(k);
  }));

  // 구성 패널 공통: 범주 비중 행
  function catItems(field, colors, k = state.key) {
    const names = [...D.cats[field], "기타"];
    const s = V[k]?.[field];
    const b = baseI();
    return names.map((name, j) => ({ name, cur: at(s?.[j], state.yi) == null ? null : at(s[j], state.yi) / 10, prev: b == null || at(s?.[j], b) == null ? null : at(s[j], b) / 10, color: colors[j] }))
      .filter((d) => d.cur > 0 || d.prev > 0).sort((a, b2) => (b2.cur ?? 0) - (a.cur ?? 0));
  }

  // ---------- 지도 ----------
  const RAMP = ["#3b3428", "#5e4925", "#8a6322", "#c0841f", "#f5a524"];
  // 증감: 파랑(감소) - 회색(변화 없음) - 빨강(증가), 바탕에서 멀수록 진하다
  const DIV = ["#5fb3ff", "#2f5f93", "#3a3d44", "#93453b", "#ff6b5e"];
  const EMPTY = "#2a2d33";
  const mapSvg = d3.select("#map");
  const tip = $("#tip");
  const obj = T.objects.municipalities;

  const unitFeatures = Object.values(UNITS_BY_SIDO).flat().map((k) => ({
    type: "Feature",
    properties: { key: k, sido: sidoOf(k) },
    geometry: topojson.merge(T, GEOMS.filter((g) => unitKeyOf(g) === k)),
  }));
  const sidoFeatures = SIDO_CODES.map((s) => ({
    type: "Feature",
    properties: { key: s, sido: s },
    geometry: topojson.merge(T, GEOMS.filter((g) => g.properties.sido === s)),
  }));
  const sidoMesh = topojson.mesh(T, obj, (a, b) => a !== b && a.properties.sido !== b.properties.sido);
  const unitMesh = topojson.mesh(T, obj, (a, b) => a !== b && a.properties.sido === b.properties.sido && unitKeyOf(a) !== unitKeyOf(b));

  const K = Math.cos((36 * Math.PI) / 180);
  const BOUNDS = (() => {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    const walk = (c) => {
      if (typeof c[0] === "number") {
        x0 = Math.min(x0, c[0] * K); x1 = Math.max(x1, c[0] * K);
        y0 = Math.min(y0, c[1]); y1 = Math.max(y1, c[1]);
      } else c.forEach(walk);
    };
    sidoFeatures.forEach((f) => walk(f.geometry.coordinates));
    return { x0, x1, y0, y1 };
  })();

  const LABEL_AT = { 31: [127.45, 37.2] };
  let path = null;
  let size = { w: 0, h: 0 };
  let view = { k: 1, x: 0, y: 0 };
  const anchor = new Map();

  function labelPoint(f) {
    const g = f.geometry;
    if (!g) return [NaN, NaN];
    const polys = g.type === "MultiPolygon" ? g.coordinates : [g.coordinates];
    let best = null, bestA = -1;
    for (const c of polys) {
      const pf = { type: "Polygon", coordinates: c };
      const a = path.area(pf);
      if (a > bestA) { bestA = a; best = pf; }
    }
    return path.centroid(best);
  }

  function setGroup(g) {
    state.group = g;
    $$("#groups button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.g === g));
    renderChips();
    const first = METRICS.find((m) => m.group === g);
    if (state.metric.group !== g) setMetric(first);
    // 지역 간 이동 묶음을 고르면 흐름선을 켠다
    if (g === "flow" && !state.flow) setFlow(true);
  }

  function setMetric(m) {
    state.metric = m;
    if (m.group !== state.group) {
      state.group = m.group;
      $$("#groups button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.g === m.group));
      renderChips();
    }
    $$("#chips button").forEach((x) => x.setAttribute("aria-pressed", x.dataset.k === m.key));
    syncURL();
    paintMap();
    renderRank();
  }

  function setFlow(on) {
    state.flow = on;
    $("#flow-btn").setAttribute("aria-pressed", on);
    applyView(true);
  }

  function syncChipNav() {
    const bar = $("#chips");
    $("#chip-prev").disabled = bar.scrollLeft <= 1;
    $("#chip-next").disabled = bar.scrollLeft + bar.clientWidth >= bar.scrollWidth - 1;
  }

  function renderChips() {
    const bar = $("#chips");
    bar.innerHTML = METRICS.filter((m) => m.group === state.group)
      .map((m) => `<button type="button" data-k="${m.key}" aria-pressed="${m === state.metric}">${m.label}</button>`).join("");
    $$("#chips button").forEach((b) => b.addEventListener("click", () => setMetric(METRICS.find((m) => m.key === b.dataset.k))));
    bar.scrollLeft = 0;
    syncChipNav();
  }

  function initChips() {
    $("#groups").innerHTML = GROUPS.map((g) => `<button type="button" data-g="${g.key}" aria-pressed="${g.key === state.group}">${g.label}</button>`).join("");
    $$("#groups button").forEach((b) => b.addEventListener("click", () => setGroup(b.dataset.g)));
    const bar = $("#chips");
    const page = (d) => bar.scrollBy({ left: d * bar.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" });
    $("#chip-prev").addEventListener("click", () => page(-1));
    $("#chip-next").addEventListener("click", () => page(1));
    bar.addEventListener("scroll", syncChipNav, { passive: true });
    new ResizeObserver(syncChipNav).observe(bar);
    bar.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const btns = $$("#chips button");
      const i = btns.indexOf(document.activeElement);
      if (i < 0) return;
      e.preventDefault();
      const next = btns[Math.min(btns.length - 1, Math.max(0, i + (e.key === "ArrowLeft" ? -1 : 1)))];
      next.focus();
      next.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
    $("#flow-btn").addEventListener("click", () => setFlow(!state.flow));
    renderChips();
  }

  const FIT = window.matchMedia("(min-width: 1281px) and (min-height: 720px)");

  function drawMap() {
    const wrap = $("#map-wrap");
    const w = wrap.clientWidth;
    const h = FIT.matches ? Math.max(240, wrap.clientHeight) : Math.round(Math.max(380, Math.min(700, w * 0.92)));
    size = { w, h };
    const pad = 12;
    const bw = BOUNDS.x1 - BOUNDS.x0;
    const bh = BOUNDS.y1 - BOUNDS.y0;
    const s = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
    const ox = (w - bw * s) / 2;
    const oy = (h - bh * s) / 2;
    const project = (lon, lat) => [ox + (lon * K - BOUNDS.x0) * s, oy + (BOUNDS.y1 - lat) * s];
    path = d3.geoPath(d3.geoTransform({ point(lon, lat) { this.stream.point(...project(lon, lat)); } }));
    mapSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", FIT.matches ? null : h);
    anchor.clear();
    [...sidoFeatures, ...unitFeatures].forEach((f) => anchor.set(f.properties.key, labelPoint(f)));
    Object.entries(LABEL_AT).forEach(([k, ll]) => anchor.set(k, project(...ll)));

    const world = mapSvg.selectAll("g.world").data([0]).join("g").attr("class", "world");
    const bindRegion = (sel) => sel
      .attr("tabindex", 0).attr("role", "button")
      .on("mousemove", (e, d) => showTip(e, d.properties.key))
      .on("mouseleave", hideTip)
      .on("click", (e, d) => onRegionClick(d.properties.key))
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRegionClick(d.properties.key); } });
    bindRegion(world.selectAll("g.sidos").data([0]).join("g").attr("class", "sidos")
      .selectAll("path").data(sidoFeatures, (d) => d.properties.key).join("path")
      .attr("class", "region sido").attr("d", path));
    bindRegion(world.selectAll("g.units").data([0]).join("g").attr("class", "units")
      .selectAll("path").data(unitFeatures, (d) => d.properties.key).join("path")
      .attr("class", "region unit hidden").attr("d", path));
    world.selectAll("path.mesh-unit").data([unitMesh]).join("path").attr("class", "mesh-unit").attr("d", path);
    world.selectAll("path.mesh-sido").data([sidoMesh]).join("path").attr("class", "mesh-sido").attr("d", path);
    // 흐름선은 화면 좌표로 그린다 (확대해도 선 굵기·화살촉·이름 크기가 그대로)
    mapSvg.selectAll("g.flows").data([0]).join("g").attr("class", "flows");
    mapSvg.selectAll("g.labels").data([0]).join("g").attr("class", "labels");
    zoom.translateExtent([[-w / 2, -h / 2], [w * 1.5, h * 1.5]]);
    applyView(false);
  }

  // ---------- 확대·축소·이동 ----------
  // + − 버튼은 언제나, 끌기와 휠은 손 버튼을 켰을 때만 지도를 움직인다 (페이지 스크롤을 뺏지 않게)
  let panMode = false;
  let silent = false; // 지역 선택으로 시점을 옮길 때는 zoom 이벤트를 무시한다
  const zoom = d3.zoom()
    .scaleExtent([1, 48])
    .clickDistance(4)
    .filter((e) => !e.button && (e.type === "mousedown" || (panMode && (e.type === "wheel" || e.type === "touchstart"))))
    .on("start", (e) => { if (e.sourceEvent?.type !== "wheel") $("#map-wrap").classList.toggle("grabbing", !!e.sourceEvent); })
    .on("zoom", (e) => {
      if (silent) return;
      const t = e.transform;
      view = { k: t.k, x: t.x, y: t.y };
      mapSvg.select("g.world").interrupt().attr("transform", t);
      hideTip();
      drawLabels(false);
      drawFlows();
      syncZoomCtl();
    })
    .on("end", () => $("#map-wrap").classList.remove("grabbing"));
  mapSvg.call(zoom).on("dblclick.zoom", null);
  const setTouch = () => mapSvg.style("touch-action", panMode ? "none" : null);
  setTouch();

  function syncZoomCtl() {
    const base = targetView();
    const [k0, k1] = zoom.scaleExtent();
    $("#zoom-in").disabled = view.k >= k1 - 1e-6;
    $("#zoom-out").disabled = view.k <= k0 + 1e-6;
    $("#zoom-fit").disabled = Math.abs(view.k - base.k) < 1e-3 && Math.abs(view.x - base.x) < 0.5 && Math.abs(view.y - base.y) < 0.5;
  }

  const zoomBy = (f) => mapSvg.interrupt().transition().duration(reduceMotion ? 0 : 280).call(zoom.scaleBy, f);
  $("#zoom-in").addEventListener("click", () => zoomBy(1.6));
  $("#zoom-out").addEventListener("click", () => zoomBy(1 / 1.6));
  $("#zoom-fit").addEventListener("click", () => applyView(true));
  $("#zoom-pan").addEventListener("click", (e) => {
    panMode = !panMode;
    e.currentTarget.setAttribute("aria-pressed", panMode);
    $("#map-wrap").classList.toggle("panning", panMode);
    setTouch();
  });

  function onRegionClick(k) {
    const cur = state.key;
    if (level(k) === 1) select(k === sidoOf(cur) && level(cur) === 1 ? NATION : k);
    else select(k === cur ? sidoOf(k) : k);
  }

  // 흐름선을 켜면 전국을 보여주고, 아니면 고른 시도로 확대한다
  function targetView() {
    const s = sidoOf(state.key);
    if (!s || state.flow) return { k: 1, x: 0, y: 0 };
    const f = sidoFeatures.find((d) => d.properties.key === s);
    const [[x0, y0], [x1, y1]] = path.bounds(f);
    const pad = 28;
    const k = Math.min(14, (size.w - pad * 2) / (x1 - x0), (size.h - pad * 2) / (y1 - y0));
    return { k, x: size.w / 2 - ((x0 + x1) / 2) * k, y: size.h / 2 - ((y0 + y1) / 2) * k };
  }

  let lastViewKey = null;
  function applyView(animate = true) {
    view = targetView();
    lastViewKey = `${state.flow ? "flow" : sidoOf(state.key) || NATION}`;
    const tr = `translate(${view.x},${view.y}) scale(${view.k})`;
    // 사용자가 옮겨 둔 시점은 버리고 zoom 상태를 선택한 지역 시점에 맞춘다
    silent = true;
    mapSvg.interrupt().call(zoom.transform, d3.zoomIdentity.translate(view.x, view.y).scale(view.k));
    silent = false;
    syncZoomCtl();
    const world = mapSvg.select("g.world");
    if (animate && !reduceMotion) world.transition().duration(750).ease(d3.easeCubicInOut).attr("transform", tr);
    else world.interrupt().attr("transform", tr); // 진행 중인 이동이 새 시점을 덮어쓰지 않게
    paintMap();
    drawLabels(animate);
    // 흐름선은 지도가 다 옮겨진 뒤에 나타나게 한다
    const flows = mapSvg.select("g.flows").interrupt();
    if (animate && !reduceMotion) flows.style("opacity", 0).transition().delay(550).duration(300).style("opacity", 1);
    else flows.style("opacity", 1);
  }

  let color = null;
  // 지도에서 비교하는 지역 묶음: 흐름선 모드는 전국 시도(시군을 골랐으면 그 시도의 시군)
  const mapPeers = () => { const s = sidoOf(state.key); return s ? UNITS_BY_SIDO[s] : SIDO_CODES; };

  function scaleFor(m, vals) {
    if (!vals.length) return { fn: () => EMPTY, edges: [] };
    if (m.kind === "div") {
      // 기준값(mid)을 가운데에 두고 양쪽을 같은 폭으로 나눈다 (상대성장지수는 로그 척도)
      const tf = m.log ? (v) => Math.log(Math.max(v, 1e-6) / m.mid) : (v) => v - m.mid;
      const dev = vals.map((v) => Math.abs(tf(v))).sort((a, b) => a - b);
      const lim = dev[Math.floor((dev.length - 1) * 0.9)] || dev.at(-1) || 1;
      const cuts = [-lim * 0.6, -lim * 0.15, lim * 0.15, lim * 0.6];
      const fn = (v) => DIV[d3.bisectRight(cuts, tf(v))];
      const inv = m.log ? (t) => m.mid * Math.exp(t) : (t) => t + m.mid;
      return { fn, div: true, cuts: cuts.map(inv) };
    }
    if (new Set(vals).size < 2) return { fn: () => RAMP.at(-1), edges: [vals[0]] };
    const q = d3.scaleQuantile().domain(vals).range(RAMP);
    return { fn: q, edges: [d3.min(vals), ...q.quantiles(), d3.max(vals)] };
  }

  function paintMap() {
    const m = state.metric;
    const s = sidoOf(state.key);
    const peers = mapPeers();
    const vals = peers.map((k) => m.get(k)).filter(ok);
    color = scaleFor(m, vals);
    const fillOf = (k) => { const v = m.get(k); return ok(v) ? color.fn(v) : EMPTY; };
    const flow = state.flow;

    mapSvg.selectAll("path.sido")
      .classed("context", (d) => !flow && !!s && d.properties.key !== s)
      .classed("hidden", (d) => !flow && d.properties.key === s)
      .classed("flowbase", flow)
      .classed("sel", (d) => flow && d.properties.key === state.key)
      .attr("fill", (d) => (flow ? null : s ? null : fillOf(d.properties.key)))
      .attr("aria-label", (d) => `${label(d.properties.key)} ${m.label} ${withUnit(m, m.get(d.properties.key))}`);
    mapSvg.selectAll("path.unit")
      .classed("hidden", (d) => (flow ? d.properties.key !== state.key : d.properties.sido !== s))
      .classed("sel", (d) => d.properties.key === state.key)
      .attr("fill", (d) => (flow ? "rgba(245,165,36,0.35)" : d.properties.sido === s ? fillOf(d.properties.key) : null))
      .attr("aria-label", (d) => `${label(d.properties.key)} ${m.label} ${withUnit(m, m.get(d.properties.key))}`);
    mapSvg.select("path.mesh-unit").attr("opacity", !flow && s ? 1 : 0);
    mapSvg.classed("dimmed", !flow && level(state.key) === 2);
    mapSvg.selectAll("path.unit.sel").raise();
    $("#map").setAttribute("aria-label", flow ? `${label(state.key)} 지역 간 이동 흐름 지도` : `${s ? T.sidos[s].name : "전국"} ${m.label} 지도`);
    drawFlows();

    if (flow) { $("#legend").innerHTML = flowLegend(); return; }
    let rows = "";
    if (!vals.length) rows = "";
    else if (color.div) {
      const c = color.cuts;
      const ends = m.ends || ["감소", "증가"];
      rows = `<span class="row">${ends[0]}</span>` +
        DIV.map((col, i) => `<span class="row"><span class="sw" style="background:${col}"></span>${i === 0 ? `&lt; ${m.fmt(c[0])}` : i === DIV.length - 1 ? `&gt; ${m.fmt(c[3])}` : i === 2 ? `${m.fmt(c[1])}~${m.fmt(c[2])}` : `${m.fmt(c[i - 1])}~${m.fmt(c[i])}`}</span>`).join("") +
        `<span class="row">${ends[1]}</span>`;
    } else if (color.edges.length < 2) rows = `<span class="row"><span class="sw" style="background:${RAMP.at(-1)}"></span>${m.fmt(color.edges[0])}</span>`;
    else rows = RAMP.map((c, i) => `<span class="row"><span class="sw" style="background:${c}"></span>${m.fmt(color.edges[i])}–${m.fmt(color.edges[i + 1])}</span>`).join("");
    $("#legend").innerHTML = `<span class="title">${m.label} <span style="color:var(--faint);font-weight:400">${metricYear(m)}</span></span>` + rows +
      (vals.length < peers.length ? `<span class="row"><span class="sw" style="background:${EMPTY};outline:1px solid #3a3f48"></span>자료 없음</span>` : "");
  }

  // ---------- 흐름선 ----------
  const SIDOS_OD = D.od.sidos;
  const odAt = (i) => D.od.m[i];
  const anchorOf = (k) => { const a = anchor.get(k) || anchor.get(sidoOf(k)); return a ? [a[0] * view.k + view.x, a[1] * view.k + view.y] : null; };

  // 현재 선택에 맞는 흐름 목록: [{from, to, share(%), q?}]
  function flowList() {
    const k = state.key, i = state.yi;
    if (k === NATION) {
      const m = odAt(i);
      const tot = m.flat().reduce((a, b) => a + b, 0) || 1;
      const list = [];
      m.forEach((row, o) => row.forEach((q, d) => { if (q > 0) list.push({ from: SIDOS_OD[o], to: SIDOS_OD[d], share: (q / tot) * 100 }); }));
      return list.sort((a, b) => b.share - a.share).slice(0, 24);
    }
    if (state.dir === "out") {
      return (V[k]?.places || []).map(([name, region, s]) => ({ from: k, to: region || null, name, share: at(s, i) / 10 }))
        .filter((f) => f.share > 0 && f.to).sort((a, b) => b.share - a.share);
    }
    return (V[k]?.origins || []).map(([o, s]) => ({ from: o, to: k, share: at(s, i) / 10 }))
      .filter((f) => f.share > 0).sort((a, b) => b.share - a.share);
  }

  // 시도 간 흐름 이름은 곡선 가운데에
  const midOf = (f) => {
    const a = anchorOf(f.from), b = anchorOf(f.to);
    if (!a || !b) return null;
    if (f.from === f.to) return a;
    const dx = b[0] - a[0], dy = b[1] - a[1];
    return [(a[0] + b[0]) / 2 - dy * 0.11, (a[1] + b[1]) / 2 + dx * 0.11];
  };

  function drawFlows() {
    const g = mapSvg.select("g.flows");
    if (!state.flow) { g.selectAll("*").remove(); return; }
    const list = flowList();
    const inbound = state.key !== NATION && state.dir === "in";
    const col = inbound ? "#5fb3ff" : COLORS.cur;
    const max = d3.max(list, (f) => f.share) || 1;
    const wid = (f) => 1 + (f.share / max) * 9;
    const arcs = list.filter((f) => f.from !== f.to && anchorOf(f.from) && anchorOf(f.to));
    const loops = list.filter((f) => f.from === f.to && anchorOf(f.from));
    const arcPath = (f) => {
      const [x0, y0] = anchorOf(f.from), [x1, y1] = anchorOf(f.to);
      const dx = x1 - x0, dy = y1 - y0, dist = Math.hypot(dx, dy) || 1;
      // 끝점을 조금 당겨 화살촉이 도착점 위에 오게 한다
      const pull = Math.min(6, dist * 0.2);
      const ex = x1 - (dx / dist) * pull, ey = y1 - (dy / dist) * pull;
      const cx = (x0 + x1) / 2 - dy * 0.22, cy = (y0 + y1) / 2 + dx * 0.22;
      return `M${x0},${y0}Q${cx},${cy} ${ex},${ey}`;
    };
    const key = (f) => `${f.from}>${f.to}`;
    const tipHTML = (f) => `<b>${fullLabel(f.from)} → ${fullLabel(f.to)}</b><span>${state.key === NATION ? "전국 이동량의" : inbound ? "도착량의" : "출하량의"}</span> ${pct(f.share)}`;
    g.selectAll("path.flow").data(arcs, key).join("path").attr("class", "flow")
      .attr("d", arcPath).attr("fill", "none").attr("stroke", col).attr("stroke-linecap", "round")
      .attr("stroke-opacity", (f) => 0.35 + (f.share / max) * 0.55).attr("stroke-width", wid)
      .attr("marker-end", `url(#arrow-${inbound ? "in" : "out"})`)
      .on("mousemove", (e, f) => showCtip(e, tipHTML(f))).on("mouseleave", hideCtip);
    g.selectAll("circle.loop").data(loops, key).join("circle").attr("class", "loop")
      .attr("cx", (f) => anchorOf(f.from)[0]).attr("cy", (f) => anchorOf(f.from)[1])
      .attr("r", (f) => 3 + Math.sqrt(f.share / max) * 12)
      .attr("fill", col).attr("fill-opacity", 0.18).attr("stroke", col).attr("stroke-width", 1.5)
      .on("mousemove", (e, f) => showCtip(e, `<b>${fullLabel(f.from)} 안에서</b><span>${state.key === NATION ? "전국 이동량의" : "비중"}</span> ${pct(f.share)}`)).on("mouseleave", hideCtip);
    // 상위 3개 흐름에 이름·비중. 가까운 도착지끼리 겹치지 않게 아래로 밀어낸다
    const placed = [];
    const top = list.slice(0, 3).map((f) => {
      const p = state.key === NATION ? midOf(f) : anchorOf(inbound ? f.from : f.to);
      if (!p) return null;
      let [x, y] = [p[0], p[1] - 8];
      while (placed.some(([px, py]) => Math.abs(px - x) < 70 && Math.abs(py - y) < 13)) y += 13;
      placed.push([x, y]);
      const name = state.key === NATION ? `${shortLabel(f.from)}→${shortLabel(f.to)}` : (f.name || fullLabel(inbound ? f.from : f.to));
      return { f, x, y, text: `${name} ${pct(f.share)}` };
    }).filter(Boolean);
    g.selectAll("text.flow-label").data(top, (d) => key(d.f)).join("text").attr("class", "flow-label")
      .attr("x", (d) => d.x).attr("y", (d) => d.y).text((d) => d.text);
  }

  function flowLegend() {
    const k = state.key;
    const inbound = k !== NATION && state.dir === "in";
    const what = k === NATION ? "시도 간 이동 상위 24개 (원: 시도 안 이동)" : inbound ? `${label(k)}(으)로 들어오는 상위 출발지` : `${label(k)}에서 나가는 상위 도착지`;
    return `<span class="title">흐름선 <span style="color:var(--faint);font-weight:400">${yearText()} · 컨테이너</span></span>
      <span class="row"><span class="sw line" style="background:${inbound ? "#5fb3ff" : COLORS.cur}"></span>${what}</span>
      <span class="row">선 굵기 = 비중</span>`;
  }

  function drawLabels(animate) {
    const s = state.flow ? null : sidoOf(state.key);
    const keys = s ? UNITS_BY_SIDO[s] : SIDO_CODES;
    const pos = (k) => { const [x, y] = anchor.get(k) || [NaN, NaN]; return [x * view.k + view.x, y * view.k + view.y]; };
    const small = (k) => {
      if (k === state.key) return false;
      const f = (s ? unitFeatures : sidoFeatures).find((d) => d.properties.key === k);
      return path.area(f) * view.k * view.k < (s ? 260 : 120);
    };
    const name = (k) => (level(k) === 1 ? T.sidos[k].short : (label(k).endsWith("시부") ? "시부" : label(k).replace(/(시|군|구)$/, "")));
    const inView = (k) => { const [x, y] = pos(k); return x > 20 && x < size.w - 20 && y > 16 && y < size.h - 10; };
    const ctx = s ? SIDO_CODES.filter((c) => c !== s && inView(c)) : [];
    const data = [...keys.filter((k) => !small(k) && Number.isFinite(pos(k)[0])), ...ctx];
    const g = mapSvg.select("g.labels");
    const sel = g.selectAll("text").data(data, (k) => k).join("text")
      .attr("class", (k) => `region-label${level(k) === 1 ? " sido-label" : ""}${s && level(k) === 1 ? " ctx" : ""}${k === state.key ? " sel" : ""}${state.flow ? " dim" : ""}`)
      .attr("x", (k) => pos(k)[0])
      .attr("y", (k) => pos(k)[1] + 4)
      .text(name);
    if (animate && !reduceMotion) sel.style("opacity", 0).transition().delay(550).duration(300).style("opacity", 1);
    else sel.interrupt().style("opacity", 1);
  }

  function showTip(e, k) {
    const m = state.metric;
    const v = m.get(k);
    const list = peersOf(k).map((r) => [r, m.get(r)]).filter(([, x]) => ok(x)).sort((a, b) => b[1] - a[1]);
    const i = list.findIndex(([r]) => r === k);
    tip.innerHTML = state.flow
      ? `<b>${label(k)}</b><span>출하 점유율</span> ${pctS(share(k))} · <span>도착 점유율</span> ${pctS(inShare(k))}`
      : `<b>${label(k)}</b><span>${m.label}</span> ${withUnit(m, v)}<span>${i < 0 ? "" : ` · ${i + 1}위`}</span>`;
    const box = $("#map-wrap").getBoundingClientRect();
    tip.style.left = `${e.clientX - box.left}px`;
    tip.style.top = `${e.clientY - box.top}px`;
    tip.hidden = false;
  }
  const hideTip = () => { tip.hidden = true; };

  // 순위: local = 시도 안(전국 화면에서는 시도별), nation = 전국 시군
  function renderRank() {
    const m = state.metric;
    const s = sidoOf(state.key);
    const sorted = (keys) => keys.map((r) => [r, m.get(r)]).filter(([, v]) => ok(v)).sort((a, b) => b[1] - a[1]);
    const nationList = sorted(Object.values(UNITS_BY_SIDO).flat());
    const nationRank = new Map(nationList.map(([r], i) => [r, i + 1]));
    const nation = state.rankScope === "nation";
    const list = nation ? nationList : sorted(s ? UNITS_BY_SIDO[s] : SIDO_CODES);
    const dev = (v) => (m.log ? Math.log(v / m.mid) : v - (m.mid ?? 0));
    const vmax = Math.max(...list.map(([, v]) => Math.abs(dev(v))), 0) || 1;
    const top = list.slice(0, 10);
    const selIdx = list.findIndex(([r]) => r === state.key);
    const name = (r) => (nation ? fullLabel(r) : shortLabel(r));
    const tag = (r) => (!nation && level(r) === 2 && nationRank.has(r) ? `<span class="nat">전국 ${nationRank.get(r)}위</span>` : "<span></span>");
    const bar = (v) => {
      if (m.kind !== "div") return `<span class="fill" style="width:${Math.max(0, (v / vmax) * 100)}%"></span>`;
      const d = dev(v), wpct = Math.min(50, (Math.abs(d) / vmax) * 50);
      return `<span class="fill ${d >= 0 ? "pos" : "neg"}" style="left:${d >= 0 ? 50 : 50 - wpct}%;width:${wpct}%"></span>`;
    };
    const row = ([r, v], i) => `
      <button type="button" class="rank-row${nation ? " wide" : ""}${i < 3 ? " top" : ""}${nation && s && sidoOf(r) === s ? " mine" : ""}${r === state.key ? " sel" : ""}" data-r="${r}">
        <span class="no">${i + 1}</span><span class="nm">${name(r)}</span>
        <span class="track${m.kind === "div" ? " div" : ""}">${bar(v)}</span>
        <span class="val">${m.fmt(v)}</span>${tag(r)}
      </button>`;
    const extra = selIdx >= 10 ? `<div class="rank-title" style="margin:6px 0 0"><span>선택한 지역</span></div>${row(list[selIdx], selIdx)}` : "";
    const scope = nation ? "시군 (전국)" : s ? `${T.sidos[s].short} 시군` : "시도";
    const labels = s ? ["도내", "전국"] : ["시도", "시군"];
    const seg = `<span class="seg" role="group" aria-label="순위 기준">${["local", "nation"].map((v, i) =>
      `<button type="button" data-scope="${v}" aria-pressed="${state.rankScope === v}">${labels[i]}</button>`).join("")}</span>`;
    $("#rank").innerHTML = list.length ? `
      <div class="rank-title"><span><b>${m.label}</b> 상위 ${scope}</span><span class="rank-meta">${metricYear(m)} · ${list.length}곳 ${seg}</span></div>
      <div>${top.slice(0, 5).map((d, i) => row(d, i)).join("")}</div>
      <div>${top.slice(5).map((d, i) => row(d, i + 5)).join("")}</div>${extra}` : `<div class="rank-title"><span>${m.label}: ${m.cmp && baseI() == null ? "비교 시점 자료가 없습니다." : "자료가 없습니다."}</span></div>`;
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => onRegionClick(b.dataset.r)));
    $$("#rank .seg button").forEach((b) => b.addEventListener("click", () => { state.rankScope = b.dataset.scope; renderRank(); }));
  }

  function rankText(k, getter) {
    if (k === NATION) return null;
    const list = peersOf(k).map((r) => [r, getter(r)]).filter(([, v]) => ok(v)).sort((a, b) => b[1] - a[1]);
    const i = list.findIndex(([r]) => r === k);
    if (i < 0 || list.length < 2) return null;
    const scope = level(k) === 1 ? "전국" : T.sidos[sidoOf(k)].short;
    return `${scope} ${i + 1}위 / ${list.length}`;
  }

  // ---------- 제목 ----------
  const ICONS = {
    pie: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 1 0 9 9h-9z"/><path d="M15 3.5A9 9 0 0 1 20.5 9H15z"/></svg>',
    box: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>',
    route: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18h6a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h6"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
  };

  function topPlace(k) {
    const p = (V[k]?.places || []).map(([n, r, s]) => [n, at(s, state.yi)]).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1])[0];
    return p ? `가장 많이 보내는 곳 <b>${p[0]}</b> ${pct(p[1] / 10)}` : "도착지 정보 없음";
  }

  function renderHero() {
    const k = state.key;
    $("#title-region").textContent = label(k);
    const trail = [];
    for (let p = parentOf(k); p; p = parentOf(p)) trail.unshift(label(p));
    $("#crumb").textContent = trail.length ? `${trail.join(" › ")} ›` : "";
    if (!has(k)) {
      $("#facts").innerHTML = `<li>${ICONS.box}<span>${yearText()} 물류기기 공동이용 실적이 없습니다.</span></li>`;
      return;
    }
    const sp = spec(k);
    const c1 = $("#cmp").selectedOptions[0].textContent;
    const crop = V[k].crops?.map(([n, s]) => [n, at(s, state.yi)]).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1])[0];
    $("#facts").innerHTML = [
      k === NATION
        ? `<li>${ICONS.pie}<span>수도권 출하 <b>${pct(permil("metro")(k))}</b> <span class="delta">${c1} 대비 ${diffHTML(diff(permil("metro"))(k))}</span></span></li>`
        : `<li>${ICONS.pie}<span>전국 점유율 <b>${pctS(share(k))}</b> <span class="delta">${c1} 대비 ${diffHTML(diff(share)(k))}</span></span></li>`,
      `<li>${ICONS.box}<span>컨테이너 <b>${compact(container(k))}</b>개 · 이동 <b>${int(moves(k))}</b>건</span></li>`,
      `<li>${ICONS.route}<span>${topPlace(k)}</span></li>`,
      `<li class="accent">${ICONS.star}<span>${sp ? `특화 품목 <b>${sp[0]}</b> · 전국 대비 ${times(sp[1])}` : crop ? `1위 품목 <b>${crop[0]}</b> · 컨테이너의 ${pct((crop[1] / container(k)) * 100)}` : "품목 정보 없음"}</span></li>`,
    ].join("");
  }

  $$("[data-year]").forEach((el) => el.closest(".panel")?.classList.add("has-year"));
  const setYearChips = () => $$("[data-year]").forEach((el) => { el.textContent = yearText(); });

  // ---------- 왼쪽 ----------
  function renderScale() {
    const k = state.key;
    const b = baseI();
    if (k === NATION) {
      setV("share", 100, (v) => `${nf0.format(v)}%`);
      setD("share", "전국 합계");
      setV("rel", null);
      setD("rel", "");
    } else {
      setV("share", share(k), pctS);
      setD("share", b == null ? "" : diffHTML(diff(share)(k), pp, `${yearOf(b)}년 ${pctS(share(k, b))}`));
      const r = rel(k);
      setV("rel", r, idx);
      setD("rel", !ok(r) ? "" : r > 103 ? `<span class="up">전국보다 빠름</span>` : r < 97 ? `<span class="down">전국보다 느림</span>` : "전국과 비슷");
    }
    setV("container", container(k));
    setV("pallet", pallet(k));
    setV("moves", moves(k));
    setRank("share", rankText(k, (x) => share(x)));
    lineChart("#chart-share", k === NATION ? V[k]?.c?.map((v) => (v ? v / 1e6 : null)) : Y.map((y, i) => share(k, i)),
      k === NATION ? (v) => `${nf1.format(v)}백만` : pctS, k === NATION ? "컨테이너 이용량" : "전국 점유율");
    $("#p-scale .sub-head").firstChild.textContent = k === NATION ? "컨테이너 이용량 추이 (백만 개) " : "전국 점유율 추이 ";
    barChart("#chart-annual", V[k]?.c, compact, "컨테이너 이용량");
  }

  // 계절성 히트맵: 행 = 연도, 열 = 월, 색 = 그해 1~11월 합에서 그 달의 비중
  function renderSeason() {
    const k = state.key;
    const el = $("#heat");
    const mon = V[k]?.mon;
    const w = el.clientWidth;
    if (!w) return;
    const rowsY = Y.map((y, i) => ({ y, i, m: at(mon, i) })).reverse();
    const lab = 30, top = 14;
    const cw = (w - lab) / D.months.length;
    const ch = FIT.matches ? Math.max(5, Math.min(9, (el.clientHeight - top) / Y.length)) : 9;
    const h = top + ch * Y.length + 2;
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`).attr("height", h).attr("role", "img");
    const cells = rowsY.flatMap((r) => {
      const tot = r.m ? r.m.reduce((a, b) => a + b, 0) : 0;
      return D.months.map((mo, j) => ({ ...r, mo, j, s: tot ? r.m[j] / tot : null }));
    });
    // 색 범위는 이 지역 값의 5~95% 분위수 (달마다 비슷한 지역도 차이가 보이도록)
    const sv = cells.map((d) => d.s).filter(ok).sort((a, b) => a - b);
    const lo = d3.quantileSorted(sv, 0.05) ?? 0, hi = d3.quantileSorted(sv, 0.95) ?? 0.2;
    const ramp = d3.scaleLinear().domain([lo, (lo + hi) / 2, hi]).range(["#22252b", "#7a5a24", "#f5a524"]).clamp(true);
    svg.selectAll("rect.cell").data(cells, (d) => `${d.y}-${d.mo}`).join("rect").attr("class", "cell")
      .attr("x", (d) => lab + d.j * cw + 0.5).attr("y", (d, n) => top + rowsY.findIndex((r) => r.y === d.y) * ch + 0.5)
      .attr("width", Math.max(1, cw - 1)).attr("height", Math.max(1, ch - 1)).attr("rx", 1)
      .attr("fill", (d) => (d.s == null ? "#1a1c21" : ramp(d.s)))
      .style("cursor", "pointer")
      .on("mousemove", (e, d) => showCtip(e, `<b>${d.y}년 ${d.mo}월</b>${d.s == null ? "자료 없음" : `1~11월의 ${pct(d.s * 100)} · ${int(d.m[d.j])}개`}`))
      .on("mouseleave", hideCtip)
      .on("click", (e, d) => { stopPlay(); setYear(d.i); });
    svg.selectAll("text.mo").data(D.months.filter((m) => m % 2 === 1)).join("text").attr("class", "mo")
      .attr("x", (m) => lab + (m - 1) * cw + cw / 2).attr("y", 10).attr("text-anchor", "middle").attr("fill", COLORS.faint).attr("font-size", 10).text((m) => `${m}월`);
    // 연도 이름: 고른 해는 항상, 처음·끝·비교 해는 고른 해와 겹치지 않을 때만
    const gap = Math.ceil(11 / ch);
    const yl = rowsY.filter((r) => r.i === state.yi || ([0, LAST, baseI()].includes(r.i) && Math.abs(r.i - state.yi) >= gap));
    svg.selectAll("text.yr").data(yl, (d) => d.y).join("text").attr("class", "yr")
      .attr("x", lab - 4).attr("y", (d) => top + rowsY.findIndex((r) => r.y === d.y) * ch + ch / 2 + 3.5).attr("text-anchor", "end")
      .attr("fill", (d) => (d.i === state.yi ? COLORS.cur : COLORS.faint)).attr("font-size", 10).attr("font-weight", (d) => (d.i === state.yi ? 700 : 400)).text((d) => d.y);
    const ri = rowsY.findIndex((r) => r.i === state.yi);
    svg.selectAll("rect.selrow").data([ri]).join("rect").attr("class", "selrow")
      .attr("x", lab - 0.5).attr("y", top + ri * ch - 0.5).attr("width", w - lab).attr("height", ch + 1)
      .attr("fill", "none").attr("stroke", COLORS.text).attr("stroke-width", 1.2).attr("rx", 1.5).style("pointer-events", "none");
    const cur = at(mon, state.yi);
    svg.attr("aria-label", cur ? `${yearOf(state.yi)}년 월별 비중 ${cur.map((v, j) => `${j + 1}월 ${int(v)}`).join(", ")}` : "자료 없음");
    if (!cur) { setNote("season", "자료가 없습니다."); return; }
    const peak = cur.indexOf(Math.max(...cur));
    setNote("season", `${yearOf(state.yi)}년 성수기 ${peak + 1}월 · 많은 세 달이 1~11월의 ${pct(peak3(k))} (색: 그해 안에서 달별 비중)`);
  }

  function renderShip() {
    const colors = [...CAT.slice(0, D.cats.ship.length), OTHER];
    const names = [...D.cats.ship, "기타"];
    stackChart("#stack-ship", "#leg-ship", names, colors, V[state.key]?.ship);
    const items = catItems("ship", colors);
    $("#bars-ship").innerHTML = items.length ? shareRows(items) : '<p class="note">자료가 없습니다.</p>';
  }

  function renderEquip() {
    const k = state.key;
    const b = baseI();
    setV("lot", lot(k));
    setD("lot", b == null ? "" : `${yearOf(b)}년 ${int(lot(k, b))}개`);
    setV("pal100", pal100(k), (v) => nf1.format(v));
    setD("pal100", b == null ? "" : `${yearOf(b)}년 ${ok(pal100(k, b)) ? nf1.format(pal100(k, b)) : "–"}개`);
    const cnames = [...D.cats.cpool, "기타"];
    const ccolors = [...D.cats.cpool.map((n) => POOL_COLOR[n]), OTHER];
    stackChart("#stack-cpool", "#leg-cpool", cnames, ccolors, V[k]?.cpool);
    // 파렛트 운영사: 고른 해의 100% 막대 하나
    const pnames = [...D.cats.ppool, "기타"];
    const pcolors = [...D.cats.ppool.map((n) => POOL_COLOR[n]), OTHER];
    const ps = pnames.map((n, j) => ({ n, v: at(V[k]?.ppool?.[j], state.yi), c: pcolors[j] })).filter((d) => d.v > 0);
    $("#ppool-year").textContent = `${yearOf(state.yi)}년`;
    $("#split-ppool").innerHTML = ps.length ? `
      <div class="split-bar">${ps.map((d) => `<span style="flex-basis:${d.v / 10}%;background:${d.c}" title="${d.n} ${pct(d.v / 10)}"></span>`).join("")}</div>
      <div class="split-legend">${ps.map((d) => `<span><i class="dot" style="background:${d.c}"></i>${d.n} <b>${pct(d.v / 10)}</b></span>`).join("")}</div>` : '<p class="note">파렛트 이용이 없습니다.</p>';
    const eq = D.cats.equip.map((n, j) => ({ n, v: at(V[k]?.eq?.[j], state.yi), p: b == null ? null : at(V[k]?.eq?.[j], b) })).filter((d) => d.v > 0);
    const tot = eq.reduce((a, d) => a + d.v, 0);
    $("#bars-equip").innerHTML = eq.length ? eq.map((d) => `
      <div class="bar-row equip-row" title="${d.n} · ${int(d.v)}개${ok(d.p) ? ` (${yearOf(b)}년 ${int(d.p)}개)` : ""}"><span class="name">${d.n}</span>
        <span class="track"><span class="fill" style="width:${Math.max(1, (d.v / eq[0].v) * 100)}%"></span></span>
        <span class="val">${compact(d.v)}</span><span class="chg">${pct((d.v / tot) * 100)}</span></div>`).join("") : '<p class="note">자료가 없습니다.</p>';
  }

  // ---------- 오른쪽 ----------
  function renderFlow() {
    const k = state.key;
    const b = baseI();
    $$("#dir button").forEach((x) => x.setAttribute("aria-pressed", x.dataset.dir === state.dir));
    setV("outShare", k === NATION ? 100 : share(k), pctS);
    setV("inShare", k === NATION ? 100 : inShare(k), pctS);
    setV("balance", balance(k), signed);
    let items = [];
    if (k === NATION) {
      $("#flow-head").innerHTML = `시도 간 이동 상위 <span>전국 이동량 대비</span>`;
      const list = flowList();
      const prevList = b == null ? [] : (() => { const m = odAt(b); const tot = m.flat().reduce((a, x) => a + x, 0) || 1; return m.map((r) => r.map((q) => (q / tot) * 100)); })();
      items = list.slice(0, 6).map((f) => ({ name: `${shortLabel(f.from)} → ${shortLabel(f.to)}`, cur: f.share,
        prev: b == null ? null : prevList[SIDOS_OD.indexOf(f.from)][SIDOS_OD.indexOf(f.to)] }));
    } else if (state.dir === "out") {
      $("#flow-head").innerHTML = `보내는 곳 상위 <span>${label(k)} 출하량 대비 · 누르면 그 지역으로</span>`;
      items = (V[k]?.places || []).map(([name, region, s]) => ({ name, key: region, cur: at(s, state.yi) == null ? null : at(s, state.yi) / 10, prev: b == null || at(s, b) == null ? null : at(s, b) / 10 }))
        .filter((d) => d.cur > 0).sort((a, c) => c.cur - a.cur);
    } else {
      $("#flow-head").innerHTML = `받는 곳 기준 상위 출발지 <span>${label(k)} 도착량 대비</span>`;
      items = (V[k]?.origins || []).map(([o, s]) => ({ name: fullLabel(o), key: o, cur: at(s, state.yi) == null ? null : at(s, state.yi) / 10, prev: b == null || at(s, b) == null ? null : at(s, b) / 10 }))
        .filter((d) => d.cur > 0).sort((a, c) => c.cur - a.cur);
    }
    const max = Math.max(...items.map((d) => d.cur), 1);
    $("#bars-flow").innerHTML = items.length ? shareRows(items, max, { wide: true }) : `<p class="note">${state.dir === "in" && k !== NATION ? "이 지역으로 들어오는 실적이 없습니다." : "자료가 없습니다."}</p>`;
    bindGo($("#bars-flow"));
    renderOD();
  }

  // 시도 간 이동 행렬: 행 = 출발 시도, 열 = 도착 시도, 색 = 행 안 비중
  function renderOD() {
    const el = $("#od");
    const w = el.clientWidth;
    if (!w) return;
    const order = SIDO_CODES.filter((s) => SIDOS_OD.includes(s));
    const m = odAt(state.yi);
    const lab = 30, top = 26;
    const cs = Math.max(8, Math.min(18, (w - lab) / order.length));
    const h = top + cs * order.length + 2;
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`).attr("height", h).attr("role", "img")
      .attr("aria-label", `${yearOf(state.yi)}년 시도 간 이동 행렬`);
    const ramp = d3.scaleSqrt().domain([0, 0.6]).range(["#22252b", "#f5a524"]).clamp(true);
    const s = sidoOf(state.key);
    const cells = order.flatMap((o, r) => {
      const row = m[SIDOS_OD.indexOf(o)];
      const tot = row.reduce((a, b) => a + b, 0);
      return order.map((d, c) => ({ o, d, r, c, q: row[SIDOS_OD.indexOf(d)], s: tot ? row[SIDOS_OD.indexOf(d)] / tot : null }));
    });
    svg.selectAll("rect.cell").data(cells, (d) => `${d.o}-${d.d}`).join("rect").attr("class", "cell")
      .attr("x", (d) => lab + d.c * cs + 0.5).attr("y", (d) => top + d.r * cs + 0.5)
      .attr("width", cs - 1).attr("height", cs - 1).attr("rx", 1.5)
      .attr("fill", (d) => (d.s == null ? "#1a1c21" : d.s === 0 ? "#202328" : ramp(d.s)))
      .attr("opacity", (d) => (!s || d.o === s || d.d === s ? 1 : 0.45))
      .style("cursor", "pointer")
      .on("mousemove", (e, d) => showCtip(e, `<b>${T.sidos[d.o].short} → ${T.sidos[d.d].short}</b>${d.s == null ? "출하 없음" : `${T.sidos[d.o].short} 출하량의 ${pct(d.s * 100)} · ${int(d.q)}개`}`))
      .on("mouseleave", hideCtip)
      .on("click", (e, d) => select(d.o));
    const short = (c) => T.sidos[c].short.slice(0, 2);
    svg.selectAll("text.rl").data(order, (d) => d).join("text").attr("class", "rl")
      .attr("x", lab - 4).attr("y", (d, i) => top + i * cs + cs / 2 + 3.5).attr("text-anchor", "end").attr("font-size", 10)
      .attr("fill", (d) => (d === s ? COLORS.cur : COLORS.faint)).attr("font-weight", (d) => (d === s ? 700 : 400)).text(short);
    svg.selectAll("text.cl").data(order, (d) => d).join("text").attr("class", "cl")
      .attr("transform", (d, i) => `translate(${lab + i * cs + cs / 2 + 3},${top - 4}) rotate(-60)`).attr("font-size", 9.5)
      .attr("fill", (d) => (d === s ? COLORS.cur : COLORS.faint)).attr("font-weight", (d) => (d === s ? 700 : 400)).text(short);
  }

  function renderDest() {
    const k = state.key;
    const p = parentOf(k);
    const mtr = permil("metro"), sm = permil("same");
    countTo($('[data-v="metro"]'), mtr(k), pct);
    countTo($('[data-v="same"]'), sm(k), pct);
    meter("metro", mtr(k), p ? mtr(p) : null);
    meter("same", sm(k), p && p !== NATION ? sm(p) : null);
    const b = baseI();
    const dm = diff(mtr)(k), ds = diff(sm)(k);
    setNote("dest", `${b == null ? "" : `${yearOf(b)}년 대비 수도권 ${pp(dm)} · 도내 ${pp(ds)}`}${p ? ` · 흰 선은 ${label(p)}` : ""}`);
    const colors = [...CAT.slice(0, D.cats.dest.length), OTHER];
    const names = [...D.cats.dest, "기타"];
    stackChart("#stack-dest", "#leg-dest", names, colors, V[k]?.dest);
    const items = catItems("dest", colors);
    $("#bars-dest").innerHTML = items.length ? shareRows(items) : '<p class="note">자료가 없습니다.</p>';
  }

  function renderCrop() {
    const k = state.key;
    const sp = spec(k);
    $("#spec-badge").textContent = sp ? `특화 품목 ${sp[0]} · 전국 대비 ${times(sp[1])}` : "";
    const ef = effCrops(k);
    $("#crop-div").textContent = ok(ef) ? `실질 품목 수 ${nf1.format(ef)}개` : "";
    const c = container(k);
    const b = baseI();
    const cb = b == null ? null : container(k, b);
    const crops = (V[k]?.crops || []).map(([name, s]) => ({
      name, cur: c && at(s, state.yi) != null ? (at(s, state.yi) / c) * 100 : c ? 0 : null,
      prev: cb && at(s, b) != null ? (at(s, b) / cb) * 100 : cb ? 0 : null, lq: cropLQ(k, name),
    })).filter((d) => d.cur > 0).sort((a, z) => z.cur - a.cur).slice(0, FIT.matches && window.innerHeight <= 800 ? 6 : 8);
    const max = Math.max(...crops.map((d) => d.cur), 1);
    $("#bars-crop").innerHTML = crops.length ? shareRows(crops.map((d) => ({ ...d,
      title: `${d.name} · 지역 안 비중 ${pct(d.cur)}${ok(d.prev) ? ` (${yearOf(b)}년 ${pct(d.prev)})` : ""}${d.lq ? ` · 특화도 ${times(d.lq)}` : ""}`,
      name: d.name })), max) : '<p class="note">자료가 없습니다.</p>';
    // 특화도 1.5배 이상 품목에 표시
    $$("#bars-crop .share-row").forEach((row, i) => { if (crops[i]?.lq >= 1.5 && k !== NATION) row.querySelector(".name").insertAdjacentHTML("beforeend", `<small class="lq">${nf1.format(crops[i].lq)}배</small>`); });
  }

  function meter(key, value, mark, max = 100) {
    const fill = $(`[data-meter="${key}"]`);
    const m = $(`[data-mark="${key}"]`);
    fill.style.width = ok(value) ? `${Math.min(100, (value / max) * 100)}%` : "0";
    if (!ok(mark)) { m.classList.remove("on"); return; }
    m.classList.add("on");
    m.style.left = `calc(${Math.min(100, (mark / max) * 100)}% - 1px)`;
  }

  // ---------- 흐르는 증감 띠: 전국 점유율 변화(%p) ----------
  function tk(text, d, fmt = pp) {
    if (!ok(d)) return "";
    const cls = d > 0 ? "up" : d < 0 ? "down" : "";
    const arrow = d > 0 ? "▲" : d < 0 ? "▼" : "–";
    return `<span class="tk">${text} <b class="${cls}">${arrow} ${fmt(Math.abs(d)).replace(/^[+−]/, "")}</b></span>`;
  }

  function renderTicker() {
    const k = state.key;
    const head = [
      `<span class="tk tk-region">${label(k)} · ${cmpText()}</span>`,
      k === NATION ? "" : tk("전국 점유율", diff(share)(k)),
      tk("수도권 출하", diff(permil("metro"))(k)),
      tk("대형유통센터", diff(catShare("dest", "대형유통센터"))(k)),
      tk("농업회사법인", diff(catShare("ship", "농업회사법인"))(k)),
    ];
    const others = (level(k) === 2 ? peersOf(k) : childrenOf(k)).filter((x) => x !== k && has(x)).map((x) => tk(`<b style="color:var(--text)">${shortLabel(x)}</b> 점유율`, diff(share)(x)));
    const html = [...head, ...others].join("");
    const track = $("#ticker");
    track.innerHTML = `${html}<span aria-hidden="true" style="display:contents">${html}</span>`;
    requestAnimationFrame(() => track.style.setProperty("--ticker-dur", `${Math.max(20, Math.round(track.scrollWidth / 2 / 50))}s`));
  }

  // ---------- 출처 ----------
  const SOURCES = { logi: D.source };
  function sources() {
    $$("[data-src]").forEach((el) => {
      const s = SOURCES[el.dataset.src];
      el.textContent = s ? `출처: ${s}` : "";
      const panel = el.closest(".panel");
      const head = panel?.querySelector(".panel-head");
      if (!s || !head || head.querySelector(".src-btn")) return;
      const right = document.createElement("div");
      right.className = "head-right";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "src-btn";
      btn.textContent = "출처";
      btn.title = s;
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", () => {
        const open = panel.classList.toggle("show-src");
        btn.setAttribute("aria-expanded", open);
      });
      const chip = head.querySelector(".chip");
      right.append(btn);
      if (chip) right.append(chip);
      head.append(right);
    });
    $("#updated").textContent = `집계 ${Y[0]}~${Y.at(-1)}년 (해마다 1~11월)`;
  }

  // ---------- 전체 갱신 ----------
  function render() {
    setYearChips();
    renderTicker();
    renderHero();
    renderScale();
    renderSeason();
    renderShip();
    renderEquip();
    renderFlow();
    renderDest();
    renderCrop();
    const vk = `${state.flow ? "flow" : sidoOf(state.key) || NATION}`;
    if (vk !== lastViewKey) applyView(true);
    else { paintMap(); drawLabels(false); }
    renderRank();
  }

  $$("#dir button").forEach((b) => b.addEventListener("click", () => {
    state.dir = b.dataset.dir;
    renderFlow();
    if (!state.flow) setFlow(true);
    else paintMap();
  }));

  // 시작 상태: ?y=연도 &c=비교 &m=지표 &flow=1 &dir=in &rank=nation
  const q = new URLSearchParams(location.search);
  if (q.get("y") && Y.includes(+q.get("y"))) state.yi = Y.indexOf(+q.get("y"));
  if (["1", "5", "10"].includes(q.get("c"))) state.cmp = +q.get("c");
  const initial = METRICS.find((m) => m.key === q.get("m"));
  if (initial) { state.metric = initial; state.group = initial.group; }
  if (q.get("flow") === "1") state.flow = true;
  if (q.get("dir") === "in") state.dir = "in";
  if (q.get("rank") === "nation") state.rankScope = "nation";
  $("#flow-btn").setAttribute("aria-pressed", state.flow);

  initChips();
  sources();
  state.key = fromHash();
  syncControls();
  drawMap();
  render();
  window.addEventListener("hashchange", () => { const k = fromHash(); if (k !== state.key) select(k); });

  let resizeT;
  let lastSize = "";
  new ResizeObserver(() => {
    const wrap = $("#map-wrap");
    const sizeKey = `${wrap.clientWidth}x${FIT.matches ? wrap.clientHeight : 0}`;
    if (sizeKey === lastSize) return;
    lastSize = sizeKey;
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { drawMap(); render(); }, 120);
  }).observe($("#map-wrap"));

  const chartSizes = new Map();
  const chartRO = new ResizeObserver((entries) => {
    const changed = entries.some((e) => {
      const key = `${Math.round(e.contentRect.width)}x${Math.round(e.contentRect.height)}`;
      if (chartSizes.get(e.target) === key) return false;
      chartSizes.set(e.target, key);
      return true;
    });
    if (!changed) return;
    renderScale();
    renderSeason();
    renderShip();
    renderEquip();
    renderDest();
    renderOD();
  });
  ["#chart-share", "#chart-annual", "#heat", "#stack-ship", "#stack-cpool", "#stack-dest", "#od"].forEach((s) => chartRO.observe($(s)));
  FIT.addEventListener("change", () => { lastSize = ""; drawMap(); render(); });
})();
