import { useClassNames } from '../../hooks/useClassNames';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ children, className }: Props) {
  const { classNames } = useClassNames();

  return (
    <div
      className={classNames(
        'shadow-accent-900 bg-primary-500 m-2 rounded-md shadow-2xl transition-all duration-500 hover:scale-105 hover:brightness-105',
        className || ''
      )}
    >
      {children}
    </div>
  );
}
