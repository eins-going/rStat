// 소개 영상에 넣을 실제 화면 캡처: 배포 사이트를 헤드리스 크롬으로 열어 찍고, 버튼·칸 위치도 함께 적는다.
//   node scripts/intro_shots.mjs [BASE]   (기본 https://ag-rstat.vercel.app, 크롬 경로는 CHROME 환경변수)
// 결과: assets/intro/shots/*.webp, assets/intro/shots/shots.json (화면별 크기·요소 위치)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT = path.join(ROOT, "assets/intro/shots");
const TMP = path.join(OUT, "_png");
fs.mkdirSync(TMP, { recursive: true });
const BASE = (process.argv[2] || "https://ag-rstat.vercel.app").replace(/\/$/, "");
const W = 1920, H = 1080;

// [이름, 주소, 기다림(ms), 위치를 적을 요소, 배율]
const SHOTS = [
  ["home", "/", 2500, ["#sido", "#sgg", "#map-card", "#chips", "#p-farm", "#p-land", "#p-crop", ".ticker", ".col-right"], 1.5],
  ["home_jn", "/#%EC%A0%84%EB%9D%BC%EB%82%A8%EB%8F%84", 2500, ["#sido", "#sgg", "#map-card"], 1.5],
  ["home_hn", "/#%EC%A0%84%EB%9D%BC%EB%82%A8%EB%8F%84/%ED%95%B4%EB%82%A8%EA%B5%B0", 2500, ["#sgg", "#view-btn", "#map-card"], 1.5],
  ["home_sat", "/#%EC%A0%84%EB%9D%BC%EB%82%A8%EB%8F%84/%ED%95%B4%EB%82%A8%EA%B5%B0/%EC%9E%90%EC%84%B8%ED%9E%88", 16000, ["#map-card", "#sat-bar", "#sat-info"], 1.5],
  ["rice", "/rice", 3000, [], 1],
  ["rice_sat", "/rice#%EC%A0%84%EB%9D%BC%EB%82%A8%EB%8F%84/%ED%95%B4%EB%82%A8%EA%B5%B0", 14000, ["#map-wrap"], 1, "#view-btn"],
  ["rio", "/rio", 3000, [], 1],
  ["flow", "/flow", 3500, [], 1],
  ["power", "/power", 3000, [], 1],
  ["employ", "/employ", 3000, [], 1],
  ["agfin", "/agfin", 3000, [], 1],
  ["jikbul", "/jikbul", 3000, [], 1],
  ["ruraldev", "/ruraldev", 3500, [], 1],
  ["soil", "/soil", 3000, [], 1],
  ["livestock", "/livestock", 3000, [], 1],
  ["status", "/status", 2000, [], 1],
];
const only = process.env.ONLY ? new Set(process.env.ONLY.split(",")) : null;

const browser = await chromium.launch({
  executablePath: process.env.CHROME || "/usr/bin/google-chrome",
  args: ["--enable-unsafe-swiftshader", "--use-angle=swiftshader", "--ignore-gpu-blocklist"],
});
const metaPath = path.join(OUT, "shots.json");
const meta = fs.existsSync(metaPath) ? JSON.parse(fs.readFileSync(metaPath, "utf8")) : {};
for (const [name, url, wait, sels, scale, click] of SHOTS) {
  if (only && !only.has(name)) continue;
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: scale });
  await page.goto(BASE + url, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  if (click) { await page.waitForTimeout(2500); await page.locator(click).first().click().catch((e) => console.warn(name, "누르기 실패", e.message)); }
  await page.waitForTimeout(wait);
  // 소개 영상 버튼 등 캡처에 필요 없는 깜빡임을 멈춘다
  await page.addStyleTag({ content: "*{caret-color:transparent!important}" });
  const boxes = {};
  for (const s of sels) {
    const b = await page.locator(s).first().boundingBox().catch(() => null);
    if (b) boxes[s] = [b.x, b.y, b.width, b.height].map((v) => Math.round(v));
  }
  const png = path.join(TMP, `${name}.png`);
  await page.screenshot({ path: png });
  await page.close();
  // webp로 줄인다: 본 화면 + 벽에 쓸 작은 그림
  execFileSync("python3", ["-c", `
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("RGB")
im.save(sys.argv[2], "WEBP", quality=84, method=6)
im.resize((640, 360), Image.LANCZOS).save(sys.argv[3], "WEBP", quality=80, method=6)
`, png, path.join(OUT, `${name}.webp`), path.join(OUT, `${name}_s.webp`)]);
  meta[name] = { w: W, h: H, boxes };
  console.log(name, Object.keys(boxes).length, "요소", (fs.statSync(path.join(OUT, `${name}.webp`)).size / 1024).toFixed(0) + "KB");
}
await browser.close();
fs.rmSync(TMP, { recursive: true, force: true });
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 1));
