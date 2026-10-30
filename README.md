# Pooja Bridal Mehndi — Indore

Mobile-first portfolio + booking website for **Pooja Bridal Mehndi** (mehndi artist, Indore).
2 pages: home (services, price, teaser gallery, booking) + **portfolio page** (18 designs,
category-wise with rates).

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

## 2. Files

| File | Kaam |
| --- | --- |
| `index.html` | Home — hero, price cards, teaser gallery, about, process, FAQ, booking form, areas |
| `portfolio.html` | **Portfolio** — 18 designs, category-wise sections + rate list |
| `assets/css/style.css` | Poora design (mobile-first, tokens) |
| `assets/js/site-config.js` | **Saara content** — number, categories, rate, photos, areas, reviews |
| `assets/js/app.js` | Cards, filters, gallery, lightbox, WhatsApp links, booking form |
| `assets/img/opt/` | Optimised (webp) photos — 360 / 480 / 736 px |
| `assets/img/portfolio/` | Full-size (jpeg) originals |
| `assets/img/incoming/` | Nayi raw photos yahan daalein |
| `tools/optimize-images.py` | Photos ko webp + sizes mein convert karta hai |

---

## 3. Categories & rate (abhi site par yeh hai)

| # | Category | Rate | Time |
| --- | --- | --- | --- |
| 1 | Simple & Minimal | ₹200 se | 20–30 min |
| 2 | Festive & Karwa Chauth | ₹400 se | 40–60 min |
| 3 | Arabic & Floral | ₹600 se | 45–70 min |
| 4 | Frame & Portrait Design | ₹1,500 se | 1.5–2.5 ghante |
| 5 | Rajwadi Bridal | ₹2,500 se | 2–3 ghante |
| 6 | Bridal Package (haath + pair) | ₹5,000 se | 3–4 ghante |

⚠️ Yeh rate **suggestion** hain (design ki difficulty ke hisaab se, easy → bridal).
Pooja di final rate confirm karein — sirf `site-config.js` ke `categories` mein
`price` badalna hai, poore site par (cards, portfolio, WhatsApp message) update ho jayega.

Portfolio mein 18 designs hain: minimal 4, festive 2, arabic 4, portrait 4, rajwadi 4.

---

## 4. Roz-marra ke badlav (cheat sheet)

### WhatsApp number / Instagram
`assets/js/site-config.js` → `whatsapp`, `phoneDisplay`, `instagramUrl`.
Number format: `919755550380` (bina `+`, bina space).

### Rate badalna
`site-config.js` → `categories` → us category ka `price`.

### Naya design add karna
1. Photo `assets/img/incoming/` mein daalein.
2. `npm run optimize-images` chalaayein (ya `python3 tools/optimize-images.py`).
3. `site-config.js` ke `gallery` array mein entry jodein:

```js
{
  src: "assets/img/opt/meri-photo-736.webp",
  thumb: "assets/img/opt/meri-photo-480.webp",
  cat: "rajwadi",            // minimal | festive | arabic | portrait | rajwadi
  title: "Peacock Bridal — Naya Design",
  alt: "Peacock rajwadi mehndi design on both hands — Indore",
},
```

`cat` categories ke `slug` se match hona chahiye — portfolio page usi section mein
photo daal dega.

### Naya category
`categories` mein naya object add karein (`slug`, `name`, `tag`, `price`, `time`,
`blurb`, `points`). Home page card + portfolio section + filter + booking dropdown
sab automatic ban jayenge. `serviceOptions` mein bhi ek line add kar lena.

### Gallery order / teaser
Home page par har category se 2 designs dikhte hain (teaser). Badalna ho to
`app.js` ke `pickFeatured` / `teaserSlugs` ko chhed lein.

### Reviews
`showReviews: false` hai — asli client reviews milne par `reviews` array bhar dein
aur `showReviews: true` kar dein. Tab tak section + uska nav link hidden rehta hai.

### FAQ / About text
Seedha `index.html` mein edit karein.

---

## 5. Photos ke baare mein note

Abhi portfolio mein 18 designs hain (minimal → rajwadi). Yeh images aapne
Instagram/Pinterest se reference ke liye di hain. **Publish se pehle** confirm kar lein
ki ye designs Pooja di ke apne kaam ke hain (ya unki banayi hui photos se replace kar dein) —
portfolio ki asli value unke apne kaam se hi aati hai. Replace karte waqt file ke naam wahi
rakhein, ya `site-config.js` mein path badal dein.

---

## 6. Tech notes

- Zero dependencies, zero build. Sirf Google Fonts (Cormorant Garamond + Jost).
- Mobile-first CSS, `svh/dvh`, safe-area insets (iPhone notch), reduced-motion support.
- Mobile: sticky bottom bar (Call / WhatsApp / Instagram). Desktop: floating WhatsApp + split hero.
- Gallery: category filter, lightbox (keyboard arrows, swipe), per-category navigation.
- Booking form → prefilled WhatsApp message (koi server, koi data store nahi).
- SEO: meta + Open Graph, `BeautySalon` JSON-LD, semantic headings, alt text, sitemap.
- Accessibility: skip link, focus rings, ARIA (nav/filters/lightbox), 44px+ tap targets.
- Validation: `npm run validate` (html-validate) — dono pages clean.
