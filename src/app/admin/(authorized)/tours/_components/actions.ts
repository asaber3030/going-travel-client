import { getDefaultCookies } from "@/actions/app";
import {
  APIResponse,
  PaginatedData,
  Tour,
} from "./../../../../../types/index.d";
import { loadDefaultHeaders } from "@/lib/api";
import { API_URL, DummyPaginationData } from "@/lib/constants";

export async function getAllTours(page: number): Promise<PaginatedData<Tour>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(
      `${API_URL}/admin/tours?page=${page}`,
      loadDefaultHeaders(token, language)
    );
    const data: APIResponse<PaginatedData<Tour>> = await response.json();
    return data.data;
  } catch (error) {
    console.log({ error });
    return DummyPaginationData;
  }
}

export async function getTour(tourId: number): Promise<Tour | undefined> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(
      `${API_URL}/admin/tours/${tourId}`,
      loadDefaultHeaders(token, language)
    );
    const data: APIResponse<Tour> = await response.json();
    return data.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function getTrashedTours(
  page: number
): Promise<PaginatedData<Tour>> {
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

export async function deleteTour(
  tourId: number
): Promise<APIResponse<undefined>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(`${API_URL}/admin/tours/${tourId}`, {
      method: "DELETE",
      headers: loadDefaultHeaders(token, language),
    });
    const data: APIResponse<undefined> = await response.json();
    return data;
  } catch (error) {
    return {
      message: "Error Occurred while deleting tour",
      status: 500,
      data: undefined,
    };
  }
}

export async function restoreTour(
  tourId: number
): Promise<APIResponse<Tour | undefined>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(`${API_URL}/admin/tours/${tourId}/restore`, {
      method: "POST",
      headers: loadDefaultHeaders(token, language),
    });
    const data: APIResponse<Tour> = await response.json();
    return data;
  } catch (error) {
    console.log({ error });
    return {
      message: "Error occurred while restoring tour",
      status: 500,
      data: undefined,
    };
  }
}

export async function createTour(
  tour: Tour
): Promise<APIResponse<Tour | undefined>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(`${API_URL}/admin/tours`, {
      method: "POST",
      headers: loadDefaultHeaders(token, language),
      body: JSON.stringify(tour),
    });
    const data: APIResponse<Tour> = await response.json();
    return data;
  } catch (error) {
    console.log({ error });
    return {
      message: "Error occurred while creating tour",
      status: 500,
      data: undefined,
    };
  }
}

export async function updateTour(
  tour: Tour
): Promise<APIResponse<Tour | undefined>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(`${API_URL}/admin/tours/${tour.id}`, {
      method: "PUT",
      headers: loadDefaultHeaders(token, language),
      body: JSON.stringify(tour),
    });
    const data: APIResponse<Tour> = await response.json();
    return data;
  } catch (error) {
    console.log({ error });
    return {
      message: "Error occurred while updating tour",
      status: 500,
      data: undefined,
    };
  }
}
