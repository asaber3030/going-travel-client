"use server"

import { getRequest, postRequest } from "@/lib/axios"

import { z } from "zod"
import { loadDefaultHeaders } from "@/lib/api"
import { API_URL, DummyPaginationData } from "@/lib/constants"
import { getDefaultCookies, getToken } from "@/actions/app"
import { LocationSchema } from "@/schema"

import { APIResponse, PaginatedData, Location, ApiError } from "@/types"
import { routes } from "@/lib/route"
import { revalidatePath } from "next/cache"

export async function getLocations(page: number): Promise<PaginatedData<Location>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await fetch(`${API_URL}/admin/locations?page=${page}`, {
      headers: loadDefaultHeaders(token, language)
    })

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`)
      return DummyPaginationData
    }

    const data: APIResponse<PaginatedData<Location>> = await response.json()
    return data.data
  } catch (error) {
    console.log({ error })
    return DummyPaginationData
  }
}

export async function getAllLocations(search?: string): Promise<Location[]> {
  try {
    const { language, token } = await getDefaultCookies()
    const response = await getRequest<Location[]>(`admin/locations/all`, loadDefaultHeaders(token, language))
    const data = response.data
    return data
  } catch (error) {
    return []
  }
}

export async function getLocation(locationId: number): Promise<Location | undefined> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await fetch(`${API_URL}/admin/locations/${locationId}`, {
      headers: loadDefaultHeaders(token, language)
    })

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`)
      return undefined
    }

    const data: APIResponse<Location> = await response.json()
    return data.data
  } catch (error) {
    console.log({ error })
  }
}

export async function getTrashedLocations(page: number): Promise<PaginatedData<Location>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await fetch(`${API_URL}/admin/locations/trashed?page=${page}`, loadDefaultHeaders(token, language))
    const data: APIResponse<PaginatedData<Location>> = await response.json()
    return data.data
  } catch (error) {
    console.log({ error })
    return DummyPaginationData
  }
}

export async function deleteLocation(locationId: number): Promise<APIResponse<undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await fetch(`${API_URL}/admin/locations/${locationId}`, {
      method: "DELETE",
      headers: loadDefaultHeaders(token, language)
    })
    const data: APIResponse<undefined> = await response.json()
    return data
  } catch (error) {
    return {
      message: "Error Occurred while deleting location",
      status: 500,
      data: undefined
    }
  }
}
export async function restoreLocation(locationId: number): Promise<APIResponse<Location | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await fetch(`${API_URL}/admin/locations/${locationId}/restore`, {
      method: "POST",
      headers: loadDefaultHeaders(token, language)
    })
    const data: APIResponse<Location> = await response.json()
    return data
  } catch (error) {
    console.log({ error })
    return {
      message: "Error occurred while restoring location",
      status: 500,
      data: undefined
    }
  }
}

export async function createLocation(locationData: z.infer<typeof LocationSchema.Create>, file: File | null): Promise<APIResponse<Location | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const formData = new FormData()

    if (file) formData.append("image", file)
    formData.append("name", locationData.name)
    formData.append("map_url", locationData.map_url)

    const response = await postRequest<Location | undefined>(
      `/admin/locations`,
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

export async function updateLocation(locationId: number, file: File | null, locationData: z.infer<typeof LocationSchema.Update>): Promise<APIResponse<Location | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const formData = new FormData()

    if (file) formData.append("image", file)
    formData.append("name", locationData.name)
    formData.append("map_url", locationData.map_url)

    const response = await postRequest<Location | undefined>(
      `/admin/locations/${locationId}`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    )

    revalidatePath(routes.locations.index)

    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}
