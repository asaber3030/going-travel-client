"use server"

import { getRequest } from "@/lib/axios"
import { build } from "search-params"

import { UILocation, UITour, UIReview } from "@/types/ui"
import { PaginatedData } from "@/types"
import { getLocale } from "next-intl/server"
import { loadDefaultHeaders } from "@/lib/api"
import { getDefaultCookies } from "@/actions/app"

export async function getUILocations(sp: Record<string, string | number> = { take: 6 }): Promise<UILocation[]> {
  try {
    const params = build(sp)
    const response = await getRequest<UILocation[]>(`/ui/locations?${params}`)
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch destinations")
  }
}

export async function getUITours(sp: Record<string, string | number> = { take: 12 }): Promise<PaginatedData<UITour>> {
  try {
    const params = build(sp)
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<PaginatedData<UITour>>(`/ui/tours/all/paginated?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch tours")
  }
}

export async function getUIPopularTours(sp: Record<string, string | number> = { take: 6 }): Promise<UITour[]> {
  try {
    const params = build(sp)
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<UITour[]>(`/ui/tours/all/popular-tours?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch popular tours")
  }
}

export async function getUIReviews(sp: Record<string, string | number> = { take: 6 }): Promise<UIReview[]> {
  try {
    const params = build(sp)
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<UIReview[]>(`/ui/reviews?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch reviews")
  }
}
