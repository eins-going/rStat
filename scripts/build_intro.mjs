// 소개 영상(intro.html) 만들기: 사이트 자료에서 영상에 쓸 것만 뽑고, src/intro를 한 파일로 묶는다.
//   node scripts/build_intro.mjs          자료 + 묶기
//   node scripts/build_intro.mjs --watch  src/intro가 바뀌면 다시 묶기
// 결과: assets/intro/intro_data.js (window.INTRO), assets/intro/intro.js
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as esbuild from "esbuild";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "assets/intro");
fs.mkdirSync(OUT, { recursive: true });

const load = (file, name) => {
  const w = {};
  new Function("window", fs.readFileSync(path.join(ROOT, "data", file), "utf8"))(w);
  return name ? w[name] : Object.values(w)[0];
};

// ── 지도: TopoJSON 풀기 → 평면 투영(사이트 app.js와 같은 방식) → 단순화 ─────────────
const TOPO = load("geo.js", "AGRI_TOPO");
const K = Math.cos((36 * Math.PI) / 180);
const drawLon = (lon) => (lon > 130.6 ? lon - 0.8 : lon); // 울릉군을 붙여 그린다 (app.js ULLEUNG)
const { scale, translate } = TOPO.transform;

const rawArcs = TOPO.arcs.map((arc) => {
  let x = 0, y = 0;
  return arc.map(([dx, dy]) => {
    x += dx; y += dy;
    const lon = x * scale[0] + translate[0], lat = y * scale[1] + translate[1];
    return [drawLon(lon) * K, lat];
  });
});
let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
rawArcs.flat().forEach(([x, y]) => { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); });
// 높이 = 1, 가운데 = 0, 위쪽 +y (Three.js 좌표)
const H = y1 - y0, CX = (x0 + x1) / 2, CY = (y0 + y1) / 2;
const norm = ([x, y]) => [(x - CX) / H, (y - CY) / H];

function dp(pts, eps) { // Douglas–Peucker (양 끝점 유지 → 이웃 시군 경계가 그대로 맞물린다)
  if (pts.length < 3) return pts;
  const [sx, sy] = pts[0], [ex, ey] = pts[pts.length - 1];
  if (sx === ex && sy === ey && pts.length > 4) { // 닫힌 아크(섬): 시작점에서 가장 먼 점으로 나눠 따로 줄인다
    let m = 1, md = 0;
    pts.forEach(([x, y], i) => { const d = Math.hypot(x - sx, y - sy); if (d > md) { md = d; m = i; } });
    return [...dp(pts.slice(0, m + 1), eps), ...dp(pts.slice(m), eps).slice(1)];
  }
  const keep = new Uint8Array(pts.length); keep[0] = keep[pts.length - 1] = 1;
  const stack = [[0, pts.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = pts[a], [bx, by] = pts[b];
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1e-12;
    let mi = -1, md = eps;
    for (let i = a + 1; i < b; i++) {
      const d = Math.abs((pts[i][0] - ax) * dy - (pts[i][1] - ay) * dx) / L;
      if (d > md) { md = d; mi = i; }
    }
    if (mi > 0) { keep[mi] = 1; stack.push([a, mi], [mi, b]); }
  }
  return pts.filter((_, i) => keep[i]);
}
const Q = 4000; // 좌표를 정수(×4000)로 싣는다
const arcs = rawArcs.map((a) => dp(a.map(norm), 0.0009).map(([x, y]) => [Math.round(x * Q), Math.round(y * Q)]));

const ring = (ids) => {
  const out = [];
  ids.forEach((i) => {
    const a = i < 0 ? arcs[~i].slice().reverse() : arcs[i];
    out.push(...(out.length ? a.slice(1) : a));
  });
  return out;
};
const geoms = TOPO.objects.municipalities.geometries;
const arcUse = new Map(); // 아크 → 쓰는 시도들 (해안선·시도 경계 가리기)
const sigun = geoms.map((g) => {
  const key = `${g.properties.sido}|${g.properties.unit}`;
  const polys = g.type === "Polygon" ? [g.arcs] : g.arcs;
  polys.flat(2).forEach((i) => { const k = i < 0 ? ~i : i; (arcUse.get(k) || arcUse.set(k, []).get(k)).push(g.properties.sido); });
  const rings = polys.map((p) => p.map(ring).filter((r) => r.length >= 4)).filter((p) => p.length && Math.abs(ringArea(p[0])) > 40);
  return { key, sido: g.properties.sido, unit: g.properties.unit, rings };
});

function ringArea(r) { let s = 0; for (let i = 0, j = r.length - 1; i < r.length; j = i++) s += (r[j][0] + r[i][0]) * (r[j][1] - r[i][1]); return s / 2; }
function centroid(r) {
  let a = 0, cx = 0, cy = 0;
  for (let i = 0, j = r.length - 1; i < r.length; j = i++) {
    const f = r[j][0] * r[i][1] - r[i][0] * r[j][1];
    a += f; cx += (r[j][0] + r[i][0]) * f; cy += (r[j][1] + r[i][1]) * f;
  }
  return [Math.round(cx / (3 * a)), Math.round(cy / (3 * a))];
}
sigun.forEach((s) => {
  const main = s.rings.reduce((m, p) => (Math.abs(ringArea(p[0])) > Math.abs(ringArea(m[0])) ? p : m));
  s.c = centroid(main[0]);
});
// 선: 해안선·시도 경계(밝게) / 시군 경계(흐리게)
const lineSido = [], lineSigun = [];
arcUse.forEach((sd, i) => ((sd.length === 1 || sd[0] !== sd[1]) ? lineSido : lineSigun).push(arcs[i]));

// ── 주요통계: 시군 경지면적 ───────────────────────────────────────────────
const D = load("data.js", "AGRI_DATA");
const landYear = D.periods.land.at(-1);
const land = Object.fromEntries(sigun.map((s) => [s.key, D.v.land[s.key]?.at(-1) ?? null]));
const natLand = D.v.land["00"].at(-1);

// ── 벼 작황: 전국 단수·평년, 2026 예측 7시점, 시군 예측(평년 대비) ─────────────
const R = load("rice.js", "AGRI_RICE");
const yi = (y) => R.years.indexOf(y);
const FY = R.fc.year;
const nat = R.v["00"];
const riceHist = [];
for (let y = 2010; y < FY; y++) riceHist.push([y, nat.y[yi(y)], nat.n[yi(y)]]);
const fcPts = R.fc.order.map((t) => {
  const r = R.fc.v[t]?.["00"];
  return r ? { t, lab: R.fc.lab[t], y: r[0], lo: r[3], hi: r[4] } : null;
}).filter(Boolean);
const cur = R.fc.v[R.fc.cur];
const riceDev = {};
sigun.forEach((s) => {
  const r = cur[s.key], v = R.v[s.key];
  const n = v?.n?.[yi(FY)];
  if (r && n) riceDev[s.key] = +(r[0] / n - 1).toFixed(4);
});
const out26 = R.outlook[FY] || {};
const rice = {
  year: FY, hist: riceHist, fc: fcPts, normFY: nat.n[yi(FY)],
  stat: R.fc.stat["00"]?.[0] ?? out26.stat?.y ?? null, statDate: R.fc.statDate,
  krei: (out26.kreiLate || out26.krei)?.y ?? null,
  dev: riceDev,
};

// ── 물류동향: 최근 연도 컨테이너 시군 간 흐름 상위 ─────────────────────────
const OD = load("od.js", "AGRI_OD");
const odYear = OD.years.at(-1);
// 수박(복수박 포함)의 파렛트 이동
const PAL = load("od_pallet.js", "AGRI_OD_EQ")["파렛트"];
const melon = new Set(OD.crops.map((c, i) => (c.includes("수박") ? i : -1)).filter((i) => i >= 0));
const [po, pd, pc, , , pv] = PAL.at(-1);
const fo = [], fd = [], fv = [];
for (let i = 0; i < pv.length; i++) if (melon.has(pc[i])) { fo.push(po[i]); fd.push(pd[i]); fv.push(pv[i]); }
const keySet = new Set(sigun.map((s) => s.key));
const pair = new Map();
let odTotal = 0;
for (let i = 0; i < fv.length; i++) {
  const o = OD.regions[fo[i]], d = OD.regions[fd[i]];
  odTotal += fv[i];
  if (o === d || !keySet.has(o) || !keySet.has(d)) continue;
  pair.set(`${o}>${d}`, (pair.get(`${o}>${d}`) || 0) + fv[i]);
}
const flows = [...pair].sort((a, b) => b[1] - a[1]).slice(0, 70).map(([k, v]) => [...k.split(">"), v]);

// ── 농사용 전기: 전국 월 사용량(MWh) ─────────────────────────────────────
const P = load("power.js", "AGRI_POWER");
const power = { months: P.months, k: P.v["00"].k };

// ── 직불금·고향사랑기금 ─────────────────────────────────────────────
const J = load("jikbul.js");
const jpi = J.periods.findLastIndex((p) => p.d.endsWith("1231"));
const jYear = J.periods[jpi].y;
const jikbul = { year: jYear, v: {}, nat: J.regions["00"][jpi][0][0], gov: J.ext["공익직불"][jpi] };
sigun.forEach((s) => {
  const r = J.regions[s.key]?.[jpi]?.[0]?.[0], hh = J.den.households[s.key];
  if (r && hh) jikbul.v[s.key] = Math.round((r * 100) / hh); // 농가당 기본형 공익직불 예산(만원)
});
const SIDO_KEYS = [...new Set(sigun.map((s) => s.sido))];
const SN = { 11: "서울", 21: "부산", 22: "대구", 23: "인천", 24: "광주", 25: "대전", 26: "울산", 29: "세종", 31: "경기", 32: "강원", 33: "충북", 34: "충남", 35: "전북", 36: "전남", 37: "경북", 38: "경남", 39: "제주" };
jikbul.sido = SIDO_KEYS.map((k) => {
  const r = J.regions[k]?.[jpi] || [];
  const pub = [0, 1, 2, 3, 4, 5].reduce((a, c) => a + (r[c]?.[0] || 0), 0); // 공익직불(기본형+선택형)
  const own = (r[7]?.[0] || 0); // 자체·기타 직불
  return { k, name: SN[k], pub, own, hh: J.den.households[k] || 0 };
}).sort((a, b) => b.pub - a.pub);
jikbul.pubNat = [0, 1, 2, 3, 4, 5].reduce((a, c) => a + (J.regions["00"][jpi][c]?.[0] || 0), 0);
jikbul.bizCount = J.biz.length;
const GH = load("gohyang.js");
const gi = (n) => GH.fields.indexOf(n);
const gNat = GH.regions["00"];
const gLast = GH.years.length - 1;
const gohyang = {
  years: GH.years.map((y, i) => ({ y: y.y, full: y.full, ymd: y.ymd, size: gNat[i][gi("size")] })),
  last: Object.fromEntries(["size", "biz", "bizEp", "run", "runEp", "keep", "move"].map((k) => [k, gNat[gLast][gi(k)]])),
  govs: GH.counts["00"][gLast], check: GH.check.cum || null,
};

// ── 화면마다 특장점 숫자 ────────────────────────────────────────────
const appJs = fs.readFileSync(path.join(ROOT, "assets/app.js"), "utf8");
const metrics = (appJs.match(/const METRICS = \[([\s\S]*?)\n  \];/)?.[1].match(/label:/g) || []).length;
const FM = load("farmmap.js").regions["00"];
const FAC = load("facilities.js");
const EMP = load("employ.js");
const NH = load("nhcoop.js");
const AP = load("apfs.js");
const RD = load("ruraldev.js");
const SO = load("soil.js");
const LV = load("livestock.js");
const RIO = load("rio.js");
const ST = load("status.js");
const soilN = Object.values(SO.r["00"].c.ph).flat().reduce((a, b) => a + b, 0);
const apLast = AP.periods.findLastIndex((p) => p.m === 12);
const facts = {
  metrics, sido: new Set(sigun.map((s) => s.sido)).size,
  parcels: FM["전체"].n, parcelMed: FM["전체"].med, parcelSmall: FM["전체"].small, paddyArmt: FM["논"].armt, farmYear: load("farmmap.js").year,
  facilities: FAC.rows.length, facKinds: FAC.kinds.length,
  rio: { regions: RIO.regions.length, sectors: Object.keys(RIO.sectorNames).length, year: RIO.year },
  od: { years: OD.years.length, from: OD.years[0], to: OD.years.at(-1), crops: OD.crops.length, regions: OD.regions.length },
  power: { regions: Object.keys(P.v).length, months: P.months.length, types: P.types },
  employ: { from: EMP.years[0], to: EMP.years.at(-1), a0: EMP.y["00"].a[0], a1: EMP.y["00"].a.at(-1), months: EMP.months.length },
  agfin: { coops: NH.coops.length, cats: AP.cats.length, year: AP.periods[apLast].y, cnt: AP.regions["00"][apLast].t[0], paid: AP.regions["00"][apLast].t[5] },
  ruraldev: { sites: Object.values(RD.krc.sites).reduce((s, a) => s + a.length, 0), cats: RD.cats.length },
  soil: { tests: soilN, chem: SO.chem.length, obst: SO.obst.length },
  livestock: { villages: LV.r["00"].nv, from: LV.years[0], to: LV.years.at(-1), fac: LV.r["00"].fac.length },
  status: { items: ST.items.length, auto: ST.items.filter((i) => i.method === "자동" || i.method === "실시간").length, orgs: new Set(ST.items.map((i) => i.origin.split(/[ ·]/)[0])).size },
  riceAcc: Object.fromEntries(["stat", "krei", "norm", "m0731", "m0815", "m0901", "m0915", "m1001"].map((k) => [k, R.acc[k]?.mae])), riceFrom: R.acc.from,
};

// ── 08~13 강조 그래픽 자료 ─────────────────────────────────────────
const SHORT = { 11: "서울", 21: "부산", 22: "대구", 23: "인천", 24: "광주", 25: "대전", 26: "울산", 29: "세종", 31: "경기", 32: "강원", 33: "충북", 34: "충남", 35: "전북", 36: "전남", 37: "경북", 38: "경남", 39: "제주" };
const agriX = (r) => RIO.order.reduce((a, c) => a + (RIO.items[c]?.regions?.[r]?.x || 0), 0);
const natAgri = RIO.regions.reduce((a, r) => a + agriX(r), 0), natAll = RIO.regions.reduce((a, r) => a + RIO.regionInfo[r].x, 0);
const rioSp = { year: RIO.year, total: natAgri, regions: RIO.regions.map((r) => ({ k: r, name: SHORT[r], x: agriX(r), lq: +((agriX(r) / RIO.regionInfo[r].x) / (natAgri / natAll)).toFixed(2) })) };
// 농·축협: 경위도 → 지도 좌표(Q 정수)
const toQ = (lon, lat) => norm([drawLon(lon) * K, lat]).map((v) => Math.round(v * Q));
const NK = { L: 0, X: 1, I: 2 };
const lastNum = (a) => [...(a || [])].reverse().find((v) => v != null) ?? 0;
const coops = NH.coops.filter((c) => c.xy).map((c) => [...toQ(c.xy[0], c.xy[1]), NK[c.k] ?? 0, Math.round(lastNum(c.v?.[1]))]);
const coopKinds = NH.coops.reduce((a, c) => ((a[c.k] = (a[c.k] || 0) + 1), a), {});
// 농촌개발 사업 지구 수 (시군)
const dev = Object.fromEntries(Object.entries(RD.krc.sites).map(([k, v]) => [k, v.length]));
// 토양 적성등급 면적 (1~5급 + 기타)
const soilSp = { pg: SO.r["00"].pg, fg: SO.r["00"].fg, po: SO.r["00"].o.po, fo: SO.r["00"].o.fo };
// 축산: 축종별 분뇨, 시군별 마을 수·분뇨
const lvSp = {
  kinds: LV.kinds.map((n, i) => [n, LV.r["00"].k[i][2]]),
  nv: Object.fromEntries(sigun.map((s) => [s.key, LV.r[s.key]?.nv || 0])),
  man: Object.fromEntries(sigun.map((s) => [s.key, LV.r[s.key]?.t?.man?.at(-1) || 0])),
  top: LV.r["00"].v?.[0] || null,
};
const empSp = { years: EMP.years.map(Number), a: EMP.y["00"].a };
const spots = { rio: rioSp, coops, coopKinds, dev, soil: soilSp, lv: lvSp, employ: empSp };

const INTRO = {
  built: new Date().toISOString().slice(0, 10), Q,
  map: { sigun: sigun.map(({ key, sido, rings, c }) => ({ key, sido, rings, c })), lineSido, lineSigun },
  land: { year: landYear, v: land, nat: natLand },
  rice, flows: { year: odYear, top: flows, months: "1~11월", crop: "수박", equip: "파렛트", total: odTotal }, power, jikbul, gohyang, facts, spots,
  shots: fs.existsSync(path.join(OUT, "shots/shots.json")) ? JSON.parse(fs.readFileSync(path.join(OUT, "shots/shots.json"), "utf8")) : {},
};
const js = `// 소개 영상 자료 (scripts/build_intro.mjs가 data/*.js에서 뽑음 — 손으로 고치지 않는다)\nwindow.INTRO = ${JSON.stringify(INTRO)};\n`;
fs.writeFileSync(path.join(OUT, "intro_data.js"), js);
console.log(`intro_data.js ${(js.length / 1024).toFixed(0)}KB · 시군 ${sigun.length} · 경지 ${landYear} · 벼 예측 ${fcPts.length}시점(시군 ${Object.keys(riceDev).length}) · 흐름 ${flows.length} (${odYear}) · 전기 ${power.months.length}개월`);

// ── 묶기 ─────────────────────────────────────────────────────────────
const opts = {
  entryPoints: [path.join(ROOT, "src/intro/main.js")], bundle: true, minify: true, format: "iife",
  target: ["es2020"], outfile: path.join(OUT, "intro.js"), legalComments: "none", logLevel: "info",
};
if (process.argv.includes("--watch")) (await esbuild.context(opts)).watch();
else await esbuild.build(opts);
