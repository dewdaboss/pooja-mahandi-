/* ---------- PRICE TABLE ROWS + MISC A11Y ---------- */
(function () {
  "use strict";
  const cfg = window.SITE;
  if (!cfg) return;

  const money = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

  /* Rate card table (portfolio page) */
  const rateBody = document.getElementById("rateTableBody");
  if (rateBody) {
    rateBody.innerHTML = cfg.categories
      .map((c) => {
        const lvl = Math.max(1, Math.min(5, c.level || 1));
        const dots = Array.from({ length: 5 }, (_, i) =>
          `<span class="level__dot${i < lvl ? " is-on" : ""}"></span>`).join("");
        return `<tr>
          <td>
            <span class="pricetable__name">${c.name}</span>
            <span class="pricetable__sub">${c.tag}</span>
          </td>
          <td><span class="level__dots" aria-hidden="true">${dots}</span></td>
          <td>${c.time}</td>
          <td class="pricetable__price">${c.price}<span class="pricetable__sub">se shuru</span></td>
        </tr>`;
      })
      .join("");
  }

  const addonBody = document.getElementById("addonTableBody");
  if (addonBody && cfg.addons) {
    addonBody.innerHTML = cfg.addons
      .map((a) => `<tr>
        <td class="pricetable__name">${a.name}</td>
        <td>${a.note}</td>
        <td class="pricetable__price">${money(a.price)}</td>
      </tr>`)
      .join("");
  }

  /* Visually-hidden utility (agar style.css mein na ho) */
  if (!document.getElementById("vh-style")) {
    const st = document.createElement("style");
    st.id = "vh-style";
    st.textContent =
      ".visually-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}";
    document.head.appendChild(st);
  }
})();
