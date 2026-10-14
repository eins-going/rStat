(() => {
  // 한눈에 보는 지역물류기기 사업동향 — 지역 체계·지도·순위는 지역농업 통계 대시보드(app.js)와 같다
  const D = window.AGRI_LOGI;
  const T = window.AGRI_TOPO;
  const V = D.v;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ---------- 지역 체계: '00' 전국 · '31' 시도 · '31|수원시' 시군 ----------
  const NATION = "00";
  // 표시 순서: 9개 도 → 서울 → 광역시 → 세종
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

  const level = (k) => (k === NATION ? 0 : k.includes("|") ? 2 : 1);
  const sidoOf = (k) => (level(k) === 2 ? k.split("|")[0] : level(k) === 1 ? k : null);
  const parentOf = (k) => (level(k) === 2 ? sidoOf(k) : level(k) === 1 ? NATION : null);
  const childrenOf = (k) => (level(k) === 0 ? SIDO_CODES : level(k) === 1 ? UNITS_BY_SIDO[k] : []);
  const label = (k) => (k === NATION ? "전국" : level(k) === 1 ? T.sidos[k].name : k.split("|")[1]);
  const shortLabel = (k) => (level(k) === 1 ? T.sidos[k].short : label(k));
  const peersOf = (k) => (k === NATION ? [] : childrenOf(parentOf(k)));

  // ---------- 숫자 ----------
  const nf0 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const int = (n) => (n == null || Number.isNaN(n) ? "–" : nf0.format(n));
  const pct = (n) => (n == null || Number.isNaN(n) ? "–" : `${nf1.format(n)}%`);

  function compact(n) {
    if (n == null) return "–";
    const a = Math.abs(n);
    if (a >= 1e8) return `${nf1.format(n / 1e8)}억`;
    if (a >= 1e6) return `${nf0.format(n / 1e4)}만`;
    if (a >= 1e4) return `${nf1.format(n / 1e4)}만`;
    return nf0.format(n);
  }

  function won(w) {
    if (w == null || Number.isNaN(w)) return "–";
    if (w >= 1e12) return `${(w / 1e12).toFixed(2)}조 원`;
    if (w >= 1e10) return `${nf0.format(w / 1e8)}억 원`;
    if (w >= 1e8) return `${(w / 1e8).toFixed(2)}억 원`;
    return `${nf0.format(w / 1e4)}만 원`;
  }

  const lastOf = (arr) => {
    if (!arr) return { value: null, prev: null, i: -1 };
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] != null) {
        let p = null;
        for (let j = i - 1; j >= 0; j--) if (arr[j] != null) { p = arr[j]; break; }
        return { value: arr[i], prev: p, i };
      }
    }
    return { value: null, prev: null, i: -1 };
  };

  function change(cur, prev) {
    if (cur == null || prev == null || prev === 0) return null;
    return ((cur - prev) / prev) * 100;
  }

  function deltaHTML(cur, prev, labelText = "전년 대비") {
    const r = change(cur, prev);
    if (r == null) return "";
    const cls = r > 0 ? "up" : r < 0 ? "down" : "";
    const arrow = r > 0 ? "▲" : r < 0 ? "▼" : "–";
    return `${labelText ? `${labelText} ` : ""}<span class="${cls}" title="전년 대비">${arrow}${labelText ? " " : ""}${nf1.format(Math.abs(r))}%</span>`;
  }

  function countTo(el, target, format) {
    if (!el) return;
    if (target == null || Number.isNaN(target) || reduceMotion) {
      el.textContent = target == null || Number.isNaN(target) ? "–" : format(target);
      el._v = target;
      return;
    }
    const from = el._v ?? 0;
    el._v = target;
    const t0 = performance.now();
    cancelAnimationFrame(el._raf);
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 650);
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = format(from + (target - from) * e);
      if (k < 1) el._raf = requestAnimationFrame(step);
    };
    el._raf = requestAnimationFrame(step);
  }

  const setV = (key, value, format = int) => countTo($(`[data-v="${key}"]`), value, format);
  const setD = (key, html) => { const el = $(`[data-d="${key}"]`); if (el) el.innerHTML = html; };
  // 설명 줄을 숨기는 좁은 화면에서도 볼 수 있도록 막대 영역에 툴팁으로 함께 단다
  const setNote = (key, text) => {
    const el = $(`[data-note="${key}"]`);
    if (!el) return;
    el.textContent = text || "";
    const row = el.closest(".meter-row");
    if (row) row.title = text || "";
  };
  const setRank = (key, text) => { const el = $(`[data-rank="${key}"]`); if (el) el.textContent = text || ""; };
  const setYear = (panel, text) => { $(`#${panel} [data-year]`).textContent = text; };

  // 같은 상위 지역 안에서의 순위 (값이 큰 순서)
  function rankText(k, getter) {
    if (k === NATION) return null;
    const list = peersOf(k).map((r) => [r, getter(r)]).filter(([, v]) => v != null).sort((a, b) => b[1] - a[1]);
    const i = list.findIndex(([r]) => r === k);
    if (i < 0 || list.length < 2) return null;
    const scope = level(k) === 1 ? "전국" : T.sidos[sidoOf(k)].short;
    return `${scope} ${i + 1}위 / ${list.length}`;
  }

  // ---------- 지표 ----------
  const Y = D.years; // 예: [2023, 2024, 2025], 값 배열은 이 순서
  const CUR = Y.at(-1);
  const PREV = Y.at(-2);
  const PERIOD = `${CUR}년 1~11월`;
  const has = (k) => !!V[k];
  const qtyOf = (k, type, i = -1) => (has(k) ? V[k].qty[type]?.at(i) ?? 0 : null);
  const container = (k, i = -1) => qtyOf(k, "컨테이너", i);
  const pallet = (k, i = -1) => qtyOf(k, "파렛트", i);
  const moves = (k, i = -1) => V[k]?.n?.at(i) ?? null;
  const yoy = (fn) => (k) => change(fn(k, -1), fn(k, -2));
  const field = (name, i = -1) => (k) => V[k]?.[name]?.at(i) ?? null;
  // 구성 비율: 자료가 있는 지역에서 해당 유형이 없으면 0%
  const destShare = (type, i = -1) => (k) => { const d = V[k]?.dest?.at(i); return d ? d[type] ?? 0 : null; };
  const shipShare = (type, i = -1) => (k) => { const d = V[k]?.ship?.at(i); return d ? d[type] ?? 0 : null; };
  const times = (v) => (v == null ? "–" : `${nf1.format(v)}배`);

  // 지도에서 고를 수 있는 지표
  const METRICS = [
    { key: "container", label: "컨테이너 이용량", unit: "개", year: PERIOD, get: (k) => container(k), fmt: int },
    { key: "containerYoy", label: "컨테이너 증감률", unit: "%", year: `${PERIOD} 전년 동기 대비`, get: yoy(container), fmt: pct },
    { key: "pallet", label: "파렛트 이용량", unit: "개", year: PERIOD, get: (k) => pallet(k), fmt: int },
    { key: "palletYoy", label: "파렛트 증감률", unit: "%", year: `${PERIOD} 전년 동기 대비`, get: yoy(pallet), fmt: pct },
    { key: "moves", label: "이동 건수", unit: "건", year: PERIOD, get: (k) => moves(k), fmt: int },
    { key: "movesYoy", label: "이동 건수 증감률", unit: "%", year: `${PERIOD} 전년 동기 대비`, get: yoy(moves), fmt: pct },
    { key: "metro", label: "수도권 출하 비중", unit: "%", year: PERIOD, get: field("metro"), fmt: pct },
    { key: "same", label: "도내 출하 비중", unit: "%", year: PERIOD, get: field("same"), fmt: pct },
    { key: "bigdc", label: "대형유통센터 비중", unit: "%", year: PERIOD, get: destShare("대형유통센터"), fmt: pct },
    { key: "dc", label: "종합유통센터 비중", unit: "%", year: PERIOD, get: destShare("종합유통센터"), fmt: pct },
    { key: "market", label: "도매시장 비중", unit: "%", year: PERIOD, get: destShare("도매시장"), fmt: pct },
    { key: "factory", label: "식품가공공장 비중", unit: "%", year: PERIOD, get: destShare("식품가공공장"), fmt: pct },
    { key: "corp", label: "농업회사법인 출하 비중", unit: "%", year: PERIOD, get: shipShare("농업회사법인"), fmt: pct },
    { key: "assoc", label: "영농조합법인 출하 비중", unit: "%", year: PERIOD, get: shipShare("영농조합법인"), fmt: pct },
    { key: "nh", label: "농협 출하 비중", unit: "%", year: PERIOD, get: shipShare("농협"), fmt: pct },
    { key: "spec", label: "특화 품목 특화도", unit: "배", year: PERIOD, get: (k) => V[k]?.spec?.[1] ?? null, fmt: times },
  ];
  const withUnit = (m, v) => `${m.fmt(v)}${m.unit && m.unit !== "%" && m.unit !== "배" ? ` ${m.unit}` : ""}`;

  const state = { key: NATION, metric: METRICS[0], rankScope: "local" };

  // ---------- 선택 상자 ----------
  const sidoSel = $("#sido");
  const sggSel = $("#sgg");
  sidoSel.innerHTML = [`<option value="${NATION}">전국</option>`, ...SIDO_CODES.map((s) => `<option value="${s}">${T.sidos[s].name}</option>`)].join("");
  sidoSel.addEventListener("change", () => select(sidoSel.value));
  sggSel.addEventListener("change", () => select(sggSel.value));
  $("#reset").addEventListener("click", () => select(parentOf(state.key) ?? NATION));

  function syncControls() {
    const s = sidoOf(state.key);
    sidoSel.value = s || NATION;
    const units = s ? UNITS_BY_SIDO[s] : [];
    sggSel.innerHTML = [`<option value="${s || NATION}">전체</option>`, ...units.map((u) => `<option value="${u}">${label(u)}</option>`)].join("");
    sggSel.disabled = !s || units.length < 2;
    sggSel.value = level(state.key) === 2 ? state.key : s || NATION;
    const reset = $("#reset");
    reset.hidden = state.key === NATION;
    reset.textContent = level(state.key) === 2 ? `${T.sidos[s].name} 전체 보기` : "전국 보기";
  }

  function toHash(k) {
    if (k === NATION) return "";
    return `#${encodeURIComponent(level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`)}`;
  }

  function fromHash() {
    const [a, b] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = SIDO_CODES.find((c) => T.sidos[c].name === a || T.sidos[c].short === a);
    if (!s) return NATION;
    const u = b && UNITS_BY_SIDO[s].find((k) => label(k) === b);
    return u || s;
  }

  function select(k) {
    state.key = k;
    const hash = toHash(k);
    if (location.hash !== hash) history.replaceState(null, "", hash || location.pathname + location.search);
    syncControls();
    render();
  }

  // ---------- 작은 차트 ----------
  function lineChart(sel, years, values, fmt = int, name = "") {
    const el = $(sel);
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return; // 숨겨져 있거나 아직 배치 전이면 크기가 잡힌 뒤 다시 그린다
    const pts = years.map((y, i) => ({ y, v: values?.[i] })).filter((d) => d.v != null);
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`);
    svg.attr("role", "img").attr("aria-label", pts.length ? `${name} ${pts[0].y}년 ${fmt(pts[0].v)}에서 ${pts.at(-1).y}년 ${fmt(pts.at(-1).v)}` : "자료 없음");
    if (!pts.length) { svg.selectAll("*").remove(); return; }
    const m = { t: 16, r: 12, b: 14, l: 12 };
    const x = d3.scalePoint().domain(pts.map((d) => d.y)).range([m.l, w - m.r]);
    // 세로 범위를 자료의 최소~최대에 맞춰 변화가 잘 보이게 한다
    const ext = d3.extent(pts, (d) => d.v);
    const pad = (ext[1] - ext[0]) * 0.15 || Math.abs(ext[1]) * 0.05 || 1;
    const y = d3.scaleLinear().domain([ext[0] - pad, ext[1] + pad]).range([h - m.b, m.t]);

    svg.selectAll("defs").data([0]).join("defs")
      .selectAll("linearGradient").data([0]).join("linearGradient")
      .attr("id", `g-${el.id}`).attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 1)
      .selectAll("stop").data([[0, 0.35], [1, 0]]).join("stop")
      .attr("offset", (d) => d[0]).attr("stop-color", "#f5a524").attr("stop-opacity", (d) => d[1]);

    const area = d3.area().x((d) => x(d.y)).y0(h - m.b).y1((d) => y(d.v)).curve(d3.curveMonotoneX);
    const line = d3.line().x((d) => x(d.y)).y((d) => y(d.v)).curve(d3.curveMonotoneX);
    // 처음 그릴 때는 바로, 지역을 바꿀 때만 움직임을 준다
    const first = !el.querySelector("path.line") || el.dataset.size !== `${w}x${h}`;
    el.dataset.size = `${w}x${h}`;
    const t = svg.transition().duration(reduceMotion || first ? 0 : 600);
    svg.selectAll("path.area").data([pts]).join("path").attr("class", "area").attr("fill", `url(#g-${el.id})`).transition(t).attr("d", area);
    svg.selectAll("path.line").data([pts]).join("path").attr("class", "line").attr("fill", "none").attr("stroke", "#f5a524").attr("stroke-width", 2).transition(t).attr("d", line);
    // 연도마다 점, 처음·마지막 값은 숫자로
    svg.selectAll("circle.pt").data(pts).join("circle").attr("class", "pt")
      .attr("r", (d, i) => (i === pts.length - 1 ? 4 : 2.5))
      .attr("fill", (d, i) => (i === pts.length - 1 ? "#f5a524" : "#1d2026")).attr("stroke", "#f5a524").attr("stroke-width", 1.5)
      .transition(t).attr("cx", (d) => x(d.y)).attr("cy", (d) => y(d.v));
    const ends = pts.length > 1 ? [pts[0], pts.at(-1)] : [pts[0]];
    svg.selectAll("text.end").data(ends).join("text").attr("class", "end")
      .attr("fill", (d, i) => (i ? "#eef0f3" : "#9aa1ad")).attr("font-size", 11.5).attr("font-weight", (d, i) => (i ? 700 : 500))
      .attr("text-anchor", (d, i) => (i ? "end" : "start"))
      .attr("x", (d, i) => x(d.y) + (i ? 4 : -4))
      .text((d) => fmt(d.v))
      .transition(t).attr("y", (d) => Math.max(11, y(d.v) - 8));
    // 연도: 간격이 좁으면 하나 걸러 표시
    const every = (w - m.l - m.r) / Math.max(1, pts.length - 1) < 26 ? 2 : 1;
    const ticks = pts.filter((d, i) => i % every === (pts.length - 1) % every);
    svg.selectAll("g.axis").data([0]).join("g").attr("class", "axis")
      .selectAll("text").data(ticks, (d) => d.y).join("text")
      .attr("x", (d) => x(d.y)).attr("y", h - 3).attr("text-anchor", "middle").text((d) => `'${String(d.y).slice(2)}`);
  }

  // 연도별 막대: 해마다 새로 생기는 양(귀농·귀촌 수, 회계연도 예산)에 쓴다. 0에서 시작, 마지막 해 강조
  function barChart(sel, years, values, fmt = int, name = "") {
    const el = $(sel);
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    const pts = years.map((y, i) => ({ y, v: values?.[i] ?? null }));
    const known = pts.filter((d) => d.v != null);
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`)
      .attr("role", "img")
      .attr("aria-label", known.length ? `${name} ${known.map((d) => `${d.y}년 ${fmt(d.v)}`).join(", ")}` : "자료 없음");
    if (!known.length) { svg.selectAll("*").remove(); return; }
    const top = 14, bottom = 13;
    const x = d3.scaleBand().domain(years).range([0, w]).paddingInner(0.3).paddingOuter(0.1);
    const max = d3.max(known, (d) => d.v) || 1;
    const y = d3.scaleLinear().domain([0, max]).range([h - bottom, top]);
    const first = !el.querySelector("rect") || el.dataset.size !== `${w}x${h}`;
    el.dataset.size = `${w}x${h}`;
    const lastIdx = pts.map((d) => d.v != null).lastIndexOf(true);
    svg.selectAll("line.base").data([0]).join("line").attr("class", "base")
      .attr("x1", 0).attr("x2", w).attr("y1", h - bottom + 0.5).attr("y2", h - bottom + 0.5).attr("stroke", "#2f333b");
    svg.selectAll("rect").data(pts).join("rect")
      .attr("x", (d) => x(d.y)).attr("width", x.bandwidth()).attr("rx", 1.5)
      .attr("fill", (d, i) => (i === lastIdx ? "#f5a524" : "#5a606b"))
      .transition().duration(reduceMotion || first ? 0 : 500)
      .attr("y", (d) => (d.v == null ? h - bottom : y(d.v))).attr("height", (d) => (d.v == null ? 0 : h - bottom - y(d.v)));
    // 처음·마지막 해 값
    const ends = known.length > 1 ? [known[0], known.at(-1)] : [known[0]];
    svg.selectAll("text.val").data(ends).join("text").attr("class", "val")
      .attr("x", (d, i) => (i ? Math.min(w, x(d.y) + x.bandwidth()) : Math.max(0, x(d.y))))
      .attr("y", (d) => Math.max(10, y(d.v) - 3))
      .attr("text-anchor", (d, i) => (i ? "end" : "start"))
      .attr("fill", (d, i) => (i ? "#eef0f3" : "#9aa1ad")).attr("font-size", 11).attr("font-weight", (d, i) => (i ? 700 : 500))
      .text((d) => fmt(d.v));
    const every = x.step() < 22 ? 2 : 1;
    const ticks = years.filter((d, i) => i % every === (years.length - 1) % every);
    svg.selectAll("text.yr").data(ticks, (d) => d).join("text").attr("class", "yr")
      .attr("x", (d) => x(d) + x.bandwidth() / 2).attr("y", h - 2).attr("text-anchor", "middle")
      .attr("fill", "#7d8490").attr("font-size", 10.5).text((d) => `'${String(d).slice(2)}`);
  }

  // ---------- 지도 ----------
  const RAMP = ["#3b3428", "#5e4925", "#8a6322", "#c0841f", "#f5a524"];
  const EMPTY = "#2a2d33";
  const mapSvg = d3.select("#map");
  const tip = $("#tip");
  const obj = T.objects.municipalities;

  // 시군·시도 경계를 하나의 도형으로 합친다 (구 경계선 없이)
  const unitFeatures = Object.values(UNITS_BY_SIDO).flat().map((k) => ({
    type: "Feature",
    properties: { key: k, sido: sidoOf(k) },
    geometry: topojson.merge(T, GEOMS.filter((g) => unitKeyOf(g) === k)),
  }));
  const sidoFeatures = SIDO_CODES.map((s) => ({
    type: "Feature",
    properties: { key: s, sido: s },
    geometry: topojson.merge(T, GEOMS.filter((g) => g.properties.sido === s)),
  }));
  const sidoMesh = topojson.mesh(T, obj, (a, b) => a !== b && a.properties.sido !== b.properties.sido);
  const unitMesh = topojson.mesh(T, obj, (a, b) => a !== b && a.properties.sido === b.properties.sido && unitKeyOf(a) !== unitKeyOf(b));

  // 위도 36도 부근 경도 축소를 반영한 평면 투영 (폴리곤 방향과 무관)
  const K = Math.cos((36 * Math.PI) / 180);
  const BOUNDS = (() => {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    const walk = (c) => {
      if (typeof c[0] === "number") {
        x0 = Math.min(x0, c[0] * K); x1 = Math.max(x1, c[0] * K);
        y0 = Math.min(y0, c[1]); y1 = Math.max(y1, c[1]);
      } else c.forEach(walk);
    };
    sidoFeatures.forEach((f) => walk(f.geometry.coordinates));
    return { x0, x1, y0, y1 };
  })();

  const LABEL_AT = { 31: [127.45, 37.2] };
  let path = null;
  let size = { w: 0, h: 0 };
  let view = { k: 1, x: 0, y: 0 };
  const anchor = new Map(); // 지역키 → 라벨 위치(가장 큰 조각의 중심, 기본 좌표)

  // 섬이 많은 지역도 본섬 위에 이름이 오도록 가장 큰 폴리곤의 중심을 쓴다
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

  function setMetric(m, scroll = true) {
    state.metric = m;
    const i = METRICS.indexOf(m);
    $$("#chips button").forEach((x, j) => x.setAttribute("aria-pressed", j === i));
    $("#chip-count").textContent = `${i + 1} / ${METRICS.length}`;
    if (scroll) {
      // 고른 지표 버튼이 줄 밖에 있으면 보이는 곳으로 옮긴다
      const bar = $("#chips");
      const b = $$("#chips button")[i];
      if (b.offsetLeft < bar.scrollLeft || b.offsetLeft + b.offsetWidth > bar.scrollLeft + bar.clientWidth) {
        bar.scrollTo({ left: b.offsetLeft - bar.clientWidth / 2 + b.offsetWidth / 2, behavior: reduceMotion ? "auto" : "smooth" });
      }
    }
    paintMap();
    renderRank();
  }

  // ◀ ▶는 지표 줄만 넘긴다. 지표는 버튼을 직접 눌러 고른다
  function syncChipNav() {
    const bar = $("#chips");
    $("#chip-prev").disabled = bar.scrollLeft <= 1;
    $("#chip-next").disabled = bar.scrollLeft + bar.clientWidth >= bar.scrollWidth - 1;
  }

  function chips() {
    const bar = $("#chips");
    bar.innerHTML = METRICS.map((m) => `<button type="button" data-k="${m.key}" aria-pressed="${m === state.metric}">${m.label}</button>`).join("");
    $$("#chips button").forEach((b) => b.addEventListener("click", () => setMetric(METRICS.find((m) => m.key === b.dataset.k), false)));
    const page = (d) => bar.scrollBy({ left: d * bar.clientWidth * 0.8, behavior: reduceMotion ? "auto" : "smooth" });
    $("#chip-prev").addEventListener("click", () => page(-1));
    $("#chip-next").addEventListener("click", () => page(1));
    bar.addEventListener("scroll", syncChipNav, { passive: true });
    new ResizeObserver(syncChipNav).observe(bar);
    // 키보드 ← →: 선택하지 않고 이웃 버튼으로 포커스만 옮긴다 (Enter·Space로 선택)
    bar.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
      const btns = $$("#chips button");
      const i = btns.indexOf(document.activeElement);
      if (i < 0) return;
      e.preventDefault();
      const next = btns[Math.min(btns.length - 1, Math.max(0, i + (e.key === "ArrowLeft" ? -1 : 1)))];
      next.focus();
      next.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
    $("#chip-count").textContent = `1 / ${METRICS.length}`;
    syncChipNav();
  }

  const FIT = window.matchMedia("(min-width: 1281px) and (min-height: 720px)");

  function drawMap() {
    const wrap = $("#map-wrap");
    const w = wrap.clientWidth;
    // 한 화면 모드에서는 남는 높이를 모두 쓰고, 아니면 너비에 맞춰 높이를 정한다
    const h = FIT.matches ? Math.max(240, wrap.clientHeight) : Math.round(Math.max(380, Math.min(700, w * 0.92)));
    size = { w, h };
    const pad = 12;
    const bw = BOUNDS.x1 - BOUNDS.x0;
    const bh = BOUNDS.y1 - BOUNDS.y0;
    const s = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
    const ox = (w - bw * s) / 2;
    const oy = (h - bh * s) / 2;
    const project = (lon, lat) => [ox + (lon * K - BOUNDS.x0) * s, oy + (BOUNDS.y1 - lat) * s];
    path = d3.geoPath(d3.geoTransform({ point(lon, lat) { this.stream.point(...project(lon, lat)); } }));
    mapSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", FIT.matches ? null : h);
    anchor.clear();
    [...sidoFeatures, ...unitFeatures].forEach((f) => anchor.set(f.properties.key, labelPoint(f)));
    // 서울을 둘러싼 경기도는 중심점이 서울 안에 찍히므로 이름 위치를 직접 정한다 (경도, 위도)
    Object.entries(LABEL_AT).forEach(([k, ll]) => anchor.set(k, project(...ll)));

    const world = mapSvg.selectAll("g.world").data([0]).join("g").attr("class", "world");
    world.selectAll("g.sidos").data([0]).join("g").attr("class", "sidos")
      .selectAll("path").data(sidoFeatures, (d) => d.properties.key).join("path")
      .attr("class", "region sido").attr("d", path)
      .attr("tabindex", 0).attr("role", "button")
      .on("mousemove", (e, d) => showTip(e, d.properties.key))
      .on("mouseleave", hideTip)
      .on("click", (e, d) => onRegionClick(d.properties.key))
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRegionClick(d.properties.key); } });
    world.selectAll("g.units").data([0]).join("g").attr("class", "units")
      .selectAll("path").data(unitFeatures, (d) => d.properties.key).join("path")
      .attr("class", "region unit hidden").attr("d", path)
      .attr("tabindex", 0).attr("role", "button")
      .on("mousemove", (e, d) => showTip(e, d.properties.key))
      .on("mouseleave", hideTip)
      .on("click", (e, d) => onRegionClick(d.properties.key))
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRegionClick(d.properties.key); } });
    world.selectAll("path.mesh-unit").data([unitMesh]).join("path").attr("class", "mesh-unit").attr("d", path);
    world.selectAll("path.mesh-sido").data([sidoMesh]).join("path").attr("class", "mesh-sido").attr("d", path);
    mapSvg.selectAll("g.labels").data([0]).join("g").attr("class", "labels");
    applyView(false);
  }

  function onRegionClick(k) {
    const cur = state.key;
    if (level(k) === 1) {
      // 시도 도형: 전국 화면에서는 그 시도로, 시도 화면에서는 다른 시도로 이동
      select(k === sidoOf(cur) && level(cur) === 1 ? NATION : k);
    } else {
      select(k === cur ? sidoOf(k) : k);
    }
  }

  // 현재 선택에 맞춰 확대 범위를 정한다: 전국 → 전체, 시도·시군 → 그 시도
  function targetView() {
    const s = sidoOf(state.key);
    if (!s) return { k: 1, x: 0, y: 0 };
    const f = sidoFeatures.find((d) => d.properties.key === s);
    const [[x0, y0], [x1, y1]] = path.bounds(f);
    const pad = 28;
    const k = Math.min(14, (size.w - pad * 2) / (x1 - x0), (size.h - pad * 2) / (y1 - y0));
    return { k, x: size.w / 2 - ((x0 + x1) / 2) * k, y: size.h / 2 - ((y0 + y1) / 2) * k };
  }

  function applyView(animate = true) {
    view = targetView();
    const tr = `translate(${view.x},${view.y}) scale(${view.k})`;
    const world = mapSvg.select("g.world");
    if (animate && !reduceMotion) world.transition().duration(750).ease(d3.easeCubicInOut).attr("transform", tr);
    else world.attr("transform", tr);
    paintMap();
    drawLabels(animate);
  }

  let color = null;

  function paintMap() {
    const m = state.metric;
    const s = sidoOf(state.key);
    const peers = s ? UNITS_BY_SIDO[s] : SIDO_CODES;
    const vals = peers.map(m.get).filter((v) => v != null);
    const single = new Set(vals).size < 2;
    color = !vals.length ? () => EMPTY : single ? () => RAMP.at(-1) : d3.scaleQuantile().domain(vals).range(RAMP);
    const fillOf = (k) => { const v = m.get(k); return v == null ? EMPTY : color(v); };

    mapSvg.selectAll("path.sido")
      .classed("context", (d) => !!s && d.properties.key !== s)
      .classed("hidden", (d) => d.properties.key === s)
      .attr("fill", (d) => (s ? null : fillOf(d.properties.key)))
      .attr("aria-label", (d) => `${label(d.properties.key)} ${m.label} ${withUnit(m, m.get(d.properties.key))}`);
    mapSvg.selectAll("path.unit")
      .classed("hidden", (d) => d.properties.sido !== s)
      .classed("sel", (d) => d.properties.key === state.key)
      .attr("fill", (d) => (d.properties.sido === s ? fillOf(d.properties.key) : null))
      .attr("aria-label", (d) => `${label(d.properties.key)} ${m.label} ${withUnit(m, m.get(d.properties.key))}`);
    mapSvg.select("path.mesh-unit").attr("opacity", s ? 1 : 0);
    mapSvg.classed("dimmed", level(state.key) === 2);
    mapSvg.selectAll("path.unit.sel").raise();
    $("#map").setAttribute("aria-label", `${s ? T.sidos[s].name : "전국"} ${m.label} 지도`);

    const edges = vals.length && !single ? [d3.min(vals), ...color.quantiles(), d3.max(vals)] : [];
    const rows = !vals.length ? ""
      : single ? `<span class="row"><span class="sw" style="background:${RAMP.at(-1)}"></span>${m.fmt(vals[0])}</span>`
      : RAMP.map((c, i) => `<span class="row"><span class="sw" style="background:${c}"></span>${m.fmt(edges[i])}–${m.fmt(edges[i + 1])}</span>`).join("");
    $("#legend").innerHTML = `<span class="title">${m.label} <span style="color:var(--faint);font-weight:400">${m.year}</span></span>` + rows +
      (vals.length < peers.length ? `<span class="row"><span class="sw" style="background:${EMPTY};outline:1px solid #3a3f48"></span>자료 없음</span>` : "");
  }

  function drawLabels(animate) {
    const s = sidoOf(state.key);
    const keys = s ? UNITS_BY_SIDO[s] : SIDO_CODES;
    const pos = (k) => { const [x, y] = anchor.get(k) || [NaN, NaN]; return [x * view.k + view.x, y * view.k + view.y]; };
    // 화면에서 너무 작은 지역은 이름을 생략한다 (선택한 지역은 항상 표시)
    const small = (k) => {
      if (k === state.key) return false;
      const f = (s ? unitFeatures : sidoFeatures).find((d) => d.properties.key === k);
      return path.area(f) * view.k * view.k < (s ? 260 : 120);
    };
    const name = (k) => (level(k) === 1 ? T.sidos[k].short : (label(k).endsWith("시부") ? "시부" : label(k).replace(/(시|군|구)$/, "")));
    const inView = (k) => { const [x, y] = pos(k); return x > 20 && x < size.w - 20 && y > 16 && y < size.h - 10; };
    // 시도 화면에서는 화면 안에 들어오는 주변 시도 이름을 흐리게 함께 보여준다
    const ctx = s ? SIDO_CODES.filter((c) => c !== s && inView(c)) : [];
    const data = [...keys.filter((k) => !small(k) && Number.isFinite(pos(k)[0])), ...ctx];
    const g = mapSvg.select("g.labels");
    const sel = g.selectAll("text").data(data, (k) => k).join("text")
      .attr("class", (k) => `region-label${level(k) === 1 ? " sido-label" : ""}${s && level(k) === 1 ? " ctx" : ""}${k === state.key ? " sel" : ""}`)
      .attr("x", (k) => pos(k)[0])
      .attr("y", (k) => pos(k)[1] + 4)
      .text(name);
    if (animate && !reduceMotion) sel.style("opacity", 0).transition().delay(550).duration(300).style("opacity", 1);
    else sel.style("opacity", 1);
  }

  function showTip(e, k) {
    const m = state.metric;
    const v = m.get(k);
    const list = peersOf(k).map((r) => [r, m.get(r)]).filter(([, x]) => x != null).sort((a, b) => b[1] - a[1]);
    const i = list.findIndex(([r]) => r === k);
    tip.innerHTML = `<b>${label(k)}</b><span>${m.label}</span> ${withUnit(m, v)}<span>${i < 0 ? "" : ` · ${i + 1}위`}</span>`;
    const box = $("#map-wrap").getBoundingClientRect();
    tip.style.left = `${e.clientX - box.left}px`;
    tip.style.top = `${e.clientY - box.top}px`;
    tip.hidden = false;
  }

  const hideTip = () => { tip.hidden = true; };

  // 순위 범위: local = 시도 안(전국 화면에서는 시도별), nation = 전국 168개 시군
  function renderRank() {
    const m = state.metric;
    const s = sidoOf(state.key);
    const sorted = (keys) => keys.map((r) => [r, m.get(r)]).filter(([, v]) => v != null).sort((a, b) => b[1] - a[1]);
    const nationList = sorted(Object.values(UNITS_BY_SIDO).flat());
    const nationRank = new Map(nationList.map(([r], i) => [r, i + 1]));
    const nation = state.rankScope === "nation";
    const list = nation ? nationList : sorted(s ? UNITS_BY_SIDO[s] : SIDO_CODES);
    const max = Math.max(...list.map(([, v]) => v), 0) || 1;
    const top = list.slice(0, 10);
    const selIdx = list.findIndex(([r]) => r === state.key);
    const name = (r) => (nation ? `${T.sidos[sidoOf(r)].short} ${label(r)}` : shortLabel(r));
    // 도내 순위에서는 시군마다 전국 순위를 작게 함께 보여준다
    const tag = (r) => (!nation && level(r) === 2 && nationRank.has(r) ? `<span class="nat">전국 ${nationRank.get(r)}위</span>` : "<span></span>");
    const row = ([r, v], i) => `
      <button type="button" class="rank-row${nation ? " wide" : ""}${i < 3 ? " top" : ""}${nation && s && sidoOf(r) === s ? " mine" : ""}${r === state.key ? " sel" : ""}" data-r="${r}">
        <span class="no">${i + 1}</span><span class="nm">${name(r)}</span>
        <span class="track"><span class="fill" style="width:${Math.max(0, (v / max) * 100)}%"></span></span>
        <span class="val">${m.fmt(v)}</span>${tag(r)}
      </button>`;
    const extra = selIdx >= 10 ? `<div class="rank-title" style="margin:6px 0 0"><span>선택한 지역</span></div>${row(list[selIdx], selIdx)}` : "";
    const scope = nation ? "시군 (전국)" : s ? `${T.sidos[s].short} 시군` : "시도";
    const labels = s ? ["도내", "전국"] : ["시도", "시군"];
    const seg = `<span class="seg" role="group" aria-label="순위 기준">${["local", "nation"].map((v, i) =>
      `<button type="button" data-scope="${v}" aria-pressed="${(state.rankScope || "local") === v}">${labels[i]}</button>`).join("")}</span>`;
    $("#rank").innerHTML = list.length ? `
      <div class="rank-title"><span><b>${m.label}</b> 상위 ${scope}</span><span class="rank-meta">${m.year} · ${list.length}곳 ${seg}</span></div>
      <div>${top.slice(0, 5).map((d, i) => row(d, i)).join("")}</div>
      <div>${top.slice(5).map((d, i) => row(d, i + 5)).join("")}</div>${extra}` : "";
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => onRegionClick(b.dataset.r)));
    $$("#rank .seg button").forEach((b) => b.addEventListener("click", () => { state.rankScope = b.dataset.scope; renderRank(); }));
  }

  // ---------- 제목 ----------
  const ICONS = {
    box: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>',
    truck: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 6h11v9H2z"/><path d="M13 9h4l3 3v3h-7z"/><circle cx="6" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/></svg>',
    route: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="5" cy="18" r="2"/><circle cx="19" cy="6" r="2"/><path d="M7 18h6a3 3 0 0 0 0-6h-2a3 3 0 0 1 0-6h6"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/></svg>',
  };

  // 특화 품목이 없는 전국 화면에서는 1위 품목을 보여준다
  function topCrop(k) {
    const c = V[k]?.crops?.[0];
    const total = container(k);
    return c && total ? `1위 품목 <b>${c[0]}</b> · 컨테이너의 ${pct((c[1].at(-1) / total) * 100)}` : "품목 정보 없음";
  }

  function renderHero() {
    const k = state.key;
    $("#title-region").textContent = label(k);
    const trail = [];
    for (let p = parentOf(k); p; p = parentOf(p)) trail.unshift(label(p));
    $("#crumb").textContent = trail.length ? `${trail.join(" › ")} ›` : "";
    if (!has(k)) {
      $("#facts").innerHTML = `<li>${ICONS.box}<span>${PERIOD} 물류기기 공동이용 실적이 없습니다.</span></li>`;
      return;
    }
    const sp = V[k].spec;
    $("#facts").innerHTML = [
      `<li>${ICONS.box}<span>컨테이너 <b>${compact(container(k))}</b>개 <span class="delta">${deltaHTML(container(k), container(k, -2), "")}</span></span></li>`,
      `<li>${ICONS.truck}<span>이동 <b>${int(moves(k))}</b>건 · 파렛트 <b>${compact(pallet(k))}</b>개</span></li>`,
      `<li>${ICONS.route}<span>수도권 출하 <b>${pct(field("metro")(k))}</b> (${PREV}년 ${pct(field("metro", -2)(k))})</span></li>`,
      `<li class="accent">${ICONS.star}<span>${sp ? `특화 품목 <b>${sp[0]}</b> · 전국 대비 ${times(sp[1])}` : topCrop(k)}</span></li>`,
    ].join("");
  }

  // 비중 막대 한 줄: 이름 · 막대 · 비중 · 전년 동기 대비 증감(%p)
  function shareRows(items, max = 100) {
    return items.map(([name, cur, prev, extra = ""]) => {
      const d = cur != null && prev != null ? cur - prev : null;
      const cls = d == null ? "" : d > 0 ? "up" : d < 0 ? "down" : "";
      const txt = d == null ? "–" : `${d > 0 ? "▲" : d < 0 ? "▼" : ""}${nf1.format(Math.abs(d))}%p`;
      return `
        <div class="bar-row share-row" title="${name} · ${CUR}년 ${pct(cur)} · ${PREV}년 ${pct(prev)}${extra}"><span class="name">${name}</span>
          <span class="track"><span class="fill" style="width:${Math.max(0, Math.min(100, ((cur || 0) / max) * 100))}%"></span></span>
          <span class="val">${pct(cur)}</span><span class="chg ${cls}">${txt}</span></div>`;
    }).join("");
  }

  // ---------- 왼쪽 패널 ----------
  function renderScale() {
    const k = state.key;
    setYear("p-scale", PERIOD);
    setV("container", container(k));
    setV("pallet", pallet(k));
    setV("moves", moves(k));
    setD("container", deltaHTML(container(k), container(k, -2), ""));
    setD("pallet", deltaHTML(pallet(k), pallet(k, -2), ""));
    setD("moves", deltaHTML(moves(k), moves(k, -2), "전년 동기"));
    setRank("container", rankText(k, (x) => container(x)));
    barChart("#chart-annual", Y, V[k]?.qty?.["컨테이너"], compact, "컨테이너 이용량");
  }

  function renderMonth() {
    const k = state.key;
    setYear("p-month", `${Y[0]}~${CUR}년`);
    const shades = Y.map((y, i) => (i === Y.length - 1 ? "#f5a524" : i === Y.length - 2 ? "#9aa1ad" : "#4f5560"));
    $("#month-legend").innerHTML = Y.map((y, i) => `<span><i style="background:${shades[i]}"></i>${y}</span>`).reverse().join("");
    monthChart("#chart-month", V[k]?.mon, shades);
    const cur = V[k]?.mon?.at(-1);
    if (!cur) { setNote("month", "자료가 없습니다."); return; }
    const peak = cur.indexOf(Math.max(...cur));
    setNote("month", `${CUR}년 성수기 ${D.months[peak]}월 (${compact(cur[peak])}개) · 컨테이너 기준`);
  }

  function renderShip() {
    const k = state.key;
    setYear("p-ship", PERIOD);
    const cur = V[k]?.ship?.at(-1) || {};
    const prev = V[k]?.ship?.at(-2) || null;
    const items = Object.entries(cur).sort((a, b) => b[1] - a[1]).slice(0, 5)
      .map(([n, v]) => [n, v, prev ? prev[n] ?? 0 : null]);
    $("#bars-ship").innerHTML = items.length ? shareRows(items) : '<p class="note">자료가 없습니다.</p>';
  }

  // ---------- 오른쪽 패널 ----------
  function renderCrop() {
    const k = state.key;
    setYear("p-crop", PERIOD);
    const sp = V[k]?.spec;
    $("#spec-badge").textContent = sp ? `특화 품목 ${sp[0]} · 전국 대비 ${times(sp[1])}` : "";
    const total = container(k) || 0;
    const crops = (V[k]?.crops || []).slice(0, FIT.matches && window.innerHeight <= 800 ? 5 : 8);
    const maxShare = Math.max(...crops.map((c) => c[1].at(-1) / (total || 1) * 100), 1);
    $("#bars-crop").innerHTML = crops.length ? crops.map(([name, s, lq]) => {
      const cur = s.at(-1), prev = s.at(-2);
      const sh = total ? (cur / total) * 100 : null;
      const r = change(cur, prev);
      const cls = r == null ? "" : r > 0 ? "up" : r < 0 ? "down" : "";
      const txt = r == null ? (prev === 0 ? "신규" : "–") : `${r > 0 ? "▲" : r < 0 ? "▼" : ""}${nf0.format(Math.abs(r))}%`;
      return `
        <div class="bar-row share-row" title="${name} · ${s.map((x, i) => `${Y[i]}년 ${x == null ? "–" : `${int(x)}개`}`).join(" · ")}${lq ? ` · 특화도 ${times(lq)}` : ""}"><span class="name">${name}</span>
          <span class="track"><span class="fill" style="width:${((sh || 0) / maxShare) * 100}%"></span></span>
          <span class="val">${pct(sh)}</span><span class="chg ${cls}">${txt}</span></div>`;
    }).join("") : '<p class="note">자료가 없습니다.</p>';
  }

  function renderDest() {
    const k = state.key;
    const p = parentOf(k);
    setYear("p-dest", PERIOD);
    const m = field("metro")(k), pm = p ? field("metro")(p) : null;
    const s = field("same")(k), ps = p && p !== NATION ? field("same")(p) : null;
    countTo($('[data-v="metro"]'), m, pct);
    countTo($('[data-v="same"]'), s, pct);
    meter("metro", m, pm);
    meter("same", s, ps);
    setNote("dest", p ? `흰 선은 ${label(p)} · 서울·인천·경기 도착 / 같은 시도 안 도착` : "서울·인천·경기 도착 / 같은 시도 안 도착 (시도별로 보기)");
    const cur = V[k]?.dest?.at(-1) || {};
    const prev = V[k]?.dest?.at(-2) || null;
    const items = Object.entries(cur).sort((a, b) => b[1] - a[1]).slice(0, 4).map(([n, v]) => [n, v, prev ? prev[n] ?? 0 : null]);
    $("#bars-dest").innerHTML = items.length ? shareRows(items) : '<p class="note">자료가 없습니다.</p>';
    const top = V[k]?.dsido || [];
    $("#dest-top").innerHTML = top.length
      ? `<span>도착 시도</span>${top.map(([c, v]) => `<b>${T.sidos[c]?.short || "미상"}</b> ${pct(v)}`).join(" · ")}`
      : "";
  }

  function renderEquip() {
    const k = state.key;
    setYear("p-equip", PERIOD);
    const q = V[k]?.qty || {};
    const items = Object.entries(q).filter(([, s]) => s.at(-1) > 0).sort((a, b) => b[1].at(-1) - a[1].at(-1));
    $("#bars-equip").innerHTML = items.length ? items.map(([name, s]) => {
      const r = change(s.at(-1), s.at(-2));
      const cls = r == null ? "" : r > 0 ? "up" : r < 0 ? "down" : "";
      const txt = r == null ? "–" : `${r > 0 ? "▲" : r < 0 ? "▼" : ""}${nf1.format(Math.abs(r))}%`;
      return `
        <div class="bar-row equip-row" title="${name} · ${s.map((x, i) => `${Y[i]}년 ${x == null ? "–" : `${int(x)}개`}`).join(" · ")}"><span class="name">${name}</span>
          <span class="mini">${miniBars(s)}</span>
          <span class="val">${compact(s.at(-1))}</span><span class="chg ${cls}">${txt}</span></div>`;
    }).join("") : '<p class="note">자료가 없습니다.</p>';
  }

  // 3개년 작은 막대 (항목마다 자기 축, 0부터)
  function miniBars(s) {
    const max = Math.max(...s.map((x) => x || 0)) || 1;
    const bw = 10, gap = 4, h = 16;
    return `<svg viewBox="0 0 ${s.length * (bw + gap) - gap} ${h}" width="${s.length * (bw + gap) - gap}" height="${h}" aria-hidden="true">${s.map((x, i) => {
      const bh = x ? Math.max(1, (x / max) * h) : 0;
      return `<rect x="${i * (bw + gap)}" y="${h - bh}" width="${bw}" height="${bh}" rx="1" fill="${i === s.length - 1 ? "#f5a524" : i === s.length - 2 ? "#6b717c" : "#4a505b"}"/>`;
    }).join("")}</svg>`;
  }

  function meter(key, value, mark, max = 100) {
    const fill = $(`[data-meter="${key}"]`);
    const m = $(`[data-mark="${key}"]`);
    fill.style.width = value == null ? "0" : `${Math.min(100, (value / max) * 100)}%`;
    if (mark == null) { m.classList.remove("on"); return; }
    m.classList.add("on");
    m.style.left = `calc(${Math.min(100, (mark / max) * 100)}% - 1px)`;
  }

  // 월별 추이: 해마다 한 줄 (최신 연도 강조), 세로 범위는 자료의 최소~최대
  function monthChart(sel, series, shades) {
    const el = $(sel);
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`).attr("role", "img");
    const lines = (series || []).map((s, i) => ({ s, i })).filter((d) => d.s);
    if (!lines.length) { svg.selectAll("*").remove(); svg.attr("aria-label", "자료 없음"); return; }
    svg.attr("aria-label", lines.map((d) => `${Y[d.i]}년 ${d.s.map((v, m) => `${D.months[m]}월 ${int(v)}`).join(", ")}`).join("; "));
    const m = { t: 14, r: 12, b: 15, l: 12 };
    const x = d3.scalePoint().domain(D.months).range([m.l, w - m.r]);
    const all = lines.flatMap((d) => d.s);
    const lo = d3.min(all), hi = d3.max(all), pad = (hi - lo) * 0.12 || hi * 0.05 || 1;
    const y = d3.scaleLinear().domain([Math.max(0, lo - pad), hi + pad]).range([h - m.b, m.t]);
    const line = d3.line().x((v, i) => x(D.months[i])).y((v) => y(v)).curve(d3.curveMonotoneX);
    svg.selectAll("path.yr").data(lines, (d) => d.i).join("path").attr("class", "yr")
      .attr("fill", "none").attr("stroke", (d) => shades[d.i]).attr("stroke-width", (d) => (d.i === Y.length - 1 ? 2.2 : 1.3))
      .attr("d", (d) => line(d.s));
    const cur = lines.find((d) => d.i === Y.length - 1);
    svg.selectAll("circle.pt").data(cur ? cur.s : []).join("circle").attr("class", "pt")
      .attr("r", 2.4).attr("fill", "#f5a524").attr("cx", (v, i) => x(D.months[i])).attr("cy", (v) => y(v));
    svg.selectAll("g.axis").data([0]).join("g").attr("class", "axis")
      .selectAll("text").data(D.months.filter((mo, i) => i % 2 === 0)).join("text")
      .attr("x", (mo) => x(mo)).attr("y", h - 3).attr("text-anchor", "middle").text((mo) => `${mo}월`);
  }

  // ---------- 흐르는 증감 띠 ----------
  function tickerItem(text, arr) {
    const { value, prev } = lastOf(arr);
    const r = change(value, prev);
    if (r == null) return "";
    const cls = r > 0 ? "up" : r < 0 ? "down" : "";
    const arrow = r > 0 ? "▲" : r < 0 ? "▼" : "–";
    return `<span class="tk">${text} <b class="${cls}">${arrow} ${nf1.format(Math.abs(r))}%</b></span>`;
  }

  function renderTicker() {
    const k = state.key;
    const head = [
      `<span class="tk tk-region">${label(k)}</span>`,
      tickerItem("컨테이너", V[k]?.qty?.["컨테이너"]),
      tickerItem("파렛트", V[k]?.qty?.["파렛트"]),
      tickerItem("이동 건수", V[k]?.n),
    ];
    const others = (level(k) === 2 ? peersOf(k) : childrenOf(k)).filter((x) => x !== k && has(x)).flatMap((x) => [
      `<span class="tk"><b style="color:var(--text)">${shortLabel(x)}</b></span>`,
      tickerItem("컨테이너", V[x].qty["컨테이너"]),
    ]);
    const html = [...head, ...others].join("");
    const track = $("#ticker");
    track.innerHTML = `${html}<span aria-hidden="true" style="display:contents">${html}</span>`;
    requestAnimationFrame(() => track.style.setProperty("--ticker-dur", `${Math.max(20, Math.round(track.scrollWidth / 2 / 50))}s`));
  }

  // ---------- 출처 ----------
  const SOURCES = { logi: D.source };
  function sources() {
    $$("[data-src]").forEach((el) => {
      const s = SOURCES[el.dataset.src];
      el.textContent = s ? `출처: ${s}` : "";
      const panel = el.closest(".panel");
      const head = panel?.querySelector(".panel-head");
      if (!s || !head || head.querySelector(".src-btn")) return;
      const right = document.createElement("div");
      right.className = "head-right";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "src-btn";
      btn.textContent = "출처";
      btn.title = s;
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", () => {
        const open = panel.classList.toggle("show-src");
        btn.setAttribute("aria-expanded", open);
      });
      const chip = head.querySelector(".chip");
      right.append(btn);
      if (chip) right.append(chip);
      head.append(right);
    });
    $("#updated").textContent = `집계 ${Y[0]}~${CUR}년 (해마다 1~11월)`;
  }

  // ---------- 전체 갱신 ----------
  let lastSido = undefined;
  function render() {
    renderTicker();
    renderHero();
    renderScale();
    renderMonth();
    renderShip();
    renderCrop();
    renderDest();
    renderEquip();
    const s = sidoOf(state.key);
    if (s !== lastSido) { applyView(lastSido !== undefined); lastSido = s; }
    else { paintMap(); drawLabels(false); }
    renderRank();
  }

  chips();
  sources();
  drawMap();
  select(fromHash());
  // ?m=metro 처럼 지표를, ?rank=nation 으로 전국 기준 순위를 지정해 열 수 있다
  if (new URLSearchParams(location.search).get("rank") === "nation") { state.rankScope = "nation"; renderRank(); }
  const initial = METRICS.find((m) => m.key === new URLSearchParams(location.search).get("m"));
  if (initial) setMetric(initial);
  window.addEventListener("hashchange", () => { const k = fromHash(); if (k !== state.key) select(k); });

  // 지도 영역 크기가 바뀌면 지도와 카드를 다시 그린다
  let resizeT;
  let lastSize = "";
  new ResizeObserver(() => {
    const wrap = $("#map-wrap");
    const sizeKey = `${wrap.clientWidth}x${FIT.matches ? wrap.clientHeight : 0}`;
    if (sizeKey === lastSize) return;
    lastSize = sizeKey;
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { drawMap(); render(); }, 120);
  }).observe($("#map-wrap"));

  // 작은 차트는 자기 크기가 잡히거나 바뀔 때 다시 그린다
  const chartSizes = new Map();
  const chartRO = new ResizeObserver((entries) => {
    const changed = entries.some((e) => {
      const key = `${Math.round(e.contentRect.width)}x${Math.round(e.contentRect.height)}`;
      if (chartSizes.get(e.target) === key) return false;
      chartSizes.set(e.target, key);
      return true;
    });
    if (!changed) return;
    renderScale();
    renderMonth();
  });
  ["#chart-annual", "#chart-month"].forEach((s) => chartRO.observe($(s)));
  FIT.addEventListener("change", () => { lastSize = ""; drawMap(); render(); });
})();
