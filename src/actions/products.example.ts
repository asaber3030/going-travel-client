"use server";

import api from "@/lib/axios";

import { getToken } from "./app";
import { loadDefaultHeaders } from "@/lib/api";

export async function getAllProducts(): Promise<any[]> {
  const token = await getToken();
  try {
    const url = "/products";
    const response = await api.get(url, loadDefaultHeaders(token));
    return response.data;
  } catch (error) {
    return [];
  }
}
