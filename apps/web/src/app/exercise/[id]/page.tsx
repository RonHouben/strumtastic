import { OpenSheetMusicDisplayProvider } from 'react-opensheet-music-display';
import { Exercise } from 'ui/components/Exercise';
import { exercises } from '@server/actions';

interface Props {
  params: { id: exercises.IExercise['id'] };
}

export default async function ExercisePage({ params }: Props) {
  const exercise = await exercises.getById(params.id);

  if (!exercise) {
    return <div>Exercise not found</div>;
  }

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
