import { OpenSheetMusicDisplayProvider } from 'react-opensheet-music-display';
import { getDocumentById } from '@strumtastic/firebase';
import { Exercise as IExercise } from 'database';
import { Exercise } from 'ui/components/Exercise';

interface Props {
  params: { id: string };
}

export default async function ExercisePage({ params }: Props) {
  const exercise = await getDocumentById<IExercise>('Exercises', params.id);

  if (!exercise) {
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
