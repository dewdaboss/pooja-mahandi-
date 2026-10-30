/* =========================================================================
   POOJA BRIDAL MEHNDI — motion + interactive extras
   Is file ko app.js ke baad load kiya jaata hai.
   ========================================================================= */
(function () {
  "use strict";

  const cfg = window.SITE;
  if (!cfg) return;

  const $ = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const money = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  /* =====================================================================
     1. DESIGN TICKER (auto-scrolling strip)
     ===================================================================== */
  const track = $("#tickerTrack");
  if (track) {
    const words = cfg.categories.concat([{ name: "Groom Mehndi" }, { name: "Guest Hands" }]);
    const html = words
      .map((c) => `<span class="ticker__item">${c.name.split(" — ")[0]}<i aria-hidden="true">✦</i></span>`)
      .join("");
    track.innerHTML = html + html; // duplicate for seamless loop
    track.style.setProperty("--ticker-count", String(words.length));
  }

  /* =====================================================================
     2. PRICE ESTIMATOR
     ===================================================================== */
  const est = $("#estimateForm");
  if (est && cfg.calculator) {
    const catSelect = $("#est-cat");
    const handsBox = $("#est-hands");
    const addonBox = $("#est-addons");
    const valueEl = $("#est-value");
    const timeEl = $("#est-time");
    const catNameEl = $("#est-cat-name");
    const cta = $("#est-cta");

    const basePrice = (cat) => {
      const digits = String(cat.price).replace(/[^0-9]/g, "");
      return Number(digits) || 0;
    };

    // dropdown
    cfg.categories.forEach((c) => {
      const o = document.createElement("option");
      o.value = c.slug;
      o.textContent = `${c.name} — ${c.price} se`;
      catSelect.appendChild(o);
    });

    // hands chips (radio behaviour)
    handsBox.innerHTML = cfg.calculator.hands
      .map((h, i) => `
        <button type="button" class="chip${i === 0 ? " is-on" : ""}" data-hands="${h.key}" aria-pressed="${i === 0}">
          ${h.label}<span>${h.hint}</span>
        </button>`)
      .join("");

    // add-on chips
    const estimatableAddons = cfg.addons.filter((a) => !/Group/i.test(a.name));
    addonBox.innerHTML = estimatableAddons
      .map((a, i) => `
        <button type="button" class="chip chip--addon" data-addon="${i}" aria-pressed="false">
          ${a.name}<span>${money(a.price)}</span>
        </button>`)
      .join("");

    let handKey = cfg.calculator.hands[0].key;
    const picked = new Set();

    handsBox.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      handKey = b.dataset.hands;
      $$(".chip", handsBox).forEach((c) => {
        const on = c === b;
        c.classList.toggle("is-on", on);
        c.setAttribute("aria-pressed", String(on));
      });
      update();
    });

    addonBox.addEventListener("click", (e) => {
      const b = e.target.closest(".chip");
      if (!b) return;
      const i = Number(b.dataset.addon);
      if (picked.has(i)) picked.delete(i); else picked.add(i);
      const on = picked.has(i);
      b.classList.toggle("is-on", on);
      b.setAttribute("aria-pressed", String(on));
      update();
    });

    catSelect.addEventListener("change", update);

    function tweenNumber(el, from, to) {
      el.dataset.value = String(Math.round(to));
      if (reduced()) { el.textContent = money(to); return; }
      const start = performance.now();
      const dur = 420;
      function frame(t) {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = money(from + (to - from) * eased);
        if (p < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    let current = 0;

    function update() {
      const cat = cfg.categories.find((c) => c.slug === catSelect.value) || cfg.categories[0];
      const mult = (cfg.calculator.hands.find((h) => h.key === handKey) || { mult: 1 }).mult;
      let total = basePrice(cat) * mult;

      const chosen = [];
      picked.forEach((i) => {
        const a = estimatableAddons[i];
        if (!a) return;
        // pair add-on already included in "dono haath + pair"
        if (handKey === "bothFeet" && /pair/i.test(a.name) && /Sirf pair/i.test(a.name)) return;
        total += a.price;
        chosen.push(`${a.name} (${money(a.price)})`);
      });

      const round = cfg.calculator.roundTo || 50;
      const low = Math.round((total * (1 - (cfg.calculator.rangePct || 0.1))) / round) * round;
      const high = Math.round((total * (1 + (cfg.calculator.rangePct || 0.1))) / round) * round;

      const prev = current || low;
      current = low;
      tweenNumber(valueEl, prev, low);
      valueEl.dataset.range = `${money(low)} – ${money(high)}`;
      const rangeEl = $("#est-range");
      if (rangeEl) rangeEl.textContent = `${money(low)} – ${money(high)}`;

      // time
      const baseTime = String(cat.time);
      timeEl.textContent = chosen.length ? `${baseTime} + add-ons` : baseTime;
      catNameEl.textContent = cat.name;

      // whatsapp message
      const handsLabel = (cfg.calculator.hands.find((h) => h.key === handKey) || {}).label || "";
      let msg = `Namaste Pooja ji 🙏\n\nMaine website par rate calculator use kiya:\n\n`;
      msg += `*Design:* ${cat.name} (${cat.price} se)\n`;
      msg += `*Coverage:* ${handsLabel}\n`;
      if (chosen.length) msg += `*Add-ons:* ${chosen.join(", ")}\n`;
      msg += `*Approx estimate:* ${money(low)} – ${money(high)}\n`;
      msg += `\nYe rate confirm kar dijiye aur available date bata dijiye.`;
      cta.href = `https://wa.me/${cfg.whatsapp}?text=${encodeURIComponent(msg)}`;
    }

    // hover par range dikhe
    valueEl.addEventListener("mouseenter", () => {
      if (valueEl.dataset.range) valueEl.title = "Range: " + valueEl.dataset.range;
    });

    update();
  }

  /* =====================================================================
     3. ADD-ONS CARDS
     ===================================================================== */
  const addonsList = $("#addonsList");
  if (addonsList && cfg.addons) {
    addonsList.innerHTML = cfg.addons
      .map((a, i) => `
      <article class="addon reveal" style="--d:${i * 70}ms">
        <div class="addon__top">
          <h3 class="addon__name">${a.name}</h3>
          <p class="addon__price">${money(a.price)}${/per hand/i.test(a.name) ? "" : ""}</p>
        </div>
        <p class="addon__note">${a.note}</p>
        <p class="addon__market">${a.market || ""}</p>
      </article>`)
      .join("");
  }

  /* =====================================================================
     4. HERO PARALLAX + SCROLL EXTRAS
     ===================================================================== */
  const heroImg = $(".hero__media img");
  const heroOrn = $(".hero__ornament");
  if (!reduced()) {
    let raf = null;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (heroImg && y < window.innerHeight * 1.2) {
          heroImg.style.transform = `translate3d(0, ${y * 0.12}px, 0) scale(1.06)`;
        }
        if (heroOrn && y < window.innerHeight) {
          heroOrn.style.transform = `translate3d(0, ${y * -0.18}px, 0) rotate(${y * 0.02}deg)`;
        }
        raf = null;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* =====================================================================
     5. FAQ — smooth open/close
     ===================================================================== */
  $$(".faq__item").forEach((item) => {
    const body = $(".faq__body", item);
    if (!body) return;
    let anim = null;
    item.addEventListener("toggle", () => {
      if (reduced()) return;
      if (item.open) {
        body.style.overflow = "hidden";
        body.style.height = "0px";
        const target = body.scrollHeight;
        anim = body.animate(
          [{ height: "0px", opacity: 0 }, { height: target + "px", opacity: 1 }],
          { duration: 300, easing: "cubic-bezier(.22,.68,.35,1)" }
        );
        anim.onfinish = () => { body.style.height = ""; body.style.overflow = ""; };
      }
    });
  });

  /* =====================================================================
     6. BACK TO TOP
     ===================================================================== */
  const top = document.createElement("button");
  top.type = "button";
  top.className = "to-top";
  top.setAttribute("aria-label", "Top par jaayein");
  top.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5.5 4.5 13l1.4 1.4L11 9.3V20h2V9.3l5.1 5.1L19.5 13 12 5.5Z"/></svg>';
  document.body.appendChild(top);

  const toggleTop = () => top.classList.toggle("is-on", window.scrollY > window.innerHeight * 0.9);
  toggleTop();
  window.addEventListener("scroll", toggleTop, { passive: true });
  top.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduced() ? "auto" : "smooth" });
  });

  /* =====================================================================
     7. GALLERY TILT (subtle 3D on pointer)
     ===================================================================== */
  if (!reduced() && window.matchMedia("(hover: hover)").matches) {
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest(".gcard");
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg) scale(1.015)`;
    });
    document.addEventListener("pointerout", (e) => {
      const card = e.target.closest(".gcard");
      if (card) card.style.transform = "";
    });
  }

  /* =====================================================================
     8. NUMBER COUNT-UP (stats / portfolio numbers)
     ===================================================================== */
  const counters = $$("[data-count]");
  if (counters.length) {
    const run = (el) => {
      const target = Number(el.dataset.count || 0);
      const prefix = el.dataset.prefix || "";
      const suffix = el.dataset.suffix || "";
      if (reduced()) { el.textContent = prefix + target + suffix; return; }
      const start = performance.now();
      const dur = 900;
      const step = (t) => {
        const p = Math.min((t - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => {
        if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
      }),
      { threshold: 0.4 }
    );
    counters.forEach((c) => io.observe(c));
  }

  /* =====================================================================
     9. SECTION TITLE SPLIT — har word alag fade ho
     ===================================================================== */
  if (!reduced()) {
    $$(".section__title, .pagehero__title").forEach((h) => {
      if (h.dataset.split) return;
      h.dataset.split = "1";
      h.innerHTML = h.innerHTML.replace(/(<br\s*\/?>)/g, "$1");
    });
  }
})();
