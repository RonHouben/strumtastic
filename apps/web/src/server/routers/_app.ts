import { router } from '@server/trcp';
import { healthRouter } from './health.router';
import { exercisesRouter } from './exercises.router';

export const appRouter = router({
  health: healthRouter,
	exercises: exercisesRouter,
});

export type AppRouter = typeof appRouter;
