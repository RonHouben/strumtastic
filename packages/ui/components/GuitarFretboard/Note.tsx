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
  const { getNoteName, getMusicNoteFromFrequency } = useMusicNotes();
  const [state] = useAudioEngine();

  const isCurrentlyPlaying = useMemo(() => {
    const currentMusicNote = getMusicNoteFromFrequency(state.currentFrequency);

    return currentMusicNote ? musicNote.hz === currentMusicNote.hz : false;
  }, [musicNote, state.currentFrequency, getMusicNoteFromFrequency]);

  // const isCorrectlyPlayed = useMemo(
  //   () =>
  //     state.playedNotes.some((playedNote) => playedNote.hz === musicNote.hz),
  //   [state.playedNotes, musicNote]
  // );

  return (
    <span
      className={classNames(
        isCurrentlyPlaying ? 'bg-blue-500' : '',
        // toBePlayed && !isCurrentlyPlaying && !isCorrectlyPlayed
        //   ? 'bg-orange-500'
        //   : '',
        // isCorrectlyPlayed ? 'bg-green-500' : ''
      )}
    >
      {getNoteName(showFlatsOrSharps, musicNote)}
    </span>
  );
};
