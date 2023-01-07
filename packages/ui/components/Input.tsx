import { HTMLInputTypeAttribute } from 'react';
import { useClassNames } from '../hooks/useClassNames';

interface Props {
  id: string;
  type: HTMLInputTypeAttribute;
  placeholder?: string;
  className?: string;
}

export default function Input({ id, type, className, placeholder }: Props) {
  const { classNames } = useClassNames();
  return (
    <input
      id={id}
      type={type}
      className={classNames(
        'relative w-full cursor-default rounded-md py-2 pl-3 pr-10 text-left shadow-sm focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 dark:bg-slate-700 dark:text-primary-50 sm:text-sm',
        className || ''
      )}
      placeholder={placeholder}
    />
  );
}
