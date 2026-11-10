// Canvas 2D: 물류 흐름 호(가산 합성)와 농사용 전기 나선.
import { STAGE_W } from "./map3d.js";
import { C, POWER_RAMP, ramp, rgb, hex } from "./palette.js";

const clamp = (t) => (t < 0 ? 0 : t > 1 ? 1 : t);
const smooth = (t) => { t = clamp(t); return t * t * (3 - 2 * t); };
const frac = (x) => x - Math.floor(x);
const FONT = '"Pretendard Variable", Pretendard, system-ui, sans-serif';

export function createFx(canvas, I, map) {
  const ctx = canvas.getContext("2d");
  let k = 1;
  function resize(w, h) { canvas.width = w; canvas.height = h; k = w / STAGE_W; }

  // ── 물류 흐름 ───────────────────────────────────────────
  const flows = I.flows.top.slice(0, 50).map(([o, d, v], i) => ({ o, d, v, i, ph: frac(i * 0.618) }));
  const vmax = flows[0].v;
  const O = hex(C.melonO), Dc = hex(C.melonD);
  const bez = (p0, c, p1, t) => {
    const u = 1 - t;
    return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]];
  };
  const lerpC = (t) => O.map((v, i) => Math.round(v + (Dc[i] - v) * t));

  function drawFlows(S, t) {
    const A = S.flowAlpha;
    if (A <= 0.002 || S.flows <= 0.001) return;
    ctx.globalCompositeOperation = "lighter";
    const inflow = new Map();
    // 작은 흐름부터 그려 큰 흐름이 위에 오게
    for (let n = flows.length - 1; n >= 0; n--) {
      const f = flows[n];
      const a = map.top(f.o), b = map.top(f.d);
      if (!a || !b) continue;
      const p0 = map.project(a[0], a[1], a[2]), p1 = map.project(b[0], b[1], b[2]);
      const dx = p1[0] - p0[0], dy = p1[1] - p0[1], len = Math.hypot(dx, dy) || 1;
      const c = [(p0[0] + p1[0]) / 2 - dy * 0.22, (p0[1] + p1[1]) / 2 + dx * 0.22 - len * 0.18];
      const pr = smooth((S.flows - (n / flows.length) * 0.55) / 0.45);
      if (pr <= 0) continue;
      const s = Math.sqrt(f.v / vmax);
      const top3 = n < 3;
      const g = ctx.createLinearGradient(p0[0], p0[1], p1[0], p1[1]);
      g.addColorStop(0, rgb(O, 1)); g.addColorStop(1, rgb(Dc, 1));
      const steps = Math.max(8, Math.round(len / 10));
      const path = () => {
        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        for (let j = 1; j <= steps * pr; j++) { const q = bez(p0, c, p1, j / steps); ctx.lineTo(q[0], q[1]); }
        const e = bez(p0, c, p1, pr); ctx.lineTo(e[0], e[1]);
      };
      ctx.lineCap = "round";
      ctx.strokeStyle = g;
      // 넓고 옅은 번짐 + 가는 심
      ctx.globalAlpha = A * (0.035 + 0.08 * s) * (top3 ? 1.5 : 1);
      ctx.lineWidth = 3 + 11 * s; path(); ctx.stroke();
      ctx.globalAlpha = A * (0.22 + 0.5 * s) * (top3 ? 1.2 : 1);
      ctx.lineWidth = 0.7 + 2.8 * s; path(); ctx.stroke();
      // 흐르는 빛 알갱이
      const nC = top3 ? 4 : s > 0.4 ? 3 : 2;
      const speed = 0.42 / (0.5 + len / 520);
      for (let m = 0; m < nC; m++) {
        const u = frac(t * speed + f.ph + m / nC);
        if (u > pr) continue;
        const q = bez(p0, c, p1, u);
        const r = 1.6 + 3.2 * s;
        const cc = lerpC(u);
        const rg = ctx.createRadialGradient(q[0], q[1], 0, q[0], q[1], r * 3.2);
        rg.addColorStop(0, rgb([255, 255, 255], 1)); rg.addColorStop(0.25, rgb(cc, 0.9)); rg.addColorStop(1, rgb(cc, 0));
        ctx.globalAlpha = A * (0.35 + 0.4 * Math.sin(u * Math.PI));
        ctx.fillStyle = rg;
        ctx.beginPath(); ctx.arc(q[0], q[1], r * 3.2, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = A * pr * 0.9;
      ctx.fillStyle = rgb(O, 1);
      ctx.beginPath(); ctx.arc(p0[0], p0[1], 1.6 + 2.2 * s, 0, Math.PI * 2); ctx.fill();
      if (pr > 0.98) inflow.set(f.d, { p: p1, v: (inflow.get(f.d)?.v || 0) + f.v });
    }
    // 받은 곳: 숨 쉬는 고리
    inflow.forEach(({ p, v }) => {
      const s = Math.sqrt(v / vmax);
      const r = 4 + 11 * s, pulse = frac(t * 0.6 + p[0] * 0.01);
      ctx.globalAlpha = A * 0.45;
      const rg = ctx.createRadialGradient(p[0], p[1], 0, p[0], p[1], r * 1.8);
      rg.addColorStop(0, rgb(Dc, 0.9)); rg.addColorStop(1, rgb(Dc, 0));
      ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(p[0], p[1], r * 1.8, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = A * (1 - pulse) * 0.7;
      ctx.strokeStyle = rgb(Dc, 1); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(p[0], p[1], r + pulse * 22, 0, Math.PI * 2); ctx.stroke();
    });
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }

  // ── 농사용 전기 나선 ─────────────────────────────────────
  const PK = I.power.k, PM = I.power.months, NP = PK.length;
  const kmax = Math.max(...PK);
  const m0 = +PM[0].slice(5, 7) - 1;
  const CX = 1250, CY = 548, R0 = 36, R1 = 400;
  const rad = (v) => R0 + (R1 - R0) * (v / kmax);
  const ang = (i) => -Math.PI / 2 + ((m0 + i) / 12) * Math.PI * 2;
  const pt = (i) => { const f = Math.floor(i), w = i - f; const v = w && f + 1 < NP ? PK[f] + (PK[f + 1] - PK[f]) * w : PK[f]; const r = rad(v), a = ang(i); return [CX + r * Math.cos(a), CY + r * Math.sin(a)]; };
  const yearCol = (i) => ramp(POWER_RAMP, i / (NP - 1));

  function drawPower(S) {
    const A = S.powerAlpha;
    if (A <= 0.002) return;
    const n = S.spiral * (NP - 1);
    ctx.save();
    ctx.globalAlpha = A;
    // 눈금 고리: 100만·200만 MWh
    ctx.setLineDash([2, 6]); ctx.lineWidth = 1;
    [1e6, 2e6].forEach((v) => {
      ctx.strokeStyle = "rgba(220,228,240,0.16)";
      ctx.beginPath(); ctx.arc(CX, CY, rad(v), 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = "rgba(220,228,240,0.45)"; ctx.font = `500 15px ${FONT}`; ctx.textAlign = "left";
      ctx.fillText(`${v / 1e4}만 MWh`, CX + 8, CY - rad(v) - 6);
    });
    ctx.setLineDash([]);
    // 달 이름
    ctx.font = `600 17px ${FONT}`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (let m = 0; m < 12; m++) {
      const a = -Math.PI / 2 + (m / 12) * Math.PI * 2, r = R1 + 34;
      ctx.fillStyle = m === 0 || m === 7 ? "rgba(255,220,160,0.85)" : "rgba(200,208,220,0.45)";
      ctx.fillText(`${m + 1}월`, CX + r * Math.cos(a), CY + r * Math.sin(a));
    }
    // 나선: 지난 해는 옅게, 지금 해는 밝게
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.globalCompositeOperation = "lighter";
    const SUB = 6;
    for (let i = 1; i <= Math.ceil(n); i++) {
      const end = Math.min(i, n);
      if (end <= i - 1) break;
      const age = (n - i) / 12;
      const fade = 0.32 + 0.68 * Math.exp(-age * 0.55);
      const cc = yearCol(i);
      ctx.strokeStyle = rgb(cc, 1);
      ctx.beginPath();
      const [sx, sy] = pt(i - 1); ctx.moveTo(sx, sy);
      for (let j = 1; j <= SUB; j++) { const q = i - 1 + ((end - (i - 1)) * j) / SUB; const [x, y] = pt(q); ctx.lineTo(x, y); }
      ctx.globalAlpha = A * fade * 0.22; ctx.lineWidth = 9; ctx.stroke();
      ctx.globalAlpha = A * fade; ctx.lineWidth = 2.2; ctx.stroke();
    }
    // 머리 빛
    if (n > 0) {
      const [hx, hy] = pt(n), cc = yearCol(n);
      const rg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 34);
      rg.addColorStop(0, "rgba(255,255,255,0.95)"); rg.addColorStop(0.2, rgb(cc, 0.8)); rg.addColorStop(1, rgb(cc, 0));
      ctx.globalAlpha = A; ctx.fillStyle = rg;
      ctx.beginPath(); ctx.arc(hx, hy, 34, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalCompositeOperation = "source-over";
    // 가운데: 연도
    const yi = Math.min(NP - 1, Math.floor(n + 0.001));
    ctx.globalAlpha = A;
    ctx.fillStyle = rgb(yearCol(n), 1);
    ctx.font = `800 64px ${FONT}`;
    ctx.fillText(PM[yi].slice(0, 4), CX, CY - 6);
    ctx.fillStyle = "rgba(220,228,240,0.6)"; ctx.font = `500 16px ${FONT}`;
    ctx.fillText(`${+PM[yi].slice(5, 7)}월 · ${Math.round(PK[yi] / 1e4)}만 MWh`, CX, CY + 36);
    ctx.restore();
  }

  let shown = true;
  function render(S, t) {
    // 그릴 것이 없으면 캔버스를 숨긴다 (지운 캔버스가 합성기에 옛 그림으로 남는 경우가 있다)
    const on = (S.flowAlpha > 0.002 && S.flows > 0.001) || S.powerAlpha > 0.002;
    if (on !== shown) { shown = on; canvas.style.visibility = on ? "visible" : "hidden"; }
    if (!on) return;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(k, 0, 0, k, 0, 0);
    drawFlows(S, t);
    drawPower(S);
  }
  return { render, resize };
}
