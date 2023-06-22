import { cn} from '../../utils';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Fret = ({ className, children }: Props) => {
  return (
    <div
      className={cn('my-1 flex w-12 justify-center', className ?? '')}
    >
      {children}
    </div>
  );
};
