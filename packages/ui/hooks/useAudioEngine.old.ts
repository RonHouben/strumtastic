'use client';

import { AudioEngine } from 'audio-engine';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AudioEngineContext } from '../providers/AudioEngineProvider';
import { IMusicNote, MusicNotes } from 'music-notes';

interface AudioEngineResult {
  startInputAudioStream: () => void;
  stopInputAudioStream: () => void;
  setOscillatorFrequency: (frequency: number) => void;
  bufferLength: number;
  frequencyData: Float32Array | null;
  currentFrequency: number;
  currentMusicNote: IMusicNote | undefined;
  isStreamingAudio: boolean;
}

export function useAudioEngine(): AudioEngineResult {
  const audioEngineCtx = useContext(AudioEngineContext);
  const [audioEngine, setAudioEngine] = useState<AudioEngine | null>(
    audioEngineCtx
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
          'AudioEngine audio stream is already running. Stop it first!'
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
    setOscillatorFrequency: (frequency: number) =>
      audioEngine?.setOscillatorFrequency(frequency) || undefined,
    bufferLength: audioEngine?.bufferLength || 0,
    currentFrequency: audioEngine?.currentFrequency || 0,
    currentMusicNote: MusicNotes.getNoteFromFrequency(
      audioEngine?.currentFrequency || 0
    ),
    frequencyData: audioEngine?.frequencyData || null,
    isStreamingAudio: audioEngine?.isStreamingAudio || false
  };
}
