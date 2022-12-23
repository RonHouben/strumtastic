import { classNames } from '../../utils';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Row = ({ children, className }: Props) => {
  return (
    <div
      className={classNames(
        'flex items-center justify-evenly text-center',
        className || ''
      )}
    >
      {children}
    </div>
  );
};
