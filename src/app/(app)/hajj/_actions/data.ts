"use server"

import { getRequest } from "@/lib/axios"
import { PaginatedData } from "@/types"
import { UIHajjPackage } from "@/types/ui"
import { build } from "search-params"

import { loadDefaultHeaders } from "@/lib/api"
import { getDefaultCookies } from "@/actions/app"

export async function getUIHajjPackages(sp: Record<string, string | number> = { take: 12 }): Promise<PaginatedData<UIHajjPackage>> {
  try {
    const { token, language } = await getDefaultCookies()
    const params = build(sp)
    const response = await getRequest<PaginatedData<UIHajjPackage>>(`/ui/hajs?${params}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    throw new Error("Failed to fetch limousines")
  }
}

export async function getUIHajjPackageById(id: number): Promise<UIHajjPackage> {
  try {
    const { token, language } = await getDefaultCookies()
    const response = await getRequest<UIHajjPackage>(`/ui/hajs/${id}`, loadDefaultHeaders(token, language))
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch limousine by ID: ${id}`)
  }
}
