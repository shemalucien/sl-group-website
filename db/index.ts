import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import * as schema from "./schema"

// import * as dotenv from "dotenv";

// dotenv.config();

// Check if we're in production
const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set")
}

// Create connection
const client = postgres(connectionString)
export const db = drizzle(client, { schema })

