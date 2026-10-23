(() => {
  // 축산 환경 — 국립환경과학원 전국오염원조사 축산계(리 × 축종)를 시군·시도·전국으로 더한 값 (data/livestock.js, scripts/build_livestock.py)
  // 왼쪽: 마지막 해의 분뇨 구성(축종·농장 규모·처리 방식), 가운데: 지도, 오른쪽: 흐름·마을·공공처리시설.
  // 분뇨 발생량은 수질오염원 산정 값(톤/일)이라 가금은 거의 0이다. 지역 체계·지도는 농경지 토양(soil.js)과 같다.
  const L = window.AGRI_LIVESTOCK;
  const T = window.AGRI_TOPO;
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
  const nf1 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 });
  const ok = (n) => n != null && Number.isFinite(n);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const sum = (a) => a.reduce((s, v) => s + (v || 0), 0);
  const pct = (v) => (ok(v) ? `${nf0.format(v)}%` : "–");
  const ton = (v) => (!ok(v) ? "–" : v >= 10 ? `${nf0.format(v)}톤` : `${nf1.format(v)}톤`);
  const big = (v) => (!ok(v) ? "–" : v >= 1e8 ? `${nf1.format(v / 1e8)}억` : v >= 1e5 ? `${nf0.format(v / 1e4)}만` : v >= 1e4 ? `${nf1.format(v / 1e4)}만` : nf0.format(v));
  const head = (v) => `${big(v)}마리`;
  const YEARS = L.years, LAST = YEARS.at(-1), YN = YEARS.length - 1;
  const R = (k) => L.r[k];
  const manOf = (k) => R(k)?.t.man[YN] ?? null;

  // 축사 규모: 가축분뇨법은 축사(배출시설)를 지을 때 면적이 크면 시장·군수의 허가를, 중간이면 신고를 받게 한다. 원자료의 '법적규제' 칸
  const COURT_NAME = { 허가: "허가 규모", 신고: "신고 규모", 신고미만: "신고미만" };
  const COURT_SHORT = { 허가: "허가", 신고: "신고", 신고미만: "미만" };
  const COURT_WHY = { 허가: "허가를 받아야 짓는 규모 (예: 돼지 축사 1,000㎡ 이상)", 신고: "신고하고 짓는 규모 (예: 돼지 축사 50~1,000㎡)", 신고미만: "허가·신고가 필요 없는 규모 (예: 돼지 축사 50㎡ 미만)" };
  // 축종별 기준 (가축분뇨법 시행령, 축사 면적. 소·젖소는 운동장 면적 기준도 있다)
  const COURT_RULE = [["돼지", "1,000㎡ 이상", "50~1,000㎡"], ["소·말", "900㎡ 이상", "100~900㎡"], ["젖소", "900㎡ 이상", "100~900㎡"],
    ["닭·오리", "3,000㎡ 이상", "200~3,000㎡"], ["양·사슴·메추리", "없음", "200㎡ 이상"], ["개", "없음", "60㎡ 이상"]];
  const PROC_WHY = { 퇴비화: "농가가 스스로 퇴비로", 액비화: "농가가 스스로 액비(물거름)로", 정화: "농가가 스스로 정화해 방류", "재활용 위탁": "재활용 신고자(퇴비·액비 업체)에 맡김",
    공공처리: "가축분뇨 공공처리시설로 보냄", "그 밖": "처리업자·공동처리 위탁, 미처리 등" };

  // ---------- 지도 지표 ----------
  const ha = (k) => R(k)?.land;
  const perHa = (k) => { const m = manOf(k), a = ha(k); return ok(m) && a >= 500 ? (m * 365) / a : null; };
  const i10 = YEARS.indexOf(LAST - 10);
  const change10 = (k) => { const t = R(k)?.t.man; if (!t || i10 < 0 || !(t[i10] >= 10) || !(t[YN] >= 10)) return null; return (t[YN] / t[i10] - 1) * 100; };
  const share = (k, f) => { const m = manOf(k); return ok(m) && m >= 10 ? f(R(k)) / m * 100 : null; };
  const courtShare = (k) => share(k, (r) => r.c[0][2]);
  const outShare = (k) => share(k, (r) => r.t.man[YN] - r.t.self[YN]);
  const heads = (kind) => (k) => R(k)?.t.h[kind]?.[YN] ?? null;
  const WARM = ["#3a302b", "#6b4632", "#a3613a", "#d98a45", "#f7bd63"];
  const DIV = ["#2a78d6", "#86b6ef", "#4a4a47", "#f0a3a2", "#e34948"]; // 파랑 ↔ 빨강, 가운데 회색
  const METRICS = [
    { key: "man", group: "분뇨", chip: "발생량", label: "가축분뇨 발생량", unit: "톤/일", get: manOf, fmt: ton, note: `${LAST}년 하루 가축분뇨 발생량(폐수 + 고형물). 수질오염원을 셈하는 값이라 닭·오리 등 가금은 거의 0으로 잡힙니다` },
    { key: "ha", group: "분뇨", chip: "1ha당", label: "경지 1ha당 한 해 가축분뇨", unit: "톤/ha", get: perHa, fmt: (v) => (ok(v) ? `${nf0.format(v)}톤` : "–"), note: `${LAST}년 한 해 가축분뇨 ÷ ${L.landYear}년 경지면적(농업면적조사). 경지 500ha 미만은 뺍니다` },
    { key: "chg", group: "분뇨", chip: "10년 증감", label: `가축분뇨 발생량 증감 (${LAST - 10}→${LAST})`, unit: "%", get: change10, fmt: (v) => (ok(v) ? `${v > 0 ? "+" : ""}${nf0.format(v)}%` : "–"), diverge: true, note: `${LAST - 10}년 대비 ${LAST}년 가축분뇨 발생량 증감률. 두 해 모두 하루 10톤 이상인 시군만` },
    { key: "court", group: "규모", chip: "허가 규모", label: "허가 규모 축사의 분뇨 비중", unit: "%", get: courtShare, fmt: pct, note: "분뇨 중 허가 규모 축사에서 나오는 비중. 가축분뇨법상 허가를 받아야 짓는 큰 축사(예: 돼지 축사 1,000㎡ 이상). 하루 10톤 이상인 시군만" },
    { key: "out", group: "처리", chip: "위탁·공공", label: "위탁·공공처리 비중", unit: "%", get: outShare, fmt: pct, note: "분뇨 중 농가가 스스로 처리하지 않고 재활용업체·공공처리시설 등에 맡기는 비중. 하루 10톤 이상인 시군만" },
    { key: "pig", group: "사육", chip: "돼지", label: "돼지 사육 마릿수", unit: "마리", get: heads("돼지"), fmt: head, note: `${LAST}년 전국오염원조사의 돼지 마릿수 (가축동향조사·총조사와 조사 기준이 다릅니다)` },
    { key: "cow", group: "사육", chip: "한우", label: "한우 사육 마릿수", unit: "마리", get: heads("한우"), fmt: head, note: `${LAST}년 전국오염원조사의 한우 마릿수 (가축동향조사와 조사 기준이 다릅니다)` },
    { key: "dairy", group: "사육", chip: "젖소", label: "젖소 사육 마릿수", unit: "마리", get: heads("젖소"), fmt: head, note: `${LAST}년 전국오염원조사의 젖소 마릿수 (가축동향조사와 조사 기준이 다릅니다)` },
  ];
  const DEFAULT_METRIC = METRICS[0];
  const state = { key: NATION, metric: DEFAULT_METRIC, pk: null, ck: null, ruleOpen: false };

  // ---------- 선택 ----------
  const selSido = $("#sido"), selSgg = $("#sgg");
  selSido.innerHTML = `<option value="${NATION}">전국</option>` + SIDO_CODES.map((s) => `<option value="${s}">${T.sidos[s].name}</option>`).join("");
  selSido.addEventListener("change", () => select(selSido.value));
  selSgg.addEventListener("change", () => select(selSgg.value || selSido.value));
  function syncControls() {
    const s = sidoOf(state.key);
    selSido.value = s || NATION;
    selSgg.disabled = !s;
    selSgg.innerHTML = `<option value="">${s ? "전체" : "–"}</option>` + (s ? UNITS_BY_SIDO[s].map((k) => `<option value="${k}">${label(k)}</option>`).join("") : "");
    selSgg.value = level(state.key) === 2 ? state.key : "";
  }

  // ---------- 주소: #충청남도/홍성군?m=ha ----------
  function syncURL() {
    const k = state.key;
    const path = k === NATION ? "" : level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`;
    const q = new URLSearchParams();
    if (state.metric !== DEFAULT_METRIC) q.set("m", state.metric.key);
    const url = `${location.pathname}${q.toString() ? `?${q}` : ""}${path ? `#${encodeURIComponent(path)}` : ""}`;
    if (url !== location.pathname + location.search + location.hash) history.replaceState(null, "", url);
  }
  function fromURL() {
    const [a, b] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = SIDO_CODES.find((c) => T.sidos[c].name === a || T.sidos[c].short === a);
    state.key = s ? (b && UNITS_BY_SIDO[s].find((k) => label(k) === b)) || s : NATION;
    state.metric = METRICS.find((m) => m.key === new URLSearchParams(location.search).get("m")) || DEFAULT_METRIC;
  }

  // ---------- 막대 위 값: 마우스를 올리면 바로 뜬다 ----------
  const ptip = document.createElement("div");
  ptip.className = "lv-ptip";
  ptip.hidden = true;
  document.body.append(ptip);
  const placeTip = (r) => {
    const w = ptip.offsetWidth, h = ptip.offsetHeight;
    ptip.style.left = `${Math.min(window.innerWidth - w - 6, Math.max(6, r.left + r.width / 2 - w / 2))}px`;
    ptip.style.top = `${r.top - h - 6 < 4 ? r.bottom + 6 : r.top - h - 6}px`;
  };
  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest?.("[data-tip]");
    if (!el || !el.closest(".col")) { if (!e.target.closest?.(".lv-tr svg")) ptip.hidden = true; return; }
    ptip.innerHTML = el.dataset.tip;
    ptip.hidden = false;
    placeTip(el.getBoundingClientRect());
  });
  document.addEventListener("scroll", () => { ptip.hidden = true; }, true);

  // ---------- 지도 (soil.js와 같다) ----------
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
  // 울릉군은 그리는 자리만 서쪽으로 0.8° 당긴다 (power.js와 같다)
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
  let path = null, project = null, size = { w: 0, h: 0 }, view = d3.zoomIdentity;

  function drawMap() {
    const wrap = $("#map-wrap");
    const w = wrap.clientWidth;
    const h = FIT.matches ? Math.max(240, wrap.clientHeight) : Math.round(Math.max(380, Math.min(720, w * 1.05)));
    size = { w, h };
    const pad = 12, bw = BOUNDS.x1 - BOUNDS.x0, bh = BOUNDS.y1 - BOUNDS.y0;
    const s = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
    const ox = (w - bw * s) / 2, oy = (h - bh * s) / 2;
    project = (lon, lat) => [ox + (drawLon(lon) * KX - BOUNDS.x0) * s, oy + (BOUNDS.y1 - lat) * s];
    path = d3.geoPath(d3.geoTransform({ point(lon, lat) { this.stream.point(...project(lon, lat)); } }));
    mapSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", FIT.matches ? null : h);
    anchor.clear();
    [...sidoFeatures, ...unitFeatures].forEach((f) => anchor.set(f.properties.key, labelPoint(f)));
    Object.entries(LABEL_AT).forEach(([k, ll]) => anchor.set(k, project(...ll)));
    const world = mapSvg.selectAll("g.world").data([0]).join("g").attr("class", "world");
    world.selectAll("g.units").data([0]).join("g").attr("class", "units")
      .selectAll("path").data(unitFeatures, (d) => d.properties.key).join("path")
      .attr("class", "region unit").attr("d", path).attr("tabindex", 0).attr("role", "button")
      .on("mousemove", (e, d) => hoverRegion(e, d.properties.key))
      .on("mouseleave", leaveRegion)
      .on("click", (e, d) => onRegionClick(d.properties.key))
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRegionClick(d.properties.key); } });
    world.selectAll("path.mesh-sido-bg").data([sidoMesh]).join("path").attr("class", "mesh-sido-bg").attr("d", path);
    world.selectAll("path.mesh-sido").data([sidoMesh]).join("path").attr("class", "mesh-sido").attr("d", path);
    const ul = unitFeatures.find((f) => f.properties.key === ULLEUNG.key);
    const [[ux0, uy0], [ux1, uy1]] = ul ? path.bounds(ul) : [[0, 0], [0, 0]];
    world.selectAll("rect.inset-frame").data(ul ? [0] : []).join("rect").attr("class", "inset-frame")
      .attr("x", ux0 - 5).attr("y", uy0 - 5).attr("width", ux1 - ux0 + 10).attr("height", uy1 - uy0 + 10).attr("rx", 3)
      .append("title").text("울릉군: 지도에서 보기 좋게 실제보다 서쪽으로 옮겨 그림");
    mapSvg.selectAll("g.labels").data([0]).join("g").attr("class", "labels");
    applyView(false);
  }

  // ---------- 지명 (power.js와 같다) ----------
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
  function drawLabels(v, animate) {
    const s = sidoOf(state.key);
    const keys = s ? UNITS_BY_SIDO[s] : SIDO_CODES;
    const pos = (k) => { const [x, y] = anchor.get(k) || [NaN, NaN]; return [x * v.k + v.x, y * v.k + v.y]; };
    const small = (k) => {
      if (k === state.key) return false;
      const f = (s ? unitFeatures : sidoFeatures).find((d) => d.properties.key === k);
      return path.area(f) * v.k * v.k < (s ? 260 : 120);
    };
    const name = (k) => (level(k) === 1 ? T.sidos[k].short : (label(k).endsWith("시부") ? "시부" : label(k).replace(/(시|군|구)$/, "")));
    const inView = (k) => { const [x, y] = pos(k); return x > 20 && x < size.w - 20 && y > 16 && y < size.h - 10; };
    const ctx = s ? SIDO_CODES.filter((c) => c !== s && inView(c)) : [];
    const data = [...keys.filter((k) => !small(k) && Number.isFinite(pos(k)[0])), ...ctx];
    const sel = mapSvg.select("g.labels").selectAll("text").data(data, (k) => k).join("text")
      .attr("class", (k) => `region-label${level(k) === 1 ? " sido-label" : ""}${s && level(k) === 1 ? " ctx" : ""}${k === state.key ? " sel" : ""}`)
      .attr("x", (k) => pos(k)[0]).attr("y", (k) => pos(k)[1] + 4).text(name);
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
    view = targetView();
    pan.sync(view);
    if (animate && !reduceMotion) world.transition().duration(700).ease(d3.easeCubicInOut).attr("transform", view);
    else world.interrupt().attr("transform", view);
    drawLabels(view, animate);
  }
  // 마우스로 끌면 지도가 따라 움직인다 (assets/mappan.js)
  const pan = window.rstatPan(mapSvg, (t) => {
    view = t;
    mapSvg.select("g.world").interrupt().attr("transform", t);
    tip.hidden = true;
    drawLabels(t, false);
  });

  const pickSido = (k) => level(state.key) === 0 || sidoOf(k) !== sidoOf(state.key);
  function onRegionClick(k) {
    if (pickSido(k)) select(sidoOf(k));
    else if (k === state.key) select(sidoOf(k));
    else select(k);
  }
  function hoverRegion(e, k) {
    const m = state.metric, r = R(k);
    let html = `<b>${esc(fullLabel(k))}</b>`;
    if (!r) html += "축산 자료 없음";
    else {
      html += `${m.label} <b style="display:inline">${m.fmt(m.get(k))}</b>`;
      if (m.key !== "man") html += `<br>분뇨 하루 ${ton(manOf(k))}`;
      const top = r.k.map((x, i) => [L.kinds[i], x[2]]).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).slice(0, 2);
      if (top.length && manOf(k) > 0) html += `<br>${top.map(([n, v]) => `${n} ${pct((v / manOf(k)) * 100)}`).join(" · ")}`;
    }
    showTip(e, html);
    const s = pickSido(k) ? sidoOf(k) : null;
    mapSvg.selectAll("path.unit").classed("sido-hov", (d) => d.properties.sido === s);
    if (s) tip.insertAdjacentHTML("beforeend", `<br><span class="tip-hint">누르면 ${esc(T.sidos[s].short)} 보기</span>`);
  }
  function leaveRegion() {
    tip.hidden = true;
    mapSvg.selectAll("path.unit.sido-hov").classed("sido-hov", false);
  }
  function showTip(e, html) {
    tip.innerHTML = html;
    const r = $("#map-wrap").getBoundingClientRect();
    tip.style.left = `${e.clientX - r.left}px`;
    tip.style.top = `${e.clientY - r.top}px`;
    tip.hidden = false;
  }

  // 색: 시군 값 순서로 다섯 구간, 증감률은 0을 가운데 둔 고정 구간
  function paintMap() {
    const m = state.metric, s = sidoOf(state.key);
    const vals = ALL_UNITS.map((k) => m.get(k)).filter(ok);
    let color, rows;
    if (m.diverge) {
      const cuts = [-30, -10, 10, 30];
      color = d3.scaleThreshold().domain(cuts).range(DIV);
      const names = ["30% 넘게 줄어듦", "-30~-10%", "-10~+10%", "+10~+30%", "30% 넘게 늘어남"];
      rows = DIV.map((c, i) => [c, names[i]]);
    } else {
      const q = d3.scaleQuantile().domain(vals).range(WARM);
      const e = [d3.min(vals), ...q.quantiles(), d3.max(vals)];
      color = q;
      rows = WARM.map((c, i) => [c, `${m.fmt(e[i]).replace(/[^\d.,억만]+$/, "")}–${m.fmt(e[i + 1])}`]);
    }
    mapSvg.selectAll("path.unit")
      .attr("fill", (d) => { const v = m.get(d.properties.key); return ok(v) ? color(v) : EMPTY; })
      .classed("sel", (d) => d.properties.key === state.key)
      .classed("pw-ctx", (d) => !!s && d.properties.sido !== s)
      .attr("aria-label", (d) => `${fullLabel(d.properties.key)} ${m.label}`);
    mapSvg.selectAll("path.unit.sel").raise();
    mapSvg.classed("dimmed", level(state.key) === 2);
    $("#legend").innerHTML = `<span class="title">${m.label}</span>`
      + rows.map(([c, t]) => `<span class="row"><span class="sw" style="background:${c}"></span>${t}</span>`).join("")
      + `<span class="row"><span class="sw" style="background:${EMPTY}"></span>자료 없음</span>`;
    $("#metric-note").textContent = m.note;
    $("#map").setAttribute("aria-label", `${m.label} 지도`);
  }

  // ---------- 지표 칩 (묶음 이름 + 짧은 칩, 한 줄) ----------
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

  // ---------- 순위: 큰 순서 (증감률은 늘어난 순서) ----------
  function renderRank() {
    const m = state.metric, s = sidoOf(state.key);
    const peers = s ? UNITS_BY_SIDO[s] : ALL_UNITS;
    const list = peers.map((k) => [k, m.get(k)]).filter(([, v]) => ok(v) && (m.diverge || v > 0)).sort((a, b) => b[1] - a[1]);
    const name = (k) => (s ? label(k) : fullLabel(k));
    const max = Math.max(...list.map(([, v]) => Math.abs(v)), 1e-9);
    const row = ([k, v], no) => `
      <button type="button" class="rank-row wide${k === state.key ? " sel" : ""}" data-r="${k}">
        <span class="no">${no}</span><span class="nm">${esc(name(k))}</span>
        <span class="track"><span class="fill${v < 0 ? " neg" : ""}" style="width:${(Math.abs(v) / max) * 100}%"></span></span>
        <span class="val">${m.fmt(v)}</span><span></span>
      </button>`;
    const top = list.slice(0, 10);
    $("#rank").innerHTML = list.length ? `
      <div class="rank-title"><span><b>${m.label}</b> 상위 ${s ? `${T.sidos[s].short} 시군` : "시군"}</span><span class="rank-meta">${list.length}곳</span></div>
      <div>${top.slice(0, 5).map((d, j) => row(d, j + 1)).join("")}</div>
      <div>${top.slice(5).map((d, j) => row(d, j + 6)).join("")}</div>` : `<div class="rank-title"><span>${s ? `${T.sidos[s].short}에는 ` : ""}이 지표를 셀 수 있는 시군이 없습니다</span></div>`;
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => select(b.dataset.r)));
  }

  // ---------- 자료가 없는 지역 (도시) ----------
  function emptyPanels(k) {
    const msg = `<p class="lv-empty">${esc(fullLabel(k))}에는 전국오염원조사 축산계 자료가 없습니다 (가축을 기르는 농가가 없음).</p>`;
    ["#kinds", "#courts", "#procs", "#trends", "#vils", "#facs"].forEach((s) => { $(s).innerHTML = msg; });
    ["#kind-lead", "#kind-note", "#court-sum", "#court-note", "#proc-sum", "#proc-note", "#trend-note", "#vil-sum"].forEach((s) => { $(s).innerHTML = ""; });
    ["#vil-count", "#fac-count"].forEach((s) => { $(s).textContent = ""; });
    $("#kind-scope").textContent = `(${fullLabel(k)})`;
    $("#trend-scope").textContent = `(${fullLabel(k)})`;
  }

  // ---------- 왼쪽 1: 축종 — 마릿수·농가·분뇨 표, 분뇨 막대는 비중 (이름 앞 색 네모 없이, 막대는 한 색) ----------
  function renderKinds() {
    const k = state.key, r = R(k), m = manOf(k);
    $("#kind-scope").textContent = `(${fullLabel(k)})`;
    $("#kind-year").textContent = `${LAST}년`;
    const ph = perHa(k), phN = perHa(NATION);
    $("#kind-lead").innerHTML = `하루 <b>${ton(m)}</b>`
      + (ok(ph) ? ` · 경지 1ha당 한 해 <b>${nf0.format(ph)}톤</b>${level(k) && ok(phN) ? ` <span>(전국 ${nf0.format(phN)}톤)</span>` : ""}` : ` <span>· 한 해 ${big(m * 365)}톤</span>`);
    const max = Math.max(...r.k.map((x) => x[2]), 1e-9);
    $("#kinds").innerHTML = `<table class="lv-ktab"><thead><tr><th>축종</th><th>마릿수</th><th>농가</th><th>분뇨 <small>톤/일 · 비중</small></th></tr></thead><tbody>${L.kinds.map((n, i) => {
      const [f, h, v] = r.k[i];
      if (!f && !h) return "";
      const p = m > 0 ? (v / m) * 100 : 0;
      return `<tr><th>${n}</th><td>${big(h)}</td><td>${nf0.format(f)}</td>
        <td class="v" data-tip="<b>${esc(fullLabel(k))} ${n}</b> 분뇨 하루 ${ton(v)}<br>전체의 ${p >= 1 || !p ? pct(p) : "1% 미만"}"><span class="lv-kv"><span class="lv-db"><i style="width:${(v / max) * 100}%"></i></span><b>${p >= 1 || !p ? pct(p) : "<1%"}</b><em>${ton(v)}</em></span></td></tr>`;
    }).join("")}</tbody></table>`;
    $("#kind-note").textContent = "분뇨는 수질오염원을 셈하는 값이라 닭·오리 등 가금은 마릿수가 많아도 거의 0입니다. 농가는 축종마다 센 수입니다.";
  }

  // ---------- 왼쪽 2: 농장 규모 — 농가·마릿수·분뇨 도넛 셋 (허가·신고·신고미만) ----------
  // 규모는 순서가 있어 한 가지 색의 세 단계(큰 농장이 가장 밝다, dataviz --ordinal 검증, 바탕 #1d2026)
  const COURT_COL = { 허가: "#f2b48a", 신고: "#e0793f", 신고미만: "#b4501f" };
  const COURT_KINDS = ["돼지", "한우", "젖소", "닭"];
  function renderCourts() {
    const k = state.key, r = R(k);
    // 축종 단추: 그 지역에 농가가 있는 축종만 (닭은 분뇨가 거의 0이라도 농가·마릿수 구성을 본다)
    const has = (kd) => (r.ck?.[L.kinds.indexOf(kd)] ?? []).some((x) => x[0] > 0);
    if (state.ck && !has(state.ck)) state.ck = null;
    const kind = state.ck;
    $("#court-seg").innerHTML = [null, ...COURT_KINDS.filter(has)].map((kd) => `<button type="button" data-k="${kd ?? ""}" aria-pressed="${kd === kind}">${kd ?? "전체"}</button>`).join("");
    $$("#court-seg button").forEach((bt) => bt.addEventListener("click", () => { state.ck = bt.dataset.k || null; renderCourts(); }));
    const c = kind ? r.ck[L.kinds.indexOf(kind)] : r.c;
    const cols = [["농가", 0, (v) => `${nf0.format(v)}곳`], ["마릿수", 1, head], ["분뇨", 2, (v) => `하루 ${ton(v)}`]];
    const R0 = 56, R1 = 30;
    const arc = d3.arc().innerRadius(R1).outerRadius(R0).padAngle(0.03).cornerRadius(2);
    const donut = ([n, j, f]) => {
      const t = sum(c.map((x) => x[j]));
      if (!(j === 2 ? t >= 1 : t > 0)) return `<div class="lv-dn"><svg viewBox="-58 -58 116 116"><circle r="43" fill="none" stroke="#2f333b" stroke-width="26"/><text class="lv-dc" y="1">${n}</text><text class="lv-dv" y="15">거의 0</text></svg></div>`;
      const parts = L.courts.map((cn, i) => ({ n: cn, v: c[i][j], p: (c[i][j] / t) * 100 }));
      const arcs = d3.pie().sort(null).value((d) => d.v)(parts);
      return `<div class="lv-dn"><svg viewBox="-58 -58 116 116">${arcs.map((a) => `<path d="${arc(a)}" fill="${COURT_COL[a.data.n]}" data-tip="<b>${esc(fullLabel(k))}${kind ? ` ${kind}` : ""} ${COURT_NAME[a.data.n]}</b> ${n} ${f(a.data.v)}<br>${n}의 ${pct(a.data.p)}<br>${COURT_WHY[a.data.n]}"></path>`).join("")}
        ${arcs.filter((a) => a.data.p >= 9).map((a) => { const [x, y] = arc.centroid(a); return a.data.p >= 22 ? `<text class="lv-dl" x="${x}" y="${y - 3}">${COURT_SHORT[a.data.n]}</text><text class="lv-dl" x="${x}" y="${y + 9}">${nf0.format(a.data.p)}%</text>` : `<text class="lv-dl" x="${x}" y="${y + 4}">${nf0.format(a.data.p)}%</text>`; }).join("")}
        <text class="lv-dc" y="1">${n}</text><text class="lv-dv" y="15">${j === 2 ? ton(t) : big(t)}</text></svg></div>`;
    };
    $("#courts").innerHTML = `<div class="lv-dns">${cols.map(donut).join("")}</div>`;
    // 결론 문장은 분뇨로, 분뇨가 거의 없는 축종(닭 등)은 마릿수로 견준다
    const tf = sum(c.map((x) => x[0])), tm = sum(c.map((x) => x[2])), th = sum(c.map((x) => x[1]));
    const [mj, mn, mt, josa] = tm >= 1 ? [2, "분뇨", tm, "를 냅니다"] : [1, "마릿수", th, "를 기릅니다"];
    const who = kind ? `${kind} ` : "";
    $("#court-sum").innerHTML = tf && mt ? `${who}허가 규모 축사는 농가의 <b>${pct((c[0][0] / tf) * 100)}</b>지만 ${mn}의 <b class="hi">${pct((c[0][mj] / mt) * 100)}</b>${josa}`
      + `<br><span>${who}신고미만 축사는 농가 ${pct((c[2][0] / tf) * 100)}, ${mn} ${pct((c[2][mj] / mt) * 100)}</span>` : "";
    $("#court-note").innerHTML = `<button type="button" class="lv-q" id="court-rule" aria-expanded="false" title="누르면 허가·신고 기준 설명">법적규제 구분 ▾</button>`
      + `<span class="lv-dkey">${L.courts.map((n) => `<span data-tip="<b>${COURT_NAME[n]}</b> ${COURT_WHY[n]}"><i style="background:${COURT_COL[n]}"></i>${COURT_SHORT[n]}</span>`).join("")}</span>`;
    $("#court-rule").addEventListener("click", () => { state.ruleOpen = !state.ruleOpen; renderCourtRule(); });
    renderCourtRule();
  }

  // 기준 상자: '법적규제 구분' 단추를 누르면 패널 위에 겹쳐 띄운다 (농경지 토양의 적성등급 정의와 같은 방식)
  function renderCourtRule() {
    const btn = $("#court-rule");
    btn.textContent = `법적규제 구분 ${state.ruleOpen ? "▴" : "▾"}`;
    btn.setAttribute("aria-expanded", state.ruleOpen);
    $("#court-box")?.remove();
    if (!state.ruleOpen) return;
    $("#p-court").insertAdjacentHTML("beforeend", `<div class="lv-defs" id="court-box" role="dialog" aria-label="축사 규모 기준">
      <div class="lv-defh"><b>법적규제 구분이란</b><button type="button" class="lv-defx" aria-label="닫기">✕</button></div>
      <p>가축분뇨법은 가축분뇨가 나오는 축사(배출시설)를 지을 때 면적에 따라 시장·군수의 <b>허가</b>를 받거나 <b>신고</b>하게 합니다. 원자료의 '법적규제' 칸이 이 구분이고, 신고미만은 신고 대상보다 작아 둘 다 필요 없는 축사입니다.</p>
      <table class="lv-rtab"><thead><tr><th>축종</th><th>허가 대상</th><th>신고 대상</th></tr></thead>
      <tbody>${COURT_RULE.map(([n, a, b]) => `<tr><th>${n}</th><td>${a}</td><td>${b}</td></tr>`).join("")}</tbody></table>
      <p class="lv-defsrc">축사 면적 기준. 소·젖소는 운동장 면적 기준도 있고, 방목은 마릿수로 신고합니다. 근거: 가축분뇨의 관리 및 이용에 관한 법률 시행령.</p></div>`);
    // 단추가 패널 아래쪽에 있어 상자는 단추 위로 연다 (열 아래로 넘치면 잘린다)
    const pr = $("#p-court").getBoundingClientRect(), br = btn.getBoundingClientRect();
    $("#court-box").style.bottom = `${pr.bottom - br.top + 6}px`;
    $("#court-box .lv-defx").addEventListener("click", () => { state.ruleOpen = false; renderCourtRule(); });
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && state.ruleOpen) { state.ruleOpen = false; renderCourtRule(); } });

  // ---------- 왼쪽 3: 처리 방식 — 방법마다 한 줄 (막대 0~100%, 전국은 막대 위 눈금과 옆 칸) ----------
  // 단추로 축종을 고르면 그 축종의 분뇨만 (전국도 같은 축종). 전체일 때 줄 위에 마우스를 올리면 그 방법의 축종 구성
  const PROC_KINDS = ["돼지", "한우", "젖소"];
  const SELF_PROCS = ["퇴비화", "액비화", "정화"];
  function procOf(key, kind) {
    const r = R(key);
    if (!r) return null;
    const p = kind ? r.pk[L.kinds.indexOf(kind)] : r.p;
    const t = sum(p);
    return t > 0 ? { p, t } : null;
  }
  function renderProcs() {
    const k = state.key, s = sidoOf(k), r = R(k), natOn = level(k) > 0;
    const has = (kd) => (procOf(k, kd)?.t ?? 0) >= 0.5;
    if (state.pk && !has(state.pk)) state.pk = null;
    const kind = state.pk;
    $("#proc-seg").innerHTML = [null, ...PROC_KINDS.filter(has)].map((kd) => `<button type="button" data-k="${kd ?? ""}" aria-pressed="${kd === kind}">${kd ?? "전체"}</button>`).join("");
    $$("#proc-seg button").forEach((bt) => bt.addEventListener("click", () => { state.pk = bt.dataset.k || null; renderProcs(); }));
    const me = procOf(k, kind), nat = procOf(NATION, kind);
    const sk = level(k) === 2 ? s : null, sd = sk ? procOf(sk, kind) : null;
    const share = (o, i) => (o ? (o.p[i] / o.t) * 100 : null);
    const kindMix = (i) => {
      if (kind || !r.pk) return "";
      const parts = L.kinds.map((kd, j) => [kd, r.pk[j][i]]).filter(([, v]) => v > 0).sort((x, y) => y[1] - x[1]);
      const t = sum(parts.map(([, v]) => v));
      return t > 0 ? `<br>${parts.slice(0, 3).map(([kd, v]) => `${kd} ${pct((v / t) * 100)}`).join(" · ")}` : "";
    };
    const rows = L.procs.map((n, i) => ({ n, i, v: share(me, i) ?? 0, t: me ? me.p[i] : 0, nat: share(nat, i), sd: share(sd, i) }))
      .filter((d) => d.t > 0 || (natOn && d.nat > 0)).sort((a, b) => b.v - a.v);
    $("#procs").innerHTML = `<div class="lv-ph"><span></span><span></span><span>${esc(shortLabel(k))}</span><span>${natOn ? "전국" : ""}</span></div>` + rows.map((d) => `
      <div class="lv-pr" data-tip="<b>${kind ? `${kind} · ` : ""}${d.n}</b> ${PROC_WHY[d.n]}<br>${esc(shortLabel(k))} 하루 ${ton(d.t)} · ${pct(d.v)}${sk && ok(d.sd) ? `<br>${esc(shortLabel(sk))} ${pct(d.sd)}` : ""}${natOn ? `<br>전국 ${pct(d.nat)}` : ""}${kindMix(d.i)}">
        <span class="nm">${d.n}</span>
        <span class="track"><span class="fill" style="width:${Math.min(100, d.v)}%"></span>${natOn && ok(d.nat) ? `<span class="nat" style="left:${Math.min(100, d.nat)}%"></span>` : ""}</span>
        <b>${pct(d.v)}</b><span class="natv">${natOn ? pct(d.nat) : ""}</span></div>`).join("");
    if (kind) {
      const self = me ? sum(SELF_PROCS.map((n) => me.p[L.procs.indexOf(n)])) / me.t * 100 : null;
      $("#proc-sum").innerHTML = me ? `${kind} 분뇨 하루 ${ton(me.t)} · 스스로 처리 <b>${pct(self)}</b> · 맡겨서 처리 <b class="hi">${pct(100 - self)}</b>` : "";
    } else {
      const self = (key, i) => { const t = R(key).t; return t.man[i] > 0 ? (t.self[i] / t.man[i]) * 100 : null; };
      const s0 = self(k, 0), s1 = self(k, YN);
      $("#proc-sum").innerHTML = ok(s1) ? `스스로 처리 <b>${pct(s1)}</b> · 맡겨서 처리 <b class="hi">${pct(100 - s1)}</b>`
        + (ok(s0) ? ` <span>(${YEARS[0]}년 스스로 ${pct(s0)})</span>` : "") : "";
    }
    $("#proc-note").textContent = `${natOn ? `흰 눈금은 전국${kind ? ` ${kind}` : ""} 비중. ` : ""}스스로 처리는 퇴비화·액비화·정화${kind ? "" : "·미처리"}.${kind ? "" : " 줄에 마우스를 올리면 축종 구성."}`;
  }

  // ---------- 오른쪽 1: 흐름 — 분뇨 발생량·농가 수 (해마다) ----------
  function frame(el, h0) {
    const w = el.clientWidth || 300, h = el.clientHeight || h0;
    el._wh = [w, h];
    el.innerHTML = "";
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    return { svg, w, h };
  }
  const TRENDS = [
    { key: "man", name: "가축분뇨", unit: "톤/일", get: (t) => t.man, fmt: ton },
    { key: "farm", name: "사육 농가", unit: "곳 (축종별 합)", get: (t) => t.farm, fmt: (v) => `${nf0.format(v)}곳` },
    { key: "out", name: "맡겨서 처리", unit: "% (분뇨 중)", get: (t) => t.man.map((v, i) => (v > 0 ? ((v - t.self[i]) / v) * 100 : null)), fmt: pct },
  ];
  function renderTrends() {
    const k = state.key;
    $("#trend-scope").textContent = `(${fullLabel(k)})`;
    $("#trend-range").textContent = `${YEARS[0]}~${LAST}년`;
    $("#trends").innerHTML = TRENDS.map((t) => `<div class="lv-tr" data-t="${t.key}"><div class="lv-trh"><b>${t.name}</b><span>${t.unit}</span><em></em></div><div class="lv-trc"></div></div>`).join("");
    drawTrends();
    $("#trend-note").textContent = "시군이 해마다 조사해 낸 값이라 한 해만 튀는 일이 있습니다. 처리 방법 이름은 2015·2018년에 바뀌었습니다.";
  }
  function drawTrends() {
    const k = state.key, r = R(k);
    if (!r) return;
    $$("#trends .lv-tr").forEach((box) => {
      const t = TRENDS.find((x) => x.key === box.dataset.t), vals = t.get(r.t);
      const el = $(".lv-trc", box);
      const { svg, w, h } = frame(el, 60);
      const m = { l: 6, r: 6, t: 14, b: 14 };
      const x = d3.scalePoint().domain(YEARS).range([m.l + 18, w - m.r - 18]);
      const ext = d3.extent(vals.filter(ok));
      const pad = (ext[1] - ext[0]) * 0.12 || Math.abs(ext[1]) * 0.1 || 1;
      const y = d3.scaleLinear().domain([ext[0] - pad, ext[1] + pad]).range([h - m.b, m.t]);
      const pts = YEARS.map((yr, i) => [yr, vals[i]]).filter(([, v]) => ok(v));
      svg.append("path").attr("class", "lv-area").attr("d", d3.area().x((d) => x(d[0])).y0(h - m.b).y1((d) => y(d[1]))(pts));
      svg.append("path").attr("class", "lv-line").attr("d", d3.line().x((d) => x(d[0])).y((d) => y(d[1]))(pts));
      svg.append("g").attr("class", "pw-axis").selectAll("text").data([YEARS[0], LAST]).join("text")
        .attr("x", (d) => x(d)).attr("y", h - 2).attr("text-anchor", (d, i) => (i ? "end" : "start")).text((d) => d);
      const ends = [pts[0], pts.at(-1)];
      svg.append("g").selectAll("circle").data(ends).join("circle").attr("class", "pw-dot").attr("r", 3.2).attr("cx", (d) => x(d[0])).attr("cy", (d) => y(d[1]));
      svg.append("g").selectAll("text").data(ends).join("text").attr("class", "lv-tv")
        .attr("x", (d, i) => x(d[0]) + (i ? -4 : 4)).attr("y", (d) => y(d[1]) - 6).attr("text-anchor", (d, i) => (i ? "end" : "start")).text((d) => t.fmt(d[1]));
      const first = pts[0][1], last = pts.at(-1)[1];
      const d = t.key === "out" ? last - first : first ? (last / first - 1) * 100 : null;
      $("em", box).innerHTML = ok(d) ? `${YEARS[0]}년보다 <b class="${d > 0 ? "up" : "dn"}">${d > 0 ? "+" : ""}${nf0.format(d)}${t.key === "out" ? "%p" : "%"}</b>` : "";
      // 마우스: 그해 값
      const guide = svg.append("line").attr("class", "pw-mark").attr("y1", m.t - 4).attr("y2", h - m.b).style("opacity", 0);
      svg.append("rect").attr("x", 0).attr("y", 0).attr("width", w).attr("height", h).attr("fill", "transparent")
        .on("mousemove", (e) => {
          const [mx] = d3.pointer(e);
          const yr = YEARS.reduce((a, b) => (Math.abs(x(b) - mx) < Math.abs(x(a) - mx) ? b : a));
          const v = vals[YEARS.indexOf(yr)];
          guide.attr("x1", x(yr)).attr("x2", x(yr)).style("opacity", 1);
          ptip.innerHTML = `<b>${yr}년 ${t.name}</b> ${t.fmt(v)}`;
          ptip.hidden = false;
          const br = el.getBoundingClientRect();
          placeTip({ left: br.left + x(yr) - 1, width: 2, top: br.top, bottom: br.bottom });
        })
        .on("mouseleave", () => { guide.style("opacity", 0); ptip.hidden = true; });
    });
  }

  // ---------- 오른쪽 2: 분뇨가 많은 마을 (리, 동 지역은 동) ----------
  function renderVillages() {
    const k = state.key, r = R(k), m = manOf(k);
    const top = r.v, topSum = sum(top.map((v) => v[3]));
    $("#vil-count").textContent = `가축 기르는 마을 ${nf0.format(r.nv)}곳`;
    $("#vil-sum").innerHTML = top.length && m > 0 ? `상위 ${top.length}곳이 ${level(k) === 2 ? "이 시군" : esc(shortLabel(k))} 분뇨의 <b class="hi">${pct((topSum / m) * 100)}</b>` : "";
    const max = top[0]?.[3] || 1;
    $("#vils").innerHTML = top.map(([u, emd, ri, v, kind, f, h], j) => {
      const kn = L.kinds[kind];
      const where = level(k) === 2 ? "" : `<span class="lv-vu">${esc(level(k) === 1 ? label(u) : fullLabel(u))}</span>`;
      return `<button type="button" class="lv-vr" data-u="${u}" data-tip="<b>${esc(fullLabel(u))} ${esc(emd)} ${esc(ri)}</b><br>분뇨 하루 ${ton(v)} · 가장 많은 축종 ${kn}<br>농가 ${nf0.format(f)}곳(축종별) · ${head(h)}">
        <span class="no">${j + 1}</span><span class="lv-vn">${where}${esc(emd)} <b>${esc(ri)}</b></span>
        <span class="lv-vk">${kn}</span>
        <span class="track"><span class="fill" style="width:${(v / max) * 100}%"></span></span><span class="val">${ton(v)}</span></button>`;
    }).join("") || `<p class="lv-empty">마을 자료가 없습니다</p>`;
    $$("#vils .lv-vr").forEach((b) => b.addEventListener("click", () => { if (b.dataset.u !== state.key) select(b.dataset.u); }));
  }

  // ---------- 오른쪽 3: 가축분뇨 공공처리시설 (하루 처리용량, 큰 순서로 다섯까지) ----------
  const FAC_ROWS = 5;
  function renderFacs() {
    const k = state.key, list = R(k).fac, pub = R(k).p[L.procs.indexOf("공공처리")];
    const cap = sum(list.map((f) => f[1]));
    $("#fac-count").textContent = list.length ? `${list.length}곳 · 하루 ${nf0.format(cap)}㎥` : "없음";
    const max = list[0]?.[1] || 1;
    const lead = `<p class="lv-sum">${list.length ? `처리용량 하루 <b>${nf0.format(cap)}㎥</b>` : `${esc(fullLabel(k))}에는 가축분뇨 공공처리시설이 없습니다`}`
      + ` <span>· 공공처리로 보내는 분뇨 하루 ${ton(pub)}${list.length ? "" : " (다른 시군 시설로)"}</span></p>`;
    $("#facs").innerHTML = lead + list.slice(0, FAC_ROWS).map(([n, c, u]) => `
      <div class="lv-fr" data-tip="<b>${esc(n)}</b><br>${esc(fullLabel(u))} · 하루 처리용량 ${nf0.format(c)}㎥"><span class="lv-fn">${level(k) === 2 ? "" : `<span class="lv-vu">${esc(level(k) === 1 ? label(u) : fullLabel(u))}</span>`}${esc(n)}</span>
        <span class="track"><span class="fill" style="width:${(c / max) * 100}%"></span></span><span class="val">${nf0.format(c)}㎥</span></div>`).join("")
      + (list.length > FAC_ROWS ? `<p class="lv-more">그 밖 ${list.length - FAC_ROWS}곳</p>` : "");
  }

  // ---------- 가운데 제목 ----------
  function renderHero() {
    const k = state.key;
    $("#title-region").textContent = label(k);
    $("#crumb").textContent = level(k) === 0 ? "" : level(k) === 1 ? "전국 ›" : `전국 › ${T.sidos[sidoOf(k)].name} ›`;
    const reset = $("#reset");
    reset.hidden = level(k) === 0;
    reset.textContent = level(k) === 2 ? `${T.sidos[sidoOf(k)].short} 전체보기` : "전국보기";
  }
  $("#reset").addEventListener("click", () => select(parentOf(state.key) ?? NATION));

  // ---------- 갱신 ----------
  function render(animate = true) {
    syncControls();
    syncURL();
    renderHero();
    if (R(state.key)) {
      renderKinds();
      renderCourts();
      renderProcs();
      renderTrends();
      renderVillages();
      renderFacs();
    } else emptyPanels(state.key);
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
  drawMap();
  render(false);
  $("#built").textContent = `전국오염원조사 ${YEARS[0]}~${LAST}년 · 경지면적 ${L.landYear}년 · ${L.built} 작성`;
  let mw = 0, mh = 0;
  new ResizeObserver(([e]) => {
    const { width, height } = e.contentRect;
    if (Math.abs(width - mw) < 1 && Math.abs(height - mh) < 1) return;
    mw = width; mh = height;
    drawMap();
    paintMap();
  }).observe($("#map-wrap"));
  new ResizeObserver(() => {
    const el = $("#trends .lv-trc");
    if (!el || !el._wh || Math.abs(el._wh[0] - el.clientWidth) >= 1 || Math.abs(el._wh[1] - el.clientHeight) >= 1) drawTrends();
  }).observe($("#trends"));
  window.addEventListener("hashchange", () => { fromURL(); render(true); });
})();
