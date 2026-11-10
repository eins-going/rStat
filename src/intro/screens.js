// 실제 화면: 브라우저 창 안에 사이트 캡처를 넣고, 확대·커서·표시를 GSAP 타임라인으로 움직인다.
// 캡처는 scripts/intro_shots.mjs가 배포 사이트에서 찍는다 (1920×1080 좌표, shots.json에 요소 위치).

const SHOT_W = 1920, SHOT_H = 1080;
export const VIEW_W = 1040, VIEW_H = 585; // 창 안 화면 크기(무대 px)
const K = VIEW_W / SHOT_W;
const BASE = "assets/intro/shots/";

export function createScreen(stage, I, names) {
  stage.insertAdjacentHTML("beforeend", `
    <div class="scr-wrap" id="scr-wrap">
      <div class="scr" id="scr">
        <div class="scr-bar"><i></i><i></i><i></i><span class="scr-url" id="scr-url">ag-rstat.vercel.app</span></div>
        <div class="scr-view">
          <div class="scr-zoom" id="scr-zoom">
            ${names.map((n) => `<img class="scr-img" data-n="${n}" src="${BASE}${n}.webp" alt="" decoding="async" width="${VIEW_W}" height="${VIEW_H}">`).join("")}
            <div class="scr-marks" id="scr-marks"></div>
            <div class="cursor" id="cursor"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3l14 8-6.2 1.6L10 19z"/></svg><span class="ripple"></span></div>
          </div>
        </div>
      </div>
    </div>`);
  const wrap = stage.querySelector("#scr-wrap"), zoom = stage.querySelector("#scr-zoom"), marks = stage.querySelector("#scr-marks");
  const cursor = stage.querySelector("#cursor"), url = stage.querySelector("#scr-url");
  const imgs = Object.fromEntries([...stage.querySelectorAll(".scr-img")].map((e) => [e.dataset.n, e]));
  const box = (shot, sel) => I.shots[shot]?.boxes?.[sel] || I.shots.home?.boxes?.[sel] || null;

  // 확대: 캡처 좌표의 사각형이 창 가운데 오도록 (빈 가장자리가 생기지 않게 자른다)
  function focus(rect, pad = 0.92) {
    if (!rect) return { scale: 1, x: 0, y: 0 };
    const [x, y, w, h] = rect;
    const z = Math.max(1, Math.min(VIEW_W / (w * K), VIEW_H / (h * K)) * pad);
    let tx = VIEW_W / 2 - (x + w / 2) * K * z, ty = VIEW_H / 2 - (y + h / 2) * K * z;
    tx = Math.min(0, Math.max(VIEW_W - VIEW_W * z, tx));
    ty = Math.min(0, Math.max(VIEW_H - VIEW_H * z, ty));
    return { scale: z, x: tx, y: ty };
  }
  const at = (rect) => (rect ? { x: (rect[0] + rect[2] / 2) * K, y: (rect[1] + rect[3] / 2) * K } : { x: VIEW_W / 2, y: VIEW_H / 2 });

  // 표시(사각형 + 이름표)
  function mark(id, rect, label, side = "top") {
    if (!rect) return null;
    const [x, y, w, h] = rect;
    marks.insertAdjacentHTML("beforeend", `<div class="mk mk-${side}" id="mk-${id}" style="left:${x * K}px;top:${y * K}px;width:${w * K}px;height:${h * K}px"><span>${label}</span></div>`);
    return marks.querySelector(`#mk-${id}`);
  }

  return { wrap, zoom, cursor, url, imgs, box, focus, at, mark, K };
}

// 화면 벽: 모든 화면 작은 캡처
export function createWall(stage, items) {
  stage.insertAdjacentHTML("beforeend", `
    <div class="wall-wrap" id="wall-wrap"><div class="wall" id="wall">
      ${items.map(([n, t]) => `<figure class="wt"><img src="${BASE}${n}_s.webp" alt="" decoding="async" width="320" height="180"><figcaption>${t}</figcaption></figure>`).join("")}
    </div></div>`);
  return stage.querySelector("#wall-wrap");
}
