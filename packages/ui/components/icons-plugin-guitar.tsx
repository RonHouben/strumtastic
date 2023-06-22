'use client';

import { cn } from '../utils';
import { Icons } from '@ui/components/icons';

interface Props {
  isLoading?: boolean;
  isError?: boolean;
  isDone?: boolean;
}

export function PluginGuitarIcons({ isLoading, isDone, isError }: Props) {
  return (
    <div className='flex h-32 justify-center'>
      {!isLoading && !isError && (
        <Icons.guitarAmp
          className={cn(
            'h-full',
            isDone ? '!fill-green-400 !stroke-green-400' : 'dark:fill-slate-400'
          )}
        />
      )}

      {isLoading && (
        <Icons.loadingCircle animationduration="1.5s" className="h-full dark:fill-orange-500" />
      )}

      {isError && (
        <Icons.errorCircle className="!stroke-error-500 !fill-error-500 dark:!stroke-error-800 dark:!fill-error-800 h-full" />
      )}
    </div>
  );
}
