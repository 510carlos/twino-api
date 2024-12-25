import { httpBatchLink } from "@trpc/client";
import { appRouter } from "../../server/appRouter";
import { getBaseUrl } from "../../config";

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({
      url: `${getBaseUrl()}/api/trpc`,
    }),
  ],
});
