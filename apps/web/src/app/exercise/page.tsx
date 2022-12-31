'use client';

import { useCallback, useEffect } from 'react';
import { Button } from 'ui/components';
import { GuitarFretboard } from 'ui/components/GuitarFretboard';
import { Article } from 'ui/components/Typography';
import { useExercise } from 'ui/hooks/useExercise';
import { useMusicNotes } from 'ui/hooks/useMusicNotes';
import { AudioEngineDebugger } from 'ui/components/AudioEngine';
import { AudioEngineNotInitialized } from 'ui/components/AudioEngine/NotInitialized';
import { useGlobalState } from 'ui/hooks/useGlobalState';

export default function ExercisePage() {
  const [exerciseState, exerciseDispatch] = useExercise();
  const { audioEngine } = useGlobalState();
  const { getMusicNoteByName, getRangeOfMusicNotes } =
    useMusicNotes();

  const handleStartExercise = useCallback(() => {
    audioEngine.send({ type: 'START_LISTENING_TO_MICROPHONE' });
  }, [audioEngine]);

  const handleStopExercise = useCallback(() => {
    audioEngine.send({ type: 'STOP_LISTENING_TO_MICROPHONE' });
  }, [audioEngine]);

  useEffect(() => {
    if (!exerciseState.isInitialised) {
      exerciseDispatch({
        type: 'initialise-exercise',
        payload: {
          key: 'C',
          name: 'C Major Triads',
          nextNoteToPlay: getMusicNoteByName('C'),
          notesToPlay: getRangeOfMusicNotes(['C', 'E', 'G']),
        },
      });
    }
  }, [
    exerciseState,
    exerciseDispatch,
    getMusicNoteByName,
    getRangeOfMusicNotes
  ]);

  return (
    <div className="flex flex-col gap-4">
      <Article>
        <h1>{exerciseState.name}</h1>
        <p>
          Notes to play are: <br />
          <span>
            {exerciseState.notesToPlay
              .map((musicNote) => musicNote.name)
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
        {audioEngine.state.matches('unitialized') && (
          <AudioEngineNotInitialized />
        )}
        {audioEngine.state.matches('idle') && (
          <Button label="Start Exercise" onClick={handleStartExercise} />
        )}
        {audioEngine.state.matches('listeningToMicrophone') && (
          <Button label="Stop Exercise" className='bg-red-500 hover:!bg-red-300' onClick={handleStopExercise} />
        )}
      </div>
      <AudioEngineDebugger />
    </div>
  );
}
