import { cn } from '@ui/utils';
import { Breadcrumbs } from '@ui/components/breadcrumbs';
import { PageHeader } from '@ui/components/page-header';
import { Metadata } from 'next';
import { Separator } from '@ui/components/separator';

interface Props
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
  children: React.ReactNode;
  title: Metadata['title'];
  description?: Metadata['description'];
}

export function Container({
  children,
  className,
  title,
  description,
  ...props
}: Props) {
  return (
    <div className={cn('container relative space-y-4', className)} {...props}>
      <Breadcrumbs />
      <PageHeader description={description} title={title} />
			<Separator />
      <div>{children}</div>
    </div>
  );
}
