import { useClassNames } from "../../hooks/useClassNames";

interface Props {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export const FretboardRow = ({ id, children, className }: Props) => {
  const { classNames } = useClassNames();

  return (
    <div
      id={id}
      className={classNames(
        'flex items-center justify-evenly text-center w-fit',
        className || ''
      )}
    >
      {children}
    </div>
  );
};
