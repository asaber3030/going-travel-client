export type APIResponse<T> = {
  data: T;
  message: string;
  status: number;
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
    duration: string;
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
