'use client';

import { useCallback } from 'react';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Hertz } from '../AudioEngine';
import Button from '../Button';
import Article from '../Typography/Article';
import { AudioEngineNotInitialized } from '../AudioEngine/NotInitialized';
import { useGlobalState } from '../../hooks/useGlobalState';

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
    <div className="m-2 flex w-60 flex-col items-center justify-center rounded-md bg-slate-400 p-2 shadow-lg">
      <Article className="w-full text-center">
        {audioEngine.state.matches('unitialized') && (
          <AudioEngineNotInitialized />
        )}
        {!audioEngine.state.matches('unitialized') && (
          <>
            <Hertz
              hertz={
                audioEngine.state.context.audioEngine?.currentFrequency || 0
              }
            />
            <h1>
              {audioEngine.state.context.audioEngine?.currentMusicNote
                ? getNoteName(
                    'sharps',
                    audioEngine.state.context.audioEngine?.currentMusicNote!
                  )
                : '-'}
            </h1>
            {audioEngine.state.matches('idle') && (
              <Button
                label="Start Tuning"
                className="bg-slate-600 text-slate-300"
                onClick={handleStartTuner}
              />
            )}
            {audioEngine.state.matches('listeningToMicrophone') && (
              <Button
                label="Done"
                className="bg-slate-600 text-slate-300"
                onClick={handleStopTuner}
              />
            )}
          </>
        )}
      </Article>
    </div>
  );
}
