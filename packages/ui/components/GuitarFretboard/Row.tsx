import { useClassNames } from "../../hooks/useClassNames";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const Row = ({ children, className }: Props) => {
  const { classNames } = useClassNames();

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
