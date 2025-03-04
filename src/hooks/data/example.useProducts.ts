import { useQuery } from "@tanstack/react-query";

export function useProducts() {
  const query = useQuery({
    queryKey: QueryKeys.products(),
    queryFn: () => fetch("/api/products").then((res) => res.json())
  });

  return {
    products: query.data,
    isProductsLoading: query.isLoading,
    isProductsError: query.isError,
    refetchProducts: query.refetch
  };
}

export function useProduct(id: number) {
  const query = useQuery({
    queryKey: QueryKeys.singleProduct(id),
    queryFn: () => fetch(`/api/products/${id}`).then((res) => res.json())
  });

  return {
    products: query.data,
    isProductsLoading: query.isLoading,
    isProductsError: query.isError,
    refetchProducts: query.refetch
  };
}
