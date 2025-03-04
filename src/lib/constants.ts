export const LANGUAGE_COOKIE = "language";
export const AvailableLanguages = ["en", "ar", "fr", "pr"];
export const Languages = [
  { code: "en", name: "English" },
  { code: "ar", name: "Arabic" },
  { code: "fr", name: "French" },
  { code: "pr", name: "Portuguese" }
];
export const LOGO_PATH = "/images/logo/main.png";
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const TOKEN_EXPIRATION_DATE = Date.now() + 24 * 60 * 60 * 1000 * 30;
