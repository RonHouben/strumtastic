import { drizzle as drizzleVercel } from 'drizzle-orm/vercel-postgres';
import { drizzle as drizzleLocal } from 'drizzle-orm/postgres-js';
import { sql } from '@vercel/postgres';
import postgres from 'postgres';
import 'dotenv/config';

const db =
  process.env.NODE_ENV === 'production'
    ? drizzleVercel(sql)
    : drizzleLocal(postgres(process.env.POSTGRES_URL!));

export { db };
