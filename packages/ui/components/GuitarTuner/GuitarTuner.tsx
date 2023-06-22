'use client';

import { useCallback, useMemo } from 'react';
import { useStateMachines } from '@ui/hooks/useStateMachines';
import { useMusicNotes } from '@ui/hooks/useMusicNotes';
import { Button } from '@ui/components/button';

interface Props {
  onStopTuner: () => void;
}

export default function GuitarTuner({ onStopTuner }: Props) {
  const { audioEngine } = useStateMachines();
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
    <div className="bg-primary-500 dark:bg-secondary-700 m-2 flex w-60 flex-col items-center justify-center gap-2 rounded-md p-2 shadow-lg">
      {currentMusicNote?.pc ?? '-'}
      <DistanceFromNote />
      <div>{audioEngine.state.context.audioEngine?.currentFrequency ?? -1}</div>
      {audioEngine.state.matches('idle') && (
        <Button color="green" onClick={handleStartTuner}>
          Start Tuning
        </Button>
      )}
      {audioEngine.state.matches('listeningToMicrophone') && (
        <Button color="red" onClick={handleStopTuner}>
          Done
        </Button>
      )}
    </div>
  );
}

function DistanceFromNote() {
  const { audioEngine } = useStateMachines();
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
      {isLower && <>Low</>}
      {isHigher && <>High</>}
      {isPerfect && <>Perfect</>}
    </div>
  );
}
