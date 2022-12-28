'use client';

import { IMusicNote } from 'music-notes';
import { useCallback, useEffect } from 'react';
import { useMusicNotes } from '../../hooks/useMusicNotes';
// import { useGlobalState } from '../../hooks/useGlobalState';

export const Oscillator = () => {
  const { allMusicNotes } = useMusicNotes();
  // const { audioEngine } = useGlobalState();

  //TODO: add oscillator settings to audio-engine machine
  useEffect(() => {
    console.log('TODO: implement creating of oscillator in audio-engine machine')
    // if (audioEngine.state.context.audioEngine?.isOscillatorCreated === false) {
    //   audioEngine.send({
    //     type: 'CREATE_OSCILLATOR',
    //     payload: { hertz: 82, type: 'sine' }
    //   });
    // }
  }, []);

  const handleChangeFrequency = useCallback(
    (note: IMusicNote) => {
      console.log('TODO: implement setting oscillator frequency in audio-engine machine')
      // audioEngine.send({
      //   type: 'SET_OSCILATOR_FREQUENCY',
      //   payload: { frequency: note.hz }
      // });
    },
    []
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
