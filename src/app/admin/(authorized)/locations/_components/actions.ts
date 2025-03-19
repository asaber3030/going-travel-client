"use server";

import api from "@/lib/axios";

import { z } from "zod";
import { loadDefaultHeaders } from "@/lib/api";
import { API_URL, DummyPaginationData } from "@/lib/constants";
import { getDefaultCookies, getToken } from "@/actions/app";
import { LocationSchema } from "@/schema";

import {
  APIResponse,
  PaginatedData,
  Location,
} from "./../../../../../types/index.d";

export async function getAllLocations(
  page: number
): Promise<PaginatedData<Location>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(`${API_URL}/admin/locations?page=${page}`, {
      headers: loadDefaultHeaders(token, language),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return DummyPaginationData;
    }

    const data: APIResponse<PaginatedData<Location>> = await response.json();
    return data.data;
  } catch (error) {
    console.log({ error });
    return DummyPaginationData;
  }
}

export async function getLocation(
  locationId: number
): Promise<Location | undefined> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(`${API_URL}/admin/locations/${locationId}`, {
      headers: loadDefaultHeaders(token, language),
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} - ${response.statusText}`);
      return undefined;
    }

    const data: APIResponse<Location> = await response.json();
    return data.data;
  } catch (error) {
    console.log({ error });
  }
}

export async function getTrashedLocations(
  page: number
): Promise<PaginatedData<Location>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(
      `${API_URL}/admin/locations/trashed?page=${page}`,
      loadDefaultHeaders(token, language)
    );
    const data: APIResponse<PaginatedData<Location>> = await response.json();
    return data.data;
  } catch (error) {
    console.log({ error });
    return DummyPaginationData;
  }
}

export async function deleteLocation(
  locationId: number
): Promise<APIResponse<undefined>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(`${API_URL}/admin/locations/${locationId}`, {
      method: "DELETE",
      headers: loadDefaultHeaders(token, language),
    });
    const data: APIResponse<undefined> = await response.json();
    return data;
  } catch (error) {
    return {
      message: "Error Occurred while deleting location",
      status: 500,
      data: undefined,
    };
  }
}
export async function restoreLocation(
  locationId: number
): Promise<APIResponse<Location | undefined>> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await fetch(
      `${API_URL}/admin/locations/${locationId}/restore`,
      {
        method: "POST",
        headers: loadDefaultHeaders(token, language),
      }
    );
    const data: APIResponse<Location> = await response.json();
    return data;
  } catch (error) {
    console.log({ error });
    return {
      message: "Error occurred while restoring location",
      status: 500,
      data: undefined,
    };
  }
}

export async function createLocation(
  locationData: z.infer<typeof LocationSchema.Create>,
  file: File | null
): Promise<APIResponse<Location | undefined>> {
  try {
    const token = await getToken();
    const formData = new FormData();

    if (file) formData.append("image", file);
    formData.append("name", locationData.name);
    formData.append("map_url", locationData.map_url);
    const response = await api.post(`${API_URL}/admin/locations`, formData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status !== 201)
      console.error(`Error: ${response.status} - ${response.data}`);

    const data: APIResponse<Location> = response.data;
    return data;
  } catch (error) {
    console.log({ error });
    return {
      message: "Error occurred while creating location",
      status: 500,
      data: undefined,
    };
  }
}

export async function updateLocation(
  locationData: z.infer<typeof LocationSchema.Create>,
  file: File | null,
  locationID: number
): Promise<APIResponse<Location | undefined>> {
  try {
    const { token, language } = await getDefaultCookies();
    const formData = new FormData();

    if (file) formData.append("image", file);
    formData.append("name", locationData.name);
    formData.append("map_url", locationData.map_url);
    const response = await api.patch(`${API_URL}/admin/locations`, formData, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    const data: APIResponse<Location> = await response.data;
    return data;
  } catch (error) {
    console.log({ error });
    return {
      message: "Error occurred while updating location",
      status: 500,
      data: undefined,
    };
  }
}
