'use client';

import { useCallback, useMemo } from 'react';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Hertz } from '../AudioEngine';
import Button from '../Button';
import { useGlobalState } from '../../hooks/useGlobalState';
import { Typography } from '../Typography';

interface Props {
  onStopTuner: () => void;
}

export default function GuitarTuner({ onStopTuner }: Props) {
  const { audioEngine } = useGlobalState();
  const { getMusicNoteFromFrequency } = useMusicNotes();

  const currentMusicNote = useMemo(() => {
    if (audioEngine.state.context.audioEngine?.currentFrequency) {
      return getMusicNoteFromFrequency(
        audioEngine.state.context.audioEngine.currentFrequency
      );
    }
  }, [audioEngine, getMusicNoteFromFrequency]);

  const handleStartTuner = useCallback(() => {
    audioEngine.send('START_LISTENING_TO_MICROPHONE');
  }, [audioEngine]);

  const handleStopTuner = useCallback(() => {
    audioEngine.send('STOP_LISTENING_TO_MICROPHONE');

    onStopTuner();
  }, [audioEngine, onStopTuner]);

  return (
    <div className="m-2 flex w-60 flex-col items-center justify-center gap-2 rounded-md bg-primary-500 p-2 shadow-lg dark:bg-secondary-700">
      <Typography
        variant="h1"
        className="!text-secondary-500 dark:!text-primary-700"
      >
        {currentMusicNote?.letter || '-'}
      </Typography>
      <DistanceFromNote />
      <Hertz
        className="!text-secondary-500 dark:!text-primary-700"
        hertz={audioEngine.state.context.audioEngine?.currentFrequency || -1}
      />
      {audioEngine.state.matches('idle') && (
        <Button
          className="!bg-secondary-500 hover:!bg-secondary-700"
          onClick={handleStartTuner}
        >
          Start Tuning
        </Button>
      )}
      {audioEngine.state.matches('listeningToMicrophone') && (
        <Button
          className="!bg-secondary-500 hover:!bg-secondary-700"
          onClick={handleStopTuner}
        >
          Done
        </Button>
      )}
    </div>
  );
}

function DistanceFromNote() {
  const { audioEngine } = useGlobalState();
  const { getMusicNoteFromFrequency } = useMusicNotes();

  const currentMusicNote = useMemo(() => {
    if (audioEngine.state.context.audioEngine?.currentFrequency) {
      return getMusicNoteFromFrequency(
        audioEngine.state.context.audioEngine.currentFrequency
      );
    }
  }, [audioEngine, getMusicNoteFromFrequency]);

  const margin = 2;

  const isMissingData = useMemo(() => {
    if (
      audioEngine.state.context.audioEngine?.currentFrequency === undefined ||
      currentMusicNote === undefined
    ) {
      return true;
    }

    return false;
  }, [audioEngine, currentMusicNote]);

  const absFrequencyDiff = useMemo(
    () =>
      isMissingData
        ? NaN
        : Math.abs(
            audioEngine.state.context.audioEngine!.currentFrequency -
              currentMusicNote!.freq!
          ),
    [audioEngine, isMissingData, currentMusicNote]
  );

  const frequencyDiff = useMemo(
    () =>
      isMissingData
        ? NaN
        : audioEngine.state.context.audioEngine!.currentFrequency -
          currentMusicNote!.freq!,
    [isMissingData, audioEngine, currentMusicNote]
  );

  const isLower = useMemo(
    () =>
      isMissingData
        ? false
        : frequencyDiff < 0 && Math.abs(frequencyDiff) > margin,
    [isMissingData, frequencyDiff]
  );

  const isHigher = useMemo(
    () => (isMissingData ? false : frequencyDiff > margin),
    [isMissingData, frequencyDiff]
  );

  const isPerfect = useMemo(
    () =>
      isMissingData
        ? false
        : margin - absFrequencyDiff >= 0 && margin - absFrequencyDiff <= margin,
    [isMissingData, absFrequencyDiff]
  );

  return (
    <div className="h-10">
      {isLower && (
        <Typography variant="strong" className="!text-warning-500">
          Low
        </Typography>
      )}
      {isHigher && (
        <Typography variant="strong" className="!text-warning-700">
          High
        </Typography>
      )}
      {isPerfect && (
        <Typography variant="strong" className="!text-green-500">
          Perfect
        </Typography>
      )}
    </div>
  );
}
