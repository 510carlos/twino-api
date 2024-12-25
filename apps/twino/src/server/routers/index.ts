import { router } from "../trpc";
import { testRouter } from "./test";
import { drinksRouter } from "./drinks";

export const appRouter = router({
  test: testRouter,
  drinks: drinksRouter,
});

export type AppRouter = typeof appRouter;
