// 자세히 보기: 가운데 지도 카드 안에서 VWorld 항공영상 위에 팜맵 필지와 그 시군의 유통시설(data/facilities.js)을 그린다.
// 시군에서 '자세히 보기'를 처음 고를 때만 Leaflet·시설 자료와 함께 불러온다 (app.js의 loadFarm·setView).
(() => {
  const API = "/api/farmmap";
  const KIND_COLOR = { 논: "#5cc8ff", 밭: "#ffd23f", 과수: "#ff7ab6", 시설: "#ff6a5c" };
  const OTHER = "#e8e8e8";
  const KINDS = Object.keys(KIND_COLOR);
  const QUERY_ZOOM = 15; // 이보다 멀리서 누르면 필지를 묻지 않고 그 지점으로 확대한다
  // 전국 필지 타일 (scripts/upload_farmmap_tiles.py가 R2에 올린다). QUERY_ZOOM부터 분류별 색으로 경계를 그린다
  const TILES = "https://pub-6a32610bd1414a8d8dc3adc9eecd3632.r2.dev/farmmap/2025/kr.pmtiles";
  const TILE_KIND = { 1: "논", 2: "밭", 3: "과수", 4: "시설", 6: "인삼" };
  // VWorld 주제도 (WMS 1.3.0, 스타일 이름 = 레이어 이름). min은 VWorld가 그려 주는 가장 작은 확대 단계(2026-11 확인),
  // 범례 색은 VWorld가 그린 타일에서 뽑았다. 해안침수(lt_c_cdfrs100frq)는 WMS에 레이어가 없어(Could not find layer) 뺐다
  const THEMES = [
    { id: "agri", name: "농업진흥지역", layer: "lt_c_agrixue101", min: 12, legend: [["#67c394", "농업진흥구역"], ["#016242", "농업보호구역"]] },
    { id: "poor", name: "영농여건불리농지", layer: "lt_c_agrixue102", min: 12, legend: [["#f68d1f", "영농여건불리농지"]] },
    { id: "uq113", name: "농림지역", layer: "lt_c_uq113", min: 10, legend: [["#cdfd66", "농림지역"]] },
    { id: "uq112", name: "관리지역", layer: "lt_c_uq112", min: 10, legend: [["#cbff66", "보전·생산·계획관리지역"]] },
    { id: "gb", name: "개발제한구역", layer: "lt_c_ud801", min: 8, legend: [["#aaffff", "개발제한구역"]] },
    { id: "stock", name: "가축사육제한구역", layer: "lt_c_um000", min: 10, legend: [["#717171", "가축사육제한구역(전부·일부 제한)"]] },
    { id: "soil", name: "토양 배수등급", layer: "lt_c_asitsoildra", min: 12, legend: [["#44c7f2", "양호"], ["#619db9", "약간불량"], ["#32789e", "불량"], ["#1c5596", "매우불량"]] },
  ];
  // 주제도의 뜻 (범례 아래와 토지 이용 칸에 보인다)
  const THEME_DESC = {
    agri: "농업진흥구역: 농업 생산을 위해 집단화한 농지로 농업용 시설 외 개발행위가 엄격히 제한된다. 농업보호구역: 진흥구역의 용수원·환경 보호용으로 일부 시설이 허용된다.",
    poor: "영농여건불리농지: 경사·집단화 규모 등으로 영농 여건이 불리한 농업진흥지역 밖 농지. 농지 전용이 신고로 가능하고 임대·위탁 제한이 완화된다.",
    uq113: "농림지역: 도시지역 밖의 농업진흥지역·보전산지 등. 건축 등 개발행위 제한이 크다.",
    uq112: "관리지역: 보전관리·생산관리·계획관리지역. 계획관리지역의 개발 허용 폭이 가장 넓다.",
    gb: "개발제한구역: 도시 확산 방지를 위한 구역. 건축물 신축·용도변경이 원칙적으로 금지된다.",
    stock: "가축사육제한구역: 시군 조례로 정한 축종별 사육 제한(전부 제한·일부 제한) 구역.",
    soil: "토양 배수등급: 물 빠짐 정도. 양호할수록 밭작물에, 불량할수록 논 이용에 알맞다. 지점별 값은 VWorld에서 조회되지 않아 지도 색과 범례로 확인한다.",
  };
  const nf = new Intl.NumberFormat("ko-KR");
  const nf1 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 1 });
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const colorOf = (kind) => KIND_COLOR[kind] || OTHER;
  const coarse = window.matchMedia("(pointer: coarse)");

  // 같은 요청은 한 번만 보낸다 (실패하면 다시 보낼 수 있게 지운다)
  const memo = new Map();
  let pending = 0;
  function api(params) {
    const qs = new URLSearchParams(params).toString();
    if (!memo.has(qs)) {
      busy(1);
      const p = fetch(`${API}?${qs}`)
        .then(async (r) => {
          const body = await r.json().catch(() => ({}));
          if (!r.ok) throw new Error(body.error || `서버 응답 ${r.status}`);
          return body;
        })
        .finally(() => busy(-1));
      p.catch(() => memo.delete(qs));
      memo.set(qs, p);
    }
    return memo.get(qs);
  }

  let H = null; // 지도 카드 안의 자리: { card, bar, map, info }
  let map, bases, labels, regionLayer, mask, parcelLayer, marker, circle, facLayer, tiles, vkey;
  const themeLayers = new Map(); // 주제도 id → WMS 층 (처음 고를 때 만든다)
  const ui = {};
  const drawn = new Map(); // 팜맵 ID → 그려 둔 필지 레이어
  const st = { base: "sat", labels: false, radius: 500, nearAt: null, seq: 0, nearSeq: 0, region: null, full: false, tileErrors: 0, tileLoads: 0, theme: "", landSeq: 0 };

  function busy(d) {
    pending += d;
    H?.map.classList.toggle("fv-busy", pending > 0);
  }

  const ICON = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>',
    expand: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>',
    shrink: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>',
  };

  function build(hosts) {
    H = hosts;
    H.bar.innerHTML = `
      <form class="fv-search" role="search" data-ui="form">
        <input type="search" data-ui="q" placeholder="주소·지번·장소 검색" aria-label="주소, 지번, 장소 검색" autocomplete="off" enterkeyhint="search">
        <button type="submit" aria-label="검색">${ICON.search}</button>
        <ul class="fv-results" data-ui="results" hidden></ul>
      </form>
      <span class="seg fv-base" role="group" aria-label="배경 지도">
        <button type="button" data-base="sat" aria-pressed="true">위성</button><button type="button" data-base="map" aria-pressed="false">지도</button>
      </span>
      <label class="fv-check"><input type="checkbox" data-ui="labels"> 지명</label>
      <label class="fv-check" title="팜맵 필지 경계선을 끄면 주제도 색이 잘 보입니다(필지를 누르면 조회는 그대로)"><input type="checkbox" data-ui="edges" checked> 필지 경계</label>
      <label class="fv-theme"><span>주제도</span><select data-ui="theme" aria-label="주제도">
        <option value="">없음</option>${THEMES.map((t) => `<option value="${t.id}">${t.name}</option>`).join("")}
      </select></label>
      <button type="button" class="fv-expand fv-expand-in" data-ui="expand" aria-pressed="false" aria-label="크게 보기" title="크게 보기">${ICON.expand}</button>`;
    // 크게 보기 단추는 제목 줄(app.js의 #sat-expand)에 두고, 크게 본 동안에는 지도 카드 안의 단추로 되돌린다
    if (H.expand) H.expand.innerHTML = ICON.expand;
    H.map.innerHTML = `
      <div class="fv-map" data-ui="map"></div>
      <div class="fv-progress" aria-hidden="true"></div>
      <p class="fv-hint" data-ui="hint" aria-live="polite" hidden></p>
      <div class="fv-legend" data-ui="legend" hidden></div>`;
    H.info.innerHTML = `
      <section class="fv-sec" data-ui="facs" aria-label="유통시설"></section>
      <section class="fv-sec fv-pick" aria-label="필지 정보">
        <div data-ui="parcel"></div>
        <div class="fv-land" data-ui="land"></div>
        <div class="fv-near" data-ui="near"></div>
      </section>`;
    for (const el of [H.bar, H.map, H.info]) el.querySelectorAll("[data-ui]").forEach((x) => { ui[x.dataset.ui] = x; });

    H.bar.querySelectorAll("[data-base]").forEach((b) => b.addEventListener("click", () => setBase(b.dataset.base)));
    ui.labels.addEventListener("change", () => { st.labels = ui.labels.checked; syncLayers(); });
    // 필지 경계 켜고 끄기: 층은 그대로 두고 투명하게만 한다(누른 필지 찾기에 타일이 필요)
    ui.edges.addEventListener("change", () => { st.edges = ui.edges.checked; tiles?.setOpacity(st.edges ? 1 : 0); });
    ui.expand.addEventListener("click", () => setFull(!st.full));
    H.expand?.addEventListener("click", () => setFull(!st.full));
    ui.theme.addEventListener("change", () => setTheme(ui.theme.value));
    ui.form.addEventListener("submit", (e) => { e.preventDefault(); search(); });
    ui.q.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown" && !ui.results.hidden) { e.preventDefault(); ui.results.querySelector("button")?.focus(); }
    });
    ui.results.addEventListener("keydown", (e) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      const btns = [...ui.results.querySelectorAll("button")];
      const i = btns.indexOf(document.activeElement) + (e.key === "ArrowDown" ? 1 : -1);
      (i < 0 ? ui.q : btns[Math.min(i, btns.length - 1)]).focus();
    });
    document.addEventListener("pointerdown", (e) => { if (!ui.form.contains(e.target)) ui.results.hidden = true; });
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape" || !H.card.classList.contains("sat-mode")) return;
      if (!ui.results.hidden) { ui.results.hidden = true; ui.q.focus(); }
      else if (st.full) setFull(false);
    });
    coarse.addEventListener("change", syncDragging);
    idle();
  }

  function initMap(key) {
    vkey = key;
    const wmts = (layer, ext) => `https://api.vworld.kr/req/wmts/1.0.0/${key}/${layer}/{z}/{y}/{x}.${ext}`;
    const opt = { minZoom: 7, maxZoom: 20, maxNativeZoom: 19, keepBuffer: 3 };
    bases = {
      sat: L.tileLayer(wmts("Satellite", "jpeg"), { ...opt, className: "fv-sat" }),
      map: L.tileLayer(wmts("Base", "png"), opt),
    };
    labels = L.tileLayer(wmts("Hybrid", "png"), { ...opt, zIndex: 4 }); // 영상(1) < 주제도(2) < 필지 경계(3) < 지명(4)
    map = L.map(ui.map, {
      minZoom: 7,
      maxZoom: 20,
      maxBounds: [[32, 123], [39.6, 132.5]],
      maxBoundsViscosity: 0.8,
      zoomControl: false,
    });
    L.control.zoom({ position: "bottomright", zoomInTitle: "확대", zoomOutTitle: "축소" }).addTo(map);
    map.attributionControl.setPrefix(false).addAttribution("영상·주제도 VWorld · 필지 팜맵(농정원) · 시설 공공데이터 외");
    // 인증키의 서비스 URL이 맞지 않으면 타일이 모두 실패한다 (바다 등 일부 실패는 정상)
    Object.values(bases).forEach((t) => t
      .on("tileload", () => { st.tileLoads++; })
      .on("tileerror", () => {
        if (++st.tileErrors >= 6 && !st.tileLoads) hint("VWorld 영상을 불러오지 못했습니다. 인증키에 등록한 서비스 URL을 확인해 주세요.", true);
      }));
    regionLayer = L.layerGroup().addTo(map);
    tiles = tileParcels();
    tiles?.addTo(map);
    if (st.edges === false) tiles?.setOpacity(0);
    parcelLayer = L.featureGroup().addTo(map);
    map.createPane("fv-facs").style.zIndex = 450; // 필지(400) 위, 툴팁 아래
    facLayer = L.layerGroup().addTo(map);
    marker = L.circleMarker([0, 0], { radius: 5, color: "#fff", weight: 2, fillColor: "#f5a524", fillOpacity: 1, interactive: false });
    circle = L.circle([0, 0], { radius: 500, color: "#fff", weight: 1.5, opacity: 0.8, dashArray: "6 6", fill: false, interactive: false });
    syncLayers();
    syncDragging();
    if (st.theme) setTheme(st.theme);
    map.on("click", (e) => {
      if (map.getZoom() < QUERY_ZOOM) { map.setView(e.latlng, Math.min(17, Math.max(QUERY_ZOOM + 1, map.getZoom() + 3))); return; }
      inspect(e.latlng);
    });
    map.on("zoomend", () => { syncMask(); syncLegend(); if (!drawn.size && !st.nearAt) idle(); });
    // 시군에 맞춘 뒤에 지도 칸 크기가 바뀌면(자세히 보기로 바뀌며 아래 정보 칸이 생기는 등) 다시 맞춘다.
    // 사용자가 직접 옮기거나 확대한 뒤에는 크기만 알려 주고 시점은 그대로 둔다.
    map.on("movestart", () => { if (!st.fitting) st.fitTo = null; });
    new ResizeObserver(() => {
      map.invalidateSize({ pan: false });
      if (st.fitTo) fitBounds(st.fitTo);
    }).observe(ui.map);
  }

  // 확대한 지도의 필지 경계 (영상 위, 지명 아래). 누르면 지금처럼 팜맵 조회로 그 필지를 고른다
  function tileParcels() {
    if (!window.protomapsL) return null;
    const P = window.protomapsL;
    const color = (z, f) => colorOf(TILE_KIND[f.props.c]);
    return P.leafletLayer({
      url: TILES,
      maxDataZoom: 15,
      minZoom: QUERY_ZOOM,
      zIndex: 3,
      attribution: "",
      paintRules: [
        { dataLayer: "p", symbolizer: new P.PolygonSymbolizer({ fill: color, opacity: 0.12 }) },
        { dataLayer: "p", symbolizer: new P.LineSymbolizer({ color, width: (z) => (z >= 17 ? 1.4 : 1), opacity: 0.9 }) },
      ],
    });
  }

  // 누른 지점을 덮는 필지 타일의 속성 {c 분류, a 면적, r 직사각형도, y 경지정리 1/0} (scripts/build_farmmap.py가 계산)
  // 타일 경계는 확대 15단계에 맞춰 단순화되어 실제 경계와 1m 안팎 어긋난다 → 누른 점과 둘레(2·4m) 점에서 찾고,
  // 팜맵 조회 면적(areaHint)이 있으면 면적이 가장 가까운 필지(15% 안)를 고른다
  function tileAt(ll, areaHint = null) {
    if (!tiles || map.getZoom() < QUERY_ZOOM) return null;
    const dLat = 1 / 111000, dLng = dLat / Math.cos((ll.lat * Math.PI) / 180);
    const pts = [[0, 0], ...[2, 4].flatMap((m) => [0, 1, 2, 3, 4, 5, 6, 7].map((i) => [m * Math.cos((i * Math.PI) / 4), m * Math.sin((i * Math.PI) / 4)]))];
    const hits = [];
    for (const [dx, dy] of pts) {
      const f = [...tiles.queryTileFeaturesDebug(ll.lng + dx * dLng, ll.lat + dy * dLat, 0).values()].flat().find((x) => x.layerName === "p");
      if (f) hits.push(f.feature.props);
      if (f && !areaHint && hits.length === 1 && dx === 0 && dy === 0) break; // 누른 점 안의 필지
    }
    if (!hits.length) return null;
    if (!areaHint) return hits[0];
    const best = hits.reduce((a, b) => (Math.abs(b.a - areaHint) < Math.abs(a.a - areaHint) ? b : a));
    return Math.abs(best.a - areaHint) <= areaHint * 0.15 ? best : null;
  }

  // 지도를 그 범위에 맞춘다. 사용자가 옮기기 전까지는 지도 칸 크기가 바뀌면 다시 맞춘다
  function fitBounds(b) {
    if (!b) return;
    st.fitting = true;
    map.fitBounds(b, { padding: [16, 16], animate: false });
    st.fitting = false;
    st.fitTo = b;
  }
  const fitRegion = () => fitBounds(st.bounds);

  // ---------- 주제도 (VWorld WMS) ----------
  // 한 번에 하나만 켠다. 타일을 512px로 받아 요청 수를 줄인다
  function setTheme(id) {
    st.theme = id;
    ui.theme.value = id;
    for (const [k, t] of themeLayers) if (k !== id) t.remove();
    const th = THEMES.find((t) => t.id === id);
    if (th && map) {
      if (!themeLayers.has(id)) {
        themeLayers.set(id, L.tileLayer.wms("https://api.vworld.kr/req/wms", {
          layers: th.layer, styles: th.layer, format: "image/png", transparent: true, version: "1.3.0", key: vkey,
          tileSize: 512, minZoom: th.min, maxZoom: 20, opacity: 0.7, zIndex: 2, className: "fv-theme-tiles",
        }));
      }
      themeLayers.get(id).addTo(map);
    }
    syncLegend();
    if (st.lastLand) renderLand(st.lastLand);
  }

  function syncLegend() {
    const th = THEMES.find((t) => t.id === st.theme);
    ui.legend.hidden = !th;
    if (!th) return;
    const far = map && map.getZoom() < th.min;
    ui.legend.innerHTML = `<b>${esc(th.name)}</b>${th.legend.map(([c, n]) => `<span><i style="--c:${c}"></i>${esc(n)}</span>`).join("")}`
      + (far ? `<em>확대하면 보입니다</em>` : th.id === "soil" ? "" : `<em>지도를 누르면 그 지점 값이 오른쪽 '토지 이용'에 나옵니다</em>`);
  }

  function setBase(b) {
    st.base = b;
    H.bar.querySelectorAll("[data-base]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.base === b));
    syncLayers();
  }

  function syncLayers() {
    for (const [k, t] of Object.entries(bases)) (k === st.base ? t.addTo(map) : t.remove());
    // 일반 지도에는 지명이 이미 있으므로 위성일 때만 지명 층을 얹는다
    if (st.base === "sat" && st.labels) labels.addTo(map); else labels.remove();
    ui.labels.disabled = st.base !== "sat";
  }

  // 터치 화면에서 카드 안에 있을 때는 한 손가락으로 페이지를 스크롤할 수 있게 지도 끌기를 끈다 (두 손가락으로 이동·확대)
  function syncDragging() {
    if (!map) return;
    if (coarse.matches && !st.full) map.dragging.disable(); else map.dragging.enable();
  }

  // ---------- 크게 보기 ----------
  function setFull(on) {
    st.full = on;
    H.card.classList.toggle("sat-full", on);
    document.documentElement.classList.toggle("fv-lock", on);
    for (const b of [ui.expand, H.expand]) {
      if (!b) continue;
      b.setAttribute("aria-pressed", on);
      b.setAttribute("aria-label", on ? "작게 보기" : "크게 보기");
      b.title = on ? "작게 보기 (Esc)" : "크게 보기";
      b.innerHTML = on ? ICON.shrink : ICON.expand;
    }
    syncDragging();
    requestAnimationFrame(() => map?.invalidateSize());
  }

  // ---------- 시군 경계 ----------
  function setRegion(geometry) {
    regionLayer.clearLayers();
    const polys = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
    const flip = (ring) => ring.map(([x, y]) => [y, x]);
    // 시군 밖은 옅게 덮는다 (바깥 고리를 구멍으로)
    mask = L.polygon([[[30, 118], [30, 136], [44, 136], [44, 118]], ...polys.map((p) => flip(p[0]))], {
      stroke: false, fillColor: "#0b0c0f", fillOpacity: 0.28, interactive: false,
    }).addTo(regionLayer);
    const outline = L.polygon(polys.map((p) => p.map(flip)), { color: "#f5a524", weight: 2, fill: false, interactive: false }).addTo(regionLayer);
    st.bounds = outline.getBounds();
    fitRegion();
    syncMask();
    setFacilities(geometry, st.unit);
  }

  // 필지를 볼 만큼 확대하면 덮개를 걷는다 (단순화한 경계라 실제 경계와 어긋나는 곳이 있다)
  function syncMask() {
    mask?.setStyle({ fillOpacity: map.getZoom() >= 14 ? 0 : 0.28 });
  }

  // ---------- 안내 ----------
  function hint(text, warn = false) {
    ui.hint.textContent = text;
    ui.hint.hidden = !text;
    ui.hint.classList.toggle("warn", warn);
  }

  // 아무것도 고르지 않았을 때 정보 칸의 안내
  function idle() {
    const far = !map || map.getZoom() < QUERY_ZOOM;
    ui.parcel.innerHTML = `
      <div class="fv-sec-head"><h3>팜맵 필지</h3></div>
      <p class="fv-empty"><b>${far ? "지도를 확대하면 팜맵 필지 경계가 보입니다" : "논·밭·하우스를 누르면 필지 정보가 나옵니다"}</b>위쪽 검색창에서 주소·지번으로 바로 찾을 수도 있습니다.${coarse.matches ? " 카드 안에서는 두 손가락으로 지도를 움직입니다." : ""}</p>`;
    ui.near.innerHTML = "";
  }

  // ---------- 필지 ----------
  function drawParcels(features) {
    for (const f of features) {
      if (drawn.has(f.properties.id)) continue;
      const c = colorOf(f.properties.kind);
      const layer = L.geoJSON(f, { style: { color: c, weight: 2, fillColor: c, fillOpacity: 0.18 } });
      layer.on("click", (e) => {
        L.DomEvent.stopPropagation(e);
        select([f], tileAt(e.latlng, f.properties.area));
        loadNear(e.latlng);
        loadLand(e.latlng);
        marker.setLatLng(e.latlng).addTo(map);
      });
      layer.addTo(parcelLayer);
      drawn.set(f.properties.id, { layer, f });
    }
  }

  function highlight(ids) {
    for (const [id, { layer, f }] of drawn) {
      const on = ids.includes(id);
      const c = colorOf(f.properties.kind);
      layer.setStyle(on ? { color: "#fff", weight: 3, fillColor: c, fillOpacity: 0.32 } : { color: c, weight: 2, fillColor: c, fillOpacity: 0.18 });
      if (on) layer.bringToFront();
    }
  }

  function select(features, tp = null) {
    highlight(features.map((f) => f.properties.id));
    renderParcels(features, tp);
  }

  async function inspect(ll, pnu = "") {
    const my = ++st.seq;
    marker.setLatLng(ll).addTo(map);
    ui.parcel.innerHTML = `<div class="fv-sec-head"><h3>팜맵 필지</h3></div><p class="fv-loading">필지를 찾는 중…</p>`;
    loadNear(ll);
    loadLand(ll);
    const lat = ll.lat.toFixed(6), lon = ll.lng.toFixed(6);
    try {
      let { features } = await (pnu ? api({ op: "pnu", pnu }) : api({ op: "point", lat, lon }));
      // 검색한 지번에 걸친 팜맵 필지가 없으면 그 지점의 필지를 찾는다
      if (pnu && !features.length) ({ features } = await api({ op: "point", lat, lon }));
      if (my !== st.seq) return;
      drawParcels(features);
      select(features, features.length === 1 ? tileAt(ll, features[0].properties.area) : null);
    } catch (err) {
      if (my === st.seq) ui.parcel.innerHTML = `<div class="fv-sec-head"><h3>팜맵 필지</h3></div><p class="fv-error">${esc(err.message)}</p>`;
    }
  }

  const nf2 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 2 });
  const ha = (m2) => (m2 < 10000 ? nf2 : nf1).format(m2 / 10000);
  const area = (m2) => `<b>${nf.format(m2)}</b>㎡ <span>${nf.format(Math.round(m2 / 3.3058))}평 · ${ha(m2)}ha</span>`;

  // 분류·지번·면적 (팜맵 조회). 누른 필지의 모양·경지정리(필지 타일)와 그 시군 필지 지표(data/farmmap.js)를 덧붙인다.
  // 판독 영상·변경 구분·지번코드·팜맵 ID는 싣지 않는다
  const FMR = window.AGRI_FARMMAP?.regions || {};
  const shapeWord = (r) => (r >= 0.9 ? "반듯함" : r >= 0.75 ? "대체로 반듯함" : "모양이 고르지 않음");
  function parcelExtra(p, tp) {
    if (!tp) return "";
    const g = p.kind === "논" || p.kind === "밭" ? p.kind : "전체";
    const reg = FMR[st.key]?.[g];
    const cmp = [reg?.med != null && `면적 ${nf.format(reg.med)}㎡`, reg?.rect != null && `직사각형도 ${nf2.format(reg.rect)}`,
      g === "논" && reg?.armt != null && `경지정리율 ${nf1.format(reg.armt * 100)}%`].filter(Boolean);
    return `<div class="fv-pdl">${tp.r != null ? `<span>모양 <b>${nf2.format(tp.r)}</b> ${shapeWord(tp.r)}</span>` : ""}<span>경지정리 <b>${tp.y ? "됨" : "안 됨"}</b></span></div>`
      + (cmp.length ? `<p class="fv-pcmp">${esc(st.unit)} ${g === "전체" ? "필지" : g} 중앙값 · ${cmp.join(" · ")}</p>` : "");
  }
  function parcelCard(p, tp = null) {
    return `
      <article class="fv-parcel">
        <div class="fv-p-head"><span class="fv-kind" style="--c:${colorOf(p.kind)}">${esc(p.kind || "기타")}</span><h4>${esc(p.emd)} ${esc(p.lnm)}</h4></div>
        <p class="fv-area">${area(p.area)}</p>
        ${parcelExtra(p, tp)}
      </article>`;
  }

  function renderParcels(features, tp = null) {
    const head = `<div class="fv-sec-head"><h3>팜맵 필지</h3><button type="button" class="fv-link" data-act="clear">지우기</button></div>`;
    let body;
    if (!features.length) {
      body = `<p class="fv-empty"><b>팜맵 농경지가 아닙니다</b>이 지점은 팜맵에 농경지로 구획되어 있지 않습니다. 논·밭·하우스를 눌러 보세요.</p>`;
    } else if (features.length === 1) {
      body = parcelCard(features[0].properties, tp);
    } else {
      const sum = features.reduce((s, f) => s + f.properties.area, 0);
      body = `<p class="fv-multi">이 지번에 걸친 필지 <b>${features.length}</b>개 · 합계 ${area(sum)}</p>${features.map((f) => parcelCard(f.properties)).join("")}`;
    }
    ui.parcel.innerHTML = `${head}${body}`;
    ui.parcel.querySelector('[data-act="clear"]').addEventListener("click", clearAll);
  }

  function clearAll() {
    st.seq++;
    st.nearSeq++;
    st.landSeq++;
    ui.land.innerHTML = "";
    parcelLayer?.clearLayers();
    drawn.clear();
    marker?.remove();
    circle?.remove();
    st.nearAt = null;
    idle();
  }

  // ---------- 토지 이용 (VWorld 데이터 API, /api/farmmap?op=land) ----------
  // 누른 지점의 농업진흥지역·용도지역·가축사육제한구역. 약 1m 격자로 맞춰 같은 곳은 다시 묻지 않는다
  async function loadLand(ll) {
    const my = ++st.landSeq;
    renderLand(null);
    try {
      const d = await api({ op: "land", lat: ll.lat.toFixed(5), lon: ll.lng.toFixed(5) });
      if (my === st.landSeq) renderLand(d);
    } catch (err) {
      if (my === st.landSeq) renderLand({ error: err.message });
    }
  }

  // "일부제한지역 돼지 닭 개 제한" → "일부 제한 · 돼지·닭·개"
  function stockText(s) {
    if (!s) return "해당 없음";
    const r = s.remark.replace(/\s+/g, " ");
    if (!r) return "해당";
    if (/^전부제한|모든 가축 사육 제한/.test(r)) return "전부 제한";
    const m = r.match(/^일부\s?제한(?:지역|구역)?\s*(.*?)\s*(?:제한)?$/);
    if (m) return `일부 제한${m[1] ? ` · ${m[1].replace("모든축종", "모든 축종").split(" ").join("·").replace("모든·축종", "모든 축종")}` : ""}`;
    return r;
  }

  // 고른 주제도의 그 지점 값
  function themeValue(id, d) {
    const miss = (k) => d.missing.includes(k);
    if (id === "agri") return miss("agri") ? "확인 못 함" : d.agri || "해당 없음";
    if (id === "poor") return miss("poor") ? "확인 못 함" : d.poor ? "영농여건불리농지" : "해당 없음";
    if (id === "uq113") return d.zone.includes("농림지역") ? "농림지역" : d.zone.length ? `해당 없음 (${d.zone.join(", ")})` : "해당 없음";
    if (id === "uq112") { const z = d.zone.filter((x) => /관리지역/.test(x)); return z.length ? z.join(", ") : d.zone.length ? `해당 없음 (${d.zone.join(", ")})` : "해당 없음"; }
    if (id === "gb") return miss("gb") ? "확인 못 함" : d.gb ? "개발제한구역" : "해당 없음";
    if (id === "stock") return miss("stock") ? "확인 못 함" : stockText(d.stock);
    return null;
  }

  function renderLand(d) {
    const head = `<div class="fv-sec-head"><h3>토지 이용</h3></div>`;
    if (d && !d.error) st.lastLand = d;
    if (!d) { ui.land.innerHTML = `${head}<p class="fv-loading">VWorld에서 확인하는 중…</p>`; return; }
    if (d.error) { ui.land.innerHTML = `${head}<p class="fv-error">${esc(d.error)}</p>`; return; }
    const th = THEMES.find((t) => t.id === st.theme);
    const tv = th ? themeValue(th.id, d) : null;
    const themeBox = th ? `<div class="fv-tbox"><div class="fv-tbox-h">주제도 · ${esc(th.name)}${tv != null ? ` <b>${esc(tv)}</b>` : ""}</div><p>${esc(THEME_DESC[th.id] || "")}</p></div>` : "";
    const miss = (k) => d.missing.includes(k);
    const NA = `<span>확인 못 함</span>`;
    const agri = miss("agri") ? NA : d.agri ? `<b>${esc(d.agri)}</b>` : "해당 없음";
    const zone = d.zone.length ? esc(d.zone.join(", ")) : d.missing.some((k) => k.startsWith("uq")) ? NA : "자료 없음";
    const row = (k, v) => `<div><dt>${k}</dt><dd>${v}</dd></div>`;
    ui.land.innerHTML = `${head}${themeBox}<dl class="fv-ldl">
      ${row("농업진흥지역", agri + (d.poor ? " · 영농여건불리농지" : ""))}
      ${row("용도지역", zone + (d.gb ? " · <b>개발제한구역</b>" : ""))}
      ${row("가축사육제한", miss("stock") ? NA : esc(stockText(d.stock)))}
    </dl><p class="fv-note">VWorld 주제도 기준 · 행위 제한은 토지이음 토지이용계획으로 확인</p>`;
  }

  // ---------- 주변 농경지 구성 ----------
  // 중심을 약 50m 격자에 맞춰 같은 동네를 다시 누르면 캐시를 쓰게 한다
  const snap = (v) => (Math.round(v * 2000) / 2000).toFixed(4);

  async function loadNear(ll) {
    const my = ++st.nearSeq;
    const lat = snap(ll.lat), lon = snap(ll.lng);
    st.nearAt = ll;
    circle.setLatLng([+lat, +lon]).setRadius(st.radius).addTo(map);
    renderNear(null);
    try {
      const d = await api({ op: "near", lat, lon, r: st.radius });
      if (my === st.nearSeq) renderNear(d);
    } catch (err) {
      if (my === st.nearSeq) renderNear({ error: err.message });
    }
  }

  function renderNear(d) {
    const seg = `<span class="seg" role="group" aria-label="반경">${[500, 1000].map((r) =>
      `<button type="button" data-r="${r}" aria-pressed="${st.radius === r}">${r === 1000 ? "1km" : "500m"}</button>`).join("")}</span>`;
    let body, title = "주변 농경지";
    if (!d) body = `<p class="fv-loading">주변 필지를 세는 중…</p>`;
    else if (d.error) body = `<p class="fv-error">${esc(d.error)}</p>`;
    else if (!d.total) body = `<p class="fv-empty">반경 안에 팜맵 농경지가 없습니다.</p>`;
    else {
      const max = Math.max(...KINDS.map((k) => d.kinds[k] || 0), 1);
      const rows = KINDS.map((k) => {
        const n = d.kinds[k] || 0;
        return `<div class="fv-bar-row"><span>${k}</span><span class="fv-track"><i style="width:${(n / max) * 100}%;--c:${KIND_COLOR[k]}"></i></span><b>${nf.format(n)}</b><em>${nf1.format((n / d.counted) * 100)}%</em></div>`;
      }).join("");
      const emd = d.emd.map((e) => e.name).join("·");
      // 제목 줄에 필지 수를 함께 적어 한 줄을 아낀다
      title = `주변 <b>${nf.format(d.total)}</b>개 필지${emd ? ` <span>${esc(emd)}</span>` : ""}`;
      body = `
        <div class="fv-bars">${rows}</div>
        <p class="fv-note">필지 개수 기준(면적 아님)${d.counted < d.total ? ` · 앞 ${nf.format(d.counted)}개만 집계` : ""} · 지난 판독 이후 바뀐 필지 ${nf.format(d.changed)}개</p>`;
    }
    ui.near.innerHTML = `<div class="fv-sec-head"><h3 class="fv-near-title">${title}</h3>${seg}</div>${body}`;
    ui.near.querySelectorAll("[data-r]").forEach((b) => b.addEventListener("click", () => {
      st.radius = +b.dataset.r;
      if (st.nearAt) loadNear(st.nearAt);
    }));
  }

  // ---------- 유통시설 ----------
  // data/facilities.js(scripts/build_facilities.py). 시군 경계 안의 시설만 고른다.
  // 주소가 읍면·시군까지만 있어 그 중심에 놓인 곳은 확대한 지도에서 오해를 사므로 목록에만 싣는다.
  const FD = window.AGRI_FACILITIES;
  const F_EXACT = new Set(["도로명", "지번", "좌표", "상호"]);
  const F_PREC = {
    도로명: "도로명주소 위치", 지번: "지번주소 위치", 좌표: "자료에 적힌 위경도", 상호: "시설 이름 장소검색 위치",
    리: "마을(리) 중심 — 지도에 표시 안 함", 읍면동: "읍면동 중심 — 지도에 표시 안 함", 시군구: "시군 중심 — 지도에 표시 안 함",
  };
  const facRows = FD ? FD.rows
    .map(([kind, lon, lat, prec, name, road, jibun, tel, info, sgg]) => ({ kind, lon, lat, prec: prec >= 0 ? FD.precs[prec] : "", name, road, jibun, tel, info, sgg }))
    .filter((r) => r.lon != null && r.prec !== "시도") // 시도 중심은 어느 시군의 시설인지 알 수 없다
    .map((r, i) => {
      const exact = F_EXACT.has(r.prec);
      // 같은 건물에 놓인 시설은 한 점으로 묶고, 지역 중심에 놓인 시설은 따로 고른다
      return { ...r, exact, key: exact ? `${r.lon},${r.lat}` : `#${i}` };
    }) : [];
  const fst = { here: [], kinds: new Set(), sel: null };

  // 점이 시군 경계(Polygon·MultiPolygon, 구멍 포함) 안에 있는지
  function inRing(x, y, ring) {
    let inside = false;
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
      const [xi, yi] = ring[i], [xj, yj] = ring[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  function inGeometry(x, y, geometry) {
    const polys = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
    return polys.some(([outer, ...holes]) => inRing(x, y, outer) && !holes.some((h) => inRing(x, y, h)));
  }

  // 경계를 단순화해 시군 끝자락의 시설이 밖으로 빠지거나 이웃 시군 시설이 들어온다.
  // 그래서 주소의 시군(sgg, build_facilities.py가 붙인다)이 이 시군이면 경계 밖 3km까지 담고,
  // 경계 안이어도 주소가 다른 시군이면 뺀다. 광역시 '○○시부'는 주소가 구 단위라 경계로만 가린다.
  const stem = (s) => (s || "").replace(/(시|군)$/, "");
  function setFacilities(geometry, unit) {
    const xs = [], ys = [];
    (geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates).forEach((p) => p[0].forEach(([x, y]) => { xs.push(x); ys.push(y); }));
    const pad = 0.035;
    const [x0, x1, y0, y1] = [Math.min(...xs) - pad, Math.max(...xs) + pad, Math.min(...ys) - pad, Math.max(...ys) + pad];
    const byAddr = unit && !/시부$/.test(unit);
    fst.here = facRows
      .filter((r) => {
        if (r.lon < x0 || r.lon > x1 || r.lat < y0 || r.lat > y1) return false;
        if (byAddr && r.sgg) return stem(r.sgg) === stem(unit);
        return inGeometry(r.lon, r.lat, geometry);
      })
      .sort((a, b) => a.kind - b.kind || a.name.localeCompare(b.name, "ko"));
    fst.kinds = new Set(fst.here.map((r) => r.kind));
    fst.sel = null;
    drawFacilities();
    renderFacs();
  }

  const facShown = () => fst.here.filter((r) => fst.kinds.has(r.kind));

  function drawFacilities() {
    facLayer.clearLayers();
    const groups = new Map();
    for (const r of facShown()) if (r.exact) (groups.get(r.key) || groups.set(r.key, []).get(r.key)).push(r);
    for (const [key, list] of groups) {
      const r0 = list[0], c = FD.colors[r0.kind], sel = fst.sel === key;
      const m = L.circleMarker([r0.lat, r0.lon], {
        pane: "fv-facs", radius: sel ? 9 : list.length > 1 ? 7.5 : 6.5,
        color: sel ? "#111" : "#fff", weight: sel ? 3 : 2, fillColor: c, fillOpacity: 1,
      });
      m.bindTooltip(`<b>${esc(list.length > 1 ? `${r0.name} 외 ${list.length - 1}곳` : r0.name)}</b><br>${esc(FD.kinds[r0.kind])}`, { direction: "top", offset: [0, -6], className: "fv-ftip" });
      m.on("click", (e) => { L.DomEvent.stopPropagation(e); selectFac(key); });
      m.addTo(facLayer);
    }
  }

  function selectFac(key, fly = false) {
    fst.sel = key;
    const r = fst.here.find((x) => x.key === key);
    if (fly && r?.exact) map.setView([r.lat, r.lon], Math.max(map.getZoom(), 16));
    drawFacilities();
    renderFacs();
  }

  const fmtInfo = (k, v) => (/능력/.test(k) && /^\d+(\.\d+)?$/.test(v) ? `${nf.format(+v)}톤` : k === "직원" && /^\d+$/.test(v) ? `${v}명` : v);

  function facCard(r) {
    const row = (k, v) => (v ? `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>` : "");
    return `
      <article class="fv-parcel fv-fac">
        <div class="fv-p-head"><span class="fv-kind" style="--c:${FD.colors[r.kind]}">${esc(FD.kinds[r.kind])}</span><h4>${esc(r.name)}</h4></div>
        <dl>
          ${row("주소", r.road)}${row(r.road ? "지번" : "주소", r.jibun)}${row("전화", r.tel)}
          ${Object.entries(r.info).map(([k, v]) => row(k, fmtInfo(k, v))).join("")}
          <div><dt>위치</dt><dd${r.exact ? "" : ' class="fv-changed"'}>${esc(F_PREC[r.prec] || r.prec)}</dd></div>
        </dl>
      </article>`;
  }

  function renderFacs() {
    if (!FD) { ui.facs.innerHTML = ""; return; }
    const head = `<div class="fv-sec-head"><h3>유통시설 <span class="fv-sub">${nf.format(fst.here.length)}곳</span></h3></div>`;
    if (!fst.here.length) {
      ui.facs.innerHTML = `${head}<p class="fv-empty">이 시군 안에 표시할 시설이 없습니다.</p>`;
      return;
    }
    const count = new Map();
    fst.here.forEach((r) => count.set(r.kind, (count.get(r.kind) || 0) + 1));
    const chips = [...count].map(([k, n]) => `
      <button type="button" class="fv-fchip" data-k="${k}" aria-pressed="${fst.kinds.has(k)}"><i style="--c:${FD.colors[k]}"></i>${esc(FD.kinds[k])}<b>${nf.format(n)}</b></button>`).join("");
    const picked = fst.sel ? fst.here.filter((r) => r.key === fst.sel) : [];
    const card = picked.length ? `<div class="fv-fcard">${picked.map(facCard).join("")}<button type="button" class="fv-link" data-act="unpick">닫기</button></div>` : "";
    const list = facShown().map((r) => `
      <li><button type="button" data-key="${esc(r.key)}"${r.key === fst.sel ? ' aria-current="true"' : ""}><i style="--c:${FD.colors[r.kind]}"></i><span>${esc(r.name)}</span>${r.exact ? "" : "<em>위치 불명확</em>"}</button></li>`).join("");
    const off = fst.here.filter((r) => !r.exact).length;
    const shown = facShown().length;
    ui.facs.innerHTML = `${head}<div class="fv-fchips" role="group" aria-label="시설 종류 (눌러서 켜고 끄기)">${chips}</div>${card}
      <div class="fv-fl-head"><span>시설 목록 <b>${nf.format(shown)}</b>곳</span><span>누르면 그 위치로</span></div>
      <ol class="fv-flist">${list}</ol>
      ${off ? `<p class="fv-note">주소가 마을·읍면·시군까지만 있는 ${nf.format(off)}곳은 지도에 찍지 않고 목록에만 두었습니다.</p>` : ""}`;
    ui.facs.querySelectorAll("[data-k]").forEach((b) => b.addEventListener("click", () => {
      const k = +b.dataset.k;
      if (fst.kinds.has(k)) fst.kinds.delete(k); else fst.kinds.add(k);
      if (!fst.kinds.size) count.forEach((_, kk) => fst.kinds.add(kk));
      drawFacilities();
      renderFacs();
    }));
    ui.facs.querySelectorAll("[data-key]").forEach((b) => b.addEventListener("click", () => selectFac(b.dataset.key, true)));
    ui.facs.querySelector('[data-act="unpick"]')?.addEventListener("click", () => { fst.sel = null; drawFacilities(); renderFacs(); });
  }

  // ---------- 검색 ----------
  async function search() {
    const q = ui.q.value.trim();
    if (q.length < 2 || !map) return;
    ui.results.hidden = false;
    ui.results.innerHTML = `<li class="fv-muted">찾는 중…</li>`;
    try {
      const { results } = await api({ op: "search", q });
      if (ui.q.value.trim() !== q) return;
      if (!results.length) { ui.results.innerHTML = `<li class="fv-muted">결과가 없습니다. 시군 이름을 함께 넣어 보세요.</li>`; return; }
      ui.results.innerHTML = results.map((r, i) => `
        <li><button type="button" data-i="${i}"><span class="fv-tag">${esc(r.kind)}</span><span class="fv-r-main">${esc(r.title)}</span>${r.sub ? `<span class="fv-r-sub">${esc(r.sub)}</span>` : ""}</button></li>`).join("");
      ui.results.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
        const r = results[+b.dataset.i];
        ui.results.hidden = true;
        const ll = L.latLng(r.ll[1], r.ll[0]);
        map.setView(ll, 18, { animate: map.getCenter().distanceTo(ll) < 15000 });
        inspect(ll, r.pnu);
      }));
    } catch (err) {
      ui.results.innerHTML = `<li class="fv-muted">${esc(err.message)}</li>`;
    }
  }

  // ---------- 보이기·숨기기 ----------
  function toggleHosts(on) {
    H.card.classList.toggle("sat-mode", on);
    H.bar.hidden = H.map.hidden = H.info.hidden = !on;
    if (H.expand) H.expand.hidden = !on;
  }

  async function show(hosts, { title, unit, key, geometry }) {
    if (!H) build(hosts);
    toggleHosts(true);
    if (!map) {
      hint("자세히 보기를 불러오는 중…");
      try {
        const cfg = await api({ op: "config" });
        if (!map) initMap(cfg.vworld);
        hint("");
      } catch (err) {
        hint(`자세히 보기를 열 수 없습니다: ${err.message}`, true);
        return;
      }
    }
    map.invalidateSize();
    if (st.region !== title) {
      if (st.region) clearAll();
      wideLine?.remove();
      wideLine = null;
      st.region = title;
      st.unit = unit;
      st.key = key;
      setRegion(geometry);
    }
  }

  function hide() {
    if (!H) return;
    if (st.full) setFull(false);
    ui.results.hidden = true;
    toggleHosts(false);
  }

  // 시도 전체 등 다른 범위로 넓혀 보기 (app.js의 '○○도 전체보기'), fitUnit은 시군으로 되돌린다
  // 넓힌 범위의 경계는 가는 점선으로만 그린다
  let wideLine = null;
  function fitTo(geometry) {
    if (!map) return;
    wideLine?.remove();
    wideLine = L.geoJSON(geometry, { style: { color: "#f5a524", weight: 1, opacity: 0.7, dashArray: "4 4", fill: false }, interactive: false }).addTo(map);
    fitBounds(wideLine.getBounds());
  }
  function fitUnit() {
    if (!map) return;
    wideLine?.remove();
    wideLine = null;
    fitRegion();
  }

  window.FarmView = { show, hide, fitTo, fitUnit };
})();
