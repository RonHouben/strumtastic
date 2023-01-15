'use client';

import { useCallback, useState } from 'react';
import { useClassNames } from '../hooks/useClassNames';
import Button from './Button';
import { Card, CardMedia, CardContent } from './Card';
import Select from './Select/Select';
import { GuitarPickSVG } from './SVG';
import { Typography } from './Typography';
import { api } from '@client/trpc';
import { Exercise } from '@prisma/client';

interface Props {
  disabled?: boolean;
  onDone: (exerciseId: string) => void;
  myRef?: React.Ref<HTMLDivElement>;
}

export default function SelectExerciseCard({ disabled, onDone, myRef }: Props) {
  const { classNames } = useClassNames();
  const { isLoading, data: exercises } = api.exercises.getAll.useQuery();

  const [selectedExercise, setSelectedExercise] = useState<Exercise>();

  const handleStartExercise = useCallback(() => {
    if (selectedExercise) {
      onDone(selectedExercise.id);
    }
  }, [onDone, selectedExercise]);

  return (
    <Card className="h-[35rem] snap-center" disabled={disabled} myRef={myRef}>
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
            options={
              exercises?.map((exercise) => ({
                ...exercise,
                isDisabled: !exercise.isEnabled
              })) || []
            }
            labelProperty="title"
            selected={selectedExercise}
            onChange={setSelectedExercise}
            isLoading={isLoading}
          />
          <Button
            size="md"
            variant="filled"
            color="green"
            disabled={disabled || !selectedExercise}
            onClick={handleStartExercise}
          >
            Start!
          </Button>
        </div>
        <p className="text-center !text-secondary-700">
          Register to get access to all exercises!
        </p>
      </CardContent>
    </Card>
  );
}
