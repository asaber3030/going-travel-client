"use server"

import { ApiResponse, APIResponse, ApiError, PaginatedData, Limousine, LimousineReview, LimousineService, LimousineSpecification, LimousineOverview, LimousineFeature, LimousineImage } from "@/types"
import { API_URL, DummyPaginationData } from "@/lib/constants"
import { LimousineFeatureSchema, LimousineOverviewSchema, LimousineReviewSchema, LimousineSchema, LimousineServiceSchema, LimousineSpecificationSchema } from "@/schema"

import { getDefaultCookies } from "@/actions/app"
import { getRequest, postRequest, deleteRequest, putRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"

import { build } from "search-params"
import { routes } from "@/lib/route"
import { revalidatePath } from "next/cache"
import { z } from "zod"

export async function getLimousines(page: number): Promise<ApiResponse<PaginatedData<Limousine>>> {
  try {
    const { token, language } = await getDefaultCookies()
    const sp = build({ page })
    const response = await getRequest<PaginatedData<Limousine>>(`/admin/limousines` + (sp ? `?${sp}` : ""), loadDefaultHeaders(token, language))
    const data = response
    return data
  } catch (error) {
    const e = error as ApiError<any>
    return e
  }
}

export async function getLimousine(limousineId: number): Promise<Limousine | undefined> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<Limousine>(`/admin/limousines/${limousineId}`, loadDefaultHeaders(token, language))
    const data = response.data
    return data
  } catch (error) {
    return undefined
  }
}

export async function getTrashedLimousines(page: number): Promise<PaginatedData<Limousine>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await fetch(`${API_URL}/admin/limousines/trashed?page=${page}`, loadDefaultHeaders(token, language))
    const data: APIResponse<PaginatedData<Limousine>> = await response.json()
    return data.data
  } catch (error) {
    console.log({ error })
    return DummyPaginationData
  }
}

export async function deleteLimousine(limousineId: number): Promise<APIResponse<Limousine | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await deleteRequest<Limousine | undefined>(`${API_URL}/admin/limousines/${limousineId}`, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const e = error as ApiError<any>
    return e
  }
}

export async function restoreLimousine(limousineId: number): Promise<APIResponse<Limousine | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<Limousine | undefined>(`/admin/limousines/${limousineId}/restore`, null, loadDefaultHeaders(token, language))
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

export type CreateLimousineData = z.infer<typeof LimousineSchema.Create>

export async function createLimousine(file: File | null, data: CreateLimousineData): Promise<APIResponse<Limousine | undefined>> {
  try {
    const { language, token } = await getDefaultCookies()

    const formData = new FormData()

    if (file) formData.append("image", file)

    formData.append("price_per_hour", String(data.price_per_hour))
    formData.append("type", data.type)
    formData.append("max_passengers", String(data.max_passengers))
    formData.append("category_id", String(data.category_id))
    formData.append("location_id", String(data.location_id))

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale)
      formData.append(`translations[${index}][name]`, translation.name)
      formData.append(`translations[${index}][description]`, translation.description)
    })

    const response = await postRequest<Limousine>(
      "/admin/limousines",
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

export async function updateLimousine(limousineId: number, file: File | null, data: CreateLimousineData): Promise<APIResponse<Limousine | undefined>> {
  try {
    const { language, token } = await getDefaultCookies()
    const formData = new FormData()

    if (file) formData.append("image", file)

    formData.append("price_per_hour", String(data.price_per_hour))
    formData.append("type", data.type)
    formData.append("max_passengers", String(data.max_passengers))
    formData.append("category_id", String(data.category_id))
    formData.append("location_id", String(data.location_id))

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale)
      formData.append(`translations[${index}][name]`, translation.name)
      formData.append(`translations[${index}][description]`, translation.description)
    })

    const response = await postRequest<Limousine>(
      `/admin/limousines/${limousineId}`,
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

// Tour Data

export async function getLimousineFeatures(limousineId: number): Promise<LimousineFeature[]> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<LimousineFeature[]>(`/admin/limousines/${limousineId}/features`, loadDefaultHeaders(token, language))
    const data = response.data
    return data
  } catch (error) {
    return []
  }
}

export async function getLimousineServices(limousineId: number): Promise<LimousineService[]> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<LimousineService[]>(`/admin/limousines/${limousineId}/services`, loadDefaultHeaders(token, language))
    const data = response.data
    return data
  } catch (error) {
    return []
  }
}

export async function getLimousineSpecifications(limousineId: number): Promise<LimousineSpecification[]> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<LimousineSpecification[]>(`/admin/limousines/${limousineId}/specifications`, loadDefaultHeaders(token, language))
    const data = response.data
    return data
  } catch (error) {
    return []
  }
}

export async function getLimousineReviews(limousineId: number): Promise<LimousineReview[]> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<LimousineReview[]>(`/admin/limousines/${limousineId}/reviews`, loadDefaultHeaders(token, language))
    const data = response.data
    return data
  } catch (error) {
    return []
  }
}

export async function getLimousineOverviews(limousineId: number): Promise<LimousineOverview[]> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<LimousineOverview[]>(`/admin/limousines/${limousineId}/overviews`, loadDefaultHeaders(token, language))
    const data = response.data
    return data
  } catch (error) {
    return []
  }
}

export async function getLimousineImages(limousineId: number): Promise<LimousineImage[]> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<LimousineImage[]>(`/admin/limousines/${limousineId}/images`, loadDefaultHeaders(token, language))
    const data = response.data
    return data
  } catch (error) {
    return []
  }
}

// Create Data
export async function createLimousineFeature(limousine_id: number, data: z.infer<typeof LimousineFeatureSchema.Create>): Promise<APIResponse<LimousineFeature | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<LimousineFeature>(
      `/admin/limousine-features`,
      {
        ...data,
        limousine_id
      },
      loadDefaultHeaders(token, language)
    )
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function createLimousineService(limousine_id: number, data: z.infer<typeof LimousineServiceSchema.Create>): Promise<APIResponse<LimousineService | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<LimousineService>(
      `/admin/limousine-services`,
      {
        ...data,
        limousine_id
      },
      loadDefaultHeaders(token, language)
    )
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function createLimousineSpecification(limousine_id: number, data: z.infer<typeof LimousineSpecificationSchema.Create>): Promise<APIResponse<LimousineSpecification | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<LimousineSpecification>(
      `/admin/limousine-specifications`,
      {
        ...data,
        limousine_id
      },
      loadDefaultHeaders(token, language)
    )
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function createLimousineOverview(limousine_id: number, data: z.infer<typeof LimousineOverviewSchema.Create>): Promise<APIResponse<LimousineOverview | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<LimousineOverview>(
      `/admin/limousine-overviews`,
      {
        ...data,
        limousine_id
      },
      loadDefaultHeaders(token, language)
    )
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function createLimousineReview(limousine_id: number, data: z.infer<typeof LimousineReviewSchema.Create>): Promise<APIResponse<LimousineReview | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<LimousineReview>(
      `/admin/limousine-reviews`,
      {
        ...data,
        limousine_id
      },
      loadDefaultHeaders(token, language)
    )
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function createLimousineImage(file: File | null, limousineId: number): Promise<APIResponse<LimousineImage | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const formData = new FormData()

    if (file) formData.append("image", file)
    formData.append("limousine_id", String(limousineId))

    const response = await postRequest<LimousineImage>(`/admin/limousine-images`, formData, loadDefaultHeaders(token, language, { "Content-Type": "multipart/form-data" }))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

// Delete Requests
export async function deleteLimousineFeature(featureId: number): Promise<APIResponse<LimousineFeature | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await deleteRequest<LimousineFeature | undefined>(`/admin/limousine-features/${featureId}`, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function deleteLimousineService(serviceId: number): Promise<APIResponse<LimousineService | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await deleteRequest<LimousineService | undefined>(`/admin/limousine-services/${serviceId}`, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function deleteLimousineSpecification(specificationId: number): Promise<APIResponse<LimousineSpecification | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await deleteRequest<LimousineSpecification | undefined>(`/admin/limousine-specifications/${specificationId}`, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function deleteLimousineOverview(overviewId: number): Promise<APIResponse<LimousineOverview | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await deleteRequest<LimousineOverview | undefined>(`/admin/limousine-overviews/${overviewId}`, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function deleteLimousineReview(reviewId: number): Promise<APIResponse<LimousineReview | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await deleteRequest<LimousineReview | undefined>(`/admin/limousine-reviews/${reviewId}`, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function deleteLimousineImage(imageId: number): Promise<APIResponse<LimousineImage | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await deleteRequest<LimousineImage | undefined>(`/admin/limousine-images/${imageId}`, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

// Restore

export async function restoreLimousineFeature(featureId: number): Promise<APIResponse<LimousineFeature | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<LimousineFeature | undefined>(`/admin/limousine-features/${featureId}/restore`, null, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function restoreLimousineService(serviceId: number): Promise<APIResponse<LimousineService | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<LimousineService | undefined>(`/admin/limousine-services/${serviceId}/restore`, null, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function restoreLimousineSpecification(specificationId: number): Promise<APIResponse<LimousineSpecification | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<LimousineSpecification | undefined>(`/admin/limousine-specifications/${specificationId}/restore`, null, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function restoreLimousineOverview(overviewId: number): Promise<APIResponse<LimousineOverview | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<LimousineOverview | undefined>(`/admin/limousine-overviews/${overviewId}/restore`, null, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function restoreLimousineReview(reviewId: number): Promise<APIResponse<LimousineReview | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<LimousineReview | undefined>(`/admin/limousine-reviews/${reviewId}/restore`, null, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function restoreLimousineImage(imageId: number): Promise<APIResponse<LimousineImage | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await postRequest<LimousineImage | undefined>(`/admin/limousine-images/${imageId}/restore`, null, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

// Update

export async function updateLimousineFeature(id: number, data: z.infer<typeof LimousineFeatureSchema.Create>): Promise<APIResponse<LimousineFeature | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await putRequest<LimousineFeature>(`/admin/limousine-features/${id}`, data, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function updateLimousineService(id: number, data: z.infer<typeof LimousineServiceSchema.Create>): Promise<APIResponse<LimousineService | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await putRequest<LimousineService>(`/admin/limousine-services/${id}`, data, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function updateLimousineSpecification(id: number, data: z.infer<typeof LimousineSpecificationSchema.Create>): Promise<APIResponse<LimousineSpecification | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await putRequest<LimousineSpecification>(`/admin/limousine-specifications/${id}`, data, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function updateLimousineOverview(id: number, data: z.infer<typeof LimousineOverviewSchema.Create>): Promise<APIResponse<LimousineOverview | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await putRequest<LimousineOverview>(`/admin/limousine-overviews/${id}`, data, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function updateLimousineReview(id: number, data: z.infer<typeof LimousineReviewSchema.Create>): Promise<APIResponse<LimousineReview | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await putRequest<LimousineReview>(`/admin/limousine-reviews/${id}`, data, loadDefaultHeaders(token, language))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}

export async function updateLimousineImage(id: number, limousine_id: number, file: File | null): Promise<APIResponse<LimousineImage | undefined>> {
  try {
    const { token, language } = await getDefaultCookies()
    const formData = new FormData()

    if (file) formData.append("image", file)
    formData.append("image", limousine_id.toString())

    const response = await postRequest<LimousineImage>(`/admin/limousine-images/${id}`, formData, loadDefaultHeaders(token, language, { "Content-Type": "multipart/form-data" }))
    return response
  } catch (error) {
    const err = error as ApiError<any>
    return err
  }
}
