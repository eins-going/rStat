// 자세히 보기: 가운데 지도 카드 안에서 VWorld 항공영상 위에 팜맵 필지와 그 시군의 유통시설(data/facilities.js)을 그린다.
// 시군에서 '자세히 보기'를 처음 고를 때만 Leaflet·시설 자료와 함께 불러온다 (app.js의 loadFarm·setView).
(() => {
  const API = "/api/farmmap";
  const KIND_COLOR = { 논: "#5cc8ff", 밭: "#ffd23f", 과수: "#ff7ab6", 시설: "#ff6a5c" };
  const OTHER = "#e8e8e8";
  const KINDS = Object.keys(KIND_COLOR);
  const QUERY_ZOOM = 15; // 이보다 멀리서 누르면 필지를 묻지 않고 그 지점으로 확대한다
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
  let map, bases, labels, regionLayer, mask, parcelLayer, marker, circle, facLayer;
  const ui = {};
  const drawn = new Map(); // 팜맵 ID → 그려 둔 필지 레이어
  const st = { base: "sat", labels: true, radius: 500, nearAt: null, seq: 0, nearSeq: 0, region: null, full: false, tileErrors: 0, tileLoads: 0 };

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
      <label class="fv-check"><input type="checkbox" data-ui="labels" checked> 지명</label>
      <button type="button" class="fv-expand" data-ui="expand" aria-pressed="false" aria-label="크게 보기" title="크게 보기">${ICON.expand}</button>`;
    H.map.innerHTML = `
      <div class="fv-map" data-ui="map"></div>
      <div class="fv-progress" aria-hidden="true"></div>
      <p class="fv-hint" data-ui="hint" aria-live="polite" hidden></p>
      <ul class="fv-legend" aria-label="팜맵 판독 분류"><li class="fv-lg-h">필지</li>${KINDS.map((k) => `<li><i style="--c:${KIND_COLOR[k]}"></i>${k}</li>`).join("")}</ul>`;
    H.info.innerHTML = `
      <section class="fv-sec" data-ui="facs" aria-label="유통시설"></section>
      <section class="fv-sec" data-ui="parcel" aria-label="필지 정보"></section>
      <section class="fv-sec" data-ui="near" aria-label="주변 농경지"></section>`;
    for (const el of [H.bar, H.map, H.info]) el.querySelectorAll("[data-ui]").forEach((x) => { ui[x.dataset.ui] = x; });

    H.bar.querySelectorAll("[data-base]").forEach((b) => b.addEventListener("click", () => setBase(b.dataset.base)));
    ui.labels.addEventListener("change", () => { st.labels = ui.labels.checked; syncLayers(); });
    ui.expand.addEventListener("click", () => setFull(!st.full));
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
    const wmts = (layer, ext) => `https://api.vworld.kr/req/wmts/1.0.0/${key}/${layer}/{z}/{y}/{x}.${ext}`;
    const opt = { minZoom: 7, maxZoom: 20, maxNativeZoom: 19, keepBuffer: 3 };
    bases = {
      sat: L.tileLayer(wmts("Satellite", "jpeg"), { ...opt, className: "fv-sat" }),
      map: L.tileLayer(wmts("Base", "png"), opt),
    };
    labels = L.tileLayer(wmts("Hybrid", "png"), opt);
    map = L.map(ui.map, {
      minZoom: 7,
      maxZoom: 20,
      maxBounds: [[32, 123], [39.6, 132.5]],
      maxBoundsViscosity: 0.8,
      zoomControl: false,
    });
    L.control.zoom({ position: "bottomright", zoomInTitle: "확대", zoomOutTitle: "축소" }).addTo(map);
    map.attributionControl.setPrefix(false).addAttribution("영상 VWorld · 필지 팜맵(농정원) · 시설 공공데이터 외");
    // 인증키의 서비스 URL이 맞지 않으면 타일이 모두 실패한다 (바다 등 일부 실패는 정상)
    Object.values(bases).forEach((t) => t
      .on("tileload", () => { st.tileLoads++; })
      .on("tileerror", () => {
        if (++st.tileErrors >= 6 && !st.tileLoads) hint("VWorld 영상을 불러오지 못했습니다. 인증키에 등록한 서비스 URL을 확인해 주세요.", true);
      }));
    regionLayer = L.layerGroup().addTo(map);
    parcelLayer = L.featureGroup().addTo(map);
    map.createPane("fv-facs").style.zIndex = 450; // 필지(400) 위, 툴팁 아래
    facLayer = L.layerGroup().addTo(map);
    marker = L.circleMarker([0, 0], { radius: 5, color: "#fff", weight: 2, fillColor: "#f5a524", fillOpacity: 1, interactive: false });
    circle = L.circle([0, 0], { radius: 500, color: "#fff", weight: 1.5, opacity: 0.8, dashArray: "6 6", fill: false, interactive: false });
    syncLayers();
    syncDragging();
    map.on("click", (e) => {
      if (map.getZoom() < QUERY_ZOOM) { map.setView(e.latlng, Math.min(17, Math.max(QUERY_ZOOM + 1, map.getZoom() + 3))); return; }
      inspect(e.latlng);
    });
    map.on("zoomend", () => { syncMask(); if (!drawn.size && !st.nearAt) idle(); });
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
    ui.expand.setAttribute("aria-pressed", on);
    ui.expand.setAttribute("aria-label", on ? "작게 보기" : "크게 보기");
    ui.expand.title = on ? "작게 보기 (Esc)" : "크게 보기";
    ui.expand.innerHTML = on ? ICON.shrink : ICON.expand;
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
    map.fitBounds(outline.getBounds(), { padding: [16, 16], animate: false });
    syncMask();
    setFacilities(geometry, st.unit);
  }

  // 필지를 볼 만큼 확대하면 덮개를 걷는다 (2013년 경계라 실제 경계와 어긋나는 곳이 있다)
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
      <p class="fv-empty"><b>${far ? "지도를 누르거나 확대해 농경지를 찾아보세요" : "논·밭·하우스를 누르면 필지 정보가 나옵니다"}</b>위쪽 검색창에서 주소·지번으로 바로 찾을 수도 있습니다.${coarse.matches ? " 카드 안에서는 두 손가락으로 지도를 움직입니다." : ""}</p>`;
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
        select([f]);
        loadNear(e.latlng);
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

  function select(features) {
    highlight(features.map((f) => f.properties.id));
    renderParcels(features);
  }

  async function inspect(ll, pnu = "") {
    const my = ++st.seq;
    marker.setLatLng(ll).addTo(map);
    ui.parcel.innerHTML = `<div class="fv-sec-head"><h3>팜맵 필지</h3></div><p class="fv-loading">필지를 찾는 중…</p>`;
    loadNear(ll);
    const lat = ll.lat.toFixed(6), lon = ll.lng.toFixed(6);
    try {
      let { features } = await (pnu ? api({ op: "pnu", pnu }) : api({ op: "point", lat, lon }));
      // 검색한 지번에 걸친 팜맵 필지가 없으면 그 지점의 필지를 찾는다
      if (pnu && !features.length) ({ features } = await api({ op: "point", lat, lon }));
      if (my !== st.seq) return;
      drawParcels(features);
      select(features);
    } catch (err) {
      if (my === st.seq) ui.parcel.innerHTML = `<div class="fv-sec-head"><h3>팜맵 필지</h3></div><p class="fv-error">${esc(err.message)}</p>`;
    }
  }

  const nf2 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 2 });
  const ha = (m2) => (m2 < 10000 ? nf2 : nf1).format(m2 / 10000);
  const area = (m2) => `<b>${nf.format(m2)}</b>㎡ <span>${nf.format(Math.round(m2 / 3.3058))}평 · ${ha(m2)}ha</span>`;

  // 분류·지번·면적만 보여 준다 (판독 영상·변경 구분·지번코드·팜맵 ID는 싣지 않는다)
  function parcelCard(p) {
    return `
      <article class="fv-parcel">
        <div class="fv-p-head"><span class="fv-kind" style="--c:${colorOf(p.kind)}">${esc(p.kind || "기타")}</span><h4>${esc(p.emd)} ${esc(p.lnm)}</h4></div>
        <p class="fv-area">${area(p.area)}</p>
      </article>`;
  }

  function renderParcels(features) {
    const head = `<div class="fv-sec-head"><h3>팜맵 필지</h3><button type="button" class="fv-link" data-act="clear">지우기</button></div>`;
    let body;
    if (!features.length) {
      body = `<p class="fv-empty"><b>팜맵 농경지가 아닙니다</b>이 지점은 팜맵에 농경지로 구획되어 있지 않습니다. 논·밭·하우스를 눌러 보세요.</p>`;
    } else if (features.length === 1) {
      body = parcelCard(features[0].properties);
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
    parcelLayer?.clearLayers();
    drawn.clear();
    marker?.remove();
    circle?.remove();
    st.nearAt = null;
    idle();
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
    let body;
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
      body = `
        <p class="fv-total"><b>${nf.format(d.total)}</b>개 필지 <span>반경 ${d.radius === 1000 ? "1km" : "500m"}${emd ? ` · ${esc(emd)}` : ""}</span></p>
        <div class="fv-bars">${rows}</div>
        <p class="fv-note">필지 개수 기준(면적 아님)${d.counted < d.total ? ` · 앞 ${nf.format(d.counted)}개만 집계` : ""} · 지난 판독 이후 바뀐 필지 ${nf.format(d.changed)}개</p>`;
    }
    ui.near.innerHTML = `<div class="fv-sec-head"><h3>주변 농경지</h3>${seg}</div>${body}`;
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

  // 경계는 2013년 것을 단순화해 시군 끝자락의 시설이 밖으로 빠지거나 이웃 시군 시설이 들어온다.
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
    ui.facs.innerHTML = `${head}<div class="fv-fchips" role="group" aria-label="시설 종류">${chips}</div>${card}
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
  }

  async function show(hosts, { title, unit, geometry }) {
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
      st.region = title;
      st.unit = unit;
      setRegion(geometry);
    }
  }

  function hide() {
    if (!H) return;
    if (st.full) setFull(false);
    ui.results.hidden = true;
    toggleHosts(false);
  }

  window.FarmView = { show, hide };
})();
