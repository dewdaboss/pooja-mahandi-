/* =========================================================================
   POOJA BRIDAL MEHNDI  —  SITE CONFIG
   -------------------------------------------------------------------------
   Poora content yahin se control hota hai (ek hi jagah).

   RATE KA RULE: jitni kam mehndi, utna kam rate.
   Sabse aasan (sirf palm mandala) ₹200 se shuru → poora bridal (haath + pair)
   ₹5,000 tak. Neeche har category ka `price` aap apne hisaab se badal sakti hain.
   ========================================================================= */

const SITE = {
  /* ---------- 1. BASIC DETAILS ------------------------------------------ */
  name: "Pooja Bridal Mehndi",
  artist: "Pooja",
  city: "Indore",
  state: "Madhya Pradesh",

  /* WhatsApp: country code + number, bina + / space ke */
  whatsapp: "919755550380",
  phoneDisplay: "+91 97555 50380",

  instagramHandle: "pooja_bridal_mehndi._",
  instagramUrl: "https://www.instagram.com/pooja_bridal_mehndi._",

  startingPrice: "₹200",
  timings: "Roz — subah 9:00 se raat 9:00 tak",
  responseTime: "15–30 min",

  /* ---------- 2. SERVICE AREAS (Indore) --------------------------------- */
  areas: [
    "Vijay Nagar",
    "Palasia",
    "Bhawarkuan",
    "Sudama Nagar",
    "Rau",
    "Mhow",
    "Rajwada",
    "Sapna Sangeeta",
    "AB Road",
    "Airport Road",
    "Dewas Naka",
    "Annapurna Road",
    "MR 10",
    "Nanda Nagar",
    "Silicon City",
    "Aur poore Indore mein",
  ],

  /* ---------- 3. CATEGORIES (kam mehndi → zyada mehndi) -----------------
     Price Indore ke market rate ke hisaab se set kiya gaya hai
     (bridal ₹2,100–₹5,100, portrait ₹2,000–₹5,100, guest ₹200/hand,
      groom ₹300–₹1,500 — wedding platforms + local artists se compare).

     RULE: jitni kam mehndi, utna kam rate. Portrait/couple (dulha-dulhan
     figure) mein mehnat zyada lagti hai, isliye woh premium tier hai.

     `level` = kitni mehndi (1 = kam, 5 = poori bridal)
     `base`  = calculator ke liye number (price se auto nikalta hai bhi)
     --------------------------------------------------------------------- */
  categories: [
    {
      slug: "minimal",
      name: "Simple & Minimal",
      tag: "Sabse kam mehndi",
      level: 1,
      price: "₹200",
      time: "20–30 min",
      blurb:
        "Sirf palm par ek chhota mandala ya ek halka motif — sabse kam mehndi, sabse kam rate. Pehli baar lagwane walon aur daily look ke liye.",
      points: ["1 haath, palm", "20–30 minute", "Office / college friendly"],
      market: "Market: ₹150–₹400 per hand",
    },
    {
      slug: "floral",
      name: "Floral & Arabic",
      tag: "Halki aur modern",
      level: 2,
      price: "₹400",
      time: "30–45 min",
      blurb:
        "Back of hand par floral vine, leaves aur bold Arabic trails — kam jagah, sundar look. Ring function aur casual functions ke liye.",
      points: ["Back of hand + fingers", "Floral vines / Arabic fill", "30–45 minute"],
      market: "Market: ₹300–₹800",
    },
    {
      slug: "festive",
      name: "Festive & Karwa Chauth",
      tag: "Tyohaar special",
      level: 2,
      price: "₹700",
      time: "45–70 min",
      blurb:
        "Dono haathon par lotus ya mandala, kalai par band — Karwa Chauth, Teej, Rakhi aur pooja ke liye sabse pasandida design.",
      points: ["Dono haath", "Lotus / mandala", "Kalai band included"],
      market: "Market: ₹500–₹1,200 (both hands)",
    },
    {
      slug: "peacock",
      name: "Peacock & Motif",
      tag: "Design wali mehndi",
      level: 3,
      price: "₹900",
      time: "1 ghanta",
      blurb:
        "Palm par ek bada more (peacock), jhumka trails ya lotus motif — detailing zyada, isliye thoda premium.",
      points: ["Peacock / jhumka motif", "Ek haath, palm bhar", "Finger tips included"],
      market: "Market: ₹700–₹1,500",
    },
    {
      slug: "halfhand",
      name: "Half Hand",
      tag: "Aadha haath bhara",
      level: 3,
      price: "₹1,300",
      time: "1–1.5 ghanta",
      blurb:
        "Back of hand se kalai tak — aadha haath bhara hua. Engagement aur mehndi function ka sabse popular size.",
      points: ["Back of hand + wrist", "Aadha haath coverage", "Floral / mandala mix"],
      market: "Market: ₹1,000–₹2,500",
    },
    {
      slug: "portrait",
      name: "Portrait & Couple",
      tag: "Dulha–Dulhan figure",
      level: 4,
      price: "₹2,500",
      time: "1.5–2.5 ghante",
      blurb:
        "Haath par dulha-dulhan ki figure, chhatri, kalash ya mandir ka frame — sabse zyada mehnat wala kaam, isliye premium rate. Aapki photo se custom banti hai.",
      points: ["Dulha–dulhan / couple figure", "Aapki photo se custom", "Sangeet & engagement special"],
      market: "Market: ₹2,000–₹5,100 (portrait artists)",
    },
    {
      slug: "bridal",
      name: "Bridal Full Hand",
      tag: "Poora haath bhara",
      level: 4,
      price: "₹3,500",
      time: "2–3 ghante",
      blurb:
        "Dono haath + kalai + forearm tak dense design — mandala, jaali, peacock aur elephant motifs. Dulhan ke haath ke liye.",
      points: ["Dono haath + forearm", "Dense traditional work", "Dulhan ki pehli pasand"],
      market: "Market: ₹3,100–₹5,100 (Indore bridal)",
    },
    {
      slug: "bridal-package",
      name: "Bridal Package — Haath + Pair",
      tag: "Dulhan Special",
      level: 5,
      price: "₹6,000",
      time: "3–4 ghante",
      blurb:
        "Shaadi ke din ka complete look — bridal haath + dono pair ki mehndi, ek hi sitting mein. Groom ki mehndi add-on ke roop mein.",
      points: ["Bridal haath + pair", "Trial design discussion free", "Groom & guest mehndi add-on"],
      market: "Market: ₹5,000–₹10,000 (hands + feet)",
      feature: true,
      noGallery: true,
    },
  ],

  /* ---------- 3b. ADD-ONS (alag se add hote hain) ----------------------- */
  addons: [
    { name: "Groom / Dulha mehndi", price: 800, note: "Halki traditional design, 20–30 min", market: "Market: ₹300–₹1,500" },
    { name: "Guest / family — per hand", price: 200, note: "Simple design, 10–15 min per hand", market: "Market: ₹150–₹300" },
    { name: "Sirf pair (dono) mehndi", price: 1800, note: "Feet design, 45–60 min", market: "Market: ₹1,500–₹3,000" },
    { name: "Name / date hidden in design", price: 300, note: "Design ke andar chhupa hua naam ya date", market: "Add-on" },
    { name: "Group booking (10+ hands)", price: 150, note: "Per hand rate, ek hi jagah par", market: "Group discount" },
  ],

  /* ---------- 3c. PRICE ESTIMATOR SETTINGS ----------------------------- */
  calculator: {
    hands: [
      { key: "one", label: "1 haath", mult: 1, hint: "Single hand" },
      { key: "both", label: "Dono haath", mult: 1.7, hint: "Both hands" },
      { key: "bothFeet", label: "Dono haath + pair", mult: 2.4, hint: "Hands + feet" },
    ],
    roundTo: 50,
    rangePct: 0.12,
  },

  /* ---------- 4. PORTFOLIO (28 designs) ---------------------------------
     Naya photo add karne ke liye ek entry copy karein.
     `cat` = upar ke categories ke slug se match hona chahiye.
     --------------------------------------------------------------------- */
  gallery: [
    /* ---- Minimal ---- */
    { src: "assets/img/opt/minimal-palm-dots-654.webp", thumb: "assets/img/opt/minimal-palm-dots-480.webp", cat: "minimal",
      title: "Palm Dots — Sabse Halka", alt: "Minimal mehndi with small dot motif on palm and simple wrist band" },
    { src: "assets/img/opt/minimal-single-mandala-736.webp", thumb: "assets/img/opt/minimal-single-mandala-480.webp", cat: "minimal",
      title: "Single Mandala", alt: "Single round mandala mehndi on palm with minimal wrist band" },
    { src: "assets/img/opt/minimal-wrist-mandala-735.webp", thumb: "assets/img/opt/minimal-wrist-mandala-480.webp", cat: "minimal",
      title: "Wrist Mandala — Clean", alt: "Small mandala on back of hand with delicate wrist band mehndi" },

    /* ---- Floral & Arabic ---- */
    { src: "assets/img/opt/floral-bouquet-vine-736.webp", thumb: "assets/img/opt/floral-bouquet-vine-480.webp", cat: "floral",
      title: "Floral Bouquet Vine", alt: "Floral bouquet mehndi with leaves and vine on back of hand" },
    { src: "assets/img/opt/floral-swirl-backhand-736.webp", thumb: "assets/img/opt/floral-swirl-backhand-480.webp", cat: "floral",
      title: "Swirl & Floral Trail", alt: "Swirling floral mehndi design with leaves on back of hand" },
    { src: "assets/img/opt/floral-vine-half-735.webp", thumb: "assets/img/opt/floral-vine-half-480.webp", cat: "floral",
      title: "Floral Vine Half Hand", alt: "Floral vine Arabic mehndi on half hand with leaves and flowers" },
    { src: "assets/img/opt/arabic-bold-fill-720.webp", thumb: "assets/img/opt/arabic-bold-fill-480.webp", cat: "floral",
      title: "Bold Indo-Arabic Fill", alt: "Bold Indo-Arabic mehndi with filled palm and dotted trails" },

    /* ---- Festive ---- */
    { src: "assets/img/opt/festive-lotus-scallop-736.webp", thumb: "assets/img/opt/festive-lotus-scallop-480.webp", cat: "festive",
      title: "Lotus & Scallop (Deep Red)", alt: "Deep red lotus mehndi with scallop borders on palm and fingers" },
    { src: "assets/img/opt/festive-lotus-palms-736.webp", thumb: "assets/img/opt/festive-lotus-palms-480.webp", cat: "festive",
      title: "Lotus Mandala — Dono Haath", alt: "Lotus mandala mehndi on both palms with leaf bands, festive design" },
    { src: "assets/img/opt/festive-red-mandala-736.webp", thumb: "assets/img/opt/festive-red-mandala-480.webp", cat: "festive",
      title: "Karwa Chauth Special", alt: "Karwa Chauth mehndi with mandala and jewelled wrist band" },
    { src: "assets/img/opt/festive-sun-palms-736.webp", thumb: "assets/img/opt/festive-sun-palms-480.webp", cat: "festive",
      title: "Sun Mandala — Dono Haath", alt: "Sun mandala mehndi on both palms with dark henna stain" },

    /* ---- Peacock & Motif ---- */
    { src: "assets/img/opt/peacock-palm-736.webp", thumb: "assets/img/opt/peacock-palm-480.webp", cat: "peacock",
      title: "Peacock Palm", alt: "Peacock motif mehndi covering palm with feather detail" },
    { src: "assets/img/opt/motif-chandelier-736.webp", thumb: "assets/img/opt/motif-chandelier-480.webp", cat: "peacock",
      title: "Chandelier Trails", alt: "Chandelier jhumka trail mehndi design on both hands with mandala" },
    { src: "assets/img/opt/motif-lotus-both-736.webp", thumb: "assets/img/opt/motif-lotus-both-480.webp", cat: "peacock",
      title: "Lotus Motif — Both Hands", alt: "Lotus motif mehndi with leafy wrist band on both hands" },

    /* ---- Half Hand ---- */
    { src: "assets/img/opt/halfhand-floral-crown-736.webp", thumb: "assets/img/opt/halfhand-floral-crown-480.webp", cat: "halfhand",
      title: "Floral Crown Half Hand", alt: "Half hand mehndi with floral crown design and jhumka borders" },
    { src: "assets/img/opt/halfhand-rose-mandala-735.webp", thumb: "assets/img/opt/halfhand-rose-mandala-480.webp", cat: "halfhand",
      title: "Rose & Mandala Half Hand", alt: "Rose and mandala half hand mehndi with jaali pattern on wrist" },

    /* ---- Portrait & Couple ---- */
    { src: "assets/img/opt/portrait-bride-pallu-736.webp", thumb: "assets/img/opt/portrait-bride-pallu-480.webp", cat: "portrait",
      title: "Dulhan Pallu Portrait", alt: "Bridal mehndi with bride figure wearing lehenga pallu on hand" },
    { src: "assets/img/opt/portrait-frame-kalash-736.webp", thumb: "assets/img/opt/portrait-frame-kalash-480.webp", cat: "portrait",
      title: "Chhatri & Kalash Frames", alt: "Bridal mehndi with chhatri, kalash and bride figure inside geometric frames" },
    { src: "assets/img/opt/portrait-couple-diamond-688.webp", thumb: "assets/img/opt/portrait-couple-diamond-480.webp", cat: "portrait",
      title: "Couple in Diamond Frame", alt: "Bridal mehndi with diamond frame containing bride and groom portrait" },
    { src: "assets/img/opt/portrait-couple-dome-736.webp", thumb: "assets/img/opt/portrait-couple-dome-480.webp", cat: "portrait",
      title: "Couple under Dome", alt: "Bridal mehndi portrait of bride and groom under a dome with swans" },

    /* ---- Bridal Full Hand ---- */
    { src: "assets/img/opt/bridal-mandala-forearm-720.webp", thumb: "assets/img/opt/bridal-mandala-forearm-480.webp", cat: "bridal",
      title: "Bridal Mandala — Forearm Tak", alt: "Bridal mehndi covering hands and forearms with large mandala and drops" },
    { src: "assets/img/opt/bridal-dense-both-736.webp", thumb: "assets/img/opt/bridal-dense-both-480.webp", cat: "bridal",
      title: "Dense Bridal — Dono Haath", alt: "Dense bridal mehndi on both hands with scallop mandalas and jaali" },
    { src: "assets/img/opt/bridal-jaali-both-572.webp", thumb: "assets/img/opt/bridal-jaali-both-480.webp", cat: "bridal",
      title: "Jaali & Border Bridal", alt: "Bridal mehndi with jaali net pattern and heavy borders on both hands" },
    { src: "assets/img/opt/bridal-lotus-forearm-736.webp", thumb: "assets/img/opt/bridal-lotus-forearm-480.webp", cat: "bridal",
      title: "Lotus Full Hand", alt: "Bridal mehndi with lotus mandala on palm and floral forearm design" },
    { src: "assets/img/opt/bridal-elephant-mandir-736.webp", thumb: "assets/img/opt/bridal-elephant-mandir-480.webp", cat: "bridal",
      title: "Elephant & Mandir", alt: "Rajwadi bridal mehndi with elephant, mandir and bride figure motifs" },
    { src: "assets/img/opt/bridal-lotus-pink-736.webp", thumb: "assets/img/opt/bridal-lotus-pink-480.webp", cat: "bridal",
      title: "Rajwadi Lotus Bridal", alt: "Rajwadi style lotus mehndi covering full hands with elephant motifs" },
    { src: "assets/img/opt/bridal-mandala-cream-736.webp", thumb: "assets/img/opt/bridal-mandala-cream-480.webp", cat: "bridal",
      title: "Traditional Full Coverage", alt: "Full coverage traditional bridal mehndi on both hands with dense mandalas" },
    { src: "assets/img/opt/bridal-peacock-frame-735.webp", thumb: "assets/img/opt/bridal-peacock-frame-480.webp", cat: "bridal",
      title: "Peacock Frame Bridal", alt: "Rajwadi bridal mehndi with peacock inside floral frame on both hands" },
  ],

  /* ---------- 5. REVIEWS ------------------------------------------------
     Asli client reviews milne par `reviews` bhar dein aur showReviews: true.
     ------------------------------------------------------------------- */
  showReviews: false,
  reviews: [],

  /* ---------- 6. BOOKING FORM DROPDOWN -------------------------------- */
  serviceOptions: [
    "Simple & Minimal (₹200 se)",
    "Floral & Arabic (₹400 se)",
    "Festive / Karwa Chauth (₹700 se)",
    "Peacock & Motif (₹900 se)",
    "Half Hand (₹1,300 se)",
    "Portrait & Couple — dulha-dulhan (₹2,500 se)",
    "Bridal Full Hand (₹3,500 se)",
    "Bridal Package — haath + pair (₹6,000 se)",
    "Sirf Groom / Dulha mehndi (₹800)",
    "Guest / Family mehndi (₹200 per hand)",
    "Kuch aur — puchhna hai",
  ],
};

window.SITE = SITE;
