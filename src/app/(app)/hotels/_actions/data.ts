"use server"

import { getRequest } from "@/lib/axios"
import { build } from "search-params"
import { UIHotel } from "@/types/ui"
import { ApiError, PaginatedData } from "@/types"
import { getDefaultCookies } from "@/actions/app"
import { loadDefaultHeaders } from "@/lib/api"

export async function getUIHotels(sp: Record<string, string | number> = { take: 12 }): Promise<PaginatedData<UIHotel>> {
  try {
    const { language, token } = await getDefaultCookies()

    const params = build(sp)
    const response = await getRequest<PaginatedData<UIHotel>>(`/ui/hotels?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch hotels")
  }
}

export async function getUIHotelById(id: number): Promise<UIHotel> {
  const { language, token } = await getDefaultCookies()

  try {
    const response = await getRequest<UIHotel>(`/ui/hotels/${id}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch hotel")
  }
}
