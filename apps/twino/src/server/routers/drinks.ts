import { publicProcedure, router } from "../trpc";
import { z } from "zod";

// Mock data - in a real app this would come from a database
const drinks = [
  { id: 1, name: "Espresso", type: "Coffee" },
  { id: 2, name: "Latte", type: "Coffee" },
  { id: 3, name: "Green Tea", type: "Tea" },
];

export const drinksRouter = router({
  getAll: publicProcedure.query(async () => {
    return drinks;
  }),

  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const drink = drinks.find(
        (d) => d.name.toLowerCase() === input.name.toLowerCase()
      );
      return drink;
    }),
});

export type DrinksRouter = typeof drinksRouter;
