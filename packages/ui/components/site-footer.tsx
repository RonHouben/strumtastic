import { appConfig } from '@config/app';
import { Icons } from '@ui/components/icons';
import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Icons.logo className="h-6 w-6 inline-block" />
          <span className="font-bold inline-block">
            {appConfig.name}
          </span>
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
      </div>
    </footer>
  );
}
