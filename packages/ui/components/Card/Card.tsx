import { cn } from '../../utils';

interface Props {
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  myRef?: React.Ref<HTMLDivElement>;
}

export default function Card({ disabled, children, className, myRef }: Props) {
  return (
    <div
      ref={myRef}
      className={cn(
        'shadow-primary-900 bg-primary-500 m-2 rounded-md shadow-lg transition-all duration-500 dark:bg-slate-800 dark:shadow-none',
        disabled ? 'brightness-50' : 'hover:brightness-105 md:hover:scale-105',
        className || ''
      )}
    >
      {children}
    </div>
  );
}
