(() => {
  // 농촌개발 — 왼쪽·지도는 지자체 예산에 편성된 농촌개발 세부사업 예산 (data/ruraldev.js, 지방재정365),
  // 오른쪽은 한국농어촌공사 농산어촌지역개발사업 지구 목록(사업비 없음)과 농촌마을현황(참고).
  // 시도·전국 예산은 시군 합계(도 본청은 시군으로 내려가는 몫이라 빼고, 시군 행이 없는 곳만 본청) — 직불금 화면과 같다.
  // 지도·지역 체계는 직불금(jikbul.js)과 같다.
  const R = window.AGRI_RURALDEV;
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
  const unitsIn = (k) => (level(k) === 0 ? ALL_UNITS : level(k) === 1 ? UNITS_BY_SIDO[k] : [k]);
  // 제주는 행정시라 예산이 도에만 있다
  const noUnitBudget = (k) => level(k) === 2 && sidoOf(k) === "39";

  // ---------- 숫자 ----------
  const nf0 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const ok = (n) => n != null && Number.isFinite(n);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const mil = (v) => (!ok(v) ? ["–", ""] : Math.abs(v) >= 1e6 ? [nf1.format(v / 1e6), "조원"] : Math.abs(v) >= 1e4 ? [nf0.format(v / 100), "억원"] : Math.abs(v) >= 100 ? [nf1.format(v / 100), "억원"] : [nf0.format(v), "백만원"]);
  const milS = (v) => mil(v).join("");
  const eok1 = (v) => (!ok(v) ? "–" : Math.abs(v) < 1000 ? nf1.format(v / 100) : nf0.format(v / 100));
  const man = (won) => (!ok(won) ? ["–", ""] : won >= 1e8 ? [nf1.format(won / 1e8), "억원"] : [nf0.format(won / 1e4), "만원"]);
  const manS = (w) => man(w).join("");
  const pctS = (v, d = 1) => (ok(v) ? `${v.toFixed(d)}%` : "–");
  const cnt = (v) => (ok(v) ? `${nf0.format(v)}곳` : "–");

  // ---------- 자료 ----------
  const P = R.periods;
  const CI = Object.fromEntries(R.cats.map((c, i) => [c, i]));
  const FI = Object.fromEntries(R.fields.map((f, i) => [f, i])); // amt nat sido sigun ep
  const isFull = (i) => P[i].d.endsWith("1231");
  const pLabel = (i) => (isFull(i) ? `${P[i].y}년` : `${P[i].y}년 (${+P[i].d.slice(4, 6)}월 말)`);
  const pShort = (i) => (isFull(i) ? `${P[i].y}` : `${String(P[i].y).slice(2)}.${+P[i].d.slice(4, 6)}`);
  const sumC = (k, i, cats, f = "amt") => {
    const r = R.regions[k]?.[i];
    if (!r) return null;
    return cats.reduce((s, c) => s + (r[CI[c]]?.[FI[f]] || 0), 0);
  };
  const tot = (k, i, f = "amt") => sumC(k, i, R.cats, f);
  const hh = (k) => R.den.households[k] ?? null;
  function agri(k, i) {
    if (level(k) === 2) return R.den.agri[k]?.[i] ?? null;
    const vals = unitsIn(k).map((u) => R.den.agri[u]?.[i]).filter(ok);
    return vals.length ? vals.reduce((a, b) => a + b, 0) : null;
  }
  const DEFAULT_P = P.length - 1;

  // 유형 묶음 (화면 공통 색): 농식품부 농촌공간·지역개발 사업
  const GROUPS = [
    { key: "hub", name: "중심지·거점", cats: ["중심지활성화", "기초생활거점"], color: "#f5a524", desc: "농촌중심지활성화(읍면 소재지) · 기초생활거점(면 단위 생활 서비스)" },
    { key: "new", name: "신활력플러스", cats: ["신활력플러스"], color: "#5fb3ff", desc: "농촌신활력플러스(지역 주도 경제·사회 활성화)" },
    { key: "space", name: "공간정비·생활여건", cats: ["농촌공간정비", "생활여건개조"], color: "#5fb37c", desc: "농촌공간정비(난개발 정비) · 생활여건개조(새뜰마을)" },
    { key: "plan", name: "계획·마을·역량", cats: ["공간계획·협약", "마을만들기·역량"], color: "#c49cff", desc: "농촌공간 재구조화 계획·농촌협약 · 마을만들기·시군역량강화" },
    { key: "etc", name: "기타", cats: ["유지관리·기타"], color: "#6d7380", desc: "유지관리 등 종류 없는 예산, 연계협력·청년보금자리·빈집재생 등" },
  ];
  const GROUP_OF = Object.fromEntries(GROUPS.flatMap((g, gi) => g.cats.map((c) => [CI[c], gi])));
  const gsum = (k, i, g, f = "amt") => sumC(k, i, GROUPS.find((x) => x.key === g).cats, f);

  // 농어촌공사 사업 지구: [시작 연도, 유형 번호, 지구명, 농어촌공사 유형 번호(R.krc.types), 준공예정 YYYYMMDD, 사업내용, 경도, 위도]
  const ktype = (s) => R.krc.types[s[3]] || "";
  const TODAY = +new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const SITES = R.krc.sites;
  const sitesIn = (k) => unitsIn(k).flatMap((u) => (SITES[u] || []).map((s) => [u, s]));
  const isOn = (s) => ok(s[4]) && s[4] >= TODAY;
  const siteCount = (k, on) => unitsIn(k).reduce((n, u) => n + (SITES[u] || []).filter((s) => !on || isOn(s)).length, 0);
  const ymd = (v) => (ok(v) ? `${String(v).slice(0, 4)}.${String(v).slice(4, 6)}` : "–");

  // ---------- 지도 지표 ----------
  const METRICS = [
    { key: "amt", group: "예산", chip: "농촌개발", label: "농촌개발 예산현액", get: (k, i) => tot(k, i), fmt: milS, note: "중심지·거점·신활력·공간정비·생활여건·마을만들기 등 예산현액 합(추경·이월 반영)" },
    { key: "hub", group: "예산", chip: "중심지·거점", label: "중심지·거점 예산현액", get: (k, i) => gsum(k, i, "hub"), fmt: milS, note: GROUPS[0].desc },
    { key: "new", group: "예산", chip: "신활력", label: "신활력플러스 예산현액", get: (k, i) => gsum(k, i, "new"), fmt: milS, note: GROUPS[1].desc },
    { key: "space", group: "예산", chip: "공간정비", label: "공간정비·생활여건 예산현액", get: (k, i) => gsum(k, i, "space"), fmt: milS, note: GROUPS[2].desc },
    { key: "share", group: "견주기", chip: "농업예산 중", label: "농업·농촌 예산 중 농촌개발 비중", get: (k, i) => { const a = tot(k, i), b = agri(k, i); return ok(a) && b ? (a / b) * 100 : null; }, fmt: (v) => pctS(v), note: "농업·농촌 분야 세출 예산 중 농촌개발 몫. '지역및도시'에 둔 곳은 100% 넘기도" },
    { key: "farm", group: "견주기", chip: "농가당", label: "농가당 농촌개발 예산", get: (k, i) => { const a = tot(k, i), h = hh(k); return ok(a) && h ? (a * 1e6) / h : null; }, fmt: manS, note: `예산현액 ÷ 농가 수(${R.den.years.households}년 농림어업조사). 300호 미만 시군 제외` },
    { key: "local", group: "재원·집행", chip: "지방비", label: "농촌개발 예산 중 지방비 비율", get: (k, i) => { const a = tot(k, i); return a ? ((tot(k, i, "sido") + tot(k, i, "sigun")) / a) * 100 : null; }, fmt: (v) => pctS(v), note: "(시도비+시군비) ÷ 예산현액. 국비 70% 안팎, 전환사업은 지방비만" },
    { key: "exec", group: "재원·집행", chip: "집행률", label: "농촌개발 집행률", get: (k, i) => { const a = tot(k, i); return a ? (tot(k, i, "ep") / a) * 100 : null; }, fmt: (v) => pctS(v), note: "지출액 ÷ 예산현액. 다년 사업이라 이월 많음" },
    { key: "kon", group: "사업 지구", chip: "진행 중", label: "진행 중 사업 지구 수", get: (k) => siteCount(k, true), fmt: cnt, fixed: true, note: "농어촌공사 지구 중 준공예정이 오늘 이후(연도 무관)" },
    { key: "kall", group: "사업 지구", chip: "누적 지구", label: "누적 사업 지구 수(2004~)", get: (k) => siteCount(k, false), fmt: cnt, fixed: true, note: "농어촌공사 지구 전체(2004~, 연도 무관)" },
  ];
  const DEFAULT_METRIC = METRICS[0];
  const state = { key: NATION, p: DEFAULT_P, metric: DEFAULT_METRIC, sort: "amt", kopen: null, kview: "site", vsort: "emd", vopen: null };
  const mval = (m, k, i = state.p) => (!m.fixed && noUnitBudget(k) ? null : m.get(k, i));

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
  function syncURL() {
    const k = state.key;
    const path = k === NATION ? "" : level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`;
    const q = new URLSearchParams();
    if (state.p !== DEFAULT_P) q.set("y", P[state.p].y);
    if (state.metric !== DEFAULT_METRIC) q.set("m", state.metric.key);
    if (state.kview === "vill") q.set("v", "마을");
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
    state.kview = q.get("v") === "마을" ? "vill" : "site";
    $$("#kl-seg button").forEach((x) => x.setAttribute("aria-pressed", x.dataset.v === state.kview));
  }

  // ---------- 지도 (jikbul.js와 같다) ----------
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
    mapSvg.selectAll("g.sites").data([0]).join("g").attr("class", "sites");
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
    // 시군을 골라 지구 점을 그릴 때는 그 시군 이름만 단다
    const lv2 = level(state.key) === 2;
    const data = lv2 ? [state.key] : [...keys.filter((k) => !small(k) && Number.isFinite(pos(k)[0]) && (s || k !== "24")), ...ctx];
    const sel = mapSvg.select("g.labels").selectAll("text").data(data, (k) => k).join("text")
      .attr("class", (k) => `region-label${level(k) === 1 ? " sido-label" : ""}${s && level(k) === 1 ? " ctx" : ""}${k === state.key ? " sel" : ""}`)
      .attr("x", (k) => pos(k)[0]).attr("y", (k) => pos(k)[1] + 4).text(name);
    if (animate && !reduceMotion) sel.style("opacity", 0).transition().delay(550).duration(300).style("opacity", 1);
    else sel.interrupt().style("opacity", 1);
    drawSites(v, animate);
  }
  // 시군을 고르면 그 시군의 사업 지구(좌표가 있는 것)를 점으로: 색 = 유형 묶음, 속이 빈 점 = 준공
  function drawSites(v, animate) {
    const k = state.key;
    const list = level(k) === 2 ? (SITES[k] || []).filter((s) => ok(s[6])) : [];
    const pos = (s) => { const [x, y] = project(s[6], s[7]); return [x * v.k + v.x, y * v.k + v.y]; };
    const sel = mapSvg.select("g.sites").selectAll("circle").data(list, (s) => `${s[2]}|${s[0]}|${s[4]}`).join("circle")
      .attr("class", (s) => `rd-site${isOn(s) ? " on" : ""}`)
      .attr("cx", (s) => pos(s)[0]).attr("cy", (s) => pos(s)[1]).attr("r", (s) => (isOn(s) ? 7 : 5.5))
      .style("--c", (s) => GROUPS[GROUP_OF[s[1]]].color)
      .sort((a, b) => isOn(a) - isOn(b))
      .on("mousemove", (e, s) => showTip(e, `<b>${esc(s[2] || "(지구명 없음)")}</b>${esc(ktype(s))}<br>${s[0] ?? "–"}년 착수 · 준공예정 ${ymd(s[4])}${isOn(s) ? " (진행 중)" : ""}`))
      .on("mouseleave", () => { tip.hidden = true; })
      .on("click", (e, s) => { state.kopen = `${s[2]}|${s[0]}|${s[4]}`; renderKList(); });
    if (animate && !reduceMotion) sel.style("opacity", 0).transition().delay(650).duration(300).style("opacity", 1);
    else sel.interrupt().style("opacity", 1);
  }
  function targetView() {
    const s = sidoOf(state.key);
    if (!s) return d3.zoomIdentity;
    // 시군을 고르면 그 시군에 맞춰 크게(지구 점이 보이게), 시도면 시도 전체
    const f = level(state.key) === 2 ? unitFeatures.find((d) => d.properties.key === state.key) : sidoFeatures.find((d) => d.properties.key === s);
    const [[x0, y0], [x1, y1]] = path.bounds(f);
    const pad = level(state.key) === 2 ? 40 : 28;
    const k = Math.min(level(state.key) === 2 ? 40 : 14, (size.w - pad * 2) / (x1 - x0), (size.h - pad * 2) / (y1 - y0));
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
    html += !m.fixed && noUnitBudget(k) ? "제주는 행정시라 예산이 도에만 있음" : `${m.label} <b style="display:inline">${m.fmt(mval(m, k))}</b>${m.fixed ? "" : `<br>${pLabel(state.p)}`}`;
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
  const tiny = (k) => (hh(k) ?? 0) < 300;
  // 0은 '사업 없음'으로 따로 (도시 시부 등) — 값이 있는 시군끼리 다섯 구간
  function paintMap() {
    const m = state.metric, s = sidoOf(state.key);
    const skip = (k) => m.group === "견주기" && tiny(k);
    const has = (k) => { const v = mval(m, k); return ok(v) && v > 0 && !skip(k); };
    const vals = ALL_UNITS.filter(has).map((k) => mval(m, k));
    const sc = scaleFor(m, vals);
    const missing = ALL_UNITS.filter((k) => !has(k)).length;
    mapSvg.selectAll("path.unit").attr("fill", (d) => (has(d.properties.key) ? sc.fn(mval(m, d.properties.key)) : EMPTY))
      .classed("sel", (d) => d.properties.key === state.key)
      .classed("pw-ctx", (d) => !!s && d.properties.sido !== s)
      .attr("aria-label", (d) => `${fullLabel(d.properties.key)} ${m.label}`);
    mapSvg.selectAll("path.unit.sel").raise();
    mapSvg.classed("dimmed", level(state.key) === 2);
    $("#legend").innerHTML = `<span class="title">${m.label} <span style="color:var(--faint);font-weight:400">${m.fixed ? `농어촌공사 ${R.krc.got}` : pLabel(state.p)}</span></span>`
      + sc.rows.map(([c, t]) => `<span class="row"><span class="sw" style="background:${c}"></span>${t}</span>`).join("")
      + (missing ? `<span class="row"><span class="sw" style="background:${EMPTY};outline:1px solid #3a3f48"></span>${m.group === "견주기" ? "없음·농가 300호 미만" : "없음"} ${missing}</span>` : "")
      + (level(state.key) === 2 ? `<span class="row rd-lg-site"><i class="on"></i>진행 중 지구<i></i>준공</span>` : "");
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
    const list = peers.map((k) => [k, mval(m, k)]).filter(([, v]) => ok(v) && v > 0).sort((a, b) => b[1] - a[1]);
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
      <div class="rank-title"><span><b>${m.label}</b> 상위 ${s ? `${T.sidos[s].short} 시군` : "시군"}</span><span class="rank-meta">${m.fixed ? "" : pLabel(state.p)}</span></div>
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
    const a = tot(k, i), ep = tot(k, i, "ep"), b = agri(k, i);
    setStat("amt", mil(a));
    setStat("share", ok(a) && b ? [nf1.format((a / b) * 100), "%"] : ["–", ""]);
    setStat("ep", mil(ep));
    setStat("rate", a ? [nf1.format((ep / a) * 100), "%"] : ["–", ""]);
    const parts = [["국비", tot(k, i, "nat"), "n"], ["시도비", tot(k, i, "sido"), "s"], ["시군비", tot(k, i, "sigun"), "g"]];
    const fsum = parts.reduce((s, [, v]) => s + (v || 0), 0) || 1;
    $("#fund-stack").innerHTML = parts.filter(([, v]) => v > 0).map(([, v, c]) => `<i class="jb-f${c}" style="flex-grow:${v / fsum}"></i>`).join("");
    $("#fund-key").innerHTML = parts.map(([t, v, c]) => `<span><i class="jb-f${c}"></i>${t} <b>${milS(v)}</b> <em>${pctS(((v || 0) / fsum) * 100)}</em></span>`).join("");
  }

  function frame(el, h0) {
    const w = el.clientWidth || 300, h = el.clientHeight || h0;
    el._wh = [w, h];
    el.innerHTML = "";
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    return { svg, w, h };
  }
  function drawYears() {
    const k = scopeKey(), el = $("#chart-years");
    const { svg, w, h } = frame(el, 130);
    $("#years-range").textContent = `${pShort(0)}~${pShort(P.length - 1)}`;
    const rows = P.map((_, i) => ({ i, parts: GROUPS.map((g) => sumC(k, i, g.cats) || 0) }));
    const top = d3.max(rows, (r) => d3.sum(r.parts));
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
    GROUPS.forEach((g, j) => {
      grp.append("rect").attr("x", 0).attr("width", x.bandwidth())
        .attr("y", (r) => y(d3.sum(r.parts.slice(0, j + 1)))).attr("height", (r) => y(d3.sum(r.parts.slice(0, j))) - y(d3.sum(r.parts.slice(0, j + 1))))
        .attr("fill", g.color).classed("af-partial", (r) => !isFull(r.i))
        .append("title").text((r) => `${pLabel(r.i)} ${g.name} ${milS(r.parts[j])}`);
    });
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(rows).join("text")
      .attr("x", (r) => x(r.i) + x.bandwidth() / 2).attr("y", h - 4).attr("text-anchor", "middle").text((r) => pShort(r.i));
    svg.append("g").selectAll("rect").data(rows).join("rect").attr("x", (r) => x(r.i)).attr("width", x.bandwidth()).attr("y", 0).attr("height", h)
      .attr("fill", "transparent").style("cursor", "pointer").on("click", (e, r) => { state.p = r.i; render(false); })
      .append("title").text((r) => `${pLabel(r.i)} 보기`);
    $("#years-key").innerHTML = GROUPS.map((g) => `<span title="${esc(g.desc)}"><i style="height:9px;background:${g.color}"></i>${g.name}</span>`).join("")
      + (isFull(P.length - 1) ? "" : `<span>${pShort(P.length - 1)}: ${+P.at(-1).d.slice(4, 6)}월 말 기준(흐리게)</span>`);
  }

  // ---------- 왼쪽 가운데: 세부사업 / 하위 지역 ----------
  const TAG = { 중심지활성화: "중심지", 기초생활거점: "기초거점", 신활력플러스: "신활력", 생활여건개조: "생활여건", 농촌공간정비: "공간정비", "공간계획·협약": "계획·협약", "마을만들기·역량": "마을·역량", "유지관리·기타": "기타" };
  // 유형 꼬리표: 유형 묶음 색의 옅은 음영 + 같은 색 글자
  const rgba = (hex, a) => `rgba(${parseInt(hex.slice(1, 3), 16)},${parseInt(hex.slice(3, 5), 16)},${parseInt(hex.slice(5, 7), 16)},${a})`;
  const tagHTML = (ci) => { const c = GROUPS[GROUP_OF[ci]].color; return `<span class="jb-tag rd-tag" style="background:${rgba(c, 0.18)};color:${c}">${TAG[R.cats[ci]] || R.cats[ci]}</span>`; };
  // 사업 줄은 기간마다 따로 파일(data/biz/ruraldev/기준일.json). 그 해를 고를 때 받고, 받으면 다시 그린다
  const bizCache = {};
  function loadBiz(i) {
    const d = P[i].d;
    if (!(d in bizCache)) {
      bizCache[d] = fetch(`data/biz/ruraldev/${d}.json`).then((r) => r.json()).catch(() => ({}))
        .then((x) => { bizCache[d] = x; if (P[state.p].d === d) renderList(); });
    }
    return bizCache[d] instanceof Promise ? null : bizCache[d];
  }
  function renderList() {
    const k = state.key, i = state.p;
    const tbl = $("#list-table");
    if (level(k) === 2 && !noUnitBudget(k)) {
      $("#list-title").firstChild.textContent = "세부사업 ";
      $("#list-scope").textContent = `(${fullLabel(k)})`;
      const B = loadBiz(i);
      const all = (B && B[k]) || [];
      const rows = GROUPS.flatMap((g) => {
        const rs = all.filter((r) => GROUP_OF[r[1]] === GROUPS.indexOf(g)).sort((a, b) => b[2] - a[2]);
        return rs.length ? [[g.name, rs.reduce((t, r) => t + r[2], 0)], ...rs] : [];
      });
      $("#list-count").textContent = all.length ? `${all.length}개 사업` : "";
      tbl.innerHTML = `<thead><tr><th>사업</th><th>유형</th><th>예산현액</th><th>국비</th><th>지출</th></tr></thead><tbody>${all.length
        ? rows.map((r) => r.length === 2
          ? `<tr class="jb-grp"><td colspan="2">${esc(r[0])}</td><td>${eok1(r[1])}</td><td colspan="2"></td></tr>`
          : (([n, ci, amt, nat, , , ep]) => `<tr><td title="${esc(n)}">${esc(n)}</td><td>${tagHTML(ci)}</td><td>${eok1(amt)}</td><td>${nat ? eok1(nat) : "–"}</td><td>${eok1(ep)}</td></tr>`)(r)).join("")
        : `<tr class="af-none"><td colspan="5">${B ? "농촌개발 세부사업이 없습니다" : "불러오는 중…"}</td></tr>`}</tbody>`;
      $("#list-note").textContent = "지방재정365 세부사업명 그대로(억원). 유형은 사업명 기준. 국비 '–'는 2020년 지방이양 사업(마을만들기 등).";
      return;
    }
    const pk = noUnitBudget(k) ? sidoOf(k) : k;
    const kids = childrenOf(pk).filter((c) => !noUnitBudget(c));
    $("#list-title").firstChild.textContent = level(pk) === 0 ? "시도별 예산현액 " : "시군별 예산현액 ";
    $("#list-scope").textContent = `(${fullLabel(pk)})`;
    const COLS = [
      ["n", "지역", (c) => label(c)],
      ["amt", "농촌개발", (c) => tot(c, i)],
      ["hub", "중심지·거점", (c) => gsum(c, i, "hub")],
      ["new", "신활력", (c) => gsum(c, i, "new")],
      ["space", "공간정비", (c) => gsum(c, i, "space")],
    ];
    const [, , get] = COLS.find((x) => x[0] === state.sort) || COLS[1];
    const rows = kids.slice().sort((a, b) => (state.sort === "n" ? get(a).localeCompare(get(b), "ko") : (get(b) ?? -Infinity) - (get(a) ?? -Infinity)));
    $("#list-count").textContent = `${rows.length}곳`;
    const z = (v) => (v ? eok1(v) : "–");
    tbl.innerHTML = `<thead><tr>${COLS.map(([f, t]) => `<th><button type="button" data-s="${f}" aria-pressed="${state.sort === f}">${t}</button></th>`).join("")}</tr></thead>
      <tbody>${rows.map((c) => `<tr data-k="${c}" tabindex="0"><td>${esc(level(c) === 1 ? T.sidos[c].short : label(c))}</td><td>${z(tot(c, i))}</td><td>${z(gsum(c, i, "hub"))}</td><td>${z(gsum(c, i, "new"))}</td><td>${z(gsum(c, i, "space"))}</td></tr>`).join("")}</tbody>`;
    $$("#list-table [data-s]").forEach((b) => b.addEventListener("click", () => { state.sort = b.dataset.s; renderList(); }));
    $$("#list-table tbody tr[data-k]").forEach((tr) => {
      tr.addEventListener("click", () => select(tr.dataset.k));
      tr.addEventListener("keydown", (e) => { if (e.key === "Enter") select(tr.dataset.k); });
    });
    $("#list-note").textContent = `억원(예산현액). 공간정비 = 농촌공간정비 + 생활여건개조. 줄을 누르면 그 지역으로.${pk === "39" ? " 제주는 도 예산만." : ""}`;
  }

  // ---------- 오른쪽: 농어촌공사 사업 지구 ----------
  function renderKSum() {
    const k = state.key;
    const list = sitesIn(k).map(([, s]) => s);
    $("#k-scope").textContent = `(${fullLabel(k)})`;
    $("#k-got").textContent = `농어촌공사 ${R.krc.got.slice(0, 7).replace("-", ".")}`;
    const on = list.filter(isOn);
    setStat("kall", [nf0.format(list.length), "곳"]);
    setStat("kon", [nf0.format(on.length), "곳"]);
    const by = GROUPS.map((g, gi) => [g, list.filter((s) => GROUP_OF[s[1]] === gi).length, on.filter((s) => GROUP_OF[s[1]] === gi).length]);
    $("#k-types").innerHTML = `<div class="rd-split">${by.filter(([, n]) => n).map(([g, n]) => `<i style="background:${g.color};flex-grow:${n}" title="${esc(g.name)} ${n}곳"></i>`).join("")}</div>`
      + by.map(([g, n, o]) => `<div class="gh-sr" title="${esc(g.desc)}"><span><i style="background:${g.color}"></i>${g.name}</span><b>${nf0.format(n)}곳</b><em>${o ? `진행 ${o}` : ""}</em></div>`).join("");
    // 농촌마을(참고): 조사 범위가 시군마다 달라 견주지 않는다
    const v = unitsIn(k).reduce((a, u) => { const x = R.krc.vill[u]; if (x) x.forEach((n, j) => { a[j] += n; }); return a; }, [0, 0, 0, 0, 0, 0, 0]);
    $("#k-vill").innerHTML = v[0]
      ? `<span title="한국농어촌공사 농촌마을현황: 조사된 마을만 있고 시군마다 조사 범위가 달라 시군끼리 견주지 않습니다. 인구가 0으로 적힌 마을은 고령화율에서 뺐습니다.">농촌마을(농어촌공사 조사 <b>${nf0.format(v[0])}</b>곳)`
        + (v[1] ? ` · 65세 이상 <b>${pctS((v[3] / v[2]) * 100, 0)}</b> <span class="jb-dim">(인구 적힌 ${nf0.format(v[1])}곳)</span>` : " · 인구 자료 없음")
        + ` · 빈집 <b>${nf0.format(v[5])}</b>호 · 슬레이트 <b>${nf0.format(v[6])}</b>호</span>`
        + (state.kview === "vill" ? "" : ` <button type="button" class="rd-more" id="k-vill-go">마을 보기 ›</button>`)
      : `<span class="jb-dim">농어촌공사 농촌마을 조사 자료가 없는 지역입니다</span>`;
    $("#k-vill-go")?.addEventListener("click", () => setKView("vill"));
  }
  // 지구 목록 상자: [지구] 농어촌공사 지역개발사업 지구 / [마을] 농어촌공사 농촌마을현황
  function setKView(v) {
    state.kview = v;
    syncURL();
    $$("#kl-seg button").forEach((x) => x.setAttribute("aria-pressed", x.dataset.v === v));
    renderKSum();
    renderKList();
  }
  $$("#kl-seg button").forEach((b) => b.addEventListener("click", () => setKView(b.dataset.v)));
  function renderKList() {
    if (state.kview === "vill") return renderVList();
    const k = state.key, tbl = $("#k-table");
    tbl.classList.remove("rd-vtable");
    if (level(k) === 2) {
      const list = SITES[k] || [];
      $("#kl-title").firstChild.textContent = "지구 목록 ";
      $("#kl-scope").textContent = `(${fullLabel(k)}${list.length ? ` · ${list.length}곳` : ""})`;
      const id = (s) => `${s[2]}|${s[0]}|${s[4]}`;
      tbl.innerHTML = `<thead><tr><th>지구</th><th>유형</th><th>착수</th><th>준공예정</th></tr></thead><tbody>${list.length
        ? list.map((s) => `<tr class="rd-k${isOn(s) ? " on" : ""}${state.kopen === id(s) ? " open" : ""}" data-id="${esc(id(s))}" tabindex="0" title="${esc(ktype(s))}">
            <td>${isOn(s) ? '<i class="rd-dot"></i>' : ""}${esc(s[2] || "(지구명 없음)")}</td><td>${tagHTML(s[1])}</td><td>${s[0] ?? "–"}</td><td>${ymd(s[4])}</td></tr>`
          + (state.kopen === id(s) ? `<tr class="rd-kd"><td colspan="4"><b>${esc(ktype(s))}</b>${ok(s[6]) ? "" : ' <span class="jb-dim">(위치 없음)</span>'}<br>${esc(s[5] || "사업내용 없음")}</td></tr>` : "")).join("")
        : `<tr class="af-none"><td colspan="4">농어촌공사 지역개발사업 지구가 없습니다</td></tr>`}</tbody>`;
      $$("#k-table tr.rd-k").forEach((tr) => {
        const go = () => { state.kopen = state.kopen === tr.dataset.id ? null : tr.dataset.id; renderKList(); };
        tr.addEventListener("click", go);
        tr.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
      });
      $("#kl-note").textContent = "준공예정 늦은 순 · ● 진행 중. 줄·지도 점을 누르면 사업내용. 사업비는 자료에 없음.";
      const open = tbl.querySelector("tr.open");
      if (open) open.scrollIntoView({ block: "nearest" });
      return;
    }
    const kids = childrenOf(k);
    $("#kl-title").firstChild.textContent = level(k) === 0 ? "시도별 지구 " : "시군별 지구 ";
    const rows = kids.map((c) => [c, siteCount(c, false), siteCount(c, true), d3.max(sitesIn(c), ([, s]) => s[0])]).filter((r) => r[1]).sort((a, b) => b[2] - a[2] || b[1] - a[1]);
    $("#kl-scope").textContent = `(${fullLabel(k)} · ${rows.length}곳)`;
    tbl.innerHTML = `<thead><tr><th>지역</th><th>전체</th><th>진행 중</th><th>최근 착수</th></tr></thead><tbody>${rows.map(([c, n, o, y]) => `<tr data-k="${c}" tabindex="0"><td>${esc(level(c) === 1 ? T.sidos[c].short : label(c))}</td><td>${nf0.format(n)}</td><td>${o ? nf0.format(o) : "–"}</td><td>${y ?? "–"}</td></tr>`).join("")}</tbody>`;
    $$("#k-table tbody tr[data-k]").forEach((tr) => {
      tr.addEventListener("click", () => select(tr.dataset.k));
      tr.addEventListener("keydown", (e) => { if (e.key === "Enter") select(tr.dataset.k); });
    });
    $("#kl-note").textContent = "진행 중 많은 순. 줄을 누르면 그 지역으로.";
  }
  // ---------- 마을 (농어촌공사 농촌마을현황: 시군을 고르면 data/vill/{번호}.json을 불러온다) ----------
  // 응답에 조사 시점 필드가 없다. 공공데이터포털(15104291) 등록일·수정일만 밝힌다.
  const VILL_WHEN = () => `조사 시점 미상(2025.6 수정 · ${R.krc.got.slice(0, 7).replace("-", ".")} 받음).`;
  // 줄: [마을, 읍면, 인구, 65세 이상, 총가구, 1인가구, 빈집, 슬레이트, [남 0·15·20·30·40·50·60·65, 여 같은 순], [준공 5년 미만·5~9·10~19·20~29·30년 이상], 유래]
  const villCache = {};
  function loadVill(k) {
    const id = R.krc.villIds[k];
    if (id == null) return null;
    if (!villCache[k]) {
      villCache[k] = fetch(`data/vill/${id}.json`).then((r) => r.json()).then((d) => { villCache[k] = d.rows; if (state.key === k && state.kview === "vill") renderVList(); })
        .catch(() => { villCache[k] = []; if (state.key === k) renderVList(); });
    }
    return Array.isArray(villCache[k]) ? villCache[k] : undefined;
  }
  const n0 = (v) => (v ? nf0.format(v) : "–");
  const AGES = ["0~14", "15~19", "20대", "30대", "40대", "50대", "60~64", "65+"];
  function villDetail(r) {
    const [, , pop, , hh, one, , , age, yrs, desc] = r;
    const amax = Math.max(...age, 1);
    const ageHTML = pop ? `<div class="rd-age">${AGES.map((a, j) => `<span>${a}</span><i class="m" style="width:${(age[j] / amax) * 100}%"></i><b>${age[j]}</b><i class="f" style="width:${(age[j + 8] / amax) * 100}%"></i><b>${age[j + 8]}</b>`).join("")}</div>
      <div class="rd-age-k"><i class="m"></i>남 <i class="f"></i>여</div>` : "";
    const yr = yrs.some(Boolean) ? `주택 준공: 5년 미만 ${yrs[0]} · 5~9년 ${yrs[1]} · 10~19년 ${yrs[2]} · 20~29년 ${yrs[3]} · 30년 이상 ${yrs[4]}` : "";
    const line = [hh ? `총가구 ${nf0.format(hh)}` : "", one ? `1인가구 ${nf0.format(one)}` : "", yr].filter(Boolean).join(" · ");
    return `${ageHTML}${line ? `<p class="rd-vline">${line}</p>` : ""}<p class="rd-desc">${desc ? esc(desc) : '<span class="jb-dim">마을 유래 없음</span>'}</p>`;
  }
  function renderVList() {
    const k = state.key, tbl = $("#k-table");
    tbl.classList.add("rd-vtable");
    const note = $("#kl-note");
    if (level(k) === 2) {
      $("#kl-title").firstChild.textContent = "마을 목록 ";
      const rows = loadVill(k);
      if (rows === null || (rows && !rows.length)) {
        $("#kl-scope").textContent = `(${fullLabel(k)})`;
        tbl.innerHTML = `<tbody><tr class="af-none"><td>농어촌공사 농촌마을 조사 자료가 없는 시군입니다</td></tr></tbody>`;
        note.textContent = "조사한 마을만 있음(143개 시군 28,342곳). " + VILL_WHEN();
        return;
      }
      if (!rows) { tbl.innerHTML = `<tbody><tr class="af-none"><td>마을 자료를 불러오는 중…</td></tr></tbody>`; return; }
      $("#kl-scope").textContent = `(${fullLabel(k)} · ${nf0.format(rows.length)}곳)`;
      const COLS = [["emd", "마을", null], ["pop", "인구", (r) => r[2]], ["old", "65세+", (r) => (r[2] ? r[3] / r[2] : -1)], ["empty", "빈집", (r) => r[6]], ["slate", "슬레이트", (r) => r[7]]];
      const get = COLS.find((c) => c[0] === state.vsort)?.[2];
      const list = get ? rows.slice().sort((a, b) => get(b) - get(a)) : rows;
      const vid = (r) => `${r[1]}|${r[0]}`;
      let html = "", emd = null;
      for (const r of list) {
        if (!get && r[1] !== emd) {
          emd = r[1];
          const g = rows.filter((x) => x[1] === emd);
          html += `<tr class="jb-grp"><td colspan="5">${esc(emd || "읍면 없음")} <span class="jb-dim">${g.length}곳</span></td></tr>`;
        }
        const open = state.vopen === vid(r);
        html += `<tr class="rd-v${open ? " open" : ""}" data-id="${esc(vid(r))}" tabindex="0"><td title="${esc(r[1])} ${esc(r[0])}">${esc(r[0])}${get ? ` <span class="jb-dim">${esc(r[1])}</span>` : ""}</td>
          <td>${n0(r[2])}</td><td>${r[2] ? pctS((r[3] / r[2]) * 100, 0) : "–"}</td><td>${n0(r[6])}</td><td>${n0(r[7])}</td></tr>`
          + (open ? `<tr class="rd-kd"><td colspan="5">${villDetail(r)}</td></tr>` : "");
      }
      tbl.innerHTML = `<thead><tr>${COLS.map(([f, t]) => `<th><button type="button" data-vs="${f}" aria-pressed="${state.vsort === f}">${t}</button></th>`).join("")}</tr></thead><tbody>${html}</tbody>`;
      $$("#k-table [data-vs]").forEach((b) => b.addEventListener("click", () => { state.vsort = b.dataset.vs; renderVList(); }));
      $$("#k-table tr.rd-v").forEach((tr) => {
        const go = () => { state.vopen = state.vopen === tr.dataset.id ? null : tr.dataset.id; renderVList(); };
        tr.addEventListener("click", go);
        tr.addEventListener("keydown", (e) => { if (e.key === "Enter") go(); });
      });
      const zero = rows.filter((r) => !r[2]).length;
      note.textContent = `읍면별 · 머리글을 누르면 그 값 큰 순. 줄을 누르면 연령·가구·마을 유래가 펼쳐집니다.${zero ? ` 인구가 0으로 적힌 마을 ${nf0.format(zero)}곳은 '–'(조사값 없음).` : ""} 농어촌공사 조사 마을만 있습니다. ${VILL_WHEN()}`;
      const o = tbl.querySelector("tr.open");
      if (o) o.scrollIntoView({ block: "nearest" });
      return;
    }
    const kids = childrenOf(k);
    $("#kl-title").firstChild.textContent = level(k) === 0 ? "시도별 마을 " : "시군별 마을 ";
    const agg = (c) => unitsIn(c).reduce((a, u) => { const x = R.krc.vill[u]; if (x) x.forEach((n, j) => { a[j] += n; }); return a; }, [0, 0, 0, 0, 0, 0, 0]);
    const rows = kids.map((c) => [c, agg(c)]).filter(([, v]) => v[0]).sort((a, b) => b[1][0] - a[1][0]);
    $("#kl-scope").textContent = `(${fullLabel(k)} · ${rows.length}곳)`;
    tbl.innerHTML = `<thead><tr><th>지역</th><th>조사 마을</th><th>65세+</th><th>빈집</th><th>슬레이트</th></tr></thead><tbody>${rows.length
      ? rows.map(([c, v]) => `<tr data-k="${c}" tabindex="0"><td>${esc(level(c) === 1 ? T.sidos[c].short : label(c))}</td><td>${nf0.format(v[0])}${v[1] < v[0] ? ` <span class="jb-dim">(${nf0.format(v[1])})</span>` : ""}</td><td>${v[2] ? pctS((v[3] / v[2]) * 100, 0) : "–"}</td><td>${n0(v[5])}</td><td>${n0(v[6])}</td></tr>`).join("")
      : `<tr class="af-none"><td colspan="5">조사 마을이 없습니다</td></tr>`}</tbody>`;
    $$("#k-table tbody tr[data-k]").forEach((tr) => {
      tr.addEventListener("click", () => select(tr.dataset.k));
      tr.addEventListener("keydown", (e) => { if (e.key === "Enter") select(tr.dataset.k); });
    });
    note.textContent = `조사 마을 수 큰 순. 괄호는 인구가 적힌 마을 수(65세+ 계산 기준). 조사 범위가 시군마다 달라 비교용 아님. ` + VILL_WHEN();
  }

  // 연도별 착수 지구 수 (유형 묶음으로 쌓기)
  function drawKYears() {
    const k = state.key, el = $("#chart-kyears");
    const { svg, w, h } = frame(el, 130);
    const list = sitesIn(k).map(([, s]) => s).filter((s) => ok(s[0]));
    if (!list.length) { svg.append("text").attr("x", 8).attr("y", 20).attr("class", "pw-empty").text("자료 없음"); $("#kyears-range").textContent = ""; return; }
    const y0 = Math.min(2004, d3.min(list, (s) => s[0])), y1 = d3.max(list, (s) => s[0]);
    const years = d3.range(y0, y1 + 1);
    $("#kyears-range").textContent = `${y0}~${y1}`;
    const rows = years.map((yr) => ({ yr, parts: GROUPS.map((g, gi) => list.filter((s) => s[0] === yr && GROUP_OF[s[1]] === gi).length) }));
    const top = d3.max(rows, (r) => d3.sum(r.parts)) || 1;
    const m = { l: 28, r: 6, t: 8, b: 18 };
    const x = d3.scaleBand().domain(years).range([m.l, w - m.r]).padding(0.2);
    const y = d3.scaleLinear().domain([0, top]).nice(3).range([h - m.b, m.t]);
    svg.append("g").attr("class", "pw-axis").selectAll("g").data(y.ticks(3).filter(Number.isInteger)).join("g").call((g) => {
      g.append("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (d) => y(d)).attr("y2", (d) => y(d));
      g.append("text").attr("x", m.l - 5).attr("y", (d) => y(d) + 4).attr("text-anchor", "end").text((d) => nf0.format(d));
    });
    const grp = svg.append("g").selectAll("g").data(rows).join("g").attr("transform", (r) => `translate(${x(r.yr)},0)`);
    GROUPS.forEach((g, j) => {
      grp.filter((r) => r.parts[j]).append("rect").attr("x", 0).attr("width", x.bandwidth())
        .attr("y", (r) => y(d3.sum(r.parts.slice(0, j + 1)))).attr("height", (r) => y(d3.sum(r.parts.slice(0, j))) - y(d3.sum(r.parts.slice(0, j + 1))))
        .attr("fill", g.color)
        .append("title").text((r) => `${r.yr}년 착수 ${g.name} ${r.parts[j]}곳`);
    });
    const step = Math.ceil(years.length / Math.max(1, Math.floor((w - m.l) / 34)));
    svg.append("g").attr("class", "pw-axis").selectAll("text").data(years.filter((yr, j) => (years.length - 1 - j) % step === 0)).join("text")
      .attr("x", (yr) => x(yr) + x.bandwidth() / 2).attr("y", h - 4).attr("text-anchor", "middle").text((yr) => `'${String(yr).slice(2)}`);
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
    renderKSum();
    renderKList();
    drawKYears();
    paintMap();
    renderRank();
    applyView(animate);
  }
  function select(k) {
    const prev = state.key;
    state.key = k || NATION;
    if (prev !== state.key) { state.kopen = null; state.vopen = null; }
    render(sidoOf(prev) !== sidoOf(state.key) || level(prev) === 2 || level(state.key) === 2);
  }

  fromURL();
  renderChips();
  drawMap();
  render(false);
  $("#built").textContent = `예산 ${pLabel(P.length - 1)}까지 · 사업 지구 ${R.krc.got} 받음 · ${R.built} 작성`;
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
      if (e.target.id === "chart-kyears") drawKYears();
      else drawYears();
    }
  });
  chartRO.observe($("#chart-years"));
  chartRO.observe($("#chart-kyears"));
  window.addEventListener("hashchange", () => { fromURL(); render(true); });

  // ---------- 자료 내려받기 (assets/export.js) ----------
  const REG = () => window.RSTAT_REGIONS();
  const PY = P.map((p, i) => (isFull(i) ? `${p.y}` : `${p.y}.${p.d.slice(4, 6)}`));
  const byP = (fn) => (y) => { const i = PY.indexOf(y); return REG().map((r) => [r.sido, r.sgg, ...(noUnitBudget(r.key) ? fn(r.key, i).map(() => null) : fn(r.key, i))]); };
  const FUND = [["예산현액", "amt"], ["국비", "nat"], ["시도비", "sido"], ["시군비", "sigun"], ["지출", "ep"]];
  const rsrc = "지방재정365 세부사업별 세출현황";
  const part = isFull(P.length - 1) ? "" : ` ${PY.at(-1)}는 ${+P.at(-1).d.slice(4, 6)}월 말 기준.`;
  const ksrc = "한국농어촌공사 농산어촌지역개발사업 OpenAPI";
  const dt = (v) => (ok(v) ? `${String(v).slice(0, 4)}-${String(v).slice(4, 6)}-${String(v).slice(6, 8)}` : null);
  const villSum = (k) => unitsIn(k).reduce((a, u) => { const x = R.krc.vill[u]; if (x) x.forEach((n, j) => { a[j] = (a[j] ?? 0) + n; }); return a; }, Array(7).fill(null));
  window.RSTAT_EXPORT = { sets: [
    { id: "ruraldev", name: "농촌개발 예산 유형별", src: rsrc, years: PY, note: `예산현액. 시도·전국 = 시군 합(시군 행이 없는 곳은 본청), 제주는 도만.${part}`,
      cols: ["농촌개발 합계(백만원)", ...GROUPS.flatMap((g) => g.cats).map((c) => `${c}(백만원)`)],
      rows: byP((k, i) => [tot(k, i), ...GROUPS.flatMap((g) => g.cats).map((c) => sumC(k, i, [c]))]) },
    { id: "ruraldev-fund", name: "농촌개발 재원·지출", src: rsrc, years: PY, note: `농촌개발 세부사업 합.${part}`,
      cols: [...FUND.map(([t]) => `${t}(백만원)`), "농업·농촌 예산(백만원)"],
      rows: byP((k, i) => [...FUND.map(([, f]) => tot(k, i, f)), agri(k, i)]) },
    { id: "krc-sites", name: "농어촌공사 사업 지구", src: ksrc, years: null, note: `${R.krc.got} 받음. 사업비 없음, 위치는 일부만`,
      cols: ["지구명", "사업", "유형", "착수 연도", "준공예정", "사업내용", "경도", "위도"],
      rows: () => REG().filter((r) => r.sgg).flatMap((r) => (SITES[r.key] || []).map((s) => [r.sido, r.sgg, s[2] || "", ktype(s), R.cats[s[1]] ?? "", s[0] ?? null, dt(s[4]), s[5] || "", s[6] ?? null, s[7] ?? null])) },
    { id: "krc-vill", name: "농촌마을 조사", src: "한국농어촌공사 농촌마을현황 OpenAPI", years: null, note: "조사한 마을만, 시군마다 조사 범위가 달라 비교용 아님. 조사 시점 미상",
      cols: ["조사 마을(곳)", "인구 적힌 마을(곳)", "인구(명)", "65세 이상(명)", "총가구(가구)", "빈집(호)", "슬레이트(호)"],
      rows: () => REG().map((r) => [r.sido, r.sgg, ...villSum(r.key)]) },
  ] };
})();
