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
  const [exerciseState] = useExercise();
  const [audioEngineState] = useAudioEngine();

  const isCurrentlyPlaying = useMemo(
    () => musicNote === audioEngineState.currentMusicNote,
    [musicNote, audioEngineState.currentMusicNote]
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
        'w-7 rounded-full bg-slate-500 text-slate-400',
        isCurrentlyPlaying ? '!bg-blue-500 text-slate-200' : '',
        isCorrectlyPlayed ? 'bg-green-500 text-slate-900' : '',
        isCurrentlyPlaying && isCorrectlyPlayed
          ? 'bg-green-800 text-slate-200'
          : '',
        isRoot && !isCorrectlyPlayed ? 'bg-slate-900 text-slate-200' : '',
        toBePlayed && !isCorrectlyPlayed ? 'bg-orange-500 text-slate-200' : '',
        toBePlayed && isRoot && !isCorrectlyPlayed
          ? 'bg-orange-700 text-slate-200'
          : ''
      )}
    >
      <span>{getNoteName(showFlatsOrSharps, musicNote)}</span>
    </div>
  );
};
