import { eq } from 'drizzle-orm';
import * as schema from '../schemas/index.ts';
import { db } from '../database.ts'; 

export async function create(data: schema.exercises.ICreateExercise) {
  return db.insert(schema.exercises.table).values(data);
}

export async function update(id: schema.exercises.IExercise['id'], data: schema.exercises.IUpdateExercise) {
  await db.update(schema.exercises.table).set(data).where(eq(schema.exercises.table.id, id));
}

export async function deleteById(id: schema.exercises.IExercise['id']) {
  await db.delete(schema.exercises.table).where(eq(schema.exercises.table.id, id));
}

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
