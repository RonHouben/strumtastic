import { Icons } from 'ui/components/icons';
import { Metadata } from 'next';

interface NavItem {
  label: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
}

interface MainNavItem extends NavItem {
  items?: readonly NavItem[];
}

interface SidebarNavItem extends NavItem {
  items?: readonly NavItem[];
}

type AppConfig = {
  name: string;
  description: string;
  baseUrl: string;
  mainNavItems: readonly MainNavItem[];
  sidebarNavItems: readonly SidebarNavItem[];
  socialLinks: { readonly [k: string]: { href: string; username: string } };
  metadata: Record<string, Metadata>;
};

export const appConfig: AppConfig = {
  name: 'Strumtastic',
  description:
    'Interactive guitar learning app for beginners. Learn chords, scales, and songs.',
  baseUrl:
    `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` ?? 'http://localhost:3000',
  mainNavItems: [
    {
      label: 'Exercises',
      href: '/exercises',
    },
    { label: 'Tools', href: '/tools' },
    {
      label: 'Admin',
      href: '/admin',
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
      description: 'Do your admin stuff here.',
    },
    adminExercises: {
      title: 'Manage Exercises',
      description: 'Manage all exercises.',
    },
    adminCreateExercise: {
      title: 'Create exercise',
      description: 'Create a new exercise.',
    },
    adminEditExercise: {
      title: 'Edit exercise',
      description: 'Edit an existing exercise.',
    },
    exercises: {
      title: 'Exercises',
      description: 'Learn chords, scales, and songs.',
    },
  },
} as const;
