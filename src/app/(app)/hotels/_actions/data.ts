"use server"

import { getRequest } from "@/lib/axios"
import { build } from "search-params"

import { UIHotel } from "@/types/ui"
import { PaginatedData } from "@/types"

export async function getUIHotels(sp: Record<string, string | number> = { take: 12 }): Promise<PaginatedData<UIHotel>> {
  try {
    const params = build(sp)
    const response = await getRequest<PaginatedData<UIHotel>>(`/ui/hotels?${params}`)
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch limousines")
  }
}

export async function getUIHotelById(id: number): Promise<UIHotel> {
  try {
    const response = await getRequest<UIHotel>(`/ui/hotels/${id}`)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch limousine by ID: ${id}`)
  }
}
