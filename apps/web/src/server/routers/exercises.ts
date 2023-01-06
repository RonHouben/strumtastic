import { prisma } from '@server/prisma';
import { router, publicProcedure } from '@server/trcp';
import { z } from 'zod';

export const exercisesRouter = router({
  getById: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .query(({ input }) =>
      prisma.exercise.findUnique({ where: { id: input.id } }),
    ),
  getAll: publicProcedure.query(() => prisma.exercise.findMany()),
});
