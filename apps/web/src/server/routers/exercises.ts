import { prisma } from '@server/prisma';
import { router, publicProcedure } from '@server/trcp';

export const exercisesRouter = router({
  getAll: publicProcedure.query(() => prisma.exercise.findMany()),
});
