// 색: 사이트(style.css) 색을 잇는다. 값은 sRGB 16진.
export const C = {
  ink: "#07090d",
  bg: "#14161b",
  text: "#eef0f3",
  muted: "#9aa1ad",
  amber: "#f5a524",
  gold: "#ffcf7a",
  field: "#5fb37c",
  sky: "#5fb3ff",
  blue: "#4ea1ff",
  coral: "#ff6b5e",
  origin: "#ffd28a", // 물류: 보낸 곳 (flow.css)
  dest: "#9fd1ff", //   받은 곳
};

// 장면별 배경 빛 두 색 (bg.js가 장면 사이를 섞는다)
export const SCENE_GLOW = [
  ["#f5a524", "#3f9b6a"], // 0 열기
  ["#f5a524", "#ffcf7a"], // 1 주요통계
  ["#e9b85a", "#3d7fd9"], // 2 벼 작황
  ["#d99a4a", "#4f9fe8"], // 3 물류동향
  ["#2f9fb0", "#5f6ee8"], // 4 농사용 전기
  ["#c58a3a", "#3f9b8a"], // 5 그리고 더
  ["#f5a524", "#5fb37c"], // 6 닫기
];

// 경지면적 단계색 (낮음 → 높음): 짙은 호박 → 호박 → 금빛
export const LAND_RAMP = ["#3b2a12", "#8a5a17", "#d98e1f", "#f5a524", "#ffd98a"];
// 벼 예측 평년 대비 (낮음 ← 0 → 높음)
export const RICE_DIV = { lo: "#4ea1ff", mid: "#3a404c", hi: "#f5a524", na: "#2f343e" };
// 전기 나선: 연도 2010 → 2026
export const POWER_RAMP = ["#2b4a8f", "#2f86c9", "#2fb3a8", "#9cc56a", "#f5a524"];

export const hex = (h) => {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const toLin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const toSrgb = (c) => 255 * (c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055);
// 선형 공간에서 섞는다 (가운데가 탁해지지 않게)
export function mix(a, b, t) {
  const A = hex(a), B = hex(b);
  return A.map((v, i) => Math.round(toSrgb(toLin(v) + (toLin(B[i]) - toLin(v)) * t)));
}
export function ramp(stops, t) {
  t = Math.min(1, Math.max(0, t)) * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(t));
  return mix(stops[i], stops[i + 1], t - i);
}
export const rgb = ([r, g, b], a = 1) => (a === 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`);
