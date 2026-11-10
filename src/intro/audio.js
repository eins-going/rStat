// 배경음악: Web Audio API로 그 자리에서 합성한다 (음원 파일 없음).
// 장면마다 다른 곡조(화음 진행·북 패턴·악기·선율)로 이야기를 따라간다. 박자는 장면 시작에 맞춰 다시 세어
// 장면이 바뀌는 순간이 늘 마디의 첫 박이 되게 하고, 커서 클릭·확대·결과 공개 같은 순간에는 효과음을 얹는다.
// 타임라인 시간에 맞춰 16분음표 단위로 미리 예약하고, 감기·멈춤 때는 예약을 지우고 그 시점부터 다시 잇는다.

const BPM = 112, STEP = 60 / BPM / 4, BAR = STEP * 16;
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
// 화음 [3음 + 베이스]
const CH = {
  Am: [57, 60, 64, 45], F: [57, 60, 65, 41], C: [55, 60, 64, 48], G: [55, 59, 62, 43], Dm: [57, 62, 65, 50],
  Em: [55, 59, 64, 40], E: [56, 59, 64, 40], Fm7: [57, 60, 64, 41], G6: [55, 59, 64, 43], Am9: [59, 60, 64, 45],
};
const prog = (...names) => names.map((n) => CH[n]);

// 북 패턴 (16칸, 0~1 세기)
const P = (s) => [...s].map((c) => (c === "." ? 0 : c === "x" ? 1 : c === "o" ? 0.55 : c === "-" ? 0.3 : 0));
const DR = {
  none: { k: P("................"), s: P("................"), h: P("................") },
  hero: { k: P("x...x...x...x..."), s: P("................"), h: P("..o...o...o...o.") },
  tech: { k: P("x.....x.x......."), s: P("....-.......-..."), h: P("-o-o-o-o-o-o-o-o") },
  half: { k: P("x.........x....."), s: P("........x......."), h: P("..-...-...-...-.") },
  soft: { k: P("x.......x......."), s: P("............o..."), h: P("o.-.o.-.o.-.o.-.") },
  march: { k: P("x...x...x...x..."), s: P("....x.......x.oo"), h: P("o.o.o.o.o.o.o.o.") },
  drive: { k: P("x...x...x...x.o."), s: P("....x.......x..."), h: P("-o-x-o-x-o-x-o-x") },
  pump: { k: P("x...x...x...x..."), s: P("....o.......o..."), h: P("..x...x...x...x.") },
};

export function createMusic({ T, sp, hits, events }) {
  // 장면 표: 곡조
  const SEC = [
    { at: 0, prog: prog("Am", "Fm7", "C", "G"), dr: "none", pad: 0.9, bass: 0, arp: "bell", cut: 900 },
    { at: T.stats, prog: prog("Am", "F", "C", "G"), dr: "hero", pad: 0.55, bass: 0.9, arp: null, stab: 0.8, cut: 1600 },
    { at: T.real, prog: prog("Am", "Am", "F", "G"), dr: "tech", pad: 0.35, bass: 0.7, arp: "pluck", cut: 1400 },
    { at: T.sat, prog: prog("Fm7", "Fm7", "Am", "Am"), dr: "half", pad: 0.9, bass: 0.6, arp: "bell", cut: 700, sweep: true },
    { at: T.rice, prog: prog("C", "G", "Am", "F"), dr: "soft", pad: 0.5, bass: 0.7, arp: "piano", cut: 2000, lead: { m: "A", from: 5.6 } },
    { at: T.jik, prog: prog("F", "G", "Em", "Am"), dr: "march", pad: 0.45, bass: 0.9, arp: null, stab: 0.6, cut: 1800 },
    { at: T.flow, prog: prog("Am", "F", "C", "G"), dr: "drive", pad: 0.35, bass: 1, arp: "pluck", cut: 2400, lead: { m: "B", from: 0 } },
    { at: T.power, prog: prog("Am", "G", "F", "E"), dr: "pump", pad: 0.6, bass: 1, arp: "saw", cut: 2600, pumpPad: true },
    ...[0, 1, 2, 3, 4, 5].map((i) => ({
      at: sp(i), prog: i % 2 ? prog("F", "G", "Am", "Am") : prog("Am", "F", "C", "G"), dr: i % 3 === 1 ? "march" : "drive",
      pad: 0.4, bass: 1, arp: ["pluck", "piano", "saw", "pluck", "bell", "saw"][i], cut: 2200 + i * 150, lead: { m: "S", from: 0, v: i }, up: i >= 3 ? 2 : 0,
    })),
    { at: T.wall, prog: prog("F", "G", "Am", "Am"), dr: "drive", pad: 0.7, bass: 1, arp: "saw", cut: 3000, build: true, up: 2 },
    { at: T.maker, prog: prog("F", "C", "G", "Am"), dr: "none", pad: 0.7, bass: 0.35, arp: "piano", cut: 1700, lead: { m: "R", from: 1.6 }, soft: true },
    { at: T.end, prog: prog("Am9"), dr: "none", pad: 1, bass: 0.7, arp: "bell", cut: 2400, end: true },
  ].map((s) => ({ ...s, s0: Math.round(s.at / STEP) }));
  const secAt = (n) => { let r = SEC[0]; for (const s of SEC) if (n >= s.s0) r = s; return r; };

  // 선율 (16분음표 칸, 미디 음, 길이 칸)
  const MEL = {
    A: [[0, 76, 4], [4, 74, 2], [6, 72, 2], [8, 74, 4], [12, 76, 4], [16, 79, 6], [22, 76, 2], [24, 74, 8]],
    B: [[0, 69, 2], [2, 72, 2], [4, 76, 2], [6, 74, 2], [8, 72, 4], [12, 69, 2], [14, 71, 2], [16, 72, 4], [20, 76, 4], [24, 79, 3], [27, 77, 1], [28, 76, 4]],
    R: [[0, 76, 8], [8, 74, 6], [14, 72, 2], [16, 72, 8], [24, 71, 4], [28, 69, 4], [32, 72, 8], [40, 74, 8], [48, 76, 16]],
  };
  // 여섯 화면: 장면마다 다른 짧은 동기
  const SPOT_MEL = [
    [[0, 81, 2], [2, 79, 2], [4, 76, 4], [8, 79, 2], [10, 81, 2], [12, 84, 4]],
    [[0, 72, 4], [4, 74, 4], [8, 76, 6], [14, 79, 2], [16, 77, 8]],
    [[0, 76, 1], [1, 79, 1], [2, 83, 2], [4, 81, 2], [6, 79, 2], [8, 76, 4], [12, 74, 4]],
    [[0, 69, 3], [3, 72, 3], [6, 76, 2], [8, 81, 8]],
    [[0, 84, 2], [4, 83, 2], [8, 81, 2], [12, 79, 4]],
    [[0, 76, 2], [2, 76, 2], [4, 79, 4], [8, 81, 2], [10, 79, 2], [12, 76, 4]],
  ];

  let ctx = null, master = null, bus = null, verb = null, noise = null;
  let vol = 0.7, on = false, running = false, base = 0, next = 0;
  const voices = new Set();

  function init() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 3.5; comp.attack.value = 0.004; comp.release.value = 0.2;
    master.connect(comp).connect(ctx.destination);
    bus = ctx.createGain(); bus.gain.value = 0.9; bus.connect(master);
    verb = ctx.createConvolver();
    const len = ctx.sampleRate * 2.8, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2.6; }
    verb.buffer = ir;
    const vg = ctx.createGain(); vg.gain.value = 0.34; verb.connect(vg).connect(master);
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const nd = noise.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  }

  // ── 소리 만들기 ───────────────────────────────────────
  const track = (src, g) => { const v = { src, g }; voices.add(v); src.onended = () => voices.delete(v); };
  function out(g, send = 0) { g.connect(bus); if (send) { const s = ctx.createGain(); s.gain.value = send; g.connect(s).connect(verb); } }
  function env(g, t, a, peak, d, sustain = 0) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + a);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, sustain), t + a + d);
  }
  function osc(type, f, t, dur, peak, { a = 0.005, lp = 0, q = 0.7, detune = 0, send = 0, sustain = 0, lpEnd = 0, vib = 0 } = {}) {
    const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = detune;
    const g = ctx.createGain(); env(g, t, a, peak, dur, sustain);
    let n = o;
    if (lp) {
      const fl = ctx.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.setValueAtTime(lp, t); fl.Q.value = q;
      if (lpEnd) fl.frequency.exponentialRampToValueAtTime(lpEnd, t + dur);
      o.connect(fl); n = fl;
    }
    if (vib) { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = 5.2; lg.gain.value = vib; l.connect(lg).connect(o.detune); l.start(t); l.stop(t + a + dur + 0.05); }
    n.connect(g); out(g, send);
    o.start(t); o.stop(t + a + dur + 0.05);
    track(o, g);
    return o;
  }
  function burst(t, dur, peak, type, freq, q = 1, send = 0, freqEnd = 0) {
    const s = ctx.createBufferSource(); s.buffer = noise;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.setValueAtTime(freq, t); f.Q.value = q;
    if (freqEnd) f.frequency.exponentialRampToValueAtTime(freqEnd, t + dur);
    const g = ctx.createGain(); env(g, t, 0.002, peak, dur);
    s.connect(f).connect(g); out(g, send);
    s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
    track(s, g);
  }
  const kick = (t, v) => { const o = osc("sine", 150, t, 0.42, 0.95 * v); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.13); };
  const hat = (t, v, open) => burst(t, open ? 0.16 : 0.035, 0.15 * v, "highpass", 8200, 0.8);
  const snare = (t, v) => { burst(t, 0.2, 0.3 * v, "bandpass", 1900, 0.7, 0.25); osc("triangle", 190, t, 0.09, 0.16 * v); };
  const bass = (t, m, v, dur, cut = 380) => osc("sawtooth", hz(m), t, dur, 0.19 * v, { a: 0.01, lp: cut, q: 4 });
  function pad(t, notes, v, dur, cut, sweep) {
    notes.forEach((m) => [-8, 8].forEach((dt) => osc("sawtooth", hz(m), t, dur, 0.026 * v, { a: 0.4, lp: sweep ? 380 : cut, lpEnd: sweep ? cut * 2.6 : 0, detune: dt, send: 0.5, sustain: 0.011 * v })));
  }
  const stab = (t, notes, v) => notes.forEach((m) => [-6, 6].forEach((dt) => osc("sawtooth", hz(m + 12), t, 0.22, 0.03 * v, { lp: 2600, lpEnd: 700, detune: dt, send: 0.3 })));
  const lead = (t, m, dur, v, soft) => osc(soft ? "triangle" : "square", hz(m), t, dur, (soft ? 0.085 : 0.04) * v, { a: soft ? 0.01 : 0.02, lp: soft ? 3000 : 2400, vib: soft ? 0 : 9, send: 0.4, sustain: (soft ? 0.03 : 0.02) * v });
  const ARP = {
    bell: { pat: [0, -1, -1, 2, -1, -1, 4, -1, -1, -1, 3, -1, -1, -1, 5, -1], play: (t, m, v) => { osc("sine", hz(m + 24), t, 1.1, 0.06 * v, { send: 0.7 }); osc("sine", hz(m + 36), t, 0.5, 0.015 * v, { send: 0.7 }); } },
    pluck: { pat: [0, 1, 2, 4, 1, 2, 4, 2, 0, 1, 2, 4, 2, 4, 5, 4], play: (t, m, v, cut) => osc("square", hz(m + 12), t, 0.16, 0.042 * v, { lp: cut + 800, send: 0.25 }) },
    piano: { pat: [0, -1, 2, -1, 1, -1, 2, -1, 0, -1, 2, -1, 4, -1, 2, -1], play: (t, m, v) => { osc("triangle", hz(m + 12), t, 0.7, 0.08 * v, { send: 0.45 }); osc("sine", hz(m + 24), t, 0.3, 0.02 * v); } },
    saw: { pat: [0, 2, 4, 2, 1, 3, 5, 3, 0, 2, 4, 2, 1, 3, 5, 3], play: (t, m, v, cut, s) => osc("sawtooth", hz(m + 12), t, 0.12, 0.036 * v, { lp: 600 + (s / 16) * cut * 1.6, q: 6, send: 0.2 }) },
  };
  function impact(t, big = 1) {
    const o = osc("sine", 70, t, 1.6, 0.8 * big, { send: 0.6 }); o.frequency.exponentialRampToValueAtTime(38, t + 1.2);
    burst(t, 1.1, 0.33 * big, "lowpass", 420, 0.5, 0.7);
    osc("triangle", hz(81), t, 1.4, 0.04 * big, { send: 0.9 });
  }
  function riser(t0, dur, v = 1) {
    const s = ctx.createBufferSource(); s.buffer = noise; s.loop = true;
    const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.Q.value = 2.2;
    f.frequency.setValueAtTime(300, t0); f.frequency.exponentialRampToValueAtTime(6000, t0 + dur);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.2 * v, t0 + dur * 0.95); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + 0.05);
    s.connect(f).connect(g); out(g, 0.4);
    s.start(t0); s.stop(t0 + dur + 0.1);
    track(s, g);
  }
  const FX = {
    click: (t) => { osc("sine", 2200, t, 0.03, 0.12); osc("sine", 1400, t + 0.012, 0.04, 0.06); },
    whoosh: (t) => burst(t, 0.7, 0.2, "bandpass", 4500, 1.4, 0.5, 400),
    ding: (t) => [88, 95, 100].forEach((m, i) => osc("sine", hz(m), t + i * 0.06, 1.2, 0.05, { send: 0.8 })),
    swell: (t) => [57, 64, 69].forEach((m) => osc("sawtooth", hz(m), t, 1.4, 0.02, { a: 0.9, lp: 500, lpEnd: 3000, send: 0.6 })),
  };

  // ── 16분음표 하나 예약 ─────────────────────────────────
  function step(n, at) {
    const t = n * STEP, S = secAt(n), rel = n - S.s0, s = ((rel % 16) + 16) % 16, bar = Math.floor(rel / 16);
    const up = S.up || 0;
    const ch = S.prog[((bar % S.prog.length) + S.prog.length) % S.prog.length].map((m) => m + up);
    const pump = S.pumpPad ? (s % 4 === 0 ? 0.35 : 1) : 1;
    // 패드: 마디 첫 칸 (빌드는 2칸마다 두드림)
    if (s === 0 && S.pad) pad(at, ch.slice(0, 3), S.pad, BAR * (S.end ? 2.2 : 1), S.cut, S.sweep);
    if (S.pumpPad && s % 4 === 2) pad(at, ch.slice(0, 3), S.pad * 0.6 * pump, STEP * 1.6, S.cut);
    if (S.stab && (s === 0 || s === 6 || s === 12)) stab(at, ch.slice(0, 3), S.stab);
    // 베이스
    if (S.bass) {
      const pat = S.dr === "drive" || S.dr === "pump" ? s % 2 === 0 : S.dr === "march" ? s % 4 !== 3 : s % 4 === 0;
      if (pat) bass(at, ch[3] + (S.dr === "drive" && s % 8 === 6 ? 12 : 0), S.bass, STEP * (S.dr === "half" ? 6 : 1.7), S.cut * 0.25);
    }
    // 북
    const D = DR[S.dr];
    let k = D.k[s], sn = D.s[s], hh = D.h[s];
    if (S.build) {
      const p = rel / Math.max(1, Math.round((T.maker - T.wall) / STEP));
      if (p > 0.4) k = s % 2 === 0 ? 1 : k;
      if (p > 0.55) sn = Math.max(sn, s % (p > 0.8 ? 1 : 2) === 0 ? 0.35 + 0.6 * p : 0);
    }
    if (k) kick(at, k);
    if (sn) snare(at, sn);
    if (hh) hat(at, hh, hh === 1 && s % 4 === 3);
    // 아르페지오
    if (S.arp) {
      const A = ARP[S.arp], idx = A.pat[s];
      if (idx >= 0) { const tones = [...ch.slice(0, 3), ch[0] + 12, ch[1] + 12, ch[2] + 12]; A.play(at, tones[idx], S.soft ? 0.8 : 1, S.cut, s); }
    }
    // 선율
    if (S.lead) {
      const from = Math.round(S.lead.from / STEP), r = rel - from;
      const mel = S.lead.m === "S" ? SPOT_MEL[S.lead.v] : MEL[S.lead.m];
      const len = S.lead.m === "S" ? 16 : S.lead.m === "R" ? 64 : 32;
      if (r >= 0) {
        const pos = r % len;
        if (S.lead.m === "R" && r >= len) { /* 한 번만 */ } else {
          mel.forEach(([o, m, l]) => { if (o === pos) lead(at, m + up, l * STEP, S.soft ? 1 : 0.9, S.soft || S.lead.m === "A"); });
        }
      }
    }
    // 장면 경계: 앞에서 상승음, 그 자리에서 쿵 / 효과음
    hits.forEach(({ t: h, big }) => {
      if (h >= t && h < t + STEP) impact(at + (h - t), big);
      const rs = h - 1.3;
      if (big >= 0.6 && rs >= t && rs < t + STEP) riser(at + (rs - t), 1.3, big);
    });
    for (const [kind, times] of Object.entries(events)) for (const e of times) if (e >= t && e < t + STEP) FX[kind](at + (e - t));
  }

  function kill() {
    const now = ctx.currentTime;
    voices.forEach((v) => { try { v.g.gain.cancelScheduledValues(now); v.g.gain.setTargetAtTime(0.0001, now, 0.02); v.src.stop(now + 0.1); } catch { /* 이미 멈춤 */ } });
    voices.clear();
  }
  function setGain() { if (master) master.gain.setTargetAtTime(on ? vol * 0.8 : 0, ctx.currentTime, 0.08); }

  return {
    get on() { return on; },
    async enable() { if (!ctx) init(); if (ctx.state !== "running") await ctx.resume(); on = true; running = false; setGain(); },
    disable() { on = false; setGain(); if (ctx) { kill(); running = false; } },
    setVolume(v) { vol = v; setGain(); },
    sync(t, playing) {
      if (!ctx || !on) return;
      if (!playing) { if (running) { kill(); running = false; } return; }
      const now = ctx.currentTime;
      if (running && Math.abs(now - base - t) > 0.12) { kill(); running = false; }
      if (!running) { base = now - t + 0.04; next = Math.ceil(t / STEP); running = true; }
      while (next * STEP < t + 0.18) { step(next, base + next * STEP); next++; }
    },
  };
}
