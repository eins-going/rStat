// SVG: 전국 쌀 단수 선(2010~작년)과 올해 예측 7시점이 모여드는 그림.
import { C } from "./palette.js";

const NS = "http://www.w3.org/2000/svg";
const el = (tag, attrs = {}, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
};
const clamp = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
const smooth = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };

export function createRice(svg, I) {
  const R = I.rice;
  const X0 = 150, XH = 700, XF0 = 770, XF1 = 920, YT = 725, YB = 950;
  const hist = R.hist.filter(([, y]) => y != null);
  const vals = hist.flatMap(([, y, n]) => [y, n]).concat(R.fc.flatMap((p) => [p.lo, p.hi]), [R.stat, R.krei].filter(Boolean));
  const lo = Math.floor((Math.min(...vals) - 6) / 10) * 10, hi = Math.ceil((Math.max(...vals) + 4) / 10) * 10;
  const yr0 = hist[0][0], yr1 = hist.at(-1)[0];
  const x = (y) => X0 + ((y - yr0) / (yr1 - yr0)) * (XH - X0);
  const xf = (i) => XF0 + (i / (R.fc.length - 1)) * (XF1 - XF0);
  const y = (v) => YB - ((v - lo) / (hi - lo)) * (YB - YT);

  const g = el("g", { class: "rc", opacity: 0 }, svg);
  const defs = el("defs", {}, svg);
  const grad = el("linearGradient", { id: "rcArea", x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
  el("stop", { offset: 0, "stop-color": C.gold, "stop-opacity": 0.22 }, grad);
  el("stop", { offset: 1, "stop-color": C.gold, "stop-opacity": 0 }, grad);

  // 눈금
  const grid = el("g", { class: "rc-grid" }, g);
  for (let v = lo; v <= hi; v += 20) {
    if (v === lo) continue;
    el("line", { x1: X0, x2: XF1 + 10, y1: y(v), y2: y(v) }, grid);
    el("text", { x: X0 - 14, y: y(v) + 5, "text-anchor": "end" }, grid).textContent = v;
  }
  [yr0, 2015, 2020, yr1].forEach((yy) => { el("text", { x: x(yy), y: YB + 30, "text-anchor": "middle" }, grid).textContent = yy; });
  el("text", { x: X0 - 14, y: YT - 22, "text-anchor": "end", class: "rc-unit" }, grid).textContent = "kg/10a";

  // 평년(점선)·실제 단수
  const dPath = (pts) => pts.map(([a, b], i) => `${i ? "L" : "M"}${a.toFixed(1)},${b.toFixed(1)}`).join("");
  const normPts = hist.filter(([, , n]) => n).map(([yy, , n]) => [x(yy), y(n)]);
  const yPts = hist.map(([yy, v]) => [x(yy), y(v)]);
  const area = el("path", { d: `${dPath(yPts)}L${x(yr1)},${YB}L${x(yr0)},${YB}Z`, fill: "url(#rcArea)", opacity: 0 }, g);
  const norm = el("path", { d: dPath(normPts), class: "rc-norm" }, g);
  const line = el("path", { d: dPath(yPts), class: "rc-line" }, g);
  const dots = yPts.map(([a, b]) => el("circle", { cx: a, cy: b, r: 4.2, class: "rc-dot", opacity: 0 }, g));

  // 올해 예측 칸
  const fz = el("g", { class: "rc-fc" }, g);
  el("rect", { x: XF0 - 30, y: YT - 30, width: XF1 - XF0 + 60, height: YB - YT + 44, rx: 14, class: "rc-fcbox" }, fz);
  el("text", { x: (XF0 + XF1) / 2, y: YB + 30, "text-anchor": "middle", class: "rc-fclab" }, fz).textContent = `${R.year} 예측 ${R.fc.length}번`;
  const refs = [[R.stat, "국가데이터처", C.sky], [R.krei, "KREI", C.field]].filter(([v]) => v != null).map(([v, lab, c], i) => {
    const gg = el("g", { opacity: 0 }, fz);
    el("line", { x1: XF0 - 18, x2: XF1 + 18, y1: y(v), y2: y(v), stroke: c, "stroke-width": 2, "stroke-dasharray": "5 4" }, gg);
    el("text", { x: XF1 + 26, y: y(v) + (i ? 14 : -4), fill: c, class: "rc-ref" }, gg).textContent = `${lab} ${v}`;
    return gg;
  });
  const conn = el("path", { d: dPath(R.fc.map((p, i) => [xf(i), y(p.y)])), class: "rc-fcline" }, fz);
  const fcs = R.fc.map((p, i) => {
    const gg = el("g", { opacity: 0 }, fz);
    el("line", { x1: xf(i), x2: xf(i), y1: y(p.lo), y2: y(p.hi), class: "rc-wh" }, gg);
    el("circle", { cx: xf(i), cy: y(p.y), r: i === R.fc.length - 1 ? 7 : 5, class: i === R.fc.length - 1 ? "rc-fcdot now" : "rc-fcdot" }, gg);
    return gg;
  });
  const md = (lab) => lab.replace(/(\d+)월 (\d+)일/, "$1/$2");
  el("text", { x: xf(0), y: YT - 42, "text-anchor": "middle", class: "rc-fcd" }, fz).textContent = md(R.fc[0].lab);
  el("text", { x: xf(R.fc.length - 1), y: YT - 42, "text-anchor": "middle", class: "rc-fcd" }, fz).textContent = md(R.fc.at(-1).lab);

  // 정확도: 시점별 평균 오차 막대 + 국가데이터처·KREI 기준선
  const F = I.facts, A = F.riceAcc;
  const ag = el("g", { class: "ra", opacity: 0 }, svg);
  const rowsDef = [["평년 그대로", A.norm, "norm"], ...I.rice.fc.slice(0, 5).map((p) => [p.lab, A[`m${p.t}`], p.t])].filter(([, v]) => v != null);
  const AX0 = 330, AX1 = 900, AY = 742, RH = 37;
  const ax = (v) => AX0 + (v / Math.max(...rowsDef.map((r) => r[1]))) * (AX1 - AX0);
  el("text", { x: 150, y: AY - 44, class: "ra-h" }, ag).textContent = `전국 단수 평균 오차 · ${F.riceFrom}~${I.rice.year - 1} 그해 이전 자료로만 재현`;
  const best = rowsDef.slice(1).reduce((m, r) => (r[1] < m[1] ? r : m))[2];
  const accRows = rowsDef.map(([lab, v, t], i) => {
    const y = AY + i * RH, gg = el("g", { opacity: 0 }, ag);
    el("text", { x: AX0 - 16, y: y + 19, "text-anchor": "end", class: "ra-l" }, gg).textContent = i ? `${lab} 예측` : lab;
    const r = el("rect", { x: AX0, y: y + 4, width: 0, height: 22, rx: 5, class: t === "norm" ? "ra-b norm" : t === "0915" ? "ra-b best" : "ra-b" }, gg);
    const tx = el("text", { x: AX0, y: y + 21, class: "ra-v" }, gg);
    tx.textContent = `${v}kg`;
    return { gg, r, tx, w: ax(v) - AX0 };
  });
  void best;
  const refs2 = [[A.stat, "국가데이터처 10월 예상", "#5fb3ff"], [A.krei, "KREI 9월 전망", "#5fb37c"]].map(([v, lab, c], i) => {
    const gg = el("g", { opacity: 0 }, ag);
    const x = ax(v), y0 = AY - 6, y1 = AY + rowsDef.length * RH;
    el("line", { x1: x, x2: x, y1: y0, y2: y1, stroke: c, "stroke-width": 2, "stroke-dasharray": "4 4" }, gg);
    el("text", { x: x + (i ? 8 : -8), y: y1 + 24, "text-anchor": i ? "start" : "end", fill: c, class: "ra-ref" }, gg).textContent = `${lab} ${v}kg`;
    return gg;
  });

  let L = 0, LC = 0;
  function measure() { L = line.getTotalLength(); LC = conn.getTotalLength(); line.style.strokeDasharray = `${L} ${L}`; conn.style.strokeDasharray = `${LC} ${LC}`; }

  function renderAcc(S) {
    ag.setAttribute("opacity", S.accAlpha);
    if (S.accAlpha <= 0.002) return;
    accRows.forEach((r, i) => {
      const p = smooth((S.riceAcc - i * 0.1) / 0.45);
      r.gg.setAttribute("opacity", smooth(p * 3));
      r.r.setAttribute("width", r.w * p);
      r.tx.setAttribute("x", AX0 + r.w * p + 10);
    });
    refs2.forEach((r, i) => r.setAttribute("opacity", smooth((S.riceAcc - 0.7 - i * 0.1) / 0.2)));
  }

  function render(S) {
    renderAcc(S);
    if (!L) measure();
    g.setAttribute("opacity", S.riceAlpha);
    if (S.riceAlpha <= 0.002) return;
    const a = smooth(S.riceLine);
    line.style.strokeDashoffset = L * (1 - a);
    norm.style.opacity = 0.9 * smooth(S.riceLine * 1.5);
    area.setAttribute("opacity", smooth((S.riceLine - 0.6) / 0.4));
    dots.forEach((d, i) => d.setAttribute("opacity", smooth((a - i / dots.length) * 8)));
    const f = S.riceFc;
    fz.setAttribute("opacity", smooth(f * 4));
    fcs.forEach((d, i) => d.setAttribute("opacity", smooth((f - (i / fcs.length) * 0.7) / 0.3)));
    conn.style.strokeDashoffset = LC * (1 - smooth(f / 0.95));
    refs.forEach((r, i) => r.setAttribute("opacity", smooth((f - 0.75 - i * 0.08) / 0.15)));
  }
  return { render };
}
