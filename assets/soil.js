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
  const CLS = { L: ["낮음", "#5fb3ff"], O: ["적정", "#5fb37c"], H: ["높음", "#ef7f5a"], X: ["걸침", "#4a4f59"] };
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
    { key: "pg", group: "타고난 땅", chip: "논 좋은 땅", label: "논으로 좋은 땅(적성 1·2급지) 면적", get: (k) => (R(k) ? top12(R(k).pg) : null), fm: 0, note: "정밀토양도에서 논으로 쓰기에 1·2급지인 땅의 면적(ha). 지금 논인지와 상관없이 흙과 지형으로 매긴 등급이다" },
    { key: "fg", group: "타고난 땅", chip: "밭 좋은 땅", label: "밭으로 좋은 땅(적성 1·2급지) 면적", get: (k) => (R(k) ? top12(R(k).fg) : null), fm: 1, note: "정밀토양도에서 밭으로 쓰기에 1·2급지인 땅의 면적(ha). 지금 밭인지와 상관없이 흙과 지형으로 매긴 등급이다" },
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
  const RAMP = ["#26322b", "#2f4d3a", "#3f7552", "#58a370", "#7fd39a"];
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

  // ---------- 왼쪽 1: 농사짓기 좋은 땅은 얼마나 — 시군 땅 100칸 (와플), 모든 %는 시군 땅 전체 기준 ----------
  // 적성등급을 쉬운 말로: 1·2급지 좋음 · 3급지 보통 · 4급지 제약 큼 · 5급지 맞지 않음(대개 산) · 기타(도시·물 등)
  const CATS = [
    { n: "좋음", g: "1·2급지", col: "#7fd39a", idx: [0, 1] },
    { n: "보통", g: "3급지", col: "#3f8f5c", idx: [2] },
    { n: "제약 큼", g: "4급지", col: "#c9a46a", idx: [3] },
    { n: "맞지 않음", g: "5급지, 대개 산", col: "#4a4f59", idx: [4] },
    { n: "기타", g: "도시·물 등", col: "#2b2f36", idx: [5] },
  ];
  const catHa = (r) => CATS.map((c) => sum(c.idx.map((i) => r[i])));
  const goodPct = (k, g) => { const r = R(k)[g]; return ((r[0] + r[1]) / (sum(r) || 1)) * 100; };
  // 100칸 나누기 (큰 나머지 순으로 반올림해 합이 100)
  function cells(v) {
    const t = sum(v) || 1, raw = v.map((x) => (x / t) * 100), n = raw.map(Math.floor);
    raw.map((x, i) => [x - n[i], i]).sort((a, b) => b[0] - a[0]).slice(0, 100 - sum(n)).forEach(([, i]) => { n[i]++; });
    return n.flatMap((c, i) => Array(c).fill(i));
  }
  function renderGrades() {
    const k = state.key, s = sidoOf(k);
    const sk = level(k) === 2 ? s : null, nk = level(k) ? NATION : null;
    const total = sum(R(k).pg);
    $("#grade-scope").textContent = `(${fullLabel(k)})`;
    const lead = `${esc(shortLabel(k))} 땅 <b>${ha(total)}</b> 가운데 논으로 좋은 땅은 <b class="g">${pct(goodPct(k, "pg"))}</b>, 밭으로 좋은 땅은 <b class="g">${pct(goodPct(k, "fg"))}</b>입니다.`;
    $("#grades").innerHTML = `<p class="sl-lead">${lead}</p><div class="sl-wcols">${GRADES.map(({ k: g, land, fm }) => {
      const r = R(k)[g], v = catHa(r), f = R(k).f?.[fm], t = sum(v) || 1;
      const waffle = cells(v).map((ci) => `<i style="background:${CATS[ci].col}"></i>`).join("");
      const rows = CATS.map((c, i) => `<div class="sl-wl" data-tip="<b>${land}으로 ${c.n}</b> (${c.g})<br>${ha(v[i])} · 땅의 ${pct((v[i] / t) * 100)}">
          <i style="background:${c.col}"></i><span>${c.n}</span><b>${pct((v[i] / t) * 100)}</b><em>${nf0.format(v[i])}</em></div>`).join("");
      const cmp = [[sk, sk && shortLabel(sk)], [nk, "전국"]].filter(([x]) => x).map(([x, n]) => `${esc(n)} ${pct(goodPct(x, g))}`).join(" · ");
      return `<div class="sl-wcol">
        <h3 class="sl-wh">${land}으로 쓴다면</h3>
        <div class="sl-waffle" data-tip="<b>${esc(fullLabel(k))} 땅 100칸</b><br>한 칸 = 땅의 1% (${ha(t / 100)})">${waffle}</div>
        <div class="sl-wls">${rows}</div>
        ${cmp ? `<p class="sl-wcmp">좋은 땅 비율 · ${cmp}</p>` : ""}
        ${ok(f) ? `<p class="sl-wnow" data-tip="<b>지금 ${land}</b> ${ha(f)} · 팜맵 ${S.farmYear}<br>좋은 땅(${ha(v[0])})과 견주어 보세요">지금 ${land} <b>${ha(f)}</b> <em>땅의 ${pct((f / t) * 100)}</em></p>` : ""}
      </div>`;
    }).join("")}</div>`;
    // 같은 시도(전국이면 전체) 시군 사이 위치: 좋은 땅 비율을 점으로
    const peers = s ? UNITS_BY_SIDO[s] : ALL_UNITS;
    const strip = GRADES.map(({ k: g, land }) => {
      const pts = peers.map((u) => [u, goodPct(u, g)]).filter(([, v]) => ok(v));
      const max = Math.max(...pts.map(([, v]) => v), 1);
      const rank = pts.slice().sort((a, b) => b[1] - a[1]).findIndex(([u]) => u === k) + 1;
      const avg = s ? goodPct(s, g) : goodPct(NATION, g);
      return `<div class="sl-sr"><span class="sl-sl">${land}</span><span class="sl-st">
        ${pts.map(([u, v]) => `<i class="${u === k ? "me" : ""}" style="left:${(v / max) * 100}%" data-tip="<b>${esc(fullLabel(u))}</b> ${land}으로 좋은 땅 ${pct(v)}"></i>`).join("")}
        <u style="left:${(avg / max) * 100}%" data-tip="<b>${esc(s ? shortLabel(s) : "전국")} 전체</b> ${pct(avg)}"></u></span>
        <b>${level(k) === 2 && rank ? `${rank}위/${pts.length}` : `${pts.length}곳`}</b></div>`;
    }).join("");
    $("#grades").insertAdjacentHTML("beforeend", `<div class="sl-strip"><h3 class="sl-wh">좋은 땅 비율, ${s ? `${esc(T.sidos[s].short)} 시군` : "전국 시군"} 사이 위치 <em>점 하나가 시군 · 세로선은 ${s ? esc(T.sidos[s].short) : "전국"} 전체</em></h3>${strip}</div>`);
    $("#grade-note").textContent = "한 칸은 시군 땅의 1%. 농촌진흥청 정밀토양도가 흙·경사·물빠짐으로 매긴 적성등급(1~5급지)이며 지금 쓰임과는 상관없습니다. 논·밭은 같은 땅을 따로 매긴 것입니다.";
  }

  // ---------- 왼쪽 2: 등급을 깎은 이유 — 2~4급지로 매긴 첫째 이유, 경지마다 가로 막대(전국은 눈금) ----------
  const WHY = { 경사: "비탈", 저습: "물빠짐 나쁨", 사질: "모래땅", 석력: "자갈 많음", 염해: "염분", 특이산성: "강한 산성", 미숙: "덜 발달한 흙",
    암반: "얕은 바위", 화산회: "화산재 흙", 중점: "진흙땅", 경반: "굳은 층", 분석: "화산 자갈" };
  function renderObst() {
    const k = state.key, nk = level(k) ? NATION : null;
    const share = (key, g) => { const o = R(key).o[g] || {}, t = sum(Object.values(o)); return { t, o, p: Object.fromEntries(Object.entries(o).map(([n, v]) => [n, t ? (v / t) * 100 : 0])) }; };
    const block = (g, land) => {
      const A = share(k, g), N = nk && share(nk, g);
      if (!A.t) return `<div class="sl-why"><h3 class="sl-wh">${land}</h3><p class="sl-empty">해당 없음</p></div>`;
      const rows = Object.entries(A.p).filter(([, v]) => v >= 1).sort((a, b) => b[1] - a[1]).slice(0, 5);
      const max = Math.max(...rows.map(([n, v]) => Math.max(v, N?.p[n] || 0)), 1);
      return `<div class="sl-why"><h3 class="sl-wh">${land} <em>2~4급지 ${ha(A.t)}</em></h3>${rows.map(([n, v]) => {
        const nv = N?.p[n], up = ok(nv) && v - nv >= 5;
        return `<div class="sl-wr${up ? " up" : ""}" data-tip="<b>${land} · ${WHY[n] || n}</b> (${n})<br>${ha(A.o[n])} · ${land} 2~4급지의 ${pct(v)}${ok(nv) ? `<br>전국 ${pct(nv)}` : ""}">
          <span class="sl-wn">${WHY[n] || n}</span>
          <span class="sl-wt"><i style="width:${(v / max) * 100}%"></i>${ok(nv) ? `<u style="left:${(nv / max) * 100}%"></u>` : ""}</span>
          <b>${pct(v)}${up ? "<em>▲</em>" : ""}</b></div>`;
      }).join("")}</div>`;
    };
    $("#obst").innerHTML = `<div class="sl-whys">${block("po", "논")}${block("fo", "밭")}</div>`;
    $("#obst-key").innerHTML = `<span><i class="sl-kbar"></i>이 지역</span>${nk ? `<span><u class="sl-ku n"></u>전국</span><span><em class="sl-kup">▲</em>전국보다 5%p 넘게 많음</span>` : ""}`;
    $("#obst-note").textContent = "토양도가 1급지가 아닌 2~4급지로 매긴 땅을 첫째 이유별로 나눈 비중입니다(5급지는 대개 산이라 뺌).";
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
      .attr("x", (d, i) => x(i)).attr("width", x.bandwidth()).attr("y", (d) => y(d)).attr("height", (d) => y(0) - y(d)).attr("rx", 2)
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
