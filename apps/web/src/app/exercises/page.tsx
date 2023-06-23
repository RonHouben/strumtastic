import { appConfig } from '@config/app';
import { Container } from 'ui/components/container';
import { Metadata } from 'next';
import { exercises } from '@server/actions';
import { ExercisesDataTable } from './data-table';

export const metadata: Metadata = appConfig.metadata.exercises;

export default async function ExercisesPage() {
  const allExercises = await exercises.getAll();

  return (
    <Container title={metadata.title} description={metadata.description}>
			<ExercisesDataTable exercises={allExercises} />
    </Container>
  );
}
