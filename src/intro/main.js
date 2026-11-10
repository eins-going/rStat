// 소개 영상: GSAP 한 줄 타임라인이 상태값(S)과 DOM을 움직이고, 매 프레임 그 값으로 배경·지도·캔버스·SVG를 그린다.
// 그래서 어느 시점으로 감아도 같은 그림이 나온다.
// 줄거리(2판): 흩어진 통계 → 한 화면 → 다른 곳에서 구하기 어려운 자료 여섯 가지 → 스스로 갱신·공개 → 만든 이.
// 장면은 음악 마디(2.5초)에 맞춰 바뀌고(timing.js), 한 장면에는 주장 하나·숫자 하나만 둔다.
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
import { T, LEN, TOTAL, SCENES } from "./timing.js";
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
const topLand = Object.entries(I.land.v).filter(([, v]) => v).sort((a, b) => b[1] - a[1]).slice(0, 3);
const fcNow = I.rice.fc.at(-1);
const PM = I.power.months;
const SP = I.spots;
const soilTot = SP.soil.pg.reduce((a, b) => a + b, 0), soil12 = ((SP.soil.pg[0] + SP.soil.pg[1]) / soilTot) * 100;
const devTop = Object.entries(SP.dev).sort((a, b) => b[1] - a[1])[0];
const smallPct = Math.round(F.parcelSmall * 100);

// ── 글 조각 ───────────────────────────────────────────────
const split = (lines) => lines.map((l) => `<span class="ln">${[...l].map((ch) => `<span class="ch${ch === " " ? " sp" : ""}">${ch === " " ? "&nbsp;" : ch}</span>`).join("")}</span>`).join("");
const pts = (rows) => `<ul class="pts">${rows.map(([b, t]) => `<li><b>${b}</b><span>${t}</span></li>`).join("")}</ul>`;
const kick = (badge, name) => `<p class="kicker">${badge ? `<b>${"①②③④⑤⑥".indexOf(badge) + 1}</b>` : ""}${name}</p>`; // 여기에만 1~6
const scene = (id, badge, name, lines, sub, extra = "", cls = "") => `
  <section class="sc ${cls}" id="sc-${id}">
    ${kick(badge, name)}
    <h2 class="hl">${split(lines)}</h2>
    ${sub ? `<p class="it-sub">${sub}</p>` : ""}
    ${extra}
  </section>`;
const gradient = (stops) => `linear-gradient(90deg, ${stops.join(", ")})`;
const count = (n, { dec = 0, suf = "", from } = {}) => `<b class="cnt" data-n="${n}" data-dec="${dec}" data-suf="${suf}"${from != null ? ` data-from="${from}"` : ""}>${(+n).toFixed(dec)}${suf}</b>`;

// 큰 숫자 하나로 말하는 장면 (여기에만 ③⑤⑥)
const SPOTS = [
  { id: "dev", badge: "③", name: "농촌개발", href: "ruraldev", big: count(F.ruraldev.sites), unit: "개 사업 지구", line: "세부사업 예산과 지구의 위치·준공 예정까지", cls: "right",
    pts: [[`${unitName(devTop[0])} ${devTop[1]}곳`, "지구가 가장 많은 시군"], [`${I.gohyang.govs}곳`, "고향사랑기금 회계도 같은 방법으로"]] },
  { id: "vill", badge: "⑤", name: "축산 환경", href: "livestock", big: count(F.livestock.villages), unit: "개 마을", line: "점 하나가 마을 하나 — 가축분뇨 발생량", pts: [] },
  { id: "coop", badge: "⑤", name: "농업금융보험", href: "agfin", big: count(F.agfin.coops), unit: "개 농·축협", line: "조합 하나하나의 당기순이익을 지도 위에",
    pts: [[jo(F.agfin.paid), `${F.agfin.year} 농작물재해보험 보험금도 시군별로`]] },
  { id: "power", badge: "⑥", name: "농사용 전기", href: "power", big: count(F.power.months), unit: "개월", line: `한전 ${F.power.regions}개 지역 · 계절 유형 ${F.power.types.length}가지`, pts: [] },
  { id: "rio", badge: "⑥", name: "지역산업연관표(농업)", href: "rio", big: count(Math.round(SP.rio.total / 1e6)), unit: "조 원 농식품 산출", line: `17개 시도 · ${F.rio.sectors}개 산업의 파급효과`, pts: [] },
  { id: "employ", badge: "⑥", name: "농업고용", href: "employ", big: count(+F.employ.to - +F.employ.from + 1), unit: `년간 · ${F.employ.from}~${F.employ.to}`, line: `농림어업 취업자 ${Math.round(F.employ.a0 / 10)}만 명에서 ${Math.round(F.employ.a1 / 10)}만 명으로`, pts: [] },
  { id: "soil", badge: "⑥", name: "농경지 토양", href: "soil", big: count(Math.round(F.soil.tests / 1e4)), unit: "만 건 토양검정", line: `논으로 1·2급인 땅은 ${soil12.toFixed(1)}%뿐`, pts: [] },
];
const WALL = [["home", "주요통계"], ["rice", "벼 작황"], ["rio", "산업연관표"], ["flow", "물류동향"], ["power", "농사용 전기"],
  ["employ", "농업고용"], ["agfin", "금융보험"], ["jikbul", "직불금·고향사랑"], ["ruraldev", "농촌개발"], ["soil", "농경지 토양"],
  ["livestock", "축산 환경"], ["home_sat", "위성지도"], ["rice_sat", "위성 영상"], ["home_hn", "시군 현황판"], ["status", "자료 수집 현황"]];
// 여기에만: 여섯 가지
const ONLY = [
  ["①", `${comma(F.parcels / 1e4)}만 필지 분석`, "주요통계 · 위성지도"], ["②", "쌀 수확량 예측과 검증", "벼 작황"], ["③", "시군별 직불금·농촌개발 예산", "직불금·고향사랑 · 농촌개발"],
  ["④", "산지에서 도시로 가는 물류", "물류동향"], ["⑤", "마을·조합 단위 자료", "축산 환경 · 농업금융보험"], ["⑥", `${F.power.months}개월·${+F.employ.to - +F.employ.from + 1}년간 시계열`, "전기 · 산업연관 · 고용 · 토양"],
];
// 흩어진 기관 이름표: 오른쪽 넓은 칸에 격자 + 흔들림 (시드 고정)
let seed = 20261110;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const ORGS = F.status.orgList.map((n, i) => {
  const col = i % 4, row = Math.floor(i / 4);
  return { n, x: 800 + col * 262 + (row % 2) * 70 + rnd() * 70, y: 96 + row * 176 + rnd() * 80, r: rnd() };
});

stage.insertAdjacentHTML("beforeend", `
  <div class="orgs">${ORGS.map((o) => `<span class="org" style="left:${o.x.toFixed(0)}px;top:${o.y.toFixed(0)}px">${o.n}</span>`).join("")}</div>
  <div class="copy">
    <section class="sc sc-open" id="sc-hook">
      <h2 class="hl">${split(["농업 통계는", "흩어져 있다"])}</h2>
      <p class="it-sub">기관마다 따로, 대부분 시도 단위까지</p>
    </section>
    <section class="sc sc-open" id="sc-open">
      <p class="kicker"><span class="mark"></span>ag-rstat.vercel.app</p>
      <h1 class="hl hl-xl">${split(["지역농업", "현황판"])}</h1>
      <div class="nums"><div>${count(F.status.orgs)}<span>개 기관</span></div><div>${count(F.status.items)}<span>종 자료</span></div><div>${count(I.map.sigun.length)}<span>개 시군, 한 화면</span></div></div>
    </section>
    ${scene("stats", "", "주요통계", [`${I.map.sigun.length}개 시군,`, `${F.metrics}개 지표`], "전국·시도·시군을 같은 눈금으로")}
    ${scene("real", "", "주요통계", ["고르면, 그 시군의", "현황판"], "해남군을 고른 실제 화면", "", "narrow")}
    ${scene("parcel", "①", "필지", [`${comma(F.parcels / 1e4)}만 필지를`, "전부 계산했다"], "",
      `<div class="waffle-row"><div class="waffle">${Array.from({ length: 100 }, (_, i) => `<i class="${i < smallPct ? "on" : ""}"></i>`).join("")}</div>
         <p class="waffle-cap">필지 100개 중<br><b>${smallPct}개</b>가 0.1ha 미만</p></div>
       ${pts([[`${F.parcelMed}㎡`, "필지 크기 중앙값"], [`${Math.round(F.paddyArmt * 100)}%`, "논 경지정리율 — 시군마다 견준다"]])}`, "narrow")}
    ${scene("ndvi", "①", "위성 영상", ["논 하나하나의", "생육을 본다"], "", pts([["10m", "Sentinel-2 위성 · 논 필지만"], ["5일마다", "2017년부터 날짜별로"]]), "narrow")}
    ${scene("rice", "②", "벼 작황", ["쌀 수확량을", "7월 말부터 예측"], "",
      `<div class="big b1">${count(fcNow.y, { dec: 1 })}<small>kg/10a</small></div>
       <p class="big-cap b1">${I.rice.year} 전국 단수 예측 · 국가데이터처 예상 ${I.rice.stat}</p>
       <div class="big b2">${count(F.riceAcc.m0915, { dec: 1, from: F.riceAcc.norm })}<small>kg 평균 오차</small><em class="early">3주 먼저</em></div>
       <p class="big-cap b2">9월 15일 예측 · 국가데이터처 10월 예상은 ${F.riceAcc.stat}kg</p>`)}
    ${scene("jik", "③", "직불금·고향사랑", ["직불금, 우리 군에", "얼마나 오나"], `지방재정365 세부사업에서 골라낸 공익직불 ${jo(I.jikbul.pubNat)}`)}
    ${scene("flow", "④", "물류동향", ["산지에서 도시로,", "수박이 가는 길"], `${I.flows.year}년 수박 파렛트 ${comma(I.flows.total)}개<br><small>물류기기 공동이용 ${F.od.from}~${F.od.to}년 자료 · ${F.od.crops}개 품목</small>`,
      `<ol class="pairs">${I.flows.top.slice(0, 2).map(([o, d, v]) => `<li><span class="o">${unitName(o)}</span><i></i><span class="d">${unitName(d)}</span><b>${comma(v)}개</b></li>`).join("")}</ol>`)}
    ${SPOTS.map((s) => `
      <section class="sc spot ${s.cls || ""}" id="sc-${s.id}">
        ${kick(s.badge, s.name)}
        <div class="spot-big">${s.big}<small>${s.unit}</small></div>
        <p class="spot-line">${s.line}</p>
        ${s.pts.length ? pts(s.pts) : ""}
      </section>`).join("")}
  </div>
  <div class="only" id="sc-only">
    <p class="only-eye">여기에만</p>
    <h2 class="hl">${split(["다른 곳에서 구하기 어려운 자료"])}</h2>
    <ol class="only-list">${ONLY.map(([b, t, w]) => `<li><b>${b}</b><span>${t}</span><small>${w}</small></li>`).join("")}</ol>
  </div>
  <div class="labels">${topLand.map(([k, v]) => `<div class="lab" data-k="${k}"><b>${unitName(k)}</b><span>${man(v)} ha</span></div>`).join("")}</div>
  <div class="lgs">
    <div class="it-lg" id="lg-stats"><span>경지면적 ${I.land.year}</span><i class="bar" style="background:${gradient(LAND_RAMP)}"></i><span>높을수록 넓다</span></div>
    <div class="it-lg" id="lg-rice"><span>평년보다 낮음</span><i class="bar" style="background:${gradient([RICE_DIV.lo, RICE_DIV.mid, RICE_DIV.hi])}"></i><span>높음 · ${I.rice.year} 시군 예측</span></div>
    <div class="it-lg" id="lg-jik"><span>적음</span><i class="bar" style="background:${gradient(JIK_RAMP)}"></i><span>많음 · 농가당 공익직불(기본형) ${I.jikbul.year}</span></div>
    <div class="it-lg" id="lg-flow"><i class="it-dot" style="background:${C.melonO}"></i><span>보낸 산지</span><i class="it-dot" style="background:${C.melonD}"></i><span>받은 곳 · ${I.flows.year}년 ${I.flows.months}</span></div>
    <div class="it-lg" id="lg-coop"><i class="it-dot" style="background:#f5a524"></i><span>흑자 ${comma(SP.coopIncome.pos)}곳</span><i class="it-dot" style="background:#4ea1ff"></i><span>적자 ${SP.coopIncome.neg}곳 · 점 크기 = ${SP.coopIncome.year}년 당기순이익</span></div>
    <div class="it-lg left" id="lg-dev"><span>적음</span><i class="bar" style="background:${gradient(DEV_RAMP)}"></i><span>많음 · 기둥 높이 = 시군 사업 지구 수</span></div>
    <div class="it-lg" id="lg-lv"><span>마을당 분뇨 적음</span><i class="bar" style="background:${gradient(LV_RAMP)}"></i><span>많음 · ${F.livestock.from}~${F.livestock.to}</span></div>
    <div class="it-lg" id="lg-power"><span>전국 농사용 전력 월 사용량 · ${PM[0].replace("-", ".")}~${PM.at(-1).replace("-", ".")}</span></div>
  </div>`);

const scr = createScreen(stage, I, ["home", "home_jn", "home_hn", "home_sat"]);
createWall(stage, WALL);
const ND = I.shots.ndvi || {};
stage.insertAdjacentHTML("beforeend", `
  <div class="nd" id="nd">
    <div class="nd-frame">
      <img class="nd-w" src="assets/intro/shots/ndvi_wide.webp" alt="" decoding="async" style="transform-origin:${(ND.fx ?? 0.3) * 100}% ${(ND.fy ?? 0.42) * 100}%">
      <img class="nd-z" src="assets/intro/shots/ndvi_zoom.webp" alt="" decoding="async" style="transform-origin:40% 63%">
      <img class="nd-c" src="assets/intro/shots/ndvi_close.webp" alt="" decoding="async">
      <span class="nd-ring" style="left:${(ND.fx ?? 0.3) * 100}%;top:${(ND.fy ?? 0.42) * 100}%"></span>
      <div class="nd-tag"><b>${ND.where || "김제시"} 논 NDVI</b><span>Sentinel-2 · ${ND.date ? ND.date.replace(/-/g, ".") : ""}</span></div>
      <div class="nd-lg"><span>낮음</span><i></i><span>높음 · 벼가 푸를수록 초록</span></div>
    </div>
  </div>`);
const mini = (id, shot, x, y, w) => {
  stage.insertAdjacentHTML("beforeend", `<div class="mini" id="mini-${id}" style="left:${x}px;top:${y}px;width:${w}px"><div class="scr-bar"><i></i><i></i><i></i><span class="scr-url">ag-rstat.vercel.app/${shot}</span></div><div class="mini-view" style="height:${Math.round((w * 9) / 16)}px"><img src="assets/intro/shots/${shot}.webp" alt="" decoding="async"></div></div>`);
  return $(`#mini-${id}`);
};
mini("rio", "rio", 150, 590, 620);
mini("employ", "employ", 1230, 96, 580);
stage.insertAdjacentHTML("beforeend", `
  <div class="wall-copy" id="sc-wall">
    <p class="kicker">자료 수집 현황</p>
    <h2 class="hl">${split([`${F.status.items}종 가운데 ${F.status.auto}종은 스스로 갱신`])}</h2>
    <p class="it-sub">${F.status.orgs}개 기관의 공개 자료 · 무엇을 언제 받았는지까지 공개</p>
  </div>
  <div class="maker" id="sc-maker">
    <figure class="mk-photo"><img src="assets/maker.webp" alt="" width="360" height="540"></figure>
    <div class="mk-text">
      <p class="kicker">만든 이</p>
      <h2 class="hl">${split(["조승현"])}</h2>
      <p class="mk-cred">농업·자원경제학 박사</p>
      <p class="mk-career">현 N협동조합 중앙회 연구위원 · 전 J도 출연 연구원 부연구위원</p>
      <p class="mk-field">${["그린바이오", "스마트농업", "위험관리", "농업통계·데이터", "농업정책"].map((t) => `<span>${t}</span>`).join("")}</p>
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

// ── 시간표 (timing.js) ─────────────────────────────────────
const CH = [
  { t: T.hook, name: "열기" }, { t: T.stats, name: "주요통계", href: "./" }, { t: T.real, name: "실제 화면", href: "./" }, { t: T.only, name: "여기에만" },
  { t: T.parcel, name: "필지·위성", href: "./" }, { t: T.rice, name: "벼 작황", href: "rice" }, { t: T.jik, name: "직불금·고향사랑", href: "jikbul" },
  { t: T.dev, name: "농촌개발", href: "ruraldev" }, { t: T.flow, name: "물류동향", href: "flow" }, { t: T.vill, name: "축산 환경", href: "livestock" },
  { t: T.coop, name: "농업금융보험", href: "agfin" }, { t: T.power, name: "농사용 전기", href: "power" }, { t: T.rio, name: "지역산업연관표(농업)", href: "rio" },
  { t: T.employ, name: "농업고용", href: "employ" }, { t: T.soil, name: "농경지 토양", href: "soil" },
  { t: T.wall, name: "자료 수집 현황", href: "status" }, { t: T.maker, name: "만든이", href: "about" }, { t: T.end, name: "닫기" },
];
const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut" } });
const to = (vars, at, duration, ease = "power2.inOut") => tl.to(S, { ...vars, duration, ease }, at);
const sceneNo = (key, d = 1.2) => to({ scene: SCENES.indexOf(key) }, T[key] - 0.4, d);

function copyIn(sel, at) {
  const r = typeof sel === "string" ? $(sel) : sel;
  tl.set(r, { autoAlpha: 1, y: 0 }, at);
  const k = r.querySelector(".kicker");
  if (k) tl.fromTo(k, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" }, at);
  const ch = r.querySelectorAll(".hl .ch");
  if (ch.length) tl.fromTo(ch, { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.85, stagger: Math.min(0.028, 0.5 / ch.length), ease: "expo.out" }, at + 0.1);
  const sub = r.querySelector(".it-sub");
  if (sub) tl.fromTo(sub, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7, ease: "power2.out" }, at + 0.5);
}
const copyOut = (sel, at) => tl.to(typeof sel === "string" ? $(sel) : sel, { autoAlpha: 0, y: -24, duration: 0.45, ease: "power2.in" }, at);
const ptsIn = (sel, at, gap = 0.16) => { const e = $$(`${sel} .pts li, ${sel} .pairs li`); if (e.length) tl.fromTo(e, { autoAlpha: 0, x: -16 }, { autoAlpha: 1, x: 0, stagger: gap, duration: 0.55, ease: "power2.out" }, at); };

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

gsap.set(".sc, .it-lg, .outro, .maker, .wall-copy, .only, #scr-wrap, #wall-wrap, #nd, .nd-z, .nd-c, .mini, .org", { autoAlpha: 0 });
gsap.set(Z, { scale: 1, x: 0, y: 0, transformOrigin: "0 0" });
gsap.set(scr.cursor, { x: VIEW_W + 60, y: VIEW_H + 60, autoAlpha: 0 });
gsap.set(scr.cursor.querySelector(".ripple"), { autoAlpha: 0 });
gsap.set(Object.values(scr.imgs), { autoAlpha: 0 });

// ── 0 흩어진 통계: 기관 이름표가 따로따로 떠 있다 ────────────────
to({ bgI: 1 }, 0, 1.6, "power1.out");
to({ glow: 0.22 }, 0.4, 2);
const orgEls = $$(".org", stage);
orgEls.forEach((e, i) => {
  const o = ORGS[i];
  tl.fromTo(e, { autoAlpha: 0, scale: 0.86 }, { autoAlpha: 0.9, scale: 1, duration: 0.7, ease: "power2.out" }, 0.25 + o.r * 2.2)
    .fromTo(e, { x: 0, y: 0 }, { x: (o.r - 0.5) * 70, y: (0.5 - ((o.r * 7) % 1)) * 50, duration: T.title + 0.6, ease: "sine.inOut" }, 0)
    // 한곳으로 모인다 → 지도
    .to(e, { x: 1260 - o.x - 60, y: 540 - o.y, scale: 0.25, autoAlpha: 0, duration: 1.5, ease: "power3.in" }, T.title + 0.1 + o.r * 0.5);
});
copyIn("#sc-hook", 0.4);
copyOut("#sc-hook", T.title - 0.35);

// ── 1 지역농업 현황판: 빛 입자가 모여 지도가 된다 ────────────────
sceneNo("title");
to({ morph: 1 }, T.title + 0.2, 3.4, "none");
to({ glow: 0.5 }, T.title + 0.6, 2.2);
copyIn("#sc-open", T.title + 0.25);
tl.fromTo("#sc-open .mark", { scale: 0.4, rotate: -90 }, { scale: 1, rotate: 0, duration: 1.2, ease: "back.out(2)" }, T.title + 0.25);
tl.fromTo("#sc-open .nums > div", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, stagger: 0.9, duration: 0.6, ease: "power2.out" }, T.title + 2.3);
$$("#sc-open .cnt").forEach((c, i) => countUp(c, T.title + 2.3 + i * 0.9, 1.1));
copyOut("#sc-open", T.stats - 0.5);
to({ mapAlpha: 1 }, T.title + 3.0, 1.2);
to({ pAlpha: 0.32 }, T.title + 3.6, 1.0);

// ── 2 주요통계: 기울며 경지면적만큼 솟는다 ─────────────────────
sceneNo("stats", 1.4);
to({ tilt: 1 }, T.stats - 0.2, 2.0);
to({ rise: 1 }, T.stats + 0.2, 2.2, "power2.out");
to({ orbit: 0.34, camDist: 21.2 }, T.stats - 0.2, LEN.stats + 0.4, "sine.inOut");
to({ pAlpha: 0 }, T.stats + 0.4, 1.0);
copyIn("#sc-stats", T.stats + 0.1);
lgIn("stats", T.stats + 0.8, T.real - 0.6);
to({ labels: 1 }, T.stats + 2.2, 0.6, "power2.out");
to({ labels: 0 }, T.real - 0.7, 0.4);
copyOut("#sc-stats", T.real - 0.5);

// ── 3 실제 화면: 창이 날아들고, 커서가 전라남도 → 해남군을 고른 뒤 화면을 당겨 본다 ──
sceneNo("real");
to({ glAlpha: 0 }, T.real - 0.5, 0.8);
const W0 = T.real;
tl.set(scr.imgs.home, { autoAlpha: 1 }, W0).set([scr.imgs.home_jn, scr.imgs.home_hn, scr.imgs.home_sat], { autoAlpha: 0 }, W0).set(Z, { scale: 1, x: 0, y: 0 }, W0)
  .fromTo("#scr-wrap", { autoAlpha: 0, rotateY: -30, rotateX: 10, x: 220, z: -320, scale: 1 }, { autoAlpha: 1, rotateY: -6, rotateX: 2, x: 0, z: 0, duration: 1.3, ease: "expo.out" }, W0);
copyIn("#sc-real", W0 + 0.2);
tl.set(scr.cursor, { autoAlpha: 1 }, W0 + 0.9);
clickAt(scr.box("home", "#sido"), W0 + 2.0, 1.0);
showImg("home_jn", W0 + 2.15);
clickAt(scr.box("home_jn", "#sgg"), W0 + 3.3, 0.8);
showImg("home_hn", W0 + 3.45);
tl.to(scr.cursor, { autoAlpha: 0, duration: 0.3 }, W0 + 4.0);
tl.to("#scr-wrap", { rotateY: 0, rotateX: 0, duration: 2.6, ease: "sine.inOut" }, W0 + 3.6);
zoomTo([98, 50, 1240, 700], W0 + 4.1, LEN.real - 4.5, "sine.inOut", 1); // 왼쪽 농가·경지 칸과 지도를 당겨 본다
tl.to("#scr-wrap", { autoAlpha: 0, scale: 0.94, duration: 0.45, ease: "power2.in" }, T.only - 0.5);
copyOut("#sc-real", T.only - 0.5);

// ── 4 여기에만: 여섯 가지를 먼저 보여 준다 ─────────────────────
sceneNo("only");
tl.set("#sc-only", { autoAlpha: 1 }, T.only)
  .fromTo("#sc-only .only-eye", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, T.only)
  .fromTo("#sc-only .hl .ch", { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.018, ease: "expo.out" }, T.only + 0.1)
  .fromTo("#sc-only li", { autoAlpha: 0, y: 26, scale: 0.96 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.26, ease: "back.out(1.6)" }, T.only + 0.8)
  .to("#sc-only", { autoAlpha: 0, y: -20, duration: 0.4, ease: "power2.in" }, T.parcel - 0.45)
  .set("#sc-only", { y: 0 }, T.only - 0.01);

// ── 5 ① 필지: 위성지도 위 필지 + 100칸 ──────────────────────
sceneNo("parcel");
const P0 = T.parcel;
tl.set(scr.imgs.home_sat, { autoAlpha: 1 }, P0).set([scr.imgs.home, scr.imgs.home_jn, scr.imgs.home_hn], { autoAlpha: 0 }, P0).set(Z, { scale: 1, x: 0, y: 0 }, P0).set(scr.cursor, { autoAlpha: 0 }, P0)
  .fromTo("#scr-wrap", { autoAlpha: 0, rotateY: 22, rotateX: 4, x: 160, z: -200, scale: 1 }, { autoAlpha: 1, rotateY: -3, rotateX: 1, x: 0, z: 0, duration: 1.2, ease: "expo.out" }, P0);
zoomTo([330, 150, 900, 560], P0 + 0.9, LEN.parcel - 1.2, "sine.inOut", 1);
copyIn("#sc-parcel", P0 + 0.15);
tl.fromTo("#sc-parcel .waffle-row", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" }, P0 + 1.0)
  .fromTo("#sc-parcel .waffle i.on", { backgroundColor: "rgba(255,255,255,0.09)", scale: 0.6 }, { backgroundColor: "#f5a524", scale: 1, duration: 0.3, stagger: 0.028, ease: "power2.out" }, P0 + 1.3);
ptsIn("#sc-parcel", P0 + 3.4, 0.9);
tl.to("#scr-wrap", { autoAlpha: 0, scale: 0.92, rotateY: -16, x: -80, duration: 0.6, ease: "power2.in" }, T.ndvi - 0.5);
copyOut("#sc-parcel", T.ndvi - 0.5);

// ── 6 ① 위성 영상: 논 NDVI — 시군 전체 → 확대 → 더 가까이 ──────────
sceneNo("ndvi");
const N0 = T.ndvi;
copyIn("#sc-ndvi", N0 + 0.15);
ptsIn("#sc-ndvi", N0 + 1.2, 0.5);
tl.set("#nd", { autoAlpha: 1 }, N0 - 0.1)
  .fromTo("#nd .nd-frame", { autoAlpha: 0, scale: 0.9, rotateY: 14 }, { autoAlpha: 1, scale: 1, rotateY: 0, duration: 0.9, ease: "expo.out" }, N0 - 0.1)
  .fromTo("#nd .nd-tag, #nd .nd-lg", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1 }, N0 + 0.4)
  .fromTo("#nd .nd-ring", { autoAlpha: 0, scale: 2 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power2.out" }, N0 + 0.5)
  .fromTo("#nd .nd-w", { scale: 1, autoAlpha: 1 }, { scale: 2.1, duration: 1.3, ease: "power2.in" }, N0 + 0.9)
  .to("#nd .nd-ring", { autoAlpha: 0, scale: 0.4, duration: 0.35 }, N0 + 1.5)
  .fromTo("#nd .nd-z", { autoAlpha: 0, scale: 1.06 }, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power1.out" }, N0 + 2.0)
  .to("#nd .nd-z", { scale: 2.07, duration: 1.1, ease: "power2.in" }, N0 + 2.5)
  .fromTo("#nd .nd-c", { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1.14, duration: LEN.ndvi - 3.4, ease: "sine.out" }, N0 + 3.4)
  .to("#nd", { autoAlpha: 0, duration: 0.5, ease: "power2.in" }, T.rice - 0.55);
copyOut("#sc-ndvi", T.rice - 0.55);

// ── 7 ② 벼 작황: 올해 예측 → 13년 재현 정확도 ───────────────────
sceneNo("rice");
tl.set(S, { riceColor: 1, jikColor: 0, devColor: 0, mapDim: 0, rise: 0, devRise: 0, tilt: 0.24, orbit: 0, camDist: 23, camX: 0, camY: 0, mapShift: 300, labels: 0, pAlpha: 0, mapAlpha: 1 }, T.rice - 0.3);
to({ glAlpha: 1 }, T.rice - 0.25, 0.9);
copyIn("#sc-rice", T.rice + 0.15);
tl.set("#sc-rice .b2", { autoAlpha: 0 }, T.rice);
to({ riceAlpha: 1 }, T.rice + 0.3, 0.6, "power1.out");
to({ riceLine: 1 }, T.rice + 0.4, 1.6, "power1.inOut");
to({ riceFc: 1 }, T.rice + 1.7, 1.7, "power1.out");
tl.fromTo("#sc-rice .b1", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" }, T.rice + 1.4);
countUp($("#sc-rice .b1 .cnt"), T.rice + 1.4, 1.8);
lgIn("rice", T.rice + 0.8, T.jik - 0.4);
to({ orbit: 0.1, camDist: 22 }, T.rice, LEN.rice + LEN.acc, "sine.inOut");
to({ riceAlpha: 0 }, T.acc - 0.3, 0.5);
tl.to("#sc-rice .b1", { autoAlpha: 0, y: -10, duration: 0.4 }, T.acc - 0.3);
sceneNo("acc");
to({ accAlpha: 1 }, T.acc + 0.1, 0.4, "none");
to({ riceAcc: 1 }, T.acc + 0.2, 3.0, "power1.out");
tl.fromTo("#sc-rice .b2", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" }, T.acc + 0.3);
countUp($("#sc-rice .b2 .cnt"), T.acc + 0.3, 2.6);
tl.fromTo("#sc-rice .early", { autoAlpha: 0, scale: 0.6 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: "back.out(2.4)" }, T.acc + 7.4);
to({ accAlpha: 0 }, T.jik - 0.5, 0.4);
copyOut("#sc-rice", T.jik - 0.5);

// ── 8 ③ 직불금: 시군 색은 농가당 공익직불, 왼쪽은 시도별 예산현액 ───────
sceneNo("jik");
to({ riceColor: 0, jikColor: 1 }, T.jik - 0.2, 1.2);
to({ orbit: 0.16, tilt: 0.42, camDist: 22 }, T.jik - 0.2, LEN.jik, "sine.inOut");
copyIn("#sc-jik", T.jik + 0.15);
lgIn("jik", T.jik + 0.6, T.dev - 0.4);
to({ bdAlpha: 1 }, T.jik + 0.7, 0.4, "none");
to({ bdBars: 1 }, T.jik + 0.8, 1.6, "power1.out");
to({ bdSplit: 1 }, T.jik + 2.0, 1.6, "power1.out");
to({ bdAlpha: 0 }, T.dev - 0.5, 0.4);
copyOut("#sc-jik", T.dev - 0.5);

// ── 9 ③ 농촌개발: 지도가 왼쪽으로 가며 지구 수만큼 솟는다 ───────────
const spotAt = (id) => {
  const s = SPOTS.find((x) => x.id === id), t0 = T[id], sec = $(`#sc-${id}`);
  sceneNo(id, 1.0);
  copyIn(sec, t0 + 0.05);
  tl.fromTo(sec.querySelectorAll(".spot-big, .spot-line"), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.6, ease: "power3.out" }, t0 + 0.15);
  countUp(sec.querySelector(".cnt"), t0 + 0.15, Math.min(1.6, LEN[id] * 0.4));
  if (s.pts.length) ptsIn(`#sc-${id}`, t0 + 1.4, 0.7);
  copyOut(sec, t0 + LEN[id] - 0.45);
};
spotAt("dev");
to({ jikColor: 0, devColor: 1, mapShift: -330, tilt: 0.95, orbit: -0.42, camDist: 20.5 }, T.dev - 0.5, 1.5);
to({ devRise: 1 }, T.dev + 0.4, 2.2, "power2.out");
to({ orbit: -0.1 }, T.dev + 1.0, LEN.dev - 1.2, "sine.inOut");
lgIn("dev", T.dev + 0.8, T.flow - 0.5);

// ── 10 ④ 물류동향: 기둥이 가라앉고 어두운 지도 위로 수박이 흐른다 ────────
sceneNo("flow");
to({ devRise: 0, devColor: 0, mapDim: 1, mapShift: 300, tilt: 0, orbit: 0, camDist: 16.4, camX: 0.5, camY: 1.3 }, T.flow - 0.5, 1.5);
to({ camDist: 14.6, camY: 1.6 }, T.flow + 1.2, LEN.flow - 1.8, "sine.inOut");
to({ flowAlpha: 1 }, T.flow + 0.6, 0.3, "none");
to({ flows: 1 }, T.flow + 0.6, 3.2, "power1.out");
copyIn("#sc-flow", T.flow + 0.2);
ptsIn("#sc-flow", T.flow + 6.3, 1.9); // "2025년, 음성 수박은 서울로, 논산 수박은 용인으로"에 맞춰 (말하는 두 길만)
lgIn("flow", T.flow + 1.0, T.vill - 0.6);
to({ flowAlpha: 0 }, T.vill - 0.5, 0.5);
copyOut("#sc-flow", T.vill - 0.5);

// ── 11 ⑤ 마을 → 조합: 같은 어두운 지도 위에서 점이 바뀐다 ───────────
spotAt("vill");
to({ camDist: 22, camX: 0, camY: 0, mapDim: 0.9 }, T.vill - 0.5, 1.2);
to({ lvA: 1 }, T.vill, 0.3, "none");
to({ lvP: 1 }, T.vill + 0.1, 2.6, "power1.inOut");
lgIn("lv", T.vill + 0.6, T.coop - 0.4);
to({ lvA: 0 }, T.coop - 0.4, 0.5);
spotAt("coop");
to({ mapDim: 1, camDist: 21 }, T.coop - 0.3, LEN.coop, "sine.inOut");
to({ coopA: 1 }, T.coop - 0.1, 0.3, "none");
to({ coopP: 1 }, T.coop + 0.1, 2.6, "power1.inOut");
lgIn("coop", T.coop + 0.6, T.power - 0.4);
to({ coopA: 0 }, T.power - 0.5, 0.45);
to({ glAlpha: 0 }, T.power - 0.5, 0.6);

// ── 12 ⑥ 긴 시계열 네 가지: 나선 · 꽃잎 · 곡선 · 흙 단면 ────────────
spotAt("power");
to({ powerAlpha: 1 }, T.power - 0.1, 0.5, "power1.out");
to({ spiral: 1 }, T.power, LEN.power - 0.7, "power1.inOut");
lgIn("power", T.power + 0.5, T.rio - 0.5);
to({ powerAlpha: 0 }, T.rio - 0.45, 0.45);
spotAt("rio");
to({ rioA: 1 }, T.rio - 0.15, 0.45, "power1.out");
to({ rioP: 1 }, T.rio, 2.2, "power2.out");
to({ rioA: 0 }, T.employ - 0.45, 0.45);
const miniIn = (id, t0, t1, from) => tl.fromTo(`#mini-${id}`, { autoAlpha: 0, ...from }, { autoAlpha: 1, x: 0, y: 0, rotateY: 0, duration: 0.8, ease: "expo.out" }, t0)
  .fromTo(`#mini-${id} img`, { scale: 1 }, { scale: 1.14, duration: t1 - t0, ease: "sine.inOut" }, t0)
  .to(`#mini-${id}`, { autoAlpha: 0, duration: 0.4 }, t1 - 0.45);
miniIn("rio", T.rio + 0.7, T.employ, { y: 40 });
spotAt("employ");
miniIn("employ", T.employ + 0.4, T.soil, { x: 60 });
to({ empA: 1 }, T.employ - 0.1, 0.4, "none");
to({ empP: 1 }, T.employ + 0.1, LEN.employ - 1.5, "power1.inOut");
to({ empA: 0 }, T.soil - 0.45, 0.45);
spotAt("soil");
to({ soilA: 1 }, T.soil - 0.1, 0.4, "none");
to({ soilP: 1 }, T.soil + 0.1, 2.4, "power1.out");
to({ soilA: 0 }, T.wall - 0.5, 0.45);

// ── 13 자료 수집 현황: 모든 화면의 벽 ─────────────────────────
sceneNo("wall");
tl.set("#wall-wrap", { autoAlpha: 1 }, T.wall)
  .fromTo("#wall .wt", { autoAlpha: 0, z: -600, rotateX: -40 }, { autoAlpha: 1, z: 0, rotateX: 0, duration: 1.1, stagger: { each: 0.05, from: "center" }, ease: "power3.out" }, T.wall)
  .fromTo("#wall", { rotateZ: -7, rotateX: 26, y: 40 }, { rotateZ: -3, rotateX: 18, y: 0, duration: LEN.wall, ease: "sine.inOut" }, T.wall)
  .to("#wall-wrap", { autoAlpha: 0, duration: 0.5 }, T.maker - 0.5);
copyIn("#sc-wall", T.wall + 0.3);
copyOut("#sc-wall", T.maker - 0.5);

// ── 14 만든 이 ─────────────────────────────────────────
sceneNo("maker");
tl.set("#sc-maker", { autoAlpha: 1, y: 0 }, T.maker)
  .fromTo("#sc-maker .mk-photo", { autoAlpha: 0, y: 40, scale: 0.94 }, { autoAlpha: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" }, T.maker + 0.1)
  .fromTo("#sc-maker .kicker", { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.5 }, T.maker + 0.3)
  .fromTo("#sc-maker .hl .ch", { yPercent: 118, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.04, ease: "expo.out" }, T.maker + 0.4)
  .fromTo("#sc-maker .mk-cred, #sc-maker .mk-career, #sc-maker .mk-field", { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.25, ease: "power2.out" }, T.maker + 0.8)
  .fromTo("#sc-maker .mk-phil li", { autoAlpha: 0, x: -18 }, { autoAlpha: 1, x: 0, duration: 0.6, stagger: 0.6, ease: "power2.out" }, T.maker + 1.1)
  .fromTo("#sc-maker .mk-quote, #sc-maker .mk-mail", { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.4, ease: "power2.out" }, T.maker + 5.6)
  .to("#sc-maker", { autoAlpha: 0, y: -20, duration: 0.5, ease: "power2.in" }, T.end - 0.5);

// ── 15 닫기 ───────────────────────────────────────────
sceneNo("end");
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
const music = createMusic({ T, TOTAL, voice: { lines: LINES, base: "assets/intro/voice/" } });
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
async function soundOn() {
  if (+volIn.value < 5) { volIn.value = 70; music.setVolume(0.7); store.set("intro-vol", 70); } // 음량이 0으로 저장돼 있으면 켜도 안 들린다
  await music.enable(); store.set("intro-snd", "1"); sndUI();
}
sndBtn.addEventListener("click", async () => { if (music.on) { music.disable(); store.set("intro-snd", "0"); } else await soundOn(); sndUI(); });
// 지난번에 소리를 켰으면 이번에도 켠다. 브라우저가 소리 자동 재생을 막으면(새로 고침·주소로 바로 들어온 경우) 화면 어디든 처음 누르거나 키를 누를 때 켠다
if (store.get("intro-snd") === "1") {
  music.tryEnable().then((ok) => {
    if (ok) return sndUI();
    const off = () => { document.removeEventListener("click", first, true); document.removeEventListener("keydown", first, true); };
    const first = (e) => {
      off();
      if (music.on || e.target.closest?.("#snd, #sndhint, #vol") || (e.type === "keydown" && e.key === "m")) return; // 소리 단추는 제 일을 한다
      soundOn();
    };
    document.addEventListener("click", first, true); document.addEventListener("keydown", first, true);
  });
}
sndHint.addEventListener("click", soundOn);
volIn.addEventListener("input", async () => {
  const v = +volIn.value; music.setVolume(v / 100); store.set("intro-vol", v);
  if (v > 0 && !music.on) await soundOn();
});
document.addEventListener("keydown", (e) => { if (e.key === "m" && !e.target.closest("input, textarea, select")) sndBtn.click(); });
gsap.ticker.add(() => music.sync(tl.time(), !tl.paused() && tl.progress() < 1));

window.__intro = { tl, S, music, render: (o) => createMusic({ T, TOTAL, voice: { lines: LINES, base: "assets/intro/voice/" }, offline: true }).render(o) }; // 확인용 (scripts에서 장면을 찍을 때)

// ── 시작 ─────────────────────────────────────────────────
(async () => {
  bg = await createBackground($("#bg"), { gpu: !/[?&]gl\b/.test(location.search) });
  stage.dataset.gpu = bg.kind;
  fit();
  // 글꼴과 그림을 먼저 풀어 둔다 (재생 중에 그림을 푸느라 끊기거나 건너뛰지 않게). 오래 걸리면 그냥 시작
  const ready = Promise.all([document.fonts.ready, ...$$("img", stage).map((im) => (im.decode ? im.decode().catch(() => {}) : Promise.resolve()))]);
  try { await Promise.race([ready, new Promise((r) => setTimeout(r, 4000))]); } catch { /* 그냥 시작 */ }
  // 타임라인은 벽시계를 그대로 따라간다: 화면이 느린 기기에서도 영상 길이가 늘어지지 않고, 소리(오디오 시계)와 어긋나지 않는다.
  // (예전 lagSmoothing(250, 33)은 화면이 초당 4장 아래로 떨어지면 영상이 소리보다 뒤처져, 맞추느라 음악이 계속 끊겼다)
  gsap.ticker.lagSmoothing(0);
  gsap.ticker.add(frame);
  frame();
  player.classList.add("ready");
  requestAnimationFrame(() => { tl.seek(0, false); tl.play(0); }); // 언제나 처음부터 자동 재생
})();
