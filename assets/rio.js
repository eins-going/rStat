(() => {
  // 지역산업연관표(농업) — 한국은행 2020년 지역산업연관표(통합소분류)로 시도별 농식품 산업을 본다 (data/rio.js, scripts/build_rio.py)
  // 그림마다 한 가지 연관분석 개념을 맡는다: 특화(LQ) · 수급과 지역 간 교역 · 후방연관 · 전방연관 · 생산유발과 역외누출 · 영향력·감응도
  const D = window.AGRI_RIO;
  const T = window.AGRI_TOPO;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const NATION = "00";
  const REG = D.regions; // 한은 표 순서의 시도 코드
  const SIDO_ORDER = ["31", "32", "33", "34", "35", "36", "37", "38", "39", "11", "21", "22", "23", "24", "25", "26", "29"];
  const SIDOS = SIDO_ORDER.filter((c) => REG.includes(c));
  const name = (k) => (k === NATION ? "전국" : T.sidos[k]?.name ?? D.regionInfo[k].name);
  const short = (k) => (k === NATION ? "전국" : T.sidos[k]?.short ?? D.regionInfo[k].name);
  const C = { own: "#d95926", oth: "#3987e5", imp: "#199e70", va: "#5d636e" }; // 역내·타지역·수입(검증한 3색) · 부가가치(중립)

  // ---------- 숫자 ----------
  const nf0 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const nf2 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const ok = (n) => n != null && Number.isFinite(n);
  const pct = (r) => (ok(r) ? `${nf1.format(r * 100)}%` : "–");
  const pct0 = (r) => (ok(r) ? `${nf0.format(r * 100)}%` : "–");
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // 백만원 → 알맞은 단위
  function won(v) {
    if (!ok(v)) return "–";
    const a = Math.abs(v);
    if (a >= 1e6) return `${nf1.format(v / 1e6)}조 원`;
    if (a >= 1e4) return `${nf0.format(v / 100)}억 원`;
    if (a >= 100) return `${nf1.format(v / 100)}억 원`;
    return `${nf0.format(v)}백만 원`;
  }
  const eok = (v) => `${nf1.format(v)}억 원`;
  const people = (n) => (ok(n) ? (n >= 1e4 ? `${nf1.format(n / 1e4)}만 명` : `${nf0.format(n)}명`) : "–");

  // ---------- 자료 ----------
  const ITEM_KEYS = [...D.groups, ...D.order];
  const item = () => D.items[state.item];
  const R = (k, it = state.item) => D.items[it].regions[k];
  const sum = (o) => Object.values(o || {}).reduce((a, b) => a + b, 0);
  const prodTotal = (k) => sum(R(k)?.mult?.prod);
  const leak = (k) => { const t = prodTotal(k); return t ? 1 - R(k).mult.prod[k] / t : null; };
  const sent = (s) => Object.fromEntries(REG.map((b, i) => [b, R(s).flowOut[i]]));
  const received = (s) => Object.fromEntries(REG.map((b) => [b, R(b).flowOut[REG.indexOf(s)]]));
  const sname = (code) => D.sectorNames[code] ?? code;
  const itemLabel = () => item().name;

  // ---------- 상태·선택 ----------
  const METRICS = [
    { key: "flowOut", group: "교역", label: "보내는 곳", flow: true, fmt: won,
      note: "고른 시도에서 만든 것이 어느 시도로 갔나 (그 시도의 중간재·소비·투자, 수출 제외)" },
    { key: "flowIn", group: "교역", label: "받는 곳", flow: true, fmt: won,
      note: "고른 시도에서 쓴 것이 어느 시도에서 왔나" },
    { key: "x", group: "지표", label: "산출액", get: (k) => R(k).x, fmt: won, note: "2020년 산출액 (생산자가격)" },
    { key: "lq", group: "지표", label: "특화계수", get: (k) => R(k).lq, fmt: (v) => (ok(v) ? nf2.format(v) : "–"),
      note: "도내 전체 산출 중 이 품목 비중 ÷ 전국 비중. 1보다 크면 전국 평균보다 이 품목에 특화" },
    { key: "self", group: "지표", label: "자급률", get: (k) => R(k).self, fmt: pct,
      note: "도내에서 쓴 이 품목(수출 제외) 중 도내에서 만든 몫" },
    { key: "outRate", group: "지표", label: "이출률", get: (k) => R(k).outRate, fmt: pct,
      note: "도내 생산 중 다른 시도로 나간 몫" },
    { key: "jobs", group: "지표", label: "취업자", get: (k) => R(k).jobs, fmt: people,
      note: "취업자 수(전업환산). 고용표는 중분류까지라 소분류 품목은 그 중분류 값" },
    { key: "prod", group: "파급", label: "생산유발", get: (k) => prodTotal(k), fmt: (v) => (ok(v) ? nf2.format(v) : "–"),
      note: "이 품목 최종수요 1원이 전국 모든 산업에 유발하는 생산 (한은 생산유발계수)" },
    { key: "leak", group: "파급", label: "역외 누출", get: (k) => leak(k), fmt: pct,
      note: "생산유발 가운데 다른 시도에서 일어나는 몫. 높을수록 효과가 도 밖으로 샌다" },
  ];
  let ptN = 3; // 교역 상대 도넛에 보일 시도 수 (한 화면 맞춤에서 도넛이 커지면 5, growLeft)
  const state = { sido: NATION, item: "농축산물", metric: METRICS.find((m) => m.key === "x"), view: "map" };

  const selSido = $("#sido"), selItem = $("#item");
  selSido.innerHTML = `<option value="${NATION}">전국</option>` + SIDOS.map((s) => `<option value="${s}">${name(s)}</option>`).join("");
  const opt = (k) => `<option value="${k}">${esc(D.items[k].name)}</option>`;
  selItem.innerHTML = `<optgroup label="묶음">${D.groups.map(opt).join("")}</optgroup>`
    + `<optgroup label="농림수산">${D.order.filter((c) => c < "080").map(opt).join("")}</optgroup>`
    + `<optgroup label="음식료품">${D.order.filter((c) => c >= "080").map(opt).join("")}</optgroup>`;
  selSido.addEventListener("change", () => setSido(selSido.value));
  selItem.addEventListener("change", () => { state.item = selItem.value; render(); });

  function setSido(s) {
    state.sido = s;
    if (s === NATION && state.metric.flow) state.metric = METRICS.find((m) => m.key === "x");
    if (s !== NATION && state.metric.key === "x" && !state.touched) state.metric = METRICS[0];
    render();
  }

  // 주소: #전라남도?item=011&m=lq&v=link
  function syncURL() {
    const q = new URLSearchParams();
    if (state.item !== "농축산물") q.set("item", state.item);
    q.set("m", state.metric.key);
    if (state.view !== "map") q.set("v", state.view);
    const url = `${location.pathname}?${q}${state.sido !== NATION ? `#${encodeURIComponent(name(state.sido))}` : ""}`;
    if (url !== location.pathname + location.search + location.hash) history.replaceState(null, "", url);
  }
  function fromURL() {
    const a = decodeURIComponent(location.hash.slice(1));
    state.sido = SIDOS.find((c) => name(c) === a || short(c) === a) || NATION;
    const q = new URLSearchParams(location.search);
    if (D.items[q.get("item")]) state.item = q.get("item");
    const m = METRICS.find((x) => x.key === q.get("m"));
    state.metric = m && !(m.flow && state.sido === NATION) ? m : state.sido === NATION ? METRICS.find((x) => x.key === "x") : METRICS[0];
    state.touched = !!m;
    if (q.get("v") === "link") state.view = "link";
  }

  // ---------- 지도 ----------
  const RAMP = ["#3b3428", "#5e4925", "#8a6322", "#c0841f", "#f5a524"];
  const EMPTY = "#2a2d33";
  const mapSvg = d3.select("#map");
  const tip = $("#tip");
  const GEOMS = T.objects.municipalities.geometries;
  const sidoFeatures = SIDOS.map((s) => ({ type: "Feature", properties: { key: s }, geometry: topojson.merge(T, GEOMS.filter((g) => g.properties.sido === s)) }));
  const ULLEUNG_LON = 130.6, ULLEUNG_DX = -0.8;
  const drawLon = (lon) => (lon > ULLEUNG_LON ? lon + ULLEUNG_DX : lon);
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
  const anchor = new Map();
  const LABEL_DX = { 11: [2, -8], 31: [6, 12], 23: [-10, 2], 29: [0, -6], 25: [0, 7] }; // 붙어 있는 시도 이름이 겹치지 않게

  function mainPolyCentroid(f) {
    const g = f.geometry;
    const polys = g.type === "MultiPolygon" ? g.coordinates : [g.coordinates];
    let best = null, bestA = -1;
    for (const c of polys) {
      const pf = { type: "Polygon", coordinates: c };
      const a = path.area(pf);
      if (a > bestA) { bestA = a; best = pf; }
    }
    return path.centroid(best);
  }

  function drawMap() {
    const wrap = $("#map-wrap");
    const w = wrap.clientWidth;
    const h = FIT.matches ? Math.max(240, wrap.clientHeight) : Math.round(Math.max(360, Math.min(640, w * 1.0)));
    size = { w, h };
    const pad = 14, bw = BOUNDS.x1 - BOUNDS.x0, bh = BOUNDS.y1 - BOUNDS.y0;
    const s = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
    const ox = (w - bw * s) / 2, oy = (h - bh * s) / 2;
    path = d3.geoPath(d3.geoTransform({ point(lon, lat) { this.stream.point(ox + (drawLon(lon) * KX - BOUNDS.x0) * s, oy + (BOUNDS.y1 - lat) * s); } }));
    for (const f of sidoFeatures) anchor.set(f.properties.key, mainPolyCentroid(f));
    mapSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", FIT.matches ? null : h);
    const defs = mapSvg.selectAll("defs").data([0]).join("defs");
    defs.selectAll("marker").data([0]).join("marker").attr("id", "ri-arrow").attr("viewBox", "0 0 10 10").attr("refX", 6).attr("refY", 5)
      .attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 13).attr("markerHeight", 13).attr("orient", "auto")
      .selectAll("path").data([0]).join("path").attr("d", "M0,0 L10,5 L0,10 z").attr("fill", "#eef0f3");
    mapSvg.selectAll("g.sidos").data([0]).join("g").attr("class", "sidos")
      .selectAll("path").data(sidoFeatures, (d) => d.properties.key).join("path")
      .attr("class", "region ri-sido").attr("d", path).attr("tabindex", 0).attr("role", "button")
      .on("mousemove", (e, d) => showMapTip(e, d.properties.key))
      .on("mouseleave", () => { tip.hidden = true; })
      .on("click", (e, d) => setSido(d.properties.key === state.sido ? NATION : d.properties.key))
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setSido(d.properties.key); } });
    mapSvg.selectAll("g.flows").data([0]).join("g").attr("class", "flows");
    mapSvg.selectAll("g.labels").data([0]).join("g").attr("class", "labels");
    paintMap();
  }

  function metricValues() {
    const m = state.metric, s = state.sido;
    if (m.flow) {
      const v = m.key === "flowOut" ? sent(s) : received(s);
      return Object.fromEntries(SIDOS.filter((k) => k !== s).map((k) => [k, v[k]]));
    }
    return Object.fromEntries(SIDOS.map((k) => [k, m.get(k)]));
  }

  function paintMap() {
    if (!path) return;
    const m = state.metric, s = state.sido;
    const vals = metricValues();
    const list = Object.values(vals).filter(ok);
    const q = list.length > 1 ? d3.scaleQuantile().domain(list).range(RAMP) : () => RAMP.at(-1);
    mapSvg.selectAll("path.ri-sido")
      .attr("fill", (d) => { const k = d.properties.key; if (m.flow && k === s) return "#14161b"; const v = vals[k]; return ok(v) ? q(v) : EMPTY; })
      .classed("sel", (d) => d.properties.key === s)
      .attr("aria-label", (d) => `${name(d.properties.key)} ${m.label} ${m.fmt(vals[d.properties.key])}`);
    mapSvg.selectAll("path.ri-sido.sel").raise();
    // 교역 화살표: 큰 흐름 6개
    const flows = m.flow ? Object.entries(vals).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]).slice(0, 6) : [];
    const maxF = flows[0]?.[1] || 1;
    const curve = (a, b) => {
      const [x0, y0] = anchor.get(a), [x1, y1] = anchor.get(b);
      const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, dx = x1 - x0, dy = y1 - y0;
      const k = 0.22;
      return `M${x0},${y0} Q${mx - dy * k},${my + dx * k} ${x1},${y1}`;
    };
    const g = mapSvg.select("g.flows");
    const data = flows.map(([k, v]) => ({ k, v, d: m.key === "flowOut" ? curve(s, k) : curve(k, s) }));
    g.selectAll("path.halo").data(data, (d) => d.k).join("path").attr("class", "halo").attr("d", (d) => d.d)
      .attr("stroke-width", (d) => 2 + Math.sqrt(d.v / maxF) * 7 + 3);
    g.selectAll("path.arrow").data(data, (d) => d.k).join("path").attr("class", "arrow").attr("d", (d) => d.d)
      .attr("marker-end", "url(#ri-arrow)").attr("stroke-width", (d) => 2 + Math.sqrt(d.v / maxF) * 7)
      .on("mousemove", (e, d) => showMapTip(e, d.k)).on("mouseleave", () => { tip.hidden = true; });
    // 이름: 흐름 보기에서는 화살표 끝 시도와 고른 시도만, 아니면 모두
    const show = m.flow ? new Set([s, ...flows.map(([k]) => k)]) : new Set(SIDOS);
    mapSvg.select("g.labels").selectAll("text").data(SIDOS.filter((k) => show.has(k)), (k) => k).join("text")
      .attr("x", (k) => anchor.get(k)[0] + (LABEL_DX[k]?.[0] || 0)).attr("y", (k) => anchor.get(k)[1] + 4 + (LABEL_DX[k]?.[1] || 0)).attr("text-anchor", "middle")
      .attr("class", (k) => `ri-label${k === s ? " sel" : ""}`).text((k) => short(k));
    // 범례
    const e = list.length > 1 ? [d3.min(list), ...q.quantiles(), d3.max(list)] : [];
    $("#legend").innerHTML = `<span class="title">${esc(itemLabel())} ${m.label}${m.flow ? ` <span style="color:var(--faint);font-weight:400">${short(s)} 기준</span>` : ""}</span>`
      + (e.length ? RAMP.map((c, i) => `<span class="row"><span class="sw" style="background:${c}"></span>${m.fmt(e[i])}–${m.fmt(e[i + 1])}</span>`).join("") : "")
      + (m.flow ? `<span class="row"><span class="ri-arrow-key"></span>큰 흐름 6곳</span>` : "");
    $("#metric-note").textContent = m.note;
  }

  function showMapTip(e, k) {
    const r0 = R(k);
    const lines = [`<b>${esc(name(k))}</b>${esc(itemLabel())}`];
    if (state.metric.flow && state.sido !== NATION && k !== state.sido) {
      const v = metricValues()[k];
      lines.push(state.metric.key === "flowOut" ? `${short(state.sido)} → ${short(k)} <b style="display:inline">${won(v)}</b>` : `${short(k)} → ${short(state.sido)} <b style="display:inline">${won(v)}</b>`);
    }
    lines.push(`산출 ${won(r0.x)} · 특화계수 ${nf2.format(r0.lq ?? 0)}`, `자급률 ${pct(r0.self)} · 이출률 ${pct(r0.outRate)}`);
    tip.innerHTML = lines.join("<br>");
    const rr = $("#map-wrap").getBoundingClientRect();
    tip.style.left = `${e.clientX - rr.left}px`;
    tip.style.top = `${e.clientY - rr.top}px`;
    tip.hidden = false;
  }

  function renderChips() {
    const nat = state.sido === NATION;
    let html = "", g = null;
    for (const m of METRICS) {
      if (m.group !== g) { html += `<span class="ri-chip-g">${m.group}</span>`; g = m.group; }
      html += `<button type="button" data-k="${m.key}" aria-pressed="${m === state.metric}"${m.flow && nat ? " disabled title=\"시도를 고르면 볼 수 있습니다\"" : ""}>${m.label}</button>`;
    }
    $("#chips").innerHTML = html;
    $$("#chips button").forEach((b) => b.addEventListener("click", () => {
      state.metric = METRICS.find((m) => m.key === b.dataset.k);
      state.touched = true;
      if (state.view !== "map") setView("map");
      render();
    }));
  }

  function renderRank() {
    const m = state.metric, s = state.sido;
    const vals = metricValues();
    const list = Object.entries(vals).filter(([, v]) => ok(v)).sort((a, b) => b[1] - a[1]);
    const max = Math.max(...list.map(([, v]) => Math.abs(v)), 0) || 1;
    const row = ([k, v], no) => `<button type="button" class="rank-row${k === s ? " sel" : ""}${no <= 3 ? " top" : ""}" data-r="${k}">
        <span class="no">${no}</span><span class="nm">${esc(short(k))}</span>
        <span class="track"><span class="fill" style="width:${(Math.abs(v) / max) * 100}%"></span></span>
        <span class="val">${m.fmt(v)}</span><span></span></button>`;
    const top = list.slice(0, 10);
    const selIdx = list.findIndex(([k]) => k === s);
    const extra = selIdx >= 10 ? `<div class="rank-title" style="margin:4px 0 0"><span>선택한 시도</span></div>${row(list[selIdx], selIdx + 1)}` : "";
    const title = m.flow ? `${short(s)} ${m.key === "flowOut" ? "→ 보내는 곳" : "← 받는 곳"}` : `${m.label} 상위 시도`;
    $("#rank").innerHTML = list.length ? `<div class="rank-title"><span><b>${esc(itemLabel())}</b> ${title}</span><span class="rank-meta">2020년 · ${list.length}곳</span></div>
      <div>${top.slice(0, 5).map((d, j) => row(d, j + 1)).join("")}</div><div>${top.slice(5).map((d, j) => row(d, j + 6)).join("")}</div>${extra}` : "";
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => setSido(b.dataset.r)));
  }

  // ---------- 가운데: 핵심 부문 진단 (영향력·감응도) ----------
  const scSvg = d3.select("#scatter");
  function setView(v) {
    state.view = v;
    $$("#view-seg button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.view === v));
    // SVG는 .hidden이 속성에 반영되지 않고, 범례는 display:flex가 hidden을 덮어써서 속성·스타일을 직접 바꾼다
    $("#map").toggleAttribute("hidden", v !== "map");
    $("#scatter").toggleAttribute("hidden", v !== "link");
    $("#legend").style.display = v === "map" ? "" : "none";
    $("#chips").classList.toggle("ri-dim", v !== "map");
  }
  $$("#view-seg button").forEach((b) => b.addEventListener("click", () => { setView(b.dataset.view); render(); }));

  function drawScatter() {
    const s = state.sido;
    const wrap = $("#map-wrap");
    const w = wrap.clientWidth, h = FIT.matches ? Math.max(260, wrap.clientHeight) : Math.round(Math.max(340, Math.min(560, w * 0.85)));
    scSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", FIT.matches ? null : h);
    scSvg.selectAll("*").remove();
    if (s === NATION) {
      scSvg.append("text").attr("x", w / 2).attr("y", h / 2).attr("text-anchor", "middle").attr("class", "ri-empty")
        .text("시도를 고르면 도내 165개 산업의 위치를 봅니다");
      $("#metric-note").textContent = "영향력계수(가로)는 그 산업 수요가 늘 때 전 산업에 주는 생산 유발, 감응도계수(세로)는 전 산업 수요가 늘 때 그 산업이 받는 영향. 1보다 크면 평균 이상";
      $("#rank").innerHTML = "";
      return;
    }
    const lk = D.linkage[s], xs = D.regionX[s];
    const pts = D.sectors.map((c, n) => ({ c, b: lk[n][0], f: lk[n][1], x: xs[n] })).filter((p) => p.x > 0);
    const focus = new Set(item().members || [state.item]);
    const agri = new Set(D.order);
    const m = { l: 40, r: 12, t: 30, b: 34 };
    // 1(평균)을 기준으로 위아래를 비교하는 값이라 로그 눈금 — 1의 2배와 1/2이 같은 거리
    const ext = (k) => { const v = pts.map((p) => p[k]); return [Math.min(0.6, d3.min(v) * 0.92), Math.max(1.7, d3.max(v) * 1.08)]; };
    const bx = d3.scaleLog().domain(ext("b")).range([m.l, w - m.r]);
    const by = d3.scaleLog().domain(ext("f")).range([h - m.b, m.t]);
    const rr = d3.scaleSqrt().domain([0, d3.max(pts, (p) => p.x)]).range([1.5, 13]);
    const g = scSvg.append("g");
    // 사분면 바탕과 이름
    const x1 = bx(1), y1 = by(1);
    g.append("rect").attr("class", "ri-quad hot").attr("x", x1).attr("y", m.t).attr("width", w - m.r - x1).attr("height", y1 - m.t);
    const ql = [[w - m.r - 4, m.t + 12, "end", "핵심 연관 산업", "투입·판로 연관 모두 큼"], [m.l + 4, m.t + 12, "start", "전방 연관형", "다른 산업의 원료로 많이 쓰임"],
      [w - m.r - 4, h - m.b - 16, "end", "후방 연관형", "생산에 다른 산업 투입을 많이 씀"], [m.l + 4, h - m.b - 16, "start", "연관 약함", ""]];
    for (const [x, y, a, t1, t2] of ql) {
      g.append("text").attr("x", x).attr("y", y).attr("text-anchor", a).attr("class", "ri-qt").text(t1);
      if (t2) g.append("text").attr("x", x).attr("y", y + 12).attr("text-anchor", a).attr("class", "ri-qs").text(t2);
    }
    g.append("line").attr("class", "ri-ref").attr("x1", x1).attr("x2", x1).attr("y1", m.t).attr("y2", h - m.b);
    g.append("line").attr("class", "ri-ref").attr("x1", m.l).attr("x2", w - m.r).attr("y1", y1).attr("y2", y1);
    const ax = g.append("g").attr("class", "ri-axis");
    const TICKS = [0.5, 0.7, 1, 1.5, 2, 3, 4, 6];
    for (const t of TICKS.filter((t) => t >= bx.domain()[0] && t <= bx.domain()[1])) ax.append("text").attr("x", bx(t)).attr("y", h - m.b + 13).attr("text-anchor", "middle").text(nf1.format(t));
    for (const t of TICKS.filter((t) => t >= by.domain()[0] && t <= by.domain()[1])) ax.append("text").attr("x", m.l - 5).attr("y", by(t) + 3).attr("text-anchor", "end").text(nf1.format(t));
    ax.append("text").attr("x", w - m.r).attr("y", h - 6).attr("text-anchor", "end").attr("class", "ri-axt").text("영향력계수 (후방연관) →");
    ax.append("text").attr("x", m.l - 30).attr("y", m.t - 10).attr("class", "ri-axt").text("↑ 감응도계수 (전방연관)");
    // 점: 일반 산업은 회색, 농식품은 주황, 고른 품목은 테두리와 이름
    const order = pts.sort((a, b) => (agri.has(a.c) - agri.has(b.c)) || (focus.has(a.c) - focus.has(b.c)) || b.x - a.x);
    g.selectAll("circle").data(order).join("circle")
      .attr("cx", (p) => bx(p.b)).attr("cy", (p) => by(p.f)).attr("r", (p) => rr(p.x))
      .attr("class", (p) => `ri-dot${agri.has(p.c) ? " agri" : ""}${focus.has(p.c) ? " focus" : ""}`)
      .on("mousemove", (e, p) => {
        tip.innerHTML = `<b>${esc(sname(p.c))}</b>${short(s)} · 산출 ${won(p.x)}<br>영향력계수 ${nf2.format(p.b)} · 감응도계수 ${nf2.format(p.f)}`;
        const r = $("#map-wrap").getBoundingClientRect();
        tip.style.left = `${e.clientX - r.left}px`; tip.style.top = `${e.clientY - r.top}px`; tip.hidden = false;
      })
      .on("mouseleave", () => { tip.hidden = true; });
    const lab = order.filter((p) => focus.has(p.c));
    g.selectAll("text.ri-dl").data(lab).join("text").attr("class", "ri-dl")
      .attr("x", (p) => bx(p.b) + rr(p.x) + 3).attr("y", (p) => by(p.f) + 4).text((p) => D.items[p.c]?.name ?? sname(p.c));
    $("#metric-note").textContent = "점 하나가 도내 산업 하나(165개), 크기는 산출액. 영향력계수: 그 산업 수요가 늘 때 전 산업 생산 유발(전 지역 평균=1). 감응도계수: 전 산업 수요가 늘 때 그 산업이 받는 영향. 한은 생산유발계수표로 계산";
    // 순위 자리: 농식품 품목의 위치 요약
    const qn = (p) => (p.b >= 1 && p.f >= 1 ? "핵심 연관" : p.f >= 1 ? "전방 연관형" : p.b >= 1 ? "후방 연관형" : "연관 약함");
    const ag = order.filter((p) => agri.has(p.c)).sort((a, b) => b.x - a.x);
    $("#rank").innerHTML = `<div class="rank-title"><span><b>${short(s)} 농식품 품목</b> 위치</span><span class="rank-meta">산출액 순</span></div>`
      + ag.slice(0, 10).map((p) => `<div class="ri-qrow${focus.has(p.c) ? " sel" : ""}"><span class="nm">${esc(D.items[p.c].name)}</span><span class="q">${qn(p)}</span><span class="val">${nf2.format(p.b)} · ${nf2.format(p.f)}</span></div>`).join("");
  }

  // ---------- 왼쪽 ① 규모와 특화 ----------
  function renderSize() {
    const s = state.sido, r0 = R(s), it = item();
    const info = D.regionInfo[s];
    $("#v-x").textContent = won(r0.x);
    $("#v-va").textContent = won(r0.va);
    $("#v-varate").textContent = ok(r0.vaRate) ? `(${pct0(r0.vaRate)})` : "";
    $("#v-jobs").textContent = people(r0.jobs);
    const lq = r0.lq;
    $("#size-lead").innerHTML = s === NATION
      ? `전국 ${esc(it.name)} 산출액은 <b>${won(r0.x)}</b>로 전체 산업의 <b>${pct(r0.share)}</b>입니다. 부가가치율은 ${pct0(r0.vaRate)}입니다.`
      : `${short(s)} ${esc(it.name)} 산출액은 <b>${won(r0.x)}</b>로 도내 산업의 <b>${pct(r0.share)}</b>, `
        + (lq >= 1 ? `전국 평균의 <b>${nf1.format(lq)}배</b>로 특화돼 있습니다.` : `전국 평균(${nf0.format(lq * 100)}%) 수준보다 비중이 작습니다.`);
    drawLQ();
    void info;
    renderMix();
  }

  // 품목 구성: 묶음이면 그 구성, 단일 품목이면 그 품목이 속한 묶음 안에서의 자리
  // ---------- 왼쪽 ② 품목 구성 ----------
  function renderMix() {
    const s = state.sido, it = item();
    const g = it.members ? state.item : D.groups.find((k) => D.items[k].members.includes(state.item));
    const members = D.items[g].members;
    const tot = D.items[g].regions[s].x || 1;
    const rows = members.map((c) => [c, D.items[c].regions[s].x]).sort((a, b) => b[1] - a[1]);
    const max = rows[0][1] / tot || 1;
    $("#mix-scope").textContent = `${short(s)} ${D.items[g].name} ${won(tot)}`;
    $("#mix").innerHTML = rows.map(([c, v]) => bar(D.items[c].name, [[v / tot, c === state.item || it.members ? C.own : "#6b717c"]], `<span class="amt">${won(v)}</span>${pct0(v / tot)}`,
      `${D.items[c].name} ${won(v)} (${pct(v / tot)})`, max)).join("");
    $$("#mix .ri-bar").forEach((el, i) => el.classList.toggle("sel", rows[i][0] === state.item));
  }

  // 막대 한 줄: segs = [[비율(0~1), 색], …], scale = 막대 전체가 뜻하는 비율
  function bar(label, segs, val, title, scale) {
    const parts = segs.filter(([v]) => v > 0).map(([v, c]) => `<i style="width:${(v / scale) * 100}%;background:${c}"></i>`).join("");
    return `<div class="ri-bar" title="${esc(title)}"><span class="nm">${esc(label)}</span><span class="track">${parts}</span><span class="val">${val}</span></div>`;
  }

  // 특화계수 눈금: 17개 시도 점을 한 줄에 (겹쳐도 둔다). 점에 마우스를 올리면 그 시도 이름·값을,
  // 떼면 고른 시도를 위에 보인다. 누르면 그 시도로
  function drawLQ() {
    const el = $("#lq-scale");
    const w = el.clientWidth || 300;
    const sel = state.sido;
    const vals = SIDOS.map((k) => [k, R(k).lq]).filter(([, v]) => ok(v));
    // 눈금 끝은 상위 10% 값의 1.3배에서 자른다 (한 시도가 튀면 나머지가 왼쪽에 몰린다). 넘는 점은 끝에 두고 'n+'로
    const top = d3.max(vals, ([, v]) => v), q90 = d3.quantile(vals.map(([, v]) => v).sort(d3.ascending), 0.9);
    const hi = Math.max(2, Math.ceil(Math.min(top, q90 * 1.3) * 2) / 2), cut = top > hi;
    const x = d3.scaleLinear().domain([0, hi]).range([10, w - 10]);
    // 고른 시도는 맨 위에 그린다
    const dots = vals.map(([k, v]) => ({ k, v, x: x(Math.min(v, hi)), r: k === sel ? 6.5 : 4.5 }))
      .sort((p, q) => (p.k === sel) - (q.k === sel));
    const cy = 20, h = 44;
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`);
    svg.selectAll("*").remove();
    svg.append("line").attr("class", "ri-lq-base").attr("x1", x(0)).attr("x2", x(hi)).attr("y1", cy).attr("y2", cy);
    svg.append("rect").attr("class", "ri-lq-hot").attr("x", x(1)).attr("y", cy - 10).attr("width", x(hi) - x(1)).attr("height", 20).attr("rx", 3);
    svg.append("line").attr("class", "ri-lq-one").attr("x1", x(1)).attr("x2", x(1)).attr("y1", cy - 12).attr("y2", cy + 12);
    svg.append("text").attr("class", "ri-lq-t").attr("x", x(1)).attr("y", h - 2).attr("text-anchor", "middle").text("전국 평균 1");
    svg.append("text").attr("class", "ri-lq-t").attr("x", x(hi)).attr("y", h - 2).attr("text-anchor", "end").text(`${nf1.format(hi)}${cut ? "+" : ""}`);
    if (x(1) - x(0) > 60) svg.append("text").attr("class", "ri-lq-t").attr("x", x(0)).attr("y", h - 2).attr("text-anchor", "start").text("0");
    const label = svg.append("text").attr("class", "ri-lq-sel").attr("y", cy - 13).attr("text-anchor", "middle");
    const show = (d) => {
      if (!d) { label.text(""); return; }
      const t = `${short(d.k)} ${nf2.format(d.v)}`;
      label.text(t).attr("x", Math.max(24, Math.min(w - 24, d.x)));
    };
    const selDot = dots.find((d) => d.k === sel);
    show(selDot);
    svg.append("g").selectAll("circle").data(dots).join("circle")
      .attr("cx", (d) => d.x).attr("cy", cy).attr("r", (d) => d.r)
      .attr("class", (d) => `ri-lq-dot${d.k === sel ? " sel" : ""}`)
      .on("mouseenter", function (_, d) { d3.select(this).classed("hover", true).raise(); show(d); })
      .on("mouseleave", function () { d3.select(this).classed("hover", false); show(selDot); })
      .on("click", (_, d) => setSido(d.k))
      .append("title").text((d) => `${name(d.k)} 특화계수 ${nf2.format(d.v)}`);
  }

  // ---------- 왼쪽 ③ 수급 구조: 생산은 어디로, 수요는 어디서 ----------
  function renderSupply() {
    const s = state.sido, r0 = R(s), nat = s === NATION;
    const own = nat ? r0.x - r0.exp : r0.own;
    const prod = nat ? [["국내 사용", own, C.own], ["수출", r0.exp, C.imp]] : [["도내 사용", r0.own, C.own], ["다른 시도로", r0.out, C.oth], ["수출", r0.exp, C.imp]];
    const dem = nat ? [["국산", own, C.own], ["수입", r0.imp, C.imp]] : [["도내산", r0.own, C.own], ["다른 시도에서", r0.inflow, C.oth], ["수입", r0.imp, C.imp]];
    const pT = d3.sum(prod, (d) => Math.max(0, d[1])), dT = d3.sum(dem, (d) => Math.max(0, d[1]));
    $("#supply-lead").innerHTML = nat
      ? `국내에서 쓰는 ${esc(itemLabel())}의 <b>${pct0(own / dT)}</b>는 국산, <b>${pct0(r0.imp / dT)}</b>는 수입입니다.`
      : `도내에서 쓰는 ${esc(itemLabel())}의 <b>${pct0(r0.own / dT)}</b>를 도내에서 대고(자급률), 도내 생산의 <b>${pct0(r0.out / pT)}</b>는 다른 시도로 나갑니다(이출률).`;
    const el = $("#supply-flow");
    const w = el.clientWidth || 300, h = 96;
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`);
    svg.selectAll("*").remove();
    // 생산·수요를 같은 금액 축으로 왼쪽에 맞춰 그리고 막대 끝에 총액. 도내(국내) 몫 띠는 두 막대에서 같은 금액이다
    // 생산·수요 사이는 띠 설명 한 줄이 들어갈 만큼만 (남는 높이는 아래 교역 상대 도넛이 쓴다)
    const L = 46, TW = 62, U = w - L - TW, bh = 18, yP = 16, yD = yP + bh + 30;
    const ty = (y) => y + bh / 2 + 4;
    const sc = U / Math.max(pT, dT, 1);
    const xP = L, xD = L;
    const row = (segs, y, label, total, x0) => {
      svg.append("text").attr("class", "ri-fl-h").attr("x", 0).attr("y", ty(y)).text(label);
      let x = x0;
      for (const [nm, v, c] of segs) {
        const ww = Math.max(0, v) * sc;
        if (ww <= 0) continue;
        svg.append("rect").attr("x", x).attr("y", y).attr("width", Math.max(0, ww - 2)).attr("height", bh).attr("rx", 3).attr("fill", c)
          .append("title").text(`${nm} ${won(v)} (${pct(v / total)})`);
        if (ww > 34) svg.append("text").attr("class", "ri-fl-v").attr("x", x + 5).attr("y", ty(y)).text(pct0(v / total));
        x += ww;
      }
      svg.append("text").attr("class", "ri-fl-t").attr("x", x + 3).attr("y", ty(y)).text(won(total));
    };
    const ow = Math.max(0, Math.max(0, own) * sc - 2), y1 = yP + bh, y2 = yD, my = (y1 + y2) / 2;
    svg.append("path").attr("class", "ri-fl-band")
      .attr("d", `M${xP},${y1} L${xP + ow},${y1} C${xP + ow},${my} ${xD + ow},${my} ${xD + ow},${y2} L${xD},${y2} C${xD},${my} ${xP},${my} ${xP},${y1} Z`);
    svg.append("text").attr("class", "ri-fl-b").attr("x", (xP + xD) / 2 + 6).attr("y", my + 4).text(`${nat ? "국내" : "도내"}에서 만들어 ${nat ? "국내" : "도내"}에서 씀 ${won(own)}`);
    row(prod, yP, "생산", pT, xP);
    row(dem, yD, "수요", dT, xD);
    renderPartners();
    $("#supply-key").innerHTML = [...prod.slice(1).map(([n, v, c]) => [`생산 → ${n}`, v, c]), ...dem.slice(1).map(([n, v, c]) => [`수요 ← ${n}`, v, c])]
      .map(([n, v, c]) => `<span><i style="background:${c}"></i>${n} <b>${won(v)}</b></span>`).join("");
  }

  // 주요 교역 상대: 이출(보내는 곳)·이입(받는 곳)을 도넛으로. 상위 n개 시도(파랑 단계) + 기타(회색)
  // 한 화면 맞춤에서 왼쪽 열 아래가 남으면 fitCols가 도넛을 키우고 n을 5로 늘린다
  const PT_COL = ["#3987e5", "#5a9bea", "#7eb1ef", "#a3c8f4", "#c6ddf8"], PT_REST = "#4a4f59";
  function renderPartners(n = ptN) {
    const s = state.sido, el = $("#partners");
    const head = `<h3 class="sub-head">주요 교역 상대 <span>다른 시도와 거래한 금액 중 비중</span></h3>`;
    if (s === NATION) {  // 전국은 교역 상대가 없다: 도넛 자리에 시도를 고르라는 안내
      el.innerHTML = head + `<div class="ri-pt-empty"><b>지도에서 시도를 눌러 보세요</b><span>그 시도가 다른 시도로 어디에 많이 보내고, 어디서 많이 받는지 보여 드립니다.</span></div>`;
      return;
    }
    const side = (obj, label) => {
      const list = Object.entries(obj).filter(([k, v]) => k !== s && v > 0).sort((a, b) => b[1] - a[1]);
      const tot = d3.sum(list, (d) => d[1]) || 1;
      const cols = n === 3 ? [PT_COL[0], PT_COL[2], PT_COL[4]] : PT_COL;
      const parts = list.slice(0, n).map(([k, v], i) => ({ nm: short(k), full: name(k), v, c: cols[i] }));
      const rest = d3.sum(list.slice(n), (d) => d[1]);
      if (rest > 0) parts.push({ nm: "기타", full: `그 밖의 ${list.length - n}개 시도`, v: rest, c: PT_REST });
      return { label, tot, parts };
    };
    const sides = [side(sent(s), "보내는 곳"), side(received(s), "받는 곳")];
    el.innerHTML = head + `<div class="ri-dns">`
      + sides.map((d) => `<div class="ri-dn"><div class="ri-dn-h">${d.label} <b>${won(d.tot)}</b></div><div class="ri-dn-b"><svg viewBox="-32 -32 64 64" aria-hidden="true"></svg>`
        + `<div class="ri-dn-k">${d.parts.map((p) => `<span title="${esc(p.full)} ${won(p.v)} (${pct(p.v / d.tot)})"><i style="background:${p.c}"></i><b>${p.nm}</b><em>${pct0(p.v / d.tot)}</em></span>`).join("")}</div></div></div>`).join("")
      + `</div>`;
    // 고리를 두껍게 해 큰 조각(약 9% 이상)에는 시도 이름과 비중을 조각 위에 쓴다 (도넛이 커졌을 때만 보인다, rio.css)
    const arc = d3.arc().innerRadius(14).outerRadius(31).padAngle(0.025).cornerRadius(1.5);
    const mid = d3.arc().innerRadius(22.5).outerRadius(22.5);
    $$("#partners .ri-dn svg").forEach((node, i) => {
      const d = sides[i];
      const arcs = d3.pie().sort(null).value((p) => p.v)(d.parts);
      d3.select(node).selectAll("path").data(arcs).join("path")
        .attr("d", arc).attr("fill", (a) => a.data.c)
        .append("title").text((a) => `${a.data.full} ${won(a.data.v)} (${pct(a.data.v / d.tot)})`);
      const lab = d3.select(node).selectAll("text").data(arcs.filter((a) => a.endAngle - a.startAngle > 0.55)).join("text")
        .attr("class", "ri-dn-t").attr("transform", (a) => `translate(${mid.centroid(a)})`);
      lab.append("tspan").attr("x", 0).attr("dy", "-0.15em").text((a) => a.data.nm);
      lab.append("tspan").attr("x", 0).attr("dy", "1.05em").attr("class", "ri-dn-tp").text((a) => pct0(a.data.v / d.tot));
    });
  }

  // ---------- 오른쪽 ④ 투입구조: 생산 100원의 구성 ----------
  function renderInput() {
    const s = state.sido, r0 = R(s), nat = s === NATION, x = r0.x || 1;
    const [io, it2, ii] = r0.inputsTotal;
    const parts = [["도내 투입", io, C.own], ["다른 시도 투입", it2, C.oth], ["수입 투입", ii, C.imp], ["부가가치", r0.va, C.va]];
    if (nat) parts[0][0] = "국내 투입";
    const per = parts.map(([n, v, c]) => [n, (v / x) * 100, c]);
    // 100칸에 나누기 (최대 나머지 방식)
    const raw = per.map((p) => Math.max(0, p[1]));
    const tot = d3.sum(raw) || 1;
    const cells = raw.map((v) => Math.floor((v / tot) * 100));
    let left = 100 - d3.sum(cells);
    raw.map((v, i) => [((v / tot) * 100) % 1, i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { cells[i]++; left--; } });
    const el = $("#waffle");
    // 25×4 정사각 칸으로 좌우를 채운다 (5줄보다 낮아 오른쪽 열이 덜 넘친다)
    const w = el.clientWidth || 300, cols = 25, rows = 4, gap = 2;
    const cw = (w - gap * (cols - 1)) / cols, ch = cw;
    const h = rows * ch + gap * (rows - 1);
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`);
    svg.selectAll("*").remove();
    let n = 0;
    cells.forEach((cnt, i) => {
      for (let j = 0; j < cnt; j++, n++) {
        const col = Math.floor(n / rows), rw = n % rows;
        svg.append("rect").attr("x", col * (cw + gap)).attr("y", rw * (ch + gap)).attr("width", cw).attr("height", ch).attr("rx", 2)
          .attr("fill", per[i][2]).append("title").text(`${per[i][0]} ${nf1.format(per[i][1])}원`);
      }
    });
    $("#waffle-key").innerHTML = per.filter(([nm]) => !(nat && nm === "다른 시도 투입")).map(([nm, v, c]) => `<span><i style="background:${c}"></i>${nm} <b>${nf1.format(v)}원</b></span>`).join("");
    const vp = r0.vaParts || {}, vaT = d3.sum(Object.values(vp)) || 1;
    $("#va-parts").innerHTML = `부가가치 ${nf0.format((r0.va / x) * 100)}원 = ` + [["피용자보수", "임금"], ["영업잉여", "영업잉여"], ["고정자본소모", "감가상각"], ["생산세", "순생산세"]]
      .map(([k, lb]) => `${lb} <b>${nf1.format(((vp[k] || 0) / x) * 100)}</b>`).join(" · ") + "원";
    void vaT;
    const outside = ((it2 + ii) / x) * 100;
    const rows2 = r0.inputs.map(([code, a, b, c]) => ({ code, a, b, c, t: a + b + c })).filter((d) => d.t > 0);
    rows2.sort((p, q) => q.t - p.t);
    const top = rows2.slice(0, 6);
    for (const d of rows2.slice(6)) if (["210", "088", "162"].includes(d.code) && (d.t / x) * 100 >= 0.3 && top.length < 8) top.push(d);
    const big = top[0];
    $("#input-lead").innerHTML = `생산 100원에 중간재 <b>${nf0.format(((io + it2 + ii) / x) * 100)}원</b>이 들어가고, `
      + (nat ? `그중 <b>${nf1.format((ii / x) * 100)}원</b>은 수입입니다.` : `그중 <b>${nf1.format(outside)}원</b>은 다른 시도·해외에서 옵니다.`)
      + (big ? ` 가장 큰 투입은 ${esc(sname(big.code))}(${nf1.format((big.t / x) * 100)}원).` : "");
    const max = Math.max(...top.map((d) => d.t / x)) || 1;
    $("#inputs").innerHTML = top.map((d) => bar(sname(d.code), [[d.a / x, C.own], [d.b / x, C.oth], [d.c / x, C.imp]], `${nf1.format((d.t / x) * 100)}원`,
      `${sname(d.code)}: ${nat ? "국내" : "도내"} ${won(d.a)}${nat ? "" : ` · 다른 시도 ${won(d.b)}`} · 수입 ${won(d.c)}`, max)).join("");
  }

  // ---------- 오른쪽 ⑤ 판로 ----------
  function renderSales() {
    const s = state.sido, r0 = R(s), nat = s === NATION, x = r0.x || 1;
    const rows = [
      ...r0.sales.map(([code, a, b]) => ({ nm: sname(code), a, b, e: 0, kind: "중간재" })),
      ...r0.salesFinal.filter(([, a, b]) => a + b > 0).map(([nm, a, b]) => ({ nm, a, b, e: 0, kind: "최종수요" })),
      { nm: "수출", a: 0, b: 0, e: r0.exp, kind: "수출" },
    ].map((d) => ({ ...d, t: d.a + d.b + d.e })).filter((d) => d.t > 0).sort((p, q) => q.t - p.t).slice(0, 8);
    const inter = d3.sum(r0.salesInter), fin = d3.sum(r0.salesFinal, (d) => d[1] + d[2]);
    const big = rows.find((d) => d.kind !== "수출") || rows[0];
    $("#sales-lead").innerHTML = `생산의 <b>${pct0(inter / x)}</b>는 다른 산업의 원료로, <b>${pct0(fin / x)}</b>는 소비·투자로, <b>${pct0(r0.exp / x)}</b>는 수출로 쓰입니다.`
      + (big ? ` 가장 큰 판로는 ${esc(big.nm)}(${pct0(big.t / x)}).` : "");
    const max = Math.max(...rows.map((d) => d.t / x)) || 1;
    $("#sales").innerHTML = rows.map((d) => bar(d.nm, [[d.a / x, C.own], [d.b / x, C.oth], [d.e / x, C.imp]], pct0(d.t / x),
      `${d.nm}(${d.kind}): ${nat ? "국내" : "도내"} ${won(d.a)}${nat ? "" : ` · 다른 시도 ${won(d.b)}`}${d.e ? ` · 수출 ${won(d.e)}` : ""}`, max)).join("")
      + `<div class="ri-key">${nat ? `<span><i style="background:${C.own}"></i>국내</span>` : `<span><i style="background:${C.own}"></i>도내</span><span><i style="background:${C.oth}"></i>다른 시도</span>`}<span><i style="background:${C.imp}"></i>수출</span></div>`;
  }

  // ---------- 오른쪽 ⑥ 파급효과 ----------
  function renderMult() {
    const s = state.sido, r0 = R(s), nat = s === NATION;
    $("#mult-bar").hidden = nat;
    $("#mult-tiles").style.display = nat ? "none" : ""; // .tiles의 display:grid가 hidden을 덮어쓴다
    if (nat) {
      $("#mult-lead").innerHTML = "파급효과는 시도별 표에서 계산합니다. <b>시도를 고르면</b> 이 품목 수요 10억 원이 도내와 다른 시도에 만드는 생산·부가가치·일자리를 봅니다.";
      return;
    }
    const pr = r0.mult.prod, tot = sum(pr) * 10, own = pr[s] * 10;
    const others = Object.entries(pr).filter(([k]) => k !== s).map(([k, v]) => [k, v * 10]).sort((a, b) => b[1] - a[1]);
    const va = r0.mult.va, vaT = sum(va) * 10, imT = sum(r0.mult.imp) * 10;
    const jb = r0.multJobs || {}, jT = sum(jb) * 1, jOwn = jb[s] || 0;
    $("#mult-lead").innerHTML = `${esc(itemLabel())} 수요가 <b>10억 원</b> 늘면 전국에서 생산 <b>${eok(tot)}</b>이 늘고, 그중 <b>${pct0((tot - own) / tot)}</b>는 다른 시도에서 일어납니다`
      + (others[0] ? `(${short(others[0][0])} ${eok(others[0][1])} 등).` : ".");
    // 막대: 최초 수요 10억 기준선 + 도내·다른 시도
    const el = $("#mult-bar");
    const w = el.clientWidth || 300, h = 50;
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`);
    svg.selectAll("*").remove();
    const L = 0, W = w - 2, sc = W / Math.max(tot, 10);
    const segs = [[short(s), own, C.own], ...others.slice(0, 3).map(([k, v]) => [short(k), v, C.oth]), ["기타 시도", d3.sum(others.slice(3), (d) => d[1]), C.oth]];
    let x = L;
    for (const [nm, v, c] of segs) {
      const ww = v * sc;
      if (ww <= 0.5) continue;
      svg.append("rect").attr("x", x).attr("y", 8).attr("width", Math.max(0.5, ww - 2)).attr("height", 20).attr("rx", 3).attr("fill", c).attr("opacity", c === C.oth && nm === "기타 시도" ? 0.55 : 1)
        .append("title").text(`${nm} ${eok(v)}`);
      // 칸에 들어가는 만큼만: 이름+값 → 값만 → 없음
      const t = svg.append("text").attr("class", "ri-fl-v").attr("x", x + 5).attr("y", 22).text(`${nm} ${nf1.format(v)}`);
      if (t.node().getComputedTextLength() + 9 > ww) t.text(nf1.format(v));
      if (t.node().getComputedTextLength() + 9 > ww) t.remove();
      x += ww;
    }
    svg.append("line").attr("class", "ri-ten").attr("x1", L + 10 * sc).attr("x2", L + 10 * sc).attr("y1", 2).attr("y2", 34);
    svg.append("text").attr("class", "ri-ten-t").attr("x", L + 10 * sc).attr("y", 46).attr("text-anchor", 10 * sc > W - 60 ? "end" : "middle").text("최초 수요 10억");
    svg.append("text").attr("class", "ri-ten-t").attr("x", W).attr("y", 46).attr("text-anchor", "end").text(10 * sc > W - 90 ? "" : `총 ${eok(tot)}`);
    $("#m-va").textContent = eok(vaT);
    $("#m-va").title = `도내 ${eok(va[s] * 10)} (${pct0((va[s] * 10) / vaT)})`;
    $("#m-imp").textContent = eok(imT);
    $("#m-jobs").textContent = `${nf1.format(jT)}명`;
    $("#m-jobs").title = `도내 ${nf1.format(jOwn)}명 (${pct0(jOwn / jT)})`;
  }

  // ---------- 그리기 ----------
  function render() {
    const s = state.sido;
    selSido.value = s;
    selItem.value = state.item;
    $("#crumb").textContent = s === NATION ? "" : "전국 › ";
    $("#title").textContent = `${name(s)} ${itemLabel()}`;
    renderChips();
    renderSize();
    renderSupply();
    renderInput();
    renderSales();
    renderMult();
    if (state.view === "map") { paintMap(); renderRank(); } else drawScatter();
    fitCols();
    syncURL();
  }

  // 한 화면 맞춤에서 옆 열이 넘치면 그 열에서 가장 긴 목록의 아래 줄(작은 값)부터 숨긴다. 고른 품목 줄은 남긴다
  const oneScreen = matchMedia("(min-width: 1281px) and (min-height: 720px)");
  const TRIM = [[".col-left", [["#mix", 3]]], [".col-right", [["#inputs", 4], ["#sales", 4]]]];
  // 한 화면 맞춤에서 왼쪽 열 아래가 남으면: 교역 상대 도넛을 키우고(최대 150px, 96px 이상이면 상위 5개 시도),
  // 나머지는 그림·범례·교역 상대 위 간격으로 나눈다(한 곳 28px까지). 수급 구조 그림(생산·수요 막대)은 키우지 않는다
  function growLeft() {
    const box = $("#partners"), panel = $("#p-supply");
    ptN = 3;
    box.style.removeProperty("--dn");
    const gaps = ["#supply-flow", "#supply-key", "#partners"].map((q) => $(q));
    gaps.forEach((g) => { g.style.marginTop = ""; });
    renderSupply();
    if (!oneScreen.matches) return;
    const spare = () => panel.getBoundingClientRect().bottom - parseFloat(getComputedStyle(panel).paddingBottom)
      - [...panel.children].filter((c) => !c.hidden).at(-1).getBoundingClientRect().bottom - 6;
    const svg = $("#partners .ri-dn svg");
    box.classList.remove("ri-pt-big");
    if (svg && spare() > 8) {
      // 많이 남으면 범례를 숨기고 조각 위에 이름·비중을 쓴 도넛을 칸 너비까지 키운다. 조금 남으면 범례는 옆에 두고 조금만 키운다
      const cur = svg.getBoundingClientRect().height;
      if (spare() > 60) {
        ptN = 5;
        renderPartners();
        box.classList.add("ri-pt-big");
        const cellW = $("#partners .ri-dn").clientWidth;
        box.style.setProperty("--dn", `${Math.floor(Math.max(cur, Math.min(170, cellW - 8, cur + spare())))}px`);
      } else {
        const size = Math.floor(Math.min(96, cur + spare()));
        box.style.setProperty("--dn", `${size}px`);
      }
    }
    const empty = $("#partners .ri-pt-empty");  // 전국 안내 상자는 그림을 다시 그린 뒤에 키운다 (다시 그리면 새로 만들어진다)
    if (empty && spare() > 8) empty.style.minHeight = `${Math.floor(empty.getBoundingClientRect().height + spare())}px`; // 남는 높이를 모두 채운다
    const rest = Math.floor(spare()), open = gaps.filter((g) => !g.hidden);
    if (rest > 8) open.forEach((g) => { g.style.marginTop = `${Math.min(28, Math.floor(rest / open.length)) + parseFloat(getComputedStyle(g).marginTop)}px`; });
  }

  function fitCols() {
    growLeft();
    for (const [colSel, specs] of TRIM) {
      const col = $(colSel);
      const lists = specs.map(([sel, min]) => ({ rows: $$(`${sel} .ri-bar`), min }));
      lists.forEach((l) => l.rows.forEach((el) => { el.hidden = false; }));
      if (!oneScreen.matches) continue;
      while (col.scrollHeight > col.clientHeight) {
        const cand = lists.map((l) => ({ l, vis: l.rows.filter((el) => !el.hidden && !el.classList.contains("sel")) }))
          .filter(({ l, vis }) => vis.length > l.min).sort((a, b) => b.vis.length - a.vis.length)[0];
        if (!cand) break;
        cand.vis[cand.vis.length - 1].hidden = true;
      }
    }
  }

  fromURL();
  $("#built").textContent = `자료 작성 ${D.built}`;
  setView(state.view);
  drawMap();
  render();
  // 지도 칸 크기가 바뀔 때만 다시 그린다 (자리가 잡힌 뒤 칸이 커지거나 줄어든다)
  let raf = 0, lastWH = "";
  new ResizeObserver(() => {
    const wrap = $("#map-wrap"), wh = `${wrap.clientWidth}x${wrap.clientHeight}`;
    if (wh === lastWH) return;
    lastWH = wh;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => { drawMap(); render(); });
  }).observe($("#map-wrap"));
})();
