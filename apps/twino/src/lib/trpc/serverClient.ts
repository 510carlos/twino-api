import { httpBatchLink } from "@trpc/client";
import appRouter from "../../server/appRouter";
import { config } from "../../config";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${config.baseUrl}/api/trpc`,
    }),
  ],
});
