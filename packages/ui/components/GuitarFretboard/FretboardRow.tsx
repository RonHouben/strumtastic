import { cn } from "@utils";

interface Props {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export const FretboardRow = ({ id, children, className }: Props) => {
  return (
    <div
      id={id}
      className={cn(
        'flex items-center justify-evenly text-center w-fit',
        className || ''
      )}
    >
      {children}
    </div>
  );
};
