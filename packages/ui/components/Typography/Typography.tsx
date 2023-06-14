import { cn } from '../../utils';
import Article from './Article';

interface Props {
  variant: 'h1' | 'button' | 'p' | 'em' | 'strong';
  className?: string;
  children: string | React.ReactNode[];
}

export default function Typography({ variant, className, children }: Props) {
  return (
    <Article className={className}>
      {variant === 'h1' && (
        <h1 className={cn('text-primary-500 dark:text-primary-600 mb-4', className || '')}>
          {children}
        </h1>
      )}
      {variant === 'button' && (
        <strong className={cn('text-primary-50', className || '')}>
          {children}
        </strong>
      )}
      {variant === 'p' && (
        <p className={cn('text-primary-900', className || '')}>
          {children}
        </p>
      )}
      {variant === 'em' && (
        <em className={cn('text-primary-900', className || '')}>
          {children}
        </em>
      )}
      {variant === 'strong' && (
        <strong className={cn('text-primary-800', className || '')}>{children}</strong>
      )}
    </Article>
  );
}
