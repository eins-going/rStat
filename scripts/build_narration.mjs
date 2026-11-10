// 소개 영상 내레이션 녹음: 네이버 클라우드 CLOVA Voice(Premium)로 src/intro/narration.js의 문장을 mp3로 만든다.
//   node scripts/build_narration.mjs --samples      남성 성우 후보마다 같은 문장 하나 → voice_samples/<성우>.mp3 (들어 보고 고른다)
//   CLOVA_SPEAKER=<성우> node scripts/build_narration.mjs   전체 녹음 → assets/intro/voice/<id>.mp3 + index.json
// 환경변수(.env): NCP_CLOVA_VOICE_ID, NCP_CLOVA_VOICE_SECRET (네이버 클라우드 콘솔 > CLOVA Voice > Application의 Client ID·Secret)
// 선택: CLOVA_SPEED(-5 빠름 ~ 5 느림, 기본 0), CLOVA_PITCH(-5 높음 ~ 5 낮음, 기본 1), CLOVA_VOLUME(기본 0)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LINES } from "../src/intro/narration.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const env = Object.fromEntries(fs.readFileSync(path.join(ROOT, ".env"), "utf8").split("\n").map((l) => l.match(/^([A-Z0-9_]+)=(.*)$/)).filter(Boolean).map((m) => [m[1], m[2].replace(/^["']|["']$/g, "")]));
const ID = process.env.NCP_CLOVA_VOICE_ID || env.NCP_CLOVA_VOICE_ID, KEY = process.env.NCP_CLOVA_VOICE_SECRET || env.NCP_CLOVA_VOICE_SECRET;
if (!ID || !KEY) { console.error(".env에 NCP_CLOVA_VOICE_ID, NCP_CLOVA_VOICE_SECRET를 넣어 주세요"); process.exit(1); }
const URL = "https://naveropenapi.apigw.ntruss.com/tts-premium/v1/tts";
const opt = { speed: process.env.CLOVA_SPEED ?? "0", pitch: process.env.CLOVA_PITCH ?? "1", volume: process.env.CLOVA_VOLUME ?? "0" };

async function tts(speaker, text, file) {
  const body = new URLSearchParams({ speaker, text, format: "mp3", ...opt });
  const r = await fetch(URL, { method: "POST", headers: { "X-NCP-APIGW-API-KEY-ID": ID, "X-NCP-APIGW-API-KEY": KEY, "Content-Type": "application/x-www-form-urlencoded" }, body });
  if (!r.ok) throw new Error(`${speaker}: HTTP ${r.status} ${(await r.text()).slice(0, 200)}`);
  fs.writeFileSync(file, Buffer.from(await r.arrayBuffer()));
}

// mp3 길이(초): 첫 프레임 머리에서 비트레이트를 읽어 파일 크기로 나눈다 (CLOVA는 고정 비트레이트)
function mp3Dur(file) {
  const b = fs.readFileSync(file);
  let i = 0;
  if (b.slice(0, 3).toString() === "ID3") i = 10 + ((b[6] & 0x7f) << 21 | (b[7] & 0x7f) << 14 | (b[8] & 0x7f) << 7 | (b[9] & 0x7f));
  for (; i < b.length - 4; i++) if (b[i] === 0xff && (b[i + 1] & 0xe0) === 0xe0) break;
  const ver = (b[i + 1] >> 3) & 3, bi = b[i + 2] >> 4;
  const V1 = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320], V2 = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160];
  const kbps = (ver === 3 ? V1 : V2)[bi] || 48;
  return +(((b.length - i) * 8) / (kbps * 1000)).toFixed(2);
}

if (process.argv.includes("--samples")) {
  // 남성 성우 후보 (없는 이름은 건너뛴다)
  const CANDIDATES = (process.env.CLOVA_CANDIDATES || "nwontak,nyoungil,nseonghoon,njonghyun,ntaejin,nsangdo,nkitae,njihun,nkyuwon,njooahn,nsinu,njinho,nwoosik,ndonghyun,jinho").split(",");
  const dir = path.join(ROOT, "voice_samples");
  fs.mkdirSync(dir, { recursive: true });
  const text = LINES.find((l) => l.id === "05").read;
  for (const sp of CANDIDATES) {
    try { const f = path.join(dir, `${sp}.mp3`); await tts(sp, text, f); console.log("샘플", sp, mp3Dur(f) + "초"); }
    catch (e) { console.warn("건너뜀", e.message); }
  }
  console.log(`들어 보고 고른 뒤: CLOVA_SPEAKER=<이름> node scripts/build_narration.mjs  (샘플: ${dir})`);
  process.exit(0);
}

const speaker = process.env.CLOVA_SPEAKER;
if (!speaker) { console.error("CLOVA_SPEAKER=<성우 이름>을 정해 주세요 (먼저 --samples로 들어 보기)"); process.exit(1); }
const OUT = path.join(ROOT, "assets/intro/voice");
fs.mkdirSync(OUT, { recursive: true });
const files = {};
for (const [i, l] of LINES.entries()) {
  const f = path.join(OUT, `${l.id}.mp3`);
  await tts(speaker, l.read, f);
  const d = mp3Dur(f), room = (LINES[i + 1]?.at ?? 106) - l.at - 0.2;
  files[l.id] = { file: `${l.id}.mp3`, dur: d };
  console.log(l.id, `${d}초 / 여유 ${room.toFixed(1)}초`, d > room ? "← 넘침 (CLOVA_SPEED를 -1로 하거나 문장을 줄이기)" : "");
}
fs.writeFileSync(path.join(OUT, "index.json"), JSON.stringify({ speaker, ...opt, made: new Date().toISOString().slice(0, 10), files }, null, 1));
console.log("완료: assets/intro/voice/ · 이어서 node scripts/build_intro.mjs 후 배포");
