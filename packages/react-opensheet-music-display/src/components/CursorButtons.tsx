'use client';

import useOpenSheetMusicDisplay from '../hooks/useOpenSheetMusicDisplay';

export function CursorButtons() {
  const { osmdMachine } = useOpenSheetMusicDisplay();

  return (
    <>
      {osmdMachine.state.context.osmd?.cursor && (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => osmdMachine.send('cursor.toggle')}>
            {osmdMachine.state.context.osmd.cursor.hidden ? 'Show' : 'Hide'}
            Cursor
          </button>
          <button onClick={() => osmdMachine.send('cursor.prev')}>
            Previous
          </button>
          <button onClick={() => osmdMachine.send('cursor.next')}>Next</button>
        </div>
      )}
    </>
  );
}
