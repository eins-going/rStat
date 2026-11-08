(() => {
  // 벼 작황 — 시군·연도별 쌀 단수와 평년 대비, 통계청 예상·KREI 전망의 정확도, 시군 위성 영상 (data/rice.js)
  // 지역 체계·지도는 농사용 전기(power.js)와 같다. 위성 영상은 시군을 고를 때만 Leaflet과 함께 불러온다.
  const R = window.AGRI_RICE;
  const T = window.AGRI_TOPO;
  const V = R.v, O = R.outlook, ACC = R.acc;
  const YEARS = R.years;
  const YI = Object.fromEntries(YEARS.map((y, i) => [y, i]));
  const LASTY = YEARS.filter((y) => V["00"]?.y[YI[y]] != null).at(-1);
  const OYEARS = Object.keys(O).map(Number).sort((a, b) => a - b);
  const CUR = Math.max(LASTY, OYEARS.at(-1)); // 전망만 있는 올해
  const UFROM = R.unitFrom || 1996;
  const NFROM = 2000; // 왼쪽 전국 그림 시작
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const FIT = window.matchMedia("(min-width: 1281px) and (min-height: 720px)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
  const kgS = (n) => (ok(n) ? `${sgn(n)}${nf1.format(Math.abs(n))}kg` : "–");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const haS = (v) => (!ok(v) ? "–" : v >= 1e4 ? `${nf1.format(v / 1e4)}만ha` : `${int(v)}ha`);
  const tonS = (v) => (!ok(v) ? "–" : v >= 1e4 ? `${nf1.format(v / 1e4)}만 톤` : `${int(v)}톤`);
  const ratio = (a, b) => (ok(a) && ok(b) && b > 0 ? (a / b - 1) * 100 : null);
  const at = (k, f, y) => (YI[y] == null ? null : V[k]?.[f]?.[YI[y]] ?? null);
  const deltaHTML = (d, lab) => {
    if (!ok(d)) return "";
    const cls = d > 0 ? "rc-hi" : d < 0 ? "rc-lo" : ""; // 높음 청록 · 낮음 주황 (지도 색과 같다)
    return `<span class="d-lab">${lab}</span><span class="${cls}">${d > 0 ? "▲" : d < 0 ? "▼" : "–"} ${nf1.format(Math.abs(d))}%</span>`;
  };

  // ---------- 지도 지표 ----------
  const METRICS = [
    { key: "prod", chip: "생산량", label: "쌀 생산량", kind: "seq", get: (k, y) => at(k, "p", y), fmt: tonS,
      note: "논벼 정곡 · 시군을 누르면 위성 영상" },
    { key: "norm", chip: "평년 대비", label: "단수 평년 대비", kind: "div", cuts: [-5, -1.5, 1.5, 5], get: (k, y) => at(k, "d", y), fmt: pctS,
      note: "평년 = 직전 5년 중 최고·최저 뺀 3년 평균 · 시군을 누르면 위성 영상" },
    { key: "yield", chip: "단수", label: "10a당 생산량", kind: "seq", get: (k, y) => at(k, "y", y), fmt: (v) => (ok(v) ? `${int(v)}kg` : "–"),
      note: "논벼 정곡 · 시군을 누르면 위성 영상" },
    { key: "area", chip: "재배면적", label: "논벼 재배면적", kind: "seq", get: (k, y) => at(k, "a", y), fmt: haS,
      note: "시군을 누르면 위성 영상" },
    { key: "area5", chip: "면적 5년 증감", label: "재배면적 5년 전 대비", kind: "div", get: (k, y) => ratio(at(k, "a", y), at(k, "a", y - 5)), fmt: pctS,
      note: "시군을 누르면 위성 영상" },
  ];
  const DEFAULT_METRIC = METRICS[0];
  const RANK_MIN_HA = 1000; // 순위는 재배면적 1천 ha 이상 시군만 (작은 시군의 단수는 흔들림이 크다)
  const state = { key: NATION, year: LASTY, metric: DEFAULT_METRIC, view: "map" };

  // ---------- 선택 ----------
  const selSido = $("#sido"), selSgg = $("#sgg"), selYear = $("#year");
  const MAP_YEARS = YEARS.filter((y) => y >= UFROM && y <= LASTY);
  selSido.innerHTML = `<option value="${NATION}">전국</option>` + SIDO_CODES.map((s) => `<option value="${s}">${T.sidos[s].name}</option>`).join("");
  selYear.innerHTML = MAP_YEARS.map((y) => `<option value="${y}">${y}년</option>`).reverse().join("");
  selSido.addEventListener("change", () => select(selSido.value));
  selSgg.addEventListener("change", () => select(selSgg.value || selSido.value));
  selYear.addEventListener("change", () => setYear(+selYear.value));

  function syncControls() {
    const s = sidoOf(state.key);
    selSido.value = s || NATION;
    selSgg.disabled = !s;
    selSgg.innerHTML = `<option value="">${s ? "전체" : "–"}</option>` + (s ? UNITS_BY_SIDO[s].map((k) => `<option value="${k}">${label(k)}</option>`).join("") : "");
    selSgg.value = level(state.key) === 2 ? state.key : "";
    selYear.value = state.year;
  }

  // ---------- 주소: #전라남도/해남군?y=2024&m=yield&v=sat ----------
  function syncURL() {
    const k = state.key;
    const path = k === NATION ? "" : level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`;
    const q = new URLSearchParams();
    if (state.year !== LASTY) q.set("y", state.year);
    if (state.metric !== DEFAULT_METRIC) q.set("m", state.metric.key);
    if (state.view === "sat") q.set("v", "sat");
    const url = `${location.pathname}${q.toString() ? `?${q}` : ""}${path ? `#${encodeURIComponent(path)}` : ""}`;
    if (url !== location.pathname + location.search + location.hash) history.replaceState(null, "", url);
  }
  function fromURL() {
    const [a, b] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = SIDO_CODES.find((c) => T.sidos[c].name === a || T.sidos[c].short === a);
    state.key = s ? (b && UNITS_BY_SIDO[s].find((k) => label(k) === b)) || s : NATION;
    const q = new URLSearchParams(location.search);
    const y = +q.get("y");
    state.year = MAP_YEARS.includes(y) ? y : LASTY;
    state.metric = METRICS.find((m) => m.key === q.get("m")) || DEFAULT_METRIC;
    state.view = q.get("v") === "sat" && level(state.key) === 2 ? "sat" : "map";
  }

  // ---------- 지도 ----------
  const RAMP = ["#3b3428", "#5e4925", "#8a6322", "#c0841f", "#f5a524"];
  // 발산형: 낮음 = 주황·갈색, 높음 = 청록 (빨강·파랑은 좋고 나쁨이 거꾸로 읽혀 쓰지 않는다)
  const DIV = ["#e8894a", "#8c5a34", "#3a3d44", "#2b7a6f", "#4fc1a6"];
  const SMALL_HA = 500; // 재배면적이 이보다 작은 시군은 지도에서 흐리게 (단수가 크게 흔들린다)
  const small = (k, y) => { const a = at(k, "a", y); return ok(a) && a < SMALL_HA; };
  const EMPTY = "#2a2d33";
  const mapSvg = d3.select("#map");
  const tip = $("#tip");
  const obj = T.objects.municipalities;
  const unitFeatures = ALL_UNITS.map((k) => ({
    type: "Feature", properties: { key: k, sido: sidoOf(k) },
    geometry: topojson.merge(T, GEOMS.filter((g) => unitKeyOf(g) === k)),
  }));
  const featOf = new Map(unitFeatures.map((f) => [f.properties.key, f]));
  const sidoFeatures = SIDO_CODES.map((s) => ({
    type: "Feature", properties: { key: s }, geometry: topojson.merge(T, GEOMS.filter((g) => g.properties.sido === s)),
  }));
  const sidoMesh = topojson.mesh(T, obj, (a, b) => a !== b && a.properties.sido !== b.properties.sido);
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
  let path = null, size = { w: 0, h: 0 };

  function drawMap() {
    const wrap = $("#map-wrap");
    const w = wrap.clientWidth;
    const h = FIT.matches ? Math.max(240, wrap.clientHeight) : Math.round(Math.max(380, Math.min(720, w * 1.05)));
    size = { w, h };
    const pad = 12, bw = BOUNDS.x1 - BOUNDS.x0, bh = BOUNDS.y1 - BOUNDS.y0;
    const s = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
    const ox = (w - bw * s) / 2, oy = (h - bh * s) / 2;
    const project = (lon, lat) => [ox + (drawLon(lon) * KX - BOUNDS.x0) * s, oy + (BOUNDS.y1 - lat) * s];
    path = d3.geoPath(d3.geoTransform({ point(lon, lat) { this.stream.point(...project(lon, lat)); } }));
    mapSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", FIT.matches ? null : h);
    anchor.clear();
    [...sidoFeatures, ...unitFeatures].forEach((f) => anchor.set(f.properties.key, labelPoint(f)));
    Object.entries(LABEL_AT).forEach(([k, ll]) => anchor.set(k, project(...ll)));
    const world = mapSvg.selectAll("g.world").data([0]).join("g").attr("class", "world");
    world.selectAll("g.units").data([0]).join("g").attr("class", "units")
      .selectAll("path").data(unitFeatures, (d) => d.properties.key).join("path")
      .attr("class", "region unit").attr("d", path).attr("tabindex", 0).attr("role", "button")
      .on("mousemove", (e, d) => showTip(e, d.properties.key))
      .on("mouseleave", () => { tip.hidden = true; })
      .on("click", (e, d) => onRegionClick(d.properties.key))
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRegionClick(d.properties.key); } });
    world.selectAll("path.mesh-sido-bg").data([sidoMesh]).join("path").attr("class", "mesh-sido-bg").attr("d", path);
    world.selectAll("path.mesh-sido").data([sidoMesh]).join("path").attr("class", "mesh-sido").attr("d", path);
    const ul = featOf.get(ULLEUNG.key);
    const [[ux0, uy0], [ux1, uy1]] = ul ? path.bounds(ul) : [[0, 0], [0, 0]];
    world.selectAll("rect.inset-frame").data(ul ? [0] : []).join("rect").attr("class", "inset-frame")
      .attr("x", ux0 - 5).attr("y", uy0 - 5).attr("width", ux1 - ux0 + 10).attr("height", uy1 - uy0 + 10).attr("rx", 3)
      .append("title").text("울릉군: 지도에서 보기 좋게 실제보다 서쪽으로 옮겨 그림");
    mapSvg.selectAll("g.labels").data([0]).join("g").attr("class", "labels");
    applyView(false);
  }

  const LABEL_AT = { 31: [127.45, 37.2], 23: [126.5, 37.42], 34: [126.75, 36.5] };
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
  function drawLabels(view, animate) {
    const s = sidoOf(state.key);
    const keys = s ? UNITS_BY_SIDO[s] : SIDO_CODES;
    const pos = (k) => { const [x, y] = anchor.get(k) || [NaN, NaN]; return [x * view.k + view.x, y * view.k + view.y]; };
    const small = (k) => {
      if (k === state.key) return false;
      const f = s ? featOf.get(k) : sidoFeatures.find((d) => d.properties.key === k);
      return path.area(f) * view.k * view.k < (s ? 260 : 120);
    };
    const name = (k) => (level(k) === 1 ? (!s && k === "36" ? "전남광주" : T.sidos[k].short) : (label(k).endsWith("시부") ? "시부" : label(k).replace(/(시|군|구)$/, "")));
    const inView = (k) => { const [x, y] = pos(k); return x > 20 && x < size.w - 20 && y > 16 && y < size.h - 10; };
    const ctx = s ? SIDO_CODES.filter((c) => c !== s && inView(c)) : [];
    const data = [...keys.filter((k) => !small(k) && Number.isFinite(pos(k)[0]) && (s || k !== "24")), ...ctx];
    const sel = mapSvg.select("g.labels").selectAll("text").data(data, (k) => k).join("text")
      .attr("class", (k) => `region-label${level(k) === 1 ? " sido-label" : ""}${s && level(k) === 1 ? " ctx" : ""}${k === state.key ? " sel" : ""}`)
      .attr("x", (k) => pos(k)[0])
      .attr("y", (k) => pos(k)[1] + 4)
      .text(name);
    if (animate && !reduceMotion) sel.style("opacity", 0).transition().delay(550).duration(300).style("opacity", 1);
    else sel.interrupt().style("opacity", 1);
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
    pan.sync(t);
    if (animate && !reduceMotion) world.transition().duration(700).ease(d3.easeCubicInOut).attr("transform", t);
    else world.interrupt().attr("transform", t);
    drawLabels(t, animate);
  }
  const pan = window.rstatPan(mapSvg, (t) => {
    mapSvg.select("g.world").interrupt().attr("transform", t);
    tip.hidden = true;
    drawLabels(t, false);
  }, () => applyView(true));

  // 시군을 누르면 그 시군의 위성 영상으로
  function onRegionClick(k) {
    tip.hidden = true;
    state.key = k;
    state.view = "sat";
    render(true);
  }

  function scaleFor(m, vals) {
    if (!vals.length) return { fn: () => EMPTY, rows: [] };
    if (m.kind === "div") {
      let cuts = m.cuts;
      if (!cuts) {
        const dev = vals.map(Math.abs).sort((a, b) => a - b);
        const lim = dev[Math.floor((dev.length - 1) * 0.9)] || dev.at(-1) || 1;
        cuts = [-lim * 0.6, -lim * 0.15, lim * 0.15, lim * 0.6];
      }
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
    const m = state.metric, y = state.year, s = sidoOf(state.key);
    const vals = ALL_UNITS.map((k) => m.get(k, y)).filter(ok);
    const sc = scaleFor(m, vals);
    mapSvg.selectAll("path.unit")
      .attr("fill", (d) => { const v = m.get(d.properties.key, y); return ok(v) ? sc.fn(v) : EMPTY; })
      .classed("sel", (d) => d.properties.key === state.key)
      .classed("pw-ctx", (d) => !!s && d.properties.sido !== s)
      .classed("rc-small", (d) => !m.key.startsWith("area") && small(d.properties.key, y))
      .attr("aria-label", (d) => `${fullLabel(d.properties.key)} ${m.label} ${m.fmt(m.get(d.properties.key, y))}`);
    mapSvg.selectAll("path.unit.sel").raise();
    mapSvg.classed("dimmed", level(state.key) === 2);
    const missing = ALL_UNITS.length - vals.length;
    $("#legend").innerHTML = `<span class="title">${m.label} <span style="color:var(--faint);font-weight:400">${y}년</span></span>`
      + sc.rows.map(([c, t]) => `<span class="row"><span class="sw" style="background:${c}"></span>${t}</span>`).join("")
      + (missing ? `<span class="row"><span class="sw" style="background:${EMPTY};outline:1px solid #3a3f48"></span>자료 없음 ${missing}</span>` : "")
      + (m.key.startsWith("area") ? "" : `<span class="rc-lg-small" title="재배면적 ${SMALL_HA}ha 미만: 단수가 크게 흔들려 흐리게 칠함"><i></i>흐림 = ${SMALL_HA}ha 미만</span>`);
    $("#metric-note").textContent = m.note;
  }

  function showTip(e, k) {
    const y = state.year;
    const yv = at(k, "y", y), n = at(k, "n", y);
    tip.innerHTML = `<b>${esc(fullLabel(k))}</b>${y}년 단수 ${ok(yv) ? `<b style="display:inline">${int(yv)}kg</b>` : "자료 없음"}`
      + (ok(n) ? `<br>평년 ${int(n)}kg · ${pctS(at(k, "d", y))}` : "")
      + (ok(at(k, "a", y)) ? `<br>재배면적 ${haS(at(k, "a", y))}${small(k, y) ? ' · <span style="color:var(--accent)">면적 작음</span>' : ""}` : "")
      + `<br><span class="tip-hint">누르면 위성 영상</span>`;
    const r = $("#map-wrap").getBoundingClientRect();
    tip.style.left = `${e.clientX - r.left}px`;
    tip.style.top = `${e.clientY - r.top}px`;
    tip.hidden = false;
  }

  function renderChips() {
    $("#chips").innerHTML = METRICS.map((m) => `<button type="button" data-k="${m.key}" aria-pressed="${m === state.metric}" title="${m.label}">${m.chip}</button>`).join("");
    $$("#chips button").forEach((b) => b.addEventListener("click", () => {
      state.metric = METRICS.find((m) => m.key === b.dataset.k);
      $$("#chips button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      syncURL();
      paintMap();
      renderRank();
    }));
  }

  // ---------- 순위: 평년 대비는 낮은 쪽·높은 쪽 5곳씩, 나머지는 큰 값 10곳 ----------
  function renderRank() {
    const m = state.metric, y = state.year, s = sidoOf(state.key);
    const peers = (s ? UNITS_BY_SIDO[s] : ALL_UNITS).filter((k) => (m.key.startsWith("area") ? true : (at(k, "a", y) || 0) >= RANK_MIN_HA));
    const name = (k) => (s ? label(k) : fullLabel(k));
    const list = peers.map((k) => [k, m.get(k, y)]).filter(([, v]) => ok(v)).sort((a, b) => b[1] - a[1]);
    const max = Math.max(...list.map(([, v]) => Math.abs(v)), 0) || 1;
    const row = ([k, v], no) => `
      <button type="button" class="rank-row${s ? "" : " wide"}${k === state.key ? " sel" : ""}" data-r="${k}">
        <span class="no">${no}</span><span class="nm">${esc(name(k))}</span>
        <span class="track"><span class="fill${v < 0 ? " neg" : m.kind === "div" ? " pos" : ""}" style="width:${(Math.abs(v) / max) * 100}%"></span></span>
        <span class="val">${m.fmt(v)}</span><span></span>
      </button>`;
    const scope = s ? `${T.sidos[s].short} 시군` : "시군";
    const minNote = m.key.startsWith("area") ? "" : ` · ${nf0.format(RANK_MIN_HA)}ha 이상`;
    const meta = `<span class="rank-meta">${y}년 · ${list.length}곳${minNote}</span>`;
    let body;
    if (m.key === "norm") {
      const lo = [...list].reverse().filter(([, v]) => v < 0).slice(0, 5), hi = list.filter(([, v]) => v > 0).slice(0, 5);
      body = `<div class="rank-title"><span><b>평년보다 낮은 ${scope}</b> · 높은 ${scope}</span>${meta}</div>
        <div>${lo.map((d, j) => row(d, j + 1)).join("")}</div><div>${hi.map((d, j) => row(d, j + 1)).join("")}</div>`;
    } else {
      const top = list.slice(0, 10);
      body = `<div class="rank-title"><span><b>${m.label}</b> 상위 ${scope}</span>${meta}</div>
        <div>${top.slice(0, 5).map((d, j) => row(d, j + 1)).join("")}</div><div>${top.slice(5).map((d, j) => row(d, j + 6)).join("")}</div>`;
    }
    $("#rank").innerHTML = list.length ? body : "";
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
  // 선이 왼쪽에서 오른쪽으로 드러난다 (power.js drawBand와 같은 방식). 크기만 바뀌어 다시 그릴 때는 남은 시간만큼 이어 간다
  const SWEEP = 1500;
  function sweepClip(svg, el, x0, w, h, animate) {
    const now = performance.now();
    if (animate) el._sweep = now;
    const done = el._sweep == null ? 1 : Math.min(1, (now - el._sweep) / SWEEP);
    const ease = d3.easeSinInOut;
    const id = `clip-${el.id}`;
    const rect = svg.append("defs").append("clipPath").attr("id", id).append("rect")
      .attr("x", 0).attr("y", -10).attr("height", h + 20).attr("width", done < 1 ? x0 + (w - x0) * ease(done) : w);
    if (done < 1) rect.transition().duration(SWEEP * (1 - done)).ease(d3.easeLinear)
      .attrTween("width", () => (t) => x0 + (w - x0) * ease(done + (1 - done) * t));
    return svg.append("g").attr("clip-path", `url(#${id})`);
  }
  function yAxis(svg, y, m, w, nt, fmt) {
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(y.ticks(nt)).join("g").call((g) => {
      g.append("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (d) => y(d)).attr("y2", (d) => y(d)).classed("pw-100", (d) => d === 0 && y.domain()[0] < 0);
      g.append("text").attr("x", m.l - 5).attr("y", (d) => y(d) + 4).attr("text-anchor", "end").text(fmt);
    });
  }
  function xYears(svg, x, h, ys, step) {
    const last = ys.at(-1);
    const marks = ys.filter((y) => y % step === 0 && last - y >= 2 || y === last);
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(marks).join("text")
      .attr("x", (d) => x(d)).attr("y", h - 3).attr("text-anchor", "middle").text((d) => (d === marks[0] || d === last ? d : `'${String(d).slice(2)}`));
  }
  // 값 표시: 마우스를 올리면 가까운 연도의 값을 띄운다
  const ctip = Object.assign(document.createElement("div"), { className: "chart-tip", hidden: true });
  document.body.append(ctip);
  // 단추 풍선: data-tip이 있는 위성 영상 단추에 마우스를 올리면 뜻을 보인다
  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest?.("[data-tip]");
    if (!el) { if (ctip.dataset.btn) { ctip.hidden = true; delete ctip.dataset.btn; } return; }
    ctip.innerHTML = el.dataset.tip;
    ctip.dataset.btn = "1";
    ctip.hidden = false;
    const r = el.getBoundingClientRect(), w = ctip.offsetWidth, h = ctip.offsetHeight;
    ctip.style.left = `${Math.min(window.innerWidth - w - 6, Math.max(6, r.left + r.width / 2 - w / 2))}px`;
    ctip.style.top = `${r.bottom + 8 + h > window.innerHeight ? r.top - h - 8 : r.bottom + 8}px`;
  });
  function hover(svg, m, w, h, x, ys, html, onPick) {
    const guide = svg.append("line").attr("class", "rc-guide").attr("y1", m.t).attr("y2", h - m.b).style("display", "none");
    const near = (e) => { const px = d3.pointer(e)[0]; return ys.reduce((a, b) => (Math.abs(x(b) - px) < Math.abs(x(a) - px) ? b : a)); };
    svg.append("rect").attr("x", m.l).attr("y", 0).attr("width", Math.max(0, w - m.l - m.r)).attr("height", h).attr("fill", "transparent")
      .style("cursor", onPick ? "pointer" : null)
      .on("mousemove", (e) => {
        const y = near(e);
        const s = html(y);
        if (!s) { ctip.hidden = true; guide.style("display", "none"); return; }
        guide.style("display", null).attr("x1", x(y)).attr("x2", x(y));
        ctip.innerHTML = s;
        ctip.hidden = false;
        const r = ctip.getBoundingClientRect();
        ctip.style.left = `${Math.min(window.innerWidth - r.width - 8, e.clientX + 12)}px`;
        ctip.style.top = `${Math.max(8, e.clientY - r.height - 10)}px`;
      })
      .on("mouseleave", () => { ctip.hidden = true; guide.style("display", "none"); })
      .on("click", (e) => { if (onPick) onPick(near(e)); });
  }
  const pickYear = (y) => { if (MAP_YEARS.includes(y)) setYear(y); };

  // ---------- 왼쪽: 전국 단수와 전망 ----------
  function renderNat() {
    const o = O[CUR] || {};
    const n = at(NATION, "n", CUR) ?? normOf(NATION, CUR);
    const st = o.stat, kr = o.krei;
    const pPrev = at(NATION, "p", CUR - 1), pFin = at(NATION, "p", CUR);
    $("#nat-l1").textContent = `${CUR}년 통계청 예상`;
    $("#nat-v1").textContent = ok(st?.p) ? nf1.format(st.p / 1e4) : "–";
    $("#nat-u1").textContent = ok(st?.p) ? "만 톤" : "";
    $("#nat-d1").innerHTML = deltaHTML(ratio(st?.p, pPrev), "전년 대비");
    if (o.final && ok(pFin)) {
      $("#nat-l2").textContent = `${CUR}년 확정`;
      $("#nat-v2").textContent = nf1.format(pFin / 1e4);
      $("#nat-u2").textContent = "만 톤";
      $("#nat-d2").innerHTML = ok(st?.p) ? `<span class="d-lab">예상 오차</span><span>${pctS(ratio(st.p, pFin))}</span>` : "";
    } else {
      const [mm, dd] = (o.pending || "").split("-").slice(1).map(Number);
      $("#nat-l2").textContent = `${CUR}년 확정`;
      $("#nat-v2").textContent = o.pending ? `${mm}.${dd}` : "–";
      $("#nat-u2").textContent = o.pending ? "발표 예정" : "";
      $("#nat-d2").innerHTML = ok(pPrev) ? `<span class="d-lab">${CUR - 1}년</span><span>${tonS(pPrev)}</span>` : "";
    }
    const krTxt = kr ? (ok(kr.lo) && ok(kr.hi) && kr.lo !== kr.hi ? `${int(kr.lo)}~${int(kr.hi)}kg` : `${int(kr.y)}kg`) : null;
    $("#nat-line").innerHTML = [
      ok(st?.y) ? `<span>단수 <b>${int(st.y)}kg</b> (평년 ${int(n)}kg 대비 ${pctS(ratio(st.y, n))})</span>` : "",
      krTxt ? `<span>KREI 단수 전망 <b>${krTxt}</b></span>` : "",
      ok(st?.a) ? `<span>재배면적 <b>${haS(st.a)}</b></span>` : "",
    ].join("");
    drawNat();
  }
  // 올해처럼 확정 행이 없는 해의 평년
  function normOf(k, y) {
    const prev = [1, 2, 3, 4, 5].map((d) => at(k, "y", y - d));
    if (prev.some((v) => !ok(v))) return null;
    const s = prev.sort((a, b) => a - b);
    return (s[1] + s[2] + s[3]) / 3;
  }
  let natMode = "p"; // p 생산량 · y 단수
  $("#nat-mode").addEventListener("click", (e) => {
    const b = e.target.closest("[data-m]");
    if (!b || b.dataset.m === natMode) return;
    natMode = b.dataset.m;
    $("#nat-mode").querySelectorAll("[data-m]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.m === natMode));
    drawNat(true);
  });
  function drawNat(animate = false) {
    if (natMode === "p") return drawNatProd(animate);
    $("#nat-key").innerHTML = `<span><i class="cur"></i>확정</span><span><i class="stat"></i>통계청 10월 예상</span><span><i class="krei"></i>KREI 9월 전망</span><span><i class="prev"></i>평년</span>`;
    const el = $("#chart-nat");
    const { svg, w, h } = frame(el, 150);
    const ys = d3.range(NFROM, CUR + 1);
    const fin = (y) => at(NATION, "y", y), nor = (y) => at(NATION, "n", y) ?? (y === CUR ? normOf(NATION, y) : null);
    const vals = ys.flatMap((y) => [fin(y), nor(y), O[y]?.stat?.y, O[y]?.krei?.lo, O[y]?.krei?.hi]).filter(ok);
    const m = { l: 34, r: 30, t: 14, b: 16 };
    const x = d3.scaleLinear().domain([NFROM - 0.4, CUR + 0.4]).range([m.l, w - m.r]);
    const y = d3.scaleLinear().domain([d3.min(vals) - 6, d3.max(vals) + 6]).nice(4).range([h - m.b, m.t]);
    yAxis(svg, y, m, w, h < 120 ? 3 : 4, (d) => d);
    xYears(svg, x, h, ys, 5);
    // 고른 연도 표시
    if (state.year >= NFROM) svg.append("line").attr("class", "pw-mark").attr("x1", x(state.year)).attr("x2", x(state.year)).attr("y1", m.t).attr("y2", h - m.b);
    const g = sweepClip(svg, el, m.l, w, h, false);
    const line = (f) => d3.line().defined((d) => ok(f(d))).x((d) => x(d)).y((d) => y(f(d)));
    g.append("path").attr("class", "rc-norm").attr("d", line(nor)(ys));
    g.append("path").attr("class", "pw-cur").attr("d", line(fin)(ys));
    const kys = ys.filter((yy) => ok(O[yy]?.krei?.y));
    g.selectAll("line.rc-krei").data(kys).join("line").attr("class", "rc-krei")
      .attr("x1", (d) => x(d) + 3).attr("x2", (d) => x(d) + 3)
      .attr("y1", (d) => y(O[d].krei.lo ?? O[d].krei.y) + 1.5).attr("y2", (d) => y(O[d].krei.hi ?? O[d].krei.y) - 1.5);
    const sys = ys.filter((yy) => ok(O[yy]?.stat?.y));
    g.selectAll("circle.rc-stat").data(sys).join("circle").attr("class", (d) => `rc-stat${d === CUR ? " now" : ""}`)
      .attr("cx", (d) => x(d) - 2).attr("cy", (d) => y(O[d].stat.y)).attr("r", (d) => (d === CUR ? 4.5 : 3.2));
    // 올해 예상만 이름표를 단다
    const cs = O[CUR]?.stat?.y;
    if (ok(cs)) {
      g.append("text").attr("class", "rc-lab").attr("x", x(CUR)).attr("y", y(cs) - 9).attr("text-anchor", "end").text(`${CUR} 예상 ${int(cs)}`);
    }
    hover(svg, m, w, h, x, ys, (yy) => {
      const o = O[yy] || {};
      const parts = [`<b>${yy}년</b>`];
      if (ok(fin(yy))) parts.push(`확정 ${int(fin(yy))}kg`);
      else if (o.pending) parts.push("확정 대기");
      if (ok(o.stat?.y)) parts.push(`통계청 ${int(o.stat.y)}${ok(o.stat.err) ? ` (${kgS(o.stat.err)})` : ""}`);
      if (ok(o.krei?.y)) parts.push(`KREI ${o.krei.lo !== o.krei.hi && ok(o.krei.lo) ? `${int(o.krei.lo)}~${int(o.krei.hi)}` : int(o.krei.y)}${ok(o.krei.err) ? ` (${kgS(o.krei.err)})` : ""}`);
      if (ok(nor(yy))) parts.push(`평년 ${int(nor(yy))}`);
      return parts.join(" · ");
    }, pickYear);
  }

  // 전국 생산량: 확정(선)과 통계청 10월 예상(점). KREI는 단수로만 전망해 단수 그래프에서 본다
  function drawNatProd(animate = false) {
    $("#nat-key").innerHTML = `<span><i class="cur"></i>확정</span><span><i class="stat"></i>통계청 10월 예상</span><span>단위 만 톤</span>`;
    const el = $("#chart-nat");
    const { svg, w, h } = frame(el, 150);
    const ys = d3.range(NFROM, CUR + 1);
    const fin = (y) => at(NATION, "p", y), est = (y) => O[y]?.stat?.p;
    const vals = ys.flatMap((y) => [fin(y), est(y)]).filter(ok);
    const m = { l: 34, r: 30, t: 14, b: 16 };
    const x = d3.scaleLinear().domain([NFROM - 0.4, CUR + 0.4]).range([m.l, w - m.r]);
    const lo = d3.min(vals), hi = d3.max(vals);
    const y = d3.scaleLinear().domain([lo - (hi - lo) * 0.08, hi + (hi - lo) * 0.08]).nice(4).range([h - m.b, m.t]);
    yAxis(svg, y, m, w, h < 120 ? 3 : 4, (d) => nf0.format(d / 1e4));
    xYears(svg, x, h, ys, 5);
    if (state.year >= NFROM) svg.append("line").attr("class", "pw-mark").attr("x1", x(state.year)).attr("x2", x(state.year)).attr("y1", m.t).attr("y2", h - m.b);
    const g = sweepClip(svg, el, m.l, w, h, false);
    g.append("path").attr("class", "pw-cur").attr("d", d3.line().defined((d) => ok(fin(d))).x((d) => x(d)).y((d) => y(fin(d)))(ys));
    const sys = ys.filter((yy) => ok(est(yy)));
    g.selectAll("circle.rc-stat").data(sys).join("circle").attr("class", (d) => `rc-stat${d === CUR ? " now" : ""}`)
      .attr("cx", (d) => x(d) - 2).attr("cy", (d) => y(est(d))).attr("r", (d) => (d === CUR ? 4.5 : 3.2));
    if (ok(est(CUR))) g.append("text").attr("class", "rc-lab").attr("x", x(CUR)).attr("y", y(est(CUR)) - 9).attr("text-anchor", "end").text(`${CUR} 예상 ${nf1.format(est(CUR) / 1e4)}만 톤`);
    hover(svg, m, w, h, x, ys, (yy) => {
      const o = O[yy] || {};
      const parts = [`<b>${yy}년</b>`];
      if (ok(fin(yy))) parts.push(`확정 ${tonS(fin(yy))}`);
      else if (o.pending) parts.push("확정 대기");
      if (ok(est(yy))) parts.push(`통계청 예상 ${tonS(est(yy))}${ok(fin(yy)) ? ` (${pctS(ratio(est(yy), fin(yy)))})` : ""}`);
      return parts.join(" · ");
    }, pickYear);
  }

  // ---------- 왼쪽: 전망 정확도 ----------
  const ORG = {
    stat: { name: "통계청 10월 예상", color: "#5fb3ff", cls: "rc-e-stat" },
    krei: { name: "KREI 9월 전망", color: "#5fb37c", cls: "rc-e-krei" },
    norm: { name: "평년값 그대로", color: "#4a505b" },
  };
  function renderAcc() {
    const yrs = ACC.years;
    const last = d3.max(yrs.stat, (d) => d[0]);
    $("#acc-range").textContent = `${ACC.from}~${last} · 확정 대비`;
    const rows = ["stat", "krei", "norm"].filter((k) => ACC[k]);
    const max = d3.max(rows, (k) => ACC[k].mae) || 1;
    const missing = (k) => d3.range(ACC.from, last + 1).filter((y) => !yrs[k].some((d) => d[0] === y));
    $("#acc-rows").innerHTML = `<div class="cap"><span></span><span>평균 절대 오차</span><span>평균</span><span>RMSE</span></div>`
      + rows.map((k) => {
        const a = ACC[k], miss = missing(k);
        return `<div class="row${k === "norm" ? " base" : ""}" title="${ORG[k].name}: ${a.n}년 · 편향 ${kgS(a.bias)} · 가장 큰 오차 ${kgS(a.max)}${miss.length ? ` · ${miss.join("·")}년 없음` : ""}">
          <span class="nm">${ORG[k].name}</span>
          <span class="track"><span class="fill" style="width:${(a.mae / max) * 100}%;background:${ORG[k].color}"></span></span>
          <span class="val">±${nf1.format(a.mae)}kg</span><span class="rm">${nf1.format(a.rmse)}kg</span></div>`;
      }).join("");
    $("#err-key").innerHTML = `<span><i class="statb"></i>통계청</span><span><i class="kreib"></i>KREI</span>${missing("krei").length ? `<span>KREI ${missing("krei").join("·")}년 없음</span>` : ""}`;
    drawErr();
  }
  function drawErr() {
    const el = $("#chart-err");
    const { svg, w, h } = frame(el, 110);
    const yrs = ACC.years;
    const last = d3.max(yrs.stat, (d) => d[0]);
    const ys = d3.range(ACC.from, last + 1);
    const val = (k, yy) => yrs[k].find((d) => d[0] === yy)?.[1];
    const lim = d3.max(["stat", "krei"].flatMap((k) => ys.map((yy) => Math.abs(val(k, yy) ?? 0)))) || 10;
    const m = { l: 34, r: 8, t: 6, b: 16 };
    const x = d3.scaleBand().domain(ys).range([m.l, w - m.r]).padding(0.22);
    const y = d3.scaleLinear().domain([-lim, lim]).nice(3).range([h - m.b, m.t]);
    yAxis(svg, y, m, w, 3, (d) => (d > 0 ? `+${d}` : d));
    const bw = x.bandwidth() / 2;
    for (const [j, k] of ["stat", "krei"].entries()) {
      svg.append("g").selectAll("rect").data(ys.filter((yy) => ok(val(k, yy)))).join("rect").attr("class", ORG[k].cls)
        .attr("x", (d) => x(d) + j * bw + 0.5).attr("width", Math.max(1, bw - 1))
        .attr("y", (d) => y(Math.max(0, val(k, d)))).attr("height", (d) => Math.max(1, Math.abs(y(val(k, d)) - y(0))))
        .attr("rx", 1.5);
    }
    const lastY = ys.at(-1);
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(ys.filter((yy) => (lastY - yy) % 3 === 0)).join("text")
      .attr("x", (d) => x(d) + x.bandwidth() / 2).attr("y", h - 3).attr("text-anchor", "middle").text((d) => `'${String(d).slice(2)}`);
    const cx = (yy) => x(yy) + x.bandwidth() / 2;
    hover(svg, m, w, h, cx, ys, (yy) => {
      const s = val("stat", yy), k = val("krei", yy);
      return `<b>${yy}년</b>확정 ${int(at(NATION, "y", yy))}kg · 통계청 ${kgS(s)} · KREI ${ok(k) ? kgS(k) : "없음"}`;
    });
  }

  // ---------- 오른쪽: 고른 지역 ----------
  function renderUnit(animate = false) {
    const k = state.key, y = state.year;
    $("#unit-name").textContent = fullLabel(k);
    $("#unit-year").textContent = `${y}년`;
    const yv = at(k, "y", y), n = at(k, "n", y);
    const a = at(k, "a", y), p = at(k, "p", y);
    $("#u-prod").textContent = !ok(p) ? "–" : p >= 1e4 ? nf1.format(p / 1e4) : int(p);
    $("#u-produ").textContent = !ok(p) ? "" : p >= 1e4 ? "만 톤" : "톤";
    $("#u-pyoy").innerHTML = deltaHTML(ratio(p, at(k, "p", y - 1)), "전년 대비");
    $("#u-yield").textContent = int(yv);
    $("#u-dev").innerHTML = deltaHTML(at(k, "d", y), "평년 대비");
    const a10 = ratio(a, at(k, "a", y - 10));
    $("#u-line").innerHTML = ok(a) ? `<span>재배면적 <b>${haS(a)}</b>${ok(a10) ? ` (10년 전 대비 ${pctS(a10)})` : ""}</span>${ok(n) ? `<span>평년 단수 <b>${int(n)}kg</b></span>` : ""}` : `<span>${y}년 시군 자료 없음</span>`;
    $("#unit-key").innerHTML = `<span><i class="cur"></i>확정</span><span><i class="prev"></i>평년</span>`;
    drawUnit(animate);
    drawProd();
  }
  function unitYears() {
    return d3.range(UFROM, LASTY + 1);
  }
  function drawUnit(animate = false) {
    const k = state.key, el = $("#chart-unit");
    const { svg, w, h } = frame(el, 150);
    const ys = unitYears();
    const fin = (y) => at(k, "y", y), nor = (y) => at(k, "n", y);
    const vals = ys.flatMap((y) => [fin(y), nor(y)]).filter(ok);
    if (!vals.length) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text("자료 없음"); return; }
    const m = { l: 34, r: 10, t: 8, b: 16 };
    const x = d3.scaleLinear().domain([ys[0] - 0.4, ys.at(-1) + 0.4]).range([m.l, w - m.r]);
    const lo = d3.min(vals), hi = d3.max(vals);
    const y = d3.scaleLinear().domain([lo - (hi - lo) * 0.08 - 2, hi + (hi - lo) * 0.08 + 2]).nice(4).range([h - m.b, m.t]);
    yAxis(svg, y, m, w, h < 120 ? 3 : 4, (d) => d);
    xYears(svg, x, h, ys, 5);
    svg.append("line").attr("class", "pw-mark").attr("x1", x(state.year)).attr("x2", x(state.year)).attr("y1", m.t).attr("y2", h - m.b);
    const g = sweepClip(svg, el, m.l, w, h, false);
    const line = (f) => d3.line().defined((d) => ok(f(d))).x((d) => x(d)).y((d) => y(f(d)));
    g.append("path").attr("class", "rc-norm").attr("d", line(nor)(ys));
    g.append("path").attr("class", "pw-cur").attr("d", line(fin)(ys));
    if (ok(fin(state.year))) g.append("circle").attr("class", "pw-dot").attr("cx", x(state.year)).attr("cy", y(fin(state.year))).attr("r", 4);
    hover(svg, m, w, h, x, ys, (yy) => (ok(fin(yy)) ? `<b>${yy}년</b>${int(fin(yy))}kg${ok(nor(yy)) ? ` · 평년 ${int(nor(yy))} · ${pctS(at(k, "d", yy))}` : ""}` : `<b>${yy}년</b>자료 없음`), pickYear);
  }
  function drawProd() {
    const k = state.key, el = $("#chart-prod");
    const { svg, w, h } = frame(el, 100);
    const ys = unitYears();
    const av = (y) => at(k, "p", y);
    const max = d3.max(ys, av);
    if (!max) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text("자료 없음"); return; }
    const m = { l: 34, r: 10, t: 6, b: 16 };
    const x = d3.scaleBand().domain(ys).range([m.l, w - m.r]).padding(0.2);
    const y = d3.scaleLinear().domain([0, max * 1.08]).range([h - m.b, m.t]);
    const short = (d) => (!d ? "0" : max >= 1e5 ? `${nf0.format(d / 1e4)}만` : max >= 1e4 ? `${nf1.format(d / 1e4)}만` : max >= 1e3 ? `${nf1.format(d / 1e3)}천` : int(d));
    yAxis(svg, y, m, w, 2, short);
    svg.append("g").selectAll("rect").data(ys.filter((yy) => ok(av(yy)))).join("rect")
      .attr("class", (d) => `rc-bar${d === state.year ? " sel" : ""}`)
      .attr("x", (d) => x(d)).attr("width", x.bandwidth()).attr("y", (d) => y(av(d))).attr("height", (d) => y(0) - y(av(d))).attr("rx", 1.5);
    const cx = (yy) => x(yy) + x.bandwidth() / 2;
    xYears(svg, cx, h, ys, 5);
    hover(svg, m, w, h, cx, ys, (yy) => (ok(av(yy)) ? `<b>${yy}년</b>생산량 ${tonS(av(yy))} · 재배면적 ${haS(at(k, "a", yy))} · 단수 ${int(at(k, "y", yy))}kg` : `<b>${yy}년</b>자료 없음`), pickYear);
  }

  // ---------- 오른쪽: 위성 생육 (MODIS 250m 논 격자 NDVI, 8일 합성) ----------
  // 고른 연도 곡선 · 비교 연도 · 평년(직전 5년 doy별 평균, 빈칸 제외)과 그 범위. 예측이 아니라 생육 진행을 평년과 비교한다
  const NV = R.ndvi;
  const NYI = NV ? Object.fromEntries(NV.years.map((y, i) => [y, i])) : {};
  const NDOY = NV ? NV.doy.filter((d) => d >= 121 && d < 305) : []; // 5~10월
  const nstate = { year: NV ? NV.years.at(-1) : null, cmp: 2020 };
  const selNY = $("#ndvi-year"), selNC = $("#ndvi-cmp");
  if (NV) {
    selNY.innerHTML = [...NV.years].reverse().map((y) => `<option value="${y}">${y}</option>`).join("");
    selNY.addEventListener("change", () => { nstate.year = +selNY.value; renderNdvi(true); });
    selNC.addEventListener("change", () => { nstate.cmp = selNC.value ? +selNC.value : null; renderNdvi(true); });
  }
  const curve = (k, y) => {
    const row = NYI[y] == null ? null : NV.v[k]?.[NYI[y]];
    return row ? NDOY.map((d) => { const v = row[NV.doy.indexOf(d)]; return v == null ? null : v / 1000; }) : null;
  };
  // 평년: 직전 5년 중 값이 있는 해(3년 이상)의 doy별 평균·최소·최대
  function ndviNorm(k, y) {
    const rows = [1, 2, 3, 4, 5].map((d) => curve(k, y - d)).filter(Boolean);
    return NDOY.map((_, j) => {
      const vs = rows.map((r) => r[j]).filter(ok);
      return vs.length >= 3 ? { mean: d3.mean(vs), lo: d3.min(vs), hi: d3.max(vs) } : null;
    });
  }
  // 시군 논 격자가 적어 곡선이 없으면 시도 곡선을 대신 보인다
  const ndviKey = (k) => (!NV ? null : NV.v[k] ? k : NV.v[sidoOf(k)] ? sidoOf(k) : NV.v[NATION] ? NATION : null);
  const doyDate = (d) => { const t = new Date(Date.UTC(2001, 0, d)); return [t.getUTCMonth() + 1, t.getUTCDate()]; };
  const doyText = (d) => { const [mm, dd] = doyDate(d); return `${mm}월 ${dd}일`; };
  const third = (d) => { const [mm, dd] = doyDate(d); return `${mm}월 ${dd <= 10 ? "상순" : dd <= 20 ? "중순" : "하순"}`; };
  // 한 줄 해석: 6월(모내기·초기 생육)과 최고값(출수 전후)을 평년과 비교
  function ndviRead(cur, nm) {
    const idx = (a, b) => NDOY.map((d, j) => [d, j]).filter(([d]) => d >= a && d <= b).map(([, j]) => j);
    const both = (js) => js.filter((j) => ok(cur[j]) && nm[j]);
    const parts = [];
    const e = both(idx(153, 185));
    if (e.length >= 2) {
      const dlt = d3.mean(e, (j) => cur[j] - nm[j].mean);
      const worst = e.reduce((a, b) => (Math.abs(cur[b] - nm[b].mean) > Math.abs(cur[a] - nm[a].mean) ? b : a));
      parts.push(Math.abs(dlt) < 0.04 ? `<b>6월 평년 수준</b>`
        : dlt < 0 ? `<b class="rc-lo">${third(NDOY[worst])} 평년보다 낮음</b> → 모내기·초기 생육 늦음`
          : `<b class="rc-hi">${third(NDOY[worst])} 평년보다 높음</b> → 초기 생육 빠름`);
    }
    const pk = idx(193, 265), pc = pk.filter((j) => ok(cur[j])), pn = pk.filter((j) => nm[j]);
    if (pc.length >= 3 && pn.length) {
      const jc = pc.reduce((a, b) => (cur[b] > cur[a] ? b : a));
      const nmax = d3.max(pn, (j) => nm[j].mean);
      const p = (cur[jc] / nmax - 1) * 100;
      const mm = doyDate(NDOY[jc])[0];
      parts.push(Math.abs(p) < 3 ? `<b>${mm}월 최고값 평년 수준</b>`
        : `<b class="${p < 0 ? "rc-lo" : "rc-hi"}">${mm}월 최고값 평년보다 ${nf0.format(Math.abs(p))}% ${p < 0 ? "낮음" : "높음"}</b>`);
    } else if (cur.some(ok)) {
      parts.push("7월 이후 합성 없음");
    }
    return parts.length ? parts.join(" · ") : "이 해 생육 곡선 없음";
  }
  function renderNdvi(animate = false) {
    if (!NV) { $("#ndvi-read").textContent = "준비 중"; return; }
    const k0 = state.key, k = ndviKey(k0);
    $("#ndvi-scope").textContent = k === k0 ? "(논 NDVI)" : `(${fullLabel(k)} · ${label(k0)} 논 격자 적음)`;
    selNY.value = nstate.year;
    selNC.innerHTML = `<option value="">없음</option>` + [...NV.years].reverse().filter((y) => y !== nstate.year).map((y) => `<option value="${y}">${y}</option>`).join("");
    if (nstate.cmp === nstate.year) nstate.cmp = null;
    selNC.value = nstate.cmp ?? "";
    const cur = k && curve(k, nstate.year), nm = k ? ndviNorm(k, nstate.year) : [];
    $("#ndvi-read").innerHTML = cur ? ndviRead(cur, nm) : "이 해 생육 곡선 없음";
    $("#ndvi-key").innerHTML = `<span><i class="cur"></i>${nstate.year}</span>${nstate.cmp ? `<span><i class="cmp"></i>${nstate.cmp}</span>` : ""}`
      + `<span><i class="band"></i>직전 5년 범위</span><span><i class="prev"></i>평년</span>`;
    $("#ndvi-scope").title = k && NV.cells[k] ? `논 격자 ${int(NV.cells[k])}개 평균 (MODIS 250m, 팜맵 논 70% 이상)` : "";
    drawNdvi(animate);
    if (animate) riseRead();
  }
  // 해석 줄은 선이 거의 다 자란 뒤에 떠오른다
  function riseRead() {
    const r = $("#ndvi-read");
    r.classList.remove("in");
    void r.offsetWidth;
    r.style.setProperty("--d", `${(SWEEP * 0.75) / 1000}s`);
    r.classList.add("in");
  }
  function drawNdvi(animate = false) {
    const el = $("#chart-ndvi");
    const { svg, w, h } = frame(el, 140);
    const k = ndviKey(state.key);
    if (!k) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text("자료 없음"); return; }
    const cur = curve(k, nstate.year) || NDOY.map(() => null);
    const cmp = nstate.cmp ? curve(k, nstate.cmp) : null;
    const nm = ndviNorm(k, nstate.year);
    // 세로축은 곡선(올해·비교 연도·평년)에 맞추고, 범위 띠는 그림 칸 안에서 잘라 그린다 (한 해의 튀는 값이 축을 늘이지 않게)
    const vals = [...cur, ...(cmp || []), ...nm.map((n) => n?.mean)].filter(ok);
    if (!vals.length) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text("자료 없음"); return; }
    const m = { l: 30, r: 8, t: 6, b: 16 };
    const x = d3.scaleLinear().domain([121, 304]).range([m.l, w - m.r]);
    const y = d3.scaleLinear().domain([Math.max(0, d3.min(vals) - 0.05), Math.min(1, d3.max(vals) + 0.03)]).nice(3).range([h - m.b, m.t]);
    yAxis(svg, y, m, w, h < 110 ? 2 : 3, (d) => d3.format(".1f")(d));
    // 달 경계와 달 이름 (5~10월)
    const starts = [121, 152, 182, 213, 244, 274, 305];
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(starts.slice(0, -1)).join("text")
      .attr("x", (d, i) => x((d + starts[i + 1]) / 2)).attr("y", h - 3).attr("text-anchor", "middle").text((d, i) => `${i + 5}월`);
    const area = d3.area().defined((n) => n).x((n, j) => x(NDOY[j])).y0((n) => y(n.lo)).y1((n) => y(n.hi)).curve(d3.curveMonotoneX);
    svg.append("defs").append("clipPath").attr("id", "clip-ndvi-plot").append("rect").attr("x", m.l).attr("y", m.t).attr("width", w - m.l - m.r).attr("height", h - m.t - m.b);
    const band = svg.append("path").attr("class", "pw-bandarea").attr("d", area(nm)).attr("clip-path", "url(#clip-ndvi-plot)");
    const line = d3.line().defined(ok).x((v, j) => x(NDOY[j])).y((v) => y(v)).curve(d3.curveMonotoneX);
    const norm = svg.append("path").attr("class", "rc-norm").attr("d", line(nm.map((n) => n?.mean ?? null)));
    const motion = !window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    // 평년 범위·평년 선은 먼저 서서히 나타나고, 그 위로 비교 연도와 올해 선이 왼쪽(5월)부터 자라 나간다
    if (animate && motion) [band, norm].forEach((s, i) => s.style("opacity", 0).transition().delay(i * 120).duration(500).style("opacity", null));
    const g = sweepClip(svg, el, m.l, w, h, animate && motion);
    if (cmp) g.append("path").attr("class", "rc-cmp").attr("d", line(cmp));
    g.append("path").attr("class", "pw-cur").attr("d", line(cur));
    g.selectAll("circle").data(cur.map((v, j) => [v, j]).filter(([v]) => ok(v))).join("circle").attr("class", "rc-npt")
      .attr("cx", ([, j]) => x(NDOY[j])).attr("cy", ([v]) => y(v)).attr("r", 1.8);
    // 자라는 선의 끝을 따라가는 점
    const pts = cur.map((v, j) => (ok(v) ? [x(NDOY[j]), y(v)] : null)).filter(Boolean);
    if (motion && el._sweep != null && performance.now() - el._sweep < SWEEP && pts.length) {
      const head = svg.append("circle").attr("class", "rc-head").attr("r", 0);
      const tm = d3.timer(() => {
        if (!head.node().isConnected) return tm.stop();
        const done = Math.min(1, (performance.now() - el._sweep) / SWEEP);
        const cx = m.l + (w - m.l) * d3.easeSinInOut(done);
        const i = pts.findIndex((p) => p[0] >= cx);
        if (i === 0 || done >= 1 || i < 0) {
          if (i === 0) return;
          const [lx, ly] = pts.at(-1);
          head.attr("cx", lx).attr("cy", ly).transition().duration(400).attr("r", 0).remove();
          return tm.stop();
        }
        const [ax, ay] = pts[i - 1], [bx, by] = pts[i];
        head.attr("r", 4.5).attr("cx", cx).attr("cy", ay + ((by - ay) * (cx - ax)) / (bx - ax || 1));
      });
    }
    hover(svg, m, w, h, (d) => x(d), NDOY, (d) => {
      const j = NDOY.indexOf(d), f = (v) => (ok(v) ? d3.format(".2f")(v) : "–");
      return `<b>${doyText(d)}~</b>${nstate.year} ${f(cur[j])}${cmp ? ` · ${nstate.cmp} ${f(cmp[j])}` : ""}${nm[j] ? ` · 평년 ${f(nm[j].mean)}` : ""}`;
    });
  }

  // ---------- 가운데 제목·단추 ----------
  const viewBtn = $("#view-btn");
  viewBtn.addEventListener("click", () => { state.view = state.view === "sat" ? "map" : "sat"; render(false); });
  $("#reset").addEventListener("click", () => select(parentOf(state.key) ?? NATION));
  function renderHero() {
    const k = state.key, sat = state.view === "sat";
    $("#title-region").textContent = label(k);
    $("#title-what").textContent = sat ? "위성 영상" : "벼 작황";
    $("#crumb").textContent = level(k) === 0 ? "" : level(k) === 1 ? "전국 ›" : `전국 › ${T.sidos[sidoOf(k)].name} ›`;
    viewBtn.hidden = level(k) !== 2;
    viewBtn.textContent = sat ? "시군 지도로" : "위성 영상 보기";
    viewBtn.classList.toggle("back", sat);
    const reset = $("#reset");
    reset.hidden = level(k) === 0;
    reset.textContent = level(k) === 2 ? `${T.sidos[sidoOf(k)].short} 전체보기` : "전국보기";
  }

  // =====================================================================
  // 위성 영상 (Microsoft Planetary Computer: STAC 검색으로 날짜, data API mosaic 타일로 그림)
  // 미리보기 서비스라 SLA가 없다 → 시군을 골랐을 때만 켜고, 10단계보다 멀리서는 타일을 부르지 않는다
  // =====================================================================
  const PC = "https://planetarycomputer.microsoft.com/api";
  // 구간 색(경계 = 지수 값). 물(0 미만)과 물 댄 논·어린 모(0~0.2)는 파랑 계열, 식생은 초록. 구름 가린 화소는 투명
  const NDVI_C = [[-1, "#173f7a"], [0, "#3b78c2"], [0.1, "#7fa9c9"], [0.2, "#cfc58a"], [0.3, "#d9ef8b"], [0.4, "#a6d96a"], [0.5, "#66bd63"], [0.6, "#2f9e4f"], [0.7, "#17793c"], [0.8, "#0b5a2e"]];
  const NDRE_C = [[-1, "#173f7a"], [0, "#3b78c2"], [0.05, "#7fa9c9"], [0.15, "#cfc58a"], [0.25, "#a6d96a"], [0.35, "#66bd63"], [0.45, "#1a9850"], [0.55, "#006837"]];
  const NDMI_C = [[-1, "#8c510a"], [-0.2, "#bf812d"], [-0.1, "#dfc27d"], [0, "#f6e8c3"], [0.1, "#c7eae5"], [0.2, "#80cdc1"], [0.3, "#35978f"], [0.4, "#1f5f8b"]];
  const VH_C = [[-27, "#173f7a"], [-23, "#3b78c2"], [-20, "#33363c"], [-18, "#50545b"], [-16, "#74787f"], [-14, "#9da0a6"], [-12, "#c9cbcf"]];
  const VV_C = [[-20, "#173f7a"], [-16, "#3b78c2"], [-13, "#33363c"], [-11, "#50545b"], [-9, "#74787f"], [-7, "#9da0a6"], [-5, "#c9cbcf"]];
  // 단추 풍선 설명
  const TIP = {
    true: "<b>트루컬러</b> 사람 눈에 보이는 색 그대로<br>(빨강·초록·파랑 밴드)",
    ndvi: "<b>NDVI 정규식생지수</b> (근적외−빨강)÷(근적외+빨강)<br>잎이 많고 싱싱할수록 높다. 벼 출수기 0.7~0.9<br>물 댄 논·갓 심은 모는 0~0.2(파랑)",
    ndre: "<b>NDRE 레드엣지 식생지수</b> (근적외−레드엣지)÷(근적외+레드엣지)<br>잎이 무성해 NDVI가 더 오르지 않는 생육 후기에도<br>엽록소(질소 상태) 차이를 가른다",
    ndmi: "<b>NDMI 수분지수</b> (근적외−단파적외)÷(근적외+단파적외)<br>잎과 땅에 물기가 많을수록 높다<br>가뭄·물떼기 상태를 본다",
    vh: "<b>VH 교차편파 후방산란(dB)</b><br>물 댄 논은 전파가 거울처럼 튕겨 나가 아주 낮고(파랑)<br>벼가 자랄수록 높아진다",
    vv: "<b>VV 동일편파 후방산란(dB)</b><br>물·매끈한 면은 낮고, 거친 땅·건물은 높다",
  };
  const SAT = {
    s2: { name: "Sentinel-2", tip: "<b>Sentinel-2</b> 유럽(Copernicus) 광학 위성<br>10m 해상도 · 5일마다 · 2017년부터<br>구름 낀 날은 땅이 안 보인다", col: "sentinel-2-l2a", from: 2017, cloud: true, zoom: 16, idx: {
      true: { name: "트루컬러", rgb: ["B04", "B03", "B02"], rescale: (o) => `${o},${o + 2600}`, tip: TIP.true },
      ndvi: { name: "NDVI", expr: (o) => `(B08-B04)/(B08+B04-${2 * o})`, ramp: NDVI_C, lo: -1, hi: 1, desc: "식생 활력", tip: TIP.ndvi },
      ndre: { name: "NDRE", expr: (o) => `(B8A-B05)/(B8A+B05-${2 * o})`, ramp: NDRE_C, lo: -1, hi: 1, desc: "엽록소(생육 후기)", tip: TIP.ndre },
      ndmi: { name: "NDMI", expr: (o) => `(B8A-B11)/(B8A+B11-${2 * o})`, ramp: NDMI_C, lo: -1, hi: 1, desc: "수분", tip: TIP.ndmi } },
      mask: (e) => `where((SCL==3)|(SCL==8)|(SCL==9)|(SCL==10),-100,${e})` },
    ls: { name: "Landsat", tip: "<b>Landsat 8·9</b> 미국(USGS) 광학 위성<br>30m 해상도 · 8일마다 · 2013년부터<br>Sentinel-2보다 거칠지만 더 오래된 해도 본다", col: "landsat-c2-l2", from: 2013, cloud: true, zoom: 15, idx: {
      // 반사율 = DN×0.0000275 − 0.2 → 분모에서 2×0.2/0.0000275 = 14545를 뺀다
      true: { name: "트루컬러", rgb: ["red", "green", "blue"], rescale: () => "7273,17000", tip: TIP.true },
      ndvi: { name: "NDVI", expr: () => "(nir08-red)/(nir08+red-14545)", ramp: NDVI_C, lo: -1, hi: 1, desc: "식생 활력", tip: TIP.ndvi },
      ndmi: { name: "NDMI", expr: () => "(nir08-swir16)/(nir08+swir16-14545)", ramp: NDMI_C, lo: -1, hi: 1, desc: "수분", tip: TIP.ndmi } },
      // QA_PIXEL bit1 팽창구름·bit3 구름·bit4 그림자 (수식이 비트 연산을 못 받아 나머지 연산으로 본다)
      mask: (e) => `where(((qa_pixel%32)>=8)|((qa_pixel%4)>=2),-100,${e})` },
    s1: { name: "레이더", tip: "<b>Sentinel-1 레이더(SAR)</b><br>10m 해상도 · 12일마다 · 2015년부터<br>구름·비·밤에도 보인다. 물 댄 논을 잘 가른다", col: "sentinel-1-rtc", from: 2015, cloud: false, zoom: 16, idx: {
      vh: { name: "VH", db: "vh", ramp: VH_C, lo: -27, hi: -10, desc: "후방산란(dB) · 물 댄 논은 낮다", tip: TIP.vh },
      vv: { name: "VV", db: "vv", ramp: VV_C, lo: -20, hi: -3, desc: "후방산란(dB)", tip: TIP.vv } } },
  };
  const NOW = new Date();
  const SEASON_END = (y) => (y === NOW.getFullYear() ? NOW.toISOString().slice(0, 10) : `${y}-11-30`);
  // 팜맵 논 필지 (주요 통계 '자세히 보기'와 같은 R2 전국 타일, 확대 13~15단계 자료, c=1이 논)
  const PADDY_TILES = "https://pub-6a32610bd1414a8d8dc3adc9eecd3632.r2.dev/farmmap/2025/kr.pmtiles";
  const PADDY_Z = 13; // 이보다 멀리서는 필지 자료가 없어 영상 전체를 보인다
  const sat = { sat: "s2", idx: "ndvi", mask: true, paddyOnly: true, paddyLine: true, sid: null, year: NOW.getMonth() >= 4 ? NOW.getFullYear() : NOW.getFullYear() - 1, date: null, dates: [], key: null };
  const satCache = new Map(), sidCache = new Map();
  let L_ = null, lmap = null, base = null, pcLayer = null, paddyLayer = null, lineLayer = null, outline = null, maskLayer = null, leafletReady = null;
  const satBar = $("#sat-bar"), satHint = $("#sat-hint");

  function hint(msg, err = false) {
    satHint.textContent = msg;
    satHint.hidden = !msg;
    satHint.classList.toggle("err", err);
  }
  function loadLeaflet() {
    if (leafletReady) return leafletReady;
    const load = (tag, attrs) => new Promise((res, rej) => document.head.append(Object.assign(document.createElement(tag), attrs, { onload: res, onerror: rej })));
    leafletReady = Promise.all([
      load("link", { rel: "stylesheet", href: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css" }),
      load("script", { src: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js" })
        .then(() => load("script", { src: "https://cdn.jsdelivr.net/npm/protomaps-leaflet@5.1.0/dist/protomaps-leaflet.js" }).catch(() => {})),
    ]).catch((e) => { leafletReady = null; throw e; });
    return leafletReady;
  }
  async function post(url, body) {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!r.ok) throw new Error(`서버 응답 ${r.status}`);
    return r.json();
  }

  function buildSatBar() {
    const s = SAT[sat.sat];
    if (!s.idx[sat.idx]) sat.idx = Object.keys(s.idx)[0];
    const years = d3.range(s.from, NOW.getFullYear() + 1).filter((y) => y < NOW.getFullYear() || NOW.getMonth() >= 3).reverse();
    if (!years.includes(sat.year)) sat.year = years[0];
    satBar.innerHTML = `
      <span class="seg" role="group" aria-label="위성">${Object.entries(SAT).map(([k, v]) => `<button type="button" data-sat="${k}" aria-pressed="${k === sat.sat}" data-tip="${v.tip}">${v.name}</button>`).join("")}</span>
      <span class="seg" role="group" aria-label="지수">${Object.entries(s.idx).map(([k, v]) => `<button type="button" data-idx="${k}" aria-pressed="${k === sat.idx}" data-tip="${v.tip}">${v.name}</button>`).join("")}</span>
      <label class="rc-ysel select"><span>연도</span><select data-ui="year">${years.map((y) => `<option value="${y}"${y === sat.year ? " selected" : ""}>${y}</option>`).join("")}</select></label>
      <label class="rc-check" data-tip="<b>논만</b> 팜맵 논 필지 안쪽만 영상을 남기고<br>나머지는 흐린 항공사진으로 둔다<br>(지도를 ${PADDY_Z}단계 이상 확대했을 때)"><input type="checkbox" data-ui="ponly"${sat.paddyOnly ? " checked" : ""}> 논만</label>
      <label class="rc-check" data-tip="<b>논 경계</b> 팜맵 논 필지 경계선<br>(지도를 ${PADDY_Z + 1}단계 이상 확대했을 때)"><input type="checkbox" data-ui="pline"${sat.paddyLine ? " checked" : ""}> 논 경계</label>
      ${s.cloud ? `<label class="rc-check" data-tip="<b>구름 가리기</b> 구름·구름 그림자로 판정된 화소를 투명하게"><input type="checkbox" data-ui="mask"${sat.mask ? " checked" : ""}> 구름 가리기</label>` : ""}`;
    satBar.querySelectorAll("[data-sat]").forEach((b) => b.addEventListener("click", () => { if (sat.sat === b.dataset.sat) return; sat.sat = b.dataset.sat; sat.date = null; buildSatBar(); loadDates(); }));
    satBar.querySelectorAll("[data-idx]").forEach((b) => b.addEventListener("click", () => { sat.idx = b.dataset.idx; buildSatBar(); drawLayer(); }));
    satBar.querySelector('[data-ui="year"]').addEventListener("change", (e) => { sat.year = +e.target.value; sat.date = null; loadDates(); });
    satBar.querySelector('[data-ui="mask"]')?.addEventListener("change", (e) => { sat.mask = e.target.checked; drawLayer(); });
    satBar.querySelector('[data-ui="ponly"]').addEventListener("change", (e) => { sat.paddyOnly = e.target.checked; syncPaddy(); });
    satBar.querySelector('[data-ui="pline"]').addEventListener("change", (e) => { sat.paddyLine = e.target.checked; syncPaddy(); });
    renderSatLegend();
  }

  function initLeaflet() {
    const L = (L_ = window.L);
    lmap = L.map("sat-map", { minZoom: 8, maxZoom: 18, zoomControl: false, maxBounds: [[32, 123], [39.6, 132.5]], maxBoundsViscosity: 0.8 });
    L.control.zoom({ position: "bottomright", zoomInTitle: "확대", zoomOutTitle: "축소" }).addTo(lmap);
    lmap.attributionControl.setPrefix(false).addAttribution("Microsoft Planetary Computer · Copernicus Sentinel · USGS Landsat");
    lmap.createPane("rc-mask").style.zIndex = 420;
    // 배경: VWorld 항공영상 (키는 서버 함수에서 받는다. 받지 못하면 배경 없이)
    fetch("/api/farmmap?op=config").then((r) => (r.ok ? r.json() : null)).then((cfg) => {
      if (!cfg?.vworld) return;
      base = L.tileLayer(`https://api.vworld.kr/req/wmts/1.0.0/${cfg.vworld}/Satellite/{z}/{y}/{x}.jpeg`, { minZoom: 7, maxZoom: 19, zIndex: 0, opacity: 0.55 });
      base.addTo(lmap);
      lmap.attributionControl.addAttribution("배경 VWorld");
    }).catch(() => {});
    lmap.on("zoomend", zoomHint);
    new ResizeObserver(() => lmap.invalidateSize({ pan: false })).observe($("#sat-map"));
  }

  function zoomHint() {
    const z = lmap.getZoom();
    if (z < 10) hint("확대하면 위성 영상이 보입니다");
    else if (z < PADDY_Z && sat.paddyOnly && window.protomapsL) hint(`${PADDY_Z}단계 이상 확대하면 논 필지만 남깁니다`);
    else if (satHint.textContent.startsWith("확대하면") || satHint.textContent.includes("단계 이상 확대하면")) hint("");
  }

  // 논만: 필지 타일로 논 모양을 칠한 캔버스에 같은 자리 영상 타일을 source-in으로 덮어, 논 안쪽 영상만 남긴다
  function pcTileInto(canvas, coords, nz, done) {
    const tpl = tileUrl(sat.sid);
    const dz = Math.max(0, coords.z - nz), f = 2 ** dz;
    const px = Math.floor(coords.x / f), py = Math.floor(coords.y / f);
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const ctx = canvas.getContext("2d"), w = 256 / f;
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-in";
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, (coords.x - px * f) * w, (coords.y - py * f) * w, w, w, 0, 0, canvas.width, canvas.height);
      ctx.restore();
      done();
    };
    img.onerror = () => { canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height); done(); };
    img.src = L_.Util.template(tpl, { z: coords.z - dz, x: px, y: py });
  }
  function syncPaddy() {
    const P = window.protomapsL;
    paddyLayer?.remove(); paddyLayer = null;
    lineLayer?.remove(); lineLayer = null;
    const only = !!(P && sat.paddyOnly && sat.sid);
    // 논만일 때 원래 영상 층은 필지 자료가 없는 먼 단계에서만 보인다
    if (pcLayer) { pcLayer.options.maxZoom = only ? PADDY_Z - 1 : 18; pcLayer._resetView?.(); }
    if (!P || !lmap) return zoomHint();
    const isPaddy = (z, f) => f.props.c === 1;
    if (only) {
      const nz = SAT[sat.sat].zoom;
      paddyLayer = P.leafletLayer({
        url: PADDY_TILES, maxDataZoom: 15, minZoom: PADDY_Z, maxZoom: 18, zIndex: 2, attribution: "",
        paintRules: [{ dataLayer: "p", filter: isPaddy, symbolizer: new P.PolygonSymbolizer({ fill: "#000", opacity: 1 }) }],
      });
      const render = paddyLayer.renderTile.bind(paddyLayer);
      paddyLayer.renderTile = (coords, el, key, done = () => {}) => render(coords, el, key, () => pcTileInto(el, coords, nz, done));
      paddyLayer.addTo(lmap);
    }
    if (sat.paddyLine) {
      lineLayer = P.leafletLayer({
        url: PADDY_TILES, maxDataZoom: 15, minZoom: PADDY_Z + 1, maxZoom: 18, zIndex: 3, attribution: "",
        paintRules: [{ dataLayer: "p", filter: isPaddy, symbolizer: new P.LineSymbolizer({ color: "#ffffff", width: (z) => (z >= 16 ? 1 : 0.6), opacity: 0.55 }) }],
      });
      lineLayer.addTo(lmap);
    }
    zoomHint();
  }

  function setSatRegion(k) {
    const L = L_;
    const f = featOf.get(k);
    outline?.remove(); maskLayer?.remove();
    outline = L.geoJSON(f.geometry, { style: { color: "#fff", weight: 1.6, opacity: 0.9, fill: false }, interactive: false }).addTo(lmap);
    // 시군 밖은 어둡게
    const polys = f.geometry.type === "MultiPolygon" ? f.geometry.coordinates : [f.geometry.coordinates];
    const world = [[-89, -179], [-89, 179], [89, 179], [89, -179]];
    const holes = polys.map((p) => p[0].map(([lon, lat]) => [lat, lon]));
    maskLayer = L.polygon([world, ...holes], { pane: "rc-mask", stroke: false, fillColor: "#0b0c0f", fillOpacity: 0.55, interactive: false }).addTo(lmap);
    lmap.invalidateSize();
    lmap.fitBounds(outline.getBounds(), { padding: [12, 12], maxZoom: 13, animate: false });
    if (lmap.getZoom() < 10) lmap.setZoom(10, { animate: false });
  }
  const bboxOf = (k) => { const [[x0, y0], [x1, y1]] = d3.geoBounds(featOf.get(k)); return [x0, y0, x1, y1]; };

  // 그해 4월~11월 영상 날짜 (광학은 장면 구름 70% 미만)
  async function loadDates() {
    const k = sat.key, s = SAT[sat.sat], yr = sat.year;
    const ck = `${sat.sat}|${yr}|${k}`;
    hint("영상 날짜를 찾는 중…");
    drawStrip();
    try {
      if (!satCache.has(ck)) {
        const body = {
          collections: [s.col], bbox: bboxOf(k), datetime: `${yr}-04-01T00:00:00Z/${SEASON_END(yr)}T23:59:59Z`, limit: 500,
          fields: { include: ["id", "properties.datetime", "properties.eo:cloud_cover", "properties.s2:processing_baseline", "properties.sat:orbit_state", "properties.platform"], exclude: ["assets", "links", "geometry"] },
        };
        if (s.cloud) body.query = { "eo:cloud_cover": { lt: 70 } };
        if (sat.sat === "ls") body.query.platform = { in: ["landsat-8", "landsat-9"] };
        const p = post(`${PC}/stac/v1/search`, body).then((fc) => {
          const by = {};
          for (const f of fc.features) {
            const pr = f.properties, d = pr.datetime.slice(0, 10);
            const e = (by[d] ||= { d, cc: [], base: pr["s2:processing_baseline"], orbit: pr["sat:orbit_state"] });
            if (pr["eo:cloud_cover"] != null) e.cc.push(pr["eo:cloud_cover"]);
          }
          return Object.values(by).map((e) => ({ ...e, cloud: e.cc.length ? d3.mean(e.cc) : null })).sort((a, b) => a.d.localeCompare(b.d));
        });
        satCache.set(ck, p);
        p.catch(() => satCache.delete(ck));
      }
      const dates = await satCache.get(ck);
      if (ck !== `${sat.sat}|${sat.year}|${sat.key}`) return; // 그사이 다른 것을 골랐다
      sat.dates = dates;
      if (!dates.length) { sat.date = null; drawStrip(); pcLayer?.remove(); hint(`${yr}년 ${s.name} 영상이 없습니다`); return; }
      if (!dates.some((e) => e.d === sat.date)) sat.date = defaultDate(dates);
      hint("");
      drawStrip();
      drawLayer();
    } catch (e) {
      hint(`위성 영상 서비스에 연결하지 못했습니다 (${e.message})`, true);
    }
  }
  // 처음 날짜: 7월 중순~9월 중순(출수 전후)에서 구름이 가장 적은 날, 없으면 가장 맑은 날. 레이더는 8월에 가까운 날
  function defaultDate(dates) {
    const yr = sat.year;
    const inWin = dates.filter((e) => e.d >= `${yr}-07-15` && e.d <= `${yr}-09-15`);
    if (!SAT[sat.sat].cloud) {
      const tgt = Date.parse(`${yr}-08-10`);
      return dates.reduce((a, b) => (Math.abs(Date.parse(b.d) - tgt) < Math.abs(Date.parse(a.d) - tgt) ? b : a)).d;
    }
    const pool = inWin.some((e) => e.cloud < 30) ? inWin : dates;
    return pool.reduce((a, b) => ((b.cloud ?? 100) < (a.cloud ?? 100) ? b : a)).d;
  }

  // 날짜 띠: 4~11월 축 위에 날짜마다 막대 (높을수록 맑다). 누르거나 ←→로 고른다
  const strip = $("#sat-strip");
  strip.tabIndex = 0;
  strip.addEventListener("keydown", (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const i = sat.dates.findIndex((d) => d.d === sat.date) + (e.key === "ArrowRight" ? 1 : -1);
    if (sat.dates[i]) { sat.date = sat.dates[i].d; drawStrip(); drawLayer(); }
  });
  function drawStrip() {
    const el = strip;
    const w = el.clientWidth || 400, h = el.clientHeight || 46;
    el.innerHTML = "";
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    const yr = sat.year;
    const t0 = Date.parse(`${yr}-04-01`), t1 = Date.parse(`${yr}-12-01`);
    const m = { l: 6, r: 6, t: 13, b: 13 };
    const x = d3.scaleLinear().domain([t0, t1]).range([m.l, w - m.r]);
    const months = d3.range(4, 12);
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(months).join("g").call((g) => {
      g.append("line").attr("x1", (mm) => x(Date.parse(`${yr}-${String(mm).padStart(2, "0")}-01`))).attr("x2", (mm) => x(Date.parse(`${yr}-${String(mm).padStart(2, "0")}-01`))).attr("y1", m.t).attr("y2", h - m.b);
      g.append("text").attr("x", (mm) => x(Date.parse(`${yr}-${String(mm).padStart(2, "0")}-15`))).attr("y", h - 2).attr("text-anchor", "middle").text((mm) => `${mm}월`);
    });
    const dates = sat.dates.filter((e) => e.d.startsWith(String(yr)));
    if (!dates.length) return;
    const isS1 = !SAT[sat.sat].cloud;
    const hh = h - m.t - m.b;
    const bh = (e) => (isS1 ? hh * 0.7 : Math.max(3, hh * (1 - (e.cloud ?? 50) / 100)));
    const bw = Math.max(2, Math.min(6, (w - m.l - m.r) / 120));
    svg.append("g").selectAll("rect").data(dates).join("rect")
      .attr("class", (e) => `rc-d${isS1 ? " s1" : (e.cloud ?? 100) < 20 ? " clear" : ""}${e.d === sat.date ? " sel" : ""}`)
      .attr("x", (e) => x(Date.parse(e.d)) - bw / 2).attr("width", bw).attr("y", (e) => h - m.b - bh(e)).attr("height", bh).attr("rx", 1)
      .append("title").text((e) => `${e.d}${isS1 ? ` · ${e.orbit === "ascending" ? "상승" : "하강"} 궤도` : ` · 구름 ${Math.round(e.cloud ?? 0)}%`}`);
    const sel = dates.find((e) => e.d === sat.date);
    if (sel) {
      const sx = x(Date.parse(sel.d));
      svg.append("text").attr("class", "rc-dsel").attr("x", Math.max(m.l + 40, Math.min(w - m.r - 40, sx))).attr("y", 10).attr("text-anchor", "middle")
        .text(`${+sel.d.slice(5, 7)}월 ${+sel.d.slice(8)}일${isS1 ? "" : ` · 구름 ${Math.round(sel.cloud ?? 0)}%`}`);
    }
    svg.on("click", (e) => {
      const t = x.invert(d3.pointer(e)[0]);
      const best = dates.reduce((a, b) => (Math.abs(Date.parse(b.d) - t) < Math.abs(Date.parse(a.d) - t) ? b : a));
      if (best.d !== sat.date) { sat.date = best.d; drawStrip(); drawLayer(); }
    });
  }

  // 그 날짜 하루치 장면을 mosaic 검색으로 등록
  async function searchId(col, date, k) {
    const ck = `${col}|${date}|${k}`;
    if (!sidCache.has(ck)) {
      const [x0, y0, x1, y1] = bboxOf(k);
      const args = [
        { op: "s_intersects", args: [{ property: "geometry" }, { type: "Polygon", coordinates: [[[x0, y0], [x1, y0], [x1, y1], [x0, y1], [x0, y0]]] }] },
        { op: "anyinteracts", args: [{ property: "datetime" }, { interval: [`${date}T00:00:00Z`, `${date}T23:59:59Z`] }] },
      ];
      if (col === "landsat-c2-l2") args.push({ op: "in", args: [{ property: "platform" }, ["landsat-8", "landsat-9"]] });
      const p = post(`${PC}/data/v1/mosaic/register`, { collections: [col], "filter-lang": "cql2-json", filter: { op: "and", args } }).then((r) => r.searchid);
      sidCache.set(ck, p);
      p.catch(() => sidCache.delete(ck));
    }
    return sidCache.get(ck);
  }
  // 구간 색표 → titiler interval colormap (lo..hi를 0..255로 늘린 뒤). clear0이면 0번 칸(구름 가린 화소)은 투명
  function intervalCmap(ramp, lo, hi, clear0) {
    const f = (v) => Math.max(0, Math.min(255, Math.round(((v - lo) / (hi - lo)) * 255)));
    const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)).concat(255);
    const out = clear0 ? [[[0, 1], [0, 0, 0, 0]]] : [];
    ramp.forEach(([v, c], i) => {
      const a = i === 0 ? (clear0 ? 1 : 0) : f(v);
      const b = i + 1 < ramp.length ? f(ramp[i + 1][0]) : 256;
      if (b > a) out.push([[a, b], hex(c)]);
    });
    return JSON.stringify(out);
  }
  function tileUrl(sid) {
    const s = SAT[sat.sat], ix = s.idx[sat.idx];
    const sc = sat.dates.find((e) => e.d === sat.date);
    const off = sat.sat === "s2" && parseFloat(sc?.base || "0") >= 4 ? 1000 : 0; // baseline 04.00부터 DN에 1000이 더해져 있다
    const q = new URLSearchParams({ collection: s.col });
    if (ix.rgb) {
      ix.rgb.forEach((a) => q.append("assets", a));
      q.set("rescale", ix.rescale(off)); q.set("color_formula", "Gamma RGB 1.5 Saturation 1.1"); q.set("nodata", "0");
    } else if (ix.db) {
      q.set("expression", `10*log10(${ix.db})`); q.set("asset_as_band", "true");
      q.set("rescale", `${ix.lo},${ix.hi}`); q.set("colormap", intervalCmap(ix.ramp, ix.lo, ix.hi, false)); q.set("nodata", "-32768");
    } else {
      let e = ix.expr(off);
      if (sat.mask && s.mask) e = s.mask(e);
      q.set("expression", e); q.set("asset_as_band", "true"); q.set("nodata", "0");
      q.set("rescale", "-1,1"); q.set("colormap", intervalCmap(ix.ramp, -1, 1, true));
    }
    return `${PC}/data/v1/mosaic/${sid}/tiles/WebMercatorQuad/{z}/{x}/{y}@1x.png?${q}`;
  }
  let drawSeq = 0;
  async function drawLayer() {
    if (!lmap || !sat.date) return;
    const seq = ++drawSeq;
    const s = SAT[sat.sat];
    renderSatLegend();
    try {
      const sid = await searchId(s.col, sat.date, sat.key);
      if (seq !== drawSeq) return;
      sat.sid = sid;
      const next = L_.tileLayer(tileUrl(sid), { minZoom: 10, maxZoom: sat.paddyOnly && window.protomapsL ? PADDY_Z - 1 : 18, maxNativeZoom: s.zoom, zIndex: 2 });
      let loads = 0, errs = 0;
      next.on("loading", () => { if (lmap.getZoom() >= 10) hint("영상을 불러오는 중…"); });
      next.on("load", () => { if (satHint.textContent.startsWith("영상을")) hint(""); });
      next.on("tileload", () => { loads++; });
      next.on("tileerror", () => { if (++errs >= 8 && !loads) hint("영상 타일을 받지 못했습니다. 잠시 뒤 다시 골라 주세요.", true); });
      // 새 층이 그려진 뒤에 옛 층을 지워 깜빡임을 줄인다
      const old = pcLayer;
      pcLayer = next.addTo(lmap);
      syncPaddy();
      if (old) {
        next.once("load", () => old.remove());
        setTimeout(() => old.remove(), 6000);
      }
    } catch (e) {
      if (seq === drawSeq) hint(`영상을 준비하지 못했습니다 (${e.message})`, true);
    }
  }
  function renderSatLegend() {
    const s = SAT[sat.sat], ix = s.idx[sat.idx];
    const el = $("#sat-legend");
    const sc = sat.dates.find((e) => e.d === sat.date);
    const stat = sat.date ? `${s.name} · ${sat.date}${sc?.cloud != null ? ` · 장면 구름 ${Math.round(sc.cloud)}%` : ""}` : "";
    if (!ix.ramp) { el.innerHTML = `<span class="title">${ix.name}</span><span>빨강·초록·파랑 밴드</span><span class="rc-sstat">${stat}</span>`; return; }
    const r = ix.ramp;
    const lab = (v) => (ix.db ? v : String(v).replace(/^0\./, ".").replace(/^-0\./, "−."));
    el.innerHTML = `<span class="title">${ix.name}</span><span class="rc-ramp-wrap"><span class="rc-ramp">${r.map(([, c]) => `<span style="background:${c}"></span>`).join("")}</span>`
      + `<span class="rc-ramp">${r.map(([v], i) => `<em>${i === 0 ? "" : lab(v)}</em>`).join("")}</span></span>`
      + `<span>${ix.desc}${ix.db || sat.idx === "ndmi" ? "" : " · 파랑 = 물·물 댄 논"}</span><span class="rc-sstat">${stat}</span>`;
  }

  async function showSat() {
    const k = state.key;
    $("#map-card").classList.add("sat-on");
    satBar.hidden = false; $("#sat-map").hidden = false; $("#sat-dates").hidden = false; $("#sat-legend").hidden = false;
    if (!satBar.innerHTML) buildSatBar();
    try {
      hint("위성 영상 보기를 여는 중…");
      await loadLeaflet();
    } catch {
      hint("지도 도구를 불러오지 못했습니다. 다시 눌러 주세요.", true);
      return;
    }
    if (state.view !== "sat" || state.key !== k) return;
    if (!lmap) initLeaflet();
    hint("");
    if (sat.key !== k) {
      sat.key = k;
      setSatRegion(k);
      loadDates();
    } else {
      lmap.invalidateSize();
      drawStrip();
    }
  }
  function hideSat() {
    $("#map-card").classList.remove("sat-on");
    satBar.hidden = true; $("#sat-map").hidden = true; $("#sat-dates").hidden = true; $("#sat-legend").hidden = true;
    hint("");
  }

  // ---------- 갱신 ----------
  function render(animate = true) {
    if (level(state.key) !== 2) state.view = "map";
    syncControls();
    syncURL();
    renderHero();
    renderUnit(animate);
    paintMap();
    renderRank();
    applyView(animate);
    renderNdvi(animate);
    if (state.view === "sat") showSat(); else hideSat();
  }
  function select(k) {
    state.key = k || NATION;
    render(true); // 지도는 그 시도로 옮겨 가고, 오른쪽 선은 다시 드러난다
  }
  function setYear(y) {
    state.year = y;
    syncControls();
    syncURL();
    renderUnit(false);
    drawNat(false);
    paintMap();
    renderRank();
    // 생육 곡선도 고른 연도로. 단 최신 확정 연도를 고르면 위성은 그보다 새 해(올해)를 그대로 둔다
    if (NV) { const ny = y === LASTY ? NV.years.at(-1) : y; if (NYI[ny] != null && ny !== nstate.year) { nstate.year = ny; renderNdvi(true); } }
  }

  fromURL();
  if (NV && state.year !== LASTY && NYI[state.year] != null) nstate.year = state.year;
  renderChips();
  drawMap();
  renderNat();
  renderAcc();
  render(false);
  // 처음 열 때 위성 생육 곡선만 왼쪽에서 오른쪽으로 자란다 (단수·생산량 그래프는 움직이지 않는다)
  drawNat(true);
  drawUnit(true);
  drawNdvi(true);
  riseRead();
  $("#built").textContent = `확정 ${LASTY}년까지 · ${R.built} 작성`;

  let mw = 0, mh = 0;
  new ResizeObserver(([e]) => {
    const { width, height } = e.contentRect;
    if (Math.abs(width - mw) < 1 && Math.abs(height - mh) < 1) return;
    mw = width; mh = height;
    drawMap();
    paintMap();
  }).observe($("#map-wrap"));
  const redraw = { "chart-nat": () => drawNat(false), "chart-err": drawErr, "chart-unit": () => drawUnit(false), "chart-prod": drawProd, "chart-ndvi": () => drawNdvi(false), "sat-strip": drawStrip };
  const ro = new ResizeObserver((entries) => {
    for (const e of entries) {
      const { width, height } = e.contentRect;
      const drawn = e.target._wh;
      if (e.target.id !== "sat-strip" && drawn && Math.abs(drawn[0] - width) < 1 && Math.abs(drawn[1] - height) < 1) continue;
      if (e.target.id === "sat-strip" && (!width || $("#sat-dates").hidden)) continue;
      redraw[e.target.id]();
    }
  });
  Object.keys(redraw).forEach((id) => ro.observe($(`#${id}`)));
  window.addEventListener("hashchange", () => { fromURL(); render(true); });
})();
