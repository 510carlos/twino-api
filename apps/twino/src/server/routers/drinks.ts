import { TRPCError } from "@trpc/server";
import { Collection, Db } from "mongodb";
import { z } from "zod";
import { drinksSchemas } from "./schemas/drinks";
import { DrinkDocument } from "../db/schemas/drinks.schema";
import { publicProcedure, router } from "../trpc";

// Utility functions
const getDrinksCollection = (db: Db | undefined): Collection<DrinkDocument> => {
  if (!db) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message:
        "Database connection not available. Please check your MongoDB configuration.",
    });
  }

  return db.collection<DrinkDocument>("drinks");
};

const formatDrinkId = (name: string): string =>
  name.toLowerCase().replace(/\s+/g, "-");

const handleDrinkNotFound = (name: string): never => {
  throw new TRPCError({
    code: "NOT_FOUND",
    message: `Drink ${name} not found`,
  });
};

// Router implementation
export const drinksRouter = router({
  getByName: publicProcedure
    .input(drinksSchemas.getByNameInput)
    .output(drinksSchemas.getByNameOutput)
    .query(async ({ input, ctx }) => {
      try {
        const collection = getDrinksCollection(ctx.db);
        const drinkId = formatDrinkId(input.name);
        const drink = await collection.findOne({ id: drinkId });
        if (!drink) {
          handleDrinkNotFound(input.name);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, createdAt, updatedAt, ...baseDrink } =
          drink as DrinkDocument;
        return baseDrink;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
      }
    }),
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const collection = getDrinksCollection(ctx.db);
        const items = await collection
          .find({})
          .limit(input.limit)
          .skip(input.cursor ? parseInt(input.cursor) : 0)
          .toArray()
          .then((drinks: DrinkDocument[]) =>
            drinks.map(
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              ({ _id, createdAt, updatedAt, ...baseDrink }) => baseDrink
            )
          );
        const nextCursor =
          items.length === input.limit
            ? (input.cursor ? parseInt(input.cursor) : 0) + input.limit
            : undefined;
        return {
          items,
          nextCursor: nextCursor?.toString(),
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
      }
    }),
  create: publicProcedure
    .input(drinksSchemas.getByNameOutput)
    .mutation(async ({ input, ctx }) => {
      try {
        const collection = getDrinksCollection(ctx.db);
        const drinkId = formatDrinkId(input.name);
        const existingDrink = await collection.findOne({ id: drinkId });
        if (existingDrink) {
          throw new TRPCError({
            code: "CONFLICT",
            message: `Drink ${input.name} already exists`,
          });
        }
        const drink: DrinkDocument = {
          ...input,
          _id: drinkId,
          id: drinkId,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        await collection.insertOne(drink);
        return drink;
      } catch (error) {
        if (error instanceof TRPCError) throw error;
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
      }
    }),
});

export type DrinksRouter = typeof drinksRouter;
