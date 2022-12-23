import { IMusicNote } from 'music-notes';

interface Props {
  musicNote: IMusicNote | null;
}

export const MusicNote = ({ musicNote }: Props) => {
  return (
    <div className='flex flex-col pt-2'>
      <strong>
        MusicNote
      </strong>
      <table className="table-auto mt-1">
        <thead>
          <tr>
            {Object.keys(musicNote || {}).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {Object.entries(musicNote || {}).map(([key, values]) => (
              <>
                {Array.isArray(values) && (
                  <td key={key}>
                    <ul>
                      {values.map((value, i) => (
                        <li key={i}>{JSON.stringify(value)}</li>
                      ))}
                    </ul>
                  </td>
                )}
                {!Array.isArray(values) && (
                  <td key={key}>{JSON.stringify(values)}</td>
                )}
              </>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
