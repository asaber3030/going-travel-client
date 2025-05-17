"use server"

import { getRequest } from "@/lib/axios"

import { UIFullTour, UITour } from "@/types/ui"
import { loadDefaultHeaders } from "@/lib/api"
import { getDefaultCookies } from "@/actions/app"

export async function getUITourDetails(id: number): Promise<UIFullTour | null> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<UIFullTour>(`/ui/tours/${id}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    return null
  }
}

export async function getRelatedTours(id: number): Promise<UITour[]> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<UITour[]>(`/ui/tours/${id}/related`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    console.log({ error })
    return []
  }
}
