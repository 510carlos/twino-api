import { inferAsyncReturnType } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getDatabaseClient } from "./db";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  console.log("[Context] Starting context creation");
  try {
    console.log("[Context] Attempting to get database client");
    const db = await getDatabaseClient();
    console.log("[Context] Successfully got database client");

    return {
      db,
      // Add any additional context properties here
    };
  } catch (error) {
    console.error("[Context] Error creating context:", error);
    throw error;
  }
};

export type Context = inferAsyncReturnType<typeof createContext>;
