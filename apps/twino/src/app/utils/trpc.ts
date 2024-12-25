import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "trpc";

export const trpc = createTRPCReact<AppRouter>();

export const client = trpc.createClient({
  links: [
    {
      url: "http://localhost:3000/api/trpc",
    },
  ],
});
