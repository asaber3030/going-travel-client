"use server"

import { getRequest } from "@/lib/axios"
import { build } from "search-params"

import { UITour, UICategory } from "@/types/ui"
import { PaginatedData } from "@/types"

export async function getUICategories(
  sp: Record<string, string | number> = { take: 6 }
): Promise<UICategory[]> {
  try {
    const params = build(sp)
    const response = await getRequest<UICategory[]>(`/ui/categories?${params}`)
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch categories")
  }
}
export async function getUICategory(id: number): Promise<UICategory | undefined> {
  try {
    const response = await getRequest<UICategory>(`/ui/categories/${id}`)
    return response.data
  } catch (error) {
    return undefined
  }
}
export async function getUICategoryTours(
  id: number,
  sp: Record<string, string | number> = { take: 6 }
): Promise<PaginatedData<UITour>> {
  try {
    const params = build(sp)
    const response = await getRequest<PaginatedData<UITour>>(`/ui/categories/${id}/tours?${params}`)
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch tours of category")
  }
}
