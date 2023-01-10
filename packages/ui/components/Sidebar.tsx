import { AdminMenu } from './Admin';
import { Disclosure } from './Disclosure';
import { AdminIconSVG } from './SVG';

export default function Sidebar() {
  return (
    <div className="col-span-2 col-start-1">
      <Disclosure title="Admin" icon={<AdminIconSVG size="md" />} isOpen>
        <AdminMenu />
      </Disclosure>
    </div>
  );
}
