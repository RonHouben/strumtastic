import { router, publicProcedure } from '@server/trcp';

export const healthRouter = router({
  health: publicProcedure.query(() => ({ success: true })),
});