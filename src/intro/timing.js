// 시간표: 음악 한 마디(96 BPM, 4/4)가 2.5초다. 장면은 모두 마디(또는 반 마디) 선에서 바뀐다 — 그림과 음악이 같이 넘어간다.
// 장면 길이는 내레이션 길이에 맞춰 마디 수로 정했다 (scripts/build_narration.mjs가 넘치는 문장을 알려 준다).
export const BPM = 96;
export const BAR = (60 / BPM) * 4; // 2.5초

// [장면, 마디 수]
const PLAN = [
  ["hook", 2.5], //   흩어진 통계 (문제)
  ["title", 3], //    지역농업 현황판 = 17개 기관 · 45종 · 시군 단위 한 화면
  ["stats", 2], //    168개 시군 × 31개 지표 (3D 지도)
  ["real", 3], //     실제 화면: 고르면 그 시군의 현황판
  ["only", 1.5], //   여기에만: 다른 곳에서 구하기 어려운 자료 여섯 가지
  ["parcel", 3], //   ① 1,118만 필지
  ["ndvi", 2], //        논 NDVI 확대
  ["rice", 2], //     ② 쌀 수확량 예측
  ["acc", 4], //         13년 검증
  ["jik", 2], //      ③ 시군 예산: 직불금
  ["dev", 2.5], //       농촌개발
  ["flow", 4.5], //   ④ 산지 → 도시 물류
  ["vill", 1.5], //   ⑤ 마을 단위 (축산 환경)
  ["coop", 2], //        조합 단위 (농업금융보험)
  ["power", 1.5], //  ⑥ 긴 시계열: 농사용 전기
  ["rio", 1.5], //       지역산업연관표
  ["employ", 1.5], //    농업고용
  ["soil", 2], //        농경지 토양
  ["wall", 3], //     스스로 갱신 · 수집 현황 공개
  ["maker", 4], //    만든 이
  ["end", 3], //      닫기
];
export const T = {};
export const LEN = {};
let t = 0;
for (const [k, bars] of PLAN) { T[k] = +t.toFixed(3); LEN[k] = bars * BAR; t += bars * BAR; }
export const TOTAL = +t.toFixed(3);
export const SCENES = PLAN.map(([k]) => k);
