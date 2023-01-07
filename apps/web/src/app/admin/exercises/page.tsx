import { Exercise } from 'database';
import { Typography } from 'ui/components';
import { fetch } from '@server/fetch';

export default async function AdminExercisesPage() {
  const exercises = await fetch<Exercise[]>('exercises.getAll');

  return (
    <>
      <Typography variant="h1">Admin Exercises Page </Typography>
      {exercises.map((exercise) => (
        <div key={exercise.id}>{exercise.title}</div>
      ))}
    </>
  );
}
