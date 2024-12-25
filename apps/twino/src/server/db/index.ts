import { MongoClient } from "mongodb";

let client: MongoClient | null = null;

const createMongoClient = async (uri: string): Promise<MongoClient> => {
  console.log("[MongoDB] Attempting to create new client");
  const newClient = new MongoClient(uri);
  try {
    console.log("[MongoDB] Attempting to connect...");
    await newClient.connect();
    console.log("[MongoDB] Successfully connected");
    return newClient;
  } catch (error) {
    console.error("[MongoDB] Connection attempt failed:", error);
    throw error;
  }
};

export const getDatabaseClient = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    console.log(
      "[MongoDB] Checking MONGODB_URI:",
      mongoUri ? "Present" : "Missing"
    );

    if (!mongoUri) {
      throw new Error(
        "MONGODB_URI environment variable is not set. Please add MONGODB_URI to your environment variables."
      );
    }

    if (!client) {
      console.log("[MongoDB] No existing client, creating new connection");
      client = await createMongoClient(mongoUri);
    } else {
      console.log("[MongoDB] Using existing client connection");
    }

    const dbName = process.env.MONGODB_DB || "twino";
    console.log(`[MongoDB] Using database: ${dbName}`);
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
    console.log("Disconnected from MongoDB");
  }
};

// Types
export type MongoDatabase = Awaited<ReturnType<typeof getDatabaseClient>>;
