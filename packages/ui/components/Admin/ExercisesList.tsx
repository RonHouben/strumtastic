'use client';

import { api } from '@client/trpc';
import { Exercise } from 'database';
import IconButton from '../IconButton';
import DeleteIcon from '@heroicons/react/24/outline/TrashIcon';
import EditIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import IconButtonLink from '../IconButtonLink';
import { Typography } from '../Typography';
import Skeleton from '../Skeleton';

export default function ExercisesList() {
  const {
    data: exercises,
    isLoading,
    isError
  } = api.exercises.getAll.useQuery();
  const { mutate } = api.exercises.delete.useMutation();

  const handleDeleteExercise = async (id: Exercise['id']) => {
    // TODO: add confirm delete dialog
    mutate({ id });
  };

  return (
    <>
      {isLoading && (
        <div className="my-2">
          <Skeleton lines={10} />
        </div>
      )}
      {!isLoading && !isError && exercises && (
        <div className="flex flex-col">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="flex w-fit justify-between gap-4 align-middle"
            >
              <Typography variant='p'>{exercise.title}</Typography>
              <IconButtonLink
                href={`/admin/exercises/edit/${exercise.id}`}
                color="secondary"
                variant="text"
                size="md"
              >
                <EditIcon />
              </IconButtonLink>
              <IconButton
                color="red"
                variant="text"
                size="md"
                onClick={() => handleDeleteExercise(exercise.id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
