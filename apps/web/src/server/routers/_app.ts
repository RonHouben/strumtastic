import { router } from '@server/trcp';
import { healthRouter } from './health';
import { exercisesRouter } from './exercises';

export const appRouter = router({
  health: healthRouter,
	exercises: exercisesRouter,
});

export type AppRouter = typeof appRouter;
