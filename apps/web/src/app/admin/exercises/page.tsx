import { appConfig } from '@config/app';
import { exercises } from '@server/actions';
import { Container } from '@ui/components/container';
import { Metadata } from 'next';
import { AdminExercisesDataTable } from './data-table';
import { Button } from '@ui/components/button';
import Link from 'next/link';

export const metadata: Metadata = appConfig.metadata.adminExercises;

export default async function AdminExercisesPage() {
  const allExercises = await exercises.getAll();

  return (
    <Container title={metadata.title} description={metadata.description}>
      <div className='flex py-4 justify-end'>
        <Button variant='outline'>
          <Link href="/admin/exercises/create">Create Exercise</Link>
        </Button>
      </div>
      <AdminExercisesDataTable exercises={allExercises} />
    </Container>
  );
}
