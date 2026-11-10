// 소개 영상: GSAP 한 줄 타임라인이 상태값(S)과 DOM을 움직이고, 매 프레임 그 값으로 배경·지도·캔버스·SVG를 그린다.
// 그래서 어느 시점으로 감아도 같은 그림이 나온다.
import { gsap } from "gsap";
import { createBackground } from "./bg.js";
import { createMap, STAGE_W, STAGE_H } from "./map3d.js";
import { createFx } from "./fx.js";
import { createRice } from "./rice.js";
import { createBudget } from "./budget.js";
import { createScreen, createWall, VIEW_W, VIEW_H } from "./screens.js";
import { createSpots } from "./spots.js";
import { createMusic } from "./audio.js";
import { LINES } from "./narration.js";
import { SCENE_GLOW, LAND_RAMP, RICE_DIV, JIK_RAMP, DEV_RAMP, LV_RAMP, C, hex } from "./palette.js";

const I = window.INTRO;
const F = I.facts;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const stage = $("#stage"), player = $("#player");

// ── 숫자·이름 ─────────────────────────────────────────────
const unitName = (key) => key.split("|")[1].replace(/시부$/, "");
const comma = (v) => Math.round(v).toLocaleString("ko-KR");
const man = (v, d = 1) => `${(v / 1e4).toFixed(v >= 1e6 ? 0 : d)}만`;
const jo = (v) => { const e = Math.round(v / 100); return e >= 1e4 ? `${Math.floor(e / 1e4)}조 ${comma(e % 1e4)}억` : `${comma(e)}억`; };
const pct = (v) => `${Math.round(v * 100)}%`;
const topLand = Object.entries(I.land.v).filter(([, v]) => v).sort((a, b) => b[1] - a[1]).slice(0, 3);
const fcNow = I.rice.fc.at(-1);
const PK = I.power.k, PM = I.power.months;
const yearSum = (y) => PM.reduce((s, m, i) => (m.startsWith(y) ? s + PK[i] : s), 0);
const lastFull = String(+PM.at(-1).slice(0, 4) - (PM.at(-1).endsWith("12") ? 0 : 1));
const growth = yearSum(lastFull) / yearSum(PM[0].slice(0, 4));
const GH = I.gohyang, ghFirst = GH.years[0], ghLast = GH.years.at(-1);

// ── 글 조각 ───────────────────────────────────────────────
const split = (lines) => lines.map((l) => `<span class="ln">${[...l].map((ch) => `<span class="ch${ch === " " ? " sp" : ""}">${ch === " " ? "&nbsp;" : ch}</span>`).join("")}</span>`).join("");
const pts = (rows) => `<ul class="pts">${rows.map(([b, t]) => `<li><b>${b}</b><span>${t}</span></li>`).join("")}</ul>`;
const scene = (id, no, kicker, lines, sub, extra = "", cls = "") => `
  <section class="sc ${cls}" id="sc-${id}">
    <p class="kicker"><b>${no}</b>${kicker}</p>
    <h2 class="hl">${split(lines)}</h2>
    ${sub ? `<p class="it-sub">${sub}</p>` : ""}
    ${extra}
  </section>`;
const gradient = (stops) => `linear-gradient(90deg, ${stops.join(", ")})`;
const count = (n, { dec = 0, suf = "", from } = {}) => `<b class="cnt" data-n="${n}" data-dec="${dec}" data-suf="${suf}"${from != null ? ` data-from="${from}"` : ""}>${(+n).toFixed(dec)}${suf}</b>`;

// 나머지 여섯 화면: 특장점 한 줄 + 숫자
const SP = I.spots;
const rioTop = [...SP.rio.regions].sort((a, b) => b.lq - a.lq)[0];
const soilTot = SP.soil.pg.reduce((a, b) => a + b, 0), soil12 = ((SP.soil.pg[0] + SP.soil.pg[1]) / soilTot) * 100;
const lvKinds = [...SP.lv.kinds].sort((a, b) => b[1] - a[1]), lvSum = SP.lv.kinds.reduce((a, [, v]) => a + v, 0);
const devTop = Object.entries(SP.dev).sort((a, b) => b[1] - a[1])[0];
const SPOTS = [
  { id: "rio", no: "08", name: "지역산업연관표(농업)", href: "rio", big: count(Math.round(SP.rio.total / 1e6)), unit: "조원 농식품 산출", line: "17개 시도마다 농식품이 만드는 생산·부가가치·일자리 파급효과",
    pts: [[`${rioTop.name} ${rioTop.lq}`, "농식품 특화도 1위 — 전국 평균의 3.6배"], [`${F.rio.sectors}개 산업`, "무엇이 들어가고 어디에 쓰이는지까지"]] },
  { id: "employ", no: "09", name: "농업고용", href: "employ", big: count(+F.employ.to - +F.employ.from + 1), unit: "년의 농업 일자리", line: `농림어업 취업자 ${Math.round(F.employ.a0 / 10)}만 명이 ${Math.round(F.employ.a1 / 10)}만 명이 되기까지`,
    pts: [[`${comma(F.employ.months)}개월`, "월별 · 계절 · 시군별 · 연령·종사상지위·노동시간"]] },
  { id: "agfin", no: "10", name: "농업금융보험", href: "agfin", big: count(F.agfin.coops), unit: "개 농·축협", line: "조합마다 공시 재무를 지도 위에",
    pts: [[jo(F.agfin.paid), `${F.agfin.year} 농작물재해보험 보험금 · 가입 ${man(F.agfin.cnt)}건`], [`${F.agfin.cats}개 분야`, "과수·식량·채소·시설 재해보험을 시군 단위로"]] },
  { id: "ruraldev", no: "11", name: "농촌개발", href: "ruraldev", big: count(F.ruraldev.sites), unit: "개 사업 지구", line: "농어촌공사 지구의 유형·위치·준공 예정, 예산현액까지", cls: "right",
    pts: [[`${unitName(devTop[0])} ${devTop[1]}곳`, "지구가 가장 많은 시군"], [`${F.ruraldev.cats}개 갈래`, "지방재정365 세부사업 예산을 농가당으로"]] },
  { id: "soil", no: "12", name: "농경지 토양", href: "soil", big: count(Math.round(F.soil.tests / 1e4)), unit: "만 건 토양검정", line: `흙의 양분 ${F.soil.chem}가지와 땅의 적성등급`,
    pts: [[`${soil12.toFixed(1)}%`, "논으로 1·2급인 땅 — 국토에서 좋은 땅은 이만큼"], [`${F.soil.obst}가지`, "등급을 낮추는 저해요인까지"]] },
  { id: "livestock", no: "13", name: "축산 환경", href: "livestock", big: count(F.livestock.villages), unit: "개 마을", line: `점 하나가 마을 하나 — ${F.livestock.from}~${F.livestock.to} 가축분뇨 발생`, pts: [] },
];
const WALL = [["home", "주요통계"], ["rice", "벼 작황"], ["rio", "산업연관표"], ["flow", "물류동향"], ["power", "농사용 전기"],
  ["employ", "농업고용"], ["agfin", "금융보험"], ["jikbul", "직불금·고향사랑"], ["ruraldev", "농촌개발"], ["soil", "농경지 토양"],
  ["livestock", "축산 환경"], ["home_sat", "위성지도"], ["rice_sat", "위성 영상"], ["home_hn", "시군 현황판"], ["status", "자료 수집 현황"]];

stage.insertAdjacentHTML("beforeend", `
  <div class="copy">
    <section class="sc sc-open" id="sc-open">
      <p class="kicker"><span class="mark"></span>ag-rstat.vercel.app</p>
      <h1 class="hl hl-xl">${split(["지역농업", "현황판"])}</h1>
      <p class="it-sub">지역 농업의 모든 숫자를, 시군 단위로 한 화면에</p>
    </section>
    ${scene("stats", "01", "주요통계", [`${I.map.sigun.length}개 시군,`, `${F.metrics}개 지표`], "전국·시도·시군을 같은 눈금으로",
      pts([[`${comma(F.parcels / 1e4)}만`, "필지 — 팜맵 농경지를 전부 받아 직접 분석"], [`${F.parcelMed}㎡`, `전국 농경지 중앙값 · 0.1ha 미만이 ${pct(F.parcelSmall)}`], [pct(F.paddyArmt), "논 경지정리율을 시군마다 견준다"]]))}
    ${scene("real", "02", "실제 화면", ["고르면, 그 시군의", "현황판이 된다"], "시도·시군을 고르거나 지도를 누르면<br>모든 칸이 그 지역 숫자로 바뀝니다",
      pts([["전년 대비", "증감이 위쪽 띠로 흐른다"], ["시도 안 순위", "지도 아래에서 바로 비교"], ["주소 공유", "보던 화면을 그대로 보낸다"]]), "narrow")}
    ${scene("sat", "03", "위성지도", ["통계 뒤의", "실제 땅을 본다"], "",
      pts([["항공영상", `팜맵 필지 · 유통시설 ${comma(F.facilities)}곳 · 주제도`], ["논 NDVI", "Sentinel-2 10m — 논마다 벼가 얼마나 푸른지"], ["5일마다", "구름 낀 날은 레이더로, 2017년부터 날짜별로"]]), "narrow")}
    ${scene("rice", "04", "벼 작황", ["쌀 수확량을", "7월부터 미리"], "기상·위성·병해충 예찰로<br>시군별 단수를 7번 예측",
      `<div class="big b1">${count(fcNow.y, { dec: 1 })}<small>kg/10a</small></div>
       <p class="big-cap b1">${I.rice.year} 전국 단수 예측 · ${fcNow.lab}</p>
       <div class="big b2">${count(F.riceAcc.m0915, { dec: 1, from: F.riceAcc.norm })}<small>kg 평균 오차</small></div>
       <p class="big-cap b2">9월 15일 예측 · 국가데이터처 10월 예상 ${F.riceAcc.stat}kg과 같은 수준을 3주 먼저</p>`)}
    ${scene("jik", "05", "직불금·고향사랑", ["직불금, 우리 지역에", "얼마나 오나"], "지방재정365 세부사업 예산현액을<br>자동으로 모아 시군·농가당으로",
      `<ul class="chips"><li><b>${jo(I.jikbul.pubNat)}</b>공익직불 ${I.jikbul.year}</li><li><b>${I.jikbul.bizCount}개</b>시군 세부사업</li><li><b>고향사랑기금</b>${GH.govs}곳도</li></ul>`)}
    ${scene("flow", "06", "물류동향", ["수박 파렛트가", "움직이는 길"], `물류기기 공동이용 ${F.od.years}년 · ${F.od.crops}개 품목 중<br>${I.flows.year}년 수박 파렛트 ${comma(I.flows.total)}개의 이동`,
      `<ol class="pairs">${I.flows.top.slice(0, 3).map(([o, d, v]) => `<li><span class="o">${unitName(o)}</span><i></i><span class="d">${unitName(d)}</span><b>${comma(v)}개</b></li>`).join("")}</ol>`)}
    ${scene("power", "07", "농사용 전기", ["계절을 따라 도는", "농업 전력"], `한전 ${F.power.regions}개 지역 · ${F.power.months}개월`,
      `<ul class="it-facts">
        <li><b>4가지</b><span>${F.power.types.join("·")} 계절 유형 자동 분류</span></li>
        <li><b>평년 범위</b><span>벗어난 지역을 달마다 짚는다</span></li>
        <li><b>${growth.toFixed(1)}배</b><span>${PM[0].slice(0, 4)}년보다 늘어난 ${lastFull}년 사용량</span></li>
      </ul>`)}
    ${SPOTS.map((s) => `
      <section class="sc spot ${s.cls || ""}" id="sc-${s.id}">
        <p class="kicker"><b>${s.no}</b>${s.name}</p>
        <div class="spot-big">${s.big}<small>${s.unit}</small></div>
        <p class="spot-line">${s.line}</p>
        ${s.pts.length ? pts(s.pts) : ""}
      </section>`).join("")}
  </div>
  <div class="labels">${topLand.map(([k, v]) => `<div class="lab" data-k="${k}"><b>${unitName(k)}</b><span>${man(v)} ha</span></div>`).join("")}</div>
  <div class="lgs">
    <div class="it-lg" id="lg-stats"><span>경지면적 ${I.land.year}</span><i class="bar" style="background:${gradient(LAND_RAMP)}"></i><span>높이·색이 클수록 넓다</span></div>
    <div class="it-lg" id="lg-rice"><span>평년보다 낮음</span><i class="bar" style="background:${gradient([RICE_DIV.lo, RICE_DIV.mid, RICE_DIV.hi])}"></i><span>높음 · ${I.rice.year} 시군 예측</span></div>
    <div class="it-lg" id="lg-jik"><span>적음</span><i class="bar" style="background:${gradient(JIK_RAMP)}"></i><span>많음 · 농가당 공익직불(기본형) 예산 ${I.jikbul.year}</span></div>
    <div class="it-lg" id="lg-flow"><i class="it-dot" style="background:${C.melonO}"></i><span>보낸 산지</span><i class="it-dot" style="background:${C.melonD}"></i><span>받은 곳 · 수박 파렛트 ${I.flows.year}년 ${I.flows.months} · 상위 50</span></div>
    <div class="it-lg" id="lg-coop"><i class="it-dot" style="background:#f5a524"></i><span>지역농협 ${SP.coopKinds.L}</span><i class="it-dot" style="background:#ff7a59"></i><span>축협 ${SP.coopKinds.X}</span><i class="it-dot" style="background:#7cc98f"></i><span>품목농협 ${SP.coopKinds.I} · 점 크기 = 자산</span></div>
    <div class="it-lg" id="lg-dev"><span>적음</span><i class="bar" style="background:${gradient(DEV_RAMP)}"></i><span>많음 · 기둥 높이 = 시군 사업 지구 수 (한국농어촌공사)</span></div>
    <div class="it-lg" id="lg-lv"><span>마을당 분뇨 적음</span><i class="bar" style="background:${gradient(LV_RAMP)}"></i><span>많음 · 국립환경과학원 전국오염원조사</span></div>
    <div class="it-lg" id="lg-power"><span>전국 농사용 전력 월 사용량 · ${PM[0].replace("-", ".")}~${PM.at(-1).replace("-", ".")}</span></div>
  </div>`);

const scr = createScreen(stage, I, ["home", "home_jn", "home_hn", "home_sat", "rice_sat"]);
createWall(stage, WALL);
const ND = I.shots.ndvi || {};
stage.insertAdjacentHTML("beforeend", `
  <div class="nd" id="nd">
    <div class="nd-frame">
      <img class="nd-w" src="assets/intro/shots/ndvi_wide.webp" alt="" decoding="async" style="transform-origin:${(ND.fx ?? 0.3) * 100}% ${(ND.fy ?? 0.42) * 100}%">
      <img class="nd-z" src="assets/intro/shots/ndvi_zoom.webp" alt="" decoding="async" style="transform-origin:40% 63%">
      <img class="nd-c" src="assets/intro/shots/ndvi_close.webp" alt="" decoding="async">
      <span class="nd-ring" style="left:${(ND.fx ?? 0.3) * 100}%;top:${(ND.fy ?? 0.42) * 100}%"></span>
      <div class="nd-tag"><b>${ND.where || "김제시"} 논 NDVI</b><span>Sentinel-2 · ${ND.date ? ND.date.replace(/-/g, ".") : ""} · 구름 ${ND.cloud ?? "–"}%</span></div>
      <div class="nd-lg"><span>낮음</span><i></i><span>높음 · 벼가 푸를수록 초록</span></div>
    </div>
  </div>`);
const mini = (id, shot, x, y, w) => {
  stage.insertAdjacentHTML("beforeend", `<div class="mini" id="mini-${id}" style="left:${x}px;top:${y}px;width:${w}px"><div class="scr-bar"><i></i><i></i><i></i><span class="scr-url">ag-rstat.vercel.app/${shot}</span></div><div class="mini-view" style="height:${Math.round((w * 9) / 16)}px"><img src="assets/intro/shots/${shot}.webp" alt="" decoding="async"></div></div>`);
  return $(`#mini-${id}`);
};
mini("rio", "rio", 150, 560, 600);
mini("employ", "employ", 1250, 96, 560);
stage.insertAdjacentHTML("beforeend", `
  <div class="wall-copy" id="sc-wall">
    <p class="kicker"><b>14</b>자료 수집 현황</p>
    <h2 class="hl">${split([`자료 ${F.status.items}종, ${F.status.auto}종은 스스로 갱신`])}</h2>
    <p class="it-sub">${F.status.orgs}개 기관의 공개 자료 · 무엇을 언제 받았는지까지 공개</p>
  </div>
  <div class="maker" id="sc-maker">
    <figure class="mk-photo"><img src="assets/maker.webp" alt="" width="360" height="540"></figure>
    <div class="mk-text">
      <p class="kicker"><b>15</b>만든 이</p>
      <h2 class="hl">${split(["만든 이의 생각"])}</h2>
      <ol class="mk-phil">
        <li><b>그대로</b><span>공개된 자료를 출처와 함께, 고치지 않고</span></li>
        <li><b>우리 시군</b><span>전국 평균이 아니라 내 지역의 숫자로</span></li>
        <li><b>검증</b><span>예측은 맞았는지까지 공개한다</span></li>
        <li><b>한 화면</b><span>모은 자료는 모두 그림으로, 한눈에</span></li>
      </ol>
      <p class="mk-quote">“저는 완벽하지 않습니다. 부족한 부분은 지적해 주시고,<br>필요한 자료나 기능이 있으면 말씀해 주세요.”</p>
      <p class="mk-mail">agrirstat@gmail.com</p>
    </div>
  </div>
  <div class="outro" id="sc-end">
    <span class="mark big"></span>
    <h2 class="hl">${split(["지역농업 현황판"])}</h2>
    <p class="url">ag-rstat.vercel.app</p>
    <p class="srcs">국가데이터처 · 한국은행 · 한전 · 농촌진흥청 · 지방재정365 등 ${F.status.orgs}개 기관 공개 자료</p>
    <div class="btns"><a class="btn pri" href="./">현황판 열기</a><button type="button" class="btn" id="again">다시 보기</button></div>
  </div>`);

// ── 그리기 층 ─────────────────────────────────────────────
const S = {
  scene: 0, bgI: 0, glow: 0, morph: 0, pAlpha: 1, mapAlpha: 0, rise: 0, tilt: 0, orbit: 0, camDist: 23.5, camX: 0, camY: 0,
  mapShift: 300, mapLift: 0, riceColor: 0, jikColor: 0, mapDim: 0, glAlpha: 1, labels: 0,
  riceAlpha: 0, riceLine: 0, riceFc: 0, accAlpha: 0, riceAcc: 0, bdAlpha: 0, bdBars: 0, bdSplit: 0,
  flows: 0, flowAlpha: 0, spiral: 0, powerAlpha: 0,
  rioA: 0, rioP: 0, empA: 0, empP: 0, coopA: 0, coopP: 0, devRise: 0, devColor: 0, soilA: 0, soilP: 0, lvA: 0, lvP: 0,
};
const map = createMap($("#gl"), I);
const fx = createFx($("#fx"), I, map);
const rice = createRice($("#rice"), I);
const budget = createBudget($("#rice"), I);
const spots = createSpots($("#sp"), $("#spsvg"), I, map);
let bg = { draw() {}, canvas: $("#bg"), kind: "…" };
const labs = $$(".lab", stage);

// 무대 크기: 1920×1080 논리 좌표를 플레이어 폭에 맞춰 줄이고, 캔버스는 실제 화소로 그린다
let bgW = 960, bgH = 540;
function fit() {
  const s = player.clientWidth / STAGE_W;
  stage.style.transform = `scale(${s})`;
  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
  const w = Math.min(2880, Math.max(640, Math.round(STAGE_W * s * dpr))), h = Math.round((w * STAGE_H) / STAGE_W);
  map.resize(w, h); fx.resize(w, h); spots.resize(w, h);
  bgW = Math.max(480, Math.round(w / 2)); bgH = Math.round((bgW * STAGE_H) / STAGE_W);
  bg.canvas.width = bgW; bg.canvas.height = bgH;
}
new ResizeObserver(fit).observe(player);

// ── 시간표 ────────────────────────────────────────────────
const T = { open: 0, stats: 5, real: 12, sat: 21, rice: 29, jik: 40, flow: 48, power: 54, spot: 59, SPOT: 5, wall: 89.4, maker: 94.4, end: 102, total: 106 };
const CH = [
  { t: T.open, name: "열기" }, { t: T.stats, name: "주요통계", href: "./" }, { t: T.real, name: "실제 화면", href: "./" },
  { t: T.sat, name: "위성지도", href: "./" }, { t: T.rice, name: "벼 작황", href: "rice" }, { t: T.jik, name: "직불금·고향사랑", href: "jikbul" },
  { t: T.flow, name: "물류동향", href: "flow" }, { t: T.power, name: "농사용 전기", href: "power" },
  ...SPOTS.map((s, i) => ({ t: T.spot + i * T.SPOT, name: s.name, href: s.href })),
  { t: T.wall, name: "자료 수집 현황", href: "status" }, { t: T.maker, name: "만든이", href: "about" }, { t: T.end, name: "닫기" },
];
const TOTAL = T.total;
const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
const to = (vars, at, duration, ease = "power2.inOut") => tl.to(S, { ...vars, duration, ease }, at);
const sceneNo = (n, at, d = 1.2) => to({ scene: n }, at, d);

function copyIn(sel, at) {
  const r = typeof sel === "string" ? $(sel) : sel;
  tl.set(r, { autoAlpha: 1, y: 0 }, at)
    .fromTo(r.querySelector(".kicker"), { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, at);
  const ch = r.querySelectorAll(".hl .ch");
  if (ch.length) tl.fromTo(ch, { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.85, stagger: Math.min(0.028, 0.5 / ch.length), ease: "expo.out" }, at + 0.1);
  const sub = r.querySelector(".it-sub");
  if (sub) tl.fromTo(sub, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, at + 0.5);
}
const copyOut = (sel, at) => tl.to(typeof sel === "string" ? $(sel) : sel, { autoAlpha: 0, y: -24, duration: 0.45, ease: "power2.in" }, at);
const ptsIn = (sel, at, gap = 0.16) => { const e = $$(`${sel} .pts li, ${sel} .it-facts li, ${sel} .pairs li, ${sel} .chips li`); if (e.length) tl.fromTo(e, { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, stagger: gap, duration: 0.55, ease: "power2.out" }, at); };

// 세는 숫자: 값만 타임라인으로 움직이고 글자는 frame()이 쓴다 (감기·되감기에도 맞게)
const counters = [];
function countUp(elm, at, duration) {
  const n = +elm.dataset.n, dec = +(elm.dataset.dec || 0), suf = elm.dataset.suf || "";
  const from = elm.dataset.from != null ? +elm.dataset.from : dec ? n * 0.94 : 0;
  const o = { v: from, last: "" };
  counters.push({ elm, o, dec, suf });
  tl.fromTo(o, { v: from }, { v: n, duration, ease: "power3.out" }, at);
}
const lgIn = (id, at, out) => tl.fromTo(`#lg-${id}`, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, at).to(`#lg-${id}`, { autoAlpha: 0, duration: 0.4 }, out);

// 화면 창 조작
const Z = scr.zoom;
const showImg = (name, at, d = 0.4) => {
  Object.entries(scr.imgs).forEach(([n, e]) => tl.to(e, { autoAlpha: n === name ? 1 : 0, duration: d, ease: "power1.inOut" }, at));
};
const zoomTo = (rect, at, d, ease = "sine.inOut", pad) => tl.to(Z, { ...scr.focus(rect, pad), duration: d, ease }, at);
function clickAt(rect, at, move = 0.8) {
  const p = scr.at(rect);
  tl.to(scr.cursor, { x: p.x, y: p.y, duration: move, ease: "power3.inOut" }, at - move)
    .fromTo(scr.cursor.querySelector(".ripple"), { scale: 0.2, autoAlpha: 0.9 }, { scale: 2.6, autoAlpha: 0, duration: 0.55, ease: "power2.out" }, at)
    .fromTo(scr.cursor.querySelector("svg"), { scale: 1 }, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.inOut" }, at);
}

gsap.set(".sc, .it-lg, .outro, .maker, .wall-copy, #scr-wrap, #wall-wrap, .mk, #nd, .nd-z, .nd-c, .mini", { autoAlpha: 0 });
gsap.set(Z, { scale: 1, x: 0, y: 0, transformOrigin: "0 0" });
gsap.set(scr.cursor, { x: VIEW_W + 60, y: VIEW_H + 60, autoAlpha: 0 });
gsap.set(scr.cursor.querySelector(".ripple"), { autoAlpha: 0 });
gsap.set(Object.values(scr.imgs), { autoAlpha: 0 });

// 0 열기 (0–5초): 빛 입자가 모여 지도가 된다
to({ bgI: 1 }, 0, 1.6, "power1.out");
to({ morph: 1 }, 0.15, 3.6, "none");
to({ glow: 0.5 }, 1.2, 2.2);
copyIn("#sc-open", 0.45);
tl.fromTo("#sc-open .mark", { scale: 0.4, rotate: -90 }, { scale: 1, rotate: 0, duration: 1.2, ease: "back.out(2)" }, 0.45);
copyOut("#sc-open", 4.4);
to({ mapAlpha: 1 }, 3.3, 1.2);
to({ pAlpha: 0.32 }, 3.8, 1.0);

// 1 주요통계 (5–12초): 기울며 경지면적만큼 솟는다
sceneNo(1, 4.6, 1.4);
to({ tilt: 1 }, 5.0, 2.3);
to({ rise: 1 }, 5.5, 2.5, "power2.out");
to({ orbit: 0.36, camDist: 21.2 }, 5.0, 6.8, "sine.inOut");
to({ pAlpha: 0 }, 6.2, 1.2);
copyIn("#sc-stats", 5.1);
ptsIn("#sc-stats", 6.4, 0.22);
lgIn("stats", 6.0, 11.2);
to({ labels: 1 }, 8.0, 0.6, "power2.out");
to({ labels: 0 }, 11.0, 0.4);
copyOut("#sc-stats", 11.3);

// 2 실제 화면 (12–21초): 창이 날아들고, 커서가 전라남도 → 해남군을 고른다
sceneNo(2, 11.6);
to({ glAlpha: 0 }, 11.5, 0.8);
const W0 = T.real;
tl.set(scr.imgs.home, { autoAlpha: 1 }, W0)
  .fromTo("#scr-wrap", { autoAlpha: 0, rotateY: -30, rotateX: 10, x: 220, z: -320 }, { autoAlpha: 1, rotateY: -8, rotateX: 3, x: 0, z: 0, duration: 1.4, ease: "expo.out" }, W0);
copyIn("#sc-real", W0 + 0.3);
ptsIn("#sc-real", W0 + 1.6, 0.2);
tl.set(scr.cursor, { autoAlpha: 1 }, W0 + 1.2);
clickAt(scr.box("home", "#sido"), W0 + 2.6, 1.2);
showImg("home_jn", W0 + 2.75);
clickAt(scr.box("home_jn", "#sgg"), W0 + 4.2, 0.9);
showImg("home_hn", W0 + 4.35);
tl.to(scr.cursor, { autoAlpha: 0, duration: 0.3 }, W0 + 5.0);
[[".ticker", "전년 대비 증감이 흐른다", "bottom"], ["#map-card", "지도를 누르면 그 시군으로", "top"], [".col-right", "작물·소득·예산·농가경제", "top"]].forEach(([sel, label, side], i) => {
  const m = scr.mark(`r${i}`, scr.box("home", sel), label, side);
  if (m) tl.fromTo(m, { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power2.out" }, W0 + 5.2 + i * 0.55).to(m, { autoAlpha: 0, duration: 0.3 }, W0 + 8.3);
});
tl.to("#scr-wrap", { rotateY: -4, rotateX: 1.5, duration: 7, ease: "sine.inOut" }, W0 + 1.4);

// 3 위성지도 (21–29초): 위성지도 보기 → 항공영상·필지 → Sentinel-2 생육
sceneNo(3, T.sat - 0.4);
copyOut("#sc-real", T.sat - 0.3);
tl.set(scr.cursor, { autoAlpha: 1 }, T.sat - 1.0);
clickAt(scr.box("home_hn", "#view-btn"), T.sat + 0.1, 0.9);
showImg("home_sat", T.sat + 0.25, 0.5);
tl.to(scr.cursor, { autoAlpha: 0, duration: 0.3 }, T.sat + 0.7);
copyIn("#sc-sat", T.sat + 0.3);
ptsIn("#sc-sat", T.sat + 1.4, 0.5);
zoomTo([300, 120, 960, 600], T.sat + 0.8, 3.4, "sine.inOut", 1);
// 항공영상 창이 물러나고 논 NDVI가 크게: 시군 전체 → 확대 → 더 가까이
tl.to("#scr-wrap", { autoAlpha: 0, scale: 0.92, rotateY: -16, x: -80, duration: 0.7, ease: "power2.in" }, T.sat + 2.6);
tl.set("#nd", { autoAlpha: 1 }, T.sat + 2.8)
  .fromTo("#nd .nd-frame", { autoAlpha: 0, scale: 0.9, rotateY: 14 }, { autoAlpha: 1, scale: 1, rotateY: 0, duration: 1.0, ease: "expo.out" }, T.sat + 2.8)
  .fromTo("#nd .nd-w", { scale: 1, autoAlpha: 1 }, { scale: 2.1, duration: 1.8, ease: "power2.in" }, T.sat + 3.6)
  .fromTo("#nd .nd-ring", { autoAlpha: 0, scale: 2 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power2.out" }, T.sat + 3.2)
  .to("#nd .nd-ring", { autoAlpha: 0, scale: 0.4, duration: 0.4 }, T.sat + 4.4)
  .fromTo("#nd .nd-z", { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power1.out" }, T.sat + 5.1)
  .to("#nd .nd-z", { scale: 2.07, duration: 1.3, ease: "power2.in" }, T.sat + 5.8)
  .fromTo("#nd .nd-c", { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1.12, duration: 1.4, ease: "sine.out" }, T.sat + 6.9)
  .fromTo("#nd .nd-tag, #nd .nd-lg", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, T.sat + 3.4)
  .to("#nd", { autoAlpha: 0, duration: 0.5, ease: "power2.in" }, T.rice - 0.55);
copyOut("#sc-sat", T.rice - 0.6);

// 4 벼 작황 (29–40초): 예측 → 13년 재현 정확도
sceneNo(4, T.rice - 0.4);
tl.set(S, { riceColor: 1, jikColor: 0, mapDim: 0, rise: 0, tilt: 0.24, orbit: 0, camDist: 23, camX: 0, camY: 0, labels: 0, pAlpha: 0 }, T.rice - 0.3);
to({ glAlpha: 1 }, T.rice - 0.25, 0.9);
copyIn("#sc-rice", T.rice + 0.2);
tl.set("#sc-rice .b2", { autoAlpha: 0 }, T.rice);
to({ riceAlpha: 1 }, T.rice + 0.4, 0.6, "power1.out");
to({ riceLine: 1 }, T.rice + 0.6, 1.9, "power1.inOut");
to({ riceFc: 1 }, T.rice + 2.3, 1.9, "power1.out");
tl.fromTo("#sc-rice .b1", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }, T.rice + 2.2);
countUp($("#sc-rice .b1 .cnt"), T.rice + 2.2, 2.0);
lgIn("rice", T.rice + 0.8, T.jik - 0.4);
to({ riceAlpha: 0 }, T.rice + 5.4, 0.5);
tl.to("#sc-rice .b1", { autoAlpha: 0, y: -10, duration: 0.4 }, T.rice + 5.4);
to({ accAlpha: 1 }, T.rice + 5.7, 0.4, "none");
to({ riceAcc: 1 }, T.rice + 5.8, 2.6, "power1.out");
tl.fromTo("#sc-rice .b2", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" }, T.rice + 5.9);
countUp($("#sc-rice .b2 .cnt"), T.rice + 5.9, 2.4);
to({ accAlpha: 0 }, T.jik - 0.5, 0.4);
copyOut("#sc-rice", T.jik - 0.5);

// 5 직불금·고향사랑 (40–48초): 시군 색은 농가당 공익직불, 왼쪽은 고향사랑기금
sceneNo(5, T.jik - 0.3);
to({ riceColor: 0, jikColor: 1 }, T.jik - 0.2, 1.2);
to({ orbit: 0.14, tilt: 0.42, camDist: 22 }, T.jik - 0.2, 7.6, "sine.inOut");
copyIn("#sc-jik", T.jik + 0.2);
lgIn("jik", T.jik + 0.6, T.flow - 0.4);
to({ bdAlpha: 1 }, T.jik + 0.8, 0.4, "none");
to({ bdBars: 1 }, T.jik + 0.9, 1.8, "power1.out");
to({ bdSplit: 1 }, T.jik + 2.5, 2.2, "power1.out");
ptsIn("#sc-jik", T.jik + 1.0, 0.18);
to({ bdAlpha: 0 }, T.flow - 0.5, 0.4);
copyOut("#sc-jik", T.flow - 0.5);

// 6 물류동향 (48–54초): 어두운 지도 위로 흐름
sceneNo(6, T.flow - 0.3);
to({ jikColor: 0, mapDim: 1, tilt: 0, orbit: 0, camDist: 15.2, camX: 0.5, camY: 1.5 }, T.flow - 0.3, 1.3);
to({ flowAlpha: 1 }, T.flow + 0.4, 0.3, "none");
to({ flows: 1 }, T.flow + 0.4, 2.7, "power1.out");
copyIn("#sc-flow", T.flow + 0.3);
ptsIn("#sc-flow", T.flow + 1.6, 0.14);
lgIn("flow", T.flow + 0.8, T.power - 0.6);
to({ flowAlpha: 0 }, T.power - 0.5, 0.6);
copyOut("#sc-flow", T.power - 0.5);
to({ glAlpha: 0 }, T.power - 0.4, 0.8);

// 7 농사용 전기 (54–59초): 200개월 나선
sceneNo(7, T.power - 0.4);
to({ powerAlpha: 1 }, T.power - 0.1, 0.5, "power1.out");
to({ spiral: 1 }, T.power, 3.3, "power1.inOut");
to({ glow: 0.32 }, T.power - 0.4, 1.0);
copyIn("#sc-power", T.power + 0.1);
ptsIn("#sc-power", T.power + 1.3, 0.2);
lgIn("power", T.power + 0.4, T.spot - 0.6);
to({ powerAlpha: 0 }, T.spot - 0.5, 0.5);
copyOut("#sc-power", T.spot - 0.5);

// 8–13 나머지 여섯 화면 (59–89초): 화면마다 다른 강조 그래픽
const sp = (n) => T.spot + n * T.SPOT;
function spotCopy(i) {
  const s = SPOTS[i], t0 = sp(i), sec = $(`#sc-${s.id}`);
  sceneNo(8 + i, t0 - 0.4, 1.0);
  copyIn(sec, t0);
  tl.fromTo(sec.querySelectorAll(".spot-big, .spot-line"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power3.out" }, t0 + 0.15);
  countUp(sec.querySelector(".cnt"), t0 + 0.15, 1.6);
  ptsIn(`#sc-${s.id}`, t0 + 1.3, 0.3);
  copyOut(sec, t0 + T.SPOT - 0.45);
}
SPOTS.forEach((_, i) => spotCopy(i));
// 08 산업연관표: 꽃잎
to({ rioA: 1 }, sp(0) - 0.2, 0.5, "power1.out");
to({ rioP: 1 }, sp(0) + 0.1, 2.6, "power2.out");
to({ rioA: 0 }, sp(1) - 0.5, 0.45);
const miniIn = (id, t0, t1, from) => tl.fromTo(`#mini-${id}`, { autoAlpha: 0, ...from }, { autoAlpha: 1, x: 0, y: 0, rotateY: 0, duration: 0.9, ease: "expo.out" }, t0)
  .fromTo(`#mini-${id} img`, { scale: 1 }, { scale: 1.14, duration: t1 - t0, ease: "sine.inOut" }, t0)
  .to(`#mini-${id}`, { autoAlpha: 0, duration: 0.4 }, t1 - 0.45);
miniIn("rio", sp(0) + 0.9, sp(1), { y: 40 });
miniIn("employ", sp(1) + 0.5, sp(2), { x: 60 });
// 09 농업고용: 63년 곡선
to({ empA: 1 }, sp(1) - 0.1, 0.4, "none");
to({ empP: 1 }, sp(1) + 0.3, 3.2, "power1.inOut");
to({ empA: 0 }, sp(2) - 0.5, 0.45);
// 10 금융보험: 어두운 지도 위로 농·축협이 켜진다
tl.set(S, { mapDim: 1, riceColor: 0, jikColor: 0, devColor: 0, rise: 0, devRise: 0, tilt: 0, orbit: 0, camDist: 23, camX: 0, camY: 0, mapShift: 300, labels: 0 }, sp(2) - 0.6);
to({ glAlpha: 1 }, sp(2) - 0.5, 0.7);
to({ coopA: 1 }, sp(2) - 0.1, 0.3, "none");
to({ coopP: 1 }, sp(2) + 0.2, 2.8, "power1.inOut");
lgIn("coop", sp(2) + 0.5, sp(3) - 0.4);
to({ coopA: 0 }, sp(3) - 0.5, 0.45);
// 11 농촌개발: 지도가 왼쪽으로 가며 지구 수만큼 솟는다
to({ mapDim: 0, devColor: 1, mapShift: -330, tilt: 0.95, orbit: -0.42, camDist: 20.5 }, sp(3) - 0.5, 1.5);
to({ devRise: 1 }, sp(3) + 0.4, 2.4, "power2.out");
to({ orbit: -0.12 }, sp(3) + 1.0, 3.6, "sine.inOut");
lgIn("dev", sp(3) + 0.6, sp(4) - 0.4);
to({ glAlpha: 0 }, sp(4) - 0.5, 0.6);
// 12 토양: 흙 단면
to({ soilA: 1 }, sp(4) - 0.1, 0.4, "none");
to({ soilP: 1 }, sp(4) + 0.2, 2.8, "power1.out");
to({ soilA: 0 }, sp(5) - 0.5, 0.45);
// 13 축산: 마을 점 지도 + 축종 도넛
tl.set(S, { tilt: 0, orbit: 0, camDist: 22, mapShift: 260, devRise: 0, devColor: 0, mapDim: 0.9 }, sp(5) - 0.5);
to({ lvA: 1 }, sp(5) - 0.1, 0.3, "none");
to({ lvP: 1 }, sp(5) + 0.2, 3.0, "power1.inOut");
lgIn("lv", sp(5) + 0.6, T.wall - 0.4);
to({ lvA: 0 }, T.wall - 0.5, 0.45);

// 14 자료 수집 현황 (85–90초): 모든 화면의 벽
sceneNo(14, T.wall - 0.4);
tl.set("#wall-wrap", { autoAlpha: 1 }, T.wall)
  .fromTo("#wall .wt", { autoAlpha: 0, z: -600, rotateX: -40 }, { autoAlpha: 1, z: 0, rotateX: 0, duration: 1.1, stagger: { each: 0.05, from: "center" }, ease: "power3.out" }, T.wall)
  .fromTo("#wall", { rotateZ: -7, rotateX: 26, y: 40 }, { rotateZ: -3, rotateX: 18, y: 0, duration: 5, ease: "sine.inOut" }, T.wall)
  .to("#wall-wrap", { autoAlpha: 0, duration: 0.5 }, T.maker - 0.5);
copyIn("#sc-wall", T.wall + 0.6);
copyOut("#sc-wall", T.maker - 0.5);

// 15 만든 이 (90–98초)
sceneNo(15, T.maker - 0.4);
tl.set("#sc-maker", { autoAlpha: 1, y: 0 }, T.maker)
  .fromTo("#sc-maker .mk-photo", { autoAlpha: 0, y: 40, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }, T.maker + 0.1)
  .fromTo("#sc-maker .kicker", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, T.maker + 0.4)
  .fromTo("#sc-maker .hl .ch", { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.04, ease: "expo.out" }, T.maker + 0.5)
  .fromTo("#sc-maker .mk-phil li", { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.55, ease: "power2.out" }, T.maker + 1.4)
  .fromTo("#sc-maker .mk-quote, #sc-maker .mk-mail", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.4, ease: "power2.out" }, T.maker + 4.0)
  .to("#sc-maker", { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" }, T.end - 0.5);

// 16 닫기 (98–102초)
sceneNo(16, T.end - 0.3);
to({ glow: 0.55 }, T.end - 0.3, 1.2);
tl.set("#sc-end", { autoAlpha: 1 }, T.end)
  .fromTo("#sc-end .mark", { scale: 0.3, rotate: -120, autoAlpha: 0 }, { scale: 1, rotate: 0, autoAlpha: 1, duration: 1.1, ease: "back.out(1.8)" }, T.end)
  .fromTo("#sc-end .hl .ch", { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.035, ease: "expo.out" }, T.end + 0.15)
  .fromTo("#sc-end .url, #sc-end .srcs, #sc-end .btns", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" }, T.end + 0.6)
  .set({}, {}, TOTAL);

// ── 프레임 ────────────────────────────────────────────────
const glowCols = SCENE_GLOW.map(([a, b]) => [hex(a).map((v) => v / 255), hex(b).map((v) => v / 255)]);
const U = new Float32Array(16);
const t0 = performance.now();
function frame() {
  const t = tl.time(), real = (performance.now() - t0) / 1000;
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
  budget.render(S);
  spots.render(S, t);
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
const btnPlay = $("#play"), track = $("#track"), fill = $("#fill"), timeEl = $("#time"), go = $("#go"), chaps = $("#chaps"), chapName = $("#chapname");
track.setAttribute("aria-valuemax", TOTAL);
chaps.innerHTML = CH.map((c) => `<button type="button" data-t="${c.t}" style="left:${(c.t / TOTAL) * 100}%" title="${c.name}" aria-label="${c.name}부터 보기"></button>`).join("");
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
    chapBtns.forEach((b, n) => { b.classList.toggle("on", n === ci); b.classList.toggle("past", n < ci); });
    const c = CH[ci];
    chapName.textContent = `${String(ci).padStart(2, "0")} ${c.name}`;
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
  const d = { ArrowLeft: -5, ArrowRight: 5 }[e.key];
  if (d) { e.preventDefault(); e.stopPropagation(); tl.seek(Math.min(TOTAL, Math.max(0, tl.time() + d)), false); }
});
document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, textarea, select, .it-track")) return;
  if (e.key === " " || e.key === "k") { if (e.target.closest("a, button") && e.key === " ") return; e.preventDefault(); toggle(); }
  else if (e.key === "Home") tl.seek(0, false);
  else if (e.key === "ArrowRight") { const n = CH.find((c) => c.t > tl.time() + 0.05); if (n) tl.seek(n.t + 0.001, false); }
  else if (e.key === "ArrowLeft") { const p = [...CH].reverse().find((c) => c.t < tl.time() - 0.6); tl.seek((p ? p.t : 0) + 0.001, false); }
});
let wasHidden = false;
document.addEventListener("visibilitychange", () => { if (document.hidden && !tl.paused()) { tl.pause(); wasHidden = true; } else if (!document.hidden && wasHidden) { wasHidden = false; tl.play(); } });

// ── 배경음악 (소리는 사용자가 켤 때만) ─────────────────────
const music = createMusic({ T, voice: { lines: LINES, base: "assets/intro/voice/" } });
const sndBtn = $("#snd"), volIn = $("#vol"), sndHint = $("#sndhint"), voBtn = $("#vo");
stage.insertAdjacentHTML("beforeend", `<div class="cap" id="cap" aria-live="off"><span></span></div>`);
const cap = $("#cap"), capT = cap.firstElementChild;
let capId = null;
gsap.ticker.add(() => {
  const l = music.caption(tl.time());
  const id = l ? l.id : null;
  if (id !== capId) { capId = id; if (l) capT.textContent = l.text; cap.classList.toggle("on", !!l); }
  voBtn.hidden = !music.hasVoice;
});
voBtn.addEventListener("click", () => { music.setVoice(!music.voiceOn); voBtn.setAttribute("aria-pressed", music.voiceOn); store.set("intro-vo", music.voiceOn ? "1" : "0"); });
const store = { get: (k) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* 저장 안 됨 */ } } };
const v0 = +(store.get("intro-vol") ?? 70);
if (store.get("intro-vo") === "0") { music.setVoice(false); voBtn.setAttribute("aria-pressed", "false"); }
volIn.value = v0; music.setVolume(v0 / 100);
function sndUI() {
  sndBtn.setAttribute("aria-pressed", music.on);
  sndBtn.setAttribute("aria-label", music.on ? "소리 끄기" : "소리 켜기");
  sndBtn.dataset.on = music.on ? "1" : "0";
  if (music.on) sndHint.hidden = true;
}
async function soundOn() { await music.enable(); sndUI(); }
sndBtn.addEventListener("click", async () => { if (music.on) music.disable(); else await soundOn(); sndUI(); });
sndHint.addEventListener("click", soundOn);
volIn.addEventListener("input", async () => {
  const v = +volIn.value; music.setVolume(v / 100); store.set("intro-vol", v);
  if (v > 0 && !music.on) await soundOn();
});
document.addEventListener("keydown", (e) => { if (e.key === "m" && !e.target.closest("input, textarea, select")) sndBtn.click(); });
gsap.ticker.add(() => music.sync(tl.time(), !tl.paused() && tl.progress() < 1));

window.__intro = { tl, S, music }; // 확인용 (scripts에서 장면을 찍을 때)

// ── 시작 ─────────────────────────────────────────────────
(async () => {
  bg = await createBackground($("#bg"), { gpu: !/[?&]gl\b/.test(location.search) });
  stage.dataset.gpu = bg.kind;
  fit();
  // 글꼴과 그림을 먼저 풀어 둔다 (재생 중에 그림을 푸느라 끊기거나 건너뛰지 않게). 오래 걸리면 그냥 시작
  const ready = Promise.all([document.fonts.ready, ...$$("img", stage).map((im) => (im.decode ? im.decode().catch(() => {}) : Promise.resolve()))]);
  try { await Promise.race([ready, new Promise((r) => setTimeout(r, 4000))]); } catch { /* 그냥 시작 */ }
  gsap.ticker.lagSmoothing(250, 33);
  gsap.ticker.add(frame);
  frame();
  player.classList.add("ready");
  requestAnimationFrame(() => { tl.seek(0, false); tl.play(0); }); // 언제나 처음부터 자동 재생
})();
