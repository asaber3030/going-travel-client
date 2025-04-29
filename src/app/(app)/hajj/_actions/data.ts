"use server"

import { getDefaultCookies } from "@/actions/app"
import { loadDefaultHeaders } from "@/lib/api"
import { getRequest } from "@/lib/axios"
import { ApiError, PaginatedData } from "@/types"
import { UIHajjPackage } from "@/types/ui"
import { build } from "search-params"

export async function getUIHajjPackages(sp: Record<string, string | number> = { take: 12 }): Promise<PaginatedData<UIHajjPackage>> {
  try {
    const { language, token } = await getDefaultCookies()
    const params = build(sp)
    const response = await getRequest<PaginatedData<UIHajjPackage>>(`/ui/hajs?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch hajj packages")
  }
}

export async function getUIHajjPackageById(id: number): Promise<UIHajjPackage> {
  try {
    const { language, token } = await getDefaultCookies()
    const response = await getRequest<UIHajjPackage>(`/ui/hajs/${id}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch hajj package")
  }
}
