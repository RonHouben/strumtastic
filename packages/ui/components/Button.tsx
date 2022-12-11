'use client';

import Link from 'next/link';

interface Props {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button = ({ label, onClick, href }: Props) => {
  return (
    <button className="inline-flex rounded-md shadow" onClick={onClick}>
      <Link
        href={href || '#'}
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-5 py-3 text-base font-medium text-white hover:bg-indigo-700"
      >
        {label}
      </Link>
    </button>
  );
};
