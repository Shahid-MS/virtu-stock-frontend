import { z } from "zod";

export const updateIpoSchema = z.object({
  subscriptions: z.record(
    z.string(),
    z.string().min(1, "Subscription value is required")
  ),

  issueSize: z.object({
    fresh: z.string().min(2, "Fresh issue size is required"),
    offerForSale: z.string().min(2, "Offer For Sale is required"),
    totalIssueSize: z.string().min(2, "Total issue size is required"),
  }),

  gmp: z.array(
    z.object({
      gmpDate: z
        .string()
        .min(1, "GMP date is required")
        .refine((val) => !isNaN(Date.parse(val)), "Invalid date format"),
      gmp: z
        .string()
        .min(1, "GMP value is required")
        .refine((val) => !isNaN(Number(val)), "GMP must be a number")
        .refine((val) => Number(val) >= 0, "GMP cannot be negative"),
    })
  ),
});

export type updateIpoSchemaSchemaType = z.infer<typeof updateIpoSchema>;
