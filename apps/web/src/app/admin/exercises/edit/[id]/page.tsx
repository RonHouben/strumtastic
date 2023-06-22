import { appConfig } from '@config/app';
import { exercises } from '@server/actions';
import { Container } from '@ui/components/container';
import { ExerciseFormAddEdit } from '@ui/components/forms/exercise-form-add-edit';
import { Metadata } from 'next';
import { notFound } from 'next/navigation'

interface Props {
  params: { id: exercises.IExercise['id'] };
}

export const metadata: Metadata = appConfig.metadata.adminEditExercise;

export default async function UpdateExercisePage({ params }: Props) {
  const exercise = await exercises.getById<exercises.IExercise>(params.id);

  if (!exercise) {
    notFound();
  }

  return (
    <Container title={metadata.title} description={metadata.description}>
      {!exercise && <div>Exercise not found</div>}
      {exercise && <ExerciseFormAddEdit exercise={exercise} />}
    </Container>
  );
}
