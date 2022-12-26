import Article from '../Typography/Article';

interface Props {
  children?: React.ReactNode;
}

export default function CardContent({ children }: Props) {
  return <div className="mx-3 my-2 -1/2">{children}</div>;
}
