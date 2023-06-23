'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Button } from 'ui/components/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from 'ui/components/dropdown-menu';
import { Icons } from 'ui/components/icons';
import { useStateMachines } from 'ui/hooks/useStateMachines';

export function DarkModeToggle() {
  const { osmdMachine } = useStateMachines();
  const { setTheme, systemTheme } = useTheme();

  const handleSetTheme = (theme: 'light' | 'dark' | 'system') => {
    osmdMachine.send({
      type: 'set.theme',
      payload: {
        theme: theme === 'system' ? (systemTheme as 'light' | 'dark') : theme
      }
    });

    setTheme(theme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="w-9 px-0">
          <Icons.sun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleSetTheme('light')}>
          <Icons.sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme('dark')}>
          <Icons.moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSetTheme('system')}>
          <Icons.laptop className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
