import { getAllLocations } from "./actions";

import { QueryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function useLocations(search?: string) {
  const query = useQuery({
    queryKey: QueryKeys.locations.all(search),
    queryFn: ({ queryKey }) => getAllLocations(queryKey[1])
  });

  return {
    locations: query.data,
    isLocationsLoading: query.isLoading,
    isLocationsError: query.isError,
    refetchLocations: query.refetch
  };
}
