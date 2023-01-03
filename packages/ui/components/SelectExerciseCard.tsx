'use client';

import { LoadExercise } from 'exercise-engine';
import { useCallback, useState } from 'react';
import { exercises } from '../dummy-data';
import { useClassNames } from '../hooks/useClassNames';
import { useGlobalState } from '../hooks/useGlobalState';
import Button from './Button';
import { Card, CardMedia, CardContent } from './Card';
import Select, { SelectOption } from './Select/Select';
import { GuitarPickSVG } from './SVG';
import { Typography } from './Typography';

interface Props {
  disabled?: boolean;
  onDone: (exerciseId: string) => void;
  myRef?: React.Ref<HTMLDivElement>;
}

interface ExerciseOption extends SelectOption, LoadExercise {}

export default function SelectExerciseCard({ disabled, onDone, myRef }: Props) {
  const { classNames } = useClassNames();
  const { exerciseEngine } = useGlobalState();

  const [selectedExercise, setSelectedExercise] = useState<ExerciseOption>();

  const handleStartExercise = useCallback(() => {
    if (selectedExercise) {
      exerciseEngine.send({
        type: 'LOAD_EXERCISE',
        data: {
          exercise: selectedExercise
        }
      });

      onDone(selectedExercise.id);
    }
  }, [onDone, exerciseEngine, selectedExercise]);

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
            disabled={disabled}
            options={exercises}
            labelProperty="title"
            selected={selectedExercise}
            onChange={setSelectedExercise}
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
