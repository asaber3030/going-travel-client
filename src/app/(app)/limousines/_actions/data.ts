"use server";

import { getRequest } from "@/lib/axios";
import { build } from "search-params";

import { UILimousine } from "@/types/ui";
import { PaginatedData } from "@/types";

export async function getUILimousines(sp: Record<string, string | number> = { take: 12 }): Promise<PaginatedData<UILimousine>> {
  try {
    const params = build(sp);
    const response = await getRequest<PaginatedData<UILimousine>>(`/ui/limousines?${params}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch limousines");
  }
}

export async function getUILimousineById(id: number): Promise<UILimousine> {
  try {
    const response = await getRequest<UILimousine>(`/ui/limousines/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch limousine by ID: ${id}`);
  }
}
