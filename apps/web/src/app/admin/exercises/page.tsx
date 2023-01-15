import { Typography } from 'ui/components';
import ExercisesList from 'ui/components/Admin/ExercisesList';

export default async function AdminExercisesPage() {
  return (
    <>
      <Typography variant="h1">Admin Exercises Page </Typography>
      <ExercisesList />
    </>
  );
}
