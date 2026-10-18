// 농경지 위성지도: VWorld 항공영상 위에 팜맵 필지를 그린다.
// 시군 화면에서 버튼을 처음 누를 때만 Leaflet과 함께 불러온다 (app.js의 loadFarm).
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

  let root, map, bases, labels, regionLayer, parcelLayer, marker, circle;
  const ui = {};
  const drawn = new Map(); // 팜맵 ID → 그려 둔 필지 레이어
  const st = { base: "sat", labels: true, radius: 500, nearAt: null, seq: 0, nearSeq: 0, region: null, opener: null, tileErrors: 0, tileLoads: 0 };

  function busy(d) {
    pending += d;
    root?.classList.toggle("fv-busy", pending > 0);
  }

  const ICON = {
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  };

  function build() {
    root = document.createElement("div");
    root.className = "fv";
    root.hidden = true;
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-labelledby", "fv-title");
    root.innerHTML = `
      <div class="fv-box">
        <header class="fv-bar">
          <h2 id="fv-title"><span data-ui="region"></span> <span class="fv-sub">농경지 위성지도</span></h2>
          <form class="fv-search" role="search" data-ui="form">
            <input type="search" data-ui="q" placeholder="주소·지번·장소 검색" aria-label="주소, 지번, 장소 검색" autocomplete="off" enterkeyhint="search">
            <button type="submit" aria-label="검색">${ICON.search}</button>
            <ul class="fv-results" data-ui="results" hidden></ul>
          </form>
          <div class="fv-tools">
            <span class="seg" role="group" aria-label="배경 지도">
              <button type="button" data-base="sat" aria-pressed="true">위성</button><button type="button" data-base="map" aria-pressed="false">지도</button>
            </span>
            <label class="fv-check"><input type="checkbox" data-ui="labels" checked> 지명</label>
            <button type="button" class="fv-close" data-ui="close" aria-label="위성지도 닫기">${ICON.close}</button>
          </div>
        </header>
        <div class="fv-body">
          <div class="fv-map" data-ui="map"></div>
          <div class="fv-progress" aria-hidden="true"></div>
          <p class="fv-hint" data-ui="hint" aria-live="polite"></p>
          <aside class="fv-panel" data-ui="panel" hidden aria-label="필지 정보">
            <section class="fv-sec" data-ui="parcel"></section>
            <section class="fv-sec" data-ui="near"></section>
          </aside>
          <ul class="fv-legend" aria-label="팜맵 판독 분류">${KINDS.map((k) => `<li><i style="--c:${KIND_COLOR[k]}"></i>${k}</li>`).join("")}</ul>
        </div>
      </div>`;
    document.body.append(root);
    root.querySelectorAll("[data-ui]").forEach((el) => { ui[el.dataset.ui] = el; });

    ui.close.addEventListener("click", close);
    root.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      if (!ui.results.hidden) { ui.results.hidden = true; ui.q.focus(); return; }
      close();
    });
    root.querySelectorAll("[data-base]").forEach((b) => b.addEventListener("click", () => setBase(b.dataset.base)));
    ui.labels.addEventListener("change", () => { st.labels = ui.labels.checked; syncLayers(); });
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
  }

  function initMap(key) {
    const wmts = (layer, ext) => `https://api.vworld.kr/req/wmts/1.0.0/${key}/${layer}/{z}/{y}/{x}.${ext}`;
    const opt = { minZoom: 7, maxZoom: 20, maxNativeZoom: 19, keepBuffer: 3 };
    bases = {
      sat: L.tileLayer(wmts("Satellite", "jpeg"), opt),
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
    map.attributionControl.setPrefix(false).addAttribution("영상: VWorld(국토교통부) · 필지: 팜맵(농림수산식품교육문화정보원)");
    // 인증키의 서비스 URL이 맞지 않으면 타일이 모두 실패한다 (바다 등 일부 실패는 정상)
    Object.values(bases).forEach((t) => t
      .on("tileload", () => { st.tileLoads++; })
      .on("tileerror", () => {
        if (++st.tileErrors >= 6 && !st.tileLoads) hint("VWorld 영상을 불러오지 못했습니다. 인증키에 등록한 서비스 URL을 확인해 주세요.", true);
      }));
    regionLayer = L.layerGroup().addTo(map);
    parcelLayer = L.featureGroup().addTo(map);
    marker = L.circleMarker([0, 0], { radius: 5, color: "#fff", weight: 2, fillColor: "#f5a524", fillOpacity: 1, interactive: false });
    circle = L.circle([0, 0], { radius: 500, color: "#fff", weight: 1.5, opacity: 0.8, dashArray: "6 6", fill: false, interactive: false });
    syncLayers();
    map.on("click", (e) => {
      if (map.getZoom() < QUERY_ZOOM) { map.setView(e.latlng, Math.min(17, Math.max(QUERY_ZOOM + 1, map.getZoom() + 3))); return; }
      inspect(e.latlng);
    });
    map.on("zoomend", syncHint);
  }

  function setBase(b) {
    st.base = b;
    root.querySelectorAll("[data-base]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.base === b));
    syncLayers();
  }

  function syncLayers() {
    for (const [k, t] of Object.entries(bases)) (k === st.base ? t.addTo(map) : t.remove());
    // 일반 지도에는 지명이 이미 있으므로 위성일 때만 지명 층을 얹는다
    const showLabels = st.base === "sat" && st.labels;
    if (showLabels) labels.addTo(map); else labels.remove();
    ui.labels.disabled = st.base !== "sat";
  }

  // ---------- 시군 경계 ----------
  function setRegion(geometry) {
    regionLayer.clearLayers();
    const polys = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
    const flip = (ring) => ring.map(([x, y]) => [y, x]);
    // 시군 밖은 어둡게 덮는다 (바깥 고리를 구멍으로)
    L.polygon([[[30, 118], [30, 136], [44, 136], [44, 118]], ...polys.map((p) => flip(p[0]))], {
      stroke: false, fillColor: "#0b0c0f", fillOpacity: 0.5, interactive: false,
    }).addTo(regionLayer);
    const outline = L.polygon(polys.map((p) => p.map(flip)), { color: "#f5a524", weight: 2, fill: false, interactive: false }).addTo(regionLayer);
    map.fitBounds(outline.getBounds(), { padding: [24, 24], animate: false });
  }

  // ---------- 안내 ----------
  function hint(text, warn = false) {
    ui.hint.textContent = text;
    ui.hint.hidden = !text;
    ui.hint.classList.toggle("warn", warn);
  }

  function syncHint() {
    if (ui.hint.classList.contains("warn")) return;
    if (map.getZoom() < QUERY_ZOOM) hint("지도를 누르거나 확대하면 필지를 고를 수 있습니다");
    else if (!drawn.size) hint("논·밭·하우스를 누르면 팜맵 필지 정보가 나옵니다");
    else hint("");
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
    showPanel();
    ui.parcel.innerHTML = `<p class="fv-loading">필지를 찾는 중…</p>`;
    loadNear(ll);
    const lat = ll.lat.toFixed(6), lon = ll.lng.toFixed(6);
    try {
      let { features } = await (pnu ? api({ op: "pnu", pnu }) : api({ op: "point", lat, lon }));
      // 검색한 지번에 걸친 팜맵 필지가 없으면 그 지점의 필지를 찾는다
      if (pnu && !features.length) ({ features } = await api({ op: "point", lat, lon }));
      if (my !== st.seq) return;
      drawParcels(features);
      select(features);
      syncHint();
    } catch (err) {
      if (my === st.seq) ui.parcel.innerHTML = `<p class="fv-error">${esc(err.message)}</p>`;
    }
  }

  const area = (m2) => `<b>${nf.format(m2)}</b>㎡ <span>${nf.format(Math.round(m2 / 3.3058))}평 · ${nf1.format(m2 / 10000)}ha</span>`;

  function parcelCard(p) {
    const changed = p.change && p.change !== "유지";
    return `
      <article class="fv-parcel">
        <div class="fv-p-head"><span class="fv-kind" style="--c:${colorOf(p.kind)}">${esc(p.kind || "기타")}</span><h3>${esc(p.emd)} ${esc(p.lnm)}</h3></div>
        <p class="fv-area">${area(p.area)}</p>
        <dl>
          <div><dt>판독 영상</dt><dd>${esc(p.image)}${p.date ? ` · ${esc(p.date)}` : ""}</dd></div>
          <div><dt>변경 구분</dt><dd${changed ? ' class="fv-changed"' : ""}>${esc(p.change || "–")}${p.history ? ` <span>(갱신 ${esc(p.history)})</span>` : ""}</dd></div>
          <div><dt>지번코드</dt><dd class="fv-mono">${esc(p.pnu)}</dd></div>
          <div><dt>팜맵 ID</dt><dd class="fv-mono">${esc(p.id)}</dd></div>
        </dl>
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
    ui.parcel.innerHTML = `${head}${body}<p class="fv-note">팜맵은 영상 판독으로 구획한 참고 자료로, 지적도의 법적 경계와 다를 수 있습니다.</p>`;
    ui.parcel.querySelector('[data-act="clear"]').addEventListener("click", clearAll);
  }

  function clearAll() {
    st.seq++;
    st.nearSeq++;
    parcelLayer.clearLayers();
    drawn.clear();
    marker.remove();
    circle.remove();
    st.nearAt = null;
    ui.panel.hidden = true;
    syncHint();
  }

  function showPanel() {
    ui.panel.hidden = false;
    hint("");
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
        <p class="fv-total"><b>${nf.format(d.total)}</b>개 필지 <span>반경 ${d.radius === 1000 ? "1km" : "500m"}</span></p>
        <div class="fv-bars">${rows}</div>
        <p class="fv-note">필지 개수 기준(면적 아님)${d.counted < d.total ? ` · 앞 ${nf.format(d.counted)}개만 집계` : ""} · 지난 판독 이후 바뀐 필지 ${nf.format(d.changed)}개${emd ? ` · ${esc(emd)}` : ""}</p>`;
    }
    ui.near.innerHTML = `<div class="fv-sec-head"><h3>주변 농경지</h3>${seg}</div>${body}`;
    ui.near.querySelectorAll("[data-r]").forEach((b) => b.addEventListener("click", () => {
      st.radius = +b.dataset.r;
      if (st.nearAt) loadNear(st.nearAt);
    }));
  }

  // ---------- 검색 ----------
  async function search() {
    const q = ui.q.value.trim();
    if (q.length < 2) return;
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
        // 좁은 화면에서는 아래 정보 시트에 가리지 않게 찾은 곳을 위쪽에 둔다
        const narrow = ui.map.clientWidth <= 760;
        map.setView(ll, 18, { animate: !narrow && map.getCenter().distanceTo(ll) < 15000 });
        if (narrow) map.panBy([0, ui.map.clientHeight * 0.22], { animate: false });
        inspect(ll, r.pnu);
      }));
    } catch (err) {
      ui.results.innerHTML = `<li class="fv-muted">${esc(err.message)}</li>`;
    }
  }

  // ---------- 열기·닫기 ----------
  async function open({ title, geometry, opener }) {
    if (!root) build();
    st.opener = opener || document.activeElement;
    ui.region.textContent = title;
    root.hidden = false;
    document.documentElement.classList.add("fv-open");
    ui.close.focus();
    if (!map) {
      hint("위성지도를 불러오는 중…");
      try {
        const cfg = await api({ op: "config" });
        initMap(cfg.vworld);
      } catch (err) {
        hint(`위성지도를 열 수 없습니다: ${err.message}`, true);
        return;
      }
    }
    map.invalidateSize();
    if (st.region !== title) {
      if (st.region) clearAll();
      st.region = title;
      setRegion(geometry);
    }
    syncHint();
  }

  function close() {
    root.hidden = true;
    document.documentElement.classList.remove("fv-open");
    st.opener?.focus();
  }

  window.FarmView = { open, close };
})();
