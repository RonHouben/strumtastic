import { IMusicNote } from 'music-notes';
import { useMemo } from 'react';

interface Props {
  musicNote: IMusicNote | null;
}

export const MusicNote = ({ musicNote }: Props) => {
  const memoisedMusicNote = useMemo(() => musicNote, [musicNote]);

  return (
    <div className="flex min-h-[20rem] flex-col pt-2">
      <strong>MusicNote</strong>
      <table className="mt-1 table-fixed">
        <thead>
          <tr>
            <th>Hertz</th>
            <th>Octave</th>
            <th>Name</th>
            <th>Positions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{memoisedMusicNote?.hz}</td>
            <td>{memoisedMusicNote?.octave}</td>
            <td>{JSON.stringify(memoisedMusicNote?.names)}</td>
            <td>
              <ul>
                {memoisedMusicNote?.positions.map((position, i) => (
                  <li key={i}>{JSON.stringify(position)}</li>
                ))}
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
