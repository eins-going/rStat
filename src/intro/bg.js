// 배경 빛: 도메인 왜곡 fbm 오로라 + 빛 웅덩이 + 필름 입자 + 비네트.
// WebGPU가 되면 WGSL, 안 되면 WebGL2 GLSL, 둘 다 안 되면 CSS 그라디언트로 둔다. 두 셰이더는 같은 식이다.

const WGSL = /* wgsl */ `
struct U { a: vec4f, colA: vec4f, colB: vec4f, glow: vec4f };
@group(0) @binding(0) var<uniform> u: U;

@vertex fn vs(@builtin(vertex_index) i: u32) -> @builtin(position) vec4f {
  var p = array(vec2f(-1.0, -3.0), vec2f(-1.0, 1.0), vec2f(3.0, 1.0));
  return vec4f(p[i], 0.0, 1.0);
}
fn hash(p: vec2f) -> f32 { return fract(sin(dot(p, vec2f(127.1, 311.7))) * 43758.5453); }
fn noise(p: vec2f) -> f32 {
  let i = floor(p); let f = fract(p); let w = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2f(1.0, 0.0)), w.x), mix(hash(i + vec2f(0.0, 1.0)), hash(i + vec2f(1.0, 1.0)), w.x), w.y);
}
fn fbm(q: vec2f) -> f32 {
  var p = q; var s = 0.0; var a = 0.5;
  for (var k = 0; k < 5; k++) { s += a * noise(p); p = mat2x2f(1.6, 1.2, -1.2, 1.6) * p; a *= 0.5; }
  return s;
}
@fragment fn fs(@builtin(position) fc: vec4f) -> @location(0) vec4f {
  let t = u.a.x; let res = u.a.zw;
  let uv = vec2f(fc.x / res.x, 1.0 - fc.y / res.y);
  var p = (uv - 0.5) * vec2f(res.x / res.y, 1.0);
  let q = vec2f(fbm(p * 1.4 + vec2f(t * 0.020, -t * 0.015)), fbm(p * 1.4 + vec2f(5.2, 1.3) - t * 0.018));
  let g = fbm(p * 1.8 + q * 1.7 + vec2f(0.0, t * 0.03));
  let band = smoothstep(0.42, 0.95, g);
  var col = vec3f(0.027, 0.035, 0.051);
  col += u.colA.rgb * band * 0.30 * (0.55 + 0.45 * q.x);
  col += u.colB.rgb * smoothstep(0.35, 0.9, q.y) * 0.16;
  let gp = (u.glow.xy - 0.5) * vec2f(res.x / res.y, 1.0);
  let d = length(p - gp);
  col += mix(u.colA.rgb, u.colB.rgb, 0.5) * exp(-d * d / (u.glow.z * u.glow.z)) * u.glow.w;
  col *= u.a.y;
  let v = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2f(1.1, 1.0)));
  col *= mix(0.45, 1.0, v);
  col += (hash(fc.xy + fract(t) * 91.0) - 0.5) * 0.022;
  return vec4f(max(col, vec3f(0.0)), 1.0);
}`;

const GLSL_V = `#version 300 es
void main(){ vec2 p = vec2(gl_VertexID == 2 ? 3.0 : -1.0, gl_VertexID == 0 ? -3.0 : 1.0); gl_Position = vec4(p, 0.0, 1.0); }`;
const GLSL_F = `#version 300 es
precision highp float;
uniform vec4 uA, uColA, uColB, uGlow;
out vec4 o;
float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){ vec2 i = floor(p), f = fract(p), w = f*f*(3.0-2.0*f);
  return mix(mix(hash(i), hash(i+vec2(1,0)), w.x), mix(hash(i+vec2(0,1)), hash(i+vec2(1,1)), w.x), w.y); }
float fbm(vec2 p){ float s = 0.0, a = 0.5; mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int k = 0; k < 5; k++){ s += a*noise(p); p = m*p; a *= 0.5; } return s; }
void main(){
  float t = uA.x; vec2 res = uA.zw;
  vec2 uv = gl_FragCoord.xy / res;
  vec2 p = (uv - 0.5) * vec2(res.x/res.y, 1.0);
  vec2 q = vec2(fbm(p*1.4 + vec2(t*0.020, -t*0.015)), fbm(p*1.4 + vec2(5.2, 1.3) - t*0.018));
  float g = fbm(p*1.8 + q*1.7 + vec2(0.0, t*0.03));
  float band = smoothstep(0.42, 0.95, g);
  vec3 col = vec3(0.027, 0.035, 0.051);
  col += uColA.rgb * band * 0.30 * (0.55 + 0.45*q.x);
  col += uColB.rgb * smoothstep(0.35, 0.9, q.y) * 0.16;
  vec2 gp = (uGlow.xy - 0.5) * vec2(res.x/res.y, 1.0);
  float d = length(p - gp);
  col += mix(uColA.rgb, uColB.rgb, 0.5) * exp(-d*d/(uGlow.z*uGlow.z)) * uGlow.w;
  col *= uA.y;
  float v = smoothstep(1.25, 0.25, length((uv - 0.5) * vec2(1.1, 1.0)));
  col *= mix(0.45, 1.0, v);
  col += (hash(gl_FragCoord.xy + fract(t)*91.0) - 0.5) * 0.022;
  o = vec4(max(col, vec3(0.0)), 1.0);
}`;

async function webgpu(canvas) {
  if (!navigator.gpu) return null;
  const adapter = await navigator.gpu.requestAdapter({ powerPreference: "low-power" });
  if (!adapter) return null;
  const device = await adapter.requestDevice();
  device.addEventListener("uncapturederror", (e) => console.warn("WebGPU 오류:", e.error.message));
  const ctx = canvas.getContext("webgpu");
  if (!ctx) return null;
  const format = navigator.gpu.getPreferredCanvasFormat();
  ctx.configure({ device, format, alphaMode: "opaque" });
  const module = device.createShaderModule({ code: WGSL });
  const pipeline = device.createRenderPipeline({
    layout: "auto",
    vertex: { module, entryPoint: "vs" },
    fragment: { module, entryPoint: "fs", targets: [{ format }] },
    primitive: { topology: "triangle-list" },
  });
  const ubuf = device.createBuffer({ size: 64, usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST });
  const bind = device.createBindGroup({ layout: pipeline.getBindGroupLayout(0), entries: [{ binding: 0, resource: { buffer: ubuf } }] });
  const data = new Float32Array(16);
  return {
    kind: "WebGPU",
    lost: device.lost,
    draw(u) {
      data.set(u);
      device.queue.writeBuffer(ubuf, 0, data);
      const enc = device.createCommandEncoder();
      const pass = enc.beginRenderPass({ colorAttachments: [{ view: ctx.getCurrentTexture().createView(), loadOp: "clear", storeOp: "store", clearValue: { r: 0, g: 0, b: 0, a: 1 } }] });
      pass.setPipeline(pipeline); pass.setBindGroup(0, bind); pass.draw(3); pass.end();
      device.queue.submit([enc.finish()]);
    },
  };
}

function webgl2(canvas) {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) return null;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, GLSL_V));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, GLSL_F));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
  gl.useProgram(prog);
  gl.bindVertexArray(gl.createVertexArray());
  const loc = ["uA", "uColA", "uColB", "uGlow"].map((n) => gl.getUniformLocation(prog, n));
  return {
    kind: "WebGL2",
    draw(u) {
      gl.viewport(0, 0, canvas.width, canvas.height);
      loc.forEach((l, i) => gl.uniform4f(l, u[i * 4], u[i * 4 + 1], u[i * 4 + 2], u[i * 4 + 3]));
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}

// u: Float32Array(16) = [time, intensity, w, h, colA(rgb,_), colB(rgb,_), glowX, glowY, glowR, glowStrength]
export async function createBackground(canvas, { gpu = true } = {}) {
  let r = null;
  if (gpu) try { r = await webgpu(canvas); } catch (e) { console.warn("WebGPU 실패, WebGL2로", e); r = null; }
  if (!r) {
    // WebGPU 문맥을 얻었다가 실패했으면 같은 캔버스에 WebGL을 못 얻으므로 새 캔버스로 바꾼다
    const c2 = canvas.cloneNode();
    canvas.replaceWith(c2);
    canvas = c2;
    r = webgl2(canvas);
  }
  const out = r ? { ...r, canvas } : { kind: "CSS", canvas, draw() {} };
  // WebGPU 장치를 잃으면(드라이버 재시작 등) WebGL2로 바꿔 계속 그린다
  if (r?.lost) r.lost.then(() => {
    const c2 = out.canvas.cloneNode();
    out.canvas.replaceWith(c2);
    const g = webgl2(c2);
    Object.assign(out, g ? { ...g, canvas: c2 } : { kind: "CSS", canvas: c2, draw() {} });
  });
  return out;
}
