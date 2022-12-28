'use client';

import { SelectExerciseCard, PluginGuitarCard, TunerCard } from 'ui/components';
import { useGlobalState } from 'ui/hooks/useGlobalState';

export default function Page() {
  const { onboardUser } = useGlobalState({
    debug: { audioEngine: { state: true } },
  });

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:pt-28 lg:grid-cols-3">
      <PluginGuitarCard
        disabled={!onboardUser.state.matches('pluggingInGuitar')}
        onDone={() => onboardUser.send('TUNE_GUITAR')}
      />
      <TunerCard
        disabled={!onboardUser.state.matches('tuningGuitar')}
        onDone={() => onboardUser.send('SELECT_EXERCISE')}
      />
      <SelectExerciseCard
        onDone={() => onboardUser.send('START_EXERCISE')}
      />

      {/* <Card
        className="h-[30rem]"
        disabled={!onboardUser.state.matches('playingExercise')}
      >
        <Link href="/exercise">
          <CardMedia>[Rockstar SVG Image]</CardMedia>
          <CardContent>
            <Article>
              <h1 className="text-secondary-100">Become a Rockstar!</h1>
              <p className="text-primary-100">
                Measure yourself against other Rockstars by joining the
                leaderboards.
              </p>
            </Article>
          </CardContent>
        </Link>
      </Card> */}
    </div>
  );
}
