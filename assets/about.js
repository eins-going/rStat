// 탭 옆 '만든이' 버튼: 만든이 화면(about.html)으로 간다. 모든 화면이 함께 쓴다
(() => {
  const tabs = document.querySelector(".brand-wrap .tabs");
  if (!tabs) return;
  const a = document.createElement("a");
  a.className = "about-btn";
  a.href = "about";
  a.textContent = "만든이";
  if (/\/about(\.html)?$/.test(location.pathname)) a.setAttribute("aria-current", "page");
  tabs.after(a);
})();
