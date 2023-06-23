import { migrate as migrateVercel } from 'drizzle-orm/vercel-postgres/migrator';
import { migrate as migrateLocal } from 'drizzle-orm/postgres-js/migrator';
import { VercelPgDatabase } from 'drizzle-orm/vercel-postgres';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { db } from './database.ts';

console.log('starting database migrations');

if (process.env.NODE_ENV === 'production') {
  await migrateVercel(db as VercelPgDatabase, { migrationsFolder: './migrations' });
} else {
  await migrateLocal(db as unknown as PostgresJsDatabase, { migrationsFolder: 'src/migrations' });
}

console.log('database migrations complete');

process.exit(0);
