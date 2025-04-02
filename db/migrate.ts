// import { drizzle } from "drizzle-orm/postgres-js"
// import { migrate } from "drizzle-orm/postgres-js/migrator"
// import postgres from "postgres"
// import * as dotenv from "dotenv"

// dotenv.config()

// // This script runs migrations on the database
// async function main() {
//   const connectionString = process.env.DATABASE_URL

//   if (!connectionString) {
//     throw new Error("DATABASE_URL environment variable is not set")
//   }

//   const sql = postgres(connectionString, { max: 1 })
//   const db = drizzle(sql)

//   console.log("Running migrations...")

//   await migrate(db, { migrationsFolder: "drizzle" })

//   console.log("Migrations completed successfully")

//   await sql.end()
//   process.exit(0)
// }

// main().catch((error) => {
//   console.error("Migration failed:", error)
//   process.exit(1)
// })

import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import * as dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const db = drizzle(databaseUrl);

async function main() {
  console.log("Running migrations...");
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main();