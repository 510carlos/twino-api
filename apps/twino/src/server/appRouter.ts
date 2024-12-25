import { router } from "./trpc";
import { testRouter } from "./routers/test";
import { drinksRouter } from "./routers/drinks";

export const appRouter = router({
  test: testRouter,
  drinks: drinksRouter,
});

export type AppRouter = typeof appRouter;
