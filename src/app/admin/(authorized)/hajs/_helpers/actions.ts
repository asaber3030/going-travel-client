"use server"

import { loadDefaultHeaders } from "@/lib/api"
import { getDefaultCookies } from "@/actions/app"
import { revalidatePath } from "next/cache"
import { postRequest, getRequest } from "@/lib/axios"

import { APIResponse, ApiError, PaginatedData } from "@/types"
import { HajSchema } from "@/schema"
import { API_URL } from "@/lib/constants"

import { z } from "zod"

export async function getHajs(page: number): Promise<PaginatedData<any>> {
  try {
    const { language, token } = await getDefaultCookies()
    const request = await getRequest<PaginatedData<any>>(`/admin/hajs?page=${page}`, loadDefaultHeaders(token, language))
    return request.data
  } catch (error) {
    console.log(error)
    throw new Error("Failed tot fetch hajs")
  }
}

export async function getTrashedHajs(page: number): Promise<PaginatedData<any>> {
  try {
    const { language, token } = await getDefaultCookies()

    const request = await fetch(`${API_URL}/admin/hajs/trashed?page=${page}`, {
      method: "GET",
      headers: loadDefaultHeaders(token, language)
    })

    const data: APIResponse<PaginatedData<any>> = await request.json()

    return data.data
  } catch (error) {
    throw new Error("Failed to fetch trashed hajs")
  }
}

export async function getHaj(id: number): Promise<any | undefined> {
  try {
    const { language, token } = await getDefaultCookies()

    const request = await fetch(`${API_URL}/admin/hajs/${id}`, {
      method: "GET",
      headers: loadDefaultHeaders(token, language)
    })

    const data: APIResponse<any> = await request.json()
    return data.data
  } catch (error) {
    console.log({ error })
    throw new Error("failed to fetch haj")
  }
}

export async function deleteHaj(id: number): Promise<APIResponse<undefined>> {
  try {
    const { language, token } = await getDefaultCookies()

    const request = await fetch(`${API_URL}/admin/hajs/${id}`, {
      method: "DELETE",
      headers: loadDefaultHeaders(token, language)
    })

    const data: APIResponse<undefined> = await request.json()
    revalidatePath("/admin/hajs")
    return data
  } catch (error) {
    return { status: 500, message: "Internal Server Error", data: undefined }
  }
}

export async function restoreHaj(id: number): Promise<APIResponse<any | undefined>> {
  try {
    const { language, token } = await getDefaultCookies()

    const request = await fetch(`${API_URL}/admin/hajs/${id}/restore`, {
      method: "POST",
      headers: loadDefaultHeaders(token, language)
    })

    const data: APIResponse<any> = await request.json()
    revalidatePath("/admin/hajs/trashed")

    return data
  } catch (error) {
    return { status: 500, message: "Internal Server Error", data: undefined }
  }
}

export async function createHaj(banner: File | null, thumbnail: File | null, data: z.infer<typeof HajSchema>): Promise<APIResponse<any | undefined>> {
  try {
    const { language, token } = await getDefaultCookies()

    const formData = new FormData()
    if (banner) formData.append("banner", banner)
    if (thumbnail) formData.append("thumbnail", thumbnail)

    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("long_description", data.long_description)
    formData.append("price", data.price.toString())
    formData.append("type", data.type.toString())
    formData.append("cautions", data.cautions)
    formData.append("depature_date", data.depature_date.toString())
    formData.append("return_date", data.return_date.toString())
    formData.append("transportation_type", data.transportation_type)
    formData.append("hotel", data.hotel)
    formData.append("notes", data.notes)

    const response = await postRequest<any>(
      "/admin/hajs",
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

export async function updateHaj(hajId: number, banner: File | null, thumbnail: File | null, data: z.infer<typeof HajSchema>): Promise<APIResponse<any | undefined>> {
  try {
    const { language, token } = await getDefaultCookies()

    const formData = new FormData()

    if (banner) formData.append("banner", banner)
    if (thumbnail) formData.append("thumbnail", thumbnail)

    formData.append("title", data.title)
    formData.append("description", data.description)
    formData.append("long_description", data.long_description)
    formData.append("price", data.price.toString())
    formData.append("cautions", data.cautions)
    formData.append("type", data.type.toString())
    formData.append("depature_date", data.depature_date.toString())
    formData.append("return_date", data.return_date.toString())
    formData.append("transportation_type", data.transportation_type)
    formData.append("hotel", data.hotel)
    formData.append("notes", data.notes)

    const response = await postRequest<any>(
      `/admin/hajs/${hajId}`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    )

    return response
  } catch (error) {
    return { status: 500, message: "Internal Server Error", data: undefined }
  }
}
