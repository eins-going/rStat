(() => {
  // 농사용 전기 모니터 — 한전 농사용 전기(시군·월)으로 지역 농업활동을 살핀다 (data/power.js, scripts/build_power.py)
  // 지역 체계·지도는 지역농업 통계(app.js)와 같다. 계절 차이가 커서 변화는 늘 전년·평년 같은 달과 비교한다.
  const P = window.AGRI_POWER;
  const T = window.AGRI_TOPO;
  const V = P.v;
  const M = P.months; // ["2010-01", …]
  const LAST = M.length - 1;
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
  const int = (n) => (ok(n) ? nf0.format(n) : "–");
  const sgn = (n) => (n > 0 ? "+" : n < 0 ? "−" : "");
  const pctS = (n) => (ok(n) ? `${sgn(n)}${nf1.format(Math.abs(n))}%` : "–");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // 사용량(MWh) → 알맞은 단위
  function energy(mwh) {
    if (!ok(mwh)) return ["–", ""];
    const a = Math.abs(mwh);
    if (a >= 1e6) return [nf1.format(mwh / 1e6), "TWh"];
    if (a >= 1e4) return [nf0.format(mwh / 1e3), "GWh"];
    if (a >= 1e3) return [nf1.format(mwh / 1e3), "GWh"];
    return [nf0.format(mwh), "MWh"];
  }
  const energyText = (mwh) => energy(mwh).join("");
  function power(kw) {
    if (!ok(kw)) return ["–", ""];
    if (Math.abs(kw) >= 1e5) return [nf0.format(kw / 1e3), "MW"];
    if (Math.abs(kw) >= 1e3) return [nf1.format(kw / 1e3), "MW"];
    return [nf0.format(kw), "kW"];
  }
  // 건수·호수: 10만이 넘으면 만 단위
  const count = (n, unit) => (!ok(n) ? ["–", ""] : n >= 1e5 ? [nf1.format(n / 1e4), `만 ${unit}`] : [int(n), unit]);
  const monthText = (i) => { const [y, m] = M[i].split("-"); return `${y}년 ${+m}월`; };
  const deltaHTML = (d, suffix = "") => {
    if (!ok(d)) return "";
    const cls = d > 0 ? "up" : d < 0 ? "down" : "";
    return `<span class="${cls}">${d > 0 ? "▲" : d < 0 ? "▼" : "–"} ${nf1.format(Math.abs(d))}%</span>${suffix}`;
  };

  // ---------- 지표 계산 (k 지역, i 달 위치) ----------
  const GAP = Object.fromEntries(Object.entries(P.gap || {}).map(([k, a]) => [k, new Set(a)]));
  const gap = (k, i) => !!GAP[k]?.has(i);
  const at = (k, f, i) => (i >= 0 && i <= LAST ? V[k]?.[f]?.[i] ?? null : null);
  const ratio = (a, b) => (ok(a) && ok(b) && b > 0 ? (a / b - 1) * 100 : null);
  const yoy = (k, i, f = "k") => (gap(k, i) || gap(k, i - 12) ? null : ratio(at(k, f, i), at(k, f, i - 12)));
  function sum12(k, i, f = "k") {
    if (i < 11) return null;
    let s = 0;
    for (let j = i - 11; j <= i; j++) {
      const v = at(k, f, j);
      if (!ok(v) || gap(k, j)) return null;
      s += v;
    }
    return s;
  }
  const yoy12 = (k, i) => ratio(sum12(k, i), sum12(k, i - 12));
  // 평년: 직전 5년 같은 달 (3년 이상 있을 때)
  function norm(k, i) {
    const v = at(k, "k", i);
    if (!ok(v) || gap(k, i)) return null;
    const past = [1, 2, 3, 4, 5].map((y) => i - 12 * y).filter((j) => j >= 0 && !gap(k, j)).map((j) => at(k, "k", j)).filter(ok);
    if (past.length < 3) return null;
    const mean = d3.mean(past);
    const lo = d3.min(past), hi = d3.max(past);
    return { v, mean, lo, hi, dev: ratio(v, mean), out: v < lo || v > hi, n: past.length };
  }
  // 최근 12개월 신설·증설·해지. 한전에 자료가 없는 달이 끼면 계산하지 않는다
  function invest(k, i) {
    if (i < 11) return null;
    let n = 0, e = 0, x = 0;
    for (let j = i - 11; j <= i; j++) {
      const a = at(k, "n", j), b = at(k, "e", j), c = at(k, "x", j);
      if (!ok(a) || !ok(b) || !ok(c)) return null;
      n += a; e += b; x += c;
    }
    return { n, e, x, grow: n + e, net: n + e - x };
  }
  const perCust = (k, i) => {
    const s = sum12(k, i), c = at(k, "c", i);
    return ok(s) && c ? (s * 1000) / c : null; // kWh/호/년
  };
  const seasonOf = (k) => P.season?.[k] || null;

  // ---------- 지도 지표 ----------
  const SEASON_COLORS = ["#5fb3ff", "#ff6b5e", "#f5a524", "#8d94a0"];
  const SEASON_TEXT = [
    "겨울(12~2월 검침)에 가장 많이 쓴다. 시설원예 난방·육묘가 큰 지역에서 흔하다.",
    "여름(7~9월 검침)에 가장 많이 쓴다. 양수·관개, 축사 냉방이 큰 지역에서 흔하다.",
    "가을(10~11월 검침)에 가장 많이 쓴다. 곡물 건조, 곶감·농산물 건조와 저온저장이 큰 지역에서 흔하다.",
    `한 해 내내 고르게 쓴다(가장 많은 달이 가장 적은 달의 ${P.flatAmp}배 미만). 축산·저온저장처럼 계절을 덜 타는 수요가 크다.`,
  ];
  const METRICS = [
    { key: "yoy", label: "전년 같은 달 대비", kind: "div", get: (k, i) => yoy(k, i), fmt: pctS,
      note: "기준월 사용량을 전년 같은 달과 비교" },
    { key: "norm", label: "평년 대비", kind: "div", get: (k, i) => norm(k, i)?.dev ?? null, fmt: pctS,
      note: "기준월 사용량을 직전 5년 같은 달 평균과 비교" },
    { key: "yoy12", label: "최근 12개월 증감", kind: "div", get: (k, i) => yoy12(k, i), fmt: pctS,
      note: "기준월까지 12개월 합계를 그 전 12개월과 비교. 날씨 영향을 덜 받는 추세" },
    { key: "season", label: "계절 유형", kind: "cat", get: (k) => seasonOf(k)?.[0] ?? null, fmt: (v) => P.types[v] ?? "–",
      note: `${P.seasonYears[0]}~${P.seasonYears[1]}년 월별 사용량 모양(검침월 기준)` },
    { key: "per", label: "고객 1호당 사용량", kind: "seq", get: (k, i) => perCust(k, i), fmt: (v) => (ok(v) ? `${int(v)}kWh` : "–"),
      note: "최근 12개월 사용량 ÷ 고객호수 (연간). 시설·축산처럼 전기를 많이 쓰는 농업이 클수록 높다" },
    { key: "kw", label: "계약전력 증감", kind: "div", get: (k, i) => yoy(k, i, "w"), fmt: pctS,
      note: "계약전력(설비 규모)을 전년 같은 달과 비교. 시설 투자나 철거를 반영" },
    { key: "inv", label: "신설·증설 활발도", kind: "seq", get: (k, i) => { const v = invest(k, i), c = at(k, "c", i); return v && c ? (v.grow / c) * 1000 : null; },
      fmt: (v) => (ok(v) ? `${nf0.format(v)}건` : "–"),
      note: "최근 12개월 신설+증설 건수, 농사용 고객 1천 호당 (한전 산업분류 농업·임업·어업). 한전 집계 건수라 고객 수 증감과는 다르다" },
  ];

  const state = { key: NATION, i: LAST, metric: METRICS[0] };

  // ---------- 선택 ----------
  const selSido = $("#sido"), selSgg = $("#sgg"), selMonth = $("#month");
  selSido.innerHTML = `<option value="${NATION}">전국</option>` + SIDO_CODES.map((s) => `<option value="${s}">${T.sidos[s].name}</option>`).join("");
  selMonth.innerHTML = M.map((m, i) => `<option value="${i}">${monthText(i)}</option>`).reverse().join("");
  selSido.addEventListener("change", () => select(selSido.value));
  selSgg.addEventListener("change", () => select(selSgg.value || selSido.value));
  selMonth.addEventListener("change", () => setMonth(+selMonth.value));

  function syncControls() {
    const s = sidoOf(state.key);
    selSido.value = s || NATION;
    selSgg.disabled = !s;
    selSgg.innerHTML = `<option value="">${s ? "전체" : "–"}</option>` + (s ? UNITS_BY_SIDO[s].map((k) => `<option value="${k}">${label(k)}</option>`).join("") : "");
    selSgg.value = level(state.key) === 2 ? state.key : "";
    selMonth.value = state.i;
  }

  // ---------- 주소: #경상남도/김해시?ym=2026-08&m=yoy ----------
  function syncURL() {
    const k = state.key;
    const path = k === NATION ? "" : level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`;
    const q = new URLSearchParams();
    if (state.i !== LAST) q.set("ym", M[state.i]);
    if (state.metric !== METRICS[0]) q.set("m", state.metric.key);
    const url = `${location.pathname}${q.toString() ? `?${q}` : ""}${path ? `#${encodeURIComponent(path)}` : ""}`;
    if (url !== location.pathname + location.search + location.hash) history.replaceState(null, "", url);
  }
  function fromURL() {
    const [a, b] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = SIDO_CODES.find((c) => T.sidos[c].name === a || T.sidos[c].short === a);
    state.key = s ? (b && UNITS_BY_SIDO[s].find((k) => label(k) === b)) || s : NATION;
    const q = new URLSearchParams(location.search);
    const i = M.indexOf(q.get("ym"));
    state.i = i >= 0 ? i : LAST;
    state.metric = METRICS.find((m) => m.key === q.get("m")) || METRICS[0];
  }

  // ---------- 지도 ----------
  const RAMP = ["#3b3428", "#5e4925", "#8a6322", "#c0841f", "#f5a524"];
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
  // 울릉군은 동해 멀리(동경 130.8~130.9°) 있어 경북을 고르면 지도가 작아진다 → 그리는 자리만 서쪽으로 0.8° 당기고
  // 점선 테두리로 옮겨 그린 것을 알린다. 지역 경계 자료는 그대로라 '자세히 보기'는 실제 위치에 그린다.
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
  let path = null, size = { w: 0, h: 0 }, color = () => EMPTY;

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
    // 옮겨 그린 울릉군을 점선 테두리로 두른다
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
    if (m.kind === "cat") {
      return { fn: (v) => SEASON_COLORS[v] ?? EMPTY, rows: P.types.map((t, i) => [SEASON_COLORS[i], t]) };
    }
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
    const m = state.metric, i = state.i, s = sidoOf(state.key);
    const vals = ALL_UNITS.map((k) => m.get(k, i)).filter(ok);
    const sc = scaleFor(m, vals);
    color = sc.fn;
    mapSvg.selectAll("path.unit")
      .attr("fill", (d) => { const v = m.get(d.properties.key, i); return ok(v) ? sc.fn(v) : EMPTY; })
      .classed("sel", (d) => d.properties.key === state.key)
      .classed("pw-ctx", (d) => !!s && d.properties.sido !== s)
      .attr("aria-label", (d) => `${fullLabel(d.properties.key)} ${m.label} ${m.fmt(m.get(d.properties.key, i))}`);
    mapSvg.selectAll("path.unit.sel").raise();
    mapSvg.classed("dimmed", level(state.key) === 2);
    const missing = ALL_UNITS.length - vals.length;
    $("#legend").innerHTML = `<span class="title">${m.label} <span style="color:var(--faint);font-weight:400">${m.kind === "cat" ? `${P.seasonYears[0]}~${P.seasonYears[1]}년` : monthText(i)}</span></span>`
      + sc.rows.map(([c, t]) => `<span class="row"><span class="sw" style="background:${c}"></span>${t}</span>`).join("")
      + (missing ? `<span class="row"><span class="sw" style="background:${EMPTY};outline:1px solid #3a3f48"></span>자료 없음 ${missing}</span>` : "");
    $("#metric-note").textContent = m.note;
    $("#map").setAttribute("aria-label", `${m.label} 시군 지도`);
  }

  function showTip(e, k) {
    const i = state.i, m = state.metric;
    const n = norm(k, i);
    const [ev, eu] = energy(at(k, "k", i));
    tip.innerHTML = `<b>${esc(fullLabel(k))}</b>${m.label} <b style="display:inline">${m.fmt(m.get(k, i))}</b><br>`
      + `${monthText(i)} ${ev}${eu} · 전년 같은 달 ${pctS(yoy(k, i))}`
      + (n ? `<br>평년 ${pctS(n.dev)}${n.out ? " · <span style=\"color:var(--accent)\">범위 밖</span>" : ""}` : "")
      + (gap(k, i) ? `<br><span style="color:var(--accent)">이 달은 원자료에서 일부 시군구가 빠짐</span>` : "");
    const r = $("#map-wrap").getBoundingClientRect();
    tip.style.left = `${e.clientX - r.left}px`;
    tip.style.top = `${e.clientY - r.top}px`;
    tip.hidden = false;
  }

  // ---------- 지표 칩 ----------
  function renderChips() {
    $("#chips").innerHTML = METRICS.map((m) => `<button type="button" data-k="${m.key}" aria-pressed="${m === state.metric}">${m.label}</button>`).join("");
    $$("#chips button").forEach((b) => b.addEventListener("click", () => {
      state.metric = METRICS.find((m) => m.key === b.dataset.k);
      $$("#chips button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      syncURL();
      paintMap();
      renderRank();
    }));
  }

  // ---------- 순위: 높은 쪽 · 낮은 쪽 ----------
  function renderRank() {
    const m = state.metric, i = state.i, s = sidoOf(state.key);
    const peers = s ? UNITS_BY_SIDO[s] : ALL_UNITS;
    const name = (k) => (s ? label(k) : fullLabel(k));
    if (m.kind === "cat") {
      const groups = P.types.map((t, ti) => [t, peers.filter((k) => seasonOf(k)?.[0] === ti)]);
      $("#rank").innerHTML = `<div class="rank-title"><span><b>계절 유형</b> ${s ? T.sidos[s].short : "전국"} 시군</span><span class="rank-meta">${peers.length}곳</span></div>`
        + groups.map(([t, ks], ti) => `<div class="pw-cat"><span class="pw-cat-h"><i style="background:${SEASON_COLORS[ti]}"></i>${t} <b>${ks.length}</b></span>`
          + ks.slice(0, 12).map((k) => `<button type="button" class="pw-tag${k === state.key ? " sel" : ""}" data-r="${k}">${esc(name(k))}</button>`).join("")
          + (ks.length > 12 ? `<span class="pw-more">외 ${ks.length - 12}곳</span>` : "") + `</div>`).join("");
      $$("#rank [data-r]").forEach((b) => b.addEventListener("click", () => select(b.dataset.r)));
      return;
    }
    const list = peers.map((k) => [k, m.get(k, i)]).filter(([, v]) => ok(v)).sort((a, b) => b[1] - a[1]);
    const max = Math.max(...list.map(([, v]) => Math.abs(v)), 0) || 1;
    const row = ([k, v], no, neg) => `
      <button type="button" class="rank-row${s ? "" : " wide"}${k === state.key ? " sel" : ""}" data-r="${k}">
        <span class="no">${no}</span><span class="nm">${esc(name(k))}</span>
        <span class="track"><span class="fill${v < 0 ? " neg" : ""}" style="width:${(Math.abs(v) / max) * 100}%"></span></span>
        <span class="val">${m.fmt(v)}</span><span></span>
      </button>`;
    const top = list.slice(0, 5), bottom = list.slice(-5).reverse();
    const hiTitle = m.kind === "div" ? "높은 곳" : "많은 곳", loTitle = m.kind === "div" ? "낮은 곳" : "적은 곳";
    $("#rank").innerHTML = list.length ? `
      <div class="rank-title"><span><b>${m.label}</b> ${s ? T.sidos[s].short : "전국"} 시군</span><span class="rank-meta">${monthText(i)} · ${list.length}곳</span></div>
      <div><div class="pw-rank-h">${hiTitle}</div>${top.map((d, j) => row(d, j + 1)).join("")}</div>
      <div><div class="pw-rank-h">${loTitle}</div>${bottom.map((d, j) => row(d, list.length - j)).join("")}</div>` : "";
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => select(b.dataset.r)));
  }

  // ---------- 왼쪽: 현황 ----------
  function setStat(key, [v, u], delta, deltaNote = "") {
    $(`[data-v="${key}"]`).textContent = v;
    const unit = $(`[data-u="${key}"]`);
    if (unit) unit.textContent = u;
    $(`[data-d="${key}"]`).innerHTML = delta == null ? "" : `${deltaHTML(delta)} <span>${deltaNote}</span>`;
  }

  function renderNow() {
    const k = state.key, i = state.i;
    $("#now-scope").textContent = `(${fullLabel(k)})`;
    $$("[data-month]").forEach((el) => { el.textContent = monthText(i); });
    setStat("kwh", energy(at(k, "k", i)), yoy(k, i), "전년 같은 달");
    const n = norm(k, i);
    setStat("norm", [n ? pctS(n.dev) : "–", ""], null);
    $('[data-d="norm"]').innerHTML = n ? (n.out ? `<span class="pw-flag">직전 ${n.n}년 범위 밖</span>` : `<span>직전 ${n.n}년 범위 안</span>`) : "";
    const cust = at(k, "c", i);
    setStat("cust", count(cust, "호"), yoy(k, i, "c"), "전년 같은 달");
    setStat("kw", power(at(k, "w", i)), yoy(k, i, "w"), "전년 같은 달");
    const notes = [];
    if (gap(k, i)) notes.push("이 달은 원자료에서 이 지역의 일부 시군구가 빠져 있어 증감을 계산하지 않았습니다.");
    if (!ok(at(k, "w", i))) notes.push("이 달은 계약전력 자료가 없습니다.");
    $('[data-note="now"]').textContent = notes.join(" ");
    drawBand();
    drawTrend();
    drawCust();
  }

  // 막대·선 그림 공통
  function frame(el, h0) {
    const w = el.clientWidth || 300, h = el.clientHeight || h0;
    el.innerHTML = "";
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    return { svg, w, h };
  }

  // 월별 사용량: 선택 연도 · 전년 · 직전 5년 범위
  function drawBand() {
    const k = state.key, i = state.i;
    const el = $("#chart-band");
    const { svg, w, h } = frame(el, 150);
    const y0 = +M[i].slice(0, 4);
    const idx = (y, m) => M.indexOf(`${y}-${String(m).padStart(2, "0")}`);
    const months = d3.range(1, 13);
    const band = months.map((m) => {
      const vs = [1, 2, 3, 4, 5].map((d) => idx(y0 - d, m)).filter((j) => j >= 0 && !gap(k, j)).map((j) => at(k, "k", j)).filter(ok);
      return vs.length >= 3 ? [d3.min(vs), d3.max(vs)] : null;
    });
    const cur = months.map((m) => { const j = idx(y0, m); return j >= 0 && j <= i && !gap(k, j) ? at(k, "k", j) : null; });
    const prev = months.map((m) => { const j = idx(y0 - 1, m); return j >= 0 && !gap(k, j) ? at(k, "k", j) : null; });
    const all = [...band.flat().filter(ok), ...cur.filter(ok), ...prev.filter(ok)];
    if (!all.length) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text("자료 없음"); return; }
    const m = { l: 40, r: 8, t: 8, b: 18 };
    const x = d3.scalePoint().domain(months).range([m.l, w - m.r]).padding(0.3);
    const y = d3.scaleLinear().domain([0, d3.max(all) * 1.08]).nice(3).range([h - m.b, m.t]);
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(y.ticks(3)).join("g").call((g) => {
      g.append("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (d) => y(d)).attr("y2", (d) => y(d));
      g.append("text").attr("x", m.l - 6).attr("y", (d) => y(d) + 4).attr("text-anchor", "end").text((d) => (d ? energy(d).join("") : "0"));
    });
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(months).join("text")
      .attr("x", (d) => x(d)).attr("y", h - 4).attr("text-anchor", "middle").text((d) => d);
    const area = d3.area().defined((d) => d).x((d, j) => x(months[j])).y0((d) => y(d[0])).y1((d) => y(d[1])).curve(d3.curveMonotoneX);
    svg.append("path").attr("class", "pw-bandarea").attr("d", area(band));
    const line = d3.line().defined(ok).x((d, j) => x(months[j])).y((d) => y(d)).curve(d3.curveMonotoneX);
    svg.append("path").attr("class", "pw-prev").attr("d", line(prev));
    svg.append("path").attr("class", "pw-cur").attr("d", line(cur));
    const sm = +M[i].slice(5);
    if (ok(cur[sm - 1])) svg.append("circle").attr("class", "pw-dot").attr("cx", x(sm)).attr("cy", y(cur[sm - 1])).attr("r", 4);
    $("#band-key").innerHTML = `<span><i class="cur"></i>${y0}년</span><span><i class="prev"></i>${y0 - 1}년</span><span><i class="band"></i>${y0 - 5}~${y0 - 1}년 범위</span>`;
  }

  // 월별 장기 그래프 (2010~), 누르면 그 달로. zero=false면 세로축을 0이 아닌 최솟값 근처에서 시작한다
  function drawSeries(id, get, fmt, zero = true) {
    const k = state.key, i = state.i;
    const el = $(`#${id}`);
    const { svg, w, h } = frame(el, 90);
    const pts = M.map((_, j) => [j, get(k, j)]).filter(([, v]) => ok(v));
    if (!pts.length) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text("자료 없음"); return; }
    const m = { l: 44, r: 8, t: 6, b: 16 };
    const x = d3.scaleLinear().domain([0, LAST]).range([m.l, w - m.r]);
    const lo = d3.min(pts, (d) => d[1]), hi = d3.max(pts, (d) => d[1]);
    const y = d3.scaleLinear().domain(zero ? [0, hi * 1.05] : [lo - (hi - lo) * 0.15, hi + (hi - lo) * 0.1 || hi + 1]).nice(3).range([h - m.b, m.t]);
    const nt = h < 110 ? 2 : 3;
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(y.ticks(nt)).join("g").call((g) => {
      g.append("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (d) => y(d)).attr("y2", (d) => y(d));
      g.append("text").attr("x", m.l - 6).attr("y", (d) => y(d) + 4).attr("text-anchor", "end").text((d) => (d || !zero ? fmt(d) : "0"));
    });
    const years = [...new Set(M.map((s) => s.slice(0, 4)))].filter((yy, j) => j % 4 === 0 || yy === M[LAST].slice(0, 4));
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(years).join("text")
      .attr("x", (yy) => x(M.indexOf(`${yy}-01`) < 0 ? 0 : M.indexOf(`${yy}-01`))).attr("y", h - 3).attr("text-anchor", "middle").text((yy) => `'${yy.slice(2)}`);
    svg.append("path").attr("class", "pw-trendarea").attr("d", d3.area().x((d) => x(d[0])).y0(h - m.b).y1((d) => y(d[1]))(pts));
    svg.append("path").attr("class", "pw-cur").attr("d", d3.line().x((d) => x(d[0])).y((d) => y(d[1]))(pts));
    const v = get(k, i);
    svg.append("line").attr("class", "pw-mark").attr("x1", x(i)).attr("x2", x(i)).attr("y1", m.t).attr("y2", h - m.b);
    if (ok(v)) svg.append("circle").attr("class", "pw-dot").attr("cx", x(i)).attr("cy", y(v)).attr("r", 3.5);
    svg.append("rect").attr("x", m.l).attr("y", 0).attr("width", w - m.l - m.r).attr("height", h).attr("fill", "transparent").style("cursor", "pointer")
      .on("click", (e) => setMonth(Math.max(0, Math.min(LAST, Math.round(x.invert(d3.pointer(e)[0]))))))
      .append("title").text("누르면 그 달로");
  }
  // 장기 추이: 최근 12개월 사용량 합계
  const drawTrend = () => drawSeries("chart-trend", (k, j) => sum12(k, j), (d) => energy(d).join(""));
  // 고객 수: 원자료 시군구가 빠진 달은 뺀다
  const drawCust = () => drawSeries("chart-cust", (k, j) => (gap(k, j) ? null : at(k, "c", j)), (d) => (Math.abs(d) >= 1e5 ? `${nf0.format(d / 1e4)}만` : int(d)), false);

  // ---------- 오른쪽: 계절 유형 ----------
  function renderSeason() {
    const k = state.key, p = parentOf(k);
    const sv = seasonOf(k), pv = p ? seasonOf(p) : null;
    $("#season-years").textContent = `${P.seasonYears[0]}~${P.seasonYears[1]}년`;
    if (!sv) { $("#season-type").innerHTML = "자료 없음"; $("#chart-season").innerHTML = ""; $("#season-key").innerHTML = ""; $("#season-note").textContent = ""; return; }
    const [t, amp] = sv;
    $("#season-type").innerHTML = `<span class="pw-badge" style="--c:${SEASON_COLORS[t]}">${P.types[t]}</span> 가장 많은 달이 가장 적은 달의 <b>${nf1.format(amp / 100)}배</b>`;
    $("#season-note").textContent = SEASON_TEXT[t];
    const el = $("#chart-season");
    const { svg, w, h } = frame(el, 120);
    const m = { l: 30, r: 8, t: 8, b: 18 };
    const months = d3.range(1, 13);
    const a = sv.slice(2), b = pv ? pv.slice(2) : null;
    const x = d3.scalePoint().domain(months).range([m.l, w - m.r]).padding(0.3);
    const y = d3.scaleLinear().domain([Math.min(50, d3.min([...a, ...(b || [])]) - 5), Math.max(...a, ...(b || [])) + 5]).nice(3).range([h - m.b, m.t]);
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(y.ticks(3)).join("g").call((g) => {
      g.append("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (d) => y(d)).attr("y2", (d) => y(d)).classed("pw-100", (d) => d === 100);
      g.append("text").attr("x", m.l - 5).attr("y", (d) => y(d) + 4).attr("text-anchor", "end").text((d) => d);
    });
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(months).join("text").attr("x", (d) => x(d)).attr("y", h - 4).attr("text-anchor", "middle").text((d) => d);
    const line = d3.line().x((d, j) => x(months[j])).y((d) => y(d)).curve(d3.curveMonotoneX);
    if (b) svg.append("path").attr("class", "pw-prev").attr("d", line(b));
    svg.append("path").attr("class", "pw-cur").attr("d", line(a)).style("stroke", SEASON_COLORS[t]);
    $("#season-key").innerHTML = `<span><i class="cur" style="background:${SEASON_COLORS[t]}"></i>${esc(fullLabel(k))}</span>` + (b ? `<span><i class="prev"></i>${esc(fullLabel(p))}</span>` : "") + `<span>100 = 그해 월평균 · 검침월</span>`;
  }

  // ---------- 오른쪽: 설비 투자 ----------
  function renderInvest() {
    const k = state.key, i = state.i;
    const cur = invest(k, i), prev = invest(k, i - 12);
    $("#invest-range").textContent = i >= 11 ? `${monthText(i - 11).replace("년 ", ".").replace("월", "")}~${monthText(i).replace("년 ", ".").replace("월", "")}` : "";
    const d = (a, b) => (cur && prev ? ratio(a, b) : null);
    setStat("grow", count(cur?.grow, "건"), d(cur?.grow, prev?.grow), "전년 같은 기간");
    setStat("cancel", count(cur?.x, "건"), d(cur?.x, prev?.x), "전년 같은 기간");
    const c = at(k, "c", i);
    $("#invest-net").innerHTML = cur
      ? `<span>신설 <b>${int(cur.n)}</b> · 증설 <b>${int(cur.e)}</b></span>${c ? `<span>고객 1천 호당 신설·증설 <b>${nf0.format((cur.grow / c) * 1000)}</b>건</span>` : ""}`
      : `<span>한전에 이 기간 일부 달의 자료가 없어 계산하지 않았습니다</span>`;
    const el = $("#chart-invest");
    const { svg, w, h } = frame(el, 110);
    const js = d3.range(Math.max(0, i - 23), i + 1);
    const rows = js.map((j) => ({ j, n: at(k, "n", j) || 0, e: at(k, "e", j) || 0, x: at(k, "x", j) || 0 }));
    const up = d3.max(rows, (r) => r.n + r.e) || 1, dn = d3.max(rows, (r) => r.x) || 1;
    const m = { l: 34, r: 6, t: 6, b: 16 };
    const x = d3.scaleBand().domain(js).range([m.l, w - m.r]).padding(0.2);
    const y = d3.scaleLinear().domain([-dn, up]).nice(3).range([h - m.b, m.t]);
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(y.ticks(3)).join("g").call((g) => {
      g.append("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (d) => y(d)).attr("y2", (d) => y(d)).classed("pw-100", (d) => d === 0);
      g.append("text").attr("x", m.l - 5).attr("y", (d) => y(d) + 4).attr("text-anchor", "end").text((d) => int(Math.abs(d)));
    });
    const g = svg.append("g");
    g.selectAll("rect.n").data(rows).join("rect").attr("class", "pw-n").attr("x", (r) => x(r.j)).attr("width", x.bandwidth())
      .attr("y", (r) => y(r.n)).attr("height", (r) => y(0) - y(r.n));
    g.selectAll("rect.e").data(rows).join("rect").attr("class", "pw-e").attr("x", (r) => x(r.j)).attr("width", x.bandwidth())
      .attr("y", (r) => y(r.n + r.e)).attr("height", (r) => y(r.n) - y(r.n + r.e));
    g.selectAll("rect.x").data(rows).join("rect").attr("class", "pw-x").attr("x", (r) => x(r.j)).attr("width", x.bandwidth())
      .attr("y", y(0)).attr("height", (r) => y(-r.x) - y(0));
    g.selectAll("rect.hit").data(rows).join("rect").attr("x", (r) => x(r.j)).attr("width", x.bandwidth()).attr("y", m.t).attr("height", h - m.t - m.b)
      .attr("fill", "transparent").append("title").text((r) => `${monthText(r.j)} · 신설 ${int(r.n)} · 증설 ${int(r.e)} · 해지 ${int(r.x)}`);
    const ticks = js.filter((j) => M[j].endsWith("-01"));
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(ticks).join("text").attr("x", (j) => x(j) + x.bandwidth() / 2).attr("y", h - 3)
      .attr("text-anchor", "middle").text((j) => `${M[j].slice(0, 4)}.1`);
    $("#invest-key").innerHTML = `<span><i class="n"></i>신설</span><span><i class="e"></i>증설</span><span><i class="x"></i>해지</span>`;
  }

  // ---------- 가운데 제목 ----------
  function renderHero() {
    const k = state.key;
    $("#title-region").textContent = label(k);
    $("#crumb").textContent = level(k) === 0 ? "" : level(k) === 1 ? "전국 ›" : `전국 › ${T.sidos[sidoOf(k)].name} ›`;
    const reset = $("#reset");
    reset.hidden = level(k) === 0;
    reset.textContent = level(k) === 2 ? `${T.sidos[sidoOf(k)].short} 전체 보기` : "전국 보기";
  }
  $("#reset").addEventListener("click", () => select(parentOf(state.key) ?? NATION));

  // ---------- 갱신 ----------
  function render(animate = true) {
    syncControls();
    syncURL();
    renderHero();
    renderNow();
    renderSeason();
    renderInvest();
    paintMap();
    renderRank();
    applyView(animate);
  }
  function select(k) {
    const prevSido = sidoOf(state.key);
    state.key = k || NATION;
    render(prevSido !== sidoOf(state.key));
  }
  function setMonth(i) {
    state.i = i;
    render(false);
  }

  fromURL();
  renderChips();
  drawMap();
  render(false);
  $("#built").textContent = `자료 ${monthText(LAST)}까지 · ${P.built} 작성`;
  // 지도 칸 크기가 바뀌면(첫 배치 뒤 좌우 패널이 자리를 잡거나 창 크기가 바뀌면) 지도를 다시 맞추고, 창 크기가 바뀌면 그림도 다시 그린다
  let mw = 0, mh = 0;
  new ResizeObserver(([e]) => {
    const { width, height } = e.contentRect;
    if (Math.abs(width - mw) < 1 && Math.abs(height - mh) < 1) return;
    mw = width; mh = height;
    drawMap();
    paintMap();
  }).observe($("#map-wrap"));
  // 그림 칸은 패널이 자리를 잡은 뒤에야 크기가 정해진다 → 크기가 바뀌면 그 그림만 다시 그린다
  const redraw = { "chart-band": drawBand, "chart-trend": drawTrend, "chart-cust": drawCust, "chart-season": renderSeason, "chart-invest": renderInvest };
  const sizes = new Map();
  const ro = new ResizeObserver((entries) => {
    for (const e of entries) {
      const { width, height } = e.contentRect;
      const prev = sizes.get(e.target.id);
      sizes.set(e.target.id, [width, height]);
      if (prev && Math.abs(prev[0] - width) < 1 && Math.abs(prev[1] - height) < 1) continue;
      redraw[e.target.id]();
    }
  });
  Object.keys(redraw).forEach((id) => ro.observe($(`#${id}`)));
  window.addEventListener("hashchange", () => { fromURL(); render(true); });
})();
