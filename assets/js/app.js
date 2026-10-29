/* =========================================================================
   POOJA BRIDAL MEHNDI — app logic
   Sab content site-config.js se aata hai.
   ========================================================================= */
(function () {
  "use strict";

  const cfg = window.SITE;
  if (!cfg) return;

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

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
    bridal: `Namaste Pooja ji 🙏 Mujhe *Bridal Mehndi* chahiye (haath + pair). Meri shaadi ki date ke liye availability aur package rate bata dijiye.`,
    fullhand: `Namaste Pooja ji 🙏 Mujhe *Full Hand Mehndi* chahiye. Rate aur time bata dijiye.`,
    arabic: `Namaste Pooja ji 🙏 Mujhe *Arabic / Indo-Arabic* design chahiye. Rate aur available date bata dijiye.`,
    minimal: `Namaste Pooja ji 🙏 Mujhe *Minimal / Simple* mehndi chahiye. Rate bata dijiye.`,
  };

  function waLink(key, extra) {
    const msg = extra || waMessages[key] || waMessages.default;
    return `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(msg)}`;
  }

  // Saare data-wa elements
  $$("[data-wa]").forEach((el) => {
    const key = el.getAttribute("data-wa");
    el.href = waLink(key);
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Instagram links
  $$("[data-instagram]").forEach((el) => {
    el.href = cfg.instagramUrl;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  });

  /* =====================================================================
     2. HEADER + MOBILE NAV
     ===================================================================== */
  const header = $("#header");
  const nav = $("#nav");
  const menuBtn = $("#menuBtn");

  function closeNav() {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open menu");
    document.body.classList.remove("is-locked");
  }

  menuBtn.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
  });

  $$("a", nav).forEach((a) => a.addEventListener("click", closeNav));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeNav();
      closeLightbox();
    }
  });

  // Sticky header shadow
  const onScroll = () => {
    header.classList.toggle("is-stuck", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* =====================================================================
     3. YEAR
     ===================================================================== */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =====================================================================
     4. PORTFOLIO GALLERY
     ===================================================================== */
  const galleryEl = $("#gallery");
  const zoomIcon =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15.5 14h-.8l-.3-.3A6.5 6.5 0 1 0 13 15.1l.3.3v.8l5 5 1.5-1.5-5-5Zm-6 0A4.5 4.5 0 1 1 14 9.5 4.5 4.5 0 0 1 9.5 14Z"/></svg>';

  function renderGallery() {
    const frag = document.createDocumentFragment();
    cfg.gallery.forEach((item, i) => {
      const btn = document.createElement("button");
      btn.className = "gcard";
      btn.type = "button";
      btn.dataset.cat = item.cat;
      btn.dataset.index = String(i);
      btn.setAttribute("aria-label", `${item.title} — photo bada karein`);
      btn.innerHTML = `
        <img src="${item.thumb}" alt="${item.alt}" loading="${i < 3 ? "eager" : "lazy"}" decoding="async" width="480" height="640" />
        <span class="gcard__zoom">${zoomIcon}</span>
        <span class="gcard__label">${item.title}</span>`;
      frag.appendChild(btn);
    });
    galleryEl.appendChild(frag);
  }
  renderGallery();

  const gcards = $$(".gcard");

  // Filters
  const filters = $("#filters");
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter");
    if (!btn) return;
    $$(".filter", filters).forEach((f) => {
      f.classList.toggle("is-active", f === btn);
      f.setAttribute("aria-pressed", String(f === btn));
    });
    const cat = btn.dataset.filter;
    gcards.forEach((card) => {
      const show = cat === "all" || card.dataset.cat === cat;
      card.classList.toggle("is-hidden", !show);
      if (show) {
        card.style.animation = "none";
        // eslint-disable-next-line no-unused-expressions
        card.offsetHeight;
        card.style.animation = "";
      }
    });
  });

  /* =====================================================================
     5. LIGHTBOX
     ===================================================================== */
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");
  let lbIndex = 0;
  let lbList = [];
  let lastFocus = null;

  function openLightbox(index) {
    lbList = gcards.filter((c) => !c.classList.contains("is-hidden"));
    lbIndex = lbList.findIndex((c) => Number(c.dataset.index) === index);
    if (lbIndex < 0) lbIndex = 0;
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
    lbCap.textContent = item.title;
  }

  function closeLightbox() {
    if (lb.hidden) return;
    lb.hidden = true;
    document.body.classList.remove("is-locked");
    if (lastFocus) lastFocus.focus();
  }

  function stepLightbox(dir) {
    if (!lbList.length) return;
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    paintLightbox();
  }

  galleryEl.addEventListener("click", (e) => {
    const card = e.target.closest(".gcard");
    if (!card) return;
    openLightbox(Number(card.dataset.index));
  });

  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => stepLightbox(-1));
  $("#lbNext").addEventListener("click", () => stepLightbox(1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "ArrowRight") stepLightbox(1);
    if (e.key === "ArrowLeft") stepLightbox(-1);
  });

  // Swipe support
  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 45) stepLightbox(dx < 0 ? 1 : -1);
    touchX = null;
  }, { passive: true });

  /* =====================================================================
     6. REVIEWS
     ===================================================================== */
  const reviewsSection = $("#reviews");
  const reviewsList = $("#reviewsList");

  if (cfg.showReviews && cfg.reviews.length) {
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
  if (reviewsSection.hidden) {
    $$('a[href="#reviews"]').forEach((a) => a.remove());
  }

  /* =====================================================================
     7. AREAS
     ===================================================================== */
  const areasList = $("#areasList");
  if (areasList) {
    areasList.innerHTML = cfg.areas.map((a) => `<li>${a}</li>`).join("");
  }

  /* =====================================================================
     8. BOOKING FORM
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
    const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0];
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

      if (!name || !service) {
        if (!name) {
          const f = $("#f-name");
          f.setCustomValidity("Apna naam likhein");
          f.reportValidity();
          f.setCustomValidity("");
          f.focus();
        } else {
          serviceSelect.reportValidity();
        }
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
     9. SCROLL REVEAL
     ===================================================================== */
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

  /* =====================================================================
     10. ACTIVE NAV LINK ON SCROLL
     ===================================================================== */
  const sections = ["portfolio", "services", "about", "reviews", "faq"].map((id) => document.getElementById(id)).filter(Boolean);
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
