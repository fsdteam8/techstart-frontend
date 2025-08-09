import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(1),
  address: z.string().min(1),
  email: z.string(),
  phone: z.string().min(1),
  isSaved: z.boolean(),
});

export type CheckoutSchemaType = z.infer<typeof checkoutSchema>;
