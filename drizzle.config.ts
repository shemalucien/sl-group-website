import type { Config } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config()

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    host: "localhost", // Replace with your database host
    port: 5433, // Replace with your database port
    user: "postgres", // Replace with your database user
    password: "",
    database: "PostgreSQL 17", // Replace with your database name
    ssl: true, // Adjust based on your database configuration
  },
  dialect: "postgresql", // Add this line to specify the database dialect
} satisfies Config