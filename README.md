# Pooja Bridal Mehndi — Indore

Mobile-first portfolio + booking website for **Pooja Bridal Mehndi** (mehndi artist, Indore).
Ek hi page, poora portfolio, price list, FAQ aur WhatsApp booking form.

🔗 Instagram: [@pooja_bridal_mehndi._](https://www.instagram.com/pooja_bridal_mehndi._)
📞 WhatsApp / Call: +91 97555 50380

---

## 1. Kaise chalayein (local preview)

```bash
npm run dev          # http://localhost:5173
```

Ya bilkul simple — `index.html` ko browser mein seedha khol lein.
Koi build step nahi hai, plain HTML + CSS + JS.

Deploy karna ho to GitHub Pages / Netlify / Vercel par yeh folder drag-drop kar dein.

---

## 2. Kya-kya file hai

| File | Kaam |
| --- | --- |
| `index.html` | Poora page — sections, text, prices, FAQ |
| `assets/css/style.css` | Design (mobile-first, tokens ke saath) |
| `assets/js/site-config.js` | **Content settings** — number, portfolio photos, areas, reviews |
| `assets/js/app.js` | Gallery, filters, lightbox, WhatsApp links, booking form |
| `assets/img/opt/` | Optimised (webp) photos jo site par dikhti hain |
| `assets/img/incoming/` | Aapki nayi raw photos (yahan daalein) |
| `tools/optimize-images.py` | Photos ko webp + 3 sizes mein convert karta hai |

---

## 3. Roz-marra ke badlav (cheat sheet)

### WhatsApp number / Instagram
`assets/js/site-config.js` → `whatsapp`, `phoneDisplay`, `instagramUrl`, `instagramHandle`.
(Number country code ke saath, bina `+` ke: `919755550380`)

⚠️ `index.html` mein bhi `tel:+919755550380` aur `+91 97555 50380` likha hai — number badle to
wahan bhi search-replace kar dein (5-6 jagah hai).

### Prices / packages
`index.html` → `id="services"` section. Har card mein `card__price` aur `card__list` edit karein.
Abhi ke rate **placeholder** hain (₹200 / ₹500 / ₹1,500 / ₹5,000 "se shuru") — Pooja di jo
final rate bolein, wahi daal dein.

### Portfolio photos
1. Photos `assets/img/incoming/` mein daalein.
2. `npm run optimize-images` (ya `python3 tools/optimize-images.py`).
3. `assets/js/site-config.js` ke `gallery` array mein entry jodein:

```js
{
  src: "assets/img/opt/meri-photo-1200.webp",
  thumb: "assets/img/opt/meri-photo-480.webp",
  cat: "bridal",              // bridal | arabic | minimal | feet | detail
  title: "Bridal Full Hand",
  alt: "Bridal mehndi design — Pooja, Indore",
},
```

### Reviews
`site-config.js` mein `showReviews: false` hai — **asli** client reviews milne par
`reviews` array mein daalein aur `showReviews: true` kar dein.
(Neeche jo sample reviews likhe hain wo sirf format dikhane ke liye hain, live na karein.)

### Service areas
`site-config.js` → `areas` array. Naya area add/remove kar dein.

### FAQ / About text
Seedha `index.html` mein edit karein.

---

## 4. Ahem note — abhi ki photos

`assets/img/portfolio/` aur `assets/img/hero/` ki photos **AI-generated placeholder** hain
(design dekhne ke liye). Inhe Pooja di ki asli mehndi photos se replace karna hai — portfolio
ki asli value wahin se aayegi. Replace karte waqt file ke naam wahi rakhein, ya
`site-config.js` mein naya path daal dein.

Aur haan: yahan ke **prices, reviews aur timing** placeholder hain — publish karne se pehle
ek baar confirm kar lein.

---

## 5. Tech notes

- Zero dependencies, zero build. Sirf Google Fonts (Cormorant Garamond + Jost).
- Mobile-first CSS, `svh/dvh` units, safe-area insets (iPhone notch), reduced-motion support.
- Sticky bottom bar on mobile (Call / WhatsApp / Instagram), floating WhatsApp on desktop.
- Gallery: filter + lightbox (keyboard arrows, swipe support).
- Booking form → seedha prefilled WhatsApp message banata hai (koi server, koi data store nahi).
- SEO: meta tags, Open Graph, `BeautySalon` JSON-LD, semantic headings, alt text on images.
- Accessibility: skip link, focus styles, ARIA on nav/filters/lightbox, 44px+ tap targets.
