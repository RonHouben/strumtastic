'use client';

import { IOSMDOptions, Note } from 'opensheetmusicdisplay';
import { useEffect, useRef } from 'react';
import useOpenSheetMusicDisplay from '../hooks/useOpenSheetMusicDisplay';

interface Props {
  file: string | Document;
  options: IOSMDOptions;
  onCursorChange?: (noteUnderCursor: Note[]) => void;
}

export function OpenSheetMusicDisplay({
  file,
  onCursorChange,
  options
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { initOSMD, loadFile, isInitialized, cursor } =
    useOpenSheetMusicDisplay();

  const toggleCursor = () => {
    if (cursor.isShown) {
      cursor.hide();
    } else {
      cursor.show();
    }
  };

  const handleMoveCursor = (direction: 'next' | 'prev') => {
    if (direction === 'next') {
      cursor.moveNext();
    }

    if (direction === 'prev') {
      cursor.movePrev();
    }

    if (onCursorChange) {
      onCursorChange(cursor.getNotesUnderCursor());
    }
  };

  // initialize OSMD
  useEffect(() => {
    if (containerRef.current && !isInitialized) {
      initOSMD(containerRef.current, options);
    }
  }, [containerRef.current, isInitialized]);

  // load file into OSMD
  useEffect(() => {
    if (isInitialized) {
      loadFile(file);
    }
  }, [isInitialized]);

  useEffect(() => {
    if (onCursorChange) {
      onCursorChange(cursor.getNotesUnderCursor());
    }
  }, [cursor.isShown])

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={toggleCursor}>
          {cursor.isShown ? 'Hide' : 'Show'} Cursor
        </button>
        <button onClick={() => handleMoveCursor('prev')}>Previous</button>
        <button onClick={() => handleMoveCursor('next')}>Next</button>
      </div>
      <div ref={containerRef} />
    </>
  );
}
