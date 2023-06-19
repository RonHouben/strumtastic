'use client';

import { useCallback } from 'react';
import { cn } from '@ui/utils';
import { useStateMachines } from '@ui/hooks/useStateMachines';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@ui/components/card';
import { GuitarTuner } from '@ui/components/GuitarTuner';
import { TuningForkSVG } from '@ui/components/SVG';

interface Props {
  disabled?: boolean;
  onDone: () => void;
  myRef?: React.Ref<HTMLDivElement>;
}

export default function TunerCard({ disabled, onDone, myRef }: Props) {
  const { onboardUser } = useStateMachines();

  const handleStopTuner = useCallback(() => {
    onDone();
  }, [onDone]);

  return (
    <Card ref={myRef} className="h-[35rem] snap-center">
      <CardHeader>
        <CardTitle>Get in tune</CardTitle>
        <CardDescription>Be sure to get your guitar in tune!</CardDescription>
      </CardHeader>
      <CardContent>
        {disabled && (
          <TuningForkSVG
            className={cn(
              'stroke-primary-500 fill-primary-500 dark:stroke-secondary-500 dark:fill-secondary-500 h-full',
              onboardUser.state.context.isTuned
                ? '!fill-green-300 !stroke-green-300'
                : ''
            )}
          />
        )}
        {!disabled && <GuitarTuner onStopTuner={handleStopTuner} />}
      </CardContent>
    </Card>
  );
}
