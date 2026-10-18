// 팜맵 조회(농림수산식품교육문화정보원)와 VWorld 검색을 중계한다.
// - 키는 Vercel 환경변수(DATA_PORTAL_API_KEY, VWORLD_API_KEY)에만 두고 브라우저로 내보내지 않는다 (VWorld 타일 키만 예외: 도메인 제한 키).
// - 팜맵 좌표(EPSG:5179)는 여기서 경위도로 바꾸고, 필요한 속성만 남겨 응답을 작게 만든다.
// - 팜맵은 1년에 한 번 갱신되므로 응답을 CDN에 오래 캐시한다.
//
// GET /api/farmmap?op=point&lat=&lon=      클릭한 지점의 팜맵 필지
// GET /api/farmmap?op=pnu&pnu=             지번(PNU)에 걸친 팜맵 필지들
// GET /api/farmmap?op=near&lat=&lon=&r=    반경(500·1000m) 안 필지 수를 판독 분류별로
// GET /api/farmmap?op=search&q=            주소·지번·장소 검색 (VWorld)
// GET /api/farmmap?op=config               VWorld 타일 키

const FARMMAP = "https://apis.data.go.kr/B552895/getFarmmapService";
const VWORLD_SEARCH = "https://api.vworld.kr/req/search";

const CACHE_LONG = "public, max-age=3600, s-maxage=2592000, stale-while-revalidate=86400";
const CACHE_DAY = "public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400";

// ---------- EPSG:5179 (GRS80, TM 중부 통합원점) ↔ 경위도 ----------
const RAD = Math.PI / 180;
const A = 6378137;
const FL = 1 / 298.257222101;
const E2 = FL * (2 - FL);
const EP2 = E2 / (1 - E2);
const K0 = 0.9996;
const LON0 = 127.5 * RAD;
const LAT0 = 38 * RAD;
const X0 = 1000000;
const Y0 = 2000000;
const E4 = E2 * E2;
const E6 = E4 * E2;
const meridian = (p) => A * ((1 - E2 / 4 - (3 * E4) / 64 - (5 * E6) / 256) * p
  - ((3 * E2) / 8 + (3 * E4) / 32 + (45 * E6) / 1024) * Math.sin(2 * p)
  + ((15 * E4) / 256 + (45 * E6) / 1024) * Math.sin(4 * p)
  - ((35 * E6) / 3072) * Math.sin(6 * p));
const M0 = meridian(LAT0);

export function toTM(lon, lat) {
  const p = lat * RAD;
  const s = Math.sin(p), c = Math.cos(p), t = Math.tan(p);
  const n = A / Math.sqrt(1 - E2 * s * s);
  const T = t * t, C = EP2 * c * c, a = (lon * RAD - LON0) * c;
  const x = X0 + K0 * n * (a + ((1 - T + C) * a ** 3) / 6 + ((5 - 18 * T + T * T + 72 * C - 58 * EP2) * a ** 5) / 120);
  const y = Y0 + K0 * (meridian(p) - M0 + n * t * (a * a / 2 + ((5 - T + 9 * C + 4 * C * C) * a ** 4) / 24
    + ((61 - 58 * T + T * T + 600 * C - 330 * EP2) * a ** 6) / 720));
  return [x, y];
}

const E1 = (1 - Math.sqrt(1 - E2)) / (1 + Math.sqrt(1 - E2));
export function fromTM(x, y) {
  const mu = (M0 + (y - Y0) / K0) / (A * (1 - E2 / 4 - (3 * E4) / 64 - (5 * E6) / 256));
  const p1 = mu + ((3 * E1) / 2 - (27 * E1 ** 3) / 32) * Math.sin(2 * mu)
    + ((21 * E1 * E1) / 16 - (55 * E1 ** 4) / 32) * Math.sin(4 * mu)
    + ((151 * E1 ** 3) / 96) * Math.sin(6 * mu)
    + ((1097 * E1 ** 4) / 512) * Math.sin(8 * mu);
  const s = Math.sin(p1), c = Math.cos(p1), t = Math.tan(p1);
  const w = 1 - E2 * s * s;
  const n = A / Math.sqrt(w), r = (A * (1 - E2)) / w ** 1.5;
  const T = t * t, C = EP2 * c * c, d = (x - X0) / (n * K0);
  const lat = p1 - ((n * t) / r) * (d * d / 2 - ((5 + 3 * T + 10 * C - 4 * C * C - 9 * EP2) * d ** 4) / 24
    + ((61 + 90 * T + 298 * C + 45 * T * T - 252 * EP2 - 3 * C * C) * d ** 6) / 720);
  const lon = LON0 + (d - ((1 + 2 * T + C) * d ** 3) / 6 + ((5 - 2 * C + 28 * T - 3 * C * C + 8 * EP2 + 24 * T * T) * d ** 5) / 120) / c;
  return [lon / RAD, lat / RAD];
}

// ---------- 응답 ----------
const json = (body, status = 200, cache = "no-store") => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": cache },
});

class Fail extends Error {
  constructor(message, status = 502) { super(message); this.status = status; }
}

function need(name) {
  const v = process.env[name];
  if (!v) throw new Fail(`서버에 ${name}가 설정되지 않았습니다.`, 500);
  return v;
}

async function getJSON(url, label, onXML) {
  let res;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(9000), headers: { "user-agent": "Mozilla/5.0" } });
  } catch {
    throw new Fail(`${label} 응답이 없습니다.`, 504);
  }
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    const known = onXML?.(text);
    if (known) return known;
    // 공공데이터포털 게이트웨이 오류는 XML로 온다 (인증키 미등록, 호출 한도 초과 등)
    const code = text.match(/<returnAuthMsg>([^<]+)/)?.[1] || text.match(/<errMsg>([^<]+)/)?.[1] || `HTTP ${res.status}`;
    throw new Fail(`${label} 오류: ${code}`);
  }
}

// ---------- 팜맵 ----------
async function farmmap(fn, params) {
  const q = new URLSearchParams({ serviceKey: need("DATA_PORTAL_API_KEY"), type: "json", ...params });
  // 결과가 없으면 type=json이어도 XML(NODATA_ERROR, 코드 3)로 온다
  const empty = (text) => (/NODATA_ERROR/.test(text) ? { response: { header: { resultCode: "0" }, body: {} } } : null);
  const body = await getJSON(`${FARMMAP}/${fn}?${q}`, "팜맵", empty);
  const r = body.response;
  if (!r || !["0", "00"].includes(String(r.header?.resultCode))) throw new Fail(`팜맵 오류: ${r?.header?.resultMsg || "알 수 없는 응답"}`);
  const it = r.body?.items?.item;
  return { items: !it ? [] : Array.isArray(it) ? it : [it], total: Number(r.body?.totalCount) || 0 };
}

const round6 = (v) => Math.round(v * 1e6) / 1e6;

// 다각형 넓이 (TM 평면 좌표, ㎡): 바깥 고리에서 구멍을 뺀다
function ringArea(ring) {
  let s = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) s += (ring[j][0] + ring[i][0]) * (ring[j][1] - ring[i][1]);
  return Math.abs(s / 2);
}

function feature(it) {
  const g = it.fmapBdcrd;
  let coords = g?.type === "Polygon" ? [g.coordinates] : g?.type === "MultiPolygon" ? g.coordinates : [];
  let area = 0;
  for (const poly of coords) poly.forEach((ring, i) => { area += (i ? -1 : 1) * ringArea(ring); });
  coords = coords.map((poly) => poly.map((ring) => ring.map(([x, y]) => fromTM(x, y).map(round6))));
  return {
    type: "Feature",
    geometry: { type: "MultiPolygon", coordinates: coords },
    properties: {
      id: it.fmapInnb,
      kind: it.intprNm || "",
      emd: it.lglEmdNm || "",
      lnm: (it.lnm || "").trim(),
      pnu: it.pnuLnmCd || "",
      image: it.invdCfnm || "",
      date: it.vdptYr || "",
      change: it.chgCfnm || "",
      history: it.rnhstNm || "",
      area: Math.round(area / (K0 * K0)),
    },
  };
}

function latLon(sp) {
  const lat = Number(sp.get("lat")), lon = Number(sp.get("lon"));
  if (!(lat > 32.5 && lat < 39 && lon > 124 && lon < 132)) throw new Fail("국내 좌표가 아닙니다.", 400);
  return [lon, lat];
}

async function point(sp) {
  const [x, y] = toTM(...latLon(sp));
  const { items } = await farmmap("getCoordinateBasedFarmmapInfo", { positionX: x.toFixed(2), positionY: y.toFixed(2) });
  return { features: items.filter((it) => it.fmapBdcrd).map(feature) };
}

async function pnu(sp) {
  const code = sp.get("pnu") || "";
  if (!/^\d{19}$/.test(code)) throw new Fail("PNU는 19자리 숫자입니다.", 400);
  const { items } = await farmmap("getPnuBasedFarmmapInfo", { pnuCode: code });
  return { features: items.filter((it) => it.fmapBdcrd).map(feature) };
}

const KINDS = ["논", "밭", "과수", "시설"];
const PAGE = 1000;

async function near(sp) {
  const [x, y] = toTM(...latLon(sp));
  const radius = sp.get("r") === "1000" ? 1000 : 500;
  const base = { positionX: x.toFixed(2), positionY: y.toFixed(2), radius, numOfRows: PAGE };
  const first = await farmmap("getAreaBasedFarmmapInfo", { ...base, pageNo: 1 });
  const pages = Math.min(5, Math.ceil(first.total / PAGE));
  const rest = await Promise.all(Array.from({ length: Math.max(0, pages - 1) }, (_, i) => farmmap("getAreaBasedFarmmapInfo", { ...base, pageNo: i + 2 })));
  const items = [first, ...rest].flatMap((p) => p.items);
  const kinds = Object.fromEntries(KINDS.map((k) => [k, 0]));
  const emd = {};
  let changed = 0;
  for (const it of items) {
    const k = it.intprNm || "기타";
    kinds[k] = (kinds[k] || 0) + 1;
    if (it.lglEmdNm) emd[it.lglEmdNm] = (emd[it.lglEmdNm] || 0) + 1;
    if (it.chgCfnm && it.chgCfnm !== "유지") changed++;
  }
  return {
    radius,
    total: Math.max(first.total, items.length),
    counted: items.length,
    kinds,
    changed,
    emd: Object.entries(emd).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([name, n]) => ({ name, n })),
  };
}

// ---------- VWorld 검색 ----------
async function search(sp) {
  const q = (sp.get("q") || "").trim();
  if (q.length < 2 || q.length > 60) throw new Fail("검색어는 2~60자입니다.", 400);
  const key = need("VWORLD_API_KEY");
  const ask = async (type, category) => {
    const p = new URLSearchParams({ service: "search", request: "search", key, query: q, type, format: "json", size: "5", crs: "EPSG:4326" });
    if (category) p.set("category", category);
    try {
      const body = await getJSON(`${VWORLD_SEARCH}?${p}`, "VWorld 검색");
      return body.response?.status === "OK" ? body.response.result?.items || [] : [];
    } catch {
      return [];
    }
  };
  const [parcel, road, place] = await Promise.all([ask("address", "parcel"), ask("address", "road"), ask("place")]);
  const pt = (it) => [round6(Number(it.point?.x)), round6(Number(it.point?.y))];
  const out = [
    ...parcel.map((it) => ({ kind: "지번", title: it.address?.parcel, sub: it.address?.road, pnu: it.id, ll: pt(it) })),
    ...road.map((it) => ({ kind: "도로명", title: it.address?.road, sub: it.address?.parcel, pnu: it.id, ll: pt(it) })),
    ...place.map((it) => ({ kind: "장소", title: it.title, sub: it.address?.road || it.address?.parcel, pnu: "", ll: pt(it) })),
  ];
  // 번지가 들어간 검색어는 주소를, 아니면 장소를 먼저 보여준다
  if (!/\d/.test(q)) out.sort((a, b) => (b.kind === "장소") - (a.kind === "장소"));
  const seen = new Set();
  const results = out.filter((r) => {
    if (!r.title || !Number.isFinite(r.ll[0])) return false;
    const k = r.pnu || r.title;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  }).slice(0, 8);
  return { results };
}

const OPS = {
  point: [point, CACHE_LONG],
  pnu: [pnu, CACHE_LONG],
  near: [near, CACHE_LONG],
  search: [search, CACHE_DAY],
  config: [async () => ({ vworld: need("VWORLD_API_KEY") }), CACHE_DAY],
};

export async function GET(request) {
  const sp = new URL(request.url).searchParams;
  const op = OPS[sp.get("op")];
  if (!op) return json({ error: "알 수 없는 요청입니다." }, 400);
  try {
    return json(await op[0](sp), 200, op[1]);
  } catch (e) {
    return json({ error: e instanceof Fail ? e.message : "서버 오류가 났습니다." }, e.status || 500);
  }
}
