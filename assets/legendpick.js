// 지도 범례를 누르면 그 색 구간에 든 지역(또는 점)만 지도에 남기고 나머지는 흐리게 한다 (지도가 있는 탭 공용).
// 다시 누르면 모두 보인다. 범례 칸의 색과 지도 도형의 fill 색이 같은 것을 고르므로 탭마다 따로 손댈 것이 없다.
// 지역·연도를 바꿔 범례가 다시 그려져도 같은 지표면 고른 구간을 이어 가고, 지표가 바뀌면(범례 제목이 바뀌면) 푼다.
(() => {
  const legend = document.getElementById("legend"), map = document.getElementById("map");
  if (!legend || !map || !window.d3) return;
  const hex = (c) => { const x = c && c !== "none" && d3.color(c); return x ? x.formatHex() : null; };
  const rowsOf = () => [...legend.querySelectorAll(".row")].filter((r) => r.querySelector(".sw"));
  const colorOf = (r) => hex(r.querySelector(".sw").style.background);
  let pick = null, title = null, raf = 0;

  function apply() {
    const t = legend.querySelector(".title")?.textContent ?? "";
    if (t !== title) { title = t; pick = null; }
    const rows = rowsOf(), colors = new Set(rows.map(colorOf));
    if (pick && !colors.has(pick)) pick = null;
    for (const r of rows) {
      const on = colorOf(r) === pick;
      r.classList.add("lp");
      r.classList.toggle("lp-on", on);
      r.classList.toggle("lp-dim", !!pick && !on);
      r.setAttribute("role", "button");
      r.setAttribute("aria-pressed", on);
      r.tabIndex = 0;
      r.title = on ? "다시 누르면 모두 보기" : "누르면 이 구간만 지도에";
    }
    for (const el of map.querySelectorAll(".region, circle.af-dot")) {
      const f = hex(el.getAttribute("fill"));
      el.classList.toggle("lp-off", !!pick && colors.has(f) && f !== pick);
    }
  }
  const queue = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; apply(); }); };
  const toggle = (r) => { const c = colorOf(r); pick = pick === c ? null : c; apply(); };

  legend.addEventListener("click", (e) => { const r = e.target.closest(".row"); if (r?.querySelector(".sw")) toggle(r); });
  legend.addEventListener("keydown", (e) => {
    const r = e.target.closest(".row");
    if (r?.querySelector(".sw") && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggle(r); }
  });
  // 범례가 다시 그려지거나 지도 색이 바뀌면 다시 맞춘다
  new MutationObserver(queue).observe(legend, { childList: true, subtree: true });
  new MutationObserver(queue).observe(map, { subtree: true, childList: true, attributes: true, attributeFilter: ["fill"] });
  queue();
})();
