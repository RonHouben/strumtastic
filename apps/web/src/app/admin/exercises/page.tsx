import { exercises } from '@server/actions';
import { Typography } from 'ui/components';
import ExercisesList from 'ui/components/Admin/ExercisesList';

export default async function AdminExercisesPage() {
  const allExercises = await exercises.getAll();

  return (
    <>
      <Typography variant="h1">Admin Exercises Page </Typography>
      <ExercisesList exercises={allExercises} />
    </>
  );
}
