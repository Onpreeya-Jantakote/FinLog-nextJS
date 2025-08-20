import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const dbName = "financial-app";

export async function connectToDatabase() {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  return { db, client };
}
