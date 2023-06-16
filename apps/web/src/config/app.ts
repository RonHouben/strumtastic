import { Icons } from '@ui/components/icons';
import { Metadata } from 'next';

interface NavItem {
  label: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
}

interface MainNavItem extends NavItem {
  items?: NavItem[];
}

interface SidebarNavItem extends NavItem {
  items?: NavItem[];
}

type AppConfig = {
  name: string;
  description: string;
  mainNavItems: MainNavItem[];
  sidebarNavItems: SidebarNavItem[];
  socialLinks: { [k: string]: { href: string; username: string } };
  metadata: {
    [k: string]: Metadata;
  };
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
    {
      label: 'Admin',
      items: [{ label: 'Create exercise', href: '/admin/exercises/create' }],
    },
  ],
  sidebarNavItems: [],
  socialLinks: {
    github: {
      href: 'https://github.com/ronhouben',
      username: 'RonHouben',
    },
  },
  metadata: {
    admin: {
      title: 'Admin',
      description: 'Do your admin stuff here.'
    },
    adminCreateExercise: {
      title: 'Create exercise',
      description: 'Create a new exercise.'
    }
  },
};
