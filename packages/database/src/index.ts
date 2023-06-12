import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schemas from './schemas/index.ts';
import "dotenv/config";

const client = postgres(process.env.DB_CONNECTION_STRING as string);
const db = drizzle(client);

export { db, schemas };
