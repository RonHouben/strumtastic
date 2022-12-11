'use client';

import { AudioEngine } from 'audio-engine';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export const AudioEngineContext = createContext<AudioEngine | null>(null);

export function AudioEngineProvider({ children }: Props) {
  const [audioEngine, setAudioEngine] = useState<AudioEngine | null>(null);

  useEffect(() => {
    if (!audioEngine) {
      const initAudioEngine = async () => {
        const inputAudioStream =
          await window.navigator.mediaDevices.getUserMedia({ audio: true });

        const audioEngine = new AudioEngine({
          inputAudioStream,
        });

        setAudioEngine(audioEngine);
      };

      initAudioEngine();
    }
  }, [audioEngine]);

  return (
    <AudioEngineContext.Provider value={audioEngine}>
      {children}
    </AudioEngineContext.Provider>
  );
}
