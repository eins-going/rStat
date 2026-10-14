(() => {
  const D = window.AGRI_DATA;
  const T = window.AGRI_TOPO;
  const V = D.v;
  const P = D.periods;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  // ---------- 지역 체계: '00' 전국 · '31' 시도 · '31|수원시' 시군 ----------
  const NATION = "00";
  const SIDO_CODES = Object.keys(T.sidos).sort();
  const GEOMS = T.objects.municipalities.geometries;
  const unitKeyOf = (g) => `${g.properties.sido}|${g.properties.unit}`;

  const unitRank = (name) => (name.endsWith("시부") ? 0 : name.endsWith("시") ? 1 : name.endsWith("구") ? 2 : 3);
  const UNITS_BY_SIDO = {};
  for (const g of GEOMS) {
    const list = (UNITS_BY_SIDO[g.properties.sido] ||= []);
    const k = unitKeyOf(g);
    if (!list.includes(k)) list.push(k);
  }
  for (const s of SIDO_CODES) {
    UNITS_BY_SIDO[s].sort((a, b) => {
      const [na, nb] = [a.split("|")[1], b.split("|")[1]];
      return unitRank(na) - unitRank(nb) || na.localeCompare(nb, "ko");
    });
  }

  const level = (k) => (k === NATION ? 0 : k.includes("|") ? 2 : 1);
  const sidoOf = (k) => (level(k) === 2 ? k.split("|")[0] : level(k) === 1 ? k : null);
  const parentOf = (k) => (level(k) === 2 ? sidoOf(k) : level(k) === 1 ? NATION : null);
  const childrenOf = (k) => (level(k) === 0 ? SIDO_CODES : level(k) === 1 ? UNITS_BY_SIDO[k] : []);
  const label = (k) => (k === NATION ? "전국" : level(k) === 1 ? T.sidos[k].name : k.split("|")[1]);
  const shortLabel = (k) => (level(k) === 1 ? T.sidos[k].short : label(k));
  const peersOf = (k) => (k === NATION ? [] : childrenOf(parentOf(k)));

  // ---------- 숫자 ----------
  const nf0 = new Intl.NumberFormat("ko-KR", { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat("ko-KR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const int = (n) => (n == null || Number.isNaN(n) ? "–" : nf0.format(n));
  const pct = (n) => (n == null || Number.isNaN(n) ? "–" : `${nf1.format(n)}%`);

  function compact(n) {
    if (n == null) return "–";
    const a = Math.abs(n);
    if (a >= 1e8) return `${nf1.format(n / 1e8)}억`;
    if (a >= 1e6) return `${nf0.format(n / 1e4)}만`;
    if (a >= 1e4) return `${nf1.format(n / 1e4)}만`;
    return nf0.format(n);
  }

  function won(w) {
    if (w == null || Number.isNaN(w)) return "–";
    if (w >= 1e12) return `${(w / 1e12).toFixed(2)}조 원`;
    if (w >= 1e10) return `${nf0.format(w / 1e8)}억 원`;
    if (w >= 1e8) return `${(w / 1e8).toFixed(2)}억 원`;
    return `${nf0.format(w / 1e4)}만 원`;
  }

  const lastOf = (arr) => {
    if (!arr) return { value: null, prev: null, i: -1 };
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] != null) {
        let p = null;
        for (let j = i - 1; j >= 0; j--) if (arr[j] != null) { p = arr[j]; break; }
        return { value: arr[i], prev: p, i };
      }
    }
    return { value: null, prev: null, i: -1 };
  };

  function change(cur, prev) {
    if (cur == null || prev == null || prev === 0) return null;
    return ((cur - prev) / prev) * 100;
  }

  function deltaHTML(cur, prev, labelText = "전년 대비") {
    const r = change(cur, prev);
    if (r == null) return "";
    const cls = r > 0 ? "up" : r < 0 ? "down" : "";
    const arrow = r > 0 ? "▲" : r < 0 ? "▼" : "–";
    return `${labelText} <span class="${cls}">${arrow} ${nf1.format(Math.abs(r))}%</span>`;
  }

  function countTo(el, target, format) {
    if (!el) return;
    if (target == null || Number.isNaN(target) || reduceMotion) {
      el.textContent = target == null || Number.isNaN(target) ? "–" : format(target);
      el._v = target;
      return;
    }
    const from = el._v ?? 0;
    el._v = target;
    const t0 = performance.now();
    cancelAnimationFrame(el._raf);
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 650);
      const e = 1 - Math.pow(1 - k, 3);
      el.textContent = format(from + (target - from) * e);
      if (k < 1) el._raf = requestAnimationFrame(step);
    };
    el._raf = requestAnimationFrame(step);
  }

  const setV = (key, value, format = int) => countTo($(`[data-v="${key}"]`), value, format);
  const setD = (key, html) => { const el = $(`[data-d="${key}"]`); if (el) el.innerHTML = html; };
  const setNote = (key, text) => { const el = $(`[data-note="${key}"]`); if (el) el.textContent = text || ""; };
  const setRank = (key, text) => { const el = $(`[data-rank="${key}"]`); if (el) el.textContent = text || ""; };
  const setYear = (panel, text) => { $(`#${panel} [data-year]`).textContent = text; };

  // 같은 상위 지역 안에서의 순위 (값이 큰 순서)
  function rankText(k, getter) {
    if (k === NATION) return null;
    const list = peersOf(k).map((r) => [r, getter(r)]).filter(([, v]) => v != null).sort((a, b) => b[1] - a[1]);
    const i = list.findIndex(([r]) => r === k);
    if (i < 0 || list.length < 2) return null;
    const scope = level(k) === 1 ? "전국" : T.sidos[sidoOf(k)].short;
    return `${scope} ${i + 1}위 / ${list.length}`;
  }

  // ---------- 지표 ----------
  const share = (pair) => (pair && pair[0] != null && pair[1] ? (pair[0] / pair[1]) * 100 : null);
  // 경영주 연령: [농가, 40세 미만 경영주 농가, 65세 이상 경영주 농가]
  const youngOperator = (k) => { const a = V.operatorAge[k]; return a && a[0] ? (a[1] / a[0]) * 100 : null; };
  const oldOperator = (k) => { const a = V.operatorAge[k]; return a && a[0] ? (a[2] / a[0]) * 100 : null; };
  const agingRatio = (k) => { const a = V.aging[k]; return a && a[0] ? (a[1] / a[0]) * 100 : null; }; // [농가인구, 65세 이상]
  const grdpShare = (k) => share(V.grdp[k]);
  // 농업ㆍ농촌 부문 예산 / 전체 세출 (최신 회계연도, 순계)
  const budgetShare = (k, i = -1) => {
    const a = V.budgetAgri[k]?.at(i), t = V.budgetTotal[k]?.at(i);
    return a != null && t ? (a / t) * 100 : null;
  };
  const grdpYear = (k) => (level(k) === 0 ? "2023" : P.grdp.bySido[sidoOf(k)] || "2023");

  const latestOf = (series) => (k) => lastOf(series[k]).value;
  const pairAt = (obj, i) => (k) => obj[k]?.[i] ?? null;
  const wonOf = (obj, i) => (k) => { const v = obj[k]?.[i]; return v == null ? null : v * 1e6; };
  const farmChange = (k) => { const { value, prev } = lastOf(V.households[k]); return change(value, prev); };
  const paddyShare = (k) => { const t = lastOf(V.land[k]); const p = V.paddy[k]?.[t.i]; return t.value && p != null ? (p / t.value) * 100 : null; };
  const riceYield = (k) => { const r = V.rice[k]; return r && r[0] ? (r[1] / r[0]) * 100 : null; };
  const cropArea = (k) => {
    const c = V.crops[k];
    if (!c) return null;
    return Object.entries(c).filter(([n]) => !/기타|화초/.test(n)).reduce((s, [, v]) => s + v, 0);
  };
  const fy = (y) => `${y}년`;

  // 지도에서 고를 수 있는 지표 (시군 단위로 값이 있는 것만)
  const METRICS = [
    { key: "households", label: "농가수", unit: "가구", year: fy(P.farm.at(-1)), get: latestOf(V.households), fmt: int },
    { key: "population", label: "농가인구", unit: "명", year: fy(P.farm.at(-1)), get: latestOf(V.population), fmt: int },
    { key: "farmChange", label: "농가수 증감률", unit: "%", year: `${P.farm.at(-1)}년 전년 대비`, get: farmChange, fmt: pct },
    { key: "young", label: "40세 미만 경영주 농가 비율", unit: "%", year: fy(P.aging), get: youngOperator, fmt: pct },
    { key: "oldOperator", label: "65세 이상 경영주 농가 비율", unit: "%", year: fy(P.aging), get: oldOperator, fmt: pct },
    { key: "aging", label: "65세 이상 농가인구 비율", unit: "%", year: fy(P.aging), get: agingRatio, fmt: pct },
    { key: "returnFarm", label: "귀농가구", unit: "가구", year: fy(P.returning.at(-1)), get: latestOf(V.returnFarm), fmt: int },
    { key: "rural", label: "귀촌인", unit: "명", year: fy(P.returning.at(-1)), get: latestOf(V.returnRural), fmt: int },
    { key: "land", label: "경지면적", unit: "ha", year: fy(P.land.at(-1)), get: latestOf(V.land), fmt: int },
    { key: "paddy", label: "논 면적", unit: "ha", year: fy(P.land.at(-1)), get: latestOf(V.paddy), fmt: int },
    { key: "field", label: "밭 면적", unit: "ha", year: fy(P.land.at(-1)), get: latestOf(V.field), fmt: int },
    { key: "paddyShare", label: "논 비중", unit: "%", year: fy(P.land.at(-1)), get: paddyShare, fmt: pct },
    { key: "rice", label: "쌀 생산량", unit: "톤", year: fy(P.rice), get: pairAt(V.rice, 1), fmt: int },
    { key: "riceArea", label: "논벼 재배면적", unit: "ha", year: fy(P.rice), get: pairAt(V.rice, 0), fmt: int },
    { key: "riceYield", label: "10a당 쌀 생산량", unit: "kg", year: fy(P.rice), get: riceYield, fmt: int },
    { key: "crops", label: "채소·특용작물 재배면적", unit: "ha", year: `${P.census} 총조사`, get: cropArea, fmt: int },
    { key: "cattle", label: "한육우", unit: "마리", year: P.livestock, get: pairAt(V.cattle, 1), fmt: int },
    { key: "dairy", label: "젖소", unit: "마리", year: P.livestock, get: pairAt(V.dairy, 1), fmt: int },
    { key: "pig", label: "돼지", unit: "마리", year: `${P.census} 총조사`, get: pairAt(V.pig, 1), fmt: int },
    { key: "chicken", label: "닭", unit: "마리", year: P.livestock, get: pairAt(V.chicken, 1), fmt: compact },
    { key: "duck", label: "오리", unit: "마리", year: `${P.census} 총조사`, get: pairAt(V.duck, 1), fmt: compact },
    { key: "grdpAgri", label: "농림어업 GRDP", unit: "", year: "2023년", get: wonOf(V.grdp, 0), fmt: won },
    { key: "grdp", label: "농림어업 GRDP 비중", unit: "%", year: "2023년", get: grdpShare, fmt: pct },
    { key: "budgetAgri", label: "농업·농촌 예산", unit: "", year: fy(P.budget.at(-1)), get: (k) => { const v = V.budgetAgri[k]?.at(-1); return v == null ? null : v * 1e6; }, fmt: won },
    { key: "budget", label: "농업예산 비중", unit: "%", year: fy(P.budget.at(-1)), get: (k) => budgetShare(k), fmt: pct },
  ];
  const withUnit = (m, v) => `${m.fmt(v)}${m.unit && m.unit !== "%" ? ` ${m.unit}` : ""}`;

  const state = { key: NATION, metric: METRICS[0] };

  // ---------- 선택 상자 ----------
  const sidoSel = $("#sido");
  const sggSel = $("#sgg");
  sidoSel.innerHTML = [`<option value="${NATION}">전국</option>`, ...SIDO_CODES.map((s) => `<option value="${s}">${T.sidos[s].name}</option>`)].join("");
  sidoSel.addEventListener("change", () => select(sidoSel.value));
  sggSel.addEventListener("change", () => select(sggSel.value));
  $("#reset").addEventListener("click", () => select(parentOf(state.key) ?? NATION));

  function syncControls() {
    const s = sidoOf(state.key);
    sidoSel.value = s || NATION;
    const units = s ? UNITS_BY_SIDO[s] : [];
    sggSel.innerHTML = [`<option value="${s || NATION}">전체</option>`, ...units.map((u) => `<option value="${u}">${label(u)}</option>`)].join("");
    sggSel.disabled = !s || units.length < 2;
    sggSel.value = level(state.key) === 2 ? state.key : s || NATION;
    const reset = $("#reset");
    reset.hidden = state.key === NATION;
    reset.textContent = level(state.key) === 2 ? `${T.sidos[s].name} 전체 보기` : "전국 보기";
  }

  function toHash(k) {
    if (k === NATION) return "";
    return `#${encodeURIComponent(level(k) === 1 ? T.sidos[k].name : `${T.sidos[sidoOf(k)].name}/${label(k)}`)}`;
  }

  function fromHash() {
    const [a, b] = decodeURIComponent(location.hash.slice(1)).split("/");
    const s = SIDO_CODES.find((c) => T.sidos[c].name === a || T.sidos[c].short === a);
    if (!s) return NATION;
    const u = b && UNITS_BY_SIDO[s].find((k) => label(k) === b);
    return u || s;
  }

  function select(k) {
    state.key = k;
    const hash = toHash(k);
    if (location.hash !== hash) history.replaceState(null, "", hash || location.pathname + location.search);
    syncControls();
    render();
  }

  // ---------- 제목 ----------
  const ICONS = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
    field: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18c4-3 14-3 18 0"/><path d="M3 13c4-3 14-3 18 0"/><path d="M12 4v6"/><path d="M12 6c-2 0-3-1-3-2 2 0 3 1 3 2zm0 0c2 0 3-1 3-2-2 0-3 1-3 2z"/></svg>',
    rice: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21V9"/><path d="M12 9c0-3 2-5 5-6 0 3-2 5-5 6z"/><path d="M12 13c0-3-2-5-5-6 0 3 2 5 5 6z"/><path d="M12 17c0-2.5 1.8-4.2 4-5 0 2.5-1.8 4.2-4 5z"/></svg>',
    people: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.4"/><path d="M15.5 14.2c3 .2 5.5 2.6 5.5 5.8"/></svg>',
  };

  function renderHero() {
    const k = state.key;
    $("#title-region").textContent = label(k);
    const trail = [];
    for (let p = parentOf(k); p; p = parentOf(p)) trail.unshift(label(p));
    $("#crumb").textContent = trail.length ? `${trail.join(" › ")} ›` : "";
    const hh = lastOf(V.households[k]).value;
    const pop = lastOf(V.population[k]).value;
    const land = lastOf(V.land[k]);
    const paddy = V.paddy[k]?.[land.i];
    const rice = V.rice[k]?.[1];
    const aging = agingRatio(k);
    $("#facts").innerHTML = [
      `<li>${ICONS.home}<span>농가 <b>${int(hh)}</b>가구 · 농가인구 <b>${int(pop)}</b>명</span></li>`,
      `<li>${ICONS.field}<span>경지 <b>${int(land.value)}</b> ha · 논 비중 <b>${land.value ? pct((paddy / land.value) * 100) : "–"}</b></span></li>`,
      `<li>${ICONS.rice}<span>쌀 생산 <b>${int(rice)}</b>톤 (${P.rice}년)</span></li>`,
      `<li class="accent">${ICONS.people}<span>농가인구 열에 <b>${aging == null ? "–" : nf0.format(aging / 10)}</b>명은 65세 이상 (${P.aging}년)</span></li>`,
    ].join("");
  }

  // ---------- 왼쪽 패널 ----------
  function renderFarm() {
    const k = state.key;
    const p = parentOf(k);
    const hh = lastOf(V.households[k]);
    const pop = lastOf(V.population[k]);
    setYear("p-farm", `${P.farm[hh.i] ?? P.farm.at(-1)}년`);
    setV("households", hh.value);
    setV("population", pop.value);
    setD("households", deltaHTML(hh.value, hh.prev));
    setD("population", deltaHTML(pop.value, pop.prev));

    const y = youngOperator(k), py = p ? youngOperator(p) : null;
    const o = oldOperator(k), po = p ? oldOperator(p) : null;
    countTo($('[data-v="young"]'), y, pct);
    countTo($('[data-v="aging"]'), o, pct);
    meter("young", y, py, Math.max(5, Math.ceil(Math.max(y || 0, py || 0) / 5) * 5));
    meter("aging", o, po);
    setNote("aging", p ? `흰 선은 ${label(p)} · ${P.aging} 농림어업총조사` : `${P.aging} 농림어업총조사 · 경영주 연령 기준`);
    $('[data-meter="young"]').parentElement.title = p ? `${label(p)} ${pct(py)}` : "";
    $('[data-meter="aging"]').parentElement.title = p ? `${label(p)} ${pct(po)}` : "";
    lineChart("#chart-farm", P.farm, V.households[k], "가구");
  }

  function renderReturn() {
    const k = state.key;
    const f = lastOf(V.returnFarm[k]);
    const r = lastOf(V.returnRural[k]);
    setYear("p-return", `${P.returning.at(-1)}년`);
    setV("returnFarm", f.value);
    setV("returnRural", r.value);
    setD("returnFarm", deltaHTML(f.value, f.prev));
    setD("returnRural", deltaHTML(r.value, r.prev));
    spark("#spark-farm", P.returning, V.returnFarm[k]);
    spark("#spark-rural", P.returning, V.returnRural[k]);
    setNote("return", f.value == null && r.value == null ? "읍·면이 없는 지역은 귀농·귀촌 집계 대상이 아닙니다." : "");
  }

  function renderLand() {
    const k = state.key;
    const t = lastOf(V.land[k]);
    const paddy = V.paddy[k]?.[t.i];
    const field = V.field[k]?.[t.i];
    setYear("p-land", `${P.land[t.i] ?? P.land.at(-1)}년`);
    setV("land", t.value);
    setD("land", deltaHTML(t.value, t.prev));
    setRank("land", rankText(k, (x) => lastOf(V.land[x]).value));
    const pp = t.value ? (paddy / t.value) * 100 : 0;
    $("#split-land").innerHTML = t.value ? `
      <div class="split-bar" role="img" aria-label="논 ${nf1.format(pp)}%, 밭 ${nf1.format(100 - pp)}%">
        <span style="flex-basis:${pp}%;background:var(--accent)"></span>
        <span style="flex-basis:${100 - pp}%;background:var(--field)"></span>
      </div>
      <div class="split-legend">
        <span><i class="dot" style="background:var(--accent)"></i>논 <b>${int(paddy)}</b> ha · ${nf1.format(pp)}%</span>
        <span><i class="dot" style="background:var(--field)"></i>밭 <b>${int(field)}</b> ha · ${nf1.format(100 - pp)}%</span>
      </div>` : '<p class="note">경지면적 자료가 없습니다.</p>';
  }

  function renderLivestock() {
    const k = state.key;
    setYear("p-live", P.livestock);
    const q = P.livestock.replace(/^\d{4}년 /, "");
    const rows = [
      ["한육우", V.cattle[k], q],
      ["젖소", V.dairy[k], q],
      ["닭", V.chicken[k], q],
      ["돼지", V.pig[k], `${P.census} 총조사`],
      ["오리", V.duck[k], `${P.census} 총조사`],
    ];
    $("#live-body").innerHTML = rows.map(([name, v, basis]) => `
      <tr><td>${name}</td><td>${int(v?.[0])}</td><td>${compact(v?.[1])}</td><td>${basis}</td></tr>`).join("");
  }

  // ---------- 오른쪽 패널 ----------
  function renderCrop() {
    const k = state.key;
    const rice = V.rice[k] || [];
    setYear("p-crop", `${P.rice}년`);
    setV("rice", rice[1]);
    setV("riceArea", rice[0]);
    setRank("rice", rankText(k, (x) => V.rice[x]?.[1]));
    const yieldKg = rice[0] ? (rice[1] / rice[0]) * 100 : null;
    $('[data-v="riceYield"]').textContent = yieldKg ? `10a당 ${nf0.format(yieldKg)}kg` : "";

    const crops = Object.entries(V.crops[k] || {})
      .filter(([name, v]) => v > 0 && !/기타|화초/.test(name))
      .sort((a, b) => b[1] - a[1])
      .slice(0, !FIT.matches ? 7 : window.innerHeight <= 860 ? 4 : window.innerHeight <= 1000 ? 5 : 6);
    const max = crops[0]?.[1] || 1;
    $("#bars-crop").innerHTML = crops.length
      ? crops.map(([name, v]) => `
        <div class="bar-row"><span class="name">${name}</span>
          <span class="track"><span class="fill" style="width:${(v / max) * 100}%"></span></span>
          <span class="val">${int(v)}</span></div>`).join("")
      : '<p class="note">재배면적 자료가 없습니다.</p>';
  }

  function renderGrdp() {
    const k = state.key;
    const p = parentOf(k);
    const g = V.grdp[k];
    setYear("p-grdp", `${grdpYear(k)}년`);
    countTo($('[data-v="grdp"]'), g?.[0] == null ? null : g[0] * 1e6, won);
    const s = grdpShare(k);
    const ps = p ? grdpShare(p) : null;
    countTo($('[data-v="grdpShare"]'), s, pct);
    meter("grdp", s, ps, Math.max(20, Math.ceil(Math.max(s || 0, ps || 0) / 10) * 10));
    const rk = rankText(k, grdpShare);
    setNote("grdp", p
      ? `흰 선은 ${label(p)} ${pct(ps)}${rk ? ` · 비중 ${rk}` : ""}`
      : `지역 총생산 ${won(g?.[1] * 1e6)} 가운데 농림어업 몫 (명목)`);
  }

  function renderEcon() {
    const k = state.key;
    const s = sidoOf(k);
    const own = level(k) === 0 ? V.economy[NATION] : V.economy[s];
    const v = own || V.economy[NATION];
    setYear("p-econ", `${P.economy}년`);
    ["income", "agriIncome", "assets", "debt"].forEach((name, i) => setV(name, v?.[i] == null ? null : v[i] * 1e3, won));
    let note = "농가 1가구 평균";
    if (level(k) === 0) note += " · 전국";
    else if (!own) note = `광역시·세종은 농가경제조사 대상이 아니어서 전국 평균을 보여줍니다.`;
    else if (level(k) === 2) note = `시군 통계가 없어 ${T.sidos[s].name} 평균을 보여줍니다.`;
    else note += ` · ${T.sidos[s].name}`;
    setNote("econ", note);
  }

  function renderBudget() {
    const k = state.key;
    const p = parentOf(k);
    const years = P.budget;
    const a = lastOf(V.budgetAgri[k]);
    setYear("p-budget", `${years[a.i] ?? years.at(-1)}년`);
    countTo($('[data-v="budget"]'), a.value == null ? null : a.value * 1e6, won);
    setD("budget", deltaHTML(a.value, a.prev));
    const s = budgetShare(k);
    const ps = p ? budgetShare(p) : null;
    countTo($('[data-v="budgetShare"]'), s, pct);
    meter("budget", s, ps, Math.max(20, Math.ceil(Math.max(s || 0, ps || 0) / 10) * 10));
    const rk = rankText(k, (x) => budgetShare(x));
    const total = V.budgetTotal[k]?.at(-1);
    let note;
    if (a.value == null) note = sidoOf(k) === "39" ? "제주시·서귀포시는 행정시라 별도 예산이 없습니다. 제주특별자치도 전체를 보세요." : "예산 자료가 없습니다.";
    else if (level(k) === 0) note = `전국 지방자치단체 세출 ${won(total * 1e6)} 가운데 농업ㆍ농촌 부문`;
    else if (level(k) === 1) note = `본청과 시군구 예산의 단순 합계(이전재원 중복 포함) · 흰 선은 전국 ${pct(ps)}${rk ? ` · ${rk}` : ""}`;
    else if (label(k).endsWith("시부")) note = `구 예산 합계 (광역시 본청 예산 제외) · 흰 선은 ${label(p)} ${pct(ps)}`;
    else note = `흰 선은 ${label(p)} ${pct(ps)}${rk ? ` · 비중 ${rk}` : ""}`;
    setNote("budget", note);
  }

  function meter(key, value, mark, max = 100) {
    const fill = $(`[data-meter="${key}"]`);
    const m = $(`[data-mark="${key}"]`);
    fill.style.width = value == null ? "0" : `${Math.min(100, (value / max) * 100)}%`;
    if (mark == null) { m.classList.remove("on"); return; }
    m.classList.add("on");
    m.style.left = `calc(${Math.min(100, (mark / max) * 100)}% - 1px)`;
  }

  // ---------- 작은 차트 ----------
  function lineChart(sel, years, values, unit) {
    const el = $(sel);
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return; // 숨겨져 있거나 아직 배치 전이면 크기가 잡힌 뒤 다시 그린다
    const pts = years.map((y, i) => ({ y, v: values?.[i] })).filter((d) => d.v != null);
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`);
    svg.attr("role", "img").attr("aria-label", pts.length ? `농가수 ${pts[0].y}년 ${int(pts[0].v)}${unit}에서 ${pts.at(-1).y}년 ${int(pts.at(-1).v)}${unit}` : "자료 없음");
    if (!pts.length) { svg.selectAll("*").remove(); return; }
    const m = { t: 22, r: 8, b: 20, l: 8 };
    const x = d3.scalePoint().domain(pts.map((d) => d.y)).range([m.l, w - m.r]);
    const ext = d3.extent(pts, (d) => d.v);
    const pad = (ext[1] - ext[0]) * 0.25 || ext[1] * 0.1 || 1;
    const y = d3.scaleLinear().domain([ext[0] - pad, ext[1] + pad * 0.5]).range([h - m.b, m.t]);

    svg.selectAll("defs").data([0]).join("defs")
      .selectAll("linearGradient").data([0]).join("linearGradient")
      .attr("id", "g-farm").attr("x1", 0).attr("x2", 0).attr("y1", 0).attr("y2", 1)
      .selectAll("stop").data([[0, 0.35], [1, 0]]).join("stop")
      .attr("offset", (d) => d[0]).attr("stop-color", "#f5a524").attr("stop-opacity", (d) => d[1]);

    const area = d3.area().x((d) => x(d.y)).y0(h - m.b).y1((d) => y(d.v)).curve(d3.curveMonotoneX);
    const line = d3.line().x((d) => x(d.y)).y((d) => y(d.v)).curve(d3.curveMonotoneX);
    // 처음 그릴 때는 바로, 지역을 바꿀 때만 움직임을 준다
    const first = !el.querySelector("path.line") || el.dataset.size !== `${w}x${h}`;
    el.dataset.size = `${w}x${h}`;
    const t = svg.transition().duration(reduceMotion || first ? 0 : 600);
    svg.selectAll("path.area").data([pts]).join("path").attr("class", "area").attr("fill", "url(#g-farm)").transition(t).attr("d", area);
    svg.selectAll("path.line").data([pts]).join("path").attr("class", "line").attr("fill", "none").attr("stroke", "#f5a524").attr("stroke-width", 2).transition(t).attr("d", line);
    const ends = [pts[0], pts.at(-1)];
    svg.selectAll("circle.end").data(ends).join("circle").attr("class", "end").attr("r", (d, i) => (i ? 4 : 3))
      .attr("fill", (d, i) => (i ? "#f5a524" : "#1d2026")).attr("stroke", "#f5a524").attr("stroke-width", 1.5)
      .transition(t).attr("cx", (d) => x(d.y)).attr("cy", (d) => y(d.v));
    svg.selectAll("text.end").data(ends).join("text").attr("class", "end")
      .attr("fill", (d, i) => (i ? "#eef0f3" : "#9aa1ad")).attr("font-size", 11.5).attr("font-weight", (d, i) => (i ? 700 : 400))
      .attr("text-anchor", (d, i) => (i ? "end" : "start"))
      .text((d) => int(d.v))
      .transition(t).attr("x", (d) => x(d.y)).attr("y", (d) => y(d.v) - 9);
    svg.selectAll("g.axis").data([0]).join("g").attr("class", "axis")
      .selectAll("text").data(ends).join("text")
      .attr("x", (d) => x(d.y)).attr("y", h - 4).attr("text-anchor", (d, i) => (i ? "end" : "start")).text((d) => `${d.y}년`);
  }

  function spark(sel, years, values) {
    const el = $(sel);
    const w = el.clientWidth;
    const h = el.clientHeight;
    if (!w || !h) return;
    const pts = years.map((y, i) => ({ y, v: values?.[i] ?? null }));
    const svg = d3.select(el).selectAll("svg").data([0]).join("svg").attr("viewBox", `0 0 ${w} ${h}`)
      .attr("role", "img").attr("aria-label", pts.filter((d) => d.v != null).map((d) => `${d.y}년 ${int(d.v)}`).join(", ") || "자료 없음");
    const x = d3.scaleBand().domain(years).range([0, w]).padding(0.28);
    const max = d3.max(pts, (d) => d.v) || 1;
    const y = d3.scaleLinear().domain([0, max]).range([h - 14, 2]);
    const first = !el.querySelector("rect") || el.dataset.size !== `${w}x${h}`;
    el.dataset.size = `${w}x${h}`;
    svg.selectAll("rect").data(pts).join("rect")
      .attr("x", (d) => x(d.y)).attr("width", x.bandwidth()).attr("rx", 2)
      .attr("fill", (d, i) => (i === pts.length - 1 ? "#f5a524" : "#3a3f48"))
      .transition().duration(reduceMotion || first ? 0 : 500)
      .attr("y", (d) => (d.v == null ? h - 14 : y(d.v))).attr("height", (d) => (d.v == null ? 0 : h - 14 - y(d.v)));
    svg.selectAll("text").data([years[0], years.at(-1)]).join("text")
      .attr("x", (d, i) => (i ? w : 0)).attr("y", h - 2).attr("text-anchor", (d, i) => (i ? "end" : "start"))
      .attr("fill", "#666d79").attr("font-size", 10.5).text((d) => `'${String(d).slice(2)}`);
  }

  // ---------- 지도 ----------
  const RAMP = ["#3b3428", "#5e4925", "#8a6322", "#c0841f", "#f5a524"];
  const EMPTY = "#2a2d33";
  const mapSvg = d3.select("#map");
  const tip = $("#tip");
  const obj = T.objects.municipalities;

  // 시군·시도 경계를 하나의 도형으로 합친다 (구 경계선 없이)
  const unitFeatures = Object.values(UNITS_BY_SIDO).flat().map((k) => ({
    type: "Feature",
    properties: { key: k, sido: sidoOf(k) },
    geometry: topojson.merge(T, GEOMS.filter((g) => unitKeyOf(g) === k)),
  }));
  const sidoFeatures = SIDO_CODES.map((s) => ({
    type: "Feature",
    properties: { key: s, sido: s },
    geometry: topojson.merge(T, GEOMS.filter((g) => g.properties.sido === s)),
  }));
  const sidoMesh = topojson.mesh(T, obj, (a, b) => a !== b && a.properties.sido !== b.properties.sido);
  const unitMesh = topojson.mesh(T, obj, (a, b) => a !== b && a.properties.sido === b.properties.sido && unitKeyOf(a) !== unitKeyOf(b));

  // 위도 36도 부근 경도 축소를 반영한 평면 투영 (폴리곤 방향과 무관)
  const K = Math.cos((36 * Math.PI) / 180);
  const BOUNDS = (() => {
    let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    const walk = (c) => {
      if (typeof c[0] === "number") {
        x0 = Math.min(x0, c[0] * K); x1 = Math.max(x1, c[0] * K);
        y0 = Math.min(y0, c[1]); y1 = Math.max(y1, c[1]);
      } else c.forEach(walk);
    };
    sidoFeatures.forEach((f) => walk(f.geometry.coordinates));
    return { x0, x1, y0, y1 };
  })();

  const LABEL_AT = { 31: [127.45, 37.2] };
  let path = null;
  let size = { w: 0, h: 0 };
  let view = { k: 1, x: 0, y: 0 };
  const anchor = new Map(); // 지역키 → 라벨 위치(가장 큰 조각의 중심, 기본 좌표)

  // 섬이 많은 지역도 본섬 위에 이름이 오도록 가장 큰 폴리곤의 중심을 쓴다
  function labelPoint(f) {
    const g = f.geometry;
    if (!g) return [NaN, NaN];
    const polys = g.type === "MultiPolygon" ? g.coordinates : [g.coordinates];
    let best = null, bestA = -1;
    for (const c of polys) {
      const pf = { type: "Polygon", coordinates: c };
      const a = path.area(pf);
      if (a > bestA) { bestA = a; best = pf; }
    }
    return path.centroid(best);
  }

  function setMetric(m, scroll = true) {
    state.metric = m;
    const i = METRICS.indexOf(m);
    $$("#chips button").forEach((x, j) => x.setAttribute("aria-pressed", j === i));
    $("#chip-prev").disabled = i === 0;
    $("#chip-next").disabled = i === METRICS.length - 1;
    $("#chip-count").textContent = `${i + 1} / ${METRICS.length}`;
    if (scroll) {
      // 고른 지표 버튼이 지표 줄 가운데 오도록 가로로 스크롤한다
      const bar = $("#chips");
      const b = $$("#chips button")[i];
      bar.scrollTo({ left: b.offsetLeft - bar.clientWidth / 2 + b.offsetWidth / 2, behavior: reduceMotion ? "auto" : "smooth" });
    }
    paintMap();
    renderRank();
  }

  function chips() {
    $("#chips").innerHTML = METRICS.map((m) => `<button type="button" data-k="${m.key}" aria-pressed="${m === state.metric}">${m.label}</button>`).join("");
    $$("#chips button").forEach((b) => b.addEventListener("click", () => setMetric(METRICS.find((m) => m.key === b.dataset.k))));
    const step = (d) => setMetric(METRICS[Math.min(METRICS.length - 1, Math.max(0, METRICS.indexOf(state.metric) + d))]);
    $("#chip-prev").addEventListener("click", () => step(-1));
    $("#chip-next").addEventListener("click", () => step(1));
    $("#chips").addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        step(e.key === "ArrowLeft" ? -1 : 1);
        $$("#chips button")[METRICS.indexOf(state.metric)].focus();
      }
    });
    $("#chip-prev").disabled = true;
    $("#chip-count").textContent = `1 / ${METRICS.length}`;
  }

  const FIT = window.matchMedia("(min-width: 1281px) and (min-height: 720px)");

  function drawMap() {
    const wrap = $("#map-wrap");
    const w = wrap.clientWidth;
    // 한 화면 모드에서는 남는 높이를 모두 쓰고, 아니면 너비에 맞춰 높이를 정한다
    const h = FIT.matches ? Math.max(240, wrap.clientHeight) : Math.round(Math.max(380, Math.min(700, w * 0.92)));
    size = { w, h };
    const pad = 12;
    const bw = BOUNDS.x1 - BOUNDS.x0;
    const bh = BOUNDS.y1 - BOUNDS.y0;
    const s = Math.min((w - pad * 2) / bw, (h - pad * 2) / bh);
    const ox = (w - bw * s) / 2;
    const oy = (h - bh * s) / 2;
    const project = (lon, lat) => [ox + (lon * K - BOUNDS.x0) * s, oy + (BOUNDS.y1 - lat) * s];
    path = d3.geoPath(d3.geoTransform({ point(lon, lat) { this.stream.point(...project(lon, lat)); } }));
    mapSvg.attr("viewBox", `0 0 ${w} ${h}`).attr("height", FIT.matches ? null : h);
    anchor.clear();
    [...sidoFeatures, ...unitFeatures].forEach((f) => anchor.set(f.properties.key, labelPoint(f)));
    // 서울을 둘러싼 경기도는 중심점이 서울 안에 찍히므로 이름 위치를 직접 정한다 (경도, 위도)
    Object.entries(LABEL_AT).forEach(([k, ll]) => anchor.set(k, project(...ll)));

    const world = mapSvg.selectAll("g.world").data([0]).join("g").attr("class", "world");
    world.selectAll("g.sidos").data([0]).join("g").attr("class", "sidos")
      .selectAll("path").data(sidoFeatures, (d) => d.properties.key).join("path")
      .attr("class", "region sido").attr("d", path)
      .attr("tabindex", 0).attr("role", "button")
      .on("mousemove", (e, d) => showTip(e, d.properties.key))
      .on("mouseleave", hideTip)
      .on("click", (e, d) => onRegionClick(d.properties.key))
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRegionClick(d.properties.key); } });
    world.selectAll("g.units").data([0]).join("g").attr("class", "units")
      .selectAll("path").data(unitFeatures, (d) => d.properties.key).join("path")
      .attr("class", "region unit hidden").attr("d", path)
      .attr("tabindex", 0).attr("role", "button")
      .on("mousemove", (e, d) => showTip(e, d.properties.key))
      .on("mouseleave", hideTip)
      .on("click", (e, d) => onRegionClick(d.properties.key))
      .on("keydown", (e, d) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onRegionClick(d.properties.key); } });
    world.selectAll("path.mesh-unit").data([unitMesh]).join("path").attr("class", "mesh-unit").attr("d", path);
    world.selectAll("path.mesh-sido").data([sidoMesh]).join("path").attr("class", "mesh-sido").attr("d", path);
    mapSvg.selectAll("g.labels").data([0]).join("g").attr("class", "labels");
    applyView(false);
  }

  function onRegionClick(k) {
    const cur = state.key;
    if (level(k) === 1) {
      // 시도 도형: 전국 화면에서는 그 시도로, 시도 화면에서는 다른 시도로 이동
      select(k === sidoOf(cur) && level(cur) === 1 ? NATION : k);
    } else {
      select(k === cur ? sidoOf(k) : k);
    }
  }

  // 현재 선택에 맞춰 확대 범위를 정한다: 전국 → 전체, 시도·시군 → 그 시도
  function targetView() {
    const s = sidoOf(state.key);
    if (!s) return { k: 1, x: 0, y: 0 };
    const f = sidoFeatures.find((d) => d.properties.key === s);
    const [[x0, y0], [x1, y1]] = path.bounds(f);
    const pad = 28;
    const k = Math.min(14, (size.w - pad * 2) / (x1 - x0), (size.h - pad * 2) / (y1 - y0));
    return { k, x: size.w / 2 - ((x0 + x1) / 2) * k, y: size.h / 2 - ((y0 + y1) / 2) * k };
  }

  function applyView(animate = true) {
    view = targetView();
    const tr = `translate(${view.x},${view.y}) scale(${view.k})`;
    const world = mapSvg.select("g.world");
    if (animate && !reduceMotion) world.transition().duration(750).ease(d3.easeCubicInOut).attr("transform", tr);
    else world.attr("transform", tr);
    paintMap();
    drawLabels(animate);
  }

  let color = null;

  function paintMap() {
    const m = state.metric;
    const s = sidoOf(state.key);
    const peers = s ? UNITS_BY_SIDO[s] : SIDO_CODES;
    const vals = peers.map(m.get).filter((v) => v != null);
    const single = new Set(vals).size < 2;
    color = !vals.length ? () => EMPTY : single ? () => RAMP.at(-1) : d3.scaleQuantile().domain(vals).range(RAMP);
    const fillOf = (k) => { const v = m.get(k); return v == null ? EMPTY : color(v); };

    mapSvg.selectAll("path.sido")
      .classed("context", (d) => !!s && d.properties.key !== s)
      .classed("hidden", (d) => d.properties.key === s)
      .attr("fill", (d) => (s ? null : fillOf(d.properties.key)))
      .attr("aria-label", (d) => `${label(d.properties.key)} ${m.label} ${withUnit(m, m.get(d.properties.key))}`);
    mapSvg.selectAll("path.unit")
      .classed("hidden", (d) => d.properties.sido !== s)
      .classed("sel", (d) => d.properties.key === state.key)
      .attr("fill", (d) => (d.properties.sido === s ? fillOf(d.properties.key) : null))
      .attr("aria-label", (d) => `${label(d.properties.key)} ${m.label} ${withUnit(m, m.get(d.properties.key))}`);
    mapSvg.select("path.mesh-unit").attr("opacity", s ? 1 : 0);
    mapSvg.classed("dimmed", level(state.key) === 2);
    mapSvg.selectAll("path.unit.sel").raise();
    $("#map").setAttribute("aria-label", `${s ? T.sidos[s].name : "전국"} ${m.label} 지도`);

    const edges = vals.length && !single ? [d3.min(vals), ...color.quantiles(), d3.max(vals)] : [];
    const rows = !vals.length ? ""
      : single ? `<span class="row"><span class="sw" style="background:${RAMP.at(-1)}"></span>${m.fmt(vals[0])}</span>`
      : RAMP.map((c, i) => `<span class="row"><span class="sw" style="background:${c}"></span>${m.fmt(edges[i])}–${m.fmt(edges[i + 1])}</span>`).join("");
    $("#legend").innerHTML = `<span class="title">${m.label} <span style="color:var(--faint);font-weight:400">${m.year}</span></span>` + rows +
      (vals.length < peers.length ? `<span class="row"><span class="sw" style="background:${EMPTY};outline:1px solid #3a3f48"></span>자료 없음</span>` : "");
  }

  function drawLabels(animate) {
    const s = sidoOf(state.key);
    const keys = s ? UNITS_BY_SIDO[s] : SIDO_CODES;
    const pos = (k) => { const [x, y] = anchor.get(k) || [NaN, NaN]; return [x * view.k + view.x, y * view.k + view.y]; };
    // 화면에서 너무 작은 지역은 이름을 생략한다 (선택한 지역은 항상 표시)
    const small = (k) => {
      if (k === state.key) return false;
      const f = (s ? unitFeatures : sidoFeatures).find((d) => d.properties.key === k);
      return path.area(f) * view.k * view.k < (s ? 260 : 120);
    };
    const name = (k) => (level(k) === 1 ? T.sidos[k].short : (label(k).endsWith("시부") ? "시부" : label(k).replace(/(시|군|구)$/, "")));
    const inView = (k) => { const [x, y] = pos(k); return x > 20 && x < size.w - 20 && y > 16 && y < size.h - 10; };
    // 시도 화면에서는 화면 안에 들어오는 주변 시도 이름을 흐리게 함께 보여준다
    const ctx = s ? SIDO_CODES.filter((c) => c !== s && inView(c)) : [];
    const data = [...keys.filter((k) => !small(k) && Number.isFinite(pos(k)[0])), ...ctx];
    const g = mapSvg.select("g.labels");
    const sel = g.selectAll("text").data(data, (k) => k).join("text")
      .attr("class", (k) => `region-label${level(k) === 1 ? " sido-label" : ""}${s && level(k) === 1 ? " ctx" : ""}${k === state.key ? " sel" : ""}`)
      .attr("x", (k) => pos(k)[0])
      .attr("y", (k) => pos(k)[1] + 4)
      .text(name);
    if (animate && !reduceMotion) sel.style("opacity", 0).transition().delay(550).duration(300).style("opacity", 1);
    else sel.style("opacity", 1);
  }

  function showTip(e, k) {
    const m = state.metric;
    const v = m.get(k);
    const list = peersOf(k).map((r) => [r, m.get(r)]).filter(([, x]) => x != null).sort((a, b) => b[1] - a[1]);
    const i = list.findIndex(([r]) => r === k);
    tip.innerHTML = `<b>${label(k)}</b><span>${m.label}</span> ${withUnit(m, v)}<span>${i < 0 ? "" : ` · ${i + 1}위`}</span>`;
    const box = $("#map-wrap").getBoundingClientRect();
    tip.style.left = `${e.clientX - box.left}px`;
    tip.style.top = `${e.clientY - box.top}px`;
    tip.hidden = false;
  }

  const hideTip = () => { tip.hidden = true; };

  function renderRank() {
    const m = state.metric;
    const s = sidoOf(state.key);
    const peers = s ? UNITS_BY_SIDO[s] : SIDO_CODES;
    const list = peers.map((r) => [r, m.get(r)]).filter(([, v]) => v != null).sort((a, b) => b[1] - a[1]);
    const max = list[0]?.[1] || 1;
    const top = list.slice(0, 10);
    const selIdx = list.findIndex(([r]) => r === state.key);
    const row = ([r, v], i) => `
      <button type="button" class="rank-row${i < 3 ? " top" : ""}${r === state.key ? " sel" : ""}" data-r="${r}">
        <span class="no">${i + 1}</span><span>${shortLabel(r)}</span>
        <span class="track"><span class="fill" style="width:${Math.max(0, (v / max) * 100)}%"></span></span>
        <span class="val">${m.fmt(v)}</span>
      </button>`;
    const extra = selIdx >= 10 ? `<div class="rank-title" style="margin:6px 0 0"><span>선택한 지역</span></div>${row(list[selIdx], selIdx)}` : "";
    const scope = s ? `${T.sidos[s].short} 시군` : "시도";
    $("#rank").innerHTML = list.length ? `
      <div class="rank-title"><span><b>${m.label}</b> 상위 ${scope}</span><span>${m.year} · ${list.length}곳</span></div>
      <div>${top.slice(0, 5).map((d, i) => row(d, i)).join("")}</div>
      <div>${top.slice(5).map((d, i) => row(d, i + 5)).join("")}</div>${extra}` : "";
    $$("#rank .rank-row").forEach((b) => b.addEventListener("click", () => onRegionClick(b.dataset.r)));
  }

  // ---------- 흐르는 증감 띠 ----------
  function tickerItem(text, arr) {
    const { value, prev } = lastOf(arr);
    const r = change(value, prev);
    if (r == null) return "";
    const cls = r > 0 ? "up" : r < 0 ? "down" : "";
    const arrow = r > 0 ? "▲" : r < 0 ? "▼" : "–";
    return `<span class="tk">${text} <b class="${cls}">${arrow} ${nf1.format(Math.abs(r))}%</b></span>`;
  }

  function renderTicker() {
    const k = state.key;
    const head = [
      `<span class="tk tk-region">${label(k)}</span>`,
      tickerItem("농가", V.households[k]),
      tickerItem("농가인구", V.population[k]),
      tickerItem("귀농가구", V.returnFarm[k]),
      tickerItem("귀촌인", V.returnRural[k]),
      tickerItem("경지면적", V.land[k]),
    ];
    const others = (level(k) === 2 ? peersOf(k) : childrenOf(k)).filter((x) => x !== k).flatMap((x) => [
      `<span class="tk"><b style="color:var(--text)">${shortLabel(x)}</b></span>`,
      tickerItem("농가", V.households[x]),
      tickerItem("귀촌인", V.returnRural[x]),
    ]);
    const html = [...head, ...others].join("");
    const track = $("#ticker");
    track.innerHTML = `${html}<span aria-hidden="true" style="display:contents">${html}</span>`;
    requestAnimationFrame(() => track.style.setProperty("--ticker-dur", `${Math.max(20, Math.round(track.scrollWidth / 2 / 50))}s`));
  }

  // ---------- 출처 ----------
  function sources() {
    $$("[data-src]").forEach((el) => {
      const s = D.sources[el.dataset.src];
      el.textContent = s ? `출처: ${s}` : "";
      // 넓은 화면에서는 카드 머리의 '출처' 버튼으로 보여준다 (마우스를 올리면 툴팁, 누르면 펼침)
      const panel = el.closest(".panel");
      const head = panel?.querySelector(".panel-head");
      if (!s || !head || head.querySelector(".src-btn")) return;
      const right = document.createElement("div");
      right.className = "head-right";
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "src-btn";
      btn.textContent = "출처";
      btn.title = s;
      btn.setAttribute("aria-expanded", "false");
      btn.addEventListener("click", () => {
        const open = panel.classList.toggle("show-src");
        btn.setAttribute("aria-expanded", open);
      });
      const chip = head.querySelector(".chip");
      right.append(btn);
      if (chip) right.append(chip);
      head.append(right);
    });
    $("#updated").textContent = `데이터 수집일 ${D.updated}`;
  }

  // ---------- 전체 갱신 ----------
  let lastSido = undefined;
  function render() {
    renderTicker();
    renderHero();
    renderFarm();
    renderReturn();
    renderLand();
    renderLivestock();
    renderCrop();
    renderGrdp();
    renderEcon();
    renderBudget();
    const s = sidoOf(state.key);
    if (s !== lastSido) { applyView(lastSido !== undefined); lastSido = s; }
    else { paintMap(); drawLabels(false); }
    renderRank();
  }

  chips();
  sources();
  drawMap();
  select(fromHash());
  // ?m=budget 처럼 지표를 지정해 열 수 있다
  const initial = METRICS.find((m) => m.key === new URLSearchParams(location.search).get("m"));
  if (initial) setMetric(initial);
  window.addEventListener("hashchange", () => { const k = fromHash(); if (k !== state.key) select(k); });

  // 지도 영역 크기가 바뀌면 (창 크기 변경, 한 화면 모드 전환 등) 지도와 카드를 다시 그린다
  let resizeT;
  let lastSize = "";
  new ResizeObserver(() => {
    const wrap = $("#map-wrap");
    const sizeKey = `${wrap.clientWidth}x${FIT.matches ? wrap.clientHeight : 0}`;
    if (sizeKey === lastSize) return;
    lastSize = sizeKey;
    clearTimeout(resizeT);
    resizeT = setTimeout(() => { drawMap(); render(); }, 120);
  }).observe($("#map-wrap"));

  // 작은 차트는 자기 크기가 잡히거나 바뀔 때 다시 그린다
  const chartSizes = new Map();
  const chartRO = new ResizeObserver((entries) => {
    const changed = entries.some((e) => {
      const key = `${Math.round(e.contentRect.width)}x${Math.round(e.contentRect.height)}`;
      if (chartSizes.get(e.target) === key) return false;
      chartSizes.set(e.target, key);
      return true;
    });
    if (!changed) return;
    lineChart("#chart-farm", P.farm, V.households[state.key], "가구");
    spark("#spark-farm", P.returning, V.returnFarm[state.key]);
    spark("#spark-rural", P.returning, V.returnRural[state.key]);
  });
  ["#chart-farm", "#spark-farm", "#spark-rural"].forEach((s) => chartRO.observe($(s)));
  FIT.addEventListener("change", () => { lastSize = ""; drawMap(); render(); });
})();
