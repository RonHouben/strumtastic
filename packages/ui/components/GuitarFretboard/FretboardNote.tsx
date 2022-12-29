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
        'bg-secondary-100 w-6 h-6 rounded-full text-slate-400 dark:bg-slate-900 dark:text-slate-600',
        isCurrentlyPlaying
          ? '!bg-secondary-500 border-secondary-500 border text-white dark:!text-black'
          : '',
        isCorrectlyPlayed ? '!bg-green-500 text-white dark:text-black' : '',
        isRoot && isCorrectlyPlayed
          ? 'border !border-red-500'
          : '',
        isRoot && !isCorrectlyPlayed ? 'border !border-red-500' : '',
        toBePlayed && !isCorrectlyPlayed ? 'border border-orange-500' : '',
      )}
    >
      <span>{getNoteName(showFlatsOrSharps, musicNote)}</span>
    </div>
  );
};
