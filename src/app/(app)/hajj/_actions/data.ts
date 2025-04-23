'use server'

import { getRequest } from "@/lib/axios";
import { PaginatedData } from "@/types";
import { UIHajjPackage } from "@/types/ui"
import { build } from "search-params";

export async function getUIHajjPackages(sp: Record<string, string | number> = { take: 12 }): Promise<PaginatedData<UIHajjPackage>> {
  try {
    const params = build(sp);
    const response = await getRequest<PaginatedData<UIHajjPackage>>(`/ui/hajs?${params}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch limousines");
  }
}

export async function getUIHajjPackageById(id: number): Promise<UIHajjPackage> {
  try {
    const response = await getRequest<UIHajjPackage>(`/ui/hajs/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch limousine by ID: ${id}`);
  }
}