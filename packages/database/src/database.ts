import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import "dotenv/config";

const client = postgres(process.env.POSTGRES_URL as string);
const db = drizzle(client);

export { db };
