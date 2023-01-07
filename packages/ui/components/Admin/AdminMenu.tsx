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

  const buttonSelectedClass = 'dark:!bg-primary-900 !bg-primary-500';
  const buttonDeselectedClass = 'dark:!bg-secondary-800 dark:!text-gray-400 !bg-secondary-400';

  return [
    {
      title: 'Exercises',
      content: (
        <div className="flex flex-col gap-2">
          <ButtonLink
            href="/admin/exercises"
            className={
              isShowAllExercisesSelected
                ? buttonSelectedClass
                : buttonDeselectedClass
            }
          >
            Show All
          </ButtonLink>
          <ButtonLink
            href="/admin/exercises/create"
            className={
              isCreateExerciseSelected
                ? buttonSelectedClass
                : buttonDeselectedClass
            }
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
