'use server';

import * as schema from 'database/src/schemas';
import * as repository from 'database/src/repositories';
import { revalidatePath } from 'next/cache';

export async function create(data: schema.exercises.ICreateExercise) {
  await repository.exercises.create(data);

  revalidatePath('/admin/exercises');
}

export type IExercise = schema.exercises.IExercise;

export async function update(
  id: IExercise['id'],
  data: schema.exercises.IUpdateExercise,
) {
  await repository.exercises.update(id, data);

  revalidatePath('/admin/exercises');
}

export async function deleteById(id: IExercise['id']) {
  await repository.exercises.deleteById(id);

  revalidatePath('/admin/exercises');
}

export async function getById<T extends Partial<IExercise>>(
  id: IExercise['id'],
  columns?: repository.exercises.ExercisesColumns,
) {
  return repository.exercises.getById<T>(id, columns);
}

export async function getAll() {
  return repository.exercises.getAll();
}
