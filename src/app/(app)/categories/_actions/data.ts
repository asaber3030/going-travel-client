"use server"

import { getRequest } from "@/lib/axios"
import { build } from "search-params"

import { UITour, UICategory } from "@/types/ui"
import { PaginatedData } from "@/types"
import { loadDefaultHeaders } from "@/lib/api"
import { getDefaultCookies } from "@/actions/app"

export async function getUICategories(sp: Record<string, string | number> = { take: 6 }): Promise<UICategory[]> {
  try {
    const { token, language } = await getDefaultCookies()
    const params = build(sp)
    const response = await getRequest<UICategory[]>(`/ui/categories?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch categories")
  }
}
export async function getUICategory(id: number): Promise<UICategory | undefined> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<UICategory>(`/ui/categories/${id}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    return undefined
  }
}
export async function getUICategoryTours(id: number, sp: Record<string, string | number> = { take: 6 }): Promise<PaginatedData<UITour>> {
  try {
    const { token, language } = await getDefaultCookies()
    const params = build(sp)
    const response = await getRequest<PaginatedData<UITour>>(`/ui/categories/${id}/tours?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch tours of category")
  }
}
