'use client';

import { useCallback, useEffect } from 'react';
import { Button } from 'ui/components/Button';
import { GuitarFretboard } from 'ui/components/GuitarFretboard';
import { Article } from 'ui/components/Typography';
import { useAudioEngine } from '@audio-engine/react';
import { useExercise } from 'ui/hooks/useExercise';
import { useMusicNotes } from 'ui/hooks/useMusicNotes';
import { AudioEngineDebugger } from 'ui/components/AudioEngine';
import { AudioEngineNotInitialized } from 'ui/components/AudioEngine/NotInitialized';

export default function ExercisePage() {
  const [exerciseState, exerciseDispatch] = useExercise();
  const [audioEngineState, sendToAudioEngine] = useAudioEngine();
  const { getMusicNoteByNoteName, getMusicNotesByNoteNames, getNoteName } =
    useMusicNotes();

  const handleStartExercise = useCallback(() => {
    sendToAudioEngine({ type: 'START_LISTENING_TO_MICROPHONE' });
  }, [sendToAudioEngine]);

  const handleStopExercise = useCallback(() => {
    sendToAudioEngine({ type: 'STOP_LISTENING_TO_MICROPHONE' });
  }, [sendToAudioEngine]);

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
        musicKey={exerciseState.key}
      />
      <div className="w-full">
        {audioEngineState.matches('unitialized') && (
          <AudioEngineNotInitialized />
        )}
        {audioEngineState.matches('idle') && (
          <Button label="Start Exercise" onClick={handleStartExercise} />
        )}
        {audioEngineState.matches('listeningToMicrophone') && (
          <Button label="Stop Exercise" className='bg-red-500 hover:!bg-red-300' onClick={handleStopExercise} />
        )}
      </div>
      <AudioEngineDebugger />
    </div>
  );
}
