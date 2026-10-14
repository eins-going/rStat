(() => {
  const D = window.AGRI_DATA;
  const G = window.AGRI_GEO;
  const SIDO = D.sido;
  const SGG = D.regions.slice(1);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ---------- 숫자 ----------
  const nf0 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const int = (n) => (n == null ? "–" : nf0.format(n));
  const pct = (n) => (n == null ? "–" : `${nf1.format(n)}%`);

  // 큰 수를 만·억 단위로 줄인다 (예: 27,088,850 → 2,709만)
  function compact(n) {
    if (n == null) return "–";
    const a = Math.abs(n);
    if (a >= 1e8) return `${nf1.format(n / 1e8)}억`;
    if (a >= 1e6) return `${nf0.format(n / 1e4)}만`;
    if (a >= 1e4) return `${nf1.format(n / 1e4)}만`;
    return nf0.format(n);
  }

  // 원 단위 금액 → 조·억·만 원
  function won(w) {
    if (w == null) return "–";
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

  function deltaHTML(cur, prev, label = "전년 대비") {
    if (cur == null || prev == null || prev === 0) return "";
    const r = ((cur - prev) / prev) * 100;
    const cls = r > 0 ? "up" : r < 0 ? "down" : "";
    const arrow = r > 0 ? "▲" : r < 0 ? "▼" : "–";
    return `${label} <span class="${cls}">${arrow} ${nf1.format(Math.abs(r))}%</span>`;
  }

  // 숫자가 이전 값에서 새 값으로 올라가거나 내려가는 효과
  function countTo(el, target, format) {
    if (!el) return;
    if (target == null || reduceMotion) { el.textContent = target == null ? "–" : format(target); el._v = target; return; }
    const from = el._v ?? 0;
    el._v = target;
    const t0 = performance.now();
    const dur = 650;
    cancelAnimationFrame(el._raf);
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = format(from + (target - from) * e);
      if (k < 1) el._raf = requestAnimationFrame(step);
    };
    el._raf = requestAnimationFrame(step);
  }

  const setV = (key, value, format = int) => countTo($(`[data-v="${key}"]`), value, format);
  const setD = (key, html) => { const el = $(`[data-d="${key}"]`); if (el) el.innerHTML = html; };
  const setNote = (key, text) => { const el = $(`[data-note="${key}"]`); if (el) el.textContent = text || ""; };
  const setRank = (key, text) => { const el = $(`[data-rank="${key}"]`); if (el) el.textContent = text || ""; };
  const setYear = (panel, text) => { $(`#${panel} [data-year]`).textContent = text; };

  // 시군 사이 순위 (값이 큰 순서)
  function rankOf(region, getter) {
    if (region === SIDO) return null;
    const vals = SGG.map((r) => [r, getter(r)]).filter(([, v]) => v != null).sort((a, b) => b[1] - a[1]);
    const i = vals.findIndex(([r]) => r === region);
    return i < 0 ? null : `도내 ${i + 1}위 / ${vals.length}`;
  }

  // ---------- 지표 정의 (지도) ----------
  const grdpShare = (r) => {
    const g = D.grdp.byRegion[r];
    return g && g.total ? (g.agri / g.total) * 100 : null;
  };

  const METRICS = [
    { key: "households", label: "농가수", unit: "가구", year: `${D.farm.years.at(-1)}년`, get: (r) => lastOf(D.farm.households[r]).value, fmt: int },
    { key: "aging", label: "고령인구 비율", unit: "%", year: `${D.aging.year}년`, get: (r) => D.aging.byRegion[r]?.ratio ?? null, fmt: pct },
    { key: "land", label: "경지면적", unit: "ha", year: `${D.land.years.at(-1)}년`, get: (r) => lastOf(D.land.total[r]).value, fmt: int },
    { key: "rice", label: "쌀 생산량", unit: "톤", year: `${D.rice.year}년`, get: (r) => D.rice.byRegion[r]?.production ?? null, fmt: int },
    { key: "cattle", label: "한육우", unit: "마리", year: D.livestock.quarter, get: (r) => D.livestock.byRegion[r]?.cattle?.[1] ?? null, fmt: int },
    { key: "rural", label: "귀촌인", unit: "명", year: `${D.returning.years.at(-1)}년`, get: (r) => lastOf(D.returning.ruralPersons[r]).value, fmt: int },
    { key: "grdp", label: "농림어업 GRDP 비중", unit: "%", year: `${D.grdp.year}년`, get: grdpShare, fmt: pct },
  ];

  const state = { region: SIDO, metric: METRICS[0] };

  // ---------- 상단 선택 ----------
  const sgg = $("#sgg");
  sgg.innerHTML = [`<option value="${SIDO}">전체 (도)</option>`, ...SGG.map((r) => `<option value="${r}">${r}</option>`)].join("");
  sgg.addEventListener("change", () => select(sgg.value));
  $("#reset").addEventListener("click", () => select(SIDO));

  function select(region) {
    state.region = SGG.includes(region) ? region : SIDO;
    sgg.value = state.region;
    const hash = state.region === SIDO ? "" : `#${encodeURIComponent(state.region)}`;
    if (location.hash !== hash) history.replaceState(null, "", hash || location.pathname);
    render();
  }

  // ---------- 제목 ----------
  const ICONS = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
    field: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18c4-3 14-3 18 0"/><path d="M3 13c4-3 14-3 18 0"/><path d="M12 4v6"/><path d="M12 6c-2 0-3-1-3-2 2 0 3 1 3 2zm0 0c2 0 3-1 3-2-2 0-3 1-3 2z"/></svg>',
    rice: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V9"/><path d="M12 9c0-3 2-5 5-6 0 3-2 5-5 6z"/><path d="M12 13c0-3-2-5-5-6 0 3 2 5 5 6z"/><path d="M12 17c0-2.5 1.8-4.2 4-5 0 2.5-1.8 4.2-4 5z"/></svg>',
    people: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2c3 .2 5.5 2.6 5.5 5.8"/></svg>',
  };

  function renderHero() {
    const r = state.region;
    $("#title-region").textContent = r;
    $("#crumb").textContent = r === SIDO ? "" : `${SIDO} ›`;
    const hh = lastOf(D.farm.households[r]).value;
    const pop = lastOf(D.farm.population[r]).value;
    const li = D.land.years.length - 1;
    const land = D.land.total[r]?.[li];
    const paddy = D.land.paddy[r]?.[li];
    const rice = D.rice.byRegion[r]?.production;
    const aging = D.aging.byRegion[r]?.ratio;
    $("#facts").innerHTML = [
      `<li>${ICONS.home}<span>농가 <b>${int(hh)}</b>가구 · 농가인구 <b>${int(pop)}</b>명</span></li>`,
      `<li>${ICONS.field}<span>경지 <b>${int(land)}</b> ha · 논 비중 <b>${land ? pct((paddy / land) * 100) : "–"}</b></span></li>`,
      `<li>${ICONS.rice}<span>쌀 생산 <b>${int(rice)}</b>톤 (${D.rice.year}년)</span></li>`,
      `<li class="accent">${ICONS.people}<span>농가인구 열에 <b>${aging == null ? "–" : nf0.format(aging / 10)}</b>명은 65세 이상 (${D.aging.year}년)</span></li>`,
    ].join("");
  }

  // ---------- 왼쪽 패널 ----------
  function renderFarm() {
    const r = state.region;
    const hh = lastOf(D.farm.households[r]);
    const pop = lastOf(D.farm.population[r]);
    setYear("p-farm", `${D.farm.years[hh.i] ?? D.farm.years.at(-1)}년`);
    setV("households", hh.value);
    setV("population", pop.value);
    setD("households", deltaHTML(hh.value, hh.prev));
    setD("population", deltaHTML(pop.value, pop.prev));

    const a = D.aging.byRegion[r]?.ratio ?? null;
    const doA = D.aging.byRegion[SIDO]?.ratio;
    countTo($('[data-v="aging"]'), a, pct);
    meter("aging", a, r === SIDO ? null : doA);
    setNote("aging", r === SIDO ? `${D.aging.year} 농림어업총조사 기준` : `${D.aging.year} 농림어업총조사 · 흰 선은 전라남도 평균 ${pct(doA)}`);

    lineChart("#chart-farm", D.farm.years, D.farm.households[r], "가구");
  }

  function renderReturn() {
    const r = state.region;
    const f = lastOf(D.returning.farmHouseholds[r]);
    const p = lastOf(D.returning.ruralPersons[r]);
    setYear("p-return", `${D.returning.years.at(-1)}년`);
    setV("farmHouseholds", f.value);
    setV("ruralPersons", p.value);
    setD("farmHouseholds", deltaHTML(f.value, f.prev));
    setD("ruralPersons", deltaHTML(p.value, p.prev));
    spark("#spark-farm", D.returning.years, D.returning.farmHouseholds[r]);
    spark("#spark-rural", D.returning.years, D.returning.ruralPersons[r]);
    setNote("return", f.value == null && p.value == null
      ? "읍·면이 없는 시는 귀농·귀촌 집계 대상이 아닙니다."
      : `${D.returning.years[0]}–${D.returning.years.at(-1)}년 추이`);
  }

  function renderLand() {
    const r = state.region;
    const t = lastOf(D.land.total[r]);
    const i = t.i;
    const paddy = D.land.paddy[r]?.[i];
    const field = D.land.field[r]?.[i];
    setYear("p-land", `${D.land.years[i] ?? D.land.years.at(-1)}년`);
    setV("land", t.value);
    setD("land", deltaHTML(t.value, t.prev));
    setRank("land", rankOf(r, (x) => lastOf(D.land.total[x]).value));
    const pp = t.value ? (paddy / t.value) * 100 : 0;
    $("#split-land").innerHTML = `
      <div class="split-bar" role="img" aria-label="논 ${nf1.format(pp)}%, 밭 ${nf1.format(100 - pp)}%">
        <span style="flex-basis:${pp}%;background:var(--accent)"></span>
        <span style="flex-basis:${100 - pp}%;background:var(--field)"></span>
      </div>
      <div class="split-legend">
        <span><i class="dot" style="background:var(--accent)"></i>논 <b>${int(paddy)}</b> ha · ${nf1.format(pp)}%</span>
        <span><i class="dot" style="background:var(--field)"></i>밭 <b>${int(field)}</b> ha · ${nf1.format(100 - pp)}%</span>
      </div>`;
  }

  function renderLivestock() {
    const r = state.region;
    const L = D.livestock.byRegion[r] || {};
    setYear("p-live", D.livestock.quarter);
    const rows = [
      ["한육우", L.cattle, D.livestock.quarter],
      ["젖소", L.dairy, D.livestock.quarter],
      ["닭", L.chicken, D.livestock.quarter],
      ["돼지", L.pig, `${D.livestock.censusYear} 총조사`],
      ["오리", L.duck, `${D.livestock.censusYear} 총조사`],
    ];
    $("#live-body").innerHTML = rows.map(([name, v, basis]) => `
      <tr><td>${name}</td><td>${int(v?.[0])}</td><td>${compact(v?.[1])}</td><td>${basis.replace(/^\d{4}년 /, "")}</td></tr>`).join("");
  }

  // ---------- 오른쪽 패널 ----------
  function renderCrop() {
    const r = state.region;
    const rice = D.rice.byRegion[r] || {};
    setYear("p-crop", `${D.rice.year}년`);
    setV("rice", rice.production);
    setV("riceArea", rice.area);
    setRank("rice", rankOf(r, (x) => D.rice.byRegion[x]?.production));
    const yieldKg = rice.area ? (rice.production / rice.area) * 100 : null;
    $('[data-v="riceYield"]').textContent = yieldKg ? `10a당 ${nf0.format(yieldKg)}kg` : "";

    const crops = Object.entries(D.crops.byRegion[r] || {})
      .filter(([k, v]) => v > 0 && !/기타|화초/.test(k))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 7);
    const max = crops[0]?.[1] || 1;
    $("#bars-crop").innerHTML = crops.length
      ? crops.map(([k, v]) => `
        <div class="bar-row"><span class="name">${k}</span>
          <span class="track"><span class="fill" style="width:${(v / max) * 100}%"></span></span>
          <span class="val">${int(v)}</span></div>`).join("")
      : '<p class="note">재배면적 자료가 없습니다.</p>';
  }

  function renderGrdp() {
    const r = state.region;
    const g = D.grdp.byRegion[r] || {};
    setYear("p-grdp", `${D.grdp.year}년`);
    const mult = D.grdp.unit.includes("백만") ? 1e6 : 1;
    countTo($('[data-v="grdp"]'), g.agri == null ? null : g.agri * mult, won);
    const share = grdpShare(r);
    const doShare = grdpShare(SIDO);
    countTo($('[data-v="grdpShare"]'), share, pct);
    meter("grdp", share, r === SIDO ? null : doShare, 40);
    const rk = rankOf(r, grdpShare);
    setNote("grdp", r === SIDO
      ? `지역 총생산 ${won(g.total * mult)} 가운데 농림어업 몫 (명목)`
      : `흰 선은 전라남도 평균 ${pct(doShare)}${rk ? ` · 비중 ${rk}` : ""}`);
  }

  function renderEcon() {
    const v = D.economy.values;
    setYear("p-econ", `${D.economy.year}년`);
    const mult = D.economy.unit.includes("천") ? 1e3 : 1;
    setV("income", v.income * mult, won);
    setV("agriIncome", v.agriIncome * mult, won);
    setV("assets", v.assets * mult, won);
    setV("debt", v.debt * mult, won);
    setNote("econ", state.region === SIDO
      ? "농가 1가구 평균 · 시도 단위 통계"
      : `시군구 통계가 없어 ${SIDO} 평균을 보여줍니다.`);
  }

  function meter(key, value, mark, max = 100) {
    const fill = $(`[data-meter="${key}"]`);
    const m = $(`[data-mark="${key}"]`);
    fill.style.width = value == null ? "0" : `${Math.min(100, (value / max) * 100)}%`;
    if (mark == null) { m.classList.remove("on"); return; }
    m.classList.add("on");
    m.style.left = `calc(${Math.min(100, (mark / max) * 100)}% - 1px)`;
  }

  // ---------- 작은 차트 ----------
  function lineChart(sel, years, values, unit) {
    const el = $(sel);
    const w = el.clientWidth || 300;
    const h = el.clientHeight || 120;
    const pts = years.map((y, i) => ({ y, v: values?.[i] })).filter((d) => d.v != null);
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`);
    svg.attr("role", "img").attr("aria-label", pts.length ? `농가수 ${pts[0].y}년 ${int(pts[0].v)}${unit}에서 ${pts.at(-1).y}년 ${int(pts.at(-1).v)}${unit}` : "자료 없음");
    if (!pts.length) { svg.selectAll("*").remove(); return; }
    const m = { t: 22, r: 8, b: 20, l: 8 };
    const x = d3.scalePoint().domain(pts.map((d) => d.y)).range([m.l, w - m.r]);
    const ext = d3.extent(pts, (d) => d.v);
    const pad = (ext[1] - ext[0]) * 0.25 || ext[1] * 0.1;
    const y = d3.scaleLinear().domain([ext[0] - pad, ext[1] + pad * 0.5]).range([h - m.b, m.t]);

    let defs = svg.selectAll("defs").data([0]).join("defs");
    defs.selectAll("linearGradient").data([0]).join("linearGradient")
      .attr("id", "g-farm").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 1)
      .selectAll("stop").data([[0, 0.35], [1, 0]]).join("stop")
      .attr("offset", (d) => d[0]).attr("stop-color", "#f5a524").attr("stop-opacity", (d) => d[1]);

    const area = d3.area().x((d) => x(d.y)).y0(h - m.b).y1((d) => y(d.v)).curve(d3.curveMonotoneX);
    const line = d3.line().x((d) => x(d.y)).y((d) => y(d.v)).curve(d3.curveMonotoneX);
    const t = svg.transition().duration(reduceMotion ? 0 : 600);

    svg.selectAll("path.area").data([pts]).join("path").attr("class", "area").attr("fill", "url(#g-farm)").transition(t).attr("d", area);
    svg.selectAll("path.line").data([pts]).join("path").attr("class", "line").attr("fill", "none").attr("stroke", "#f5a524").attr("stroke-width", 2).transition(t).attr("d", line);
    const ends = [pts[0], pts.at(-1)];
    svg.selectAll("circle.end").data(ends).join("circle").attr("class", "end").attr("r", (d, i) => (i ? 4 : 3))
      .attr("fill", (d, i) => (i ? "#f5a524" : "#1d2026")).attr("stroke", "#f5a524").attr("stroke-width", 1.5)
      .transition(t).attr("cx", (d) => x(d.y)).attr("cy", (d) => y(d.v));
    svg.selectAll("text.end").data(ends).join("text").attr("class", "end")
      .attr("fill", (d, i) => (i ? "#eef0f3" : "#9aa1ad")).attr("font-size", 11.5).attr("font-weight", (d, i) => (i ? 700 : 400))
      .attr("text-anchor", (d, i) => (i ? "end" : "start"))
      .text((d) => int(d.v))
      .transition(t).attr("x", (d) => x(d.y)).attr("y", (d) => y(d.v) - 9);
    svg.selectAll("g.axis").data([0]).join("g").attr("class", "axis")
      .selectAll("text").data(ends).join("text")
      .attr("x", (d) => x(d.y)).attr("y", h - 4).attr("text-anchor", (d, i) => (i ? "end" : "start")).text((d) => `${d.y}년`);
  }

  function spark(sel, years, values) {
    const el = $(sel);
    const w = el.clientWidth || 140;
    const h = el.clientHeight || 44;
    const pts = years.map((y, i) => ({ y, v: values?.[i] ?? null }));
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`)
      .attr("role", "img").attr("aria-label", pts.filter((d) => d.v != null).map((d) => `${d.y}년 ${int(d.v)}`).join(", ") || "자료 없음");
    const x = d3.scaleBand().domain(years).range([0, w]).padding(0.28);
    const max = d3.max(pts, (d) => d.v) || 1;
    const y = d3.scaleLinear().domain([0, max]).range([h - 14, 2]);
    svg.selectAll("rect").data(pts).join("rect")
      .attr("x", (d) => x(d.y)).attr("width", x.bandwidth()).attr("rx", 2)
      .attr("fill", (d, i) => (i === pts.length - 1 ? "#f5a524" : "#3a3f48"))
      .transition().duration(reduceMotion ? 0 : 500)
      .attr("y", (d) => (d.v == null ? h - 14 : y(d.v))).attr("height", (d) => (d.v == null ? 0 : h - 14 - y(d.v)));
    svg.selectAll("text").data([years[0], years.at(-1)]).join("text")
      .attr("x", (d, i) => (i ? w : 0)).attr("y", h - 2).attr("text-anchor", (d, i) => (i ? "end" : "start"))
      .attr("fill", "#666d79").attr("font-size", 10.5).text((d) => `'${String(d).slice(2)}`);
  }

  // ---------- 지도 ----------
  const RAMP = ["#3b3428", "#5e4925", "#8a6322", "#c0841f", "#f5a524"];
  const mapSvg = d3.select("#map");
  const tip = $("#tip");
  const regionsGeo = G.features.filter((f) => !f.properties.context);
  const contextGeo = G.features.filter((f) => f.properties.context);

  // 위도 35도 부근의 경도 축소를 반영한 평면 투영 (폴리곤 방향과 무관하게 동작)
  const K = Math.cos((34.9 * Math.PI) / 180);
  const bounds = (() => {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    const walk = (c) => {
      if (typeof c[0] === "number") {
        x0 = Math.min(x0, c[0] * K); x1 = Math.max(x1, c[0] * K);
        y0 = Math.min(y0, c[1]); y1 = Math.max(y1, c[1]);
      } else c.forEach(walk);
    };
    regionsGeo.forEach((f) => walk(f.geometry.coordinates));
    return { x0, x1, y0, y1 };
  })();

  let path = null;

  function chips() {
    $("#chips").innerHTML = METRICS.map((m) => `<button type="button" data-k="${m.key}" aria-pressed="${m === state.metric}">${m.label}</button>`).join("");
    $$("#chips button").forEach((b) => b.addEventListener("click", () => {
      state.metric = METRICS.find((m) => m.key === b.dataset.k);
      $$("#chips button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      paintMap();
      renderRank();
    }));
  }

  function drawMap() {
    const wrap = $("#map-wrap");
    const w = wrap.clientWidth;
    const pad = 16;
    const bw = bounds.x1 - bounds.x0;
    const bh = bounds.y1 - bounds.y0;
    // 지도 모양에 맞춰 높이를 정해 위아래 빈 공간을 줄인다
    const h = Math.round(Math.max(340, Math.min(660, ((w - pad * 2) * bh) / bw + pad * 2)));
    const s = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
    const ox = (w - bw * s) / 2;
    const oy = (h - bh * s) / 2;
    const proj = d3.geoTransform({
      point(lon, lat) { this.stream.point(ox + (lon * K - bounds.x0) * s, oy + (bounds.y1 - lat) * s); },
    });
    path = d3.geoPath(proj);
    mapSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", h);

    mapSvg.selectAll("g.ctx").data([0]).join("g").attr("class", "ctx")
      .selectAll("path").data(contextGeo).join("path").attr("class", "context").attr("d", path);
    const gc = d3.geoPath(proj).centroid({ type: "FeatureCollection", features: contextGeo });
    const cc = contextGeo.map((f) => path.centroid(f));
    const cx = d3.mean(cc, (c) => c[0]);
    const cy = d3.mean(cc, (c) => c[1]);
    mapSvg.selectAll("text.context-label").data(contextGeo.length ? [0] : []).join("text")
      .attr("class", "context-label").attr("x", isFinite(gc[0]) ? gc[0] : cx).attr("y", (isFinite(gc[1]) ? gc[1] : cy) + 4).text("광주광역시");

    const g = mapSvg.selectAll("g.regions").data([0]).join("g").attr("class", "regions");
    g.selectAll("path").data(regionsGeo, (d) => d.properties.name).join("path")
      .attr("class", "region")
      .attr("d", path)
      .attr("stroke", "#14161b").attr("stroke-width", 0.8)
      .attr("tabindex", 0)
      .attr("role", "button")
      .on("mousemove", (e, d) => showTip(e, d))
      .on("mouseleave", () => { tip.hidden = true; })
      .on("click", (e, d) => select(state.region === d.properties.name ? SIDO : d.properties.name))
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(state.region === d.properties.name ? SIDO : d.properties.name); } });

    // 목포처럼 작은 시는 이름을 살짝 옮겨 겹침을 줄인다
    const nudge = { 목포시: [-14, -6], 무안군: [6, -4], 신안군: [-10, 10], 광양시: [6, 4], 여수시: [-4, 14] };
    mapSvg.selectAll("g.labels").data([0]).join("g").attr("class", "labels")
      .selectAll("text").data(regionsGeo, (d) => d.properties.name).join("text")
      .attr("class", "region-label")
      .attr("x", (d) => path.centroid(d)[0] + (nudge[d.properties.name]?.[0] || 0))
      .attr("y", (d) => path.centroid(d)[1] + 4 + (nudge[d.properties.name]?.[1] || 0))
      .text((d) => d.properties.name.replace(/(시|군)$/, ""));

    paintMap();
  }

  let color = null;

  function paintMap() {
    const m = state.metric;
    const vals = SGG.map(m.get).filter((v) => v != null);
    color = d3.scaleQuantile().domain(vals).range(RAMP);
    mapSvg.selectAll("path.region")
      .attr("fill", (d) => { const v = m.get(d.properties.name); return v == null ? "#2a2d33" : color(v); })
      .attr("aria-label", (d) => `${d.properties.name} ${m.label} ${m.fmt(m.get(d.properties.name))}${m.unit === "%" ? "" : m.unit}`);
    const sel = state.region;
    mapSvg.classed("dimmed", sel !== SIDO);
    mapSvg.selectAll("path.region").classed("sel", (d) => d.properties.name === sel);
    mapSvg.selectAll("text.region-label").classed("sel", (d) => d.properties.name === sel);
    mapSvg.selectAll("path.region.sel").raise();
    $("#reset").hidden = sel === SIDO;

    const q = color.quantiles();
    const edges = [d3.min(vals), ...q, d3.max(vals)];
    $("#legend").innerHTML = `<div class="title">${m.label} <span style="color:var(--faint);font-weight:400">${m.year}</span></div>` +
      RAMP.map((c, i) => `<div class="row"><span class="sw" style="background:${c}"></span>${m.fmt(edges[i])} – ${m.fmt(edges[i + 1])}</div>`).reverse().join("") +
      (vals.length < SGG.length ? '<div class="row"><span class="sw" style="background:#2a2d33;outline:1px solid #3a3f48"></span>자료 없음</div>' : "");
  }

  function showTip(e, d) {
    const m = state.metric;
    const name = d.properties.name;
    const v = m.get(name);
    const rk = (() => {
      const list = SGG.map((r) => [r, m.get(r)]).filter(([, x]) => x != null).sort((a, b) => b[1] - a[1]);
      const i = list.findIndex(([r]) => r === name);
      return i < 0 ? "" : ` · ${i + 1}위`;
    })();
    tip.innerHTML = `<b>${name}</b><span>${m.label}</span> ${m.fmt(v)}${m.unit === "%" ? "" : ` ${m.unit}`}<span>${rk}</span>`;
    const box = $("#map-wrap").getBoundingClientRect();
    tip.style.left = `${e.clientX - box.left}px`;
    tip.style.top = `${e.clientY - box.top}px`;
    tip.hidden = false;
  }

  function renderRank() {
    const m = state.metric;
    const list = SGG.map((r) => [r, m.get(r)]).filter(([, v]) => v != null).sort((a, b) => b[1] - a[1]);
    const max = list[0]?.[1] || 1;
    const top = list.slice(0, 10);
    const selIdx = list.findIndex(([r]) => r === state.region);
    const row = ([r, v], i) => `
      <button type="button" class="rank-row${i < 3 ? " top" : ""}${r === state.region ? " sel" : ""}" data-r="${r}">
        <span class="no">${i + 1}</span><span>${r}</span>
        <span class="track"><span class="fill" style="width:${(v / max) * 100}%"></span></span>
        <span class="val">${m.fmt(v)}</span>
      </button>`;
    const extra = selIdx >= 10 ? `<div class="rank-title" style="margin:6px 0 0"><span>선택한 지역</span></div>${row(list[selIdx], selIdx)}` : "";
    // 두 열에 위에서 아래로 1–5위, 6–10위가 오도록 배치
    const left = top.slice(0, 5).map((d, i) => row(d, i)).join("");
    const right = top.slice(5).map((d, i) => row(d, i + 5)).join("");
    $("#rank").innerHTML = `
      <div class="rank-title"><span><b>${m.label}</b> 상위 시군</span><span>${m.year} · ${list.length}개 시군</span></div>
      <div>${left}</div><div>${right}</div>${extra}`;
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => select(state.region === b.dataset.r ? SIDO : b.dataset.r)));
  }

  // ---------- 흐르는 증감 띠 ----------
  function tickerItem(label, arr) {
    const { value, prev } = lastOf(arr);
    if (value == null || prev == null || prev === 0) return "";
    const r = ((value - prev) / prev) * 100;
    const cls = r > 0 ? "up" : r < 0 ? "down" : "";
    const arrow = r > 0 ? "▲" : r < 0 ? "▼" : "–";
    return `<span class="tk">${label} <b class="${cls}">${arrow} ${nf1.format(Math.abs(r))}%</b></span>`;
  }

  function renderTicker() {
    const r = state.region;
    const head = [
      `<span class="tk tk-region">${r}</span>`,
      tickerItem("농가", D.farm.households[r]),
      tickerItem("농가인구", D.farm.population[r]),
      tickerItem("귀농가구", D.returning.farmHouseholds[r]),
      tickerItem("귀촌인", D.returning.ruralPersons[r]),
      tickerItem("경지면적", D.land.total[r]),
    ];
    const others = SGG.filter((x) => x !== r).flatMap((x) => [
      `<span class="tk"><b style="color:var(--text)">${x}</b></span>`,
      tickerItem("농가", D.farm.households[x]),
      tickerItem("귀촌인", D.returning.ruralPersons[x]),
    ]);
    const html = [...head, ...others].join("");
    const track = $("#ticker");
    track.innerHTML = `${html}<span aria-hidden="true" style="display:contents">${html}</span>`;
    // 1초에 약 50px씩 흐르도록 길이에 맞춰 속도를 정한다
    requestAnimationFrame(() => track.style.setProperty("--ticker-dur", `${Math.round(track.scrollWidth / 2 / 50)}s`));
  }

  // ---------- 출처 ----------
  function sources() {
    $$("[data-src]").forEach((el) => {
      const s = D[el.dataset.src]?.source;
      el.textContent = s ? `출처: ${s}` : "";
    });
    $("#updated").textContent = `데이터 수집일 ${D.updated}`;
  }

  // ---------- 전체 갱신 ----------
  function render() {
    renderTicker();
    renderHero();
    renderFarm();
    renderReturn();
    renderLand();
    renderLivestock();
    renderCrop();
    renderGrdp();
    renderEcon();
    paintMap();
    renderRank();
  }

  chips();
  sources();
  drawMap();
  const fromHash = decodeURIComponent(location.hash.slice(1));
  select(SGG.includes(fromHash) ? fromHash : SIDO);

  let resizeT;
  new ResizeObserver(() => {
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { drawMap(); renderFarm(); renderReturn(); }, 120);
  }).observe($("#map-wrap"));
})();
