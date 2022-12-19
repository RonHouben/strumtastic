import { useAudioEngine } from '../../hooks/useAudioEngine';
import { useMusicNotes } from '../../hooks/useMusicNotes';

export const Oscillator = () => {
  const { musicNotes } = useMusicNotes();
  const { setOscillatorFrequency } = useAudioEngine();

  const handleSelect = (option: string) => {
    setOscillatorFrequency(Number(option));
  };

  return (
    <div className='flex gap-1'>
      <label htmlFor='select-oscillator-note'>Set Oscillator Note:</label>
      <select
        id='select-oscillator-note'
        onChange={(e) => handleSelect(e.currentTarget.value)}
        className="rounded-sm bg-slate-500"
      >
        {musicNotes.map((note, i) => (
          <option key={i} value={note.hz}>
            {Object.values(note.names)}
          </option>
        ))}
      </select>
    </div>
  );
};
