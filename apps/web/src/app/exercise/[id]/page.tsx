'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { Button } from 'ui/components';
import { GuitarFretboard } from 'ui/components/GuitarFretboard';
import { Article } from 'ui/components/Typography';
import { AudioEngineDebugger } from 'ui/components/AudioEngine';
import { AudioEngineNotInitialized } from 'ui/components/AudioEngine/NotInitialized';
import { useGlobalState } from 'ui/hooks/useGlobalState';
import { useMusicNotes } from 'ui/hooks/useMusicNotes';
import Loading from '../../loading';
import { trpc } from '@client/trpc';

interface Props {
  params: { id: string };
}

export default function ExercisePage({ params }: Props) {
  const {
    isLoading,
    isError,
    data: exercise,
  } = trpc.exercises.getById.useQuery({ id: params.id });

  const { getMusicNoteFromFrequency } = useMusicNotes();
  const { audioEngine, exerciseEngine } = useGlobalState({
    debug: {
      // exerciseEngine: {
      // context: true,
      // state: true,
      // },
    },
  });

  const currentMusicNote = useMemo(() => {
    if (audioEngine.state.context.audioEngine?.currentFrequency) {
      return getMusicNoteFromFrequency(
        audioEngine.state.context.audioEngine.currentFrequency
      );
    }
  }, [audioEngine, getMusicNoteFromFrequency]);


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

  // load the exercise
  useEffect(() => {
    if (exercise) {
      send({ type: 'LOAD_EXERCISE', data: { exercise } });
    }
  }, [exercise, send]);

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
    return <Loading />;
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
        viewType='notes'
        numberOfFrets={24}
        notesToPlay={exerciseEngine.state.context.exercise.notesToPlay}
        musicKey={exerciseEngine.state.context.exercise.key}
      />
      <div className="w-full">
        {audioEngine.state.matches('unitialized') && (
          <AudioEngineNotInitialized />
        )}
        {audioEngine.state.matches('idle') && (
          <Button onClick={handleStartExercise}>Start Exercise</Button>
        )}
        {audioEngine.state.matches('listeningToMicrophone') && (
          <Button
            className="bg-red-500 hover:!bg-red-300"
            onClick={handleStopExercise}
          >
            Stop Exercise
          </Button>
        )}
      </div>
      <AudioEngineDebugger />
    </div>
  );
}
