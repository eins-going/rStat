// 탭 옆 '만든이' 버튼: 누르면 만든이·연락처 창 (바깥을 누르거나 Esc로 닫힘). 모든 화면이 함께 쓴다
(() => {
  const tabs = document.querySelector(".brand-wrap .tabs");
  if (!tabs) return;
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "about-btn";
  btn.textContent = "만든이";
  btn.setAttribute("popovertarget", "about");
  const pop = document.createElement("div");
  pop.id = "about";
  pop.className = "about-pop";
  pop.setAttribute("popover", "");
  pop.innerHTML = `<img src="assets/maker.webp" width="76" height="76" alt="Seunghyun Cho 초상 일러스트">
  <dl>
    <dt>만든이</dt><dd>Seunghyun Cho</dd>
    <dt>연락처</dt><dd><a href="mailto:einsgoing@gmail.com">einsgoing@gmail.com</a></dd>
  </dl>`;
  tabs.after(btn);
  document.body.append(pop);
  // 버튼 바로 밑에 띄운다 (화면 밖으로 나가지 않게)
  pop.addEventListener("toggle", (e) => {
    if (e.newState !== "open") return;
    const r = btn.getBoundingClientRect(), w = pop.offsetWidth;
    pop.style.top = `${r.bottom + 6}px`;
    pop.style.left = `${Math.max(8, Math.min(innerWidth - w - 8, r.left))}px`;
  });
})();
