import { QueryKeys } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getTourItineraries, getTourHighlights } from "./actions";

export function useTourItineraries(tourId: number) {
  return useQuery({
    queryKey: QueryKeys.tours.single(tourId, "itineraries"),
    queryFn: () => getTourItineraries(tourId)
  });
}

export function useTourHighlights(tourId: number) {
  return useQuery({
    queryKey: QueryKeys.tours.single(tourId, "highlights"),
    queryFn: () => getTourHighlights(tourId)
  });
}

export function useTourExclusions(tourId: number) {
  return useQuery({
    queryKey: QueryKeys.tours.single(tourId, "exclusions"),
    queryFn: () => getTourHighlights(tourId)
  });
}

export function useTourReviews(tourId: number) {
  return useQuery({
    queryKey: QueryKeys.tours.single(tourId, "reviews"),
    queryFn: () => getTourHighlights(tourId)
  });
}

export function useTourImages(tourId: number) {
  return useQuery({
    queryKey: QueryKeys.tours.single(tourId, "images"),
    queryFn: () => getTourHighlights(tourId)
  });
}
