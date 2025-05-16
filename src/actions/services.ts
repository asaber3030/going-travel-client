import { UIServiceCard } from "@/types/ui"
import { getRequest } from "@/lib/axios"

export async function getServiceCards(): Promise<UIServiceCard[]> {
  try {
    const response = await getRequest<UIServiceCard[]>("/ui/service-cards")
    return response.data
  } catch (error) {
    console.error(error)
    throw new Error("Failed to fetch limousines")
  }
}
