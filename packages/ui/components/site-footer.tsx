import { appConfig } from '@config/app';
import { Icons } from 'ui/components/icons';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t mt-4 py-2">
      <div className="container flex flex-row items-center gap-1">
        <Icons.logo className="h-6 w-6" />
        <span className="font-bold">{appConfig.name}</span>
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          is built by &nbsp;
          <Link
            href={appConfig.socialLinks.github.href}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            {appConfig.socialLinks.github.username}
          </Link>
        </p>
      </div>
    </footer>
  );
}
