import { getAllCategories } from "./actions";

import { QueryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function useCategories(search?: string) {
  const query = useQuery({
    queryKey: QueryKeys.categories.all(search),
    queryFn: ({ queryKey }) => getAllCategories(queryKey[1])
  });

  return {
    categories: query.data,
    isCategoriesLoading: query.isLoading,
    isCategoriesError: query.isError,
    refetchCategories: query.refetch
  };
}
