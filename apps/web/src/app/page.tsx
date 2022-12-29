'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { SelectExerciseCard, PluginGuitarCard, TunerCard } from 'ui/components';
import { useGlobalState } from 'ui/hooks/useGlobalState';

export default function Page() {
  const router = useRouter();
  const { onboardUser } = useGlobalState({
    debug: { audioEngine: { state: true } },
  });

  const handlePluginGuitarDone = useCallback(() => {
    onboardUser.send('TUNE_GUITAR');
  }, [onboardUser]);

  const handleTuningGuitarDone = useCallback(() => {
    onboardUser.send('SELECT_EXERCISE');
  }, [onboardUser]);

  const handleStartExercise = useCallback(() => {
    onboardUser.send('START_EXERCISE');

    router.push('/exercise');
  }, [onboardUser, router]);

  return (
    <div className="grid gap-4 sm:grid-cols-1 lg:pt-28 lg:grid-cols-3">
      <PluginGuitarCard
        disabled={!onboardUser.state.matches('pluggingInGuitar')}
        onDone={handlePluginGuitarDone}
      />
      <TunerCard
        disabled={!onboardUser.state.matches('tuningGuitar')}
        onDone={handleTuningGuitarDone}
      />
      <SelectExerciseCard
        disabled={
          !onboardUser.state.matches('selectingExercise') &&
          !onboardUser.state.matches('playingExercise')
        }
        onDone={handleStartExercise}
      />
    </div>
  );
}
