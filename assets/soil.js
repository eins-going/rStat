(() => {
  // 농경지 토양 — 왼쪽: 정밀토양도로 본 타고난 땅(적성등급·저해요인, 시군 전체 땅), 오른쪽: 토양검정으로 본 흙의 양분(검정 필지 누적).
  // 두 자료는 대상이 달라 섞지 않는다. 화학성은 지도·순위에 올리지 않고 시도·전국과 견주기만 한다 (data/soil.js, scripts/build_soil.py)
  // 지역 체계·지도는 농업금융보험(agfin.js)과 같다.
  const S = window.AGRI_SOIL;
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
  const ok = (n) => n != null && Number.isFinite(n);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const ha = (v) => (ok(v) ? `${nf0.format(v)}ha` : "–");
  const pct = (v) => (ok(v) ? `${nf0.format(v)}%` : "–");
  const sum = (a) => a.reduce((s, v) => s + (v || 0), 0);
  const R = (k) => S.r[k];

  // ---------- 왼쪽: 적성등급 ----------
  const GRADES = [{ k: "pg", land: "논", fm: 0 }, { k: "fg", land: "밭", fm: 1 }];
  const top12 = (g) => g[0] + g[1];

  // ---------- 오른쪽: 흙토람 경지구분별 적정범위와 API 구간의 판정 ----------
  // 구간마다 L 낮음 · O 적정 · H 높음 · X 걸침(구간 안에 기준 경계가 있어 가를 수 없음). 경계가 구간 끝과 맞닿으면 갈린 것으로 본다.
  // 출처: 흙토람 토양환경지도 필지 조회 화면의 '경지구분별 적정범위' (soil.rda.go.kr)
  const LANDS = ["논", "밭", "시설", "과수"];
  const UP = { ph: ["6.0~7.0", "LLLLOX"], om: ["20~30", "LLOHHH"], ap: ["300~550", "LLOOXH"], k: ["0.50~0.80", "LLLOOX"], ca: ["5.0~6.0", "LLLOHH"], mg: ["1.5~2.0", "LLLOHH"] };
  const STD = {
    논: { ph: ["5.5~6.5", "LLLOOH"], om: ["20~30", "LLOHHH"], ap: ["80~120", "LXXHHH"], k: ["0.20~0.30", "LLOHHH"], ca: ["5.0~6.0", "LLLLOH"], mg: ["1.5~2.0", "LLLOHH"], si: ["157 이상", "LLLXOO"] },
    밭: UP,
    과수: UP,
    시설: { ph: ["6.0~7.0", "LLLOOH"], om: ["25~35", "LLXXHH"], ap: ["300~550", "XXHHHH"], k: ["0.50~0.80", "LXHHHH"], ca: ["5.0~6.0", "LXXHHH"], mg: ["1.5~2.0", "LLLOHH"] },
  };
  const CLS = { L: ["낮음", "#5aa3e0"], O: ["적정", "#5fb37c"], H: ["높음", "#e5845f"], X: ["걸침", "#4a4f59"] };
  const ITEM = Object.fromEntries(S.chem.map((c) => [c.k, c]));
  const binsOf = (k, item, land) => R(k)?.c?.[item]?.[land] ?? null;
  function judge(k, item, land) {
    const b = binsOf(k, item, land), std = STD[land][item];
    if (!b || !std) return null;
    const tot = sum(b);
    if (!tot) return { tot: 0 };
    const out = { tot, L: 0, O: 0, H: 0, X: 0 };
    [...std[1]].forEach((c, i) => { out[c] += b[i]; });
    for (const c of "LOHX") out[c] = (out[c] / tot) * 100;
    return out;
  }

  // ---------- 지도 지표 (왼쪽 자료만) ----------
  const METRICS = [
    { key: "pg", group: "적성등급", chip: "논 1·2급지", label: "논 적성등급 1·2급지 면적", get: (k) => (R(k) ? top12(R(k).pg) : null), fm: 0, note: "논 적성등급 1급지(생산력 높음)·2급지(보통)인 땅의 면적(ha). 국립농업과학원 정밀토양도 기준으로, 지금 논인지와 상관없다" },
    { key: "fg", group: "적성등급", chip: "밭 1·2급지", label: "밭 적성등급 1·2급지 면적", get: (k) => (R(k) ? top12(R(k).fg) : null), fm: 1, note: "밭 적성등급 1급지(생산력 높음)·2급지(보통)인 땅의 면적(ha). 국립농업과학원 정밀토양도 기준으로, 지금 밭인지와 상관없다" },
  ];
  const DEFAULT_METRIC = METRICS[0];
  const state = { key: NATION, metric: DEFAULT_METRIC, land: "밭", item: "ap" };

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

  // ---------- 주소: #경상남도/밀양시?m=fg&l=논&i=ph ----------
  function syncURL() {
    const k = state.key;
    const path = k === NATION ? "" : level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`;
    const q = new URLSearchParams();
    if (state.metric !== DEFAULT_METRIC) q.set("m", state.metric.key);
    if (state.land !== "밭") q.set("l", state.land);
    if (state.item !== "ap") q.set("i", state.item);
    const url = `${location.pathname}${q.toString() ? `?${q}` : ""}${path ? `#${encodeURIComponent(path)}` : ""}`;
    if (url !== location.pathname + location.search + location.hash) history.replaceState(null, "", url);
  }
  function fromURL() {
    const [a, b] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = SIDO_CODES.find((c) => T.sidos[c].name === a || T.sidos[c].short === a);
    state.key = s ? (b && UNITS_BY_SIDO[s].find((k) => label(k) === b)) || s : NATION;
    const q = new URLSearchParams(location.search);
    state.metric = METRICS.find((m) => m.key === q.get("m")) || DEFAULT_METRIC;
    state.land = LANDS.includes(q.get("l")) ? q.get("l") : "밭";
    state.item = ITEM[q.get("i")] && STD[state.land][q.get("i")] ? q.get("i") : STD[state.land].ap ? "ap" : "ph";
  }

  // ---------- 막대 위 값: 마우스를 올리면 바로 뜬다 (브라우저 title 툴팁은 늦거나 안 뜬다) ----------
  const ptip = document.createElement("div");
  ptip.className = "sl-ptip";
  ptip.hidden = true;
  document.body.append(ptip);
  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest?.("[data-tip]");
    if (!el || !el.closest(".col")) { ptip.hidden = true; return; }
    ptip.innerHTML = el.dataset.tip;
    ptip.hidden = false;
    const r = el.getBoundingClientRect(), w = ptip.offsetWidth, h = ptip.offsetHeight;
    const x = Math.min(window.innerWidth - w - 6, Math.max(6, r.left + r.width / 2 - w / 2));
    const y = r.top - h - 6 < 4 ? r.bottom + 6 : r.top - h - 6;
    ptip.style.left = `${x}px`;
    ptip.style.top = `${y}px`;
  });
  document.addEventListener("scroll", () => { ptip.hidden = true; }, true);

  // ---------- 지도 ----------
  const RAMP = ["#2c3a31", "#355a43", "#47855e", "#62b37f", "#8be0a8"];
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
    if (animate && !reduceMotion) world.transition().duration(700).ease(d3.easeCubicInOut).attr("transform", view);
    else world.interrupt().attr("transform", view);
    drawLabels(view, animate);
  }

  const pickSido = (k) => level(state.key) === 0 || sidoOf(k) !== sidoOf(state.key);
  function onRegionClick(k) {
    if (pickSido(k)) select(sidoOf(k));
    else if (k === state.key) select(sidoOf(k));
    else select(k);
  }
  function hoverRegion(e, k) {
    const m = state.metric, f = R(k)?.f?.[m.fm];
    let html = `<b>${esc(fullLabel(k))}</b>${m.label} <b style="display:inline">${ha(m.get(k))}</b>`;
    if (ok(f)) html += `<br>지금 ${m.fm ? "밭" : "논"}(팜맵) ${ha(f)}`;
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

  // 색: 시군 값 순서로 다섯 구간
  function paintMap() {
    const m = state.metric, s = sidoOf(state.key);
    const vals = ALL_UNITS.map((k) => m.get(k)).filter(ok);
    const q = d3.scaleQuantile().domain(vals).range(RAMP);
    const e = [d3.min(vals), ...q.quantiles(), d3.max(vals)];
    mapSvg.selectAll("path.unit")
      .attr("fill", (d) => { const v = m.get(d.properties.key); return ok(v) ? q(v) : EMPTY; })
      .classed("sel", (d) => d.properties.key === state.key)
      .classed("pw-ctx", (d) => !!s && d.properties.sido !== s)
      .attr("aria-label", (d) => `${fullLabel(d.properties.key)} ${m.label}`);
    mapSvg.selectAll("path.unit.sel").raise();
    mapSvg.classed("dimmed", level(state.key) === 2);
    $("#legend").innerHTML = `<span class="title">${m.label}</span>`
      + RAMP.map((c, i) => `<span class="row"><span class="sw" style="background:${c}"></span>${nf0.format(e[i])}–${ha(e[i + 1])}</span>`).join("");
    $("#metric-note").textContent = m.note;
    $("#map").setAttribute("aria-label", `${m.label} 지도`);
  }

  // ---------- 지표 칩 (묶음 이름 + 짧은 칩, 한 줄) ----------
  function renderChips() {
    $("#chips").innerHTML = METRICS.map((m, j) => `${j === 0 || METRICS[j - 1].group !== m.group ? `<span class="pw-chip-g">${m.group}</span>` : ""}<button type="button" data-k="${m.key}" aria-pressed="${m === state.metric}" title="${m.label}">${m.chip}</button>`).join("")
      + `<span class="sl-chip-note">흙의 양분은 검정 필지 자료라 지도에 칠하지 않습니다</span>`;
    $$("#chips button").forEach((b) => b.addEventListener("click", () => {
      state.metric = METRICS.find((m) => m.key === b.dataset.k);
      $$("#chips button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      syncURL();
      paintMap();
      renderRank();
    }));
  }

  // ---------- 순위: 면적 큰 순서 ----------
  function renderRank() {
    const m = state.metric, s = sidoOf(state.key);
    const peers = s ? UNITS_BY_SIDO[s] : ALL_UNITS;
    const list = peers.map((k) => [k, m.get(k)]).filter(([, v]) => ok(v) && v > 0).sort((a, b) => b[1] - a[1]);
    const name = (k) => (s ? label(k) : fullLabel(k));
    const max = list[0]?.[1] || 1;
    const row = ([k, v], no) => `
      <button type="button" class="rank-row wide${k === state.key ? " sel" : ""}" data-r="${k}">
        <span class="no">${no}</span><span class="nm">${esc(name(k))}</span>
        <span class="track"><span class="fill" style="width:${(v / max) * 100}%"></span></span>
        <span class="val">${ha(v)}</span><span></span>
      </button>`;
    const top = list.slice(0, 10);
    $("#rank").innerHTML = list.length ? `
      <div class="rank-title"><span><b>${m.label}</b> 상위 ${s ? `${T.sidos[s].short} 시군` : "시군"}</span><span class="rank-meta">${list.length}곳</span></div>
      <div>${top.slice(0, 5).map((d, j) => row(d, j + 1)).join("")}</div>
      <div>${top.slice(5).map((d, j) => row(d, j + 6)).join("")}</div>` : "";
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => select(b.dataset.r)));
  }

  // ---------- 왼쪽 1: 적성등급 — 등급 정의 표에 논·밭 막대를 넣는다(범례 겸 값). 모든 %는 시군 땅 전체 기준 ----------
  // 적성등급: 국립농업과학원이 배수·토성·유효토심·자갈·경사·침식 등으로 지목마다 1~5급지로 매긴 등급 (흙토람 '토양이용 추천')
  // 정의는 흙토람 '토양이용 추천'의 지목별 토지이용 적성등급 구분기준(비화산회 토양) 원문 그대로. d는 원문 1), 논·밭은 원문 2)
  const CATS = [
    { n: "1급지", d: "생산력이 높음", col: "#86dba0",
      논: "논으로서 생산력이 높음. 수도재배에 있어서 집약적 경영이 용이하며 토양을 관리하는데 제한을 받지 않음.",
      밭: "밭으로서 생산력이 높음. 전작물재배에 있어 집약적 경영이 용이하며 토양관리 및 작물을 선택하는데 제한을 받지않음." },
    { n: "2급지", d: "생산력이 보통임", col: "#4fb47a",
      논: "논으로서 생산력이 보통임. 수도재배에 있어서 집약적 경영이 가능하나 토양을 관리하는데 다소의 제한을 받음.",
      밭: "밭으로서 생산력이 보통임. 전작물재배에 있어 집약적 경영이 가능하나 토양관리 및 작물을 선택하는데 다소의 제한을 받음." },
    { n: "3급지", d: "생산력이 낮음", col: "#e2b866",
      논: "논으로서 생산력이 낮음. 수도재배지로서 심한 제한을 받고 있어 특수관리 및 재배기술을 필요로 함.",
      밭: "밭으로서 생산력이 낮음. 전작물재배지로서 심한 제한을 받고 있어 특수관리 및 재배기술을 필요로 함." },
    { n: "4급지", d: "생산력이 매우 낮음", col: "#c08a4a",
      논: "논으로서 생산력이 매우 낮음. 수도재배지로서 매우 심한 제한을 받고있어 경제적 이용이 어려울 경우가 있음.",
      밭: "밭으로서 생산력이 매우 낮음. 전작물재배에 있어 매우 심한 제한을 받고 있어 경제적 이용이 어려울 경우가 있음." },
    { n: "5급지", d: "이용이 부적당", col: "#5c626d",
      논: "해당 지목(논)으로 이용이 부적당한 토양.", 밭: "해당 지목(밭)으로 이용이 부적당한 토양." },
    { n: "기타", d: "적성등급 없음", col: "#3a3f48",
      논: "적성등급이 매겨지지 않은 땅 (API의 '기타 면적').", 밭: "적성등급이 매겨지지 않은 땅 (API의 '기타 면적')." },
  ];
  const defTip = (c) => `<b>${c.n}</b><br><span class='sl-def'><b>논</b> ${c.논}</span><br><span class='sl-def'><b>밭</b> ${c.밭}</span>`;
  const topPct = (k, g) => { const r = R(k)[g]; return ((r[0] + r[1]) / (sum(r) || 1)) * 100; };
  function renderGrades() {
    const k = state.key, s = sidoOf(k);
    const sk = level(k) === 2 ? s : null, nk = level(k) ? NATION : null;
    const P = R(k).pg, F = R(k).fg, total = sum(P), tot = (r) => sum(r) || 1;
    $("#grade-scope").textContent = `(${fullLabel(k)})`;
    const lead = `${esc(shortLabel(k))} 땅 <b>${ha(total)}</b> 가운데 논 적성 1·2급지는 <b class="g">${pct(topPct(k, "pg"))}</b>(${ha(P[0] + P[1])}), 밭 적성 1·2급지는 <b class="g">${pct(topPct(k, "fg"))}</b>(${ha(F[0] + F[1])})입니다.`;
    const max = Math.max(...P.map((v) => (v / tot(P)) * 100), ...F.map((v) => (v / tot(F)) * 100), 1);
    const haS = (v) => (v >= 1e5 ? `${(v / 1e4).toFixed(1)}만` : nf0.format(v));
    const cell = (r, i, land) => { const v = (r[i] / tot(r)) * 100; return `<td class="v" data-tip="<b>${esc(fullLabel(k))} ${land} ${CATS[i].n}</b> ${ha(r[i])}<br>땅의 ${pct(v)}<br><span class='sl-def'>${CATS[i][land]}</span>">
      <span class="sl-db" style="width:${(v / max) * 100}%;background:${CATS[i].col}"></span><b>${pct(v)}</b><em>${haS(r[i])}</em></td>`; };
    const table = `<table class="sl-gtab"><thead><tr><th>적성등급</th><th>정의</th><th>논 적성등급<small>비중 · ha</small></th><th>밭 적성등급<small>비중 · ha</small></th></tr></thead><tbody>${CATS.map((c, i) => `
      <tr><th data-tip="${defTip(c)}"><i style="background:${c.col}"></i>${c.n}</th><td class="d" data-tip="${defTip(c)}">${c.d}</td>${cell(P, i, "논")}${cell(F, i, "밭")}</tr>`).join("")}</tbody></table>`;
    const now = [0, 1].map((j) => { const f = R(k).f?.[j], land = j ? "밭" : "논"; return ok(f) ? `지금 ${land} <b>${ha(f)}</b> <em>땅의 ${pct((f / total) * 100)}</em>` : ""; }).filter(Boolean).join(" · ");
    // 같은 시도(전국이면 전체) 시군 사이 위치: 1·2급지 비율을 점으로
    const peers = s ? UNITS_BY_SIDO[s] : ALL_UNITS;
    const strip = GRADES.map(({ k: g, land }) => {
      const pts = peers.map((u) => [u, topPct(u, g)]).filter(([, v]) => ok(v));
      const max = Math.max(...pts.map(([, v]) => v), 1);
      const rank = pts.slice().sort((a, b) => b[1] - a[1]).findIndex(([u]) => u === k) + 1;
      const avg = topPct(s || NATION, g);
      return `<div class="sl-sr"><span class="sl-sl">${land}</span><span class="sl-st">
        ${pts.map(([u, v]) => `<i class="${u === k ? "me" : ""}" style="left:${(v / max) * 100}%" data-tip="<b>${esc(fullLabel(u))}</b> ${land} 적성 1·2급지 ${pct(v)}"></i>`).join("")}
        <u style="left:${(avg / max) * 100}%" data-tip="<b>${esc(s ? shortLabel(s) : "전국")} 전체</b> ${pct(avg)}"></u></span>
        <b>${level(k) === 2 && rank ? `${rank}위/${pts.length}` : `${pts.length}곳`}</b></div>`;
    }).join("");
    const cmp = [[sk, sk && shortLabel(sk)], [nk, "전국"]].filter(([x]) => x).map(([x, n]) => `${esc(n)} 논 ${pct(topPct(x, "pg"))} · 밭 ${pct(topPct(x, "fg"))}`).join(" / ");
    $("#grades").innerHTML = `<p class="sl-lead">${lead}</p>
      ${table}
      ${now ? `<p class="sl-wnow">${now} <span>(팜맵 ${S.farmYear})</span></p>` : ""}
      <div class="sl-strip"><h3 class="sl-wh">1·2급지 비율, ${s ? `${esc(T.sidos[s].short)} 시군` : "전국 시군"} 사이 위치 <em>점 하나가 시군 · 세로선은 ${s ? esc(T.sidos[s].short) : "전국"} 전체${cmp ? ` · ${cmp}` : ""}</em></h3>${strip}</div>`;
    $("#grade-note").textContent = "정의는 흙토람 지목별 토지이용 적성등급 구분기준 원문(1급지~4급지는 해당 지목으로 이용 가능, 5급지는 부적당). 지금 쓰임과 무관.";
  }

  // ---------- 왼쪽 2: 저해요인 — 2~4급지에 붙은 '가장 심한 저해요인'별 비중 (논·밭 열, 전국은 눈금) ----------
  const WHY = { 경사: "비탈", 저습: "물빠짐 나쁨", 사질: "모래땅", 석력: "자갈", 염해: "염분", 특이산성: "강한 산성", 미숙: "덜 발달한 흙",
    암반: "얕은 바위", 화산회: "화산재 흙", 중점: "진흙땅", 경반: "굳은 층", 분석: "화산 자갈" };
  function renderObst() {
    const k = state.key, nk = level(k) ? NATION : null;
    const share = (key, g) => { const o = R(key).o[g] || {}, t = sum(Object.values(o)); return { t, o, p: Object.fromEntries(Object.entries(o).map(([n, v]) => [n, t ? (v / t) * 100 : 0])) }; };
    const A = { 논: share(k, "po"), 밭: share(k, "fo") }, N = nk && { 논: share(nk, "po"), 밭: share(nk, "fo") };
    const names = [...new Set([...Object.keys(A.논.p), ...Object.keys(A.밭.p)])]
      .filter((n) => (A.논.p[n] || 0) >= 1 || (A.밭.p[n] || 0) >= 1)
      .sort((a, b) => Math.max(A.논.p[b] || 0, A.밭.p[b] || 0) - Math.max(A.논.p[a] || 0, A.밭.p[a] || 0)).slice(0, 6);
    const max = Math.max(...names.flatMap((n) => ["논", "밭"].flatMap((l) => [A[l].p[n] || 0, N?.[l].p[n] || 0])), 1);
    const bar = (land, n) => {
      if (!(n in A[land].p)) return `<td class="na">–</td>`;
      const v = A[land].p[n], nv = N?.[land].p[n], up = ok(nv) && v - nv >= 5;
      return `<td data-tip="<b>${land} · ${n}</b> (${WHY[n] || n})<br>${ha(A[land].o[n])} · ${land} 2~4급지의 ${pct(v)}${ok(nv) ? `<br>전국 ${pct(nv)}` : ""}">
        <span class="sl-wt"><i style="width:${(v / max) * 100}%"></i>${ok(nv) ? `<u style="left:${(nv / max) * 100}%"></u>` : ""}</span><b>${pct(v)}${up ? "<em>▲</em>" : ""}</b></td>`;
    };
    $("#obst").innerHTML = `<table class="sl-otab"><thead><tr><th>저해요인</th><th>논 <em>${ha(A.논.t)}</em></th><th>밭 <em>${ha(A.밭.t)}</em></th></tr></thead>
      <tbody>${names.map((n) => `<tr><th>${n}<em>${WHY[n] || ""}</em></th>${bar("논", n)}${bar("밭", n)}</tr>`).join("")}</tbody></table>`;
    $("#obst-key").innerHTML = `<span><i class="sl-kbar"></i>이 지역</span>${nk ? `<span><u class="sl-ku n"></u>전국</span><span><em class="sl-kup">▲</em>전국보다 5%p 넘게 많음</span>` : ""}`;
    $("#obst-note").textContent = "2~4급지에는 생산을 가장 크게 제한하는 저해요인 하나가 붙습니다. 그 요인별 비중.";
  }

  // ---------- 오른쪽 1: 흙 건강검진 (경지 하나 × 항목 7) ----------
  function checkBar(j, cls, k) {
    if (!j || !j.tot) return `<div class="sl-bar ${cls} none"></div>`;
    return `<div class="sl-bar ${cls}">${"LOHX".split("").map((c) => j[c] > 0 ? `<i style="flex-grow:${j[c]};background:${CLS[c][1]}" data-tip="<b>${esc(fullLabel(k))} ${CLS[c][0]}</b> ${pct(j[c])}<br>검정 면적 ${ha(j.tot)} 중"></i>` : "").join("")}</div>`;
  }
  function renderCheck() {
    const k = state.key, land = state.land;
    $("#check-scope").textContent = `(${fullLabel(k)})`;
    $("#land-seg").innerHTML = LANDS.map((l) => `<button type="button" data-l="${l}" aria-pressed="${l === land}">${l}</button>`).join("");
    $$("#land-seg button").forEach((b) => b.addEventListener("click", () => {
      state.land = b.dataset.l;
      if (!STD[state.land][state.item]) state.item = "ap";
      syncURL(); renderCheck(); drawBins();
    }));
    const items = S.chem.filter((c) => STD[land][c.k]);
    $("#check").innerHTML = items.map((c) => {
      const j = judge(k, c.k, land), jn = judge(NATION, c.k, land);
      const head = !j?.tot ? "자료 없음" : (j.H >= j.L ? `높음 <b class="h">${pct(j.H)}</b>` : `낮음 <b class="l">${pct(j.L)}</b>`);
      return `<button type="button" class="sl-ck${c.k === state.item ? " sel" : ""}" data-i="${c.k}">
        <span class="sl-ckh"><span class="sl-ckn">${c.name}</span><span class="sl-cks">적정 ${STD[land][c.k][0]} <em>${c.unit}</em></span><span class="sl-ckv">${head}</span></span>
        ${checkBar(j, "", k)}${level(k) ? checkBar(jn, "thin", NATION) : ""}
      </button>`;
    }).join("");
    $$("#check .sl-ck").forEach((b) => b.addEventListener("click", () => { state.item = b.dataset.i; syncURL(); renderCheck(); drawBins(); }));
    $("#check-key").innerHTML = "LOHX".split("").map((c) => `<span><i style="background:${CLS[c][1]}"></i>${CLS[c][0]}</span>`).join("")
      + (level(k) ? `<span class="sl-kn">아래 가는 막대는 전국</span>` : "");
  }

  // ---------- 오른쪽 2: 고른 항목의 구간 분포 (지역 막대 · 시도·전국 눈금) ----------
  function frame(el, h0) {
    const w = el.clientWidth || 300, h = el.clientHeight || h0;
    el._wh = [w, h];
    el.innerHTML = "";
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    return { svg, w, h };
  }
  function drawBins() {
    const k = state.key, land = state.land, item = state.item, c = ITEM[item], std = STD[land][item];
    const el = $("#chart-bins");
    $("#bins-title").textContent = `${c.name} · ${land} 구간 분포`;
    $("#bins-range").textContent = `적정 ${std[0]} ${c.unit}`;
    const { svg, w, h } = frame(el, 150);
    const share = (key) => { const b = binsOf(key, item, land), t = b ? sum(b) : 0; return t ? b.map((v) => (v / t) * 100) : null; };
    const me = share(k), sd = level(k) === 2 ? share(sidoOf(k)) : null, nat = level(k) ? share(NATION) : null;
    const raw = binsOf(k, item, land);
    if (!me) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text("검정 자료 없음"); $("#bins-key").innerHTML = ""; return; }
    const names = c.bins[land];
    const m = { l: 34, r: 6, t: 8, b: 30 };
    const x = d3.scaleBand().domain(d3.range(6)).range([m.l, w - m.r]).padding(0.22);
    const top = d3.max([...me, ...(sd || []), ...(nat || [])]);
    const y = d3.scaleLinear().domain([0, top * 1.08]).nice(3).range([h - m.b, m.t]);
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(y.ticks(3)).join("g").call((g) => {
      g.append("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (d) => y(d)).attr("y2", (d) => y(d));
      g.append("text").attr("x", m.l - 5).attr("y", (d) => y(d) + 4).attr("text-anchor", "end").text((d) => `${d}%`);
    });
    svg.append("g").selectAll("rect").data(me).join("rect")
      .attr("x", (d, i) => x(i)).attr("width", x.bandwidth()).attr("y", (d) => y(d)).attr("height", (d) => y(0) - y(d)).attr("rx", 2).attr("fill-opacity", 0.85)
      .attr("fill", (d, i) => CLS[std[1][i]][1]);
    const tick = (vals, cls) => svg.append("g").selectAll("line").data(vals).join("line").attr("class", cls)
      .attr("x1", (d, i) => x(i) - 2).attr("x2", (d, i) => x(i) + x.bandwidth() + 2).attr("y1", (d) => y(d)).attr("y2", (d) => y(d));
    if (nat) tick(nat, "sl-tk-n");
    if (sd) tick(sd, "sl-tk-s");
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(names).join("text")
      .attr("x", (d, i) => x(i) + x.bandwidth() / 2).attr("y", h - m.b + 13).attr("text-anchor", "middle").text((d) => d);
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(std[1].split("")).join("text")
      .attr("x", (d, i) => x(i) + x.bandwidth() / 2).attr("y", h - m.b + 25).attr("text-anchor", "middle")
      .attr("fill", (d) => (d === "X" ? "var(--faint)" : CLS[d][1])).text((d) => CLS[d][0]);
    // 마우스: 구간마다 값 상자 (바로 뜬다)
    svg.append("g").selectAll("rect").data(d3.range(6)).join("rect").attr("x", (i) => x(i) - x.step() * x.paddingInner() / 2).attr("width", x.step()).attr("y", 0).attr("height", h)
      .attr("fill", "transparent")
      .on("mouseenter", function (e, i) {
        d3.select(this).attr("fill", "rgba(255,255,255,0.05)");
        const html = `<b>${c.name} ${names[i]} ${c.unit}</b> ${CLS[std[1][i]][0]}<br>${esc(shortLabel(k))} ${pct(me[i])} (${ha(raw[i])})`
          + (sd ? `<br>${esc(shortLabel(sidoOf(k)))} ${pct(sd[i])}` : "") + (nat ? `<br>전국 ${pct(nat[i])}` : "");
        ptip.innerHTML = html; ptip.hidden = false;
        const r = this.getBoundingClientRect(), wt = ptip.offsetWidth;
        ptip.style.left = `${Math.min(window.innerWidth - wt - 6, Math.max(6, r.left + r.width / 2 - wt / 2))}px`;
        ptip.style.top = `${el.getBoundingClientRect().top - ptip.offsetHeight - 4}px`;
      })
      .on("mouseleave", function () { d3.select(this).attr("fill", "transparent"); ptip.hidden = true; });
    $("#bins-key").innerHTML = `<span><i class="sl-kb"></i>${esc(shortLabel(k))}</span>`
      + (sd ? `<span><i class="sl-ks"></i>${esc(shortLabel(sidoOf(k)))}</span>` : "") + (nat ? `<span><i class="sl-kn2"></i>전국</span>` : "");
    $("#check-note").textContent = "검정 받은 필지의 누적 면적이라 시군 농경지 전체가 아닙니다(사업 목적 검정이 많고 시점이 섞임). 기준 경계가 구간 안에 있으면 걸침.";
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
    renderGrades();
    renderObst();
    renderCheck();
    drawBins();
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
  $("#built").textContent = `토양도·토양검정 통계 ${S.tag}년 수집 · 경지면적 팜맵 ${S.farmYear} · ${S.built} 작성`;
  let mw = 0, mh = 0;
  new ResizeObserver(([e]) => {
    const { width, height } = e.contentRect;
    if (Math.abs(width - mw) < 1 && Math.abs(height - mh) < 1) return;
    mw = width; mh = height;
    drawMap();
    paintMap();
  }).observe($("#map-wrap"));
  new ResizeObserver(([e]) => {
    const { width, height } = e.contentRect, drawn = e.target._wh;
    if (drawn && Math.abs(drawn[0] - width) < 1 && Math.abs(drawn[1] - height) < 1) return;
    drawBins();
  }).observe($("#chart-bins"));
  window.addEventListener("hashchange", () => { fromURL(); render(true); });
})();
