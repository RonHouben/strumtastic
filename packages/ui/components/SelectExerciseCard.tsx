'use client';

import { useCallback, useState } from 'react';
import { useClassNames } from '../hooks/useClassNames';
import Button from './Button';
import { Card, CardMedia, CardContent } from './Card';
import Select, { SelectOption } from './Select/Select';
import { GuitarPickSVG } from './SVG';
import { Typography } from './Typography';

interface Props {
  disabled?: boolean;
  onDone: () => void;
}

interface ExerciseOption extends SelectOption {
  title: string;
}

const options: ExerciseOption[] = [
  { id: '1', title: 'Triads', disabled: false },
  { id: '1', title: 'Scales', disabled: true }
];

export default function SelectExerciseCard({ disabled, onDone }: Props) {
  const { classNames } = useClassNames();

  const [selectedExercise, setSelectedExercise] = useState<ExerciseOption>();

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
        <Typography variant="h1" className="!text-secondary-100">
          3. Pick your practice
        </Typography>
        <div className="flex flex-col items-center justify-center gap-4">
          <Select
            placeHolder="Select exercise..."
            disabled={disabled}
            options={options}
            labelProperty="title"
            selected={selectedExercise}
            onChange={setSelectedExercise}
          />
          <Button
            disabled={disabled || !selectedExercise}
            label="Start!"
            className={classNames(
              disabled || !selectedExercise
                ? '!bg-inherit shadow-none border !border-secondary-500'
                : '!bg-secondary-500 hover:!bg-secondary-700'
            )}
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
