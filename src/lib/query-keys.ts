const QueryKeys = {
  plans: () => ["plans"],
  products: () => ["products"],
  singleProduct: (id: number) => ["products", id]
};
