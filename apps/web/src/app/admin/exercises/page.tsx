import { Exercise } from 'database';
import { Typography } from 'ui/components';
import { fetch } from '@server/fetch';
import Link from 'ui/components/Link';

export default async function AdminExercisesPage() {
  const exercises = await fetch<Exercise[]>('exercises.getAll');

  return (
    <>
      <Typography variant="h1">Admin Exercises Page </Typography>
      <div className="flex flex-col">
        {exercises.map((exercise) => (
          <Link
            href={`/admin/exercises/update/${exercise.id}`}
            key={exercise.id}
          >
            {exercise.title}
          </Link>
        ))}
      </div>
    </>
  );
}
