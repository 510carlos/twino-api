import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

const createMongoClient = async (uri: string): Promise<MongoClient> => {
  const newClient = new MongoClient(uri);
  try {
    await newClient.connect();
    return newClient;
  } catch (error) {
    throw error;
  }
};

export const getDatabaseClient = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error(
        "MONGODB_URI environment variable is not set. Please add MONGODB_URI to your environment variables."
      );
    }

    if (!client) {
      client = await createMongoClient(mongoUri);
    }

    const dbName = process.env.MONGODB_DB || "twino";
    return client.db(dbName);
  } catch (error) {
    console.error("[MongoDB] Database connection error:", error);
    throw new Error(
      "Failed to connect to database. Please ensure MONGODB_URI is correctly set in your environment variables."
    );
  }
};

export const closeDatabaseConnection = async (): Promise<void> => {
  if (client) {
    await client.close();
    client = null;
  }
};

// Types
export type MongoDatabase = Awaited<ReturnType<typeof getDatabaseClient>>;
