// 소개 영상: GSAP 한 줄 타임라인이 상태값(S)을 움직이고, 매 프레임 그 값으로 배경·지도·캔버스·SVG를 그린다.
// 그래서 어느 시점으로 감아도 같은 그림이 나온다.
import { gsap } from "gsap";
import { createBackground } from "./bg.js";
import { createMap, STAGE_W, STAGE_H } from "./map3d.js";
import { createFx } from "./fx.js";
import { createRice } from "./rice.js";
import { SCENE_GLOW, LAND_RAMP, RICE_DIV, C, hex } from "./palette.js";

const I = window.INTRO;
const $ = (s, r = document) => r.querySelector(s);
const stage = $("#stage"), player = $("#player");
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ── 숫자·이름 ─────────────────────────────────────────────
const unitName = (key) => key.split("|")[1].replace(/시부$/, "");
const man = (v, d = 1) => `${(v / 1e4).toFixed(v >= 1e6 ? 0 : d)}만`;
const nSido = new Set(I.map.sigun.map((s) => s.sido)).size;
const topLand = Object.entries(I.land.v).filter(([, v]) => v).sort((a, b) => b[1] - a[1]).slice(0, 3);
const fcNow = I.rice.fc.at(-1);
const PK = I.power.k, PM = I.power.months;
const yearSum = (y) => PM.reduce((s, m, i) => (m.startsWith(y) ? s + PK[i] : s), 0);
const lastFull = String(+PM.at(-1).slice(0, 4) - (PM.at(-1).endsWith("12") ? 0 : 1));
const growth = yearSum(lastFull) / yearSum(PM[0].slice(0, 4));

// ── 장면 글 ───────────────────────────────────────────────
const split = (lines) => lines.map((l) => `<span class="ln">${[...l].map((ch) => `<span class="ch${ch === " " ? " sp" : ""}">${ch === " " ? "&nbsp;" : ch}</span>`).join("")}</span>`).join("");
const scene = (id, no, kicker, lines, sub, extra = "") => `
  <section class="sc" id="sc-${id}">
    <p class="kicker"><b>${no}</b>${kicker}</p>
    <h2 class="hl">${split(lines)}</h2>
    <p class="it-sub">${sub}</p>
    ${extra}
  </section>`;
const gradient = (stops) => `linear-gradient(90deg, ${stops.join(", ")})`;

stage.insertAdjacentHTML("beforeend", `
  <div class="copy">
    <section class="sc sc-open" id="sc-open">
      <p class="kicker"><span class="mark"></span>ag-rstat.vercel.app</p>
      <h1 class="hl hl-xl">${split(["지역농업", "현황판"])}</h1>
      <p class="it-sub">공개 통계로 보는 우리 지역 농업</p>
    </section>
    ${scene("stats", "01", "주요통계", [`${I.map.sigun.length}개 시군을`, "한 화면에"], "농가·경지·가축·작물·소득·예산을<br>시도와 시군별로 바로 비교",
      `<div class="nums">
        <div><b data-n="${I.map.sigun.length}">0</b><span>시군</span></div>
        <div><b data-n="${nSido}">0</b><span>시도</span></div>
        <div><b data-n="${Math.round(I.land.nat / 1e4)}" data-suf="만">0</b><span>ha 경지</span></div>
      </div>`)}
    ${scene("rice", "02", "벼 작황", ["쌀 수확량을", "7월부터 미리"], "기상·위성·병해충 예찰로 시군별 단수를 예측하고<br>확정치로 정확도를 공개",
      `<div class="big"><b data-n="${fcNow.y}" data-dec="1">0</b><small>kg/10a</small></div>
       <p class="big-cap">${I.rice.year} 전국 쌀 단수 예측 · ${fcNow.lab}</p>`)}
    ${scene("flow", "03", "물류동향", ["농산물이", "움직이는 길"], `물류기기 공동이용 ${I.flows.year - 2004}년 실적으로 본<br>시군 사이 흐름`,
      `<ol class="pairs">${I.flows.top.slice(0, 3).map(([o, d, v]) => `<li><span class="o">${unitName(o)}</span><i></i><span class="d">${unitName(d)}</span><b>${man(v, 0)}개</b></li>`).join("")}</ol>`)}
    ${scene("power", "04", "농사용 전기", ["계절을 따라 도는", "농업 전력"], "한전 시군·월별 사용량으로<br>지역 농업활동을 읽는다",
      `<ul class="it-facts">
        <li><b>1~2월</b><span>시설 난방이 가장 많다</span></li>
        <li><b>8~9월</b><span>여름 두 번째 정점</span></li>
        <li><b>${growth.toFixed(1)}배</b><span>${PM[0].slice(0, 4)}년보다 늘어난 ${lastFull}년 사용량</span></li>
      </ul>`)}
  </div>
  <div class="labels">${topLand.map(([k, v]) => `<div class="lab" data-k="${k}"><b>${unitName(k)}</b><span>${man(v)} ha</span></div>`).join("")}</div>
  <div class="lgs">
    <div class="it-lg" id="lg-stats"><span>경지면적 ${I.land.year}</span><i class="bar" style="background:${gradient(LAND_RAMP)}"></i><span>높이·색이 클수록 넓다</span></div>
    <div class="it-lg" id="lg-rice"><span>평년보다 낮음</span><i class="bar" style="background:${gradient([RICE_DIV.lo, RICE_DIV.mid, RICE_DIV.hi])}"></i><span>높음 · ${I.rice.year} 시군 예측</span></div>
    <div class="it-lg" id="lg-flow"><i class="it-dot" style="background:${C.origin}"></i><span>보낸 곳</span><i class="it-dot" style="background:${C.dest}"></i><span>받은 곳 · 컨테이너 ${I.flows.year}년 ${I.flows.months} · 상위 50</span></div>
    <div class="it-lg" id="lg-power"><span>전국 농사용 전력 월 사용량 · ${PM[0].replace("-", ".")}~${PM.at(-1).replace("-", ".")}</span></div>
  </div>
  <div class="more" id="sc-more">
    <p class="kicker"><b>05</b>그리고 더</p>
    <h2 class="hl">${split(["지역 농업의 숫자를 한곳에"])}</h2>
    <div class="cards">${[
      ["rio", "지역산업연관표(농업)", "생산·부가가치·일자리 파급", "#f5a524", '<circle cx="6" cy="7" r="2.4"/><circle cx="18" cy="6" r="2.4"/><circle cx="12" cy="17" r="2.4"/><path d="M8.2 8.2l2.6 6.6M15.9 7.6l-2.7 7.3M8.4 6.8l7.2-.6"/>'],
      ["employ", "농업고용", "농림어업 취업자 60년", "#ffcf7a", '<circle cx="9" cy="7.5" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.3"/><path d="M15.5 14.3a4.5 4.5 0 0 1 6 4.7"/>'],
      ["agfin", "농업금융보험", "농·축협 재무 · 재해보험", "#7cc98f", '<path d="M12 3l7.5 3v5.5c0 4.6-3.2 8-7.5 9.5-4.3-1.5-7.5-4.9-7.5-9.5V6z"/><path d="M8.8 12.2l2.2 2.2 4.4-4.6"/>'],
      ["jikbul", "직불금·고향사랑", "직불금 예산 · 고향사랑기금", "#3cc0b0", '<ellipse cx="12" cy="6.5" rx="7" ry="2.8"/><path d="M5 6.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5M5 11.5v5c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-5"/>'],
      ["ruraldev", "농촌개발", "사업 예산 · 사업 지구", "#5fb3ff", '<path d="M3 20h18M5 20v-8l5-4 5 4v8M15 20v-6l3-2.5 3 2.5v6"/><path d="M8.5 20v-4h3v4"/>'],
      ["soil", "농경지 토양", "토양 적성 · 양분 상태", "#8f9dff", '<path d="M3 8.5c3-2 6 2 9 0s6-2 9 0M3 13c3-2 6 2 9 0s6-2 9 0M3 17.5c3-2 6 2 9 0s6-2 9 0"/>'],
      ["livestock", "축산 환경", "가축분뇨 발생·처리", "#ff8a6b", '<path d="M12 3.5c3.5 4.4 6 7.7 6 10.6a6 6 0 0 1-12 0c0-2.9 2.5-6.2 6-10.6z"/><path d="M9.2 14.6a2.9 2.9 0 0 0 2.8 2.6"/>'],
    ].map(([href, t, d, c, icon]) => `<a class="card" href="${href}" style="--c:${c}"><svg viewBox="0 0 24 24" aria-hidden="true">${icon}</svg><b>${t}</b><span>${d}</span></a>`).join("")}</div>
  </div>
  <div class="outro" id="sc-end">
    <span class="mark big"></span>
    <h2 class="hl">${split(["지역농업 현황판"])}</h2>
    <p class="url">ag-rstat.vercel.app</p>
    <p class="srcs">국가데이터처 · 한국은행 · 한전 · 농촌진흥청 · 지방재정365 등 공개 자료</p>
    <div class="btns"><a class="btn pri" href="./">현황판 열기</a><button type="button" class="btn" id="again">다시 보기</button></div>
  </div>`);

// ── 그리기 층 ─────────────────────────────────────────────
const S = {
  scene: 0, bgI: 0, glow: 0, morph: 0, pAlpha: 1, mapAlpha: 0, rise: 0, tilt: 0, orbit: 0, camDist: 23.5, camX: 0, camY: 0,
  mapShift: 300, mapLift: 0, riceColor: 0, mapDim: 0, glAlpha: 1, labels: 0,
  riceAlpha: 0, riceLine: 0, riceFc: 0, flows: 0, flowAlpha: 0, spiral: 0, powerAlpha: 0,
};
const map = createMap($("#gl"), I);
const fx = createFx($("#fx"), I, map);
const rice = createRice($("#rice"), I);
let bg = { draw() {}, canvas: $("#bg"), kind: "…" };
const labs = [...stage.querySelectorAll(".lab")];

// 무대 크기: 1920×1080 논리 좌표를 플레이어 폭에 맞춰 줄이고, 캔버스는 실제 화소로 그린다
let bgW = 960, bgH = 540;
function fit() {
  const s = player.clientWidth / STAGE_W;
  stage.style.transform = `scale(${s})`;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const w = Math.min(2880, Math.max(640, Math.round(STAGE_W * s * dpr))), h = Math.round((w * STAGE_H) / STAGE_W);
  map.resize(w, h); fx.resize(w, h);
  bgW = Math.max(480, Math.round(w / 2)); bgH = Math.round((bgW * STAGE_H) / STAGE_W);
  bg.canvas.width = bgW; bg.canvas.height = bgH;
}
new ResizeObserver(fit).observe(player);

// ── 타임라인 ──────────────────────────────────────────────
const CH = [
  { id: "open", t: 0, name: "열기" },
  { id: "stats", t: 4, name: "주요통계", href: "./" },
  { id: "rice", t: 10, name: "벼 작황", href: "rice" },
  { id: "flow", t: 16, name: "물류동향", href: "flow" },
  { id: "power", t: 21, name: "농사용 전기", href: "power" },
  { id: "more", t: 25, name: "그리고 더" },
];
const TOTAL = 30;
const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
const to = (vars, at, duration, ease = "power2.inOut") => tl.to(S, { ...vars, duration, ease }, at);

function copyIn(sel, at) {
  const r = $(sel);
  tl.set(r, { autoAlpha: 1, y: 0 }, at)
    .fromTo(r.querySelector(".kicker"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, at)
    .fromTo(r.querySelectorAll(".hl .ch"), { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.85, stagger: 0.028, ease: "expo.out" }, at + 0.1);
  const sub = r.querySelector(".it-sub");
  if (sub) tl.fromTo(sub, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, at + 0.55);
}
function copyOut(sel, at) {
  tl.to($(sel), { autoAlpha: 0, y: -26, duration: 0.5, ease: "power2.in" }, at);
}
// 세는 숫자: 값만 타임라인으로 움직이고 글자는 frame()이 쓴다 (감기·되감기에도 맞게)
const counters = [];
function countUp(elm, at, duration) {
  const n = +elm.dataset.n, dec = +(elm.dataset.dec || 0), suf = elm.dataset.suf || "";
  const o = { v: dec ? n * 0.94 : 0, last: "" };
  counters.push({ elm, o, dec, suf });
  tl.fromTo(o, { v: o.v }, { v: n, duration, ease: "power3.out" }, at);
}
const lgIn = (id, at, out) => tl.fromTo(`#lg-${id}`, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, at).to(`#lg-${id}`, { autoAlpha: 0, duration: 0.4 }, out);

gsap.set(".sc, .it-lg, .more, .outro", { autoAlpha: 0 });

// 0 열기 (0–4초): 빛 입자가 모여 지도가 된다
to({ bgI: 1 }, 0, 1.6, "power1.out");
to({ morph: 1 }, 0.15, 3.3, "none");
to({ glow: 0.5 }, 1.2, 2.2);
copyIn("#sc-open", 0.45);
tl.fromTo("#sc-open .mark", { scale: 0.4, rotate: -90 }, { scale: 1, rotate: 0, duration: 1.2, ease: "back.out(2)" }, 0.45);
copyOut("#sc-open", 3.45);
to({ mapAlpha: 1 }, 2.9, 1.2);
to({ pAlpha: 0.32 }, 3.3, 1.0);

// 1 주요통계 (4–10초): 기울며 경지면적만큼 솟는다
to({ scene: 1 }, 3.6, 1.4);
to({ tilt: 1 }, 4.0, 2.3);
to({ rise: 1 }, 4.5, 2.5, "power2.out");
to({ orbit: 0.36, camDist: 21.2 }, 4.0, 5.7, "sine.inOut");
to({ pAlpha: 0 }, 5.2, 1.2);
copyIn("#sc-stats", 4.1);
tl.fromTo("#sc-stats .nums > div", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" }, 4.8);
stage.querySelectorAll("#sc-stats [data-n]").forEach((e, i) => countUp(e, 4.8 + i * 0.12, 1.6));
lgIn("stats", 5.0, 9.2);
to({ labels: 1 }, 6.9, 0.6, "power2.out");
to({ labels: 0 }, 9.1, 0.4);
copyOut("#sc-stats", 9.3);

// 2 벼 작황 (10–16초): 내려앉으며 예측 색, 왼쪽에 단수 선과 예측 7번
to({ scene: 2 }, 9.6, 1.2);
to({ rise: 0, tilt: 0.24, orbit: 0, camDist: 23 }, 9.5, 1.6);
to({ riceColor: 1 }, 10.0, 1.3);
copyIn("#sc-rice", 10.1);
to({ riceAlpha: 1 }, 10.4, 0.6, "power1.out");
to({ riceLine: 1 }, 10.6, 1.9, "power1.inOut");
to({ riceFc: 1 }, 12.4, 1.9, "power1.out");
tl.fromTo("#sc-rice .big, #sc-rice .big-cap", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }, 12.3);
countUp($("#sc-rice [data-n]"), 12.3, 2.0);
lgIn("rice", 10.8, 15.3);
to({ riceAlpha: 0 }, 15.3, 0.5);
copyOut("#sc-rice", 15.3);

// 3 물류동향 (16–21초): 어두운 지도 위로 흐름
to({ scene: 3 }, 15.6, 1.2);
to({ riceColor: 0, mapDim: 1, tilt: 0, camDist: 15.2, camX: 0.5, camY: 1.5 }, 15.5, 1.3);
to({ flowAlpha: 1 }, 16.2, 0.3, "none");
to({ flows: 1 }, 16.2, 2.7, "power1.out");
copyIn("#sc-flow", 16.1);
tl.fromTo("#sc-flow .pairs li", { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, stagger: 0.14, duration: 0.55, ease: "power2.out" }, 17.4);
lgIn("flow", 16.6, 20.2);
to({ flowAlpha: 0 }, 20.3, 0.6);
copyOut("#sc-flow", 20.3);
to({ glAlpha: 0 }, 20.4, 0.8);

// 4 농사용 전기 (21–25초): 200개월 나선
to({ scene: 4 }, 20.6, 1.2);
to({ powerAlpha: 1 }, 20.9, 0.5, "power1.out");
to({ spiral: 1 }, 21.0, 3.1, "power1.inOut");
to({ glow: 0.32 }, 20.6, 1.0);
copyIn("#sc-power", 21.1);
tl.fromTo("#sc-power .it-facts li", { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, stagger: 0.16, duration: 0.55, ease: "power2.out" }, 22.3);
lgIn("power", 21.4, 24.4);
to({ powerAlpha: 0 }, 24.5, 0.5);
copyOut("#sc-power", 24.5);

// 5 그리고 더 (25–28초)
to({ scene: 5, glow: 0.2 }, 24.8, 1.0);
tl.set("#sc-more", { autoAlpha: 1, y: 0 }, 25.0)
  .fromTo("#sc-more .kicker", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 25.0)
  .fromTo("#sc-more .hl .ch", { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.7, stagger: 0.018, ease: "expo.out" }, 25.05)
  .fromTo("#sc-more .card", { autoAlpha: 0, y: 46, rotateX: -32 }, { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.085, ease: "power3.out" }, 25.25)
  .fromTo("#sc-more .card svg > *", { strokeDashoffset: 60 }, { strokeDashoffset: 0, duration: 1.0, stagger: 0.02, ease: "power2.out" }, 25.4)
  .to("#sc-more", { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" }, 27.5);

// 6 닫기 (28–30초)
to({ scene: 6, glow: 0.55 }, 27.8, 1.2);
tl.set("#sc-end", { autoAlpha: 1 }, 28.0)
  .fromTo("#sc-end .mark", { scale: 0.3, rotate: -120, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 1.1, ease: "back.out(1.8)" }, 28.0)
  .fromTo("#sc-end .hl .ch", { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.035, ease: "expo.out" }, 28.15)
  .fromTo("#sc-end .url, #sc-end .srcs, #sc-end .btns", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" }, 28.6)
  .set({}, {}, TOTAL);

// ── 프레임 ────────────────────────────────────────────────
const glowCols = SCENE_GLOW.map(([a, b]) => [hex(a).map((v) => v / 255), hex(b).map((v) => v / 255)]);
const U = new Float32Array(16);
const t0 = performance.now();
function frame() {
  const t = tl.time(), real = (performance.now() - t0) / 1000;
  // 배경: 장면 번호(실수)로 두 장면 색을 섞는다
  const i = Math.min(SCENE_GLOW.length - 2, Math.floor(S.scene)), f = S.scene - i;
  for (let c = 0; c < 3; c++) {
    U[4 + c] = glowCols[i][0][c] + (glowCols[i + 1][0][c] - glowCols[i][0][c]) * f;
    U[8 + c] = glowCols[i][1][c] + (glowCols[i + 1][1][c] - glowCols[i][1][c]) * f;
  }
  U[0] = real; U[1] = S.bgI; U[2] = bgW; U[3] = bgH;
  U[12] = (STAGE_W / 2 + S.mapShift) / STAGE_W; U[13] = 0.5; U[14] = 0.42; U[15] = S.glow;
  bg.draw(U);
  map.render(S, real);
  fx.render(S, t);
  rice.render(S);
  // 이름표: 기둥 꼭대기를 따라간다
  labs.forEach((l, n) => {
    const p = map.top(l.dataset.k);
    if (!p || S.labels <= 0.01) { l.style.opacity = 0; return; }
    const [x, y] = map.project(p[0], p[1], p[2]);
    const a = Math.min(1, Math.max(0, S.labels * 1.4 - n * 0.2));
    l.style.opacity = a;
    l.style.transform = `translate(${x.toFixed(1)}px, ${(y - 12 * (1 - a)).toFixed(1)}px)`;
  });
  counters.forEach((c) => {
    const txt = c.o.v.toFixed(c.dec).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + c.suf;
    if (txt !== c.o.last) { c.o.last = txt; c.elm.textContent = txt; }
  });
  ui();
}

// ── 조작 ─────────────────────────────────────────────────
const btnPlay = $("#play"), track = $("#track"), fill = $("#fill"), timeEl = $("#time"), go = $("#go"), chaps = $("#chaps");
chaps.innerHTML = CH.map((c) => `<button type="button" data-t="${c.t}" style="left:${(c.t / TOTAL) * 100}%">${c.name}</button>`).join("");
const chapBtns = [...chaps.children];
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
let lastCh = -1, lastState = "";
function ui() {
  const t = tl.time();
  fill.style.transform = `scaleX(${t / TOTAL})`;
  timeEl.textContent = `${mmss(t)} / ${mmss(TOTAL)}`;
  track.setAttribute("aria-valuenow", t.toFixed(1));
  const ci = CH.reduce((a, c, n) => (t >= c.t - 0.01 ? n : a), 0);
  if (ci !== lastCh) {
    lastCh = ci;
    chapBtns.forEach((b, n) => b.classList.toggle("on", n === ci));
    const c = CH[ci];
    go.hidden = !c.href;
    if (c.href) { go.href = c.href; go.textContent = `${c.name} 화면 열기 →`; }
  }
  const st = tl.progress() >= 1 ? "end" : tl.paused() ? "paused" : "playing";
  if (st !== lastState) {
    lastState = st;
    btnPlay.dataset.state = st;
    btnPlay.setAttribute("aria-label", st === "playing" ? "멈춤" : st === "end" ? "다시 보기" : "재생");
    player.classList.toggle("is-paused", st === "paused");
  }
}
function toggle() {
  if (tl.progress() >= 1) tl.restart();
  else tl.paused(!tl.paused());
}
btnPlay.addEventListener("click", toggle);
$("#again").addEventListener("click", () => tl.restart());
$("#bigplay").addEventListener("click", () => (tl.progress() >= 1 ? tl.restart() : tl.play()));
chapBtns.forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); tl.seek(+b.dataset.t + 0.001, false); if (tl.progress() < 1) tl.play(); }));

// 막대 끌어 감기
let wasPlaying = false;
const seekAt = (e) => { const r = track.getBoundingClientRect(); tl.seek(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * TOTAL, false); };
track.addEventListener("pointerdown", (e) => {
  if (e.target.closest("button")) return;
  wasPlaying = !tl.paused() && tl.progress() < 1; tl.pause();
  track.setPointerCapture(e.pointerId); seekAt(e);
});
track.addEventListener("pointermove", (e) => { if (track.hasPointerCapture(e.pointerId)) seekAt(e); });
track.addEventListener("pointerup", (e) => { track.releasePointerCapture(e.pointerId); if (wasPlaying) tl.play(); });
track.addEventListener("keydown", (e) => {
  const d = { ArrowLeft: -3, ArrowRight: 3 }[e.key];
  if (d) { e.preventDefault(); tl.seek(Math.min(TOTAL, Math.max(0, tl.time() + d))); }
});
document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, textarea, select")) return;
  if (e.key === " " || e.key === "k") { if (e.target.closest("a, button") && e.key === " ") return; e.preventDefault(); toggle(); }
  else if (e.key === "Home") { tl.seek(0); }
});
// 다른 탭으로 가면 멈춘다
let wasHidden = false;
document.addEventListener("visibilitychange", () => { if (document.hidden && !tl.paused()) { tl.pause(); wasHidden = true; } else if (!document.hidden && wasHidden) { wasHidden = false; tl.play(); } });

window.__intro = { tl, S }; // 확인용 (scripts에서 장면을 찍을 때)

// ── 시작 ─────────────────────────────────────────────────
(async () => {
  bg = await createBackground($("#bg"), { gpu: !/[?&]gl\b/.test(location.search) });
  stage.dataset.gpu = bg.kind;
  $("#gpu").textContent = bg.kind;
  fit();
  try { await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]); } catch { /* 글꼴이 늦으면 그냥 시작 */ }
  gsap.ticker.add(frame);
  player.classList.add("ready");
  if (reduce) { tl.seek(8.4); tl.pause(); } else tl.play(0);
})();
