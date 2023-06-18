import { db } from './database.ts';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

console.log('starting database migrations');

await migrate(db, { migrationsFolder: 'drizzle' });

console.log('database migrations complete');

process.exit(0);
