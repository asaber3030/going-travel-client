"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { getDefaultCookies } from "./app"
import { loginSchema } from "@/schema"
import { postRequest, getRequest } from "@/lib/axios"
import { cookies } from "next/headers"
import { z } from "zod"

import { ApiResponse, ApiError, User } from "@/types"

type LoginResponse = { token: string; user: User }

export async function login(credentials: z.infer<typeof loginSchema>): Promise<ApiResponse<LoginResponse>> {
  try {
    const { token, language } = await getDefaultCookies()

    const response = await postRequest<LoginResponse>("/auth/login", credentials, loadDefaultHeaders(token, language))

    const data: LoginResponse = response.data

    if (response.status === 200) {
      ;(await cookies()).set("token", data.token, {
        expires: new Date(Date.now() + (credentials.rememeberMe ? 7 : 1) * 24 * 60 * 60 * 1000)
      })
    }

    return response
  } catch (error) {
    const e = error as ApiError<any>
    console.log(e)
    return e
  }
}

export async function getUser(): Promise<User | null> {
  try {
    const { token } = await getDefaultCookies()
    const response = await getRequest<User>("/auth/me", loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    return null
  }
}

export async function getStats(): Promise<{
  total_tours: number
  total_limousines: number
  total_hotels: number
  total_locations: number
  total_categories: number
}> {
  try {
    const { token } = await getDefaultCookies()
    const response = await getRequest<{
      total_tours: number
      total_limousines: number
      total_hotels: number
      total_locations: number
      total_categories: number
    }>("/admin/statistics", loadDefaultHeaders(token))
    return response.data
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return {
      total_tours: 0,
      total_limousines: 0,
      total_hotels: 0,
      total_locations: 0,
      total_categories: 0
    }
  }
}

export async function logout() {
  try {
    ;(await cookies()).delete("token")
  } catch {
    return false
  }
}
