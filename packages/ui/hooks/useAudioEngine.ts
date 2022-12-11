'use client';

import { AudioEngine } from 'audio-engine';
import { IMusicNote } from 'audio-engine/constants/musicnotes.constant';
import { useContext, useEffect, useState } from 'react';
import { AudioEngineContext } from '../providers/AudioEngineProvider';

interface AudioEngineResult {
  startInputAudioStream: Function;
  stopInputAudioStream: Function;
  bufferLength: number;
  frequencyData: Uint8Array | null;
  currentFrequency: number;
  currentMusicNote: IMusicNote | null;
  isStreamingAudio: boolean;
}

export function useAudioEngine(): AudioEngineResult {
  const audioEngineCtx = useContext(AudioEngineContext);
  const [audioEngine, setAudioEngine] = useState<AudioEngine | null>(
    audioEngineCtx,
  );

  const [requestAnimationFrameId, setRequestAnimationFrameId] =
    useState<number>(0);

  // update the state of the audioEngine automatically.
  // since React doesn't see the changes of the audio-engine class properties.
  useEffect(() => {
    const refreshAudioEngine = () => {
      const requestAnimationFrameId = requestAnimationFrame(refreshAudioEngine);

      setRequestAnimationFrameId(requestAnimationFrameId);
      setAudioEngine(audioEngineCtx);
    };

    refreshAudioEngine();
  }, [audioEngineCtx]);

  return {
    startInputAudioStream: () => {
      if (!audioEngineCtx) {
        throw new Error('AudioEngine is not initialised!');
      }

      if (requestAnimationFrameId !== 0) {
        console.warn(
          'AudioEngine audio stream is already running. Stop it first!',
        );
      }

      audioEngineCtx.startInputAudioStream();
    },
    stopInputAudioStream: () => {
      if (!audioEngineCtx) {
        throw new Error('AudioEngine is not initialised!');
      }

      if (requestAnimationFrameId === 0) {
        console.warn('AudioEngine audio stream is already stopped');
      }

      audioEngineCtx.stopInputAudioStream();
    },
    bufferLength: audioEngine?.bufferLength || 0,
    currentFrequency: audioEngine?.currentFrequency || 0,
    currentMusicNote: audioEngine?.currentMusicNote || null,
    frequencyData: audioEngine?.frequencyData || null,
    isStreamingAudio: audioEngine?.isStreamingAudio || false,
  };
}
