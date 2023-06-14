'use client';

import { useCallback, useState } from 'react';
import { cn } from '@utils';
import Button from './Button';
import { Card, CardContent, CardMedia } from './Card';
import { GuitarPickSVG } from './SVG';
import Select from './Select/Select';
import { Typography } from './Typography';
import { exercises } from '@server/actions';

interface Props {
  exercises: exercises.IExercise[];
  disabled?: boolean;
  onDone: (id: exercises.IExercise['id']) => void;
  myRef?: React.Ref<HTMLDivElement>;
}

export default function SelectExerciseCard({ exercises, disabled, onDone, myRef }: Props) {
  const [selectedExercise, setSelectedExercise] = useState<exercises.IExercise>();

  const handleStartExercise = useCallback(() => {
    if (selectedExercise) {
      onDone(selectedExercise.id);
    }
  }, [onDone, selectedExercise]);

  return (
    <Card className="h-[35rem] snap-center" disabled={disabled} myRef={myRef}>
      <CardMedia className="relative">
        <GuitarPickSVG
          className={cn(
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
