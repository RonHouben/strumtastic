import { FlatsOrSharps, IMusicNote } from 'music-notes';
import { useMemo } from 'react';
import { useExercise } from '../../hooks/useExercise';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { useClassNames } from '../../hooks/useClassNames';
import { useGlobalState } from '../../hooks/useGlobalState';

interface Props {
  musicNote: IMusicNote;
  isRoot?: boolean;
  toBePlayed?: boolean;
  showFlatsOrSharps: FlatsOrSharps;
}

export const FretboardNote = ({
  musicNote,
  isRoot,
  toBePlayed,
  showFlatsOrSharps
}: Props) => {
  const { getNoteName } = useMusicNotes();
  const [exerciseState] = useExercise();
  const { audioEngine } = useGlobalState();
  const { classNames } = useClassNames();

  const isCurrentlyPlaying = useMemo(
    () => musicNote === audioEngine.state.context.audioEngine?.currentMusicNote,
    [musicNote, audioEngine]
  );

  const isCorrectlyPlayed = useMemo(
    () =>
      exerciseState.playedNotes.some(
        (playedNote) => playedNote.hz === musicNote.hz
      ),
    [exerciseState.playedNotes, musicNote]
  );

  return (
    <div
      className={classNames(
        'w-6 rounded-full bg-slate-500 text-slate-400 dark:bg-slate-900 dark:text-slate-600',
        isCurrentlyPlaying ? 'border-secondary-500 border' : '',
        isCorrectlyPlayed ? 'border border-green-500' : '',
        isCurrentlyPlaying && isCorrectlyPlayed
          ? 'bg-green-800 text-slate-200'
          : '',
        isRoot && isCorrectlyPlayed
          ? 'ring-0 ring-red-500 ring-offset-2 ring-offset-green-500'
          : '',
        isRoot && !isCorrectlyPlayed ? 'border !border-red-500' : '',
        toBePlayed && !isCorrectlyPlayed ? 'border border-orange-500' : '',
        toBePlayed && isRoot && !isCorrectlyPlayed
          ? 'bg-orange-700 text-slate-200'
          : ''
      )}
    >
      <span>{getNoteName(showFlatsOrSharps, musicNote)}</span>
    </div>
  );
};
