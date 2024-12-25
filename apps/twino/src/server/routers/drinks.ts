import { publicProcedure, router } from "../trpc";
import { z } from "zod";

// Mock data - in a real app this would come from a database
const drinks = [
  {
    name: "Green Tea",
    id: "green-tea",
    description: "A soothing green tea.",
    ingredients: ["Green tea leaves", "Water"],
  },
  {
    name: "Black Coffee",
    id: "black-coffee",
    description: "A strong black coffee.",
    ingredients: ["Coffee beans", "Hot water"],
  },
];

type Drink = (typeof drinks)[0];

export const drinksRouter = router({
  getAll: publicProcedure.query(async () => {
    return drinks.map(({ name, id }) => ({ name, id }));
  }),

  getByName: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ input }) => {
      const drink = drinks.find(
        (d) => d.id.toLowerCase() === input.name.toLowerCase()
      );
      if (!drink) throw new Error(`Drink ${input.name} not found`);
      return drink;
    }),
});

export type DrinksRouter = typeof drinksRouter;
