import { useClassNames } from '../../hooks/useClassNames';

interface Props {
  svgComponent?: JSX.Element;
  className?: string;
  children?: React.ReactNode;
}

export default function CardMedia({
  svgComponent,
  className,
  children
}: Props) {
  const { classNames } = useClassNames();

  return (
    <div
      className={classNames(
        'bg-secondary-500 h-1/2 w-full rounded-t-md p-2 flex justify-center items-center',
        className || ''
      )}
    >
      {svgComponent}
      {children}
    </div>
  );
}
