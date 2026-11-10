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
// 논 NDVI 확대: 벼 작황 위성 영상(Sentinel-2 NDVI, 논만)을 한여름 맑은 날로 골라 시군 전체 → 두 단계 확대해 찍는다
if (!only || only.has("ndvi")) {
  const NDVI_AT = process.env.NDVI_AT || "/rice?v=sat#%EC%A0%84%EB%B6%81/%EA%B9%80%EC%A0%9C%EC%8B%9C"; // 전북/김제시 (만경평야)
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 2 });
  await page.goto(BASE + NDVI_AT, { waitUntil: "networkidle", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(9000);
  // 7~9월 맑은 날 중 가장 맑은 날을 누른다
  const pick = await page.evaluate(() => {
    const rs = [...document.querySelectorAll("#sat-strip rect")].map((r) => {
      const t = r.querySelector("title")?.textContent || "", m = t.match(/^(\d{4}-(\d{2})-\d{2}).*구름 (\d+)%/);
      const b = r.getBoundingClientRect();
      return m ? { d: m[1], mo: +m[2], cloud: +m[3], x: b.x + b.width / 2, y: b.y + b.height / 2 } : null;
    }).filter((e) => e && e.mo >= 7 && e.mo <= 9);
    rs.sort((a, b) => a.cloud - b.cloud || b.d.localeCompare(a.d));
    return rs[0] || null;
  });
  console.log("NDVI 날짜", pick);
  if (pick) { await page.mouse.click(pick.x, pick.y); await page.waitForTimeout(9000); }
  await page.locator('#sat-bar input[data-ui="labels"]').uncheck().catch(() => {}); // 지명·도로를 끈다
  await page.addStyleTag({ content: "#sat-hint,.leaflet-control-zoom,.leaflet-control-attribution{display:none!important}" });
  await page.waitForTimeout(1500);
  const mapBox = await page.locator("#sat-map").boundingBox();
  const shot = async (name) => {
    const png = path.join(TMP, `${name}.png`);
    await page.locator("#sat-map").screenshot({ path: png });
    execFileSync("python3", ["-c", `
import sys
from PIL import Image
im = Image.open(sys.argv[1]).convert("RGB")
im.save(sys.argv[2], "WEBP", quality=86, method=6)
`, png, path.join(OUT, `${name}.webp`)]);
    console.log(name, (fs.statSync(path.join(OUT, `${name}.webp`)).size / 1024).toFixed(0) + "KB");
  };
  await shot("ndvi_wide");
  const fx = +(process.env.NDVI_FX || 0.5), fy = +(process.env.NDVI_FY || 0.5); // 확대할 곳 (지도 안 비율)
  const cx = mapBox.x + mapBox.width * fx, cy = mapBox.y + mapBox.height * fy;
  const nz = +(process.env.NDVI_Z || 2);
  for (let i = 0; i < nz; i++) { await page.mouse.dblclick(cx, cy); await page.waitForTimeout(2500); }
  await page.mouse.move(mapBox.x + 5, mapBox.y + 5);
  await page.waitForTimeout(+(process.env.NDVI_WAIT || 22000));
  await shot("ndvi_zoom");
  // 한 단계 더 (논 필지만 남는 13단계 이상) — 타일이 늦게 오므로 오래 기다린다
  await page.mouse.dblclick(cx, cy);
  await page.mouse.move(mapBox.x + 5, mapBox.y + 5);
  await page.waitForTimeout(+(process.env.NDVI_WAIT2 || 45000));
  await shot("ndvi_zoom2");
  meta.ndvi = { date: pick?.d || null, cloud: pick?.cloud ?? null, w: Math.round(mapBox.width), h: Math.round(mapBox.height), fx, fy, zoom: nz, where: "김제시" };
  await page.close();
}
await browser.close();
fs.rmSync(TMP, { recursive: true, force: true });
fs.writeFileSync(metaPath, JSON.stringify(meta, null, 1));
