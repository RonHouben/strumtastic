import { router } from '@server/trcp';
import { exercisesRouter } from './exercises.router';
import { healthRouter } from './health.router';

export const appRouter = router({
  health: healthRouter,
	exercises: exercisesRouter,
});

export type AppRouter = typeof appRouter;
