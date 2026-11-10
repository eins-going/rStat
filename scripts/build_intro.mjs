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
  return w[name];
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
const [fo, fd, , , , fv] = OD.f.at(-1);
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

const INTRO = {
  built: new Date().toISOString().slice(0, 10), Q,
  map: { sigun: sigun.map(({ key, sido, rings, c }) => ({ key, sido, rings, c })), lineSido, lineSigun },
  land: { year: landYear, v: land, nat: natLand },
  rice, flows: { year: odYear, top: flows, months: "1~11월" }, power,
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
