import { Container } from '@ui/components/container';
import { Metadata } from 'next';
import { appConfig } from '@config/app';

export const metadata: Metadata = appConfig.metadata.adminCreateExercise;

export default function CreateExercisePage() {
  return (
    <Container
      className="pt-4"
      title={metadata.title}
      description={metadata.description}
    >
      <div>blablabla</div>
    </Container>
  );
}
