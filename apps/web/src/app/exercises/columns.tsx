'use client';

import { ColumnDef } from '@tanstack/react-table';
import { exercises } from '@server/actions';

export const columns: ColumnDef<exercises.IExercise>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'key',
    header: 'Key',
  }
];
