// 모든 화면이 함께 쓰는 것: 용어 설명·자료 내려받기 불러오기, 탭 옆 '소개'·'만든이' 단추(HTML에 없을 때만), 탭 줄 밀기
(() => {
  // 용어 설명(마우스를 올리면 보이는 짧은 설명)
  if (!document.querySelector('script[src$="glossary.js"]')) {
    const g = document.createElement("script");
    g.src = "assets/glossary.js?v=2";
    document.body.appendChild(g);
  }
  // 자료 내려받기 (화면 JS가 window.RSTAT_EXPORT를 두면 바닥글에 링크가 생긴다)
  if (!document.querySelector('script[src*="export.js"]')) {
    const x = document.createElement("script");
    x.src = "assets/export.js?v=1";
    document.body.appendChild(x);
  }
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
  // 단추는 각 화면 HTML에 처음부터 들어 있다(나중에 끼우면 탭 줄이 밀려 화면이 흔들린다). 없는 화면에서만 만든다
  const wrap = tabs.parentElement;
  if (!wrap.querySelector(".intro-btn")) tabs.before(btn("intro", "소개", /\/intro(\.html)?$/, "intro-btn")); // 소개는 주요통계 앞
  if (!wrap.querySelector(".maker-btn")) tabs.after(btn("about", "만든이", /\/about(\.html)?$/, "maker-btn"));
  // 좁은 화면에서 탭 줄이 넘치면 지금 화면 탭이 보이게 민다
  const cur = tabs.querySelector('[aria-current="page"]');
  if (cur && tabs.scrollWidth > tabs.clientWidth) tabs.scrollLeft = cur.offsetLeft - (tabs.clientWidth - cur.offsetWidth) / 2;
})();
