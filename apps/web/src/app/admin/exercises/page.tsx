import { Exercises } from '@server/actions';
import { Typography } from 'ui/components';
import ExercisesList from 'ui/components/Admin/ExercisesList';

export default async function AdminExercisesPage() {
  const exercises = await Exercises.getAll();

  return (
    <>
      <Typography variant="h1">Admin Exercises Page </Typography>
      <ExercisesList exercises={exercises} />
    </>
  );
}
