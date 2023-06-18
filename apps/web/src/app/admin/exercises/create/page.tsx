import { Container } from '@ui/components/container';
import { Metadata } from 'next';
import { appConfig } from '@config/app';
import { ExerciseFormAddEdit } from '@ui/components/forms/exercise-form-add-edit';

export const metadata: Metadata = appConfig.metadata.adminCreateExercise;

export default function CreateExercisePage() {
  return (
    <Container
      className="pt-4"
      title={metadata.title}
      description={metadata.description}
    >
      <ExerciseFormAddEdit />
    </Container>
  );
}
