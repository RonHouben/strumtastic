import { useStateMachines } from 'ui/hooks/useStateMachines';
import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import { exercises } from '@server/schemas';
import { CursorButtons } from 'ui/components/OpenSheetMusicDisplay/CursorButtons';
import { Card, CardContent, CardHeader } from '../card';
import { Skeleton } from 'ui/components/skeleton';
import { AlertError } from 'ui/components/AlertError';

interface Props {
  exerciseId?: exercises.IExercise['id'];
  musicXml?: exercises.IExercise['musicXml'];
  showCursorButtons?: boolean;
}

export function OpenSheetMusicDisplay({
  exerciseId,
  musicXml,
  showCursorButtons
}: Props) {
  const { osmdMachine } = useStateMachines();
  const { theme, systemTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hasInputChanged =
      musicXml &&
      osmdMachine.state.context.musicXml !== musicXml &&
      osmdMachine.state.context.musicXml;

    if (hasInputChanged) {
      osmdMachine.send('reset');
    }

    if (containerRef.current && osmdMachine.state.matches('uninitialized')) {
      // setTimeout is a hacky workaround so OSMD doesn't get double spawned
      setTimeout(() => {
        osmdMachine.send({
          type: 'initialize',
          payload: {
            containerRef: containerRef.current as HTMLDivElement,
            options: {
              drawTitle: false,
              drawPartNames: false,
              autoResize: false,
              darkMode:
                theme === 'system' ? systemTheme === 'dark' : theme === 'dark',
              cursorsOptions: [
                {
                  type: 0,
                  color: 'red',
                  alpha: 0.5,
                  follow: true
                }
              ]
            },
            // due to a bug with the cursor of the OSMD library we need to use an API endpoint to get the musicXML.
            // instead of using the musicXML directly from the exercise
            musicXml: exerciseId
              ? `http://localhost:3000/api/v1/music-xml/${exerciseId}`
              : musicXml ?? ''
          }
        });
      }, 100);
    }
  }, [containerRef, osmdMachine.state, musicXml]);

  // reset osmdMachine when unmounting
  useEffect(() => {
    return () => {
      osmdMachine.send('reset');
    };
  }, []);

  return (
    <Card>
      <CardHeader>{showCursorButtons && <CursorButtons />}</CardHeader>
      <CardContent>
        {(osmdMachine.state.matches('uninitialized') ||
          osmdMachine.state.matches('initializing')) && (
          <div className="space-y-2">
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
            <Skeleton className="h-10" />
          </div>
        )}
        {osmdMachine.state.matches('error') && (
          <AlertError
            error={
              osmdMachine.state.context.error ?? new Error('Unknown Error')
            }
          />
        )}
        <div ref={containerRef} />
      </CardContent>
    </Card>
  );
}
