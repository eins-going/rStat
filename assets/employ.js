(() => {
  // 농업고용 — 경제활동인구조사(월, 전국·시도)·지역별고용조사(반기, 시군) (data/employ.js, scripts/build_employ.py)
  // 지역 체계·지도는 농사용 전기(power.js)와 같다. 값은 천 명.
  const E = window.AGRI_EMPLOY;
  const T = window.AGRI_TOPO;
  const H = E.halves; // ["2013-1", …]
  const HL = H.length - 1;
  const M = E.months; // ["1982-07", …]
  const ML = M.length - 1;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ---------- 지역: '00' 전국 · '31' 시도 · '31|수원시' 시군 ----------
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
  const ALL_UNITS = SIDO_CODES.flatMap((s) => UNITS_BY_SIDO[s]);
  const level = (k) => (k === NATION ? 0 : k.includes("|") ? 2 : 1);
  const sidoOf = (k) => (level(k) === 2 ? k.split("|")[0] : level(k) === 1 ? k : null);
  const parentOf = (k) => (level(k) === 2 ? sidoOf(k) : level(k) === 1 ? NATION : null);
  const label = (k) => (k === NATION ? "전국" : level(k) === 1 ? T.sidos[k]?.name ?? k : k.split("|")[1]);
  const shortLabel = (k) => (level(k) === 1 ? T.sidos[k]?.short ?? k : label(k));
  const fullLabel = (k) => (level(k) === 2 ? `${T.sidos[sidoOf(k)]?.short ?? ""} ${label(k)}` : shortLabel(k));

  // ---------- 숫자 ----------
  const nf0 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const ok = (n) => n != null && Number.isFinite(n);
  const sgn = (n) => (n > 0 ? "+" : n < 0 ? "−" : "");
  const pctS = (n) => (ok(n) ? `${sgn(n)}${nf1.format(Math.abs(n))}%` : "–");
  const pct = (n) => (ok(n) ? `${nf1.format(n)}%` : "–");
  const pp = (n) => (ok(n) ? `${sgn(n)}${nf1.format(Math.abs(n))}%p` : "–");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // 천 명 → [수, 단위]: 1만 명이 넘으면 '만 명'
  function people(k) {
    if (!ok(k)) return ["–", ""];
    const n = k * 1000;
    return Math.abs(n) >= 1e4 ? [nf1.format(n / 1e4), "만 명"] : [nf0.format(n), "명"];
  }
  const peopleText = (k) => (ok(k) ? people(k).join("") : "–");
  const share = (a, t) => (ok(a) && ok(t) && t > 0 ? (a / t) * 100 : null);
  const halfText = (i) => { const [y, h] = H[i].split("-"); return `${y}년 ${h === "1" ? "상반기" : "하반기"}`; };
  const halfShort = (i) => { const [y, h] = H[i].split("-"); return `${y} ${h === "1" ? "상" : "하"}반기`; };
  const monthText = (i) => { const [y, m] = M[i].split("-"); return `${y}년 ${+m}월`; };
  const deltaHTML = (d, text) => {
    if (!ok(d)) return "";
    const cls = d > 0 ? "up" : d < 0 ? "down" : "";
    return `<span class="${cls}">${d > 0 ? "▲" : d < 0 ? "▼" : "–"} ${text}</span>`;
  };

  // ---------- 자료 꺼내기 ----------
  const mAt = (k, f, i) => E.m[k]?.[f]?.[i] ?? null; // 월 (경활)
  const yAt = (k, f, i) => E.y[k]?.[f]?.[i] ?? null; // 연 (경활)
  const uAt = (k, f, h) => (h >= 0 && h <= HL ? E.u[k]?.[f]?.[h] ?? null : null); // 반기 시군 (지역별)
  const sAt = (k, f, h) => (h >= 0 && h <= HL ? E.s[k]?.[f]?.[h] ?? null : null); // 반기 전국·시도 (지역별)
  // 자료가 있는 마지막 월 (시도마다 같다)
  const lastMonth = (k) => { const a = E.m[k]?.a || []; for (let i = a.length - 1; i >= 0; i--) if (ok(a[i])) return i; return -1; };
  // 반기 h 이하에서 값이 있는 마지막 반기
  const lastHalf = (arr, h) => { for (let i = Math.min(h, (arr?.length ?? 0) - 1); i >= 0; i--) if (arr[i] != null && (!Array.isArray(arr[i]) || arr[i].some(ok))) return i; return -1; };

  // ---------- 지도 지표 (시군, 반기) ----------
  const uShare = (k, h) => share(uAt(k, "a", h), uAt(k, "t", h));
  const METRICS = [
    { key: "share", group: "사는 곳", chip: "농림어업 비중", label: "취업자 중 농림어업 비중", kind: "seq", get: uShare, fmt: pct,
      note: "그 시군에 사는 취업자 가운데 농업·임업·어업에서 일하는 사람의 비율 (지역별고용조사)" },
    { key: "count", group: "사는 곳", chip: "취업자", label: "농림어업 취업자", kind: "seq", get: (k, h) => uAt(k, "a", h), fmt: peopleText,
      note: "그 시군에 사는 농림어업 취업자 수. 표본조사라 작은 시군은 오차가 크다 (툴팁의 RSE)" },
    { key: "d5", group: "사는 곳", chip: "5년 전 대비", label: "농림어업 비중 5년 전 대비", kind: "div", get: (k, h) => { const a = uShare(k, h), b = uShare(k, h - 10); return ok(a) && ok(b) ? a - b : null; }, fmt: pp,
      note: "농림어업 비중을 5년 전 같은 반기와 비교 (%p). 한 해 표본 흔들림보다 긴 변화를 본다" },
    { key: "wshare", group: "일하는 곳", chip: "농림어업 비중", label: "일자리 중 농림어업 비중 (일하는 곳)", kind: "seq", get: (k, h) => share(uAt(k, "wa", h), uAt(k, "wt", h)), fmt: pct,
      note: "그 시군에서 일하는 취업자(근무지 기준) 가운데 농림어업 비율" },
    { key: "flow", group: "일하는 곳", chip: "들고 나는 농업인", label: "들고 나는 농업인 (이곳 농림어업 일자리 대비 주민)", kind: "div",
      get: (k, h) => { const a = uAt(k, "a", h), w = uAt(k, "wa", h); return ok(a) && ok(w) && a >= 1 ? (w / a - 1) * 100 : null; }, fmt: pctS,
      note: "+면 다른 시군에서 농사지으러 들어오는 사람이 많고, −면 이곳 주민이 다른 시군 농지로 나간다 (농림어업 취업 주민 1천 명 이상)" },
    { key: "occ", group: "직업", chip: "숙련직", label: "취업자 중 농림어업 숙련 종사자 비중", kind: "seq", get: (k, h) => share(uAt(k, "oa", h), uAt(k, "ot", h)), fmt: pct,
      note: "직업으로 본 농림어업 숙련 종사자(직접 농사·어로 일을 하는 사람) 비율. 농업 법인 사무직 등은 빠진다" },
  ];
  const DEFAULT_METRIC = METRICS[0];
  const state = { key: NATION, h: HL, metric: DEFAULT_METRIC };

  // ---------- 선택 ----------
  const selSido = $("#sido"), selSgg = $("#sgg"), selHalf = $("#half");
  selSido.innerHTML = `<option value="${NATION}">전국</option>` + SIDO_CODES.map((s) => `<option value="${s}">${T.sidos[s].name}</option>`).join("");
  selHalf.innerHTML = H.map((_, i) => `<option value="${i}">${halfShort(i)}</option>`).reverse().join("");
  selSido.addEventListener("change", () => select(selSido.value));
  selSgg.addEventListener("change", () => select(selSgg.value || selSido.value));
  selHalf.addEventListener("change", () => { state.h = +selHalf.value; render(false); });

  function syncControls() {
    const s = sidoOf(state.key);
    selSido.value = s || NATION;
    selSgg.disabled = !s;
    selSgg.innerHTML = `<option value="">${s ? "전체" : "–"}</option>` + (s ? UNITS_BY_SIDO[s].map((k) => `<option value="${k}">${label(k)}</option>`).join("") : "");
    selSgg.value = level(state.key) === 2 ? state.key : "";
    selHalf.value = state.h;
  }

  // ---------- 주소: #경상북도/의성군?h=2025-2&m=flow ----------
  function syncURL() {
    const k = state.key;
    const path = k === NATION ? "" : level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`;
    const q = new URLSearchParams();
    if (state.h !== HL) q.set("h", H[state.h]);
    if (state.metric !== DEFAULT_METRIC) q.set("m", state.metric.key);
    const url = `${location.pathname}${q.toString() ? `?${q}` : ""}${path ? `#${encodeURIComponent(path)}` : ""}`;
    if (url !== location.pathname + location.search + location.hash) history.replaceState(null, "", url);
  }
  function fromURL() {
    const [a, b] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = SIDO_CODES.find((c) => T.sidos[c].name === a || T.sidos[c].short === a);
    state.key = s ? (b && UNITS_BY_SIDO[s].find((k) => label(k) === b)) || s : NATION;
    const q = new URLSearchParams(location.search);
    const h = H.indexOf(q.get("h"));
    state.h = h >= 0 ? h : HL;
    state.metric = METRICS.find((m) => m.key === q.get("m")) || DEFAULT_METRIC;
  }

  // ---------- 지도 ----------
  const RAMP = ["#27302b", "#2f4636", "#3c6247", "#4f895f", "#72c48d"];
  const DIV = ["#5fb3ff", "#2f5f93", "#3a3d44", "#93453b", "#ff6b5e"];
  const EMPTY = "#2a2d33";
  const mapSvg = d3.select("#map");
  const tip = $("#tip");
  const obj = T.objects.municipalities;
  const unitFeatures = ALL_UNITS.map((k) => ({
    type: "Feature", properties: { key: k, sido: sidoOf(k) },
    geometry: topojson.merge(T, GEOMS.filter((g) => unitKeyOf(g) === k)),
  }));
  const sidoFeatures = SIDO_CODES.map((s) => ({
    type: "Feature", properties: { key: s }, geometry: topojson.merge(T, GEOMS.filter((g) => g.properties.sido === s)),
  }));
  const sidoMesh = topojson.mesh(T, obj, (a, b) => a !== b && a.properties.sido !== b.properties.sido);
  // 울릉군은 동해 멀리 있어 그리는 자리만 서쪽으로 0.8° 당기고 점선 테두리로 알린다 (power.js와 같다)
  const ULLEUNG = { key: "37|울릉군", fromLon: 130.6, dx: -0.8 };
  const drawLon = (lon) => (lon > ULLEUNG.fromLon ? lon + ULLEUNG.dx : lon);
  const KX = Math.cos((36 * Math.PI) / 180);
  const BOUNDS = (() => {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    const walk = (c) => {
      if (typeof c[0] === "number") { const x = drawLon(c[0]) * KX; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, c[1]); y1 = Math.max(y1, c[1]); }
      else c.forEach(walk);
    };
    sidoFeatures.forEach((f) => walk(f.geometry.coordinates));
    return { x0, x1, y0, y1 };
  })();
  const FIT = window.matchMedia("(min-width: 1281px) and (min-height: 720px)");
  let path = null, size = { w: 0, h: 0 };

  function drawMap() {
    const wrap = $("#map-wrap");
    const w = wrap.clientWidth;
    const h = FIT.matches ? Math.max(240, wrap.clientHeight) : Math.round(Math.max(380, Math.min(720, w * 1.05)));
    size = { w, h };
    const pad = 12, bw = BOUNDS.x1 - BOUNDS.x0, bh = BOUNDS.y1 - BOUNDS.y0;
    const s = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
    const ox = (w - bw * s) / 2, oy = (h - bh * s) / 2;
    path = d3.geoPath(d3.geoTransform({ point(lon, lat) { this.stream.point(ox + (drawLon(lon) * KX - BOUNDS.x0) * s, oy + (BOUNDS.y1 - lat) * s); } }));
    mapSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", FIT.matches ? null : h);
    const world = mapSvg.selectAll("g.world").data([0]).join("g").attr("class", "world");
    world.selectAll("g.units").data([0]).join("g").attr("class", "units")
      .selectAll("path").data(unitFeatures, (d) => d.properties.key).join("path")
      .attr("class", "region unit").attr("d", path).attr("tabindex", 0).attr("role", "button")
      .on("mousemove", (e, d) => showTip(e, d.properties.key))
      .on("mouseleave", () => { tip.hidden = true; })
      .on("click", (e, d) => onRegionClick(d.properties.key))
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRegionClick(d.properties.key); } });
    world.selectAll("path.mesh-sido").data([sidoMesh]).join("path").attr("class", "mesh-sido").attr("d", path);
    const ul = unitFeatures.find((f) => f.properties.key === ULLEUNG.key);
    const [[ux0, uy0], [ux1, uy1]] = ul ? path.bounds(ul) : [[0, 0], [0, 0]];
    world.selectAll("rect.inset-frame").data(ul ? [0] : []).join("rect").attr("class", "inset-frame")
      .attr("x", ux0 - 5).attr("y", uy0 - 5).attr("width", ux1 - ux0 + 10).attr("height", uy1 - uy0 + 10).attr("rx", 3)
      .append("title").text("울릉군: 지도에서 보기 좋게 실제보다 서쪽으로 옮겨 그림");
    applyView(false);
  }

  function targetView() {
    const s = sidoOf(state.key);
    if (!s) return d3.zoomIdentity;
    const [[x0, y0], [x1, y1]] = path.bounds(sidoFeatures.find((f) => f.properties.key === s));
    const pad = 28;
    const k = Math.min(14, (size.w - pad * 2) / (x1 - x0), (size.h - pad * 2) / (y1 - y0));
    return d3.zoomIdentity.translate(size.w / 2 - ((x0 + x1) / 2) * k, size.h / 2 - ((y0 + y1) / 2) * k).scale(k);
  }

  function applyView(animate) {
    const world = mapSvg.select("g.world");
    const t = targetView();
    if (animate && !reduceMotion) world.transition().duration(700).ease(d3.easeCubicInOut).attr("transform", t);
    else world.interrupt().attr("transform", t);
  }

  function onRegionClick(k) {
    if (k === state.key) select(sidoOf(k));
    else select(k);
  }

  function scaleFor(m, vals) {
    if (!vals.length) return { fn: () => EMPTY, rows: [] };
    if (m.kind === "div") {
      const dev = vals.map(Math.abs).sort((a, b) => a - b);
      const lim = dev[Math.floor((dev.length - 1) * 0.9)] || dev.at(-1) || 1;
      const cuts = [-lim * 0.6, -lim * 0.15, lim * 0.15, lim * 0.6];
      const edge = [null, ...cuts, null];
      return {
        fn: (v) => DIV[d3.bisectRight(cuts, v)],
        rows: DIV.map((c, i) => [c, i === 0 ? `${m.fmt(cuts[0])} 미만` : i === 4 ? `${m.fmt(cuts[3])} 이상` : `${m.fmt(edge[i])} ~ ${m.fmt(edge[i + 1])}`]),
      };
    }
    const q = d3.scaleQuantile().domain(vals).range(RAMP);
    const e = [d3.min(vals), ...q.quantiles(), d3.max(vals)];
    return { fn: q, rows: RAMP.map((c, i) => [c, `${m.fmt(e[i])}–${m.fmt(e[i + 1])}`]) };
  }

  function paintMap() {
    const m = state.metric, h = state.h, s = sidoOf(state.key);
    const vals = ALL_UNITS.map((k) => m.get(k, h)).filter(ok);
    const sc = scaleFor(m, vals);
    mapSvg.selectAll("path.unit")
      .attr("fill", (d) => { const v = m.get(d.properties.key, h); return ok(v) ? sc.fn(v) : EMPTY; })
      .classed("sel", (d) => d.properties.key === state.key)
      .classed("pw-ctx", (d) => !!s && d.properties.sido !== s)
      .attr("aria-label", (d) => `${fullLabel(d.properties.key)} ${m.label} ${m.fmt(m.get(d.properties.key, h))}`);
    mapSvg.selectAll("path.unit.sel").raise();
    mapSvg.classed("dimmed", level(state.key) === 2);
    const missing = ALL_UNITS.length - vals.length;
    $("#legend").innerHTML = `<span class="title">${m.label} <span style="color:var(--faint);font-weight:400">${halfText(h)}</span></span>`
      + sc.rows.map(([c, t]) => `<span class="row"><span class="sw" style="background:${c}"></span>${t}</span>`).join("")
      + (missing ? `<span class="row"><span class="sw" style="background:${EMPTY};outline:1px solid #3a3f48"></span>자료 없음 ${missing}</span>` : "");
    $("#metric-note").textContent = m.note;
    $("#map").setAttribute("aria-label", `${m.label} 시군 지도`);
  }

  function showTip(e, k) {
    const h = state.h, m = state.metric;
    const a = uAt(k, "a", h), r = uAt(k, "ar", h), w = uAt(k, "wa", h);
    tip.innerHTML = `<b>${esc(fullLabel(k))}</b>${m.label} <b style="display:inline">${m.fmt(m.get(k, h))}</b><br>`
      + `${halfText(h)} · 농림어업 취업 주민 ${peopleText(a)} (${pct(uShare(k, h))})`
      + (ok(w) ? `<br>이곳 농림어업 일자리 ${peopleText(w)}` : "")
      + (ok(r) ? `<br><span${r >= 25 ? ' style="color:var(--accent)"' : ""}>상대표준오차 ${nf1.format(r)}%${r >= 25 ? " · 표본오차 큼" : ""}</span>` : "");
    const rect = $("#map-wrap").getBoundingClientRect();
    tip.style.left = `${e.clientX - rect.left}px`;
    tip.style.top = `${e.clientY - rect.top}px`;
    tip.hidden = false;
  }

  // ---------- 지표 칩 ----------
  function renderChips() {
    $("#chips").innerHTML = METRICS.map((m, j) => `${j === 0 || METRICS[j - 1].group !== m.group ? `<span class="pw-chip-g">${m.group}</span>` : ""}<button type="button" data-k="${m.key}" aria-pressed="${m === state.metric}" title="${m.label}">${m.chip}</button>`).join("");
    $$("#chips button").forEach((b) => b.addEventListener("click", () => {
      state.metric = METRICS.find((m) => m.key === b.dataset.k);
      $$("#chips button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      syncURL();
      paintMap();
      renderRank();
    }));
  }

  // ---------- 순위 ----------
  function renderRank() {
    const m = state.metric, h = state.h, s = sidoOf(state.key);
    const peers = s ? UNITS_BY_SIDO[s] : ALL_UNITS;
    const name = (k) => (s ? label(k) : fullLabel(k));
    const list = peers.map((k) => [k, m.get(k, h)]).filter(([, v]) => ok(v)).sort((a, b) => b[1] - a[1]);
    const max = Math.max(...list.map(([, v]) => Math.abs(v)), 0) || 1;
    const row = ([k, v], no) => `
      <button type="button" class="rank-row${s ? "" : " wide"}${k === state.key ? " sel" : ""}" data-r="${k}">
        <span class="no">${no}</span><span class="nm">${esc(name(k))}</span>
        <span class="track"><span class="fill${v < 0 ? " neg" : ""}" style="width:${(Math.abs(v) / max) * 100}%"></span></span>
        <span class="val">${m.fmt(v)}</span><span></span>
      </button>`;
    const top = list.slice(0, 10);
    const selIdx = list.findIndex(([k]) => k === state.key);
    const extra = selIdx >= 10 ? `<div class="rank-title" style="margin:4px 0 0"><span>선택한 지역</span></div>${row(list[selIdx], selIdx + 1)}` : "";
    $("#rank").innerHTML = list.length ? `
      <div class="rank-title"><span><b>${m.label}</b> 상위 ${s ? `${T.sidos[s].short} 시군` : "시군"}</span><span class="rank-meta">${halfText(h)} · ${list.length}곳</span></div>
      <div>${top.slice(0, 5).map((d, j) => row(d, j + 1)).join("")}</div>
      <div>${top.slice(5).map((d, j) => row(d, j + 6)).join("")}</div>${extra}` : "";
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => select(b.dataset.r)));
  }

  // ---------- 그림 공통 ----------
  function frame(el, h0) {
    const w = el.clientWidth || 300, h = el.clientHeight || h0;
    el._wh = [w, h];
    el.innerHTML = "";
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    return { svg, w, h };
  }
  const empty = (svg, text = "자료 없음") => svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text(text);
  function gridY(svg, y, ticks, x0, x1, fmt, right = false) {
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(ticks).join("g").call((g) => {
      if (!right) g.append("line").attr("x1", x0).attr("x2", x1).attr("y1", (d) => y(d)).attr("y2", (d) => y(d));
      g.append("text").attr("x", right ? x1 + 5 : x0 - 5).attr("y", (d) => y(d) + 4).attr("text-anchor", right ? "start" : "end").text(fmt);
    });
  }

  // ---------- 왼쪽: 규모 ----------
  function setStat(key, [v, u], deltaHtml = "") {
    $(`[data-v="${key}"]`).textContent = v;
    const unit = $(`[data-u="${key}"]`);
    if (unit) unit.textContent = u;
    $(`[data-d="${key}"]`).innerHTML = deltaHtml;
  }

  function renderSize() {
    const k = state.key;
    $("#size-scope").textContent = `(${fullLabel(k)})`;
    if (level(k) < 2) {
      const i = lastMonth(k);
      const a = mAt(k, "a", i), t = mAt(k, "t", i), a0 = mAt(k, "a", i - 12), t0 = mAt(k, "t", i - 12);
      $("#size-when").textContent = i >= 0 ? `${monthText(i)} · 경활` : "";
      const d = ok(a) && ok(a0) ? a - a0 : null;
      setStat("cnt", people(a), d == null ? "" : `<span class="d-lab">전년 같은 달</span>${deltaHTML(d, `${peopleText(Math.abs(d))} (${pctS((a / a0 - 1) * 100).replace(/^[+−]/, "")})`)}`);
      const s1 = share(a, t), s0 = share(a0, t0);
      setStat("share", [ok(s1) ? nf1.format(s1) : "–", "%"], ok(s1) && ok(s0) ? `<span class="d-lab">전년 같은 달</span>${deltaHTML(s1 - s0, pp(Math.abs(s1 - s0)).replace(/^[+−]/, ""))}` : "");
    } else {
      const h = lastHalf(E.u[k]?.a, state.h);
      const a = uAt(k, "a", h), a0 = uAt(k, "a", h - 2);
      $("#size-when").textContent = h >= 0 ? `${halfShort(h)} · 지역별` : "";
      const d = ok(a) && ok(a0) ? a - a0 : null;
      const r = uAt(k, "ar", h);
      setStat("cnt", people(a), (d == null ? "" : `<span class="d-lab">전년 같은 반기</span>${deltaHTML(d, peopleText(Math.abs(d)))}`) + (ok(r) ? ` <span class="em-rse${r >= 25 ? " hi" : ""}">RSE ${nf0.format(r)}%</span>` : ""));
      const s1 = uShare(k, h), s0 = uShare(k, h - 2);
      setStat("share", [ok(s1) ? nf1.format(s1) : "–", "%"], ok(s1) && ok(s0) ? `<span class="d-lab">전년 같은 반기</span>${deltaHTML(s1 - s0, pp(Math.abs(s1 - s0)).replace(/^[+−]/, ""))}` : "");
    }
    drawLong();
    renderMix();
  }

  // 긴 흐름: 전국 1963~ · 시도 1989~ (연평균, 경활) · 시군 2013~ (반기, 지역별)
  function longSeries(k) {
    if (level(k) < 2) {
      const ys = E.years.map((y, i) => ({ x: +y, a: yAt(k, "a", i), s: share(yAt(k, "a", i), yAt(k, "t", i)), lab: `${y}년` })).filter((d) => ok(d.a));
      return { pts: ys, kind: "y" };
    }
    const hs = H.map((hh, i) => ({ x: i, a: uAt(k, "a", i), s: uShare(k, i), lab: halfShort(i) })).filter((d) => ok(d.a));
    return { pts: hs, kind: "h" };
  }
  function drawLong() {
    const k = state.key, el = $("#chart-long");
    const { svg, w, h } = frame(el, 130);
    const { pts, kind } = longSeries(k);
    $("#long-note").textContent = kind === "y" ? `${pts[0]?.x ?? ""}~${pts.at(-1)?.x ?? ""} · 연평균 · 경활` : `반기 · 지역별고용조사`;
    if (pts.length < 2) { empty(svg); $("#long-key").innerHTML = ""; return; }
    const m = { l: 38, r: 34, t: 16, b: 16 };
    const x = d3.scaleLinear().domain(d3.extent(pts, (d) => d.x)).range([m.l, w - m.r]);
    const ya = d3.scaleLinear().domain([0, d3.max(pts, (d) => d.a) * 1.08]).nice(3).range([h - m.b, m.t]);
    const ys = d3.scaleLinear().domain([0, Math.max(1, d3.max(pts, (d) => d.s ?? 0) * 1.08)]).nice(3).range([h - m.b, m.t]);
    gridY(svg, ya, ya.ticks(3), m.l, w - m.r, (d) => (d ? `${nf0.format(d / 10)}만` : "0"));
    gridY(svg, ys, ys.ticks(3).filter((d) => d), m.l, w - m.r, (d) => `${d}%`, true);
    // 가로축: 연 10년 간격 · 반기는 해마다 상반기 2년 간격
    const xt = kind === "y" ? pts.map((d) => d.x).filter((v) => v % 10 === 0) : pts.filter((d) => H[d.x].endsWith("-1") && +H[d.x].slice(0, 4) % 2 === 0).map((d) => d.x);
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(xt).join("text").attr("x", (d) => x(d)).attr("y", h - 3).attr("text-anchor", "middle")
      .text((d) => (kind === "y" ? d : `'${H[d].slice(2, 4)}`));
    svg.append("path").attr("class", "em-area").attr("d", d3.area().x((d) => x(d.x)).y0(h - m.b).y1((d) => ya(d.a)).curve(d3.curveMonotoneX)(pts));
    svg.append("path").attr("class", "em-aline").attr("d", d3.line().x((d) => x(d.x)).y((d) => ya(d.a)).curve(d3.curveMonotoneX)(pts));
    svg.append("path").attr("class", "em-sline").attr("d", d3.line().defined((d) => ok(d.s)).x((d) => x(d.x)).y((d) => ys(d.s)).curve(d3.curveMonotoneX)(pts));
    // 이야기 점: 비중 처음·끝, 취업자가 가장 많던 해
    const first = pts[0], last = pts.at(-1), peak = pts[d3.maxIndex(pts, (d) => d.a)];
    const marks = [
      { d: first, y: ys(first.s), t: pct(first.s), anchor: "start", cls: "s" },
      { d: last, y: ys(last.s), t: pct(last.s), anchor: "end", cls: "s" },
    ];
    if (kind === "y" && peak !== first && peak !== last) marks.push({ d: peak, y: ya(peak.a), t: `${peak.x} ${peopleText(peak.a)}`, anchor: "middle", cls: "a" });
    const g = svg.append("g").attr("class", "em-marks");
    marks.forEach((mk) => {
      g.append("circle").attr("class", `em-mk ${mk.cls}`).attr("cx", x(mk.d.x)).attr("cy", mk.y).attr("r", 2.8);
      g.append("text").attr("class", `em-mt ${mk.cls}`).attr("x", x(mk.d.x) + (mk.anchor === "start" ? 5 : mk.anchor === "end" ? -5 : 0)).attr("y", mk.y - 6).attr("text-anchor", mk.anchor).text(mk.t);
    });
    const read = svg.append("text").attr("class", "em-readout").attr("x", m.l + 2).attr("y", 10);
    const hv = svg.append("g").attr("class", "em-hover").style("display", "none");
    const ln = hv.append("line").attr("y1", m.t).attr("y2", h - m.b);
    const dot = hv.append("circle").attr("r", 3).attr("class", "em-hdot");
    svg.append("rect").attr("x", m.l).attr("y", 0).attr("width", w - m.l - m.r).attr("height", h - m.b).attr("fill", "transparent")
      .on("mousemove", (e) => {
        const px = d3.pointer(e)[0];
        const d = pts[d3.minIndex(pts, (p) => Math.abs(x(p.x) - px))];
        hv.style("display", null);
        ln.attr("x1", x(d.x)).attr("x2", x(d.x));
        dot.attr("cx", x(d.x)).attr("cy", ya(d.a));
        g.style("opacity", 0.25);
        read.text(`${d.lab} · ${peopleText(d.a)} · 비중 ${pct(d.s)}`);
      })
      .on("mouseleave", () => { hv.style("display", "none"); g.style("opacity", null); read.text(""); });
    $("#long-key").innerHTML = `<span><i class="em-k-a"></i>농림어업 취업자 (왼쪽)</span><span><i class="em-k-s"></i>전체 취업자 중 비중 (오른쪽)</span>`;
  }

  // 무슨 일을 하나: 전국은 작물재배·축산·임업·어업, 시도는 농업·임업·어업 (지역별고용조사)
  const MIX_COLORS = ["#72c48d", "#3f7d55", "#8fa79a", "#c9a46a", "#5fa8d9"];
  function renderMix() {
    const k = state.key, el = $("#mix");
    let parts = null, h = -1;
    if (k === NATION) {
      const sub = E.mix.sub;
      h = lastHalf(sub.A, state.h);
      if (h >= 0) {
        const crop = sub["011"][h], live = sub["012"][h], farm = sub["01"][h];
        parts = [["작물재배업", crop], ["축산업", live], ["복합·농업서비스", farm - crop - live], ["임업", sub["02"][h]], ["어업", sub["03"][h]]];
      }
    } else if (level(k) === 1) {
      h = lastHalf(E.s[k]?.a, state.h);
      if (h >= 0) parts = [["농업", sAt(k, "n1", h)], ["임업", sAt(k, "n2", h)], ["어업", sAt(k, "n3", h)]];
    }
    if (!parts) {
      $("#mix-note").textContent = "";
      el.innerHTML = `<p class="note em-mix-none">시군 자료는 농업·임업·어업을 합친 값만 나옵니다. ${esc(shortLabel(sidoOf(k)))} 구성은 시도를 고르면 볼 수 있습니다.</p>`;
      return;
    }
    const colors = parts.length === 3 ? [MIX_COLORS[0], MIX_COLORS[3], MIX_COLORS[4]] : MIX_COLORS;
    const tot = d3.sum(parts, (p) => p[1] || 0);
    $("#mix-note").textContent = `${halfShort(h)} · 지역별`;
    el.innerHTML = `<div class="em-bar">${parts.map(([n, v], i) => `<span style="flex:${Math.max(0, v || 0)};background:${colors[i]}" title="${n} ${peopleText(v)} (${pct(share(v, tot))})"></span>`).join("")}</div>`
      + `<div class="em-barkey">${parts.map(([n, v], i) => `<span><i style="background:${colors[i]}"></i>${n} <b>${nf0.format(share(v, tot) ?? 0)}%</b></span>`).join("")}</div>`;
  }

  // ---------- 왼쪽 2: 시군별 흐름 (계절은 한 줄로) ----------
  function seasonGrid(k) {
    const a = E.m[k]?.a || [];
    const rows = new Map();
    M.forEach((ym, i) => { if (ok(a[i])) { const [y, mm] = ym.split("-"); (rows.get(+y) || rows.set(+y, Array(12).fill(null)).get(+y))[+mm - 1] = a[i]; } });
    // 계절 지수: 그해 월평균 = 100 (12달이 다 찬 해만)
    return [...rows.keys()].sort((p, q) => p - q).map((y) => ({ y, v: rows.get(y) })).filter((r) => r.v.every(ok))
      .map((r) => ({ ...r, idx: r.v.map((x) => (x / d3.mean(r.v)) * 100) }));
  }
  // 계절: 최근 3년 평균 계절 지수 선 + 처음 해(점선)
  function renderSeasonStrip(k) {
    const grid = seasonGrid(k);
    const el = $("#chart-season");
    const { svg, w, h } = frame(el, 40);
    if (!grid.length) { $("#season-line").textContent = ""; return; }
    const recent = grid.slice(-3), first = grid[0], last = grid.at(-1);
    const prof = d3.range(12).map((j) => d3.mean(recent, (r) => r.idx[j]));
    const all = [...prof, ...first.idx];
    const x = d3.scalePoint().domain(d3.range(12)).range([14, w - 4]);
    const y = d3.scaleLinear().domain([d3.min(all) - 2, d3.max(all) + 2]).range([h - 12, 3]);
    svg.append("line").attr("class", "em-base").attr("x1", 14).attr("x2", w - 4).attr("y1", y(100)).attr("y2", y(100)).style("stroke-dasharray", "2 3");
    const line = d3.line().x((d, j) => x(j)).y((d) => y(d)).curve(d3.curveMonotoneX);
    if (first !== last) svg.append("path").attr("class", "em-l-all").attr("d", line(first.idx));
    svg.append("path").attr("class", "em-l-agri").attr("d", line(prof));
    svg.append("g").attr("class", "pw-axis").selectAll("text").data([0, 2, 4, 6, 8, 10, 11]).join("text").attr("x", (j) => x(j)).attr("y", h - 1).attr("text-anchor", "middle").text((j) => `${j + 1}`);
    const rx = (r) => d3.max(r.v) / d3.min(r.v);
    const hi = d3.maxIndex(prof), lo = d3.minIndex(prof);
    $("#season-line").innerHTML = `<b>계절</b> ${hi + 1}월에 가장 많고 ${lo + 1}월에 가장 적다 · <b class="em-acc">${nf1.format(rx(last))}배</b>`
      + (first !== last ? ` <span class="em-dim">(${first.y}년 ${nf1.format(rx(first))}배, 점선)</span>` : "");
  }
  // 작은 그래프 하나: 0~100 상자 안 경로 (모양만 본다)
  function spark(vals) {
    const pts = vals.map((v, i) => [i, v]).filter(([, v]) => ok(v));
    if (pts.length < 2) return "";
    const [lo, hi] = d3.extent(pts, (p) => p[1]);
    const x = d3.scaleLinear().domain([0, vals.length - 1]).range([1, 99]);
    const y = d3.scaleLinear().domain(lo === hi ? [lo - 1, hi + 1] : [lo, hi]).range([22, 2]);
    const d = d3.line().x((p) => x(p[0])).y((p) => y(p[1]))(pts);
    const area = `${d}L${x(pts.at(-1)[0])},24L${x(pts[0][0])},24Z`;
    return `<svg viewBox="0 0 100 24" preserveAspectRatio="none"><path class="em-sp-a" d="${area}"/><path class="em-sp-l" d="${d}"/></svg>`;
  }
  function trendItems() {
    const k = state.key;
    if (level(k) === 0) {
      // 시도: 경활 연평균 (1989~)
      const yi = E.years.length - 1;
      const i0 = E.years.indexOf("1989");
      return {
        mode: "sido", from: E.years[i0], to: E.years[yi], base: `${E.years[yi - 5]}→${E.years[yi]}`,
        items: SIDO_CODES.map((c) => ({
          k: c, name: shortLabel(c), share: share(yAt(c, "a", yi), yAt(c, "t", yi)),
          chg: ok(yAt(c, "a", yi)) && yAt(c, "a", yi - 5) ? (yAt(c, "a", yi) / yAt(c, "a", yi - 5) - 1) * 100 : null,
          vals: E.years.slice(i0).map((_, j) => yAt(c, "a", i0 + j)),
        })),
      };
    }
    // 시군: 지역별고용조사 반기 → 상·하반기가 다 있는 해의 연평균 (표본 흔들림을 줄인다)
    const s = sidoOf(k), hh = state.h;
    const years = [...new Set(H.map((x) => x.slice(0, 4)))].filter((y) => H.includes(`${y}-1`) && H.includes(`${y}-2`));
    return {
      mode: "unit", from: years[0], to: years.at(-1), base: hh - 10 >= 0 ? `${halfShort(hh - 10)}→${halfShort(hh)}` : "",
      items: UNITS_BY_SIDO[s].map((u) => ({
        k: u, name: label(u), share: uShare(u, hh),
        chg: ok(uAt(u, "a", hh)) && uAt(u, "a", hh - 10) ? (uAt(u, "a", hh) / uAt(u, "a", hh - 10) - 1) * 100 : null,
        vals: years.map((y) => { const p = uAt(u, "a", H.indexOf(`${y}-1`)), q = uAt(u, "a", H.indexOf(`${y}-2`)); return ok(p) && ok(q) ? (p + q) / 2 : null; }),
      })),
    };
  }
  function renderSeason() {
    const k = state.key, sk = level(k) === 2 ? sidoOf(k) : k;
    const T0 = trendItems();
    $("#trend-title").firstChild.textContent = T0.mode === "sido" ? "시도별 흐름 " : "시군별 흐름 ";
    $("#season-scope").textContent = `(${shortLabel(sk)})`;
    $("#trend-when").textContent = `${T0.from}~${T0.to} · ${T0.mode === "sido" ? "경활" : "지역별"} 연평균`;
    renderSeasonStrip(sk);
    const items = T0.items.filter((d) => d.vals.filter(ok).length >= 2).sort((a, b) => (b.share ?? -1) - (a.share ?? -1));
    $("#tiles").innerHTML = items.map((d) => `<button type="button" class="em-tile${d.k === k ? " sel" : ""}${ok(d.chg) && d.chg < 0 ? " neg" : ""}" data-k="${d.k}" title="${esc(d.name)} · 농림어업 취업자 ${T0.from}~${T0.to} 연평균 · 비중 ${pct(d.share)} · ${T0.base} ${pctS(d.chg)}">`
      + `<span class="em-tn">${esc(d.name)}</span><span class="em-ts">${pct(d.share)}</span>${spark(d.vals)}<span class="em-tc">${pctS(d.chg)}</span></button>`).join("");
    $$("#tiles .em-tile").forEach((b) => b.addEventListener("click", () => select(b.dataset.k)));
    $("#trend-note").textContent = T0.mode === "sido"
      ? `칸: 시도 농림어업 취업자 추이(${T0.from}~${T0.to}), 비중은 ${T0.to}년, 증감은 ${T0.base}. 누르면 그 시도로.`
      : `칸: 시군 농림어업 취업자 추이(상·하반기 평균), 비중·증감은 ${T0.base}. 표본조사라 작은 시군은 흔들림이 크다.`;
  }

  // ---------- 오른쪽: 지역 집계 (시군 값을 더한다) ----------
  // 시도·전국은 그 안 시군 값의 합. 두 값을 짝으로 쓸 때는 둘 다 있는 시군만 더해 분자·분모의 범위를 맞춘다
  const unitsOf = (k) => (level(k) === 2 ? [k] : level(k) === 1 ? UNITS_BY_SIDO[k] : ALL_UNITS);
  function aggPair(k, fa, fb, ha, hb = ha) {
    let a = 0, b = 0, n = 0;
    for (const u of unitsOf(k)) {
      const x = uAt(u, fa, ha), y = uAt(u, fb, hb);
      if (ok(x) && ok(y)) { a += x; b += y; n++; }
    }
    return n ? [a, b] : [null, null];
  }
  // 65세 이상 비중이 있는 마지막 반기 (선택 반기 이하)
  const placeHalf = () => { for (let i = state.h; i >= 0; i--) if (ALL_UNITS.some((u) => ok(uAt(u, "yo", i)))) return i; return -1; };

  // ---------- 오른쪽 1: 지역 안에서 농업의 자리 (산점도) ----------
  function placePoints(h) {
    return ALL_UNITS.map((k) => ({ k, x: uShare(k, h), y: share(uAt(k, "yo", h), uAt(k, "yt", h)) })).filter((p) => ok(p.x) && ok(p.y));
  }
  function fitLine(pts) {
    const mx = d3.mean(pts, (p) => p.x), my = d3.mean(pts, (p) => p.y);
    const sxy = d3.sum(pts, (p) => (p.x - mx) * (p.y - my)), sxx = d3.sum(pts, (p) => (p.x - mx) ** 2), syy = d3.sum(pts, (p) => (p.y - my) ** 2);
    const b1 = sxx ? sxy / sxx : 0;
    return { b0: my - b1 * mx, b1, r: sxx && syy ? sxy / Math.sqrt(sxx * syy) : 0 };
  }
  const rankOf = (list, k) => list.findIndex((d) => d.k === k) + 1;
  function renderPlace() {
    const k = state.key, h = placeHalf(), s = sidoOf(k);
    $("#place-when").textContent = h >= 0 ? `${halfShort(h)} · 지역별` : "";
    const pts = h >= 0 ? placePoints(h) : [];
    const fit = pts.length > 2 ? fitLine(pts) : null;
    const res = (p) => p.y - (fit.b0 + fit.b1 * p.x); // 추세선보다 몇 %p 높은가
    const line = $("#place-line");
    if (!fit) line.textContent = "";
    else if (level(k) === 2) {
      const p = pts.find((d) => d.k === k);
      const peers = pts.filter((d) => sidoOf(d.k) === s);
      const byX = [...peers].sort((a, b) => b.x - a.x), byY = [...peers].sort((a, b) => b.y - a.y);
      line.innerHTML = p
        ? `농림어업 비중 <b>${pct(p.x)}</b> <span class="em-dim">${shortLabel(s)} ${rankOf(byX, k)}위/${peers.length}</span> · 65세 이상 <b>${pct(p.y)}</b> <span class="em-dim">${rankOf(byY, k)}위</span>`
          + `<span class="em-sub">농업 비중이 비슷한 시군보다 65세 이상이 <b class="${res(p) > 0 ? "em-acc" : "em-cool"}">${pp(res(p))}</b> ${res(p) > 0 ? "많다" : "적다"}</span>`
        : `${esc(label(k))}은(는) 이 반기 자료가 없습니다.`;
    } else if (level(k) === 1) {
      const sid = SIDO_CODES.map((c) => { const [a, t] = aggPair(c, "a", "t", h), [o, ot] = aggPair(c, "yo", "yt", h); return { k: c, x: share(a, t), y: share(o, ot) }; }).filter((d) => ok(d.x) && ok(d.y));
      const me = sid.find((d) => d.k === k);
      const peers = pts.filter((d) => sidoOf(d.k) === k);
      const above = peers.filter((d) => res(d) > 0).length;
      line.innerHTML = me
        ? `농림어업 비중 <b>${pct(me.x)}</b> <span class="em-dim">시도 ${rankOf([...sid].sort((a, b) => b.x - a.x), k)}위</span> · 65세 이상 <b>${pct(me.y)}</b> <span class="em-dim">${rankOf([...sid].sort((a, b) => b.y - a.y), k)}위</span>`
          + `<span class="em-sub">시군 ${peers.length}곳 중 <b>${above}곳</b>이 농업 비중에 비해 더 고령 (추세선 위)</span>`
        : "";
    } else {
      line.innerHTML = `시군 ${pts.length}곳: 농림어업 비중이 높을수록 65세 이상 취업자도 많다 <span class="em-dim">(상관계수 ${fit.r.toFixed(2)})</span>`
        + `<span class="em-sub">점선(추세)보다 위는 농업 비중에 비해 더 고령. 점을 누르면 그 시군으로</span>`;
    }
    drawScatter(pts, fit, res);
  }
  function drawScatter(pts, fit, res) {
    const el = $("#chart-scatter");
    const { svg, w, h } = frame(el, 200);
    if (!pts.length) { empty(svg); $("#scatter-key").innerHTML = ""; return; }
    const k = state.key, s = sidoOf(k);
    const m = { l: 30, r: 10, t: 8, b: 16 };
    const x = d3.scaleLinear().domain([0, d3.max(pts, (p) => p.x) * 1.04]).nice(4).range([m.l, w - m.r]);
    const y = d3.scaleLinear().domain([0, d3.max(pts, (p) => p.y) * 1.06]).nice(4).range([h - m.b, m.t]);
    gridY(svg, y, y.ticks(4), m.l, w - m.r, (d) => (d ? `${d}%` : ""));
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(x.ticks(5)).join("text").attr("x", (d) => x(d)).attr("y", h - m.b + 12).attr("text-anchor", "middle").text((d) => `${d}%`);
    svg.append("text").attr("class", "em-axlab").attr("x", w - m.r).attr("y", h - m.b - 5).attr("text-anchor", "end").text("농림어업 비중 →");
    svg.append("text").attr("class", "em-axlab").attr("x", m.l + 4).attr("y", m.t + 8).text("↑ 65세 이상 비중");
    const [x0, x1] = x.domain();
    svg.append("line").attr("class", "em-fit").attr("x1", x(x0)).attr("x2", x(x1)).attr("y1", y(fit.b0 + fit.b1 * x0)).attr("y2", y(fit.b0 + fit.b1 * x1));
    const cls = (p) => (p.k === k ? "sel" : s ? (sidoOf(p.k) === s ? "peer" : "ctx") : "all");
    const order = { ctx: 0, all: 1, peer: 2, sel: 3 };
    const dots = svg.append("g").selectAll("circle").data([...pts].sort((a, b) => order[cls(a)] - order[cls(b)])).join("circle")
      .attr("class", (p) => `em-dot ${cls(p)}`).attr("cx", (p) => x(p.x)).attr("cy", (p) => y(p.y)).attr("r", (p) => (cls(p) === "sel" ? 5.5 : cls(p) === "peer" ? 3.6 : 2.8))
      .on("click", (e, p) => select(p.k));
    dots.append("title").text((p) => `${fullLabel(p.k)} · 농림어업 ${pct(p.x)} · 65세 이상 ${pct(p.y)} · 추세보다 ${pp(res(p))}`);
    const sel = pts.find((p) => p.k === k);
    if (sel) {
      const right = x(sel.x) > w * 0.7;
      svg.append("text").attr("class", "em-dotlab").attr("x", x(sel.x) + (right ? -8 : 8)).attr("y", y(sel.y) + 4).attr("text-anchor", right ? "end" : "start").text(label(k));
    }
    $("#scatter-key").innerHTML = (s ? `<span><i class="em-k-peer"></i>${shortLabel(s)} 시군</span><span><i class="em-k-ctx"></i>다른 시군</span>` : `<span><i class="em-k-peer"></i>시군</span>`)
      + (sel ? `<span><i class="em-k-sel"></i>${esc(label(k))}</span>` : "") + `<span><i class="em-k-fit"></i>추세</span><span class="em-k-n">세로: 산업 구분 없는 지역 취업자</span>`;
  }

  // ---------- 오른쪽 2: 농업 일자리의 흐름 ----------
  function hbar(v, max, cls = "") { return `<span class="em-hb"><i class="${cls}" style="width:${ok(v) && max ? Math.max(0, (v / max) * 100) : 0}%"></i></span>`; }
  function renderFlow() {
    const k = state.key;
    $("#flow-scope").textContent = `(${fullLabel(k)})`;
    $("#flow-when").textContent = `${halfShort(state.h)} · 지역별`;
    const hh = state.h;
    const out = [];
    // 들고 남: 사는 곳 기준 주민 vs 일하는 곳 기준 일자리
    const [a, wa] = aggPair(k, "a", "wa", hh);
    if (ok(a) && ok(wa)) {
      const d = wa - a, mx = Math.max(a, wa), rel = (d / a) * 100;
      const msg = level(k) === 0 ? "전국은 들고 나는 사람이 서로 맞물려 차이가 거의 없습니다. 시도·시군을 고르면 보입니다."
        : Math.abs(rel) < 2 ? "사는 사람과 일자리가 거의 같습니다."
        : d > 0 ? `일자리가 주민보다 <b class="em-acc">${peopleText(d)}</b>(${nf0.format(rel)}%) 많다: 다른 곳에서 농사지으러 들어온다`
        : `주민이 일자리보다 <b class="em-cool">${peopleText(-d)}</b>(${nf0.format(-rel)}%) 많다: 다른 곳 농지로 나간다`;
      out.push(`<div class="em-fg"><h3>들고 남</h3>
        <div class="em-fr"><span>사는 주민</span>${hbar(a, mx, "res")}<b>${peopleText(a)}</b></div>
        <div class="em-fr"><span>이곳 일자리</span>${hbar(wa, mx, "work")}<b>${peopleText(wa)}</b></div>
        <p class="em-fmsg">${msg}</p></div>`);
    }
    // 5년 변화: 농림어업 vs 전체 취업자, 선택 지역 · 상위 · 전국
    const chain = [k, parentOf(k), parentOf(k) && parentOf(parentOf(k))].filter((x, i, arr) => x && arr.indexOf(x) === i);
    if (hh - 10 >= 0) {
      const rows = chain.map((r) => {
        const [a1, a0] = aggPair(r, "a", "a", hh, hh - 10), [t1, t0] = aggPair(r, "t", "t", hh, hh - 10);
        return { r, ga: ok(a1) && a0 ? (a1 / a0 - 1) * 100 : null, gt: ok(t1) && t0 ? (t1 / t0 - 1) * 100 : null };
      });
      const lim = Math.max(5, ...rows.flatMap((d) => [Math.abs(d.ga ?? 0), Math.abs(d.gt ?? 0)]));
      const dv = (v, cls) => `<span class="em-dv"><i class="${cls}${v < 0 ? " neg" : ""}" style="width:${ok(v) ? (Math.abs(v) / lim) * 50 : 0}%"></i></span><b class="${ok(v) && v < 0 ? "em-cool" : ""}">${pctS(v)}</b>`;
      out.push(`<div class="em-fg"><h3>5년 변화 <small>${halfShort(hh - 10)} → ${halfShort(hh)}</small></h3>
        <div class="em-gr em-gh"><span></span><span>농림어업 취업자</span><span>전체 취업자</span></div>
        ${rows.map((d) => `<div class="em-gr${d.r === k ? " me" : ""}"><span>${esc(shortLabel(d.r))}</span><span class="em-gc">${dv(d.ga, "agri")}</span><span class="em-gc">${dv(d.gt, "all")}</span></div>`).join("")}</div>`);
    }
    $("#flow").innerHTML = out.join("") || `<p class="note">이 반기에는 ${esc(fullLabel(k))} 자료가 없습니다.</p>`;
  }

  // ---------- 오른쪽 3: 일하는 방식 (전국 참고) ----------
  // 비교 막대 묶음: 묶음마다 농림어업/전체 두 줄 100% 막대
  function cmpHTML(rows) {
    const bar = (vals, colors, names) => {
      const tot = d3.sum(vals.filter(ok));
      return `<div class="em-bar sm">${vals.map((v, i) => { const s = share(v, tot) ?? 0; return `<span style="flex:${s};background:${colors[i]}" title="${names[i]} ${pct(s)}">${s >= 14 ? `${nf0.format(s)}%` : ""}</span>`; }).join("")}</div>`;
    };
    return rows.map((r) => `<div class="em-cmp-g"><div class="em-cmp-h"><b>${r.g}</b>${r.names.map((n, i) => `<span><i style="background:${r.colors[i]}"></i>${n}</span>`).join("")}</div>`
      + `<div class="em-cmp-r"><span class="em-cmp-l">${r.la}</span>${bar(r.a, r.colors, r.names)}</div>`
      + `<div class="em-cmp-r"><span class="em-cmp-l dim">${r.lb}</span>${bar(r.b, r.colors, r.names)}</div></div>`).join("");
  }
  function renderHow() {
    const nw = E.nonwage;
    const yi = nw.years.length - 1;
    const yr = nw.years[yi];
    const mi = M.indexOf(`${yr}-08`);
    const [, , emp, noemp, unpaid] = nw["01"][yi];
    const all = nw["00"][yi];
    const aAug = mAt(NATION, "a", mi), tAug = mAt(NATION, "t", mi);
    const wageA = ok(aAug) ? aAug - nw["01"][yi][0] : null, wageT = ok(tAug) ? tAug - all[0] : null;
    $("#how-when").textContent = `${yr}년 8월 · 경활`;
    $("#cmp-how").innerHTML = cmpHTML([
      { g: "종사상지위", names: ["고용원 있는 자영업", "혼자 하는 자영업", "무급가족종사", "임금근로"], colors: ["#3f7d55", "#72c48d", "#f5a524", "#5d636d"],
        a: [emp, noemp, unpaid, wageA], b: [all[2], all[3], all[4], wageT], la: "농림어업", lb: "전체" },
    ]);
    drawShort();
  }
  function drawShort() {
    const el = $("#chart-short");
    const { svg, w, h } = frame(el, 90);
    const hr = E.hours, n = hr.months.length;
    const idx = d3.range(Math.max(0, n - 60), n);
    const a = hr["01"].short, b = hr["00"].short;
    const m = { l: 30, r: 8, t: 6, b: 14 };
    const x = d3.scaleLinear().domain(d3.extent(idx)).range([m.l, w - m.r]);
    const y = d3.scaleLinear().domain([0, Math.max(80, d3.max(idx, (i) => Math.max(a[i] ?? 0, b[i] ?? 0)))]).nice(3).range([h - m.b, m.t]);
    gridY(svg, y, y.ticks(3), m.l, w - m.r, (d) => `${d}%`);
    const jan = idx.filter((i) => hr.months[i].endsWith("-01"));
    svg.append("g").selectAll("rect").data(jan).join("rect").attr("class", "em-winter")
      .attr("x", (i) => x(Math.max(idx[0], i - 1))).attr("width", (i) => x(Math.min(idx.at(-1), i + 1)) - x(Math.max(idx[0], i - 1))).attr("y", m.t).attr("height", h - m.t - m.b);
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(jan).join("text").attr("x", (i) => x(i)).attr("y", h - 2).attr("text-anchor", "middle").text((i) => `'${hr.months[i].slice(2, 4)}.1`);
    const line = (s) => d3.line().defined((i) => ok(s[i])).x((i) => x(i)).y((i) => y(s[i])).curve(d3.curveMonotoneX)(idx);
    svg.append("path").attr("class", "em-l-all").attr("d", line(b));
    svg.append("path").attr("class", "em-l-agri").attr("d", line(a));
    svg.append("g").selectAll("rect.hit").data(idx).join("rect").attr("x", (i) => x(i) - (w - m.l - m.r) / idx.length / 2).attr("width", (w - m.l - m.r) / idx.length)
      .attr("y", m.t).attr("height", h - m.t - m.b).attr("fill", "transparent")
      .append("title").text((i) => `${hr.months[i].replace("-", "년 ")}월 · 농림어업 ${pct(a[i])} · 전체 ${pct(b[i])} · 평균 ${nf1.format(hr["01"].avg[i])}시간`);
    $("#short-key").innerHTML = `<span><i class="em-k-agri"></i>농림어업</span><span><i class="em-k-all"></i>전체 산업 (튀는 달은 조사 주간 공휴일)</span><span><i class="em-k-win"></i>겨울(12~2월)</span>`;
  }

  // ---------- 가운데: 제목과 요점 ----------
  function renderHero() {
    const k = state.key;
    $("#title-region").textContent = label(k);
    $("#crumb").textContent = level(k) === 0 ? "" : level(k) === 1 ? "전국 ›" : `전국 › ${T.sidos[sidoOf(k)].name} ›`;
    const reset = $("#reset");
    reset.hidden = level(k) === 0;
    reset.textContent = level(k) === 2 ? `${T.sidos[sidoOf(k)].short} 전체보기` : "전국보기";
  }
  $("#reset").addEventListener("click", () => select(parentOf(state.key) ?? NATION));
  function renderFacts() {
    const yi1 = E.years.length - 1, yi0 = yi1 - 10; // 10년 전과 견준다
    const a0 = yAt(NATION, "a", yi0), a1 = yAt(NATION, "a", yi1);
    const s0 = share(a0, yAt(NATION, "t", yi0)), s1 = share(a1, yAt(NATION, "t", yi1));
    const ah = lastHalf(E.mix.age["01"], HL), ag = E.mix.age["01"][ah];
    const hr = E.hours;
    const ji = hr.months.map((m, i) => [m, i]).filter(([m]) => m.endsWith("-01")).at(-1)?.[1];
    const nw = E.nonwage, ni = nw.years.length - 1;
    const facts = [
      `<b>${E.years[yi0]}년 ${nf1.format(s0)}%</b> → <b>${E.years[yi1]}년 ${nf1.format(s1)}%</b>, 취업자 중 농림어업 비중|${E.years[yi0]}년 ${peopleText(a0)} → ${E.years[yi1]}년 ${peopleText(a1)}`,
      `농업 취업자 <b class="em-acc">${nf0.format(share(ag[4], d3.sum(ag)))}%</b>가 60세 이상`,
      `${hr.months[ji].slice(0, 4)}년 1월엔 <b>${nf0.format(hr["01"].short[ji])}%</b>가 주 36시간 미만`,
      `무급가족종사자 <b>${peopleText(nw["01"][ni][4])}</b> · 전국의 ${nf0.format(share(nw["01"][ni][4], nw["00"][ni][4]))}%`,
    ];
    // '본문|툴팁': 줄이 넘치지 않게 덧붙임은 마우스를 올리면 보인다
    $("#facts").innerHTML = facts.map((f) => { const [t, tip] = f.split("|"); return `<li${tip ? ` title="${esc(tip)}"` : ""}><span>${t}</span></li>`; }).join("");
  }

  // ---------- 갱신 ----------
  function render(animate = true) {
    syncControls();
    syncURL();
    renderHero();
    renderSize();
    renderSeason();
    renderPlace();
    renderFlow();
    renderHow();
    paintMap();
    renderRank();
    applyView(animate);
  }
  function select(k) {
    const prevSido = sidoOf(state.key);
    state.key = k || NATION;
    render(prevSido !== sidoOf(state.key));
  }

  fromURL();
  renderChips();
  renderFacts();
  drawMap();
  render(false);
  $("#built").textContent = `자료 ${monthText(ML)} · ${halfShort(HL)}까지 · ${E.built} 작성`;
  let mw = 0, mh = 0;
  new ResizeObserver(([e]) => {
    const { width, height } = e.contentRect;
    if (Math.abs(width - mw) < 1 && Math.abs(height - mh) < 1) return;
    mw = width; mh = height;
    drawMap();
    paintMap();
  }).observe($("#map-wrap"));
  const redraw = { "chart-long": drawLong, "chart-season": () => renderSeasonStrip(level(state.key) === 2 ? sidoOf(state.key) : state.key), "chart-scatter": renderPlace, "chart-short": drawShort };
  const ro = new ResizeObserver((entries) => {
    for (const e of entries) {
      const { width, height } = e.contentRect;
      const drawn = e.target._wh;
      if (drawn && Math.abs(drawn[0] - width) < 1 && Math.abs(drawn[1] - height) < 1) continue;
      redraw[e.target.id]();
    }
  });
  Object.keys(redraw).forEach((id) => ro.observe($(`#${id}`)));
  window.addEventListener("hashchange", () => { fromURL(); render(true); });
})();
