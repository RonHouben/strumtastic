'use client';

import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';
import { Menu } from 'lucide-react';
import { appConfig } from '@config/app';
import { cn } from '@ui/utils';
import { Button } from '@ui/components/button';
import { ScrollArea } from '@ui/components/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@ui/components/sheet';
import { Icons } from '@ui/components/icons';

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent size="xl" position="left" className="pr-0">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{appConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-3">
            {appConfig.mainNavItems?.map((item) => (
              <React.Fragment key={item.label}>
                <MobileLink
                  key={item.href}
                  href={item.href ?? '#'}
                  onOpenChange={setOpen}
                >
                  {item.label}
                </MobileLink>
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-col space-y-2">
            {appConfig.sidebarNavItems.map((item) => (
              <div key={item.href} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.label}</h4>
                {item.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink href={item.href} onOpenChange={setOpen}>
                            {item.label}
                          </MobileLink>
                        ) : (
                          item.label
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
