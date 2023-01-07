import { AdminMenu } from 'ui/components/Admin';

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex gap-6 max-sm:gap-0">
      <AdminMenu className="w-72 max-sm:hidden" />
      <div className='w-full'>{children}</div>
    </div>
  );
}
