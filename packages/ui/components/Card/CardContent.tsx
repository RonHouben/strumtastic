import Article from '../Typography/Article';

interface Props {
  children?: React.ReactNode;
}

export default function CardContent({ children }: Props) {
  return <div className="mx-3 my-2 flex h-1/2 flex-col gap-4">{children}</div>;
}
