'use client';

import { useCallback, useState } from 'react';
import { useClassNames } from '../hooks/useClassNames';
import Button from './Button';
import { Card, CardMedia, CardContent } from './Card';
import Select from './Select/Select';
import SelectItem from './Select/SelectItem';
import { GuitarPickSVG } from './SVG';
import { Typography } from './Typography';

interface Props {
  disabled?: boolean;
  onDone: () => void;
}

export default function SelectExerciseCard({ disabled, onDone }: Props) {
  const { classNames } = useClassNames();

  const [selectedExercise, setSelectedExercise] = useState<string>();

  const handleStartExercise = useCallback(() => {
    onDone();
  }, [onDone]);

  return (
    <Card className="h-[30rem]" disabled={disabled}>
      <CardMedia className="relative">
        <GuitarPickSVG
          className={classNames(
            'h-full',
            selectedExercise ? '!fill-green-300 !stroke-green-300' : ''
          )}
        />
      </CardMedia>
      <CardContent>
          <Typography variant='h1' className="!text-secondary-100">3. Pick your practice</Typography>
          <div className="flex flex-col items-center justify-center gap-4">
            <Select
              ariaLabel="select exercise"
              placeholder="Select exercise..."
              disabled={disabled}
              onSelect={setSelectedExercise}
            >
              <SelectItem value="triads">Triads</SelectItem>
              <SelectItem value="major scale" disabled>
                Major Scale
              </SelectItem>
            </Select>
            <Button
              disabled={disabled || !selectedExercise}
              label="Start!"
              onClick={handleStartExercise}
            />
          </div>
          <p className="!text-secondary-700 text-center">
            Register to get access to all exercises!
          </p>
      </CardContent>
    </Card>
  );
}
