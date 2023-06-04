'use client';

import { api } from '@client/trpc';
import { OpenSheetMusicDisplayProvider } from 'react-opensheet-music-display';
import { Exercise } from 'ui/components/Exercise';

interface Props {
  params: { id: string };
}

export default function ExercisePage({ params }: Props) {
  const { data: exercise } = api.exercises.getById.useQuery({ id: params.id });

  if (!exercise?.musicXml) {
    return <div>Exercise not found</div>
  };

  return (
    <OpenSheetMusicDisplayProvider
      options={{
        drawTitle: true,
        autoResize: true,
        darkMode: false,
        cursorsOptions: [
          {
            type: 0,
            color: 'red',
            alpha: 0.5,
            follow: true,
          },
        ],
      }}
    >
      <Exercise exercise={exercise} />
    </OpenSheetMusicDisplayProvider>
  );
}
