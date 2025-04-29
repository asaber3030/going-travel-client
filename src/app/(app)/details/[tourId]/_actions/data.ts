"use server"

import { getDefaultCookies } from "@/actions/app"
import { loadDefaultHeaders } from "@/lib/api"
import { getRequest } from "@/lib/axios"
import { ApiError } from "@/types"

import { UIFullTour, UITour } from "@/types/ui"

export async function getUITourDetails(id: number): Promise<UIFullTour | null> {
  try {
    const { language, token } = await getDefaultCookies()
    const response = await getRequest<UIFullTour>(`/ui/tours/${id}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch tour details")
  }
}

export async function getRelatedTours(id: number): Promise<UITour[]> {
  try {
    const { language, token } = await getDefaultCookies()
    const response = await getRequest<UITour[]>(`/ui/tours/${id}/related`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    console.log({ error })
    return []
  }
}
