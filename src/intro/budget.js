// SVG: 시도별 공익직불 예산현액 막대 (길이 = 예산현액, 색 = 농가당 예산, 지도 색과 같은 눈금)
import { JIK_RAMP, ramp, rgb } from "./palette.js";

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
  const J = I.jikbul, rows = J.sido.filter((r) => r.pub > 0);
  const g = el("g", { class: "bd", opacity: 0 }, svg);
  const X0 = 150, NX = 206, BX = 222, BW = 470, Y0 = 628, RH = 20.5;
  const max = Math.max(...rows.map((r) => r.pub));
  const perFarm = (r) => (r.hh ? (r.pub * 100) / r.hh : 0); // 만원
  const pf = rows.map(perFarm), pfS = [...pf].sort((a, b) => a - b);
  const rank = (v) => pfS.indexOf(v) / Math.max(1, pfS.length - 1);
  el("text", { x: X0, y: Y0 - 22, class: "bd-h" }, g).textContent = `시도별 공익직불 예산현액 · ${J.year}`;
  el("text", { x: 900, y: Y0 - 22, "text-anchor": "end", class: "bd-y" }, g).textContent = "농가당";
  const bars = rows.map((r, i) => {
    const y = Y0 + i * RH, w = (r.pub / max) * BW, c = ramp(JIK_RAMP, 0.25 + 0.75 * rank(pf[i]));
    const gg = el("g", {}, g);
    el("text", { x: NX, y: y + 14, "text-anchor": "end", class: "bd-n" }, gg).textContent = r.name;
    const b = el("rect", { x: BX, y: y + 3, width: 0, height: RH - 7, rx: 4, fill: rgb(c) }, gg);
    const v = el("text", { x: BX, y: y + 14, class: "bd-v2" }, gg);
    v.textContent = `${eok(r.pub)}억`;
    const f = el("text", { x: 900, y: y + 14, "text-anchor": "end", class: "bd-f" }, gg);
    f.textContent = `${Math.round(pf[i]).toLocaleString("ko-KR")}만`;
    return { gg, b, v, f, w };
  });
  function render(S) {
    g.setAttribute("opacity", S.bdAlpha);
    if (S.bdAlpha <= 0.002) return;
    bars.forEach((r, i) => {
      const p = smooth((S.bdBars - (i / bars.length) * 0.5) / 0.5);
      r.gg.setAttribute("opacity", smooth(p * 3));
      r.b.setAttribute("width", r.w * p);
      r.v.setAttribute("x", BX + r.w * p + 8);
      r.f.setAttribute("opacity", smooth((S.bdSplit - (i / bars.length) * 0.4) / 0.4));
    });
  }
  return { render };
}
