export const LANGUAGE_COOKIE = "language"
export const AvailableLanguages = ["en", "ar", "fr", "pt", "it", "dt", "sp", "ch"]
export const Languages = [
  { code: "en", name: "English", flag: "/langs/en.webp" },
  { code: "ar", name: "Arabic", flag: "/langs/ar.webp" },
  { code: "fr", name: "French", flag: "/langs/fr.png" },
  { code: "pt", name: "Portuguese", flag: "/langs/pt.png" },
  { code: "it", name: "Italian", flag: "/langs/it.webp" },
  { code: "dt", name: "Germany", flag: "/langs/dt.webp" },
  { code: "sp", name: "Spanish", flag: "/langs/sp.png" },
  { code: "ch", name: "Chinese", flag: "/langs/ch.webp" }
]
export const LOGO_PATH = "/images/logo/main.png"
export const API_URL = process.env.NEXT_PUBLIC_API_URL
export const TOKEN_EXPIRATION_DATE = Date.now() + 24 * 60 * 60 * 1000 * 30

export const PHONE = "+201113030166"
export const WHATSAPP = "https://wa.me/201113030166"
export const EMAIL = "info@goingtravel.net"

export const DummyPaginationData = {
  current_page: 0,
  data: [],
  first_page_url: "string",
  from: 0,
  last_page: 0,
  last_page_url: null,
  links: [],
  next_page_url: null,
  path: "",
  per_page: 0,
  prev_page_url: null,
  to: null,
  total: 0
}

export const TourTranslationsExample = [
  {
    locale: "en",
    title: "Priscilla Yang",
    description: "Rerum voluptates aut",
    distance_description: "Sit voluptatem Ea"
  },
  {
    locale: "ar",
    title: "بريسيلا يانغ",
    description: "روم فولوبتاتيس أوت",
    distance_description: "سيت فولوبتاتيم إي"
  },
  {
    locale: "fr",
    title: "Priscilla Yang",
    description: "Rerum voluptates aut",
    distance_description: "Sit voluptatem Ea"
  },
  {
    locale: "pt",
    title: "Priscilla Yang",
    description: "Rerum voluptates aut",
    distance_description: "Sit voluptatem Ea"
  },
  {
    locale: "it",
    title: "Priscilla Yang",
    description: "Rerum voluptates aut",
    distance_description: "Sit voluptatem Ea"
  },
  {
    locale: "de",
    title: "Priscilla Yang",
    description: "Rerum voluptates aut",
    distance_description: "Sit voluptatem Ea"
  }
]
