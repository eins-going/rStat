// 배경음악 + 내레이션: Web Audio API.
// 음악은 한 곡이다 — 처음부터 끝까지 같은 박자(112 BPM)·같은 조성(A단조)·같은 악기·같은 화음 진행이 이어지고,
// 장면에 따라 악기 층(패드·베이스·북·아르페지오·선율)의 세기만 몇 초에 걸쳐 서서히 오르내린다. 갈아 끼우지 않는다.
// 내레이션은 장면 시간에 맞춰 녹음 파일을 틀고, 말하는 동안 음악을 부드럽게 줄인다.
// 타임라인 시간에 맞춰 16분음표 단위로 미리 예약하고, 감기·멈춤 때는 예약을 지우고 그 시점부터 다시 잇는다.

const BPM = 112, STEP = 60 / BPM / 4, BAR = STEP * 16;
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
// 8마디 진행 하나를 끝까지 되풀이 (Am F C G | Am F G E→Am)
const PROG = [[57, 60, 64, 45], [57, 60, 65, 41], [55, 60, 64, 48], [55, 59, 62, 43], [57, 60, 64, 45], [57, 60, 65, 41], [55, 59, 62, 43], [56, 59, 64, 40]];

export function createMusic({ T, voice }) {
  // 층마다 [시간, 세기] — 사이는 직선으로 이어져 몇 초에 걸쳐 바뀐다
  // 내레이션 밑에 깔리는 음악: 목소리와 겹치는 선율은 빼고, 말소리 대역을 비운다(패드는 어둡게, 반짝임은 높은 음역)
  const LV = {
    pad: [[0, 0.8], [5, 0.7], [12, 0.6], [29, 0.55], [94, 0.6], [97, 0.75], [106, 0.85]],
    bass: [[0, 0], [4, 0], [8, 0.55], [12, 0.7], [21, 0.55], [29, 0.7], [48, 0.8], [92, 0.85], [95, 0.35], [102, 0.3], [106, 0.2]],
    kick: [[0, 0], [5, 0], [9, 0.45], [12, 0.6], [21, 0.6], [24, 0.35], [28, 0.35], [31, 0.6], [48, 0.7], [92, 0.75], [95, 0], [106, 0]],
    hat: [[0, 0], [12, 0], [15, 0.25], [21, 0.2], [24, 0.1], [29, 0.15], [33, 0.3], [48, 0.4], [92, 0.45], [94.5, 0], [106, 0]],
    snare: [[0, 0], [45, 0], [49, 0.22], [92, 0.28], [94.5, 0], [106, 0]],
    arp: [[0, 0.12], [6, 0.2], [14, 0.4], [29, 0.42], [48, 0.5], [92, 0.55], [95, 0.3], [102, 0.25], [106, 0]],
    bell: [[0, 0.45], [6, 0.25], [12, 0.12], [21, 0.15], [24, 0.4], [28, 0.18], [32, 0.08], [94, 0.1], [97, 0.35], [106, 0.6]],
    lead: [[0, 0], [106, 0]],
    cut: [[0, 650], [6, 1000], [14, 1300], [21, 1150], [26, 900], [30, 1350], [50, 1600], [92, 1700], [96, 1100], [106, 1400]],
  };
  const level = (k, t) => {
    const a = LV[k];
    if (t <= a[0][0]) return a[0][1];
    for (let i = 1; i < a.length; i++) if (t <= a[i][0]) { const [t0, v0] = a[i - 1], [t1, v1] = a[i]; return v0 + ((v1 - v0) * (t - t0)) / (t1 - t0); }
    return a[a.length - 1][1];
  };
  // 선율: 8마디(128칸)짜리 하나를 되풀이 — 세기만 바뀐다
  const MEL = [[0, 76, 4], [4, 74, 2], [6, 72, 2], [8, 74, 4], [12, 76, 4], [16, 77, 6], [22, 76, 2], [24, 74, 8],
    [32, 72, 4], [36, 74, 2], [38, 76, 2], [40, 79, 6], [46, 77, 2], [48, 76, 8], [56, 74, 8],
    [64, 76, 4], [68, 74, 2], [70, 72, 2], [72, 74, 4], [76, 76, 4], [80, 77, 6], [86, 79, 2], [88, 81, 8],
    [96, 79, 4], [100, 77, 2], [102, 76, 2], [104, 74, 6], [110, 72, 2], [112, 71, 8], [120, 69, 8]];
  const ARP = [0, 1, 2, 4, 1, 2, 4, 2, 0, 1, 2, 4, 2, 4, 5, 4];
  // 장면이 크게 바뀌는 몇 곳에만 아주 옅은 심벌 부풀림
  const SWELLS = [T.stats, T.rice, T.flow, T.maker].map((t) => t - 1.2);

  let ctx = null, master = null, bus = null, vbus = null, verb = null, noise = null;
  let vol = 0.7, on = false, running = false, base = 0, next = 0, voiceOn = true;
  const voices = new Set();
  // 내레이션
  const VO = { lines: voice?.lines || [], meta: null, buf: new Map(), cut: new Map(), src: null, id: null, loading: null };

  function init() {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -16; comp.ratio.value = 3; comp.attack.value = 0.005; comp.release.value = 0.25;
    master.connect(comp).connect(ctx.destination);
    bus = ctx.createGain(); bus.gain.value = 0.9; bus.connect(master);
    vbus = ctx.createGain(); vbus.gain.value = 1.15; vbus.connect(master);
    verb = ctx.createConvolver();
    const len = ctx.sampleRate * 2.8, ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len) ** 2.6; }
    verb.buffer = ir;
    const vg = ctx.createGain(); vg.gain.value = 0.32; verb.connect(vg).connect(bus);
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const nd = noise.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = Math.random() * 2 - 1;
  }

  // ── 소리 ─────────────────────────────────────────────
  const track = (src, g) => { const v = { src, g }; voices.add(v); src.onended = () => voices.delete(v); };
  function out(g, send = 0) { g.connect(bus); if (send) { const s = ctx.createGain(); s.gain.value = send; g.connect(s).connect(verb); } }
  function env(g, t, a, peak, d, sustain = 0) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, peak), t + a);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, sustain), t + a + d);
  }
  function osc(type, f, t, dur, peak, { a = 0.005, lp = 0, q = 0.7, detune = 0, send = 0, sustain = 0, vib = 0 } = {}) {
    if (peak < 0.0005) return null;
    const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = detune;
    const g = ctx.createGain(); env(g, t, a, peak, dur, sustain);
    let n = o;
    if (lp) { const fl = ctx.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = lp; fl.Q.value = q; o.connect(fl); n = fl; }
    if (vib) { const l = ctx.createOscillator(), lg = ctx.createGain(); l.frequency.value = 5; lg.gain.value = vib; l.connect(lg).connect(o.detune); l.start(t); l.stop(t + a + dur + 0.05); }
    n.connect(g); out(g, send);
    o.start(t); o.stop(t + a + dur + 0.05);
    track(o, g);
    return o;
  }
  function burst(t, dur, peak, type, freq, q = 1, send = 0, a = 0.002) {
    if (peak < 0.0005) return;
    const s = ctx.createBufferSource(); s.buffer = noise; s.loop = dur > 0.9;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain(); env(g, t, a, peak, dur);
    s.connect(f).connect(g); out(g, send);
    s.start(t, Math.random() * 0.5); s.stop(t + a + dur + 0.05);
    track(s, g);
  }
  const kick = (t, v) => { const o = osc("sine", 140, t, 0.4, 0.85 * v); if (o) { o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(44, t + 0.12); } };
  const hat = (t, v, open) => burst(t, open ? 0.14 : 0.035, 0.13 * v, "highpass", 8000, 0.8);
  const snare = (t, v) => { burst(t, 0.18, 0.26 * v, "bandpass", 1800, 0.7, 0.3); osc("triangle", 185, t, 0.08, 0.13 * v); };

  // ── 16분음표 하나 예약 (박자는 0초부터 하나로 이어진다) ──────────
  function step(n, at) {
    const t = n * STEP, s = ((n % 16) + 16) % 16, bar = Math.floor(n / 16);
    const ch = PROG[((bar % 8) + 8) % 8];
    const L = (k) => level(k, t), cut = L("cut");
    if (s === 0) {
      const v = L("pad");
      ch.slice(0, 3).forEach((m) => [-8, 8].forEach((dt) => osc("sawtooth", hz(m), at, BAR * 1.05, 0.026 * v, { a: 0.6, lp: cut, detune: dt, send: 0.55, sustain: 0.014 * v })));
    }
    const bv = L("bass");
    if (bv && s % 2 === 0) osc("sawtooth", hz(ch[3] + (s % 8 === 6 ? 12 : 0)), at, STEP * 1.6, 0.17 * bv, { a: 0.01, lp: 160 + cut * 0.15, q: 3 });
    const kv = L("kick");
    if (kv && s % 4 === 0) kick(at, kv);
    const hv = L("hat");
    if (hv && s % 2 === 1) hat(at, hv * (s % 4 === 3 ? 1 : 0.55), s % 8 === 7);
    const sv = L("snare");
    if (sv && (s === 4 || s === 12)) snare(at, sv);
    const av = L("arp");
    if (av) { const tones = [...ch.slice(0, 3), ch[0] + 12, ch[1] + 12, ch[2] + 12]; osc("sine", hz(tones[ARP[s]] + 24), at, 0.25, 0.04 * av, { a: 0.008, send: 0.45 }); }
    const be = L("bell");
    if (be && (s === 0 || s === 6 || s === 10)) osc("sine", hz(ch[s === 0 ? 0 : s === 6 ? 2 : 1] + 24), at, 1.3, 0.05 * be, { send: 0.75 });
    const lv = L("lead");
    if (lv) {
      const pos = ((n % 128) + 128) % 128;
      for (const [o, m, l] of MEL) if (o === pos) osc("triangle", hz(m), at, l * STEP * 1.1, 0.075 * lv, { a: 0.02, lp: 2600, vib: 6, send: 0.45, sustain: 0.03 * lv });
    }
    for (const w of SWELLS) if (w >= t && w < t + STEP) burst(at + (w - t), 1.2, 0.07, "highpass", 5000, 0.6, 0.6, 1.1);
  }

  // ── 내레이션 ─────────────────────────────────────────
  async function loadVoice() {
    if (VO.loading) return VO.loading;
    VO.loading = (async () => {
      const r = await fetch(`${voice.base}index.json`, { cache: "no-cache" });
      if (!r.ok) throw new Error("내레이션 없음");
      VO.meta = await r.json();
      await Promise.all(VO.lines.map(async (l) => {
        const m = VO.meta.files?.[l.id];
        if (!m) return;
        const ab = await (await fetch(`${voice.base}${m.file}`)).arrayBuffer();
        const buf = await ctx.decodeAudioData(ab);
        // 앞뒤 무음을 재서, 말이 정확히 at에 시작하고 말이 끝나면 다음 문장에 자리를 내준다
        const d = buf.getChannelData(0), sr = buf.sampleRate;
        let s = 0, e = d.length - 1;
        while (s < d.length && Math.abs(d[s]) < 0.02) s++;
        while (e > s && Math.abs(d[e]) < 0.02) e--;
        VO.buf.set(l.id, buf);
        VO.cut.set(l.id, { lead: Math.max(0, s / sr - 0.04), end: e / sr + 0.15 });
      }));
    })().catch(() => { VO.meta = null; });
    return VO.loading;
  }
  // 문장 l의 파일을 트는 구간: [at - 앞 무음, at - 앞 무음 + 말 끝]
  const span = (l) => { const c = VO.cut.get(l.id); return c ? [l.at - c.lead, l.at - c.lead + c.end] : null; };
  // 지금 문장 = 시작이 지난 가장 늦은 문장 (다음 문장이 시작되면 앞 문장의 꼬리는 끊는다)
  const activeLine = (t) => {
    let r = null;
    for (const l of VO.lines) { const sp = span(l); if (sp && t >= sp[0]) r = { l, sp }; }
    return r && t < r.sp[1] ? r.l : null;
  };
  function stopVoice() { if (VO.src) { try { VO.src.stop(); } catch { /* 이미 멈춤 */ } VO.src = null; } VO.id = null; }
  function duck(onv) { if (bus) bus.gain.setTargetAtTime(onv ? 0.38 : 0.9, ctx.currentTime, onv ? 0.12 : 0.5); }

  function kill() {
    const now = ctx.currentTime;
    voices.forEach((v) => { try { v.g.gain.cancelScheduledValues(now); v.g.gain.setTargetAtTime(0.0001, now, 0.03); v.src.stop(now + 0.15); } catch { /* 이미 멈춤 */ } });
    voices.clear();
    stopVoice();
  }
  function setGain() { if (master) master.gain.setTargetAtTime(on ? vol * 0.8 : 0, ctx.currentTime, 0.1); }

  return {
    get on() { return on; },
    get hasVoice() { return VO.buf.size > 0; },
    get voiceOn() { return voiceOn; },
    async enable() { if (!ctx) init(); if (ctx.state !== "running") await ctx.resume(); on = true; running = false; setGain(); if (voice) loadVoice(); },
    disable() { on = false; setGain(); if (ctx) { kill(); running = false; duck(false); } },
    setVolume(v) { vol = v; setGain(); },
    setVoice(v) { voiceOn = v; if (!v && ctx) { stopVoice(); duck(false); } },
    // 자막: 지금 말하는 문장 (내레이션을 듣고 있을 때만)
    caption(t) { if (!on || !voiceOn || !VO.buf.size) return null; return activeLine(t) || null; },
    sync(t, playing) {
      if (!ctx || !on) return;
      if (!playing) { if (running) { kill(); running = false; duck(false); } return; }
      const now = ctx.currentTime;
      if (running && Math.abs(now - base - t) > 0.12) { kill(); running = false; }
      if (!running) { base = now - t + 0.05; next = Math.ceil(t / STEP); running = true; }
      while (next * STEP < t + 0.18) { step(next, base + next * STEP); next++; }
      // 내레이션: 지금 문장을 그 자리(중간이면 중간부터)에서 튼다
      if (voiceOn && VO.buf.size) {
        const l = activeLine(t);
        if (l && VO.id !== l.id) {
          stopVoice();
          const src = ctx.createBufferSource(); src.buffer = VO.buf.get(l.id); src.connect(vbus);
          const st = span(l)[0], off = Math.max(0, t - st), when = base + st + off;
          src.start(Math.max(now, when), off);
          src.onended = () => { if (VO.src === src) { VO.src = null; duck(false); } };
          VO.src = src; VO.id = l.id; duck(true);
        } else if (!l && VO.id) { VO.id = null; }
      }
    },
  };
}
