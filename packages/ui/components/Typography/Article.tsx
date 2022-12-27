import { useClassNames } from '../../hooks/useClassNames';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Article({ children, className }: Props) {
  const { classNames } = useClassNames();

  return (
    <article className={classNames('prose', className || '')}>
      {children}
    </article>
  );
}
