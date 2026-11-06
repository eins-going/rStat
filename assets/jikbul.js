(() => {
  // 공익직불 — 지자체 예산에 편성된 농업 공익직불(기본형·선택형) 예산 (data/jikbul.js, 지방재정365 세부사업)
  // 시도·전국 값은 시군 합계(도 본청은 시군으로 내려가는 국비라 빼고, 시군이 없는 세종·제주만 본청).
  // 지도·지역 체계는 농업금융보험(agfin.js)·농사용 전기(power.js)와 같다.
  const J = window.AGRI_JIKBUL;
  const T = window.AGRI_TOPO;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ---------- 지역 ----------
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
  const childrenOf = (k) => (level(k) === 0 ? SIDO_CODES : level(k) === 1 ? UNITS_BY_SIDO[k] : []);
  // 제주는 행정시라 예산이 도에만 있다 → 시군 칸은 비고 도 값만
  const noUnitBudget = (k) => level(k) === 2 && sidoOf(k) === "39";

  // ---------- 숫자 ----------
  const nf0 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const ok = (n) => n != null && Number.isFinite(n);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // 백만원 → 억·조
  const mil = (v) => (!ok(v) ? ["–", ""] : Math.abs(v) >= 1e6 ? [nf1.format(v / 1e6), "조원"] : Math.abs(v) >= 1e4 ? [nf0.format(v / 100), "억원"] : Math.abs(v) >= 100 ? [nf1.format(v / 100), "억원"] : [nf0.format(v), "백만원"]);
  const milS = (v) => mil(v).join("");
  const eok1 = (v) => (!ok(v) ? "–" : Math.abs(v) < 1000 ? nf1.format(v / 100) : nf0.format(v / 100)); // 백만원 → 억원 숫자만
  const man = (won) => (!ok(won) ? ["–", ""] : won >= 1e8 ? [nf1.format(won / 1e8), "억원"] : [nf0.format(won / 1e4), "만원"]);
  const manS = (w) => man(w).join("");
  const pctS = (v, d = 1) => (ok(v) ? `${v.toFixed(d)}%` : "–");

  // ---------- 자료 ----------
  const P = J.periods;
  const ALLC = [...J.cats, ...J.refs];
  const CI = Object.fromEntries(ALLC.map((c, i) => [c, i]));
  const FI = Object.fromEntries(J.fields.map((f, i) => [f, i])); // amt nat sido sigun ep
  const isFull = (i) => P[i].d.endsWith("1231");
  const pLabel = (i) => (isFull(i) ? `${P[i].y}년` : `${P[i].y}년 (${+P[i].d.slice(4, 6)}월 말)`);
  const pShort = (i) => (isFull(i) ? `${P[i].y}` : `${String(P[i].y).slice(2)}.${+P[i].d.slice(4, 6)}`);
  const cell = (k, i, c) => J.regions[k]?.[i]?.[CI[c]] ?? null;          // [amt, nat, sido, sigun, ep]
  const sumC = (k, i, cats, f = "amt") => {
    const r = J.regions[k]?.[i];
    if (!r) return null;
    return cats.reduce((s, c) => s + (r[CI[c]]?.[FI[f]] || 0), 0);
  };
  const PUB = J.cats;                       // 공익직불 = 기본형 + 선택형 + 행정·점검
  const pub = (k, i, f = "amt") => sumC(k, i, PUB, f);
  const hh = (k) => J.den.households[k] ?? null;
  const land = (k) => J.den.land[k] ?? null;
  // 농업·농촌 예산: 시군은 그 지자체, 시도·전국은 시군 합계(본청 예산과 겹치지 않게 공익직불과 같은 기준)
  function agri(k, i) {
    if (level(k) === 2) return J.den.agri[k]?.[i] ?? null;
    const units = level(k) === 1 ? UNITS_BY_SIDO[k] : ALL_UNITS;
    const vals = units.map((u) => J.den.agri[u]?.[i]).filter(ok);
    return vals.length ? vals.reduce((a, b) => a + b, 0) : null;
  }
  const DEFAULT_P = P.length - 1;

  // ---------- 지도 지표 ----------
  const METRICS = [
    { key: "amt", group: "규모", chip: "예산", label: "공익직불 예산", get: (k, i) => pub(k, i), fmt: milS, note: "기본형·선택형·행정비를 더한 예산현액(추경·이월 반영)" },
    { key: "basic", group: "규모", chip: "기본형", label: "기본형 공익직불 예산", get: (k, i) => sumC(k, i, ["기본형"]), fmt: milS, note: "소농·면적직불. 지자체가 얹어 주는 몫(시군비)도 함께" },
    { key: "select", group: "규모", chip: "선택형", label: "선택형 공익직불 예산", get: (k, i) => sumC(k, i, J.select), fmt: milS, note: "경관보전·친환경·전략작물·저탄소 직불" },
    { key: "farm", group: "견주기", chip: "농가당", label: "농가당 공익직불 예산", get: (k, i) => { const a = pub(k, i), h = hh(k); return ok(a) && h ? (a * 1e6) / h : null; }, fmt: manS, note: `예산 ÷ 농가 수(${J.den.years.households}년 농림어업조사)` },
    { key: "ha", group: "견주기", chip: "ha당", label: "경지 1ha당 공익직불 예산", get: (k, i) => { const a = pub(k, i), l = land(k); return ok(a) && l ? (a * 1e6) / l : null; }, fmt: manS, note: `예산 ÷ 경지면적(${J.den.years.land}년 농업면적조사)` },
    { key: "share", group: "견주기", chip: "농업예산", label: "농업·농촌 예산 중 공익직불 비중", get: (k, i) => { const a = pub(k, i), b = agri(k, i); return ok(a) && b ? (a / b) * 100 : null; }, fmt: (v) => pctS(v), note: "그 지자체의 농업·농촌 분야 세출 예산(지방재정365 기능별) 가운데 공익직불 몫" },
    { key: "local", group: "재원·집행", chip: "지방비", label: "공익직불 예산 중 지방비 비율", get: (k, i) => { const a = pub(k, i); return a ? ((pub(k, i, "sido") + pub(k, i, "sigun")) / a) * 100 : null; }, fmt: (v) => pctS(v), note: "시도비+시군비 ÷ 예산. 기본형은 거의 국비라, 지방비는 주로 경관보전·친환경 매칭과 지자체가 얹어 주는 몫" },
    { key: "exec", group: "재원·집행", chip: "집행률", label: "공익직불 집행률", get: (k, i) => { const a = pub(k, i); return a ? (pub(k, i, "ep") / a) * 100 : null; }, fmt: (v) => pctS(v), note: "지출액 ÷ 예산. 직불금은 11~12월에 지급되어 올해 값은 연말에야 채워진다" },
  ];
  const DEFAULT_METRIC = METRICS[0];
  const state = { key: NATION, p: DEFAULT_P, metric: DEFAULT_METRIC, sort: "amt" };
  const mval = (m, k, i = state.p) => (noUnitBudget(k) ? null : m.get(k, i));

  // ---------- 선택 ----------
  const selSido = $("#sido"), selSgg = $("#sgg"), selYear = $("#year");
  selSido.innerHTML = `<option value="${NATION}">전국</option>` + SIDO_CODES.map((s) => `<option value="${s}">${T.sidos[s].name}</option>`).join("");
  selYear.innerHTML = P.map((_, i) => `<option value="${i}">${pLabel(i)}</option>`).reverse().join("");
  selSido.addEventListener("change", () => select(selSido.value));
  selSgg.addEventListener("change", () => select(selSgg.value || selSido.value));
  selYear.addEventListener("change", () => { state.p = +selYear.value; render(false); });
  function syncControls() {
    const s = sidoOf(state.key);
    selSido.value = s || NATION;
    selSgg.disabled = !s;
    selSgg.innerHTML = `<option value="">${s ? "전체" : "–"}</option>` + (s ? UNITS_BY_SIDO[s].map((k) => `<option value="${k}">${label(k)}</option>`).join("") : "");
    selSgg.value = level(state.key) === 2 ? state.key : "";
    selYear.value = state.p;
  }
  // 주소: #전라남도/해남군?y=2025&m=ha
  function syncURL() {
    const k = state.key;
    const path = k === NATION ? "" : level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`;
    const q = new URLSearchParams();
    if (state.p !== DEFAULT_P) q.set("y", P[state.p].y);
    if (state.metric !== DEFAULT_METRIC) q.set("m", state.metric.key);
    const url = `${location.pathname}${q.toString() ? `?${q}` : ""}${path ? `#${encodeURIComponent(path)}` : ""}`;
    if (url !== location.pathname + location.search + location.hash) history.replaceState(null, "", url);
  }
  function fromURL() {
    const [a, b] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = SIDO_CODES.find((c) => T.sidos[c].name === a || T.sidos[c].short === a);
    state.key = s ? (b && UNITS_BY_SIDO[s].find((k) => label(k) === b)) || s : NATION;
    const q = new URLSearchParams(location.search);
    const pi = P.findIndex((p) => String(p.y) === q.get("y"));
    state.p = pi >= 0 ? pi : DEFAULT_P;
    state.metric = METRICS.find((m) => m.key === q.get("m")) || DEFAULT_METRIC;
  }

  // ---------- 지도 (agfin.js와 같다) ----------
  const RAMP = ["#3b3428", "#5e4925", "#8a6322", "#c0841f", "#f5a524"];
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
  const pan = window.rstatPan(mapSvg, (t) => {
    view = t;
    mapSvg.select("g.world").interrupt().attr("transform", t);
    tip.hidden = true;
    drawLabels(t, false);
  }, () => applyView(true));

  const pickSido = (k) => level(state.key) === 0 || sidoOf(k) !== sidoOf(state.key);
  function onRegionClick(k) {
    if (pickSido(k)) select(sidoOf(k));
    else if (k === state.key) select(sidoOf(k));
    else select(k);
  }
  function hoverRegion(e, k) {
    const m = state.metric;
    let html = `<b>${esc(fullLabel(k))}</b>`;
    html += noUnitBudget(k) ? "제주는 행정시라 예산이 도에만 있음" : `${m.label} <b style="display:inline">${m.fmt(mval(m, k))}</b><br>${pLabel(state.p)}`;
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
  function scaleFor(m, vals) {
    if (!vals.length) return { fn: () => EMPTY, rows: [] };
    const q = d3.scaleQuantile().domain(vals).range(RAMP);
    const e = [d3.min(vals), ...q.quantiles(), d3.max(vals)];
    return { fn: q, rows: RAMP.map((c, i) => [c, `${m.fmt(e[i])}–${m.fmt(e[i + 1])}`]) };
  }
  // 시군 색칠: 값이 있는 시군끼리 다섯 구간 (농가·경지가 아주 적은 도시 지역은 '견주기'에서 튀므로 농가 300호 미만은 뺀다)
  const tiny = (k) => (hh(k) ?? 0) < 300;
  function paintMap() {
    const m = state.metric, s = sidoOf(state.key);
    const skip = (k) => m.group === "견주기" && tiny(k);
    const vals = ALL_UNITS.filter((k) => !skip(k)).map((k) => mval(m, k)).filter(ok);
    const sc = scaleFor(m, vals);
    const missing = ALL_UNITS.filter((k) => !ok(mval(m, k)) || skip(k)).length;
    mapSvg.selectAll("path.unit").attr("fill", (d) => { const k = d.properties.key, v = mval(m, k); return ok(v) && !skip(k) ? sc.fn(v) : EMPTY; })
      .classed("sel", (d) => d.properties.key === state.key)
      .classed("pw-ctx", (d) => !!s && d.properties.sido !== s)
      .attr("aria-label", (d) => `${fullLabel(d.properties.key)} ${m.label}`);
    mapSvg.selectAll("path.unit.sel").raise();
    mapSvg.classed("dimmed", level(state.key) === 2);
    $("#legend").innerHTML = `<span class="title">${m.label} <span style="color:var(--faint);font-weight:400">${pLabel(state.p)}</span></span>`
      + sc.rows.map(([c, t]) => `<span class="row"><span class="sw" style="background:${c}"></span>${t}</span>`).join("")
      + (missing ? `<span class="row"><span class="sw" style="background:${EMPTY};outline:1px solid #3a3f48"></span>${m.group === "견주기" ? "자료 없음·농가 300호 미만" : "자료 없음"} ${missing}</span>` : "");
    $("#metric-note").textContent = m.note;
  }
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
  function renderRank() {
    const m = state.metric, s = sidoOf(state.key);
    const peers = (s ? UNITS_BY_SIDO[s] : ALL_UNITS).filter((k) => !(m.group === "견주기" && tiny(k)));
    const list = peers.map((k) => [k, mval(m, k)]).filter(([, v]) => ok(v)).sort((a, b) => b[1] - a[1]);
    const name = (k) => (s ? label(k) : fullLabel(k));
    const max = Math.max(...list.map(([, v]) => Math.abs(v)), 0) || 1;
    const row = ([k, v], no) => `
      <button type="button" class="rank-row wide${k === state.key ? " sel" : ""}" data-r="${k}">
        <span class="no">${no}</span><span class="nm">${esc(name(k))}</span>
        <span class="track"><span class="fill" style="width:${(Math.abs(v) / max) * 100}%"></span></span>
        <span class="val">${m.fmt(v)}</span><span></span>
      </button>`;
    const top = list.slice(0, 10);
    $("#rank").innerHTML = list.length ? `
      <div class="rank-title"><span><b>${m.label}</b> 상위 ${s ? `${T.sidos[s].short} 시군` : "시군"}</span><span class="rank-meta">${pLabel(state.p)}</span></div>
      <div>${top.slice(0, 5).map((d, j) => row(d, j + 1)).join("")}</div>
      <div>${top.slice(5).map((d, j) => row(d, j + 6)).join("")}</div>` : "";
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => select(b.dataset.r)));
  }

  // ---------- 왼쪽: 예산 요약 ----------
  function setStat(key, [v, u]) {
    $(`[data-v="${key}"]`).textContent = v;
    $(`[data-u="${key}"]`).textContent = u;
  }
  const scopeKey = () => (noUnitBudget(state.key) ? sidoOf(state.key) : state.key);
  function renderSum() {
    const k = scopeKey(), i = state.p;
    $("#sum-scope").textContent = `(${fullLabel(k)}${noUnitBudget(state.key) ? " 도 전체" : ""})`;
    $$("[data-year]").forEach((el) => { el.textContent = pLabel(i); });
    const a = pub(k, i);
    setStat("amt", mil(a));
    setStat("farm", hh(k) && ok(a) ? man((a * 1e6) / hh(k)) : ["–", ""]);
    setStat("ha", land(k) && ok(a) ? man((a * 1e6) / land(k)) : ["–", ""]);
    const b = agri(k, i);
    setStat("share", ok(a) && b ? [nf1.format((a / b) * 100), "%"] : ["–", ""]);
    const parts = [["국비", pub(k, i, "nat"), "n"], ["시도비", pub(k, i, "sido"), "s"], ["시군비", pub(k, i, "sigun"), "g"]];
    const tot = parts.reduce((s, [, v]) => s + (v || 0), 0) || 1;
    $("#fund-stack").innerHTML = parts.filter(([, v]) => v > 0).map(([, v, c]) => `<i class="jb-f${c}" style="flex-grow:${v / tot}"></i>`).join("");
    $("#fund-key").innerHTML = parts.map(([t, v, c]) => `<span><i class="jb-f${c}"></i>${t} <b>${milS(v)}</b> <em>${pctS(((v || 0) / tot) * 100)}</em></span>`).join("");
    const ep = pub(k, i, "ep");
    $("#exec-line").innerHTML = ok(a) && a
      ? `지출 <b>${milS(ep)}</b> · 집행률 <b>${pctS((ep / a) * 100)}</b>${isFull(i) ? "" : ` <span class="jb-dim">(${+P[i].d.slice(4, 6)}월 말까지 · 직불금은 11~12월 지급)</span>`}`
      : "";
  }

  // 유형별: 막대(예산) · 금액 · 지방비 비율
  const CAT_COLOR = { 기본형: "#f5a524", 경관보전: "#5fb37c", 친환경: "#8fd17a", 전략작물: "#5fb3ff", 저탄소: "#b48cff", "행정·점검": "#6d7380" };
  function renderCats() {
    const k = scopeKey(), i = state.p;
    const rows = PUB.map((c) => { const v = cell(k, i, c) || [0, 0, 0, 0, 0]; return { c, amt: v[0], loc: v[2] + v[3] }; });
    const max = Math.max(...rows.map((r) => r.amt), 0) || 1;
    $("#cat-unit").textContent = "억원 · 지방비";
    $("#cat-bars").innerHTML = rows.map((r) => `
      <div class="jb-cat${r.amt ? "" : " zero"}" title="${esc(r.c)} ${milS(r.amt)} · 지방비 ${milS(r.loc)}">
        <span class="jb-cl"><i style="background:${CAT_COLOR[r.c]}"></i>${esc(r.c)}${J.select.includes(r.c) ? "<em>선택형</em>" : ""}</span>
        <span class="af-track"><i style="width:${(r.amt / max) * 100}%;background:${CAT_COLOR[r.c]}"></i></span>
        <b>${eok1(r.amt)}</b><span class="jb-loc">${r.amt ? pctS((r.loc / r.amt) * 100, 0) : ""}</span>
      </div>`).join("");
    const top = rows.slice().sort((a, b) => b.amt - a.amt)[0];
    const sel = rows.filter((r) => J.select.includes(r.c)).reduce((s, r) => s + r.amt, 0);
    const all = rows.reduce((s, r) => s + r.amt, 0);
    $("#cat-note").textContent = all ? `${top.c}이 ${pctS((top.amt / all) * 100, 0)}, 선택형이 ${pctS((sel / all) * 100, 0)}입니다. 오른쪽 끝 숫자는 그 유형 예산 가운데 지방비(시도비+시군비) 비율.` : "자료 없음";
  }

  // 연도별: 기본형·선택형·행정 쌓은 막대. 전국은 농식품부 예산(e-나라지표, 기본형+선택형)을 점으로
  function frame(el, h0) {
    const w = el.clientWidth || 300, h = el.clientHeight || h0;
    el._wh = [w, h];
    el.innerHTML = "";
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    return { svg, w, h };
  }
  const STACK = [["기본형", ["기본형"], "#f5a524"], ["선택형", J.select, "#5fb3ff"], ["행정·점검", ["행정·점검"], "#6d7380"]];
  function drawYears() {
    const k = scopeKey(), el = $("#chart-years");
    const { svg, w, h } = frame(el, 130);
    $("#years-range").textContent = `${pShort(0)}~${pShort(P.length - 1)}`;
    const rows = P.map((_, i) => ({ i, parts: STACK.map(([, cats]) => sumC(k, i, cats) || 0), ext: k === NATION ? J.ext["공익직불"][i] : null }));
    const top = d3.max(rows, (r) => Math.max(d3.sum(r.parts), r.ext || 0));
    if (!top) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text("자료 없음"); $("#years-key").innerHTML = ""; return; }
    const m = { l: 46, r: 6, t: 8, b: 18 };
    const x = d3.scaleBand().domain(rows.map((r) => r.i)).range([m.l, w - m.r]).padding(0.3);
    const y = d3.scaleLinear().domain([0, top * 1.05]).nice(3).range([h - m.b, m.t]);
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(y.ticks(3)).join("g").call((g) => {
      g.append("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (d) => y(d)).attr("y2", (d) => y(d));
      g.append("text").attr("x", m.l - 5).attr("y", (d) => y(d) + 4).attr("text-anchor", "end").text((d) => (d ? milS(d) : "0"));
    });
    const grp = svg.append("g").selectAll("g").data(rows).join("g").attr("transform", (r) => `translate(${x(r.i)},0)`);
    grp.filter((r) => r.i === state.p).append("rect").attr("class", "af-ysel").attr("x", -3).attr("width", x.bandwidth() + 6).attr("y", m.t - 4).attr("height", h - m.t - m.b + 4);
    STACK.forEach(([name, , color], j) => {
      grp.append("rect").attr("x", 0).attr("width", x.bandwidth())
        .attr("y", (r) => y(d3.sum(r.parts.slice(0, j + 1)))).attr("height", (r) => y(d3.sum(r.parts.slice(0, j))) - y(d3.sum(r.parts.slice(0, j + 1))))
        .attr("fill", color).classed("af-partial", (r) => !isFull(r.i))
        .append("title").text((r) => `${pLabel(r.i)} ${name} ${milS(r.parts[j])}`);
    });
    if (k === NATION) {
      grp.filter((r) => ok(r.ext)).append("line").attr("class", "jb-ext").attr("x1", -4).attr("x2", x.bandwidth() + 4).attr("y1", (r) => y(r.ext)).attr("y2", (r) => y(r.ext))
        .append("title").text((r) => `${P[r.i].y}년 농식품부 공익직불 예산(기본형+선택형) ${milS(r.ext)}`);
    }
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(rows).join("text")
      .attr("x", (r) => x(r.i) + x.bandwidth() / 2).attr("y", h - 4).attr("text-anchor", "middle").text((r) => pShort(r.i));
    svg.append("g").selectAll("rect").data(rows).join("rect").attr("x", (r) => x(r.i)).attr("width", x.bandwidth()).attr("y", 0).attr("height", h)
      .attr("fill", "transparent").style("cursor", "pointer").on("click", (e, r) => { state.p = r.i; render(false); })
      .append("title").text((r) => `${pLabel(r.i)} 보기`);
    $("#years-key").innerHTML = STACK.map(([n, , c]) => `<span><i style="height:9px;background:${c}"></i>${n}</span>`).join("")
      + (k === NATION ? `<span><i class="jb-k-ext"></i>농식품부 예산</span>` : "")
      + (isFull(P.length - 1) ? "" : `<span>${pShort(P.length - 1)}: ${+P.at(-1).d.slice(4, 6)}월 말 기준(흐리게)</span>`);
  }

  // ---------- 오른쪽: 세부사업 / 하위 지역 ----------
  const CAT_SHORT = { 기본형: "기본", 경관보전: "경관", 친환경: "친환경", 전략작물: "전략", 저탄소: "탄소", "행정·점검": "행정", 임업: "임업", 수산: "수산", FTA: "FTA", 경영이양: "이양", "옛 직불": "옛", "자체·기타": "자체" };
  function renderList() {
    const k = state.key, i = state.p;
    const tbl = $("#list-table");
    if (level(k) === 2 && !noUnitBudget(k)) {
      $("#list-title").firstChild.textContent = "세부사업 ";
      $("#list-scope").textContent = `(${fullLabel(k)})`;
      const rows = (J.biz[k]?.[i] || []);
      $("#list-count").textContent = rows.length ? `${rows.length}개 사업` : "";
      tbl.innerHTML = `<thead><tr><th>사업</th><th>분류</th><th>예산</th><th>지방비</th><th>지출</th></tr></thead><tbody>${rows.length
        ? rows.map(([n, c, amt, , sd, sg, ep]) => `<tr class="${PUB.includes(c) ? "" : "jb-ref"}"><td title="${esc(n)}">${esc(n)}</td><td><span class="jb-tag">${CAT_SHORT[c] || c}</span></td><td>${eok1(amt)}</td><td>${sd + sg ? eok1(sd + sg) : "–"}</td><td>${eok1(ep)}</td></tr>`).join("")
        : `<tr class="af-none"><td colspan="5">${J.biz[k] ? "사업 목록은 최근 두 해만 싣습니다" : "직불 사업이 없습니다"}</td></tr>`}</tbody>`;
      $("#list-note").textContent = "지방재정365에 그 지자체가 올린 세부사업 이름 그대로입니다(억원). 흐린 줄은 공익직불이 아닌 직불(임업·수산·자체 사업 등).";
      return;
    }
    // 전국: 시도별, 시도: 시군별
    const pk = noUnitBudget(k) ? sidoOf(k) : k;
    const kids = childrenOf(pk).filter((c) => !noUnitBudget(c));
    $("#list-title").firstChild.textContent = level(pk) === 0 ? "시도별 " : "시군별 ";
    $("#list-scope").textContent = `(${fullLabel(pk)})`;
    const COLS = [
      ["n", "지역", (c) => label(c)],
      ["amt", "예산", (c) => pub(c, i)],
      ["basic", "기본형", (c) => sumC(c, i, ["기본형"])],
      ["select", "선택형", (c) => sumC(c, i, J.select)],
      ["ha", "ha당", (c) => (land(c) && ok(pub(c, i)) ? (pub(c, i) * 1e6) / land(c) : null)],
    ];
    const [, , get] = COLS.find((x) => x[0] === state.sort) || COLS[1];
    const rows = kids.map((c) => c).sort((a, b) => (state.sort === "n" ? get(a).localeCompare(get(b), "ko") : (get(b) ?? -Infinity) - (get(a) ?? -Infinity)));
    $("#list-count").textContent = `${rows.length}곳`;
    tbl.innerHTML = `<thead><tr>${COLS.map(([f, t]) => `<th><button type="button" data-s="${f}" aria-pressed="${state.sort === f}">${t}</button></th>`).join("")}</tr></thead>
      <tbody>${rows.map((c) => `<tr data-k="${c}" tabindex="0"><td>${esc(level(c) === 1 ? T.sidos[c].short : label(c))}</td><td>${eok1(pub(c, i))}</td><td>${eok1(sumC(c, i, ["기본형"]))}</td><td>${eok1(sumC(c, i, J.select))}</td><td>${(() => { const v = COLS[4][2](c); return ok(v) ? nf0.format(v / 1e4) : "–"; })()}</td></tr>`).join("")}</tbody>`;
    $$("#list-table [data-s]").forEach((b) => b.addEventListener("click", () => { state.sort = b.dataset.s; renderList(); }));
    $$("#list-table tbody tr[data-k]").forEach((tr) => {
      tr.addEventListener("click", () => select(tr.dataset.k));
      tr.addEventListener("keydown", (e) => { if (e.key === "Enter") select(tr.dataset.k); });
    });
    $("#list-note").textContent = `금액 억원, ha당은 만원. 줄을 누르면 그 지역으로 갑니다.${pk === "39" ? " 제주는 행정시라 예산이 도에만 있습니다." : ""}`;
  }

  // ---------- 오른쪽 아래: 검증과 참고 직불 ----------
  function renderCheck() {
    const rows = P.map((_, i) => {
      const loc = sumC(NATION, i, PUB.filter((c) => c !== "행정·점검"), "nat");
      const ext = J.ext["공익직불"][i];
      return { i, loc, ext, r: ext ? (loc / ext) * 100 : null };
    });
    $("#check").innerHTML = `<table class="af-mini jb-check"><thead><tr><th>연도</th><th>농식품부 예산</th><th>시군 예산 국비 합</th><th>비율</th></tr></thead><tbody>${rows.map((r) => `
      <tr class="${r.i === state.p ? "sel" : ""}"><td>${pShort(r.i)}</td><td>${ok(r.ext) ? nf0.format(r.ext / 100) : "–"}</td><td>${nf0.format(r.loc / 100)}</td><td>${pctS(r.r)}</td></tr>`).join("")}</tbody></table>
      <p class="note jb-check-note">기본형+선택형. 왼쪽은 e-나라지표 '직접지불금 현황'의 정부 예산, 가운데는 이 화면이 모은 시군 예산의 국비입니다. 시군을 거치지 않는 몫과 사업 이름이 규칙에 안 걸린 지자체만큼 덜 잡힙니다.</p>`;
    const k = scopeKey(), i = state.p;
    $("#ref-scope").textContent = `${fullLabel(k)} · ${pLabel(i)}`;
    const refs = J.refs.map((c) => [c, cell(k, i, c)?.[0] || 0]);
    const max = Math.max(...refs.map(([, v]) => v), 0) || 1;
    const NOTE = { 임업: "임업·산림 공익직불(산림청)", 수산: "수산 공익직불·소규모어가 등(해수부)", FTA: "FTA 피해보전직불", 경영이양: "경영이양직불", "옛 직불": "2019년까지의 쌀·밭 직불 잔여분", "자체·기타": "청년 취농직불·토종농산물 등 지자체 자체 직불" };
    $("#refs").innerHTML = refs.map(([c, v]) => `<div class="af-bar-row" title="${esc(NOTE[c])}"><span class="af-bar-l">${esc(c)}<em>${esc(NOTE[c])}</em></span><span class="af-track"><i style="width:${(v / max) * 100}%;background:#6d7380"></i></span><b>${v ? milS(v) : "–"}</b></div>`).join("");
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

  function render(animate = true) {
    syncControls();
    syncURL();
    renderHero();
    renderSum();
    renderCats();
    drawYears();
    renderList();
    renderCheck();
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
  $("#built").textContent = `${pLabel(P.length - 1)}까지 · ${J.built} 작성`;
  let mw = 0, mh = 0;
  new ResizeObserver(([e]) => {
    const { width, height } = e.contentRect;
    if (Math.abs(width - mw) < 1 && Math.abs(height - mh) < 1) return;
    mw = width; mh = height;
    drawMap();
    paintMap();
  }).observe($("#map-wrap"));
  new ResizeObserver((entries) => {
    for (const e of entries) {
      const { width, height } = e.contentRect;
      const drawn = e.target._wh;
      if (drawn && Math.abs(drawn[0] - width) < 1 && Math.abs(drawn[1] - height) < 1) continue;
      drawYears();
    }
  }).observe($("#chart-years"));
  window.addEventListener("hashchange", () => { fromURL(); render(true); });
})();
