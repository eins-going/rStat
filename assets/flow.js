(() => {
  // 물류동향 — 지역 하나를 골라 그 지역이 보낸(→ 어디로)·받은(어디서 →) 물류기기 흐름을 본다
  // 기종점 집계(data/od.js)를 화면에서 걸러 비중으로 보고(od.js와 같은 계산), 월별 모양은 data/flow_mon.js를 쓴다.
  // 사업 예산 규모가 해마다 달라 절대량 대신 전국(같은 품목·판로·출하 주체) 대비 비중, 구성비, 특화도, 거리로 비교한다.
  const D = window.AGRI_OD;
  const T = window.AGRI_TOPO;
  const MON = window.AGRI_FLOW_MON;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ---------- 지역: '00' 전국 · '31' 시도 · '31|안성시' 시군 ----------
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
  const pct = (n) => (ok(n) ? `${nf1.format(n)}%` : "–");
  const pctS = (n) => (ok(n) ? `${Math.abs(n) < 1 ? nf2.format(n) : nf1.format(n)}%` : "–");
  const pp = (n) => (ok(n) ? `${Math.abs(n) < 1 ? nf2.format(Math.abs(n)) : nf1.format(Math.abs(n))}%p` : "–");
  const km = (n) => (ok(n) ? `${nf0.format(n)}km` : "–");
  const times = (n) => (ok(n) ? `${n >= 10 ? nf0.format(n) : nf1.format(n)}배` : "–");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function diffHTML(d, fmt = pp) {
    if (!ok(d)) return "";
    const cls = d > 0 ? "up" : d < 0 ? "down" : "";
    return `<span class="${cls}">${d > 0 ? "▲" : d < 0 ? "▼" : "–"} ${fmt(Math.abs(d))}</span>`;
  }

  // ---------- 색 (od.js·logi.js와 같다) ----------
  const ACC = "#f5a524";
  const DEST_BLUE = "#5fb3ff";
  const CAT = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#9085e9"];
  const OTHER = "#5a606b";
  const DT_COLOR = [...CAT.slice(0, D.dtypes.length - 1), OTHER];
  const SH_COLOR = [...CAT.slice(0, D.stypes.length - 1), OTHER];
  const BANDS = [
    { name: "시군 안", max: 0.5 }, { name: "50km 미만", max: 50 }, { name: "50~100km", max: 100 },
    { name: "100~200km", max: 200 }, { name: "200~300km", max: 300 }, { name: "300km 이상", max: Infinity },
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
  // 기기별 집계: 컨테이너는 od.js에 있고, 나머지는 고를 때 data/od_<기기>.js를 불러온다
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

  // 지역 중심점(경위도): 섬을 빼려고 가장 큰 덩어리의 무게중심
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
  const DIST = new Float32Array(NR * NR);
  for (let a = 0; a < NR; a++) for (let b = 0; b < NR; b++) {
    DIST[a * NR + b] = a === b || !CENTER[a] || !CENTER[b] ? 0 : d3.geoDistance(CENTER[a], CENTER[b]) * 6371;
  }
  const unitRank = (n) => (n.endsWith("시부") ? 0 : n.endsWith("시") ? 1 : n.endsWith("구") ? 2 : 3);
  const DATA_UNITS = {};
  for (const k of R) if (level(k) === 2) (DATA_UNITS[sidoOf(k)] ||= []).push(k);
  for (const s in DATA_UNITS) DATA_UNITS[s].sort((a, b) => unitRank(label(a)) - unitRank(label(b)) || label(a).localeCompare(label(b), "ko"));

  // ---------- 상태: 고른 지역(k)과 방향(보낸 out · 받은 in) ----------
  const state = { k: NATION, dir: "out", eq: 0, crop: -1, dt: -1, sh: -1, yi: LAST, lv: "sgg" };
  const all = () => state.k === NATION;
  const oKey = () => (state.dir === "out" ? state.k : NATION);
  const dKey = () => (state.dir === "in" ? state.k : NATION);
  const baseI = () => (state.yi >= 1 ? state.yi - 1 : null);
  const yearText = () => `${Y[state.yi]}년 1~11월`;
  const cropName = () => (state.crop >= 0 ? D.crops[state.crop] : null);
  const dtName = () => (state.dt >= 0 ? D.dtypes[state.dt] : null);
  const shName = () => (state.sh >= 0 ? D.stypes[state.sh] : null);
  const eqName = () => EQ[state.eq].name;
  const univText = () => `전국${shName() ? ` ${shName()}` : ""}${cropName() ? ` ${cropName()}` : ""}${dtName() ? ` ${dtName()}행` : ""}`;
  // 상대 지역: 보낸 흐름이면 도착지, 받은 흐름이면 출발지 (전국이면 도착지)
  const partner = () => (state.dir === "in" && !all() ? "o" : "d");

  const matcher = (k) => {
    const m = new Uint8Array(NR);
    for (let i = 0; i < NR; i++) m[i] = k === NATION || R[i] === k || (level(k) === 1 && rSido[i] === k) ? 1 : 0;
    return m;
  };
  let mO = matcher(NATION), mD = matcher(NATION);
  // 지도·순위 단위로 묶은 지역 키. 고른 지역 쪽은 시도 단위에서도 그 지역을 쓴다
  const lvKey = (i, end) => {
    const fixed = (end === "o" ? oKey() : dKey()) !== NATION;
    if (fixed) return level(state.k) === 2 ? R[i] : rSido[i];
    return state.lv === "sido" ? rSido[i] : R[i];
  };

  // ---------- 집계: 한 해의 행을 한 번 훑어 화면에 필요한 값을 모은다 (od.js와 같은 계산) ----------
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
    const side = partner();
    for (let j = 0; j < Q.length; j++) {
      const o = O[j], d = Dd[j], c = C[j], t = Tt[j], h = Sh[j], q = Q[j];
      const dist = DIST[o * NR + d];
      const cOk = cf < 0 || c === cf, tOk = tf < 0 || t === tf, sOk = sf < 0 || h === sf;
      if (tOk && sOk) { r.cropN[c] += q; r.cropND[c] += q * dist; }
      if (cOk && sOk) r.dtN[t] += q;
      if (cOk && tOk) r.shN[h] += q;
      const ok3 = cOk && tOk && sOk;
      if (ok3) { r.U += q; r.Ud += q * dist; if (!light) r.bandU[bandOf(dist)] += q; }
      if (!mO[o] || !mD[d]) continue;
      if (ok3) { r.S += q; r.Sd += q * dist; if (rSido[o] !== rSido[d]) r.X += q; }
      if (light) continue;
      if (tOk && sOk) {
        r.crop[c] += q; r.cropD[c] += q * dist;
        const ck = `${c}|${lvKey(side === "o" ? o : d, side)}`;
        r.cell.set(ck, (r.cell.get(ck) || 0) + q);
      }
      if (cOk && sOk) r.dt[t] += q;
      if (cOk && tOk) r.sh[h] += q;
      if (!ok3) continue;
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
  const effN = (arr) => {
    let s = 0, h = 0;
    for (const v of arr) s += v;
    if (!s) return null;
    for (const v of arr) h += (v / s) ** 2;
    return 1 / h;
  };
  let trendSig = null, trend = null;
  function getTrend() {
    const sig = `${state.eq}|${state.k}|${state.dir}|${state.crop}|${state.dt}|${state.sh}`;
    if (sig !== trendSig) {
      trend = Y.map((_, i) => {
        const r = compute(i, true);
        return { share: r.U ? (r.S / r.U) * 100 : null, cross: r.S ? (r.X / r.S) * 100 : null };
      });
      trendSig = sig;
    }
    return trend;
  }

  // ---------- 선택 상자 ----------
  const sidoSel = $("#sido"), sggSel = $("#sgg"), yearSel = $("#year"), eqSel = $("#equip"), cropSel = $("#crop");
  eqSel.innerHTML = EQ.map((e, i) => `<option value="${i}">${esc(e.name)}</option>`).join("");
  yearSel.innerHTML = Y.map((y, i) => `<option value="${i}">${y}년</option>`).reverse().join("");
  cropSel.innerHTML = `<option value="-1">전체</option>${D.crops.map((c, i) => `<option value="${i}">${esc(c)}</option>`).join("")}`;
  sidoSel.innerHTML = `<option value="${NATION}">전국</option>${SIDO_CODES.filter((c) => R.some((r) => sidoOf(r) === c)).map((c) => `<option value="${c}">${esc(T.sidos[c].name)}</option>`).join("")}`;
  sidoSel.addEventListener("change", () => select(sidoSel.value));
  sggSel.addEventListener("change", () => select(sggSel.value));
  yearSel.addEventListener("change", () => setYear(+yearSel.value));
  cropSel.addEventListener("change", () => { state.crop = +cropSel.value; render(); });
  eqSel.addEventListener("change", () => setEq(+eqSel.value));
  $$("#dir button").forEach((b) => b.addEventListener("click", () => { state.dir = b.dataset.dir; applyEnds(); render(); }));
  $$("#lv button").forEach((b) => b.addEventListener("click", () => { state.lv = b.dataset.lv; render(); }));
  $("#reset").addEventListener("click", () => select(level(state.k) === 2 ? sidoOf(state.k) : NATION));

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
  function applyEnds() {
    mO = matcher(oKey());
    mD = matcher(dKey());
  }
  function select(k) {
    state.k = k || NATION;
    applyEnds();
    render();
  }
  function setYear(i) { state.yi = Math.max(0, Math.min(LAST, i)); render(); }

  function syncControls() {
    const s = sidoOf(state.k);
    sidoSel.value = s || NATION;
    const units = s ? DATA_UNITS[s] || [] : [];
    sggSel.innerHTML = `<option value="${s || NATION}">${s ? "시군 전체" : "–"}</option>${units.map((u) => `<option value="${u}">${esc(label(u))}</option>`).join("")}`;
    sggSel.disabled = !s;
    sggSel.value = level(state.k) === 2 ? state.k : s || NATION;
    yearSel.value = state.yi;
    eqSel.value = state.eq;
    cropSel.value = state.crop;
    $$("#dir button").forEach((b) => { b.setAttribute("aria-pressed", b.dataset.dir === state.dir); b.disabled = all(); });
    $$("#lv button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lv === state.lv));
    const reset = $("#reset");
    reset.hidden = all();
    reset.textContent = level(state.k) === 2 ? `${T.sidos[sidoOf(state.k)].short} 전체 보기` : "전국 보기";
  }

  // 주소: #k=38|김해시&dir=in&e=파렛트&c=딸기&t=…&s=…&y=2024&lv=sido
  function syncURL() {
    const p = new URLSearchParams();
    if (!all()) p.set("k", state.k);
    if (state.dir !== "out") p.set("dir", state.dir);
    if (state.eq) p.set("e", eqName());
    if (state.crop >= 0) p.set("c", D.crops[state.crop]);
    if (state.dt >= 0) p.set("t", D.dtypes[state.dt]);
    if (state.sh >= 0) p.set("s", D.stypes[state.sh]);
    if (state.yi !== LAST) p.set("y", Y[state.yi]);
    if (state.lv !== "sgg") p.set("lv", state.lv);
    const h = p.toString();
    history.replaceState(null, "", h ? `#${h}` : location.pathname + location.search);
  }
  function fromURL() {
    const p = new URLSearchParams(location.hash.slice(1));
    const k = p.get("k");
    if (k && (T.sidos[k] || RI.has(k))) state.k = k;
    if (p.get("dir") === "in") state.dir = "in";
    state.crop = D.crops.indexOf(p.get("c"));
    state.dt = D.dtypes.indexOf(p.get("t"));
    state.sh = D.stypes.indexOf(p.get("s"));
    state.eq = Math.max(0, EQ.findIndex((e) => e.name === p.get("e")));
    const yi = Y.indexOf(+p.get("y"));
    if (yi >= 0) state.yi = yi;
    if (p.get("lv") === "sido") state.lv = "sido";
    applyEnds();
  }

  // ---------- 툴팁 ----------
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
    const w = el.clientWidth, h = el.clientHeight || 100;
    if (!w) return;
    const m = { l: 36, r: 12, t: 8, b: 16 };
    const x = d3.scaleLinear([Y[0], Y[LAST]], [m.l, w - m.r]);
    const vals = series.flatMap((s) => s.values).filter(ok);
    const y = d3.scaleLinear([0, (d3.max(vals) || 1) * 1.08], [h - m.b, m.t]).nice(h < 90 ? 2 : 3);
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`);
    const nt = h < 90 ? 2 : 3; // 그림이 낮으면 눈금을 줄인다
    svg.selectAll("g.grid").data([0]).join("g").attr("class", "grid")
      .selectAll("line").data(y.ticks(nt)).join("line")
      .attr("x1", m.l).attr("x2", w - m.r).attr("y1", (v) => y(v)).attr("y2", (v) => y(v)).attr("stroke", "#2a2e35");
    svg.selectAll("g.ya").data([0]).join("g").attr("class", "axis ya")
      .selectAll("text").data(y.ticks(nt)).join("text")
      .attr("x", m.l - 6).attr("y", (v) => y(v) + 3.5).attr("text-anchor", "end").text(axisFmt);
    svg.selectAll("g.xa").data([0]).join("g").attr("class", "axis xa")
      .selectAll("text").data(Y.filter((yy) => yy % 5 === 0)).join("text")
      .attr("x", (v) => x(v)).attr("y", h - 3).attr("text-anchor", "middle").text((v) => v);
    const line = d3.line().defined((v) => ok(v)).x((_, i) => x(Y[i])).y((v) => y(v));
    svg.selectAll("path.ln").data(series, (s) => s.name).join("path").attr("class", "ln")
      .attr("fill", "none").attr("stroke", (s) => s.color).attr("stroke-width", 2).attr("stroke-linejoin", "round")
      .attr("d", (s) => line(s.values));
    svg.selectAll("circle.cur").data(series.filter((s) => ok(s.values[state.yi])), (s) => s.name).join("circle").attr("class", "cur")
      .attr("cx", x(Y[state.yi])).attr("cy", (s) => y(s.values[state.yi])).attr("r", 4)
      .attr("fill", (s) => s.color).attr("stroke", "#1d2026").attr("stroke-width", 2);
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
  // 울릉군은 그리는 자리만 서쪽으로 당긴다 (통계 지도와 같다)
  const drawLon = (lon) => (lon > 130.6 ? lon - 0.8 : lon);
  const BOUNDS = (() => {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    const walk = (c) => {
      if (typeof c[0] === "number") { const x = drawLon(c[0]) * K; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, c[1]); y1 = Math.max(y1, c[1]); }
      else c.forEach(walk);
    };
    sidoFeatures.forEach((f) => walk(f.geometry.coordinates));
    return { x0, x1, y0, y1 };
  })();
  const FIT = window.matchMedia("(min-width: 1281px) and (min-height: 720px)");
  let project = null, path = null;
  let view = d3.zoomIdentity;
  const pt = (k) => {
    const i = RI.get(k);
    const c = i != null ? CENTER[i] : mainCenter(k);
    return c ? view.apply(project(...c)) : null;
  };

  function drawMap() {
    const wrap = $("#map-wrap");
    const w = wrap.clientWidth;
    const h = FIT.matches ? Math.max(240, wrap.clientHeight) : Math.round(Math.max(380, Math.min(700, w * 1.0)));
    if (!w) return;
    const pad = 10, bw = BOUNDS.x1 - BOUNDS.x0, bh = BOUNDS.y1 - BOUNDS.y0;
    const s = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
    const ox = (w - bw * s) / 2, oy = (h - bh * s) / 2;
    project = (lon, lat) => [ox + (drawLon(lon) * K - BOUNDS.x0) * s, oy + (BOUNDS.y1 - lat) * s];
    path = d3.geoPath(d3.geoTransform({ point(lon, lat) { this.stream.point(...project(lon, lat)); } }));
    mapSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", FIT.matches ? null : h);
    const base = mapSvg.selectAll("g.base").data([0]).join("g").attr("class", "base");
    zoom.translateExtent([[-w / 2, -h / 2], [w * 1.5, h * 1.5]]);
    silent = true;
    mapSvg.interrupt().call(zoom.transform, d3.zoomIdentity);
    silent = false;
    view = d3.zoomIdentity;
    base.attr("transform", null);
    syncZoomCtl();
    base.selectAll("path.unit-od").data(unitFeatures, (f) => f.properties.key).join("path")
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

  // 확대·축소·이동: + − 버튼은 언제나, 끌기와 휠은 손 버튼을 켰을 때만
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

  // 지도를 누르면 그 지역을 고른다 (시도 단위면 시도). 고른 지역을 다시 누르면 푼다
  function onRegionClick(unit) {
    const k = state.lv === "sido" ? sidoOf(unit) : unit;
    select(state.k === k ? (level(k) === 2 ? sidoOf(k) : NATION) : k);
  }

  let cur = null, base = null;

  function regionTip(e, unit) {
    const k = state.lv === "sido" ? sidoOf(unit) : unit;
    const m = matcher(k);
    let out = 0, inn = 0;
    for (let i = 0; i < NR; i++) if (m[i]) { out += cur.byO[i]; inn += cur.byD[i]; }
    const tot = cur.S || 1;
    const scope = all() ? "전국" : "이 흐름";
    showCtip(e, `<b>${fullLabel(k)}</b>${scope} 출발량의 <em class="num">${pctS((out / tot) * 100)}</em><br>${scope} 도착량의 <em class="num">${pctS((inn / tot) * 100)}</em><span class="tip-hint">누르면 이 지역의 흐름을 본다</span>`);
  }

  const MAX_ARCS = 40;
  function paintMap() {
    if (!project) return;
    const selK = matcher(state.k);
    mapSvg.selectAll("path.unit-od")
      .classed("is-o", (f) => !all() && state.dir === "out" && selK[RI.get(f.properties.key)] === 1)
      .classed("is-d", (f) => !all() && state.dir === "in" && selK[RI.get(f.properties.key)] === 1)
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
    g.selectAll("path.arc").data([...arcs].reverse(), key).join("path").attr("class", "arc")
      .attr("d", arcPath).attr("fill", "none").attr("stroke", ACC).attr("stroke-linecap", "round")
      .attr("stroke-width", wid).attr("stroke-opacity", (p) => 0.28 + (p.q / max) * 0.6)
      .attr("marker-end", "url(#od-arrow)")
      .on("mousemove", (e, p) => showCtip(e, pairTip(p, S))).on("mouseleave", hideCtip)
      .on("click", (e, p) => goPartner(p));
    g.selectAll("circle.loop").data(loops, key).join("circle").attr("class", "loop")
      .attr("cx", (p) => pt(p.o)[0]).attr("cy", (p) => pt(p.o)[1]).attr("r", (p) => 4 + Math.sqrt(p.q / max) * 10)
      .attr("fill", ACC).attr("fill-opacity", 0.14).attr("stroke", ACC).attr("stroke-width", 1.4).attr("stroke-dasharray", "3 2")
      .on("mousemove", (e, p) => showCtip(e, pairTip(p, S))).on("mouseleave", hideCtip);
    // 받는 쪽 거점(파랑): 받는 양에 비례
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
      .on("mousemove", (e, h) => showCtip(e, `<b>${fullLabel(h.k)}</b>${all() ? "전국" : "이 흐름"} 도착량의 <em class="num">${pctS((h.q / S) * 100)}</em>`))
      .on("mouseleave", hideCtip);
    // 이름표: 도착 상위 5곳과 출발 상위 5곳, 겹치면 뺀다
    const placed = [], names = [];
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
    // 고른 지역 쪽은 늘 100%라 이름표를 달지 않는다
    const focus = (k) => !all() && (k === state.k || (level(state.k) === 1 && sidoOf(k) === state.k && state.lv === "sido"));
    if (all() || state.dir === "out") hubs.slice(0, 5).forEach((h) => tryPlace(h.k, h.q, "d"));
    if (all() || state.dir === "in") [...src].filter(([k]) => !focus(k)).sort((a, b) => b[1] - a[1]).slice(0, 5).forEach(([k, q]) => tryPlace(k, q, "o"));
    mapSvg.select("g.names").selectAll("text").data(names, (n) => n.id).join("text")
      .attr("class", (n) => `od-name ${n.kind}`).attr("x", (n) => n.x).attr("y", (n) => n.y).text((n) => n.txt);
    const shown = arcs.length + loops.length;
    const covered = (top.reduce((a, p) => a + p.q, 0) / S) * 100;
    $("#map-legend").innerHTML = `
      <span class="row"><span class="sw line" style="background:${ACC}"></span>상위 ${shown}개 흐름 (${all() ? "전국" : "이 흐름"}의 ${pct(covered)})</span>
      <span class="row"><span class="sw ring" style="border-color:${DEST_BLUE}"></span>받는 곳 · 원 크기 = 받는 양</span>
      <span class="row"><span class="sw ring dash" style="border-color:${ACC}"></span>같은 지역 안 이동</span>`;
  }

  // 흐름선·순위를 누르면 상대 지역으로 옮겨 간다 (보낸 흐름을 보고 있었으면 그 도착지가 받은 흐름)
  function goPartner(p) {
    if (all()) { state.dir = "out"; select(p.o); return; }
    const other = state.dir === "out" ? p.d : p.o;
    state.dir = state.dir === "out" ? "in" : "out";
    select(other);
  }

  function topCrops(map, n = 1) {
    return [...map].sort((a, b) => b[1] - a[1]).slice(0, n);
  }
  function special(map, total) {
    let best = null;
    const totN = cur.cropN.reduce((a, b) => a + b, 0) || 1;
    for (const [c, q] of map) {
      const s = q / total;
      const nat = cur.cropN[c] / totN;
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
      ${trow(ACC, all() ? `${univText()} 이동의` : "이 흐름의", pctS((p.q / S) * 100))}
      ${trow("transparent", "직선거리", km(p.qd / p.q))}
      ${c != null ? trow("transparent", `주품목 ${D.crops[c]}`, pct((q / p.q) * 100)) : ""}
      ${trow(DT_COLOR[t], D.dtypes[t], pct((p.dt[t] / p.q) * 100))}
      <span class="tip-hint">${all() ? "누르면 출발지가 보낸 흐름" : state.dir === "out" ? "누르면 이 도착지가 받은 흐름" : "누르면 이 출발지가 보낸 흐름"}</span>`;
  }

  // ---------- 제목 ----------
  function renderTitle() {
    const tags = [eqName(), shName(), cropName(), dtName() && `${dtName()}행`].filter(Boolean);
    const tag = ` <span class="tag">${esc(tags.join(" · "))}</span>`;
    const k = state.k;
    $("#title").innerHTML = all() ? `전국 물류기기 흐름${tag}`
      : state.dir === "out" ? `<span class="o">${esc(fullLabel(k))}</span><span class="arrow">→</span>어디로${tag}`
      : `어디서<span class="arrow">→</span><span class="d">${esc(fullLabel(k))}</span>${tag}`;
  }

  // ---------- 왼쪽: 흐름의 성격 ----------
  function setKpi(key, value, fmt, d, dfmt) {
    $(`[data-v="${key}"]`).textContent = ok(value) ? fmt(value) : "–";
    $(`[data-d="${key}"]`).innerHTML = ok(d) ? `${diffHTML(d, dfmt)} <span>전년대비</span>` : "";
  }
  function renderKpi() {
    const b = base;
    const A = all();
    const sh = cur.U ? (cur.S / cur.U) * 100 : null, shB = b && b.U ? (b.S / b.U) * 100 : null;
    const dist = cur.S ? cur.Sd / cur.S : null, distB = b && b.S ? b.Sd / b.S : null;
    const cr = cur.S ? (cur.X / cur.S) * 100 : null, crB = b && b.S ? (b.X / b.S) * 100 : null;
    const near = cur.S ? (cur.band[0] / cur.S) * 100 : null, nearB = b && b.S ? (b.band[0] / b.S) * 100 : null;
    const side = partner();
    const eff = effN(side === "o" ? cur.byO : cur.byD), effB = b ? effN(side === "o" ? b.byO : b.byD) : null;
    $("#kpi-share-label").textContent = A ? "다른 시도행 비중" : "전국 대비 비중";
    $("#kpi-share-hint").title = A ? `출발 시도와 도착 시도가 다른 ${eqName()}의 비중`
      : `이 지역이 ${state.dir === "out" ? "보낸" : "받은"} ${eqName()} ÷ 전국 ${eqName()} (품목·판로·출하 주체를 고르면 그 안에서). 사업 예산 규모가 해마다 달라도 비교할 수 있다`;
    if (A) setKpi("share", cr, pct, ok(cr) && ok(crB) ? cr - crB : null, pp);
    else setKpi("share", sh, pctS, ok(sh) && ok(shB) ? sh - shB : null, pp);
    setKpi("dist", dist, km, ok(dist) && ok(distB) ? dist - distB : null, km);
    $("#kpi-cross-label").textContent = A ? "같은 시군 안 이동" : "다른 시도와 오간 비중";
    $("#kpi-cross-hint").title = A ? "출발과 도착이 같은 시군인 물량의 비중" : `${state.dir === "out" ? "다른 시도로 보낸" : "다른 시도에서 받은"} 비중`;
    if (A) setKpi("cross", near, pct, ok(near) && ok(nearB) ? near - nearB : null, pp);
    else setKpi("cross", cr, pct, ok(cr) && ok(crB) ? cr - crB : null, pp);
    $("#kpi-eff-label").textContent = side === "o" ? "실질 출발지 수" : "실질 도착지 수";
    setKpi("eff", eff, (v) => `${nf1.format(v)}곳`, ok(eff) && ok(effB) ? eff - effB : null, (v) => nf1.format(v));
    const tr = getTrend();
    $("#share-head").firstChild.textContent = A ? "다른 시도행 비중 추이 " : "전국 대비 비중 추이 ";
    lineChart("#chart-share", [{ name: A ? "다른 시도행" : "비중", color: ACC, values: tr.map((t) => (A ? t.cross : t.share)) }], pctS, (v) => `${v < 10 && v % 1 ? nf1.format(v) : nf0.format(v)}%`);
  }

  // 판로(dt)·출하 주체(sh) 구성. 행을 누르면 그 값으로 거르고, 다시 누르면 푼다
  function renderComposition(key, names, colors, el) {
    const sum = (a) => a.reduce((x, y) => x + y, 0);
    const tot = sum(cur[key]), totN = sum(cur[`${key}N`]);
    const bt = base ? sum(base[key]) : 0;
    const items = names.map((name, t) => ({
      name, t, color: colors[t],
      c: tot ? (cur[key][t] / tot) * 100 : null,
      prev: bt ? (base[key][t] / bt) * 100 : null,
      nat: totN ? (cur[`${key}N`][t] / totN) * 100 : null,
    })).filter((d) => d.c > 0 || d.prev > 0).sort((a, b) => (b.c ?? 0) - (a.c ?? 0));
    el.innerHTML = items.length ? items.map((d) => {
      const dd = ok(d.c) && ok(d.prev) ? d.c - d.prev : null;
      const cls = dd == null ? "" : dd > 0 ? "up" : dd < 0 ? "down" : "";
      const txt = dd == null ? "–" : `${dd > 0 ? "▲" : dd < 0 ? "▼" : ""}${nf1.format(Math.abs(dd))}%p`;
      return `<button type="button" class="bar-row share-row${state[key] === d.t ? " sel" : ""}" data-${key}="${d.t}" title="${esc(`${d.name} · ${pct(d.c)}${ok(d.nat) ? ` (전국 ${pct(d.nat)})` : ""}`)}">
        <span class="name"><i class="sw" style="background:${d.color}"></i>${esc(d.name)}</span>
        <span class="track mark-track"><span class="fill" style="width:${Math.min(100, d.c || 0)}%;background:${d.color}"></span>${ok(d.nat) && !all() ? `<span class="nat-mark" style="left:${Math.min(100, d.nat)}%"></span>` : ""}</span>
        <span class="val">${pct(d.c)}</span><span class="natv">${all() ? "" : pct(d.nat)}</span><span class="chg ${cls}">${txt}</span></button>`;
    }).join("") : '<p class="note">자료가 없습니다.</p>';
    if (items.length && key === "dt") el.insertAdjacentHTML("afterbegin", `<div class="mix-head"><span></span><span></span><span>${all() ? "비중" : "이 흐름"}</span><span>${all() ? "" : "전국"}</span><span>전년대비</span></div>`);
    $$(`[data-${key}]`, el).forEach((b) => b.addEventListener("click", () => { const v = +b.dataset[key]; state[key] = state[key] === v ? -1 : v; render(); }));
  }

  // ---------- 왼쪽: 기기 사용량 비중 (data/flow_mon.js eq) ----------
  function renderEquip() {
    const side = state.dir === "in" && !all() ? "d" : "o";
    const yi = MON.years.indexOf(Y[state.yi]);
    const el = $("#bars-equip");
    const mine = MON.eq?.[side]?.[state.k], nat = MON.eq?.[side]?.["00"];
    if (yi < 0 || !mine) { el.innerHTML = `<p class="note">${yi < 0 ? `${MON.years[0]}~${MON.years.at(-1)}년만 싣습니다.` : "자료가 없습니다."}</p>`; return; }
    const shareOf = (arr, j) => { const row = arr?.[j]; const t = row ? row.reduce((a, b) => a + b, 0) : 0; return t ? row.map((x) => (x / t) * 100) : null; };
    const cur = shareOf(mine, yi), prev = yi > 0 ? shareOf(mine, yi - 1) : null, natS = shareOf(nat, yi);
    if (!cur) { el.innerHTML = '<p class="note">이 해에는 자료가 없습니다.</p>'; return; }
    const COLORS = ["#f5a524", "#3987e5", "#199e70", "#9085e9", "#d55181", "#c98500", "#7d8590"];
    const rows = MON.eqNames.map((name, i) => ({ name, i, c: cur[i], p: prev?.[i], n: natS?.[i], color: COLORS[i] }))
      .filter((r) => r.c > 0 || r.p > 0).sort((a, b) => b.c - a.c);
    el.innerHTML = `<div class="mix-head"><span></span><span></span><span>${all() ? "비중" : "이 흐름"}</span><span>${all() ? "" : "전국"}</span><span>전년대비</span></div>` + rows.map((r) => {
      const d = ok(r.c) && ok(r.p) ? r.c - r.p : null;
      const cls = d == null ? "" : d > 0 ? "up" : d < 0 ? "down" : "";
      const ei = EQ.findIndex((e) => e.name === r.name);
      return `<button type="button" class="bar-row share-row${ei === state.eq ? " sel" : ""}" data-eq="${ei}" title="${esc(`${r.name} · ${pct(r.c)}${ok(r.n) ? ` (전국 ${pct(r.n)})` : ""} · 누르면 이 기기의 흐름`)}">
        <span class="name"><i class="sw" style="background:${r.color}"></i>${esc(r.name)}</span>
        <span class="track mark-track"><span class="fill" style="width:${Math.min(100, r.c)}%;background:${r.color}"></span>${ok(r.n) && !all() ? `<span class="nat-mark" style="left:${Math.min(100, r.n)}%"></span>` : ""}</span>
        <span class="val">${pct(r.c)}</span><span class="natv">${all() ? "" : pct(r.n)}</span>
        <span class="chg ${cls}">${d == null ? "–" : `${d > 0 ? "▲" : d < 0 ? "▼" : ""}${nf1.format(Math.abs(d))}%p`}</span></button>`;
    }).join("");
    $$("[data-eq]", el).forEach((b) => b.addEventListener("click", () => { const i = +b.dataset.eq; if (i >= 0 && i !== state.eq) setEq(i); }));
  }

  // ---------- 가운데: 지도 아래 상대 지역 순위 ----------
  function renderPairs() {
    const S = cur.S || 1;
    const pairs = [...cur.pairs.values()].sort((a, b) => b.q - a.q).slice(0, 10);
    const maxS = pairs[0] ? (pairs[0].q / S) * 100 : 1;
    const head = all() ? "주요 기종점" : state.dir === "out" ? "주요 도착지" : "주요 출발지";
    const name = (p) => {
      if (p.o === p.d) return `<span class="${state.dir === "in" ? "d" : "o"}">${esc(fullLabel(p.o))}</span> 안`;
      if (all()) return `<span class="o">${esc(tinyLabel(p.o))}</span><span class="ar">→</span><span class="d">${esc(tinyLabel(p.d))}</span>`;
      return state.dir === "out" ? `<span class="ar">→</span><span class="d">${esc(fullLabel(p.d))}</span>` : `<span class="o">${esc(fullLabel(p.o))}</span><span class="ar">→</span>`;
    };
    const row = (p, i) => {
      const s = (p.q / S) * 100;
      return `<button type="button" class="fl-pair${i < 3 ? " top" : ""}" data-i="${i}" title="${esc(`${fullLabel(p.o)} → ${fullLabel(p.d)} · ${pctS(s)} · ${km(p.qd / p.q)}`)}">
        <span class="no">${i + 1}</span><span class="nm">${name(p)}</span>
        <span class="track"><span class="fill" style="width:${(s / maxS) * 100}%"></span></span>
        <span class="val">${pctS(s)}</span><span class="km">${p.o === p.d ? "–" : km(p.qd / p.q)}</span></button>`;
    };
    $("#pairs").innerHTML = pairs.length ? `
      <div class="rank-title"><span><b>${head}</b> ${all() ? "전국" : "이 흐름"} 대비 비중</span><span class="rank-meta">${yearText()} · ${state.lv === "sido" && all() ? "시도" : "시군"} 단위</span></div>
      <div>${pairs.slice(0, 5).map(row).join("")}</div><div>${pairs.slice(5).map((p, i) => row(p, i + 5)).join("")}</div>` : `<p class="note">${yearText()}에는 이 조건의 이동이 없습니다.</p>`;
    $$("#pairs .fl-pair").forEach((b) => b.addEventListener("click", () => goPartner(pairs[+b.dataset.i])));
  }

  // ---------- 오른쪽: 품목 ----------
  function renderCrops() {
    const tot = cur.crop.reduce((a, b) => a + b, 0);
    const totN = cur.cropN.reduce((a, b) => a + b, 0);
    const bt = base ? base.crop.reduce((a, b) => a + b, 0) : 0;
    const list = [...cur.crop].map((q, c) => ({ c, q })).filter((d) => d.q > 0 && (d.q / tot >= 0.0005 || d.c === state.crop)).sort((a, b) => b.q - a.q);
    const rows = list.slice(0, 30);
    const max = rows[0] ? (rows[0].q / tot) * 100 : 1;
    const el = $("#crop-list");
    el.innerHTML = rows.length ? rows.map(({ c, q }) => {
      const s = (q / tot) * 100;
      const prev = bt ? (base.crop[c] / bt) * 100 : null;
      const d = ok(prev) ? s - prev : null;
      const nat = totN ? (cur.cropN[c] / totN) * 100 : null;
      const lq = nat ? s / nat : null;
      const dist = cur.cropD[c] / q;
      const lqCls = !ok(lq) || all() ? "" : lq >= 1.5 ? "hi" : lq <= 0.67 ? "lo" : "";
      return `<button type="button" class="crop-row2${state.crop === c ? " sel" : ""}" data-c="${c}" title="${esc(`${D.crops[c]} · 흐름 안 ${pct(s)} · 전국 ${pct(nat)} · 평균 ${km(dist)}`)}">
        <span class="name">${esc(D.crops[c])}</span>
        <span class="track"><span class="fill" style="width:${(s / max) * 100}%"></span></span>
        <span class="val">${pct(s)}</span>
        <span class="chg ${d > 0 ? "up" : d < 0 ? "down" : ""}">${d == null ? "–" : `${d > 0 ? "▲" : d < 0 ? "▼" : ""}${nf1.format(Math.abs(d))}`}</span>
        <span class="lq ${lqCls}">${all() ? "–" : ok(lq) ? `${lq >= 10 ? nf0.format(lq) : nf1.format(lq)}` : "–"}</span>
        <span class="km">${km(dist)}</span>
      </button>`;
    }).join("") : '<p class="note">자료가 없습니다.</p>';
    $$("[data-c]", el).forEach((b) => b.addEventListener("click", () => { state.crop = state.crop === +b.dataset.c ? -1 : +b.dataset.c; render(); }));
    $("#crop-note").textContent = `증감은 전년대비 %p · 특화는 흐름 안 비중 ÷ 전국 비중${all() ? "(지역을 고르면 계산)" : ""} · 누르면 그 품목만${cropName() ? " (표는 품목 조건을 빼고 계산)" : ""}`;
  }

  // 품목 × 상대 지역: 행마다 합 100%
  function renderMatrix() {
    const side = partner();
    const tot = cur.crop.reduce((a, b) => a + b, 0);
    const crops = [...cur.crop].map((q, c) => ({ c, q })).filter((d) => d.q > 0 && d.q / tot >= 0.0005).sort((a, b) => b.q - a.q).slice(0, 6);
    const colTot = new Map();
    for (const [k, q] of cur.cell) {
      const cp = k.slice(k.indexOf("|") + 1);
      colTot.set(cp, (colTot.get(cp) || 0) + q);
    }
    const cols = [...colTot].sort((a, b) => b[1] - a[1]).map(([k]) => k).slice(0, 5);
    const hasRest = colTot.size > cols.length;
    $("#matrix-title").textContent = side === "o" ? "무엇이 어디서" : "무엇이 어디로";
    const el = $("#matrix");
    const w = el.clientWidth;
    if (!w || !crops.length) { el.innerHTML = '<p class="note">자료가 없습니다.</p>'; return; }
    el.querySelector("p")?.remove();
    const allCols = hasRest ? [...cols, "_rest"] : cols;
    const lab = 58, top = 26, rh = 21;
    const cw = (w - lab) / allCols.length;
    const h = top + rh * crops.length + 2;
    const cells = crops.flatMap(({ c, q }, r) => {
      let used = 0;
      const row = cols.map((k, j) => { const v = cur.cell.get(`${c}|${k}`) || 0; used += v; return { c, r, j, k, s: v / q }; });
      if (hasRest) row.push({ c, r, j: cols.length, k: "_rest", s: (q - used) / q });
      return row;
    });
    const ramp = d3.scaleSqrt().domain([0, 0.7]).range(["#24272d", ACC]).clamp(true);
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`).attr("height", h);
    svg.selectAll("rect.cell").data(cells, (d) => `${d.c}-${d.k}`).join("rect").attr("class", "cell")
      .attr("x", (d) => lab + d.j * cw + 1).attr("y", (d) => top + d.r * rh + 1)
      .attr("width", Math.max(1, cw - 2)).attr("height", rh - 2).attr("rx", 3)
      .attr("fill", (d) => (d.s > 0 ? ramp(d.s) : "#202328"))
      .on("mousemove", (e, d) => showCtip(e, `<b>${esc(D.crops[d.c])} ${side === "o" ? "←" : "→"} ${d.k === "_rest" ? "기타" : esc(fullLabel(d.k))}</b>${esc(D.crops[d.c])} 물량의 ${pct(d.s * 100)}`))
      .on("mouseleave", hideCtip);
    svg.selectAll("text.cv").data(cells.filter((d) => d.s >= 0.05 && cw >= 28), (d) => `${d.c}-${d.k}`).join("text").attr("class", "cv")
      .attr("x", (d) => lab + d.j * cw + cw / 2).attr("y", (d) => top + d.r * rh + rh / 2 + 4).attr("text-anchor", "middle")
      .attr("font-size", 10.5).attr("fill", (d) => (d.s >= 0.35 ? "#14161b" : "#c9ced6")).attr("font-weight", (d) => (d.s >= 0.35 ? 700 : 400))
      .text((d) => nf0.format(d.s * 100));
    svg.selectAll("text.rl").data(crops, (d) => d.c).join("text").attr("class", "rl")
      .attr("x", lab - 6).attr("y", (d, r) => top + r * rh + rh / 2 + 4).attr("text-anchor", "end").attr("font-size", 11)
      .attr("fill", (d) => (d.c === state.crop ? ACC : "#9aa1ad")).text((d) => (D.crops[d.c].length > 5 ? `${D.crops[d.c].slice(0, 4)}…` : D.crops[d.c]));
    svg.selectAll("text.cl").data(allCols, (k) => k).join("text").attr("class", "cl")
      .attr("x", (k, j) => lab + j * cw + cw / 2).attr("y", top - 8).attr("text-anchor", "middle").attr("font-size", 10.5)
      .attr("fill", "#9aa1ad").text((k) => (k === "_rest" ? "기타" : tinyLabel(k)))
      .each(function () { const n = this; while (n.getComputedTextLength() > cw - 2 && n.textContent.length > 1) n.textContent = `${n.textContent.slice(0, -2)}…`; });
  }

  // ---------- 오른쪽: 월별 흐름 (data/flow_mon.js, 컨테이너·파렛트) ----------
  function renderSeason() {
    const el = $("#chart-season");
    const side = state.dir === "in" && !all() ? "d" : "o";
    const eq = eqName();
    const arr = MON[side]?.[eq]?.[state.k];
    const yi = MON.years.indexOf(Y[state.yi]);
    $("#season-chip").textContent = `${Y[state.yi]}년 · ${side === "o" ? "보낸" : "받은"} 양`;
    el.innerHTML = "";
    if (!MON.equips.includes(eq)) { $("#season-note").textContent = `월별 흐름은 컨테이너·파렛트만 싣습니다.`; return; }
    if (yi < 0 || !arr) { $("#season-note").textContent = yi < 0 ? `월별 흐름은 ${MON.years[0]}~${MON.years.at(-1)}년만 싣습니다.` : "이 지역의 월별 자료가 없습니다."; return; }
    const curY = arr[yi]?.slice(1);
    const prev = arr.slice(0, yi).filter(Boolean).map((a) => a.slice(1));
    const avg = prev.length ? d3.range(11).map((m) => d3.mean(prev, (p) => p[m])) : null;
    if (!curY) { $("#season-note").textContent = "이 해의 월별 자료가 없습니다."; return; }
    const w = el.clientWidth || 300, h = el.clientHeight || 96;
    const m = { l: 26, r: 6, t: 6, b: 16 };
    const x = d3.scaleBand().domain(d3.range(11)).range([m.l, w - m.r]).padding(0.22);
    const y = d3.scaleLinear().domain([0, d3.max([...curY, ...(avg || [])]) * 1.1]).nice(2).range([h - m.b, m.t]);
    const svg = d3.select(el).append("svg").attr("viewBox", `0 0 ${w} ${h}`);
    svg.append("g").attr("class", "axis").selectAll("text").data(y.ticks(2)).join("text")
      .attr("x", m.l - 4).attr("y", (v) => y(v) + 3.5).attr("text-anchor", "end").text((v) => `${nf0.format(v / 10)}%`);
    svg.append("g").selectAll("line").data(y.ticks(2)).join("line").attr("x1", m.l).attr("x2", w - m.r).attr("y1", (v) => y(v)).attr("y2", (v) => y(v)).attr("stroke", "#2a2e35");
    svg.append("g").selectAll("rect").data(curY).join("rect").attr("x", (_, i) => x(i)).attr("width", x.bandwidth())
      .attr("y", (v) => y(v)).attr("height", (v) => y(0) - y(v)).attr("rx", 2).attr("fill", ACC).attr("fill-opacity", 0.85)
      .append("title").text((v, i) => `${i + 1}월 ${nf1.format(v / 10)}%${avg ? ` (예년 ${nf1.format(avg[i] / 10)}%)` : ""}`);
    if (avg) svg.append("path").attr("fill", "none").attr("stroke", "#c9ced6").attr("stroke-width", 1.5).attr("stroke-dasharray", "3 2")
      .attr("d", d3.line().x((_, i) => x(i) + x.bandwidth() / 2).y((v) => y(v))(avg));
    svg.append("g").attr("class", "axis").selectAll("text.mx").data(d3.range(11)).join("text").attr("class", "mx")
      .attr("x", (i) => x(i) + x.bandwidth() / 2).attr("y", h - 3).attr("text-anchor", "middle").text((i) => i + 1);
    const peak = curY.indexOf(Math.max(...curY));
    $("#season-note").textContent = `막대 = ${Y[state.yi]}년 달별 비중, 점선 = ${prev.length ? `직전 ${prev.length}년 평균` : "비교 연도 없음"} · 가장 많은 달 ${peak + 1}월(${nf1.format(curY[peak] / 10)}%) · ${eq} 기준`;
  }

  // ---------- 전체 갱신 ----------
  function render() {
    cur = compute(state.yi);
    base = baseI() == null ? null : compute(baseI());
    syncControls();
    syncURL();
    $$("[data-year]").forEach((el) => { el.textContent = yearText(); });
    renderTitle();
    renderKpi();
    renderEquip();
    renderComposition("dt", D.dtypes, DT_COLOR, $("#bars-dtype"));
    renderComposition("sh", D.stypes, SH_COLOR, $("#bars-ship"));
    paintMap();
    renderPairs();
    renderCrops();
    renderMatrix();
    renderSeason();
  }

  fromURL();
  // 지도 칸 크기가 바뀌면(처음 배치 뒤 좌우 패널이 자리를 잡을 때, 창 크기를 바꿀 때) 지도를 다시 맞춘다
  let mw = 0, mh = 0;
  new ResizeObserver(([e]) => {
    const { width, height } = e.contentRect;
    if (Math.abs(width - mw) < 1 && Math.abs(height - mh) < 1) return;
    mw = width; mh = height;
    drawMap();
    if (cur) paintMap();
  }).observe($("#map-wrap"));
  drawMap();
  if (state.eq) loadEq(state.eq).then(render, () => { state.eq = 0; render(); });
  else render();
  // 그림 칸은 패널이 자리를 잡은 뒤에야 크기가 정해진다 → 크기가 바뀌면 그 그림만 다시 그린다
  const redraw = { "chart-share": () => renderKpi(), matrix: () => renderMatrix(), "chart-season": () => renderSeason() };
  const sizes = new Map();
  const ro = new ResizeObserver((entries) => {
    if (!cur) return;
    for (const e of entries) {
      const { width, height } = e.contentRect;
      const prev = sizes.get(e.target.id);
      sizes.set(e.target.id, [width, height]);
      if (prev && Math.abs(prev[0] - width) < 1 && Math.abs(prev[1] - height) < 1) continue;
      redraw[e.target.id]();
    }
  });
  Object.keys(redraw).forEach((id) => ro.observe($(`#${id}`)));
  $("#updated").textContent = `${D.source}`;
})();
