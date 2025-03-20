"use server";

import { cookies } from "next/headers";

export async function getToken(): Promise<string> {
  const store = await cookies();
  const token = store.get("token")?.value || "";
  return token;
}

export async function getLanguage(): Promise<string> {
  const store = await cookies();
  const language = store.get("language")?.value || "";
  return language;
}

export async function getDefaultCookies() {
  const [language, token] = await Promise.all([getLanguage(), getToken()]);

  return {
    language,
    token
  };
}
