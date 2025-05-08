import { UIServiceCard } from "@/types/ui"
import { getRequest } from "@/lib/axios"
import { loadDefaultHeaders } from "@/lib/api"
import { getDefaultCookies } from "./app"
import { ApiError } from "@/types"

export async function getServiceCards(): Promise<UIServiceCard[]> {
  try {
    const { language, token } = await getDefaultCookies()

    const response = await getRequest<UIServiceCard[]>("/ui/service-cards", loadDefaultHeaders(token, language))
    console.log(response.data)
    return response.data
  } catch (error) {
    const data = error as ApiError<any>
    throw new Error(data?.message || "Failed to fetch service cards")
  }
}
