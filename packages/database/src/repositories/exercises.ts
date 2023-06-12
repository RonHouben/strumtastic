import { eq } from 'drizzle-orm';
import { db, schema } from '../index.ts';

export async function getById(id: schema.exercises.IExercise['id']) {
  const exercises = await db
    .select()
    .from(schema.exercises.table)
    .where(eq(schema.exercises.table.id, id))
    .limit(1);

  return exercises[0];
}

export async function getAll() {
  return db.select().from(schema.exercises.table);
}
