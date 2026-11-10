// 자료 내려받기: 화면마다 window.RSTAT_EXPORT에 내려받을 자료를 적어 두면, 바닥글 '자료 내려받기'가 이 창을 연다.
// 주소 끝 #download 로도 바로 연다. CSV = 모든 연도 한 파일(긴 형식), 엑셀 = 연도별 시트 + 설명 시트.
//
// window.RSTAT_EXPORT = {
//   sets: [{
//     id: "farm",                         // 파일 이름에 쓰는 짧은 영문
//     name: "농가·농가인구",               // 목록에 보이는 이름
//     src: "국가데이터처 농림어업조사",     // 출처
//     note: "광역시 구는 '시부'로 묶음",    // (선택) 짧은 주의
//     years: ["2015", …] | null,          // 시트를 나눌 시점(연도·월·반기). null이면 시트 하나
//     cols: ["농가(가구)", "농가인구(명)"],  // 값 열 이름(단위 포함)
//     rows: (year) => [["전국", "", 1, 2], ["경기도", "", …], ["경기도", "수원시", …]],  // 앞 두 칸은 시도·시군구
//   }],
// };
// 지역 줄은 RSTAT_REGIONS()로 만들 수 있다: [{ key: "00"|"31"|"31|수원시", sido: "경기도", sgg: "수원시" }]
(() => {
  // ---------- 지역 목록 (geo.js의 AGRI_TOPO) ----------
  const ORDER = ["31", "32", "33", "34", "35", "36", "37", "38", "39", "11", "21", "22", "23", "24", "25", "26", "29"];
  window.RSTAT_REGIONS = (opt = {}) => {
    const T = window.AGRI_TOPO;
    if (!T) return [];
    const codes = [...ORDER.filter((c) => T.sidos[c]), ...Object.keys(T.sidos).filter((c) => !ORDER.includes(c)).sort()];
    const units = {};
    for (const g of T.objects.municipalities.geometries) {
      const l = (units[g.properties.sido] ||= []);
      if (!l.includes(g.properties.unit)) l.push(g.properties.unit);
    }
    const rank = (n) => (n.endsWith("시부") ? 0 : n.endsWith("시") ? 1 : n.endsWith("구") ? 2 : 3);
    const out = opt.nation === false ? [] : [{ key: "00", sido: "전국", sgg: "" }];
    for (const c of codes) {
      if (opt.sido !== false) out.push({ key: c, sido: T.sidos[c].name, sgg: "" });
      if (opt.sgg !== false) for (const u of (units[c] || []).sort((a, b) => rank(a) - rank(b) || a.localeCompare(b, "ko"))) out.push({ key: `${c}|${u}`, sido: T.sidos[c].name, sgg: u });
    }
    return out;
  };

  const PAGE = (location.pathname.split("/").pop() || "index").replace(/\.html$/, "") || "index";
  const TITLE = document.querySelector('.tabs [aria-current="page"]')?.textContent.trim() || (document.title || "").split("|")[0].trim() || "지역농업 현황판";
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const clean = (v) => (v == null || (typeof v === "number" && !Number.isFinite(v)) ? "" : v);

  // ---------- 파일 만들기 ----------
  const csvCell = (v) => { v = clean(v); const s = String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  function toCSV(set) {
    const head = [...(set.years ? ["시점"] : []), "시도", "시군구", ...set.cols];
    const lines = [head.map(csvCell).join(",")];
    for (const y of set.years || [null]) for (const r of set.rows(y)) lines.push([...(set.years ? [y] : []), ...r].map(csvCell).join(","));
    return "﻿" + lines.join("\r\n");
  }
  function save(blob, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  let xlsxP = null;
  const loadXLSX = () => (xlsxP ||= new Promise((ok, no) => {
    if (window.XLSX) return ok(window.XLSX);
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js";
    s.onload = () => ok(window.XLSX);
    s.onerror = () => { xlsxP = null; no(new Error("엑셀 도구를 불러오지 못했습니다")); };
    document.head.appendChild(s);
  }));
  async function toXLSX(set) {
    const X = await loadXLSX();
    const wb = X.utils.book_new();
    const head = ["시도", "시군구", ...set.cols];
    for (const y of set.years || [null]) {
      const ws = X.utils.aoa_to_sheet([head, ...set.rows(y).map((r) => r.map(clean))]);
      ws["!cols"] = head.map((h, i) => ({ wch: i < 2 ? 12 : Math.max(10, String(h).length * 1.6) }));
      X.utils.book_append_sheet(wb, ws, String(y ?? "자료").replace(/[\\/?*[\]:]/g, "-").slice(0, 31));
    }
    const info = [["자료", set.name], ["화면", TITLE], ["출처", set.src || ""], ["주의", set.note || ""], ["시점", set.years ? `${set.years[0]} ~ ${set.years.at(-1)} (시트마다 한 시점)` : "시트 하나"], ["내려받은 날", today()], ["주소", location.origin + location.pathname]];
    X.utils.book_append_sheet(wb, X.utils.aoa_to_sheet(info), "설명");
    X.writeFile(wb, fname(set, "xlsx"));
  }
  const fname = (set, ext) => `지역농업현황판_${TITLE.replace(/[\\/:*?"<>|·\s]+/g, "_")}_${set.name.replace(/[\\/:*?"<>|·\s]+/g, "_")}_${today()}.${ext}`;

  // ---------- 창 ----------
  const css = document.createElement("style");
  css.textContent = `
    .dl-back { position: fixed; inset: 0; z-index: 900; display: grid; place-items: center; padding: 16px; background: rgba(6, 8, 11, 0.62); backdrop-filter: blur(3px); }
    .dl-box { width: min(680px, 100%); max-height: min(86vh, 900px); overflow: auto; border-radius: 16px; background: #15171c; border: 1px solid rgba(255, 255, 255, 0.1); box-shadow: 0 24px 70px rgba(0, 0, 0, 0.6); color: #e7eaee; }
    .dl-hd { position: sticky; top: 0; display: flex; align-items: flex-start; gap: 12px; padding: 18px 20px 12px; background: #15171c; border-bottom: 1px solid rgba(255, 255, 255, 0.07); }
    .dl-hd h2 { margin: 0; font-size: 17px; font-weight: 750; letter-spacing: -0.01em; }
    .dl-hd p { margin: 4px 0 0; font-size: 12.5px; color: #9aa1ad; }
    .dl-x { margin-left: auto; flex: none; width: 30px; height: 30px; border: 0; border-radius: 8px; background: rgba(255, 255, 255, 0.06); color: #c9ced6; font-size: 18px; line-height: 1; cursor: pointer; }
    .dl-x:hover { background: rgba(255, 255, 255, 0.12); }
    .dl-list { list-style: none; margin: 0; padding: 6px 12px 14px; }
    .dl-list li { display: flex; align-items: center; gap: 12px; padding: 12px 8px; border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
    .dl-list li:last-child { border-bottom: 0; }
    .dl-t { flex: 1; min-width: 0; }
    .dl-t b { display: block; font-size: 14px; font-weight: 700; }
    .dl-t span { display: block; margin-top: 3px; font-size: 12px; line-height: 1.5; color: #8f96a3; word-break: keep-all; }
    .dl-b { display: flex; gap: 6px; flex: none; }
    .dl-b button { padding: 6px 11px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.14); background: transparent; color: #dfe3e8; font: inherit; font-size: 12.5px; font-weight: 650; cursor: pointer; }
    .dl-b button:hover { border-color: #f5a524; color: #ffcf7a; }
    .dl-b button.x { background: rgba(245, 165, 36, 0.14); border-color: rgba(245, 165, 36, 0.5); color: #ffcf7a; }
    .dl-b button[disabled] { opacity: 0.5; cursor: progress; }
    .dl-empty { padding: 26px 20px; font-size: 13.5px; color: #9aa1ad; }
    .dl-ft { padding: 0 20px 16px; font-size: 11.5px; color: #6f7682; }
    @media (max-width: 560px) { .dl-list li { flex-direction: column; align-items: stretch; } .dl-b { justify-content: flex-end; } }`;
  document.head.appendChild(css);

  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  let back = null;
  function meta(set) {
    const p = [];
    if (set.years) p.push(set.years.length > 1 ? `${set.years[0]} ~ ${set.years.at(-1)} · ${set.years.length}개 시점` : set.years[0]);
    try { const n = set.rows(set.years ? set.years.at(-1) : null).length; p.push(`${n.toLocaleString("ko-KR")}줄`); } catch {}
    if (set.src) p.push(set.src);
    if (set.note) p.push(set.note);
    return p.join(" · ");
  }
  function open() {
    if (back) return;
    const E = window.RSTAT_EXPORT;
    const sets = E?.sets || [];
    back = document.createElement("div");
    back.className = "dl-back";
    back.innerHTML = `
      <div class="dl-box" role="dialog" aria-modal="true" aria-labelledby="dl-h">
        <div class="dl-hd"><div><h2 id="dl-h">${esc(TITLE)} 자료 내려받기</h2><p>시도·시군 값 · CSV는 모든 시점을 한 파일에, 엑셀은 시점마다 시트를 나눕니다</p></div><button class="dl-x" type="button" aria-label="닫기">×</button></div>
        ${sets.length ? `<ul class="dl-list">${sets.map((s, i) => `<li><div class="dl-t"><b>${esc(s.name)}</b><span>${esc(meta(s))}</span></div><div class="dl-b"><button type="button" data-i="${i}" data-f="csv">CSV</button><button type="button" class="x" data-i="${i}" data-f="xlsx">엑셀</button></div></li>`).join("")}</ul>` : `<p class="dl-empty">이 화면의 내려받기는 준비 중입니다.</p>`}
        <p class="dl-ft">공개 자료를 화면에 쓴 그대로 옮겼습니다. 출처를 함께 밝혀 주세요.</p>
      </div>`;
    document.body.appendChild(back);
    back.addEventListener("click", async (e) => {
      if (e.target === back || e.target.closest(".dl-x")) return close();
      const b = e.target.closest("button[data-i]");
      if (!b) return;
      const set = sets[+b.dataset.i];
      b.disabled = true;
      try {
        if (b.dataset.f === "csv") save(new Blob([toCSV(set)], { type: "text/csv;charset=utf-8" }), fname(set, "csv"));
        else await toXLSX(set);
      } catch (err) { alert(err.message || "내려받지 못했습니다"); }
      b.disabled = false;
    });
    back.querySelector(".dl-x").focus();
    if (location.hash !== "#download") history.replaceState(null, "", "#download");
  }
  function close() {
    back?.remove();
    back = null;
    if (location.hash === "#download") history.replaceState(null, "", location.pathname + location.search);
  }
  addEventListener("keydown", (e) => { if (e.key === "Escape" && back) close(); });
  addEventListener("hashchange", () => (location.hash === "#download" ? open() : close()));
  window.RSTAT_DOWNLOAD = open;

  // ---------- 바닥글 링크: '자료 수집 현황' 옆 ----------
  function link() {
    if (!window.RSTAT_EXPORT?.sets?.length || document.querySelector(".dl-link")) return;
    const st = [...document.querySelectorAll('a[href="status"]')].pop();
    if (!st) return;
    const a = document.createElement("a");
    a.className = "dl-link";
    a.href = "#download";
    a.textContent = "자료 내려받기";
    a.addEventListener("click", (e) => { e.preventDefault(); open(); });
    st.after(document.createTextNode(" · "), a);
  }
  const ready = () => { link(); if (location.hash === "#download" && window.RSTAT_EXPORT) open(); };
  if (document.readyState === "complete") setTimeout(ready, 0);
  else addEventListener("load", () => setTimeout(ready, 0));
})();
