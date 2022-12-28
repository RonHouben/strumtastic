import { useClassNames } from '../../hooks/useClassNames';

interface Props {
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Card({ disabled, children, className }: Props) {
  const { classNames } = useClassNames();

  return (
    <div
      className={classNames(
        'shadow-primary-900 bg-primary-500 m-2 rounded-md shadow-2xl transition-all duration-500',
        disabled ? 'brightness-50' : 'md:hover:scale-105 hover:brightness-105',
        className || ''
      )}
    >
      {children}
    </div>
  );
}