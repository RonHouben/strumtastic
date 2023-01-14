import HamburgerIcon from '@heroicons/react/24/outline/Bars3Icon';
import IconButton from '../IconButton';

interface Props {
  isMenuOpen: boolean;
  onClick: (isMenuOpen: boolean) => void;
}

export default function MobileMenuButton({ isMenuOpen, onClick }: Props) {
  return (
    <IconButton
      color="primary"
      size="xl"
      variant="text"
      onClick={() => onClick(!isMenuOpen)}
      className="!text-white sm:hidden justify-start absolute left-0 ml-4"
    >
      <HamburgerIcon />
    </IconButton>
  );
}
