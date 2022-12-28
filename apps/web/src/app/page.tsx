'use client';

import { PluginGuitarCard, TunerCard } from 'ui/components';
import { Card, CardContent, CardMedia } from 'ui/components/Card/';
import Link from 'ui/components/Link';
import Article from 'ui/components/Typography/Article';
import { useGlobalState } from 'ui/hooks/useGlobalState';

export default function Page() {
  const { onboardUser } = useGlobalState();

  return (
    <div className="grid gap-4 sm:grid-cols-1 md:pt-28 lg:grid-cols-4">
      <PluginGuitarCard
        disabled={!onboardUser.state.matches('pluggingInGuitar')}
        onDone={() => onboardUser.send('TUNE_GUITAR')}
      />
      <TunerCard disabled={!onboardUser.state.matches('tuningGuitar')} />

      <Card
        className="h-[30rem]"
        disabled={!onboardUser.state.matches('selectingExercise')}
      >
        <Link href="#">
          <CardMedia>[Pick your practice SVG Image]</CardMedia>
          <CardContent>
            <Article>
              <h1 className="text-secondary-100">3. Pick your practice</h1>
              <p className="text-secondary-100">
                We will guide you to make sure that you&apos;re practicing the
                right thing.
                <br />
                No matter what level!
              </p>
            </Article>
          </CardContent>
        </Link>
      </Card>

      <Card
        className="h-[30rem]"
        disabled={!onboardUser.state.matches('playingExercise')}
      >
        <Link href="/exercise">
          <CardMedia>[Rockstar SVG Image]</CardMedia>
          <CardContent>
            <Article>
              <h1 className="text-secondary-100">4. Become a Rockstar!</h1>
              <p className="text-primary-100">
                Measure yourself against other Rockstars by joining the
                leaderboards.
              </p>
            </Article>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
}
