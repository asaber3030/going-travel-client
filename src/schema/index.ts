import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const CategorySchema = {
  Create: z.object({
    translations: z.array(
      z.object({
        name: z.string().min(2),
        description: z.string().min(2),
        locale: z.string().min(2),
      })
    ),
  }),
};

export const LocationSchema = {
  Create: z.object({
    name: z.string().min(2),
    map_url: z.string().min(2),
  }),
};
