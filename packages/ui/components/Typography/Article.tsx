import { cn } from '@utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Article({ children, className }: Props) {
  return (
    <article className={cn('prose', className || '')}>
      {children}
    </article>
  );
}
