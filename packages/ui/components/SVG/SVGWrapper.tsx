import { cn } from '@utils';
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
  children,
  size
}: Props) {

  return (
    <svg
      className={cn(
        'stroke-primary-500 fill-primary-500 dark:stroke-secondary-900 dark:fill-secondary-900',
        size === 'xs' ? 'h-3' : '',
        size === 'sm' ? 'h-4' : '',
        size === 'md' ? 'h-5' : '',
        size === 'lg' ? 'h-7' : '',
        size === 'xl' ? 'h-9' : '',
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
