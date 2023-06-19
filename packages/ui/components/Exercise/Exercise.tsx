'use client';

import { MusicNotes } from 'music-notes';
import { Button } from '../button';
import { ButtonGroup } from '../ButtonGroup';
import { MutableRefObject, useEffect, useRef } from 'react';
import { useStateMachines } from '../../hooks/useStateMachines';
import { exercises } from '@server/actions';
import { useTheme } from 'next-themes';
import { CursorButtons } from '../OpenSheetMusicDisplay/CursorButtons';

interface Props {
  exercise: exercises.IExercise;
}

export function Exercise({ exercise }: Props) {
  const { audioEngine, osmdMachine } = useStateMachines();
  const { theme } = useTheme();

  const osmdContainerRef = useRef<HTMLDivElement>(null);

  const handleStartListening = () => {
    audioEngine.send('START_LISTENING_TO_MICROPHONE');
  };

  useEffect(() => {
    if (
      osmdContainerRef.current &&
      osmdMachine.state.matches('uninitialized')
    ) {
      // setTimeout is a hacky workaround so OSMD doesn't get double spawned
      setTimeout(() => {
        osmdMachine.send({
          type: 'initialize',
          payload: {
            containerRef: osmdContainerRef as MutableRefObject<HTMLDivElement>,
            options: {
              drawTitle: false,
              autoResize: true,
              darkMode: theme === 'dark',
              cursorsOptions: [
                {
                  type: 0,
                  color: 'blue',
                  alpha: 0.5,
                  follow: true
                }
              ]
            },
            // due to a bug with the cursor of the OSMD library we need to use an API endpoint to get the musicXML.
            // instead of using the musicXML directly from the exercise
            musicXml: `http://localhost:3000/api/v1/music-xml/${exercise.id}`
          }
        });
      }, 100);
    }
  }, [osmdContainerRef, osmdMachine.state]);

  // go to next note if the note was correctly played
  useEffect(() => {
    if (osmdMachine.state.matches('idle')) {
      const playedNote = MusicNotes.getMusicNoteFromFrequency(
        audioEngine.state.context.audioEngine?.currentFrequency || 0
      );

      if (
        playedNote?.name ===
        osmdMachine.state.context.cursorRef.state.context.notesUnderCursor[1]
          ?.name
      ) {
        osmdMachine.send('cursor.next');
      }
    }
  }, [audioEngine.state.context.audioEngine?.currentFrequency]);

  return (
    <>
      <ButtonGroup>
        <Button
          color="primary"
          onClick={() => {
            audioEngine.send('INITIALIZE');
          }}
        >
          Init
        </Button>
        <Button color="primary" onClick={handleStartListening}>
          Start listening
        </Button>
      </ButtonGroup>
      <div>
        Curr freq: {audioEngine.state.context.audioEngine?.currentFrequency}
      </div>
      <div>
        Curr note:
        {
          MusicNotes.getMusicNoteFromFrequency(
            audioEngine.state.context.audioEngine?.currentFrequency || 0
          ).name
        }
      </div>
      <div>
        Freq to play:
        {
          osmdMachine.state.context.cursorRef.state?.context
            ?.notesUnderCursor[1]?.freq
        }
      </div>
      <div>
        Note to play:
        {osmdMachine.state.context.cursorRef.state?.context?.notesUnderCursor[1]
          ?.name || ''}
      </div>
      <CursorButtons />
      <div ref={osmdContainerRef} />
    </>
  );
}
