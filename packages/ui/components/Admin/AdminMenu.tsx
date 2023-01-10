'use client';

import { useClassNames } from '../../hooks/useClassNames';
import { ButtonLink } from '../ButtonLink';
import { Disclosure } from '../Disclosure/';
import { usePathname } from 'next/navigation';

interface Props {
  className?: string;
}

export default function AdminMenu({ className }: Props) {
  const { classNames } = useClassNames();
  const path = usePathname();

  return (
    <div className={classNames(className || '')}>
      <Disclosure title="Exercises">
        <ButtonLink
          href="/admin/exercises"
          size="md"
          variant="text"
          color="secondary"
          fullWidth
          className="!justify-start"
          selected={path === '/admin/exercises'}
        >
          Show All
        </ButtonLink>
        <ButtonLink
          href="/admin/exercises/create"
          size="md"
          variant="text"
          color="secondary"
          fullWidth
          className="!justify-start"
          selected={path === '/admin/exercises/create'}
        >
          Create
        </ButtonLink>
      </Disclosure>
      <Disclosure title="Users">
        <ButtonLink
          href={`${path}/#`}
          size="md"
          variant="text"
          color="secondary"
          fullWidth
          className="!justify-start"
          selected={path === '/admin/users'}
        >
          Show All
        </ButtonLink>
      </Disclosure>
    </div>
  );
}
