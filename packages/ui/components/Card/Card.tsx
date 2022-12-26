import { useClassNames } from '../../hooks/useClassNames';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ children, className }: Props) {
  const { classNames } = useClassNames();

  return <div className={classNames('shadow-sm p-2 rounded-sm bg-primary-500 h-60', className || '')}>{children}</div>;
}
