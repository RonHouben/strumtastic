import { IMusicNote } from 'music-notes';
import { useCallback, useEffect } from 'react';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { useMusicNotes } from '../../hooks/useMusicNotes';

export const Oscillator = () => {
  const { allMusicNotes } = useMusicNotes();
  const [_state, dispatch] = useAudioEngine();

  useEffect(() => {
    dispatch({
      type: 'CREATE_OSCILLATOR',
      payload: { hertz: 82, type: 'sine' }
    });
  }, [dispatch]);

  const handleChangeFrequency = useCallback(
    (note: IMusicNote) => {
      dispatch({
        type: 'SET_OSCILATOR_FREQUENCY',
        payload: { frequency: note.hz }
      });
    },
    [dispatch]
  );

  return (
    <div className="flex gap-1">
      <label htmlFor="select-oscillator-note">Set Oscillator Note:</label>
      <select
        id="select-oscillator-note"
        onChange={(e) =>
          handleChangeFrequency(JSON.parse(e.currentTarget.value))
        }
        className="rounded-sm border border-slate-300 bg-slate-500"
      >
        {allMusicNotes.map((note, i) => (
          <option key={i} value={JSON.stringify(note)}>
            {`${note.octave} - ${Object.values(note.names).join('/')}`}
          </option>
        ))}
      </select>
    </div>
  );
};
