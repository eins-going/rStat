// 검색 등록용: 각 화면 <head>에 제목·대표 주소·공유 카드·구조화 자료를 넣고 sitemap.xml을 만든다.
//   node scripts/build_seo.mjs        (화면을 더하거나 제목·설명을 고친 뒤 다시 돌린다. 여러 번 돌려도 같다)
// 검색 설명은 각 html의 <meta name="description">, 공유 카드(카카오톡 등) 설명·그림은 seo_pages.mjs와 assets/og/<화면>.jpg. 넣는 부분은 <!-- seo --> ~ <!-- /seo --> 사이.
// 소유 확인: 구글 서치 콘솔·네이버 서치어드바이저의 'HTML 태그' content 값을 아래 두 칸에 넣으면 첫 화면에만 붙는다.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { SITE, NAME, PAGES } from "./seo_pages.mjs"; // 화면 목록·공유 설명

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const GSC_TOKEN = "nwtn1RR5CQWR7QeuOwjmz9meMI9YgIEZ56VHE1cKa4E"; // <meta name="google-site-verification" content="여기">
const NAVER_TOKEN = "edd209c568890d56f9a6888bb250dc739a233859"; // <meta name="naver-site-verification" content="여기">


const esc = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const PERSON = { "@type": "Person", "@id": `${SITE}/about#person`, name: "조승현", description: "농업·자원경제학 박사", email: "agrirstat@gmail.com", url: `${SITE}/about` };
const WEBSITE = { "@type": "WebSite", "@id": `${SITE}/#website`, name: NAME, alternateName: ["지역농업 현황판", "지역농업현황판", "rStat"], url: `${SITE}/`, inLanguage: "ko-KR" };

function ld(kind, url, title, desc) {
  if (kind === "home") return { "@context": "https://schema.org", "@graph": [{ ...WEBSITE, description: desc, publisher: { "@id": PERSON["@id"] } }, PERSON] };
  if (kind === "about") return { "@context": "https://schema.org", "@graph": [{ "@type": "ProfilePage", url, name: title, inLanguage: "ko-KR", isPartOf: { "@id": WEBSITE["@id"] }, mainEntity: { "@id": PERSON["@id"] } }, PERSON] };
  if (kind === "data") return {
    "@context": "https://schema.org", "@type": "Dataset", name: title, description: desc, url, inLanguage: "ko-KR",
    isAccessibleForFree: true, license: "https://creativecommons.org/licenses/by/4.0/", creator: PERSON, spatialCoverage: { "@type": "Place", name: "대한민국" },
    includedInDataCatalog: { "@type": "DataCatalog", name: NAME, url: `${SITE}/` }, // 구글은 Dataset의 isPartOf에 Dataset·URL만 받는다 (WebSite를 넣으면 경고)
  };
  return { "@context": "https://schema.org", "@type": "WebPage", url, name: title, description: desc, inLanguage: "ko-KR", isPartOf: { "@id": WEBSITE["@id"] } };
}

// 그 화면만 쓰는 로컬 html·js·css 가운데 가장 늦게 커밋된 날 (사이트맵 lastmod). 여러 화면이 함께 쓰는 파일(style.css 등)은 뺀다.
const depsOf = (html) => [...html.matchAll(/(?:src|href)="((?:assets|src)\/[^"?#]+)/g)].map((m) => m[1]);
const USE = {};
for (const [id] of PAGES) for (const f of new Set(depsOf(fs.readFileSync(path.join(ROOT, `${id}.html`), "utf8")))) USE[f] = (USE[f] || 0) + 1;
function lastmod(file, html) {
  const deps = [file, ...depsOf(html).filter((f) => USE[f] < 4)].filter((f) => fs.existsSync(path.join(ROOT, f)));
  const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...deps], { cwd: ROOT }).toString().trim();
  return (out || new Date().toISOString()).slice(0, 10);
}

const urls = [];
for (const [id, p, tab, kind, short] of PAGES) {
  const file = `${id}.html`, fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, "utf8");
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  if (!desc) throw new Error(`${file}: description 없음`);
  const url = SITE + p, title = kind === "home" ? `${NAME} | ${tab}` : `${tab} | ${NAME}`;
  const shareTitle = kind === "home" ? NAME : `${tab} — ${NAME}`;
  const og = `assets/og/${id}.jpg`; // 그림이 바뀌면 ?v=가 바뀌어 카카오톡이 새로 받는다
  if (!fs.existsSync(path.join(ROOT, og))) throw new Error(`${og} 없음: node scripts/build_og_images.mjs ${id}`);
  const ogv = fs.statSync(path.join(ROOT, og)).mtime.toISOString().slice(0, 16).replace(/\D/g, "");
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  const block = [
    "<!-- seo: scripts/build_seo.mjs가 만든다 -->",
    `<link rel="canonical" href="${url}">`,
    `<link rel="icon" href="/favicon.ico" sizes="48x48">`,
    `<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">`,
    `<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">`,
    `<meta name="theme-color" content="#14161b">`,
    ...(kind === "home" && GSC_TOKEN ? [`<meta name="google-site-verification" content="${esc(GSC_TOKEN)}">`] : []),
    ...(kind === "home" && NAVER_TOKEN ? [`<meta name="naver-site-verification" content="${esc(NAVER_TOKEN)}">`] : []),
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="${NAME}">`,
    `<meta property="og:locale" content="ko_KR">`,
    `<meta property="og:title" content="${esc(shareTitle)}">`,
    `<meta property="og:description" content="${esc(short)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${SITE}/${og}?v=${ogv}">`,
    `<meta property="og:image:type" content="image/jpeg">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(shareTitle)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<script type="application/ld+json">${JSON.stringify(ld(kind, url, shareTitle, desc)).replace(/</g, "\\u003c")}</script>`,
    "<!-- /seo -->",
  ].map((l) => "  " + l).join("\n");
  if (/<!-- seo[\s\S]*?<!-- \/seo -->/.test(html)) html = html.replace(/ *<!-- seo[\s\S]*?<!-- \/seo -->/, block);
  else html = html.replace(/(<meta name="description"[^>]*>)/, `$1\n${block}`);
  fs.writeFileSync(fp, html);
  urls.push({ url, mod: lastmod(file, html) });
}

fs.writeFileSync(path.join(ROOT, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map((u) => `  <url><loc>${u.url}</loc><lastmod>${u.mod}</lastmod></url>`).join("\n") + "\n</urlset>\n");
console.log(`완료: ${urls.length}개 화면 · sitemap.xml${GSC_TOKEN ? " · 구글 확인" : ""}${NAVER_TOKEN ? " · 네이버 확인" : ""}`);
