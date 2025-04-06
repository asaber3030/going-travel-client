"use server"

import { getRequest } from "@/lib/axios"

import { UIFullTour, UITour } from "@/types/ui"

export async function getUITourDetails(id: number): Promise<UIFullTour | null> {
  try {
    const response = await getRequest<UIFullTour>(`/ui/tours/${id}`)
    return response.data
  } catch (error) {
    return null
  }
}

export async function getRelatedTours(id: number): Promise<UITour[]> {
  try {
    const response = await getRequest<UITour[]>(`/ui/tours/${id}/related`)
    return response.data
  } catch (error) {
    console.log({ error })
    return []
  }
}
