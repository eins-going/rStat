(() => {
  // 자료 수집 현황 — data/status.js(scripts/update.py)를 자료별 카드로 그린다
  const S = window.AGRI_STATUS;
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const nf = new Intl.NumberFormat("ko-KR");
  const size = (b) => (b >= 1e6 ? `${(b / 1e6).toFixed(1)}MB` : `${nf.format(Math.round(b / 1e3))}KB`);
  // 상태 색: 갱신·변경 없음은 정상, 실패는 경고
  const tone = (s) => (!s ? "none" : /실패/.test(s) ? "bad" : s === "갱신" ? "ok" : s === "변경 없음" ? "same" : "none");
  const when = (s) => (s ? s.replace(" ", " · ") : "–");
  const ago = (s) => {
    if (!s) return "";
    const d = Math.floor((Date.now() - new Date(s.replace(" ", "T"))) / 864e5);
    return d <= 0 ? "오늘" : `${d}일 전`;
  };

  function card(r) {
    const manual = r.method === "manual";
    const head = `
      <header class="st-card-head">
        <h3>${esc(r.name)}</h3>
        <span class="st-badge m-${r.method}">${esc(r.methodText)}</span>
        ${r.status ? `<span class="st-badge t-${tone(r.status)}">${esc(r.status)}</span>` : ""}
      </header>`;
    const facts = `
      <dl class="st-facts">
        <div><dt>화면</dt><dd>${esc(r.page)}</dd></div>
        ${r.period ? `<div><dt>자료 시점</dt><dd>${esc(r.period)}</dd></div>` : ""}
        ${r.method === "auto" || manual ? `<div><dt>마지막 수집</dt><dd>${when(r.lastOk)} <span class="st-ago">${ago(r.lastOk)}</span></dd></div>` : ""}
        ${r.lastChange ? `<div><dt>마지막 반영</dt><dd>${when(r.lastChange)}</dd></div>` : ""}
        ${r.next ? `<div><dt>다음</dt><dd${/대기|필요|곧/.test(r.next) ? ' class="st-hot"' : ""}>${esc(r.next)}</dd></div>` : ""}
        ${r.message ? `<div><dt>결과</dt><dd>${esc(r.message)}</dd></div>` : ""}
      </dl>`;
    const note = r.note ? `<p class="st-note">${esc(r.note)}</p>` : "";
    const how = r.how.length ? `<ul class="st-how">${r.how.map((h) => `<li>${esc(h.replace(/^·\s*/, "")).replace(/(https?:\/\/[^\s)]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>')}</li>`).join("")}</ul>` : "";
    const files = manual ? `
      <h4 class="st-files-h">지금 들어 있는 파일 <span>${r.files.length}개 · 손으로 내려받아 넣은 파일</span></h4>
      ${r.files.length ? `<table class="st-files"><thead><tr><th>파일</th><th>넣은 날</th><th>크기</th></tr></thead><tbody>${r.files.map((f) => `<tr><td><span class="st-dir">${esc(f.dir)}/</span>${esc(f.name)}</td><td>${f.date}</td><td>${size(f.size)}</td></tr>`).join("")}</tbody></table>` : '<p class="st-note">파일이 없습니다.</p>'}` : "";
    const cmds = r.commands.length ? `<p class="st-cmd">반영 명령: ${r.commands.map((c) => `<code>${esc(c)}</code>`).join(" → ")}</p>` : "";
    return `<article class="st-card${manual ? " is-manual" : ""}">${head}${facts}${note}${manual ? '<p class="st-warn">자동으로 받을 수 없습니다. 아래 방법으로 원자료를 내려받아 넣으면 다음 자동 실행 때 반영됩니다.</p>' : ""}${how}${files}${cmds}</article>`;
  }

  const groups = { auto: [], manual: [], other: [] };
  for (const r of S.sources) (groups[r.method] || groups.other).push(r);
  for (const [k, list] of Object.entries(groups)) $(`#${k}`).innerHTML = list.map(card).join("");

  const n = (f) => S.sources.filter(f).length;
  const bad = n((r) => /실패/.test(r.status || ""));
  const wait = n((r) => /대기|필요/.test(r.next || ""));
  $("#generated").textContent = `${S.generated} 기록`;
  $("#summary").innerHTML = [
    `<li><b>${groups.auto.length}</b>개 자료 자동 수집</li>`,
    `<li><b>${groups.manual.length}</b>개 자료 수동 다운로드</li>`,
    `<li class="${wait ? "hot" : ""}"><b>${wait}</b>개 확인·반영 대기</li>`,
    `<li class="${bad ? "bad" : ""}"><b>${bad}</b>개 실패</li>`,
  ].join("");
})();
