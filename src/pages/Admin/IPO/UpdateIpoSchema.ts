import { z } from "zod";

export const updateIpoSchema = z.object({
  subscriptions: z.record(
    z.string(),
    z.coerce.string().min(1, "Subscription value is required")
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
      gmp: z.coerce
        .string()
        .min(1, "GMP value is required")
        .refine((val) => !isNaN(Number(val)), "GMP must be a number")
        .refine((val) => Number(val) >= 0, "GMP cannot be negative"),
    })
  ),
  verdict: z.enum(["STRONG_BUY", "BUY", "WAIT", "AVOID", "NOT_REVIEWED"]),
  listedPrice: z.coerce
    .string()
    .refine((val) => !isNaN(Number(val)), "Listed Price must be a number")
    .refine((val) => Number(val) >= 0, "Listed cannot be negative"),
});

export type UpdateIpoFormInput = z.input<typeof updateIpoSchema>;
export type UpdateIpoFormOutput = z.output<typeof updateIpoSchema>;
