"use server"

import { getDefaultCookies, getToken } from "@/actions/app"
import { loadDefaultHeaders } from "@/lib/api"
import { getRequest, postRequest } from "@/lib/axios"
import { ApiError, TSettings, TServiceCard } from "@/types"

export async function getSettings() {
  try {
    const token = await getToken()
    const res = await getRequest<TSettings[]>(`admin/settings`, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    throw new Error(err?.message || "Something went wrong")
  }
}

export async function updateSettingsById(key: string, locale: string, value: string) {
  try {
    const token = await getToken()

    const res = await postRequest(
      `admin/settings/update/${key}`,
      {
        value,
        locale
      },
      loadDefaultHeaders(token)
    )
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err?.message || "Something went wrong")
  }
}

export async function getServiceCards() {
  try {
    const token = await getToken()
    const res = await getRequest<TServiceCard[]>(`/admin/service-cards`, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    throw new Error(err?.message || "Something went wrong")
  }
}

export async function getServiceCard(id: number) {
  try {
    const token = await getToken()
    const res = await getRequest<TServiceCard>(`/admin/service-cards/${id}`, loadDefaultHeaders(token))
    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    throw new Error(err?.message || "Something went wrong")
  }
}

export async function updateServiceCardById(id: number, data: any, file: File | null) {
  try {
    const { token, language } = await getDefaultCookies()
    const formData = new FormData()

    if (file) formData.append("image", file)

    formData.append("key", data.key)
    formData.append("url", data.url)
    formData.append("enabled", data.enabled)

    data.translations.map((translation: any, index: any) => {
      formData.append(`translations[${index}][locale]`, translation.locale)
      formData.append(`translations[${index}][title]`, translation.title)
      formData.append(`translations[${index}][description]`, translation.description)
    })

    const res = await postRequest(
      `admin/service-cards/${id}`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    )

    return res.data
  } catch (error) {
    const err = error as ApiError<any>
    console.error(err)
    throw new Error(err?.message || "Something went wrong")
  }
}
