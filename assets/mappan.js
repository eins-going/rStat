// 지도 끌어 옮기기·확대 (확대 단추가 따로 없던 탭 공용: 농경지 토양·축산 환경·농업금융보험·농업고용·농사용 전기·지역산업연관표)
// 마우스로 끌면 지도가 따라 움직이고, 휠(트랙패드 벌리기)로 확대·축소한다. 지역을 다시 고르면 그 지역 시점으로 돌아간다.
// 한 화면 맞춤(넓은 화면)에서는 휠이 곧 확대이고, 페이지가 스크롤되는 좁은 화면에서는 Ctrl+휠로 확대해 스크롤을 뺏지 않는다.
// 오른쪽 아래에 주요 통계와 같은 단추(+ − 손 맞춤)를 단다. 손을 켜면 터치 끌기와 Ctrl 없는 휠도 된다. 4px 안쪽 움직임은 클릭이다.
// rstatPan(svg, onPan(t), onHome()) — onHome은 '맞춤' 단추: 고른 지역의 원래 시점으로 (그 안에서 sync를 부른다)
window.rstatPan = (svg, onPan, onHome) => {
  const wrap = svg.node().closest(".map-wrap");
  const FIT = window.matchMedia("(min-width: 1281px) and (min-height: 720px)");
  let silent = false, panMode = false, base = d3.zoomIdentity, cur = d3.zoomIdentity;
  const zoom = d3.zoom()
    .scaleExtent([1, 48])
    .clickDistance(4)
    .filter((e) => !e.button && ((e.type === "mousedown") || (e.type === "wheel" && (FIT.matches || e.ctrlKey || panMode)) || (e.type === "touchstart" && panMode)))
    .on("start", (e) => { if (e.sourceEvent?.type === "mousedown") wrap?.classList.add("grabbing"); })
    .on("zoom", (e) => { cur = e.transform; if (!silent) onPan(e.transform); syncCtl(); })
    .on("end", () => wrap?.classList.remove("grabbing"));
  svg.call(zoom).on("dblclick.zoom", null);
  const setTouch = () => svg.style("touch-action", panMode ? "none" : null); // 손을 끄면 폰에서는 손가락으로 페이지를 내린다
  setTouch();

  // 단추 (주요 통계 index.html과 같은 모양)
  const ICON = {
    in: '<path d="M12 5v14M5 12h14"/>',
    out: '<path d="M5 12h14"/>',
    pan: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V12"/><path d="M11 11.5v-7a1.5 1.5 0 0 1 3 0V12"/><path d="M14 6.5a1.5 1.5 0 0 1 3 0V12"/><path d="M17 8.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.6a6 6 0 0 1-4.6-2.2L4.3 14.5a1.6 1.6 0 0 1 2.4-2.1L8 13.8"/>',
    fit: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
  };
  const ctl = document.createElement("div");
  ctl.className = "zoom-ctl";
  ctl.setAttribute("role", "group");
  ctl.setAttribute("aria-label", "지도 확대·이동");
  const btn = (k, label, extra = "") => `<button type="button" data-z="${k}" aria-label="${label}" title="${label}"${extra}><svg viewBox="0 0 24 24" aria-hidden="true">${ICON[k]}</svg></button>`;
  ctl.innerHTML = btn("in", "확대") + btn("out", "축소") + btn("pan", "끌어서 이동 (폰 손가락·휠로 확대)", ' aria-pressed="false"') + btn("fit", "원래 크기로", " disabled");
  wrap?.append(ctl);
  const $b = (k) => ctl.querySelector(`[data-z="${k}"]`);
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const zoomBy = (f) => svg.interrupt().transition().duration(reduce ? 0 : 280).call(zoom.scaleBy, f);
  $b("in").addEventListener("click", () => zoomBy(1.6));
  $b("out").addEventListener("click", () => zoomBy(1 / 1.6));
  $b("fit").addEventListener("click", () => onHome?.());
  $b("pan").addEventListener("click", (e) => {
    panMode = !panMode;
    e.currentTarget.setAttribute("aria-pressed", panMode);
    wrap?.classList.toggle("panning", panMode);
    setTouch();
  });
  function syncCtl() {
    const [k0, k1] = zoom.scaleExtent();
    $b("in").disabled = cur.k >= k1 - 1e-6;
    $b("out").disabled = cur.k <= k0 + 1e-6;
    $b("fit").disabled = Math.abs(cur.k - base.k) < 1e-3 && Math.abs(cur.x - base.x) < 0.5 && Math.abs(cur.y - base.y) < 0.5;
  }
  // 지역을 골라 시점을 새로 정하면 끌기·확대의 출발점과 '맞춤' 기준도 그 시점에 맞춘다 (안 그러면 처음 움직일 때 튄다)
  return {
    sync(t) { base = t; silent = true; svg.interrupt().call(zoom.transform, t); silent = false; cur = t; syncCtl(); },
  };
};
