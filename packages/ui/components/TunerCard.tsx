'use client';

import { useClassNames } from '../hooks/useClassNames';
import { useGlobalState } from '../hooks/useGlobalState';
import { Card, CardMedia, CardContent } from './Card';
import { GuitarTuner } from './GuitarTuner';
import { TuningForkSVG } from './SVG';
import { Article } from './Typography';

interface Props {
  disabled?: boolean;
  onDone: () => void;
}

export default function TunerCard({ disabled, onDone }: Props) {
  const { classNames } = useClassNames();
  const { onboardUser } = useGlobalState();

  const handleStopTuner = () => {
    onDone();
  };

  return (
    <Card className="h-[30rem]" disabled={disabled}>
      <CardMedia>
        {disabled && (
          <TuningForkSVG
            className={classNames(
              'stroke-primary-500 fill-primary-500 h-full',
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
