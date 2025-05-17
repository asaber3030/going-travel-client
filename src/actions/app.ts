"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { postRequest } from "@/lib/axios"

import { cookies } from "next/headers"

export async function getToken(): Promise<string> {
  const store = await cookies()
  const token = store.get("token")?.value || ""
  return token
}

export async function getLanguage(): Promise<string> {
  const store = await cookies()
  const language = store.get("language")?.value || ""
  return language
}

export async function getDefaultCookies() {
  const [language, token] = await Promise.all([getLanguage(), getToken()])

  return {
    language,
    token
  }
}

export async function sendMail(data: any) {
  try {
    const { language, token } = await getDefaultCookies()
    const res = await postRequest("/send-email", data, loadDefaultHeaders(token, language))
    return res.data
  } catch (error) {
    const err = error as any
    throw new Error(err.message || "Failed to send email")
  }
}
