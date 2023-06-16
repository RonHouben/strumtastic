'use client';

import { useCallback, useState } from 'react';
import { cn } from '../utils';
import { Button } from './button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@ui/components/card';
import { GuitarPickSVG } from './SVG';
import Select from './Select/Select';
import { exercises } from '@server/actions';

interface Props {
  exercises: exercises.IExercise[];
  onDone: (id: exercises.IExercise['id']) => void;
}

export default function SelectExerciseCard({ exercises, onDone }: Props) {
  const [selectedExercise, setSelectedExercise] = useState<exercises.IExercise>();

  const handleStartExercise = useCallback(() => {
    if (selectedExercise) {
      onDone(selectedExercise.id);
    }
  }, [onDone, selectedExercise]);

  return (
    <Card className="snap-center">
      <CardHeader>
        <CardTitle>Select Exercise</CardTitle>
        <CardDescription>Register to get access to all exercises!</CardDescription>
      </CardHeader>
      <CardContent>
        <GuitarPickSVG
          className={cn(
            'h-full',
            selectedExercise ? '!fill-green-300 !stroke-green-300' : ''
          )}
        />
        <div className="flex flex-col items-center justify-center gap-4">
          <Select
            placeHolder="Select exercise..."
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
            color="green"
            disabled={!selectedExercise}
            onClick={handleStartExercise}
          >
            Start!
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
