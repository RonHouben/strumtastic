import { AdminMenu } from "./Admin";
import { Disclosure } from "./Disclosure";
import { AdminIconSVG } from "./SVG";

export default function NavMenuButtons() {
  return (
    <Disclosure title="Admin" icon={<AdminIconSVG size="md" />} isOpen>
      <AdminMenu />
    </Disclosure>
  );
}
