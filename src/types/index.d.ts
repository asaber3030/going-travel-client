export type APIResponse<T> = {
  data: T;
  message: string;
  status: number;
};

export type ApiResponse<T> = {
  data: T;
  message: string;
  status: number;
  errors?: Record<string, string[]>;
};

export type ApiError<T> = {
  message: string;
  status: number;
  data: T;
  errors?: Record<string, string[]>;
};

type PaginationLink = {
  url: string;
  label: string;
  active: boolean;
};

type PaginatedData<T> = {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string | null;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: string | null;
  total: number;
};

export type Language = "ar" | "en" | "fr";
export type TourType = "private" | "public";
export type ExclusionType = "exclusion" | "inclusion";
export type UpdateTourFormType =
  | "itineraries"
  | "images"
  | "highlights"
  | "exclusions-inclusions"
  | "reviews";

export type Timestamps = {
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
};

export type Creator = {
  deleted_by: number;
  created_by: number;
  updated_by: number;
};

// Models

type Category = Timestamps &
  Creator & {
    id: number;
    image: string;
    name: string;
    translations?: CategoryTranslation[];
  };

type User = Timestamps &
  Creator & {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
  };

type CategoryTranslation = Timestamps &
  Creator & {
    id: number;
    locale: string;
    name: string;
    description: string;
  };

type Location = Timestamps &
  Creator & {
    id: number;
    name: string;
    image: string;
    map_url: string;
  };

type Tour = Creator &
  Timestamps & {
    id: number;
    duration: number;
    availability: string;
    type: string;
    banner: string;
    thumbnail: string;
    trip_information: null | string;
    before_you_go: null | string;
    max_people: number;
    price_start: number;
    has_offer: boolean;
    offer_price: null | number;
    category_id: number;
    pickup_location_id: number;
    location_id: number;
    title: string;
    description: string;
    distance_description: string;
    translations: Translation[];
    location: Location;
    pickup_location: Location;
    category: Category;
  };

type ItineraryTranslation = Timestamps &
  Creator & {
    id: number;
    itinerary_id: number;
    title: string;
    description: string;
    locale: string;
  };

type Itinerary = Creator &
  Timestamps & {
    id: number;
    tour_id: number;
    day_number: number;
    meals: string;
    overnight_location: string;
    translations: ItineraryTranslation[];
  };

type HighlightTranslation = Timestamps &
  Creator & {
    id: number;
    locale: string;
    title: string;
    tour_highlight_id: number;
  };

type Highlight = Timestamps &
  Creator & {
    id: number;
    tour_id: number;
    title: string;
    image: string;
    translations: HighlightTranslation[];
  };

type ExclusionTranslation = Timestamps &
  Creator & {
    id: number;
    exclusion_id: number;
    locale: string;
    title: string;
  };

type Exclusion = Timestamps &
  Creator & {
    id: number;
    tour_id: number;
    title: string;
    type: ExclusionType;
    translations: ExclusionTranslation[];
  };

type Review = Timestamps &
  Creator & {
    id: number;
    client_name: string;
    tour_id: number;
    rating: number;
    title: string;
    description: string;
    image: string;
  };

type TourImage = Timestamps &
  Creator & {
    id: number;
    tour_id: number;
    image_url: string;
  };
