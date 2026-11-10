// 소개 영상 내레이션 녹음: src/intro/narration.js의 문장을 mp3로 만든다.
// Microsoft 신경망 음성(edge-tts, 키 없이 무료) — 한국어 남성 InJoon·Hyunsu.
//   node scripts/build_narration.mjs --samples   두 목소리 × 높낮이 세 가지로 같은 문장 → voice_samples/*.mp3
//   node scripts/build_narration.mjs             전체 녹음 → assets/intro/voice/<id>.mp3 + index.json
//   VOICE=ko-KR-HyunsuMultilingualNeural RATE=-4% PITCH=-6Hz node scripts/build_narration.mjs   (목소리·빠르기·높낮이)
// 준비: python3 -m venv .venv && .venv/bin/pip install edge-tts
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { LINES } from "../src/intro/narration.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EDGE = path.join(ROOT, ".venv/bin/edge-tts");
const VOICE = process.env.VOICE || "ko-KR-InJoonNeural";
const RATE = process.env.RATE || "+0%", PITCH = process.env.PITCH || "-6Hz";

function tts(text, file, voice = VOICE, rate = RATE, pitch = PITCH) {
  execFileSync(EDGE, ["--voice", voice, `--rate=${rate}`, `--pitch=${pitch}`, "--text", text, "--write-media", file], { stdio: ["ignore", "ignore", "pipe"] });
}

// mp3 길이(초): 첫 프레임 머리에서 비트레이트를 읽어 파일 크기로 나눈다 (고정 비트레이트)
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
  const dir = path.join(ROOT, "voice_samples");
  fs.mkdirSync(dir, { recursive: true });
  const text = LINES.find((l) => l.id === "05").read;
  for (const v of ["ko-KR-InJoonNeural", "ko-KR-HyunsuMultilingualNeural"]) for (const p of ["+0Hz", "-6Hz", "-12Hz"]) {
    const f = path.join(dir, `${v.split("-")[2].replace("Neural", "")}_${p.replace("+", "").replace("Hz", "")}.mp3`);
    tts(text, f, v, "-4%", p);
    console.log("샘플", path.basename(f), mp3Dur(f) + "초");
  }
  console.log(`샘플: ${dir}`);
  process.exit(0);
}

const OUT = path.join(ROOT, "assets/intro/voice");
fs.mkdirSync(OUT, { recursive: true });
const files = {};
for (const [i, l] of LINES.entries()) {
  const f = path.join(OUT, `${l.id}.mp3`);
  tts(l.read, f);
  const d = mp3Dur(f), room = (LINES[i + 1]?.at ?? 106) - l.at - 0.2 + 1.5; // 파일 앞뒤 무음(약 1.6초)은 재생할 때 잘라 낸다
  files[l.id] = { file: `${l.id}.mp3`, dur: d };
  console.log(l.id, `${d}초 / 여유 ${room.toFixed(1)}초`, d > room ? "← 넘침" : "");
}
fs.writeFileSync(path.join(OUT, "index.json"), JSON.stringify({ engine: "edge-tts", voice: VOICE, rate: RATE, pitch: PITCH, made: new Date().toISOString().slice(0, 10), files }, null, 1));
console.log("완료: assets/intro/voice/ · 이어서 node scripts/build_intro.mjs 후 배포");
