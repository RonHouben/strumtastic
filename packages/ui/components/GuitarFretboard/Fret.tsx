import { useClassNames } from '../../hooks/useClassNames';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Fret = ({ className, children }: Props) => {
  const { classNames } = useClassNames();

  return (
    <div
      className={classNames('my-1 flex w-12 justify-center', className || '')}
    >
      {children}
    </div>
  );
};
