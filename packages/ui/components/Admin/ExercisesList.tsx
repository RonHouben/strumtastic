'use client';

import IconButton from '../IconButton';
import DeleteIcon from '@heroicons/react/24/outline/TrashIcon';
import EditIcon from '@heroicons/react/24/outline/PencilSquareIcon';
import IconButtonLink from '../IconButtonLink';
import { Typography } from '../Typography';
import { exercises } from '@server/actions';

interface Props {
  exercises: exercises.IExercise[];
}

export default async function ExercisesList({ exercises }: Props) {
  const handleDeleteExercise = async (id: exercises.IExercise['id']) => {
    // TODO: add confirm delete dialog
    console.log('TODO: add deleting of exercise')
  };

  return (
    <div className="flex flex-col">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="flex w-fit justify-between gap-4 align-middle"
        >
          <Typography variant="p">{exercise.title}</Typography>
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
  );
}
