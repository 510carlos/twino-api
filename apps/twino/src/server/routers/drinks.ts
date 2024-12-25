import { publicProcedure, router } from "../trpc";

export const drinksRouter = router({
  allDrinks: publicProcedure.query(() => {
    return [{ name: 'placeholder drink' }];
  }),
  drinkByName: publicProcedure.input(String).query((req) => {
    return { name: req.input };
  }),
});
