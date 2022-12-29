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
  const { getNoteName } = useMusicNotes();
  const { audioEngine } = useGlobalState();

  const handleStartTuner = useCallback(() => {
    audioEngine.send('START_LISTENING_TO_MICROPHONE');
  }, [audioEngine]);

  const handleStopTuner = useCallback(() => {
    audioEngine.send('STOP_LISTENING_TO_MICROPHONE');

    onStopTuner();
  }, [audioEngine, onStopTuner]);

  return (
    <div className="bg-primary-500 dark:bg-secondary-700 m-2 flex w-60 flex-col items-center justify-center gap-2 rounded-md p-2 shadow-lg">
      <Typography
        variant="h1"
        className="text-secondary-500 dark:text-primary-700"
      >
        {audioEngine.state.context.audioEngine?.currentMusicNote
          ? getNoteName(
              'sharps',
              audioEngine.state.context.audioEngine?.currentMusicNote
            )
          : '-'}
      </Typography>
      <DistanceFromNote />
      <Hertz
        className="text-secondary-500 dark:text-primary-700"
        hertz={audioEngine.state.context.audioEngine?.currentFrequency || -1}
      />
      {audioEngine.state.matches('idle') && (
        <Button
          className="!bg-secondary-500 hover:!bg-secondary-700"
          label="Start Tuning"
          onClick={handleStartTuner}
        />
      )}
      {audioEngine.state.matches('listeningToMicrophone') && (
        <Button
          label="Done"
          className="!bg-secondary-500 hover:!bg-secondary-700"
          onClick={handleStopTuner}
        />
      )}
    </div>
  );
}

function DistanceFromNote() {
  const { audioEngine } = useGlobalState();
  const margin = 2;

  const isMissingData = useMemo(() => {
    if (
      audioEngine.state.context.audioEngine?.currentFrequency === undefined ||
      audioEngine.state.context.audioEngine?.currentMusicNote === undefined
    ) {
      return true;
    }

    return false;
  }, [audioEngine]);

  const absFrequencyDiff = useMemo(
    () =>
      isMissingData
        ? NaN
        : Math.abs(
            audioEngine.state.context.audioEngine!.currentFrequency -
              audioEngine.state.context.audioEngine!.currentMusicNote!.hz
          ),
    [audioEngine, isMissingData]
  );

  const frequencyDiff = useMemo(
    () =>
      isMissingData
        ? NaN
        : audioEngine.state.context.audioEngine!.currentFrequency -
          audioEngine.state.context.audioEngine!.currentMusicNote!.hz,
    [isMissingData, audioEngine]
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
