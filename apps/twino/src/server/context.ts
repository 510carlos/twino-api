import { getDatabaseClient } from "./db";

export const createContext = async () => {
  return { db: await getDatabaseClient() };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
