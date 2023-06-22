import { Exercise } from 'ui/components/Exercise';
import { exercises } from '@server/actions';
import { Container } from '@ui/components/container';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: exercises.IExercise['id'] };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const exercise = await exercises.getById<
    Pick<exercises.IExercise, 'id' | 'title' | 'key'>
  >(params.id, {
    id: true,
    title: true,
    key: true,
  });

  if (!exercise) {
    notFound();
  }

  return {
    title: `Exercise - ${exercise.title}`,
    description: `Exercise - ${exercise.title} in key "${exercise.key}"`,
  };
}

export default async function ExercisePage({ params }: Props) {
  const exercise = await exercises.getById<exercises.IExercise>(params.id);

  if (!exercise) {
    notFound();
  }

  return (
    <Container
      title={exercise.title}
      description={`${exercise.title} in key "${exercise.key}"`}
    >
      <Exercise exercise={exercise} />
    </Container>
  );
}
