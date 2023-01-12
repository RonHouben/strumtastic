'use client';

import { ButtonLink } from '../ButtonLink';
import { Disclosure } from '../Disclosure/';
import { usePathname } from 'next/navigation';

export default function AdminMenu() {
  const path = usePathname();

  return (
    <>
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
        <ButtonLink
          href={`${path}#`}
          size="md"
          variant="text"
          color="secondary"
          fullWidth
          className="!justify-start"
          selected={path === '/admin/exercises/update'}
        >
          Update
        </ButtonLink>
      </Disclosure>
      <Disclosure title="Users">
        <ButtonLink
          href={`${path}#`}
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
    </>
  );
}
