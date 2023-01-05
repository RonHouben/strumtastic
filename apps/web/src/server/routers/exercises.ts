import { router, publicProcedure } from '@server/trcp';
import { exercises } from 'ui/dummy-data';

export const exercisesRouter = router({
	getAll: publicProcedure.query(() => exercises)
})
