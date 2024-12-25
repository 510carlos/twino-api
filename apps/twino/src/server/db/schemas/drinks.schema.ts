import { z } from "zod";
import { baseDrinkSchema } from "./base.schema";

export const drinksSchema = baseDrinkSchema.extend({
  _id: z.string(), // MongoDB's document ID
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type DrinkDocument = z.infer<typeof drinksSchema>;
