import { prisma } from '@server/prisma';
import { router, publicProcedure } from '@server/trcp';
import { exercisesSchemas } from './exercises.schema';

export const exercisesRouter = router({
  getById: publicProcedure
    .input(exercisesSchemas.getById)
    .query(({ input }) =>
      prisma.exercise.findUnique({ where: { id: input.id } }),
    ),
  getAll: publicProcedure.query(() => prisma.exercise.findMany({ orderBy: { title: 'asc' }})),
  create: publicProcedure.input(exercisesSchemas.create).mutation(({ input }) =>
    prisma.exercise.create({
      data: input,
    }),
  ),
});
