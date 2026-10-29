import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is missing in .env.local");

const globalForMongo = globalThis as unknown as {
  _mongoClient?: Promise<MongoClient>;
};

export const clientPromise: Promise<MongoClient> =
  globalForMongo._mongoClient ?? new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = clientPromise;
}

export async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB);
}