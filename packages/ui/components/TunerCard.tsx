'use client';

import { useCallback } from 'react';
import { cn } from '../utils';
import { useGlobalState } from '../hooks/useGlobalState';
import { Card, CardMedia, CardContent } from './Card';
import { GuitarTuner } from './GuitarTuner';
import { TuningForkSVG } from './SVG';
import { Article } from './Typography';

interface Props {
  disabled?: boolean;
  onDone: () => void;
  myRef?: React.Ref<HTMLDivElement>;
}

export default function TunerCard({ disabled, onDone, myRef }: Props) {
  const { onboardUser } = useGlobalState();

  const handleStopTuner = useCallback(() => {
    onDone();
  }, [onDone]);

  return (
    <Card myRef={myRef} className="h-[35rem] snap-center" disabled={disabled}>
      <CardMedia>
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
      </CardMedia>
      <CardContent>
        <Article>
          <h1 className="text-secondary-100">2. Get in tune</h1>
          <p className="text-primary-100">
            Be sure to have your guitar in tune!
          </p>
        </Article>
      </CardContent>
    </Card>
  );
}
