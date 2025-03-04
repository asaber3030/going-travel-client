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
