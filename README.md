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
| `portfolio.html` | **Portfolio** — 28 designs, 7 category sections + rate list |
| `assets/css/style.css` | Poora design (mobile-first, tokens) |
| `assets/js/site-config.js` | **Saara content** — number, categories, rate, photos, areas, reviews |
| `assets/js/app.js` | Cards, filters, gallery, lightbox, WhatsApp links, booking form |
| `assets/img/opt/` | Optimised (webp) photos — 360 / 480 / 736 px |
| `assets/img/portfolio/` | Full-size (jpeg) originals |
| `assets/img/incoming/` | Nayi raw photos yahan daalein |
| `tools/optimize-images.py` | Photos ko webp + sizes mein convert karta hai |

---

## 3. Categories & rate (abhi site par yeh hai)

Rate ka rule: **jitni kam mehndi, utna kam rate.**

| # | Category | Kitni mehndi | Rate | Time | Designs |
| --- | --- | --- | --- | --- | --- |
| 1 | Simple & Minimal | ●○○○○ | ₹200 se | 20–30 min | 3 |
| 2 | Floral & Arabic | ●●○○○ | ₹500 se | 40–60 min | 4 |
| 3 | Festive & Karwa Chauth | ●●○○○ | ₹700 se | 45–70 min | 4 |
| 4 | Peacock & Motif | ●●●○○ | ₹900 se | 1 ghanta | 3 |
| 5 | Half Hand | ●●●○○ | ₹1,200 se | 1–1.5 ghanta | 2 |
| 6 | Portrait & Couple | ●●●●○ | ₹2,000 se | 1.5–2.5 ghante | 4 |
| 7 | Bridal Full Hand | ●●●●○ | ₹2,800 se | 2–3 ghante | 8 |
| 8 | Bridal Package (haath + pair) | ●●●●● | ₹5,000 se | 3–4 ghante | — |

**Total 28 designs.** Level dots (`level: 1–5` in config) ka matlab hai kitna haath bharna hai —
wahi dots site par dikhte hain, isliye client ko rate ka logic khud samajh aa jaata hai.

⚠️ Rate **suggestion** hain — Pooja di final rate confirm karein. Sirf `site-config.js` ke
`categories` mein `price` badalna hai; cards, portfolio, WhatsApp message sab update ho jayenge.

## 4. Roz-marra ke badlav (cheat sheet)

### WhatsApp number / Instagram
`assets/js/site-config.js` → `whatsapp`, `phoneDisplay`, `instagramUrl`.
Number format: `919755550380` (bina `+`, bina space).

### Rate badalna
`site-config.js` → `categories` → us category ka `price`.

### Photo ke naam ka rule
File ka naam design ka kaam batata hai — isse manage karna aasan rehta hai:
`category-design.webp` jaise
`bridal-mandala-forearm-736.webp`, `minimal-palm-dots-480.webp`, `halfhand-rose-mandala-736.webp`.
Har photo ke 3 size hote hain (`-360`, `-480`, `-736`) aur full-size original
`assets/img/portfolio/<naam>.jpg` mein.

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
- Validation: `npm run validate` (html-validate) — teeno pages clean.
- **Animations:** scroll reveal (fade + slide + stagger), animated section underlines,
  hero text stagger on load, card gold-sheen on hover, button shine sweep, WhatsApp pulse,
  gallery image fade-in, scroll progress line, smooth page-transition veil.
  Sab `prefers-reduced-motion` respect karte hain (accessibility).
