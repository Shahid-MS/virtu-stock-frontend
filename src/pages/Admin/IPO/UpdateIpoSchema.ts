import { z } from "zod";

export const updateIpoSchema = z.object({
  subscriptions: z.record(
    z.string(),
    z.string().min(1, "Subscription value is required")
  ),
});

export type updateIpoSchemaSchemaType = z.infer<typeof updateIpoSchema>;
