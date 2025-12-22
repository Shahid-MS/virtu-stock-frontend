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
});

export type updateIpoSchemaSchemaType = z.infer<typeof updateIpoSchema>;
