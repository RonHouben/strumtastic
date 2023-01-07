import { useClassNames } from '../../hooks/useClassNames';
import { ButtonLink } from '../ButtonLink';
import { Disclosure } from '../Disclosure/';
import { DisclosureItem } from '../Disclosure/Disclosure';

interface Props {
  className?: string;
}

const menuItems: DisclosureItem[] = [
  {
    title: 'Exercises',
    content: (
      <div className='flex flex-col gap-2'>
        <ButtonLink href='/admin/exercises'>Show All</ButtonLink>
        <ButtonLink href="/admin/exercises/create">Create</ButtonLink>
      </div>
    ),
    isOpen: true
  },
  {
    title: 'User Management',
    content: 'Todo'
  }
];

export default function AdminMenu({ className }: Props) {
  const { classNames } = useClassNames();

  return (
    <div className={classNames(className || '')}>
      <Disclosure items={menuItems} />
    </div>
  );
}
