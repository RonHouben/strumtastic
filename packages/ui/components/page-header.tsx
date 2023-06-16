import { Metadata } from 'next';

interface Props {
  title: Metadata['title'];
  description?: Metadata['description'];
}

export function PageHeader({ title, description }: Props) {
  return (
    <div className="space-y-0.5">
      <h2 className="text-2xl font-bold tracking-tight">{title?.toString()}</h2>
      <p className="text-muted-foreground">{description?.toString()}</p>
    </div>
  );
}
