// 생산자 지도: data/producers.js(scripts/build_farms.py)의 생산자를 같은 좌표끼리 묶어 점으로 그린다.
// 점 크기는 묶인 생산자 수, 색은 위치 정확도. 점을 누르면 왼쪽에 그 자리의 생산자 목록이 나온다.
(() => {
  const D = window.AT_PRODUCERS;
  const $ = (s) => document.querySelector(s);
  const nf = new Intl.NumberFormat("ko-KR");
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const DETAIL = "https://www.atfis.or.kr/home/producer.do?act=detail&id=";

  // 위치 정확도 묶음 (prec 이름 → 묶음)
  const GROUPS = [
    { key: "exact", label: "지번·도로명·상호", color: "#f5a524", precs: ["지번", "도로명", "상호"], desc: "건물·필지 수준" },
    { key: "town", label: "리·읍면동", color: "#5fb37c", precs: ["리", "읍면동"], desc: "마을·읍면 중심" },
    { key: "county", label: "시군구·시도", color: "#4ea1ff", precs: ["시군구", "시도"], desc: "시군 중심" },
  ];
  const groupOfPrec = {};
  GROUPS.forEach((g, i) => g.precs.forEach((p) => { groupOfPrec[p] = i; }));

  // 행: [위치, 유형, 이름, 품목, 주소, 전화, id]
  const rows = D.rows.map((r, i) => ({
    i, loc: r[0], type: r[1], name: r[2], item: r[3], addr: r[4], tel: r[5], id: r[6],
    hay: `${r[2]} ${r[4]} ${D.items[r[3]]}`.toLowerCase(),
  }));
  const locs = D.locs.map(([lon, lat, prec, ref]) => ({ lon, lat, prec, ref, g: groupOfPrec[D.precs[prec]] }));
  const unplaced = rows.filter((r) => r.loc < 0).length;

  const st = { types: new Set(D.types.map((_, i) => i)), groups: new Set(GROUPS.map((_, i) => i)), item: -1, q: "", sel: null, shown: 0 };

  // ---------- 지도 ----------
  const map = L.map("map", { minZoom: 6, maxZoom: 19, maxBounds: [[31.5, 122.5], [39.8, 133]], maxBoundsViscosity: 0.8, zoomControl: false, preferCanvas: true });
  map.fitBounds([[33.1, 125.8], [38.6, 129.6]]);
  L.control.zoom({ position: "bottomright", zoomInTitle: "확대", zoomOutTitle: "축소" }).addTo(map);
  map.attributionControl.setPrefix(false).addAttribution("배경 VWorld · 자료 aT 식품산업통계정보");
  const renderer = L.canvas({ padding: 0.3, tolerance: 4 });
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

  // ---------- 거르기 ----------
  function match(r) {
    if (!st.types.has(r.type)) return false;
    if (st.item >= 0 && r.item !== st.item) return false;
    if (st.q && !r.hay.includes(st.q)) return false;
    return true;
  }

  // 멀리서 볼 때는 점을 작게 해서 겹침을 줄인다 (줌 7: 낱개 2px, 줌 11 이상: 4.5px)
  function radius(n) {
    const t = Math.max(0, Math.min(1, (map.getZoom() - 7) / 4));
    return Math.min(14 + 16 * t, 2 + 2.5 * t + Math.sqrt(n) * (0.9 + 0.7 * t));
  }
  map.on("zoomend", () => dots.eachLayer((m) => m.setRadius(radius(m.options.n))));

  function draw() {
    const by = new Map();
    let n = 0, nUnplaced = 0;
    for (const r of rows) {
      if (!match(r)) continue;
      if (r.loc < 0) { nUnplaced++; continue; }
      if (!st.groups.has(locs[r.loc].g)) continue;
      n++;
      (by.get(r.loc) || by.set(r.loc, []).get(r.loc)).push(r);
    }
    dots.clearLayers();
    // 큰 점을 먼저 그려 작은 점이 위에 오게 한다
    const entries = [...by.entries()].sort((a, b) => b[1].length - a[1].length);
    for (const [li, list] of entries) {
      const l = locs[li];
      const c = GROUPS[l.g].color;
      const m = L.circleMarker([l.lat, l.lon], {
        renderer, n: list.length, radius: radius(list.length), color: li === st.sel ? "#fff" : c, weight: li === st.sel ? 2.5 : 1,
        opacity: 0.95, fillColor: c, fillOpacity: list.length > 1 ? 0.45 : 0.8,
      });
      m.bindTooltip(`<b>${esc(list.length === 1 ? list[0].name : `${nf.format(list.length)}건`)}</b><br>${esc(l.ref)}`, { direction: "top", offset: [0, -4], className: "pd-tip" });
      m.on("click", () => select(li));
      m.addTo(dots);
    }
    st.byLoc = by;
    st.shown = n;
    $("#count").innerHTML = `<b>${nf.format(n)}</b>건 <span>· ${nf.format(by.size)}곳</span>`;
    $("#note").textContent = `전체 ${nf.format(rows.length)}건 중` + (nUnplaced ? ` · 위치를 찾지 못한 ${nf.format(nUnplaced)}건은 지도에 없음` : "");
    if (st.sel != null) renderList();
  }

  // 칩 묶음: keys는 화면 순서대로의 키. 모두 켜져 있을 때 누르면 그것만 남기고, 마지막 하나를 끄면 다시 모두 켠다
  function chips(host, set, keys, label, count, color) {
    host.innerHTML = keys.map((k) => `<button type="button" class="pd-chip" aria-pressed="true">${color ? `<i style="background:${color(k)}"></i>` : ""}<span>${esc(label(k))}</span><em>${nf.format(count[k])}</em></button>`).join("");
    host.querySelectorAll(".pd-chip").forEach((b, pos) => b.addEventListener("click", () => {
      const k = keys[pos];
      if (set.size === keys.length) { set.clear(); set.add(k); } else if (set.has(k)) set.delete(k); else set.add(k);
      if (!set.size) keys.forEach((x) => set.add(x));
      host.querySelectorAll(".pd-chip").forEach((x, p) => x.setAttribute("aria-pressed", set.has(keys[p])));
      draw();
    }));
  }

  const typeCount = D.types.map(() => 0);
  const groupCount = GROUPS.map(() => 0);
  const itemCount = D.items.map(() => 0);
  rows.forEach((r) => {
    typeCount[r.type]++;
    itemCount[r.item]++;
    if (r.loc >= 0) groupCount[locs[r.loc].g]++;
  });
  chips($("#types"), st.types, D.types.map((_, i) => i).sort((a, b) => typeCount[b] - typeCount[a]), (i) => D.types[i], typeCount);
  chips($("#precs"), st.groups, GROUPS.map((_, i) => i), (i) => GROUPS[i].label, groupCount, (i) => GROUPS[i].color);

  // 범례
  $("#legend").innerHTML = GROUPS.map((g) => `<span><i style="background:${g.color}"></i>${esc(g.desc)}</span>`).join("")
    + `<span class="sz"><i></i><i></i><i></i>생산자 수</span>`;

  // 품목
  const itemOrder = D.items.map((_, i) => i).sort((a, b) => itemCount[b] - itemCount[a]);
  $("#item-list").innerHTML = itemOrder.map((i) => `<option value="${esc(D.items[i])}">${nf.format(itemCount[i])}건</option>`).join("");
  const itemIndex = new Map(D.items.map((t, i) => [t, i]));
  function setItem(i) {
    st.item = i;
    $("#item").value = i >= 0 ? D.items[i] : "";
    $("#item-clear").hidden = i < 0;
    $("#top-items").querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.i === i));
    draw();
  }
  $("#top-items").innerHTML = itemOrder.slice(0, 12).map((i) => `<button type="button" data-i="${i}" aria-pressed="false">${esc(D.items[i])}</button>`).join("");
  $("#top-items").querySelectorAll("button").forEach((b) => b.addEventListener("click", () => setItem(st.item === +b.dataset.i ? -1 : +b.dataset.i)));
  $("#item").addEventListener("change", (e) => {
    const v = e.target.value.trim();
    setItem(itemIndex.has(v) ? itemIndex.get(v) : -1);
  });
  $("#item-clear").addEventListener("click", () => setItem(-1));

  // 검색
  let qTimer;
  $("#q").addEventListener("input", (e) => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => { st.q = e.target.value.trim().toLowerCase(); draw(); fitShown(); }, 250);
  });
  $("#search-form").addEventListener("submit", (e) => { e.preventDefault(); clearTimeout(qTimer); st.q = $("#q").value.trim().toLowerCase(); draw(); fitShown(); });

  function fitShown() {
    if (!st.q || !st.byLoc.size || st.byLoc.size > 400) return;
    const pts = [...st.byLoc.keys()].map((li) => [locs[li].lat, locs[li].lon]);
    map.fitBounds(pts, { maxZoom: 14, padding: [40, 40] });
  }

  // ---------- 목록 ----------
  const PAGE = 60;
  let listLimit = PAGE;

  function select(li) {
    st.sel = li;
    listLimit = PAGE;
    draw();
    $("#list-box").hidden = false;
    if (window.matchMedia("(max-width: 900px)").matches) $("#list-box").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function renderList() {
    const l = locs[st.sel];
    const list = st.byLoc.get(st.sel) || [];
    $("#list-title").textContent = `${nf.format(list.length)}건`;
    $("#list-ref").innerHTML = `<i style="background:${GROUPS[l.g].color}"></i>${esc(l.ref)} <span>(${esc(D.precs[l.prec])} 기준)</span>`;
    $("#list").innerHTML = list.slice(0, listLimit).map((r) => `
      <li>
        <a href="${DETAIL}${encodeURIComponent(r.id)}" target="_blank" rel="noopener">${esc(r.name)}</a>
        <span class="t">${esc(D.types[r.type])}</span>
        <div class="m">${esc(D.items[r.item])}${r.tel && r.tel !== "-" ? ` · ${esc(r.tel)}` : ""}</div>
        <div class="a">${esc(r.addr || "주소 없음")}</div>
      </li>`).join("");
    const more = $("#list-more");
    more.hidden = list.length <= listLimit;
    more.textContent = `${nf.format(Math.min(PAGE, list.length - listLimit))}건 더 보기`;
  }
  $("#list-more").addEventListener("click", () => { listLimit += PAGE; renderList(); });
  $("#list-close").addEventListener("click", () => { st.sel = null; $("#list-box").hidden = true; draw(); });

  $("#built").textContent = D.built ? ` · ${D.built} 작성` : "";
  draw();
})();
