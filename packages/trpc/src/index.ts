import { initTRPC } from "@trpc/server";
import { z } from "zod";

const t = initTRPC.create();

// Example router
export const appRouter = t.router({
  hello: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello, ${input.name}!` };
    }),
});

// Export types for inference
export type AppRouter = typeof appRouter;
