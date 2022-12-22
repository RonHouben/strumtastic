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
    <span
      className={classNames(
        isCurrentlyPlaying ? 'bg-blue-500' : '',
        isCorrectlyPlayed ? 'bg-green-500' : '',
        toBePlayed ? 'bg-orange-500' : '',
      )}
    >
      {getNoteName(showFlatsOrSharps, musicNote)}
    </span>
  );
};
