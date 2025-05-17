"use server"

import { getRequest } from "@/lib/axios"
import { build } from "search-params"

import { UITour, UILocation } from "@/types/ui"
import { PaginatedData } from "@/types"
import { loadDefaultHeaders } from "@/lib/api"
import { getDefaultCookies } from "@/actions/app"

export async function getUILocations(sp: Record<string, string | number> = { take: 6 }): Promise<UILocation[]> {
  try {
    const { token, language } = await getDefaultCookies()
    const params = build(sp)
    const response = await getRequest<UILocation[]>(`/ui/locations?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch destinations")
  }
}
export async function getUILocation(id: number): Promise<UILocation | undefined> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<UILocation>(`/ui/locations/${id}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    return undefined
  }
}
export async function getUILocationTours(id: number, sp: Record<string, string | number> = { take: 6 }): Promise<PaginatedData<UITour>> {
  try {
    const { token, language } = await getDefaultCookies()
    const params = build(sp)
    const response = await getRequest<PaginatedData<UITour>>(`/ui/locations/${id}/tours?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch tours of location")
  }
}
