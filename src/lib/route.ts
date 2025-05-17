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
  hajs: {
    index: "/admin/hajs",
    create: "/admin/hajs/create",
    trash: "/admin/hajs/trashed",
    edit: (id: number) => `/admin/hajs/${id}/update`,
    show: (id: number) => `/admin/hajs/${id}`
  },
  locations: {
    index: "/admin/locations",
    create: "/admin/locations/create",
    trash: "/admin/locations/trashed",
    edit: (id: number) => `/admin/locations/${id}/update`,
    show: (id: number) => `/admin/locations/${id}`
  },
  hotels: {
    index: "/admin/hotels",
    create: "/admin/hotels/create",
    trash: "/admin/hotels/trashed",
    edit: (id: number) => `/admin/hotels/${id}/update`,
    show: (id: number) => `/admin/hotels/${id}`
  },
  users: {
    index: "/admin/users",
    create: "/admin/users/create",
    trash: "/admin/users/trashed",
    edit: (id: number) => `/admin/users/${id}/update`,
    show: (id: number) => `/admin/users/${id}`
  },
  tours: {
    index: "/admin/tours",
    create: "/admin/tours/create",
    trash: "/admin/tours/trashed",
    edit: (id: number) => `/admin/tours/${id}/update`,
    changeDetails: (id: number, item: string) => `/admin/tours/${id}/update/${item}`,
    show: (id: number) => `/admin/tours/${id}`
  },
  limousines: {
    index: "/admin/limousines",
    create: "/admin/limousines/create",
    trash: "/admin/limousines/trashed",
    edit: (id: number) => `/admin/limousines/${id}/update`,
    changeDetails: (id: number, item: string) => `/admin/limousines/${id}/update/${item}`,
    show: (id: number) => `/admin/limousines/${id}`
  }
}
