import { inferAsyncReturnType } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getDatabaseClient } from "./db";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  try {
    const db = await getDatabaseClient();
    return {
      db,
    };
  } catch (error) {
    throw error;
  }
};

export type Context = inferAsyncReturnType<typeof createContext>;
