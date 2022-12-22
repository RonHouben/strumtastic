'use client';

import { useCallback, useEffect } from 'react';
import { Oscillator } from 'ui/components/AudioEngine/Oscillator';
import { Button } from 'ui/components/Button';
import { GuitarFretboard } from 'ui/components/GuitarFretboard';
import { Article } from 'ui/components/Typography';
import { useAudioEngine } from 'ui/hooks/useAudioEngine';
import { useExercise } from 'ui/hooks/useExercise';
import { useMusicNotes } from 'ui/hooks/useMusicNotes';
import { useRouter } from 'next/navigation';

export default function ExercisePage() {
  const router = useRouter();
  const [exerciseState, exerciseDispatch] = useExercise();
  const [audioEngineState, audioEngineDispatch] = useAudioEngine();
  const { getMusicNoteByNoteName, getMusicNotesByNoteNames, getNoteName } =
    useMusicNotes();

  const handleStartExercise = useCallback(() => {
    audioEngineDispatch({ type: 'START_LISTENING_TO_MICROPHONE' });
  }, [audioEngineDispatch]);

  const handleStopExercise = useCallback(() => {
    audioEngineDispatch({ type: 'STOP_LISTENING_TO_MICROPHONE' });
  }, [audioEngineDispatch]);

  // automatically route to the page to get
  // permissions for the microphone
  useEffect(() => {
    if (
      audioEngineState.state === 'UNINITIALIZED' ||
      audioEngineState.microphonePermissionState === 'denied'
    ) {
      router.push('/connect-guitar');
    }

    if (audioEngineState.state !== 'UNINITIALIZED') {
      audioEngineDispatch({ type: 'GET_MICROPHONE_PERMISSION_STATE' });
    }
  }, [router, audioEngineState, audioEngineDispatch]);

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
      <div className="w-full">
        {audioEngineState.state !== 'LISTENING_TO_MICROPHONE' && (
          <Button label="Start Exercise" onClick={handleStartExercise} />
        )}
        {audioEngineState.state === 'LISTENING_TO_MICROPHONE' && (
          <Button label="Stop Exercise" onClick={handleStopExercise} />
        )}
      </div>
      <div>This is for debugging:</div>
      <Oscillator />
    </div>
  );
}
