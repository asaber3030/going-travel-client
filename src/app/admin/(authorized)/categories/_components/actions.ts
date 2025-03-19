"use server";

import { getDefaultCookies } from "@/actions/app";
import { loadDefaultHeaders } from "@/lib/api";
import { API_URL, DummyPaginationData } from "@/lib/constants";
import { CategorySchema } from "@/schema";

import api from "@/lib/axios";

import type { APIResponse, Category, PaginatedData } from "@/types";
import { z } from "zod";
import { revalidatePath } from "next/cache";

export async function getCategories(
  page: number
): Promise<PaginatedData<Category>> {
  try {
    const { language, token } = await getDefaultCookies();

    const request = await fetch(`${API_URL}/admin/categories?page=${page}`, {
      method: "GET",
      headers: loadDefaultHeaders(token, language),
    });

    const data: APIResponse<PaginatedData<Category>> = await request.json();

    return data.data;
  } catch (error) {
    console.log({ error });
    return DummyPaginationData;
  }
}

export async function getTrashedCategories(
  page: number
): Promise<PaginatedData<Category>> {
  try {
    const { language, token } = await getDefaultCookies();

    const request = await fetch(
      `${API_URL}/admin/categories/trashed?page=${page}`,
      {
        method: "GET",
        headers: loadDefaultHeaders(token, language),
      }
    );

    const data: APIResponse<PaginatedData<Category>> = await request.json();

    return data.data;
  } catch (error) {
    console.log({ error });
    return DummyPaginationData;
  }
}

export async function getCategory(id: number): Promise<Category | undefined> {
  try {
    const { language, token } = await getDefaultCookies();

    const request = await fetch(`${API_URL}/admin/categories/${id}`, {
      method: "GET",
      headers: loadDefaultHeaders(token, language),
    });

    const data: APIResponse<Category> = await request.json();
    return data.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function deleteCategory(
  id: number
): Promise<APIResponse<undefined>> {
  try {
    const { language, token } = await getDefaultCookies();

    const request = await fetch(`${API_URL}/admin/categories/${id}`, {
      method: "DELETE",
      headers: loadDefaultHeaders(token, language),
    });

    const data: APIResponse<undefined> = await request.json();
    revalidatePath("/admin/categories");
    return data;
  } catch (error) {
    return { status: 500, message: "Internal Server Error", data: undefined };
  }
}

export async function restoreCategory(
  id: number
): Promise<APIResponse<Category | undefined>> {
  try {
    const { language, token } = await getDefaultCookies();

    const request = await fetch(`${API_URL}/admin/categories/${id}/restore`, {
      method: "POST",
      headers: loadDefaultHeaders(token, language),
    });

    const data: APIResponse<Category> = await request.json();
    revalidatePath("/admin/categories/trashed");

    return data;
  } catch (error) {
    return { status: 500, message: "Internal Server Error", data: undefined };
  }
}

export async function createCategory(
  file: File | null,
  category: z.infer<typeof CategorySchema.Create>
): Promise<APIResponse<Category | undefined>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (file) formData.append("image", file);

    category.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale);
      formData.append(`translations[${index}][name]`, translation.name);
      formData.append(
        `translations[${index}][description]`,
        translation.description
      );
    });

    const request = await api.post("/admin/categories", formData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    revalidatePath("/admin/categories");

    const data: APIResponse<Category> = request.data;
    return data;
  } catch (error) {
    return { status: 500, message: "Internal Server Error", data: undefined };
  }
}

export async function updateCategory(
  categoryId: number,
  file: File | null,
  category: z.infer<typeof CategorySchema.Create>
): Promise<APIResponse<Category | undefined>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (file) formData.append("image", file);

    category.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale);
      formData.append(`translations[${index}][name]`, translation.name);
      formData.append(
        `translations[${index}][description]`,
        translation.description
      );
    });

    const request = await api.post(
      `/admin/categories/${categoryId}`,
      formData,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    revalidatePath("/admin/categories");

    const data: APIResponse<Category> = request.data;
    return data;
  } catch (error) {
    return { status: 500, message: "Internal Server Error", data: undefined };
  }
}
