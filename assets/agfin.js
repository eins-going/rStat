(() => {
  // 농업금융보험 — 농작물재해보험 실적(data/apfs.js)과 지역 농·축협 공시 재무(data/nhcoop.js)를 공시값 그대로 보여 준다.
  // 합계·비율·증감은 만들지 않는다. 막대 길이·색처럼 그림의 크기만 값에 맞춘다.
  // 지역 체계·지도는 지역농업 통계(app.js), 농사용 전기(power.js)와 같다.
  const A = window.AGRI_APFS;
  const N = window.AGRI_NHCOOP;
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
  const isSibu = (k) => level(k) === 2 && label(k).endsWith("시부"); // 광역시 구를 묶은 칸: 보험은 구별로만 공시

  // ---------- 숫자 (단위만 바꾼다) ----------
  const nf0 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 2 });
  const ok = (n) => n != null && Number.isFinite(n);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // 억원 → 억·조
  const eok = (v) => (!ok(v) ? ["–", ""] : Math.abs(v) >= 1e4 ? [nf1.format(v / 1e4), "조원"] : Math.abs(v) < 10 ? [nf1.format(v), "억원"] : [nf0.format(v), "억원"]);
  const eokS = (v) => eok(v).join("");
  // 백만원 → 억·조 (보험)
  const mil = (v) => (!ok(v) ? ["–", ""] : Math.abs(v) >= 1e6 ? [nf1.format(v / 1e6), "조원"] : Math.abs(v) >= 100 ? [nf0.format(v / 100), "억원"] : [nf0.format(v), "백만원"]);
  const milS = (v) => mil(v).join("");
  const cnt = (v, u) => (!ok(v) ? ["–", ""] : v >= 1e5 ? [nf1.format(v / 1e4), `만 ${u}`] : [nf0.format(v), u]);
  const pct = (v) => (ok(v) ? `${nf2.format(v)}%` : "–");

  // ---------- 보험 (농업정책보험금융원) ----------
  const COL = Object.fromEntries(A.cols.map((c, i) => [c, i]));
  const AP = A.periods;
  const apLabel = (i) => (AP[i].m === 12 ? `${AP[i].y}년` : `${AP[i].y}년 1~${AP[i].m}월`);
  const apShort = (i) => (AP[i].m === 12 ? `${AP[i].y}` : `${AP[i].y}.1~${AP[i].m}`);
  const insRow = (k, i) => A.regions[k]?.[i] ?? null;
  const ins = (k, i, c) => insRow(k, i)?.t?.[COL[c]] ?? null;
  const catName = (ci) => A.cats[ci].split("|");
  const DEFAULT_YEAR = (() => { for (let i = AP.length - 1; i >= 0; i--) if (AP[i].m === 12) return i; return AP.length - 1; })();

  // ---------- 농협 (FISIS 조합별 공시) ----------
  const NP = N.periods; // ['202312', …]
  const F = Object.fromEntries(N.fields.map((f, i) => [f, i]));
  const KIND = { L: "지역농협", X: "축협", I: "품목농협" };
  const halfLabel = (h) => `${h.slice(0, 4)}년 ${+h.slice(4)}월`;
  const halfShort = (h) => `${h.slice(2, 4)}.${+h.slice(4)}`;
  const val = (c, f, h) => c.v[F[f]]?.[h] ?? null;
  const alive = (c, h) => !!c.p[h];
  const COOPS = N.coops;
  const BY_CODE = new Map(COOPS.map((c) => [c.c, c]));
  // 지역농협은 시군 키, 축협·품목농협은 시도 코드에 놓여 있다
  const coopSido = (c) => c.r.split("|")[0];
  function coopsIn(k, h) {
    const s = sidoOf(k);
    return COOPS.filter((c) => alive(c, h) && (level(k) === 0 || (level(k) === 1 ? coopSido(c) === s : c.r === k)));
  }
  // ROA는 12월에만 공시된다 → 6월을 보면 직전 12월 값을 쓴다
  function lastDec(c, f, h) {
    for (let j = h; j >= 0; j--) if (NP[j].endsWith("12") && ok(val(c, f, j))) return [val(c, f, j), j];
    return [null, null];
  }

  // ---------- 지도 지표 ----------
  // 보험: 시군 색칠(공시값), 농협: 본점 자리에 점(공시값으로 색)
  const METRICS = [
    { key: "paid", group: "보험", chip: "지급", label: "농작물재해보험 지급보험금", src: "ins", fmt: milS, note: "그해 지급한 보험금 공시값(백만원). 광역시 구는 구별로만 공시되어 지도 칸을 비워 둔다" },
    { key: "prem", group: "보험", chip: "보험료", label: "농작물재해보험 순보험료", src: "ins", fmt: milS, note: "가입자·정부·지자체가 낸 순보험료 공시값(백만원)" },
    { key: "amt", group: "보험", chip: "가입액", label: "농작물재해보험 가입금액", src: "ins", fmt: milS, note: "보험에 든 금액 공시값(백만원)" },
    { key: "cnt", group: "보험", chip: "건수", label: "농작물재해보험 가입건수", src: "ins", fmt: (v) => cnt(v, "건").join(""), note: "가입건수 공시값" },
    { key: "area", group: "보험", chip: "면적", label: "농작물재해보험 가입면적", src: "ins", fmt: (v) => (ok(v) ? `${nf0.format(v)}ha` : "–"), note: "가입면적 공시값(ha)" },
    { key: "assets", group: "농협", chip: "자산", label: "농·축협 자산총계", src: "coop", fmt: eokS, note: "점 하나가 농·축협 본점. 금감원 금융통계정보시스템 공시 자산총계" },
    { key: "members", group: "농협", chip: "조합원", label: "농·축협 조합원", src: "coop", fmt: (v) => cnt(v, "명").join(""), note: "점 하나가 농·축협 본점. 임직원현황의 조합원 공시값" },
    { key: "npl", group: "농협", chip: "고정이하", label: "고정이하여신비율", src: "coop", fmt: pct, note: "점 하나가 농·축협 본점. 금감원 공시 고정이하여신비율(값이 클수록 부실 여신 비중이 큼)" },
    { key: "income", group: "농협", chip: "순이익", label: "당기순이익", src: "coop", fmt: eokS, div: true, note: "점 하나가 농·축협 본점. 공시 당기순이익(반기 누계: 6월은 상반기, 12월은 1년)" },
  ];
  const DEFAULT_METRIC = METRICS[0];
  const state = { key: NATION, y: DEFAULT_YEAR, h: NP.length - 1, metric: DEFAULT_METRIC, coop: null, focus: false, sort: "assets", cat: "paid" };
  const metricVal = (m, k) => (m.src === "ins" ? ins(k, state.y, m.key) : null);

  // ---------- 선택 ----------
  const selSido = $("#sido"), selSgg = $("#sgg"), selYear = $("#year"), selHalf = $("#half");
  selSido.innerHTML = `<option value="${NATION}">전국</option>` + SIDO_CODES.map((s) => `<option value="${s}">${T.sidos[s].name}</option>`).join("");
  selYear.innerHTML = AP.map((_, i) => `<option value="${i}">${apLabel(i)}${AP[i].m === 12 ? "" : " 누계"}</option>`).reverse().join("");
  selHalf.innerHTML = NP.map((h, i) => `<option value="${i}">${halfLabel(h)} 말</option>`).reverse().join("");
  selSido.addEventListener("change", () => select(selSido.value));
  selSgg.addEventListener("change", () => select(selSgg.value || selSido.value));
  selYear.addEventListener("change", () => { state.y = +selYear.value; render(false); });
  selHalf.addEventListener("change", () => { state.h = +selHalf.value; render(false); });

  function syncControls() {
    const s = sidoOf(state.key);
    selSido.value = s || NATION;
    selSgg.disabled = !s;
    selSgg.innerHTML = `<option value="">${s ? "전체" : "–"}</option>` + (s ? UNITS_BY_SIDO[s].map((k) => `<option value="${k}">${label(k)}</option>`).join("") : "");
    selSgg.value = level(state.key) === 2 ? state.key : "";
    selYear.value = state.y;
    selHalf.value = state.h;
  }

  // ---------- 주소: #경상북도/의성군?y=2025&h=202606&m=npl&c=0010027… ----------
  function syncURL() {
    const k = state.key;
    const path = k === NATION ? "" : level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`;
    const q = new URLSearchParams();
    if (state.y !== DEFAULT_YEAR) q.set("y", `${AP[state.y].y}${AP[state.y].m === 12 ? "" : `.${AP[state.y].m}`}`);
    if (state.h !== NP.length - 1) q.set("h", NP[state.h]);
    if (state.metric !== DEFAULT_METRIC) q.set("m", state.metric.key);
    if (state.coop) q.set("c", state.coop);
    const url = `${location.pathname}${q.toString() ? `?${q}` : ""}${path ? `#${encodeURIComponent(path)}` : ""}`;
    if (url !== location.pathname + location.search + location.hash) history.replaceState(null, "", url);
  }
  function fromURL() {
    const [a, b] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = SIDO_CODES.find((c) => T.sidos[c].name === a || T.sidos[c].short === a);
    state.key = s ? (b && UNITS_BY_SIDO[s].find((k) => label(k) === b)) || s : NATION;
    const q = new URLSearchParams(location.search);
    const yi = AP.findIndex((p) => `${p.y}${p.m === 12 ? "" : `.${p.m}`}` === q.get("y"));
    state.y = yi >= 0 ? yi : DEFAULT_YEAR;
    const hi = NP.indexOf(q.get("h"));
    state.h = hi >= 0 ? hi : NP.length - 1;
    state.metric = METRICS.find((m) => m.key === q.get("m")) || DEFAULT_METRIC;
    state.coop = BY_CODE.has(q.get("c")) ? q.get("c") : null;
  }

  // ---------- 지도 ----------
  const RAMP = ["#3b3428", "#5e4925", "#8a6322", "#c0841f", "#f5a524"];
  const DIV = ["#5fb3ff", "#2f5f93", "#3a3d44", "#93453b", "#ff6b5e"];
  const EMPTY = "#2a2d33";
  const BASE = "#30343b"; // 농협 지표일 때 시군 바탕
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
  // 울릉군은 그리는 자리만 서쪽으로 0.8° 당긴다 (power.js와 같다). 조합 점도 같이 옮긴다
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
    world.selectAll("g.coops").data([0]).join("g").attr("class", "coops");
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
    const fc = state.focus && state.coop && BY_CODE.get(state.coop);
    if (fc?.xy) {
      // 목록에서 고른 조합: 본점을 가운데로, 시도를 볼 때보다 조금 더 가까이 (이미 시군을 보고 있으면 그 배율)
      const [cx, cy] = project(...fc.xy);
      const sk = sidoOf(fc.r.split("|")[0]);
      const [[x0, y0], [x1, y1]] = path.bounds(sidoFeatures.find((f) => f.properties.key === sk));
      const k = Math.min(16, Math.max(view.k || 1, Math.min((size.w - 56) / (x1 - x0), (size.h - 56) / (y1 - y0)) * 1.6));
      return d3.zoomIdentity.translate(size.w / 2 - cx * k, size.h / 2 - cy * k).scale(k);
    }
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
    sizeDots();
    drawLabels(view, animate);
    drawFocus(animate);
  }
  // 고른 조합 표식: 지표와 상관없이 본점 자리에 고리와 이름 (지도 배율과 상관없이 같은 크기)
  function drawFocus(animate) {
    const c = state.coop && BY_CODE.get(state.coop);
    const g = mapSvg.selectAll("g.coop-focus").data(c?.xy ? [c] : []).join((en) => en.append("g").attr("class", "coop-focus"));
    if (!c?.xy) return;
    const [x, y] = project(...c.xy), sx = x * view.k + view.x, sy = y * view.k + view.y;
    g.html(`<circle class="af-fring" r="14"></circle><circle class="af-fdot" r="5"></circle><text class="af-fname" y="-20">${esc(c.n)}</text>`)
      .attr("transform", `translate(${sx},${sy})`).style("opacity", animate && !reduceMotion ? 0 : 1);
    if (animate && !reduceMotion) g.transition().delay(650).duration(250).style("opacity", 1);
    g.raise();
  }

  const pickSido = (k) => level(state.key) === 0 || sidoOf(k) !== sidoOf(state.key);
  function onRegionClick(k) {
    if (pickSido(k)) select(sidoOf(k));
    else if (k === state.key) select(sidoOf(k));
    else select(k);
  }
  function hoverRegion(e, k) {
    const m = state.metric;
    let html = `<b>${esc(fullLabel(k))}</b>`;
    if (m.src === "ins") html += isSibu(k) ? "보험은 구별로만 공시" : `${m.label} <b style="display:inline">${m.fmt(metricVal(m, k))}</b><br>${apLabel(state.y)}`;
    else html += `지역농협 ${coopsIn(k, state.h).length}곳`;
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

  // 색: 값 순서로 다섯 구간 (당기순이익은 0을 가운데로 적자는 파랑)
  function scaleFor(m, vals) {
    if (!vals.length) return { fn: () => EMPTY, rows: [] };
    if (m.div) {
      const neg = vals.filter((v) => v < 0), pos = vals.filter((v) => v >= 0);
      const qn = neg.length ? d3.quantile(neg.sort(d3.ascending), 0.5) : 0;
      const qp = pos.length ? d3.quantile(pos.sort(d3.ascending), 0.5) : 0;
      const cuts = [qn, 0, Number.EPSILON, qp];
      return {
        fn: (v) => DIV[v < qn ? 0 : v < 0 ? 1 : v === 0 ? 2 : v < qp ? 3 : 4],
        rows: [[DIV[0], `${m.fmt(qn)} 미만`], [DIV[1], `적자 ~ ${m.fmt(qn)}`], [DIV[3], `흑자 ~ ${m.fmt(qp)}`], [DIV[4], `${m.fmt(qp)} 이상`]],
        cuts,
      };
    }
    const q = d3.scaleQuantile().domain(vals).range(RAMP);
    const e = [d3.min(vals), ...q.quantiles(), d3.max(vals)];
    return { fn: q, rows: RAMP.map((c, i) => [c, `${m.fmt(e[i])}–${m.fmt(e[i + 1])}`]) };
  }

  function paintMap() {
    const m = state.metric, s = sidoOf(state.key);
    const dotsOn = m.src === "coop";
    let sc, missing = 0;
    if (m.src === "ins") {
      const vals = ALL_UNITS.map((k) => metricVal(m, k)).filter(ok);
      sc = scaleFor(m, vals);
      missing = ALL_UNITS.length - vals.length;
      mapSvg.selectAll("path.unit").attr("fill", (d) => { const v = metricVal(m, d.properties.key); return ok(v) ? sc.fn(v) : EMPTY; });
    } else {
      mapSvg.selectAll("path.unit").attr("fill", BASE);
      const peers = coopsIn(s ? s : NATION, state.h).map((c) => val(c, m.key, state.h)).filter(ok);
      sc = scaleFor(m, peers);
    }
    mapSvg.selectAll("path.unit")
      .classed("sel", (d) => d.properties.key === state.key)
      .classed("pw-ctx", (d) => !!s && d.properties.sido !== s)
      .attr("aria-label", (d) => `${fullLabel(d.properties.key)} ${m.label}`);
    mapSvg.selectAll("path.unit.sel").raise();
    mapSvg.classed("dimmed", level(state.key) === 2);
    drawDots(dotsOn ? sc : null);
    const when = m.src === "ins" ? apLabel(state.y) : `${halfLabel(NP[state.h])} 말`;
    $("#legend").innerHTML = `<span class="title">${m.label} <span style="color:var(--faint);font-weight:400">${when}</span></span>`
      + sc.rows.map(([c, t]) => `<span class="row"><span class="sw" style="background:${c}"></span>${t}</span>`).join("")
      + (missing ? `<span class="row"><span class="sw" style="background:${EMPTY};outline:1px solid #3a3f48"></span>공시 없음 ${missing}</span>` : "");
    $("#metric-note").textContent = m.note;
    $("#map").setAttribute("aria-label", `${m.label} 지도`);
  }

  // 조합 점: 고른 시도(전국이면 전국) 조합만 색을 칠하고, 나머지는 흐린 점
  const DOT_R = { nation: 3, zoom: 4.5 }; // 화면에서의 반지름(px). 지도 묶음이 k배로 커지므로 1/k로 그린다
  function drawDots(sc) {
    const g = mapSvg.select("g.coops");
    if (!sc) { g.selectAll("circle").remove(); return; }
    const m = state.metric, s = sidoOf(state.key), h = state.h;
    const data = COOPS.filter((c) => c.xy && alive(c, h));
    const inScope = (c) => !s || coopSido(c) === s;
    const inUnit = (c) => level(state.key) !== 2 || c.r === state.key;
    g.selectAll("circle").data(data, (c) => c.c).join("circle")
      .attr("class", (c) => `af-dot${inScope(c) ? "" : " ctx"}${inUnit(c) ? "" : " out"}${c.c === state.coop ? " sel" : ""}`)
      .attr("cx", (c) => project(...c.xy)[0]).attr("cy", (c) => project(...c.xy)[1])
      .attr("fill", (c) => { const v = val(c, m.key, h); return inScope(c) && ok(v) ? sc.fn(v) : "#5a5f69"; })
      .on("mousemove", (e, c) => showTip(e, `<b>${esc(c.n)}</b>${KIND[c.k]} · ${esc(placeOf(c))}<br>${m.label} <b style="display:inline">${m.fmt(val(c, m.key, h))}</b>`))
      .on("mouseleave", () => { tip.hidden = true; })
      .on("click", (e, c) => { e.stopPropagation(); pickCoop(c.c); });
    g.selectAll("circle.sel").raise();
    sizeDots();
  }
  function sizeDots() {
    const k = view.k || 1;
    const r = k > 1 ? DOT_R.zoom : DOT_R.nation;
    mapSvg.select("g.coops").selectAll("circle")
      .attr("r", (c) => (c.c === state.coop ? r * 1.7 : r) / k)
      .attr("stroke-width", 0.8 / k);
  }
  const placeOf = (c) => (c.r.includes("|") ? fullLabel(c.r) : `${T.sidos[c.r]?.short ?? ""} (본점 시도)`);

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

  // ---------- 순위: 공시값 큰 순서 ----------
  function renderRank() {
    const m = state.metric, s = sidoOf(state.key);
    let list, name, when, unitWord;
    if (m.src === "ins") {
      const peers = s ? UNITS_BY_SIDO[s] : ALL_UNITS;
      list = peers.map((k) => [k, metricVal(m, k)]).filter(([, v]) => ok(v)).sort((a, b) => b[1] - a[1]);
      name = (k) => (s ? label(k) : fullLabel(k));
      when = apLabel(state.y);
      unitWord = s ? `${T.sidos[s].short} 시군` : "시군";
    } else {
      list = coopsIn(state.key, state.h).map((c) => [c.c, val(c, m.key, state.h)]).filter(([, v]) => ok(v)).sort((a, b) => b[1] - a[1]);
      name = (cd) => BY_CODE.get(cd).n;
      when = `${halfLabel(NP[state.h])} 말`;
      unitWord = `${level(state.key) ? shortLabel(state.key) : "전국"} 농·축협`;
    }
    const max = Math.max(...list.map(([, v]) => Math.abs(v)), 0) || 1;
    const sel = m.src === "ins" ? state.key : state.coop;
    const row = ([k, v], no) => `
      <button type="button" class="rank-row wide${k === sel ? " sel" : ""}" data-r="${k}">
        <span class="no">${no}</span><span class="nm">${esc(name(k))}</span>
        <span class="track"><span class="fill${v < 0 ? " neg" : ""}" style="width:${(Math.abs(v) / max) * 100}%"></span></span>
        <span class="val">${m.fmt(v)}</span><span></span>
      </button>`;
    const top = list.slice(0, 10);
    $("#rank").innerHTML = list.length ? `
      <div class="rank-title"><span><b>${m.label}</b> 상위 ${unitWord}</span><span class="rank-meta">${when}</span></div>
      <div>${top.slice(0, 5).map((d, j) => row(d, j + 1)).join("")}</div>
      <div>${top.slice(5).map((d, j) => row(d, j + 6)).join("")}</div>` : "";
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => (m.src === "ins" ? select(b.dataset.r) : pickCoop(b.dataset.r, true))));
  }

  // ---------- 왼쪽: 농작물재해보험 ----------
  function setStat(key, [v, u]) {
    $(`[data-v="${key}"]`).textContent = v;
    $(`[data-u="${key}"]`).textContent = u;
  }
  function renderIns() {
    const k = state.key, y = state.y;
    $("#ins-scope").textContent = `(${fullLabel(k)})`;
    $$("[data-year]").forEach((el) => { el.textContent = apLabel(y) + (AP[y].m === 12 ? "" : " 누계"); });
    const sibu = isSibu(k);
    const t = sibu ? null : insRow(k, y)?.t;
    const g = (c) => t?.[COL[c]] ?? null;
    setStat("cnt", cnt(g("cnt"), "건"));
    setStat("amt", mil(g("amt")));
    setStat("area", ok(g("area")) ? [nf0.format(g("area")), "ha"] : ["–", ""]);
    setStat("rate", ok(g("rate")) ? [nf1.format(g("rate")), "%"] : [level(k) === 2 ? "미공시" : "–", ""]);
    const pair = $("#ins-pair");
    if (sibu) {
      // 광역시 구: 구별 공시값을 그대로 늘어놓는다 (더하지 않는다)
      const gu = A.gu[sidoOf(k)] || {};
      const rows = Object.entries(gu).map(([name, arr]) => [name, arr[y]?.t]).filter(([, tt]) => tt);
      pair.innerHTML = rows.length ? `<table class="af-mini"><thead><tr><th>구</th><th>가입건수</th><th>순보험료</th><th>지급보험금</th></tr></thead><tbody>${rows
        .map(([name, tt]) => `<tr><td>${esc(name)}</td><td>${nf0.format(tt[COL.cnt] ?? 0)}</td><td>${milS(tt[COL.prem])}</td><td>${milS(tt[COL.paid])}</td></tr>`).join("")}</tbody></table>` : `<p class="af-empty">공시 없음</p>`;
      $("#ins-note").textContent = "광역시의 구는 구별로만 공시됩니다. 더한 값을 만들지 않고 구별 값을 그대로 보여 줍니다.";
      return;
    }
    const prem = g("prem"), paid = g("paid");
    const max = Math.max(prem || 0, paid || 0) || 1;
    pair.innerHTML = ok(prem) || ok(paid) ? `
      <div class="af-pair-row"><span class="af-pair-l">순보험료</span><span class="af-track"><i class="af-prem" style="width:${((prem || 0) / max) * 100}%"></i></span><b>${milS(prem)}</b></div>
      <div class="af-pair-row"><span class="af-pair-l">지급보험금</span><span class="af-track"><i class="af-paid" style="width:${((paid || 0) / max) * 100}%"></i></span><b>${milS(paid)}</b></div>` : `<p class="af-empty">공시 없음</p>`;
    $("#ins-note").textContent = level(k) === 2 ? "가입률은 전국·시도만 공시됩니다." : (AP[y].m === 12 ? "" : `${AP[y].y}년은 ${AP[y].m}월까지의 누계입니다.`);
  }

  // 품목별: 한 줄에 한 품목 — 이름 · 쌍 막대(보험료 주황·보험금 파랑, 같은 축) · 보험료 · 보험금 · 가입건수 · 가입률 (모두 공시값).
  // 순서는 지급보험금 큰 순. 보험금이 보험료보다 크면 보험금 값을 파랑으로
  function renderCats() {
    const rows = (isSibu(state.key) ? [] : insRow(state.key, state.y)?.c || [])
      .map(([ci, ...v]) => ({ ci, prem: v[COL.prem], paid: v[COL.paid], cnt: v[COL.cnt], rate: v[COL.rate] }))
      .filter((r) => ok(r.prem) || ok(r.paid)).sort((a, b) => (b.paid ?? -1) - (a.paid ?? -1));
    const max = Math.max(...rows.flatMap((r) => [r.prem || 0, r.paid || 0]), 0) || 1;
    const sub = level(state.key) === 2;
    const eok1 = (v) => (!ok(v) ? "–" : Math.abs(v) < 1000 ? nf1.format(v / 100) : nf0.format(v / 100)); // 백만원 → 억원 숫자만 (10억 미만은 소수 한 자리)
    $("#cat-unit").textContent = "금액 억원";
    $("#cat-bars").innerHTML = rows.length ? `<div class="af-ch${sub ? " sub" : ""}"><span>품목</span><span></span><span class="h-prem"><i></i>보험료</span><span class="h-paid"><i></i>보험금</span><span>가입건수</span>${sub ? "" : "<span>가입률</span>"}</div>` + rows.map((r) => {
      const [big, mid] = catName(r.ci);
      const over = ok(r.paid) && ok(r.prem) && r.paid > r.prem;
      return `<div class="af-cr${sub ? " sub" : ""}" title="${esc(big)} › ${esc(mid)} · 순보험료 ${milS(r.prem)} · 지급보험금 ${milS(r.paid)}${over ? " (보험금이 더 많음)" : ""} · 가입 ${cnt(r.cnt, "건").join("")}${ok(r.rate) ? ` · 가입률 ${nf1.format(r.rate)}%` : ""}">
        <span class="af-bar-l">${esc(mid)}</span>
        <span class="af-cb"><i class="af-prem" style="width:${((r.prem || 0) / max) * 100}%"></i><i class="af-paid" style="width:${((r.paid || 0) / max) * 100}%"></i></span>
        <span class="af-cn v">${eok1(r.prem)}</span><span class="af-cn v paid${over ? " af-over" : ""}">${eok1(r.paid)}</span>
        <span class="af-cn">${cnt(r.cnt, "").join("")}</span>${sub ? "" : `<span class="af-cn">${ok(r.rate) ? `${nf1.format(r.rate)}%` : "–"}</span>`}
      </div>`;
    }).join("")
      : `<p class="af-empty">${isSibu(state.key) ? "광역시의 구는 왼쪽 위 표에서 구별로 봅니다." : "공시 없음"}</p>`;
  }

  function frame(el, h0) {
    const w = el.clientWidth || 300, h = el.clientHeight || h0;
    el._wh = [w, h];
    el.innerHTML = "";
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    return { svg, w, h };
  }
  function drawYears() {
    const k = state.key, el = $("#chart-years");
    const { svg, w, h } = frame(el, 120);
    $("#years-range").textContent = `${apShort(0)}~${apShort(AP.length - 1)}`;
    const rows = AP.map((_, i) => ({ i, prem: isSibu(k) ? null : ins(k, i, "prem"), paid: isSibu(k) ? null : ins(k, i, "paid") }));
    const top = d3.max(rows, (r) => Math.max(r.prem || 0, r.paid || 0));
    if (!top) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text(isSibu(k) ? "광역시의 구는 구별로만 공시" : "공시 없음"); $("#years-key").innerHTML = ""; return; }
    const m = { l: 44, r: 6, t: 8, b: 18 };
    const x = d3.scaleBand().domain(rows.map((r) => r.i)).range([m.l, w - m.r]).padding(0.28);
    const x2 = d3.scaleBand().domain(["prem", "paid"]).range([0, x.bandwidth()]).padding(0.08);
    const y = d3.scaleLinear().domain([0, top * 1.05]).nice(3).range([h - m.b, m.t]);
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(y.ticks(3)).join("g").call((g) => {
      g.append("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (d) => y(d)).attr("y2", (d) => y(d));
      g.append("text").attr("x", m.l - 5).attr("y", (d) => y(d) + 4).attr("text-anchor", "end").text((d) => (d ? milS(d) : "0"));
    });
    const grp = svg.append("g").selectAll("g").data(rows).join("g").attr("transform", (r) => `translate(${x(r.i)},0)`);
    for (const f of ["prem", "paid"]) {
      grp.filter((r) => ok(r[f])).append("rect").attr("class", f === "prem" ? "af-prem" : "af-paid")
        .attr("x", x2(f)).attr("width", x2.bandwidth()).attr("y", (r) => y(r[f])).attr("height", (r) => y(0) - y(r[f]))
        .classed("af-partial", (r) => AP[r.i].m !== 12)
        .append("title").text((r) => `${apLabel(r.i)} ${f === "prem" ? "순보험료" : "지급보험금"} ${milS(r[f])}`);
    }
    grp.filter((r) => r.i === state.y).insert("rect", ":first-child").attr("class", "af-ysel").attr("x", -3).attr("width", x.bandwidth() + 6).attr("y", m.t - 4).attr("height", h - m.t - m.b + 4);
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(rows).join("text")
      .attr("x", (r) => x(r.i) + x.bandwidth() / 2).attr("y", h - 4).attr("text-anchor", "middle").text((r) => apShort(r.i));
    svg.append("g").selectAll("rect").data(rows).join("rect").attr("x", (r) => x(r.i)).attr("width", x.bandwidth()).attr("y", 0).attr("height", h)
      .attr("fill", "transparent").style("cursor", "pointer").on("click", (e, r) => { state.y = r.i; render(false); })
      .append("title").text((r) => `${apLabel(r.i)} 보기`);
    $("#years-key").innerHTML = `<span><i class="e"></i>순보험료</span><span><i class="af-k-paid"></i>지급보험금</span>${AP.at(-1).m !== 12 ? `<span>${apShort(AP.length - 1)}: 그해 누계(흐리게)</span>` : ""}`;
  }

  // ---------- 오른쪽: 조합 ----------
  function scopeCoops() {
    return coopsIn(state.key, state.h);
  }
  function currentCoop() {
    const list = scopeCoops();
    const picked = state.coop && BY_CODE.get(state.coop);
    if (picked && list.includes(picked)) return picked;
    return list.slice().sort((a, b) => (val(b, "assets", state.h) ?? -1) - (val(a, "assets", state.h) ?? -1))[0] || null;
  }
  function pickCoop(cd, move = false) {
    state.coop = cd;
    if (move) state.focus = true; // 지도 점을 누르면 확대 상태는 그대로 두고 표식만 옮긴다
    if (state.focus) { applyView(true); renderHero(); } else drawFocus(false);
    syncURL();
    renderCoop();
    renderList();
    drawDots(state.metric.src === "coop" ? scaleFor(state.metric, coopsIn(sidoOf(state.key) || NATION, state.h).map((c) => val(c, state.metric.key, state.h)).filter(ok)) : null);
    renderRank();
  }
  function renderCoop() {
    const c = currentCoop(), h = state.h;
    $$("[data-half]").forEach((el) => { el.textContent = `${halfLabel(NP[h])} 말`; });
    const box = $("#coop-card");
    if (!c) { $("#coop-title").textContent = "조합"; box.innerHTML = `<p class="af-empty">${level(state.key) === 2 ? "이 시군에 본점을 둔 지역농협이 없습니다. 축협·품목농협은 시도 화면에서 봅니다." : "공시 없음"}</p>`; return; }
    $("#coop-title").innerHTML = `${esc(c.n)} <span class="af-kind af-k${c.k}">${KIND[c.k]}</span>`;
    const big = (lab, [v, u]) => `<div class="stat"><span class="stat-label">${lab}</span><span class="stat-value"><b>${v}</b><small>${u}</small></span></div>`;
    const lm = val(c, "loanM", h), la = val(c, "loanA", h), ln = val(c, "loanN", h);
    const parts = [["조합원", lm, "m"], ["준조합원", la, "a"], ["비조합원", ln, "n"]].filter(([, v]) => ok(v) && v > 0);
    const tot = parts.reduce((s, [, v]) => s + v, 0) || 1; // 막대 길이용 (화면에 숫자로 내지 않는다)
    const [roa, roaAt] = lastDec(c, "roa", h);
    const income = val(c, "income", h);
    box.innerHTML = `
      <p class="af-place">${esc(placeOf(c))}${c.h ? ` · 누리집 이름 ${esc(c.h)}` : ""}</p>
      <div class="stats two">
        ${big("조합원", cnt(val(c, "members", h), "명"))}
        ${big("자산총계", eok(val(c, "assets", h)))}
        ${big("예수부채", eok(val(c, "deposits", h)))}
        ${big("총대출", eok(val(c, "loans", h)))}
      </div>
      <h3 class="sub-head">누구에게 빌려주나 <span>유형별 대출 공시값</span></h3>
      ${parts.length ? `<div class="af-stack">${parts.map(([, v, cl]) => `<i class="af-s${cl}" style="flex-grow:${v / tot}"></i>`).join("")}</div>
      <div class="af-stack-key">${parts.map(([t, v, cl]) => `<span><i class="af-s${cl}"></i>${t} <b>${eokS(v)}</b></span>`).join("")}</div>` : `<p class="af-empty">공시 없음</p>`}
      <p class="af-line">정책자금대출금 <b>${eokS(val(c, "policy", h))}</b></p>
      <h3 class="sub-head">공시 비율 <span>금감원 공시값 그대로</span></h3>
      <div class="af-ratios">
        <div><span>고정이하여신비율</span><b>${pct(val(c, "npl", h))}</b></div>
        <div><span>예대율</span><b>${pct(val(c, "ldr", h))}</b></div>
        <div><span>ROA${ok(roa) && roaAt !== h ? ` <em>${halfShort(NP[roaAt])}</em>` : ""}</span><b>${pct(roa)}</b></div>
        <div><span>당기순이익 <em>${NP[h].endsWith("06") ? "상반기" : "1년"}</em></span><b class="${ok(income) && income < 0 ? "af-neg" : ""}">${eokS(income)}</b></div>
      </div>
      <div class="af-sparks">
        <div><h3 class="sub-head">자산총계 <span class="af-sv" data-sv="assets"></span></h3><div class="af-spark" data-f="assets"></div></div>
        <div><h3 class="sub-head">고정이하여신비율 <span class="af-sv" data-sv="npl"></span></h3><div class="af-spark" data-f="npl"></div></div>
      </div>`;
    drawSparks(c);
  }

  // 조합 추이: 반기 6개 선 그림. 값 범위에 맞춘 세로축(0부터가 아님)이라 막대 대신 선으로 그린다.
  // 처음·끝 값을 적고, 반기에 마우스를 올리면 제목 옆에 그 반기 값 (고른 반기는 주황 점)
  function drawSparks(c) {
    const FMT = { assets: eokS, npl: pct };
    $$("#coop-card .af-spark").forEach((el) => {
      const f = el.dataset.f, fmt = FMT[f], out = $(`#coop-card [data-sv="${f}"]`);
      const vs = NP.map((_, j) => val(c, f, j));
      const pts = vs.map((v, j) => [j, v]).filter(([, v]) => ok(v));
      const w = el.clientWidth || 150, h = el.clientHeight || 70, m = { l: 4, r: 4, t: 20, b: 14 };
      el.innerHTML = "";
      const when = (j) => `${NP[j].slice(2, 4)}년 ${+NP[j].slice(4)}월 말`;
      // 고른 반기 값은 날짜 없이 (카드 머리에 반기가 있다), 다른 반기에 마우스를 올리면 그 날짜를 붙인다
      const showVal = (j) => { out.innerHTML = ok(vs[j]) ? `<b>${fmt(vs[j])}</b>${j === state.h ? "" : `<em>${when(j)}</em>`}` : `<em>${when(j)} 공시 없음</em>`; };
      showVal(state.h);
      if (pts.length < 2) { el.innerHTML = `<p class="af-empty">공시 ${pts.length ? "한 번뿐" : "없음"}</p>`; return; }
      const [lo, hi] = d3.extent(pts, (p) => p[1]), pad = (hi - lo) * 0.15 || Math.abs(hi) * 0.05 || 1;
      const x = d3.scalePoint().domain(d3.range(NP.length)).range([m.l + 10, w - m.r - 10]);
      const y = d3.scaleLinear().domain([lo - pad, hi + pad]).range([h - m.b, m.t]);
      const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
      svg.append("path").attr("class", "af-sl").attr("d", d3.line().defined((d) => ok(d[1])).x((d) => x(d[0])).y((d) => y(d[1]))(vs.map((v, j) => [j, v])));
      svg.append("g").selectAll("circle").data(pts).join("circle").attr("class", (d) => `af-sd${d[0] === state.h ? " cur" : ""}`)
        .attr("cx", (d) => x(d[0])).attr("cy", (d) => y(d[1])).attr("r", (d) => (d[0] === state.h ? 4 : 2.6));
      // 처음·끝 값은 위 양쪽 끝에 (선과 겹치지 않게)
      const ends = [pts[0], pts.at(-1)];
      svg.append("g").selectAll("text").data(ends).join("text").attr("class", "af-se")
        .attr("x", (d, i) => (i ? w - m.r : m.l)).attr("y", 10).attr("text-anchor", (d, i) => (i ? "end" : "start"))
        .html((d) => `<tspan class="af-sed">${halfShort(NP[d[0]])}</tspan><tspan dx="4">${fmt(d[1])}</tspan>`);
      svg.append("g").selectAll("text").data(NP).join("text").attr("class", "af-sx")
        .attr("x", (d, j) => x(j)).attr("y", h - 2).attr("text-anchor", "middle").text((d) => halfShort(d));
      svg.append("g").selectAll("rect").data(NP).join("rect").attr("x", (d, j) => x(j) - x.step() / 2).attr("width", x.step()).attr("y", 0).attr("height", h).attr("fill", "transparent")
        .on("mouseenter", function (e, d) { const j = NP.indexOf(d); d3.select(this).attr("fill", "rgba(255,255,255,0.05)"); showVal(j); })
        .on("mouseleave", function () { d3.select(this).attr("fill", "transparent"); showVal(state.h); });
    });
  }

  const COLS = [
    ["n", "조합", (c) => c.n, (c) => `<span class="af-dotk af-k${c.k}" title="${KIND[c.k]}"></span>${esc(c.n)}`],
    ["members", "조합원", (c) => val(c, "members", state.h), (c) => nf0.format(val(c, "members", state.h) ?? 0)],
    ["assets", "자산", (c) => val(c, "assets", state.h), (c) => eokS(val(c, "assets", state.h))],
    ["npl", "고정이하", (c) => val(c, "npl", state.h), (c) => pct(val(c, "npl", state.h))],
    ["income", "순이익", (c) => val(c, "income", state.h), (c) => { const v = val(c, "income", state.h); return `<span class="${ok(v) && v < 0 ? "af-neg" : ""}">${eokS(v)}</span>`; }],
  ];
  function renderList() {
    const list = scopeCoops();
    const k = state.key;
    $("#list-scope").textContent = `(${fullLabel(k)}${level(k) === 2 ? " 지역농협" : ""})`;
    const by = { L: 0, X: 0, I: 0 };
    list.forEach((c) => { by[c.k]++; });
    $("#list-count").textContent = level(k) === 2 ? `${list.length}곳` : `지역농협 ${by.L} · 축협 ${by.X} · 품목 ${by.I}`;
    const [key, , get] = COLS.find((x) => x[0] === state.sort);
    const sorted = list.slice().sort((a, b) => (key === "n" ? get(a).localeCompare(get(b), "ko") : (get(b) ?? -Infinity) - (get(a) ?? -Infinity)));
    const cur = currentCoop();
    $("#coop-table").innerHTML = `<thead><tr>${COLS.map(([f, t]) => `<th><button type="button" data-s="${f}" aria-pressed="${state.sort === f}">${t}</button></th>`).join("")}</tr></thead>
      <tbody>${sorted.map((c) => `<tr data-c="${c.c}" class="${c === cur ? "sel" : ""}" tabindex="0">${COLS.map(([, , , cell]) => `<td>${cell(c)}</td>`).join("")}</tr>`).join("")}</tbody>`;
    $$("#coop-table [data-s]").forEach((b) => b.addEventListener("click", () => { state.sort = b.dataset.s; renderList(); }));
    $$("#coop-table tbody tr").forEach((tr) => {
      tr.addEventListener("click", () => pickCoop(tr.dataset.c, true));
      tr.addEventListener("keydown", (e) => { if (e.key === "Enter") pickCoop(tr.dataset.c, true); });
    });
    $("#list-note").textContent = level(k) === 2
      ? "지역농협만 시군에 놓았습니다. 축협·품목농협은 사업 구역이 여러 시군에 걸쳐 시도 화면에서 봅니다."
      : "지역농협은 본점 시군, 축협·품목농협은 금감원이 정한 시도에 놓았습니다. 열 이름을 누르면 정렬됩니다.";
    // 고른 조합 줄이 보이게 목록 칸만 움직인다 (scrollIntoView는 페이지까지 움직인다)
    const selRow = $("#coop-table tr.sel"), wrap = $(".af-table-wrap");
    if (selRow) {
      const head = $("#coop-table thead").offsetHeight;
      const top = selRow.offsetTop - head, bottom = selRow.offsetTop + selRow.offsetHeight;
      if (top < wrap.scrollTop) wrap.scrollTop = top;
      else if (bottom > wrap.scrollTop + wrap.clientHeight) wrap.scrollTop = bottom - wrap.clientHeight;
    }
  }

  // ---------- 가운데 제목 ----------
  function renderHero() {
    const k = state.key;
    $("#title-region").textContent = label(k);
    $("#crumb").textContent = level(k) === 0 ? "" : level(k) === 1 ? "전국 ›" : `전국 › ${T.sidos[sidoOf(k)].name} ›`;
    const reset = $("#reset");
    reset.hidden = level(k) === 0 && !state.focus;
    reset.textContent = state.focus ? `${level(k) ? shortLabel(k) : "전국"} 다시 보기` : level(k) === 2 ? `${T.sidos[sidoOf(k)].short} 전체보기` : "전국보기";
  }
  $("#reset").addEventListener("click", () => {
    if (state.focus) { state.focus = false; applyView(true); renderHero(); return; } // 조합 확대만 풀고 고른 지역은 그대로
    select(parentOf(state.key) ?? NATION);
  });

  // ---------- 갱신 ----------
  function render(animate = true) {
    syncControls();
    syncURL();
    renderHero();
    renderIns();
    renderCats();
    drawYears();
    renderCoop();
    renderList();
    paintMap();
    renderRank();
    applyView(animate);
  }
  function select(k) {
    const prevSido = sidoOf(state.key);
    state.key = k || NATION;
    state.focus = false;
    if (state.coop && !coopsIn(state.key, state.h).includes(BY_CODE.get(state.coop))) state.coop = null;
    render(prevSido !== sidoOf(state.key));
  }

  fromURL();
  renderChips();
  drawMap();
  render(false);
  $("#built").textContent = `보험 ${apLabel(AP.length - 1)}${AP.at(-1).m === 12 ? "" : " 누계"}까지 · 농협 ${halfLabel(NP.at(-1))} 말까지 · ${N.built} 작성`;
  let mw = 0, mh = 0;
  new ResizeObserver(([e]) => {
    const { width, height } = e.contentRect;
    if (Math.abs(width - mw) < 1 && Math.abs(height - mh) < 1) return;
    mw = width; mh = height;
    drawMap();
    paintMap();
  }).observe($("#map-wrap"));
  const ro = new ResizeObserver((entries) => {
    for (const e of entries) {
      const { width, height } = e.contentRect;
      const drawn = e.target._wh;
      if (drawn && Math.abs(drawn[0] - width) < 1 && Math.abs(drawn[1] - height) < 1) continue;
      drawYears();
    }
  });
  ro.observe($("#chart-years"));
  window.addEventListener("hashchange", () => { fromURL(); render(true); });
})();
