import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schemas/index.ts';
import * as repository from './repositories/index.ts';
import "dotenv/config";

const client = postgres(process.env.POSTGRES_URL as string);
const db = drizzle(client);

export { db, schema, repository };
