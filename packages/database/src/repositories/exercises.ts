import { eq } from 'drizzle-orm';
import * as schema from '../schemas/index.ts';
import { db } from '../database.ts';

export type ExercisesColumns = {
  [key in keyof typeof schema.exercises.table]?: boolean;
};

export async function create(data: schema.exercises.ICreateExercise) {
  return db.insert(schema.exercises.table).values(data);
}

export async function update(
  id: schema.exercises.IExercise['id'],
  data: schema.exercises.IUpdateExercise
) {
  await db
    .update(schema.exercises.table)
    .set(data)
    .where(eq(schema.exercises.table.id, id));
}

export async function deleteById(id: schema.exercises.IExercise['id']) {
  await db
    .delete(schema.exercises.table)
    .where(eq(schema.exercises.table.id, id));
}

export async function getById<T extends Partial<schema.exercises.IExercise>>(
  id: schema.exercises.IExercise['id'],
  columns?: ExercisesColumns
): Promise<T> {
  // TODO: abstract this
  const selectedColumns = Object.entries(columns || {}).reduce(
    (result, [key, value]) => {
      if (value === true) {
        return {
          ...result,
          [key]: schema.exercises.table[key as keyof ExercisesColumns]
        };
      }

      return result;
    },
    {}
  );

  const hasSelectedColumns = Object.keys(selectedColumns).length > 0;

  let exercises = [];

  if (hasSelectedColumns) {
    exercises = await db
      .select(selectedColumns)
      .from(schema.exercises.table)
      .where(eq(schema.exercises.table.id, id))
      .limit(1);
  } else {
    exercises = await db
      .select()
      .from(schema.exercises.table)
      .where(eq(schema.exercises.table.id, id))
      .limit(1);
  }

  return exercises[0] as unknown as T;
}

export async function getAll() {
  return db.select().from(schema.exercises.table);
}
