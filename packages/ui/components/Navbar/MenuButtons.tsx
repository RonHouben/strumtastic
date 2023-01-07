import { ButtonLink } from '../ButtonLink';

export type MenuButton = {
  label: string;
  href: string;
  selected?: boolean;
  disabled?: boolean;
};

interface Props {
  buttons: MenuButton[];
}

export default function MenuButtons({ buttons }: Props) {
  return (
    <>
      {buttons.map((button) => (
        <ButtonLink
          key={button.href}
          href={button.href}
          selected={button.selected}
          disabled={button.disabled}
        >
          {button.label}
        </ButtonLink>
      ))}
    </>
  );
}
