'use client';

import { useCallback, useEffect } from 'react';
import { Oscillator } from 'ui/components/AudioEngine/Oscillator';
import { Button } from 'ui/components/Button';
import { ButtonGroup } from 'ui/components/ButtonGroup';
import { GuitarFretboard } from 'ui/components/GuitarFretboard';
import { Article } from 'ui/components/Typography';
import { useAudioEngine } from 'ui/hooks/useAudioEngine';
import { useExercise } from 'ui/hooks/useExercise';
import { useMusicNotes } from 'ui/hooks/useMusicNotes';

export default function ExercisePage() {
  const [exerciseState, exerciseDispatch] = useExercise();
  const [_audioEngineState, audioEngineDispatch] = useAudioEngine();
  const { getMusicNoteByNoteName, getMusicNotesByNoteNames, getNoteName } =
    useMusicNotes();

  const handleStartExercise = useCallback(() => {
    audioEngineDispatch({ type: 'START_LISTENING_TO_MICROPHONE' });
  }, [audioEngineDispatch]);

  const handleStopExercise = useCallback(() => {
    audioEngineDispatch({ type: 'STOP_LISTENING_TO_MICROPHONE' });
  }, [audioEngineDispatch]);

  useEffect(() => {
    if (!exerciseState.isInitialised) {
      exerciseDispatch({
        type: 'initialise-exercise',
        payload: {
          key: 'C',
          name: 'C Major Triads',
          nextNoteToPlay: getMusicNoteByNoteName('C'),
          notesToPlay: getMusicNotesByNoteNames(['C', 'E', 'G'], 3, 1),
        },
      });
    }
  }, [
    exerciseState,
    exerciseDispatch,
    getMusicNoteByNoteName,
    getMusicNotesByNoteNames,
  ]);

  return (
    <div className="flex flex-col gap-4">
      <Article>
        <h1>{exerciseState.name}</h1>
        <p>
          Notes to play are: <br />
          <span>
            {exerciseState.notesToPlay
              .map((musicNote) => getNoteName('sharps', musicNote))
              .join(' - ')}
          </span>
        </p>
      </Article>
      <GuitarFretboard
        numberOfFrets={24}
        notesToPlay={exerciseState.notesToPlay}
      />
      <ButtonGroup>
        <Button label="Start Exercise" onClick={handleStartExercise} />
        <Button label="Stop Exercise" onClick={handleStopExercise} />
      </ButtonGroup>
      <div>This is for debugging:</div>
      <Oscillator />
    </div>
  );
}
