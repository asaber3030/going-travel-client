import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememeberMe: z.boolean().optional()
})

export const CategorySchema = {
  Create: z.object({
    translations: z.array(
      z.object({
        name: z.string().min(2),
        description: z.string().min(2),
        locale: z.string().min(2)
      })
    )
  })
}

export const LocationSchema = {
  Create: z.object({
    name: z.string().min(2)
  }),
  Update: z.object({
    name: z.string().min(2)
  })
}

export const TourSchema = {
  Create: z.object({
    duration: z.number().int().positive(),
    type: z.enum(["public", "private"]),
    availability: z.string().min(2),
    max_people: z.number().int().positive(),
    price_start: z.number().int().positive(),
    category_id: z.number().int().positive(),
    location_id: z.number().int().positive(),
    pickup_location_id: z.number().int().positive(),
    translations: z.array(
      z.object({
        title: z.string().min(2),
        description: z.string().min(2),
        distance_description: z.string().min(2),
        locale: z.string().min(2)
      })
    )
  })
}

export const TourItinerarySchema = z.object({
  meals: z.string().min(2),
  day_number: z.number().int().positive(),
  overnight_location: z.string().min(2),
  translations: z.array(
    z.object({
      title: z.string().min(2),
      description: z.string().min(2),
      locale: z.string().min(2)
    })
  )
})

export const TourHighlightSchema = z.object({
  translations: z.array(
    z.object({
      title: z.string().min(2),
      locale: z.string().min(2)
    })
  )
})

export const TourExclusionSchema = z.object({
  type: z.enum(["exclusion", "inclusion"]),
  translations: z.array(
    z.object({
      title: z.string().min(2),
      locale: z.string().min(2)
    })
  )
})

export const TourReviewSchema = z.object({
  client_name: z.string().min(2),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(2),
  description: z.string().min(2)
})

export const LimousineSchema = {
  Create: z.object({
    price_per_hour: z.string().or(z.number().int().positive()),
    type: z.string().min(2),
    max_passengers: z.string().or(z.number().int().positive()),
    category_id: z.number().int().positive(),
    location_id: z.number().int().positive(),
    translations: z.array(
      z.object({
        name: z.string().min(2),
        description: z.string().min(2),
        locale: z.string().min(2)
      })
    )
  })
}

export const LimousineFeatureSchema = {
  Create: z.object({
    locale: z.string().min(2),
    vehicle_features: z.string().min(2),
    additional_info: z.string().min(2)
  })
}

export const LimousineOverviewSchema = {
  Create: z.object({
    locale: z.string().min(2),
    about_vehicle: z.string().min(2),
    key_features: z.string().min(2),
    available_services: z.string().min(2),
    pricing: z.string()
  })
}

export const LimousineReviewSchema = {
  Create: z.object({
    reviewer_name: z.string().min(2),
    rating: z.number().positive(),
    comment: z.string().min(2)
  })
}

export const LimousineServiceSchema = {
  Create: z.object({
    locale: z.string().min(2),
    our_services: z.string().min(2)
  })
}

export const LimousineSpecificationSchema = {
  Create: z.object({
    locale: z.string().min(2),
    vehicle_specifications: z.string().min(1)
  })
}

export const LimousineTranslationSchema = {
  Create: z.object({
    locale: z.string().min(2),
    name: z.string().min(1),
    description: z.string().min(1)
  })
}

export const ServiceCardTranslationSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  locale: z.string().min(2, "Locale must be at least 2 characters").max(5, "Locale must be at most 5 characters")
})

export const ServiceCardSchema = {
  Create: z.object({
    enabled: z.any(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    translations: z.array(ServiceCardTranslationSchema) // Array of translations
  }),
  Update: z.object({
    enabled: z.any(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    translations: z.array(ServiceCardTranslationSchema) // Array of translations
  })
}

export const HotelSchema = z.object({
  location_id: z.number(),
  category_id: z.number(),
  price: z.number().positive(),
  stars: z.number().int().positive(),
  translations: z.array(
    z.object({
      locale: z.string().max(10),
      name: z.string().max(255),
      description: z.string(),
      address: z.string(),
      short_description: z.string(),
      room_types: z.string(),
      policy: z.string(),
      slug: z.string()
    })
  ),
  amenity: z.object({
    free_wifi: z.any().optional(),
    spa_wellness_center: z.any().optional(),
    fitness_center: z.any().optional(),
    gourmet_restaurant: z.any().optional(),
    indoor_outdoor_pools: z.any().optional(),
    air_conditioning: z.any().optional(),
    flat_screen_tv: z.any().optional(),
    free_parking: z.any().optional(),
    front_desk_24h: z.any().optional()
  })
})

export const UpdateHotelSchema = z.object({
  location_id: z.number(),
  category_id: z.number(),
  price: z.number().positive(),
  stars: z.number().int().positive(),
  translations: z.array(
    z.object({
      locale: z.string().max(10),
      name: z.string().max(255),
      description: z.string(),
      address: z.string(),
      short_description: z.string(),
      room_types: z.string(),
      policy: z.string(),
      slug: z.string()
    })
  )
})

export const HajSchema = z.object({
  title: z.string().max(255),
  description: z.string(),
  long_description: z.string(),
  price: z.number(),
  cautions: z.string(),
  depature_date: z.coerce.date(),
  return_date: z.coerce.date(),
  notes: z.string(),
  meals: z.string(),
  transportation_type: z.string(),
  hotel: z.string()
})
