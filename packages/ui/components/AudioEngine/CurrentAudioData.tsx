import { useAudioEngine } from '../../hooks/useAudioEngine';
import { Note } from '../GuitarFretboard/Note';
import { Hertz } from './Hertz';
import { MusicNote } from './MusicNote';

export const AudioEngineCurrentAudioData = () => {
  const { currentFrequency, currentMusicNote, test } = useAudioEngine();

  return (
    <div className='flex flex-col'>
      <Note noteName={test} />
      <Hertz hertz={currentFrequency} />
      <MusicNote musicNote={currentMusicNote} />
    </div>
  );
};
