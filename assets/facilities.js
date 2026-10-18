// 유통시설 지도: data/facilities.js(scripts/build_facilities.py)의 유통시설·6차산업 사업자·과수 생산단지·수출단지를 점으로 그린다.
// 색은 시설 종류, 채운 점은 건물 위치(도로명·지번·좌표·이름 검색), 속이 빈 원은 행정구역 중심.
// 같은 좌표에 놓인 시설은 한 점으로 묶고, 점을 누르면 왼쪽에 그 자리의 시설 정보가 나온다.
(() => {
  const D = window.AGRI_FACILITIES;
  const $ = (s) => document.querySelector(s);
  const nf = new Intl.NumberFormat("ko-KR");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  // 미곡처리장 · 산지유통센터 · 로컬푸드 직매장 · 6차산업 인증 사업자 · 과수 생산단지 · 수출전문농가단지 · 수출검역단지
  const COLORS = ["#f5a524", "#5fb37c", "#ff7ab6", "#6cb8ff", "#ff5d5d", "#c6e05a", "#b28dff"];
  const SIX = D.kinds.indexOf("6차산업 인증 사업자");
  const EXACT = new Set(["도로명", "지번", "좌표", "상호"]);
  const PREC_NOTE = {
    도로명: "도로명주소 위치", 지번: "지번주소 위치", 좌표: "자료에 적힌 위경도", 상호: "시설 이름 장소검색 위치",
    리: "마을(리) 중심", 읍면동: "읍면동 중심", 시군구: "시군구 중심", 시도: "시도 중심",
  };

  // 행: [종류, 경도, 위도, 정밀도, 이름, 도로명주소, 지번주소, 전화, {정보}]
  const rows = D.rows.map(([kind, lon, lat, prec, name, road, jibun, tel, info], i) => ({
    i, kind, lon, lat, prec: prec >= 0 ? D.precs[prec] : "", name, road, jibun, tel, info,
    hay: `${name} ${road} ${jibun} ${Object.values(info).join(" ")}`.toLowerCase(),
  }));
  rows.forEach((r) => { r.exact = EXACT.has(r.prec); r.key = r.lon == null ? null : `${r.lon},${r.lat}`; });

  const st = { kinds: new Set(D.kinds.map((_, i) => i)), q: "", sel: null };

  // ---------- 지도 ----------
  const map = L.map("map", { minZoom: 6, maxZoom: 19, maxBounds: [[31.5, 122.5], [39.8, 133]], maxBoundsViscosity: 0.8, zoomControl: false, preferCanvas: true });
  map.fitBounds([[33.1, 125.8], [38.6, 129.6]]);
  L.control.zoom({ position: "bottomright", zoomInTitle: "확대", zoomOutTitle: "축소" }).addTo(map);
  map.attributionControl.setPrefix(false).addAttribution("배경 VWorld");
  const renderer = L.canvas({ padding: 0.3, tolerance: 5 });
  const dots = L.layerGroup().addTo(map);
  let bases = null;

  fetch("/api/farmmap?op=config")
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error(`서버 응답 ${r.status}`))))
    .then(({ vworld }) => {
      const wmts = (layer, ext) => `https://api.vworld.kr/req/wmts/1.0.0/${vworld}/${layer}/{z}/{y}/{x}.${ext}`;
      const opt = { maxZoom: 19, maxNativeZoom: 19, keepBuffer: 3 };
      bases = {
        midnight: L.tileLayer(wmts("midnight", "png"), opt),
        sat: L.layerGroup([L.tileLayer(wmts("Satellite", "jpeg"), { ...opt, className: "pd-sat" }), L.tileLayer(wmts("Hybrid", "png"), opt)]),
      };
      setBase("midnight");
    })
    .catch(() => msg("배경 지도를 불러오지 못했습니다. 점은 그대로 볼 수 있습니다."));

  function setBase(b) {
    document.querySelectorAll("[data-base]").forEach((x) => x.setAttribute("aria-pressed", x.dataset.base === b));
    if (!bases) return;
    for (const [k, t] of Object.entries(bases)) (k === b ? t.addTo(map) : t.remove());
  }
  document.querySelectorAll("[data-base]").forEach((b) => b.addEventListener("click", () => setBase(b.dataset.base)));

  function msg(text) {
    const m = $("#msg");
    m.textContent = text;
    m.hidden = !text;
  }

  // 줌 7: 4px, 줌 12 이상: 7px. 같은 자리에 여럿이면 조금 크게
  function radius(n) {
    const t = Math.max(0, Math.min(1, (map.getZoom() - 7) / 5));
    return 4 + 3 * t + (n > 1 ? Math.min(4, Math.sqrt(n - 1) * 1.5) : 0);
  }
  map.on("zoomend", () => dots.eachLayer((m) => m.setRadius(radius(m.options.n))));

  const match = (r) => st.kinds.has(r.kind) && (!st.q || r.hay.includes(st.q));

  function draw() {
    const by = new Map();
    let n = 0, off = 0;
    for (const r of rows) {
      if (!match(r)) continue;
      n++;
      if (!r.key) { off++; continue; }
      (by.get(r.key) || by.set(r.key, []).get(r.key)).push(r);
    }
    dots.clearLayers();
    // 수가 많은 6차산업 사업자를 맨 아래, 그 위에 지역 중심(빈 원), 건물 위치를 가장 위에 그린다
    const layer = (r) => (r.kind === SIX ? 0 : 2) + r.exact;
    const groups = [...by.entries()].sort((a, b) => layer(a[1][0]) - layer(b[1][0]));
    for (const [key, list] of groups) {
      const r0 = list[0];
      const c = COLORS[r0.kind];
      const sel = key === st.sel;
      const m = L.circleMarker([r0.lat, r0.lon], {
        renderer, n: list.length, radius: radius(list.length),
        color: sel ? "#fff" : c, weight: sel ? 2.5 : r0.exact ? 1 : 1.8, opacity: 1,
        fillColor: c, fillOpacity: r0.exact ? 0.85 : 0.12, dashArray: r0.exact ? null : "3 2",
      });
      const label = list.length === 1 ? r0.name : `${r0.name} 외 ${list.length - 1}곳`;
      m.bindTooltip(`<b>${esc(label)}</b><br><span class="k" style="color:${c}">${esc(D.kinds[r0.kind])}</span> · ${esc(PREC_NOTE[r0.prec] || "")}`, { direction: "top", offset: [0, -4], className: "pd-tip" });
      m.on("click", () => select(key));
      m.addTo(dots);
    }
    st.byKey = by;
    $("#count").innerHTML = `<b>${nf.format(n)}</b>곳`;
    $("#note").textContent = `전체 ${nf.format(rows.length)}곳 중` + (off ? ` · 위치를 찾지 못한 ${nf.format(off)}곳은 지도에 없음` : "");
    if (st.sel != null) renderList();
  }

  // ---------- 시설 종류 ----------
  const kindCount = D.kinds.map((_, k) => rows.filter((r) => r.kind === k).length);
  const kindExact = D.kinds.map((_, k) => rows.filter((r) => r.kind === k && r.exact).length);
  $("#kinds").innerHTML = D.kinds.map((name, k) => `
    <button type="button" class="pd-kind" aria-pressed="true" data-k="${k}">
      <i style="background:${COLORS[k]}"></i>
      <span class="nm">${esc(name)}</span>
      <em>${nf.format(kindCount[k])}곳</em>
      <small>건물 위치 ${nf.format(kindExact[k])}${D.providers?.[k] ? ` · ${nf.format(D.providers[k])}개 지자체 자료` : ""}</small>
    </button>`).join("");
  $("#kinds").querySelectorAll(".pd-kind").forEach((b) => b.addEventListener("click", () => {
    const k = +b.dataset.k;
    if (st.kinds.has(k)) st.kinds.delete(k); else st.kinds.add(k);
    if (!st.kinds.size) D.kinds.forEach((_, i) => st.kinds.add(i));
    $("#kinds").querySelectorAll(".pd-kind").forEach((x) => x.setAttribute("aria-pressed", st.kinds.has(+x.dataset.k)));
    draw();
  }));

  $("#legend").innerHTML = D.kinds.map((name, k) => `<span><i style="background:${COLORS[k]}"></i>${esc(name)}</span>`).join("")
    + `<span class="ring"><i></i>지역 중심(주소가 읍면·시군까지)</span>`;

  // ---------- 검색 ----------
  let qTimer;
  const applyQ = () => {
    st.q = $("#q").value.trim().toLowerCase();
    draw();
    if (st.q && st.byKey.size && st.byKey.size <= 60) {
      const pts = [...st.byKey.values()].map((l) => [l[0].lat, l[0].lon]);
      map.fitBounds(pts, { maxZoom: 14, padding: [40, 40] });
    }
  };
  $("#q").addEventListener("input", () => { clearTimeout(qTimer); qTimer = setTimeout(applyQ, 250); });
  $("#search-form").addEventListener("submit", (e) => { e.preventDefault(); clearTimeout(qTimer); applyQ(); });

  // ---------- 시설 정보 ----------
  function select(key) {
    st.sel = key;
    draw();
    $("#list-box").hidden = false;
    if (window.matchMedia("(max-width: 900px)").matches) $("#list-box").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const fmtInfo = (k, v) => (/능력/.test(k) && /^\d+(\.\d+)?$/.test(v) ? `${nf.format(+v)}톤` : /^직원$/.test(k) && /^\d+$/.test(v) ? `${v}명` : v);

  function renderList() {
    const list = st.byKey.get(st.sel) || [];
    if (!list.length) { $("#list-box").hidden = true; return; }
    $("#list-title").textContent = list.length === 1 ? list[0].name : `${nf.format(list.length)}곳`;
    $("#list").innerHTML = list.map((r) => `
      <li>
        <div class="hd">${list.length > 1 ? `<b>${esc(r.name)}</b>` : ""}<span class="kd" style="--c:${COLORS[r.kind]}">${esc(D.kinds[r.kind])}</span></div>
        <dl>
          ${r.road ? `<dt>주소</dt><dd>${esc(r.road)}</dd>` : ""}
          ${r.jibun ? `<dt>${r.road ? "지번" : "주소"}</dt><dd>${esc(r.jibun)}</dd>` : ""}
          ${r.tel ? `<dt>전화</dt><dd>${esc(r.tel)}</dd>` : ""}
          ${Object.entries(r.info).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(fmtInfo(k, v))}</dd>`).join("")}
          <dt>위치</dt><dd class="pr${r.exact ? "" : " warn"}">${esc(PREC_NOTE[r.prec] || "")}</dd>
        </dl>
      </li>`).join("");
  }
  $("#list-close").addEventListener("click", () => { st.sel = null; $("#list-box").hidden = true; draw(); });

  $("#built").textContent = D.built ? ` · ${D.built} 작성` : "";
  draw();
})();
