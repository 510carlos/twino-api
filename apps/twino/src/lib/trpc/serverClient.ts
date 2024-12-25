import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import appRouter from "../../server/appRouter";
import { createContext } from "../../server/context";

export const serverClient = async () => {
  // Create a minimal context for server-side calls
  const ctx = await createContext({
    req: new Request("http://dummy-url"),
    resHeaders: new Headers(),
  } as FetchCreateContextFnOptions);

  return appRouter.createCaller(ctx);
};
