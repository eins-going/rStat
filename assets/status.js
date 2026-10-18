(() => {
  // 자료 수집 현황 — data/status.js(update.py)의 지표별 목록을 주기별로 걸러 표로 그린다
  const S = window.AGRI_STATUS;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nf = new Intl.NumberFormat("ko-KR");
  const size = (b) => (b >= 1e6 ? `${(b / 1e6).toFixed(1)}MB` : `${nf.format(Math.round(b / 1e3))}KB`);

  // 주기 묶음 (표 순서이기도 하다)
  const FREQS = [["월", "월별"], ["분기", "분기별"], ["연", "연별"], ["5년", "5년(총조사)"], ["수시", "수시"], ["기타", "실시간·개편·없음"]];
  const freqOf = (r) => (FREQS.some(([f]) => f === r.freq) ? r.freq : "기타");
  const rank = (r) => FREQS.findIndex(([f]) => f === freqOf(r));
  const tone = (s) => (/실패|없음$/.test(s || "") ? "bad" : /대기/.test(s || "") ? "wait" : /갱신|반영/.test(s || "") ? "ok" : "same");
  const ago = (d) => {
    if (!d) return "";
    const n = Math.floor((Date.now() - new Date(`${d}T00:00`)) / 864e5);
    return n <= 0 ? "오늘" : `${n}일 전`;
  };
  const link = (t) => esc(t).replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');

  const items = [...S.items].sort((a, b) => rank(a) - rank(b));
  let cur = "전체";

  function row(r) {
    const files = r.files.length
      ? `<span class="st-files" title="${esc(r.files.map((f) => `${f.name} (${f.date}, ${size(f.size)})`).join("\n"))}">넣은 파일 ${r.files.length}개 · ${esc(r.files.at(-1).date)}</span>` : "";
    return `<tr class="${r.manual ? "is-manual" : ""}">
      <td class="nm">${esc(r.name)}</td>
      <td class="pg">${esc(r.page)}</td>
      <td><span class="st-freq">${esc(r.freq || "–")}</span></td>
      <td><span class="st-badge ${r.manual ? "m-manual" : r.method === "자동" ? "m-auto" : "m-other"}">${r.manual ? "수동 다운로드" : esc(r.method)}</span></td>
      <td class="pd">${esc(r.period || "–")}</td>
      <td class="dt">${r.collected ? `${esc(r.collected)} <span class="st-ago">${ago(r.collected)}</span>` : "–"}</td>
      <td><span class="st-badge t-${tone(r.status)}">${esc(r.status || "–")}</span></td>
      <td class="nx${/대기|필요|곧/.test(r.next) ? " hot" : ""}">${esc(r.next || "–")}</td>
      <td class="og">${esc(r.origin)}${r.cadence ? `<span class="st-sub">${esc(r.cadence)}</span>` : ""}${r.where ? `<span class="st-sub where">${link(r.where)}</span>` : ""}${files}</td>
    </tr>`;
  }

  function render() {
    const list = cur === "전체" ? items : items.filter((r) => freqOf(r) === cur);
    $("#table tbody").innerHTML = list.map(row).join("");
    $$("#freq button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.f === cur));
  }
  const $$ = (sel) => [...document.querySelectorAll(sel)];

  const counts = Object.fromEntries(FREQS.map(([f]) => [f, items.filter((r) => freqOf(r) === f).length]));
  $("#freq").innerHTML = [["전체", `전체 ${items.length}`], ...FREQS.filter(([f]) => counts[f]).map(([f, l]) => [f, `${l} ${counts[f]}`])]
    .map(([f, l]) => `<button type="button" data-f="${f}" aria-pressed="false">${l}</button>`).join("");
  $$("#freq button").forEach((b) => b.addEventListener("click", () => { cur = b.dataset.f; render(); }));

  const n = (f) => items.filter(f).length;
  $("#generated").textContent = `${S.generated} 기록`;
  $("#summary").innerHTML = [
    `<li><b>${items.length}</b>개 지표</li>`,
    `<li><b>${n((r) => r.method === "자동")}</b>개 자동 수집</li>`,
    `<li class="hot"><b>${n((r) => r.manual)}</b>개 수동 다운로드</li>`,
    `<li class="${n((r) => /대기/.test(r.status || "")) ? "hot" : ""}"><b>${n((r) => /대기/.test(r.status || ""))}</b>개 공표 대기</li>`,
    `<li class="${n((r) => /실패|파일 없음/.test(r.status || "")) ? "bad" : ""}"><b>${n((r) => /실패|파일 없음/.test(r.status || ""))}</b>개 실패·파일 없음</li>`,
  ].join("");
  render();
})();
