import { useClassNames } from '../../hooks/useClassNames';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ children, className }: Props) {
  const { classNames } = useClassNames();

  return <div className={classNames('shadow-2xl shadow-accent-900 m-2 rounded-md bg-primary-500', className || '')}>{children}</div>;
}
