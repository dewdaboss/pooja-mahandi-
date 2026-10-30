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
| `assets/js/motion.js` | Rate calculator, add-ons, ticker, parallax, counters, back-to-top, tilt |
| `assets/js/ratecard.js` | Portfolio page ka price table + add-on table |
| `assets/css/mobile.css` | **Mobile app layer** — app bar, swipe carousels, bottom sheet, quiz, drawing |
| `assets/js/mobile.js` | **Mobile app logic** — quiz, bottom sheet, swipe dots, ripple, draw-on-scroll |
| `assets/css/components.css` | Ticker, estimator, add-ons, price table, back-to-top |
| `assets/img/opt/` | Optimised (webp) photos — 360 / 480 / 736 px |
| `assets/img/portfolio/` | Full-size (jpeg) originals |
| `assets/img/incoming/` | Nayi raw photos yahan daalein |
| `tools/optimize-images.py` | Photos ko webp + sizes mein convert karta hai |

---

## 3. Categories, rate & add-ons (abhi site par yeh hai)

Rate ka rule: **jitni kam mehndi, utna kam rate.** Portrait/couple (dulha–dulhan figure)
mein mehnat sabse zyada lagti hai, isliye woh bridal se alag premium tier hai.

| # | Category | Kitni mehndi | Rate | Time | Designs |
| --- | --- | --- | --- | --- | --- |
| 1 | Simple & Minimal | ●○○○○ | ₹200 se | 20–30 min | 3 |
| 2 | Floral & Arabic | ●●○○○ | ₹400 se | 30–45 min | 4 |
| 3 | Festive & Karwa Chauth | ●●○○○ | ₹700 se | 45–70 min | 4 |
| 4 | Peacock & Motif | ●●●○○ | ₹900 se | 1 ghanta | 3 |
| 5 | Half Hand | ●●●○○ | ₹1,300 se | 1–1.5 ghanta | 2 |
| 6 | **Portrait & Couple** (dulha–dulhan) | ●●●●○ | **₹2,500 se** | 1.5–2.5 ghante | 4 |
| 7 | Bridal Full Hand | ●●●●○ | ₹3,500 se | 2–3 ghante | 8 |
| 8 | Bridal Package (haath + pair) | ●●●●● | ₹6,000 se | 3–4 ghante | — |

**Add-ons:** Groom/dulha mehndi ₹800 · Guest (per hand) ₹200 · Sirf pair ₹1,800 ·
Name/date design mein ₹300 · Group booking (10+ hands) ₹150/hand

### Ye rates kaise set kiye (market research)

Indore aur India ke wedding platforms par live rates compare karne ke baad:

| Source | Data |
| --- | --- |
| WedMeGood Indore | Bridal ₹2,100 – ₹5,100 typical (range ₹1,500 – ₹15,000) |
| WeddingBazaar Indore | Artists ₹2,100 / ₹3,100 / ₹4,000 / ₹5,000 / ₹5,100 |
| IndiaMART Indore | Arabic ₹300/pair · bridal ₹2,500/piece · guest ₹500/person |
| Wedding platforms (pan-India) | Portrait mehndi artists ₹2,000 – ₹5,100 |
| Price guides | Guest per hand ₹100–₹500 · Arabic ₹150–₹800 · Groom ₹300–₹1,500 |
| Dream Wedding Hub | Couple portrait + full hand ₹10,000 – ₹20,000 (metro) |

Isliye Pooja ke rates market ke **lower-middle band** mein rakhe gaye hain (naye artist ke liye
competitive), par portrait/bridal tiers premium — kyunki wahan kaam sabse zyada hota hai.

⚠️ Rate **suggestion** hain — Pooja di final rate confirm karein. Sirf
`site-config.js` ke `categories` / `addons` mein `price` badalna hai; cards, portfolio,
rate calculator, WhatsApp message aur rate card table — sab update ho jayenge.

### Naya feature: Rate Calculator
Home page par `#estimate` section — client design category, coverage (1 haath / dono haath /
haath+pair) aur add-ons chun kar turant approximate rate dekh sakta hai, aur wahi details
WhatsApp message mein chali jaati hain. Multipliers `site-config.js → calculator` mein hain.

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

Abhi portfolio mein 28 designs hain (minimal → rajwadi). Yeh images aapne
Instagram/Pinterest se reference ke liye di hain. **Publish se pehle** confirm kar lein
ki ye designs Pooja di ke apne kaam ke hain (ya unki banayi hui photos se replace kar dein) —
portfolio ki asli value unke apne kaam se hi aati hai. Replace karte waqt file ke naam wahi
rakhein, ya `site-config.js` mein path badal dein.

---

## 6. Tech notes

- Zero dependencies, zero build. Sirf Google Fonts (Cormorant Garamond + Jost).
- Mobile-first CSS, `svh/dvh`, safe-area insets (iPhone notch), reduced-motion support.
- Mobile: 5-slot **app bar** (Home / Designs / WhatsApp-Book / Rate / Call). Desktop: floating WhatsApp + split hero.
- Mobile-first "app jaisa" layer (`mobile.css` + `mobile.js`, sab `<900px` par hi chalta hai):
  - **Swipe carousels** — price cards, add-ons, gallery sab side-swipe (snap), neeche progress dots.
  - **Bottom sheet** — design par tap karein → photo + category + rate + WhatsApp, swipe down se band, swipe left/right se agla/pichhla.
  - **Design Match Quiz** (`#match`) — 3 sawaal → sahi category + rate + prefilled WhatsApp message.
  - **Draw-on-scroll mehndi line art** (`.drawsection`) — 16 strokes ek-ek karke "khichte" hain.
  - **Tap ripple** (mehndi drop), chhota haptic vibrate, active app-bar item.
  - Desktop par yeh app UI poori tarah hidden — site waise hi professional dikhti hai.
- Gallery: category filter, lightbox (keyboard arrows, swipe), per-category navigation.
- Booking form → prefilled WhatsApp message (koi server, koi data store nahi).
- SEO: meta + Open Graph, `BeautySalon` JSON-LD, semantic headings, alt text, sitemap.
- Accessibility: skip link, focus rings, ARIA (nav/filters/lightbox), 44px+ tap targets.
- Validation: `npm run validate` (html-validate) — teeno pages clean.
- **Animations:** scroll reveal (fade + slide + stagger), animated section underlines,
  hero text stagger on load, card gold-sheen on hover, button shine sweep, WhatsApp pulse,
  gallery image fade-in, scroll progress line, smooth page-transition veil.
  Sab `prefers-reduced-motion` respect karte hain (accessibility).
