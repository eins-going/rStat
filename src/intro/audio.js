// 배경음악 + 내레이션: Web Audio API로 그 자리에서 합성한다 (음원 파일 없음).
// 음악(2판)은 한 곡이다 — 96 BPM · D장조 · 한 마디 2.5초. 장면이 마디 선에서 바뀌므로 그림과 음악이 같이 넘어간다.
//   악기: 부드러운 건반(화음·주제 선율), 따뜻한 패드, 낮은 베이스, 나무 건반 같은 뜯는 소리, 가벼운 북·셰이커.
//   짜임: 건반 혼자(흩어진 통계) → 층이 쌓임(현황판) → 본론 → 건반과 패드만(만든 이) → 으뜸화음으로 맺음(닫기).
//   같은 박자·조성·악기·화음 진행이 끝까지 이어지고, 층의 세기만 한 마디 이상에 걸쳐 서서히 바뀐다. 갈아 끼우지 않는다.
// 내레이션은 장면 시간에 맞춰 녹음 파일을 틀고, 말하는 동안 음악을 부드럽게 줄인다.
// 타임라인 시간에 맞춰 16분음표 단위로 미리 예약하고, 감기·멈춤 때는 예약을 지우고 그 시점부터 다시 잇는다.
import { BPM, BAR } from "./timing.js";

const STEP = 60 / BPM / 4;
// 음량: 말이 없을 때 음악은 목소리보다 4dB쯤 작게(BUS), 말하는 동안은 13dB쯤 작게(DUCK) — render()로 재서 맞춘 값
const BUS = 1.4, DUCK = 0.5;
const LOOK = 0.6, DRIFT = 0.3; // 미리 예약하는 길이(초), 다시 맞추는 어긋남(초)
const hz = (m) => 440 * 2 ** ((m - 69) / 12);
// 8마디 진행: D | A/C# | Bm | G | D/F# | G | Em7 | A  — [화음 세 음(가운데 음역), 베이스]
const PROG = [
  [[62, 66, 69], 38], [[61, 64, 69], 37], [[59, 62, 66], 35], [[59, 62, 67], 43],
  [[57, 62, 66], 42], [[55, 59, 62], 43], [[55, 59, 64], 40], [[57, 61, 64], 45],
];
const CH_D = [[62, 66, 69], 38], CH_A = [[57, 61, 64], 45];
// 주제 선율: 화음 음만 짚는 8마디(128칸) — [칸, 음, 길이]
const MEL = [
  [0, 78, 4], [4, 81, 4], [8, 86, 8], [16, 85, 4], [20, 81, 4], [24, 76, 8], [32, 74, 4], [36, 78, 4], [40, 83, 8], [48, 83, 4], [52, 79, 4], [56, 74, 8],
  [64, 81, 4], [68, 78, 4], [72, 86, 8], [80, 83, 4], [84, 86, 4], [88, 79, 8], [96, 76, 4], [100, 79, 4], [104, 83, 8], [112, 81, 4], [116, 85, 4], [120, 88, 8],
];
const ARP = [0, 2, 1, 2, 0, 2, 1, 2]; // 8분음표 뜯는 소리

export function createMusic({ T, TOTAL, voice, offline = false, sampleRate = 44100 }) {
  const END_BAR = Math.round(T.end / BAR);
  const chordAt = (bar) => (bar >= END_BAR ? CH_D : bar === END_BAR - 1 ? CH_A : PROG[((bar % 8) + 8) % 8]);
  // 층마다 [시간, 세기] — 사이는 직선으로 이어진다
  const LV = {
    pad: [[0, 0.7], [T.title, 0.75], [T.stats, 0.8], [T.only, 0.65], [T.parcel, 0.8], [T.wall, 0.75], [T.maker, 0.6], [T.end, 0.85], [T.end + 5, 0.5], [TOTAL, 0]],
    comp: [[0, 0], [T.title, 0], [T.title + 2.5, 0.5], [T.stats, 0.7], [T.only, 0.5], [T.parcel, 0.7], [T.wall, 0.7], [T.maker, 0.5], [T.end, 0]],
    bass: [[0, 0], [T.title + 2.5, 0], [T.stats, 0.7], [T.only, 0.45], [T.parcel, 0.75], [T.wall, 0.7], [T.maker, 0.4], [T.end - 2.5, 0.4], [T.end, 0]],
    kick: [[0, 0], [T.stats - 2.5, 0], [T.stats, 0.5], [T.real, 0.6], [T.only, 0.3], [T.parcel, 0.62], [T.wall, 0.6], [T.maker, 0.25], [T.maker + 2.5, 0], [TOTAL, 0]],
    shaker: [[0, 0], [T.stats, 0], [T.real, 0.5], [T.only, 0.25], [T.parcel, 0.55], [T.flow, 0.7], [T.wall, 0.55], [T.maker, 0.15], [T.maker + 2.5, 0], [TOTAL, 0]],
    rim: [[0, 0], [T.parcel - 2.5, 0], [T.parcel, 0.5], [T.wall, 0.5], [T.maker, 0], [TOTAL, 0]],
    pluck: [[0, 0], [T.title, 0.2], [T.stats, 0.45], [T.only, 0.3], [T.parcel, 0.5], [T.flow, 0.6], [T.wall, 0.5], [T.maker, 0.2], [T.end, 0.15], [T.end + 2.5, 0], [TOTAL, 0]],
    lead: [[0, 0.9], [T.title, 0.85], [T.stats, 0.4], [T.wall, 0.4], [T.maker, 0.6], [T.end, 0]],
    cut: [[0, 700], [T.title, 1000], [T.stats, 1400], [T.only, 1100], [T.parcel, 1500], [T.wall, 1500], [T.maker, 1000], [T.end, 1300], [TOTAL, 800]],
  };
  const level = (k, t) => {
    const a = LV[k];
    if (t <= a[0][0]) return a[0][1];
    for (let i = 1; i < a.length; i++) if (t <= a[i][0]) { const [t0, v0] = a[i - 1], [t1, v1] = a[i]; return v0 + ((v1 - v0) * (t - t0)) / (t1 - t0 || 1); }
    return a[a.length - 1][1];
  };
  // 큰 단락이 바뀌는 곳에만 아주 옅은 숨소리(부풀림)
  const SWELLS = [T.title, T.only, T.parcel, T.rice, T.jik, T.flow, T.vill, T.power, T.wall, T.maker, T.end].map((t) => t - 1.1);

  let ctx = null, master = null, bus = null, vbus = null, verb = null, noise = null;
  let vol = 0.7, on = false, running = false, base = 0, next = 0, voiceOn = true;
  const voices = new Set();
  const VO = { lines: voice?.lines || [], meta: null, buf: new Map(), cut: new Map(), src: null, id: null, loading: null };

  function init() {
    ctx = offline ? new OfflineAudioContext(2, Math.ceil(sampleRate * (TOTAL + 1.5)), sampleRate) : new (window.AudioContext || window.webkitAudioContext)();
    master = ctx.createGain(); master.gain.value = offline ? 0.56 : 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14; comp.ratio.value = 3; comp.attack.value = 0.006; comp.release.value = 0.25;
    master.connect(comp).connect(ctx.destination);
    bus = ctx.createGain(); bus.gain.value = BUS; bus.connect(master);
    vbus = ctx.createGain(); vbus.gain.value = 1.2; vbus.connect(master);
    verb = ctx.createConvolver();
    const len = Math.floor(ctx.sampleRate * 2.6), ir = ctx.createBuffer(2, len, ctx.sampleRate);
    let sd = 7;
    const r = () => ((sd = (sd * 1664525 + 1013904223) >>> 0) / 2147483648 - 1);
    for (let c = 0; c < 2; c++) { const d = ir.getChannelData(c); for (let i = 0; i < len; i++) d[i] = r() * (1 - i / len) ** 2.8; }
    verb.buffer = ir;
    const vg = ctx.createGain(); vg.gain.value = 0.3; verb.connect(vg).connect(bus);
    noise = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
    const nd = noise.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = r();
  }

  // ── 소리 ─────────────────────────────────────────────
  const track = (src, g) => { if (offline) return; const v = { src, g }; voices.add(v); src.onended = () => voices.delete(v); };
  function out(g, send = 0) { g.connect(bus); if (send) { const s = ctx.createGain(); s.gain.value = send; g.connect(s).connect(verb); } }
  // 음 하나: 올라갔다가(a) 줄어들며(dur) 끝에서 완전히 사라진다 — 끊기는 소리가 없다
  function tone(type, f, t, dur, peak, { a = 0.005, lp = 0, q = 0.7, detune = 0, send = 0, hold = 0 } = {}) {
    if (peak < 0.0004) return null;
    const o = ctx.createOscillator(); o.type = type; o.frequency.value = f; o.detune.value = detune;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    if (hold) { g.gain.setValueAtTime(peak, t + a + hold); g.gain.exponentialRampToValueAtTime(0.0001, t + a + hold + dur); } // 패드: 머문 뒤 사라짐
    else g.gain.exponentialRampToValueAtTime(0.0001, t + a + dur);
    let n = o;
    if (lp) { const fl = ctx.createBiquadFilter(); fl.type = "lowpass"; fl.frequency.value = lp; fl.Q.value = q; o.connect(fl); n = fl; }
    n.connect(g); out(g, send);
    o.start(t); o.stop(t + a + hold + dur + 0.03);
    track(o, g);
    return o;
  }
  function burst(t, dur, peak, type, freq, q = 1, send = 0, a = 0.002) {
    if (peak < 0.0004) return;
    const s = ctx.createBufferSource(); s.buffer = noise; s.loop = dur > 0.9;
    const f = ctx.createBiquadFilter(); f.type = type; f.frequency.value = freq; f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(0.0001, t + a + dur);
    s.connect(f).connect(g); out(g, send);
    s.start(t, (t * 0.37) % 0.5); s.stop(t + a + dur + 0.03);
    track(s, g);
  }
  // 부드러운 건반: 기음 + 살짝 어긋난 겹침 + 옅은 배음
  function piano(m, t, v, dur = 1.9, send = 0.34) {
    const f = hz(m);
    tone("sine", f, t, dur, 0.105 * v, { a: 0.004, send });
    tone("sine", f, t, dur * 0.9, 0.04 * v, { a: 0.004, detune: 7, send });
    tone("triangle", f, t, dur * 0.5, 0.045 * v, { a: 0.003, lp: 2400, send });
    tone("sine", f * 2, t, dur * 0.3, 0.02 * v, { a: 0.003, send });
  }
  const kick = (t, v) => { const o = tone("sine", 120, t, 0.3, 0.6 * v, { a: 0.003 }); if (o) { o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(46, t + 0.1); } };
  const shaker = (t, v, acc) => burst(t, acc ? 0.07 : 0.04, (acc ? 0.075 : 0.045) * v, "highpass", 7200, 0.7, 0.1, 0.006);
  const rim = (t, v) => { burst(t, 0.05, 0.1 * v, "bandpass", 2100, 2.2, 0.25); tone("triangle", 420, t, 0.045, 0.05 * v, { a: 0.001 }); };

  // ── 16분음표 하나 예약 (박자는 0초부터 하나로 이어진다) ──────────
  function step(n, at) {
    const t = n * STEP, s = ((n % 16) + 16) % 16, bar = Math.floor(n / 16);
    if (t > TOTAL) return;
    const [ch, bs] = chordAt(bar);
    const L = (k) => level(k, t), cut = L("cut");
    const ending = bar >= END_BAR;
    if (s === 0 && (!ending || bar === END_BAR)) {
      const v = L("pad"), len = ending ? TOTAL - t - 1.2 : BAR * 0.75;
      ch.forEach((m) => [-7, 7].forEach((dt) => tone("triangle", hz(m - 12), at, ending ? 3 : BAR * 0.6, 0.03 * v, { a: 0.7, lp: cut, detune: dt, send: 0.5, hold: len })));
      tone("sine", hz(ch[0] + 12), at, BAR * 0.6, 0.012 * v, { a: 0.9, send: 0.6, hold: Math.min(len, BAR * 0.75) });
    }
    if (ending) { // 맺음: 으뜸화음을 아래에서 위로 펼치고, 한 마디 뒤 높은 으뜸음 하나
      if (bar === END_BAR && s === 0) {
        [38, 45, 50, 57, 62, 66, 69, 74, 78].forEach((m, i) => piano(m, at + i * 0.075, 0.9 - i * 0.04, 5.5, 0.5));
        tone("sine", hz(26), at, 3.2, 0.2, { a: 0.02 });
      }
      if (bar === END_BAR + 1 && s === 0) { piano(86, at, 0.5, 4.5, 0.6); piano(81, at + 0.16, 0.35, 4, 0.6); }
      for (const w of SWELLS) if (w >= t && w < t + STEP) burst(at + (w - t), 1.1, 0.05, "highpass", 5200, 0.6, 0.6, 1.0);
      return;
    }
    // 화음 건반: 첫 박과 둘째 박 뒤
    const cv = L("comp");
    if (cv && (s === 0 || s === 6)) ch.forEach((m, i) => piano(m, at + i * 0.012, cv * (s === 0 ? 0.62 : 0.42), s === 0 ? 2.0 : 1.3));
    // 베이스: 1박 길게, 2박 뒤 짧게, 3박
    const bv = L("bass");
    if (bv && (s === 0 || s === 6 || s === 8)) {
      const d = s === 0 ? STEP * 5.5 : STEP * 2.6;
      tone("sine", hz(bs), at, d, 0.2 * bv, { a: 0.012 });
      tone("triangle", hz(bs), at, d * 0.8, 0.06 * bv, { a: 0.012, lp: 420 });
    }
    const kv = L("kick");
    if (kv && (s === 0 || s === 8 || (s === 11 && bar % 2 === 1))) kick(at, kv * (s === 11 ? 0.6 : 1));
    const rv = L("rim");
    if (rv && (s === 4 || s === 12)) rim(at, rv);
    const hv = L("shaker");
    if (hv) shaker(at, hv, s % 4 === 2);
    // 뜯는 소리: 8분음표로 화음을 오르내린다 (말소리보다 높은 음역)
    const av = L("pluck");
    if (av && s % 2 === 0) {
      const m = ch[ARP[s / 2]] + 12 + (s === 12 ? 12 : 0);
      tone("sine", hz(m), at, 0.3, 0.07 * av, { a: 0.003, send: 0.4 });
      tone("triangle", hz(m), at, 0.09, 0.035 * av, { a: 0.002, lp: 3000 });
    }
    // 주제 선율
    const lv = L("lead");
    if (lv) {
      const pos = ((n % 128) + 128) % 128;
      for (const [o, m, l] of MEL) if (o === pos) piano(m, at, lv * 0.8, 0.5 + l * STEP * 1.6, 0.5);
    }
    for (const w of SWELLS) if (w >= t && w < t + STEP) burst(at + (w - t), 1.1, 0.05, "highpass", 5200, 0.6, 0.6, 1.0);
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
        const ab = await (await fetch(`${voice.base}${m.file}?v=${VO.meta.made || ""}`)).arrayBuffer();
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
  function duck(onv) { if (bus) bus.gain.setTargetAtTime(onv ? DUCK : BUS, ctx.currentTime, onv ? 0.12 : 0.5); }

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
    // 몸짓 없이 켜 본다 (지난번에 소리를 켠 사람): 브라우저가 허락하면 바로 소리가 나고, 막으면 false — 그때는 처음 누를 때 enable()
    async tryEnable() {
      try {
        if (!ctx) init();
        if (ctx.state !== "running") { ctx.resume().catch(() => {}); await new Promise((r) => setTimeout(r, 350)); }
        if (ctx.state !== "running") return false;
      } catch { return false; }
      on = true; running = false; setGain(); if (voice) loadVoice();
      return true;
    },
    disable() { on = false; setGain(); if (ctx) { kill(); running = false; duck(false); } },
    setVolume(v) { vol = v; setGain(); },
    setVoice(v) { voiceOn = v; if (!v && ctx) { stopVoice(); duck(false); } },
    // 자막: 지금 말하는 문장 (내레이션을 듣고 있을 때만)
    caption(t) { if (!on || !voiceOn || !VO.buf.size) return null; return activeLine(t) || null; },
    sync(t, playing) {
      if (!ctx || !on) return;
      if (!playing) { if (running) { kill(); running = false; duck(false); } return; }
      const now = ctx.currentTime;
      // 타임라인은 벽시계를 따라가므로(main.js lagSmoothing(0)) 화면이 느려도 어긋나지 않는다. 크게 어긋날 때(감기)만 다시 맞춘다
      if (running && Math.abs(now - base - t) > DRIFT) { kill(); running = false; }
      if (!running) { base = now - t + 0.05; next = Math.ceil(t / STEP); running = true; }
      // 화면이 잠깐 멈춰도 소리가 비지 않게 넉넉히 미리 예약하고, 이미 지나간 박은 몰아서 내지 않고 건너뛴다
      while (next * STEP < t + LOOK) { const at = base + next * STEP; if (at > now - 0.03) step(next, at); next++; }
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
    // 통째로 그려 내기 (offline: true로 만든 경우): 음악과 내레이션을 한 번에 합쳐 AudioBuffer로 — 확인·내보내기용
    async render({ withVoice = true, withMusic = true } = {}) {
      init();
      if (withVoice && voice) await loadVoice();
      if (withMusic) for (let n = 0; n * STEP < TOTAL; n++) step(n, n * STEP);
      if (withVoice) for (const l of VO.lines) {
        const sp = span(l); if (!sp) continue;
        const src = ctx.createBufferSource(); src.buffer = VO.buf.get(l.id); src.connect(vbus);
        src.start(Math.max(0, sp[0]), 0, sp[1] - sp[0] + 0.2);
        bus.gain.setTargetAtTime(DUCK, Math.max(0, sp[0]), 0.12);
        bus.gain.setTargetAtTime(BUS, sp[1], 0.5);
      }
      return ctx.startRendering();
    },
  };
}
