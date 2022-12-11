import { useAudioEngine } from '../../hooks/useAudioEngine';
import { Hertz } from './Hertz';
import { MusicNote } from './MusicNote';

export const AudioEngineCurrentAudioData = () => {
  const { currentFrequency, currentMusicNote } = useAudioEngine();

  return (
    <>
      <Hertz hertz={currentFrequency} />
      <MusicNote musicNote={currentMusicNote} />
    </>
  );
};
