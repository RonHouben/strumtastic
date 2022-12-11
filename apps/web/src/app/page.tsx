'use client';

import {
  Oscilator,
  AudioEngineStartButton,
  AudioEngineStopButton,
  AudioEngineCurrentAudioData,
} from 'ui/components/AudioEngine';

export default function Page() {
  return (
    <div className="container">
      <div>
        <Oscilator />
        <AudioEngineCurrentAudioData />
      </div>
      <div>
        <AudioEngineStartButton />
        <AudioEngineStopButton />
      </div>
    </div>
  );
}
