import { cn } from '../../utils';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function CardMedia({ className, children }: Props) {
  return (
    <div
      className={cn(
        'bg-secondary-500 dark:bg-primary-800 flex h-1/2 w-full items-center justify-center rounded-t-md p-2',
        className || ''
      )}
    >
      {children}
    </div>
  );
}
