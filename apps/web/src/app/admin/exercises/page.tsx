import { Exercise } from 'database';
import { IconButton, Typography } from 'ui/components';
import { apiFetch } from '@server/fetch';
import Link from 'ui/components/Link';
import TrashIcon from '@heroicons/react/24/outline/TrashIcon';

export default async function AdminExercisesPage() {
  const exercises = await apiFetch<Exercise[]>('exercises.getAll', {
    next: { revalidate: 10 },
  });

  return (
    <>
      <Typography variant="h1">Admin Exercises Page </Typography>
      <div className="flex flex-col">
        {exercises.map((exercise) => (
          <div
            key={exercise.id}
            className="flex w-fit justify-between gap-4 align-middle"
          >
            <Link href={`/admin/exercises/update/${exercise.id}`}>
              {exercise.title}
            </Link>
            <IconButton color="secondary" variant="text" size="md">
              <TrashIcon />
            </IconButton>
          </div>
        ))}
      </div>
    </>
  );
}
