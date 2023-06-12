'use server';

import { schema, repository } from 'database';

export type IExercise = schema.exercises.IExercise;

export async function getById(id: IExercise['id']) {
  return repository.exercises.getById(id)
}

export async function getAll() {
  return repository.exercises.getAll()
}
