'use client';

import useOpenSheetMusicDisplay from '../hooks/useOpenSheetMusicDisplay';

export function CursorButtons() {
  const { osmdMachine} = useOpenSheetMusicDisplay();

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => osmdMachine.send('cursor.prev')}>
          Previous
        </button>
        <button onClick={() => osmdMachine.send('cursor.next')}>Next</button>
        <button
          onClick={() =>
            osmdMachine.send({
              type: 'cursor.moveToMeasure',
              payload: { measureIndex: 1 }
            })
          }
        >
          Go To Measure 2
        </button>
        <button onClick={() => osmdMachine.send('cursor.data')}>
          Current cursor data
        </button>
      </div>
    </>
  );
}