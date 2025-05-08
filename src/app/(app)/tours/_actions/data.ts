"use server"

import { getRequest } from "@/lib/axios"
import { build } from "search-params"

import { UILocation, UITour, UIReview } from "@/types/ui"
import { ApiError, PaginatedData } from "@/types"
import { getDefaultCookies } from "@/actions/app"
import { loadDefaultHeaders } from "@/lib/api"

export async function getUILocations(sp: Record<string, string | number> = { take: 6 }): Promise<UILocation[]> {
  try {
    const { language, token } = await getDefaultCookies()

    const params = build(sp)
    const response = await getRequest<UILocation[]>(`/ui/locations?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch locations")
  }
}

export async function getUITours(sp: Record<string, string | number> = { take: 12 }): Promise<PaginatedData<UITour>> {
  try {
    const { language, token } = await getDefaultCookies()
    const params = build(sp)
    const response = await getRequest<PaginatedData<UITour>>(`/ui/tours/all/paginated?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch tours")
  }
}

export async function getUIPopularTours(sp: Record<string, string | number> = { take: 6 }): Promise<UITour[]> {
  try {
    const { language, token } = await getDefaultCookies()
    const params = build(sp)
    const response = await getRequest<UITour[]>(`/ui/tours/all/popular-tours?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch popular tours")
  }
}

export async function getUIReviews(sp: Record<string, string | number> = { take: 6 }): Promise<UIReview[]> {
  try {
    const { language, token } = await getDefaultCookies()
    const params = build(sp)
    const response = await getRequest<UIReview[]>(`/ui/reviews?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch reviews")
  }
}
