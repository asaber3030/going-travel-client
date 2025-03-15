export const LANGUAGE_COOKIE = "language";
export const AvailableLanguages = ["en", "ar", "fr", "pt", "it", "de"];
export const Languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic" },
  { code: "fr", name: "French" },
  { code: "pt", name: "Portuguese" },
  { code: "it", name: "Italien" },
  { code: "de", name: "Germany" }
];
export const LOGO_PATH = "/images/logo/main.png";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const TOKEN_EXPIRATION_DATE = Date.now() + 24 * 60 * 60 * 1000 * 30;

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
};
