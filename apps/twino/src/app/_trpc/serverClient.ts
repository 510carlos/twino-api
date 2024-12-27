import { appRouter } from "../../server";
import type { Context } from "../../server/context";
import { getDatabaseClient } from "../../server/db";
import { t } from "../../server/trpc";

export const getBaseUrl = () => {
  const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL;

  let baseUrl = "";
  if (NEXT_PUBLIC_URL === "localhost") {
    const port = process.env.NEXT_PUBLIC_PORT;
    baseUrl = `http://${NEXT_PUBLIC_URL}:${port}`;
  }

  return baseUrl;
};

// Create a strongly-typed caller factory using the configured t instance
const createCaller = t.createCallerFactory(appRouter);

export const serverClient = async () => {
  const db = await getDatabaseClient();
  const context: Context = { db };
  return createCaller(context);
};
