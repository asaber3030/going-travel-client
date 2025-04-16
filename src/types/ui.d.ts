import { Location } from "."

export type UILocation = {
  id: number
  name: string
  image: string
  map_url: string
}

export type UICategory = {
  id: number
  name: string
  image: string
}

export type UITour = {
  id: number
  title: string
  description: string
  distance_description: string
  duration: string
  availability: string
  type: "public" | "private"
  banner: string
  thumbnail: string
  trip_information: null | string
  before_you_go: null | string
  max_people: number
  price_start: number
  has_offer: boolean
  offer_price: null | number
  location: UILocation
  reviews_count: number
}

export type UIReview = {
  id: number
  client_name: string
  tour_id: number
  rating: number
  title: string
  description: string
  image: string
  tour: {
    id: number
    title: string
    description: string
    distance_description: string
  }
}

export type UIFullTour = {
  id: number
  duration: string
  availability: string
  type: "public" | string
  banner: string
  thumbnail: string
  trip_information: null | string
  before_you_go: null | string
  max_people: number
  price_start: number
  has_offer: 0 | 1
  offer_price: null | number
  category_id: number
  pickup_location_id: number
  location_id: number
  created_by: number
  updated_by: number
  deleted_by: null | number
  deleted_at: null | string
  created_at: string
  updated_at: string
  title: string
  description: string
  distance_description: string
  reviews_count: number
  highlights: UIHighlight[]
  reviews: UIReview[]
  itineraries: UIItinerary[]
  inclusions_exclusions: UIInclusionExclusion[]
  images: UITourImage[]
  category: UICategory
  location: UILocation
  pickup_location: UILocation
}

export type UIHighlight = {
  id: number
  tour_id: number
  image: string
  title: string
}

export type UIItinerary = {
  id: number
  tour_id: number
  day_number: number
  image: string
  meals: string
  overnight_location: string
  title: string
  description: string
}

export type UIInclusionExclusion = {
  id: number
  tour_id: number
  type: "inclusion" | "exclusion"
  title: string
}

export type UITourImage = {
  id: number
  tour_id: number
  image_url: string
}

export type UICategory = {
  id: number
  image: string
  name: string
  description: string
}

type UILimousine = {
  id: number
  type: string
  price_per_hour: number
  max_passengers: number
  image: string
  category_id: number
  location_id: number
  name: string
  description: string
  reviews: UILimousineReview[]
  features: UILimousineFeature[]
  services: UILimousineService[]
  specifications: UILimousineSpecification[]
  images: UILimousineImage[]
  overviews: UILimousineOverview[]
  translations: UILimousineTranslation[]
}

type UILimousineReview = {
  id: number
  limousine_id: number
  reviewer_name: string
  rating: number
  comment: string
}

type UILimousineFeature = {
  id: number
  limousine_id: number
  locale: string
  vehicle_features: string
  additional_info: string
}
type UILimousineService = {
  id: number
  limousine_id: number
  locale: string
  our_services: string
}
type UILimousineSpecification = {
  id: number
  limousine_id: number
  locale: string
  vehicle_specifications: string
}
type UILimousineOverview = {
  id: number
  limousine_id: number
  locale: string
  about_vehicle: string
  key_features: string
  available_services: string
  pricing: string
}

type UILimousineImage = {
  id: number
  limousine_id: number
  url: string
}

type UILimousineTranslation = {
  id: number
  limousine_id: number
  locale: string
  name: string
  description: string
}

type UIHotel = {
  id: number
  status: string
  location_id: number
  category_id: number
  stars: number
  thumbnail: string
  banner: string
  short_description: string
  description: string
  price: number
  policy: string
  name: string
  description: string
  amenity: UIHotelAmenity
  reviews: UIHotelReview[]
  location: UILocation
  translations: UIHotelTranslation[]
}

type UIHotelReview = {
  id: number
  hotel_id: number
  client_name: string
  rating: number
  message: string
  created_at: Date
  updated_at: Date
}

type UIHotelTranslation = {
  id: number
  hotel_id: number
  locale: string
  name: string
  description: string
  short_description: string
  address: string
  policy: string
  room_types: string
  slug: string
}

type UIHotelAmenity = {
  id: number
  hotel_id: number
  free_wifi: boolean
  spa_wellness_center: boolean
  fitness_center: boolean
  gourmet_restaurant: boolean
  indoor_outdoor_pools: boolean
  air_conditioning: boolean
  flat_screen_tv: boolean
  free_parking: boolean
  front_desk_24h: boolean
}
type UIHotelLocation = {
  id: number
  name: string
  image: string
  map_url: string
}
