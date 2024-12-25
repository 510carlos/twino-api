import { drinksRouter } from "./drinks";
import { router } from "../trpc";

export const appRouter = router({
  drinks: drinksRouter,
  // Add more routers here as needed
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
