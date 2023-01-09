'use client';

import { useClassNames } from '../../hooks/useClassNames';
import { ButtonLink } from '../ButtonLink';
import { Disclosure } from '../Disclosure/';
import { usePathname } from 'next/navigation';
import { DisclosureItem } from '../Disclosure/Disclosure';

interface Props {
  className?: string;
}

export default function AdminMenu({ className }: Props) {
  const { classNames } = useClassNames();
  const path = usePathname();

  return (
    <div className={classNames(className || '')}>
      <Disclosure items={getMenuItems(path)} />
    </div>
  );
}

function getMenuItems(path: string | null): DisclosureItem[] {
  const isShowAllExercisesSelected = path === '/admin/exercises';
  const isCreateExerciseSelected = path === '/admin/exercises/create';

  return [
    {
      title: 'Exercises',
      content: (
        <div className="flex flex-col gap-2">
          <ButtonLink
            href="/admin/exercises"
            size="md"
            variant="text"
            color="secondary"
            fullWidth
            className='!justify-start'
            selected={isShowAllExercisesSelected}
          >
            Show All
          </ButtonLink>
          <ButtonLink
            href="/admin/exercises/create"
            size="md"
            variant="text"
            color="secondary"
            fullWidth
            className='!justify-start'
            selected={isCreateExerciseSelected}
          >
            Create
          </ButtonLink>
        </div>
      ),
      isOpen: true
    },
    {
      title: 'User Management',
      content: 'Todo'
    }
  ];
}
