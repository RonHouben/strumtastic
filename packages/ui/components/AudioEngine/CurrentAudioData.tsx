import { useAudioEngine } from '../../hooks/useAudioEngine';
import { Hertz } from './Hertz';
import { MusicNote } from './MusicNote';

export const AudioEngineCurrentAudioData = () => {
  const { currentFrequency, currentMusicNote, test } = useAudioEngine();

  return (
    <div className='flex flex-col'>
      <span>{test}</span>
      <Hertz hertz={currentFrequency} />
      <MusicNote musicNote={currentMusicNote} />
    </div>
  );
};
