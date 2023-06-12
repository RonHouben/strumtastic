'use server';

import { db, schemas } from 'database';

export type IExercise = schemas.Exercises.IExercise;

export async function getAll() {
  return db.select().from(schemas.Exercises.table);
}
