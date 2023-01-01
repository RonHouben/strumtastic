'use client';

import { useCallback, useEffect } from 'react';
import { Button } from 'ui/components';
import { GuitarFretboard } from 'ui/components/GuitarFretboard';
import { Article } from 'ui/components/Typography';
import { AudioEngineDebugger } from 'ui/components/AudioEngine';
import { AudioEngineNotInitialized } from 'ui/components/AudioEngine/NotInitialized';
import { useGlobalState } from 'ui/hooks/useGlobalState';
import { useMusicNotes } from 'ui/hooks/useMusicNotes';

export default function ExercisePage() {
  const { currentMusicNote } = useMusicNotes();
  const { audioEngine, exerciseEngine } = useGlobalState({
    debug: {
      // exerciseEngine: {
        // context: true,
        // state: true,
      // },
    },
  });
  // destructuring `send` so th e useEffect doesn't
  // trigger every time the exerciseEngine state changes
  const { send } = exerciseEngine;

  const handleStartExercise = useCallback(() => {
    exerciseEngine.send({ type: 'START_EXERCISE' });
    audioEngine.send({ type: 'START_LISTENING_TO_MICROPHONE' });
  }, [exerciseEngine, audioEngine]);

  const handleStopExercise = useCallback(() => {
    exerciseEngine.send({ type: 'STOP_EXERCISE' });
    audioEngine.send({ type: 'STOP_LISTENING_TO_MICROPHONE' });
  }, [audioEngine, exerciseEngine]);

  // record played note if currentMusicNote changes
  useEffect(() => {
    if (currentMusicNote) {
      send({
        type: 'RECORD_PLAYED_NOTE',
        data: { playedNote: currentMusicNote },
      });
    }
  }, [currentMusicNote, send]);

  if (!exerciseEngine.state.context.exercise) {
    return <div>NO EXERCISE CHOOSEN!</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Article>
        <h1>{exerciseEngine.state.context.exercise?.title}</h1>
        <p>
          Notes to play are: <br />
          <span>
            {exerciseEngine.state.context.exercise?.notesToPlay
              .map((note) => note.name)
              .join(' - ')}
          </span>
        </p>
      </Article>
      <GuitarFretboard
        numberOfFrets={24}
        notesToPlay={exerciseEngine.state.context.exercise?.notesToPlay}
        musicKey={exerciseEngine.state.context.exercise?.key}
      />
      <div className="w-full">
        {audioEngine.state.matches('unitialized') && (
          <AudioEngineNotInitialized />
        )}
        {audioEngine.state.matches('idle') && (
          <Button label="Start Exercise" onClick={handleStartExercise} />
        )}
        {audioEngine.state.matches('listeningToMicrophone') && (
          <Button
            label="Stop Exercise"
            className="bg-red-500 hover:!bg-red-300"
            onClick={handleStopExercise}
          />
        )}
      </div>
      <AudioEngineDebugger />
    </div>
  );
}
