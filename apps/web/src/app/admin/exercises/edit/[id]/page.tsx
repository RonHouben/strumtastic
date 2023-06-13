import ExerciseFormEdit from 'ui/components/Admin/ExerciseFormEdit';
import { exercises } from '@server/actions';

interface Props {
  params: { id: exercises.IExercise['id'] };
}

export default async function UpdateExercisePage({ params }: Props) {
  const exercise = await exercises.getById(params.id);

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

  return <ExerciseFormEdit exercise={exercise} />;
}
