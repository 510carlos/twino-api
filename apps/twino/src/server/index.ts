import { publicProcedure, router } from "./trpc";

export const appRouter = router({
  test: publicProcedure.query(() => {
    return { data: "Hello trpc!" };
  }),
});

export type AppRouter = typeof appRouter;
