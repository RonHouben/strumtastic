'use client';

import { exercises } from '@server/actions';
import { DataTable } from '@ui/components/data-table';
import { columns } from './columns';
import { useRouter, usePathname } from 'next/navigation';

interface Props {
  exercises: exercises.IExercise[];
}

export function ExercisesDataTable({ exercises }: Props) {
	const router = useRouter();
	const path = usePathname();

  const handleRowClick = (row: exercises.IExercise) => {
		router.push(`${path}/${row.id}`);
  };

  return (
    <DataTable columns={columns} data={exercises} onRowClick={handleRowClick} />
  );
}
