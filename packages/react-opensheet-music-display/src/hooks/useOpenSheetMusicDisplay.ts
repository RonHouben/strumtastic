import {
	IOSMDOptions,
	OpenSheetMusicDisplay as OSMD
} from 'opensheetmusicdisplay';
import { useState } from 'react';

export default function useOpenSheetMusicDisplay() {
  const [osmd, setOsmd] = useState<OSMD>();
	const [isCursorShown, setIsCursorShown] = useState<boolean>(false);

  const initOSMD = (container: HTMLDivElement, options: IOSMDOptions) => {
   	const osmd = new OSMD(container, options);

		setOsmd(osmd);
  };

  const loadFile = async (file: string | Document) => {
    notInitializedError();

    await osmd!.load(file);

    osmd!.render();

		showCursor();
  };

  const showCursor = () => {
    notInitializedError();

    osmd!.cursor.show();

		// This is a work-around because TailwindCSS sets the height of all img elements to auto
		const height = osmd!.cursor.cursorElement.getAttribute('height');
		osmd!.cursor.cursorElement.style.height= `${height}px`;

		setIsCursorShown(true);
  };

	const hideCursor = () => {
		notInitializedError();

		osmd!.cursor.hide();

		setIsCursorShown(false);
	}

	const moveCursorNext = () => {
		notInitializedError();

		osmd!.cursor.next();
	}

	const moveCursorPrevious = () => {
		notInitializedError();

		osmd!.cursor.previous();
	}

	const getNotesUnderCursor = () => osmd?.cursor?.NotesUnderCursor() || [];

  const notInitializedError = () => {
    if (!osmd) {
      throw Error('OSMD not initialized');
    }
  };

  return {
    initOSMD,
    loadFile,
    isInitialized: !!osmd,
		cursor:{ 
			show: showCursor,
			hide: hideCursor,
			moveNext: moveCursorNext,
			movePrev: moveCursorPrevious,
			isShown: isCursorShown,
			getNotesUnderCursor,
		}
  };
}
