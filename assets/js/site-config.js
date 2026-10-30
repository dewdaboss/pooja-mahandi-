/* =========================================================================
   POOJA BRIDAL MEHNDI  —  SITE CONFIG
   -------------------------------------------------------------------------
   Poora content yahin se control hota hai (ek hi jagah).

   ⚠️  PRICE NOTE: neeche diye rate *suggestion* hain (design ki difficulty ke
   hisaab se, easy se bridal tak). Final rate Pooja di confirm karein.
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

  /* ---------- 3. CATEGORIES (portfolio + price list) --------------------
     Order = easy → bridal. Portfolio page isi order mein sections banata hai.
     Naya category jodna ho to neeche ek aur object add kar dein.
     --------------------------------------------------------------------- */
  categories: [
    {
      slug: "minimal",
      name: "Simple & Minimal",
      tag: "Sabse aasan — yahin se shuru",
      price: "₹200",
      from: true,
      time: "20–30 min",
      blurb:
        "Ek chhota mandala, halka floral motif ya sirf wrist band — roz ke liye, office ke liye, ya pehli baar mehndi lagwane ke liye perfect.",
      points: ["Ek haath, halka design", "20–30 minute ka kaam", "Karwa Chauth & Teej friendly"],
    },
    {
      slug: "festive",
      name: "Festive & Karwa Chauth",
      tag: "Tyohaar special",
      price: "₹400",
      from: true,
      time: "40–60 min",
      blurb:
        "Dono haathon par mandala ya lotus, kalai par band — Karwa Chauth, Teej, Rakhi aur pooja ke liye sabse pasandida choice.",
      points: ["Dono haath + kalai band", "Lotus / mandala style", "Pooja & vrat ke liye"],
    },
    {
      slug: "arabic",
      name: "Arabic & Floral",
      tag: "Modern look",
      price: "₹600",
      from: true,
      time: "45–70 min",
      blurb:
        "Bold floral vines, leafy trails aur chandelier patterns — kam space mein zyada impact. Front ya back hand, dono par.",
      points: ["Bold floral & leafy trails", "Front ya back hand", "Finger tips included"],
    },
    {
      slug: "portrait",
      name: "Frame & Portrait Design",
      tag: "Story wali mehndi",
      price: "₹1,500",
      from: true,
      time: "1.5–2.5 ghante",
      blurb:
        "Haath par dulha-dulhan ki figure, chhatri, kalash ya mandir ka frame — aapki kahani, aapke haath par. Photo reference se banti hai.",
      points: ["Dulha-dulhan / chhatri figures", "Aapke photo se custom frame", "Sangeet & engagement special"],
    },
    {
      slug: "rajwadi",
      name: "Rajwadi Bridal",
      tag: "Dulhan ke liye",
      price: "₹2,500",
      from: true,
      time: "2–3 ghante",
      blurb:
        "Peacock, haathi, mandir aur jaali — poora haath bharke traditional bridal design, kalai aur forearm tak.",
      points: ["Peacock, elephant & mandir motifs", "Full front + back + wrist", "Dulhan ki pehli pasand"],
    },
    {
      slug: "bridal-package",
      name: "Bridal Package — Haath + Pair",
      tag: "Dulhan Special",
      price: "₹5,000",
      from: true,
      time: "3–4 ghante",
      blurb:
        "Shaadi ke din ka complete look — rajwadi haath aur pair ki mehndi, ek hi sitting mein. Trial design discussion WhatsApp par.",
      points: ["Rajwadi haath + pair mehndi", "Trial design discussion free", "Family / guest mehndi add-on"],
      feature: true,
      noGallery: true,
    },
  ],

  /* ---------- 4. PORTFOLIO (18 designs) ---------------------------------
     Naya photo add karne ke liye ek line copy-paste karein.
     cat = categories ke slug se match hona chahiye.
     --------------------------------------------------------------------- */
  gallery: [
    {
      src: "assets/img/opt/minimal-1-654.webp",
      thumb: "assets/img/opt/minimal-1-480.webp",
      cat: "minimal",
      title: "Mandala Palms — Halka Look",
      alt: "Simple mandala mehndi on both palms with wrist band, light design",
    },
    {
      src: "assets/img/opt/minimal-4-735.webp",
      thumb: "assets/img/opt/minimal-4-480.webp",
      cat: "minimal",
      title: "Single Mandala — Clean Design",
      alt: "Single round mandala mehndi on palm with minimal wrist band",
    },
    {
      src: "assets/img/opt/minimal-2-736.webp",
      thumb: "assets/img/opt/minimal-2-480.webp",
      cat: "minimal",
      title: "Floral Dot + Wrist Band",
      alt: "Small floral dot mehndi motif on hand with delicate wrist band",
    },
    {
      src: "assets/img/opt/minimal-3-736.webp",
      thumb: "assets/img/opt/minimal-3-480.webp",
      cat: "minimal",
      title: "Deep Red Sun Mandala",
      alt: "Deep red sun mandala mehndi on both palms, dark stain",
    },
    {
      src: "assets/img/opt/festive-1-736.webp",
      thumb: "assets/img/opt/festive-1-480.webp",
      cat: "festive",
      title: "Lotus Mandala — Dono Haath",
      alt: "Lotus mandala mehndi on both palms with leaf bands, festive design",
    },
    {
      src: "assets/img/opt/festive-2-736.webp",
      thumb: "assets/img/opt/festive-2-480.webp",
      cat: "festive",
      title: "Karwa Chauth Special",
      alt: "Karwa Chauth mehndi with mandala and jewelled wrist band",
    },
    {
      src: "assets/img/opt/arabic-1-720.webp",
      thumb: "assets/img/opt/arabic-1-480.webp",
      cat: "arabic",
      title: "Bold Indo-Arabic Fill",
      alt: "Bold Indo-Arabic mehndi with filled palm and dotted trails",
    },
    {
      src: "assets/img/opt/arabic-2-735.webp",
      thumb: "assets/img/opt/arabic-2-480.webp",
      cat: "arabic",
      title: "Floral Vine Half Hand",
      alt: "Floral vine Arabic mehndi on half hand with leaves and flowers",
    },
    {
      src: "assets/img/opt/arabic-3-736.webp",
      thumb: "assets/img/opt/arabic-3-480.webp",
      cat: "arabic",
      title: "Chandelier Trails",
      alt: "Chandelier jhumka trail mehndi design on both hands with mandala",
    },
    {
      src: "assets/img/opt/arabic-4-736.webp",
      thumb: "assets/img/opt/arabic-4-480.webp",
      cat: "arabic",
      title: "Lotus Motif — Arabic Style",
      alt: "Lotus motif Arabic mehndi with leafy wrist band on both hands",
    },
    {
      src: "assets/img/opt/portrait-1-736.webp",
      thumb: "assets/img/opt/portrait-1-480.webp",
      cat: "portrait",
      title: "Dulhan Pallu Portrait",
      alt: "Bridal mehndi with bride figure wearing lehenga pallu on hand",
    },
    {
      src: "assets/img/opt/portrait-4-736.webp",
      thumb: "assets/img/opt/portrait-4-480.webp",
      cat: "portrait",
      title: "Bride & Groom with Dome",
      alt: "Bridal mehndi portrait of bride and groom under a dome with swans",
    },
    {
      src: "assets/img/opt/portrait-2-688.webp",
      thumb: "assets/img/opt/portrait-2-480.webp",
      cat: "portrait",
      title: "Dulha-Dulhan Story Frame",
      alt: "Mehndi design with diamond frame containing bride and groom portrait",
    },
    {
      src: "assets/img/opt/portrait-3-736.webp",
      thumb: "assets/img/opt/portrait-3-480.webp",
      cat: "portrait",
      title: "Chhatri & Kalash Frames",
      alt: "Bridal mehndi with chhatri, kalash and bride figure inside geometric frames",
    },
    {
      src: "assets/img/opt/rajwadi-2-736.webp",
      thumb: "assets/img/opt/rajwadi-2-480.webp",
      cat: "rajwadi",
      title: "Lotus Rajwadi — Full Hand",
      alt: "Rajwadi style lotus mehndi covering full hands with elephant motifs",
    },
    {
      src: "assets/img/opt/rajwadi-4-735.webp",
      thumb: "assets/img/opt/rajwadi-4-480.webp",
      cat: "rajwadi",
      title: "Peacock Rajwadi Bridal",
      alt: "Rajwadi bridal mehndi with peacock inside floral frame on both hands",
    },
    {
      src: "assets/img/opt/rajwadi-3-736.webp",
      thumb: "assets/img/opt/rajwadi-3-480.webp",
      cat: "rajwadi",
      title: "Traditional Bridal Full Coverage",
      alt: "Full coverage traditional bridal mehndi on both hands with dense mandalas",
    },
    {
      src: "assets/img/opt/rajwadi-1-736.webp",
      thumb: "assets/img/opt/rajwadi-1-480.webp",
      cat: "rajwadi",
      title: "Rajwadi Elephant & Mandir",
      alt: "Rajwadi bridal mehndi with elephant, mandir and bride figure motifs",
    },
  ],

  /* ---------- 5. REVIEWS ------------------------------------------------
     ⚠️ Asli client reviews milne par `reviews` mein daalein aur
     showReviews: true kar dein. Tab tak section hidden rehta hai.
     ------------------------------------------------------------------- */
  showReviews: false,
  reviews: [
    {
      text: "Meri shaadi ke liye itni detailed mehndi aayi thi, colour bhi bahut dark aaya.",
      name: "Sneha P.",
      detail: "Bridal Mehndi — Vijay Nagar",
    },
  ],

  /* ---------- 6. BOOKING FORM DROPDOWN -------------------------------- */
  serviceOptions: [
    "Simple & Minimal (₹200 se)",
    "Festive / Karwa Chauth (₹400 se)",
    "Arabic & Floral (₹600 se)",
    "Frame & Portrait (₹1,500 se)",
    "Rajwadi Bridal (₹2,500 se)",
    "Bridal Package — haath + pair (₹5,000 se)",
    "Guest / Family mehndi (group)",
    "Kuch aur — puchhna hai",
  ],
};

window.SITE = SITE;
