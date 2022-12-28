import { useClassNames } from '../../hooks/useClassNames';

interface Props {
  className?: string;
  children?: React.ReactNode;
}

export default function CardMedia({ className, children }: Props) {
  const { classNames } = useClassNames();

  return (
    <div
      className={classNames(
        'bg-secondary-500 flex h-1/2 w-full items-center justify-center rounded-t-md p-2',
        className || ''
      )}
    >
      {children}
    </div>
  );
}
