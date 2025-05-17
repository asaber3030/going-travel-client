"use server"

import { getRequest } from "@/lib/axios"
import { build } from "search-params"

import { UIHotel } from "@/types/ui"
import { ApiError, PaginatedData } from "@/types"
import { getDefaultCookies } from "@/actions/app"
import { loadDefaultHeaders } from "@/lib/api"

export async function getUIHotels(sp: Record<string, string | number> = { take: 12 }): Promise<PaginatedData<UIHotel>> {
  try {
    const { token, language } = await getDefaultCookies()
    const params = build(sp)
    const response = await getRequest<PaginatedData<UIHotel>>(`/ui/hotels/all/paginated?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    console.error(error)
    const err = error as ApiError<any>
    throw new Error(err?.message || "Failed to fetch hotels")
  }
}

export async function getUIHotelById(id: number): Promise<UIHotel> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<UIHotel>(`/hotel-ui/${id}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error(`Failed to fetch hotel by ID: ${id}`)
  }
}
