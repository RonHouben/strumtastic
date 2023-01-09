import MenuButtons, { MenuButton } from './Navbar/MenuButtons';

interface Props {
  menuButtons: MenuButton[];
}

export default function Sidebar({ menuButtons }: Props) {
  return (
    <div className="col-span-2 col-start-1">
      <MenuButtons buttons={menuButtons} />
    </div>
  );
}
