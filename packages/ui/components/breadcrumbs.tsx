'use client';

import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { Icons } from '@ui/components/icons';
import Link from 'next/link';

export function Breadcrumbs() {
  const pathname = usePathname();

  const { paths, isHome } = useMemo(
    () => ({
      paths: pathname.split('/'),
      isHome: pathname === '/'
    }),
    [pathname]
  );

  return (
    <div className="flex text-sm">
      {!isHome && paths.map((path, i, arr) => (
        <div className="flex items-center justify-start" key={i}>
          <Link
            className="capitalize"
            href={`${arr.slice(0, i).join('/')}/${path}` || '/'}
          >
            {path || 'Home'}
          </Link>
          {i < paths.length - 1 && <Icons.chevronRight size="1rem" className='mx-1' />}
        </div>
      ))}
    </div>
  );
}
