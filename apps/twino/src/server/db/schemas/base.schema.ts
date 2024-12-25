import { z } from "zod";

export const baseDrinkSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  ingredients: z.array(z.string()),
});

export type BaseDrink = z.infer<typeof baseDrinkSchema>;
