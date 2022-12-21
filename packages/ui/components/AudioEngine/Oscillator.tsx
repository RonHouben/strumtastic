import { IMusicNote } from 'music-notes';
import { useAudioEngine } from '../../hooks/useAudioEngine';
import { useMusicNotes } from '../../hooks/useMusicNotes';

export const Oscillator = () => {
  const { allMusicNotes } = useMusicNotes();
  const [state, dispatch] = useAudioEngine();

  const handleSelect = (note: IMusicNote) => {
    // setOscillatorFrequency(Number(note.hz));
    throw new Error('IMPLEMENT handleSelect in Oscillator component. Need to add "setOscillatorFrequency" to AudioEngine dispatch');
  };

  return (
    <div className='flex gap-1'>
      <label htmlFor='select-oscillator-note'>Set Oscillator Note:</label>
      <select
        id='select-oscillator-note'
        onChange={(e) => handleSelect(JSON.parse(e.currentTarget.value))}
        className="rounded-sm bg-slate-500"
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
