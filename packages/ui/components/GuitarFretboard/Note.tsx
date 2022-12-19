import { FlatsOrSharps, IMusicNote } from 'music-notes';
import { useMemo } from 'react';
import { classNames } from 'ui/utils';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { useExercise } from '../../hooks/useExercise';
import { useMusicNotes } from '../../hooks/useMusicNotes';

interface Props {
  musicNote: IMusicNote;
  isRoot?: boolean;
  toBePlayed?: boolean;
  showFlatsOrSharps: FlatsOrSharps;
}

export const Note = ({
  musicNote,
  isRoot,
  toBePlayed,
  showFlatsOrSharps
}: Props) => {
  const { getNoteName } = useMusicNotes();
  const { currentMusicNote } = useAudioEngine();
  const { state } = useExercise();

  const isCurrentlyPlaying = useMemo(
    () => musicNote.hz === currentMusicNote.hz,
    [musicNote, currentMusicNote]
  );

  const isCorrectlyPlayed = useMemo(
    () =>
      state.playedNotes.some((playedNote) => playedNote.hz === musicNote.hz),
    [state.playedNotes, musicNote]
  );

  return (
    <span
      className={classNames(
        isCurrentlyPlaying ? 'bg-blue-500' : '',
        isCorrectlyPlayed ? 'bg-green-500' : '',
        toBePlayed && !isCurrentlyPlaying ? 'bg-orange-500' : '',
        isRoot && !isCurrentlyPlaying ? 'bg-gray-400' : ''
      )}
    >
      {getNoteName(showFlatsOrSharps, musicNote)}
    </span>
  );
};
