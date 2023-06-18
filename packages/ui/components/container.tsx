import { cn } from '@ui/utils';
import { Breadcrumbs } from '@ui/components/breadcrumbs';
import { PageHeader } from '@ui/components/page-header';
import { Metadata } from 'next';

interface Props
  extends Omit<React.HtmlHTMLAttributes<HTMLDivElement>, 'title'> {
  children?: React.ReactNode;
  title?: Metadata['title'];
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
    <div className={cn('container relative pt-4', className)} {...props}>
      <div className="space-y-4 pb-4">
        <Breadcrumbs />
        {(title || description) && (
          <PageHeader description={description} title={title} />
        )}
      </div>
      <div>{children}</div>
    </div>
  );
}
