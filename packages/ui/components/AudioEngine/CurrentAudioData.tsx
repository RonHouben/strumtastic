import { useGlobalState } from '../../hooks/useGlobalState';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { Hertz } from './Hertz';
import { MusicNote } from './MusicNote';

export const AudioEngineCurrentAudioData = () => {
  const { getMusicNoteFromFrequency } = useMusicNotes();
  const { audioEngine } = useGlobalState();

  return (
    <div className="flex flex-col">
      <Hertz hertz={audioEngine.state.context.audioEngine?.currentFrequency || 0} />
      <MusicNote
        musicNote={
          getMusicNoteFromFrequency(
            audioEngine.state.context.audioEngine?.currentFrequency || 0
          ) || null
        }
      />
    </div>
  );
};
