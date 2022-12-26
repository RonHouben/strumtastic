import { useClassNames } from '../../hooks/useClassNames';
import Article from './Article';

interface Props {
  variant: 'h1' | 'button';
  className?: string;
  children: string;
}

export default function Typography({ variant, className, children }: Props) {
  const { classNames } = useClassNames();
  return (
    <Article className={className}>
      {variant === 'h1' && (
        <h1 className={classNames('text-primary-500', className || '')}>
          {children}
        </h1>
      )}
      {variant === 'button' && (
        <strong className={classNames('text-primary-500', className || '')}>
          {children}
        </strong>
      )}
    </Article>
  );
}
