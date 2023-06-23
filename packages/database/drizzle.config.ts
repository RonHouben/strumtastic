import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schemas',
  out: './drizzle',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL + "?sslmode=require",
  }
} satisfies Config;
