import { useClassNames } from '../hooks/useClassNames';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ children, className }: Props) {
  const { classNames } = useClassNames();

  return <div className={classNames(className || '')}>{children}</div>;
}
