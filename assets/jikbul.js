(() => {
  // 공익직불·고향사랑기금 — 왼쪽·지도는 지자체 예산에 편성된 농업 공익직불(기본형·선택형) 예산 (data/jikbul.js, 지방재정365 세부사업),
  // 오른쪽은 고향사랑기금 회계 (data/gohyang.js, 2023년부터). 둘 다 지방재정365 세부사업별 세출현황이다.
  // 시도·전국 값: 공익직불은 시군 합계(도 본청은 시군으로 내려가는 국비라 빼고, 시군이 없는 세종·제주만 본청),
  //               고향사랑기금은 본청 + 시군(본청도 따로 기부를 받아 기금을 굴린다). 자료마다 제 규칙을 따른다.
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
  // 직불금 = 공익직불 + 공익직불이 아닌 농업 직불(지자체 자체·FTA 피해보전·경영이양·옛 쌀·밭직불). 임업·수산은 뺀다(사용자 2026-11-07)
  const FARM_REFS = J.refs.filter((c) => c !== "임업" && c !== "수산");
  const FARM = [...PUB, ...FARM_REFS];
  const tot = (k, i, f = "amt") => sumC(k, i, FARM, f);
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
    { key: "amt", group: "규모", chip: "직불금", label: "직불금 예산", get: (k, i) => tot(k, i), fmt: milS, note: "공익직불 + 지자체 자체·FTA 등 농업 직불 예산현액(추경·이월 반영, 임업·수산 제외)" },
    { key: "basic", group: "규모", chip: "기본형", label: "기본형 공익직불 예산", get: (k, i) => sumC(k, i, ["기본형"]), fmt: milS, note: "소농·면적직불(국비). 지방비 단독분은 자체 직불로" },
    { key: "own", group: "규모", chip: "자체", label: "지자체 자체 직불 예산", get: (k, i) => sumC(k, i, ["자체·기타"]), fmt: milS, note: "지방비 단독 직불(쌀·밭 소득보전 등)" },
    { key: "select", group: "규모", chip: "선택형", label: "선택형 공익직불 예산", get: (k, i) => sumC(k, i, J.select), fmt: milS, note: "친환경·친환경축산·경관보전·전략작물(국비 사업만)" },
    { key: "farm", group: "견주기", chip: "농가당", label: "농가당 직불금 예산", get: (k, i) => { const a = tot(k, i), h = hh(k); return ok(a) && h ? (a * 1e6) / h : null; }, fmt: manS, note: `예산 ÷ 농가 수(${J.den.years.households}년 농림어업조사)` },
    { key: "ha", group: "견주기", chip: "ha당", label: "경지 1ha당 직불금 예산", get: (k, i) => { const a = tot(k, i), l = land(k); return ok(a) && l ? (a * 1e6) / l : null; }, fmt: manS, note: `예산 ÷ 경지면적(${J.den.years.land}년 농업면적조사)` },
    { key: "share", group: "견주기", chip: "농업예산", label: "농업·농촌 예산 중 직불금 비중", get: (k, i) => { const a = tot(k, i), b = agri(k, i); return ok(a) && b ? (a / b) * 100 : null; }, fmt: (v) => pctS(v), note: "농업·농촌 분야 세출 예산 중 직불금 몫" },
    { key: "local", group: "재원·집행", chip: "지방비", label: "직불금 예산 중 지방비 비율", get: (k, i) => { const a = tot(k, i); return a ? ((tot(k, i, "sido") + tot(k, i, "sigun")) / a) * 100 : null; }, fmt: (v) => pctS(v), note: "(시도비+시군비) ÷ 예산현액. 주로 자체 직불·선택형 매칭분" },
    { key: "exec", group: "재원·집행", chip: "집행률", label: "직불금 집행률", get: (k, i) => { const a = tot(k, i); return a ? (tot(k, i, "ep") / a) * 100 : null; }, fmt: (v) => pctS(v), note: "지출액 ÷ 예산현액. 11~12월 지급이라 올해 값은 연말 확정" },
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
    const pi = P.findIndex((p) => String(p.y) === q.get("y") || p.d === q.get("y")); // 옛 고향사랑기금 주소(?y=20241231)도 받는다
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
    const name = (k) => (level(k) === 1 ? (!s && k === "36" ? "전남광주" : T.sidos[k].short) : (label(k).endsWith("시부") ? "시부" : label(k).replace(/(시|군|구)$/, "")));
    const inView = (k) => { const [x, y] = pos(k); return x > 20 && x < size.w - 20 && y > 16 && y < size.h - 10; };
    const ctx = s ? SIDO_CODES.filter((c) => c !== s && inView(c)) : [];
    // 전국 화면: 광주·전남은 통합(2026년 7월) 전 기준으로 나눠 그리되 이름은 '전남광주' 하나로 단다
    const data = [...keys.filter((k) => !small(k) && Number.isFinite(pos(k)[0]) && (s || k !== "24")), ...ctx];
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
    const a = tot(k, i);
    setStat("amt", mil(a));
    setStat("farm", hh(k) && ok(a) ? man((a * 1e6) / hh(k)) : ["–", ""]);
    setStat("ha", land(k) && ok(a) ? man((a * 1e6) / land(k)) : ["–", ""]);
    const b = agri(k, i);
    setStat("share", ok(a) && b ? [nf1.format((a / b) * 100), "%"] : ["–", ""]);
    const parts = [["국비", tot(k, i, "nat"), "n"], ["시도비", tot(k, i, "sido"), "s"], ["시군비", tot(k, i, "sigun"), "g"]];
    const fsum = parts.reduce((s, [, v]) => s + (v || 0), 0) || 1;
    $("#fund-stack").innerHTML = parts.filter(([, v]) => v > 0).map(([, v, c]) => `<i class="jb-f${c}" style="flex-grow:${v / fsum}"></i>`).join("");
    $("#fund-key").innerHTML = parts.map(([t, v, c]) => `<span><i class="jb-f${c}"></i>${t} <b>${milS(v)}</b> <em>${pctS(((v || 0) / fsum) * 100)}</em></span>`).join("");
    const ep = tot(k, i, "ep");
    $("#exec-line").innerHTML = ok(a) && a
      ? `지출 <b>${milS(ep)}</b> · 집행률 <b>${pctS((ep / a) * 100)}</b>${isFull(i) ? "" : ` <span class="jb-dim">(${+P[i].d.slice(4, 6)}월 말까지 · 직불금은 11~12월 지급)</span>`}`
      : "";
  }

  // 연도별: 기본형·선택형·행정 쌓은 막대. 전국은 농식품부 예산(e-나라지표, 기본형+선택형)을 점으로
  function frame(el, h0) {
    const w = el.clientWidth || 300, h = el.clientHeight || h0;
    el._wh = [w, h];
    el.innerHTML = "";
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    return { svg, w, h };
  }
  const STACK = [["기본형", ["기본형"], "#f5a524"], ["선택형", J.select, "#5fb3ff"], ["행정비", ["행정·점검"], "#6d7380"], ["지자체 자체 등", FARM_REFS, "#5fb37c"]];
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

  // ---------- 왼쪽 가운데: 직불금 / 하위 지역 ----------
  // 분류 이름 (공익직불 구성은 농식품부 안내: 기본형 = 소농·면적직불, 선택형 = 친환경농업·친환경안전축산물·경관보전·전략작물)
  const CAT_SHORT = { 기본형: "기본형", 친환경: "선택·친환경", 친환경축산: "선택·축산", 경관보전: "선택·경관", 전략작물: "선택·전략작물", "선택형(구분 없음)": "선택형",
    "행정·점검": "행정비", "자체·기타": "지자체 자체", FTA: "FTA 피해보전", 경영이양: "경영이양", "옛 직불": "옛 쌀·밭직불" };
  const SHOWN = FARM;   // 임업·수산 직불은 싣지 않는다
  // 사업 줄은 기간마다 따로 파일(data/biz/jikbul/기준일.json). 그 해를 고를 때 받고, 받으면 다시 그린다
  const bizCache = {};
  function loadBiz(i) {
    const d = P[i].d;
    if (!(d in bizCache)) {
      bizCache[d] = fetch(`data/biz/jikbul/${d}.json`).then((r) => r.json()).catch(() => ({}))
        .then((x) => { bizCache[d] = x; if (P[state.p].d === d) renderList(); });
    }
    return bizCache[d] instanceof Promise ? null : bizCache[d];
  }
  function renderList() {
    const k = state.key, i = state.p;
    const tbl = $("#list-table");
    if (level(k) === 2 && !noUnitBudget(k)) {
      $("#list-title").firstChild.textContent = "직불금 ";
      $("#list-scope").textContent = `(${fullLabel(k)})`;
      // 묶음 순서: 공익직불(기본형 → 선택형 → 행정비) → 국비 직불(FTA·경영이양·옛 쌀·밭) → 지자체 자체. 묶음 안에서는 예산 큰 순
      const GROUPS = [["공익직불 · 기본형", ["기본형"]], ["공익직불 · 선택형", J.select], ["공익직불 · 행정비", ["행정·점검"]],
        ["그 밖의 국비 직불", ["FTA", "경영이양", "옛 직불"]], ["지자체 자체 직불", ["자체·기타"]]];
      const B = loadBiz(i);
      const all = ((B && B[k]) || []).filter((r) => SHOWN.includes(r[1]));
      const rows = GROUPS.flatMap(([g, cats]) => {
        const rs = all.filter((r) => cats.includes(r[1])).sort((a, b) => b[2] - a[2]);
        return rs.length ? [[g, rs.reduce((t, r) => t + r[2], 0)], ...rs] : [];
      });
      $("#list-count").textContent = all.length ? `${all.length}개 사업` : "";
      tbl.innerHTML = `<thead><tr><th>사업</th><th>분류</th><th>예산</th><th>지방비</th><th>지출</th></tr></thead><tbody>${all.length
        ? rows.map((r) => r.length === 2
          ? `<tr class="jb-grp"><td colspan="2">${esc(r[0])}</td><td>${eok1(r[1])}</td><td colspan="2"></td></tr>`
          : (([n, c, amt, , sd, sg, ep]) => `<tr><td title="${esc(n)}">${esc(n)}</td><td><span class="jb-tag">${CAT_SHORT[c] || c}</span></td><td>${eok1(amt)}</td><td>${sd + sg ? eok1(sd + sg) : "–"}</td><td>${eok1(ep)}</td></tr>`)(r)).join("")
        : `<tr class="af-none"><td colspan="5">${B ? "직불 사업이 없습니다" : "불러오는 중…"}</td></tr>`}</tbody>`;
      $("#list-note").textContent = "지방재정365 세부사업명 그대로(억원). 기본형·선택 = 공익직불, 지자체 자체 = 국비 없는 직불. FTA는 시도비로 적어도 국비로 셈. 임업·수산 제외.";
      return;
    }
    // 전국: 시도별, 시도: 시군별
    const pk = noUnitBudget(k) ? sidoOf(k) : k;
    const kids = childrenOf(pk).filter((c) => !noUnitBudget(c));
    $("#list-title").firstChild.textContent = level(pk) === 0 ? "시도별 직불금 " : "시군별 직불금 ";
    $("#list-scope").textContent = `(${fullLabel(pk)})`;
    const COLS = [
      ["n", "지역", (c) => label(c)],
      ["amt", "직불금", (c) => tot(c, i)],
      ["basic", "기본형", (c) => sumC(c, i, ["기본형"])],
      ["select", "선택형", (c) => sumC(c, i, J.select)],
      ["own", "자체", (c) => sumC(c, i, ["자체·기타"])],
    ];
    const [, , get] = COLS.find((x) => x[0] === state.sort) || COLS[1];
    const rows = kids.map((c) => c).sort((a, b) => (state.sort === "n" ? get(a).localeCompare(get(b), "ko") : (get(b) ?? -Infinity) - (get(a) ?? -Infinity)));
    $("#list-count").textContent = `${rows.length}곳`;
    tbl.innerHTML = `<thead><tr>${COLS.map(([f, t]) => `<th><button type="button" data-s="${f}" aria-pressed="${state.sort === f}">${t}</button></th>`).join("")}</tr></thead>
      <tbody>${rows.map((c) => `<tr data-k="${c}" tabindex="0"><td>${esc(level(c) === 1 ? T.sidos[c].short : label(c))}</td><td>${eok1(tot(c, i))}</td><td>${eok1(sumC(c, i, ["기본형"]))}</td><td>${eok1(sumC(c, i, J.select))}</td><td>${(() => { const v = sumC(c, i, ["자체·기타"]); return v ? eok1(v) : "–"; })()}</td></tr>`).join("")}</tbody>`;
    $$("#list-table [data-s]").forEach((b) => b.addEventListener("click", () => { state.sort = b.dataset.s; renderList(); }));
    $$("#list-table tbody tr[data-k]").forEach((tr) => {
      tr.addEventListener("click", () => select(tr.dataset.k));
      tr.addEventListener("keydown", (e) => { if (e.key === "Enter") select(tr.dataset.k); });
    });
    $("#list-note").textContent = `억원. 직불금 = 공익직불 + 자체·FTA 등(임업·수산 제외). 줄을 누르면 그 지역으로.${pk === "39" ? " 제주는 도 예산만." : ""}`;
  }

  // ---------- 검증 한 줄 (꼬리말): 시군 예산 국비 합 ÷ e-나라지표 정부 예산(기본형+선택형) ----------
  function renderCheckLine() {
    const rs = P.map((_, i) => {
      const loc = sumC(NATION, i, PUB.filter((c) => c !== "행정·점검"), "nat"), ext = J.ext["공익직불"][i];
      return ext ? (loc / ext) * 100 : null;
    }).filter(ok);
    if (!rs.length) return;
    const t = `${P[0].y}–${P.at(-1).y}년 시군 예산 국비 합은 e-나라지표 정부 예산(기본형+선택형)의 ${nf0.format(Math.floor(d3.min(rs)))}~${nf0.format(Math.floor(d3.max(rs)))}%입니다.`;
    $("#check-line").textContent = t;
    const foot = $("#foot-src");
    foot.title += `\n검증: ${t} 시군을 거치지 않는 몫과 사업 이름이 규칙에 안 걸린 지자체만큼 덜 잡힙니다.`;
    if (window.AGRI_GOHYANG?.check?.text) foot.title += `\n고향사랑기금 검증: ${window.AGRI_GOHYANG.check.text}`;
  }

  // ---------- 오른쪽: 고향사랑기금 (data/gohyang.js · 고향사랑기금 화면에서 옮김) ----------
  // 고른 연도(공익직불 연도)와 같은 해를 쓴다. 고향사랑기부제는 2023년에 시작해 그 앞 해는 자료가 없다.
  // 제주시·서귀포시는 따로 모금하지 않아 제주도 본청 한 곳(시도 값)을 보인다.
  const G = window.AGRI_GOHYANG;
  const GY = G.years;
  const GF = Object.fromEntries(G.fields.map((f, i) => [f, i]));
  const gyLabel = (j) => (GY[j].full ? `${GY[j].y}년` : `${GY[j].y}년 (${+GY[j].ymd.slice(4, 6)}월 말)`);
  const gyShort = (j) => (GY[j].full ? `${GY[j].y}` : `${String(GY[j].y).slice(2)}.${+GY[j].ymd.slice(4, 6)}`);
  const gYear = (i) => GY.findIndex((y) => y.y === P[i].y);
  const gJeju = (k) => level(k) === 2 && sidoOf(k) === "39";
  const gScope = (k) => (gJeju(k) ? "39" : k);
  const grow = (k, j) => (j >= 0 ? G.regions[k]?.[j] ?? null : null);
  const gget = (k, j, f) => grow(k, j)?.[GF[f]] ?? null;
  const GOVN = {};
  for (const [, r] of G.govs) GOVN[r] = (GOVN[r] || 0) + 1;
  // 백만원 → 억·조 (기금은 작은 지자체가 많아 1억 아래는 만원까지)
  const gmil = (v) => (!ok(v) ? ["–", ""] : Math.abs(v) >= 1e6 ? [nf1.format(v / 1e6), "조원"] : Math.abs(v) >= 1000 ? [nf0.format(v / 100), "억원"] : Math.abs(v) >= 10 ? [nf1.format(v / 100), "억원"] : v === 0 ? ["0", "원"] : [nf0.format(v * 100), "만원"]);
  const gmilS = (v) => gmil(v).join("");
  const G_START = GY[0].y;

  function renderGSize() {
    const k0 = state.key, k = gScope(k0), j = gYear(state.p);
    $("#g-scope").textContent = `(${fullLabel(k)}${gJeju(k0) ? " 본청" : ""})`;
    $("#g-year").textContent = j >= 0 ? gyLabel(j) : pLabel(state.p);
    $("#g-stats").hidden = j < 0;
    let note = "";
    if (gJeju(k0)) note = "제주시·서귀포시는 모금하지 않아 도 본청 기금을 보입니다.";
    else if (level(k) < 2) note = "시도·전국 = 본청 + 시군 기금(공익직불은 시군만).";
    else if (label(k).endsWith("시부") && GOVN[k] > 1) note = `구 ${GOVN[k]}곳 기금 합.`;
    $("#g-note").textContent = note;
    if (j < 0) {
      $("#g-line").innerHTML = `고향사랑기부제는 <b>${G_START}년</b>에 시작해 ${P[state.p].y}년에는 기금이 없습니다. 연도를 ${G_START}년 이후로 고르면 보입니다.`;
      return;
    }
    const sz = gget(k, j, "size"), sp = gSpent(k, j), gen = gget(k, j, "gen");
    setStat("size", gmil(sz));
    setStat("spent", gmil(sp));
    setStat("unspent", gmil(ok(sz) && ok(sp) ? sz - sp : null));
    setStat("rate", ok(sz) && sz > 0 ? [nf0.format((sp / sz) * 100), "%"] : ["–", ""]);
    const govN = G.counts[k]?.[j] ?? 0;
    let line;
    if (ok(sz) && sz > 0) {
      const per = (v) => nf0.format(((v || 0) / sz) * 100);
      line = gen ? `일반회계 운영비 <b>${gmilS(gen)}</b> (지출 ${gmilS(gget(k, j, "genEp"))})` : "일반회계 운영비 없음";
      if (level(k) === 2) {
        const units = ALL_UNITS.filter((c) => (gget(c, j, "size") || 0) > 0);
        const sib = units.filter((c) => sidoOf(c) === sidoOf(k));
        const rk = (list, f) => 1 + list.filter((c) => (f(c) ?? -1) > (f(k) ?? -1)).length;
        line += ` · 예산현액 전국 <b>${rk(units, (c) => gget(c, j, "size"))}위</b>/${units.length} · 집행률 ${T.sidos[sidoOf(k)].short} <b>${rk(sib, (c) => gRate(c, j))}위</b>/${sib.length}`;
      }
      if (!GY[j].full) line = `${+GY[j].ymd.slice(4, 6)}월 말 기준 · ` + line;
      if (level(k) < 2 && govN) line += ` · 기금 회계 ${nf0.format(govN)}곳`;
    } else line = "이 해에는 고향사랑기금 회계 행이 없습니다";
    $("#g-line").innerHTML = line;
  }

  // 고향사랑기금 집행: 전 지자체 동일 기준 — 기금 회계 예산현액을 지출(예치·적립 제외)과 적립·미집행으로.
  // 사업·운영·적립 갈래는 지자체마다 이름 붙이는 방식이 달라(답례품을 기금/일반회계 어디에 두나, 적립 줄을 두나) 견줄 수 없어 나누지 않는다(사용자 2026-11-07).
  function gSpent(k, j) {
    const r = grow(k, j);
    return r ? (r[GF.bizEp] || 0) + (r[GF.runEp] || 0) : null;
  }
  // 둘째 상자: [비교] 같은 시도 시군(전국이면 시도)끼리 예산현액 막대 + 집행률, [사업] 그 지역 고향사랑 세부사업 목록
  let gView = "cmp";
  $$("#g2-seg button").forEach((b) => b.addEventListener("click", () => {
    gView = b.dataset.v;
    $$("#g2-seg button").forEach((x) => x.setAttribute("aria-pressed", x === b));
    renderGSplit();
  }));
  const gRate = (k, j) => { const sz = gget(k, j, "size"); return sz ? (gSpent(k, j) / sz) * 100 : null; };
  function gPeers(k) {
    const has = (c) => (gget(c, gYear(state.p), "size") || 0) > 0;
    const units = level(k) === 0 ? [] : UNITS_BY_SIDO[sidoOf(k)].filter(has);
    return units.length ? units : SIDO_CODES.filter(has);
  }
  const GTAG = { b: "기금", r: "기금", g: "일반회계" };
  function renderGSplit() {
    const k = gScope(state.key), j = gYear(state.p);
    $("#g2-title").textContent = gView === "cmp" ? "비교" : "사업";
    $("#g-cmp").hidden = gView !== "cmp";
    $("#g-biz-wrap").hidden = gView !== "biz";
    if (j < 0) {
      $("#g2-scope").textContent = "";
      $("#g-cmp").innerHTML = `<p class="af-empty">고향사랑기부제는 ${G_START}년 시작</p>`;
      $("#g-biz").innerHTML = "";
      $("#g-split-note").textContent = "";
      return;
    }
    if (gView === "cmp") {
      const peers = gPeers(k);
      const isSido = level(peers[0] || "00") === 1;
      $("#g2-scope").textContent = isSido ? "(시도별)" : `(${T.sidos[sidoOf(peers[0])].short} 시군)`;
      const rows = peers.map((c) => [c, gget(c, j, "size") || 0, gRate(c, j)]).sort((a, b) => b[1] - a[1]);
      const max = rows[0]?.[1] || 1;
      $("#g-cmp").innerHTML = rows.map(([c, v, r]) => `
        <button type="button" class="gh-cr${c === k ? " sel" : ""}" data-k="${c}" title="${esc(fullLabel(c))} 예산현액 ${gmilS(v)} · 집행률 ${pctS(r, 0)}">
          <span class="nm">${esc(isSido ? T.sidos[c].short : label(c))}</span>
          <span class="af-track"><i style="width:${(v / max) * 100}%"></i></span>
          <b>${gmilS(v)}</b><em>${pctS(r, 0)}</em>
        </button>`).join("");
      $$("#g-cmp .gh-cr").forEach((b) => b.addEventListener("click", () => select(b.dataset.k)));
      $("#g-split-note").textContent = "막대 예산현액 · 오른쪽 집행률. 누르면 그 지역으로.";
      return;
    }
    // 사업 목록: 시군은 그 지자체, 시도는 본청+시군, 전국은 전체(예산현액 큰 순 200개)
    const inScope = (key) => (level(k) === 0 ? true : level(k) === 1 ? key === k || key.startsWith(`${k}|`) : key === k);
    const govIdx = new Set(G.govs.map(([, key], gi) => (inScope(key) ? gi : -1)).filter((gi) => gi >= 0));
    const items = G.items.filter((r) => r[1] === j && govIdx.has(r[0])).sort((a, b) => b[3] - a[3]);
    const many = level(k) < 2;
    $("#g2-scope").textContent = `(${fullLabel(k)} · ${items.length}개)`;
    $("#g-biz").innerHTML = `<thead><tr><th>사업</th>${many ? "<th>지자체</th>" : ""}<th>회계</th><th>예산현액</th><th>지출</th></tr></thead><tbody>${items.length
      ? items.slice(0, 200).map(([gi, , n, cash, ep, t]) => `<tr><td title="${esc(n)}">${esc(n)}</td>${many ? `<td>${esc(G.govs[gi][0])}</td>` : ""}<td><span class="jb-tag">${GTAG[t] || ""}</span></td><td>${gmilS(cash)}</td><td>${gmilS(ep)}</td></tr>`).join("")
      : `<tr class="af-none"><td colspan="${many ? 5 : 4}">사업이 없습니다</td></tr>`}</tbody>`;
    $("#g-split-note").textContent = "세부사업명 그대로(적립·예치 제외). 일반회계 = 기금 밖 고향사랑 사업.";
  }

  // 연도별: 해마다 막대 셋(예산현액 회색 · 지출 주황 · 적립·미집행 파랑). 막대를 누르면 그 해로 간다
  const GYB = [["size", "gh-b-size", "예산현액"], ["spent", "gh-b-biz", "지출"], ["unspent", "gh-b-keep", "적립·미집행"]];
  function drawGYears() {
    const k = gScope(state.key), el = $("#chart-gyears"), cur = gYear(state.p);
    const { svg, w, h } = frame(el, 140);
    $("#gyears-range").textContent = `${gyShort(0)}~${gyShort(GY.length - 1)}`;
    const rows = GY.map((_, j) => { const size = gget(k, j, "size"), spent = gSpent(k, j); return { j, size, spent, unspent: ok(size) && ok(spent) ? size - spent : null }; });
    const top = d3.max(rows, (r) => r.size || 0);
    if (!top) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text("자료 없음"); $("#gyears-key").innerHTML = ""; return; }
    const m = { l: 44, r: 6, t: 8, b: 18 };
    const x = d3.scaleBand().domain(rows.map((r) => r.j)).range([m.l, w - m.r]).padding(0.24);
    const x2 = d3.scaleBand().domain(GYB.map((b) => b[0])).range([0, x.bandwidth()]).padding(0.08);
    const y = d3.scaleLinear().domain([0, top * 1.05]).nice(3).range([h - m.b, m.t]);
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(y.ticks(3)).join("g").call((g) => {
      g.append("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (d) => y(d)).attr("y2", (d) => y(d));
      g.append("text").attr("x", m.l - 5).attr("y", (d) => y(d) + 4).attr("text-anchor", "end").text((d) => (d ? gmilS(d) : "0"));
    });
    const grp = svg.append("g").selectAll("g").data(rows).join("g").attr("transform", (r) => `translate(${x(r.j)},0)`);
    grp.filter((r) => r.j === cur).append("rect").attr("class", "af-ysel").attr("x", -3).attr("width", x.bandwidth() + 6).attr("y", m.t - 4).attr("height", h - m.t - m.b + 4);
    for (const [f, cls, t] of GYB) {
      grp.filter((r) => ok(r[f])).append("rect").attr("class", cls)
        .attr("x", x2(f)).attr("width", x2.bandwidth()).attr("y", (r) => y(r[f])).attr("height", (r) => y(0) - y(r[f]))
        .classed("af-partial", (r) => !GY[r.j].full)
        .append("title").text((r) => `${gyLabel(r.j)} ${t} ${gmilS(r[f])}`);
    }
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(rows).join("text")
      .attr("x", (r) => x(r.j) + x.bandwidth() / 2).attr("y", h - 4).attr("text-anchor", "middle").text((r) => gyShort(r.j));
    const pOf = (j) => P.findIndex((p) => p.y === GY[j].y);
    svg.append("g").selectAll("rect").data(rows.filter((r) => pOf(r.j) >= 0)).join("rect").attr("x", (r) => x(r.j)).attr("width", x.bandwidth()).attr("y", 0).attr("height", h)
      .attr("fill", "transparent").style("cursor", "pointer").on("click", (e, r) => { state.p = pOf(r.j); render(false); })
      .append("title").text((r) => `${gyLabel(r.j)} 보기`);
    $("#gyears-key").innerHTML = GYB.map(([, cls, t]) => `<span><i class="${cls}"></i>${t}</span>`).join("")
      + (GY.at(-1).full ? "" : `<span>${gyShort(GY.length - 1)}: 연중(흐리게)</span>`)
      + (cur < 0 ? `<span>${G_START}년 시작</span>` : "");
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
    drawYears();
    renderList();
    renderGSize();
    renderGSplit();
    drawGYears();
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
  renderCheckLine();
  $("#built").textContent = `${pLabel(P.length - 1)}까지 · ${[J.built, G.built].sort().at(-1)} 작성`;
  let mw = 0, mh = 0;
  new ResizeObserver(([e]) => {
    const { width, height } = e.contentRect;
    if (Math.abs(width - mw) < 1 && Math.abs(height - mh) < 1) return;
    mw = width; mh = height;
    drawMap();
    paintMap();
  }).observe($("#map-wrap"));
  const chartRO = new ResizeObserver((entries) => {
    for (const e of entries) {
      const { width, height } = e.contentRect;
      const drawn = e.target._wh;
      if (drawn && Math.abs(drawn[0] - width) < 1 && Math.abs(drawn[1] - height) < 1) continue;
      if (e.target.id === "chart-gyears") drawGYears();
      else drawYears();
    }
  });
  chartRO.observe($("#chart-years"));
  chartRO.observe($("#chart-gyears"));
  window.addEventListener("hashchange", () => { fromURL(); render(true); });

  // ---------- 자료 내려받기 (assets/export.js) ----------
  const REG = () => window.RSTAT_REGIONS();
  const PY = P.map((p, i) => (isFull(i) ? `${p.y}` : `${p.y}.${p.d.slice(4, 6)}`));
  const GYL = GY.map((g) => (g.full ? `${g.y}` : `${g.y}.${g.ymd.slice(4, 6)}`));
  const byP = (fn) => (y) => { const i = PY.indexOf(y); return REG().map((r) => [r.sido, r.sgg, ...fn(r.key, i)]); };
  const FUND = [["예산현액", "amt"], ["국비", "nat"], ["시도비", "sido"], ["시군비", "sigun"], ["지출", "ep"]];
  const jsrc = "지방재정365 세부사업별 세출현황";
  const part = isFull(P.length - 1) ? "" : ` ${PY.at(-1)}는 ${+P.at(-1).d.slice(4, 6)}월 말 기준.`;
  const ridx = () => new Map(REG().map((r, j) => [r.key, j]));
  const place = (k) => [T.sidos[sidoOf(k)]?.name ?? "", level(k) === 2 ? label(k) : ""];
  window.RSTAT_EXPORT = { sets: [
    { id: "jikbul", name: "직불금 예산 분류별", src: jsrc, years: PY, note: `예산현액. 임업·수산 제외, 시도·전국 = 시군 합(세종·제주는 본청).${part}`,
      cols: ["직불금 합계(백만원)", ...FARM.map((c) => `${CAT_SHORT[c] || c}(백만원)`)],
      rows: byP((k, i) => (noUnitBudget(k) ? [null, ...FARM.map(() => null)] : [tot(k, i), ...FARM.map((c) => cell(k, i, c)?.[FI.amt] ?? null)])) },
    { id: "jikbul-fund", name: "직불금 재원·지출", src: jsrc, years: PY, note: `직불금 = 공익직불 + 자체·FTA 등.${part}`,
      cols: [...FUND.map(([t]) => `직불금 ${t}(백만원)`), "공익직불 예산현액(백만원)", "공익직불 지출(백만원)", "농업·농촌 예산(백만원)"],
      rows: byP((k, i) => (noUnitBudget(k) ? FUND.map(() => null).concat([null, null, null]) : [...FUND.map(([, f]) => tot(k, i, f)), pub(k, i), pub(k, i, "ep"), agri(k, i)])) },
    { id: "gohyang", name: "고향사랑기금", src: `${jsrc}(고향사랑기금 회계)`, years: GYL, note: "모금액 아님. 시도·전국 = 본청 + 시군, 제주시·서귀포시는 도 본청(시도 줄)",
      cols: ["기금 예산현액(백만원)", "기금 지출(백만원)", "적립·미집행(백만원)", "일반회계 고향사랑 예산현액(백만원)", "일반회계 고향사랑 지출(백만원)", "기금 회계(곳)"],
      rows: (y) => { const j = GYL.indexOf(y); return REG().map((r) => { const sz = gget(r.key, j, "size"), sp = gSpent(r.key, j);
        return [r.sido, r.sgg, sz, sp, ok(sz) && ok(sp) ? sz - sp : null, gget(r.key, j, "gen"), gget(r.key, j, "genEp"), G.counts[r.key]?.[j] ?? null]; }); } },
    { id: "gohyang-biz", name: "고향사랑 세부사업", src: jsrc, years: GYL, note: "세부사업명 그대로, 적립·예치 제외",
      cols: ["지자체", "세부사업명", "회계", "예산현액(백만원)", "지출(백만원)"],
      rows: (y) => { const j = GYL.indexOf(y), idx = ridx();
        return G.items.filter((r) => r[1] === j).map(([gi, , n, cash, ep, t]) => [G.govs[gi], n, cash, ep, t])
          .sort((a, b) => (idx.get(a[0][1]) ?? 1e9) - (idx.get(b[0][1]) ?? 1e9) || a[0][0].localeCompare(b[0][0], "ko") || b[2] - a[2])
          .map(([[gov, key], n, cash, ep, t]) => [...place(key), gov, n, GTAG[t] || "", cash, ep]); } },
  ] };
})();
