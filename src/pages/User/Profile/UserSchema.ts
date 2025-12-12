import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 3 characters")
    .max(20, "First name is too long"),

  lastName: z
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .refine(
      (v) => v === undefined || (v.length >= 3 && v.length <= 20),
      "Last name must be 3 to 20 characters"
    )
    .optional(),

  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
    message: "Enter a valid email address",
  }),

  phone: z
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .refine(
      (v) => !v || /^[6-9]\d{9}$/.test(v),
      "Enter a valid 10-digit phone number"
    )
    .optional(),

  linkedinUrl: z
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .refine(
      (v) => !v || /^(https?:\/\/)?(www\.)?linkedin\.com\/.+$/.test(v),
      "Enter a valid LinkedIn profile URL"
    )
    .optional(),

  instagramUrl: z
    .string()
    .transform((v) => (v === "" ? undefined : v))
    .refine(
      (v) =>
        !v || /^(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9._]{1,30}\/?$/,
      "Enter a valid Instagram profile URL"
    )
    .optional(),
});

export type userSchemaType = z.infer<typeof userSchema>;
