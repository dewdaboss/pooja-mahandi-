/* =========================================================================
   POOJA BRIDAL MEHNDI — app logic
   Sab content assets/js/site-config.js se aata hai.
   Yeh file index.html aur portfolio.html dono par chalti hai.
   ========================================================================= */
(function () {
  "use strict";

  const cfg = window.SITE;
  if (!cfg) return;

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const PHONE_TEL = "tel:+" + cfg.whatsapp;

  // "Bridal Package — Haath + Pair" -> "Bridal"
  function shortName(cat) {
    return cat.name.split(" — ")[0].split(" & ")[0].trim();
  }

  /* =====================================================================
     1. WHATSAPP LINKS
     ===================================================================== */
  const waMessages = {
    default: `Namaste Pooja ji 🙏 Maine aapki website dekhi (Pooja Bridal Mehndi, Indore). Mehndi ke baare mein jaankari chahiye.`,
    hero: `Namaste Pooja ji 🙏 Mujhe mehndi lagwani hai. Website par design ₹200 se dikha hai — details aur available date bata dijiye.`,
    bar: `Namaste Pooja ji 🙏 Mehndi book karni hai. Kab available hain?`,
    fab: `Namaste Pooja ji 🙏 Mehndi ka rate aur date puchhna hai.`,
    footer: `Namaste Pooja ji 🙏 Website se aa rahi hoon, mehndi ke liye baat karni hai.`,
    final: `Namaste Pooja ji 🙏 Mujhe mehndi lagwani hai. Aapki next available date kya hai?`,
    about: `Namaste Pooja ji 🙏 Aapki designs dekh kar message kar rahi/raha hoon. Bridal mehndi ke baare mein baat karni hai.`,
    portfolio: `Namaste Pooja ji 🙏 Aapki portfolio dekhi — designs bahut sundar hain. Ek design pasand aaya hai, uske rate aur date ki jaankari chahiye.`,
    bridal: `Namaste Pooja ji 🙏 Mujhe *Bridal Mehndi* chahiye (haath + pair). Meri shaadi ki date ke liye availability aur package rate bata dijiye.`,
  };

  function waLink(key, extra) {
    const msg = extra || waMessages[key] || waMessages.default;
    return `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  function categoryMessage(cat) {
    return `Namaste Pooja ji 🙏 Mujhe *${cat.name}* design chahiye (${cat.price} se shuru). Kya rate aur available date bata dijiye?`;
  }

  // Saare data-wa elements
  $$("[data-wa]").forEach((el) => {
    el.href = waLink(el.getAttribute("data-wa"));
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Instagram
  $$("[data-instagram]").forEach((el) => {
    el.href = cfg.instagramUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  // Call links (number badalne par HTML chhedna na pade)
  $$("[data-call]").forEach((el) => { el.href = PHONE_TEL; });

  /* =====================================================================
     2. HEADER + MOBILE NAV
     ===================================================================== */
  const header = $("#header");
  const nav = $("#nav");
  const menuBtn = $("#menuBtn");

  function closeNav() {
    if (!nav || !menuBtn) return;
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("is-locked");
  }

  if (menuBtn && nav) {
    menuBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.classList.toggle("is-locked", open);
    });
    $$("a", nav).forEach((a) => a.addEventListener("click", closeNav));
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeNav();
      closeLightbox();
    }
  });

  if (header) {
    const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* =====================================================================
     3. YEAR
     ===================================================================== */
  $$("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });

  /* =====================================================================
     4. SERVICE / PRICE CARDS  (index)
     ===================================================================== */
  const serviceWrap = $("#serviceCards");
  if (serviceWrap) {
    serviceWrap.innerHTML = cfg.categories
      .map((cat, i) => {
        const points = cat.points.map((p) => `<li>${p}</li>`).join("");
        const badge = cat.feature ? `<span class="card__badge">${cat.tag}</span>` : "";
        return `
        <article class="card${cat.feature ? " card--feature" : ""} reveal reveal--d${Math.min(i + 1, 5)}">
          ${badge}
          <div class="card__top">
            <h3 class="card__title">${cat.name}</h3>
            <p class="card__price"><span>shuru</span> ${cat.price}</p>
          </div>
          <p class="level level--card">
            <span class="level__dots" aria-hidden="true">${Array.from({ length: 5 }, (_, k) => `<span class="level__dot${k < Math.max(1, Math.min(5, cat.level || 1)) ? " is-on" : ""}"></span>`).join("")}</span>
            <span class="level__label">${"Kitni mehndi".replace("K", "k")}</span>
          </p>
          <p class="card__desc">${cat.blurb}</p>
          <ul class="card__list">${points}</ul>
          <a class="card__cta" href="${waLink(null, categoryMessage(cat))}" target="_blank" rel="noopener">
            ${cat.feature ? "Bridal date block karein" : "Rate &amp; date puchhein"}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 5l7 7-7 7-1.4-1.4 4.6-4.6H4v-2h12.2L11.6 6.4 13 5Z"/></svg>
          </a>
        </article>`;
      })
      .join("");
  }

  /* =====================================================================
     5. PORTFOLIO — filters + gallery (index)
     ===================================================================== */
  const galleryEl = $("#gallery");
  const filtersEl = $("#filters");
  const zoomIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 13 15.1l.3.3v.8l5 5 1.5-1.5-5-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>';

  // index par sirf 8 chune hue designs (page halka rahe)
  const teaserSlugs = ["minimal", "festive", "arabic", "portrait", "rajwadi"];
  const teaser = [];
  teaserSlugs.forEach((slug) => {
    const items = cfg.gallery.filter((g) => g.cat === slug).slice(0, 2);
    items.forEach((it) => teaser.push(Object.assign({}, it, { index: cfg.gallery.indexOf(it) })));
  });
  const pickFeatured = teaser.slice(0, 8);

  function cardMarkup(item, i) {
    return `
      <button type="button" class="gcard" data-cat="${item.cat}" data-index="${item.index}" style="animation-delay:${Math.min(i, 8) * 45}ms" aria-label="${item.title} — photo bada karein">
        <img src="${item.thumb}" alt="${item.alt}" loading="lazy" decoding="async" width="480" height="640" />
        <span class="gcard__zoom">${zoomIcon}</span>
        <span class="gcard__label">${item.title}</span>
      </button>`;
  }

  // image fade-in jab load ho jaye
  document.addEventListener("load", (e) => {
    const img = e.target;
    if (img.tagName === "IMG" && img.closest(".gcard")) img.classList.add("is-loaded");
  }, true);

  if (galleryEl && filtersEl) {
    // filters
    filtersEl.innerHTML =
      `<button type="button" class="filter is-active" data-filter="all" aria-pressed="true">Sab</button>` +
      cfg.categories
        .filter((c) => !c.noGallery)
        .map((c) => `<button type="button" class="filter" data-filter="${c.slug}" aria-pressed="false">${shortName(c)}</button>`)
        .join("");

    galleryEl.innerHTML = pickFeatured.map((it, i) => cardMarkup(it, i)).join("");

    filtersEl.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      $$(".filter", filtersEl).forEach((f) => {
        f.classList.toggle("is-active", f === btn);
        f.setAttribute("aria-pressed", String(f === btn));
      });
      const cat = btn.dataset.filter;
      $$(".gcard", galleryEl).forEach((card) => {
        card.classList.toggle("is-hidden", !(cat === "all" || card.dataset.cat === cat));
      });
    });
  }

  /* =====================================================================
     6. PORTFOLIO PAGE — category sections
     ===================================================================== */
  const sectionsWrap = $("#portfolioSections");
  const jumpNav = $("#portfolioJump");

  if (sectionsWrap) {
    const cats = cfg.categories.filter((c) => !c.noGallery);
    sectionsWrap.innerHTML = cats
      .map((cat, i) => {
        const items = cfg.gallery
          .filter((g) => g.cat === cat.slug)
          .map((it) => Object.assign({}, it, { index: cfg.gallery.indexOf(it) }));
        if (!items.length) return "";
        const points = cat.points.map((p) => `<li>${p}</li>`).join("");
        const level = Math.max(1, Math.min(5, cat.level || 1));
        const dots = Array.from({ length: 5 }, (_, k) =>
          `<span class="level__dot${k < level ? " is-on" : ""}"></span>`).join("");
        const levelWord = ["", "Bahut halki", "Halki", "Medium", "Bharpoor", "Poori bridal"][level];
        return `
        <section class="psection" id="${cat.slug}">
          <div class="container">
            <header class="psection__head">
              <span class="psection__num">${String(i + 1).padStart(2, "0")}</span>
              <div class="psection__text">
                <p class="eyebrow">${cat.tag}</p>
                <h2 class="psection__title">${cat.name}</h2>
                <p class="psection__blurb">${cat.blurb}</p>
                <p class="level" aria-label="Mehndi coverage ${level} out of 5">
                  <span class="level__label">Kitni mehndi:</span>
                  <span class="level__dots" aria-hidden="true">${dots}</span>
                  <span class="level__word">${levelWord}</span>
                </p>
                <ul class="psection__points">${points}</ul>
              </div>
              <div class="psection__meta">
                <p class="psection__price"><span>shuru</span> ${cat.price}</p>
                <p class="psection__time">${cat.time}</p>
                <a class="btn btn--wine btn--sm" href="${waLink(null, categoryMessage(cat))}" target="_blank" rel="noopener">
                  Rate &amp; date puchhein
                </a>
              </div>
            </header>
            <div class="pgallery">
              ${items.map((it, idx) => `
                <button type="button" class="gcard" data-cat="${it.cat}" data-index="${it.index}" style="animation-delay:${Math.min(idx, 6) * 55}ms" aria-label="${it.title} — photo bada karein">
                  <img src="${it.thumb}" alt="${it.alt}" loading="lazy" decoding="async" width="480" height="640" />
                  <span class="gcard__zoom">${zoomIcon}</span>
                  <span class="gcard__label">${it.title}</span>
                </button>`).join("")}
            </div>
          </div>
        </section>`;
      })
      .join("");

    if (jumpNav) {
      jumpNav.innerHTML = cfg.categories
        .filter((c) => !c.noGallery)
        .map((c) => `<a class="jump__link" href="#${c.slug}">${shortName(c)}<span>${c.price}</span></a>`)
        .join("");
    }
  }

  /* =====================================================================
     7. LIGHTBOX
     ===================================================================== */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  let lbIndex = 0;
  let lbList = [];
  let lbScope = "visible"; // "visible" | "cat"
  let lastFocus = null;

  function openLightbox(card) {
    const all = $$(".gcard");
    lbScope = sectionsWrap ? "cat" : "visible";
    lbList = all.filter((c) =>
      lbScope === "cat"
        ? c.dataset.cat === card.dataset.cat
        : !c.classList.contains("is-hidden")
    );
    lbIndex = lbList.indexOf(card);
    if (lbIndex < 0) { lbList = [card]; lbIndex = 0; }
    paintLightbox();
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.classList.add("is-locked");
    $("#lbClose").focus();
  }

  function paintLightbox() {
    const card = lbList[lbIndex];
    if (!card) return;
    const item = cfg.gallery[Number(card.dataset.index)];
    lbImg.src = item.src;
    lbImg.alt = item.alt;
    lbCap.textContent = `${item.title}  ·  ${lbIndex + 1}/${lbList.length}`;
  }

  function closeLightbox() {
    if (!lb || lb.hidden) return;
    lb.hidden = true;
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }

  function stepLightbox(dir) {
    if (!lbList.length) return;
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    paintLightbox();
  }

  if (lb) {
    document.addEventListener("click", (e) => {
      const card = e.target.closest(".gcard");
      if (card) openLightbox(card);
    });
    $("#lbClose").addEventListener("click", closeLightbox);
    $("#lbPrev").addEventListener("click", () => stepLightbox(-1));
    $("#lbNext").addEventListener("click", () => stepLightbox(1));
    lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", (e) => {
      if (lb.hidden) return;
      if (e.key === "ArrowRight") stepLightbox(1);
      if (e.key === "ArrowLeft") stepLightbox(-1);
    });

    let touchX = null;
    lb.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 45) stepLightbox(dx < 0 ? 1 : -1);
      touchX = null;
    }, { passive: true });
  }

  /* =====================================================================
     8. REVIEWS
     ===================================================================== */
  const reviewsSection = $("#reviews");
  const reviewsList = $("#reviewsList");

  if (reviewsSection && cfg.showReviews && cfg.reviews.length) {
    reviewsSection.hidden = false;
    const star =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2 2.6 6.1 6.6.6-5 4.3 1.5 6.5L12 16.2 6.3 19.5l1.5-6.5-5-4.3 6.6-.6L12 2Z"/></svg>';
    reviewsList.innerHTML = cfg.reviews
      .map(
        (r) => `
      <article class="review reveal">
        <div class="review__stars" aria-label="5 out of 5 stars">${star.repeat(5)}</div>
        <p class="review__text">“${r.text}”</p>
        <div class="review__who">
          <span class="review__avatar" aria-hidden="true">${r.name.charAt(0)}</span>
          <span>
            <span class="review__name">${r.name}</span><br />
            <span class="review__detail">${r.detail}</span>
          </span>
        </div>
      </article>`
      )
      .join("");
  }

  // Reviews off hain to unke links bhi hata dein (dead link na rahe)
  if (!reviewsSection || reviewsSection.hidden) {
    $$('a[href="#reviews"]').forEach((a) => a.remove());
  }

  /* =====================================================================
     9. AREAS
     ===================================================================== */
  const areasList = $("#areasList");
  if (areasList) {
    areasList.innerHTML = cfg.areas.map((a) => `<li>${a}</li>`).join("");
  }

  /* =====================================================================
     10. BOOKING FORM
     ===================================================================== */
  const form = $("#bookForm");
  const serviceSelect = $("#f-service");
  const areaSelect = $("#f-area");
  const dateInput = $("#f-date");

  if (serviceSelect) {
    cfg.serviceOptions.forEach((opt) => {
      const o = document.createElement("option");
      o.value = opt;
      o.textContent = opt;
      serviceSelect.appendChild(o);
    });
  }

  if (areaSelect) {
    cfg.areas
      .filter((a) => !a.toLowerCase().includes("poore"))
      .forEach((a) => {
        const o = document.createElement("option");
        o.value = a;
        o.textContent = a;
        areaSelect.appendChild(o);
      });
    const other = document.createElement("option");
    other.value = "Koi aur area";
    other.textContent = "Koi aur area";
    areaSelect.appendChild(other);
  }

  if (dateInput) {
    const today = new Date();
    const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
    dateInput.min = iso;
  }

  function prettyDate(value) {
    if (!value) return "";
    const d = new Date(value + "T00:00:00");
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get("name") || "").toString().trim();
      const service = data.get("service") || "";
      const date = data.get("date") || "";
      const area = data.get("area") || "";
      const msg = (data.get("message") || "").toString().trim();

      if (!name) {
        const f = $("#f-name");
        f.setCustomValidity("Apna naam likhein");
        f.reportValidity();
        f.setCustomValidity("");
        f.focus();
        return;
      }
      if (!service) {
        serviceSelect.reportValidity();
        return;
      }

      let text = `Namaste Pooja ji 🙏\n\nMujhe mehndi book karni hai.\n\n`;
      text += `*Naam:* ${name}\n`;
      text += `*Design:* ${service}\n`;
      if (date) text += `*Date:* ${prettyDate(date)}\n`;
      if (area) text += `*Area:* ${area}\n`;
      if (msg) text += `*Message:* ${msg}\n`;
      text += `\n(Website se bheja gaya)`;

      window.open(waLink(null, text), "_blank", "noopener");
    });
  }

  /* =====================================================================
     11. SCROLL REVEAL + MOTION EXTRAS
     ===================================================================== */
  // auto stagger: ek hi parent ke andar reveal wale bachche
  $$(".cards, .steps, .reviews, .pgallery").forEach((grid) => {
    $$(":scope > .reveal", grid).forEach((el, i) => {
      if (!el.style.getPropertyValue("--d")) el.style.setProperty("--d", `${i * 70}ms`);
    });
  });

  // headings ko animate karna hai — head ko bhi reveal banao
  $$(".section__head, .psection__head").forEach((el) => el.classList.add("reveal"));

  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  // card hover par gold sheen follow kare
  $$(".card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  // scroll progress line
  const progress = document.createElement("div");
  progress.className = "scrollbar-progress";
  document.body.appendChild(progress);
  const updateProgress = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${h > 0 ? Math.min(window.scrollY / h, 1) : 0})`;
  };
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });

  // smooth page transition (internal links)
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const veil = document.createElement("div");
    veil.className = "page-veil";
    veil.innerHTML = `<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="30 100"/><circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width=".6" opacity=".5"/></svg>`;
    document.body.appendChild(veil);

    document.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (a.target === "_blank" || a.hasAttribute("download")) return;
      if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) return;
      if (!/^[\w./-]+\.html/.test(href) && !/^\/?$/.test(href)) return;
      // same-page anchor
      if (href.split("#")[0] === window.location.pathname.split("/").pop()) return;
      e.preventDefault();
      veil.classList.add("is-on");
      setTimeout(() => { window.location.href = href; }, 320);
    });
  }

  /* =====================================================================
     12. ACTIVE NAV ON SCROLL
     ===================================================================== */
  const sections = ["portfolio", "services", "about", "reviews", "faq"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  const navLinks = $$('.nav a[href^="#"]').filter((a) => !a.classList.contains("nav__cta"));

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.id;
          navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`));
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => spy.observe(s));
  }
})();
