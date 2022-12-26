import { useClassNames } from '../../hooks/useClassNames';
import Article from './Article';

interface Props {
  variant: 'h1';
  className?: string;
  children: string;
}

export default function Typography({ variant, className, children }: Props) {
  const { classNames } = useClassNames();
  return (
    <Article>
      {variant === 'h1' && (
        <h1 className={classNames('text-secondary-500', className || '')}>
          {children}
        </h1>
      )}
    </Article>
  );
}
