// 08~13 강조 그래픽: 화면 캡처 대신 그 화면의 핵심을 한 장의 그림으로.
//  08 산업연관표  17개 시도 꽃잎(길이=농식품 산출액, 색=특화도) + 퍼지는 파급 물결   (Canvas)
//  09 농업고용    63년 취업자 곡선이 화면 폭으로 그려진다                               (SVG)
//  10 금융보험    농·축협이 지도 위에 하나씩 켜진다                                    (Canvas, 지도 투영)
//  11 농촌개발    사업 지구 수만큼 솟는 시군 기둥 (map3d.js가 그림)
//  12 토양        적성등급 1~5급 흙 단면                                               (SVG)
//  13 축산        마을 14,939곳 점 지도                                                (Canvas)
import { STAGE_W } from "./map3d.js";
import { LV_RAMP, ramp, rgb } from "./palette.js";

const NS = "http://www.w3.org/2000/svg";
const el = (tag, attrs = {}, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
};
const clamp = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
const smooth = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };
const easeOut = (t) => 1 - (1 - clamp(t)) ** 3;
const frac = (x) => x - Math.floor(x);
const FONT = '"Pretendard Variable", Pretendard, system-ui, sans-serif';
function rng(seed) { return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296); }
function inside(x, y, ring) {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
function area(r) { let s = 0; for (let i = 0, j = r.length - 1; i < r.length; j = i++) s += (r[j][0] + r[i][0]) * (r[j][1] - r[i][1]); return Math.abs(s / 2); }

export function createSpots(canvas, svg, I, map) {
  const ctx = canvas.getContext("2d");
  const P = I.spots;
  let k = 1, shown = true;
  function resize(w, h) { canvas.width = w; canvas.height = h; k = w / STAGE_W; }

  // ── 08 산업연관표 꽃잎 ───────────────────────────────────
  const RG = P.rio.regions, xmax = Math.max(...RG.map((r) => r.x));
  const lqCol = (lq) => (lq >= 1 ? ramp(["#ffd27a", "#f5a524", "#ff7a4a"], Math.min(1, (lq - 1) / 2.4)) : ramp(["#2f6fd0", "#4ea1ff", "#9fd1ff"], lq));
  function drawRio(S, t) {
    const A = S.rioA;
    if (A <= 0.002) return;
    const CX = 1310, CY = 520, R0 = 78, RL = 290, n = RG.length, w = ((Math.PI * 2) / n) * 0.36;
    ctx.save();
    ctx.globalAlpha = A;
    // 파급 물결
    ctx.globalCompositeOperation = "lighter";
    for (let m = 0; m < 3; m++) {
      const u = frac(t * 0.42 + m / 3), r = R0 + u * 360;
      ctx.strokeStyle = `rgba(255,200,120,${0.22 * (1 - u) * A})`;
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(CX, CY, r, 0, Math.PI * 2); ctx.stroke();
    }
    RG.forEach((r, i) => {
      const p = easeOut((S.rioP - (i / n) * 0.5) / 0.5);
      if (p <= 0) return;
      const a = -Math.PI / 2 + (i / n) * Math.PI * 2 + S.rioP * 0.12;
      const L = R0 + (RL * Math.sqrt(r.x / xmax) + 18) * p;
      const c = lqCol(r.lq);
      const g = ctx.createLinearGradient(CX + R0 * Math.cos(a), CY + R0 * Math.sin(a), CX + L * Math.cos(a), CY + L * Math.sin(a));
      g.addColorStop(0, rgb(c, 0.08)); g.addColorStop(0.6, rgb(c, 0.55)); g.addColorStop(1, rgb(c, 0.95));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.moveTo(CX + R0 * Math.cos(a - w), CY + R0 * Math.sin(a - w));
      const mid = R0 + (L - R0) * 0.55, wm = w * 1.5 * (R0 / mid) * 2.4;
      ctx.quadraticCurveTo(CX + mid * Math.cos(a - wm), CY + mid * Math.sin(a - wm), CX + L * Math.cos(a), CY + L * Math.sin(a));
      ctx.quadraticCurveTo(CX + mid * Math.cos(a + wm), CY + mid * Math.sin(a + wm), CX + R0 * Math.cos(a + w), CY + R0 * Math.sin(a + w));
      ctx.closePath(); ctx.fill();
      // 이름표
      const la = smooth((p - 0.7) / 0.3);
      if (la > 0) {
        const lr = L + 34, lx = CX + lr * Math.cos(a), ly = CY + lr * Math.sin(a);
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = A * la;
        ctx.textAlign = Math.cos(a) > 0.25 ? "left" : Math.cos(a) < -0.25 ? "right" : "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#eef0f3"; ctx.font = `700 23px ${FONT}`;
        ctx.fillText(r.name, lx, ly - 11);
        ctx.fillStyle = rgb(c, 1); ctx.font = `600 18px ${FONT}`;
        ctx.fillText(`${(r.x / 1e6).toFixed(1)}조`, lx, ly + 13);
        ctx.globalAlpha = A;
        ctx.globalCompositeOperation = "lighter";
      }
    });
    ctx.globalCompositeOperation = "source-over";
    // 가운데
    const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, R0);
    cg.addColorStop(0, "rgba(40,30,16,0.95)"); cg.addColorStop(1, "rgba(20,16,10,0.9)");
    ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(CX, CY, R0 - 4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(255,207,122,0.5)"; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffd98a"; ctx.font = `800 30px ${FONT}`;
    ctx.fillText(`${Math.round(P.rio.total / 1e6)}조`, CX, CY - 6);
    ctx.fillStyle = "#aab2bf"; ctx.font = `500 16px ${FONT}`;
    ctx.fillText(`농식품 산출 ${P.rio.year}`, CX, CY + 20);
    // 읽는 법
    ctx.textAlign = "right"; ctx.fillStyle = "rgba(200,208,220,0.8)"; ctx.font = `500 22px ${FONT}`;
    ctx.fillText("꽃잎 길이 = 시도 농식품 산출액 · 주황일수록 농식품에 특화", 1844, 985);
    ctx.restore();
  }

  // ── 10 농·축협 점 ───────────────────────────────────────
  const KC = [[245, 165, 36], [255, 122, 89], [124, 201, 143]];
  const amax = Math.max(...P.coops.map((c) => c[3]));
  const R = rng(1110);
  const coops = P.coops.map((c) => ({ w: map.world(c[0], c[1]), k: c[2], s: Math.sqrt(c[3] / amax), o: R() }));
  function drawCoops(S, t) {
    const A = S.coopA;
    if (A <= 0.002) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    coops.forEach((c) => {
      const p = smooth((S.coopP - c.o * 0.8) / 0.2);
      if (p <= 0) return;
      const [x, y] = map.project(c.w[0], c.w[1], map.flat);
      const r = (1.4 + 6.5 * c.s) * (0.6 + 0.4 * p);
      const tw = 0.85 + 0.15 * Math.sin(t * 2 + c.o * 30);
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2);
      g.addColorStop(0, rgb(KC[c.k], 0.5 * A * p * tw)); g.addColorStop(1, rgb(KC[c.k], 0));
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(x, y, r * 2, 0, Math.PI * 2); ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = rgb(KC[c.k], 0.92 * A * p);
      ctx.beginPath(); ctx.arc(x, y, Math.max(1.5, r * 0.7), 0, Math.PI * 2); ctx.fill();
      ctx.globalCompositeOperation = "lighter";
    });
    ctx.restore();
  }

  // ── 13 축산 마을 점 ─────────────────────────────────────
  const lvRand = rng(14939);
  const intensity = I.map.sigun.map((s) => (P.lv.nv[s.key] ? P.lv.man[s.key] / P.lv.nv[s.key] : 0));
  const iSorted = intensity.filter((v) => v > 0).sort((a, b) => a - b);
  const iRank = (v) => { let lo = 0, hi = iSorted.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (iSorted[m] < v) lo = m + 1; else hi = m; } return lo / (iSorted.length - 1); };
  const vill = [];
  I.map.sigun.forEach((s, si) => {
    const n = P.lv.nv[s.key];
    if (!n) return;
    const c = ramp(LV_RAMP, 0.1 + 0.9 * iRank(intensity[si]));
    const rings = s.rings.map((p) => p[0]), ra = rings.map(area), raS = ra.reduce((a, b) => a + b, 0);
    for (let j = 0; j < n; j++) {
      let q = lvRand() * raS, ri = 0;
      while (q > ra[ri] && ri < rings.length - 1) q -= ra[ri++];
      const ring = rings[ri];
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      ring.forEach(([x, y]) => { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); });
      for (let tr = 0; tr < 30; tr++) {
        const x = x0 + lvRand() * (x1 - x0), y = y0 + lvRand() * (y1 - y0);
        if (inside(x, y, ring)) { vill.push({ w: map.world(x, y), c, o: lvRand() }); break; }
      }
    }
  });
  function drawLv(S) {
    const A = S.lvA;
    if (A <= 0.002) return;
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const v of vill) {
      const p = smooth((S.lvP - v.o * 0.85) / 0.15);
      if (p <= 0) continue;
      const [x, y] = map.project(v.w[0], v.w[1], 0.06);
      ctx.fillStyle = rgb(v.c, 0.75 * A * p);
      ctx.fillRect(x - 1.3, y - 1.3, 2.6, 2.6);
    }
    ctx.restore();
  }

  // ── 09 농업고용 곡선 (SVG) ──────────────────────────────
  const E = P.employ;
  const eg = el("g", { opacity: 0 }, svg);
  const EX0 = 150, EX1 = 1770, EYT = 560, EYB = 950, EMAX = 5000;
  const ex = (y) => EX0 + ((y - E.years[0]) / (E.years.at(-1) - E.years[0])) * (EX1 - EX0);
  const ey = (v) => EYB - (v / EMAX) * (EYB - EYT);
  const defs = el("defs", {}, svg);
  const gr = el("linearGradient", { id: "empG", x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
  el("stop", { offset: 0, "stop-color": "#7cc98f", "stop-opacity": 0.45 }, gr);
  el("stop", { offset: 1, "stop-color": "#7cc98f", "stop-opacity": 0 }, gr);
  const clip = el("clipPath", { id: "empClip" }, defs);
  const clipR = el("rect", { x: EX0 - 10, y: 0, width: 0, height: 1080 }, clip);
  for (let v = 1000; v <= 4000; v += 1000) {
    el("line", { x1: EX0, x2: EX1, y1: ey(v), y2: ey(v), class: "sp-grid" }, eg);
    el("text", { x: EX1 + 12, y: ey(v) + 5, class: "sp-ax" }, eg).textContent = `${v / 10}만`;
  }
  for (let y = 1970; y <= 2020; y += 10) el("text", { x: ex(y), y: EYB + 30, "text-anchor": "middle", class: "sp-ax" }, eg).textContent = y;
  const pts = E.years.map((y, i) => [ex(y), ey(E.a[i])]);
  const dl = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join("");
  const body = el("g", { "clip-path": "url(#empClip)" }, eg);
  el("path", { d: `${dl}L${EX1},${EYB}L${EX0},${EYB}Z`, fill: "url(#empG)" }, body);
  el("path", { d: dl, class: "sp-eline" }, body);
  const head = el("circle", { r: 7, class: "sp-ehead" }, eg);
  const headT = el("text", { class: "sp-ehv", "text-anchor": "middle" }, eg);
  const startT = el("text", { x: pts[0][0] + 14, y: pts[0][1] - 18, class: "sp-ehs" }, eg);
  startT.textContent = `${E.years[0]}년 ${Math.round(E.a[0] / 10)}만 명`;
  function renderEmp(S) {
    eg.setAttribute("opacity", S.empA);
    if (S.empA <= 0.002) return;
    const p = S.empP, xh = EX0 + (EX1 - EX0) * p;
    clipR.setAttribute("width", xh - EX0 + 12);
    const fi = Math.min(E.years.length - 1, p * (E.years.length - 1)), i0 = Math.floor(fi), w = fi - i0;
    const i1 = Math.min(E.years.length - 1, i0 + 1);
    const hx = pts[i0][0] + (pts[i1][0] - pts[i0][0]) * w, hy = pts[i0][1] + (pts[i1][1] - pts[i0][1]) * w;
    const hv = E.a[i0] + (E.a[i1] - E.a[i0]) * w;
    head.setAttribute("cx", hx); head.setAttribute("cy", hy);
    headT.setAttribute("x", Math.min(EX1 - 40, hx)); headT.setAttribute("y", hy - 22);
    headT.textContent = `${Math.round(E.years[0] + fi)}년 ${Math.round(hv / 10)}만`;
    startT.setAttribute("opacity", smooth(p * 6));
  }

  // ── 12 토양 단면 (SVG) ──────────────────────────────────
  const sg = el("g", { opacity: 0 }, svg);
  const pat = el("pattern", { id: "soilDots", width: 9, height: 9, patternUnits: "userSpaceOnUse" }, defs);
  el("circle", { cx: 2, cy: 2, r: 0.9, fill: "rgba(0,0,0,0.25)" }, pat);
  el("circle", { cx: 6.5, cy: 6, r: 0.7, fill: "rgba(255,255,255,0.12)" }, pat);
  const GC = ["#7fcf7a", "#b9d36a", "#d9b86a", "#b08858", "#6e5a48", "#3a3632"];
  const GN = ["1급", "2급", "3급", "4급", "5급", "기타"];
  const cols = [["논", P.soil.pg, 880], ["밭", P.soil.fg, 1440]].map(([name, v, x]) => {
    const tot = v.reduce((a, b) => a + b, 0), TOP = 250, H = 640, W = 280;
    el("text", { x: x + W / 2, y: TOP - 28, "text-anchor": "middle", class: "sp-sh" }, sg).textContent = `${name}으로 쓸 때 적성등급`;
    let y = TOP;
    const layers = v.map((a, i) => {
      const h = (a / tot) * H, g = el("g", {}, sg);
      el("rect", { x, y, width: W, height: Math.max(1, h - 2), rx: 4, fill: GC[i] }, g);
      el("rect", { x, y, width: W, height: Math.max(1, h - 2), rx: 4, fill: "url(#soilDots)" }, g);
      const share = (a / tot) * 100;
      if (h > 16) {
        const t = el("text", { x: x + W + 14, y: y + h / 2 + 6, class: "sp-sl" }, g);
        t.innerHTML = `<tspan class="b">${GN[i]}</tspan><tspan dx="8">${share.toFixed(1)}%</tspan>`;
      }
      const L = { g, y0: y, h };
      y += h;
      return L;
    });
    const top12 = ((v[0] + v[1]) / tot) * 100, h12 = layers[0].h + layers[1].h;
    const br = el("g", { opacity: 0 }, sg);
    el("path", { d: `M${x - 14},${TOP}h-10v${h12}h10`, fill: "none", stroke: "#ffd98a", "stroke-width": 2 }, br);
    const bt = el("text", { x: x - 32, y: TOP + Math.max(18, h12 / 2 + 6), "text-anchor": "end", class: "sp-sb" }, br);
    bt.innerHTML = `<tspan x="${x - 32}" dy="0">1·2급지</tspan><tspan x="${x - 32}" dy="30" class="v">${top12.toFixed(1)}%</tspan>`;
    return { layers, br };
  });
  function renderSoil(S) {
    sg.setAttribute("opacity", S.soilA);
    if (S.soilA <= 0.002) return;
    cols.forEach((c, ci) => {
      c.layers.forEach((L, i) => {
        const p = easeOut((S.soilP - ci * 0.08 - i * 0.09) / 0.38);
        L.g.setAttribute("opacity", smooth(p * 2));
        L.g.setAttribute("transform", `translate(0 ${(-120 * (1 - p)).toFixed(1)})`);
      });
      c.br.setAttribute("opacity", smooth((S.soilP - 0.75) / 0.2));
    });
  }

  function render(S, t) {
    renderEmp(S); renderSoil(S);
    const on = S.rioA > 0.002 || S.coopA > 0.002 || S.lvA > 0.002;
    if (on !== shown) { shown = on; canvas.style.visibility = on ? "visible" : "hidden"; }
    if (!on) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(k, 0, 0, k, 0, 0);
    drawRio(S, t); drawCoops(S, t); drawLv(S);
  }
  return { render, resize, coopKinds: P.coopKinds };
}
