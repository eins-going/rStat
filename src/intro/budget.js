// SVG: 고향사랑기금 — 연도별 기금 예산현액이 자라는 막대 + 올해 예산현액이 사업·운영·적립으로 갈리는 띠.
const NS = "http://www.w3.org/2000/svg";
const el = (tag, attrs = {}, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
};
const clamp = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
const smooth = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };
const eok = (v) => Math.round(v / 100).toLocaleString("ko-KR"); // 백만원 → 억원

export function createBudget(svg, I) {
  const G = I.gohyang;
  const g = el("g", { class: "bd", opacity: 0 }, svg);
  // 연도별 막대
  const X0 = 150, YB = 950, HMAX = 210, BW = 58, GAP = 26;
  const max = Math.max(...G.years.map((y) => y.size));
  el("text", { x: X0, y: 640, class: "bd-h" }, g).textContent = `고향사랑기금 예산현액 · 전국 ${G.govs}곳`;
  const bars = G.years.map((y, i) => {
    const x = X0 + i * (BW + GAP), h = (y.size / max) * HMAX;
    const gg = el("g", {}, g);
    const r = el("rect", { x, y: YB - h, width: BW, height: h, rx: 8, class: i === G.years.length - 1 ? "bd-bar now" : "bd-bar" }, gg);
    const v = el("text", { x: x + BW / 2, y: YB - h - 12, "text-anchor": "middle", class: "bd-v" }, gg);
    v.textContent = `${eok(y.size)}억`;
    el("text", { x: x + BW / 2, y: YB + 28, "text-anchor": "middle", class: "bd-y" }, gg).textContent = y.full ? y.y : `${y.y}.${y.ymd.slice(4, 6)}`;
    return { r, v, h, x };
  });
  // 올해 예산현액이 어디로
  const L = G.last, SX = 520, SW = 380, SY = 752;
  const yr = G.years.at(-1);
  el("text", { x: SX, y: 728, class: "bd-h2" }, g).textContent = `${yr.y}년 ${+yr.ymd.slice(4, 6)}월 말 ${eok(L.size)}억원이`;
  const parts = [["사업", L.biz, L.bizEp, "#5fb37c"], ["운영", L.run, L.runEp, "#ffcf7a"], ["넘김", L.move, null, "#6b7280"], ["적립", L.keep, null, "#5fb3ff"]];
  let cx = SX;
  const segs = parts.map(([name, v, ep, c]) => {
    const w = (v / L.size) * SW;
    const gg = el("g", {}, g);
    const r = el("rect", { x: cx, y: SY, width: Math.max(0, w - 3), height: 34, rx: 6, fill: c, opacity: 0.9 }, gg);
    const e = ep != null ? el("rect", { x: cx, y: SY + 34 - 8, width: Math.max(0, (ep / L.size) * SW - 3), height: 8, rx: 3, fill: "#0b0d12", opacity: 0.45 }, gg) : null;
    const s = { name, v, ep, c, x: cx, w, r, e, gg };
    cx += w;
    return s;
  });
  const rows = segs.filter((s) => s.name !== "넘김").map((s, i) => {
    const gg = el("g", { opacity: 0 }, g);
    const y = SY + 76 + i * 38;
    el("rect", { x: SX, y: y - 13, width: 12, height: 12, rx: 3, fill: s.c }, gg);
    const t = el("text", { x: SX + 22, y, class: "bd-row" }, gg);
    t.innerHTML = s.ep != null
      ? `<tspan class="b">${s.name} ${eok(s.v)}억</tspan><tspan dx="10">지출 ${eok(s.ep)}억 · 집행률 ${Math.round((s.ep / s.v) * 100)}%</tspan>`
      : `<tspan class="b">${s.name} ${eok(s.v)}억</tspan><tspan dx="10">예산현액의 ${Math.round((s.v / L.size) * 100)}%를 남겨 둔다</tspan>`;
    return gg;
  });

  function render(S) {
    g.setAttribute("opacity", S.bdAlpha);
    if (S.bdAlpha <= 0.002) return;
    bars.forEach((b, i) => {
      const p = smooth((S.bdBars - i * 0.18) / 0.46);
      b.r.setAttribute("height", b.h * p);
      b.r.setAttribute("y", YB - b.h * p);
      b.v.setAttribute("opacity", smooth((p - 0.7) / 0.3));
    });
    segs.forEach((s, i) => {
      const p = smooth((S.bdSplit - i * 0.12) / 0.5);
      s.gg.setAttribute("opacity", p);
      s.r.setAttribute("width", Math.max(0, (s.w - 3) * p));
    });
    rows.forEach((r, i) => r.setAttribute("opacity", smooth((S.bdSplit - 0.45 - i * 0.12) / 0.3)));
  }
  return { render };
}
