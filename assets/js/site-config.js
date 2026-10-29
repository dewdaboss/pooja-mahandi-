/* =========================================================================
   POOJA BRIDAL MEHNDI  —  SITE CONFIG
   -------------------------------------------------------------------------
   Poora content yahin se control hota hai. (Sab kuch ek jagah!)
   Kuch bhi badalna ho to sirf is file mein edit karke save kar dein.
   ========================================================================= */

const SITE = {
  /* ---------- 1. BASIC DETAILS ------------------------------------------ */
  name: "Pooja Bridal Mehndi",
  artist: "Pooja",
  city: "Indore",
  state: "Madhya Pradesh",

  /* WhatsApp number: country code + number, bina + ke, bina space ke */
  whatsapp: "919755550380",
  phoneDisplay: "+91 97555 50380",

  instagramHandle: "pooja_bridal_mehndi._",
  instagramUrl: "https://www.instagram.com/pooja_bridal_mehndi._",

  startingPrice: "₹200",
  timings: "Roz — subah 9:00 se raat 9:00 tak",
  responseTime: "WhatsApp par 15–30 min mein reply",

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

  /* ---------- 3. PORTFOLIO GALLERY --------------------------------------
     Naye photos add karne ke liye bas ek line copy karein.
     "src"  = image ka path (assets/img/opt/ folder mein rakhein)
     "cat"  = bridal | arabic | minimal | feet | detail
     "title" = photo ka naam (chhota sa)
     ------------------------------------------------------------------- */
  gallery: [
    {
      src: "assets/img/opt/bridal-palms-1200.webp",
      thumb: "assets/img/opt/bridal-palms-480.webp",
      cat: "bridal",
      title: "Full Hand Bridal Mandala",
      alt: "Bridal mehndi with large mandala design on both palms in Indore",
    },
    {
      src: "assets/img/opt/hero-hands-1200.webp",
      thumb: "assets/img/opt/hero-hands-480.webp",
      cat: "bridal",
      title: "Dulhan Special — Haath & Kalai",
      alt: "Heavy bridal mehndi covering hands and forearms with gold bangles",
    },
    {
      src: "assets/img/opt/rajwadi-1024.webp",
      thumb: "assets/img/opt/rajwadi-480.webp",
      cat: "bridal",
      title: "Rajwadi Peacock Design",
      alt: "Rajasthani rajwadi peacock mehndi design on hand and wrist",
    },
    {
      src: "assets/img/opt/arabic-bold-1024.webp",
      thumb: "assets/img/opt/arabic-bold-480.webp",
      cat: "arabic",
      title: "Arabic Floral Flows",
      alt: "Bold Arabic mehndi design with floral vines",
    },
    {
      src: "assets/img/opt/arabic-mehndi-1024.webp",
      thumb: "assets/img/opt/arabic-mehndi-480.webp",
      cat: "arabic",
      title: "Indo-Arabic Vine Trail",
      alt: "Indo-Arabic mehndi with leafy vine trail",
    },
    {
      src: "assets/img/opt/minimal-1024.webp",
      thumb: "assets/img/opt/minimal-480.webp",
      cat: "minimal",
      title: "Minimal Karwa Chauth Special",
      alt: "Minimal thin-line mehndi design on hand",
    },
    {
      src: "assets/img/opt/feet-1200.webp",
      thumb: "assets/img/opt/feet-480.webp",
      cat: "feet",
      title: "Bridal Feet Mehndi",
      alt: "Bridal mehndi design on feet with mandala motifs",
    },
    {
      src: "assets/img/opt/application-1200.webp",
      thumb: "assets/img/opt/application-480.webp",
      cat: "detail",
      title: "Ghar Par Mehndi — Live Application",
      alt: "Mehndi artist applying henna with cone at client's home in Indore",
    },
    {
      src: "assets/img/opt/bridal-hands-1200.webp",
      thumb: "assets/img/opt/bridal-hands-480.webp",
      cat: "bridal",
      title: "Bridal Portrait — Rich Stain",
      alt: "Deep rich henna stain on bride's hands with gold jewellery",
    },
  ],

  /* ---------- 4. REVIEWS ------------------------------------------------
     ⚠️ IMPORTANT: Neeche wale reviews SAMPLE hain.
     Inhe apne asli clients ke reviews se replace karein, warna website par
     fake reviews dikhenge. (Jab tak replace nahi karte, section hidden rahega
     agar aap showReviews=false kar dete hain.)
     ------------------------------------------------------------------- */
  showReviews: false, // asli reviews milne par true kar dein
  reviews: [
    {
      text: "Meri shaadi ke liye itni detailed mehndi aayi thi, colour bhi bahut dark aaya. Sabne poocha kisne lagayi!",
      name: "Sneha P.",
      detail: "Bridal Mehndi — Vijay Nagar",
    },
    {
      text: "Time se pehle pahunch gayi, bahut calm aur professional. Design bilkul waisa hi bana jaisa maine photo dikhayi thi.",
      name: "Ritika S.",
      detail: "Sangeet Mehndi — Palasia",
    },
    {
      text: "Karwa Chauth ke liye ghar par hi lagwa li, budget mein aur bahut sundar. Thank you Pooja di!",
      name: "Anjali V.",
      detail: "Minimal Design — Rau",
    },
  ],

  /* ---------- 5. BOOKING FORM DROPDOWNS -------------------------------- */
  serviceOptions: [
    "Bridal Full Mehndi (haath + pair)",
    "Bridal Hand only",
    "Arabic / Indo-Arabic design",
    "Simple & Minimal design",
    "Karwa Chauth / Teej special",
    "Guest / Family mehndi (group)",
    "Kuch aur — puchhna hai",
  ],
};

/* Export for app.js */
window.SITE = SITE;
