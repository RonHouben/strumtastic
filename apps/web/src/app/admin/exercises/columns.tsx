'use client';

import { ColumnDef } from '@tanstack/react-table';
import { exercises } from '@server/actions';
import { Button } from '@ui/components/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@ui/components/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<exercises.IExercise>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'key',
    header: 'Key',
  },
  {
    accessorKey: 'isEnabled',
    header: 'Enabled',
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const exercise = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Link href={`/admin/exercises/edit/${exercise.id}`}>
              <DropdownMenuItem className="cursor-pointer">
                Edit
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => exercises.deleteById(exercise.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
