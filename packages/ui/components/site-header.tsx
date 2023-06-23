import { DarkModeToggle } from 'ui/components/dark-mode-toggle';
import { MainNav } from 'ui/components/main-nav';
import { MobileNav } from 'ui/components/mobile-nav';

export function SiteHeader() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <MainNav />
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 sm:space-x-4 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* searchbar place? */}
          </div>
          <nav className="flex items-center space-x-1">
            <DarkModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}
