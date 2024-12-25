import { publicProcedure, router } from "../trpc";

export const testRouter = router({
  hello: publicProcedure.query(async () => {
    return { data: "Hello trpc!" };
  }),
});

export type TestRouter = typeof testRouter;
