import { publicProcedure, router } from '@server/trcp';
import { Exercise } from 'database/src';
import { exercisesSchemas } from './exercises.schema';

export const exercisesRouter = router({
  getById: publicProcedure
    .input(exercisesSchemas.getById)
    .query(({ input, ctx }) => ctx.exercises.findById(input.id)),
  getAll: publicProcedure.query(({ ctx }) =>
    ctx.exercises.orderByAscending((exercise) => exercise.title).find(),
  ),
  create: publicProcedure
    .input(exercisesSchemas.create)
    .mutation(({ input, ctx }) =>
      ctx.exercises.create({
        ...input,
        createdAt: new Date(),
        updatedAt: null,
      }),
    ),
  delete: publicProcedure
    .input(exercisesSchemas.delete)
    .mutation(({ input, ctx }) => ctx.exercises.delete(input.id)),
  updateById: publicProcedure
    .input(exercisesSchemas.updateById)
    .mutation(({ input, ctx }) => {
      return ctx.exercises.update({
        ...input,
        updatedAt: new Date(),
      } as Exercise);
    }),
});
