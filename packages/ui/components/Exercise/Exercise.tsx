'use client';

import { MusicNotes } from 'music-notes';
import { Button } from '@ui/components/button';
import { ButtonGroup } from '@ui/components/ButtonGroup';
import { useEffect } from 'react';
import { useStateMachines } from '@ui/hooks/useStateMachines';
import { exercises } from '@server/schemas';
import { OpenSheetMusicDisplay } from '@ui/components/OpenSheetMusicDisplay/OpenSheetMusicDisplay';

interface Props {
  exercise: exercises.IExercise;
}

export function Exercise({ exercise }: Props) {
  const { audioEngine, osmdMachine } = useStateMachines();

  const handleStartListening = () => {
    audioEngine.send('START_LISTENING_TO_MICROPHONE');
  };


  // go to next note if the note was correctly played
  useEffect(() => {
    if (osmdMachine.state.matches('idle')) {
      const playedNote = MusicNotes.getMusicNoteFromFrequency(
        audioEngine.state.context.audioEngine?.currentFrequency ?? 0
      );

      if (
        playedNote?.name ===
        osmdMachine.state.context.cursorMachine.state.context.notesUnderCursor[1]
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
            audioEngine.state.context.audioEngine?.currentFrequency ?? 0
          ).name
        }
      </div>
      <div>
        Freq to play:
        {
          osmdMachine.state.context.cursorMachine.state?.context
            ?.notesUnderCursor[1]?.freq
        }
      </div>
      <div>
        Note to play:
        {osmdMachine.state.context.cursorMachine.state?.context?.notesUnderCursor[1]
          ?.name || ''}
      </div>
      <OpenSheetMusicDisplay exerciseId={exercise.id} showCursorButtons />
    </>
  );
}
