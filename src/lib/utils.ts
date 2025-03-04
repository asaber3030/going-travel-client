import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { AvailableLanguages } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isLanguageExists(lang: string | undefined) {
  return AvailableLanguages.includes(lang ?? "") ? lang : "en";
}
