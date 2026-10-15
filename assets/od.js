(() => {
  // 물류기기 기종점 분석 — 출발 시군 → 도착 시군 × 품목 × 판로 집계(data/od.js)를 화면에서 걸러 비중으로 본다
  // 사업 예산 규모가 해마다 달라 절대량 대신 전국(같은 품목·판로·출하 주체) 대비 비중, 구성비, 특화도, 거리로 비교한다
  const D = window.AGRI_OD;
  const T = window.AGRI_TOPO;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ---------- 지역 체계: '00' 전국 · '31' 시도 · '31|안성시' 시군 (logi.js와 같다) ----------
  const NATION = "00";
  const SIDO_ORDER = ["31", "32", "33", "34", "35", "36", "37", "38", "39", "11", "21", "22", "23", "24", "25", "26", "29"];
  const SIDO_CODES = [...SIDO_ORDER.filter((c) => T.sidos[c]), ...Object.keys(T.sidos).filter((c) => !SIDO_ORDER.includes(c)).sort()];
  const GEOMS = T.objects.municipalities.geometries;
  const unitKeyOf = (g) => `${g.properties.sido}|${g.properties.unit}`;
  const level = (k) => (k === NATION ? 0 : k.includes("|") ? 2 : 1);
  const sidoOf = (k) => (level(k) === 2 ? k.split("|")[0] : level(k) === 1 ? k : null);
  const label = (k) => (k === NATION ? "전국" : level(k) === 1 ? T.sidos[k]?.name ?? k : k.split("|")[1]);
  const shortLabel = (k) => (level(k) === 1 ? T.sidos[k]?.short ?? k : label(k));
  const fullLabel = (k) => (level(k) === 2 ? `${T.sidos[sidoOf(k)]?.short ?? ""} ${label(k)}` : shortLabel(k));
  // 지도 이름표처럼 짧게 (안성시 → 안성, 서울시부 → 서울)
  const tinyLabel = (k) => {
    if (level(k) !== 2) return shortLabel(k);
    const n = label(k);
    return n.endsWith("시부") ? T.sidos[sidoOf(k)].short : n.replace(/(시|군|구)$/, "");
  };

  // ---------- 숫자 ----------
  const nf0 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const ok = (n) => n != null && !Number.isNaN(n) && Number.isFinite(n);
  const int = (n) => (ok(n) ? nf0.format(n) : "–");
  const pct = (n) => (ok(n) ? `${nf1.format(n)}%` : "–");
  const pctS = (n) => (ok(n) ? `${Math.abs(n) < 1 ? nf2.format(n) : nf1.format(n)}%` : "–");
  const pp = (n) => (ok(n) ? `${Math.abs(n) < 1 ? nf2.format(Math.abs(n)) : nf1.format(Math.abs(n))}%p` : "–");
  const km = (n) => (ok(n) ? `${nf0.format(n)}km` : "–");
  const times = (n) => (ok(n) ? `${n >= 10 ? nf0.format(n) : nf1.format(n)}배` : "–");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // 받침에 따라 조사를 고른다 (사과가, 감귤이)
  const josa = (w, a, b) => { const c = w.charCodeAt(w.length - 1) - 0xac00; return c >= 0 && c <= 11171 && c % 28 ? a : b; };
  function diffHTML(d, fmt = pp) {
    if (!ok(d)) return "";
    const cls = d > 0 ? "up" : d < 0 ? "down" : "";
    return `<span class="${cls}">${d > 0 ? "▲" : d < 0 ? "▼" : "–"} ${fmt(Math.abs(d))}</span>`;
  }

  // ---------- 색: logi.js와 같은 검증된 범주 6색, 판로는 같은 순서 ----------
  const ACC = "#f5a524";
  const DEST_BLUE = "#5fb3ff";
  const CAT = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#9085e9"];
  const OTHER = "#5a606b";
  const DT_COLOR = [...CAT.slice(0, D.dtypes.length - 1), OTHER];
  const SH_COLOR = [...CAT.slice(0, D.stypes.length - 1), OTHER]; // logi.js 출하 주체 구성과 같은 색
  // 거리 구간: 한 색(호박색)의 밝기 단계, 멀수록 밝다
  const BANDS = [
    { name: "시군 안", max: 0.5 },
    { name: "50km 미만", max: 50 },
    { name: "50~100km", max: 100 },
    { name: "100~200km", max: 200 },
    { name: "200~300km", max: 300 },
    { name: "300km 이상", max: Infinity },
  ];
  const BAND_COLOR = ["#4f4535", "#6e5a30", "#8f6e2b", "#b38226", "#d69523", "#f5b94f"];
  const DT_SHORT = { 대형유통센터: "대형유통", 종합유통센터: "종합유통", 도매시장: "도매시장", 식품가공공장: "식품가공", 기타: "기타" };
  const dtShort = (t) => DT_SHORT[D.dtypes[t]] || D.dtypes[t];
  const bandOf = (d) => BANDS.findIndex((b) => d < b.max);

  // ---------- 자료 ----------
  const Y = D.years;
  const LAST = Y.length - 1;
  const R = D.regions;
  const NR = R.length;
  const NC = D.crops.length;
  const NT = D.dtypes.length;
  const NS = D.stypes.length;
  // 기기별 집계: 첫 기기(컨테이너)는 od.js에 있고, 나머지는 고를 때 data/od_<기기>.js를 불러온다
  const EQ = D.equips;
  const FACTS = { [EQ[0].name]: D.f };
  const loading = new Map();
  function loadEq(i) {
    const e = EQ[i];
    if (FACTS[e.name]) return Promise.resolve();
    if (!loading.has(i)) {
      loading.set(i, new Promise((resolve, reject) => {
        const sc = document.createElement("script");
        sc.src = `data/${e.file}`;
        sc.onload = () => { FACTS[e.name] = window.AGRI_OD_EQ[e.name]; resolve(); };
        sc.onerror = () => { loading.delete(i); reject(new Error(`${e.file}을 불러오지 못했습니다`)); };
        document.head.appendChild(sc);
      }));
    }
    return loading.get(i);
  }
  const rSido = R.map((k) => sidoOf(k));
  const RI = new Map(R.map((k, i) => [k, i]));

  // 지도 도형: 현행 시군 단위와 시도
  const UNITS_BY_SIDO = {};
  for (const g of GEOMS) {
    const list = (UNITS_BY_SIDO[g.properties.sido] ||= []);
    const k = unitKeyOf(g);
    if (!list.includes(k)) list.push(k);
  }
  const unitFeatures = Object.values(UNITS_BY_SIDO).flat().map((k) => ({
    type: "Feature", properties: { key: k }, geometry: topojson.merge(T, GEOMS.filter((g) => unitKeyOf(g) === k)),
  }));
  const sidoFeatures = SIDO_CODES.map((s) => ({
    type: "Feature", properties: { key: s }, geometry: topojson.merge(T, GEOMS.filter((g) => g.properties.sido === s)),
  }));
  const FEAT = new Map([...unitFeatures, ...sidoFeatures].map((f) => [f.properties.key, f]));
  const sidoMesh = topojson.mesh(T, T.objects.municipalities, (a, b) => a !== b && a.properties.sido !== b.properties.sido);

  // 지역 중심점(경위도): 섬을 빼려고 가장 큰 덩어리의 무게중심을 쓴다
  const CENTER_AT = { 31: [127.3, 37.3] };
  function mainCenter(k) {
    if (CENTER_AT[k]) return CENTER_AT[k];
    const g = FEAT.get(k)?.geometry;
    if (!g) return null;
    const polys = g.type === "MultiPolygon" ? g.coordinates : [g.coordinates];
    let best = null, bestA = -1;
    for (const p of polys) {
      const a = Math.abs(d3.polygonArea(p[0]));
      if (a > bestA) { bestA = a; best = p[0]; }
    }
    return d3.polygonCentroid(best);
  }
  const CENTER = R.map((k) => mainCenter(k) || mainCenter(sidoOf(k)));
  // 시군 쌍 직선거리(km), 같은 지역이면 0
  const DIST = new Float32Array(NR * NR);
  for (let a = 0; a < NR; a++) for (let b = 0; b < NR; b++) {
    DIST[a * NR + b] = a === b || !CENTER[a] || !CENTER[b] ? 0 : d3.geoDistance(CENTER[a], CENTER[b]) * 6371;
  }

  // 목록에 쓸 시군: 자료에 나오는 시군만, 시도마다 이름순 (광역시 '시부'가 먼저)
  const unitRank = (n) => (n.endsWith("시부") ? 0 : n.endsWith("시") ? 1 : n.endsWith("구") ? 2 : 3);
  const DATA_UNITS = {};
  for (const k of R) if (level(k) === 2) (DATA_UNITS[sidoOf(k)] ||= []).push(k);
  for (const s in DATA_UNITS) DATA_UNITS[s].sort((a, b) => unitRank(label(a)) - unitRank(label(b)) || label(a).localeCompare(label(b), "ko"));

  // ---------- 상태 ----------
  const state = { o: NATION, d: NATION, eq: 0, crop: -1, dt: -1, sh: -1, yi: LAST, cmp: 1, lv: "sgg", cm: "o" };
  const baseI = () => (state.yi - state.cmp >= 0 ? state.yi - state.cmp : null);
  const yearText = () => `${Y[state.yi]}년 1~11월`;
  const cmpText = () => (baseI() == null ? "비교 시점 없음" : `${Y[baseI()]}년 대비`);
  const isAll = () => state.o === NATION && state.d === NATION;
  const cropName = () => (state.crop >= 0 ? D.crops[state.crop] : null);
  const dtName = () => (state.dt >= 0 ? D.dtypes[state.dt] : null);
  const shName = () => (state.sh >= 0 ? D.stypes[state.sh] : null);
  const eqName = () => EQ[state.eq].name;
  // 비중의 분모: 전국(품목·판로·출하 주체를 골랐으면 그 안)
  const univText = () => `전국${shName() ? ` ${shName()}` : ""}${cropName() ? ` ${cropName()}` : ""}${dtName() ? ` ${dtName()}행` : ""}`;

  const matcher = (k) => {
    const m = new Uint8Array(NR);
    for (let i = 0; i < NR; i++) m[i] = k === NATION || R[i] === k || (level(k) === 1 && rSido[i] === k) ? 1 : 0;
    return m;
  };
  let mO = matcher(NATION), mD = matcher(NATION);
  // 지도·순위 단위로 묶은 지역 키. 시군 하나로 고정한 쪽은 시도 단위에서도 그 시군을 쓴다
  const lvKey = (i, end) => (state.lv === "sido" && level(state[end]) !== 2 ? rSido[i] : R[i]);

  // ---------- 집계: 한 해의 행을 한 번 훑어 화면에 필요한 값을 모은다 ----------
  // U: 전국(품목·판로·출하 주체 조건) · S: 선택 흐름 · cropN/dtN/shN: 전국 구성 · crop/dt/sh: 선택 흐름 구성(그 축의 조건은 빼고)
  function compute(i, light = false) {
    const [O, Dd, C, Tt, Sh, Q] = FACTS[eqName()][i];
    const r = {
      U: 0, Ud: 0, S: 0, Sd: 0, X: 0,
      band: new Float64Array(BANDS.length), bandU: new Float64Array(BANDS.length),
      crop: new Float64Array(NC), cropD: new Float64Array(NC), cropN: new Float64Array(NC), cropND: new Float64Array(NC),
      dt: new Float64Array(NT), dtN: new Float64Array(NT),
      sh: new Float64Array(NS), shN: new Float64Array(NS),
      byO: new Float64Array(NR), byD: new Float64Array(NR),
      pairs: new Map(), cell: new Map(),
    };
    const cf = state.crop, tf = state.dt, sf = state.sh;
    for (let j = 0; j < Q.length; j++) {
      const o = O[j], d = Dd[j], c = C[j], t = Tt[j], h = Sh[j], q = Q[j];
      const dist = DIST[o * NR + d];
      const cOk = cf < 0 || c === cf, tOk = tf < 0 || t === tf, sOk = sf < 0 || h === sf;
      if (tOk && sOk) { r.cropN[c] += q; r.cropND[c] += q * dist; }
      if (cOk && sOk) r.dtN[t] += q;
      if (cOk && tOk) r.shN[h] += q;
      const all = cOk && tOk && sOk;
      if (all) { r.U += q; r.Ud += q * dist; if (!light) r.bandU[bandOf(dist)] += q; }
      if (!mO[o] || !mD[d]) continue;
      if (all) { r.S += q; r.Sd += q * dist; if (rSido[o] !== rSido[d]) r.X += q; }
      if (light) continue;
      if (tOk && sOk) {
        r.crop[c] += q; r.cropD[c] += q * dist;
        const ck = `${c}|${cpKey(o, d, t)}`;
        r.cell.set(ck, (r.cell.get(ck) || 0) + q);
      }
      if (cOk && sOk) r.dt[t] += q;
      if (cOk && tOk) r.sh[h] += q;
      if (!all) continue;
      r.band[bandOf(dist)] += q;
      r.byO[o] += q; r.byD[d] += q;
      const pk = `${lvKey(o, "o")}>${lvKey(d, "d")}`;
      let p = r.pairs.get(pk);
      if (!p) r.pairs.set(pk, (p = { o: lvKey(o, "o"), d: lvKey(d, "d"), q: 0, qd: 0, crop: new Map(), dt: new Float64Array(NT) }));
      p.q += q; p.qd += q * dist; p.dt[t] += q;
      p.crop.set(c, (p.crop.get(c) || 0) + q);
    }
    return r;
  }

  // 품목 × 상대 지역 행렬의 열: 도착지가 시군 하나면 출발지, 출발·도착이 모두 시군이면 판로, 그 밖에는 도착지
  const matrixMode = () => (level(state.o) === 2 && level(state.d) === 2 ? "dt" : level(state.d) === 2 ? "o" : "d");
  const cpKey = (o, d, t) => { const m = matrixMode(); return m === "dt" ? `t${t}` : m === "o" ? lvKey(o, "o") : lvKey(d, "d"); };

  const effN = (arr) => {
    let s = 0, h = 0;
    for (const v of arr) s += v;
    if (!s) return null;
    for (const v of arr) h += (v / s) ** 2;
    return 1 / h;
  };

  // 연도별 추이는 조건이 바뀔 때만 다시 센다
  let trendSig = null, trend = null;
  function getTrend() {
    const sig = `${state.eq}|${state.o}|${state.d}|${state.crop}|${state.dt}|${state.sh}`;
    if (sig !== trendSig) {
      trend = Y.map((_, i) => {
        const r = compute(i, true);
        return { share: r.U ? (r.S / r.U) * 100 : null, cross: r.S ? (r.X / r.S) * 100 : null, dist: r.S ? r.Sd / r.S : null, distU: r.U ? r.Ud / r.U : null };
      });
      trendSig = sig;
    }
    return trend;
  }

  // ---------- 선택 상자 ----------
  const yearSel = $("#year"), cmpSel = $("#cmp"), cropSel = $("#crop"), dtSel = $("#dtype"), shSel = $("#ship"), eqSel = $("#equip");
  eqSel.innerHTML = EQ.map((e, i) => `<option value="${i}">${esc(e.name)}${e.from > Y[0] || e.to < Y[LAST] ? ` (${e.from}~${e.to === Y[LAST] ? "" : e.to})` : ""}</option>`).join("");
  yearSel.innerHTML = Y.map((y, i) => `<option value="${i}">${y}년</option>`).reverse().join("");
  cropSel.innerHTML = `<option value="-1">전체</option>${D.crops.map((c, i) => `<option value="${i}">${esc(c)}</option>`).join("")}`;
  dtSel.innerHTML = `<option value="-1">전체</option>${D.dtypes.map((t, i) => `<option value="${i}">${esc(t)}</option>`).join("")}`;
  shSel.innerHTML = `<option value="-1">전체</option>${D.stypes.map((t, i) => `<option value="${i}">${esc(t)}</option>`).join("")}`;
  const endSel = (end) => ({ sido: $(`#${end}-sido`), sgg: $(`#${end}-sgg`) });

  function fillEnd(end) {
    const { sido, sgg } = endSel(end);
    const k = state[end];
    const s = sidoOf(k);
    sido.innerHTML = `<option value="${NATION}">전국</option>${SIDO_CODES.filter((c) => R.some((r) => rSido[RI.get(r)] === c)).map((c) => `<option value="${c}">${esc(T.sidos[c].name)}</option>`).join("")}`;
    sido.value = s || NATION;
    const units = s ? DATA_UNITS[s] || [] : [];
    sgg.innerHTML = `<option value="${s || NATION}">${s ? "시군 전체" : "–"}</option>${units.map((u) => `<option value="${u}">${esc(label(u))}</option>`).join("")}`;
    sgg.disabled = !s;
    sgg.value = level(k) === 2 ? k : s || NATION;
  }
  for (const end of ["o", "d"]) {
    const { sido, sgg } = endSel(end);
    sido.addEventListener("change", () => setEnds({ [end]: sido.value }));
    sgg.addEventListener("change", () => setEnds({ [end]: sgg.value }));
  }
  $("#swap").addEventListener("click", () => setEnds({ o: state.d, d: state.o }));
  $("#clear").addEventListener("click", () => setEnds({ o: NATION, d: NATION }));
  yearSel.addEventListener("change", () => setYear(+yearSel.value));
  cmpSel.addEventListener("change", () => { state.cmp = +cmpSel.value; render(); });
  cropSel.addEventListener("change", () => { state.crop = +cropSel.value; render(); });
  dtSel.addEventListener("change", () => { state.dt = +dtSel.value; render(); });
  shSel.addEventListener("change", () => { state.sh = +shSel.value; render(); });
  eqSel.addEventListener("change", () => setEq(+eqSel.value));

  // 기기를 바꾸면 그 기기 자료를 불러온 뒤 그린다. 자료가 없는 연도를 보고 있었으면 그 기기의 마지막 연도로 옮긴다
  async function setEq(i) {
    eqSel.disabled = true;
    try {
      await loadEq(i);
    } catch (err) {
      alert(err.message);
      eqSel.disabled = false;
      eqSel.value = state.eq;
      return;
    }
    eqSel.disabled = false;
    state.eq = i;
    const e = EQ[i];
    if (Y[state.yi] < e.from || Y[state.yi] > e.to) state.yi = Y.indexOf(e.to);
    render();
  }
  $$("#lv button").forEach((b) => b.addEventListener("click", () => { state.lv = b.dataset.lv; render(); }));
  $$("#clickmode button").forEach((b) => b.addEventListener("click", () => { state.cm = b.dataset.cm; syncControls(); }));

  function setEnds(next) {
    Object.assign(state, next);
    mO = matcher(state.o);
    mD = matcher(state.d);
    render();
  }
  function setYear(i) { state.yi = Math.max(0, Math.min(LAST, i)); render(); }

  function syncControls() {
    yearSel.value = state.yi;
    cmpSel.value = state.cmp;
    cropSel.value = state.crop;
    dtSel.value = state.dt;
    shSel.value = state.sh;
    eqSel.value = state.eq;
    fillEnd("o");
    fillEnd("d");
    $("#clear").hidden = isAll();
    $$("#lv button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lv === state.lv));
    $$("#clickmode button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.cm === state.cm));
  }

  // 주소 해시에 상태를 남겨 링크로 공유한다
  function syncURL() {
    const p = new URLSearchParams();
    if (state.eq) p.set("e", eqName());
    if (state.o !== NATION) p.set("o", state.o);
    if (state.d !== NATION) p.set("d", state.d);
    if (state.crop >= 0) p.set("c", D.crops[state.crop]);
    if (state.dt >= 0) p.set("t", D.dtypes[state.dt]);
    if (state.sh >= 0) p.set("s", D.stypes[state.sh]);
    if (state.yi !== LAST) p.set("y", Y[state.yi]);
    if (state.cmp !== 1) p.set("cmp", state.cmp);
    if (state.lv !== "sgg") p.set("lv", state.lv);
    const h = p.toString();
    history.replaceState(null, "", h ? `#${h}` : location.pathname + location.search);
  }
  function fromURL() {
    const p = new URLSearchParams(location.hash.slice(1));
    const okKey = (k) => k && (k === NATION || T.sidos[k] || RI.has(k));
    if (okKey(p.get("o"))) state.o = p.get("o");
    if (okKey(p.get("d"))) state.d = p.get("d");
    state.crop = D.crops.indexOf(p.get("c"));
    state.dt = D.dtypes.indexOf(p.get("t"));
    state.sh = D.stypes.indexOf(p.get("s"));
    state.eq = Math.max(0, EQ.findIndex((e) => e.name === p.get("e")));
    const yi = Y.indexOf(+p.get("y"));
    if (yi >= 0) state.yi = yi;
    if (["1", "5", "10"].includes(p.get("cmp"))) state.cmp = +p.get("cmp");
    if (p.get("lv") === "sido") state.lv = "sido";
    mO = matcher(state.o);
    mD = matcher(state.d);
  }

  // ---------- 차트 툴팁 ----------
  const ctip = $("#ctip");
  function showCtip(e, html) {
    ctip.innerHTML = html;
    ctip.hidden = false;
    const pad = 14, w = ctip.offsetWidth, h = ctip.offsetHeight;
    let x = e.clientX + pad, y = e.clientY + pad;
    if (x + w > window.innerWidth - 8) x = e.clientX - w - pad;
    if (y + h > window.innerHeight - 8) y = e.clientY - h - pad;
    ctip.style.left = `${x}px`;
    ctip.style.top = `${y}px`;
  }
  const hideCtip = () => { ctip.hidden = true; };
  const trow = (color, name, val) => `<span class="trow"><i style="background:${color}"></i><span>${esc(name)}</span><em>${val}</em></span>`;

  // ---------- 선 그래프: 연도별, 고른 해 강조, 누르면 그 해로 ----------
  function lineChart(sel, series, fmt, axisFmt = fmt) {
    const el = $(sel);
    const w = el.clientWidth, h = el.clientHeight || 110;
    if (!w) return;
    const m = { l: 40, r: series.length > 1 ? 44 : 12, t: 8, b: 18 };
    const x = d3.scaleLinear([Y[0], Y[LAST]], [m.l, w - m.r]);
    const all = series.flatMap((s) => s.values).filter(ok);
    const y = d3.scaleLinear([0, (d3.max(all) || 1) * 1.08], [h - m.b, m.t]).nice(3);
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`);
    svg.selectAll("g.grid").data([0]).join("g").attr("class", "grid")
      .selectAll("line").data(y.ticks(3)).join("line")
      .attr("x1", m.l).attr("x2", w - m.r).attr("y1", (v) => y(v)).attr("y2", (v) => y(v)).attr("stroke", "#2a2e35");
    svg.selectAll("g.ya").data([0]).join("g").attr("class", "axis ya")
      .selectAll("text").data(y.ticks(3)).join("text")
      .attr("x", m.l - 6).attr("y", (v) => y(v) + 3.5).attr("text-anchor", "end").text(axisFmt);
    svg.selectAll("g.xa").data([0]).join("g").attr("class", "axis xa")
      .selectAll("text").data(Y.filter((yy) => yy % 5 === 0)).join("text")
      .attr("x", (v) => x(v)).attr("y", h - 4).attr("text-anchor", "middle").text((v) => v);
    const line = d3.line().defined((v) => ok(v)).x((_, i) => x(Y[i])).y((v) => y(v));
    svg.selectAll("path.ln").data(series, (s) => s.name).join("path").attr("class", "ln")
      .attr("fill", "none").attr("stroke", (s) => s.color).attr("stroke-width", 2).attr("stroke-linejoin", "round")
      .attr("d", (s) => line(s.values));
    svg.selectAll("circle.cur").data(series.filter((s) => ok(s.values[state.yi])), (s) => s.name).join("circle").attr("class", "cur")
      .attr("cx", x(Y[state.yi])).attr("cy", (s) => y(s.values[state.yi])).attr("r", 4)
      .attr("fill", (s) => s.color).attr("stroke", "#1d2026").attr("stroke-width", 2);
    // 둘 이상이면 선 끝에 이름을 바로 단다
    const ends = series.length > 1 ? series.map((s) => {
      const i = s.values.findLastIndex(ok);
      return i < 0 ? null : { s, x: x(Y[i]) + 5, y: y(s.values[i]) + 3.5 };
    }).filter(Boolean) : [];
    if (ends.length === 2 && Math.abs(ends[0].y - ends[1].y) < 11) {
      const [a, b] = ends[0].y < ends[1].y ? ends : [ends[1], ends[0]];
      a.y -= (11 - (b.y - a.y)) / 2; b.y = a.y + 11;
    }
    svg.selectAll("text.end").data(ends, (d) => d.s.name).join("text").attr("class", "end")
      .attr("x", (d) => d.x).attr("y", (d) => d.y).attr("font-size", 10.5).attr("fill", "#9aa1ad").text((d) => d.s.name);
    const cross = svg.selectAll("line.cross").data([0]).join("line").attr("class", "cross")
      .attr("y1", m.t).attr("y2", h - m.b).attr("stroke", "#666d79").attr("stroke-dasharray", "2 3").style("opacity", 0);
    svg.selectAll("rect.hit").data([0]).join("rect").attr("class", "hit")
      .attr("x", m.l - 6).attr("y", 0).attr("width", w - m.l - m.r + 12).attr("height", h).attr("fill", "transparent").style("cursor", "pointer")
      .on("mousemove", (e) => {
        const [px] = d3.pointer(e);
        const i = Math.max(0, Math.min(LAST, Math.round(x.invert(px)) - Y[0]));
        cross.attr("x1", x(Y[i])).attr("x2", x(Y[i])).style("opacity", 1);
        showCtip(e, `<b>${Y[i]}년</b>${series.map((s) => trow(s.color, s.name, fmt(s.values[i]))).join("")}`);
      })
      .on("mouseleave", () => { cross.style("opacity", 0); hideCtip(); })
      .on("click", (e) => { const [px] = d3.pointer(e); setYear(Math.round(x.invert(px)) - Y[0]); });
  }

  // ---------- 지도 ----------
  const mapSvg = d3.select("#odmap");
  const K = Math.cos((36 * Math.PI) / 180);
  const BOUNDS = (() => {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    const walk = (c) => {
      if (typeof c[0] === "number") { x0 = Math.min(x0, c[0] * K); x1 = Math.max(x1, c[0] * K); y0 = Math.min(y0, c[1]); y1 = Math.max(y1, c[1]); }
      else c.forEach(walk);
    };
    sidoFeatures.forEach((f) => walk(f.geometry.coordinates));
    return { x0, x1, y0, y1 };
  })();
  let project = null, path = null, mapW = 0;
  let view = d3.zoomIdentity; // 사용자가 확대·이동한 시점. 경계는 transform으로, 흐름선·원·이름은 이 값을 곱한 화면 좌표로 그린다
  const pt = (k) => {
    const i = RI.get(k);
    const c = i != null ? CENTER[i] : mainCenter(k);
    return c ? view.apply(project(...c)) : null;
  };

  function drawMap() {
    const wrap = $("#map-wrap");
    const w = wrap.clientWidth;
    const h = Math.round(Math.max(420, Math.min(760, w * 1.08)));
    mapW = w;
    const pad = 10, bw = BOUNDS.x1 - BOUNDS.x0, bh = BOUNDS.y1 - BOUNDS.y0;
    const s = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
    const ox = (w - bw * s) / 2, oy = (h - bh * s) / 2;
    project = (lon, lat) => [ox + (lon * K - BOUNDS.x0) * s, oy + (BOUNDS.y1 - lat) * s];
    path = d3.geoPath(d3.geoTransform({ point(lon, lat) { this.stream.point(...project(lon, lat)); } }));
    mapSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", h);
    const base = mapSvg.selectAll("g.base").data([0]).join("g").attr("class", "base");
    // 크기가 바뀌면 투영이 새로 잡히므로 시점도 처음으로 돌린다
    zoom.translateExtent([[-w / 2, -h / 2], [w * 1.5, h * 1.5]]);
    silent = true;
    mapSvg.interrupt().call(zoom.transform, d3.zoomIdentity);
    silent = false;
    view = d3.zoomIdentity;
    base.attr("transform", null);
    syncZoomCtl();
    base.selectAll("path.unit").data(unitFeatures, (f) => f.properties.key).join("path")
      .attr("class", "unit-od").attr("d", path).attr("tabindex", 0).attr("role", "button")
      .attr("aria-label", (f) => fullLabel(f.properties.key))
      .on("mousemove", (e, f) => regionTip(e, f.properties.key)).on("mouseleave", hideCtip)
      .on("click", (e, f) => onRegionClick(f.properties.key))
      .on("keydown", (e, f) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRegionClick(f.properties.key); } });
    base.selectAll("path.mesh-sido").data([sidoMesh]).join("path").attr("class", "mesh-sido").attr("d", path);
    mapSvg.selectAll("g.flows").data([0]).join("g").attr("class", "flows");
    mapSvg.selectAll("g.hubs").data([0]).join("g").attr("class", "hubs");
    mapSvg.selectAll("g.names").data([0]).join("g").attr("class", "names");
  }

  // ---------- 확대·축소·이동 ----------
  // + − 버튼은 언제나, 끌기와 휠은 손 버튼을 켰을 때만 지도를 움직인다 (페이지 스크롤을 뺏지 않게)
  let panMode = false;
  let silent = false;
  const zoom = d3.zoom()
    .scaleExtent([1, 24])
    .filter((e) => panMode && !e.button && (e.type === "wheel" || e.type === "mousedown" || e.type === "touchstart"))
    .on("start", (e) => { if (e.sourceEvent?.type !== "wheel") $("#map-wrap").classList.toggle("grabbing", !!e.sourceEvent); })
    .on("zoom", (e) => {
      if (silent) return;
      view = e.transform;
      mapSvg.select("g.base").attr("transform", view);
      hideCtip();
      paintMap();
      syncZoomCtl();
    })
    .on("end", () => $("#map-wrap").classList.remove("grabbing"));
  mapSvg.call(zoom).on("dblclick.zoom", null);
  const setTouch = () => mapSvg.style("touch-action", panMode ? "none" : null);
  setTouch();

  function syncZoomCtl() {
    const [k0, k1] = zoom.scaleExtent();
    $("#zoom-in").disabled = view.k >= k1 - 1e-6;
    $("#zoom-out").disabled = view.k <= k0 + 1e-6;
    $("#zoom-fit").disabled = view.k === 1 && view.x === 0 && view.y === 0;
  }

  const zoomTo = (fn) => mapSvg.interrupt().transition().duration(reduceMotion ? 0 : 280).call(...fn);
  $("#zoom-in").addEventListener("click", () => zoomTo([zoom.scaleBy, 1.6]));
  $("#zoom-out").addEventListener("click", () => zoomTo([zoom.scaleBy, 1 / 1.6]));
  $("#zoom-fit").addEventListener("click", () => zoomTo([zoom.transform, d3.zoomIdentity]));
  $("#zoom-pan").addEventListener("click", (e) => {
    panMode = !panMode;
    e.currentTarget.setAttribute("aria-pressed", panMode);
    $("#map-wrap").classList.toggle("panning", panMode);
    setTouch();
  });

  function onRegionClick(unit) {
    const k = state.lv === "sido" ? sidoOf(unit) : unit;
    const end = state.cm;
    setEnds({ [end]: state[end] === k ? NATION : k });
  }

  let cur = null, base = null;

  function regionTip(e, unit) {
    const k = state.lv === "sido" ? sidoOf(unit) : unit;
    const m = matcher(k);
    let out = 0, inn = 0;
    // 지도 위 지역이 이 흐름에서 차지하는 몫: 선택 흐름의 출발량·도착량 가운데
    for (let i = 0; i < NR; i++) if (m[i]) { out += cur.byO[i]; inn += cur.byD[i]; }
    const tot = cur.S || 1;
    showCtip(e, `<b>${fullLabel(k)}</b>${isAll() ? "전국" : "이 흐름"} 출발량의 <em class="num">${pctS((out / tot) * 100)}</em><br>${isAll() ? "전국" : "이 흐름"} 도착량의 <em class="num">${pctS((inn / tot) * 100)}</em><br><span class="tip-hint">누르면 ${state.cm === "o" ? "출발지" : "도착지"}로 고른다</span>`);
  }

  const MAX_ARCS = 40;
  function paintMap() {
    const selO = matcher(state.o), selD = matcher(state.d);
    mapSvg.selectAll("path.unit-od")
      .classed("is-o", (f) => state.o !== NATION && selO[RI.get(f.properties.key)] === 1)
      .classed("is-d", (f) => state.d !== NATION && selD[RI.get(f.properties.key)] === 1)
      .classed("no-data", (f) => !RI.has(f.properties.key));

    const pairs = [...cur.pairs.values()].sort((a, b) => b.q - a.q);
    const top = pairs.slice(0, MAX_ARCS);
    const max = top[0]?.q || 1;
    const S = cur.S || 1;
    const arcs = top.filter((p) => p.o !== p.d && pt(p.o) && pt(p.d));
    const loops = top.filter((p) => p.o === p.d && pt(p.o));
    const arcPath = (p) => {
      const [x0, y0] = pt(p.o), [x1, y1] = pt(p.d);
      const dx = x1 - x0, dy = y1 - y0, dist = Math.hypot(dx, dy) || 1;
      const pull = Math.min(5, dist * 0.2);
      const ex = x1 - (dx / dist) * pull, ey = y1 - (dy / dist) * pull;
      const cx = (x0 + x1) / 2 - dy * 0.2, cy = (y0 + y1) / 2 + dx * 0.2;
      return `M${x0},${y0}Q${cx},${cy} ${ex},${ey}`;
    };
    const key = (p) => `${p.o}>${p.d}`;
    const wid = (p) => 0.8 + (p.q / max) * 8;
    const g = mapSvg.select("g.flows");
    // 작은 흐름을 먼저 그려 큰 흐름이 위에 오게 한다
    g.selectAll("path.arc").data([...arcs].reverse(), key).join("path").attr("class", "arc")
      .attr("d", arcPath).attr("fill", "none").attr("stroke", ACC).attr("stroke-linecap", "round")
      .attr("stroke-width", wid).attr("stroke-opacity", (p) => 0.28 + (p.q / max) * 0.6)
      .attr("marker-end", "url(#od-arrow)")
      .on("mousemove", (e, p) => showCtip(e, pairTip(p, S))).on("mouseleave", hideCtip)
      .on("click", (e, p) => setEnds({ o: p.o, d: p.d }));
    g.selectAll("circle.loop").data(loops, key).join("circle").attr("class", "loop")
      .attr("cx", (p) => pt(p.o)[0]).attr("cy", (p) => pt(p.o)[1]).attr("r", (p) => 4 + Math.sqrt(p.q / max) * 10)
      .attr("fill", ACC).attr("fill-opacity", 0.14).attr("stroke", ACC).attr("stroke-width", 1.4).attr("stroke-dasharray", "3 2")
      .on("mousemove", (e, p) => showCtip(e, pairTip(p, S))).on("mouseleave", hideCtip)
      .on("click", (e, p) => setEnds({ o: p.o, d: p.d }));

    // 도착 거점: 받는 양에 비례한 파란 원 (지도 단위로 묶어서)
    const hub = new Map(), src = new Map();
    for (let i = 0; i < NR; i++) {
      if (cur.byD[i]) hub.set(lvKey(i, "d"), (hub.get(lvKey(i, "d")) || 0) + cur.byD[i]);
      if (cur.byO[i]) src.set(lvKey(i, "o"), (src.get(lvKey(i, "o")) || 0) + cur.byO[i]);
    }
    const hubs = [...hub].map(([k, q]) => ({ k, q })).filter((h) => pt(h.k)).sort((a, b) => b.q - a.q).slice(0, 25);
    const hmax = hubs[0]?.q || 1;
    mapSvg.select("g.hubs").selectAll("circle.hub").data(hubs, (h) => h.k).join("circle").attr("class", "hub")
      .attr("cx", (h) => pt(h.k)[0]).attr("cy", (h) => pt(h.k)[1]).attr("r", (h) => 2.5 + Math.sqrt(h.q / hmax) * 15)
      .attr("fill", DEST_BLUE).attr("fill-opacity", 0.16).attr("stroke", DEST_BLUE).attr("stroke-width", 1.4)
      .on("mousemove", (e, h) => showCtip(e, `<b>${fullLabel(h.k)}</b>${isAll() ? "전국" : "이 흐름"} 도착량의 <em class="num">${pctS((h.q / S) * 100)}</em>`))
      .on("mouseleave", hideCtip)
      .on("click", (e, h) => setEnds({ d: state.d === h.k ? NATION : h.k }));

    // 이름표: 도착 상위 5곳(파랑)과 출발 상위 5곳(호박색), 겹치면 뺀다
    const placed = [];
    const names = [];
    const tryPlace = (k, q, kind) => {
      const p = pt(k);
      if (!p) return;
      const txt = `${tinyLabel(k)} ${pct((q / S) * 100)}`;
      const wTxt = txt.length * 6.4 + 6;
      const yy = kind === "d" ? p[1] - 8 : p[1] + 15;
      if (placed.some(([x, y, ww]) => Math.abs(x - p[0]) < (ww + wTxt) / 2 && Math.abs(y - yy) < 13)) return;
      placed.push([p[0], yy, wTxt]);
      names.push({ id: `${kind}${k}`, x: p[0], y: yy, txt, kind });
    };
    hubs.slice(0, 5).forEach((h) => tryPlace(h.k, h.q, "d"));
    [...src].sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([k, q]) => tryPlace(k, q, "o"));
    mapSvg.select("g.names").selectAll("text").data(names, (n) => n.id).join("text")
      .attr("class", (n) => `od-name ${n.kind}`).attr("x", (n) => n.x).attr("y", (n) => n.y).text((n) => n.txt);

    const shown = arcs.length + loops.length;
    const covered = top.reduce((a, p) => a + p.q, 0) / S * 100;
    $("#map-legend").innerHTML = `
      <span class="title">${yearText()} · ${state.lv === "sido" ? "시도" : "시군"} 단위</span>
      <span class="row"><span class="sw line" style="background:${ACC}"></span>상위 ${shown}개 기종점 (이 흐름의 ${pct(covered)})</span>
      <span class="row"><span class="sw ring" style="border-color:${DEST_BLUE}"></span>도착 거점 · 원 크기 = 받는 양</span>
      <span class="row"><span class="sw ring dash" style="border-color:${ACC}"></span>같은 지역 안 이동</span>`;
  }

  function topCrops(map, n = 1) {
    return [...map].sort((a, b) => b[1] - a[1]).slice(0, n);
  }
  // 특화 품목: 흐름 안 비중 3% 이상 가운데 전국 대비 배수가 가장 큰 품목
  function special(map, total) {
    let best = null;
    for (const [c, q] of map) {
      const s = q / total;
      const nat = cur.cropN[c] / (cur.cropN.reduce((a, b) => a + b, 0) || 1);
      if (s < 0.03 || !nat) continue;
      const lq = s / nat;
      if (!best || lq > best.lq) best = { c, s, lq };
    }
    return best;
  }
  function pairTip(p, S) {
    const [[c, q] = []] = topCrops(p.crop);
    const t = p.dt.indexOf(Math.max(...p.dt));
    return `<b>${fullLabel(p.o)} → ${fullLabel(p.d)}</b>
      ${trow(ACC, isAll() ? `${univText()} 이동의` : "이 흐름의", pctS((p.q / S) * 100))}
      ${trow("transparent", "직선거리", km(p.qd / p.q))}
      ${c != null ? trow("transparent", `주품목 ${D.crops[c]}`, pct((q / p.q) * 100)) : ""}
      ${trow(DT_COLOR[t], D.dtypes[t], pct((p.dt[t] / p.q) * 100))}
      <span class="tip-hint">누르면 이 기종점을 고른다</span>`;
  }

  // ---------- 제목과 특징 요약 ----------
  function renderHero() {
    const o = state.o, d = state.d;
    const tags = [eqName(), shName(), cropName(), dtName() && `${dtName()}행`].filter(Boolean);
    $("#title").innerHTML = isAll()
      ? `전국 물류기기 흐름${tags.length ? ` <span class="tag">${esc(tags.join(" · "))}</span>` : ""}`
      : `<span class="o">${esc(fullLabel(o))}</span><span class="arrow">→</span><span class="d">${esc(fullLabel(d))}</span>${tags.length ? ` <span class="tag">${esc(tags.join(" · "))}</span>` : ""}`;
    const li = [];
    const S = cur.S, U = cur.U;
    if (!S) {
      $("#insights").innerHTML = `<li class="empty">${yearText()}에는 이 조건의 이동이 없습니다. 연도나 조건을 바꿔 보세요.</li>`;
      return;
    }
    const b = base;
    const sh = (S / U) * 100;
    if (!isAll()) {
      const d0 = b && b.U ? sh - (b.S / b.U) * 100 : null;
      li.push(`<li><i class="ic">%</i><span>${esc(univText())} 이동의 <b>${pctS(sh)}</b>${ok(d0) ? ` <span class="sub">(${cmpText()} ${diffHTML(d0)})</span>` : ""}</span></li>`);
    }
    // 거리
    const dist = cur.Sd / S, distU = cur.Ud / U;
    const far = (cur.band[4] + cur.band[5]) / S * 100, near = (cur.band[0] + cur.band[1]) / S * 100;
    if (isAll()) li.push(`<li><i class="ic">↔</i><span>평균 직선거리 <b>${km(dist)}</b> · 200km 넘는 원거리 <b>${pct(far)}</b> · 50km 안 근거리 <b>${pct(near)}</b></span></li>`);
    else {
      const ratio = dist / distU;
      const word = ratio >= 1.15 ? "멀리 가는" : ratio <= 0.85 ? "가까이 가는" : "전국과 비슷한 거리의";
      li.push(`<li><i class="ic">↔</i><span>평균 직선거리 <b>${km(dist)}</b> — 전국(${km(distU)})의 ${times(ratio)}, ${word} 흐름</span></li>`);
    }
    // 품목
    const cropTot = cur.crop.reduce((a, c) => a + c, 0);
    const cmap = new Map([...cur.crop].map((q, c) => [c, q]).filter(([, q]) => q > 0));
    const tc = topCrops(cmap, 3);
    if (tc.length) {
      const sp = special(cmap, cropTot);
      const lead = tc.map(([c, q]) => `<b>${esc(D.crops[c])}</b> ${pct((q / cropTot) * 100)}`).join(" · ");
      const spTxt = sp && sp.lq >= 1.5 && !isAll() ? ` — 특히 <b>${esc(D.crops[sp.c])}</b>${josa(D.crops[sp.c], "이", "가")} 전국 구성의 ${times(sp.lq)}` : "";
      const c3 = tc.reduce((a, [, q]) => a + q, 0) / cropTot * 100;
      li.push(`<li><i class="ic">◆</i><span>${cropName() ? "흐름 전체에서 " : ""}주품목 ${lead}${spTxt}${isAll() ? ` · 상위 3품목이 ${pct(c3)}` : ""}</span></li>`);
    }
    // 어디로·어디서: 고정되지 않은 쪽의 상위 지역
    const side = level(d) === 2 && level(o) !== 2 ? "o" : "d";
    if (!(level(o) === 2 && level(d) === 2)) {
      const m = new Map();
      const arr = side === "o" ? cur.byO : cur.byD;
      for (let i = 0; i < NR; i++) if (arr[i]) m.set(R[i], (m.get(R[i]) || 0) + arr[i]);
      const top = [...m].sort((a, b2) => b2[1] - a[1]).slice(0, 3);
      const s3 = top.reduce((a, [, q]) => a + q, 0) / S * 100;
      const eff = effN(arr);
      li.push(`<li><i class="ic">${side === "o" ? "↑" : "↓"}</i><span>${side === "o" ? "출발" : "도착"} 상위 ${top.length}곳(<b>${top.map(([k]) => esc(tinyLabel(k))).join("·")}</b>)이 ${pct(s3)} · 실질 ${side === "o" ? "출발지" : "도착지"} ${nf1.format(eff)}곳</span></li>`);
    }
    // 판로
    const dtTot = cur.dt.reduce((a, c) => a + c, 0), dtNTot = cur.dtN.reduce((a, c) => a + c, 0);
    if (dtTot) {
      const t = cur.dt.indexOf(Math.max(...cur.dt));
      const nat = dtNTot ? (cur.dtN[t] / dtNTot) * 100 : null;
      li.push(`<li><i class="ic">▣</i><span>판로 <b>${esc(D.dtypes[t])} ${pct((cur.dt[t] / dtTot) * 100)}</b>${isAll() ? "" : ` (전국 ${pct(nat)})`}${dtName() ? " · 판로 조건을 빼고 계산" : ""}</span></li>`);
    }
    // 출하 주체
    const shTot = cur.sh.reduce((a, c) => a + c, 0), shNTot = cur.shN.reduce((a, c) => a + c, 0);
    if (shTot) {
      const h = cur.sh.indexOf(Math.max(...cur.sh));
      const nat = shNTot ? (cur.shN[h] / shNTot) * 100 : null;
      li.push(`<li><i class="ic">◎</i><span>출하 주체 <b>${esc(D.stypes[h])} ${pct((cur.sh[h] / shTot) * 100)}</b>${isAll() ? "" : ` (전국 ${pct(nat)})`}${shName() ? " · 출하 주체 조건을 빼고 계산" : ""}</span></li>`);
    }
    $("#insights").innerHTML = li.join("");
  }

  // ---------- 왼쪽: 흐름의 성격 ----------
  function setKpi(key, value, fmt, d, dfmt) {
    $(`[data-v="${key}"]`).textContent = ok(value) ? fmt(value) : "–";
    $(`[data-d="${key}"]`).innerHTML = ok(d) ? `${diffHTML(d, dfmt)}` : "";
  }
  function renderKpi() {
    const b = base;
    const sh = cur.U ? (cur.S / cur.U) * 100 : null;
    const shB = b && b.U ? (b.S / b.U) * 100 : null;
    const dist = cur.S ? cur.Sd / cur.S : null, distB = b && b.S ? b.Sd / b.S : null;
    const eD = effN(cur.byD), eO = effN(cur.byO);
    const eDB = b ? effN(b.byD) : null, eOB = b ? effN(b.byO) : null;
    // 전국 전체를 볼 때는 비중이 늘 100%이므로 다른 시도로 가는 비중을 대신 보인다
    const all = isAll();
    const cr = cur.S ? (cur.X / cur.S) * 100 : null, crB = b && b.S ? (b.X / b.S) * 100 : null;
    $("#kpi-share-label").textContent = all ? "다른 시도행 비중" : "전국 대비 비중";
    $("#kpi-share-hint").title = all ? `출발 시도와 도착 시도가 다른 ${eqName()}의 비중` : `이 흐름의 ${eqName()} ÷ 전국 ${eqName()} (품목·판로·출하 주체를 고르면 그 안에서). 사업 예산 규모가 해마다 달라도 비교할 수 있다`;
    $("#share-head").firstChild.textContent = all ? "다른 시도행 비중 추이 " : "전국 대비 비중 추이 ";
    if (all) setKpi("share", cr, pct, ok(cr) && ok(crB) ? cr - crB : null, pp);
    else setKpi("share", sh, pctS, ok(sh) && ok(shB) ? sh - shB : null, pp);
    setKpi("dist", dist, km, ok(dist) && ok(distB) ? dist - distB : null, km);
    const one = (v) => `${nf1.format(v)}곳`;
    setKpi("effD", eD, one, ok(eD) && ok(eDB) ? eD - eDB : null, (v) => nf1.format(v));
    setKpi("effO", eO, one, ok(eO) && ok(eOB) ? eO - eOB : null, (v) => nf1.format(v));
    const tr = getTrend();
    lineChart("#chart-share", [{ name: all ? "다른 시도행" : "비중", color: ACC, values: tr.map((t) => (all ? t.cross : t.share)) }], pctS, (v) => `${nf0.format(v)}%`);
  }

  function renderDist() {
    $("#leg-dist").innerHTML = BANDS.map((b, j) => `<span><i style="background:${BAND_COLOR[j]}"></i>${b.name}</span>`).join("");
    const rows = isAll() ? [{ name: "전국", arr: cur.bandU, tot: cur.U }] : [{ name: "이 흐름", arr: cur.band, tot: cur.S }, { name: "전국", arr: cur.bandU, tot: cur.U }];
    $("#dist-bars").innerHTML = rows.map((r) => `
      <div class="dist-row"><span class="name">${r.name}</span><span class="dist-track">${r.tot ? [...r.arr].map((q, j) => {
        const s = (q / r.tot) * 100;
        return s > 0 ? `<span class="seg-b" style="flex-basis:${s}%;background:${BAND_COLOR[j]}" data-tip="${esc(`${r.name} · ${BANDS[j].name}`)}|${s}">${s >= 9 ? `<em>${nf0.format(s)}</em>` : ""}</span>` : "";
      }).join("") : ""}</span></div>`).join("");
    $$("#dist-bars .seg-b").forEach((el) => {
      const [name, s] = el.dataset.tip.split("|");
      el.addEventListener("mousemove", (e) => showCtip(e, `<b>${esc(name)}</b>${pct(+s)}`));
      el.addEventListener("mouseleave", hideCtip);
    });
    const tr = getTrend();
    const series = isAll() ? [{ name: "전국", color: "#9aa1ad", values: tr.map((t) => t.distU) }]
      : [{ name: "이 흐름", color: ACC, values: tr.map((t) => t.dist) }, { name: "전국", color: "#7d8490", values: tr.map((t) => t.distU) }];
    $("#leg-distline").innerHTML = series.length > 1 ? series.map((s) => `<span><i style="background:${s.color}"></i>${s.name}</span>`).join("") : "";
    lineChart("#chart-dist", series, km, (v) => nf0.format(v));
  }

  function shareRow({ name, cur: c, prev, color, nat, sel, data }) {
    const d = ok(c) && ok(prev) ? c - prev : null;
    const cls = d == null ? "" : d > 0 ? "up" : d < 0 ? "down" : "";
    const txt = d == null ? "–" : `${d > 0 ? "▲" : d < 0 ? "▼" : ""}${nf1.format(Math.abs(d))}%p`;
    return `<button type="button" class="bar-row share-row wide go${sel ? " sel" : ""}" ${data} title="${esc(`${name} · ${pct(c)}${ok(nat) ? ` (전국 ${pct(nat)})` : ""}`)}">
      <span class="name"><i class="sw" style="background:${color}"></i>${esc(name)}</span>
      <span class="track mark-track"><span class="fill" style="width:${Math.min(100, c || 0)}%;background:${color}"></span>${ok(nat) && !isAll() ? `<span class="nat-mark" style="left:${Math.min(100, nat)}%"></span>` : ""}</span>
      <span class="val">${pct(c)}</span><span class="chg ${cls}">${txt}</span></button>`;
  }
  // 구성 막대: 판로(dt)와 출하 주체(sh)가 같은 꼴. 행을 누르면 그 값으로 거르고, 다시 누르면 푼다
  function renderComposition(key, names, colors, el) {
    const sum = (a) => a.reduce((x, y) => x + y, 0);
    const tot = sum(cur[key]), totN = sum(cur[`${key}N`]);
    const bt = base ? sum(base[key]) : 0;
    const items = names.map((name, t) => ({
      name, t, color: colors[t],
      cur: tot ? (cur[key][t] / tot) * 100 : null,
      prev: bt ? (base[key][t] / bt) * 100 : null,
      nat: totN ? (cur[`${key}N`][t] / totN) * 100 : null,
    })).filter((d) => d.cur > 0 || d.prev > 0).sort((a, b) => (b.cur ?? 0) - (a.cur ?? 0));
    el.innerHTML = items.length ? items.map((d) => shareRow({ ...d, sel: state[key] === d.t, data: `data-${key}="${d.t}"` })).join("") : '<p class="note">자료가 없습니다.</p>';
    $$(`[data-${key}]`, el).forEach((b) => b.addEventListener("click", () => { const v = +b.dataset[key]; state[key] = state[key] === v ? -1 : v; render(); }));
  }
  const renderDtype = () => renderComposition("dt", D.dtypes, DT_COLOR, $("#bars-dtype"));
  const renderShip = () => renderComposition("sh", D.stypes, SH_COLOR, $("#bars-ship"));

  // ---------- 가운데: 기종점 순위 ----------
  function renderPairs() {
    const S = cur.S || 1;
    const bS = base?.S || 0;
    const pairs = [...cur.pairs.values()].sort((a, b) => b.q - a.q).slice(0, 15);
    $("#pairs-chip").textContent = `${yearText()} · ${state.lv === "sido" ? "시도" : "시군"} 단위 · ${nf0.format(cur.pairs.size)}쌍`;
    const maxS = pairs[0] ? (pairs[0].q / S) * 100 : 1;
    const body = $("#pairs tbody");
    if (!pairs.length) { body.innerHTML = `<tr><td colspan="8" class="empty">이 조건의 이동이 없습니다.</td></tr>`; return; }
    body.innerHTML = pairs.map((p, i) => {
      const s = (p.q / S) * 100;
      const bp = base?.pairs.get(`${p.o}>${p.d}`);
      const prev = bS ? ((bp?.q || 0) / bS) * 100 : null;
      const d = ok(prev) ? s - prev : null;
      const [[c, cq] = []] = topCrops(p.crop);
      const sp = special(p.crop, p.q);
      const t = p.dt.indexOf(Math.max(...p.dt));
      const self = p.o === p.d;
      return `<tr data-o="${esc(p.o)}" data-d="${esc(p.d)}" tabindex="0" title="누르면 이 기종점을 고른다">
        <td class="no">${i + 1}</td>
        <td class="nm"><span class="o">${esc(fullLabel(p.o))}</span> <span class="ar">→</span> <span class="d">${self ? "같은 지역" : esc(fullLabel(p.d))}</span></td>
        <td class="sh"><span class="sh-bar"><span style="width:${(s / maxS) * 100}%"></span></span><span class="sh-v">${pctS(s)}</span></td>
        <td class="num">${d == null ? "–" : bp ? diffHTML(d) : '<span class="new">신규</span>'}</td>
        <td class="num">${self ? "0" : nf0.format(p.qd / p.q)}<small>km</small></td>
        <td>${c != null ? `${esc(D.crops[c])} <small>${nf0.format((cq / p.q) * 100)}%</small>` : "–"}</td>
        <td>${cropName() ? '<small class="muted" title="품목을 고르면 계산하지 않는다">–</small>' : sp && sp.lq >= 1.5 ? `${esc(D.crops[sp.c])} <small class="lq">×${sp.lq >= 10 ? nf0.format(sp.lq) : nf1.format(sp.lq)}</small>` : '<small class="muted">없음</small>'}</td>
        <td class="dtmix" title="${esc([...p.dt].map((v, j) => [j, v]).filter(([, v]) => v > 0).sort((x, y) => y[1] - x[1]).map(([j, v]) => `${D.dtypes[j]} ${pct((v / p.q) * 100)}`).join(" · "))}"><span class="mix">${[...p.dt].map((v, j) => (v > 0 ? `<i style="flex-basis:${(v / p.q) * 100}%;background:${DT_COLOR[j]}"></i>` : "")).join("")}</span><small>${esc(dtShort(t))}</small></td>
      </tr>`;
    }).join("");
    $$("tr[data-o]", body).forEach((tr) => {
      const go = () => setEnds({ o: tr.dataset.o, d: tr.dataset.d });
      tr.addEventListener("click", go);
      tr.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    });
  }

  // ---------- 오른쪽: 무엇이 ----------
  function renderCrops() {
    const tot = cur.crop.reduce((a, b) => a + b, 0);
    const totN = cur.cropN.reduce((a, b) => a + b, 0);
    const bt = base ? base.crop.reduce((a, b) => a + b, 0) : 0;
    const list = [...cur.crop].map((q, c) => ({ c, q })).filter((d) => d.q > 0 && (d.q / tot >= 0.0005 || d.c === state.crop)).sort((a, b) => b.q - a.q);
    let rows = list.slice(0, 12);
    if (state.crop >= 0 && !rows.some((r) => r.c === state.crop)) {
      const sel = list.find((r) => r.c === state.crop);
      if (sel) rows = [...rows.slice(0, 11), sel];
    }
    const max = rows[0] ? (rows[0].q / tot) * 100 : 1;
    const el = $("#crop-list");
    el.innerHTML = rows.length ? rows.map(({ c, q }) => {
      const s = (q / tot) * 100;
      const prev = bt ? (base.crop[c] / bt) * 100 : null;
      const d = ok(prev) ? s - prev : null;
      const nat = totN ? (cur.cropN[c] / totN) * 100 : null;
      const lq = nat ? s / nat : null;
      const dist = cur.cropD[c] / q;
      const distN = cur.cropN[c] ? cur.cropND[c] / cur.cropN[c] : null;
      const lqCls = !ok(lq) || isAll() ? "" : lq >= 1.5 ? "hi" : lq <= 0.67 ? "lo" : "";
      return `<button type="button" class="crop-row2${state.crop === c ? " sel" : ""}" data-c="${c}"
          title="${esc(`${D.crops[c]} · 흐름 안 ${pct(s)} · 전국 ${pct(nat)} · 평균 ${km(dist)}${isAll() ? "" : ` (전국 ${km(distN)})`}`)}">
        <span class="name">${esc(D.crops[c])}</span>
        <span class="track"><span class="fill" style="width:${(s / max) * 100}%"></span></span>
        <span class="val">${pct(s)}</span>
        <span class="chg ${d > 0 ? "up" : d < 0 ? "down" : ""}">${d == null ? "–" : `${d > 0 ? "▲" : d < 0 ? "▼" : ""}${nf1.format(Math.abs(d))}`}</span>
        <span class="lq ${lqCls}">${isAll() ? "–" : ok(lq) ? `${lq >= 10 ? nf0.format(lq) : nf1.format(lq)}` : "–"}</span>
        <span class="km">${km(dist)}</span>
      </button>`;
    }).join("") : '<p class="note">자료가 없습니다.</p>';
    $$("[data-c]", el).forEach((b) => b.addEventListener("click", () => { state.crop = state.crop === +b.dataset.c ? -1 : +b.dataset.c; render(); }));
    $("#crop-note").textContent = `${eqName()} 기준 · 증감은 ${cmpText()} %p · 특화도는 ${isAll() ? "기종점을 고르면 계산" : "흐름 안 비중 ÷ 전국 비중"} · 품목을 누르면 그 품목만 본다${cropName() ? " (이 표는 품목 조건을 빼고 계산)" : ""}`;
  }

  function renderMatrix() {
    const mode = matrixMode();
    const tot = cur.crop.reduce((a, b) => a + b, 0);
    const crops = [...cur.crop].map((q, c) => ({ c, q })).filter((d) => d.q > 0 && d.q / tot >= 0.0005).sort((a, b) => b.q - a.q).slice(0, 8);
    if (state.crop >= 0 && cur.crop[state.crop] > 0 && !crops.some((r) => r.c === state.crop)) crops.splice(7, 1, { c: state.crop, q: cur.crop[state.crop] });
    // 열: 전체 상위 상대 지역(또는 판로)
    const colTot = new Map();
    const selTot = new Map();
    for (const [k, q] of cur.cell) {
      const cp = k.slice(k.indexOf("|") + 1);
      colTot.set(cp, (colTot.get(cp) || 0) + q);
      if (+k.slice(0, k.indexOf("|")) === state.crop) selTot.set(cp, (selTot.get(cp) || 0) + q);
    }
    const nCols = mode === "dt" ? NT : 6;
    // 품목을 골랐으면 그 품목의 상위 3곳을 먼저 넣고 나머지를 전체 상위로 채운다
    const rank = (m) => [...m].sort((a, b) => b[1] - a[1]).map(([k]) => k);
    const cols = [...new Set([...(mode === "dt" ? [] : rank(selTot).slice(0, 3)), ...rank(colTot)])].slice(0, nCols);
    const hasRest = mode !== "dt" && colTot.size > cols.length;
    const colName = (k) => (mode === "dt" ? dtShort(+k.slice(1)) : tinyLabel(k));
    const fullName = (k) => (mode === "dt" ? D.dtypes[+k.slice(1)] : fullLabel(k));
    $("#matrix-title").textContent = mode === "o" ? "무엇이 어디서" : mode === "dt" ? "무엇이 어떤 판로로" : "무엇이 어디로";
    $("#matrix-note").textContent = `행 = 품목(흐름 안 상위 8개), 열 = ${mode === "o" ? "출발지" : mode === "dt" ? "판로" : "도착지"} 상위${cropName() && mode !== "dt" ? `(${cropName()} 상위 3곳 먼저)` : ""}${hasRest ? " + 기타" : ""} · 행마다 합 100% · 색이 진할수록 그 품목이 그쪽으로 많이 감`;
    const el = $("#matrix");
    const w = el.clientWidth;
    if (!w || !crops.length) { el.innerHTML = '<p class="note">자료가 없습니다.</p>'; return; }
    el.querySelector("p")?.remove();
    const allCols = hasRest ? [...cols, "_rest"] : cols;
    const lab = 62, top = 34, rh = 24;
    const cw = (w - lab) / allCols.length;
    const h = top + rh * crops.length + 2;
    const cells = crops.flatMap(({ c, q }, r) => {
      let used = 0;
      const row = cols.map((k, j) => { const v = cur.cell.get(`${c}|${k}`) || 0; used += v; return { c, r, j, k, s: v / q }; });
      if (hasRest) row.push({ c, r, j: cols.length, k: "_rest", s: (q - used) / q });
      return row;
    });
    const ramp = d3.scaleSqrt().domain([0, 0.7]).range(["#24272d", ACC]).clamp(true);
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`).attr("height", h)
      .attr("role", "img").attr("aria-label", $("#matrix-title").textContent);
    svg.selectAll("rect.cell").data(cells, (d) => `${d.c}-${d.k}`).join("rect").attr("class", "cell")
      .attr("x", (d) => lab + d.j * cw + 1).attr("y", (d) => top + d.r * rh + 1)
      .attr("width", Math.max(1, cw - 2)).attr("height", rh - 2).attr("rx", 3)
      .attr("fill", (d) => (d.s > 0 ? ramp(d.s) : "#202328"))
      .on("mousemove", (e, d) => showCtip(e, `<b>${esc(D.crops[d.c])} → ${d.k === "_rest" ? "기타" : esc(fullName(d.k))}</b>${esc(D.crops[d.c])} 물량의 ${pct(d.s * 100)}`))
      .on("mouseleave", hideCtip);
    svg.selectAll("text.cv").data(cells.filter((d) => d.s >= 0.05 && cw >= 30), (d) => `${d.c}-${d.k}`).join("text").attr("class", "cv")
      .attr("x", (d) => lab + d.j * cw + cw / 2).attr("y", (d) => top + d.r * rh + rh / 2 + 4).attr("text-anchor", "middle")
      .attr("font-size", 10.5).attr("fill", (d) => (d.s >= 0.35 ? "#14161b" : "#c9ced6")).attr("font-weight", (d) => (d.s >= 0.35 ? 700 : 400))
      .text((d) => nf0.format(d.s * 100));
    svg.selectAll("text.rl").data(crops, (d) => d.c).join("text").attr("class", "rl")
      .attr("x", lab - 6).attr("y", (d, r) => top + r * rh + rh / 2 + 4).attr("text-anchor", "end").attr("font-size", 11.5)
      .attr("fill", (d) => (d.c === state.crop ? ACC : "#9aa1ad")).attr("font-weight", (d) => (d.c === state.crop ? 700 : 400))
      .text((d) => (D.crops[d.c].length > 6 ? `${D.crops[d.c].slice(0, 5)}…` : D.crops[d.c]));
    svg.selectAll("text.cl").data(allCols, (k) => k).join("text").attr("class", "cl")
      .attr("x", (k, j) => lab + j * cw + cw / 2).attr("y", top - 8).attr("text-anchor", "middle").attr("font-size", 11)
      .attr("fill", "#9aa1ad").text((k) => (k === "_rest" ? "기타" : colName(k)))
      .each(function (k) { const n = this; while (n.getComputedTextLength() > cw - 2 && n.textContent.length > 1) n.textContent = `${n.textContent.slice(0, -2)}…`; });
    svg.selectAll("text.ch").data([0]).join("text").attr("class", "ch")
      .attr("x", lab - 6).attr("y", top - 8).attr("text-anchor", "end").attr("font-size", 10).attr("fill", "#666d79")
      .text(mode === "o" ? "출발 →" : mode === "dt" ? "판로 →" : "도착 →");
  }

  // ---------- 전체 갱신 ----------
  function render() {
    cur = compute(state.yi);
    base = baseI() == null ? null : compute(baseI());
    syncControls();
    syncURL();
    $$("[data-year]").forEach((el) => { el.textContent = `${yearText()} · ${cmpText()}`; });
    $$("[data-src]").forEach((el) => { el.textContent = `자료: ${D.source} · ${eqName()}`; });
    renderHero();
    renderKpi();
    renderDist();
    renderDtype();
    renderShip();
    paintMap();
    renderPairs();
    renderCrops();
    renderMatrix();
  }

  fromURL();
  drawMap();
  if (state.eq) loadEq(state.eq).then(render, () => { state.eq = 0; render(); });
  else render();
  let rt = null;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => {
      if ($("#map-wrap").clientWidth !== mapW) drawMap();
      render();
    }, 150);
  });
})();
