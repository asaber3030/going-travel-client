"use server"

import { ApiResponse, APIResponse, ApiError, PaginatedData } from "@/types"
import { API_URL, DummyPaginationData } from "@/lib/constants"
import { HotelSchema, UpdateHotelSchema } from "@/schema"

import { getDefaultCookies } from "@/actions/app"
import { getRequest, postRequest, deleteRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"

import { build } from "search-params"

import { z } from "zod"

export async function getHotels(page: number): Promise<PaginatedData<any>> {
  try {
    const { token, language } = await getDefaultCookies()
    const sp = build({ page })
    const response = await getRequest<PaginatedData<any>>(`/admin/hotels` + (sp ? `?${sp}` : ""), loadDefaultHeaders(token, language))
    const data = response.data
    return data
  } catch (error) {
    const e = error as ApiError<any>
    console.dir(e, { depth: null })
    throw new Error("failed to fetch hotels")
  }
}

export async function getHotel(hotelId: number): Promise<any | undefined> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<any>(`/admin/hotels/${hotelId}`, loadDefaultHeaders(token, language))
    const data = response.data
    return data
  } catch (error) {
    return undefined
  }
}

export async function getTrashedHotels(page: number): Promise<PaginatedData<any>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await fetch(`${API_URL}/admin/hotels/trashed?page=${page}`, loadDefaultHeaders(token, language))
    const data: APIResponse<PaginatedData<any>> = await response.json()
    return data.data
  } catch (error) {
    console.log({ error })
    return DummyPaginationData
  }
}

export async function deleteHotel(hotelId: number): Promise<APIResponse<any | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await deleteRequest<any | undefined>(`${API_URL}/admin/hotels/${hotelId}`, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const e = error as ApiError<any>
    return e
  }
}

export async function restoreHotel(hotelId: number): Promise<APIResponse<any | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<any | undefined>(`/admin/hotels/restore/${hotelId}`, null, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    console.log({ error })
    return {
      message: "Error occurred while restoring tour",
      status: 500,
      data: undefined
    }
  }
}

export type CreateHotelData = z.infer<typeof HotelSchema>

export async function createHotel(thumbnail: File | null, banner: File | null, data: CreateHotelData): Promise<APIResponse<any | undefined>> {
  try {
    const { language, token } = await getDefaultCookies()

    const formData = new FormData()

    if (thumbnail) formData.append("thumbnail", thumbnail)
    if (banner) formData.append("banner", banner)

    formData.append("price", String(data.price))
    formData.append("stars", data.stars.toString())

    formData.append("category_id", String(data.category_id))
    formData.append("location_id", String(data.location_id))

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale)
      formData.append(`translations[${index}][name]`, translation.name)
      formData.append(`translations[${index}][description]`, translation.description)
      formData.append(`translations[${index}][short_description]`, translation.short_description)
      formData.append(`translations[${index}][policy]`, translation.policy)
      formData.append(`translations[${index}][room_types]`, translation.room_types)
      formData.append(`translations[${index}][address]`, translation.address)
      formData.append(`translations[${index}][slug]`, translation.slug)
    })
    formData.append("amenity[free_wifi]", data.amenity.free_wifi!)
    formData.append("amenity[spa_wellness_center]", data.amenity.spa_wellness_center!)
    formData.append("amenity[fitness_center]", data.amenity.fitness_center!)
    formData.append("amenity[gourmet_restaurant]", data.amenity.gourmet_restaurant!)
    formData.append("amenity[indoor_outdoor_pools]", data.amenity.indoor_outdoor_pools!)
    formData.append("amenity[air_conditioning]", data.amenity.air_conditioning!)
    formData.append("amenity[flat_screen_tv]", data.amenity.flat_screen_tv!)
    formData.append("amenity[free_parking]", data.amenity.free_parking!)
    formData.append("amenity[front_desk_24h]", data.amenity.front_desk_24h!)

    const response = await postRequest<any>(
      "/admin/hotels",
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    )
    return response
  } catch (error) {
    console.dir(error, { depth: null })
    const err = error as ApiError<any>
    return err
  }
}

export async function updateHotel(id: number, thumbnail: File | null, banner: File | null, data: z.infer<typeof UpdateHotelSchema>): Promise<APIResponse<any | undefined>> {
  try {
    const { language, token } = await getDefaultCookies()

    const formData = new FormData()

    if (thumbnail) formData.append("thumbnail", thumbnail)
    if (banner) formData.append("banner", banner)

    formData.append("price", String(data.price))
    formData.append("stars", data.stars.toString())

    formData.append("category_id", String(data.category_id))
    formData.append("location_id", String(data.location_id))

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale)
      formData.append(`translations[${index}][name]`, translation.name)
      formData.append(`translations[${index}][description]`, translation.description)
      formData.append(`translations[${index}][short_description]`, translation.short_description)
      formData.append(`translations[${index}][policy]`, translation.policy)
      formData.append(`translations[${index}][room_types]`, translation.room_types)
      formData.append(`translations[${index}][address]`, translation.address)
      formData.append(`translations[${index}][slug]`, translation.slug)
    })

    formData.append("amenity[free_wifi]", data.amenity.free_wifi!)
    formData.append("amenity[spa_wellness_center]", data.amenity.spa_wellness_center!)
    formData.append("amenity[fitness_center]", data.amenity.fitness_center!)
    formData.append("amenity[gourmet_restaurant]", data.amenity.gourmet_restaurant!)
    formData.append("amenity[indoor_outdoor_pools]", data.amenity.indoor_outdoor_pools!)
    formData.append("amenity[air_conditioning]", data.amenity.air_conditioning!)
    formData.append("amenity[flat_screen_tv]", data.amenity.flat_screen_tv!)
    formData.append("amenity[free_parking]", data.amenity.free_parking!)
    formData.append("amenity[front_desk_24h]", data.amenity.front_desk_24h!)

    const response = await postRequest<any>(
      `/admin/hotels/${id}`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    )
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}
