import { z } from "zod";
import { baseDrinkSchema } from "../../db/schemas/base.schema";

// Input schemas
export const getByNameInputSchema = z.object({
  name: z.string(),
});

// Output schemas
export const getByNameOutputSchema = baseDrinkSchema;

// Aggregate schemas for easier imports
export const drinksSchemas = {
  getByNameInput: getByNameInputSchema,
  getByNameOutput: getByNameOutputSchema,
} as const;

export type GetByNameInput = z.infer<typeof getByNameInputSchema>;
export type GetByNameOutput = z.infer<typeof getByNameOutputSchema>;
