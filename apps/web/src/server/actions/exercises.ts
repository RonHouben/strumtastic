'use server';

import * as schema from 'database/src/schemas';
import * as repository from 'database/src/repositories';
import { revalidatePath } from 'next/cache';

export type IExercise = schema.exercises.IExercise;

export async function create(data: schema.exercises.ICreateExercise) {
  await repository.exercises.create(data)

  revalidatePath('/admin/exercises');
}

export async function update(id: schema.exercises.IExercise['id'], data: schema.exercises.IUpdateExercise) {
  await repository.exercises.update(id, data);

  revalidatePath('/admin/exercises');
}

export async function deleteById(id: schema.exercises.IExercise['id']) {
  await repository.exercises.deleteById(id);

  revalidatePath('/admin/exercises');
}

export async function getById(id: schema.exercises.IExercise['id']) {
  return repository.exercises.getById(id)
}

export async function getAll() {
  return repository.exercises.getAll()
}
