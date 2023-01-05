import { router } from '@server/trcp';
import { healthRouter } from './health';

export const appRouter = router({
  health: healthRouter,
});

export type AppRouter = typeof appRouter;
