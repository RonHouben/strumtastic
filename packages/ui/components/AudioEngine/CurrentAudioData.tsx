import { useAudioEngine } from '../../hooks/useAudioEngine';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Hertz } from './Hertz';
import { MusicNote } from './MusicNote';

export const AudioEngineCurrentAudioData = () => {
  const { getMusicNoteFromFrequency } = useMusicNotes(); 
  const [state] = useAudioEngine();

  return (
    <div className='flex flex-col'>
      <Hertz hertz={state.audioEngine?.currentFrequency || 0} />
      <MusicNote musicNote={getMusicNoteFromFrequency(state.audioEngine?.currentFrequency || 0) || null} />
    </div>
  );
};
