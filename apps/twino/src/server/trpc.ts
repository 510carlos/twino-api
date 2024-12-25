import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter: ({ shape, error }) => ({
    ...shape,
    data: {
      ...shape.data,
      zodError:
        error.cause instanceof Error ? error.cause.message : error.message,
    },
  }),
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Reusable middleware to ensure users are authenticated
export const isAuthenticated = t.middleware(({ next, ctx }) => {
  // TODO: Implement authentication check
  // if (!ctx.user) {
  //   throw new TRPCError({
  //     code: 'UNAUTHORIZED',
  //     message: 'You must be authenticated to access this resource',
  //   })
  // }
  return next({
    ctx: {
      ...ctx,
      // user: ctx.user, // Add authenticated user to context
    },
  });
});

// Protected procedures
export const protectedProcedure = t.procedure.use(isAuthenticated);
