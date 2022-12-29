import { useClassNames } from '../../hooks/useClassNames';
import { SVGProps } from './types';

interface Props extends SVGProps {
  id: string;
  viewBox: string;
  children: React.ReactNode;
}

export default function SVGWrapper({
  id,
  height,
  width,
  viewBox,
  className,
  children
}: Props) {
  const { classNames } = useClassNames();

  return (
    <svg
      className={classNames(
        'stroke-primary-500 fill-primary-500 dark:stroke-secondary-900 dark:fill-secondary-900',
        className || ''
      )}
      version="1.1"
      id={id}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      height={height}
      width={width}
    >
      {children}
    </svg>
  );
}
