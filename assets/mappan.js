// 지도 끌어 옮기기·휠 확대 (확대 단추가 없는 탭 공용: 농경지 토양·축산 환경·농업금융보험·농업고용·농사용 전기)
// 마우스로 끌면 지도가 따라 움직이고, 휠(트랙패드 벌리기)로 확대·축소한다. 지역을 다시 고르면 그 지역 시점으로 돌아간다.
// 한 화면 맞춤(넓은 화면)에서는 휠이 곧 확대이고, 페이지가 스크롤되는 좁은 화면에서는 Ctrl+휠로 확대해 스크롤을 뺏지 않는다.
// 터치는 손가락으로 페이지를 내리도록 쓰지 않는다. 4px 안쪽으로 움직인 것은 그대로 클릭이다.
window.rstatPan = (svg, onPan) => {
  const wrap = svg.node().closest(".map-wrap");
  const FIT = window.matchMedia("(min-width: 1281px) and (min-height: 720px)");
  let silent = false;
  const zoom = d3.zoom()
    .scaleExtent([1, 48])
    .clickDistance(4)
    .filter((e) => (e.type === "mousedown" && !e.button) || (e.type === "wheel" && (FIT.matches || e.ctrlKey)))
    .on("start", (e) => { if (e.sourceEvent?.type === "mousedown") wrap?.classList.add("grabbing"); })
    .on("zoom", (e) => { if (!silent && e.sourceEvent) onPan(e.transform); })
    .on("end", () => wrap?.classList.remove("grabbing"));
  svg.call(zoom).on("dblclick.zoom", null)
    .on("touchstart.zoom touchmove.zoom touchend.zoom touchcancel.zoom", null)
    .style("touch-action", null); // 폰에서는 손가락으로 페이지를 내린다
  // 지역을 골라 시점을 새로 정하면 끌기·확대의 출발점도 그 시점에 맞춘다 (안 그러면 처음 움직일 때 튄다)
  return { sync(t) { silent = true; svg.call(zoom.transform, t); silent = false; } };
};
