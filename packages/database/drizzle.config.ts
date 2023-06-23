import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schemas',
  out: './src/migrations',
} satisfies Config;
