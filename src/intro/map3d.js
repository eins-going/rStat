// Three.js 장면: 빛 입자 → 시군 지도, 경지면적 돌출, 벼 예측 색, 어두운 바탕 지도.
import {
  WebGLRenderer, Scene, PerspectiveCamera, Shape, Path, Vector2, Vector3, ExtrudeGeometry, Mesh,
  MeshStandardMaterial, Color, AmbientLight, DirectionalLight, HemisphereLight, BufferGeometry,
  Float32BufferAttribute, Points, ShaderMaterial, AdditiveBlending, LineSegments, LineBasicMaterial,
  PlaneGeometry, ShadowMaterial, NeutralToneMapping, SRGBColorSpace, PCFShadowMap, Group,
} from "three";
import { LAND_RAMP, RICE_DIV, JIK_RAMP, DEV_RAMP, ramp } from "./palette.js";

export const STAGE_W = 1920, STAGE_H = 1080;
const MAP_H = 10; // 지도 높이(월드 단위)
const FLAT = 0.06; // 납작할 때 두께
const H_MAX = 1.2; // 가장 큰 경지면적 기둥 높이

const col = (c) => new Color(Array.isArray(c) ? `rgb(${c.join(",")})` : c);
const smooth = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));

function inside(x, y, ring) {
  let c = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i], [xj, yj] = ring[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
function area(r) { let s = 0; for (let i = 0, j = r.length - 1; i < r.length; j = i++) s += (r[j][0] + r[i][0]) * (r[j][1] - r[i][1]); return Math.abs(s / 2); }
// 시드 고정 난수: 매번 같은 그림
function rng(seed) { return () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296); }

const PVERT = /* glsl */ `
attribute vec3 aStart; attribute float aDelay; attribute float aSeed; attribute vec3 aColor;
uniform float uMorph, uTime, uSize, uScale;
varying vec3 vColor; varying float vA;
float ease(float t){ return t < 0.5 ? 4.0*t*t*t : 1.0 - pow(-2.0*t + 2.0, 3.0) / 2.0; }
void main(){
  float t = clamp((uMorph - aDelay*0.45) / 0.55, 0.0, 1.0);
  float e = ease(t), sw = 1.0 - e;
  vec3 p = mix(aStart, position, e);
  p.x += sin(uTime*0.55 + aSeed*6.2831) * 0.45 * sw;
  p.y += cos(uTime*0.47 + aSeed*12.566) * 0.45 * sw;
  p.z += sin(uTime*0.8 + aSeed*30.0) * 0.25 * sw;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (1.0 + 1.6*sw) * uScale / -mv.z;
  float tw = 0.78 + 0.22 * sin(uTime*2.3 + aSeed*41.0);
  vColor = aColor; vA = mix(0.45, 1.0, e) * tw;
}`;
const PFRAG = /* glsl */ `
uniform float uAlpha; varying vec3 vColor; varying float vA;
void main(){
  float r = length(gl_PointCoord - 0.5);
  float a = smoothstep(0.5, 0.0, r); a *= a;
  gl_FragColor = vec4(vColor, a * vA * uAlpha);
  #include <colorspace_fragment>
}`;

export function createMap(canvas, I) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = NeutralToneMapping; // 색상을 바꾸지 않는 톤 매핑 (호박색이 그대로)
  renderer.toneMappingExposure = 1.0;
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, STAGE_W / STAGE_H, 1, 200);
  const k = MAP_H / I.Q;
  const P = (x, y) => [x * k, y * k];

  // 빛: 따뜻한 주광 + 차가운 테두리광 + 하늘/땅 반사
  scene.add(new HemisphereLight(0xdfe8ff, 0x1a1408, 0.9));
  scene.add(new AmbientLight(0xffffff, 0.18));
  const sun = new DirectionalLight(0xfff1dc, 2.6);
  sun.position.set(-7, -11, 17);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  Object.assign(sun.shadow.camera, { left: -8, right: 8, top: 8, bottom: -8, near: 1, far: 50 });
  sun.shadow.bias = -0.0004;
  scene.add(sun);
  const rim = new DirectionalLight(0x8fbaff, 0.9);
  rim.position.set(9, 12, 6);
  scene.add(rim);

  const ground = new Mesh(new PlaneGeometry(60, 60), new ShadowMaterial({ opacity: 0.42, transparent: true }));
  ground.receiveShadow = true;
  scene.add(ground);

  // ── 시군 기둥 ─────────────────────────────────────────────
  const maxLand = Math.max(...Object.values(I.land.v).filter(Boolean));
  const dims = { cap: col("#1f242d"), side: col("#14171d") };
  const devMax = Math.max(...Object.values(I.spots.dev));
  const jSorted = Object.values(I.jikbul.v).sort((a, b) => a - b);
  const jikRank = (v) => { let lo = 0, hi = jSorted.length - 1; while (lo < hi) { const m = (lo + hi) >> 1; if (jSorted[m] < v) lo = m + 1; else hi = m; } return 0.08 + 0.92 * (lo / (jSorted.length - 1)); };
  const map = new Group();
  scene.add(map);
  const units = I.map.sigun.map((s) => {
    const shapes = s.rings.map(([outer, ...holes]) => {
      const pts = (r) => { const a = r.slice(0, -1); return a.map(([x, y]) => new Vector2(...P(x, y))); };
      const sh = new Shape(pts(outer));
      holes.forEach((h) => sh.holes.push(new Path(pts(h))));
      return sh;
    });
    const geo = new ExtrudeGeometry(shapes, { depth: 1, bevelEnabled: false, curveSegments: 1 });
    const land = I.land.v[s.key];
    const lt = land ? Math.sqrt(land / maxLand) : 0;
    const landCol = col(land ? ramp(LAND_RAMP, 0.12 + 0.88 * lt) : "#2a2620");
    const dv = I.rice.dev[s.key];
    const riceCol = dv == null ? col(RICE_DIV.na)
      : col(RICE_DIV.mid).lerp(col(dv < 0 ? RICE_DIV.lo : RICE_DIV.hi), Math.min(1, Math.abs(dv) / 0.05) ** 0.8);
    const jv = I.jikbul.v[s.key];
    const jikCol = col(jv == null ? "#262c28" : ramp(JIK_RAMP, jikRank(jv)));
    const dc = I.spots.dev[s.key] || 0;
    const devCol = col(dc ? ramp(DEV_RAMP, 0.1 + 0.9 * (dc / devMax) ** 1.3) : "#1d2430");
    const h2 = FLAT + 1.9 * (dc / devMax) ** 1.8;
    const cap = new MeshStandardMaterial({ roughness: 0.58, metalness: 0.04, transparent: true });
    const side = new MeshStandardMaterial({ roughness: 0.75, metalness: 0.0, transparent: true });
    const mesh = new Mesh(geo, [cap, side]);
    mesh.castShadow = mesh.receiveShadow = true;
    mesh.scale.z = FLAT;
    map.add(mesh);
    const [cx, cy] = P(...s.c);
    // 솟는 차례: 남서 → 북동으로 물결
    const delay = Math.min(1, Math.max(0, ((cx + 4) / 9) * 0.45 + ((cy + 5) / 10) * 0.55));
    return { key: s.key, mesh, cap, side, h: FLAT + (H_MAX - FLAT) * lt, landCol, riceCol, jikCol, devCol, h2, cx, cy, delay, land, rings: s.rings };
  });
  const byKey = new Map(units.map((u) => [u.key, u]));

  // ── 경계선 (납작할 때만 보인다) ────────────────────────────
  const segs = (lines, z) => {
    const a = [];
    lines.forEach((l) => { for (let i = 1; i < l.length; i++) a.push(...P(...l[i - 1]), z, ...P(...l[i]), z); });
    const g = new BufferGeometry(); g.setAttribute("position", new Float32BufferAttribute(a, 3)); return g;
  };
  const sidoMat = new LineBasicMaterial({ color: col("#cfd6e2"), transparent: true, opacity: 0, depthWrite: false });
  const sigunMat = new LineBasicMaterial({ color: col("#8d96a6"), transparent: true, opacity: 0, depthWrite: false });
  const sidoLines = new LineSegments(segs(I.map.lineSido, 0), sidoMat);
  const sigunLines = new LineSegments(segs(I.map.lineSigun, 0), sigunMat);
  sidoLines.renderOrder = sigunLines.renderOrder = 2;
  map.add(sidoLines, sigunLines);

  // ── 빛 입자: 시군 안 + 해안선·시도 경계 위 ───────────────────
  const N = 9000, NL = 2400;
  const R = rng(20261110);
  const pos = [], start = [], delay = [], seed = [], pcol = [];
  const dens = units.map((u) => (u.land || 0) / Math.max(1e-6, u.rings.reduce((s, p) => s + area(p[0]), 0)));
  const dSorted = [...dens].sort((a, b) => a - b);
  const rank = (v) => dSorted.indexOf(v) / (dSorted.length - 1);
  const weights = units.map((u) => u.rings.reduce((s, p) => s + area(p[0]), 0) ** 0.85);
  const wSum = weights.reduce((a, b) => a + b, 0);
  const push = (x, y, c) => {
    pos.push(x, y, 0.08);
    const r = 9 + R() * 16, a = R() * Math.PI * 2, e = (R() - 0.5) * Math.PI * 0.7;
    start.push(r * Math.cos(a) * Math.cos(e) * 1.4, r * Math.sin(a) * Math.cos(e), 4 + r * Math.sin(e) * 0.6);
    const dist = Math.hypot(x, y) / 6;
    delay.push(Math.min(1, R() * 0.65 + dist * 0.35));
    seed.push(R());
    pcol.push(c.r, c.g, c.b);
  };
  units.forEach((u, i) => {
    const n = Math.max(6, Math.round(((N - NL) * weights[i]) / wSum));
    const c = col(ramp(LAND_RAMP, 0.35 + 0.65 * rank(dens[i])));
    const rings = u.rings.map((p) => p[0]);
    const ra = rings.map(area), raS = ra.reduce((a, b) => a + b, 0);
    for (let j = 0; j < n; j++) {
      let q = R() * raS, ri = 0;
      while (q > ra[ri] && ri < rings.length - 1) q -= ra[ri++];
      const ring = rings[ri];
      let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      ring.forEach(([x, y]) => { x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y); });
      for (let t = 0; t < 40; t++) {
        const x = x0 + R() * (x1 - x0), y = y0 + R() * (y1 - y0);
        if (inside(x, y, ring)) { push(...P(x, y), c); break; }
      }
    }
  });
  const lineCol = col("#ffe9c2");
  const L = I.map.lineSido;
  const lens = L.map((l) => l.reduce((s, p, i) => (i ? s + Math.hypot(p[0] - l[i - 1][0], p[1] - l[i - 1][1]) : 0), 0));
  const lenSum = lens.reduce((a, b) => a + b, 0);
  for (let j = 0; j < NL; j++) {
    let q = R() * lenSum, li = 0;
    while (q > lens[li] && li < L.length - 1) q -= lens[li++];
    const l = L[li];
    for (let i = 1; i < l.length; i++) {
      const d = Math.hypot(l[i][0] - l[i - 1][0], l[i][1] - l[i - 1][1]);
      if (q <= d || i === l.length - 1) { const f = d ? Math.min(1, q / d) : 0; push(...P(l[i - 1][0] + (l[i][0] - l[i - 1][0]) * f, l[i - 1][1] + (l[i][1] - l[i - 1][1]) * f), lineCol); break; }
      q -= d;
    }
  }
  const pg = new BufferGeometry();
  pg.setAttribute("position", new Float32BufferAttribute(pos, 3));
  pg.setAttribute("aStart", new Float32BufferAttribute(start, 3));
  pg.setAttribute("aDelay", new Float32BufferAttribute(delay, 1));
  pg.setAttribute("aSeed", new Float32BufferAttribute(seed, 1));
  pg.setAttribute("aColor", new Float32BufferAttribute(pcol, 3));
  const pmat = new ShaderMaterial({
    vertexShader: PVERT, fragmentShader: PFRAG, transparent: true, depthWrite: false, blending: AdditiveBlending,
    uniforms: { uMorph: { value: 0 }, uTime: { value: 0 }, uSize: { value: 92 }, uScale: { value: 1 }, uAlpha: { value: 1 } },
  });
  const points = new Points(pg, pmat);
  points.frustumCulled = false;
  points.renderOrder = 3;
  scene.add(points);

  // ── 그리기 ───────────────────────────────────────────────
  const tmp = new Color(), tmpS = new Color(), v3 = new Vector3();
  let W = STAGE_W, Hh = STAGE_H;
  function resize(w, h) {
    W = w; Hh = h;
    renderer.setSize(w, h, false);
    pmat.uniforms.uScale.value = h / STAGE_H;
  }

  function render(S, time) {
    // 카메라: 기울기(tilt)·돌기(orbit)·거리, setViewOffset으로 지도를 오른쪽으로 민다
    const phi = S.tilt * 0.86, th = S.orbit, D = S.camDist;
    const tx = S.camX, ty = -0.4 * S.tilt + S.camY;
    camera.position.set(tx + D * Math.sin(phi) * Math.sin(th), ty - D * Math.sin(phi) * Math.cos(th), D * Math.cos(phi));
    camera.up.set(0, 1, 0);
    camera.lookAt(tx, ty, 0);
    camera.setViewOffset(STAGE_W, STAGE_H, -S.mapShift, -S.mapLift, STAGE_W, STAGE_H);
    camera.updateMatrixWorld();

    const show = S.mapAlpha > 0.001;
    map.visible = show;
    units.forEach((u) => {
      const r = smooth((S.rise - u.delay * 0.5) / 0.5);
      const r2 = S.devRise > 0 ? smooth((S.devRise - (1 - u.delay) * 0.5) / 0.5) : 0;
      u.mesh.scale.z = FLAT + (u.h - FLAT) * r + (u.h2 - FLAT) * r2;
      tmp.lerpColors(u.landCol, u.riceCol, S.riceColor).lerp(u.jikCol, S.jikColor).lerp(u.devCol, S.devColor).lerp(dims.cap, S.mapDim);
      u.cap.color.copy(tmp);
      u.cap.emissive.copy(tmp).multiplyScalar(0.16 * (1 - Math.min(1, S.mapDim)));
      tmpS.copy(tmp).multiplyScalar(0.52).lerp(dims.side, S.mapDim);
      u.side.color.copy(tmpS);
      u.cap.opacity = u.side.opacity = S.mapAlpha;
    });
    const flatness = 1 - smooth(Math.max(S.rise, S.devRise) * 1.6);
    sidoLines.position.z = FLAT + 0.004;
    sigunLines.position.z = FLAT + 0.003;
    sidoMat.opacity = S.mapAlpha * flatness * (0.28 + 0.4 * S.mapDim);
    sigunMat.opacity = S.mapAlpha * flatness * (0.10 + 0.12 * S.mapDim);
    ground.material.opacity = 0.42 * S.mapAlpha;

    pmat.uniforms.uMorph.value = S.morph;
    pmat.uniforms.uTime.value = time;
    pmat.uniforms.uAlpha.value = S.pAlpha;
    points.visible = S.pAlpha > 0.001;
    canvas.style.opacity = S.glAlpha;
    if (S.glAlpha > 0.001) renderer.render(scene, camera);
  }

  // 월드 좌표 → 무대 좌표(px)
  function project(x, y, z) {
    v3.set(x, y, z).project(camera);
    return [(v3.x + 1) * 0.5 * STAGE_W, (1 - v3.y) * 0.5 * STAGE_H];
  }
  const top = (key) => { const u = byKey.get(key); return u ? [u.cx, u.cy, u.mesh.scale.z] : null; };

  const world = (qx, qy) => P(qx, qy);
  return { render, resize, project, top, world, flat: FLAT, units, byKey, renderer };
}
