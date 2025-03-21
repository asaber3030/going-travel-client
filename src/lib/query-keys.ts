export const QueryKeys = {
  plans: () => ["plans"],
  products: () => ["products"],
  singleProduct: (id: number) => ["products", id],
  categories: {
    all: (search?: string) => ["categories", search],
    single: (id: number) => ["categories", id]
  },
  locations: {
    all: (search?: string) => ["locations", search],
    single: (id: number) => ["locations", id]
  },
  tours: {
    all: (search?: string) => ["tours", search],
    single: (id: number, data: string = "details") => ["tours", id, data]
  }
};
