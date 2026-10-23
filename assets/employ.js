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
    { key: "share", group: "거주지 기준", chip: "농림어업 비중", label: "취업자 중 농림어업 비중", kind: "seq", get: uShare, fmt: pct,
      note: "지역별고용조사 시군구/산업별 취업자(거주지 기준): 그 시군에 사는 취업자 중 농업·임업·어업 비율" },
    { key: "count", group: "거주지 기준", chip: "취업자", label: "농림어업 취업자", kind: "seq", get: (k, h) => uAt(k, "a", h), fmt: peopleText,
      note: "지역별고용조사(거주지 기준) 농림어업 취업자 수. 표본조사라 작은 시군은 오차가 크다 (툴팁의 RSE)" },
    { key: "d5", group: "거주지 기준", chip: "5년 전 대비", label: "농림어업 비중 5년 전 대비", kind: "div", get: (k, h) => { const a = uShare(k, h), b = uShare(k, h - 10); return ok(a) && ok(b) ? a - b : null; }, fmt: pp,
      note: "농림어업 비중을 5년 전 같은 반기와 비교 (%p). 한 해 표본 흔들림보다 긴 변화를 본다" },
    { key: "wshare", group: "근무지 기준", chip: "농림어업 비중", label: "취업자 중 농림어업 비중 (근무지 기준)", kind: "seq", get: (k, h) => share(uAt(k, "wa", h), uAt(k, "wt", h)), fmt: pct,
      note: "지역별고용조사 시군구/산업별 취업자(근무지 기준): 그 시군에서 일하는 취업자 중 농림어업 비율" },
    { key: "flow", group: "근무지 기준", chip: "거주지와 차이", label: "농림어업 취업자 근무지 기준과 거주지 기준의 차이", kind: "div",
      get: (k, h) => { const a = uAt(k, "a", h), w = uAt(k, "wa", h); return ok(a) && ok(w) && a >= 1 ? (w / a - 1) * 100 : null; }, fmt: pctS,
      note: "지역별고용조사 농림어업 취업자, 근무지 기준이 거주지 기준보다 몇 % 많은가. +면 근무지 기준이 많음 (거주지 기준 1천 명 이상만)" },
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
    const project = (lon, lat) => [ox + (drawLon(lon) * KX - BOUNDS.x0) * s, oy + (BOUNDS.y1 - lat) * s];
    path = d3.geoPath(d3.geoTransform({ point(lon, lat) { this.stream.point(...project(lon, lat)); } }));
    mapSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", FIT.matches ? null : h);
    anchor.clear();
    [...sidoFeatures, ...unitFeatures].forEach((f) => anchor.set(f.properties.key, labelPoint(f)));
    // 서울을 둘러싼 경기도는 중심점이 서울 안에 찍히므로 이름 위치를 직접 정한다 (경도, 위도)
    Object.entries(LABEL_AT).forEach(([k, ll]) => anchor.set(k, project(...ll)));
    const world = mapSvg.selectAll("g.world").data([0]).join("g").attr("class", "world");
    world.selectAll("g.units").data([0]).join("g").attr("class", "units")
      .selectAll("path").data(unitFeatures, (d) => d.properties.key).join("path")
      .attr("class", "region unit").attr("d", path).attr("tabindex", 0).attr("role", "button")
      .on("mousemove", (e, d) => hoverRegion(e, d.properties.key))
      .on("mouseleave", leaveRegion)
      .on("click", (e, d) => onRegionClick(d.properties.key))
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRegionClick(d.properties.key); } });
    // 시도 경계: 시군마다 색이 달라 묻히지 않게 어두운 굵은 선 위에 밝은 가는 선을 겹친다
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

  // ---------- 지명 (주요 통계 app.js와 같다) ----------
  const LABEL_AT = { 31: [127.45, 37.2], 23: [126.5, 37.42], 34: [126.75, 36.5] }; // 경기는 서울 밖, 인천·충남은 서울·세종과 겹치지 않게 서쪽
  const anchor = new Map(); // 지역키 → 이름 자리 (가장 큰 조각의 중심)
  // 섬이 많은 지역도 본섬 위에 이름이 오도록 가장 큰 폴리곤의 중심을 쓴다
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
  // 전국은 시도 이름, 시도·시군은 그 시도의 시군 이름 + 화면 안 주변 시도 이름(흐리게). 화면에서 너무 작은 지역은 뺀다
  function drawLabels(view, animate) {
    const s = sidoOf(state.key);
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
  // 마우스로 끌면 지도가 따라 움직인다 (assets/mappan.js)
  const pan = window.rstatPan(mapSvg, (t) => {
    mapSvg.select("g.world").interrupt().attr("transform", t);
    tip.hidden = true;
    drawLabels(t, false);
  }, () => applyView(true)); // '맞춤' 단추: 고른 지역의 원래 시점으로

  // 전국 화면이나 다른 시도의 시군을 누르면 그 시도로, 고른 시도 안의 시군은 그 시군으로 (다시 누르면 시도로)
  const pickSido = (k) => level(state.key) === 0 || sidoOf(k) !== sidoOf(state.key);
  function onRegionClick(k) {
    if (pickSido(k)) select(sidoOf(k));
    else if (k === state.key) select(sidoOf(k));
    else select(k);
  }
  // 시도로 가는 자리에서는 그 시도 전체를 밝히고 툴팁에 알린다
  function hoverRegion(e, k) {
    showTip(e, k);
    const s = pickSido(k) ? sidoOf(k) : null;
    mapSvg.selectAll("path.unit").classed("sido-hov", (d) => d.properties.sido === s);
    if (s) tip.insertAdjacentHTML("beforeend", `<br><span class="tip-hint">누르면 ${esc(T.sidos[s].short)} 보기</span>`);
  }
  function leaveRegion() {
    tip.hidden = true;
    mapSvg.selectAll("path.unit.sido-hov").classed("sido-hov", false);
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
      + `${halfText(h)} · 거주지 기준 농림어업 ${peopleText(a)} (${pct(uShare(k, h))})`
      + (ok(w) ? `<br>근무지 기준 ${peopleText(w)}` : "")
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

  // 왼쪽 열은 경활(월·연, 전국·시도) → 시군을 고르면 그 시도
  const ekey = () => (level(state.key) === 2 ? sidoOf(state.key) : state.key);
  function renderSize() {
    const k = ekey();
    const unit = level(state.key) === 2;
    $("#size-scope").textContent = `(${fullLabel(k)})`;
    $("#size-scope").title = unit ? `경제활동인구조사는 시도까지 나와 ${label(state.key)} 대신 ${shortLabel(k)} 값을 보여줍니다` : "";
    const i = lastMonth(k);
    const a = mAt(k, "a", i), t = mAt(k, "t", i), a0 = mAt(k, "a", i - 12), t0 = mAt(k, "t", i - 12);
    $("#size-when").textContent = i >= 0 ? `${monthText(i)} · 경활${unit ? " 시도" : ""}` : "";
    const d = ok(a) && ok(a0) ? a - a0 : null;
    setStat("cnt", people(a), d == null ? "" : `<span class="d-lab">전년 같은 달</span>${deltaHTML(d, `${peopleText(Math.abs(d))} (${pctS((a / a0 - 1) * 100).replace(/^[+−]/, "")})`)}`);
    const s1 = share(a, t), s0 = share(a0, t0);
    setStat("share", [ok(s1) ? nf1.format(s1) : "–", "%"], ok(s1) && ok(s0) ? `<span class="d-lab">전년 같은 달</span>${deltaHTML(s1 - s0, pp(Math.abs(s1 - s0)).replace(/^[+−]/, ""))}` : "");
    drawLong();
  }

  // 긴 흐름: 전국 1963~ · 시도 1989~ (연평균, 경활)
  function longSeries(k) {
    return E.years.map((y, i) => ({ x: +y, a: yAt(k, "a", i), s: share(yAt(k, "a", i), yAt(k, "t", i)), lab: `${y}년` })).filter((d) => ok(d.a));
  }
  function drawLong() {
    const k = ekey(), el = $("#chart-long");
    const { svg, w, h } = frame(el, 130);
    const pts = longSeries(k);
    $("#long-note").textContent = `${pts[0]?.x ?? ""}~${pts.at(-1)?.x ?? ""} · 연평균`;
    if (pts.length < 2) { empty(svg); $("#long-key").innerHTML = ""; return; }
    const m = { l: 38, r: 34, t: 16, b: 16 };
    // 막대가 끝에서 넘치지 않게 양끝을 반 칸씩 띄운다
    const [x0, x1] = d3.extent(pts, (d) => d.x);
    const x = d3.scaleLinear().domain([x0 - 0.5, x1 + 0.5]).range([m.l, w - m.r]);
    const bw = Math.max(1, ((w - m.l - m.r) / (x1 - x0 + 1)) * 0.72);
    const ya = d3.scaleLinear().domain([0, d3.max(pts, (d) => d.a) * 1.08]).nice(3).range([h - m.b, m.t]);
    const ys = d3.scaleLinear().domain([0, Math.max(1, d3.max(pts, (d) => d.s ?? 0) * 1.08)]).nice(3).range([h - m.b, m.t]);
    gridY(svg, ya, ya.ticks(3), m.l, w - m.r, (d) => (d ? `${nf0.format(d / 10)}만` : "0"));
    gridY(svg, ys, ys.ticks(3).filter((d) => d), m.l, w - m.r, (d) => `${d}%`, true);
    // 가로축: 10년 간격
    const xt = pts.map((d) => d.x).filter((v) => v % 10 === 0);
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(xt).join("text").attr("x", (d) => x(d)).attr("y", h - 3).attr("text-anchor", "middle").text((d) => d);
    const bars = svg.append("g").selectAll("rect").data(pts).join("rect").attr("class", "em-yb")
      .attr("x", (d) => x(d.x) - bw / 2).attr("width", bw).attr("y", (d) => ya(d.a)).attr("height", (d) => ya(0) - ya(d.a)).attr("rx", Math.min(1.5, bw / 2));
    svg.append("path").attr("class", "em-sline").attr("d", d3.line().defined((d) => ok(d.s)).x((d) => x(d.x)).y((d) => ys(d.s)).curve(d3.curveMonotoneX)(pts));
    // 이야기 점: 비중 처음·끝, 취업자가 가장 많던 해
    const first = pts[0], last = pts.at(-1), peak = pts[d3.maxIndex(pts, (d) => d.a)];
    const marks = [
      { d: first, y: ys(first.s), t: pct(first.s), anchor: "start", cls: "s" },
      { d: last, y: ys(last.s), t: pct(last.s), anchor: "end", cls: "s" },
    ];
    if (peak !== first && peak !== last) marks.push({ d: peak, y: ya(peak.a), t: `${peak.x} ${peopleText(peak.a)}`, anchor: "middle", cls: "a" });
    const g = svg.append("g").attr("class", "em-marks");
    marks.forEach((mk) => {
      g.append("circle").attr("class", `em-mk ${mk.cls}`).attr("cx", x(mk.d.x)).attr("cy", mk.y).attr("r", 2.8);
      g.append("text").attr("class", `em-mt ${mk.cls}`).attr("x", x(mk.d.x) + (mk.anchor === "start" ? 5 : mk.anchor === "end" ? -5 : 0)).attr("y", mk.y - 6).attr("text-anchor", mk.anchor).text(mk.t);
    });
    const read = svg.append("text").attr("class", "em-readout").attr("x", m.l + 2).attr("y", 10);
    const hv = svg.append("g").attr("class", "em-hover").style("display", "none");
    const ln = hv.append("line").attr("y1", m.t).attr("y2", h - m.b);
    svg.append("rect").attr("x", m.l).attr("y", 0).attr("width", w - m.l - m.r).attr("height", h - m.b).attr("fill", "transparent")
      .on("mousemove", (e) => {
        const px = d3.pointer(e)[0];
        const d = pts[d3.minIndex(pts, (p) => Math.abs(x(p.x) - px))];
        hv.style("display", null);
        ln.attr("x1", x(d.x)).attr("x2", x(d.x));
        bars.classed("on", (b) => b === d);
        g.style("opacity", 0.25);
        read.text(`${d.lab} · ${peopleText(d.a)} · 비중 ${pct(d.s)}`);
      })
      .on("mouseleave", () => { hv.style("display", "none"); bars.classed("on", false); g.style("opacity", null); read.text(""); });
    $("#long-key").innerHTML = `<span><i class="em-k-a"></i>농림어업 취업자 (왼쪽)</span><span><i class="em-k-s"></i>전체 취업자 중 비중 (오른쪽)</span>`;
  }

  // 무슨 일을 하나 (지역별고용조사, 거주지 기준)
  // ① 전체 산업 중 농림어업: 시군은 공표 묶음 6개, 전국·시도는 대분류 21개를 그 묶음 색으로
  // ② 농림어업 안: 전국은 작물재배·축산·임업·어업(소분류), 시도는 농업·임업·어업, 시군은 나뉘지 않는다
  // 묶음 순서·색은 고정 (지역을 바꿔도 같은 자리·같은 색). 색은 어두운 바탕에서 이웃 색 구분을 검사했다. short는 범례용
  const AGRI_PART = "농림어업";
  const BUNDLES = [
    { f: "i04", name: "광·제조", short: "광·제조", color: "#3987e5", inds: [["iB", "광업"], ["iC", "제조업"]] },
    { f: "i41", name: "건설", short: "건설", color: "#d95926", inds: [["iF", "건설업"]] },
    { f: "i42", name: "도소매·숙박음식", short: "도소매·숙박", color: "#9085e9", inds: [["iG", "도소매"], ["iI", "숙박·음식점"]] },
    { f: "i43", name: "전기·운수·통신·금융", short: "운수·통신·금융", color: "#d55181", inds: [["iD", "전기·가스"], ["iH", "운수·창고"], ["iJ", "정보통신"], ["iK", "금융·보험"]] },
    { f: "i44", name: "사업·개인·공공서비스", short: "서비스", color: "#c98500", inds: [["iE", "수도·하수·폐기물"], ["iL", "부동산"], ["iM", "전문·과학·기술"], ["iN", "사업시설·지원·임대"],
      ["iO", "공공행정"], ["iP", "교육"], ["iQ", "보건·복지"], ["iR", "예술·스포츠·여가"], ["iS", "협회·수리·개인"], ["iT", "가구 내 고용"], ["iU", "국제·외국기관"]] },
  ];
  const AGRI_COLOR = "var(--agri)", AGRI_HEX = "#72c48d"; // SVG 칠은 hex로
  // 농림어업 안은 초록 계열 (위 막대의 다른 산업 색과 겹치지 않게)
  const MIX_COLORS = ["#72c48d", "#3f7d55", "#a9d8b8", "#2e6b4f", "#5fbfae"];
  // 세종은 시군 표에 없다 → 시도 값
  const mixKey = (k) => (level(k) === 2 && !E.u[k]?.i04 && UNITS_BY_SIDO[sidoOf(k)].length === 1 ? sidoOf(k) : k);
  // → { h, unit, groups: [{ name, color, v, parts: [[이름, 값]] }] } (농림어업이 첫 묶음)
  function industryParts(k) {
    const sk = mixKey(k);
    if (level(sk) === 2) {
      const h = lastHalf(E.u[sk]?.i04, state.h);
      if (h < 0) return null;
      const g = (b, v) => ({ ...b, v, parts: [[b.name, v]] });
      return { h, unit: "묶음", n: 6, groups: [g({ name: AGRI_PART, color: AGRI_COLOR }, uAt(sk, "a", h)), ...BUNDLES.map((b) => g(b, uAt(sk, b.f, h)))] };
    }
    const h = lastHalf(E.s[sk]?.iC, state.h);
    if (h < 0) return null;
    const a = sAt(sk, "a", h);
    const groups = [{ name: AGRI_PART, color: AGRI_COLOR, v: a, parts: [[AGRI_PART, a]] }, ...BUNDLES.map((b) => {
      const parts = b.inds.map(([f, n]) => [n, sAt(sk, f, h)]).filter(([, v]) => ok(v) && v > 0).sort((p, q) => q[1] - p[1]);
      return { ...b, v: d3.sum(parts, (p) => p[1]), parts };
    })];
    return { h, unit: "산업", n: 21, groups };
  }
  function agriParts(k) {
    k = mixKey(k);
    if (k === NATION) {
      const sub = E.mix.sub, h = lastHalf(sub.A, state.h);
      if (h < 0) return null;
      const crop = sub["011"][h], live = sub["012"][h], farm = sub["01"][h];
      return { h, parts: [["작물재배업", crop], ["축산업", live], ["복합·농업서비스", farm - crop - live], ["임업", sub["02"][h]], ["어업", sub["03"][h]]] };
    }
    if (level(k) === 1) {
      const h = lastHalf(E.s[k]?.n1, state.h);
      return h < 0 ? null : { h, parts: [["농업", sAt(k, "n1", h)], ["임업", sAt(k, "n2", h)], ["어업", sAt(k, "n3", h)]] };
    }
    return null;
  }
  // 도넛 하나: 조각 [[이름, 값, 색, 툴팁 이름]] → 가운데 큰 글씨·작은 글씨, 오른쪽 범례
  const DONUT = 64;
  function donut(head, slices, center, legend) {
    const tot = d3.sum(slices, (d) => d[1]);
    const r = DONUT / 2;
    const arc = d3.arc().innerRadius(r * 0.64).outerRadius(r);
    const arcs = d3.pie().sort(null).value((d) => d[1])(slices);
    const paths = arcs.map((a) => `<path d="${arc(a)}" style="fill:${a.data[2]}"><title>${esc(a.data[3] ?? a.data[0])} ${peopleText(a.data[1])} · ${pct(share(a.data[1], tot))}</title></path>`).join("");
    return `<div class="em-dnb"><div class="em-dnh">${head}</div><div class="em-dnr">`
      + `<svg viewBox="${-r} ${-r} ${DONUT} ${DONUT}" role="img" aria-label="${esc(center[1])} ${esc(center[0])}"><g class="em-dnp">${paths}</g>`
      + `<text class="em-dnv" y="1">${center[0]}</text><text class="em-dnk" y="12">${center[1]}</text></svg>`
      + `<ul class="em-dnl">${legend.map(([n, v, c, full]) => `<li${full ? ` title="${esc(full)}"` : ""}><i style="background:${c}"></i><span>${n}</span><b>${v}</b></li>`).join("")}</ul></div></div>`;
  }
  function renderMix() {
    const k = state.key, el = $("#mix");
    const ind = industryParts(k), sub = agriParts(k);
    if (!ind && !sub) {
      $("#mix-note").textContent = "";
      el.innerHTML = `<p class="note em-mix-none">이 시기 산업별 자료가 없습니다.</p>`;
      return;
    }
    const h0 = ind ? ind.h : sub.h;
    $("#mix-note").textContent = `${halfShort(h0)} · 지역별`;
    let html = "", foot = "";
    if (ind) {
      const groups = ind.groups.filter((g) => ok(g.v) && g.v > 0);
      const tot = d3.sum(groups, (g) => g.v);
      const all = groups.flatMap((g) => g.parts).sort((p, q) => q[1] - p[1]);
      const rank = all.findIndex(([n]) => n === AGRI_PART) + 1;
      const a = groups.find((g) => g.name === AGRI_PART);
      // 조각은 대분류(시군은 묶음) 하나씩, 색은 묶음 색. 농림어업이 12시에서 시작
      const slices = groups.flatMap((g) => g.parts.map(([n, v]) => [n, v, g.color === AGRI_COLOR ? AGRI_HEX : g.color, g.parts.length > 1 ? `${n} (${g.name})` : n]));
      const legend = groups.map((g) => [g.name === AGRI_PART ? AGRI_PART : g.short, `${(g.name === AGRI_PART ? nf1 : nf0).format(share(g.v, tot))}%`, g.color === AGRI_COLOR ? AGRI_HEX : g.color, g.name === AGRI_PART ? "" : g.name]);
      const head = `전체 산업 <span>${ind.n}개 ${ind.unit} 중 ${rank === 1 ? "1위" : `${rank}위`}</span>`;
      html += donut(head, slices, [a ? `${nf1.format(share(a.v, tot))}%` : "–", "농림어업"], legend);
      if (ind.unit === "산업") {
        const top = all.filter(([n]) => n !== AGRI_PART).slice(0, 3);
        foot = `<p class="em-dnf">큰 산업 ${top.map(([n, v]) => `${esc(n)} <b>${nf0.format(share(v, tot))}%</b>`).join(" · ")}</p>`;
      }
    }
    if (sub) {
      const parts = sub.parts.filter(([, v]) => ok(v) && v > 0), tot = d3.sum(parts, (p) => p[1]);
      const colors = parts.length === 3 ? [MIX_COLORS[0], MIX_COLORS[3], MIX_COLORS[4]] : MIX_COLORS;
      const slices = parts.map(([n, v], i) => [n, v, colors[i]]);
      const legend = parts.map(([n, v], i) => [n, `${nf0.format(share(v, tot))}%`, colors[i]]);
      const [n0, v0] = parts[0];
      const head = `농림어업 안${sub.h !== h0 ? ` <span>${halfShort(sub.h)}</span>` : ""}`;
      html += donut(head, slices, [`${nf0.format(share(v0, tot))}%`, n0.replace(/업$/, "")], legend);
    } else {
      html += `<div class="em-dnb"><div class="em-dnh">농림어업 안</div><p class="em-mnone">시군 단위로는 나오지 않습니다 · <button type="button" class="em-mlink" data-k="${sidoOf(k)}">${esc(shortLabel(sidoOf(k)))} 보기</button></p></div>`;
    }
    el.innerHTML = `<div class="em-donuts">${html}</div>${foot}`;
    $(".em-mlink", el)?.addEventListener("click", (e) => select(e.currentTarget.dataset.k));
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
  // 계절: 최근 3년 평균 계절 지수로 가장 많은·적은 달, 배수는 마지막 해 (처음 해와 견준다)
  function seasonText(k) {
    const grid = seasonGrid(k);
    if (!grid.length) return "";
    const recent = grid.slice(-3), first = grid[0], last = grid.at(-1);
    const prof = d3.range(12).map((j) => d3.mean(recent, (r) => r.idx[j]));
    const rx = (r) => d3.max(r.v) / d3.min(r.v);
    const hi = d3.maxIndex(prof), lo = d3.minIndex(prof);
    return `<span class="em-k-n" title="최근 3년 평균으로 가장 많은 달과 적은 달, 배수는 ${last.y}년">${hi + 1}월이 ${lo + 1}월의 <b>${nf1.format(rx(last))}배</b>`
      + (first !== last ? ` (${first.y}년 ${nf1.format(rx(first))}배)` : "") + `</span>`;
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
  // 시군 상세 카드의 추이: 선 양 끝에 첫해·마지막 해 값, 아래에 연도, 해마다 마우스를 올리면 그해 값 (선은 늘어나는 SVG라 글자는 HTML로 얹는다)
  function detailSpark(vals, years, fmt) {
    const pts = vals.map((v, i) => [i, v]).filter(([, v]) => ok(v));
    if (pts.length < 2) return "";
    const [lo, hi] = d3.extent(pts, (p) => p[1]);
    const yPct = (v) => (lo === hi ? 50 : ((2 + (20 * (hi - v)) / (hi - lo)) / 24) * 100);
    const [i0, v0] = pts[0], [i1, v1] = pts.at(-1);
    const lab = (v, side) => `<span class="em-spv ${side}${yPct(v) < 30 ? " low" : ""}" style="top:${yPct(v)}%">${fmt(v)}</span>`;
    // 해마다 칸 하나 (점 위치가 칸 가운데, spark의 x와 같은 1~99), 올리면 점과 값이 뜬다
    const step = 98 / (vals.length - 1);
    const tip = (v, i) => {
      const t = `${years[i]} ${ok(v) ? fmt(v) : "자료 없음"}`;
      const edge = i === 0 ? " l" : i === vals.length - 1 ? " r" : "";
      return ok(v) ? `<u style="top:${yPct(v)}%"></u><b class="${edge.trim()}${yPct(v) < 40 ? " low" : ""}" style="top:${yPct(v)}%">${t}</b>` : `<b class="${edge.trim()}" style="top:50%">${t}</b>`;
    };
    return spark(vals) + lab(v0, "l") + lab(v1, "r")
      + `<span class="em-spy l">${years[i0]}</span><span class="em-spy r">${years[i1]}</span>`
      + `<div class="em-sph">${vals.map((v, i) => `<i style="left:${1 + i * step - step / 2}%;width:${step}%" aria-label="${years[i]}년 ${ok(v) ? fmt(v) : "자료 없음"}">${tip(v, i)}</i>`).join("")}</div>`;
  }
  // 지역별고용조사 반기 → 상·하반기가 다 있는 해의 연평균 (표본 흔들림을 줄인다). 시도 값은 그 안 시군의 합
  function trendItems() {
    const k = state.key, hh = state.h;
    const years = fullYears();
    const sum = (r, f, h) => aggPair(r, f, f, h)[0];
    const item = (r, name, sh) => {
      const a1 = sum(r, "a", hh), a0 = sum(r, "a", hh - 10);
      return {
        k: r, name, share: sh,
        chg: ok(a1) && a0 ? (a1 / a0 - 1) * 100 : null,
        vals: years.map((y) => { const p = sum(r, "a", H.indexOf(`${y}-1`)), q = sum(r, "a", H.indexOf(`${y}-2`)); return ok(p) && ok(q) ? (p + q) / 2 : null; }),
      };
    };
    const base = hh - 10 >= 0 ? `${halfShort(hh - 10)}→${halfShort(hh)}` : "";
    if (level(k) === 0) return { mode: "sido", from: years[0], to: years.at(-1), base, items: SIDO_CODES.map((c) => item(c, shortLabel(c), share(...aggPair(c, "a", "t", hh)))) };
    return { mode: "unit", from: years[0], to: years.at(-1), base, items: UNITS_BY_SIDO[sidoOf(k)].map((u) => item(u, label(u), uShare(u, hh))) };
  }
  // ---------- 오른쪽 2 (시군을 골랐을 때): 그 시군의 지표 ----------
  // 지표마다 지금 값 · 시도 값과 시도 안 순위 · 2013~ 추이(상·하반기 평균)
  function fullYears() { return [...new Set(H.map((x) => x.slice(0, 4)))].filter((y) => H.includes(`${y}-1`) && H.includes(`${y}-2`)); }
  const DETAIL = [
    { name: "농림어업 비중", get: (u, h) => uShare(u, h), agg: (s, h) => share(...aggPair(s, "a", "t", h)), fmt: pct, src: "거주지 기준" },
    { name: "근무지 기준 비중", get: (u, h) => share(uAt(u, "wa", h), uAt(u, "wt", h)), agg: (s, h) => share(...aggPair(s, "wa", "wt", h)), fmt: pct, src: "근무지 기준" },
    { name: "65세 이상 비중", get: (u, h) => share(uAt(u, "yo", h), uAt(u, "yt", h)), agg: (s, h) => share(...aggPair(s, "yo", "yt", h)), fmt: pct, src: "지역 취업자 전체" },
  ];
  function renderUnitDetail() {
    const u = state.key, s = sidoOf(u), h = state.h, peers = UNITS_BY_SIDO[s];
    const years = fullYears();
    const yearly = (f) => years.map((y) => { const p = f(u, H.indexOf(`${y}-1`)), q = f(u, H.indexOf(`${y}-2`)); return ok(p) && ok(q) ? (p + q) / 2 : null; });
    const rank = (f) => {
      const list = peers.map((p) => [p, f(p, h)]).filter(([, v]) => ok(v)).sort((a, b) => b[1] - a[1]);
      const i = list.findIndex(([p]) => p === u);
      return i >= 0 ? `${i + 1}위/${list.length}` : "";
    };
    // 지표 카드 셋: 값 · 시도 값과 시도 안 순위 · 추이 (선 색은 시도 값보다 높으면 초록, 낮으면 파랑)
    $("#unit-detail").innerHTML = DETAIL.map((d) => {
      const v = d.get(u, h), sv = d.agg(s, h);
      const cls = ok(v) && ok(sv) ? (v >= sv ? "" : " neg") : " flat";
      return `<div class="em-dc${cls}" title="${d.name} · ${d.src} · 추이 ${years[0]}~${years.at(-1)} (상·하반기 평균)"><span class="em-dn">${d.name}</span><span class="em-dvr"><b class="em-dval">${d.fmt(v)}</b><span class="em-drk">${rank(d.get)}</span></span>`
        + `<span class="em-dsub">${shortLabel(s)} ${d.fmt(sv)}</span><div class="em-dsp em-dsp-v">${detailSpark(yearly(d.get), years, d.fmt)}</div></div>`;
    }).join("");
  }

  function renderSeason() {
    const k = state.key, sk = level(k) === 2 ? sidoOf(k) : k;
    const unit = level(k) === 2;
    $("#tiles").hidden = unit;
    $("#unit-detail").hidden = !unit;
    if (unit) {
      $("#trend-title").firstChild.textContent = `${label(k)} `;
      $("#season-scope").textContent = "";
      $("#trend-when").textContent = `${halfShort(state.h)} · 지역별`;
      $("#trend-note").textContent = `지역별고용조사 시군구 표. 추이는 ${fullYears()[0]}~${fullYears().at(-1)} 상·하반기 평균, 선 색은 시도 값보다 높으면 초록·낮으면 파랑. 순위는 큰 값부터.`;
      renderUnitDetail();
      return;
    }
    const T0 = trendItems();
    $("#trend-title").firstChild.textContent = T0.mode === "sido" ? "시도별 흐름 " : "시군별 흐름 ";
    $("#season-scope").textContent = `(${shortLabel(sk)})`;
    $("#trend-when").textContent = `${T0.from}~${T0.to} · 지역별 연평균`;
    const items = T0.items.filter((d) => d.vals.filter(ok).length >= 2).sort((a, b) => (b.share ?? -1) - (a.share ?? -1));
    $("#tiles").innerHTML = items.map((d) => `<button type="button" class="em-tile${d.k === k ? " sel" : ""}${ok(d.chg) && d.chg < 0 ? " neg" : ""}" data-k="${d.k}" title="${esc(d.name)} · 농림어업 취업자 ${T0.from}~${T0.to} 연평균(지역별) · 비중 ${pct(d.share)} · ${T0.base} ${pctS(d.chg)}">`
      + `<span class="em-tn">${esc(d.name)}</span><span class="em-ts">${pct(d.share)}</span>${spark(d.vals)}<span class="em-tc">${pctS(d.chg)}</span></button>`).join("");
    $$("#tiles .em-tile").forEach((b) => b.addEventListener("click", () => select(b.dataset.k)));
    $("#trend-note").textContent = T0.mode === "sido"
      ? `칸: 시도 농림어업 취업자 추이(상·하반기 평균, 시군 합), 비중·증감은 ${T0.base}. 누르면 그 시도로.`
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
    $("#place-scope").textContent = level(k) ? `(${label(k)})` : "";
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
      line.innerHTML = `시군 ${pts.length}곳: 농업 비중이 높을수록 65세 이상도 많다 <span class="em-dim" title="상관계수">(r ${fit.r.toFixed(2)})</span>`
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
    // 거주지·근무지 기준: 지역별고용조사 시군구/산업별 취업자 두 표의 농림어업 값을 나란히 (해석 없이 차이만)
    const [a, wa] = aggPair(k, "a", "wa", hh);
    if (ok(a) && ok(wa)) {
      const d = wa - a, mx = Math.max(a, wa), rel = (d / a) * 100;
      const diff = Math.abs(d) < 0.05 ? "두 기준이 같음"
        : `근무지 기준이 거주지 기준보다 <b class="${d > 0 ? "em-acc" : "em-cool"}">${peopleText(Math.abs(d))}</b> (${nf0.format(Math.abs(rel))}%) ${d > 0 ? "많음" : "적음"}`;
      out.push(`<div class="em-fg"><h3>거주지·근무지 기준 <small>농림어업 취업자</small></h3>
        <div class="em-fr" title="이 지역에 사는 취업자 중 농림어업 (DT_1ES3A30S)"><span>거주지 기준</span>${hbar(a, mx, "res")}<b>${peopleText(a)}</b></div>
        <div class="em-fr" title="이 지역에서 일하는 취업자 중 농림어업 (DT_1ES3C06S)"><span>근무지 기준</span>${hbar(wa, mx, "work")}<b>${peopleText(wa)}</b></div>
        <p class="em-fmsg">${diff}</p>
        <p class="em-fsrc" title="거주지 기준: 이 지역에 사는 취업자 · 근무지 기준: 이 지역에서 일하는 취업자">출처: 지역별고용조사 시군구/산업별 취업자 (거주지·근무지 기준)</p></div>`);
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
      out.push(`<div class="em-fg"><h3>5년 변화 <small>${halfShort(hh - 10)} → ${halfShort(hh)} · 거주지 기준</small></h3>
        <div class="em-gr em-gh"><span></span><span>농림어업 취업자</span><span>전체 취업자</span></div>
        ${rows.map((d) => `<div class="em-gr${d.r === k ? " me" : ""}"><span>${esc(shortLabel(d.r))}</span><span class="em-gc">${dv(d.ga, "agri")}</span><span class="em-gc">${dv(d.gt, "all")}</span></div>`).join("")}</div>`);
    }
    $("#flow").innerHTML = out.join("") || `<p class="note">이 반기에는 ${esc(fullLabel(k))} 자료가 없습니다.</p>`;
  }

  // ---------- 왼쪽 2: 시도별 월별 동향 (경활, 전국·시도) ----------
  // 지역별고용조사(반기)보다 자주·최근까지 나오는 경활 월 자료로 '요즘'을 본다. 시군을 고르면 그 시도
  const pulseKey = ekey;
  const mYoy = (k, i) => { const a = mAt(k, "a", i), b = mAt(k, "a", i - 12); return ok(a) && ok(b) && b ? (a / b - 1) * 100 : null; };
  function renderPulse() {
    const k = pulseKey(), i = lastMonth(NATION);
    $("#pulse-when").textContent = i >= 0 ? `경활 · ${monthText(i)}까지` : "경활";
    $("#pulse-line").innerHTML = `농림어업 취업자, 전년 같은 달 대비 증감 · 최근 12개월 <span class="em-dim">누르면 그 시도로${level(state.key) ? ` · ${shortLabel(k)} 표시` : ""}</span>`;
    drawBand();
    renderYoyGrid();
  }
  // 월별: 올해 · 작년 · 직전 5년 범위
  function drawBand() {
    const k = pulseKey(), i = lastMonth(k);
    const el = $("#chart-band");
    const { svg, w, h } = frame(el, 90);
    if (i < 0) { empty(svg); return; }
    const y0 = +M[i].slice(0, 4);
    const idx = (y, m) => M.indexOf(`${y}-${String(m).padStart(2, "0")}`);
    const months = d3.range(1, 13);
    const band = months.map((m) => { const vs = [1, 2, 3, 4, 5].map((d) => mAt(k, "a", idx(y0 - d, m))).filter(ok); return vs.length >= 3 ? [d3.min(vs), d3.max(vs)] : null; });
    const cur = months.map((m) => { const j = idx(y0, m); return j >= 0 && j <= i ? mAt(k, "a", j) : null; });
    const prev = months.map((m) => mAt(k, "a", idx(y0 - 1, m)));
    const all = [...band.flat().filter(ok), ...cur.filter(ok), ...prev.filter(ok)];
    const m = { l: 38, r: 6, t: 6, b: 14 };
    const x = d3.scalePoint().domain(months).range([m.l, w - m.r]).padding(0.3);
    const y = d3.scaleLinear().domain([d3.min(all) * 0.94, d3.max(all) * 1.03]).nice(3).range([h - m.b, m.t]);
    const yt = y.ticks(3);
    gridY(svg, y, h < 64 ? [yt[0], yt.at(-1)] : yt, m.l, w - m.r, (d) => (d >= 10 ? `${nf0.format(d / 10)}만` : `${nf0.format(d * 1000)}`)); // 낮은 그림은 눈금 둘만
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(months).join("text").attr("x", (d) => x(d)).attr("y", h - 2).attr("text-anchor", "middle").text((d) => d);
    svg.append("path").attr("class", "pw-bandarea").attr("d", d3.area().defined((d) => d).x((d, j) => x(months[j])).y0((d) => y(d[0])).y1((d) => y(d[1])).curve(d3.curveMonotoneX)(band));
    const line = d3.line().defined(ok).x((d, j) => x(months[j])).y((d) => y(d)).curve(d3.curveMonotoneX);
    svg.append("path").attr("class", "pw-prev").attr("d", line(prev));
    svg.append("path").attr("class", "em-l-agri").attr("d", line(cur));
    const lm = +M[i].slice(5);
    svg.append("circle").attr("class", "em-hdot").attr("cx", x(lm)).attr("cy", y(cur[lm - 1])).attr("r", 3.5);
    // 마우스: 그달 세로선·점, 값은 그림 위 상자로 (브라우저 툴팁은 늦게 뜨거나 안 뜬다)
    const hv = svg.append("g").attr("class", "em-hover").style("display", "none");
    const ln = hv.append("line").attr("y1", m.t).attr("y2", h - m.b);
    const dPrev = hv.append("circle").attr("class", "em-bdot prev").attr("r", 2.8);
    const dCur = hv.append("circle").attr("class", "em-bdot").attr("r", 3.2);
    const tip = d3.select(el).append("div").attr("class", "em-btip").style("display", "none");
    svg.append("g").selectAll("rect").data(months).join("rect").attr("x", (d) => x(d) - x.step() / 2).attr("width", x.step()).attr("y", 0).attr("height", h).attr("fill", "transparent")
      .on("mouseenter", (e, d) => {
        const c = cur[d - 1], p = prev[d - 1], b = band[d - 1];
        hv.style("display", null);
        ln.attr("x1", x(d)).attr("x2", x(d));
        dCur.style("display", ok(c) ? null : "none").attr("cx", x(d)).attr("cy", ok(c) ? y(c) : 0);
        dPrev.style("display", ok(p) ? null : "none").attr("cx", x(d)).attr("cy", ok(p) ? y(p) : 0);
        tip.style("display", null).classed("r", x(d) > w / 2).style("left", x(d) > w / 2 ? null : `${x(d) + 8}px`).style("right", x(d) > w / 2 ? `${w - x(d) + 8}px` : null)
          .html(`<b>${d}월</b> ${y0}년 <b>${peopleText(c)}</b> · ${y0 - 1}년 ${peopleText(p)}${b ? `<br><span>직전 5년 ${peopleText(b[0])}~${peopleText(b[1])}</span>` : ""}`);
      })
      .on("mouseleave", () => { hv.style("display", "none"); tip.style("display", "none"); });
    $("#band-key").innerHTML = `<span><i class="em-k-agri"></i>${y0}년</span><span><i class="prev"></i>${y0 - 1}년</span><span><i class="band"></i>${y0 - 5}~${y0 - 1}년 범위</span>${seasonText(k)}`;
    const past = [1, 2, 3, 4, 5].map((d) => mAt(k, "a", i - 12 * d)).filter(ok);
    const dev = past.length >= 3 ? (mAt(k, "a", i) / d3.mean(past) - 1) * 100 : null;
    $("#band-note").textContent = `${+M[i].slice(5)}월은 직전 5년 같은 달 평균보다 ${pctS(dev)}`;
  }
  // 시도 × 최근 12개월: 전년 같은 달 대비 증감 색
  // 감소 파랑 · 0 회색 · 증가 빨강 (지도 증감 색과 같은 계열)
  const YOY_RAMP = ["#3d7fc4", "#2b3038", "#e0574c"];
  function renderYoyGrid() {
    const sel = pulseKey();
    const cols = d3.range(Math.max(12, ML - 11), ML + 1);
    // 농림어업 취업자가 3천 명도 안 되는 시도(서울)는 증감이 표본 흔들림뿐이라 뺀다
    const rows = [NATION, ...SIDO_CODES].filter((k) => E.m[k] && mAt(k, "a", lastMonth(k)) >= 3);
    const lim = 12;
    const col = d3.scaleDiverging([-lim, 0, lim], d3.interpolateRgbBasis(YOY_RAMP)).clamp(true);
    const head = `<span></span>${cols.map((j) => `<span class="em-yh${M[j].endsWith("-01") ? " jan" : ""}" title="${monthText(j)}">${+M[j].slice(5)}</span>`).join("")}`;
    const body = rows.map((k) => `<button type="button" class="em-yr${k === sel ? " sel" : ""}${k === NATION ? " nat" : ""}" data-k="${k}"><span class="em-yl">${shortLabel(k)}</span>`
      + cols.map((j) => { const v = mYoy(k, j); return `<i style="background:${ok(v) ? col(v) : "transparent"}" title="${shortLabel(k)} ${monthText(j)} · 전년 같은 달 대비 ${pctS(v)} · ${peopleText(mAt(k, "a", j))}"></i>`; }).join("") + `</button>`).join("");
    $("#ygrid").innerHTML = `<div class="em-yrow em-yhead">${head}</div>${body}`;
    $("#ygrid-key").innerHTML = `<span>감소</span><i style="background:linear-gradient(90deg,${YOY_RAMP.join(",")})"></i><span>증가</span><span class="em-k-n">−${lim}% · 0 · +${lim}%</span>`;
    $$("#ygrid .em-yr").forEach((b) => b.addEventListener("click", () => select(b.dataset.k)));
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
    renderMix();
    renderPlace();
    renderFlow();
    renderPulse();
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
  const redraw = { "chart-long": drawLong, "chart-scatter": renderPlace, "chart-band": drawBand };
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
