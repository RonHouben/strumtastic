import { FlatsOrSharps, IMusicNote } from 'music-notes';
import { useMemo } from 'react';
import { classNames } from 'ui/utils';
import { useExercise } from '../../hooks/useExercise';
import { useMusicNotes } from '../../hooks/useMusicNotes';

interface Props {
  musicNote: IMusicNote;
  isCurrentlyPlaying: boolean;
  isRoot?: boolean;
  toBePlayed?: boolean;
  showFlatsOrSharps: FlatsOrSharps;
}

export const Note = ({
  musicNote,
  isCurrentlyPlaying,
  isRoot,
  toBePlayed,
  showFlatsOrSharps
}: Props) => {
  const { getNoteName } = useMusicNotes();
  const { state } = useExercise();
  const isCorrectlyPlayed = useMemo(
    () =>
      state.playedNotes.some((playedNote) => playedNote.hz === musicNote.hz),
    [state.playedNotes, musicNote]
  );

  return (
    <span
      className={classNames(
        isCorrectlyPlayed ? 'bg-green-500' : '',
        isCurrentlyPlaying ? 'bg-blue-500' : '',
        toBePlayed && !isCurrentlyPlaying ? 'bg-orange-500' : '',
        isRoot && !isCurrentlyPlaying ? 'bg-gray-400' : ''
      )}
    >
      {getNoteName(showFlatsOrSharps, musicNote).replace(/\d/g, '')}
    </span>
  );
};
