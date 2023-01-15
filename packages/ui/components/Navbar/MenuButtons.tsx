import { ButtonLink } from '../ButtonLink';

export type MenuButton = {
  label: string;
  href: string;
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
};

interface Props {
  buttons: MenuButton[];
}

export default function MenuButtons({ buttons }: Props) {
  return (
    <div className='flex flex-col gap-2'>
      {buttons.map((button) => (
        <ButtonLink
          key={button.href}
          href={button.href}
          selected={button.selected}
          disabled={button.disabled}
          icon={button.icon}
          variant='text'
          size="md"
          color='secondary'
          className='w-full !justify-start'
        >
          {button.label}
        </ButtonLink>
      ))}
    </div>
  );
}
