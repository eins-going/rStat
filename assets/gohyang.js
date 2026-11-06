(() => {
  // 고향사랑기금 — 지방재정365 세부사업 집행(고향사랑기금 회계)으로 지자체별 기금 규모·쓰임·남겨 둔 돈·기금사업을 본다.
  // 자료: data/gohyang.js (scripts/build_gohyang.py). 금액은 백만원, 예산현액·지출액 그대로(모금액 결산이 아니다).
  // 지역 체계·지도는 농업금융보험(agfin.js)과 같다.
  const D = window.AGRI_GOHYANG;
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
  const nf1 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const ok = (n) => n != null && Number.isFinite(n);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // 백만원 → 억·조
  const mil = (v) => (!ok(v) ? ["–", ""] : Math.abs(v) >= 1e6 ? [nf1.format(v / 1e6), "조원"] : Math.abs(v) >= 1000 ? [nf0.format(v / 100), "억원"] : Math.abs(v) >= 10 ? [nf1.format(v / 100), "억원"] : v === 0 ? ["0", "원"] : [nf0.format(v * 100), "만원"]);
  const milS = (v) => mil(v).join("");
  const pctS = (v) => (ok(v) ? `${nf0.format(v)}%` : "–");

  // ---------- 자료 ----------
  const Y = D.years;
  const F = Object.fromEntries(D.fields.map((f, i) => [f, i]));
  const yLabel = (i) => (Y[i].full ? `${Y[i].y}년` : `${Y[i].y}년 ${+Y[i].ymd.slice(4, 6)}월 말`);
  const yShort = (i) => (Y[i].full ? `${Y[i].y}` : `${String(Y[i].y).slice(2)}.${+Y[i].ymd.slice(4, 6)}`);
  const DEFAULT_YEAR = (() => { for (let i = Y.length - 1; i >= 0; i--) if (Y[i].full) return i; return Y.length - 1; })();
  const row = (k, i) => D.regions[k]?.[i] ?? null;
  const get = (k, i, f) => row(k, i)?.[F[f]] ?? null;
  const GOVS = D.govs.map(([n, r], i) => ({ i, n, r, s: r.split("|")[0], hq: !r.includes("|") }));
  const govIn = (g, k) => level(k) === 0 || (level(k) === 1 ? g.s === k : g.r === k);
  const govLabel = (g) => (g.hq ? g.n : `${T.sidos[g.s]?.short ?? ""} ${g.n}`);

  // ---------- 지도 지표 ----------
  const keepShare = (k, i) => { const s = get(k, i, "size"), kp = get(k, i, "keep"); return ok(s) && s > 0 ? (kp / s) * 100 : null; };
  const bizRate = (k, i) => { const c = get(k, i, "biz"), e = get(k, i, "bizEp"); return ok(c) && c > 0 ? (e / c) * 100 : null; };
  const METRICS = [
    { key: "size", chip: "기금 규모", label: "기금이 굴린 돈", fmt: milS, val: (k, i) => get(k, i, "size"), note: "고향사랑기금 회계 세출 예산현액 합계(전년에 남긴 돈 + 그해 들어올 기부금 예상). 모금액 결산이 아닙니다" },
    { key: "bizEp", chip: "사업 지출", label: "기금사업에 쓴 돈", fmt: milS, val: (k, i) => get(k, i, "bizEp"), note: "기금 회계 가운데 사업 갈래(지정기부 사업 포함)의 지출액. 올해는 최근 월말까지" },
    { key: "keep", chip: "남겨 둔 돈", label: "남겨 둔 돈(적립)", fmt: milS, val: (k, i) => get(k, i, "keep"), note: "보전지출·예치금으로 잡은 돈 = 그해 쓰지 않고 다음 해로 넘길 계획인 돈" },
    { key: "keepShare", chip: "남긴 비율", label: "기금 가운데 남겨 둔 비율", fmt: pctS, val: keepShare, note: "남겨 둔 돈 ÷ 기금이 굴린 돈. 높을수록 모은 돈을 아직 쓰지 않고 쌓아 두고 있다는 뜻" },
    { key: "bizRate", chip: "집행률", label: "기금사업 집행률", fmt: pctS, val: bizRate, note: "기금사업 지출액 ÷ 기금사업 예산현액. 올해는 최근 월말까지라 낮게 나온다" },
    { key: "nBiz", chip: "사업 수", label: "기금사업 수", fmt: (v) => (ok(v) ? `${nf0.format(v)}개` : "–"), val: (k, i) => get(k, i, "nBiz"), note: "기금 회계 안 사업 갈래의 세부사업 수(지정기부 사업은 사업마다 따로 잡힌다)" },
  ];
  const DEFAULT_METRIC = METRICS[0];
  const KINDS = [
    { k: "b", t: "기금사업", note: "기금 회계의 주민 사업(지정기부 사업 포함)" },
    { k: "r", t: "운영", note: "기금 회계 안의 답례품·홍보·모금 운영 경비" },
    { k: "g", t: "일반회계", note: "기금 밖(일반회계 등)에서 쓴 고향사랑기부제 운영비" },
  ];
  const state = { key: NATION, y: DEFAULT_YEAR, metric: DEFAULT_METRIC, kind: "b", q: "", sort: "cash" };

  // ---------- 선택 ----------
  const selSido = $("#sido"), selSgg = $("#sgg"), selYear = $("#year");
  selSido.innerHTML = `<option value="${NATION}">전국</option>` + SIDO_CODES.map((s) => `<option value="${s}">${T.sidos[s].name}</option>`).join("");
  selYear.innerHTML = Y.map((_, i) => `<option value="${i}">${yLabel(i)}</option>`).reverse().join("");
  selSido.addEventListener("change", () => select(selSido.value));
  selSgg.addEventListener("change", () => select(selSgg.value || selSido.value));
  selYear.addEventListener("change", () => { state.y = +selYear.value; render(false); });
  function syncControls() {
    const s = sidoOf(state.key);
    selSido.value = s || NATION;
    selSgg.disabled = !s;
    selSgg.innerHTML = `<option value="">${s ? "전체" : "–"}</option>` + (s ? UNITS_BY_SIDO[s].map((k) => `<option value="${k}">${label(k)}</option>`).join("") : "");
    selSgg.value = level(state.key) === 2 ? state.key : "";
    selYear.value = state.y;
  }

  // ---------- 주소: #경기도/용인시?y=2024&m=keep ----------
  function syncURL() {
    const k = state.key;
    const p = k === NATION ? "" : level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`;
    const q = new URLSearchParams();
    if (state.y !== DEFAULT_YEAR) q.set("y", Y[state.y].ymd);
    if (state.metric !== DEFAULT_METRIC) q.set("m", state.metric.key);
    const url = `${location.pathname}${q.toString() ? `?${q}` : ""}${p ? `#${encodeURIComponent(p)}` : ""}`;
    if (url !== location.pathname + location.search + location.hash) history.replaceState(null, "", url);
  }
  function fromURL() {
    const [a, b] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = SIDO_CODES.find((c) => T.sidos[c].name === a || T.sidos[c].short === a);
    state.key = s ? (b && UNITS_BY_SIDO[s].find((k) => label(k) === b)) || s : NATION;
    const q = new URLSearchParams(location.search);
    const yi = Y.findIndex((y) => y.ymd === q.get("y") || String(y.y) === q.get("y"));
    state.y = yi >= 0 ? yi : DEFAULT_YEAR;
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
    const parts = GOVS.filter((g) => g.r === k).length;
    let html = `<b>${esc(fullLabel(k))}</b>${m.label} <b style="display:inline">${m.fmt(m.val(k, state.y))}</b><br>${yLabel(state.y)}`;
    if (parts > 1) html += `<br><span class="tip-hint">구 ${parts}곳을 더한 값</span>`;
    if (sidoOf(k) === "39") html += `<br><span class="tip-hint">제주시·서귀포시는 따로 모금하지 않습니다(제주도 본청 한 곳, 시도 화면에서 봄)</span>`;
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
  function paintMap() {
    const m = state.metric, s = sidoOf(state.key);
    const vals = ALL_UNITS.map((k) => m.val(k, state.y)).filter(ok);
    const sc = scaleFor(m, vals);
    const missing = ALL_UNITS.length - vals.length;
    mapSvg.selectAll("path.unit")
      .attr("fill", (d) => { const v = m.val(d.properties.key, state.y); return ok(v) ? sc.fn(v) : EMPTY; })
      .classed("sel", (d) => d.properties.key === state.key)
      .classed("pw-ctx", (d) => !!s && d.properties.sido !== s)
      .attr("aria-label", (d) => `${fullLabel(d.properties.key)} ${m.label}`);
    mapSvg.selectAll("path.unit.sel").raise();
    mapSvg.classed("dimmed", level(state.key) === 2);
    $("#legend").innerHTML = `<span class="title">${m.label} <span style="color:var(--faint);font-weight:400">${yLabel(state.y)}</span></span>`
      + sc.rows.map(([c, t]) => `<span class="row"><span class="sw" style="background:${c}"></span>${t}</span>`).join("")
      + (missing ? `<span class="row"><span class="sw" style="background:${EMPTY};outline:1px solid #3a3f48"></span>자료 없음 ${missing}</span>` : "");
    $("#metric-note").textContent = m.note;
    $("#map").setAttribute("aria-label", `${m.label} 지도`);
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

  // ---------- 순위: 시군 (본청은 지도 칸이 없어 빠진다) ----------
  function renderRank() {
    const m = state.metric, s = sidoOf(state.key);
    const peers = s ? UNITS_BY_SIDO[s] : ALL_UNITS;
    const list = peers.map((k) => [k, m.val(k, state.y)]).filter(([, v]) => ok(v)).sort((a, b) => b[1] - a[1]);
    const max = Math.max(...list.map(([, v]) => Math.abs(v)), 0) || 1;
    const name = (k) => (s ? label(k) : fullLabel(k));
    const r = ([k, v], no) => `
      <button type="button" class="rank-row wide${k === state.key ? " sel" : ""}" data-r="${k}">
        <span class="no">${no}</span><span class="nm">${esc(name(k))}</span>
        <span class="track"><span class="fill" style="width:${(Math.abs(v) / max) * 100}%"></span></span>
        <span class="val">${m.fmt(v)}</span><span></span>
      </button>`;
    const top = list.slice(0, 10);
    $("#rank").innerHTML = list.length ? `
      <div class="rank-title"><span><b>${m.label}</b> 상위 ${s ? `${T.sidos[s].short} 시군` : "시군"} <span class="gh-rk-hint">본청 제외</span></span><span class="rank-meta">${yLabel(state.y)}</span></div>
      <div>${top.slice(0, 5).map((d, j) => r(d, j + 1)).join("")}</div>
      <div>${top.slice(5).map((d, j) => r(d, j + 6)).join("")}</div>` : "";
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => select(b.dataset.r)));
  }

  // ---------- 왼쪽: 규모 ----------
  function setStat(key, [v, u]) {
    $(`[data-v="${key}"]`).textContent = v;
    $(`[data-u="${key}"]`).textContent = u;
  }
  function renderSize() {
    const k = state.key, y = state.y;
    $("#size-scope").textContent = `(${fullLabel(k)})`;
    $$("[data-year]").forEach((el) => { el.textContent = yLabel(y); });
    const sz = get(k, y, "size"), ep = get(k, y, "bizEp"), kp = get(k, y, "keep"), n = get(k, y, "nBiz");
    setStat("size", mil(sz));
    setStat("bizEp", mil(ep));
    setStat("keep", mil(kp));
    setStat("nBiz", ok(n) ? [nf0.format(n), "개"] : ["–", ""]);
    const govN = D.counts[k]?.[y] ?? 0;
    let line = "";
    if (ok(sz) && sz > 0) {
      const per = (v) => nf0.format(((v || 0) / sz) * 100);
      line = `기금 100원 가운데 사업에 <b>${per(ep)}원</b>을 썼고 <b>${per(kp)}원</b>은 남겨 두었습니다`;
      if (!Y[y].full) line = `${+Y[y].ymd.slice(4, 6)}월 말까지 ` + line.replace("썼고", "썼고(아직 연중)");
      if (level(k) < 2 && govN) line += ` · 기금 회계 ${nf0.format(govN)}곳`;
    } else line = "이 해에는 고향사랑기금 회계 행이 없습니다";
    $("#size-line").innerHTML = line;
  }

  // 돈의 갈래: 기금 예산현액을 사업(쓴 돈·남은 예산)·운영·넘김·적립으로 나눈 띠 하나 + 기금 밖 일반회계 운영비
  const SPLIT = [
    { f: "bizEp", t: "사업에 쓴 돈", c: "var(--accent)" },
    { f: "bizLeft", t: "사업 예산 중 안 쓴 돈", c: "rgba(245,165,36,0.35)" },
    { f: "run", t: "운영(답례품·홍보 등)", c: "#b48cff" },
    { f: "move", t: "다른 회계로 넘김", c: "#8a909c" },
    { f: "keep", t: "남겨 둔 돈(적립)", c: "#5fb3ff" },
  ];
  function renderSplit() {
    const k = state.key, y = state.y;
    const r = row(k, y);
    const v = r ? { bizEp: r[F.bizEp], bizLeft: Math.max(0, r[F.biz] - r[F.bizEp]), run: r[F.run], move: r[F.move], keep: r[F.keep] } : {};
    const tot = SPLIT.reduce((s, x) => s + (v[x.f] || 0), 0);
    $("#split-unit").textContent = r ? `합계 ${milS(r[F.size])}` : "";
    $("#split-bar").innerHTML = tot ? SPLIT.filter((x) => v[x.f] > 0).map((x) => `<i style="flex-grow:${v[x.f] / tot};background:${x.c}" title="${x.t} ${milS(v[x.f])}"></i>`).join("") : "";
    $("#split-rows").innerHTML = tot ? SPLIT.map((x) => `<div class="gh-sr"><span><i style="background:${x.c}"></i>${x.t}</span><b>${milS(v[x.f])}</b><em>${nf0.format(((v[x.f] || 0) / tot) * 100)}%</em></div>`).join("")
      + `<div class="gh-sr gh-out"><span><i></i>기금 밖 일반회계 운영비</span><b>${milS(r[F.gen])}</b><em>쓴 돈 ${milS(r[F.genEp])}</em></div>` : `<p class="af-empty">자료 없음</p>`;
    $("#split-note").textContent = "갈래는 사업 이름으로 나눈 자체 기준입니다. 남겨 둔 돈은 계획(예산)이라 실제 연말 잔액과 다를 수 있습니다.";
  }

  function frame(el, h0) {
    const w = el.clientWidth || 300, h = el.clientHeight || h0;
    el._wh = [w, h];
    el.innerHTML = "";
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    return { svg, w, h };
  }
  // 연도별: 해마다 막대 셋(굴린 돈 회색 · 사업 지출 주황 · 남겨 둔 돈 파랑)
  const YB = [["size", "gh-b-size", "기금이 굴린 돈"], ["bizEp", "gh-b-biz", "사업에 쓴 돈"], ["keep", "gh-b-keep", "남겨 둔 돈"]];
  function drawYears() {
    const k = state.key, el = $("#chart-years");
    const { svg, w, h } = frame(el, 120);
    $("#years-range").textContent = `${yShort(0)}~${yShort(Y.length - 1)}`;
    const rows = Y.map((_, i) => ({ i, size: get(k, i, "size"), bizEp: get(k, i, "bizEp"), keep: get(k, i, "keep") }));
    const top = d3.max(rows, (r) => Math.max(r.size || 0, r.bizEp || 0, r.keep || 0));
    if (!top) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text("자료 없음"); $("#years-key").innerHTML = ""; return; }
    const m = { l: 44, r: 6, t: 8, b: 18 };
    const x = d3.scaleBand().domain(rows.map((r) => r.i)).range([m.l, w - m.r]).padding(0.24);
    const x2 = d3.scaleBand().domain(YB.map((b) => b[0])).range([0, x.bandwidth()]).padding(0.08);
    const y = d3.scaleLinear().domain([0, top * 1.05]).nice(3).range([h - m.b, m.t]);
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(y.ticks(3)).join("g").call((g) => {
      g.append("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (d) => y(d)).attr("y2", (d) => y(d));
      g.append("text").attr("x", m.l - 5).attr("y", (d) => y(d) + 4).attr("text-anchor", "end").text((d) => (d ? milS(d) : "0"));
    });
    const grp = svg.append("g").selectAll("g").data(rows).join("g").attr("transform", (r) => `translate(${x(r.i)},0)`);
    grp.filter((r) => r.i === state.y).append("rect").attr("class", "af-ysel").attr("x", -3).attr("width", x.bandwidth() + 6).attr("y", m.t - 4).attr("height", h - m.t - m.b + 4);
    for (const [f, cls, t] of YB) {
      grp.filter((r) => ok(r[f])).append("rect").attr("class", cls)
        .attr("x", x2(f)).attr("width", x2.bandwidth()).attr("y", (r) => y(r[f])).attr("height", (r) => y(0) - y(r[f]))
        .classed("af-partial", (r) => !Y[r.i].full)
        .append("title").text((r) => `${yLabel(r.i)} ${t} ${milS(r[f])}`);
    }
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(rows).join("text")
      .attr("x", (r) => x(r.i) + x.bandwidth() / 2).attr("y", h - 4).attr("text-anchor", "middle").text((r) => yShort(r.i));
    svg.append("g").selectAll("rect").data(rows).join("rect").attr("x", (r) => x(r.i)).attr("width", x.bandwidth()).attr("y", 0).attr("height", h)
      .attr("fill", "transparent").style("cursor", "pointer").on("click", (e, r) => { state.y = r.i; render(false); })
      .append("title").text((r) => `${yLabel(r.i)} 보기`);
    $("#years-key").innerHTML = YB.map(([, cls, t]) => `<span><i class="${cls}"></i>${t}</span>`).join("") + (Y.at(-1).full ? "" : `<span>${yShort(Y.length - 1)}: 연중(흐리게)</span>`);
  }

  // ---------- 오른쪽: 기금사업 목록 ----------
  const ITEMS = D.items.map(([g, yi, n, c, e, k]) => ({ g: GOVS[g], yi, n, c, e, k }));
  const norm = (t) => t.replace(/\s+/g, "").toLowerCase();
  const LIMIT = 400;
  const COLS = [
    ["n", "사업", (it) => it.n],
    ["cash", "예산", (it) => it.c],
    ["ep", "지출", (it) => it.e],
    ["rate", "집행", (it) => (it.c > 0 ? it.e / it.c : null)],
  ];
  function renderKinds() {
    $("#kind-seg").innerHTML = KINDS.map((x) => `<button type="button" data-k="${x.k}" aria-pressed="${state.kind === x.k}" title="${x.note}">${x.t}</button>`).join("");
    $$("#kind-seg button").forEach((b) => b.addEventListener("click", () => { state.kind = b.dataset.k; renderKinds(); renderList(); }));
  }
  const qBox = $("#biz-q");
  qBox.addEventListener("input", () => { state.q = qBox.value; renderList(); });
  qBox.addEventListener("keydown", (e) => { if (e.key === "Escape") { qBox.value = ""; state.q = ""; renderList(); } });
  function renderList() {
    const k = state.key, y = state.y, q = norm(state.q || "");
    const all = ITEMS.filter((it) => it.yi === y && it.k === state.kind && govIn(it.g, k));
    const hits = q ? all.filter((it) => norm(it.n).includes(q) || norm(it.g.n).includes(q)) : all;
    const [, , getv] = COLS.find((c) => c[0] === state.sort);
    const sorted = hits.slice().sort((a, b) => (state.sort === "n" ? a.n.localeCompare(b.n, "ko") : (getv(b) ?? -1) - (getv(a) ?? -1)));
    const shown = sorted.slice(0, LIMIT);
    const multi = level(k) < 2 || new Set(all.map((it) => it.g.i)).size > 1;
    const sumC = d3.sum(hits, (it) => it.c), sumE = d3.sum(hits, (it) => it.e);
    $("#list-scope").textContent = `(${fullLabel(k)} · ${yShort(y)})`;
    $("#list-count").textContent = `${nf0.format(hits.length)}개 · ${milS(sumC)}`;
    const rate = (it) => (it.c > 0 ? `${nf0.format((it.e / it.c) * 100)}%` : "–");
    const m1 = (v) => (v >= 100 ? nf0.format(v / 100) : nf1.format(v / 100)); // 백만원 → 억원 숫자
    $("#biz-table").innerHTML = `<thead><tr>${COLS.map(([f, t]) => `<th><button type="button" data-s="${f}" aria-pressed="${state.sort === f}">${t}${f === "cash" || f === "ep" ? "<small>억</small>" : ""}</button></th>`).join("")}</tr></thead>
      <tbody>${shown.length ? shown.map((it) => `<tr data-g="${it.g.i}" title="${esc(govLabel(it.g))} · ${esc(it.n)} · 예산 ${milS(it.c)} · 지출 ${milS(it.e)}"><td><span class="gh-bn">${esc(it.n)}</span>${multi ? `<span class="gh-gov">${esc(govLabel(it.g))}</span>` : ""}</td><td>${m1(it.c)}</td><td>${m1(it.e)}</td><td>${rate(it)}</td></tr>`).join("")
        : `<tr class="af-none"><td colspan="4">${q ? `'${esc(state.q)}'에 맞는 사업이 없습니다` : "사업 행이 없습니다"}</td></tr>`}</tbody>`;
    $$("#biz-table [data-s]").forEach((b) => b.addEventListener("click", () => { state.sort = b.dataset.s; renderList(); }));
    $$("#biz-table tbody tr[data-g]").forEach((tr) => tr.addEventListener("click", () => {
      const g = GOVS[+tr.dataset.g];
      if (g.r !== state.key) select(g.r);
    }));
    const kind = KINDS.find((x) => x.k === state.kind);
    $("#list-note").textContent = `${kind.note}. 지방재정365 세부사업 이름 그대로${sorted.length > LIMIT ? ` · 예산 큰 ${LIMIT}개만 보임(찾기로 좁히기)` : ""}. 누르면 그 지자체로 갑니다.`;
  }

  // ---------- 오른쪽 아래: 한계와 검증 ----------
  function renderLimits() {
    const c = D.check || {};
    const items = [
      `<b>모금액·기부 건수</b>: 지자체별 값은 공개 API·파일이 없습니다. 고향사랑e음은 자동 수집을 막고(robots.txt), 행정안전부는 전국·시도 합계만 발표합니다.`,
      `<b>결산 잔액·조성액</b>: 지자체마다 결산서 PDF에만 있습니다(용인시는 의정 현황판에서 PDF로 읽음).`,
      `<b>남겨 둔 돈</b>은 예산이고, <b>기금이 굴린 돈</b>은 모금액이 아니라 기금 회계의 세출 예산현액입니다.`,
    ];
    if (c.text) items.push(`<b>검증</b>: ${c.text}`);
    $("#limits").innerHTML = items.map((t) => `<li>${t}</li>`).join("");
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
    renderSize();
    renderSplit();
    drawYears();
    renderList();
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
  renderKinds();
  renderLimits();
  drawMap();
  render(false);
  $("#built").textContent = `${yLabel(Y.length - 1)}까지 · ${D.built} 작성`;
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
