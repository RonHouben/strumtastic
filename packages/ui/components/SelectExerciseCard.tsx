'use client';

import { useClassNames } from '../hooks/useClassNames';
import { useGlobalState } from '../hooks/useGlobalState';
import { ButtonLink } from './ButtonLink';
import { Card, CardMedia, CardContent } from './Card';
import Select from './Select/Select';
import SelectItem from './Select/SelectItem';
import { GuitarPickSVG } from './SVG';
import { Article } from './Typography';

interface Props {
  disabled?: boolean;
  onDone: () => void;
}

export default function SelectExerciseCard({ disabled, onDone }: Props) {
  const { classNames } = useClassNames();
  const { onboardUser } = useGlobalState();

  const handleOnSelectExercise = () => {
    onDone();
  };

  return (
    <Card className="h-[30rem]" disabled={disabled}>
      <CardMedia className="relative">
        <GuitarPickSVG
          className={classNames(
            'h-full',
            onboardUser.state.context.isExerciseSelected
              ? 'fill-green-300 stroke-green-300'
              : 'fill-primary-500 stroke-primary-500 '
          )}
        />
      </CardMedia>
      <CardContent>
        <Article>
          <h1 className="text-secondary-100">3. Pick your practice</h1>
          <div className="flex flex-col gap-4">
            <Select
              ariaLabel="select exercise"
              placeholder="Select exercise..."
              disabled={disabled}
              onSelect={handleOnSelectExercise}
            >
              <SelectItem value="triads">Triads</SelectItem>
              <SelectItem value="major scale" disabled>
                Major Scale
              </SelectItem>
            </Select>
            <ButtonLink label="Start!" href="/exercise" />
          </div>
          <p className='text-center text-secondary-700'>Register to get access to all exercises!</p>
        </Article>
      </CardContent>
    </Card>
  );
}
