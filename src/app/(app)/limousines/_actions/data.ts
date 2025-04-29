"use server"

import { getRequest } from "@/lib/axios"
import { build } from "search-params"

import { UILimousine } from "@/types/ui"
import { ApiError, PaginatedData } from "@/types"
import { getDefaultCookies } from "@/actions/app"
import { loadDefaultHeaders } from "@/lib/api"

export async function getUILimousines(sp: Record<string, string | number> = { take: 12 }): Promise<PaginatedData<UILimousine>> {
  const { language, token } = await getDefaultCookies()

  try {
    const params = build(sp)
    const response = await getRequest<PaginatedData<UILimousine>>(`/ui/limousines?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch limousines")
  }
}

export async function getUILimousineById(id: number): Promise<UILimousine> {
  try {
    const { language, token } = await getDefaultCookies()
    const response = await getRequest<UILimousine>(`/ui/limousines/${id}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch limousine")
  }
}
