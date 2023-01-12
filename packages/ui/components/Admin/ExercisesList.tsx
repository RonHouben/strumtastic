'use client';

import { api } from '@client/trpc';
import { Exercise } from 'database';
import IconButton from '../IconButton';
import Link from '../Link';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

export default function ExercisesList() {
  const {
    data: exercises,
    isLoading,
    isError
  } = api.exercises.getAll.useQuery();
  const { mutate } = api.exercises.delete.useMutation();

  const handleDeleteExercise = async (id: Exercise['id']) => {
    mutate({ id });
  };

  return (
    <>
      {isLoading && (
        <div className='my-2'>
          <span className="inline-block h-5 w-10/12 animate-pulse rounded-md bg-secondary-900" />
          <span className="inline-block h-5 w-10/12 animate-pulse rounded-md bg-secondary-900" />
          <span className="inline-block h-5 w-10/12 animate-pulse rounded-md bg-secondary-900" />
          <span className="inline-block h-5 w-10/12 animate-pulse rounded-md bg-secondary-900" />
        </div>
      )}
      {!isLoading && !isError && exercises && (
        <div className="flex flex-col">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="flex w-fit justify-between gap-4 align-middle"
            >
              <Link href={`/admin/exercises/update/${exercise.id}`}>
                {exercise.title}
              </Link>
              <IconButton
                color="secondary"
                variant="text"
                size="md"
                onClick={() => handleDeleteExercise(exercise.id)}
              >
                <TrashIcon />
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
