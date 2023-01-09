import { AdminMenu } from 'ui/components/Admin';

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex gap-6 max-sm:gap-0">
      <AdminMenu className="w-1/6 max-sm:hidden" />
      <div className="max-w-4xl">{children}</div>
    </div>
  );
}
