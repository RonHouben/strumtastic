'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { SelectExerciseCard, PluginGuitarCard, TunerCard } from 'ui/components';
import { useGlobalState } from 'ui/hooks/useGlobalState';
import { useScrollIntoView } from 'ui/hooks/useScrollIntoView';
import { IExercise } from '@server/actions/exercises';
import { exercises } from '@server/actions';

export default function Page() {
  const router = useRouter();
  const { onboardUser } = useGlobalState();
  const scrollIntoView = useScrollIntoView();
  const tunerCardRef = useRef<HTMLDivElement>(null);
  const selectExerciseCardRef = useRef<HTMLDivElement>(null);

  const [allExercises, setAllExercises] = useState<exercises.IExercise[]>([]);

  const handlePluginGuitarDone = useCallback(() => {
    onboardUser.send('TUNE_GUITAR');

    scrollIntoView(tunerCardRef);
  }, [onboardUser, scrollIntoView]);

  const handleTuningGuitarDone = useCallback(() => {
    onboardUser.send('SELECT_EXERCISE');

    scrollIntoView(selectExerciseCardRef);
  }, [onboardUser, scrollIntoView]);

  const handleStartExercise = useCallback((exerciseId: IExercise['id']) => {
    onboardUser.send('START_EXERCISE');

    router.push(`/exercise/${exerciseId}`);
  }, [onboardUser, router]);

  useEffect(() => {
    exercises.getAll().then((exercises) => {
      setAllExercises(exercises);
    });
  }, []);

  return (
    <div className="grid snap-y gap-4 sm:grid-cols-1 lg:grid-cols-3">
      <PluginGuitarCard
        disabled={!onboardUser.state.matches('pluggingInGuitar')}
        onDone={handlePluginGuitarDone}
      />
      <TunerCard
        myRef={tunerCardRef}
        disabled={!onboardUser.state.matches('tuningGuitar')}
        onDone={handleTuningGuitarDone}
      />
      <SelectExerciseCard
        exercises={allExercises}
        myRef={selectExerciseCardRef}
        disabled={
          !onboardUser.state.matches('selectingExercise') &&
          !onboardUser.state.matches('playingExercise')
        }
        onDone={handleStartExercise}
      />
    </div>
  );
}
