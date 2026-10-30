/* =========================================================================
   POOJA BRIDAL MEHNDI — mobile.js
   Mobile app-jaisa experience: bottom sheet, swiping carousels, quiz,
   line-art draw animation, tap ripple, active app-bar item.
   ========================================================================= */
(function () {
  "use strict";

  const cfg = window.SITE;
  if (!cfg) return;

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const mqMobile = window.matchMedia("(max-width: 899px)");
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const money = (n) => "₹" + Math.round(n).toLocaleString("en-IN");
  const catOf = (slug) => cfg.categories.find((c) => c.slug === slug);

  /* =====================================================================
     1. APP BAR — active item follow kare
     ===================================================================== */
  const appItems = $$(".appbar__item");
  if (appItems.length) {
    const sections = [
      { id: "top", el: document.querySelector(".hero") },
      { id: "estimate", el: $("#estimate") },
    ].filter((x) => x.el);

    if ("IntersectionObserver" in window && sections.length) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            appItems.forEach((a) => {
              const href = a.getAttribute("href") || "";
              const on = href === `#${en.target.id}`;
              a.classList.toggle("is-active", on);
              if (on) a.setAttribute("aria-current", "page");
              else a.removeAttribute("aria-current");
            });
          });
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      sections.forEach((s) => io.observe(s.el));
    }
  }

  /* =====================================================================
     2. SWIPE CAROUSELS — dots + hint
     ===================================================================== */
  const carouselTargets = ["#serviceCards", "#addonsList", "#gallery", ".pgallery"];

  function buildDots(container) {
    const isDark = !!container.closest(".section--wine, .band, .drawsection");
    const dots = document.createElement("div");
    dots.className = "cdots" + (isDark ? " cdots--dark" : "");
    const n = Math.min(container.children.length, 8);
    for (let i = 0; i < n; i++) {
      const d = document.createElement("span");
      d.className = "cdots__dot" + (i === 0 ? " is-on" : "");
      dots.appendChild(d);
    }
    container.parentNode.insertBefore(dots, container.nextSibling);

    const update = () => {
      const max = container.scrollWidth - container.clientWidth;
      const p = max > 0 ? container.scrollLeft / max : 0;
      const idx = Math.round(p * (n - 1));
      $$(".cdots__dot", dots).forEach((d, i) => d.classList.toggle("is-on", i === idx));
    };
    container.addEventListener("scroll", update, { passive: true });
    update();
    return dots;
  }

  carouselTargets.forEach((sel) => {
    $$(sel).forEach((box) => {
      if (!mqMobile.matches) return;
      if (box.dataset.dots) return;
      box.dataset.dots = "1";
      buildDots(box);
    });
  });

  /* =====================================================================
     3. TAP RIPPLE (henna drop) — mobile only
     ===================================================================== */
  document.addEventListener(
    "pointerdown",
    (e) => {
      if (!mqMobile.matches || reduced()) return;
      const t = e.target.closest(".card, .chip, .quick, .gcard, .btn, .quiz__opt, .addon");
      if (!t) return;
      t.classList.add("tapable");
      const r = t.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 1.2;
      const span = document.createElement("span");
      span.className = "ripple";
      span.style.width = span.style.height = size + "px";
      span.style.left = e.clientX - r.left - size / 2 + "px";
      span.style.top = e.clientY - r.top - size / 2 + "px";
      t.appendChild(span);
      setTimeout(() => span.remove(), 620);
    },
    { passive: true }
  );

  /* =====================================================================
     4. BOTTOM SHEET for designs (mobile)
     ===================================================================== */
  const sheet = document.createElement("div");
  sheet.className = "sheet";
  sheet.hidden = true;
  sheet.setAttribute("role", "dialog");
  sheet.setAttribute("aria-modal", "true");
  sheet.setAttribute("aria-label", "Design details");
  sheet.innerHTML = `
    <div class="sheet__panel">
      <span class="sheet__grab" aria-hidden="true"></span>
      <button type="button" class="sheet__close" aria-label="Close">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 10.6 5-5 1.4 1.4-5 5 5 5-1.4 1.4-5-5-5 5-1.4-1.4 5-5-5-5L7.6 5.6l4.4 5Z"/></svg>
      </button>
      <figure class="sheet__figure">
        <span class="sheet__badge" id="sheetCat">Bridal</span>
        <img id="sheetImg" src="" alt="" />
      </figure>
      <h2 class="sheet__title" id="sheetTitle"></h2>
      <p class="sheet__meta" id="sheetMeta"></p>
      <div class="sheet__nav">
        <button type="button" class="sheet__navbtn" id="sheetPrev">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7 1.4-1.4L10.8 12l5.6-5.6L15 5Z"/></svg> Pichhla
        </button>
        <button type="button" class="sheet__navbtn" id="sheetNext">
          Agla <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7-1.4-1.4L13.2 12 7.6 6.4 9 5Z"/></svg>
        </button>
      </div>
      <div class="sheet__actions">
        <a class="btn btn--whatsapp btn--block" id="sheetCta" href="#" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.7-6.1c-.3-.1-1.7-.8-1.9-.9s-.4-.1-.6.1-.7.9-.9 1-.3.2-.5 0a6.7 6.7 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5-.7-1.6-.9-2.2-.4-.5-.6-.5h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2 5 5 0 0 0 1 2.6 11 11 0 0 0 4.3 3.8 10 10 0 0 0 1.4.5 3.4 3.4 0 0 0 1.6.1 2.7 2.7 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.6-.3Z"/></svg>
          Is design ka rate puchhein
        </a>
        <a class="btn btn--text" id="sheetSeeAll" href="portfolio.html">Poora portfolio dekhein →</a>
      </div>
    </div>`;
  document.body.appendChild(sheet);

  const sImg = $("#sheetImg", sheet);
  const sTitle = $("#sheetTitle", sheet);
  const sMeta = $("#sheetMeta", sheet);
  const sCat = $("#sheetCat", sheet);
  const sCta = $("#sheetCta", sheet);

  let list = [];
  let idx = 0;

  function paint() {
    const card = list[idx];
    if (!card) return;
    const item = cfg.gallery[Number(card.dataset.index)];
    if (!item) return;
    const cat = catOf(item.cat);
    sImg.src = item.src;
    sImg.alt = item.alt;
    sTitle.textContent = item.title;
    sCat.textContent = cat ? cat.name : "Design";
    sMeta.textContent = cat
      ? `${cat.price} se · ${cat.time} · ${cat.level >= 4 ? "Detail-heavy design" : "Light design"}`
      : "";
    const msg = `Namaste Pooja ji 🙏\n\nMujhe ye design pasand aaya:\n\n*Design:* ${item.title}\n*Category:* ${cat ? cat.name : ""} (${cat ? cat.price : ""} se)\n\nIska exact rate aur available date bata dijiye.`;
    sCta.href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  function openSheet(card) {
    const siblings = $$(".gcard").filter(
      (c) => c.dataset.cat === card.dataset.cat && !c.classList.contains("is-hidden")
    );
    list = siblings.length ? siblings : [card];
    idx = list.indexOf(card);
    if (idx < 0) idx = 0;
    paint();
    sheet.hidden = false;
    document.body.classList.add("is-locked");
    requestAnimationFrame(() => sheet.classList.add("is-open"));
    if (navigator.vibrate) navigator.vibrate(8);
  }

  function closeSheet() {
    sheet.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    setTimeout(() => { sheet.hidden = true; }, 300);
  }

  // app.js ke lightbox ko rok kar mobile par sheet kholo
  document.addEventListener(
    "click",
    (e) => {
      const card = e.target.closest(".gcard");
      if (!card) return;
      if (!mqMobile.matches) return;
      e.preventDefault();
      e.stopPropagation();
      openSheet(card);
    },
    true
  );

  $(".sheet__close", sheet).addEventListener("click", closeSheet);
  sheet.addEventListener("click", (e) => { if (e.target === sheet) closeSheet(); });
  $("#sheetPrev", sheet).addEventListener("click", () => {
    idx = (idx - 1 + list.length) % list.length;
    paint();
  });
  $("#sheetNext", sheet).addEventListener("click", () => {
    idx = (idx + 1) % list.length;
    paint();
  });

  // swipe down = close, left/right = next/prev
  let sy = null, sx = null;
  sheet.addEventListener("touchstart", (e) => {
    sy = e.touches[0].clientY;
    sx = e.touches[0].clientX;
  }, { passive: true });
  sheet.addEventListener("touchend", (e) => {
    if (sy === null) return;
    const dy = e.changedTouches[0].clientY - sy;
    const dx = e.changedTouches[0].clientX - sx;
    if (dy > 90 && Math.abs(dx) < 60) closeSheet();
    else if (Math.abs(dx) > 60) {
      idx = (idx + (dx < 0 ? 1 : -1) + list.length) % list.length;
      paint();
    }
    sy = sx = null;
  }, { passive: true });

  document.addEventListener("keydown", (e) => {
    if (sheet.hidden) return;
    if (e.key === "Escape") closeSheet();
    if (e.key === "ArrowRight") { idx = (idx + 1) % list.length; paint(); }
    if (e.key === "ArrowLeft") { idx = (idx - 1 + list.length) % list.length; paint(); }
  });

  /* =====================================================================
     5. DESIGN MATCH QUIZ
     ===================================================================== */
  const quizStage = $("#quizStage");
  const quizResult = $("#quizResult");
  const quizFill = $("#quizFill");

  if (quizStage) {
    const QUESTIONS = [
      {
        q: "Mehndi kis liye chahiye?",
        opts: [
          { icon: "💍", label: "Shaadi / bridal", hint: "Dulhan ke liye", pick: "bridal" },
          { icon: "🎉", label: "Function / sangeet", hint: "Mehndi party", pick: "halfhand" },
          { icon: "🪔", label: "Tyohaar / regular", hint: "Karwa Chauth, Teej", pick: "festive" },
        ],
      },
      {
        q: "Kitna haath bharna hai?",
        opts: [
          { icon: "🤏", label: "Sirf chhota motif", hint: "Palm ya back of hand", pick: "minimal" },
          { icon: "🖐️", label: "Aadha haath", hint: "Kalai tak", pick: "halfhand" },
          { icon: "🫱", label: "Poora haath", hint: "Forearm tak", pick: "bridal" },
        ],
      },
      {
        q: "Koi special design chahiye?",
        opts: [
          { icon: "👩‍❤️‍👨", label: "Dulha–dulhan figure", hint: "Portrait / couple", pick: "portrait" },
          { icon: "🦚", label: "Peacock / motif", hint: "More, jhumka, lotus", pick: "peacock" },
          { icon: "🌿", label: "Simple aur clean", hint: "Halka design", pick: "floral" },
        ],
      },
    ];

    const answers = [];
    let step = 0;

    function render() {
      quizFill.style.width = `${(step / QUESTIONS.length) * 100}%`;

      if (step >= QUESTIONS.length) {
        showResult();
        return;
      }

      const q = QUESTIONS[step];
      quizStage.innerHTML = `
        <p class="quiz__step">Sawaal ${step + 1} / ${QUESTIONS.length}</p>
        <h3 class="quiz__q">${q.q}</h3>
        <div class="quiz__options">
          ${q.opts
            .map(
              (o, i) => `
            <button type="button" class="quiz__opt" data-pick="${o.pick}" data-i="${i}">
              <span class="quiz__opt-icon" aria-hidden="true">${o.icon}</span>
              <span class="quiz__opt-text">${o.label}<small>${o.hint}</small></span>
            </button>`
            )
            .join("")}
        </div>`;
    }

    quizStage.addEventListener("click", (e) => {
      const btn = e.target.closest(".quiz__opt");
      if (!btn) return;
      btn.classList.add("is-picked");
      if (navigator.vibrate) navigator.vibrate(10);
      answers.push(btn.dataset.pick);
      step += 1;
      quizFill.style.width = `${(step / QUESTIONS.length) * 100}%`;
      setTimeout(() => {
        if (step >= QUESTIONS.length) showResult();
        else render();
      }, 190);
    });

    function showResult() {
      // scoring: answers me jo slug sabse zyada aaye wahi jeete
      const score = {};
      answers.forEach((slug) => { score[slug] = (score[slug] || 0) + 1; });

      // priority: explicit portrait/bridal picks > others
      let winner = answers[answers.length - 1];
      const best = Object.entries(score).sort((a, b) => b[1] - a[1])[0];
      if (best && best[1] >= 2) winner = best[0];
      if (answers.includes("portrait") && !answers.includes("minimal")) winner = "portrait";
      if (answers.includes("bridal") && answers[0] === "bridal") winner = "bridal";

      const cat = catOf(winner) || cfg.categories[0];
      const lvl = Math.max(1, Math.min(5, cat.level || 1));

      $("#quizTitle").textContent = cat.name;
      $("#quizPrice").textContent = `${cat.price} se`;
      $("#quizMeta").textContent = `${cat.time} · ${cat.tag}`;
      $("#quizDots").innerHTML = Array.from({ length: 5 }, (_, i) =>
        `<span class="level__dot${i < lvl ? " is-on" : ""}"></span>`).join("");

      const msg = `Namaste Pooja ji 🙏\n\nMaine website par 60-second match kiya:\n\n*Result:* ${cat.name} (${cat.price} se)\n\nIs design ke liye rate aur available date bata dijiye.`;
      $("#quizCta").href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(msg)}`;

      quizStage.hidden = true;
      quizResult.hidden = false;
      quizFill.style.width = "100%";
      quizResult.style.animation = "none";
      void quizResult.offsetWidth;
      quizResult.style.animation = "";
    }

    function restart() {
      answers.length = 0;
      step = 0;
      quizResult.hidden = true;
      quizStage.hidden = false;
      render();
    }

    $("#quizAgain").addEventListener("click", restart);
    render();
  }

  /* =====================================================================
     6. MEHNDI LINE-ART DRAW ON SCROLL
     ===================================================================== */
  const drawSection = $(".drawsection");
  if (drawSection) {
    if (reduced()) {
      drawSection.classList.add("is-drawn");
    } else if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              drawSection.classList.add("is-drawn");
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.35 }
      );
      io.observe(drawSection);
    } else {
      drawSection.classList.add("is-drawn");
    }
  }

  /* =====================================================================
     7. PULL HINT: pehli baar carousel par nudge
     ===================================================================== */
  if (mqMobile.matches && !reduced()) {
    const first = $("#serviceCards");
    if (first) {
      const wrap = document.createElement("div");
      wrap.className = "swipehint-wrap";
      wrap.innerHTML = '<span class="swipehint"><span aria-hidden="true">👉</span> side mein swipe karein</span>';
      first.parentNode.insertBefore(wrap, first);
      setTimeout(() => { wrap.style.transition = "opacity .5s"; wrap.style.opacity = "0"; }, 6000);
    }
  }
})();
