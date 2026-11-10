// 배경음악: Web Audio API로 그 자리에서 합성한다 (음원 파일 없음).
// 타임라인 시간에 박자를 맞춰 16분음표 단위로 미리 예약하고, 감기·멈춤 때는 예약을 지우고 그 시점부터 다시 잇는다.
// 112 BPM · A단조(Am–F–C–G). 장면이 바뀌는 곳에 상승음과 쿵 소리, 만든 이 장면에서는 북을 빼고 잔잔하게.

const BPM = 112, STEP = 60 / BPM / 4, BAR = STEP * 16;
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
const MAIN = [[57, 60, 64, 45], [57, 60, 65, 41], [55, 60, 64, 48], [55, 59, 62, 43]]; // Am F C G (+베이스)
const SOFT = [[57, 60, 64, 41], [55, 59, 62, 43], [55, 59, 64, 40], [57, 60, 64, 45]]; // F G Em Am 느낌

export function createMusic({ T, hits }) {
  let ctx = null, master = null, bus = null, verb = null, noise = null;
  let vol = 0.7, on = false, running = false, base = 0, next = 0;
  const voices = new Set();

  // 장면별 세기 (0~1)
  function mix(t) {
    if (t < T.stats - 0.4) return { pad: 0.75, bass: 0, kick: 0, hat: 0, snare: 0, arp: 0.25, soft: false };
    if (t < T.real) return { pad: 0.6, bass: 0.8, kick: 0.9, hat: 0, snare: 0, arp: 0.3, soft: false };
    if (t < T.rice) return { pad: 0.55, bass: 0.85, kick: 0.9, hat: 0.7, snare: 0, arp: 0.55, soft: false };
    if (t < T.wall) return { pad: 0.5, bass: 1, kick: 1, hat: 0.9, snare: 0.8, arp: 0.7, soft: false };
    if (t < T.maker - 0.2) return { pad: 0.6, bass: 1, kick: 1, hat: 1, snare: 1, arp: 0.8, soft: false, build: (t - T.wall) / (T.maker - T.wall) };
    if (t < T.end - 0.2) return { pad: 0.8, bass: 0.35, kick: 0, hat: 0, snare: 0, arp: 0.45, soft: true };
    return { pad: 0.9, bass: 0.6, kick: 0, hat: 0, snare: 0, arp: 0, soft: false, end: true };
  }

  function init() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 3.5; comp.attack.value = 0.004; comp.release.value = 0.2;
    master.connect(comp).connect(ctx.destination);
    bus = ctx.createGain(); bus.gain.value = 0.9; bus.connect(master);
    // 잔향: 소음이 줄어드는 임펄스
    verb = ctx.createConvolver();
    const len = ctx.sampleRate * 2.6, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2.6; }
    verb.buffer = ir;
    const vg = ctx.createGain(); vg.gain.value = 0.32; verb.connect(vg).connect(master);
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const nd = noise.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  }

  // ── 소리 만들기 ───────────────────────────────────────
  const track = (src, g, end) => { const v = { src, g, end }; voices.add(v); src.onended = () => voices.delete(v); return v; };
  function out(g, send = 0) { g.connect(bus); if (send) { const s = ctx.createGain(); s.gain.value = send; g.connect(s).connect(verb); } }
  function env(g, t, a, peak, d, sustain = 0) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, sustain), t + a + d);
  }
  function osc(type, f, t, dur, peak, { a = 0.005, d = dur, lp = 0, q = 0.7, detune = 0, send = 0, sustain = 0 } = {}) {
    const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = detune;
    const g = ctx.createGain(); env(g, t, a, peak, d, sustain);
    let n = o;
    if (lp) { const fl = ctx.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = lp; fl.Q.value = q; o.connect(fl); n = fl; }
    n.connect(g); out(g, send);
    o.start(t); o.stop(t + a + d + 0.05);
    track(o, g, t + a + d);
    return o;
  }
  function burst(t, dur, peak, type, freq, q = 1, send = 0) {
    const s = ctx.createBufferSource(); s.buffer = noise;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain(); env(g, t, 0.002, peak, dur);
    s.connect(f).connect(g); out(g, send);
    s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.05);
    track(s, g, t + dur);
  }
  const kick = (t, v) => { const o = osc("sine", 150, t, 0.42, 0.95 * v); o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.13); };
  const hat = (t, v, open) => burst(t, open ? 0.16 : 0.04, 0.16 * v, "highpass", 8200, 0.8);
  const snare = (t, v) => { burst(t, 0.2, 0.32 * v, "bandpass", 1900, 0.7, 0.25); osc("triangle", 190, t, 0.09, 0.18 * v); };
  const bass = (t, m, v, dur) => osc("sawtooth", hz(m), t, dur, 0.2 * v, { a: 0.01, lp: 380, q: 4 });
  const pluck = (t, m, v, soft) => osc(soft ? "triangle" : "square", hz(m), t, soft ? 0.5 : 0.17, (soft ? 0.09 : 0.045) * v, { lp: soft ? 2600 : 3200, send: soft ? 0.5 : 0.25 });
  function pad(t, notes, v, dur) {
    notes.forEach((m) => [-7, 7].forEach((dt) => osc("sawtooth", hz(m), t, dur, 0.028 * v, { a: 0.35, d: dur, lp: 1300, detune: dt, send: 0.45, sustain: 0.012 * v })));
  }
  function impact(t, big = 1) {
    const o = osc("sine", 58, t, 1.6, 0.8 * big, { send: 0.6 }); o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(38, t + 1.2);
    burst(t, 1.1, 0.35 * big, "lowpass", 420, 0.5, 0.7);
  }
  function riser(t0, dur, v = 1) {
    const s = ctx.createBufferSource(); s.buffer = noise; s.loop = true;
    const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.Q.value = 2.2;
    f.frequency.setValueAtTime(300, t0); f.frequency.exponentialRampToValueAtTime(6000, t0 + dur);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t0); g.gain.exponentialRampToValueAtTime(0.22 * v, t0 + dur * 0.95); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur + 0.05);
    s.connect(f).connect(g); out(g, 0.4);
    s.start(t0); s.stop(t0 + dur + 0.1);
    track(s, g, t0 + dur);
  }

  // ── 16분음표 하나 예약 ─────────────────────────────────
  function step(n, at) {
    const t = n * STEP, M = mix(t), s = ((n % 16) + 16) % 16, bar = Math.floor(n / 16);
    const ch = (M.soft ? SOFT : MAIN)[((bar % 4) + 4) % 4];
    if (s === 0 && M.pad) pad(at, ch.slice(0, 3), M.pad, BAR * (M.end ? 2.2 : 1));
    if (M.bass && (s % 2 === 0)) bass(at, ch[3] + (s % 8 === 6 ? 12 : 0), M.bass, STEP * 1.7);
    if (M.kick && (s % 4 === 0 || (M.build > 0.5 && s % 2 === 0))) kick(at, M.kick);
    if (M.hat && s % 2 === 1) hat(at, M.hat * (s % 4 === 3 ? 1 : 0.6), s % 8 === 7);
    if (M.snare && (s === 4 || s === 12 || (M.build > 0.75 && s >= 12))) snare(at, M.snare * (s > 12 ? 0.7 : 1));
    if (M.arp) {
      const pat = M.soft ? [0, -1, -1, -1, 1, -1, -1, -1, 2, -1, -1, -1, 1, -1, -1, -1] : [0, 1, 2, 4, 1, 2, 4, 2, 0, 1, 2, 4, 2, 4, 5, 4];
      const k = pat[s];
      if (k >= 0) { const tones = [...ch.slice(0, 3), ch[0] + 12, ch[1] + 12, ch[2] + 12]; pluck(at, tones[k] + 12, M.arp, M.soft); }
    }
    // 장면 경계: 앞에서 상승음, 그 자리에서 쿵
    hits.forEach(({ t: h, big }) => {
      if (h >= t && h < t + STEP) impact(at + (h - t), big);
      const rs = h - 1.3;
      if (big >= 0.6 && rs >= t && rs < t + STEP) riser(at + (rs - t), 1.3, big);
    });
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
    // 매 프레임: 타임라인 시간 t, 재생 중인지
    sync(t, playing) {
      if (!ctx || !on) return;
      if (!playing) { if (running) { kill(); running = false; } return; }
      const now = ctx.currentTime;
      if (running && Math.abs(now - base - t) > 0.12) { kill(); running = false; } // 감았거나 밀렸다
      if (!running) { base = now - t + 0.04; next = Math.ceil(t / STEP); running = true; }
      while (next * STEP < t + 0.18) { step(next, base + next * STEP); next++; }
    },
  };
}
