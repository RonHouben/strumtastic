'use client';

import { ExerciseMusicNote, FlatsOrSharps, IMusicNote } from 'music-notes';
import { useCallback, useMemo, useState } from 'react';
import { useMusicNotes } from '../../hooks/useMusicNotes';
import { useClassNames } from '../../hooks/useClassNames';
import { useGlobalState } from '../../hooks/useGlobalState';
import { GuitarFretboardViewType } from './types';

interface Props {
  musicNote: IMusicNote;
  isRoot?: boolean;
  toBePlayed?: boolean;
  showFlatsOrSharps: FlatsOrSharps;
  onNoteClick?: (note: IMusicNote) => void;
  viewType: GuitarFretboardViewType;
  exerciseNoteNumber: number;
}

export const FretboardNote = ({
  musicNote,
  isRoot,
  toBePlayed,
  showFlatsOrSharps,
  onNoteClick,
  viewType,
  exerciseNoteNumber
}: Props) => {
  const [isHovering, setIsHovering] = useState(false);
  const { exerciseEngine, audioEngine } = useGlobalState();
  const { getMusicNoteFromFrequency } = useMusicNotes();
  const { classNames } = useClassNames();

  const currentMusicNote = useMemo(() => {
    if (audioEngine.state.context.audioEngine?.currentFrequency) {
      return getMusicNoteFromFrequency(
        audioEngine.state.context.audioEngine.currentFrequency
      );
    }
  }, [audioEngine, getMusicNoteFromFrequency]);

  const isCurrentlyPlaying = useMemo(
    () => musicNote === currentMusicNote,
    [musicNote, currentMusicNote]
  );

  const isCorrectlyPlayed = useMemo(
    () =>
      exerciseEngine.state.context.correctlyPlayedNotes.some(
        (playedNote) => playedNote.name === musicNote.name
      ),
    [exerciseEngine.state.context.correctlyPlayedNotes, musicNote]
  );

  const handleOnNoteClick = useCallback(() => {
    if (onNoteClick) {
      onNoteClick(musicNote);
    }
  }, [onNoteClick, musicNote]);

  return (
    <div
      className={classNames(
        'h-6 w-6 rounded-full bg-secondary-100 text-slate-400 transition delay-150 duration-300 ease-in-out hover:scale-150 dark:bg-slate-900 dark:text-slate-600',
        isCurrentlyPlaying
          ? 'border border-secondary-500 !bg-secondary-500 text-white dark:!text-black'
          : '',
        isCorrectlyPlayed ? '!bg-green-500 text-white dark:text-black' : '',
        isRoot && isCorrectlyPlayed ? 'border !border-red-500' : '',
        isRoot && !isCorrectlyPlayed ? 'border !border-red-500' : '',
        toBePlayed && !isCorrectlyPlayed ? 'border border-orange-500' : '',
        onNoteClick ? 'cursor-pointer' : '',
        'hover:bg-secondary-500'
      )}
      onClick={handleOnNoteClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {toBePlayed && viewType === 'notes' && <span>{musicNote.pc}</span>}
      {toBePlayed && viewType === 'exercise-order' && !isHovering && (
        <span>{exerciseNoteNumber}</span>
      )}
      {toBePlayed && viewType === 'exercise-order' && isHovering && (
        <span>{musicNote.pc}</span>
      )}
      {!toBePlayed && <span>{musicNote.pc}</span>}
    </div>
  );
};
