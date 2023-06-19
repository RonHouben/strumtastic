import { Exercise } from 'ui/components/Exercise';
import { exercises } from '@server/actions';
import { Container } from '@ui/components/container';
import { Metadata, ResolvingMetadata } from 'next';

interface Props {
  params: { id: exercises.IExercise['id'] };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata(
  { params }: Props,
  parent?: ResolvingMetadata,
): Promise<Metadata> {
  const exerciseId = params.id;
  const exercise = await exercises.getById<
    Pick<exercises.IExercise, 'id' | 'title' | 'key'>
  >(exerciseId, {
    id: true,
    title: true,
    key: true,
  });

  return {
    title: `Exercise - ${exercise.title}`,
    description: `Exercise - ${exercise.title} in key "${exercise.key}"`,
  };
}

export default async function ExercisePage({ params }: Props) {
  const exercise = await exercises.getById<exercises.IExercise>(params.id);

  if (!exercise) {
    return <div>Exercise not found</div>;
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
