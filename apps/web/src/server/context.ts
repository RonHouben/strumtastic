import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';

// This example is taken from:
// https://github.com/trpc/next-13/blob/main/server/context.tshttps://github.com/trpc/next-13/blob/main/server/context.ts

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: // HACKs because we can't import `next/cookies` in `/api`-routes
  trpcNext.CreateNextContextOptions & { type: 'api' },
) {
  // for API-response caching see https://trpc.io/docs/caching
  return {
    type: opts.type,
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
