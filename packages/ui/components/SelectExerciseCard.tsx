'use client';

import { LoadExercise } from 'exercise-engine';
import { useCallback, useState } from 'react';
import { useClassNames } from '../hooks/useClassNames';
import Button from './Button';
import { Card, CardMedia, CardContent } from './Card';
import Select from './Select/Select';
import { GuitarPickSVG } from './SVG';
import { Typography } from './Typography';
import { trpc } from '@client/trpc';
import { Exercise } from '@prisma/client';

interface Props {
  disabled?: boolean;
  onDone: (exerciseId: string) => void;
  myRef?: React.Ref<HTMLDivElement>;
}

export default function SelectExerciseCard({ disabled, onDone, myRef }: Props) {
  const { classNames } = useClassNames();
  const { isLoading, data: exercises } = trpc.exercises.getAll.useQuery();

  const [selectedExercise, setSelectedExercise] = useState<Exercise>();

  const handleStartExercise = useCallback(() => {
    if (selectedExercise) {
      onDone(selectedExercise.id);
    }
  }, [onDone, selectedExercise]);

  return (
    <Card className="h-[30rem] snap-center" disabled={disabled} myRef={myRef}>
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
            isDisabled={disabled}
            options={exercises || []}
            labelProperty="title"
            selected={selectedExercise}
            onChange={setSelectedExercise}
            isLoading={isLoading}
          />
          <Button
            disabled={disabled || !selectedExercise}
            label="Start!"
            className={classNames(
              disabled || !selectedExercise
                ? '!border-secondary-500 border !bg-inherit shadow-none'
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
