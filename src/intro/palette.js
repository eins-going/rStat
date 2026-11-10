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
  ["#d99a4a", "#4a78c8"], // 2 실제 화면
  ["#3f9b6a", "#4f9fe8"], // 3 위성지도
  ["#e9b85a", "#3d7fd9"], // 4 벼 작황
  ["#5fb37c", "#e0b04a"], // 5 직불금·고향사랑
  ["#d99a4a", "#4f9fe8"], // 6 물류동향
  ["#2f9fb0", "#5f6ee8"], // 7 농사용 전기
  ["#f5a524", "#c0603a"], // 8 산업연관표
  ["#7cc98f", "#3f8fd0"], // 9 농업고용
  ["#5fb37c", "#3cc0b0"], // 10 금융보험
  ["#5fb3ff", "#3f9b6a"], // 11 농촌개발
  ["#8f9dff", "#7cc98f"], // 12 토양
  ["#ff8a6b", "#c58a3a"], // 13 축산 환경
  ["#c58a3a", "#3f9b8a"], // 14 자료
  ["#f5a524", "#8a6a3a"], // 15 만든이
  ["#f5a524", "#5fb37c"], // 16 닫기
];

// 경지면적 단계색 (낮음 → 높음): 짙은 호박 → 호박 → 금빛
export const LAND_RAMP = ["#3b2a12", "#8a5a17", "#d98e1f", "#f5a524", "#ffd98a"];
// 벼 예측 평년 대비 (낮음 ← 0 → 높음)
export const RICE_DIV = { lo: "#4ea1ff", mid: "#3a404c", hi: "#f5a524", na: "#2f343e" };
// 농가당 공익직불 예산 (적음 → 많음): 짙은 숲 → 들판 초록 → 연두
export const JIK_RAMP = ["#14301f", "#1f5a3a", "#3f9b6a", "#7cc98f", "#d4f2a8"];
// 농촌개발 사업 지구 수: 짙은 남색 → 하늘 → 연한 청록
export const DEV_RAMP = ["#1a2c52", "#24539a", "#2f7fd6", "#3fb0e6", "#7fe0f0"];
// 축산 마을: 마을당 분뇨 (적음 → 많음)
export const LV_RAMP = ["#6b4a2e", "#a8582a", "#e07a3a", "#ff9a5a", "#ffd9b0"];
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
