// 공유 카드 그림(카카오톡·네이버·페이스북 미리보기): 화면마다 1200×630 jpg → assets/og/<화면>.jpg
// 카톡 말풍선(폭 약 250px)에서도 읽히게 왼쪽에 큰 화면 이름·짧은 설명, 오른쪽에 배포된 화면의 가운데(지도) 부분을 놓는다.
//   memcap -m 4G node scripts/build_og_images.mjs            모든 화면
//   memcap -m 4G node scripts/build_og_images.mjs rice,soil  고른 화면만
// 그 뒤 node scripts/build_seo.mjs (그림 주소에 ?v=날짜를 붙여 카카오톡 미리보기 캐시를 새로 받게 한다)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";
import { NAME, PAGES } from "./seo_pages.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = process.env.SITE || "https://ag-rstat.vercel.app";
const OUT = path.join(ROOT, "assets/og");
fs.mkdirSync(OUT, { recursive: true });
const ALL = PAGES.map((p) => p[0]);
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const FONT = "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css";
const pick = process.argv[2] ? process.argv[2].split(",") : ALL;
const INTRO_AT = 12.5; // 소개 영상은 제목 장면(이름표가 모여 지도)에서 찍는다

const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
try {
  for (const id of pick) {
    // 넓게(1600×840) 찍어 1200×630으로 줄인다: 화면이 더 많이 담긴다
    const ctx = await browser.newContext({ viewport: { width: 1600, height: 840 } });
    const page = await ctx.newPage();
    await page.goto(`${SITE}/${id === "index" ? "" : id}`, { waitUntil: "load", timeout: 60000 });
    let shot;
    if (id === "intro") {
      await page.waitForFunction(() => window.__intro && document.querySelector("#player.ready"), null, { timeout: 30000 });
      await page.evaluate((t) => { window.__intro.tl.pause(); window.__intro.tl.seek(t, false); document.querySelector("#player").classList.remove("is-paused"); }, INTRO_AT);
      await page.waitForTimeout(1500);
      shot = await page.locator("#stage").screenshot();
    } else {
      await page.waitForTimeout(7000);
      shot = await page.screenshot();
    }
    const [, , tab, kind, short] = PAGES.find((p) => p[0] === id);
    const img = `data:image/png;base64,${shot.toString("base64")}`;
    const fit = await ctx.newPage();
    await fit.setViewportSize({ width: 1200, height: 630 });
    const title = kind === "home" ? NAME : tab;
    const fs1 = title.length > 9 ? 58 : title.length > 6 ? 68 : 80;
    await fit.setContent(id === "intro"
      ? `<style>html,body{margin:0;background:#14161b}img{display:block;width:1200px;height:630px;object-fit:cover}</style><img src="${img}">`
      : `<link rel="stylesheet" href="${FONT}"><style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#14161b;font-family:"Pretendard Variable",Pretendard,sans-serif;color:#eef0f3}
.shot{position:absolute;right:0;top:0;width:600px;height:630px;object-fit:cover;object-position:50% 40%}
.fade{position:absolute;left:600px;top:0;width:140px;height:630px;background:linear-gradient(90deg,#14161b,rgba(20,22,27,0))}
.txt{position:absolute;left:64px;top:0;width:500px;height:630px;display:flex;flex-direction:column;justify-content:center;gap:26px}
.brand{display:flex;align-items:center;gap:14px;font-size:30px;font-weight:700}
.mark{width:40px;height:40px;border-radius:12px;background:conic-gradient(from 210deg,#f5a524,#ffcf7a,#5fb37c,#f5a524)}
h1{margin:0;font-size:${fs1}px;line-height:1.12;font-weight:800;letter-spacing:-.02em;word-break:keep-all}
p{margin:0;font-size:31px;line-height:1.42;color:#b9bfc9;word-break:keep-all}
.url{position:absolute;left:64px;bottom:44px;font-size:24px;font-weight:600;color:#f5a524}
</style><img class="shot" src="${img}"><div class="fade"></div>
<div class="txt">${kind === "home" ? "" : `<div class="brand"><span class="mark"></span>${NAME}</div>`}<h1>${esc(title)}</h1><p>${esc(short)}</p></div>
<div class="url">ag-rstat.vercel.app</div>`);
    await fit.evaluate(() => document.fonts.ready);
    await fit.waitForTimeout(200);
    await fit.screenshot({ path: path.join(OUT, `${id}.jpg`), type: "jpeg", quality: 82 });
    console.log(id, Math.round(fs.statSync(path.join(OUT, `${id}.jpg`)).size / 1024) + "KB");
    await ctx.close();
  }
} finally {
  await browser.close();
}
