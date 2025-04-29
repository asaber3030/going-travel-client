"use server"

import { getRequest } from "@/lib/axios"
import { build } from "search-params"

import { UITour, UICategory } from "@/types/ui"
import { ApiError, PaginatedData } from "@/types"
import { getDefaultCookies } from "@/actions/app"
import { loadDefaultHeaders } from "@/lib/api"

export async function getUICategories(sp: Record<string, string | number> = { take: 6 }): Promise<UICategory[]> {
  try {
    const { language, token } = await getDefaultCookies()

    const params = build(sp)
    const response = await getRequest<UICategory[]>(`/ui/categories?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch categories")
  }
}
export async function getUICategory(id: number): Promise<UICategory | undefined> {
  try {
    const { language, token } = await getDefaultCookies()
    const response = await getRequest<UICategory>(`/ui/categories/${id}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch category")
  }
}
export async function getUICategoryTours(id: number, sp: Record<string, string | number> = { take: 6 }): Promise<PaginatedData<UITour>> {
  try {
    const { language, token } = await getDefaultCookies()
    const params = build(sp)
    const response = await getRequest<PaginatedData<UITour>>(`/ui/categories/${id}/tours?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch category tours")
  }
}
