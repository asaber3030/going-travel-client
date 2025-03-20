"use server";

import { ApiResponse, APIResponse, ApiError, PaginatedData, Tour } from "@/types";
import { API_URL, DummyPaginationData } from "@/lib/constants";

import { getDefaultCookies } from "@/actions/app";
import { getRequest, postRequest } from "@/lib/axios";
import { loadDefaultHeaders } from "@/lib/api";

import { build } from "search-params";
import { TourSchema } from "@/schema";
import { z } from "zod";

export async function getTours(page: number): Promise<ApiResponse<PaginatedData<Tour>>> {
  try {
    const { token, language } = await getDefaultCookies();
    const sp = build({ page });
    const response = await getRequest<PaginatedData<Tour>>(
      `/admin/tours` + (sp ? `?${sp}` : ""),
      loadDefaultHeaders(token, language)
    );
    const data = response;
    return data;
  } catch (error) {
    const e = error as ApiError<any>;
    return e;
  }
}

export async function getTour(tourId: number): Promise<Tour | undefined> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await getRequest<Tour>(
      `/admin/tours/${tourId}`,
      loadDefaultHeaders(token, language)
    );
    const data = response.data;
    return data;
  } catch (error) {
    return undefined;
  }
}

export async function getTrashedTours(page: number): Promise<PaginatedData<Tour>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(
      `${API_URL}/admin/tours/trashed?page=${page}`,
      loadDefaultHeaders(token, language)
    );
    const data: APIResponse<PaginatedData<Tour>> = await response.json();
    return data.data;
  } catch (error) {
    console.log({ error });
    return DummyPaginationData;
  }
}

export async function deleteTour(tourId: number): Promise<APIResponse<undefined>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(`${API_URL}/admin/tours/${tourId}`, {
      method: "DELETE",
      headers: loadDefaultHeaders(token, language)
    });
    const data: APIResponse<undefined> = await response.json();
    return data;
  } catch (error) {
    return {
      message: "Error Occurred while deleting tour",
      status: 500,
      data: undefined
    };
  }
}

export async function restoreTour(tourId: number): Promise<APIResponse<Tour | undefined>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(`${API_URL}/admin/tours/${tourId}/restore`, {
      method: "POST",
      headers: loadDefaultHeaders(token, language)
    });
    const data: APIResponse<Tour> = await response.json();
    return data;
  } catch (error) {
    console.log({ error });
    return {
      message: "Error occurred while restoring tour",
      status: 500,
      data: undefined
    };
  }
}

export type CreateTourData = z.infer<typeof TourSchema.Create>;

export async function createTour(
  banner: File | null,
  thumbnail: File | null,
  data: CreateTourData
): Promise<APIResponse<Tour | undefined>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (banner) formData.append("banner", banner);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    formData.append("duration", String(data.duration));
    formData.append("availability", data.availability);
    formData.append("max_people", String(data.max_people));
    formData.append("price_start", String(data.price_start));
    formData.append("type", data.type);
    formData.append("has_offer", data.has_offer ? "true" : "false");
    formData.append("location_id", String(data.location_id));
    formData.append("pickup_location_id", String(data.pickup_location_id));
    formData.append("category_id", String(data.category_id));

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale);
      formData.append(`translations[${index}][title]`, translation.title);
      formData.append(`translations[${index}][description]`, translation.description);
      formData.append(
        `translations[${index}][distance_description]`,
        translation.distance_description
      );
    });

    const response = await postRequest<Tour>(
      "/admin/tours",
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );

    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

export async function updateTour(
  tourId: number,
  banner: File | null,
  thumbnail: File | null,
  data: CreateTourData
): Promise<APIResponse<Tour | undefined>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (banner) formData.append("banner", banner);
    if (thumbnail) formData.append("thumbnail", thumbnail);

    formData.append("duration", String(data.duration));
    formData.append("availability", data.availability);
    formData.append("max_people", String(data.max_people));
    formData.append("price_start", String(data.price_start));
    formData.append("type", data.type);
    formData.append("has_offer", data.has_offer ? "true" : "false");
    formData.append("location_id", String(data.location_id));
    formData.append("pickup_location_id", String(data.pickup_location_id));
    formData.append("category_id", String(data.category_id));

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale);
      formData.append(`translations[${index}][title]`, translation.title);
      formData.append(`translations[${index}][description]`, translation.description);
      formData.append(
        `translations[${index}][distance_description]`,
        translation.distance_description
      );
    });

    const response = await postRequest<Tour>(
      `/admin/tours/${tourId}`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );

    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}
