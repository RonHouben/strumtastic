import { Icons } from '@ui/components/icons';

interface NavItem {
  label: string;
  href: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
}

interface MainNavItem extends NavItem {}

interface SidebarNavItem extends NavItem {
  items?: NavItem[];
}

type AppConfig = {
  name: string;
  description: string;
  mainNavItems: MainNavItem[];
  sidebarNavItems: SidebarNavItem[];
  socialLinks: { [k: string]: { href: string; username: string } };
};

export const appConfig: AppConfig = {
  name: 'Strumtastic',
  description:
    'Interactive guitar learning app for beginners. Learn chords, scales, and songs.',
  mainNavItems: [
    {
      label: 'Exercises',
      href: '/exercises',
    },
    { label: 'Tools', href: '/tools' },
  ],
  sidebarNavItems: [],
  socialLinks: {
    github: {
      href: 'https://github.com/ronhouben',
      username: 'RonHouben',
    },
  },
};
