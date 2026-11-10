// 탭 옆 '소개'·'만든이' 버튼: 소개 영상(intro.html)과 만든이 화면(about.html)으로 간다. 모든 화면이 함께 쓴다
(() => {
  const tabs = document.querySelector(".brand-wrap .tabs");
  if (!tabs) return;
  const btn = (href, text, re, cls) => {
    const a = document.createElement("a");
    a.className = `about-btn ${cls}`;
    a.href = href;
    a.textContent = text;
    if (re.test(location.pathname)) a.setAttribute("aria-current", "page");
    return a;
  };
  const intro = btn("intro", "소개", /\/intro(\.html)?$/, "intro-btn");
  const maker = btn("about", "만든이", /\/about(\.html)?$/, "maker-btn");
  tabs.before(intro); // 소개는 주요통계 앞
  tabs.after(maker);
  // 좁은 화면에서 탭 줄이 넘치면 지금 화면 탭이 보이게 민다
  const cur = tabs.querySelector('[aria-current="page"]');
  if (cur && tabs.scrollWidth > tabs.clientWidth) tabs.scrollLeft = cur.offsetLeft - (tabs.clientWidth - cur.offsetWidth) / 2;
})();
