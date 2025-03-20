export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  faq: "/faq",
  pricing: "/pricing",
  contact: "/contact",
  login: "/login",
  register: "/register",
  categories: {
    index: "/admin/categories",
    create: "/admin/categories/create",
    trash: "/admin/categories/trashed",
    edit: (id: number) => `/admin/categories/${id}/update`,
    show: (id: number) => `/admin/categories/${id}`
  },
  locations: {
    index: "/admin/locations",
    create: "/admin/locations/create",
    trash: "/admin/locations/trashed",
    edit: (id: number) => `/admin/locations/${id}/update`,
    show: (id: number) => `/admin/locations/${id}`
  },
  tours: {
    index: "/admin/tours",
    create: "/admin/tours/create",
    trash: "/admin/tours/trashed",
    edit: (id: number) => `/admin/tours/${id}/update`,
    changeDetails: (id: number, item: string) => `/admin/tours/${id}/update/${item}`,
    show: (id: number) => `/admin/tours/${id}`
  }
};
