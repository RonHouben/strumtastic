import { router, publicProcedure } from '@server/trcp';
import { exercisesSchemas } from './exercises.schema';

export const exercisesRouter = router({
  getById: publicProcedure
    .input(exercisesSchemas.getById)
    .query(({ input, ctx }) =>
      ctx.prisma.exercise.findUnique({ where: { id: input.id } }),
    ),
  getAll: publicProcedure.query(({ ctx }) =>
    ctx.prisma.exercise.findMany({ orderBy: { title: 'asc' } }),
  ),
  create: publicProcedure
    .input(exercisesSchemas.create)
    .mutation(({ input, ctx }) =>
      ctx.prisma.exercise.create({
        data: input,
      }),
    ),
  delete: publicProcedure
    .input(exercisesSchemas.delete)
    .mutation(({ input, ctx }) =>
      ctx.prisma.exercise.delete({ where: { id: input.id } }),
    ),
  updateById: publicProcedure
    .input(exercisesSchemas.updateById)
    .mutation(({ input, ctx }) => {
      const { id, ...data } = input;

      return ctx.prisma.exercise.update({
        where: { id: input.id },
        data,
      });
    }),
});
