import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
});

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
};

export const LocationSchema = {
  Create: z.object({
    name: z.string().min(2),
    map_url: z.string().min(2)
  }),
  Update: z.object({
    name: z.string().min(2),
    map_url: z.string().min(2)
  })
};

export const TourSchema = {
  Create: z.object({
    duration: z.number().int().positive(),
    type: z.enum(["public", "private"]),
    availability: z.string().min(2),
    max_people: z.number().int().positive(),
    price_start: z.number().int().positive(),
    has_offer: z.enum(["yes", "no"]),
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
};

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
});

export const TourHighlightSchema = z.object({
  translations: z.array(
    z.object({
      title: z.string().min(2),
      locale: z.string().min(2)
    })
  )
});

export const TourExclusionSchema = z.object({
  type: z.enum(["exclusion", "inclusion"]),
  translations: z.array(
    z.object({
      title: z.string().min(2),
      locale: z.string().min(2)
    })
  )
});

export const TourReviewSchema = z.object({
  client_name: z.string().min(2),
  rating: z.number().int().min(1).max(5),
  title: z.string().min(2),
  description: z.string().min(2)
});
