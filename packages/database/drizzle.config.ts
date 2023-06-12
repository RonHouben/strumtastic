import type { Config } from "drizzle-kit";
 
export default {
  schema: "./src/schemas/index.ts",
  out: "./drizzle",
	connectionString: process.env.DB_CONNECTION_STRING,
} satisfies Config;