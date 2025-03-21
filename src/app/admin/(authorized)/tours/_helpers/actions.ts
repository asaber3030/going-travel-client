"use server";

import {
  ApiResponse,
  APIResponse,
  ApiError,
  PaginatedData,
  Tour,
  Itinerary,
  Highlight,
  Exclusion,
  Review,
  TourImage,
  UpdateTourFormType
} from "@/types";
import { API_URL, DummyPaginationData } from "@/lib/constants";

import { getDefaultCookies } from "@/actions/app";
import { getRequest, postRequest, deleteRequest } from "@/lib/axios";
import { loadDefaultHeaders } from "@/lib/api";

import { build } from "search-params";
import {
  TourExclusionSchema,
  TourHighlightSchema,
  TourItinerarySchema,
  TourReviewSchema,
  TourSchema
} from "@/schema";
import { z } from "zod";
import { routes } from "@/lib/route";
import { revalidatePath } from "next/cache";

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

// Tour Data

export async function getTourItineraries(tourId: number): Promise<Itinerary[]> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await getRequest<Itinerary[]>(
      `/admin/tours/${tourId}/itineraries`,
      loadDefaultHeaders(token, language)
    );
    const data = response.data;
    return data;
  } catch (error) {
    return [];
  }
}

export async function getTourHighlights(tourId: number): Promise<Highlight[]> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await getRequest<Highlight[]>(
      `/admin/tours/${tourId}/highlights`,
      loadDefaultHeaders(token, language)
    );
    const data = response.data;
    return data;
  } catch (error) {
    return [];
  }
}

export async function getTourExclusions(tourId: number): Promise<Exclusion[]> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await getRequest<Exclusion[]>(
      `/admin/tours/${tourId}/inclusions-exclusions`,
      loadDefaultHeaders(token, language)
    );
    const data = response.data;
    return data;
  } catch (error) {
    return [];
  }
}

export async function getTourReviews(tourId: number): Promise<Review[]> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await getRequest<Review[]>(
      `/admin/tours/${tourId}/reviews`,
      loadDefaultHeaders(token, language)
    );
    const data = response.data;
    return data;
  } catch (error) {
    return [];
  }
}

export async function getTourImages(tourId: number): Promise<TourImage[]> {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await getRequest<TourImage[]>(
      `/admin/tours/${tourId}/images`,
      loadDefaultHeaders(token, language)
    );
    const data = response.data;
    return data;
  } catch (error) {
    return [];
  }
}

// Tour Itineraries
export type CreateTourItieraryData = z.infer<typeof TourItinerarySchema>;

export async function createTourItinerary(
  tourId: number,
  image: File | null,
  data: CreateTourItieraryData
): Promise<ApiResponse<Itinerary>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (image) formData.append("image", image);

    formData.append("tour_id", tourId.toString());
    formData.append("meals", data.meals);
    formData.append("day_number", data.day_number.toString());
    formData.append("overnight_location", data.overnight_location);

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale);
      formData.append(`translations[${index}][title]`, translation.title);
      formData.append(`translations[${index}][description]`, translation.description);
    });

    const response = await postRequest<Itinerary>(
      `/admin/tour-itineraries`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );
    revalidatePath(routes.tours.changeDetails(tourId, "itineraries"));
    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

export async function updateTourItinerary(
  itineraryId: number,
  tourId: number,
  image: File | null,
  data: CreateTourItieraryData
): Promise<ApiResponse<Itinerary>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (image) formData.append("image", image);

    formData.append("meals", data.meals);
    formData.append("day_number", data.day_number.toString());
    formData.append("overnight_location", data.overnight_location);

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale);
      formData.append(`translations[${index}][title]`, translation.title);
      formData.append(`translations[${index}][description]`, translation.description);
    });

    const response = await postRequest<Itinerary>(
      `/admin/tour-itineraries/${itineraryId}`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );
    revalidatePath(routes.tours.changeDetails(tourId, "itineraries"));
    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

// Tour Highlights
export type CreateTourHighlightData = z.infer<typeof TourHighlightSchema>;

export async function createTourHighlight(
  tourId: number,
  image: File | null,
  data: CreateTourHighlightData
): Promise<ApiResponse<Highlight>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (image) formData.append("image", image);

    formData.append("tour_id", tourId.toString());

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale);
      formData.append(`translations[${index}][title]`, translation.title);
    });

    const response = await postRequest<Highlight>(
      `/admin/tour-highlights`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );
    revalidatePath(routes.tours.changeDetails(tourId, "itineraries"));
    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

export async function updateTourHighlight(
  highlightId: number,
  tourId: number,
  image: File | null,
  data: CreateTourHighlightData
): Promise<ApiResponse<Highlight>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (image) formData.append("image", image);

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale);
      formData.append(`translations[${index}][title]`, translation.title);
    });

    const response = await postRequest<Highlight>(
      `/admin/tour-highlights/${highlightId}`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );
    revalidatePath(routes.tours.changeDetails(tourId, "highlights"));
    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

// Exclusions & Inclusions
export type CreateTourExclusionData = z.infer<typeof TourExclusionSchema>;

export async function createTourExclusion(
  tourId: number,
  data: CreateTourExclusionData
): Promise<ApiResponse<Exclusion>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    formData.append("tour_id", tourId.toString());
    formData.append("type", data.type);

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale);
      formData.append(`translations[${index}][title]`, translation.title);
    });

    const response = await postRequest<Exclusion>(
      `/admin/tour-inclusions-exclusions`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );
    revalidatePath(routes.tours.changeDetails(tourId, "exclusions"));
    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

export async function updateTourExclusion(
  exclusionId: number,
  tourId: number,
  data: CreateTourExclusionData
): Promise<ApiResponse<Exclusion>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    formData.append("tour_id", tourId.toString());
    formData.append("type", data.type);

    data.translations.map((translation, index) => {
      formData.append(`translations[${index}][locale]`, translation.locale);
      formData.append(`translations[${index}][title]`, translation.title);
    });

    const response = await postRequest<Exclusion>(
      `/admin/tour-inclusions-exclusions/${exclusionId}`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );
    revalidatePath(routes.tours.changeDetails(tourId, "exclusions"));
    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

// Reviews
export type CreateTourReviewData = z.infer<typeof TourReviewSchema>;

export async function createTourReview(
  tourId: number,
  image: File | null,
  data: CreateTourReviewData
): Promise<ApiResponse<Review>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (image) formData.append("image", image);

    formData.append("tour_id", tourId.toString());
    formData.append("title", data.title);
    formData.append("rating", data.rating.toString());
    formData.append("client_name", data.client_name);
    formData.append("description", data.description);

    const response = await postRequest<Review>(
      `/admin/reviews`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );
    revalidatePath(routes.tours.changeDetails(tourId, "reviews"));
    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

export async function updateTourReview(
  reviewId: number,
  tourId: number,
  image: File | null,
  data: CreateTourReviewData
): Promise<ApiResponse<Exclusion>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (image) formData.append("image", image);
    formData.append("tour_id", tourId.toString());
    formData.append("title", data.title);
    formData.append("rating", data.rating.toString());
    formData.append("client_name", data.client_name);
    formData.append("description", data.description);

    const response = await postRequest<Exclusion>(
      `/admin/reviews/${reviewId}`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );
    revalidatePath(routes.tours.changeDetails(tourId, "reviews"));
    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

// Images
export async function createTourImage(
  tourId: number,
  image: File | null
): Promise<ApiResponse<Review>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (image) formData.append("image", image);
    formData.append("tour_id", tourId.toString());

    const response = await postRequest<Review>(
      `/admin/tour-images`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );
    revalidatePath(routes.tours.changeDetails(tourId, "images"));
    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

export async function updateTourImage(
  imageId: number,
  tourId: number,
  image: File | null
): Promise<ApiResponse<Exclusion>> {
  try {
    const { language, token } = await getDefaultCookies();

    const formData = new FormData();

    if (image) formData.append("image", image);
    formData.append("tour_id", tourId.toString());

    const response = await postRequest<Exclusion>(
      `/admin/tour-images/${imageId}`,
      formData,
      loadDefaultHeaders(token, language, {
        "Content-Type": "multipart/form-data"
      })
    );
    revalidatePath(routes.tours.changeDetails(tourId, "images"));
    return response;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

// Trash Method:
export async function deleteTourItem(itemId: number, type: string) {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await deleteRequest(
      `/admin/${type}/${itemId}`,
      loadDefaultHeaders(token, language)
    );
    const data = response;
    revalidatePath(routes.tours.changeDetails(itemId, type));
    return data;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}

export async function restoreTourItem(itemId: number, type: string) {
  try {
    const { token, language } = await getDefaultCookies();
    const response = await postRequest(
      `/admin/${type}/${itemId}/restore`,
      {},
      loadDefaultHeaders(token, language)
    );
    const data = response;
    revalidatePath(routes.tours.changeDetails(itemId, type));
    return data;
  } catch (error) {
    const err = error as ApiError<any>;
    return err;
  }
}
